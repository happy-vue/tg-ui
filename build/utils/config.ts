import path from 'path'
import { outDir } from './paths'
export const buildConfig = {
  esm: {
    module: 'ESNext', // tsconfig 输出的结果 es6 模块
    format: 'esm', // 需要配置格式化后的模块规范
    output: {
      name: 'es', // 打包到 dist 目录下的 es 目录
      path: path.resolve(outDir, 'es'),
    },
    bundle: {
      path: 'tg-ui/es',
    },
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    output: {
      name: 'lib',
      path: path.resolve(outDir, 'lib'),
    },
    bundle: {
      path: 'tg-ui/lib',
    },
  },
}

export type BuildConfig = typeof buildConfig
