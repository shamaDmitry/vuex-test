module.exports = {
  devServer: {
    clientLogLevel: 'warn',
    proxy: {
      '/api': {
        target: 'https://vuex-test-server.vercel.app/'
      }
    },
  },
  transpileDependencies: [
    'vuetify'
  ]
}