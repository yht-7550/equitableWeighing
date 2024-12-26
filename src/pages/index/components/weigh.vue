<script setup lang="ts">
import type { PrintBrand } from '@/utils'
import Card from '@/components/Card.vue'
import ScrollContainer from '@/components/ScrollContainer.vue'
import { useAppStore, useHDPrintStore, useWeighStore, useYMPrintStore } from '@/store'
import dayjs from 'dayjs'

const appStore = useAppStore()
const hdPrintStore = useHDPrintStore()
const ymPrintStore = useYMPrintStore()
const weighStore = useWeighStore()

const activeTab = defineModel<number>({ default: 0 })
const printBrandName = computed<PrintBrand>(() => appStore.deviceBrandName)

const weigh = computed(() => weighStore.weighData.netWeight)
const uForm = ref()
const weighData = ref({
  name: '',
})
const rules = reactive({
  name: {
    type: 'string',
    required: true,
    message: '请填写名称',
    trigger: ['blur'],
  },
})
const toConnectDevice = () => {
  activeTab.value = 1
}

const print = () => {
  if (uForm.value) {
    uForm.value.validate().then((valid: boolean) => {
      if (valid) {
        if (printBrandName.value === '衡顶') {
          hdPrintStore.print([
            {
              type: 'TEXT',
              msg: `${weigh.value}${weighStore.weighData.unit}`,
              width: 1,
              height: 1,
              position: 1,
            },
            {
              type: 'TEXT',
              msg: `${weighData.value.name}`,
              width: 1,
              height: 1,
              position: 1,
            },
            {
              type: 'TEXT',
              msg: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
              width: 0,
              height: 0,
              position: 1,
            },
          ])
        }
        if (printBrandName.value === '一敏') {
          ymPrintStore.print([
            {
              printType: 'TEXT',
              msg: `${weigh.value}${weighStore.weighData.unit}`,
              width: 1,
              height: 1,
              alignment: 1,
              oldLine: false,
              bold: false,
            },
            {
              printType: 'TEXT',
              msg: `${weighData.value.name}`,
              width: 1,
              height: 1,
              alignment: 1,
              oldLine: false,
              bold: false,
            },
            {
              printType: 'TEXT',
              msg: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
              width: 0,
              height: 0,
              alignment: 1,
              oldLine: false,
              bold: false,
            },
          ])
        }
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<template>
  <div class="w-full h-full">
    <ScrollContainer>
      <div class="w-full h-full flex-center flex-col">
        <div class="w-1/3 h-2/5 flex-center">
          <Card v-if="weighStore.ifWeighConnected" show-shadow class="w-full h-full">
            <div class="flex-center flex-col p-32rpx">
              <div class="mx-auto bg-white rounded-full">
                <image src="@/static/logo.png" class="w-100rpx h-100rpx" />
              </div>
              <up-form
                ref="uForm"
                class="w-full mb-40rpx mt-24rpx"
                label-position="left"
                :model="weighData"
                :rules="rules"
                label-width="50"
                :label-style="{ fontSize: '28rpx' }"
              >
                <up-form-item label="重量" required>
                  <up-input
                    v-model="weigh"
                    disabled
                    placeholder="称重重量"
                    input-align="right"
                    :adjust-position="false"
                  >
                    <template #suffix>
                      {{ weighStore.weighData.unit }}
                    </template>
                  </up-input>
                </up-form-item>
                <up-form-item label="名称" prop="name" required>
                  <up-input v-model="weighData.name" placeholder="请输入名称" :adjust-position="false"></up-input>
                </up-form-item>
                <!-- <up-form-item label="备注" prop="note">
                  <up-textarea v-model="weighData.note" placeholder="请输入备注"></up-textarea>
                </up-form-item> -->
              </up-form>
              <div class="w-full">
                <up-button
                  text="打印"
                  type="primary"
                  size="normal"
                  @click="print"
                ></up-button>
              </div>
            </div>
          </Card>
          <div v-else>
            <div class="text-center mb-50rpx">
              <image src="@/static/images/index/no_weigh.svg" class="w-256rpx h-256rpx" />
              <div class="text-[#CDCDCD] text-lg mt-8rpx">
                称重设备未连接
              </div>
            </div>
            <up-button
              text="去连接"
              type="info"
              size="large"
              @click="toConnectDevice"
            ></up-button>
          </div>
        </div>
      </div>
    </ScrollContainer>
  </div>
</template>

<style lang="scss" scoped></style>
