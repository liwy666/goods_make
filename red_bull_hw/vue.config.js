const path = require("path");
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : './',

    css: {
        loaderOptions: {
            css: {
                loaderOptions: {
                    sass: {
                        data: `@import "@/my-scss.scss";`
                    }
                }
            },
            postcss: {
              /*  plugins: [
                    require('postcss-pxtorem')({
                        rootValue : 37.5, // 换算的基数
                        selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
                        propList   : ['*'],
                    }),
                ]*/
            },
            less: {
                modifyVars: {
                    /*red: '#03a9f4',
                    blue: '#3eaf7c',
                    orange: '#f08d49',
                    'text-color': '#111'*/
                 /*   'nav-bar-icon-color': "#fb3126",
                    'nav-bar-text-color': "#fb3126"*/

                }
            }
        }
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'scss',
        patterns: [
            path.resolve(__dirname, "./src/my-scss.scss")
        ]
      }
    },

    lintOnSave: false
};
