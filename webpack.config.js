const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { devLog } = require('./src/js/utils');
require('@babel/register');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            generatorOpts: { compact: false },
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/data',
          to: './data',
          filter: async (resourcePath) => {
            // add your custom extension here if not listed
            const texture = /\.(jpe?g|gif|png|svg|heic|pkm|pvr)$/;
            const fnt = /\.(woff|woff2|ttf|fnt)$/;
            const map = /\.(tmx|tsx)$/;
            const audio =
              /\.(wav|mp3|mpeg|opus|ogg|oga|wav|aac|caf|m4a|m4b|mp4|weba|webm|dolby|flac)$/;
            const misc = /\.(xml|bin|glsl|ym|json|js)$/;

            // only copy production files
            const ret =
              texture.test(resourcePath) ||
              fnt.test(resourcePath) ||
              map.test(resourcePath) ||
              audio.test(resourcePath) ||
              misc.test(resourcePath);

            if (ret === false) {
              devLog(`ignoring data: ${resourcePath}`);
            }
            return ret;
          }
        }
      ]
    })
  ],
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    hot: true,
    port: 9000,
    open: true
  },
  watch: false
};
