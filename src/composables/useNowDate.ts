import dayjs from 'dayjs'

/**
 * 获取当前日期、时间、星期
 * @returns
 * nowDate-当前日期
 * nowTime-当前时间
 * weekday-当前星期
 */
export const useNowDate = () => {
  const nowDate = ref<string>('')
  const weekday = ref<string>('')
  const nowTime = ref<string>('')
  const timer = ref()

  const initDate = () => {
    nowDate.value = dayjs().format('YYYY-MM-DD')
    weekday.value = dayjs().locale('zh-cn').format('dddd')
  }

  if (!import.meta.env.SSR) {
    timer.value = setInterval(() => {
      nowTime.value = dayjs().format('HH:mm:ss')
      if (nowTime.value === '00:00:00') {
        initDate()
      }
    })
  }

  initDate()

  onUnmounted(() => {
    if (timer.value)
      clearInterval(timer.value)
  })

  return {
    nowDate,
    nowTime,
    weekday,
  }
}
