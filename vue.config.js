module.exports = {
  lintOnSave: undefined,
  baseUrl: '/',
  devServer: {
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