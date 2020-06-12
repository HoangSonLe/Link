var HtmlWebpackPlugin = require('./i3NodeModules/html-webpack-plugin');
const MiniCssExtractPlugin = require("./i3NodeModules/mini-css-extract-plugin");
const WebpackShellPlugin = require('./i3NodeModules/webpack-shell-plugin');
var HardSourceWebpackPlugin = require('./i3NodeModules/hard-source-webpack-plugin');

const path = require('path');
var glob = require("./i3NodeModules/glob");
var webpack = require("webpack");

const jsFilePaths = require('./Entry.js');
console.log(jsFilePaths);
const cssEntry = `./src/Contents/css/[name].css`;
var filePaths = glob.sync(jsFilePaths);

var entries = {};
var pluginChunks = [];
filePaths.map((filePath, index) => {
    var fileName = path.basename(filePath, ".jsx");
    pluginChunks.push(fileName);
    entries[fileName] = filePath;
});

htmlWebpackPlugins = pluginChunks.map(chunk => {
    return new HtmlWebpackPlugin({
        chunks: [chunk],
        filename: chunk + ".html",
    })
})

const { CleanWebpackPlugin } = require('./i3NodeModules/clean-webpack-plugin/dist/clean-webpack-plugin');
module.exports = {
    devtool: 'source-map',
    //devtool: 'none',
    entry: entries,
    output: {
        filename: './Scripts/[name].js',
    },
    resolve: {
        modules: [
            path.resolve('./src/themeStyles'),
            path.resolve('./i3NodeModules'),
            path.resolve('./node_modules'),
            path.resolve('./i3Src')
        ],
        extensions: ["*", ".jsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: './i3NodeModules/babel-loader',
                query: {
                    presets: ['./i3NodeModules/@babel/preset-env', './i3NodeModules/@babel/preset-react'],
                    plugins: ['./i3NodeModules/@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "./i3NodeModules/css-loader",
                    "./i3NodeModules/sass-loader",
                    {
                        loader: './i3NodeModules/resolve-url-loader',
                        options: {
                            sourceMap: true,
                            keepQuery: true
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg|eot|ttf|woff|woff2)$/,
                use: [
                    './i3NodeModules/file-loader'
                ]
            },
            {
                test: /\.svg$/,
                loader: './i3NodeModules/svg-inline-loader'
            },
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
    plugins: [
        new CleanWebpackPlugin(),
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin({
            filename: cssEntry
        }),
        new HardSourceWebpackPlugin(),
        //   new BundleAnalyzerPlugin(),
        new WebpackShellPlugin({
            onBuildExit: 'copyDist.bat'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      
    ]
};