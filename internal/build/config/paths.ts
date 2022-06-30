import { resolve } from 'path'
import { PKG_NAME } from './constants'

/* 源文件 */
// 项目根目录
export const projectRoot = resolve(__dirname, '..', '..', '..')
// 包目录
export const pkgRoot = resolve(projectRoot, 'packages')
// 包/组件目录
export const vueComponentRoot = resolve(pkgRoot, 'components')
// 包/共享
export const sharedRoot = resolve(pkgRoot, 'shared')
// 包/生产库
export const uiRoot = resolve(pkgRoot, PKG_NAME)
// 构建脚本目录
export const buildRoot = resolve(projectRoot, 'internal', 'build')

/* output */
// 打包输出目录
export const buildOutput = resolve(projectRoot, 'dist')
// 输出UI目录
export const uiOutput = resolve(buildOutput, PKG_NAME)
// 组件导出文件类型输出目录
export const uiTypeOutput = resolve(buildOutput, 'entry/types')
// 类型输出目录
export const typesOutput = resolve(buildOutput, 'types')
// 组件类型输出目录
export const componentTypeOutput = resolve(typesOutput, 'components')

/* package.json位置 */
export const projPackage = resolve(projectRoot, 'package.json')
export const vueComponentPackage = resolve(vueComponentRoot, 'package.json')
export const uiPackage = resolve(uiRoot, 'package.json')
export const sharedPackage = resolve(sharedRoot, 'package.json')

/* tsconfig.json */
// 根目录的 ts 配置
export const tsConfigRoot = resolve(projectRoot, 'tsconfig.json')
