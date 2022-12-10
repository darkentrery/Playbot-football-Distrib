const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  // context: __dirname,
  // entry: '.assets/js/index',
  // output: {
  //   path: path.resolve('./assets/bundles/'),
  //   filename: "[name]-[hash].js"
  // },
  // plugins: [
  //   new BundleTracker({filename: './webpack-stats.json'})
  // ],
  context: __dirname,
  entry: __dirname + '/src/index.js',

  output: {
    path: path.resolve('./static/frontend/'),
    filename: '[name]-[hash].js',
    publicPath: 'http://localhost:8000/static/frontend/',
  },

  plugins: [
    new BundleTracker({
      path: __dirname,
      filename: './static/webpack-stats.json',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/ ,
        exclude: /node_modules/,
        use: {
          loader: "style-loader"
        }
      },
      {
        test: /\.css$/ ,
        exclude: /node_modules/,
        use: {
          loader: "css-loader"
        }
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
              encoding: 'base64'
          }
        }
      }
    ]
  }
};