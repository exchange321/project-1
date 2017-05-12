const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
};

module.exports = {
  devtool: 'source-map',
  entry: [
    'whatwg-fetch',
    `${__dirname}/client/index.js`,
  ],
  target: 'web',
  output: {
    path: `${__dirname}/public`, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          [
            'css-loader?sourceMap',
            'postcss-loader',
          ]
        ),
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('index.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/client/index.html`,
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};
