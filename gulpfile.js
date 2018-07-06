const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');

gulp.task('transpile', function () {
  return gulp.src('app/scripts/app.js').
        pipe(babel({
            presets: ['env']
        })).
        pipe(gulp.dest('scripts')).
        pipe(browserSync.reload({
          stream: true
        }))
});

gulp.task('sass', function() {
  return gulp.src('app/stylesheets/styles.scss').
    pipe(sass()).
    pipe(autoprefixer()).
    pipe(gulp.dest('./stylesheets')).
    pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('copyindex', function () {
  gulp.src('app/index.html').
    pipe(gulp.dest(''));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
    browser: ["google chrome", "firefox", "firefox developer edition"]
  })
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '.'
    },
  })
})

gulp.task('watch', ['sass', 'transpile', 'copyindex', 'browserSync'], function() {
  gulp.watch('app/stylesheets/styles.scss', ['sass']);
  gulp.watch('app/scripts/app.js', ['transpile']);
  gulp.watch('app/index.html', ['copyindex']);
  gulp.watch('index.html', browserSync.reload);
})