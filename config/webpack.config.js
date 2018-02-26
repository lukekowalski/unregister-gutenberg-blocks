const webpack = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const autoprefixer = require( 'autoprefixer' );
const StyleLintPlugin = require('stylelint-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

const unregisterGutenbergBlocksCSS = new ExtractTextPlugin( {
  filename: './dist/css/ugb-style.css',
} );

const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
       plugins: [
          require('postcss-flexbugs-fixes'),
          autoprefixer( {
            browsers: [
              '>1%',
              'last 2 versions',
              'ie >= 11',
            ],
            flexbox: 'no-2009',
          } ),
        ],
      },
    },
    {
      loader: 'sass-loader',
      query: {
        outputStyle: NODE_ENV === 'production' ? 'compressed' : 'expanded'
      },
    },
  ],
};


const webpackConfig = {
  entry: {
    './dist/js/options-page' : './src/options-page/index.js',
    './dist/js/bundle' : './src/app/index.js',
  },
  output: {
    filename: '[name].js',
  },
  devtool: NODE_ENV === 'production' ? 'none' : 'cheap-eval-source-map',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // Enables caching for faster rebuilds.
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: "pre",
            fix: true
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        use: unregisterGutenbergBlocksCSS.extract( extractConfig ),
      },
    ],
  },
  plugins: [ unregisterGutenbergBlocksCSS, new StyleLintPlugin({syntax: 'scss'}) ],
  stats: {
    modules: false,
    children: false
  }
};

if ( NODE_ENV === 'production' ) {

  // When running in production, we want to use the minified script so that the file is smaller
  webpackConfig.plugins.push( 
    new webpack.optimize.UglifyJsPlugin( {
      compress: {
        warnings: false,
        drop_console: true,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
      sourceMap: false,
    })
  );

}

module.exports = webpackConfig;
