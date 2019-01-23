module.exports = {
  publicPath: '/',
  runtimeCompiler: true,

  // PWA config
  pwa: {
    name: process.env.VUE_APP_NAME,
    themeColor: process.env.VUE_APP_INITIAL_STATUSBAR_COLOR,
    msTileColor: process.env.VUE_APP_INITIAL_STATUSBAR_COLOR,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
  },
}
