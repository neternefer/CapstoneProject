const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSWebpackPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [
          new TerserPlugin({}),
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'var',
      library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use:  [MiniCSSWebpackPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|gif|jpg|cur)$/i,
                loader: 'url-loader', options: { limit: 8192 }
            },
            {   test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' }
            },
            {   test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' }
            },
            {   test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCSSWebpackPlugin({
            filename: '[name].css'
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}

