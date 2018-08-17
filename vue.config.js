module.exports = {
  runtimeCompiler: true,
  configureWebpack: () => ({
      module: {
        rules: [{
          test: /(ios|md|logo)-\.(svg)(\?.*)?$/,
            loader: 'file-loader',
            options: {
              name: 'img/svg/[name].[ext]',
            },
        }]
      }
  })
}
