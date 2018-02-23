function controller(app){
	var rootdir = env.rootdir || __dirname;
	var routeConfig = require('routeconfig');
	var appConfig = require('appconfig');
	var renderer = require('renderer')();
	var helper = require('helper')();

	for(r in routeConfig.Router){
		var routeobject = require(routeConfig.Router[r]);
		app.use(r, routeobject);
	}

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};

		// render the error page
		var statuscode = err.status || 500;
		res.status(statuscode);
		//render by express view engine (hbs)
		res.render('error');
		//render by our renderer
		/*
		var content = renderer.renderPage('/ERROR/'+ statuscode, req)
		.then(function(content){
			res.send(content);
		});
		*/
	});
	
}

module.exports = controller;






