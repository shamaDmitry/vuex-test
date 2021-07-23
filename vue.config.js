module.exports = {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.115.42:3000/api',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}
