const path = require('path');

const PATHS = {
    src: {
        play_file: path.join(__dirname, 'play_file.js')
    },
    dist: __dirname
};


module.exports = {
    entry: PATHS.src,
    output: {
        path: PATHS.dist,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-3', 'stage-2', 'stage-1', 'stage-0']
                }
            }
        ]
    },
    resolve: {
        alias: {
            player: path.join(__dirname,'../src')
        }
    }
};
