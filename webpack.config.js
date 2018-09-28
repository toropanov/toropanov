const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = ({ NODE_ENV }) => {
  const isProduction = NODE_ENV === 'production';

  return {
    entry: './src',
    output: {
      path: path.join(__dirname, './dist'),
      filename: '[name].js',
      publicPath: './dist/',
      chunkFilename: '[id].chunk.js',
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
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
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
        template: './index.html',
      }),
      new ExtractTextPlugin('app.css', {
        allChunks: true,
      }),
      // new ExtractTextPlugin('*.css'),
      // // Make sure this is after ExtractTextPlugin!
      // new PurifyCSSPlugin({
      //   // Give paths to parse for rules. These should be absolute!
      //   paths: glob.sync(path.join(__dirname, '*.html')),
      // }),
    ],
    // devtool: isProduction ? false : 'source-map',
  };
};
