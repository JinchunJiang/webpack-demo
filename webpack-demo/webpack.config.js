const path = require('path')
const TestPlugin = require('./plugins/test')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  resolveLoader: {
    modules: ['node_modules', 'loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'test-loader',
          options: {
            name: 'jjc'
          }
        }
      }
    ]
  },
  plugins: [
    new TestPlugin({ name: 'test' })
  ]
}