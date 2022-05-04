export function camelize(event: string) {
  /** replace的第二个参数为函数
   * 参数一：正则匹配的结，即-x
   * 参数二：为\w
   */
  // replace的函数回调有个特点，正则里面只要有()包裹的，判断为分组($1)，都会单独返会一个结果，所以这里参数2是-后的字母，如果(\w)换成\w，那参数2会是匹配结果的下标
  return event.replace(/-(\w)/g, (_, str: string) => {
    return str.toUpperCase()
  })
}
/**
 * @description: 转大驼峰 取出首字母，转换为大写 + 切割掉首字母
 * @access: public
 * @param {string} event
 * @return {*}
 */
export function capitalize(event: string) {
  return event ? event.charAt(0).toLocaleUpperCase() + event.slice(1) : ''
}

/**
 * @description: 校验kebab-case
 * @access: public
 * @param {string} event
 * @return {*}
 */
export function validateKebabCase(event: string) {
  if (!event || event.trim() === '')
    return '组件名称不能为空'

  if (/[A-Z]/.test(event))
    return '组件名称请遵守 kebab-case'

  return true
}
