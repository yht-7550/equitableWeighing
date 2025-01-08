import type { VitePluginUniOptions } from '@dcloudio/vite-plugin-uni'
import type { ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import process from 'node:process'
import * as uni from '@dcloudio/vite-plugin-uni'
import commonjs from '@rollup/plugin-commonjs'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { loadEnv } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { version } from './package.json'

process.env.APP_VERSION = version

const UniPlugin = (uni.default as any).default as (
  rawOption?: VitePluginUniOptions
) => Plugin[]

// https://vitejs.dev/config/
function viteConfig({ mode }: ConfigEnv): UserConfig {
  const {
    VITE_SERVICE_ENV,
  } = loadEnv(mode, process.cwd())

  if (mode === 'production') {
    console.log('vite is running in mode: ', VITE_SERVICE_ENV)
  }

  return {
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    define: {},
    plugins: [
      UniPlugin(),
      Inspect({
        outputDir: '.vite-inspect',
      }),
      UnoCSS(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ['vue', 'uni-app', 'pinia'],
        // dts: true,
        // vueTemplate: true,
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api', 'color-functions'],
        },
      },
      postcss: {
        plugins: [],
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        plugins: [
          commonjs({
            transformMixedEsModules: true,
          }),
        ],
      },
    },
  }
}

export default viteConfig
