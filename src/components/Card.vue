<script setup lang="ts">
withDefaults(defineProps<{
  showShadow?: boolean
  borderWidth?: string
  borderColor?: string
  borderRadius?: string
}>(), {
  showShadow: false,
  borderWidth: '2rpx',
  borderColor: '#ebeef5',
  borderRadius: '8rpx',
})
</script>

<template>
  <div
    class="card p-16rpx"
    :class="[showShadow ? 'box-shadow' : '']"
    :style="{
      borderWidth,
      borderColor,
      borderRadius,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 2rpx solid #ebeef5;
}
.box-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}
</style>
