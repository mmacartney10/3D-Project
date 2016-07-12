var webpack = require('webpack');

module.exports = {
    watch: true,
    entry: './app/src/index.js',
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    }
};
