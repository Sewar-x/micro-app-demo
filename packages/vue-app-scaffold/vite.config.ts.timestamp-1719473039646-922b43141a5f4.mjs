// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { loadEnv } from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite@5.2.12_@types+node@20.12.5_less@4.2.0_terser@5.31.1/node_modules/vite/dist/node/index.js";

// build/utils.ts
import dotenv from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/dotenv@16.4.5/node_modules/dotenv/lib/main.js";
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}
function buildAssetsFile(chunkInfo, ASSETS_DIR = "") {
  if (chunkInfo.name?.match(/\.(png|svg|jpg|jpeg|gif)$/i) !== null) {
    return ASSETS_DIR + "/images/[name]-[hash].[ext]";
  } else {
    return ASSETS_DIR + "/[ext]/[name]-[hash].[ext]";
  }
}
function buildChunkFile(chunkInfo, ASSETS_DIR = "") {
  const fileName = chunkInfo.name?.replace("-legacy", "");
  return ASSETS_DIR + "/js/" + fileName + "/[name]-[hash].js";
}

// build/vite/proxy.ts
var httpsRE = /^http:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret["^/" + prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path2) => path2.replace(new RegExp(`^/${prefix}`), ""),
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// vite.config.ts
import { visualizer } from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.18.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

// build/vite/plugin/index.ts
import vue from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.12_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.12_vue@3.4.21/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import legacy from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/@vitejs+plugin-legacy@2.3.0_terser@5.31.1_vite@5.2.12/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import progress from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite-plugin-progress@0.0.7_vite@5.2.12/node_modules/vite-plugin-progress/dist/index.mjs";
import UnoCSS from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/unocss@0.60.4_postcss@8.4.38_rollup@4.18.0_vite@5.2.12/node_modules/unocss/dist/vite.mjs";
import { ViteEjsPlugin } from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite-plugin-ejs@1.7.0_vite@5.2.12/node_modules/vite-plugin-ejs/index.js";

// build/vite/plugin/element.ts
import { createStyleImportPlugin, ElementPlusResolve } from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite-plugin-style-import@2.0.0_vite@5.2.12/node_modules/vite-plugin-style-import/dist/index.mjs";
function configElementPlugin() {
  return createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    libs: [
      {
        libraryName: "element-plus",
        esModule: true,
        resolveStyle: (name) => {
          if (name === "click-outside") {
            return "";
          }
          return `element-plus/es/components/${name.replace(/^el-/, "")}/style/css`;
        }
      }
    ]
  });
}

// build/vite/plugin/autoImport.ts
import AutoImport from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/unplugin-auto-import@0.11.4_rollup@4.18.0/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/unplugin-vue-components@0.22.12_rollup@4.18.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.mjs";
function configAutoImportPlugin() {
  const autoImportPlugin = AutoImport({
    dts: false,
    resolvers: [ElementPlusResolver()]
  });
  return autoImportPlugin;
}

// build/vite/plugin/svgSprite.ts
import { createSvgIconsPlugin } from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.12/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
function configSvgIconsPlugin(isBuild) {
  const svgIconPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild,
    // default
    symbolId: "icon-[dir]-[name]"
  });
  return svgIconPlugin;
}

// build/vite/plugin/imagemin.ts
import viteImagemin from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite-plugin-imagemin@0.6.1_vite@5.2.12/node_modules/vite-plugin-imagemin/dist/index.mjs";
function configImageminPlugin() {
  const plugin = viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false
    },
    optipng: {
      optimizationLevel: 7
    },
    mozjpeg: {
      quality: 20
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4
    },
    svgo: {
      plugins: [
        {
          name: "removeViewBox"
        },
        {
          name: "removeEmptyAttrs",
          active: false
        }
      ]
    }
  });
  return plugin;
}

// build/vite/plugin/compress.ts
import compressPlugin from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.2.12/node_modules/vite-plugin-compression/dist/index.mjs";
function configCompressPlugin(compress, deleteOriginFile = false) {
  const compressList = compress.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      compressPlugin({
        ext: ".gz",
        deleteOriginFile
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      compressPlugin({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile
      })
    );
  }
  return plugins;
}

// build/vite/plugin/mock.ts
import { viteMockServe } from "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/node_modules/.pnpm/vite-plugin-mock@3.0.2_esbuild@0.21.5_mockjs@1.1.0_vite@5.2.12/node_modules/vite-plugin-mock/dist/index.mjs";
function configMockPlugin(isBuild) {
  const viteMockPlugin = viteMockServe({
    // Set the folder where the mock .ts file is stored
    mockPath: "mock",
    // After opening, the ts file module can be read. Note that you will not be able to monitor .js files after opening.
    supportTs: true,
    // If watchFiles:true, the file changes in the folder will be monitored. And synchronize to the request result in real time
    watchFiles: true,
    // Set whether to enable the local mock .ts file, do not open it in the production environment
    localEnabled: !isBuild,
    // Set whether to enable mock function for packaging
    prodEnabled: !isBuild
  });
  return viteMockPlugin;
}

// build/vite/plugin/index.ts
function createVitePlugin(viteEnv, isBuild) {
  const {
    VITE_APP_TITLE,
    VITE_LEGACY,
    VITE_USE_MOCK,
    VITE_USE_IMAGEMIN,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_ALL_ELEMENT_PLUS_STYLE,
    VITE_USE_MICRO_APP,
    VITE_USE_UNOCSS
  } = viteEnv;
  const vitePlugins = [
    vue({
      script: {
        // 开启defineModel
        defineModel: true
      },
      template: {
        compilerOptions: VITE_USE_MICRO_APP ? {
          isCustomElement: (tag) => /^micro-app/.test(tag)
        } : {}
      }
    }),
    vueJsx(),
    progress(),
    ViteEjsPlugin({
      title: VITE_APP_TITLE
    })
  ];
  VITE_LEGACY && vitePlugins.push(legacy());
  !VITE_USE_ALL_ELEMENT_PLUS_STYLE && vitePlugins.push(configElementPlugin());
  !VITE_USE_ALL_ELEMENT_PLUS_STYLE && vitePlugins.push(configAutoImportPlugin());
  VITE_USE_UNOCSS && vitePlugins.push(UnoCSS());
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));
  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }
  return vitePlugins;
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///D:/MyData/TCL/RDM-MicroApp/packages/vue-app-scaffold/vite.config.ts";
var url = __vite_injected_original_import_meta_url;
var root = process.cwd();
var vite_config_default = ({ command, mode }) => {
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const isBuild = command === "build";
  const {
    VITE_BASE_PATH,
    VITE_PROXY,
    VITE_DROP_CONSOLE,
    VITE_DROP_DEBUGGER,
    VITE_OUT_DIR,
    VITE_ASSETS_DIR,
    VITE_SOURCEMAP,
    VITE_USE_BUNDLE_ANALYZER,
    VITE_USE_CSS_SPLIT,
    VITE_DEV_PORT
  } = viteEnv;
  return {
    base: VITE_BASE_PATH,
    plugins: createVitePlugin(viteEnv, isBuild),
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
      pure: VITE_DROP_CONSOLE ? ["console.log"] : void 0,
      drop: VITE_DROP_DEBUGGER ? ["debugger"] : void 0
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", url)),
        // 源文件目录别名
        "#": fileURLToPath(new URL("./types", url)),
        // 类型定义文件目录别名
        $locale: fileURLToPath(new URL("./src/plugins/locales/setupLocale.ts", url)),
        // 多语言翻译函数别名
        $store: fileURLToPath(new URL("./src/stores/modules", url)),
        // Store 文件别名
        $styleVariable: fileURLToPath(new URL("./src/style/variable.module.less", url))
        // 全局样式文件别名
      }
    },
    build: {
      target: "esnext",
      outDir: VITE_OUT_DIR || "dist",
      sourcemap: VITE_SOURCEMAP,
      // brotliSize: false,
      rollupOptions: {
        plugins: VITE_USE_BUNDLE_ANALYZER ? [visualizer()] : void 0,
        // 拆包
        output: {
          chunkFileNames: (chunkInfo) => buildChunkFile(chunkInfo, VITE_ASSETS_DIR),
          entryFileNames: "[name]-[hash].js",
          assetFileNames: (chunkInfo) => buildAssetsFile(chunkInfo, VITE_ASSETS_DIR),
          manualChunks: {
            "vue-chunks": ["vue", "vue-router", "pinia", "vue-i18n"],
            "element-plus": ["element-plus"]
          }
        }
      },
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE
        }
      },
      cssCodeSplit: VITE_USE_CSS_SPLIT
    },
    server: {
      port: VITE_DEV_PORT,
      // 自定义端口号  
      fs: {
        strict: false
      },
      open: true,
      cors: true,
      hmr: true,
      // 开启热更新
      proxy: createProxy(VITE_PROXY)
    },
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "vue-types",
        "element-plus/es/locale/lang/zh-cn",
        "element-plus/es/locale/lang/en",
        "axios"
      ]
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wcm94eS50cyIsICJidWlsZC92aXRlL3BsdWdpbi9pbmRleC50cyIsICJidWlsZC92aXRlL3BsdWdpbi9lbGVtZW50LnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL2F1dG9JbXBvcnQudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vc3ZnU3ByaXRlLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL2ltYWdlbWluLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL2NvbXByZXNzLnRzIiwgImJ1aWxkL3ZpdGUvcGx1Z2luL21vY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9NeURhdGEvVENML1JETS1NaWNyb0FwcC9wYWNrYWdlcy92dWUtYXBwLXNjYWZmb2xkL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcbmltcG9ydCB0eXBlIHsgVXNlckNvbmZpZywgQ29uZmlnRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHdyYXBwZXJFbnYsIGJ1aWxkQXNzZXRzRmlsZSwgYnVpbGRDaHVua0ZpbGUgfSBmcm9tIFwiLi9idWlsZC91dGlsc1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVQcm94eSB9IGZyb20gXCIuL2J1aWxkL3ZpdGUvcHJveHlcIjtcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcicgLy8gdml0ZVx1NjI1M1x1NTMwNVx1ODlDNlx1NTZGRVx1NTIwNlx1Njc5MFxyXG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2luIH0gZnJvbSBcIi4vYnVpbGQvdml0ZS9wbHVnaW5cIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmNvbnN0IHVybCA9IGltcG9ydC5tZXRhLnVybDtcclxuLy8gcHJvY2Vzcy5jd2QoKVx1NjVCOVx1NkNENVx1OEZENFx1NTZERU5vZGUuanNcdThGREJcdTdBMEJcdTc2ODRcdTVGNTNcdTUyNERcdTVERTVcdTRGNUNcdTc2RUVcdTVGNTVcdTMwMDJcclxuY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh7IGNvbW1hbmQsIG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcblxyXG4gIC8vIFx1NTJBMFx1OEY3RCByb290IFx1NEUyRFx1NzY4NCAuZW52IFx1NjU4N1x1NEVGNlx1MzAwMlx1NjgzOVx1NjM2RVx1NjI2N1x1ODg0Q1x1NTQ3RFx1NEVFNFx1NzY4NFx1NzNBRlx1NTg4M1x1N0M3Qlx1NTc4Qlx1ODNCN1x1NTNENlx1NTNEOFx1OTFDRlxyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdCk7XHJcbiAgLy8gbG9hZEVudlx1OEJGQlx1NTNENlx1NzY4NFx1NUUwM1x1NUMxNFx1N0M3Qlx1NTc4Qlx1NjYyRlx1NEUwMFx1NEUyQVx1NUI1N1x1N0IyNlx1NEUzMlx1MzAwMlx1OEZEOVx1NEUyQVx1NTFGRFx1NjU3MFx1NTNFRlx1NEVFNVx1OEY2Q1x1NjM2Mlx1NEUzQVx1NUUwM1x1NUMxNFx1N0M3Qlx1NTc4QlxyXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudik7XHJcbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09IFwiYnVpbGRcIjtcclxuICBjb25zdCB7XHJcbiAgICBWSVRFX0JBU0VfUEFUSCxcclxuICAgIFZJVEVfUFJPWFksXHJcbiAgICBWSVRFX0RST1BfQ09OU09MRSxcclxuICAgIFZJVEVfRFJPUF9ERUJVR0dFUixcclxuICAgIFZJVEVfT1VUX0RJUixcclxuICAgIFZJVEVfQVNTRVRTX0RJUixcclxuICAgIFZJVEVfU09VUkNFTUFQLFxyXG4gICAgVklURV9VU0VfQlVORExFX0FOQUxZWkVSLFxyXG4gICAgVklURV9VU0VfQ1NTX1NQTElULFxyXG4gICAgVklURV9ERVZfUE9SVCxcclxuICB9ID0gdml0ZUVudjtcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogVklURV9CQVNFX1BBVEgsXHJcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2luKHZpdGVFbnYsIGlzQnVpbGQpLFxyXG4gICAgLy8gY3NzIFx1OTE0RFx1N0Y2RVxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAvLyBcdTVGMTVcdTUxNjUgbGVzcyBcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcclxuICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGVzLm1vZHVsZS5sZXNzXCI7JyxcclxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gXHU2Nzg0XHU1RUZBXHU5MDA5XHU5ODc5XHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgIHB1cmU6IFZJVEVfRFJPUF9DT05TT0xFID8gWydjb25zb2xlLmxvZyddIDogdW5kZWZpbmVkLFxyXG4gICAgICBkcm9wOiBWSVRFX0RST1BfREVCVUdHRVIgPyBbJ2RlYnVnZ2VyJ10gOiB1bmRlZmluZWRcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIHVybCkpLCAvLyBcdTZFOTBcdTY1ODdcdTRFRjZcdTc2RUVcdTVGNTVcdTUyMkJcdTU0MERcclxuICAgICAgICBcIiNcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi90eXBlc1wiLCB1cmwpKSwgLy8gXHU3QzdCXHU1NzhCXHU1QjlBXHU0RTQ5XHU2NTg3XHU0RUY2XHU3NkVFXHU1RjU1XHU1MjJCXHU1NDBEXHJcbiAgICAgICAgJGxvY2FsZTogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmMvcGx1Z2lucy9sb2NhbGVzL3NldHVwTG9jYWxlLnRzXCIsIHVybCkpLCAvLyBcdTU5MUFcdThCRURcdThBMDBcdTdGRkJcdThCRDFcdTUxRkRcdTY1NzBcdTUyMkJcdTU0MERcclxuICAgICAgICAkc3RvcmU6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjL3N0b3Jlcy9tb2R1bGVzXCIsIHVybCkpLCAvLyBTdG9yZSBcdTY1ODdcdTRFRjZcdTUyMkJcdTU0MERcclxuICAgICAgICAkc3R5bGVWYXJpYWJsZTogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmMvc3R5bGUvdmFyaWFibGUubW9kdWxlLmxlc3NcIiwgdXJsKSksIC8vIFx1NTE2OFx1NUM0MFx1NjgzN1x1NUYwRlx1NjU4N1x1NEVGNlx1NTIyQlx1NTQwRFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIHRhcmdldDogXCJlc25leHRcIixcclxuICAgICAgb3V0RGlyOiBWSVRFX09VVF9ESVIgfHwgJ2Rpc3QnLFxyXG4gICAgICBzb3VyY2VtYXA6IFZJVEVfU09VUkNFTUFQLFxyXG4gICAgICAvLyBicm90bGlTaXplOiBmYWxzZSxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFZJVEVfVVNFX0JVTkRMRV9BTkFMWVpFUj8gW3Zpc3VhbGl6ZXIoKV0gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgLy8gXHU2MkM2XHU1MzA1XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogKGNodW5rSW5mbzogYW55KSA9PiBidWlsZENodW5rRmlsZShjaHVua0luZm8sIFZJVEVfQVNTRVRTX0RJUiksXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJbbmFtZV0tW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGNodW5rSW5mbzogYW55KSA9PiBidWlsZEFzc2V0c0ZpbGUoY2h1bmtJbmZvLCBWSVRFX0FTU0VUU19ESVIpLFxyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAgICd2dWUtY2h1bmtzJzogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYScsICd2dWUtaTE4biddLFxyXG4gICAgICAgICAgICAnZWxlbWVudC1wbHVzJzogWydlbGVtZW50LXBsdXMnXSxcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pbmlmeTogXCJ0ZXJzZXJcIixcclxuICAgICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgICBrZWVwX2luZmluaXR5OiB0cnVlLFxyXG4gICAgICAgICAgLy8gVXNlZCB0byBkZWxldGUgY29uc29sZSBpbiBwcm9kdWN0aW9uIGVudmlyb25tZW50XHJcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IFZJVEVfRFJPUF9DT05TT0xFLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICAgIGNzc0NvZGVTcGxpdDogVklURV9VU0VfQ1NTX1NQTElUXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IFZJVEVfREVWX1BPUlQsIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1N0FFRlx1NTNFM1x1NTNGNyAgXHJcbiAgICAgIGZzOiB7XHJcbiAgICAgICAgc3RyaWN0OiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICBjb3JzOiB0cnVlLFxyXG4gICAgICBobXI6IHRydWUsIC8vIFx1NUYwMFx1NTQyRlx1NzBFRFx1NjZGNFx1NjVCMFxyXG4gICAgICBwcm94eTogY3JlYXRlUHJveHkoVklURV9QUk9YWSksXHJcbiAgICB9LFxyXG5cclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICd2dWUtdHlwZXMnLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvbG9jYWxlL2xhbmcvemgtY24nLFxyXG4gICAgICAgICdlbGVtZW50LXBsdXMvZXMvbG9jYWxlL2xhbmcvZW4nLFxyXG4gICAgICAgICdheGlvcydcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXE15RGF0YVxcXFxUQ0xcXFxcUkRNLU1pY3JvQXBwXFxcXHBhY2thZ2VzXFxcXHZ1ZS1hcHAtc2NhZmZvbGRcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXE15RGF0YVxcXFxUQ0xcXFxcUkRNLU1pY3JvQXBwXFxcXHBhY2thZ2VzXFxcXHZ1ZS1hcHAtc2NhZmZvbGRcXFxcYnVpbGRcXFxcdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L015RGF0YS9UQ0wvUkRNLU1pY3JvQXBwL3BhY2thZ2VzL3Z1ZS1hcHAtc2NhZmZvbGQvYnVpbGQvdXRpbHMudHNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBQcmVSZW5kZXJlZEFzc2V0LCBQcmVSZW5kZXJlZENodW5rIH0gZnJvbSBcInJvbGx1cFwiO1xyXG5cclxuLyoqXHJcbiAqICBcdTVDMDYgVklURV8gXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU1QjU3XHU3QjI2XHU0RTMyXHU1MDNDXHU4RjZDXHU0RTNBXHU1QkY5XHU1RTk0XHU3Njg0XHU3QzdCXHU1NzhCXHJcbiAqKi8gXHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuICBjb25zdCByZXQ6IGFueSA9IHt9O1xyXG5cclxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcclxuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XHJcbiAgICByZWFsTmFtZSA9IHJlYWxOYW1lID09PSBcInRydWVcIiA/IHRydWUgOiByZWFsTmFtZSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiByZWFsTmFtZTtcclxuXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gXCJWSVRFX1BPUlRcIikge1xyXG4gICAgICByZWFsTmFtZSA9IE51bWJlcihyZWFsTmFtZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZW52TmFtZSA9PT0gXCJWSVRFX1BST1hZXCIgJiYgcmVhbE5hbWUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICByZWFsTmFtZSA9IEpTT04ucGFyc2UocmVhbE5hbWUucmVwbGFjZSgvJy9nLCAnXCInKSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcmVhbE5hbWUgPSBcIlwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXRbZW52TmFtZV0gPSByZWFsTmFtZTtcclxuICAgIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlYWxOYW1lID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgIHByb2Nlc3MuZW52W2Vudk5hbWVdID0gSlNPTi5zdHJpbmdpZnkocmVhbE5hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBc3NldHNGaWxlKGNodW5rSW5mbzogUHJlUmVuZGVyZWRBc3NldCwgQVNTRVRTX0RJUjogc3RyaW5nID0gJycpIHtcclxuICBpZiAoY2h1bmtJbmZvLm5hbWU/Lm1hdGNoKC9cXC4ocG5nfHN2Z3xqcGd8anBlZ3xnaWYpJC9pKSAhPT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIEFTU0VUU19ESVIgKyBcIi9pbWFnZXMvW25hbWVdLVtoYXNoXS5bZXh0XVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gQVNTRVRTX0RJUiArIFwiL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF1cIjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZENodW5rRmlsZShjaHVua0luZm86IFByZVJlbmRlcmVkQ2h1bmssIEFTU0VUU19ESVI6IHN0cmluZyA9ICcnKSB7XHJcbiAgY29uc3QgZmlsZU5hbWUgPSBjaHVua0luZm8ubmFtZT8ucmVwbGFjZShcIi1sZWdhY3lcIiwgXCJcIik7XHJcbiAgcmV0dXJuIEFTU0VUU19ESVIgKyBcIi9qcy9cIiArIGZpbGVOYW1lICsgXCIvW25hbWVdLVtoYXNoXS5qc1wiO1xyXG59XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU1RjUzXHU1MjREXHU3M0FGXHU1ODgzXHU0RTBCXHU3NTFGXHU2NTQ4XHU3Njg0XHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDb25mRmlsZXMoKSB7XHJcbiAgY29uc3Qgc2NyaXB0ID0gcHJvY2Vzcy5lbnYubnBtX2xpZmVjeWNsZV9zY3JpcHQ7XHJcbiAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCgnLS1tb2RlIChbYS16X1xcXFxkXSspJyk7XHJcbiAgY29uc3QgcmVzdWx0ID0gcmVnLmV4ZWMoc2NyaXB0IGFzIHN0cmluZykgYXMgYW55O1xyXG4gIGlmIChyZXN1bHQpIHtcclxuICAgIGNvbnN0IG1vZGUgPSByZXN1bHRbMV0gYXMgc3RyaW5nO1xyXG4gICAgcmV0dXJuIFsnLmVudicsIGAuZW52LiR7bW9kZX1gXTtcclxuICB9XHJcbiAgcmV0dXJuIFsnLmVudicsICcuZW52LnByb2R1Y3Rpb24nXTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGVudmlyb25tZW50IHZhcmlhYmxlcyBzdGFydGluZyB3aXRoIHRoZSBzcGVjaWZpZWQgcHJlZml4XHJcbiAqIEBwYXJhbSBtYXRjaCBwcmVmaXhcclxuICogQHBhcmFtIGNvbmZGaWxlcyBleHRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnZDb25maWcobWF0Y2ggPSAnVklURV9HTE9CXycsIGNvbmZGaWxlcyA9IGdldENvbmZGaWxlcygpKSB7XHJcbiAgbGV0IGVudkNvbmZpZyA9IHt9O1xyXG4gIGNvbmZGaWxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBlbnYgPSBkb3RlbnYucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBpdGVtKSkpO1xyXG4gICAgICBlbnZDb25maWcgPSB7IC4uLmVudkNvbmZpZywgLi4uZW52IH07XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGluIHBhcnNpbmcgJHtpdGVtfWAsIGUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYF4oJHttYXRjaH0pYCk7XHJcbiAgT2JqZWN0LmtleXMoZW52Q29uZmlnKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgIGlmICghcmVnLnRlc3Qoa2V5KSkge1xyXG4gICAgICBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KGVudkNvbmZpZywga2V5KTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gZW52Q29uZmlnO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHVzZXIgcm9vdCBkaXJlY3RvcnlcclxuICogQHBhcmFtIGRpciBmaWxlIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290UGF0aCguLi5kaXI6IHN0cmluZ1tdKSB7XHJcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAuLi5kaXIpO1xyXG59XHJcblxyXG4vKipcclxuICogXHU4M0I3XHU1M0Q2XHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU1M0Q4XHU5MUNGXHU1NDBEXHJcbiAqIEBwYXJhbSBlbnZcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDb25maWdGaWxlTmFtZSA9IChlbnY6IFJlY29yZDxzdHJpbmcsIGFueT4pID0+IHtcclxuICByZXR1cm4gYF9fUFJPRFVDVElPTl9fJHtlbnYuVklURV9BUFBfVElUTEUgfHwgXCJfX0FQUFwifV9fQ09ORl9fYFxyXG4gICAgLnRvVXBwZXJDYXNlKClcclxuICAgIC5yZXBsYWNlKC9cXHMvZywgXCJcIik7XHJcbn07XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcTXlEYXRhXFxcXFRDTFxcXFxSRE0tTWljcm9BcHBcXFxccGFja2FnZXNcXFxcdnVlLWFwcC1zY2FmZm9sZFxcXFxidWlsZFxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXGJ1aWxkXFxcXHZpdGVcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L015RGF0YS9UQ0wvUkRNLU1pY3JvQXBwL3BhY2thZ2VzL3Z1ZS1hcHAtc2NhZmZvbGQvYnVpbGQvdml0ZS9wcm94eS50c1wiO2ltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSBcInZpdGVcIjtcclxuXHJcbnR5cGUgUHJveHlJdGVtID0gW3N0cmluZywgc3RyaW5nXTtcclxuXHJcbnR5cGUgUHJveHlMaXN0ID0gUHJveHlJdGVtW107XHJcblxyXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz47XHJcblxyXG5jb25zdCBodHRwc1JFID0gL15odHRwOlxcL1xcLy87XHJcblxyXG4vKipcclxuICogXHU3NTFGXHU2MjEwXHU0RUUzXHU3NDA2XHJcbiAqIEBwYXJhbSBsaXN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcclxuICBjb25zdCByZXQ6IFByb3h5VGFyZ2V0TGlzdCA9IHt9O1xyXG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XHJcbiAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldCk7XHJcblxyXG4gICAgcmV0W1wiXi9cIiArIHByZWZpeF0gPSB7XHJcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgIHdzOiB0cnVlLFxyXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF5cXC8ke3ByZWZpeH1gKSwgXCJcIiksXHJcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSksXHJcbiAgICB9O1xyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcTXlEYXRhXFxcXFRDTFxcXFxSRE0tTWljcm9BcHBcXFxccGFja2FnZXNcXFxcdnVlLWFwcC1zY2FmZm9sZFxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTXlEYXRhXFxcXFRDTFxcXFxSRE0tTWljcm9BcHBcXFxccGFja2FnZXNcXFxcdnVlLWFwcC1zY2FmZm9sZFxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTXlEYXRhL1RDTC9SRE0tTWljcm9BcHAvcGFja2FnZXMvdnVlLWFwcC1zY2FmZm9sZC9idWlsZC92aXRlL3BsdWdpbi9pbmRleC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcclxuaW1wb3J0IGxlZ2FjeSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tbGVnYWN5XCI7XHJcbmltcG9ydCBwcm9ncmVzcyBmcm9tICd2aXRlLXBsdWdpbi1wcm9ncmVzcycgLy8gdml0ZSBcdTYyNTNcdTUzMDVcdThGREJcdTVFQTZcdTYzRDJcdTRFRjZcclxuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHsgVml0ZUVqc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWVqcydcclxuaW1wb3J0IHsgY29uZmlnRWxlbWVudFBsdWdpbiB9IGZyb20gXCIuL2VsZW1lbnRcIjtcclxuaW1wb3J0IHsgY29uZmlnQXV0b0ltcG9ydFBsdWdpbiB9IGZyb20gXCIuL2F1dG9JbXBvcnRcIjtcclxuaW1wb3J0IHsgY29uZmlnU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwiLi9zdmdTcHJpdGVcIjtcclxuaW1wb3J0IHsgY29uZmlnSW1hZ2VtaW5QbHVnaW4gfSBmcm9tIFwiLi9pbWFnZW1pblwiO1xyXG5pbXBvcnQgeyBjb25maWdDb21wcmVzc1BsdWdpbiB9IGZyb20gXCIuL2NvbXByZXNzXCI7XHJcbmltcG9ydCB7IGNvbmZpZ01vY2tQbHVnaW4gfSBmcm9tIFwiLi9tb2NrXCI7XHJcblxyXG4vKipcclxuICogXHU1MjFCXHU1RUZBXHU2M0QyXHU0RUY2XHU2NTcwXHU3RUM0XHJcbiAqIEBwYXJhbSB2aXRlRW52IFx1NzNBRlx1NTg4M1x1OTE0RFx1N0Y2RVx1NTNEOFx1OTFDRlxyXG4gKiBAcGFyYW0gaXNCdWlsZCBcdTY3ODRcdTVFRkFcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcclxuICogQHJldHVybnMgXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbih2aXRlRW52OiBWaXRlRW52LCBpc0J1aWxkOiBib29sZWFuKSB7XHJcbiAgY29uc3Qge1xyXG4gICAgVklURV9BUFBfVElUTEUsXHJcbiAgICBWSVRFX0xFR0FDWSxcclxuICAgIFZJVEVfVVNFX01PQ0ssXHJcbiAgICBWSVRFX1VTRV9JTUFHRU1JTixcclxuICAgIFZJVEVfQlVJTERfQ09NUFJFU1MsXHJcbiAgICBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRSxcclxuICAgIFZJVEVfVVNFX0FMTF9FTEVNRU5UX1BMVVNfU1RZTEUsXHJcbiAgICBWSVRFX1VTRV9NSUNST19BUFAsXHJcbiAgICBWSVRFX1VTRV9VTk9DU1NcclxuICB9ID0gdml0ZUVudjtcclxuXHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcclxuICAgIHZ1ZSh7XHJcbiAgICAgIHNjcmlwdDoge1xyXG4gICAgICAgIC8vIFx1NUYwMFx1NTQyRmRlZmluZU1vZGVsXHJcbiAgICAgICAgZGVmaW5lTW9kZWw6IHRydWVcclxuICAgICAgfSxcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBjb21waWxlck9wdGlvbnM6IFZJVEVfVVNFX01JQ1JPX0FQUCA/IHtcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogdGFnID0+IC9ebWljcm8tYXBwLy50ZXN0KHRhZylcclxuICAgICAgICB9IDoge31cclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHByb2dyZXNzKCksXHJcbiAgICBWaXRlRWpzUGx1Z2luKHtcclxuICAgICAgdGl0bGU6IFZJVEVfQVBQX1RJVExFXHJcbiAgICB9KSxcclxuICBdO1xyXG5cclxuICAvLyBAdml0ZWpzL3BsdWdpbi1sZWdhY3kgXHU1MTdDXHU1QkI5XHU2NUU3XHU2RDRGXHU4OUM4XHU1NjY4XHJcbiAgVklURV9MRUdBQ1kgJiYgdml0ZVBsdWdpbnMucHVzaChsZWdhY3koKSk7XHJcblxyXG4gIC8vIHVucGx1Z2luLXZ1ZS1jb21wb25lbnRzIFx1NjMwOVx1OTcwMFx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NWVsZW1lbnQtcGx1c1xyXG4gICFWSVRFX1VTRV9BTExfRUxFTUVOVF9QTFVTX1NUWUxFICYmIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnRWxlbWVudFBsdWdpbigpKTtcclxuICAhVklURV9VU0VfQUxMX0VMRU1FTlRfUExVU19TVFlMRSAmJiB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ0F1dG9JbXBvcnRQbHVnaW4oKSk7XHJcblxyXG4gIFZJVEVfVVNFX1VOT0NTUyAmJiB2aXRlUGx1Z2lucy5wdXNoKFVub0NTUygpKTtcclxuICBcclxuICAvLyB2aXRlLXBsdWdpbi1zdmctaWNvbnNcclxuICB2aXRlUGx1Z2lucy5wdXNoKGNvbmZpZ1N2Z0ljb25zUGx1Z2luKGlzQnVpbGQpKTtcclxuXHJcbiAgLy8gdml0ZS1wbHVnaW4tbW9ja1xyXG4gIFZJVEVfVVNFX01PQ0sgJiYgdml0ZVBsdWdpbnMucHVzaChjb25maWdNb2NrUGx1Z2luKGlzQnVpbGQpKTtcclxuXHJcblxyXG4gIGlmIChpc0J1aWxkKSB7XHJcbiAgICAvLyB2aXRlLXBsdWdpbi1pbWFnZW1pbiBcdTU2RkVcdTcyNDdcdTUzOEJcdTdGMjlcclxuICAgIFZJVEVfVVNFX0lNQUdFTUlOICYmIHZpdGVQbHVnaW5zLnB1c2goY29uZmlnSW1hZ2VtaW5QbHVnaW4oKSk7XHJcblxyXG4gICAgLy8gcm9sbHVwLXBsdWdpbi1nemlwIFx1NjU4N1x1NEVGNlx1NTM4Qlx1N0YyOVxyXG4gICAgdml0ZVBsdWdpbnMucHVzaChcclxuICAgICAgY29uZmlnQ29tcHJlc3NQbHVnaW4oVklURV9CVUlMRF9DT01QUkVTUywgVklURV9CVUlMRF9DT01QUkVTU19ERUxFVEVfT1JJR0lOX0ZJTEUpLFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB2aXRlUGx1Z2lucztcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXE15RGF0YVxcXFxUQ0xcXFxcUkRNLU1pY3JvQXBwXFxcXHBhY2thZ2VzXFxcXHZ1ZS1hcHAtc2NhZmZvbGRcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXE15RGF0YVxcXFxUQ0xcXFxcUkRNLU1pY3JvQXBwXFxcXHBhY2thZ2VzXFxcXHZ1ZS1hcHAtc2NhZmZvbGRcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cXFxcZWxlbWVudC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTXlEYXRhL1RDTC9SRE0tTWljcm9BcHAvcGFja2FnZXMvdnVlLWFwcC1zY2FmZm9sZC9idWlsZC92aXRlL3BsdWdpbi9lbGVtZW50LnRzXCI7aW1wb3J0IHsgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4sIEVsZW1lbnRQbHVzUmVzb2x2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlLWltcG9ydCcgLy8gZWxlbWVudCBwbHVzIFx1NjMwOVx1OTcwMFx1NUYxNVx1NTE2NVxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnRWxlbWVudFBsdWdpbigpIHtcclxuICByZXR1cm4gY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4oe1xyXG4gICAgcmVzb2x2ZXM6IFtFbGVtZW50UGx1c1Jlc29sdmUoKV0sXHJcbiAgICBsaWJzOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBsaWJyYXJ5TmFtZTogJ2VsZW1lbnQtcGx1cycsXHJcbiAgICAgICAgZXNNb2R1bGU6IHRydWUsXHJcbiAgICAgICAgcmVzb2x2ZVN0eWxlOiAobmFtZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKG5hbWUgPT09ICdjbGljay1vdXRzaWRlJykge1xyXG4gICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBgZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvJHtuYW1lLnJlcGxhY2UoL15lbC0vLCAnJyl9L3N0eWxlL2Nzc2BcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcTXlEYXRhXFxcXFRDTFxcXFxSRE0tTWljcm9BcHBcXFxccGFja2FnZXNcXFxcdnVlLWFwcC1zY2FmZm9sZFxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTXlEYXRhXFxcXFRDTFxcXFxSRE0tTWljcm9BcHBcXFxccGFja2FnZXNcXFxcdnVlLWFwcC1zY2FmZm9sZFxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxhdXRvSW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9NeURhdGEvVENML1JETS1NaWNyb0FwcC9wYWNrYWdlcy92dWUtYXBwLXNjYWZmb2xkL2J1aWxkL3ZpdGUvcGx1Z2luL2F1dG9JbXBvcnQudHNcIjtpbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiO1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0F1dG9JbXBvcnRQbHVnaW4oKSB7XHJcbiAgY29uc3QgYXV0b0ltcG9ydFBsdWdpbiA9IEF1dG9JbXBvcnQoe1xyXG4gICAgZHRzOiBmYWxzZSxcclxuICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgfSk7XHJcbiAgcmV0dXJuIGF1dG9JbXBvcnRQbHVnaW47XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXHN2Z1Nwcml0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTXlEYXRhL1RDTC9SRE0tTWljcm9BcHAvcGFja2FnZXMvdnVlLWFwcC1zY2FmZm9sZC9idWlsZC92aXRlL3BsdWdpbi9zdmdTcHJpdGUudHNcIjtpbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdTdmdJY29uc1BsdWdpbihpc0J1aWxkOiBib29sZWFuKSB7XHJcbiAgY29uc3Qgc3ZnSWNvblBsdWdpbiA9IGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwic3JjL2Fzc2V0cy9pY29uc1wiKV0sXHJcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZCxcclxuICAgIC8vIGRlZmF1bHRcclxuICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCIsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHN2Z0ljb25QbHVnaW47XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXGltYWdlbWluLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9NeURhdGEvVENML1JETS1NaWNyb0FwcC9wYWNrYWdlcy92dWUtYXBwLXNjYWZmb2xkL2J1aWxkL3ZpdGUvcGx1Z2luL2ltYWdlbWluLnRzXCI7aW1wb3J0IHZpdGVJbWFnZW1pbiBmcm9tIFwidml0ZS1wbHVnaW4taW1hZ2VtaW5cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdJbWFnZW1pblBsdWdpbigpIHtcclxuICBjb25zdCBwbHVnaW4gPSB2aXRlSW1hZ2VtaW4oe1xyXG4gICAgZ2lmc2ljbGU6IHtcclxuICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXHJcbiAgICAgIGludGVybGFjZWQ6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIG9wdGlwbmc6IHtcclxuICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXHJcbiAgICB9LFxyXG4gICAgbW96anBlZzoge1xyXG4gICAgICBxdWFsaXR5OiAyMCxcclxuICAgIH0sXHJcbiAgICBwbmdxdWFudDoge1xyXG4gICAgICBxdWFsaXR5OiBbMC44LCAwLjldLFxyXG4gICAgICBzcGVlZDogNCxcclxuICAgIH0sXHJcbiAgICBzdmdvOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcInJlbW92ZVZpZXdCb3hcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwicmVtb3ZlRW1wdHlBdHRyc1wiLFxyXG4gICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSxcclxuICB9KTtcclxuICByZXR1cm4gcGx1Z2luO1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcTXlEYXRhXFxcXFRDTFxcXFxSRE0tTWljcm9BcHBcXFxccGFja2FnZXNcXFxcdnVlLWFwcC1zY2FmZm9sZFxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcTXlEYXRhXFxcXFRDTFxcXFxSRE0tTWljcm9BcHBcXFxccGFja2FnZXNcXFxcdnVlLWFwcC1zY2FmZm9sZFxcXFxidWlsZFxcXFx2aXRlXFxcXHBsdWdpblxcXFxjb21wcmVzcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTXlEYXRhL1RDTC9SRE0tTWljcm9BcHAvcGFja2FnZXMvdnVlLWFwcC1zY2FmZm9sZC9idWlsZC92aXRlL3BsdWdpbi9jb21wcmVzcy50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IGNvbXByZXNzUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ0NvbXByZXNzUGx1Z2luKFxyXG4gIGNvbXByZXNzOiBcImd6aXBcIiB8IFwiYnJvdGxpXCIgfCBcIm5vbmVcIixcclxuICBkZWxldGVPcmlnaW5GaWxlID0gZmFsc2UsXHJcbik6IFBsdWdpbiB8IFBsdWdpbltdIHtcclxuICBjb25zdCBjb21wcmVzc0xpc3QgPSBjb21wcmVzcy5zcGxpdChcIixcIik7XHJcblxyXG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbltdID0gW107XHJcblxyXG4gIGlmIChjb21wcmVzc0xpc3QuaW5jbHVkZXMoXCJnemlwXCIpKSB7XHJcbiAgICBwbHVnaW5zLnB1c2goXHJcbiAgICAgIGNvbXByZXNzUGx1Z2luKHtcclxuICAgICAgICBleHQ6IFwiLmd6XCIsXHJcbiAgICAgICAgZGVsZXRlT3JpZ2luRmlsZSxcclxuICAgICAgfSksXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImJyb3RsaVwiKSkge1xyXG4gICAgcGx1Z2lucy5wdXNoKFxyXG4gICAgICBjb21wcmVzc1BsdWdpbih7XHJcbiAgICAgICAgZXh0OiBcIi5iclwiLFxyXG4gICAgICAgIGFsZ29yaXRobTogXCJicm90bGlDb21wcmVzc1wiLFxyXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGUsXHJcbiAgICAgIH0pLFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHBsdWdpbnM7XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxNeURhdGFcXFxcVENMXFxcXFJETS1NaWNyb0FwcFxcXFxwYWNrYWdlc1xcXFx2dWUtYXBwLXNjYWZmb2xkXFxcXGJ1aWxkXFxcXHZpdGVcXFxccGx1Z2luXFxcXG1vY2sudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L015RGF0YS9UQ0wvUkRNLU1pY3JvQXBwL3BhY2thZ2VzL3Z1ZS1hcHAtc2NhZmZvbGQvYnVpbGQvdml0ZS9wbHVnaW4vbW9jay50c1wiOy8qKlxyXG4gKiB2aXRlLXBsdWdpbi1tb2NrOlxyXG4gKiBQcm92aWRlIGxvY2FsIGFuZCBwcm9kIG1vY2tzIGZvciB2aXRlLlxyXG4gKiB1cmw6IGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL3ZpdGUtcGx1Z2luLW1vY2tcclxuICovXHJcblxyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2tcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWdNb2NrUGx1Z2luKGlzQnVpbGQ6IGJvb2xlYW4pIHtcclxuICBjb25zdCB2aXRlTW9ja1BsdWdpbiA9IHZpdGVNb2NrU2VydmUoe1xyXG4gICAgLy8gU2V0IHRoZSBmb2xkZXIgd2hlcmUgdGhlIG1vY2sgLnRzIGZpbGUgaXMgc3RvcmVkXHJcbiAgICBtb2NrUGF0aDogXCJtb2NrXCIsXHJcbiAgICAvLyBBZnRlciBvcGVuaW5nLCB0aGUgdHMgZmlsZSBtb2R1bGUgY2FuIGJlIHJlYWQuIE5vdGUgdGhhdCB5b3Ugd2lsbCBub3QgYmUgYWJsZSB0byBtb25pdG9yIC5qcyBmaWxlcyBhZnRlciBvcGVuaW5nLlxyXG4gICAgc3VwcG9ydFRzOiB0cnVlLFxyXG4gICAgLy8gSWYgd2F0Y2hGaWxlczp0cnVlLCB0aGUgZmlsZSBjaGFuZ2VzIGluIHRoZSBmb2xkZXIgd2lsbCBiZSBtb25pdG9yZWQuIEFuZCBzeW5jaHJvbml6ZSB0byB0aGUgcmVxdWVzdCByZXN1bHQgaW4gcmVhbCB0aW1lXHJcbiAgICB3YXRjaEZpbGVzOiB0cnVlLFxyXG4gICAgLy8gU2V0IHdoZXRoZXIgdG8gZW5hYmxlIHRoZSBsb2NhbCBtb2NrIC50cyBmaWxlLCBkbyBub3Qgb3BlbiBpdCBpbiB0aGUgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFxyXG4gICAgbG9jYWxFbmFibGVkOiAhaXNCdWlsZCxcclxuICAgIC8vIFNldCB3aGV0aGVyIHRvIGVuYWJsZSBtb2NrIGZ1bmN0aW9uIGZvciBwYWNrYWdpbmdcclxuICAgIHByb2RFbmFibGVkOiAhaXNCdWlsZCxcclxuICB9KTtcclxuICByZXR1cm4gdml0ZU1vY2tQbHVnaW47XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixTQUFTLGVBQWUsV0FBVztBQUU3WCxTQUFTLGVBQWU7OztBQ0F4QixPQUFPLFlBQVk7QUFPWixTQUFTLFdBQVcsU0FBOEI7QUFDdkQsUUFBTSxNQUFXLENBQUM7QUFFbEIsYUFBVyxXQUFXLE9BQU8sS0FBSyxPQUFPLEdBQUc7QUFDMUMsUUFBSSxXQUFXLFFBQVEsT0FBTyxFQUFFLFFBQVEsUUFBUSxJQUFJO0FBQ3BELGVBQVcsYUFBYSxTQUFTLE9BQU8sYUFBYSxVQUFVLFFBQVE7QUFFdkUsUUFBSSxZQUFZLGFBQWE7QUFDM0IsaUJBQVcsT0FBTyxRQUFRO0FBQUEsSUFDNUI7QUFDQSxRQUFJLFlBQVksZ0JBQWdCLFVBQVU7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
