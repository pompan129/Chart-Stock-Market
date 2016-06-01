/**
 * Created by fazbat on 5/25/2016.
 */
const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'client'),
    build: path.join(__dirname, 'client')
};

module.exports = {
    entry: {
        app: PATHS.app + "/main.js"
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
