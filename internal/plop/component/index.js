/*
 * @Author: Lin ZeFan
 * @Date: 2022-04-09 19:02:32
 * @LastEditTime : 2022-05-06 09:37:04
 * @LastEditors  : Please set LastEditors
 * @Description: plop生成组件执行脚本
 * @FilePath     : \tg-ui\internal\plop\component\config.js
 *
 */

const { PREFIX } = require('../constants')
const { camelize, getPascal, validateKebabCase } = require('../utils')

module.exports = (plop) => {
  plop.setGenerator('component', {
    description: '新建一个新组件',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '提供你的组件名称(使用 kebab-case)',
        validate: v => validateKebabCase(v),
      },
    ],
    actions: (data) => {
      const { name } = data // form-item
      const prefixName = `${PREFIX}${name}` // u-form-item
      const camelName = camelize(name) // formItem
      const pascalName = getPascal(name) // FormItem
      const pascalPrefixName = getPascal(prefixName) // UFormItem

      const actions = [
        {
          type: 'add',
          path: `packages/components/${name}/src/${name}.vue`, // 创建路径
          templateFile: 'internal/plop/component/hbs/vue.hbs', // 模板，将根据此模板内容生成新文件
          data: {
            name,
            camelName,
            prefixName,
            pascalPrefixName,
          },
        },
        // {
        //   type: 'add',
        //   path: `packages/components/${name}/src/${name}.less`,
        //   templateFile: 'internal/plop/component/hbs/less.hbs',
        //   data: {
        //     name,
        //     prefixName,
        //   },
        // },
        {
          type: 'add',
          path: `packages/components/${name}/src/${name}.ts`,
          templateFile: 'internal/plop/component/hbs/ts.hbs',
          data: {
            name,
            camelName,
            pascalName,
          },
        },
        {
          type: 'add',
          path: `packages/components/${name}/index.ts`,
          templateFile: 'internal/plop/component/hbs/exports.hbs',
          data: {
            name,
            pascalName,
            pascalPrefixName,
          },
        },
      ]

      return actions
    },
  })
}
