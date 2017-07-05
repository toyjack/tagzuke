var webpack = require('webpack');

module.exports = {
    entry: './main2.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: "jquery"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]

};