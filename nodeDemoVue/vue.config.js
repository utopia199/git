

module.exports = {
  // 公共路径  打包路径配置（.env.dev文件设置） 本地访问路径配置（.env文件配置）
  publicPath:process.env.VUE_APP_PROJET_URL,
  devServer: {
    // open: process.platform === 'darwin',
    host: 'localhost',
    port: 8181,
    open: true, //配置自动启动浏览器 
    proxy: {
      '/api': {
        target: "http://10.0.6.103:9191", //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
   }, 
  configureWebpack: { // webpack 配置
    output: { // 输出文件版本号配置
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`
    },
  },

  css: {
    modules: true
  },
  outputDir: 'temp',
}