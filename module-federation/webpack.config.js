const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'development',
  // plugins: [
  //   new ModuleFederationPlugin({
  //     name: '', // 命名空间
  //     filename: '', // 打包出来的文件名
  //     library: {
  //       type: 'var'
  //     },
  //     // 加载远程资源
  //     remotes: '${name}/${url}:port/${filename}',
  //     // 暴露 共享出去的组件，模块
  //     // js模块/vue组件/react组件
  //     exposes: {
  //       jjc: './src/index.js'
  //     },
  //     shared: ['vue', 'react', 'react-dom']
  //   })
  // ]
}