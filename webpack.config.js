const path = require("path");
const glob = require("glob");
const ExctractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminJpegRecompress = require('imagemin-jpeg-recompress');

const config = {
    target: "web",
    entry: {
        bundle: "./src/index.es6"
    },
    output: {
        path: path.resolve(__dirname, "./public/assets/js"),
        filename: "./[name].js"
    },
    plugins: [
        new UglifyJSPlugin(),
        new ExctractTextPlugin({
            filename: '../css/[name].css'
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif)$/i,
            minFileSize: 10,
            externalImages: {
                context: 'src',
                sources: glob.sync('src/images/**/*.*'),
                destination: 'public/assets'
            },
            plugins:[
                imageminJpegRecompress({
                    min:50,
                    max:80
                })
            ],
            jpegtran: {progressive: true},
            pngquant: {
                quality: '70-90'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExctractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.es6/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    devtool: "eval-source-map"
};

module.exports = config;