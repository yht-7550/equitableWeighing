import { useHttp } from '@/service'

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return useHttp.post({
    url: '/index/getUserInfo',
  })
}
