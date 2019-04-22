const merge = require('webpack-merge'); // eslint-disable-line
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
});
