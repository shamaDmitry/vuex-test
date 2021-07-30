module.exports = {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.114.153:3000'
      }
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}
