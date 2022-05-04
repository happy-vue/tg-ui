/**
 * 安装依赖 pnpm install fast-glob -w -D
 */
import { resolve } from 'path'
import consola from 'consola'
import { series } from 'gulp'
import { rollup } from 'rollup'
import type { OutputOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import { sync } from 'fast-glob' // 同步查找文件
import type { Module } from '../config/bundle'
import { bundleConfig } from '../config/bundle'
import { pathRewriter } from '../utils'
import { vueComponentRoot } from '../config/paths'

// 打包每个组件
const buildEachComponent = async () => {
  // 查找 components 下所有的组件目录 ["icon", "button", ...]
  const dirs = sync('*', {
    cwd: vueComponentRoot,
    onlyDirectories: true, // 只查找文件夹
  })

  // 分别把 components 文件夹下的组件，放到 dist/es/components 和 dist/lib/components 下
  const builds = dirs.map(async (dir: string) => {
    // 找到每个组件的入口文件 index.ts
    const input = resolve(vueComponentRoot, dir, 'index.ts')
    const config = {
      input,
      plugins: [nodeResolve(), typescript(), vue(), commonjs()],
      external: (id: string) => /^vue/.test(id) || /^@tg-ui/.test(id), // 排除掉 vue 和 @tg-ui 的依赖
    }
    const bundle = await rollup(config)
    consola.log('打包完毕')

    // 生成写入配置信息
    const options = Object.values(bundleConfig).map((config) => {
      const { format, output: { name, path } } = config
      return {
        format,
        file: resolve(path, `components/${dir}/index.js`),
        paths: pathRewriter(name as Module), // 处理路径 替换为真实路径
        exports: 'named',
      }
    })
    // 打包结果写入指定目录
    await Promise.all(
      options.map(option => bundle.write(option as OutputOptions)),
    )
    consola.log('写入完毕')
  })

  return Promise.all(builds)
}

// 编译组件入口
async function buildComponentEntry() {
  const config = {
    input: resolve(vueComponentRoot, 'index.ts'),
    plugins: [typescript()],
    external: () => true,
  }
  const bundle = await rollup(config)
  return Promise.all(
    Object.values(bundleConfig)
      .map(config => ({
        format: config.format,
        file: resolve(config.output.path, 'components/index.js'),
      }))
      .map(config => bundle.write(config as OutputOptions)),
  )
}

export const buildComponent = series(
  buildEachComponent,
  buildComponentEntry,
)
