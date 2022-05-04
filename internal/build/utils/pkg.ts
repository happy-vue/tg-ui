// import { PKG_PREFIX } from '../config/constants'
// import { bundleConfig } from '../config/bundle'
// import type { Module } from '../config/bundle'

// // 重写打包后的包 处理路径 @tg-ui/es => tg-ui/es
// export const pathRewriter = (module: Module) => {
//   const { bundle: { path } } = bundleConfig[module]
//   return (id: string) => {
//     id = id.replaceAll(`${PKG_PREFIX}/`, `${path}/`)
//     return id
//   }
// }

// 重写打包后的@tg-ui 路径
export const pathRewriter = (format: string) => {
  return (id: string) => {
    id = id.replaceAll('@tg-ui', `tg-ui/${format}`)
    return id
  }
}
