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
    alias: 'directory',
    default: ''
  })
  .boolean('v').alias('v', 'verbose')
  .boolean('h').alias('h', 'help')
  .boolean('o').alias('o', 'open')
  .argv;

// Display help if requested
if (argv.h) {
  console.log('nws version %s', require('../package.json').version);
  // Optimist's showHelp function will not show boolean options
  console.log('Options:');
  console.log(' -p, --port\n\tDefault: 3030');
  console.log(' -d, --directory\n\tDirectory to use as root.\n\tDefault: Current working directory.');
  console.log(' -v, --verbose\n\tLog all requests to the console.');
  console.log(' -o, --open\n\tOpen your system\'s web browser to localhost:<port>');
  console.log(' -h, --help\n\tShow this help information.');
  process.exit();
}

// Construct root path
var root = path.join(process.cwd(), argv.d);

// Create app
var app = connect();
if (argv.v) app.use(verbose);
app.use(connect.static(root));

// Start server
var server = http.createServer(app).listen(argv.p, function () {
  console.log('Listening on port %d with root %s', argv.p, root);
  if (argv.o) open('http://localhost:' + argv.p);
  // Graceful shutdown
  process.on('SIGINT', function () {
    console.log('Shutting down server...');
    server.close();
    process.exit();
  });
});
