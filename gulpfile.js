const { src, dest, task } = require('gulp');
const clean = require('gulp-clean');
const inlineSource = require('gulp-inline-source');
const rename = require('gulp-rename');

task('clean', () => {
  return src('dist', { read: false, allowEmpty: true }).pipe(clean());
});

task('inline', () => {
  const options = {
    compress: false,
  };

  return src('dist/index.html')
    .pipe(inlineSource(options))
    .pipe(rename('inline.html'))
    .pipe(dest('dist/'));
});

// Default task is now just inline HTML generation
task('default', task('inline'));