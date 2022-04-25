# useWatermark

这是一个水印函数组件，属于前端浏览器环境添加水印效果。

## Example

```vue
<template>
  <a-card title="水印功能">
    <a-space>
      <a-button type="primary" @click="setWatermark()">
         创建默认
      </a-button>
      <a-button
        type="primary"
        danger
        @click="
        setWatermark({
          str: 'vue-hbs-admin',
          str2: 'watermark',
          fillStyle: '#409EFF',
        })
        "
      >
        创建自定义
      </a-button>
      <a-button @click="clear()">
        清除
      </a-button>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
import { useWatermark } from '~/components/Watermark'

const { setWatermark, clear } = useWatermark()
</script>
```

## Function

```ts
// 引入
import { useWatermark } from '~/components/Watermark'

const { setWatermark, clear } = useWatermark();

// 有默认值，不传参数，就按照默认设置
const options = {
  str: '防伪 ☆ 加密',
  str2: '',
  font: '15px Vedana',
  fillStyle: 'rgba(0, 0, 0, 0.3)',
  textAlign: 'center',
  textBaseline: 'middle',
}

// 创建水印
setWatermark(options)
// 清除水印
clear()
```

## Events

| 事件          | 回调参数                 | 说明    |
| ------------ | ----------------------- | ------  |
| setWatermark | (options: Attr) => void | 创建水印 |
| clear        | () => void              | 清除水印 |

### Attr

| 参数          | 类型              | 默认值                | 说明                  |
| ------------ | ----------------- | -------------------- | -------------------- |
| str          | string            | '防伪 ☆ 加密'         | 第一行文案             |
| str2         | string            | ''                   | 第二行文案             |
| font         | string            | '15px Vedana'        | canvas font 属性      |
| fillStyle    | string            | 'rgba(0, 0, 0, 0.3)' | canvas fillStyle 属性 |
| textAlign    | CanvasTextAlign   | 'center'             | canvas textAlign 属性 |
| textBaseline | CanvasTextBaseline | 'middle'            | canvas textBaseline 属性 |

## 贡献者

- [BiggerRain](https://github.com/RainyNight9)
