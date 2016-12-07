var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var packageJson = require('./package.json');

var DEV = JSON.parse(process.env.BUILD_DEV || false);
var envInfo = DEV ? 'development': 'production';
console.info('Build editor,', envInfo, 'version', packageJson.version);

var developFlag = new webpack.DefinePlugin({
  __DEV__: DEV
});

var listOfPlugins = [
  developFlag,
  new ExtractTextPlugin('app.css?v=' + packageJson.version, {
    allChunks: true
  })
];

//uglify js if production build
var uglifierOptions = {minimize: true, mangle: {except: ['exports', 'require']}};
!DEV && listOfPlugins.push(new webpack.optimize.UglifyJsPlugin(uglifierOptions));

function getHash() {
  return DEV ? '[path][name]__[local]' : '[local]_[hash:base64:5]';
}


module.exports = {
  entry: './src/index.tsx',
  devtool: DEV && "inline-source-map",
  output: {
    filename: './dist/index.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css']
  },
  plugins: listOfPlugins,
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: "tslint",
        emitErrors: true
      }
    ],
    loaders: [
      {
        test: /\.ts(x)?$/,
        exclude: /(node_modules|__tests__)/,
        loaders: ['ts-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&compress&localIdentName='
          + getHash() +'!autoprefixer-loader')
      }
    ]
  },

  tslint: {
    emitErrors: false,
    failOnHint: false
  },

  devServer: {
    stats: 'errors-only',

    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
};
