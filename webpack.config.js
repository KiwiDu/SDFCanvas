'use strict'

const path = require('path')
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/ts/index.tsx',

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.css', '.webpack.js', '.web.js', '.ts', '.js', '.tsx', '.jsx']
    },

    devServer: {
        contentBase: './dist/',
        host: "localhost",
        port: 9090,
        //inline: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/html/index.html"
        })
    ],

    devtool: "source-map",

    mode: 'production',

    module: {
        rules: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.svg$/,
                loader: 'url-loader'
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            {
                test: /\.tsx?$/,
                use: [{
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                        }
                    }
                ]
            }
        ]
    },
    stats: {
        // suppress "export not found" warnings about re-exported types
        warningsFilter: /export .* was not found in/
    },
}