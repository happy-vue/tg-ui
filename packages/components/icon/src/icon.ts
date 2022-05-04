// 放置组件的props和一些公共的方法
import type { ExtractPropTypes } from 'vue'
//  as const，会让对象的每个属性变成只读（readonly）
export const iconProps = {
  size: {
    type: Number,
  },
  color: {
    type: String,
  },
}

export type IconProps = ExtractPropTypes<typeof iconProps>
