const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const config = require('../package.json');

module.exports = {
  externals: [
    "sqlite3"
  ],
  context: path.join(__dirname, '../app'),
  devtool: 'inline-source-map',
  entry: {
    renderer: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9090',
      'webpack/hot/only-dev-server',
      './renderer.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../compiled'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    libraryTarget: 'commonjs2',
    publicPath: 'http://localhost:9090/',
  },
  devServer: {
    hot: true,
    //publicPath: 'http://localhost:9090/',
    //historyApiFallback: true,
    port: 9090,
  },
  //target: "electron-main",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", "css-loader"
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          "style-loader", "css-loader", "sass-loader"
        ]
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream'
          }
        }
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  },
  node: {
    //fs: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    //new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      './main.js',
      /*{
        from: './styles/*.css',
      },*/ {
        from: './index.dev.html',
        to: './index.dev.html'
      },
      './styles/fonts/*/*',
      {
        from: '../resources/',
        to: './resources/'
      }
    ]),
    new HtmlWebPackPlugin({
      template: "./index.dev.html",
      filename: "./index.html",
      inject: false,
      title: config.title
    })
  ]
}