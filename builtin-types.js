"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

// hand-picked from global names until we come up with a better solution

var ALL_TYPE_NAMES = ["Error", "String", "Array", "Number", "RegExp", "Object", "Boolean", "Date", "Function", "Symbol", "Promise", "Map", "Set", "WeakMap", "WeakSet", "Buffer", "Uint16Array", "ArrayBuffer", "DataView", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Uint32Array", "Int32Array", "Float32Array", "Int16Array", "Float64Array"];

var TYPE_NAMES = ALL_TYPE_NAMES.filter(function (name) {
  return name in global;
});

var TYPE_NAMES_MAP = TYPE_NAMES.map(function (name) {
  return [name, global[name]];
}).filter(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var name = _ref2[0];
  var Type = _ref2[1];
  return typeof Type === "function";
});

var TYPES = TYPE_NAMES_MAP.map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var name = _ref2[0];
  var Type = _ref2[1];
  return Type;
});

var INSTANCES = TYPES.map(function (Type) {
  return instanceFactory(Type);
}).filter(Boolean);

function instanceFactory(Type) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  // bad args
  if (typeof Type !== "function") {
    return null;
  }
  // Some types require arguments to construct successfully
  if (typeof Promise !== "undefined" && Type === Promise) {
    if (!args.length) args = [function (Y, N) {
      return Y();
    }];
  }

  if (typeof Buffer !== "undefined" && Type === Buffer) {
    if (!args.length) args = [0];
  }

  if (typeof DataView !== "undefined" && Type === DataView) {
    if (!args.length) args = [new ArrayBuffer(1)];
  }

  try {
    return _applyConstructor(Type, args);
  } catch (e) {
    try {
      return Type.apply(undefined, args);
    } catch (e) {
      console.warn("Could not construct %s.", Type);
      return null;
    }
  }
}

module.exports = TYPES;
module.exports.types = TYPE_NAMES_MAP.reduce(function (types, _ref) {
  var _ref2 = _slicedToArray(_ref, 2);

  var name = _ref2[0];
  var Type = _ref2[1];

  types[name] = Type;
  return types;
}, {});

module.exports.instances = INSTANCES;
module.exports.factory = instanceFactory;
module.exports.typeFactory = TYPES.map(function (Type) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return instanceFactory.apply(undefined, [Type].concat(args));
  };
});
module.exports.prototypes = INSTANCES.map(function (instance) {
  return Object.getPrototypeOf(instance);
});
module.exports.names = TYPE_NAMES;
module.exports.allNames = ALL_TYPE_NAMES;

