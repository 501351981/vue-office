import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve:{
    alias:{
      'vue-demi': 'vue'
    }
  },
  plugins: [
      vue(),
  ],
  base:"/vue-office/examples/dist",
})
