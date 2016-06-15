'use strict';

var Collection = require('./');
var collection = new Collection();
collection
  .addFile('foo.js', {contents: 'this is foo'})
  .addFile('bar.js', {contents: 'this is bar'});
console.log(collection.file('one.txt', {contents: 'baz'}));
