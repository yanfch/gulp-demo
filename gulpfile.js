'use stirct';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del', 'imagemin-pngquant', 'jshint-stylish']
});

gulp.task('clean', function() {
  $.del(['public/build']);
});

// js
gulp.task('scripts', ['clean'], function() {
  return gulp.src([
    'public/libs/**/*.js'
  ])
  .pipe($.uglify())
  .pipe($.concat('app.min.js'))
  .pipe($.size())
  .pipe(gulp.dest('public/build/libs'));
});

// css
gulp.task('minify-css', ['clean'], function() {
  return gulp.src([
    'public/css/**/*.css'
  ])
  .pipe($.minifyCss())
  .pipe($.concat('app.min.css'))
  .pipe($.size())
  .pipe(gulp.dest('public/build/css'));
});

// html
gulp.task('minify-html', ['clean'], function() {
  return gulp.src([
    'view/**/*.html'
  ])
  .pipe($.htmlmin({
    collapseWhitespace: true, // 清除空格
    collapseBooleanAttributes: true, // 省略布尔属性的值，比如：<input checked="checked"/>,那么设置这个属性后，就会变成 <input checked/>
    removeComments: true, // 清除html中注释的部分，我们应该减少html页面中的注释
    removeEmptyAttributes: true, // 清除所有的空属性
    removeScriptTypeAttributes: true, // 清除所有script标签中的type="text/javascript"属性
    removeStyleLinkTypeAttributes: true, // 清楚所有Link标签上的type属性
    minifyJS: true, // 压缩html中js
    minifyCSS: true // 压缩html中css
  }))
  .pipe($.size())
  .pipe(gulp.dest('public/build/html'));
});

// images
gulp.task('images', ['clean'], function() {
  return gulp.src([
    'public/images/**/*'
  ])
  .pipe($.imagemin({
    progressive: true,
    use: [$.imageminPngquant()] // 使用pngquant来压缩png图片
  }))
  .pipe($.size())
  .pipe(gulp.dest('public/build/images'));
});

// watch
gulp.task('watch', function() {
  // gulp.watch('public/libs/*.js', function(event) {
  //   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  // })
  gulp.watch('public/libs/*.js', ['default']);
});

// js check
gulp.task('jsLint', function() {
  return gulp.src([
    'public/libs/**/*.js'
  ])
  .pipe($.jshint())
  .pipe($.jshint.reporter($.jshintStylish))
  // .pipe($.jshint.reporter('jshint-stylish'))  // jshint-stylish 两种写法
  .pipe($.size());
});

gulp.task('default', ['scripts', 'minify-css', 'minify-html', 'images']);