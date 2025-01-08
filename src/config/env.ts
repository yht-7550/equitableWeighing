interface ServiceEnv {
  baseUrl: string
}

const serviceEnv = {
  dev: {
    baseUrl: 'http://127.0.0.1:4523/m1/1548153-3145865-default',
  },
}

/**
 * 获取当前环境模式下的请求服务的配置
 * @param env 环境
 */
export const getServiceEnvConfig = (env: ImportMetaEnv) => {
  const { VITE_SERVICE_ENV = 'dev' } = env

  console.log('👀 当前API环境：', VITE_SERVICE_ENV)

  const config = serviceEnv[VITE_SERVICE_ENV]

  return config as ServiceEnv
}
