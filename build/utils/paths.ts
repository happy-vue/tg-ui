import path from 'path'

// 项目根目录
export const projectRoot = path.resolve(__dirname, '../../')

// 打包输出目录
export const outDir = path.resolve(__dirname, '../../dist')

// tg-ui入口 index.ts
export const tgRoot = path.resolve(__dirname, '../../packages/tg-ui')

// 组件目录
export const compRoot = path.resolve(projectRoot, 'packages/components')
