<script setup lang="ts">
import Header from '@/components/Header.vue'
import SideBar from '@/components/SideBar.vue'
import Setting from './components/setting.vue'
import Weigh from './components/weigh.vue'

const active = ref(0)
const tabs = [
  { title: '称重', icon: 'i-material-symbols:weight' },
  { title: '设置', icon: 'i-material-symbols:settings' },
]
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <Header />
    <div class="flex-1 flex">
      <SideBar v-model="active" :tabs="tabs" />
      <div class="flex-1 px-16rpx py-16rpx bg-white">
        <Weigh v-if="active === 0" v-model="active" />
        <Setting v-if="active === 1" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --van-sidebar-background: #008FFF !important;
}
</style>
