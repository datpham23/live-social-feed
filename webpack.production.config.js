var webpack = require("webpack");
var options = require("./webpack.config");

var plugins = [
  new webpack.optimize.UglifyJsPlugin({
    output: {comments: false},
    sourceMap : false,
    compress: {
        warnings: false
    }
  }),
  new webpack.optimize.DedupePlugin()
]

options.plugins = options.plugins.concat(plugins)


module.exports = options;