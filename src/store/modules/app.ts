import { setStorage } from '@/utils'
// define store
export const useAppStore = defineStore('app', {
  state: () => ({
    name: '称重',
    version: '1.0.0',
    deviceUUID: '',
    deviceModelName: '',
    deviceBrandName: '',
    // ...
  }),
  getters: {},
  actions: {
    async checkUpdate() {},
    getDeviceInfo() {
      const { uuid, model, vendor } = plus.device
      this.deviceUUID = uuid || ''
      this.deviceModelName = model || ''
      this.deviceBrandName = vendor || ''
      setStorage('deviceUUID', this.deviceUUID)
    },
  },
})
