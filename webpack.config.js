require("dotenv").config();

const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const BUILD_DIR = path.resolve("./dist");
const APP_DIR = path.resolve("src");
const vars = new webpack.DefinePlugin({
    BACKEND_URL: JSON.stringify(process.env.BACKEND_URL || "http://localhost/"),
});



const moment = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

const extract_text = new MiniCssExtractPlugin({
    filename: "[name].[chunkhash].css"
});

const html = new HtmlWebpackPlugin({
    inject: false,
    hash: true,
    template: "src/index.html",
    filename: "index.html",
    chunksSortMode: "none"
});
const sw = new SWPrecacheWebpackPlugin({
    minify: true,
    cacheId: "trtools",
    filename: "sw.js",
    navigateFallback: "index.html",
    staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
});

const manifest = new ManifestPlugin({
    fileName: "asset-manifest.json"
});

const copy = new CopyWebpackPlugin([
    {from: "resources", to: "resources"}, 
]);

const clean = new CleanWebpackPlugin("dist", {});

const common = {

    entry: {
        main: ["@babel/polyfill", path.resolve(APP_DIR + "/index.js")],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "all",
                    name: "vendor",
                    test(module, chunks) {
                        const name = module.nameForCondition && module.nameForCondition();
                        return chunks.some(chunk => {
                            return chunk.name === "main" && /[\\/]node_modules[\\/]/.test(name);
                        });
                    },
                    priority: 1,
                    enforce: true
                }
            }
        }
    },

    output: {
        path: BUILD_DIR,
        publicPath: "/",
        globalObject: "this",
        filename: "[name].js"
    },
    module : {
        rules : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loader : "babel-loader"
            },
            { test: /\.css$/, 
                use: [ "style-loader", MiniCssExtractPlugin.loader, "css-loader" ] 
            },
            {
                test: /\.scss$/,
                use: [ "style-loader", MiniCssExtractPlugin.loader, 
                    "css-loader", "resolve-url-loader", "sass-loader?sourceMap" ]
            },
            {
                test: /\.less$/,
                use: [ "style-loader", MiniCssExtractPlugin.loader,
                    "css-loader", "less-loader" ]
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader?limit=100000" },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [
            path.resolve("src"),
            path.resolve("src", "components"),
            path.resolve("node_modules")
        ],
        alias: {
            '../../theme.config$': path.join(__dirname, "themes/theme.config")
        },

    }
};

let config;

switch(process.env.NODE_ENV) {
    case "production":
        config = merge(
            common,
            { mode: "production" },
            { devtool: "source-map" },
            { plugins: [ vars, extract_text, manifest, sw, moment, html, copy, clean  ]
            },
        );
        break;

    default:
        config = merge(
            common,
            { mode: "development" },
            { devtool: "cheap-module-source-map" },
            { plugins: [ vars, extract_text, manifest, sw, moment, html, copy, clean, new HardSourceWebpackPlugin(), new webpack.HotModuleReplacementPlugin()] },
            { devServer: {
                port: 8083,
                hot: true,
                historyApiFallback: true
            }}
        );
        break;
}

// eslint-disable-next-line no-undef
module.exports = config;

