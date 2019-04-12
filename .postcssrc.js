// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    // to edit target browsers: use "browserlist" field in package.json
    autoprefixer: {
      browsers: [
        "ios >= 7",
        "android >= 4.0"
      ]
    },
    "postcss-pxtorem": {
      "rootValue": 37.5,
      "unitPrecision": 4,
      "minPixelValue": 2,
      "propList": ["*", "!font"]
    }
  }
}
