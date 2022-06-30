import { resolve } from 'path'
import { defineConfigWithTheme } from 'vitepress'
import baseConfig from '@vue/theme/config'
import type { Config } from '@vue/theme'
import type { UserConfig } from 'vitepress'
import Components from 'unplugin-vue-components/vite'
import { NavbarFix } from './plugins/navbar'

export default defineConfigWithTheme<Config>({
  extends: baseConfig as () => UserConfig<Config>,

  lang: 'zh-CN',
  title: 'tg-ui组件库文档',
  description: '提供现成的开箱解决方案及丰富的示例，提高开发效率。',
  base: '/',
  srcDir: 'src',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/happy-vue/tg-ui.git' },
    ],

    editLink: {
      repo: 'zgsgs/tg-ui/docs',
      text: 'Edit this page on GitHub',
    },

    nav: [
      { text: '教程', link: '/' },
      { text: '组件', link: '/components/' },
      { text: '在线预览', link: 'https://zgsgs.netlify.app' },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/components/': getComponentsSidebar(),
      '/': getGuideSidebar(),
    },
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    plugins: [
      NavbarFix(),
      Components({
        dirs: resolve(__dirname, 'theme/components'),
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: '../.vitepress/components.d.ts',
        transformer: 'vue3',
      }),
    ],
  },

  vue: {
    reactivityTransform: true,
  },
})

function getGuideSidebar() {
  return [
    {
      text: '指南',
      items: [
        { text: '介绍', link: '/' },
        { text: '贡献指南', link: '/guide/' },
      ],
    },
    {
      text: '开发指南',
      items: [
        { text: '新增路由', link: '/guide/add-route' },
        { text: '组件开发规范', link: '/guide/component' },
      ],
    },
  ]
}

function getComponentsSidebar() {
  return [
    {
      text: '组件',
      items: [
        { text: '介绍', link: '/components/' },
        { text: '文档模版', link: '/components/example' },
      ],
    },
    {
      text: '常用组件',
      items: [
        { text: 'Excel', link: '/components/excel' },
        { text: '水印', link: '/components/watermark' },
        { text: '图片裁剪', link: '/components/cropper' },
      ],
    },
  ]
}
