<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'horizontal' | 'vertical' }>(), { direction: 'horizontal' })
</script>

<template>
  <div class="w-full h-full relative">
    <div
      class="absolute top-0 left-0 w-full h-full"
      :class="[direction === 'horizontal' ? 'overflow-y-auto' : 'overflow-x-auto']"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
