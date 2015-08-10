var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');
var nyanProgressPlugin = require('nyan-progress-webpack-plugin');
var statsPlugin = require('stats-webpack-plugin');

var DEBUG = process.env.NODE_ENV !== 'production';
var port = 3000;

var styles = 'css'
    + '?-restructuring&-minimize'
    + '!cssnext'
    + '!csslint'
    + '!postcss'
;

module.exports = {
    port: port,
    devtool: 'eval',
    entry: getEntrySources([
        './src/index'
    ]),
    output: {
        path: path.join(__dirname,'dist'),
        publicPath: '/dist/',
        filename: 'yarrponent.js',
        chunkFilename: 'yarrponent-[chunkhash].js'
    },
    stats: {
        colors: true,
        reasons: DEBUG
    },
    cssnext: {
        browsers: "last 2 versions",
        compress: ! DEBUG
    },
    postcss: function () {
        return [
            require('postcss-mixins')(),
            require('postcss-bem-linter')(),
            require('postcss-bem')({
                defaultNamespace: undefined,
                style: 'suit' // suit or bem, suit by default
            }),
            require('postcss-nested')({ bubble: ['phone'] }),
            require('postcss-simple-vars')(),
            require('postcss-assets')({
                basePath: './dist',
                loadPaths: ['images', 'images/fonts']
            }),

            require('postcss-brand-colors')(),
            require('postcss-size')(),
            require('postcss-custom-media')(),
            //require('rtlcss')(),
            //require('postcss-vertical-rhythm')(),
            //require('postcss-style-guide')({
            //    name: 'undefined'
            //}),
            //require('postcss-reporter')(),
            //require('postcss-cssstats')(function(stats){
            //    if (DEBUG) console.log(stats);
            //})
        ];
    },
    plugins: (function() {
        var plugins = [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(DEBUG ? 'development' : 'production'),
                    IS_BROWSER: true
                }
            })
        ];

        if (DEBUG) {
            plugins.push(
                new webpack.HotModuleReplacementPlugin(),
                new webpack.NoErrorsPlugin(),
                //new statsPlugin('webpack.stats.'+ new Date().toISOString() +'.json', {
                //    source: false,
                //    modules: false
                //}),
                new nyanProgressPlugin()
            );
        } else {
            plugins.push(
                //new extractTextPlugin('style.css', {
                //    allChunks: true
                //}),
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    // keep_fnames prevents function name mangling.
                    // Function names are useful. Seeing a readable error stack while
                    // being able to programmatically analyse it is priceless. And yes,
                    // we don't need infamous FLUX_ACTION_CONSTANTS with function name.
                    // It's ES6 standard polyfilled by Babel.
                    /* eslint-disable camelcase */
                    compress: {
                        keep_fnames: true,
                        screw_ie8: true,
                        warnings: false // Because uglify reports irrelevant warnings.
                    },
                    mangle: {
                        keep_fnames: true
                    }
                    /* eslint-enable camelcase */
                })
            );
        }

        return plugins;
    })(),
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'src'),
                loaders: DEBUG ? ['react-hot', 'babel'] : ['babel']
            },
            {
                test: /\.s?css$/,
                include: path.join(__dirname, 'src'),
                loader: DEBUG ? 'style!' + styles : extractTextPlugin.extract(styles)
            },
            {
                test: /\.(gif|jpg|png|woff|woff2|eot|ttf|svg)$/,
                include: path.join(__dirname, 'src'),
                loader: 'url-loader?limit=100000',
            }
        ]
    }
}

function getEntrySources(sources)
{
    if (DEBUG) {
        sources.push('webpack-dev-server/client?http://0.0.0.0:' + port);
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}
