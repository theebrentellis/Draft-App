const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const nodemon = require('gulp-nodemon');
const jshint = require('gulp-jshint');
const htmlclean = require('gulp-htmlclean');
const concat = require('gulp-concat');
const deporder = require('gulp-deporder');
const stripdebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

let folder = {
    src: './client/',
    build: './public/'
}

// let devBuild = (process.env.NODE_ENV !== 'production');

gulp.task('default', () => {
    console.log("Gulp!");
});

gulp.task('lint', () => {
    gulp.src('./**/*.js')
        .pipe(jshint());
});

gulp.task('dev', () => {
    let stream = nodemon({
        script: "server.js"
    });

    stream.on('restart', () => {
        console.log("Restart");
    })
        .on('crash', () => {
            console.log("Crash")
        });
});

gulp.task('images', () => {
    let out = folder.build + 'images';
    return gulp.src(folder.src + 'static/stylesheet/images/*')
        .pipe(newer(out))
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(out));
});

gulp.task('html', () => {
    let out = folder.build + 'html/';
    let page = gulp.src(folder.src + 'static/partials/*');
    page.pipe(newer(out));

    if (!devBuild) {
        page = page.pipe(htmlclean());
    }

    return page.pipe(gulp.dest(out));
});

gulp.task('js', () => {
    let jsbuild = gulp.src(folder.src + 'static/js/**/*')
        .pipe(deporder())
        .pipe(concat('main.js'));
    
    // if (!devBuild) {
    //     jsbuild = jsbuild
    //         .pipe(stripdebug())
    //         .pipe(uglify());
    // }

    return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
})


