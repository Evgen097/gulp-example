
let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let del = require('del');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
let cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var uncss = require('gulp-uncss');
var gcmq = require('gulp-group-css-media-queries');


let cssFiles = [
    './node_modules/normalize.css/normalize.css',
    './src/css/base.css',
    './src/css/style.css'
];

// pipe(sourcemaps.init())
//     .pipe(plugin1())
//     .pipe(plugin2())
// .pipe(sourcemaps.write())

let styles = ()=> {
    console.log('Styles')
    return gulp.src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        // .pipe(uncss({html: ['./src/index.html']}))
        .pipe(gcmq())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({level: 2}))
        .pipe(sourcemaps.write())
        .pipe( gulp.dest( './build') )
        .pipe(browserSync.stream());;
};

let js = ()=> {
    console.log('JS');
    return gulp.src('./src/js/**/*.js')
        .pipe( gulp.dest( './build') )
        .pipe(browserSync.stream());
};

let html = ()=> {
    console.log('HTML');
    return gulp.src('./src/**/*.html')
        .pipe( gulp.dest( './build') )
        .pipe(browserSync.stream());;
};

let images = ()=> {
    console.log('Imagess');
    return gulp.src('./img/**/*.jpg')
        .pipe( gulp.dest( './build/img') )
        .pipe(browserSync.stream());
};

let clear = ()=> {
    console.log('Clear');
    return del('./build/*')
};

let dev = gulp.series(clear, gulp.parallel(html, styles, js, images));

let watch = ()=>{
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
    return gulp.watch('./src/**/*', dev)
}



gulp.task('css', styles);
gulp.task('js', js);
gulp.task('img', images);
gulp.task('clear', clear)
gulp.task('html', html)
gulp.task('watch', gulp.series( dev , watch ))

gulp.task('dev', dev)








