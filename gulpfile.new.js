var gulp = require('gulp');
var exit = require('gulp-exit');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('fancy-log');
var sass = require('gulp-sass');
var nodeSass = require('node-sass');
var autoprefixer = require('gulp-autoprefixer');

sass.compiler = nodeSass;


function compile(watch) {
    var bundler = watchify(
      browserify('./src/index.js', {
        debug: true
      }).transform(babelify, { })
    );

    function rebundle() {
        return bundler
            .bundle()
            .on('error', function (err) {
                log.error(err);
                this.emit('end');
            })
            .pipe(source('index.js'))
            .pipe(gulp.dest('./dist/js'));
            .pipe(buffer())
            .pipe(rename('index.min.js'))
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/js'));
    }

    if (watch) {
        bundler.on('update', function () {
            log('-> bundling...');
            rebundle();
        });

        rebundle();
    } else {
        rebundle().pipe(exit());
    }
}

function watch() {
  return compile(true);
}

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(gulp.dest('./dist/css'));
} );

gulp.task('sass:watch', function(){
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('build', function () {
    return compile();
});

gulp.task('watch', function () {
    return watch();
});

gulp.task('default', ['watch', 'sass:watch']);
