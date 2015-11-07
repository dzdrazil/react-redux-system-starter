'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var isProduction = (process.env.NODE_ENV === 'production');

function compile(watch) {
    var bundler = watchify(browserify('./src/scripts/index.jsx', { debug: !isProduction }).transform(babel));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('scripts/build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: !isProduction }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
    return compile(true);
};

function copy() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
}

gulp.task('copy', copy);
gulp.task('build', ['copy'], function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['copy', 'watch']);
