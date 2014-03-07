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
var roots = argv.d.split(';').map(function (d) {
  return path.join(process.cwd(), d);
});

// Create app
var app = connect();
if(argv.b) app.use(argv.b, connect.static(process.cwd()));
// Verbose?
if (argv.v) app.use(verbose);
// Use all given roots
roots.map(function (r) {
  return connect.static(r);
}).forEach(app.use.bind(app, argv.b));

// Start server
var server = http.createServer(app).listen(argv.p, function () {
  console.log('Listening on port %d with root%s:', argv.p, roots.length > 1 ? 's' : '');
  roots.forEach(function (r) {
    console.log('\t%s', r);
  });
  if (argv.o) open('http://localhost:' + argv.p + ( argv.b ? (argv.b + '/') : '') );
  // Graceful shutdown
  process.on('SIGINT', function () {
    console.log('Shutting down server...');
    server.close();
    process.exit();
  });
});
