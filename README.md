#nws
nws is a simple tool designed to launch a simple static web server in your
current working directory.

## Installation
In order to install nws you will need Node.js and npm. Simply execute the
following:

    npm install -g nws

## Usage
In any directory where you are working on a static web project, simply execute
the following:

    nws

This will launch a server on port `3030` for you to visit in your web browser
at `http://localhost:3030`.

You can also specify a port:

    nws -p 8080

This will launch a server on port `8080`.

Add the -o flag to open the site in your default browser
(http://localhost:3030):

    nws -o
    

You can also specify the directory to use as the document root:

    nws -d relative/path/to/other/directory

Using quotes and semi-colons you can specify multiple directoies to use as
roots:

    nws -d 'dir1;dir2'

The directories are searched in order and the first matching file is returned.

If you want all requests to resolve to a base path (i.e.
`http://localhost:3030/basepath`) without having to place all files into a
`src/basepath` sub-directory, use the -b flag:

    nws -b basepath

The final option is used to control verbosity. With the `-v` flag the server
will log all requested files to the console:

    nws -v

The options can of course be combined:

    nws -v -p 8080 -d public

You can use `-h` to display help:

    nws -h

All of these flags are available in long form as well:

    nws --help --verbose --port 8080 --directory public
    
You can use `-x` to specify proxy path, ( either prefix with -y  or directories -d is required or both ) :

    nws -x http://example.com 
    
    //or
    
    nws -x http://example.com -y v1
    
    //or
    
    nws -x http://example.com -d public
