const fs = require('fs')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const path = require('path')
const { transformFromAst } = require('@babel/core')

module.exports = class Webpack {
  constructor(options) {
    // 读取配置文件的信息
    this.entry = options.entry
    this.output = options.output

    this.modulesInfo = []
  }

  // 入口函数
  run() {
    const moduleParserInfo = this.parser(this.entry)
    this.modulesInfo.push(moduleParserInfo)

    for (let i = 0; i < this.modulesInfo.length; i++) {
      const { dependencies } = this.modulesInfo[i]
      if (dependencies) {
        for (let j in dependencies) {
          this.modulesInfo.push(this.parser(dependencies[j]))
        }
      }
    }
    // 数据结构转换
    const obj = {}
    this.modulesInfo.forEach(item => {
      obj[item.modulePath] = {
        dependencies: item.dependencies,
        code: item.code
      }
    })
    this.bundleFile(obj)
  }

  parser(modulePath) {
    // 编译
    // 1.分析是否有依赖？有依赖提取依赖的路径
    // 2.编译模块，生成chunk
    // 前提：拿到该模块的内容？读取模块内容
    const content = fs.readFileSync(modulePath, 'utf-8')
    const ast = babelParser.parse(content, {
      sourceType: 'module'
    })

    const dependencies = {} // 保存依赖路径
    traverse(ast, {
      ImportDeclaration({ node }) {
        const newPath = './' + path.join(path.dirname(modulePath), node.source.value)
        dependencies[node.source.value] = newPath
      }
    })
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env']
    })
    return {
      modulePath,
      dependencies,
      code
    }
  }

  bundleFile(obj) {
    // 生成bundle文件
    const bundlePath = path.join(this.output.path, this.output.filename)
    const dependenciesInfo = JSON.stringify(obj)
    const content = `(function(modulesInfo) {
      function require(modulePath) {
        function newRequire(relativePath) {
          return require(modulesInfo[modulePath].dependencies[relativePath])
        }
        const exports = {};
        (function(require, code) {
          eval(code)
        })(newRequire, modulesInfo[modulePath].code)

        return exports
      }
      require('${this.entry}')
    })(${dependenciesInfo})`
    fs.writeFileSync(bundlePath, content, 'utf-8')
  }
}