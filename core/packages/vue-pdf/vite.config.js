import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import vue3 from '@vitejs/plugin-vue';
import * as compiler from '@vue/compiler-sfc';
import { isVue2 } from 'vue-demi';
const { resolve } = require('path');

export default defineConfig({
  plugins: [
    isVue2
        ? createVuePlugin()
        : vue3({
          compiler: compiler
        }),
  ],
  build: {
    target: 'es2015',
    outDir: 'lib/v' + (isVue2 ? '2' : '3'),
    lib: {
      entry: resolve(__dirname, 'index.js'), //指定组件编译入口文件
      name: 'vue-office-pdf',
      fileName: 'vue-office-pdf',
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
    rollupOptions: {
      external: ['vue-demi','vue'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        },
      },
    },
  },
});