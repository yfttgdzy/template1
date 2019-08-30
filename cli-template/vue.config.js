const webpack = require('webpack');
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  devServer: {
    'port': 8081,
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
      })
    ],
     resolve: {
      alias: {
        'public': resolve('public')
      }
    }
  },
};
