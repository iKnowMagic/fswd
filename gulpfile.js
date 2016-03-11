var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

var del = require('del');
var browserSync = require('browser-sync');

gulp.task('jsonsrv', function() {
  plugins.jsonSrv.start({
    data: 'json-server/db.json',
    port: 3000,
    static: 'dist/'
  });
});

gulp.task('jsonsrv:dev', function() {
  plugins.jsonSrv.start({
    data: 'json-server/db.json',
    port: 3000,
    static: './'
  });
});

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
  .pipe(plugins.plumber())
  .pipe(plugins.jshint())
  .pipe(plugins.jshint.reporter(plugins.stylish));
});

//Clean
gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('usemin', ['jshint'], function() {
  return gulp.src('./app/**/*.html')  
  .pipe(plugins.usemin({
    css: [plugins.minifyCss(), plugins.rev()],
    js: [plugins.ngAnnotate(), plugins.uglify(), plugins.rev()]
  }))
  .pipe(plugins.debug({title: 'usemin'}))
  .pipe(gulp.dest('dist/'));
});

//Images
gulp.task('imagemin', function() {
  return del(['dist/images']),
    gulp.src('app/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest('dist/images'))
    .pipe(plugins.log2('Images task complete'))
  ;
});

gulp.task('copyfonts', ['clean'], function() {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));

  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
  .pipe(gulp.dest('./dist/fonts'));
});

//Watch
gulp.task('watch', function() { //gulp.task('watch', ['browser-sync'], function() {
  gulp.start('jsonsrv');
  gulp.watch(['app/scripts/**/*.js', 'app/styles/**/*.css', 'app/**/*.html'], ['usemin']);
  gulp.watch(['app/images/**/*'], ['imagemin']);
});

gulp.task('dev', function() {
  gulp.start('jsonsrv:dev');
});

gulp.task('browser-sync', ['default'], function() {
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    'dist/**/*'
  ];

  browserSync.init(files, {
    server: {
      baseDir: 'dist',
      index: 'index.html'
    }
  });

  gulp.watch(['dist/**']).on('change', browserSync.reload);
});

//Default task
gulp.task('default', ['clean'], function() {
  gulp.start('usemin', 'imagemin', 'copyfonts');
});





