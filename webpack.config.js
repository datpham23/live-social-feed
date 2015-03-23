var path = require('path');
var webpack = require("webpack");
var glob = require("glob")

// var jsSrcPath = 'public/js/app/**';

// var files = glob.sync(jsSrcPath, {})
// var entries = {};


// for (var i = 0; i < files.length; i++) {
//   var file = files[i];
//   entries[file.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "")] = path.join(__dirname, file);
// }

module.exports = {
  cache : true,
  watch: false,
  entry : {
    'main' : path.join(__dirname, 'public/js/app/main.js')
  },
  output: {
    path : path.join(__dirname, 'public/'),
    filename: 'build/js/app/[name].js',
    chunkFilename: 'build/js/chunks/[id].chunk.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' },
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.css/, loader: "style-loader!raw-loader" },
      {
        test: /\.scss$/,
        loader: "style!css!sass?outputStyle=expanded&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./bower_components")) + "&" +
          "includePaths[]=" +
            (path.resolve(__dirname, "./node_modules"))
      }
    ]
  },
  resolve: {
    root: [path.join(__dirname, "bower_components")],
    extensions: ['', '.js', '.json','.jsx','.css']
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ]
};
