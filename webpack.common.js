const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    resolve: {                                      // common??
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'] 
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        })
    ]
};
