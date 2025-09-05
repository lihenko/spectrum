/**
 *   Gulp with TailwindCSS - An CSS Utility framework build setup with SCSS
 *   Author : Manjunath G
 *   URL : manjumjn.com | lazymozek.com
 *   Twitter : twitter.com/manju_mjn
 **/


import gulp from "gulp";

import bs from "browser-sync";
import tailwindcss from "tailwindcss";
import postcss from "gulp-postcss";
import concat from "gulp-concat";
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import clean from "gulp-clean";
import gulpWebp from "gulp-webp";
import cheerio from 'gulp-cheerio';


const browserSync = bs.create();
const sass = gulpSass(dartSass);

function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
    port: 3000
  });
  done();
}

function previewReload(done) {
  console.log("\n\t", "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}


function devHtml() {
  return gulp.src('./src/**/*.{html,php}')
  .pipe(gulp.dest('./dist/'));
}


function devFonts() {
  return gulp.src('./src/fonts/**/*', {encoding: false})
  .pipe(gulp.dest('./dist/fonts/'));
}

function devStyles() {
  
  return gulp.src('./src/css/**/*.scss')
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest('./src/css/'))
    .pipe(postcss([tailwindcss('./tailwind.config.js')]))
    .pipe(concat({ path: "style.css" }))
    .pipe(gulp.dest('./dist/css/'));
}

function devWebp() {
  return gulp.src('./src/img/**/*.webp', {encoding: false})
  .pipe(gulp.dest('./dist/img/'));
}

function devSVG() {
  return gulp.src('./src/img/**/*.svg', {encoding: false})
  .pipe(cheerio({
    run: function ($) {
      $('desc').remove();  
    },
    parserOptions: { xmlMode: true }
  }))
  .pipe(gulp.dest('./dist/img/'));
}

function devWepb() {
  return gulp.src('./src/img/**/*.{png,jpg,jpeg,bmp}', {encoding: false})
    .pipe(gulpWebp({ 
      lossless: true,
      quality: 100 
    }))
    .pipe(gulp.dest('./src/img/'));
}

function devCleanImage() {
  return gulp.src('./src/img/**/*.{png,jpg,jpeg,bmp}', {read: false})
  .pipe(clean());
}

function devScripts() {
  return gulp.src([
    './src/js/libs/**/*.js',  
  ])
  .pipe(concat('libs.js'))  
  .pipe(gulp.dest('./dist/js'))  
  .pipe(gulp.src('./src/js/main.js'))  
  .pipe(concat('scripts.js')) 
  .pipe(gulp.dest('./dist/js')); 
}

function devClean() {
  console.log(
    "\n\t",
    "Cleaning dist folder for fresh start.\n"
  );
  return gulp.src('./dist/', { read: false, allowEmpty: true })
  .pipe(clean());
}


function watchFiles() {
  gulp.watch(
    './src/**/*.{html,php}',
    gulp.series(devHtml, devStyles, previewReload)
  );
  gulp.watch(
    ['./tailwind.config.js','./src/css/**/*.scss'],
    gulp.series(devStyles, previewReload)
  );
  gulp.watch('./src/img/**/*.webp', gulp.series(devWebp, previewReload));
  gulp.watch('./src/img/**/*.svg', gulp.series(devSVG, previewReload));
  gulp.watch('./src/img/**/*.{png,jpg,jpeg,bmp}', gulp.series(devWepb, previewReload, devCleanImage));
  gulp.watch('./src/js**/*.js', gulp.series(devScripts, previewReload));
  console.log("\n\t", "Watching for Changes..\n");
}


gulp.task('default', gulp.series(devClean,devHtml,devFonts,devStyles,devScripts,devWepb,devWebp,devSVG,livePreview,watchFiles));