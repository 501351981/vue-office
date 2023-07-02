import { defineConfig } from 'vitepress'
const path = require('path')
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue-office/examples/docs/',
  outDir: path.resolve(__dirname, '../../examples/docs'),
  title: "vue-office",
  description: "更简单的office文件预览",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '配置参考', link: '/config/' },
      { text: '演示预览效果', link: 'https://501351981.github.io/vue-office/examples/dist/' }
    ],
    outlineTitle:'跳转到',
    docFooter: {
      next: '下一页',
      prev:'上一页'
    },
    sidebar: {
      '/guide': [
        {
          text: '指南',
          items: [
            { text: '快速上手', link: '/guide/' },
            { text: 'docx文件预览', link: '/guide/preview-docx' },
            { text: 'xlsx文件预览', link: '/guide/preview-xlsx' },
            { text: 'pdf文件预览', link: '/guide/preview-pdf' },
            { text: '非Vue框架进行文件预览', link: '/guide/js-preview' },
            { text: '常见问题', link: '/guide/faq' },
            { text: '联系我', link: '/guide/contact' }
          ]
        }
      ],
      '/config':[
        {
          text: '配置参考',
          items: [
            { text: '属性', link: '/config/' },
            { text: '事件', link: '/config/event' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/501351981/vue-office' }
    ]
  }
})
