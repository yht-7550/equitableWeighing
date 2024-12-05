type HtmlElementType = HTMLElement | null

interface ConfigOption {
  data: any[] // 数据
  scrollContainerElRef: Ref<HtmlElementType> // 滚动容器的元素
  actualHeightContainerElRef: Ref<HtmlElementType> // 撑开高度的元素
  translateContainerElRef: Ref<HtmlElementType> // 用于偏移的元素
  itemContainer: Ref<HTMLElement[]> // 列表项选择器
  itemHeight: number // 列表项高度
  size: number // 每次渲染数据量
}

/**
 * 虚拟列表
 * @param config ConfigOption
 * @returns actualRenderData 实际渲染数据
 */
export const useVirtualList = (config: ConfigOption) => {
  // 获取元素
  const actualHeightContainerEl = ref(config.actualHeightContainerElRef.value)
  const translateContainerEl = ref(config.translateContainerElRef.value)
  const scrollContainerEl = ref(config.scrollContainerElRef.value)

  // 数据源，便于后续直接访问
  let dataSource: any[] = []
  // 缓存已渲染元素的高度
  const RenderedItemsCache: any = {}
  // 获取缓存高度，无缓存，取配置项的 itemHeight
  const getItemHeightFromCache = (index: number | string) => {
    const val = RenderedItemsCache[index]
    return val === void 0 ? config.itemHeight : val
  }
  // 更新实际高度
  const updateActualHeight = () => {
    let actualHeight = 0
    dataSource.forEach((_, i) => {
      actualHeight += getItemHeightFromCache(i)
    })
    actualHeightContainerEl.value.style.height = `${actualHeight}px`
  }

  // 更新已渲染列表项的缓存高度
  const updateRenderedItemCache = (index: number) => {
    // 当所有元素的实际高度更新完毕，就不需要重新计算高度
    const shouldUpdate
      = Object.keys(RenderedItemsCache).length < dataSource.length
    if (!shouldUpdate)
      return
    nextTick(() => {
      // 获取所有列表项元素
      const Items: HTMLElement[] = Array.from(config.itemContainer.value)
      // 进行缓存
      Items.forEach((el) => {
        if (!RenderedItemsCache[index]) {
          RenderedItemsCache[index] = el.offsetHeight
        }
        index++
      })
      // 更新实际高度
      updateActualHeight()
    })
  }

  // 实际渲染的数据
  const actualRenderData: Ref<any[]> = ref([])

  // 更新偏移值
  const updateOffset = (offset: number) => {
    if (translateContainerEl.value) {
      translateContainerEl.value.style.transform = `translateY(${offset}px)`
    }
  }

  // 更新实际渲染数据
  const updateRenderData = (scrollTop: number) => {
    let startIndex = 0
    let offsetHeight = 0
    for (let i = 0; i < dataSource.length; i++) {
      offsetHeight += getItemHeightFromCache(i)
      if (offsetHeight >= scrollTop) {
        startIndex = i
        break
      }
    }
    // 计算得出的渲染数据
    actualRenderData.value = dataSource.slice(
      startIndex,
      startIndex + config.size,
    )
    // 缓存最新的列表项高度
    updateRenderedItemCache(startIndex)
    // 更新偏移值
    updateOffset(offsetHeight - getItemHeightFromCache(startIndex))
  }

  // 数据源发生变动
  watch(
    () => config.data,
    (newVla) => {
      // 更新数据源
      dataSource = newVla
      // 计算需要渲染的数据
      updateRenderData(0)
    },
    {
      immediate: true,
    },
  )

  // 滚动事件
  const handleScroll = (e: any) => {
    // 渲染正确的数据
    updateRenderData(e.target.scrollTop)
  }

  // 注册滚动事件
  watch(
    () => scrollContainerEl.value,
    (el) => {
      if (el) {
        el.addEventListener('scroll', handleScroll)
      }
    },
    {
      immediate: true,
    },
  )

  // 移除滚动事件
  onBeforeUnmount(() => {
    scrollContainerEl.value.removeEventListener('scroll', handleScroll)
  })

  return { actualRenderData }
}
