'use strict'

var gulp = require('gulp'),
      nodemon = require('gulp-nodemon'),
      uglify = require('gulp-uglify');
      sass = require('gulp-ruby-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      minifycss = require('gulp-minify-css'),
      jshint = require('gulp-jshint'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      notify = require('gulp-notify'),
      cache = require('gulp-cache'),
      livereload = require('gulp-livereload'),
      del = require('del'),
      watchify = require('watchify');

// clean is a dependency of default.  It will run first.
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// watch files for changes
gulp.task('watch', function() {

  gulp.watch('app/styles/**/*.scss', ['styles']);  
  gulp.watch('app/scripts/**/*.js', ['scripts']);  
  gulp.watch('app/images/**/*', ['images']);  

  livereload.listen();
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});

// process css styles
gulp.task('styles', function() {
  return gulp.src('app/styles/main.scss') 
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css')) 
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css')) 
    .pipe(notify({ message: ' Stylesheet processing complete.' }));
});

// process javascript files
gulp.task('scripts', function() {
  return gulp.src('app/scripts/**/*.js') 
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js')) 
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js')) 
    .pipe(notify({ message: 'Script processing complete.' }));
});

// compress images
gulp.task('images', function() {
  return gulp.src('app/images/**/*') 
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(notify({ message: 'Image compression complete.' }));
});

// clean distribution directory before deployment
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});