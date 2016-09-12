var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');

var config = {
    entry: [path.resolve(__dirname, 'src/angular-gmap-gplace.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'angular-gmap-gplace.js'
    },
    externals: {
        'angular': 'angular'
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'ngtemplate!html'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: [
        new CleanPlugin(['dist'])
    ]
};

module.exports = config;
