'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const WebpackDevServer = require("webpack-dev-server")

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
