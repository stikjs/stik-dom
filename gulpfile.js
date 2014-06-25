var gulp = require("gulp"),
    jasmine = require("gulp-jasmine"),
    header = require("gulp-header"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    pkg = require("./package.json");

var d = new Date();
var releaseDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()

var banner = "// Stik-dom - Version: <%= pkg.version %> | From: <%= date %>\n";

var fileStack = [
  "src/module.js",
  "src/node.js",
  "src/form.js"
]

gulp.task("test", function(){
  gulp.src("specs/*_spec.js")
      .pipe(jasmine());
});

gulp.task("pack", function(){
  gulp.src(fileStack)
      .pipe(concat("stik-dom.js"))
      .pipe(header(banner, { pkg: pkg, date: releaseDate }))
      .pipe(gulp.dest("dist"))
      .pipe(concat("stik-dom.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("dist"));
});
