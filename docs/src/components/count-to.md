# CountTo

数字动画组件。

## Example

``` vue
<template>
  <count-to :start-val="startVal" :end-val="endVal" prefix="$" />
</template>

<script setup lang="ts">
import { CountTo } from '~/components/CountTo'

const startVal = ref(0)
const endVal = ref(6666)
</script>
```

## Props

| 属性       | 类型       | 默认值    | 说明         |
| ---------- | --------- | -------- | ----------- |
| startVal   | `number`  | `0`      | 起始值       |
| endVal     | `number`  | `2022`   | 结束值       |
| duration   | `number`  | `1000`   | 动画持续时间  |
| autoplay   | `boolean` | `true`   | 自动执行     |
| prefix     | `string`  | -        | 前缀         |
| suffix     | `string`  | -        | 后缀         |
| separator  | `string`  | `,`      | 分隔符       |
| color      | `string`  | -        | 字体颜色     |
| useEasing  | `boolean` | `true`   | 是否开启动画  |
| transition | `string`  | `linear` | 动画效果      |
| decimals   | `number`  | `0`      | 保留小数点位数 |

## Methods

| 名称  | 回调参数     | 说明         |
| ----- | ---------- | ------------ |
| start | `()=>void` | 开始执行动画   |
| reset | `()=>void` | 重置         |

## 贡献者

- [Hongbusi](https://github.com/Hongbusi)
