var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            // css文件的处理
            {
                test: /\.css$/,
                use: [

                    MiniCssExtractPlugin.loader,

                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            },

            // 图片的配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }]
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {

                        name: 'resource/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
         // 处理html文件 
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 独立css文件
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
            chunkFilename: "[id].css"
        }),
        // 提出公共模块

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),

      }

};