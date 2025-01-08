interface KeyChainItem {
  username: string
  password: string
  ifRemember: boolean
}

interface KeyChain {
  [key: string]: KeyChainItem
}

interface UserInfo {
  name: string
  token: string
}

export const useUserStore = defineStore('user', () => {
  const ifLogin = ref(false)
  const token = ref('')
  const userInfo = ref<UserInfo>()
  const keyChains = ref<KeyChain>()

  const setToken = (_token: string) => {
    token.value = _token
    ifLogin.value = true
  }

  const setUserInfo = (_userInfo: UserInfo) => {
    userInfo.value = _userInfo
  }

  const setKeyChain = (loginParams: KeyChainItem, ifRemember: boolean) => {
    const keyChain = {
      username: loginParams.username,
      ifRemember,
      password: ifRemember ? loginParams.password : '',
    }
    keyChains.value[loginParams.username] = keyChain
  }

  const logOut = () => {
    token.value = ''
    ifLogin.value = false
    userInfo.value = null
  }

  return {
    token,
    ifLogin,
    setToken,
    setUserInfo,
    setKeyChain,
    logOut,
  }
})
