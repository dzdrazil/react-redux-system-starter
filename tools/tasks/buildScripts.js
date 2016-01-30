import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import babel from 'babelify';

import cli from '../cli';

const paths = {
    index: './src/scripts/index.jsx',
    out: 'scripts/build.js',
    mapsOut: './',
    gulpDest: './build'
};

let bundler = watchify(
    browserify(
        paths.index,
        { debug: !cli.debug }
    ).transform(babel)
);

function bundle() {
    bundler.bundle()
        .on('error', function onBundleError(e) {
            console.error(e);
            this.emit('end');
        })
        .pipe(source(paths.out))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: !cli.isProduction }))
        .pipe(sourcemaps.write(paths.mapsOut))
        .pipe(gulp.dest(paths.gulpDest));
}

if (cli.watch) {
    console.log('watching scripts');
    bundler.on('update', () => {
        console.log('-> bundling...');
        bundle();
    });
} else {
    console.log('single build running');
    bundler.on('log', function onSingleBuildEnd() {
        bundler.close();
        this.emit('end');
    });
}

export default function() {
    return bundle();
}
