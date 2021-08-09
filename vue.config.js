module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://192.168.114.153:3000'
        target: 'https://pure-sea-27302.herokuapp.com/'
      }
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}