const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const PrerenderSpaPlugin = require('prerender-spa-plugin')

const env = process.env

module.exports = [
  {
    /**
     * @see https://webpack.js.org/configuration/entry-context/
     */
    entry: {
      main: path.resolve('.', 'src', 'main.js'),
      vendor: [
        'normalize.css',
        'vue'
      ]
    },

    /**
     * @see https://webpack.js.org/configuration/output/
     */
    output: {
      filename: '[name].js',
      path: path.resolve('.', 'dist'),
      publicPath: '/'
    },

    /**
     * @see https://webpack.js.org/configuration/module/
     */
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader?cacheDirectory=true',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1',
            'postcss-loader'
          ]
        },
        {
          test: /\.vue$/,
          loaders: [
            'vue-loader'
          ]
        }
      ]
    },

    /**
     * @see https://webpack.js.org/configuration/plugins/
     */
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),

      /**
       * @see https://webpack.js.org/guides/code-splitting-libraries/
       */
      new webpack.optimize.CommonsChunkPlugin({
        names: [
          'vendor',
          'manifest'
        ]
      }),

      /**
       * @see https://webpack.js.org/plugins/loader-options-plugin/
       */
      new webpack.LoaderOptionsPlugin({
        debug: env.NODE_ENV !== 'production',
        minimize: env.NODE_ENV === 'production'
      }),

      /**
       * @see https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
       */
      new UglifyJSPlugin({
        sourceMap: true
      }),

      /**
       * @see https://github.com/kevlened/copy-webpack-plugin
       */
      new CopyWebpackPlugin([
          { from: 'src/*.html', to: '[name].[ext]' }
      ]),

      /**
       * @see https://github.com/chrisvfritz/prerender-spa-plugin
       */
      new PrerenderSpaPlugin(
        path.join(__dirname, './dist'),
        ['/']
      )
    ],

    /**
     * @see https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
      compress: true,
      contentBase: path.resolve('.', 'dist'),
      port: 8080,
      historyApiFallback: true,
      https: true
    },

    /**
     * @see https://webpack.js.org/configuration/devtool/
     */
    devtool: 'inline-source-map'
  }
]
