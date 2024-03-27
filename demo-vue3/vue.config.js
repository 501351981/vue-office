const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack(){
    return {
      resolve: {
        fallback: {
          "util": false,
          "stream": false
        }
      }
    }
  }
})
