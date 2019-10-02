let gulp = require('gulp')
let cleanCSS = require('gulp-clean-css')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var merge = require('merge-stream')
var minifyjs = require('gulp-js-minify')
var sass = require('gulp-sass')

var deps = {
	'heartthrob-vision': {
		'build/js/**': ''
	}
}

gulp.task('sass', function () {
	return gulp.src('src/sass/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('build/sass/'))
		.pipe(gulp.dest('../Heartthrob-docs/heartthrob-docs/wwwroot/css/'))
})

gulp.task('watch', function () {
	gulp.watch('src/scss/*.scss', gulp.series('sass'))
})

gulp.task('restore', async () => {
	var streams = []

	for (var prop in deps) {
		console.log('Restoring scripts for: ' + prop)
		for (var itemProp in deps[prop]) {
			streams.push(gulp.src('node_modules/' + prop + '/' + itemProp)
				.pipe(gulp.dest('build/js/' + deps[prop][itemProp])))
		}
	}

	return merge(streams)
})

gulp.task('minify-css', () => {
	return gulp.src('src/css/*.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('build/css'))
})

gulp.task('minify-js', function () {
	return gulp.src('src/js/*.js')
		.pipe(concat('heartthrob.js'))
		.pipe(rename('heartthrob.min.js'))
		.pipe(minifyjs())
		.pipe(gulp.dest('build/js'))
})

gulp.task('copy-files', () => {
	return gulp.src('node_modules/heartthrob-vision/build/js/**')
		.pipe(gulp.dest('src/js'))
})

gulp.task('copy-files-img', () => {
	return gulp.src('src/img/**')
		.pipe(gulp.dest('build/img'))
})

gulp.task('copy-files-css', () => {
	return gulp.src('src/css/**')
		.pipe(gulp.dest('build/css'))
})

gulp.task('copy-files-js', () => {
	return gulp.src('src/js/**')
		.pipe(gulp.dest('build/js'))
})

gulp.task('build', gulp.parallel('restore', 'copy-files-css', 'minify-css', 'minify-js', 'copy-files-js', 'copy-files-img'))
gulp.task('default', gulp.parallel('build'))
