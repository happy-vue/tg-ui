import { resolve } from 'path'
import type { ModuleFormat } from 'rollup'
import { PKG_NAME } from './constants'
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

// 导出包类型的配置
export const bundleConfig: Record<Module, BundleInfo> = {
  esm: {
    module: 'ESNext', // tsconfig输出的结果是es6模块
    format: 'esm', // 需要配置格式化后的模块规范
    ext: 'mjs',
    output: {
      name: 'es', // 打包到dist目录下的es目录
      path: resolve(buildOutput, 'es'),
    },
    bundle: {
      path: `${PKG_NAME}/es`,
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(buildOutput, 'lib'),
    },
    bundle: {
      path: `${PKG_NAME}/lib`,
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

