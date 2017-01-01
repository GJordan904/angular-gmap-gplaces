var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');

var config = {
    entry: [path.resolve(__dirname, 'src/angular-gmap-gplace.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'angular-gmap-gplaces.js'
    },
    externals: {
        'angular': 'angular'
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'ngtemplate!html'},
            {test: /\.scss$/, loader: 'style!css!sass'},
            {test: /\.(png|jpg)$/, loader: 'url-loader'},
            {test: /\.svg/, loader: 'svg-url-loader'}

        ]
    },
    plugins: [
        new CleanPlugin(['dist'])
    ]
};

module.exports = config;
