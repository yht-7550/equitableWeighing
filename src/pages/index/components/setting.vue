<script setup lang="ts">
import type { IPrintBrandData, IPrintDeviceData } from '@/store/interface'
import type { PrintBrand } from '@/utils'
import ScrollContainer from '@/components/ScrollContainer.vue'
import { useAppStore, useHDPrintStore, useWeighStore, useYMPrintStore } from '@/store'

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

const activeName = ref(['print', 'weigh'])
const brandShow = ref(false)

const handleSelectBrand = (data: IPrintBrandData) => {
  appStore.setPrintBrand(data)
}

const handleConnectPrintDevice = (item: IPrintDeviceData) => {
  if (printBrandName.value === '衡顶') {
    if (hdPprintStore.connectedDeviceName !== item.deviceName) {
      hdPprintStore.connectPrintDevice(item.deviceName)
    }
  }
  if (printBrandName.value === '一敏') {
    if (ymPprintStore.connectedDeviceName !== item.deviceName) {
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
      <up-cell title="应用版本" is-link :border="false">
        <template #value>
          <span class="text-[#333]">Version {{ appStore.version }}</span>
        </template>
      </up-cell>
      <!-- <up-cell is-link :border="false" @click="brandShow = true">
        <template #title>
          <div>秤品牌<span>(打印必选)</span></div>
        </template>
        <template #value>
          <span v-if="appStore.deviceBrandName" class="text-[#333]">{{ appStore.deviceBrandName }}</span>
          <span v-else class="text-[blue] text-sm">请选择秤品牌</span>
        </template>
      </up-cell>
      <up-action-sheet
        :actions="printBrandList"
        title="秤品牌"
        :show="brandShow"
        :close-on-click-action="true"
        @select="handleSelectBrand"
        @close="brandShow = false"
      ></up-action-sheet> -->
      <div>
        <up-collapse :value="activeName">
          <up-collapse-item title="打印设备" name="print">
            <div>
              <div v-for="(item, index) in printDeviceList" :key="index" class="flex items-center my-2">
                <div class="flex-1">
                  <div>制造商名称：{{ item.manufacturerName }}</div>
                  <div>产品名称：{{ item.productName }}</div>
                </div>
                <div class="w-200rpx">
                  <up-button
                    :type="hdPprintStore.connectedDeviceName === item.deviceName ? 'success' : 'primary'"
                    size="small"
                    :text="hdPprintStore.connectedDeviceName === item.deviceName ? '已连接' : '连接设备'"
                    @click="handleConnectPrintDevice(item)"
                  >
                  </up-button>
                </div>
              </div>
            </div>
          </up-collapse-item>
          <up-collapse-item title="称重设备" name="weigh">
            <div>
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
          </up-collapse-item>
        </up-collapse>
      </div>
    </ScrollContainer>
  </div>
</template>

<style lang="scss" scoped></style>
