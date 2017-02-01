var path = require('path');

var config = {
    entry: [path.resolve(__dirname, 'src/angular-gmap-gplaces.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'angular-gmap-gplaces.min.js'
    },
    externals: {
        'angular': 'angular'
    },
    module: {
        loaders: [
            {test: /src.*\.js$/, loaders: ['ng-annotate']},
            {test: /\.html$/, loader: 'ngtemplate!html'},
            {test: /\.scss$/, loader: 'style!css!sass'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
            {test: /\.svg/, loader: 'svg-url-loader'}
        ]
    }
};

module.exports = config;