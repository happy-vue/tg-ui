<template>
  <i class="tg-icon" :style="styleVar">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { iconProps } from './icon';

// defineOptions({
//   name: 'TgIcon',
// });

const props = defineProps(iconProps);

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
</script>
