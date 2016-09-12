var path = require('path');

var config = {
    entry: [path.resolve(__dirname, 'src/angular-gmap-gplace.js')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'angular-gmap-gplace.min.js'
    },
    externals: {
        'angular': 'angular'
    },
    module: {
        loaders: [
            {test: /src.*\.js$/, loaders: ['ng-annotate']},
            {test: /\.html$/, loader: 'ngtemplate!html'},
            {test: /\.css$/, loader: 'style!css'}
        ]
    }
};

module.exports = config;