const webpack = require('webpack')
const base = require('./webpack.base.config.js')
base.plugins.push(new webpack.HotModuleReplacementPlugin())
base.devServer = { 
  port: 8300,
  inline: true,
  hot: true,
  open: true
}
const devConfig = {
  ...base
}
module.exports = devConfig ;