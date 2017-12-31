const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const cachebust = require('gulp-cache-bust');

const locals = {
    src: {
        html: './src/**/*.html',
        scss: './src/scss/**/*.scss',
        js: './src/jssrc/**/*.js'
    },
    output: {
        css: './public/css',
        path: './public',
        js:'./public/js'
    }
};

gulp.task('mincss', function(){
    return gulp.src(locals.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('bundle.min.css'))
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS(({
            compatibility: 'ie9',
            level:2
        })))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(locals.output.css))
        .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// HTML
// ///////////////////////////////////////////////
gulp.task('html', function(){
    gulp.src(locals.src.html)
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest(locals.output.path))
        .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./public"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

gulp.task('scripts', function(){
    return gulp.src(locals.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets:['env'],
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(locals.output.js))
        .pipe(reload({stream:true}));
});

gulp.task('watcher',function(){
    gulp.watch(locals.src.scss, ['mincss']);
    gulp.watch(locals.src.js, ['scripts']);
    gulp.watch(locals.src.html, ['html']);
});

gulp.task('default', ['watcher', 'browserSync']);