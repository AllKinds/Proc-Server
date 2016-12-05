var gulp 		= 	require("gulp");
var ts 			= 	require("gulp-typescript");
var sourcemaps	=	require('gulp-sourcemaps');
var tsProject 	= 	ts.createProject("tsconfig.json");

gulp.task("compile", function () {
	console.log('compiling...');
	gulp.src('src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({
			target: 'es5'
		}))
		.pipe(sourcemaps.write('../build'))
		.pipe(gulp.dest("build"));
    // return tsProject.src()
    //     .pipe(tsProject())
    //     .js.pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
	console.log('watching');
	gulp.watch('src/**/*.ts', ['compile']);
});

gulp.task('resources', function() {
	return gulp.src(['src/**/*', '!**/*.ts'])
		.pipe(gulp.dest('build'));
})

gulp.task('default', ['compile', 'watch', 'resources']);