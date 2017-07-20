var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        main: __dirname + '/src/main.js'
    },
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    devServer:{
        contentBase: "./",
        compress: true,
        port: 8090
    },
    resolve: {
        alias: {
            'jquery': require.resolve('jquery'),
            'jquery-ui': 'jquery-ui-dist/jquery-ui.js'
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['es2015']
            }
        }],
        loaders: [{ test: /\.css$/, loader: ['style-loader', 'css-loader?modules'] },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: "jquery"
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]

};