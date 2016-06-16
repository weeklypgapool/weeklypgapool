var gulp = require('gulp'),
		gutil = require('gulp-util'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat');

gulp.task('js', function () {
  gulp.src(['./public/app/*.js','./public/app/**/*.js'])
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('default', function () {
	gulp.run('js');
});
