const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
        .rule('js')
        .include
        .add('/packages')
        .end()
        .use('babel')
        .loader('babel-loader')
  },
  configureWebpack: {
  }

})
