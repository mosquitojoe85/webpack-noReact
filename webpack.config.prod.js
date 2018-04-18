var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 使用 extract text webpack plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 建立一個 extract text plugin 的實例
var extractPlugin = new ExtractTextPlugin({
  filename: 'bundle.[hash].css' // scss轉css後另存的目標檔名
  // allChunks: true
  // disable: process.env.NODE_ENV !== 'production'
});

module.exports = {
  entry: {
    // jquery: './src/js/init.js',
    main: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: extractPlugin.extract({ //利用 extractPlugin 實例裡的 extract 來建立 Loader
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 2 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [ require('autoprefixer') ]
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
          options: {
            presets: ['env', 'stage-3']
          }
        }
      },
      {
        test: /\.(html)$/,
        loader: "html-loader", // loaders: ['raw-loader']，這個方式也是可以被接受的。
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(function(){
    //   // 這裡應該可以設定一些東西，但不是本篇想討論的，有興趣可以 Google 這個 plugin 可以做啥...
    // }),
    extractPlugin, // 把extract過的loader轉存成css檔 (我的理解啦XD)
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery", // Used for Bootstrap JavaScript components
    //   jQuery: "jquery", // Used for Bootstrap JavaScript components
    //   Popper: ['popper.js', 'default'] // Used for Bootstrap dropdown, popup and tooltip JavaScript components
    // })
  ]
}