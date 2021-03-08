// We have to require our dependencies
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// create a TASK to compile Jade to HTML using gulp-jade
gulp.task('jade', function() {
   gulp.src(['./build/**/*.jade'])
   .pipe($.jade({pretty: true, doctype: 'html'}))
   .on('error', $.util.log)
   .pipe(gulp.dest('./'));
});

// create a TASK to compile Sass into CSS using gulp-sass
gulp.task('sass', function() {
   gulp.src(['./app/**/*.sass'])
   .pipe($.sass({style: 'expanded'}))
   .pipe(gulp.dest('./'));
});

// create a TASK to WATCH for changes in your files
// this will "watch" for any changes in your files and rerun gulp if necessary
gulp.task('watch', function() {
   gulp.watch('./build/**/*.jade', gulp.series('jade'));
   gulp.watch('./build/**/*.sass', gulp.series('sass'));
});

// finally, create a TASK that will run all commands when typing "gulp"
// in Terminal

gulp.task('default',  gulp.series('jade', 'sass', 'watch'), function() {});