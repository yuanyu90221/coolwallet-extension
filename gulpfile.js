const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const minifyHtml = require('gulp-minify-html');
const minifyCSS = require('gulp-minify-css');
const inline = require('gulp-inline');
const gulpSequence = require('gulp-sequence');
const webpack = require('webpack-stream');
const minifyJs = require('gulp-minify');
const del = require('del');
const folders = require('gulp-folders');
const mkdirp = require('mkdirp');
gulp.task('remove', function() {
  return del(['./dist/**'],{force: true});
});
gulp.task('create-dir', function(){
  return mkdirp('./dist', ()=> {
    console.log('folder created');
  })
})
gulp.task('lib-cp', function() {
  return gulp.src('./src/lib/*')
    .pipe(gulp.dest('./dist/lib'))
})
gulp.task('icon', function() {
  return gulp.src('./images/*')
    .pipe(gulp.dest('./dist/images'))
})
gulp.task('manifest', function() {
  return gulp.src('./manifest.json')
    .pipe(gulp.dest('./dist'))
})
gulp.task('webpack', function() {
  return gulp.src('./src/js/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('rebuild', gulpSequence('remove', 'create-dir', 'lib-cp', 'manifest','icon','webpack'));