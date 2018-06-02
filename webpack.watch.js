const path = require("path");
const glob = require("glob");
const ExctractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

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
                                sourceMap: true,
                                url:false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                url:false
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