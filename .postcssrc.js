// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        // to edit target browsers: use "browserslist" field in package.json
        autoprefixer: {
            browsers: [
                "ios >= 7",
                "android >= 4.0"
            ]
        },
        "postcss-pxtorem": {
            "rootValue": 37.5,
            "unitPrecision": 4,         // 单位精度
            "minPixelValue": 2,
            "propList": ["*", "!font*"]
        }
    }
}
