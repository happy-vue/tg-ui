import { defineConfigWithTheme } from 'vitepress'
import type { Config } from '@vue/theme'
import { NavbarFix } from './plugins/navbar'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'


export default defineConfigWithTheme<Config>({
  base: '/',
  lang: 'zh-CN',
  title: 'tg-ui官方文档',
  description:
    '基于vite为基础搭建的风格脚手架,提供多种模板以便于更高效的解决业务需求！',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' }]],
  markdown: {
    // 所有代码块启用行号
    lineNumbers: true,
    // options for markdown-it-anchor
    anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    plugins: [
      NavbarFix(),
      Components({
        dirs: resolve(__dirname, 'theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: '../.vitepress/components.d.ts',
        transformer: 'vue3',
      })
    ]
  },

  vue: {
    reactivityTransform: true
  }
});
