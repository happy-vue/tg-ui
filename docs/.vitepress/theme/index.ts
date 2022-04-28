import { h } from 'vue'
import { VPTheme } from '@vue/theme'

import './styles/index.css'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(VPTheme.Layout, null, {})
  }
})
