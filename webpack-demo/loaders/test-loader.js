
// 不能是箭头函数
// 必须有返回值
module.exports = function testLoader(source) {

  // 同步使用return 或者 this.callback
  const result = source.replace('name', this.query.name)
  // return result
  // this.callback(null, result)

  // 异步
  const callback = this.async()
  setTimeout(() => {
    callback(null, result)
  }, 3000)
}