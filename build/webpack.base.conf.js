const path = require('path')
const config = require('../config')
const utils = require('./utils')
const projectRoot = path.resolve(__dirname, '../')
const webpack = require('webpack')
const env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
// const cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
// const cssSourceMapTest = (env === 'test' && config.test.cssSourceMap)
// const cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
// const useCssSourceMap = cssSourceMapDev || cssSourceMapTest || cssSourceMapProd
var vueLoaderConfig = require('./vue-loader.conf')
let vuxLoader = require('vux-loader');
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [path.resolve('src')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
const webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath :(process.env.NODE_ENV === 'test' ? config.test.assetsPublicPath :config.dev.assetsPublicPath) ,
    // webpack输出bundle文件命名格式
    filename: '[name].js'
  },
  resolve: {
    extensions: [ '.js', '.vue', '.json'],
    //别名设置，减少引入路径复杂度
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('src'),  path.resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }]
  },
  
}
// 配置vux插件，祥见vux官方文档
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    new webpack.LoaderOptionsPlugin({
      options:{
        postcss: [
          require('autoprefixer')({
            browsers: ['iOS >= 7', 'Android >= 4.1']    //避免生成不必要的-ms代码
          })
        ],
      }
    })
  ]
})