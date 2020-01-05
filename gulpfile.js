let gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var merge = require('merge-stream')
var minifyjs = require('gulp-js-minify')
var sass = require('gulp-sass')
var removeEmptyLines = require('gulp-remove-empty-lines')

var deps = {
	'heartthrob-vision': {
		'build/js/**': ''
	}
}

gulp.task('restore', async() => {
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

/* building sass */
gulp.task('build-sass-normal', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
		.pipe(removeEmptyLines({ removeComments: true }))
		.pipe(rename('heartthrob.css'))
		.pipe(gulp.dest('build/css/'))
})

gulp.task('build-sass-min', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename('heartthrob.min.css'))
		.pipe(gulp.dest('build/css/'))
})

gulp.task('build-sass-dev', function() {
	return gulp.src('src/sass/main.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(removeEmptyLines({ removeComments: true }))
		.pipe(rename('heartthrob.css'))
		.pipe(gulp.dest('../Heartthrob-docs/heartthrob-docs/wwwroot/lib/heartthrob/css'))
		// using this last gulp.dest() to test on the docs while it's beeing develop, a better solution will be provided.
})

gulp.task('minify-js', function() {
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

gulp.task('copy-files-js', () => {
	return gulp.src('src/js/**')
		.pipe(gulp.dest('build/js'))
})

gulp.task('copy-files-js-dev', () => {
	return gulp.src('src/js/**')
		.pipe(gulp.dest('../Heartthrob-docs/heartthrob-docs/wwwroot/lib/heartthrob/js'))
})

gulp.task('build-js', gulp.parallel('restore', 'minify-js', 'copy-files-js'))
gulp.task('build-img', gulp.parallel('copy-files-img'))
gulp.task('build-sass', gulp.parallel('build-sass-normal', 'build-sass-min'))

gulp.task('build', gulp.parallel('build-img', 'build-js', 'build-sass'))
gulp.task('build-dev', gulp.parallel('build', 'build-sass-dev', 'copy-files-js-dev'))
gulp.task('default', gulp.parallel('build'))
