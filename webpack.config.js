const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './client/js/app.js',
        // vendor: ['angular']
    },
    output: {
        path: './public/js',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            { test: /\.html$/, loader: "html" },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    devtool: "#inline-source-map"
}