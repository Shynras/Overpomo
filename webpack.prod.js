const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.bundle.css',
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: "./public/favicon.png", 
                    to: path.resolve(__dirname, 'dist') 
                },
                { 
                    from: "./public/manifest.json", 
                    to: path.resolve(__dirname, 'dist') 
                },
                { 
                    from: "./public/serviceWorker.js", 
                    to: path.resolve(__dirname, 'dist') 
                }

            ]
        }),
    ]
});