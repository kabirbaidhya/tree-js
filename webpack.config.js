const outputFilename = 'tree-manip' + (process.env.NODE_ENV === 'production' ? '.min.js' : '.js');

module.exports = {
    output: {
        library: 'Tree',
        libraryTarget: 'window',
        path: './dist',
        filename: outputFilename
    },
    entry: {
        library: './src/Tree'
    },
    module: {
        loaders: [
            {test: /\.js?$/, include: /src/, exclude: /node_modules/, loader: 'babel'}
        ]
    }
};
