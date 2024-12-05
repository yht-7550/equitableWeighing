/**
 * 设置本地缓存
 * @param key 键名
 * @param value key 对应的内容
 */
export function setStorage(key: string, value: any) {
  uni.setStorageSync(key, value)
}

/**
 * 获取本地缓存
 * @param key 键名
 * @returns key 对应的内容
 */
export function getStorage(key: string) {
  return uni.getStorageSync(key)
}

/**
 * 删除本地缓存
 * @param key 键名
 */
export function removeStorage(key: string) {
  return uni.removeStorageSync(key)
}
