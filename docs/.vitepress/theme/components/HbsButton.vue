<template>
  <a class="hbs-link-button" :href="link" target="_blank">
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  link: string
}>()
</script>

<style scoped>
.hbs-link-button {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--vt-c-green);
  color: #fff !important;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s;
}

.dark .hbs-link-button {
  color: var(--vt-c-indigo) !important;
}

.hbs-link-button:hover {
  background-color: var(--vt-c-green-dark);
  transition-duration: 0.2s;
}

.dark .hbs-link-button:hover {
  background-color: var(--vt-c-green-light);
}
</style>
