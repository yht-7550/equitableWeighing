export function getEnv(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = 'dev' } = env
  return VITE_SERVICE_ENV
}
