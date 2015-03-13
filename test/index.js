import types from '..'
import test from 'tape'

test('names is an Array of Strings of type names', t => {
  t.ok(Array.isArray(types.names), 'is array')
  t.ok(types.names.length, 'has some items')
  types.names.forEach(name => {
    t.equal(typeof name, 'string', name + ' is a String')
    t.ok(name in global, name + 'exists')
  })
  // test some basics. Sanity.
  t.equal(types.names.filter(name => name === 'String').length, 1, 'has String')
  t.equal(types.names.filter(name => name === 'Array').length, 1, 'has Array')
  t.equal(types.names.filter(name => name === 'Object').length, 1, 'has Object')
  t.equal(types.names.filter(name => name === 'Error').length, 1, 'has Error')
  t.end()
})

test('all names is an Array of all type name Strings', t => {
  t.ok(Array.isArray(types.allNames), 'is array')
  t.ok(types.allNames.length, 'has some items')
  types.allNames.forEach(name => {
    t.equal(typeof name, 'string', name + ' is a String')
  })
  t.ok(types.allNames.length >= types.names.length, 'allNames is larger than or equal to names')
  t.end()
})

test('default export is an Array containing Types', t => {
  t.ok(Array.isArray(types), 'is array')
  t.ok(types.length, 'has some items')
  types.forEach(Type => {
    t.equal(typeof Type, 'function', Type.name + ' is function')
  })
  t.end()
})

test('factory can construct all types', t => {
  types.forEach(Type => {
    t.ok(types.factory(Type), 'can construct ' + Type.name)
  })
  t.end()
})

test('typeFactory can construct all types', t => {
  types.typeFactory.forEach(Type => {
    t.ok(Type())
  })
  t.end()
})

test('prototypes lists all prototypes', t => {
  types.prototypes.forEach(proto => {
    if (proto === Function.prototype) return t.ok(proto, 'prototype is Function.prototype')
    t.equal(typeof proto, 'object', 'prototype is object')
  })
  t.end()
})

test('possibly undefined features', t => {
  if (typeof Promise !== 'undefined') t.test('Promise', t => {
    t.equal(types.filter(p => p === Promise).length, 1, 'has Promise')
    t.end()
  })
  if (typeof Map !== 'undefined') t.test('Map', t => {
    t.equal(types.filter(p => p === Map).length, 1, 'has Map')
    t.end()
  })
  if (typeof Buffer !== 'undefined') t.test('Buffer', t => {
    t.equal(types.filter(p => p === Buffer).length, 1, 'has Buffer')
    t.end()
  })
  t.end()
})
