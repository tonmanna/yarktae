var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var path = require('path');
const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    watchOptions: {
        poll: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency',
            filename: 'index.html'
        }),
        new webpack.ProvidePlugin({
            firebase: "firebase",
            $: "jquery",
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new TsConfigPathsPlugin({
            tsconfig: 'tsconfig.json',
            compiler: 'typescript'
        })
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true,
        watchOptions: {
            ignored: /node_modules/
        }
    }
});