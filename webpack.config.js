var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js',
        
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
           // components:'./src/components'
           page:path.resolve(__dirname, 'src/page'),
           util:path.resolve(__dirname, 'src/util'),
           service:path.resolve(__dirname, 'src/service'),
        }
    },
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        
                        presets: [ "@babel/preset-env", "@babel/preset-react" ],
                        plugins: [ "@babel/plugin-transform-arrow-functions", "@babel/plugin-proposal-class-properties" ]
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
            template: './src/index.html',
            favicon:'./src/gift/image/react.png'
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
        historyApiFallback:{

			rewrites: [{

				from: /.*/g,

				to: '/page/index.html'

			}]

		},
        proxy : {
            '/manage' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            },
            '/user/logout.do' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        }

    }

};