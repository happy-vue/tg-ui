module.exports = {
  base: '/',
  title: 'tg-ui官方文档',
  description:
    '基于vite为基础搭建的风格脚手架,提供多种模板以便于更高效的解决业务需求！',
  lang: 'zh-CN',
  // 所有标题将自动添加anchor链接
  anchor: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' }]],
  markdown: {
    // 所有代码块启用行号
    lineNumbers: true,
    // options for markdown-it-anchor
    anchor: { permalink: false },
    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },
  },
};
