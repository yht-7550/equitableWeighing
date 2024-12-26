<script setup lang="ts">
import type { IPrintBrandData, IPrintDeviceData } from '@/store/interface'
import type { PrintBrand } from '@/utils'
import ScrollContainer from '@/components/ScrollContainer.vue'
import { useAppStore, useHDPrintStore, useWeighStore, useYMPrintStore } from '@/store'
import { printBrandList } from '@/utils'

const appStore = useAppStore()
const hdPprintStore = useHDPrintStore()
const ymPprintStore = useYMPrintStore()
const weighStore = useWeighStore()

const printBrandName = computed<PrintBrand>(() => appStore.deviceBrandName)

const printDeviceList = computed(() => {
  let data = []
  if (printBrandName.value === '衡顶') {
    data = hdPprintStore.printDeviceList
  }
  if (printBrandName.value === '一敏') {
    data = ymPprintStore.printDeviceList
  }
  return data
})
const weighDeviceList = computed(() => weighStore.weighDeviceList)
const connectedDeviceName = computed(() => {
  let deviceName = ''
  if (printBrandName.value === '衡顶') {
    deviceName = hdPprintStore.connectedDeviceName
  }
  if (printBrandName.value === '一敏') {
    deviceName = ymPprintStore.connectedDeviceName
  }
  return deviceName
})

const activeName = ref(['print', 'weigh'])
const brandShow = ref(false)

const handleSelectBrand = (data: IPrintBrandData) => {
  appStore.setPrintBrand(data)
  brandShow.value = false
}

const handleConnectPrintDevice = (item: IPrintDeviceData) => {
  if (connectedDeviceName.value !== item.deviceName) {
    if (printBrandName.value === '衡顶') {
      hdPprintStore.connectPrintDevice(item.deviceName)
    }
    if (printBrandName.value === '一敏') {
      ymPprintStore.connectPrintDevice(item.deviceName)
    }
  }
}

const handleConnectWeighDevice = async (id: string) => {
  if (weighStore.ifWeighConnected && weighStore.connectedDeviceName) {
    return weighStore.disconnectWeighDevice()
  }
  weighStore.connectWeighDevice(id)
}
</script>

<template>
  <div class="w-full h-full">
    <ScrollContainer>
      <up-cell title="应用版本" :border="false">
        <template #value>
          <span class="text-[#333]">Version {{ appStore.version }}</span>
        </template>
      </up-cell>
      <up-cell is-link :border="false" @click="brandShow = true">
        <template #title>
          <div>秤品牌<span>(打印必选)</span></div>
        </template>
        <template #value>
          <span v-if="appStore.deviceBrandName" class="text-[#333]">{{ appStore.deviceBrandName }}</span>
          <span v-else class="text-[blue] text-sm">请选择秤品牌</span>
        </template>
      </up-cell>
      <up-popup :show="brandShow" :round="10" mode="bottom" @close="brandShow = false">
        <div class="p-32rpx">
          <div class="text-center mb-32rpx font-bold">
            秤品牌
          </div>
          <div class="list">
            <div v-for="(item, index) in printBrandList" :key="index" class="flex-center py-16rpx list_item" @click="handleSelectBrand(item)">
              {{ item.name }}
            </div>
          </div>
        </div>
      </up-popup>
      <div>
        <up-collapse :value="activeName">
          <up-collapse-item title="打印设备" name="print">
            <div v-if="printDeviceList.length">
              <div v-for="(item, index) in printDeviceList" :key="index" class="flex items-center my-2">
                <div class="flex-1">
                  <div>制造商名称：{{ item.manufacturerName }}</div>
                  <div>产品名称：{{ item.productName }}</div>
                </div>
                <div class="w-200rpx">
                  <up-button
                    :type="connectedDeviceName === item.deviceName ? 'success' : 'primary'"
                    size="small"
                    :text="connectedDeviceName === item.deviceName ? '已连接' : '连接设备'"
                    @click="handleConnectPrintDevice(item)"
                  >
                  </up-button>
                </div>
              </div>
            </div>
            <div v-else class="flex-center h-full">
              <image src="@/static/images/index/empty.svg" class="w-400rpx h-400rpx" />
            </div>
          </up-collapse-item>
          <up-collapse-item title="称重设备" name="weigh">
            <div v-if="weighDeviceList.length">
              <div v-for="(item, index) in weighDeviceList" :key="index" class="flex items-center my-2">
                <div class="flex-1">
                  {{ item }}
                </div>
                <div class="w-200rpx">
                  <up-button
                    :type="weighStore.connectedDeviceName === item ? 'error' : 'primary'"
                    size="small"
                    :text="weighStore.connectedDeviceName === item ? '断开连接' : '连接设备'"
                    @click="handleConnectWeighDevice(item)"
                  >
                  </up-button>
                </div>
              </div>
            </div>
            <div v-else class="flex-center h-full">
              <image src="@/static/images/index/empty.svg" class="w-400rpx h-400rpx" />
            </div>
          </up-collapse-item>
        </up-collapse>
      </div>
    </ScrollContainer>
  </div>
</template>

<style lang="scss" scoped>
.list {
  border-bottom: 1rpx solid #EAEBEC;
}
.list_item {
  border-top: 1rpx solid #EAEBEC;
}
</style>
