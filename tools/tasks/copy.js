import gulp from 'gulp';

export default function copy() {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build'));
}
