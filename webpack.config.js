const ENV = process.env.ENV || 'production';
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'public'),
};


console.log(ENV);

const common = {
  entry: PATHS.src,
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css-loader'],
      },
      // {
      //   test: /\.scss$/i,
      //   loaders: [
      //     // Creates `style` nodes from JS strings
      //     'style-loader',
      //     // Translates CSS into CommonJS
      //     'css-loader',
      //     // Compiles Sass to CSS
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
};

if (ENV === 'development') {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);
  
  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';
  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + ENV;
  console.log(currentPath, envPath);
  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  
  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    console.log(next, prev);
    prev[next] = JSON.stringify(fileEnv[next]);
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin(envKeys),
      // new webpack.HtmlWebpackPlugin({
      //   template: './public/index.html',
      //   filename: './index.html',
      //   favicon: './public/favicon.ico'
      // })
    ],
  });
} else {
  // config can be added here for minifying / etc
  module.exports = merge(common, {});
}
