const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");


const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    performance: {
        maxAssetSize: 10000000,
        maxEntrypointSize: 10000000,
        hints: 'error',
    },
    entry: {
        'ring': './ring.js',
        'background': './background.js'
    },
    output: {
        assetModuleFilename: '[name][ext]',
        path: path.resolve(__dirname, 'public'),
        filename: "[name].js",
        clean: true
    },
    devtool: "source-map",
    devServer: {
        host: 'localhost',
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        historyApiFallback: true,
        watchFiles: ["./public/*"],
        port: "3000",
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new CopyPlugin({
            
            patterns: [
                // {
                //     from: "./manifest.json",
                //     globOptions: {
                //         dot: true,
                //         gitignore: true,
                //     },
                //     to: "./"
                // },
                {
                    from: "./fr.json",
                    globOptions: {
                        dot: true,
                        gitignore: true,
                    },
                    to: "./"
                },
                {
                    from: "./sounds",
                    globOptions: {
                        dot: true,
                        gitignore: true,
                    },
                    to: "./sounds"
                },
                {
                    from: "./logo.png",
                    globOptions: {
                        dot: true,
                        gitignore: true,
                    },
                    to: "./"
                },
            ],
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                include: [
                    path.resolve(__dirname, '.')
                ],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                include: [
                    path.resolve(__dirname, '.')
                ],
                use: [stylesHandler, 'css-loader', 'style-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|json)$/i,
                include: [
                    path.resolve(__dirname, '.')
                ],
                type: 'asset/resource',
            }
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
