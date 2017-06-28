const webpack = require('webpack');
const path = require('path');


module.exports = {
    context: __dirname,
    entry: {
        app: './client/static/js/app.js',
        // vendor: ['angular']
    },
    output: {
        path: __dirname + './public/js',
        filename: 'app.bundle.js'
    }
}