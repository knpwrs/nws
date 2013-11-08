// Requirements
var optimist = require('optimist'),
    connect = require('connect'),
    http = require('http'),
    path = require('path'),
    verbose = require('./verbose'),
    open = require('open');

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
  .boolean('v').alias('v', 'verbose')
  .boolean('o').alias('o', 'open')
  .boolean('h').alias('h', 'help')
  .argv;

// Display help if requested
if (argv.h) {
  console.log('nws version %s', require('../package.json').version);
  // Optimist's showHelp function will not show boolean options
  console.log('Options:');
  console.log(' -p, --port\n\tDefault: 3030');
  console.log(' -d, --directories\n\tSemi-colon separated list of directories to use as roots.');
  console.log('\tMake sure to quote your argument when using semi-colons.');
  console.log('\t\tExample: -d dir1');
  console.log('\t\tExample: -d \'dir1;dir2\'');
  console.log('\tDirectories are searched in order. First matching file is served.');
  console.log('\tDefault: Current working directory.');
  console.log(' -v, --verbose\n\tLog all requests to the console.');
  console.log(' -o, --open\n\tOpen your system\'s web browser to localhost:<port>');
  console.log(' -h, --help\n\tShow this help information.');
  process.exit();
}

// Construct root paths array
var roots = argv.d.split(';').map(function (d) {
  return path.join(process.cwd(), d);
});

// Create app
var app = connect();
// Verbose?
if (argv.v) app.use(verbose);
// Use all given roots
roots.map(function (r) {
  return connect.static(r);
}).forEach(app.use.bind(app));

// Start server
var server = http.createServer(app).listen(argv.p, function () {
  console.log('Listening on port %d with root%s:', argv.p, roots.length > 1 ? 's' : '');
  roots.forEach(function (r) {
    console.log('\t%s', r);
  });
  if (argv.o) open('http://localhost:' + argv.p);
  // Graceful shutdown
  process.on('SIGINT', function () {
    console.log('Shutting down server...');
    server.close();
    process.exit();
  });
});
