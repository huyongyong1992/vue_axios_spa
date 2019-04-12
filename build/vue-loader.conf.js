'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'
const isUat = process.env.NODE_ENV === 'uat'
const isDevelopment = process.env.NODE_ENV === 'development'
const sourceMapEnabled = isDevelopment
  ? config.dev.cssSourceMap
  : config.build.productionSourceMap                      //统一用生产环境的sourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction || isTest || isUat
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
