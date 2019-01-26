var gulp = require('gulp'),
  exit = require('gulp-exit'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  log = require('fancy-log'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),

  browserify = require('browserify'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  sourcemaps = require('gulp-sourcemaps'),

  sass = require('gulp-sass'),
  nodeSass = require('node-sass'),
  cleanCss = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),

  isProduction = process.env.NODE_ENV === 'production' ? true : false;

// Set node-sass as gulp-sass compiler
sass.compiler = nodeSass;

// Distributes Static Files
function distributeFiles(){
  log('Distributing Static Files');
  return gulp.src([
    './src/assets/index.html',
    // './src/assets/images/**/*.*',
    // './src/assets/fonts/**/*.*'
  ])
  .pipe( gulp.dest('./dist/') );
}

function clearFiles(){
  log('Clearing dist folder');
  return gulp.src([
    './dist/**/*.map',
  ])
  .pipe(clean());
}

// Compiles JS Files
function compile(watch) {
  // Initialize bundler
  var bundler = watchify(
    browserify('./src/index.js', {
      debug: !isProduction,
    }).transform(babelify, { 
      sourceMaps: !isProduction
    })
  );

  function rebundle() {
    log('Compiling JS files');
    var stream = bundler
      .bundle()
      .on('error', function (err) {
          log.error(err);
          this.emit('end');
      })
      .pipe(source('script.js'));
    // Create Source Maps if in Dev mode
    if ( !isProduction ){ 
      stream = stream.pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
    } else {
      stream = stream.pipe(buffer())
        .pipe(uglify());
    }
    return stream
      .pipe(gulp.dest('./dist/js'));
  }

  if (watch) {
    bundler.on('update', function () {
      log('-> bundling...');
      rebundle();
    });
    return rebundle();
  } else {
    return rebundle().pipe(exit());
  }
}

// Initialize watcher for JS compiler
function watch() {
  return compile(true);
}

gulp.task('sass', ['distribute-static-files'], function() {
  log('Compiling SASS files' + ( isProduction ? ' in Production' : ' in Development' ) );
  var stream =  gulp.src('./src/sass/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }));
  if ( process.env.NODE_ENV === 'production' ) {
    stream.pipe(cleanCss());
  }
  return stream.pipe(gulp.dest('./dist/css'));
} );

gulp.task('sass:watch',['sass'], function(){
  gulp.watch([
    './src/assets/index.html',
    './src/sass/style.scss',
    './src/sass/**/*.scss'
  ], ['distribute-static-files', 'sass']);
});

gulp.task('build', function () {
    return compile();
});

gulp.task('watch', function () {
    return watch();
});

gulp.task('clear-files', function(){
  return clearFiles();
} );

gulp.task('distribute-static-files', ['clear-files'], function(){
  return distributeFiles();
} );

var isSASS = process.env.BUILD_TYPE === 'sass';
  jsTasks = [ 'watch' ],
  sassTasks = [ 'sass:watch'];

gulp.task('default', isSASS ? sassTasks : jsTasks );
