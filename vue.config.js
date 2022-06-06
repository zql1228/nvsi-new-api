const TerserPlugin = require('terser-webpack-plugin')
// const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const path = require('path')
const ip = require('ip').address()
const resolve = function(dir) {
  return path.join(__dirname, dir)
}

const createProxy = (obj) => {
  const ret = {}
  const httpsRE = /^https:\/\//

  if (obj) {
    obj = JSON.parse(obj)
    for (const prefix in obj) {
      const target = obj[prefix]
      const isHttps = httpsRE.test(target)

      ret[prefix] = {
        target: target,
        changeOrigin: true,
        ws: true,
        pathRewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
        // https is require secure=false
        ...(isHttps ? { secure: false } : {}),
      }
    }
  }

  return ret
}

module.exports = {
  publicPath: process.env.NODE_ENV == 'production' ? '/nvsidfh5/' : '/', //打包配置，解决页面空白的配置方案。

  outputDir: 'nvsidfh5', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。

  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的目录(相对于outputDir目录)。

  indexPath: 'index.html', //指定生成的 index.html 的输出路径 (相对于 outputDir)

  filenameHashing: false, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。

  lintOnSave: false, //process.env.NODE_ENV !== "production",// 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。

  runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。

  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

  // 所有 webpack-dev-server 的选项都支持。
  devServer: {
    host: ip,
    port: process.env.VUE_PORT, // 端口号
    https: false,
    open: false, //配置自动启动浏览器
    // 配置代理
    //proxy: createProxy(process.env.VUE_PROXY),
    proxy: {
      '/nvsidfh5apis': {
        //target: 'https://chinavolunteer.mca.gov.cn',
        // target: 'http://192.168.6.23:8003',
        // target: 'http://192.168.6.236:8005', //李
        //target: 'https://wuhan.yxybb.com',
        // target: 'http://192.168.6.236:8005', //李
        // target: 'http://192.168.5.97:8006', //罗千
        target: 'http://192.168.5.114:8009', //胡晨
        // target: 'http://192.168.5.95:8003', //胡圣峰
        // target: 'http://192.168.6.177:8003', //李露露
        // target: 'http://192.168.6.157:8003',
        // target: 'http://192.168.6.93:8006', //李亚兵
        // target: 'http://192.168.6.193:8080', //胡强
        // target: 'http://192.168.6.200:8001', //冯创新
        // target: 'http://192.168.5.92:8089', //NVSIDF
        changeOrigin: true,
        pathRewrite: {
          '^/nvsidfh5apis': '', // 去掉接口地址中的api字符串
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      //生产环境
      return {
        plugins: [
          new CompressionWebpackPlugin({
            // 压缩代码
            algorithm: 'gzip', //压缩算法/功能
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), //包括所有通过测试断言的资产 //test: /\.js$|\.html$|.\css/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            minRatio: 0.8, //压缩比
            deleteOriginalAssets: false, // true 不删除源文件 false 删除源文件
          }),
          new TerserPlugin({
            // 去除console.log ,警告
            terserOptions: {
              compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log'],
              },
            },
          }),
        ],
      }
    }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // requireModuleExtension:true,
  },
}
