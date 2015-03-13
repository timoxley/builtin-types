# builtin-types

Aggregate of built-in Types e.g. String, Object, Array, etc. in
various forms. A building block for creating smoketesting tools.

Provides:
* All types as functions
* All types as basic instances
* Prototypes
* Factory functions for each type (normalizes `new` & default args requirements)
* + more

Excludes types which are not suppored in current environment e.g. Promises won't appear in older versions of node.

## Why

Smoketesting an API requires seeing what it will do in various
scenarios. A good starting point is seeing how it performs
when it's up against all the various builtin datatypes.

## API

### types

The default export is an Array of all the Type functions.

```js

import types from 'builtin-types'

console.log(types.length) // => 27
console.log(types)
/*
  [Function: String],
  [Function: Array],
  [Function: Number],
  [Function: RegExp],
  [Function: Object],
  [Function: Boolean],
  [Function: Date],
  [Function: Function],
  [Function: ArrayBuffer],
  [Function: DataView],
  etc
*/

```

### types.names

An Array of names of the built-in types as Strings.

### types.types

A map of Type names to Type functions.

```js

console.log(types.types)
/*
{
  String: [Function: String],
  Array: [Function: Array],
  Number: [Function: Number],
  RegExp: [Function: RegExp],
  Object: [Function: Object],
  Boolean: [Function: Boolean],
  Date: [Function: Date],
  Function: [Function: Function],
  Symbol: [Function],
  ... etc
}
 */

```

### types.instances

An Array of instances, one of each built-in Type. e.g. includes an
Array, a Date, a String, a Promise, etc.

### types.prototypes

An Array of prototypes for the built-in types.

### types.factory(Type, ...args)

A function that takes a built-in Type and will return a new instance
of Type. Will forward any arguments you supply. Knows how to construct
built-ins that require arguments.

```js
types.factory(String)  // creates a String
types.factory(Number)  // creates a Number
types.factory(Promise) // creates a Promise
types.factory(Buffer)  // creates a Buffer
```

## License

MIT
