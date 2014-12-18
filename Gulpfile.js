var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync'),
    reload = browserSync.reload,
    watch = false;

var onError = function(err) {
    $.util.beep();
    console.log(err);
};

gulp.task('proxy', function() {
    gulp.src('/')
        .pipe($.run('./srvdir comingsoon:./build'));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: './build'
        }
    });
});

gulp.task('clean', function() {
    return gulp.src(['build/**/*.css', 'build/**/*.html'], {
            read: false
        })
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.clean());
});

gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.sass({outputStyle:"compressed"}))
        .pipe($.csso())
        .pipe($.cssshrink())
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe($.if(watch, reload({stream: true})));
});

gulp.task('jade', function() {
    return gulp.src(['jade/**/*.jade', '!jade/**/_*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.jade({
            pretty: true,
            basedir: './jade'
        }))
        .pipe(gulp.dest('./build'))
        .pipe($.if(watch, reload({stream: true})));
});

gulp.task('default', function(callback) {
  runSequence('clean',
              ['jade', 'sass'],
              callback);
});

gulp.task('watch', ['default', 'browser-sync'], function() {
    gulp.watch(['sass/**/*.scss'], ['sass']);
    gulp.watch(['jade/**/*.jade'], ['jade']);
    watch = true;
});