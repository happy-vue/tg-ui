import path from 'path'
import { outDir } from './paths'

export const buildConfig = {
  esm: {
    module: 'esnext', // tsconfig输出的结果是es6模块
    format: 'esm', // 需要配置格式化后的模块规范
    output: {
      name: 'es', // 打包到dist目录下的es目录
      path: path.resolve(outDir, 'es'),
    },
    bundle: {
      path: 'tg-ui/es',
    },
  },
  cjs: {
    module: 'commonjs',
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
