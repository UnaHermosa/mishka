const gulp = require('gulp');
const concat = require('gulp-concat-css');
const del = require('del');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const build = gulp.series(clean, gulp.parallel(html, css, images));
const watchapp = gulp.parallel(build, watchFiles, serve);

function html() {
  return gulp.src('src/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src('src/blocks/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg, png, jpeg, svg, avif, webp,gif, ico}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.{woff, woff2, ttf, woff2-variations}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg, png, jpeg, svg, avif, webp,gif, ico}'], images);
  gulp.watch(['src/fonts/**/*.{woff, woff2, ttf, woff2-variations}'], fonts)
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}

exports.html = html;
exports.css = css;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;