var gulp = require('gulp');
var browserify = require('browserify')
var babelify = require('babelify')
var reactify = require('reactify')
var source = require('vinyl-source-stream')
var concat = require('gulp-concat');

gulp.task('browserify', function(){
	browserify('./src/js/main.js')
	.transform('babelify', {presets: ['es2015', 'react']})
	.bundle()
	.pipe(source('main.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function(){
	gulp.src('src/index.html')
	.pipe(gulp.dest('dist'));
	gulp.src('src/assets/**/*.*')
	.pipe(gulp.dest('dist/assets'));

	gulp.src('node_modules/toastr/build/toastr.css')
    //.pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('default', ['browserify', 'copy'], function(){
	return gulp.watch('src/**/*.*', ['browserify', 'copy'])
});