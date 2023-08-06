module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
};