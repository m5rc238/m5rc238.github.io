'use strict'
var gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {   
    return gulp.src('build/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./css')) 
        .pipe(browserSync.reload({stream: true}));
 })

 gulp.task('pug', function () {
    return gulp.src('build/*.pug')
        .pipe(pug({ pretty: false }))
        .pipe(gulp.dest('.'))    
        .pipe(browserSync.reload({stream: true}));
 })

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('build/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('build/**/*.pug', gulp.series('pug'));
});
