gulp = require('gulp')
connect = require('gulp-connect')
notify = require('gulp-notify')

browserify = require('browserify')
buffer = require('vinyl-buffer')
source = require('vinyl-source-stream')
reactify = require('reactify')
sourcemaps = require('gulp-sourcemaps')

coffee = require('gulp-coffee')
uglify = require('gulp-uglify')
stripdebug = require('gulp-strip-debug')

sass = require('gulp-sass')
minifycss = require('gulp-minify-css')
jsonminify = require('gulp-jsonminify')
uglify = require('gulp-uglify')

imagemin = require('gulp-imagemin')
pngquant = require('imagemin-pngquant')

ga = require('gulp-ga')

root = './src/'

path =
  dev : './_dev/'
  build : './_build/'

# JavaScript
gulp.task 'browserify', ->
  b = browserify({
    debug: true,
    entries: root + 'js/components/main.js',
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('main.js', root + 'js/components'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.dev + 'js/'))
    .pipe(notify({ message: 'Browserify task complete' }));

# JavaScript
gulp.task 'buildJS', ['browserify'], ->
  gulp.src(path.dev + 'js/*.js')
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(path.build + 'js/'))

# JavaScript Vendor
gulp.task 'buildJSVendor', ->
  gulp.src(root + 'vendor/*.js')
    .pipe(gulp.dest(path.dev + 'vendor/'))
    .pipe(gulp.dest(path.build + 'vendor/'))

# CSS
gulp.task 'buildCSS', ->
  gulp.src(root + 'css/*.css')
    .pipe(gulp.dest(path.dev + 'css/'))
    .pipe(minifycss())
    .pipe(gulp.dest(path.build + 'css/'))

# Fonts
gulp.task 'buildFonts', ->
  gulp.src(root + 'fonts/*.*')
    .pipe(gulp.dest(path.dev + 'fonts/'))
    .pipe(gulp.dest(path.build + 'fonts/'))

# Img
gulp.task 'buildImg', ->
  gulp.src(root + 'img/**/*.*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(path.dev + 'img/'))
    .pipe(gulp.dest(path.build + 'img/'))

# Data
gulp.task 'buildData', ->
  gulp.src(root + 'data/*.json')
    .pipe(gulp.dest(path.dev + 'data/'))
    .pipe(jsonminify())
    .pipe(gulp.dest(path.build + 'data/'))
    .pipe(notify({ message: 'BuildData task complete' }));

# HTML
gulp.task 'buildHTML', ->
  gulp.src(root + '*.html')
    .pipe(gulp.dest(path.dev))
    .pipe(ga({url: 'microvis.info', uid: 'UA-304114-17', tag: 'body'}))
    .pipe(gulp.dest(path.build))

# Watch
gulp.task 'watch', ->
  gulp.watch [root + '**/*.js'], ['buildJS']
  gulp.watch [root + 'data/*.json'], ['buildData']
  gulp.watch [root + 'css/*.css'], ['buildCSS']
  gulp.watch [root + 'img/**/*.*'], ['buildImg']
  gulp.watch [root + '*.html'], ['buildHTML']
  # gulp.watch [root + 'index.html'], ['ga']

gulp.task 'default', ['buildHTML', 'buildJSVendor', 'buildJS', 'buildCSS', 'buildFonts', 'buildImg', 'buildData', 'watch'];
