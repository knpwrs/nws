// Requirements
var optimist = require('optimist'),
    connect = require('connect'),
    http = require('http'),
    path = require('path'),
    verbose = require('./verbose'),
    open = require('open'),
    format = require('util').format;

// Process arguments
var argv = optimist
  .options('p', {
    alias: 'port',
    default: 3030
  })
  .options('d', {
    alias: 'directories',
    default: ''
  })
  .options('b', {
    alias: 'basepath',
    default: ''
  })
  .boolean('v').alias('v', 'verbose')
  .boolean('o').alias('o', 'open')
  .boolean('h').alias('h', 'help')
  .argv;

// Display help if requested
if (argv.h) {
  console.log('nws version %s', require('../package.json').version);
  // Optimist's showHelp function will not show boolean options
  console.log(require('fs').readFileSync(path.join(__dirname, 'help.txt'), 'utf8'));
  process.exit();
}

// Construct root paths array
var roots = argv.d.split(/[\;:]/).map(function (d) {
  return path.join(process.cwd(), d);
});

// Create app
var app = connect();
// Verbose?
if (argv.v) app.use(verbose);
// Use all given roots
roots.map(function (r) {
  return connect.static(r);
}).forEach(app.use.bind(app, '/' + argv.b));

// Start server
var server = http.createServer(app).listen(argv.p, function () {
  var addr = format('http://localhost:%d/%s', argv.p, argv.b);
  console.log('Listening at %s with root%s:', addr, roots.length > 1 ? 's' : '');
  roots.forEach(function (r) {
    console.log('\t%s', r);
  });
  if (argv.o) open(addr);
  // Graceful shutdown
  process.on('SIGINT', function () {
    console.log('Shutting down server...');
    server.close();
    process.exit();
  });
}).on('error', function (e) {
  if (e.message.indexOf('EADDRINUSE') >= 0) {
    console.error('Port %d is already in use!', argv.p);
    console.error('Please pick a different port (nws -p PORT) or kill the process using port %d.', argv.p);
  } else {
    console.error(e.message);
  }
});
