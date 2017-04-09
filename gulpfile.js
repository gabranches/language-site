'use strict';

// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const jshint = require('gulp-jshint'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel');

// Nodemon options
const nodemonOptions = {
    script: 'bin/www',
    ext: 'js',
    env: { 'NODE_ENV': 'development' },
    verbose: false,
    ignore: [],
    watch: ['bin/*', 'routes/*', 'app.js']
};

// Lint Task
gulp.task('lint', () => {
    let options = {
        configFile: '.eslintrc'
    };

    return gulp.src(['js/**/*'])
        .pipe(eslint(options))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

// Compile sass
gulp.task('sass', () => {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

// Concatenate & minify JS
gulp.task('js', () => {
    return gulp.src(
        [
            'js/*.js'
        ]
    )
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('js/all.js'))
        .pipe(rename('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/js'))
        .pipe(livereload());;
});

// Restart server
gulp.task('start', () => {
    nodemon(nodemonOptions)
        .on('restart', () => {
            console.log('restarted!')
        });
});

// Watch files for changes
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(
        ['js/**/*.js', 'views/*.jade', 'routes/*.js', 'public/stylesheets/*.css'],
        ['lint', 'js']
    );
    // gulp.watch('scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['start', 'lint', 'sass', 'js', 'watch']);