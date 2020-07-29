const path = require('path')

const globalSassFiles = []

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, 'src')
      }
    }
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: globalSassFiles.map(src => `@import "${src}";`).join('\n')
      }
    }
  },

  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'test') {
      const sassRule = config.module.rule('sass')
      const scssRule = config.module.rule('scss')
      scssRule.uses.clear()
      sassRule.uses.clear()
      scssRule.use('null-loader').loader('null-loader')
      sassRule.use('null-loader').loader('null-loader')
    }
    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
      config.module.rule('sass').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, {
          prependData: globalSassFiles.map(src => `@import "${src}"`).join('\n')
        }))
    })
  },

  devServer: {
    disableHostCheck: true
  },

  transpileDependencies: [
    'vuetify', 'vuex'
  ]
}
