import path from 'path';

import gulp from 'gulp';
import connect from 'gulp-connect';
import mock from 'swagger-mock-api';

import cli from '../cli';

gulp.task('connect', () => {
    connect.server({
        root: 'build',
        livereload: true,
        port: cli.port,
        debug: cli.debug,
        middleware: () => {
            return [
                mock({
                    swaggerFile: path.join(__dirname, '../api.yml'),
                    watch: true
                })
            ];
        }
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
