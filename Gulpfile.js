var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var path = require('path');
var webserver = require('gulp-webserver');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

gulp.task('styles', function() {
  gulp.src(APP_DIR + '/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(BUILD_DIR))
});

gulp.task('webpack', function() {
  gulp.src(APP_DIR + '/index.js')
    .pipe(webpack())
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('transpile', function() {
  return gulp.src(APP_DIR + '/index.js')
    .pipe(webpack({
      output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
      },
      module: {
        loaders: [{
          test: /\.jsx?/,
          include: APP_DIR,
          loader: 'babel'
        }]
      }
    }))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('default', ['styles', 'transpile', 'webserver'], function() {
  gulp.watch(APP_DIR + '/styles/**/*.scss', ['styles']);
  gulp.watch(APP_DIR + '/**/*.js', ['transpile']);
});

gulp.task('build', ['styles', 'transpile']);

gulp.task('serve', ['webserver']);
