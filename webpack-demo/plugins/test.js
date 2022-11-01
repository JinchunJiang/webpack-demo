// 插件基本结构
// 是个类
// 必须内置一个apply函数
module.exports = class TestPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // compiler 实例化的webpack对象，包含配置等信息

    // 同步钩子用tap注册
    // 异步钩子用tapAsync注册
    // 事件名称可以为任意值，但是建议和插件名称保持一致或者有语义

    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, cb) => {
      // 生成一个test.txt文件
      const content = 'test.txt'
      compilation.assets['test.txt'] = {
        source() {
          return content
        },
        size() {
          return content.length
        }
      }
      cb() // 一定要执行，不然会报错
    })
  }
}