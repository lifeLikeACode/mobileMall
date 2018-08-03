const webpack = require('webpack')
const path = require('path')
const express = require('express')
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.dev.config.js')

const ejs = require('ejs')
const fs = require('fs')
const app = express()
const DIST_DIR = path.join(__dirname, "/dist")// 设置静态访问文件路径
const PORT = 8080 // 设置启动端口
const complier = webpack(webpackConfig)
console.log(complier)

function renderFile(path,req,res,next){
  let filename = complier.outputPath + path + '.ejs'

  complier.outputFileSystem.readFile(filename,function(err,result){
    if(err){
      console.log('错误信息'+err)
    }
    else {
      res.write(result)
      res.end()
    }
    
  })
  next()
}
app.use(webpackDevMiddleware(complier,{

  publicPath: webpackConfig.output.publicPath,
  quiet: true  //向控制台显示任何内容 

}))

app.use(webpackHotMiddleware(complier))

app.use('/index',(req,res,next)=>{
  renderFile('/index',req,res,next)
})

app.set('views',path.join(__dirname, '/src/views/'))

app.set('view engine','ejs')

app.use(express.static(DIST_DIR))

app.engine('.ejs',ejs.__express)

app.listen(PORT,function(){
  console.log("成功启动：localhost:"+ PORT)
})