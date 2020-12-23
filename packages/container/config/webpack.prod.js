const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

// defined in CI/CD
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production', // minifies/uglifies code
  output: {
    filename: '[name].[contenthash].js', // cache busting file name
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // technically optional for the host module
      remotes: {
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
