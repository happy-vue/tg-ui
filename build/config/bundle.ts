import path from 'path'
import type { ModuleFormat } from 'rollup'
import { buildOutput } from './paths'

// 包格式
export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]

// 包名
export const modulesName = ['es', 'lib'] as const
export type ModuleName = typeof modulesName[number]

// 包类型信息
export interface BundleInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/uno-ux/es` */
    path: string
  }

  bundle: {
    /** e.g: `uno-ux/es` */
    path: string
  }
}

export const bundleConfig: Record<Module, BundleInfo> = {
  esm: {
    module: 'ESNext', // tsconfig 输出的结果 es6 模块
    format: 'esm', // 需要配置格式化后的模块规范
    ext: 'mjs',
    output: {
      name: 'es', // 打包到 dist 目录下的 es 目录
      path: path.resolve(buildOutput, 'es'),
    },
    bundle: {
      path: 'tg-ui/es',
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(buildOutput, 'lib'),
    },
    bundle: {
      path: 'tg-ui/lib',
    },
  },
}

// 目标生成版本
export const target = 'es2018'

export type BundleConfig = typeof bundleConfig

export type BundleConfigEntries = [Module, BundleInfo][]

export const bundleConfigEntries = Object.entries(
  bundleConfig,
) as BundleConfigEntries
