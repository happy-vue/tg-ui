<template>
  <i class="tg-icon" :style="styleVar">
    <slot />
  </i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { iconProps } from './icon';

export default defineComponent({
  name: 'TgIcon',
  props: iconProps,
  setup(props) {
    const styleVar = computed(() => {
      const { size, color } = props;
      if (!size && !color) {
        return {};
      }
      return {
        ...(size ? { 'font-size': `${size}px` } : {}),
        ...(color ? { color: `${color}` } : {}),
      };
    });
    return { styleVar };
  },
});
</script>
