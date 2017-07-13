const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const htmlmin = require('gulp-htmlmin');
const ngHtml2Js = require("gulp-ng-html2js");
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const CacheBuster = require('gulp-cachebust');
let cachebust = new CacheBuster();


// const templateCache = require('gulp-angular-templatecache');
// const stripdebug = require('gulp-strip-debug');
// const browserify = require('browserify');
// const browserify_ngAnnotate = require('browserify-ngannotate');
// const babelify = require('babelify');
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');

let folder = {
    src: './client/',
    build: './public/'
}

gulp.task('build', ['clean', 'css', 'images', 'js', 'template-cache'], () => {
    console.log("Gulp!");
});

gulp.task('dev', () => {
    let stream = nodemon({
        script: "server.js",
        ext: 'html js',
        tasks: ['build']
    });

    stream.on('restart', () => {
        console.log("Restart");
        // return ['build'];
    })
        .on('crash', () => {
            stream.emit('restart', 1)
        });
});

gulp.task('clean', (cb) => {
    del([
        './public/js',
        './public/partials',
        './public/css',
        './public/images'
    ], cb);
    console.log("These pipes are clean!");
});

gulp.task('lint', () => {
    gulp.src('./**/*.js')
        .pipe(jshint());
});

gulp.task('images', () => {
    return gulp.src(folder.src + 'images/*')
        .pipe(newer('./public/images'))
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest('./public/images'));
});

gulp.task('css', () => {
    return gulp.src('./client/sass/*.scss')
        .pipe(newer('./public/css'))    
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', () => {
    let js = gulp.src('./client/js/**/*.js')
        .pipe(newer('./client/js/**/*.js'))
        .pipe(sourcemaps.init())    
        .pipe(babel({
            presets: ['es2015']
        }))    
        .pipe(ngAnnotate())
        // .pipe(deporder())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('.'));

    return js.pipe(gulp.dest("./public/js"));
});

gulp.task('template-cache', () => {
    return gulp.src('./client/partials/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))    
        .pipe(ngHtml2Js({
            moduleName: 'DraftApp',
        }))
        .pipe(concat('partials.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/partials'));
});

gulp.task('watch', () => {
    gulp.watch('./client/js/**/*.js', ['js']);
    gulp.watch('./client/sass/*.scss', ['css']);
    gulp.watch('./client/partials/**/*.html', ['template-cache'])
});

//Redudant Task
// gulp.task('angular-template-build', () => {
//     return gulp.src('./client/partials/*.html')
//         .pipe(templateCache())
//         .pipe(gulp.dest('./public/partials'));
// });
//Not Working Throws Error
// gulp.task('build-js', () => {
//     let b = browserify({
//         entries: 'client/js/app.js',
//         debug: true,
//         paths: ['client/js/controllers', 'client/js/services', 'client/js/factories',],
//         transform: [browserify_ngAnnotate]
//     });

//     return b.transform(babelify.configure({
//         presets: ['es2015']
//     })).bundle()
//         .pipe(source('bundle.js'))
//         .pipe(buffer())
//         .pipe(cachebust.resources())
//         .pipe(sourcemaps.init({ loadMaps: true }))
//         .pipe(uglify())
//         .on('error', gutil.log)
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('./public/js'));
// });
