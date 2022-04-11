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
        // ...(size ? { '--icon-size': `${size}px` } : {}),
        // ...(color ? { '--icon-color': `${color}` } : {}),
        ...(size ? { 'font-size': `${size}px` } : {}),
        ...(color ? { color: `${color}` } : {}),
      };
    });
    return { styleVar };
  },
});
</script>

<style scoped>
/* .tg-icon {
  font-size: var(--icon-size);
  color: var(--icon-color);
} */
</style>
