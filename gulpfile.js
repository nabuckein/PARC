var gulp = require('gulp');

function defaultTask(){
	gulp.watch('ReactAppForCordova/src/*.js', console.log("CHANGED"));
	
}

gulp.task('default', defaultTask);