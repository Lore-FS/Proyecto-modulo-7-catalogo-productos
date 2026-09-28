const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/Proyecto-modulo-7-catalogo-productos/'
      : '/'
})
