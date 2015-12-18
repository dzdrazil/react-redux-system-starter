import gulp from 'gulp';
import copy from './copy';
import buildScripts from './buildScripts';

// server's task file is entirely self contained
import './server';

gulp.task('copy', copy);
gulp.task('build', ['copy'], buildScripts);

gulp.task('default', ['build', 'server']);
