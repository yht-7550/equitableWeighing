import type { IPrintBrandData } from '../interface'
import { getStorage, setStorage } from '@/utils'
import { useHDPrintStore } from './hd_print'
import { useYMPrintStore } from './ym_print'

// define store
const deviceBrandName = computed(() => getStorage('printBrand') ? getStorage('printBrand').name : '')

export const useAppStore = defineStore('app', {
  state: () => ({
    name: '称重',
    version: '1.0.2',
    deviceUUID: '',
    deviceModelName: '',
    deviceBrandName: deviceBrandName.value,
    // ...
  }),
  getters: {},
  actions: {
    async checkUpdate() {},
    setPrintBrand(deviceBrandData: IPrintBrandData) {
      this.deviceBrandName = deviceBrandData.name
      if (deviceBrandData.name === '衡顶') {
        const hdPrintStore = useHDPrintStore()
        hdPrintStore.initPrintModule()
      }
      else if (deviceBrandData.name === '一敏') {
        const ymPrintStore = useYMPrintStore()
        ymPrintStore.initPrintModule()
      }
      setStorage('printBrand', deviceBrandData)
    },
    getDeviceInfo() {
      const { uuid } = plus.device
      this.deviceUUID = uuid || ''
      setStorage('deviceUUID', this.deviceUUID)
    },
  },
})
