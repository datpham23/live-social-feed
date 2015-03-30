var gulp = require('gulp');
var multipipe = require('multipipe');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var named = require('vinyl-named');
var path = require('path')

var isProd = true;

var watchPath = ['resources/js/**','/resources/css/**'];
var jsSrcPath = 'resources/js/app/**/*.*';
var jsDestPath = 'build/js/app/'



var webpackOptions = require('./webpack.config')


gulp.task('buildJS', function(){ 
  webpackOptions.watch = !isProd;

  if(isProd){
    webpackOptions.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      sourceMap : false
    }));
    webpackOptions.plugins.push(new webpack.optimize.DedupePlugin())
  }

  multipipe(
    gulpWebpack(webpackOptions),
    gulp.dest('.')
  ).on('error', function(error){
    console.log(error)
  });

});



gulp.task('default',['buildJS']);

gulp.task('watch', function() {
    isProd = false;
    watching = true;
    gulp.watch(watchPath, ['default']);
});


