const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin   = require('html-webpack-plugin')
const cleanWebpackPlugin =require('clean-webpack-plugin')
const jquery = require('jquery')
// 获取html-webpack-plugin参数的方法 
const getHtmlConfig = function(name, title){
  return {
      template    : './src/view/' + name + '.ejs',
      filename    : 'view/' + name + '.html',
      title       : title,
      inject      : 'body',
      hash        : true,
      chunks      : ['common', name]
  };
};
const base = {
  entry: {
    'index': './src/page/index/index.js',
    'about': './src/page/about/about.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:7].js',
    publicPath: '/'
  },
  module:{
    rules:[{
        test:/\.js$/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ["env"]
            }
        },
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/
      },
      // {
      //   test: /\.html$/,
      //   loader: 'html-loader'
      // },
      // {
      //   test: /\.ejs$/,
      //   loader: 'ejs-loader'
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'css-hot-loader', //支持热更新
      //     MiniCssExtractPlugin.loader,
      //     "css-loader",
      //     'postcss-loader'
      //   ],
      //   include:path.join(__dirname,'./src'),
      //   exclude:/node_modules/
      // },
      {
        test: /\.styl$/,
        use:[
          'style-loader',
          'css-hot-loader', //支持热更新
          MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader',
          "stylus-loader"
        ],
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
          // utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
          //     chunks: 'initial',
          //     name: './src/common/js',  // 任意命名
          //     minSize: 0    // 只要超出0字节就生成一个新包
          // }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('about', '关于我们')),
    new cleanWebpackPlugin(path.join(__dirname,'dist')),
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery'
    }),
  ]
  
}
module.exports = base ;
