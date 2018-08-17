module.exports = {
  runtimeCompiler: true,
  configureWebpack: config => ({
      module: {
        rules: [{
          test: /\.(svg)(\?.*)?$/,
            loader: 'file-loader',
            options: {
              name: 'img/svg/[name].[ext]',
            },
        }]
      }
  })
}
