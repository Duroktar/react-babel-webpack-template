const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const webserver = require('gulp-webserver')

const __build = path.resolve(__dirname, 'public')
const __src = path.resolve(__dirname, 'app')

gulp.task('sass', () => {
  gulp.src(__src + '/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(__build))
})

gulp.task('webserver', () => {
  gulp.src('.')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: true,
      directoryListing: false,
      open: true
    }))
})

gulp.task('transpile', () => {
  return gulp.src(__src + '/index.js')
    .pipe(webpack({
      output: {
        path: __build,
        filename: 'bundle.js'
      },
      module: {
        loaders: [{
          test: /\.jsx?/,
          include: __src,
          loader: 'babel-loader',
          query:
            {
              presets:['es2015', 'react']
            }
        }]
      }
    }))
    .pipe(gulp.dest(__build))
})

gulp.task('default', ['sass', 'transpile', 'webserver'], () => {
  gulp.watch(__src + '/styles/**/*.scss', ['sass'])
  gulp.watch(__src + '/**/*.js', ['transpile'])
})

gulp.task('build', ['sass', 'transpile'])

gulp.task('serve', ['webserver'])
