import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ServerUrlCopy from 'vite-plugin-url-copy' // shell 显示开发地址和预览二维码
import progress from 'vite-plugin-progress' // vite 打包进度插件
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import' // element plus 按需引入
import EslintPlugin from 'vite-plugin-eslint' // vite eslint 格式化插件
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite' // i18n 预编译
import { viteMockServe } from 'vite-plugin-mock' // mock 服务
import UnoCSS from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer' // vite打包视图分析


// https://vitejs.dev/config/
const root = process.cwd()

function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'
  // 根据构建脚本中环境变量参数提取环境变量
  if (!isBuild) {
    env = loadEnv(process.argv[3] === '--mode' ? process.argv[4] : process.argv[3], root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue({
        script: {
          // 开启defineModel
          defineModel: true
        },
        template: {
          compilerOptions: {
            isCustomElement: tag => /^micro-app/.test(tag)
          }
        }
      }),
      vueJsx(),
      ServerUrlCopy(),
      progress(),
      // 是否全量引入 element plus
      env.VITE_USE_ALL_ELEMENT_PLUS_STYLE === 'false'
        ? createStyleImportPlugin({
          resolves: [ElementPlusResolve()],
          libs: [
            {
              libraryName: 'element-plus',
              esModule: true,
              resolveStyle: (name) => {
                if (name === 'click-outside') {
                  return ''
                }
                return `element-plus/es/components/${name.replace(/^el-/, '')}/style/css`
              }
            }
          ]
        })
        : undefined,
      // eslint 格式化
      EslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      // i18n 预编译
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'src/locales/**')]
      }),
      // 是否开启 Mock 服务
      env.VITE_USE_MOCK === 'true'
        ? viteMockServe({
          ignore: /^\_/,
          mockPath: 'mock',
          localEnabled: !isBuild,
          prodEnabled: isBuild,
          injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer'

          setupProdMockServer()
          `
        })
        : undefined,
      UnoCSS()
    ],
    // css 配置
    css: {
      preprocessorOptions: {
        // 引入 less 全局变量
        less: {
          additionalData: '@import "./src/styles/variables.module.less";',
          javascriptEnabled: true
        }
      }
    },
    // 构建选项
    esbuild: {
      pure: env.VITE_DROP_CONSOLE === 'true' ? ['console.log'] : undefined,
      drop: env.VITE_DROP_DEBUGGER === 'true' ? ['debugger'] : undefined
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      target: 'es2015',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true',
      // brotliSize: false,
      rollupOptions: {
        plugins: env.VITE_USE_BUNDLE_ANALYZER === 'true' ? [visualizer()] : undefined,
        // 拆包
        output: {
          manualChunks: {
            'vue-chunks': ['vue', 'vue-router', 'pinia', 'vue-i18n'],
            'element-plus': ['element-plus'],
          }
        }
      },
      cssCodeSplit: !(env.VITE_USE_CSS_SPLIT === 'false')
    },
    server: {
      port: 1000, // 自定义端口号  
      fs: {
        strict: false
      },
      open: true,
    },

    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'vue-types',
        'element-plus/es/locale/lang/zh-cn',
        'element-plus/es/locale/lang/en',
        'axios'
      ]
    }
  }
}
