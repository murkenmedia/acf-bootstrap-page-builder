'use strict';

// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const notify = require('gulp-notify');
const rename = require( 'gulp-rename' );
var replace = require('gulp-replace');


// File paths
const files = { 
    scssPath: 'assets/scss/**/*.scss',
    jsPath: 'assets/js/custom/*.js',
	styleDest: 'assets/css/',
	jsDest: 'assets/js/',
	jsName: 'pagebuilder'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src('assets/scss/pagebuilder.scss')
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
		.on("error", sass.logError)
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('assets/css'))
		.pipe(notify({ message: 'TASK: "CSS" Completed!'}));
}

	
// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
       files.jsPath		
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat(files.jsName + '.js'))
		.pipe(
			rename({
				basename: files.jsName,
				suffix: '.min'
			})
		)
        .pipe(uglify())
        .pipe(dest(files.jsDest));	
		//.pipe(notify({ message: 'TASK: "JS" Completed!'}))
}



// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){
    watch([files.scssPath, files.jsPath], 
        parallel(scssTask, jsTask));    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask), 
    watchTask
);