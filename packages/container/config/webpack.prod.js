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
    publicPath: '/container/latest/', // this maps to the s3 folder structure we apply
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // technically optional for the host module
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
        auth: `auth@${domain}/auth/latest/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
