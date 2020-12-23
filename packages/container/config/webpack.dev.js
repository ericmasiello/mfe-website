const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    // this is the HOST app
    new ModuleFederationPlugin({
      name: 'container', //technically this isn't required for the host app
      // desigate the different remote options
      remotes: {
        // keys are the different modules we wanto load in
        // value is where it exists

        // "marketing" before the "@" has to match up to the `name` "marketing" in the Marketing
        // app's "ModuleFederationPlugin" config

        // the "marketing" key is used locally within the container app such that if we ever import
        // something named "marketing", it will resolve to "marketing@http://localhost:8081/remoteEntry.js"
        marketing: 'marketing@http://localhost:8081/remoteEntry.js',
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
