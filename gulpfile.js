const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function () {
    browserSync({
        server: {
            // TODO: поменять путь! изменился путь на dist!
            baseDir: '71/pulse/dist',
        },
    });

    // TODO: поменять путь!
    gulp.watch('71/pulse/src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return (
        gulp
            // TODO: поменять путь!
            .src('71/pulse/src/sass/**/*.+(scss|sass)')
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
            .pipe(rename({ suffix: '.min', prefix: '' }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            // TODO: поменять путь! изменился путь на dist!
            .pipe(gulp.dest('71/pulse/dist/css'))
            .pipe(browserSync.stream())
    );
});

gulp.task('watch', function () {
    // TODO: поменять путь! добавлено расширение css
    gulp.watch('71/pulse/src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    // добавлена строка
    gulp.watch('71/pulse/src/*.html').on('change', gulp.parallel('html'));
});

// добавлена задача html
gulp.task('html', function () {
    return (
        gulp
            // TODO: поменять путь!
            .src('71/pulse/src/*.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest('71/pulse/dist/'))
    );
});

// добавлена задача scripts
gulp.task('scripts', function () {
    return (
        gulp
            // TODO: поменять путь!
            .src('71/pulse/src/js/**/*.js')
            .pipe(gulp.dest('71/pulse/dist/js'))
    );
});

// добавлена задача fonts
gulp.task('fonts', function () {
    return (
        gulp
            // TODO: поменять путь!
            .src('71/pulse/src/fonts/**/*')
            .pipe(gulp.dest('71/pulse/dist/fonts'))
    );
});

// добавлена задача icons
gulp.task('icons', function () {
    return (
        gulp
            // TODO: поменять путь!
            .src('71/pulse/src/icons/**/*')
            .pipe(gulp.dest('71/pulse/dist/icons'))
    );
});

// добавлена задача mailer
gulp.task('mailer', function () {
    return (
        gulp
            // TODO: поменять путь!
            .src('71/pulse/src/mailer/**/*')
            .pipe(gulp.dest('71/pulse/dist/mailer'))
    );
});

// добавлена задача images
gulp.task('images', function () {
    return (
        gulp
            // TODO: поменять путь!
            .src('71/pulse/src/img/**/*')
            .pipe(imagemin())
            .pipe(gulp.dest('71/pulse/dist/img'))
    );
});

gulp.task(
    'default',
    gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'icons', 'mailer', 'images')
);
