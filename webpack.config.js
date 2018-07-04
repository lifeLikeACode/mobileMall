const path = require('path')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin   = require('html-webpack-plugin')
const cleanWebpackPlugin =require('clean-webpack-plugin')
console.log(1)
console.log(path.resolve(__dirname, 'dist/'))
console.log(2)
// 获取html-webpack-plugin参数的方法 
const getHtmlConfig = function(name, title){
  return {
      template    : './src/view/' + name + '.html',
      filename    : 'view/' + name + '.html',
      title       : title,
      inject      : true,
      hash        : true,
      chunks      : ['common', name]
  };
};
module.exports = {
  entry: {
    'index': './src/page/index/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module:{
    rules:[{
        test:/\.jsx?$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ["env","stage-0"]
            }
        },
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract('css-loader',"style-loader"),
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  optimization:{
    splitChunks: {
      cacheGroups: {
          vendor: {   // 抽离第三方插件
              test: /node_modules/,   // 指定是node_modules下的第三方包
              chunks: 'initial',
              name: 'vendor',  // 打包后的文件名，任意命名    
              // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
              priority: 10    
          },
          utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
              chunks: 'initial',
              name: 'utils',  // 任意命名
              minSize: 0    // 只要超出0字节就生成一个新包
          }
      }
    }
  },
  plugins: [
    new ExtractTextWebpackPlugin('css/[name].[hash].css'),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new cleanWebpackPlugin(path.join(__dirname,'dist')),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: { 
    port: 8080,
    inline: true,
    hot: true
  },
  mode: 'development'
}