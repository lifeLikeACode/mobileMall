const webpack = require('webpack')
const base = require('./webpack.base.config.js')
// base.plugins.push(new webpack.HotModuleReplacementPlugin())
// base.devServer = { 
//   port: 8300,
//   inline: true,
//   hot: true,
//   open: false
// }
const devConfig = {
  ...base,
  mode:'development'
}
module.exports = devConfig ;