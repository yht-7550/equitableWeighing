<script lang="ts" setup>
import { useNowDate } from '@/composables/useNowDate'

const { nowDate, nowTime } = useNowDate()
</script>

<template>
  <div class="h-112rpx bg-[#008FFF] flex justify-between items-center px-32rpx text-white">
    <div class="flex items-center">
      <div class="bg-white w-80rpx h-80rpx rounded-full mr-16rpx flex-center">
        <image src="@/static/logo.png" class="w-56rpx h-56rpx" alt="" />
      </div>
      <div class="text-2xl font-youshe">
        安溯称重
      </div>
    </div>
    <div class="text-right">
      <div class="text-30rpx flex">
        {{ nowDate }}
      </div>
      <div class="text-28rpx">
        {{ nowTime }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headerContainer {
}
</style>
