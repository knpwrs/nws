module.exports = function () {
	return function (req, res, next) {
		console.log(new Date() + '\n\t' + req.url);
		next();
	}
}