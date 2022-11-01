const path = require('path')
const terserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: {
    'add-number': './src/index.js',
    'add-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './umd'),
    // 指定库的名称
    library: 'jjc',
    /** 指定打包规范
     * var
     *  生成内容：var [library] = `xxx`
     * this
     *  生成内容：this[library] = `xxx`
     * window
     *  生成内容：window[library] = `xxx`
     * global
     * umd
     * ...
     */
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new terserPlugin({
        test: /\.min\.js$/,
      })
    ]
  }
}