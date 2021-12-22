const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/mian.tsx",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "bundle.js",
        clean: true
    },
    mode: "development",
    module: {
        rules: [
        { 
            test: /\.tsx?$/, 
            loader: "awesome-typescript-loader" 
        },
        { 
            enforce: "pre", test: /\.js$/, 
            loader: "source-map-loader" },
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: { presets: ["@babel/env"] }
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader",
                },
                {
                    loader: "css-loader",
                },                
            ],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        ]
  },
    devtool: 'source-map',
    resolve: { 
        extensions: ["*", ".js", ".ts", ".jsx", ".tsx"],
        alias: {
            "@":  path.resolve(__dirname, "src"),
            "public": path.resolve(__dirname, "public"),
        }
    },
    devServer: {  
        static: './dist',
        port: 8000,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};