const env = process.env.NODE_ENV;
const dev = require('./webpack/webpack.dev');
const prod = require('./webpack/webpack.prod');
module.exports = function() {
  if (env === 'dev') return dev;
  return prod;
};