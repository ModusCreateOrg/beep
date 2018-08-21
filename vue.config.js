module.exports = {
  baseUrl: '/',
  runtimeCompiler: true,

  // Extend the webpack config to handle ionic-specific icons
  configureWebpack: () => ({
    module: {
      rules: [
        {
          test: /(ios|md|logo)-(.*)\.(svg)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            name: 'img/svg/[name].[ext]',
          },
        },
      ],
    },
  }),

  // PWA config
  pwa: {
    name: process.env.VUE_APP_NAME,
    themeColor: process.env.VUE_APP_INITIAL_STATUSBAR_COLOR,
    msTileColor: process.env.VUE_APP_INITIAL_STATUSBAR_COLOR,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
  },
}
