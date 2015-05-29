'use strict';
var gulp = require('gulp'),
	watch = require('gulp-watch'),
	runSequence = require('run-sequence'),
	clean = require('gulp-clean'),
	server = require('gulp-develop-server'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	jade = require('gulp-jade'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	jshint = require('gulp-jshint');

var paths = {
	dist: './public/',
	src: './src/'
};

gulp.task('serve', function () {
	server.listen( { path: './bin/www' } );
});

// livereload browser on client app changes
gulp.task('livereload', ['serve'], function(){
	browserSync( {
	   proxy: "localhost:3000"
	});
});

gulp.task('img-min', function () {
	gulp.src(paths.dist + 'img/*', {read: false}).pipe(clean());
	gulp.src(paths.src + 'img/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('js', function () {
	gulp.src(paths.dist + 'js/*.js', {read: false}).pipe(clean());
	gulp.src(paths.src + 'js/**/*.js')
	.pipe(jshint())
  	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('jade', function () {
	gulp.src('./views/*.html', {read: false}).pipe(clean());
	gulp.src(paths.src + 'jade/pages/*.jade')
	.pipe(jade({ pretty: true }))
	.pipe(gulp.dest('./views/'));
});

gulp.task('stylus', function() {
  return gulp.src(paths.src + 'styles/common.styl')
  .pipe(stylus())
  .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
  .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task('del', function () {
	return gulp.src(['public', 'views'], {read: false}).pipe(clean());
});

gulp.task('copy:resources', function (){
	return gulp.src([
				paths.src + 'resources/**/*'
			])
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:scripts', function (){
	return gulp.src([
					'jquery/dist/jquery.min.js',
					'jquery/dist/jquery.min.map',
					'fontawesome/css/font-awesome.min.css',
					'fontawesome/css/font-awesome.css.map',
					'fontawesome/fonts/**/*',
					'OwlCarousel/owl-carousel/**/*',
					'!OwlCarousel/owl-carousel/owl.carousel.js',
					'fancybox/source/**/*',
				], {
				base: paths.src + 'vendor',
				cwd: paths.src + 'vendor'
			})
			.pipe(gulp.dest(paths.dist + 'libs'));
});

gulp.task('copy', ['copy:resources', 'copy:scripts']);

gulp.task('watch', ['livereload'], function () {
	watch([paths.src + 'jade/**/*.jade'], function(){
		gulp.run('jade');
		console.log('restarting browsers');
		reload();
	});
	watch([paths.src + 'styles/**/*.styl'], function(){
		gulp.run('stylus');
		console.log('restarting browsers');
		reload();
	});
	watch([paths.src + 'js/**/*.js'], function(){
		gulp.run('js');
		console.log('restarting browsers');
		reload();
	});
	watch([paths.src + 'img/**/*'], function(){
		gulp.run('img-min');
		console.log('restarting browsers');
		reload();
	});
	watch([paths.src + 'resources/**/*'], function(){
		gulp.run('copy:resources');
		console.log('restarting browsers');
		reload();
	});
	watch(['./app.js', 'bin/**/*'], function(){
		server.restart();
		reload();
		console.log('restarting server');
	});
	console.log('watch started');
});

gulp.task('build', ['del'], function(cb) {
	return runSequence('img-min', 'jade', 'stylus', 'js', 'copy', cb);
});

gulp.task('default', ['build'], function() {
	return gulp.start('watch');
});
