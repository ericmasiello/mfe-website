const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing', // declares a global variable inside our script
      filename: 'remoteEntry.js',
      // file we want to make public to the outside world
      exposes: {
        // Whenever someone asks for "*/MarketingApp", we'll provide the src/bootstrap file
        './MarketingApp': './src/bootstrap',
      },
      // designates which libraries should be shared between this package and other federated modules
      shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
