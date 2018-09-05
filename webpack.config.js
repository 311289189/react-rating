const path = require('path');
const webpack = require('webpack');
const PACKAGE = require('./package.json');
const banner = PACKAGE.name + ' - ' + PACKAGE.version + ' | ' +
  '(c) 2015, ' + new Date().getFullYear() + '  ' + PACKAGE.author + ' | ' +
  PACKAGE.license + ' | ' +
  PACKAGE.homepage;

module.exports = {
  mode: 'development',
  entry: {
    'react-rating': './src/react-rating.js'
  },
  output: {
    // Output the bundled file.
    path: path.resolve(__dirname, 'lib'),
    // Use the name specified in the entry key as name for the bundle file.
    filename: '[name].js',
    // Export as a Universal Module Definition library.
    library: 'ReactRating',
    libraryTarget: 'umd',
    // The modified bundle is served from memory at the relative path
    // specified in publicPath.
    // I use the same as the output path to use the same index.html either
    // served by webpack-dev-server or as a static file loaded in the browser.
    publicPath: '/lib',
    // The umd target generates invalid code for running inside a Node.js.
    // It generates 'window' as the global object.
    // Workaround:
    // https://webpack.js.org/configuration/output/#output-librarytarget
    // https://github.com/webpack/webpack/issues/6677
    globalObject: 'typeof self !== "undefined" ? self : this'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        // Test for js or jsx files.
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "eslint-loader"
        ]
      }
    ]
  },
  externals: {
    // Don't bundle the 'react' npm package with the component.
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  resolve: {
    // Include empty string '' to resolve files by their explicit extension
    // (e.g. require('./somefile.ext')).
    // Include '.js', '.jsx' to resolve files by these implicit extensions
    // (e.g. require('underscore')).
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      // If BUILD_DEV is in process environment, return true. Otherwise,
      // return (void 0). BUILD_DEV=1 before webpack command will do the job.
      __DEV__: process.env.BUILD_DEV && 'true'
    }),
    new webpack.BannerPlugin(banner)
  ],
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true
  }
};
