const webpack = require('webpack')
const path = require('path')
const express = require('express')
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.dev.config.js')
const ejs = require('ejs')
const app = express(),
      DIST_DIR = path.join(__dirname, "dist"),// 设置静态访问文件路径
      PORT = 9090, // 设置启动端口
      complier = webpack(webpackConfig)

app.use(webpackDevMiddleware(complier,{

  publicPath: webpackConfig.output.publicPath,
  quiet: true  //向控制台显示任何内容 

}))

app.use(webpackHotMiddleware(complier))

app.set('view engine','ejs')

app.set('views',path.join(__dirname, '/src/view'))

app.use(express.static(DIST_DIR)) 

app.engine('html',ejs.renderFile)

app.get('/view/index',function(req,res){
  res.render('index',{
    name:"123"
  })
})

app.get('/view/about',function(req,res){
  res.render('about',{
    'name':"about",
    'age':"about111111"
  })
})

app.listen(PORT,function(){
  console.log("成功启动：localhost:"+ PORT)
})