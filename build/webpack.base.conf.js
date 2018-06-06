var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapTest = (env === 'test' && config.test.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapTest || cssSourceMapProd

var vuxLoader = require('vux-loader');


var webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath :(process.env.NODE_ENV === 'test' ? config.test.assetsPublicPath :config.dev.assetsPublicPath) ,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.less', '.css', '.scss'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    },{                 //Vux的js源码没配置babel
      test: /vux.src.*?js$/,
      loader: 'babel'
    },{
      test: /\.js$/,
      loader: 'babel',
      include: projectRoot,
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 10000,           //小于10kb的图片转为base64
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: useCssSourceMap
    }),
    postcss: [
      require('autoprefixer')({
        browsers: ['iOS >= 7', 'Android >= 4.1']    //避免生成不必要的-ms代码
      })
    ]
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})