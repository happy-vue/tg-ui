import { withTaskName } from './utils/index'
import { dest, parallel, series, src } from 'gulp'
import { outDir, projectRoot } from './utils/paths'
import { buildConfig } from './utils/config'
import path from 'path'
import ts from 'gulp-typescript'
// 专门打包utils,指令,hooks等ts文件

export const buildPackages = (dirName: string, name: string) => {
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const tsConfigPath = path.resolve(projectRoot, 'tsconfig.json')
    const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules']
    const output = path.resolve(dirName, config.output.name)
    return series(
      withTaskName(`build: ${dirName}`, () => {
        return src(inputs)
          .pipe(
            ts.createProject(tsConfigPath, {
              declaration: true, // 需要生成声明文件
              strict: false,
              module: config.module,
            })()
          )
          .pipe(dest(output))
      }),
      withTaskName(`copy: ${dirName}`, () => {
        return src(`${output}/**`).pipe(dest(path.resolve(outDir, config.output.name, name)))
      })
    )
  })
  return parallel(...tasks)
}
