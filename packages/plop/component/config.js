/*
 * @Author: Lin ZeFan
 * @Date: 2022-04-09 19:02:32
 * @LastEditTime: 2022-04-09 20:15:19
 * @LastEditors: Lin ZeFan
 * @Description:
 * @FilePath: \tg-ui\packages\plop\component\config.js
 *
 */

// import { PREFIX } from "../../../examples/src/constants/index.ts";
const PREFIX = "tg-";

function camelize(event) {
  /** replace的第二个参数为函数
   * 参数一：正则匹配的结，即-x
   * 参数二：为\w
   */
  // replace的函数回调有个特点，正则里面只要有()包裹的，判断为分组($1)，都会单独返会一个结果，所以这里参数2是-后的字母，如果(\w)换成\w，那参数2会是匹配结果的下标
  return event.replace(/-(\w)/g, (_, str) => {
    return str.toUpperCase();
  });
}

function capitalize(event) {
  // 取出首字母，转换为大写 + 切割掉首字母
  return event ? event.charAt(0).toLocaleUpperCase() + event.slice(1) : "";
}

function validateName(name) {
  if (!name || name.trim === "") {
    return "组件名称不能为空";
  }
  if (/[A-Z]/.test(name)) {
    return "组件名称请遵守 kebab-case";
  }
  return true;
}

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "新建一个新组件",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "提供你的组件名称(使用 kebab-case)",
        validate: (v) => validateName(v),
      },
    ],
    actions: (data) => {
      const { name } = data;
      const prefixName = PREFIX + name;
      console.log("prefixName", prefixName);
      const componentName = camelize(capitalize(prefixName));
      const actions = [
        {
          type: "add",
          path: `packages/components/${name}/${name}.vue`, // 创建路径
          templateFile: "packages/plop/component/hbs/vue.hbs", // 模板，将根据此模板内容生成新文件
          data: {
            name,
            prefixName,
          },
        },
        {
          type: "add",
          path: `packages/components/${name}/${name}.less`, // 创建路径
          templateFile: "packages/plop/component/hbs/less.hbs", // 模板，将根据此模板内容生成新文件
          data: {
            name,
            prefixName,
          },
        },
        {
          type: "add",
          path: `packages/components/${name}/${name}.ts`, // 创建路径
          templateFile: "packages/plop/component/hbs/ts.hbs", // 模板，将根据此模板内容生成新文件
          data: {
            componentName,
          },
        },
      ];

      return actions;
    },
  });
};
