module.exports = function (req, res, next) {
  console.log(new Date());
  console.log('\t%s', req.url);
  next();
}
