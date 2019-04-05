const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  externals: [
    "sqlite3"
  ],
  entry: "./app/main.js",
  /*output: {
    path: path.join(__dirname, "dist"),
    libraryTarget: 'commonjs2'
  },*/
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CopyWebpackPlugin([
      './resources/icon.*'
    ])
  ]
}