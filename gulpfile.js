// Style related.
var styleSRC = './assets/css/sass/*.scss'; // Path to .scss files.
var styleDestination = './assets/css/'; // Path to place the compiled CSS file.

// Images related.
var imagesSRC = './assets/images/raw/*.{png,jpg,gif,svg}'; // Source folder of images which should be optimized.
var imagesDestination = './assets/images/'; // Destination folder of optimized images. Must be different from the imagesSRC folder.

// JS Vendor related.
var jsVendorsSRC = './assets/js/vendors/*.js'; // Path to JS vendor folder.
var jsVendorsDestination = './assets/js/'; // Path to place the compiled JS vendors file.
var jsVendorsFile = 'vendors'; // Compiled JS vendors file name.
// Default set to vendors i.e. vendors.js.

// JS Custom related.
var jsCustomSRC = './assets/js/custom/*.js'; // Path to JS custom scripts folder.
var jsCustomDestination = './assets/js/'; // Path to place the compiled JS custom scripts file.
var jsCustomFile = 'pagebuilder'; // Compiled JS custom file name.
// Default set to custom i.e. custom.js.

// Translation related.
var text_domain = 'acf-bootstrap-page-builder'; // Your textdomain here.
var translationFile = 'acf-bootstrap-page-builder.pot'; // Name of the transalation file.
var translationDestination = './languages'; // Where to save the translation files.
var packageName = 'acf-bootstrap-page-builder'; // Package name.
var bugReport = 'https://murkenmedia.com/'; // Where can users report bugs.
var lastTranslator = 'Murken Media <brian@murkenmedia.com>'; // Last translator Email ID.
var team = 'Murken Media <brian@murkenmedia.com>'; // Team's Email ID.

// Files to watch
var stylesWatchFiles = './assets/css/sass/*.scss'; // Path to all Sass partials.
var vendorsJSWatchFiles = './assets/js/vendor/*.js'; // Path to all vendor JS files.
var customJSWatchFiles = './assets/js/custom/*.js'; // Path to all custom JS files.
var projectPHPWatchFiles = './**/*.php'; // Path to all PHP files.

/**
 * Load Plugins.
 */
var gulp = require('gulp'); // Gulp of-course

// CSS related plugins.
var sass = require('gulp-sass'); // Gulp pluign for Sass compilation.
var minifycss = require('gulp-uglifycss'); // Minifies CSS files.
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.

// Image realted plugins.
var imagemin = require('gulp-imagemin'); // Minify PNG, JPEG, GIF and SVG images with imagemin.

// JS related plugins.
var concat = require('gulp-concat'); // Concatenates JS files
var uglify = require('gulp-uglify'); // Minifies JS files


// Utility related plugins.
var replace = require('gulp-replace'); // Search and replace text
var rename = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var lineec = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems. Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)
var notify = require('gulp-notify'); // Sends message notification to you
var wpPot = require('gulp-wp-pot'); // For generating the .pot file.
var sort = require('gulp-sort'); // Recommended to prevent unnecessary changes in pot-file.


// Browsers you care about for autoprefixing.
// Browserlist https        ://github.com/ai/browserslist
const AUTOPREFIXER_BROWSERS = [
  'last 2 version'
];


/**
 * Task: `styles`.
 *
 * Compiles Sass, Autoprefixes it and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Autoprefixes it and generates style.css
 *    4. Renames the CSS file with suffix .min.css
 *    5. Minifies the CSS file and generates .min.css
 */
gulp.task('styles', function () {
  gulp.src(styleSRC)
    .pipe(sass({
      errLogToConsole: true,
      // outputStyle: 'compact',
      outputStyle: 'compressed',
      // outputStyle: 'nested',
      // outputStyle: 'expanded',
      precision: 10
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss({
      maxLineLen: 0
    }))
    .pipe(gulp.dest(styleDestination))
    .pipe(notify({ message: 'TASK: "styles" Completed! 💯', onLast: true }))
});


/**
  * Task: `images`.
  *
  * Minifies PNG, JPEG, GIF and SVG images.
  *
  * This task does the following:
  *     1. Gets the source of images raw folder
  *     2. Minifies PNG, JPEG, GIF and SVG images
  *     3. Generates and saves the optimized images
  *
  * Must run the command `gulp images`.
  */
gulp.task('images', function () {
  gulp.src(imagesSRC)
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 3, // 0-7 low-high
      interlaced: true,
      svgoPlugins: [{ removeViewBox: false }]
    }))
    .pipe(gulp.dest(imagesDestination))
    .pipe(notify({ message: 'TASK: "images" Completed! 💯', onLast: true }));
});


/**
 * Task: `vendorsJS`.
 *
 * Concatenate and uglify vendor JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS vendor files
 *     2. Concatenates all the files and generates vendors.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates vendors.min.js
 */
gulp.task('vendorsJS', function () {
  gulp.src(jsVendorsSRC)
    .pipe(concat(jsVendorsFile + '.js'))
    // .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
    // .pipe( gulp.dest( jsVendorsDestination ) )
    .pipe(rename({
      basename: jsVendorsFile,
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(gulp.dest(jsVendorsDestination))
    .pipe(notify({ message: 'TASK: "vendorsJS" Completed! 💯', onLast: true }));
});


/**
 * Task: `customJS`.
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS custom files
 *     2. Concatenates all the files and generates custom.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifes/Minifies the JS file and generates custom.min.js
 */
gulp.task('customJS', function () {
  gulp.src(jsCustomSRC)
    .pipe(concat(jsCustomFile + '.js'))
    // .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
    // .pipe( gulp.dest( jsCustomDestination ) )
    .pipe(rename({
      basename: jsCustomFile,
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(lineec()) // Consistent Line Endings for non UNIX systems.
    .pipe(gulp.dest(jsCustomDestination))
    .pipe(notify({ message: 'TASK: "customJs" Completed! 💯', onLast: true }));
});


/**
 * WP POT Translation File Generator.
 *
 * * This task does the following:
 *     1. Gets the source of all the PHP files
 *     2. Search and replace the placeholder text for the text domain
 *     3. Sort files in stream by path or any custom sort comparator
 *     4. Applies wpPot with the variable set at the top of this file
 *     5. Generate a .pot file of i18n that can be used for l10n to build .mo file
 */
gulp.task('pot', function () {
  return gulp.src(projectPHPWatchFiles)
    .pipe( replace( /(?<="|')(tdomain)(?="|')/g, text_domain ) )
    .pipe(gulp.dest("./"))
    .pipe(sort())
    .pipe(wpPot({
      domain: text_domain,
      package: packageName,
      bugReport: bugReport,
      lastTranslator: lastTranslator,
      team: team
    }))
    .pipe(gulp.dest(translationDestination + '/' + translationFile))
    .pipe(notify({ message: 'TASK: "pot" Completed! 💯', onLast: true }))
});


/**
 * Watch Tasks.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task('default', ['styles', 'images', 'customJS', 'vendorsJS'], function () {
  gulp.watch(stylesWatchFiles, ['styles']);
  gulp.watch(vendorsJSWatchFiles, ['vendorsJS']);
  gulp.watch(customJSWatchFiles, ['customJS']);
});
