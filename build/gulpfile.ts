import { series } from 'gulp'
import { run, withTaskName } from './utils'

// gulp 不打包只做代码转化 使用它做流程控制
/**
 * 打包样式
 * 打包工具方法
 * 打包所有组件
 * 打包每个组件
 * 生成一个组件库
 * 发布组件
 */
export default series(
  withTaskName('clean', async () => {
    run('rimraf -rf ./dist') // 需要安装rimraf包
  }),
  withTaskName('buildPackages', async () => {
    run('pnpm run --filter ./packages --parallel build')
  })
)
