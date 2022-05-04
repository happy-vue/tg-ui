import path from 'path'
import { dest, parallel, series, src } from 'gulp'
import ts from 'gulp-typescript'
import { withTaskName } from './utils/index'
import { outDir, projectRoot } from './utils/paths'
import { buildConfig } from './utils/config'

// 专门打包utils,指令,hooks等ts文件
export const buildPackages = (dirName: string, name: string) => {
  const tasks = Object.entries(buildConfig).map(([, config]) => {
    const tsConfig = path.resolve(projectRoot, 'tsconfig.json')
    const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules']
    const output = path.resolve(dirName, 'dist', config.output.name)
    // 安装依赖gulp-typescript
    return series(
      // 处理ts文件
      withTaskName(`build: ${dirName}`, () => {
        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true, // 需要生成声明文件
              strict: false, // 关闭严格模式
              module: config.module,
            })(),
          )
          .pipe(dest(output))
      }),
      withTaskName(`copy: ${dirName}`, () => {
        // 将打包好的文件放到 es=>utils 和 lib => utils
        // 将utils模块拷贝到dist目录下的es和lib目录
        return src(`${output}/**`).pipe(
          dest(path.resolve(outDir, config.output.name, name)),
        )
      }),
    )
  })
  return parallel(...tasks)
}
