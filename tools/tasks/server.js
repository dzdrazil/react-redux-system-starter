import gulp from 'gulp';
import connect from 'gulp-connect';

import cli from '../cli';

gulp.task('connect', () => {
    connect.server({
        root: 'build',
        livereload: true,
        port: cli.port,
        debug: cli.debug
    });
});

gulp.task('reload', () => {
    gulp.src('./build/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(['./build/**/*'], ['reload']);
});

gulp.task('server', ['connect', 'watch']);
