import gulp from 'gulp';
import watch from 'gulp-watch';
import webpack from 'gulp-webpack';

let config = {
  webpack: {
    entry: {
      bundle: './src/js/app.js'
    },
    output: {
      path: __dirname + '/dist/',
      filename: '[name].js'
    },
    cache: true,
    resolve: {
      extensions: ['', '.js']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
  }
};

gulp.task('webpack', () => {
  gulp.src('src/js/app.js')
      .pipe(webpack(config.webpack))
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  watch('src/js/**/*.js', () => {
    gulp.start(['webpack']);
  });
});

gulp.task('default', ['webpack', 'watch']);
