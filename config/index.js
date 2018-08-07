// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true,
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"]
  },
  test: {
    env: {
      NODE_ENV: '"test"'
    },
    index: path.resolve(__dirname, "../test/index.html"),
    assetsRoot: path.resolve(__dirname, "../test"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true,
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    port: 8001,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    context: [
      //代理路径
    ],
    cssSourceMap: false,
    showEslintErrorsInOverlay:true,
    useEslint:false,
  }
};
