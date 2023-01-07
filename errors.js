export function logerrors() {
	//-------Keep app open on exception/rejection-------
	process.on('uncaughtException', (error, origin) => {
		console.log('----- Uncaught exception -----');
		console.log(error);
		console.log('----- Exception origin -----');
		console.log(origin);
	});

	process.on('unhandledRejection', (reason, promise) => {
		console.log('----- Unhandled Rejection at -----');
		console.log(promise);
		console.log('----- Reason -----');
		console.log(reason);
	});
}