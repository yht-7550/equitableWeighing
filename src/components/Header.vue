<script lang="ts" setup>
import { useNowDate } from '@/composables/useNowDate'
import { useAppStore } from '@/store'

// withDefaults(defineProps<{
//   title: string
//   icon?: string
//   iconColor?: string
//   iconSize?: string | number
// }>(), {
//   title: '',
//   icon: 'send-gift',
//   iconColor: '#165DFF',
//   iconSize: 30,
// })

const appStore = useAppStore()
const version = computed(() => appStore.version)

const { nowDate, nowTime } = useNowDate()
</script>

<template>
  <div class="bg-[#008FFF] flex justify-between items-center px-4 text-white">
    <div>
      <div></div>
      <div>版本号： {{ version }}</div>
    </div>
    <div class="text-right text-lg">
      <div>{{ nowDate }}</div>
      <div>{{ nowTime }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
 .aa {
      color: #008FFF;
    }
</style>
