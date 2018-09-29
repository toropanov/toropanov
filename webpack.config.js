const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const data = require('./src/data.json');

module.exports = {
  entry: './src',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      data,
      template: './src/index.pug',
    }),
    new HtmlWebpackPugPlugin(),
    new MinifyPlugin({}, { comments: false }),
  ],
};
