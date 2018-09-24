let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        suffix: '.min'
      }))  
    .pipe(gulp.dest('build/css'));
});

gulp.task('minify-js', function() {
  return gulp.src('src/js/*.js')
      .pipe(concat('heartthrob.js'))
      .pipe(rename('heartthrob.min.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('copy-files', () => {
    return gulp.src('src/css/**')
      .pipe(gulp.dest('build/css'));
  });

  gulp.task('copy-files-js', () => {
    return gulp.src('src/js/**')
      .pipe(gulp.dest('build/js'));
  });

  gulp.task('build', ['minify-css', 'minify-js', 'copy-files', 'copy-files-js']);