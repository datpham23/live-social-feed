var path = require('path')
var webpack = require("webpack");

module.exports = {
  cache : true,
  watch: false,
  entry : {
    'main' : path.join(__dirname, 'resources/js/app/main.js')
  },
  output: {
    // path : 'build/js/',
    filename: 'build/js/app/[name].js',
    chunkFilename: 'build/js/chunks/[id].chunk.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.css/, loader: "style-loader!raw-loader" },
    ]
  },
  resolve: {
    root: [path.join(__dirname, "bower_components")],
    extensions: ['', '.js', '.json','.jsx','.css']
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
};
