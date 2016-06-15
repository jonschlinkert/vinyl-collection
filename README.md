# vinyl-collection [![NPM version](https://img.shields.io/npm/v/vinyl-collection.svg?style=flat)](https://www.npmjs.com/package/vinyl-collection) [![NPM downloads](https://img.shields.io/npm/dm/vinyl-collection.svg?style=flat)](https://npmjs.org/package/vinyl-collection) [![Build Status](https://img.shields.io/travis/jonschlinkert/vinyl-collection.svg?style=flat)](https://travis-ci.org/jonschlinkert/vinyl-collection)

Create a collection for vinyl files.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save vinyl-collection
```

## Usage

```js
var Collection = require('vinyl-collection');
```

## API

### [Collection](index.js#L25)

Create a new `Collection` with the given `options`.

**Params**

* `options` **{Object}**

**Example**

```js
var collection = new Collection();
```

### [.file](index.js#L60)

Create a vinyl `file`.

**Params**

* `key` **{String|Object}**: Optionally define a `key` to use if the file will be cached.
* `file` **{Object}**: Object or instance of [vinyl][].
* `returns` **{Object}**

**Example**

```js
var file = collection.file('foo', {path: 'a/b/c.js'});
```

### [.addFile](index.js#L108)

Add a `file` to the collection.

**Params**

* `key` **{String|Object}**: Either the `key` to use for caching the file, or a [vinyl][] `file` object
* `file` **{Object}**: Object or instance of `Vinyl`
* `returns` **{Object}**: Returns the instance for chaining

**Example**

```js
collection.addFile('foo', {path: 'a/b/c.js'});
```

### [.addFiles](index.js#L126)

Add an object or array of `files` to the collection.

**Params**

* `files` **{Array|Object}**
* `returns` **{Object}**: Returns the instance for chaining

**Example**

```js
collection.addFiles(files);
```

### [.getFile](index.js#L155)

Get a file from the collection.

**Params**

* `key` **{String|Object}**: The key of the file to get. If `key` is a `file` object it is returned.
* `returns` **{Object}**: Returns the `file` if found

**Example**

```js
var file = collection.getFile('foo');
```

### [.isFile](index.js#L220)

Returns true if `file` is a collection `file` object.

**Params**

* `file` **{Object}**
* `returns` **{Boolean}**

**Example**

```js
console.log(collection.isFile('foo'));
//=> false

console.log(collection.isFile(new Vinyl({path: 'foo'})));
//=> false

console.log(collection.isFile(collection.file({path: 'foo'})));
//=> true
```

### [.isFile](index.js#L242)

Static method, returns true if `file` is a collection `file` object.

**Params**

* `file` **{Object}**
* `returns` **{Boolean}**

**Example**

```js
console.log(Collection.isFile('foo'));
//=> false

console.log(Collection.isFile(new Vinyl({path: 'foo'})));
//=> false

console.log(Collection.isFile(collection.file({path: 'foo'})));
//=> true
```

## Contributing

This document was generated by [verb-readme-generator][] (a [verb](https://github.com/verbose/verb) generator), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new). Or visit the [verb-readme-generator][] project to submit bug reports or pull requests for the readme layout template.

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-readme-generator && verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on June 15, 2016._