var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // 'babel-polyfill', // Uncomment this one for certian ES6 features
    './src/client/client'//,
    // 'webpack-dev-server/client?http://localhost:8080' //Uncoment this for webpack-dev-server
  ],
  output: {
    publicPath: '/',
    filename: './dist/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'flow']
        }
      }
    ]
  },
  devServer: {
    contentBase: "./src"
  }
};
