let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        suffix: '.min'
      }))  
    .pipe(gulp.dest('build'));
});

gulp.task('copy-files', () => {
    return gulp.src('src/css/*.css')
      .pipe(gulp.dest('build'));
  });

  gulp.task('build', ['minify-css', 'copy-files']);