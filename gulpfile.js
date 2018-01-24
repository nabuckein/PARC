var gulp = require('gulp');

function defaultTask(done){
	console.log("CHANGED");
	
}

gulp.task('default', function(){
	gulp.watch('ReactAppForCordova/src/xml/LinkxQuery.xml', defaultTask);
});
