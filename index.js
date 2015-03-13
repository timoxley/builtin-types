"use strict"

// hand-picked from global names until we come up with a better solution

const ALL_TYPE_NAMES = [
  'Error',
  'String',
  'Array',
  'Number',
  'RegExp',
  'Object',
  'Boolean',
  'Date',
  'Function',
  'Symbol',
  'Promise',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'Buffer',
  'Uint16Array',
  'ArrayBuffer',
  'DataView',
  'Int8Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint32Array',
  'Int32Array',
  'Float32Array',
  'Int16Array',
  'Float64Array'
]

const TYPE_NAMES = ALL_TYPE_NAMES.filter(name => name in global)

const TYPE_NAMES_MAP = TYPE_NAMES
.map(name => [name, global[name]])
.filter(([name, Type]) => typeof Type === 'function')

const TYPES = TYPE_NAMES_MAP.map(([name, Type]) => Type)

const INSTANCES = TYPES
.map(Type => instanceFactory(Type))
.filter(Boolean)

function instanceFactory(Type, ...args) {
  // bad args
  if (typeof Type !== 'function') {
    return null
  }
  // Some types require arguments to construct successfully
  if (typeof Promise !== 'undefined' && Type === Promise) {
    if (!args.length) args = [(Y, N) => Y()]
  }

  if (typeof Buffer !== 'undefined' && Type === Buffer) {
    if (!args.length) args = [0]
  }

  if (typeof DataView !== 'undefined' && Type === DataView) {
    if (!args.length) args = [new ArrayBuffer(1)]
  }

  try {
    return new Type(...args)
  } catch(e) {
    try {
      return Type(...args)
    } catch (e) {
      console.warn('Could not construct %s.', Type)
      return null
    }
  }
}

module.exports = TYPES
module.exports.types = TYPE_NAMES_MAP.reduce((types, [name, Type]) => {
  types[name] = Type
  return types
}, {})

module.exports.instances = INSTANCES
module.exports.factory = instanceFactory
module.exports.typeFactory = TYPES.map(Type => (...args) => instanceFactory(Type, ...args))
module.exports.prototypes = INSTANCES.map(instance => Object.getPrototypeOf(instance))
module.exports.names = TYPE_NAMES
module.exports.allNames = ALL_TYPE_NAMES
