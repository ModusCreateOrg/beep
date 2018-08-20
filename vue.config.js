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
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
  },
}
