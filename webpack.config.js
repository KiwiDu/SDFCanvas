'use strict'

const path = require('path')

module.exports = {

    entry: './ts/index.ts',

    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },

    devtool: "source-map",

    mode: 'production',

    module: {
        rules: [{
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
        }]
    },
    stats: {
        // suppress "export not found" warnings about re-exported types
        warningsFilter: /export .* was not found in/
    },
}