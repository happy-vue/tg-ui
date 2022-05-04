# Cropper

图片裁剪组件。

依赖于 `cropperjs`，具体文档可以参考 [cropperjs](https://github.com/fengyuanchen/cropperjs)。

## Usage

``` vue
<script setup lang="ts">
import type { CroppedResult } from '~/components/Cropper'
import { Cropper } from '~/components/Cropper'
import img from '~/assets/images/test.jpeg'

const info = ref({})
const cropperImg = ref('')

function handleCropped({ imgBase64, imgInfo }: CroppedResult) {
  info.value = imgInfo
  cropperImg.value = imgBase64
}
</script>

<template>
  <Cropper :src="img" style="width: 40vw;" @cropend="handleCropend" />
</template>
```

## Props

| 属性            | 类型       | 默认值            | 说明             |
| --------------- | --------- | ---------------- | --------------- |
| src             | `string`  | -                | 图片源           |
| alt             | `string`  | -                | 图片 alt         |
| circled         | `boolean` | `false`          | 圆形裁剪框        |
| realTimePreview | `boolean` | `true`           | 实时触发预览      |
| height          | `string`  | `360px`          | 高度             |
| imageStyle      | `object`  | -                | 图片样式         |
| options         | `object`  | `DefaultOptions` | corpperjs 配置项 |

## Events

| 名称            | 参数                             | 说明              |
| ---------------| -------------------------------- | ---------------- |
| ready          | cropper 实例                      | cropper 实例     |
| cropend        | `{ imgBase64: '', imgInfo: {} }` | 图片信息          |
| error          | -                                | error            |

## DefaultOptions

```json
{
  "aspectRatio": 1, // 定义裁剪框的固定纵横比
  "zoomable": true, // 缩放图像
  "zoomOnTouch": true, // 通过拖动触摸来缩放图像
  "zoomOnWheel": true, // 通过鼠标滚轮缩放图像
  "cropBoxMovable": true, // 通过拖动来移动裁剪框
  "cropBoxResizable": true, // 通过拖动来调整裁剪框的大小
  "toggleDragModeOnDblclick": true, // 在裁剪器上单击两次时，启用以在“裁剪”和“移动”之间切换拖动模式
  "autoCrop": true, // 在初始化时自动裁剪图像
  "background": true, // 显示容器的网格背景
  "highlight": true, // 在裁剪框上方显示白色模态
  "center": true, // 在裁剪框上方显示中心指示器
  "responsive": true, // 调整窗口大小时重新渲染裁剪器
  "restore": true, // 调整窗口大小后恢复裁剪区域
  "checkCrossOrigin": true, // 检查当前图像是否为跨域图像
  "checkOrientation": true, // 检查当前图像的 Exif 方向信息
  "scalable": true, // 缩放图像
  "modal": true, // 在图像上方和裁剪框下方显示黑色模态
  "guides": true, // 在裁剪框上方显示虚线
  "movable": true, // 移动图像
  "rotatable": true // 旋转图像
}
```
