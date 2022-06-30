<script setup lang="ts">
defineProps<{
  link: string
}>()
</script>

<template>
  <a class="link-button" :href="link" target="_blank">
    <slot />
  </a>
</template>

<style scoped>
.link-button {
  display: inline-block;
  padding: 4px 12px;
  background-color: var(--vt-c-green);
  color: #fff !important;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color .5s, color .5s;
}

.dark .link-button {
  color: var(--vt-c-indigo) !important;
}

.link-button:hover {
  background-color: var(--vt-c-green-dark);
  transition-duration: .2s;
}

.dark .link-button:hover {
  background-color: var(--vt-c-green-light);
}

</style>
