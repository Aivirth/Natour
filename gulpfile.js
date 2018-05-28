const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const watch = require("gulp-watch");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");

const configuration = require("./gulpconfig.json");
const paths = configuration.paths;

//gulp sass
//compile scss into sass
gulp.task("sass", () => {
  return gulp
    .src([`${paths.sass}/*.scss`])
    .pipe(sass({ errLogToConsole: true }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      plumber({
        errorHandler: err => {
          console.log(err);
        }
      })
    )
    .pipe(autoprefixer("last 2 versions"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(cssnano({ discardComments: { removeAll: true } }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.css));
});

//gulp cssnano
