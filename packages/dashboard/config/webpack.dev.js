const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8083/',
  },
  devServer: {
    port: 8083,
    historyApiFallback: {
      index: 'index.html',
    },
    // needed to load fonts
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard', // declares a global variable inside our script
      filename: 'remoteEntry.js',
      // file we want to make public to the outside world
      exposes: {
        // Whenever someone asks for "*/DashboardApp", we'll provide the src/bootstrap file
        './DashboardApp': './src/bootstrap',
      },
      // designates which libraries should be shared between this package and other federated modules
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
