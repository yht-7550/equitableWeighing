<script setup lang="ts">
interface TabItem {
  title: string
  icon?: string
}
const props = withDefaults(defineProps<{
  tabs: TabItem[]
  modelValue: number
}>(), {
  tabs: () => ([]),
})

const emit = defineEmits(['update:modelValue'])
const modelValueProxy = computed({
  get() {
    return props.modelValue
  },
  set(v) {
    emit('update:modelValue', v)
  },
})
</script>

<template>
  <div class="bg-[#008FFF] w-160rpx">
    <div
      v-for="(item, index) in tabs"
      :key="index"
      class="h-136rpx flex-center flex-col cursor-pointer text-sm"
      :class="[modelValueProxy === index ? 'bg-white text-[#008FFF] font-bold' : 'text-white']"
      @tap="modelValueProxy = index"
    >
      <div v-if="item.icon" :class="item.icon" class="w-40rpx h-40rpx"></div>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
