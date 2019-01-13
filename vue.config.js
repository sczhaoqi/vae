module.exports = {
  lintOnSave: undefined,
  baseUrl: '/',
  devServer: {
      port: 8081,
      proxy: {
          '/api': {
              target: 'http://localhost',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/api': ''
              }
          }
      }
  }
}