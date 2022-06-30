<script lang="ts">
import { computed, defineComponent } from 'vue'
import { iconProps } from './icon'

export default defineComponent({
  name: 'TgIcon',
  props: iconProps,
  setup(props) {
    const styleVar = computed(() => {
      if (!props.size && !props.color)
        return {}

      return {
        ...(props.size ? { 'font-size': `${props.size}px` } : {}),
        ...(props.color ? { color: props.color } : {}),
      }
    })

    return { styleVar }
  },
})
</script>

<template>
  <i class="tg-icon" :style="styleVar">
    <slot />
  </i>
</template>
