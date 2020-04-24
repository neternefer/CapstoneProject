const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry:  './src/client/index.js',
    mode: 'development',
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
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
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
        })
    ]
}

