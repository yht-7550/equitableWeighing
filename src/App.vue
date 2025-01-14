<script setup lang="ts">
import { useAppStore, useHDPrintStore, useWeighStore, useYMPrintStore } from '@/store'

const appStore = useAppStore()
const hdPrintStore = useHDPrintStore()
const ymPrintStore = useYMPrintStore()
const weighStore = useWeighStore()

onLaunch(() => {
  console.log('App onLaunch')
  // #ifdef APP
  plus.navigator.setFullscreen(true)
  plus.navigator.hideSystemNavigation()
  if (appStore.deviceBrandName === '衡顶') {
    hdPrintStore.initPrintModule()
  }
  if (appStore.deviceBrandName === '一敏') {
    ymPrintStore.initPrintModule()
  }
  weighStore.initWeighModule()
  // #endif
})

onHide(() => {
  console.log('App onHide')
  // #ifdef APP
  weighStore.disconnectWeighDevice()
  // #endif
})
</script>

<style lang="scss">
@import 'uview-plus/index';
@import './assets/css/common';
</style>
