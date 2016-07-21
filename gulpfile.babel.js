'use strict';

import path from 'path';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

gulp.task('webpack', (callback) => {
  // run webpack
  webpack({
    context: path.join(__dirname, 'src'),
    entry: './app',
    output: {
      path: path.join(__dirname, 'assets'),
      publicPath: 'assets/',
      filename: 'snake.bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.png$|\.jpg$|\.gif$|\.ttf$|\.woff$|\.woff2$|\.eot$/, loader: 'file-loader',
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass?sourceMap'
        },
      ],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
    ],
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
    },
    resolve: {
      extensions: ['', '.js'],
    },
  }, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      // output options
    }));

    callback();
  });
});

gulp.task('webpack-dev-server', (callback) => {
  // Start a webpack-dev-server
  const compiler = webpack({
    devtool: 'inline-source-map',
    context: path.join(__dirname, '/src'),
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './app',
    ],
    output: {
      path: path.join(__dirname, '/assets'),
      filename: 'snake.bundle.js',
      publicPath: 'http://localhost:8080/assets/',
      crossOriginLoading: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development'),
        },
      }),
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /(node_modules)(?!\\react-popup\\)/,
        },
        {
          test: /\.png$|\.jpg$|\.gif$|\.ttf$|\.woff$|\.woff2$|\.eot$/, loader: 'file-loader',
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass?sourceMap',
        },
      ],
    },
    resolve: {
      extensions: ['', '.js'],
    },
  });

  new WebpackDevServer(compiler, {
    // webpack-dev-server options
    contentBase: 'http://localhost:8080/',
    // or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    //lazy: true,
    filename: 'snake.bundle.js',
    /*watchOptions: {
     aggregateTimeout: 300,
     poll: 1000
     },*/
    publicPath: '/assets/',
    stats: { colors: true },

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: false

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    /*proxy: {
     '*': 'http://aemz.dev.design.ru'
     }*/
  }).listen(8080, 'localhost', (err) => {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err);
      }
      // Server listening
      gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

      // keep the server alive or continue?
      // callback();
    });
});

gulp.task('build', ['webpack']);
gulp.task('default', ['webpack-dev-server']);
