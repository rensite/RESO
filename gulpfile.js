'use strict';

const   gulp = require('gulp'),
        sass = require('gulp-sass')(require('sass')),
        cleanCSS = require('gulp-clean-css'),
        browserSync = require('browser-sync').create(),
        fs = require('fs'),
        concat = require('gulp-concat'),
        webpackStream   = require('webpack-stream'),
        babel = require('gulp-babel');

const   dist = './dist';

function watch () {
    browserSync.init({
        watch: true,
        server: {
            baseDir: dist
        }
    })

    gulp.watch(`./scss/**/*.scss`, scss);
    gulp.watch(`./js/**/*.js`, js);
    gulp.watch(`./*.html`, pages);
    gulp.watch(`./**/*`).on('change', browserSync.reload);
}


function scss() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({debug: true}))
    .pipe(gulp.dest(dist));
};

function js() {
    return gulp.src(`./js/**/*.js`)
        .pipe(babel({presets: ['@babel/preset-env'] })) 
        .pipe(webpackStream({
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
        }))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(dist));
}

function pages() {
    return gulp.src(`./*.html`)
        .pipe(gulp.dest(dist));
}

function assets() {
    return gulp.src(`./assets/**/*`)
        .pipe(gulp.dest(dist));
}

async function clean() {
    if (fs.existsSync(dist)) {
        return fs.rm(dist, { recursive:true }, () => {});
    }
    
    return;
} 

gulp.task('build', gulp.series(clean, scss, js, assets, pages));
exports.watch = watch;