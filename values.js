// WIP

function Numbers() {
  let numbers = [
    -1,
    -1.1,
    -Infinity,
    Infinity,
    Number.MIN_VALUE,
    Number.MAX_VALUE,
    Math.pow(2, 53) - 1,    // Number.MAX_SAFE_INTEGER
    -(Math.pow(2, 53) - 1), // Number.MIN_SAFE_INTEGER
    0,
    -0,
    1,
    1.1,
    NaN
  ]
  let powersOfTwo = []
  let power = 1
  do {
    let num = Math.pow(2, power++)
    powersOfTwo.push(num)
  }
  while(num < Number.MAX_SAFE_INTEGER)
  power = 1
  do {
    let num = -Math.pow(2, power++)
    powersOfTwo.push(num)
  }
  while(num > Number.MIN_SAFE_INTEGER)
  numbers.push(...powersOfTwo)
  return numbers
}

function EmptyMap() {
  return {
    'null': null,
    'undefined': undefined
  }
}

function Falsey() {
  return values().map(value => !value)
}

function Truthy() {
  return values().map(value => value)
}

function StringMap() {
  return {
    empty: '',
    space: ' ',
    char: 'a',
    one: '1',
    zero: '0',
    'true': 'true',
    'false':'false',
    words: 'lorem ipsum',
    newline: '\n',
    unicode: '©',
    unicodePair: '𝌆'
  }
}

function ObjectMap() {
  return {
    empty: {},
    value: {key: 'value'},
    nestedValue: {
      key: 'value',
      nested: {key: 'value'}
    },
    withPrototype: Object.create({}),
    withoutPrototype: Object.create(null),
    withNestedPrototype: Object.create(Object.create({}))
  }
}

module.exports.values = instances().concat(numbers, empties)
module.exports.strings = Strings()
module.exports.numbers = Numbers()
module.exports.empties = Empties()
module.exports.objects = Objects()

module.exports.falsey = Falsey()
module.exports.truthy = Truthy()
