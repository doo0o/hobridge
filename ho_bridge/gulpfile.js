const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const open = require('gulp-open');

const path = {
	dist: './dist/',
	src: './src/',
}
const scssOptions = {
	outputStyle: 'expanded', /* nested, expanded, compact, compressed */
	indentType: 'tab',
	indentWidth: 1,
	souceComments: true
}
gulp.task('html',()=> {
  return gulp
    .src(path.src + '/html/*.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: path.src + '/inc',
      }),
    )
    .pipe(gulp.dest(path.dist + '/html/'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('scss', () => {
  return gulp
    .src(path.src + 'assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(scss(scssOptions).on('error', scss.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dist + 'assets/css'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('scss:prod', () => {
  return gulp
    .src(path.src + 'assets/scss/**/*.scss')
    .pipe(autoprefixer())
    .pipe(scss({
      outputStyle: 'compressed',
    }).on('error', scss.logError))
    .pipe(gulp.dest(path.dist + 'assets/css'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('js', () => {
  return gulp
    .src(path.src + 'assets/js/**/*.js')
    .pipe(gulp.dest(path.dist + 'assets/js'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('images', () => {
  return gulp
    .src(path.src + 'assets/images/**')
    .pipe(gulp.dest(path.dist + 'assets/images'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('fonts', () => {
  return gulp
    .src(path.src + 'assets/fonts/**')
    .pipe(gulp.dest(path.dist + 'assets/fonts'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('browserSync', () => {
  return browserSync.init({
    port: 100,
    server: {
      baseDir: './'
    }
  })
});

gulp.task('open', function() {
  const options = {
      url: './index.html', // 열고자 하는 파일 경로
      app: 'chrome' // 원하는 브라우저 (예: 'chrome', 'firefox')
  };
  return gulp.src(__filename)
      .pipe(open(options));
});
gulp.task('watch', () => {
  gulp.watch(path.src + '**/*.html', gulp.series('html'));
  gulp.watch(path.src + 'assets/**/*.scss', gulp.series('scss'));
  gulp.watch(path.src + 'assets/**/*.js', gulp.series('js'));
  gulp.watch(path.src + 'assets/images/', gulp.series('images'));
});
gulp.task('default', gulp.parallel('html','scss','js','images','fonts','watch','browserSync', 'open'));
gulp.task('build', gulp.parallel('html','scss:prod','js','images','fonts'));

