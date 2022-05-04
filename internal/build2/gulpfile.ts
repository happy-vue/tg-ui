// import { mkdir } from 'fs/promises'
import { parallel, series } from 'gulp'
import { genTypes } from './tasks/gen-types'
import { run, runTask, withTaskName } from './utils'
import { buildOutput, uiRoot } from './config/paths'
import { genEntryTypes } from './tasks/gen-entry-types'

// gulp 不打包只做代码转化 使用它做流程控制

// 拷贝源码
const copyPackage = () => async () => {
  await run(`cp ${uiRoot}/package.json ${buildOutput}/package.json`)
}

/**
 * 1. 打包样式
 * 2. 打包工具方法
 * 3. 打包所有组件
 * 4. 打包每个组件
 * 5. 生成一个组件库
 * 6. 发布组件
 */
export default series(
  withTaskName('clean', async () => {
    await run('rm -rf ./dist') // 删除dist目录
  }),
  // withTaskName('mkdir', () => mkdir(sdOutput, { recursive: true })),
  parallel(
    // 并行执行 packages 目录下的 build 脚本
    withTaskName('buildPackages', async () => {
      await run('pnpm run --filter ./packages --parallel build')
    }),
    runTask('buildFullComponent'),
    runTask('buildComponent'),
  ),
  parallel(genEntryTypes, copyPackage()),
  parallel(genTypes, copyPackage()),
)

// 任务执行器 gulp 任务名 就会执行对应的任务
export * from './tasks'
