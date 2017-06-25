var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills', 'vendor'],
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            firebase: "firebase",
            $: "jquery"
        }),
        new TsConfigPathsPlugin({
            tsconfig: 'tsconfig.json',
            compiler: 'typescript'
        })
    ]
});