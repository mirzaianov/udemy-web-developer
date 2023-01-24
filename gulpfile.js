const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

gulp.task('server', function () {
    browserSync({
        server: {
            // поменять путь!
            baseDir: '46/uber-course/src',
        },
    });

    // поменять путь!
    gulp.watch('46/uber-course/src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return (
        gulp
            // поменять путь!
            .src('46/uber-course/src/sass/**/*.+(scss|sass)')
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(rename({ suffix: '.min', prefix: '' }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            // поменять путь!
            .pipe(gulp.dest('46/uber-course/src/css'))
            .pipe(browserSync.stream())
    );
});

gulp.task('watch', function () {
    // поменять путь!
    gulp.watch('46/uber-course/src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
