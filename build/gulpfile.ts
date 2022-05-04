import { parallel, series } from 'gulp'
import { genTypes } from './tasks'
import { run, withTaskName } from './utils'
import { buildOutput, uiRoot } from './config/paths'

// gulp 不打包只做代码转化 使用它做流程控制

// 拷贝源码
const copySourceCode = () => async () => {
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
  parallel(
    // 并行执行packages目录下的build脚本
    withTaskName('buildPackages', async () => {
      await run('pnpm run --filter ./packages --parallel build')
    }),
    // 执行build命令时会调用rollup，给rollup传参数buildFullComponent，那么就会执行导出任务叫buildFullComponent
    withTaskName('buildFullComponent', async () => {
      await run('pnpm run build buildFullComponent')
    }),
    withTaskName('buildComponent', async () => {
      await run('pnpm run build buildComponent')
    }),
  ),
  parallel(genTypes, copySourceCode()),
)

// 任务执行器 gulp 任务名 就会执行对应的任务
export * from './tasks'
