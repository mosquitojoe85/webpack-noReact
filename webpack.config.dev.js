var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/js/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',  // 這個會後執行 (順序很重要)
          { loader: 'css-loader', options: { importLoaders: 2 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [ require('autoprefixer') ]
            }
          },
          'sass-loader'
        ]
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
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('dev') }),
    // new webpack.ProvidePlugin({
    //   $: "jquery", // Used for Bootstrap JavaScript components
    //   jQuery: "jquery", // Used for Bootstrap JavaScript components
    //   Popper: ['popper.js', 'default'] // Used for Bootstrap dropdown, popup and tooltip JavaScript components
    // })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    host: '0.0.0.0'
  }
}