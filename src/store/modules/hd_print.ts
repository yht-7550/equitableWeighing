import type { IHDPrintConnectRes, IHDPrintData, IHDPrintDevRes, IHDPrintParamsBase } from '@/store/interface'
import { getStorage, setStorage, showToast } from '@/utils'

/**
 * 衡顶打印
 */
export const useHDPrintStore = defineStore('HDPrint', {
  state: () => ({
    printModule: null,
    printDeviceList: [] as IHDPrintData[],
    ifPrintConnected: false,
    connectedDeviceName: '',
    connectedDeviceData: {} as IHDPrintData,
    printData: [] as IHDPrintParamsBase[],
  }),
  actions: {
    /**
     * 初始化打印模块, 获取打印设备
     */
    initPrintModule() {
      this.printModule = uni.requireNativePlugin('anxuan_hdprint')
      this.getPrintDeviceList()
    },
    /**
     * 获取打印设备列表
     */
    getPrintDeviceList() {
      this.printModule.deviceList((res: IHDPrintDevRes) => {
        if (res.deviceList) {
          this.printDeviceList = Object.values(res.deviceList)
          const printDevice = getStorage('hdPrintDevice')
          if (printDevice)
            this.connectPrintDevice(printDevice)
        }
      })
    },
    /**
     * 连接打印设备
     */
    connectPrintDevice(deviceName: string) {
      if (deviceName) {
        const findIndex = this.printDeviceList.findIndex(item => item.deviceName === deviceName)
        if (findIndex > -1) {
          this.printModule.connectDev({
            productId: this.printDeviceList[findIndex].productId,
            vendorId: this.printDeviceList[findIndex].vendorId,
          }, (res: IHDPrintConnectRes) => {
            if (res.resultCode === 'success') {
              if (res.isConnected) {
                this.connectedDeviceName = deviceName
                this.connectedDeviceData = this.printDeviceList[findIndex]
                this.ifPrintConnected = true
                setStorage('hdPrintDevice', this.connectedDeviceName)
                !this.ifPrintConnected && showToast({ title: '设备连接成功', icon: 'success' })
              }
              else {
                this.connectedDeviceName = ''
                this.ifPrintConnected = false
                this.connectedDeviceData = {}
                setStorage('hdPrintDevice', '')
                showToast({ title: '设备连接失败', icon: 'error' })
              }
            }
            if (res.resultCode === 'error') {
              this.connectedDeviceName = ''
              this.ifPrintConnected = false
              this.connectedDeviceData = {}
              setStorage('hdPrintDevice', '')
              showToast({ title: '设备连接失败', icon: 'error' })
            }
          })
        }
      }
      else {
        showToast({ title: '请选择打印设备' })
      }
    },
    /**
     * 打印
     */
    print(printData: IHDPrintParamsBase[]) {
      if (this.ifPrintConnected && this.printModule && printData.length) {
        this.printData = printData
        this.printModule.print({ info: printData.concat([
          { type: 'FEEDLINE', msg: '走纸' },
          { type: 'FEEDLINE', msg: '走纸' },
        ]) }, (res) => {
          console.log('打印结果 => ', res)
        })
      }
    },
  },
})
