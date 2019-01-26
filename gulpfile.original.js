var 
  gulp = require('gulp'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  es = require("event-stream"),
  source = require('vinyl-source-stream'),
  rename = require("gulp-rename"),
  streamify = require("gulp-streamify"),
  uglify = require("uglify-js"),
  ftp = require("vinyl-ftp"),
  fs = require("fs"),
  gutil = require("gulp-util"),
  noop = require("gulp-noop"),
  clean = require("gulp-clean");

/*
 * SASS & CSS handlers
 */
var 
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  compass = require('gulp-compass'),
  concat = require("gulp-concat");

var 
  // Javscript Vendor Files required before our app. 
  // These are pre-pended to the app in the 'bundle-js' task
  jsVendors = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/boostrap.min.js'
  ],
  jsFile = "script.js";


/*
 * Compile Main App Js Files and React
 * and place in the staging 'bundle' directory
 */
gulp.task('compiling-react', function(){
  if ( process.env.NODE_ENV === 'production' ){
    console.log("Building in Production Mode");
  }
  
  return browserify('./src/main.js')
    .transform(babelify,{
      presets: ["es2015", "react"]
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('bundle'));
});

/*
 * Prepend jQuery and Bootstrap
 * to our staged app 
 */
gulp.task('bundle-js', ['compiling-react'], function(){
  var jsVendorFiles = jsVendors.slice();
  jsVendorFiles.push('./bundle/bundle.js');

  return gulp.src(jsVendorFiles)
    .pipe( concat( jsFile ) )
    .pipe( gulp.dest('dist') );
});

gulp.task('minify-js', ['bundle-js'], function(cb){
  if ( process.env.NODE_ENV === 'production' ){
    var result = uglify.minify('dist/' + jsFile);
    return fs.writeFile('./dist/' + jsFile, result.code, cb);
  } 
  return gulp.src('./dist',{buffer: false}).pipe(noop());
} );

/*
 * Compile and Bundle stylesheets
 */
gulp.task('compiling-stylesheets',['bundle-js'], function () {
  return gulp.src([
      'src/sass/style.scss'
    ])
    .pipe( compass( {
      css: './bundle/',
      sass: './src/sass',
    } ) ) 
    .pipe(sass())
    .pipe(gulp.dest('./bundle'));
});

/**
 * Pre-pend bundled Stylesheets with required 
 * module styles.  Right now, only rc-slider is needed
 */
gulp.task('bundling-stylesheets',['compiling-stylesheets'], function () {
  var one;
  one = gulp.src([
    './node_modules/rc-slider/dist/rc-slider.css',
    './bundle/style.css'
  ])
  .pipe( 
    concat( 'style.css' )
  );
  if ( process.env.NODE_ENV === 'production' ){
    one.pipe(cleanCSS());
  }
  one.pipe(gulp.dest('dist'));
  return one;
});

/*
 * Places copies of static files in their
 * required directories.  
 */
gulp.task('dist-static-files',['bundling-stylesheets'], function () {
  var one = gulp.src([
    'node_modules/font-awesome/fonts/**/*',
    'src/assets/icomoon/fonts/**/*',
    'src/assets/fonts/**/*'
  ])
  .pipe( gulp.dest('dist/fonts') );

  var two = gulp.src([
    'node_modules/bootstrap/fonts/**/*',
  ])
  .pipe( gulp.dest('dist/fonts/bootstrap') );

  var thr = gulp.src([
    'src/index.html',
    'src/.htaccess'
  ])
  .pipe( gulp.dest('dist') );

  var fr = gulp.src([
    'src/assets/images/**/*.*',
    'src/assets/images/*.*',
  ])
  .pipe( gulp.dest('dist/images') );

  return es.concat(one, two, thr, fr);
});

/*
 * Removes temp files from the the
 * 'bundle' staging directory
 */
gulp.task('remove-copies', [
  'compiling-react',
  'bundle-js',
  'minify-js',
  'compiling-stylesheets',
  'bundling-stylesheets',
  'dist-static-files'
  ], 
  function(){
    return gulp.src('bundle/**/*', { 
      read: false 
    })
    .pipe( clean() );
  }
);

/**
 * Upload Files to tfc server using gulp-ftp
 */
var tasks = [
  'compiling-react',
  'bundle-js',
  'minify-js',
  'compiling-stylesheets',
  'bundling-stylesheets',
  'dist-static-files',
  'remove-copies'
];

gulp.task('default', tasks, function(){
  return gulp
    .watch('src/**/*.*',tasks);
});
