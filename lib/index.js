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
  console.log('Usage: nws [-v | --verbose] [-o | --open] [-d | --directory DIRECTORY] [-p | --port PORT] [-h | --help]');
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
