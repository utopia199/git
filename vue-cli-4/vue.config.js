

module.exports = {
  // 公共路径  打包路径配置（.env.dev文件设置） 本地访问路径配置（.env文件配置）(访问文件路径)
  publicPath:process.env.VUE_APP_PROJET_URL,
  devServer: {
    // open: process.platform === 'darwin',
    host: 'localhost',
    port: 8181,
    open: true, //配置自动启动浏览器 
    proxy: null
   }, 
  configureWebpack: { // webpack 配置
    output: { // 输出文件版本号配置
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`
    },
  },
  productionSourceMap: true,
  css: {
    modules: true
  },
  outputDir: 'dist',
  indexPath: "index.html"
}