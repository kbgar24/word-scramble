const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/app.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
  }
};
