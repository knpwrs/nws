# `nws`

nws is a simple tool designed to launch a simple static web server in your
current working directory.

## Installation

In order to install nws you will need Node.js and npm. Simply execute the
following:

```sh
npm install -g nws
```

## Usage

In any directory where you are working on a static web project, simply execute
the following:

```sh
nws
```

This will launch a server on port `3030` for you to visit in your web browser
at `http://localhost:3030`.

You can also specify a port:

```sh
nws -p 8080
```

This will launch a server on port `8080`.

Add the -o flag to open the site in your default browser
(http://localhost:3030):

```sh
nws -o
```

You can also specify the directory to use as the document root:

```sh
nws -d relative/path/to/other/directory
```

Using colons you can specify multiple directories to use as roots (like
`$PATH` in \*nix):

```sh
nws -d dir1:dir2
```

The directories are searched in order and the first matching file is returned.
You can achieve the same thing using quotes and semi-colons if that's more
your style:

```sh
nws -d 'dir1;dir2'
```

If you want all requests to resolve to a base path (i.e.
`http://localhost:3030/basepath`) without having to place all files into a
`src/basepath` sub-directory, use the `-b` flag:

```sh
nws -b basepath
```

You can enable `gzip` / `deflate` compression with the `-z` flag:

```sh
nws -z
```

The final option is used to control verbosity. With the `-v` flag the server
will log all requested files to the console:

```sh
nws -v
```

The options can of course be combined:

```sh
nws -v -z -p 8080 -d public
```

You can use `-h` to display help:

```sh
nws -h
```

All of these flags are available in long form as well:

```sh
nws --help --verbose --compress --port 8080 --directory public
```
