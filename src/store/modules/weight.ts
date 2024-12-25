import type { IWeighBase, IWeighConnectRes, IWeighData, IWeighDeviceRes } from '@/store/interface'
import { getStorage, setStorage, showToast } from '@/utils'

/**
 * 一敏称重
 */
export const useWeighStore = defineStore('weigh', {
  state: () => ({
    weighModule: null,
    weighDeviceList: [] as string[],
    ifWeighConnected: false,
    connectedDeviceName: '',
    weighData: {} as IWeighData,
  }),
  actions: {
    /**
     * 初始化称重模块, 获取称重设备
     */
    initWeighModule() {
      this.weighModule = uni.requireNativePlugin('anxuan_yimin_WeighModule')
      this.getWeighDeviceList()
    },
    /**
     * 获取称重设备列表
     */
    getWeighDeviceList() {
      this.weighModule.weighDevList((res: IWeighDeviceRes) => {
        this.weighDeviceList = res.data
        const weighDevice = getStorage('weighDevice')
        if (weighDevice)
          this.connectWeighDevice(weighDevice)
      })
    },
    /**
     * 连接称重设备
     */
    connectWeighDevice(deviceName: string) {
      if (deviceName) {
        this.weighModule.connectWeigh({ devPath: deviceName }, (res: IWeighConnectRes) => {
          if (res.resultCode === 'success') {
            if (!this.ifWeighConnected) {
              this.connectedDeviceName = deviceName
              !this.ifWeighConnected && showToast({ title: '设备连接成功', icon: 'success' })
              this.ifWeighConnected = true
              setStorage('weighDevice', this.connectedDeviceName)
            }
            if (res.msg === '成功') {
              this.weighData = JSON.parse(res.data)
            }
          }
          if (res.resultCode === 'error' && res.msg === '称重设备连接失败') {
            showToast({ title: '设备连接失败', icon: 'error' })
            this.ifWeighConnected = false
            this.weighData = {}
          }
        })
      }
      else {
        showToast({ title: '请选择称重设备' })
      }
    },
    /**
     * 断开称重设备
     */
    disconnectWeighDevice() {
      this.weighModule.disconnectWeigh((res: IWeighBase) => {
        if (res.resultCode === 'success') {
          this.ifWeighConnected && showToast({ title: '设备已断开' })
          this.ifWeighConnected = false
          this.connectedDeviceName = ''
        }
      })
    },
  },
})
