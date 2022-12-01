/**
* @pollyjs/core v6.0.5
*
* https://github.com/netflix/pollyjs
*
* Released under the Apache-2.0 License.
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global['@pollyjs/core'] = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _library = true;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.9' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _redefine = _hide;

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'pure',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES]) == undefined ? D : _aFunction(S);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$1 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$1
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator = _global.navigator;

	var _userAgent = navigator && navigator.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else _hide(target, key, src[key]);
	  } return target;
	};

	var SPECIES$1 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = typeof _core[KEY] == 'function' ? _core[KEY] : _global[KEY];
	  if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	_export(_export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = _newPromiseCapability.f(this);
	  var result = _perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = _core.Promise;

	var promise$1 = promise;

	var asyncToGenerator = createCommonjsModule(function (module) {
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    promise$1.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new promise$1(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	module.exports = _asyncToGenerator;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _asyncToGenerator = unwrapExports(asyncToGenerator);

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


	_export(_export.S, 'Array', { isArray: _isArray });

	var isArray = _core.Array.isArray;

	var isArray$1 = isArray;

	var arrayLikeToArray = createCommonjsModule(function (module) {
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	module.exports = _arrayLikeToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(arrayLikeToArray);

	var arrayWithoutHoles = createCommonjsModule(function (module) {
	function _arrayWithoutHoles(arr) {
	  if (isArray$1(arr)) return arrayLikeToArray(arr);
	}

	module.exports = _arrayWithoutHoles;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(arrayWithoutHoles);

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var f$2 = _wks;

	var _wksExt = {
		f: f$2
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var f$3 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$3
	};

	var f$4 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$4
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$5
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$6
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$7 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$7
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var symbol = _core.Symbol;

	var symbol$1 = symbol;

	var iterator = _wksExt.f('iterator');

	var iterator$1 = iterator;

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = _toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = core_getIteratorMethod(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	var from_1 = _core.Array.from;

	var from_1$1 = from_1;

	var iterableToArray = createCommonjsModule(function (module) {
	function _iterableToArray(iter) {
	  if (typeof symbol$1 !== "undefined" && iter[iterator$1] != null || iter["@@iterator"] != null) return from_1$1(iter);
	}

	module.exports = _iterableToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(iterableToArray);

	var unsupportedIterableToArray = createCommonjsModule(function (module) {
	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return from_1$1(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
	}

	module.exports = _unsupportedIterableToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(unsupportedIterableToArray);

	var nonIterableSpread = createCommonjsModule(function (module) {
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	module.exports = _nonIterableSpread;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(nonIterableSpread);

	var toConsumableArray = createCommonjsModule(function (module) {
	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
	}

	module.exports = _toConsumableArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	var classCallCheck = createCommonjsModule(function (module) {
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	module.exports = _classCallCheck;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object = _core.Object;
	var defineProperty$1 = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$2 = defineProperty$1;

	var createClass = createCommonjsModule(function (module) {
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$2(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	module.exports = _createClass;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _createClass = unwrapExports(createClass);

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  define(IteratorPrototype, iteratorSymbol, function () {
	    return this;
	  });

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = GeneratorFunctionPrototype;
	  define(Gp, "constructor", GeneratorFunctionPrototype);
	  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
	    return this;
	  });
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  define(Gp, iteratorSymbol, function() {
	    return this;
	  });

	  define(Gp, "toString", function() {
	    return "[object Generator]";
	  });

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, in modern engines
	  // we can explicitly access globalThis. In older engines we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  if (typeof globalThis === "object") {
	    globalThis.regeneratorRuntime = runtime;
	  } else {
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	}
	});

	var regenerator = runtime_1;

	var SPECIES$2 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 19.1.2.1 Object.assign(target, source, ...)






	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var getWeak = _meta.getWeak;







	var arrayFind = _arrayMethods(5);
	var arrayFindIndex = _arrayMethods(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME))['delete'](key);
	        return data && _has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key) {
	        if (!_isObject(key)) return false;
	        var data = getWeak(key);
	        if (data === true) return uncaughtFrozenStore(_validateCollection(this, NAME)).has(key);
	        return data && _has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var data = getWeak(_anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

	var dP$2 = _objectDp.f;
	var each = _arrayMethods(0);


	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  if (!_descriptors || typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    C = wrapper(function (target, iterable) {
	      _anInstance(target, C, NAME, '_c');
	      target._c = new Base();
	      if (iterable != undefined) _forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) _hide(C.prototype, KEY, function (a, b) {
	        _anInstance(this, C, KEY);
	        if (!IS_ADDER && IS_WEAK && !_isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    IS_WEAK || dP$2(C.prototype, 'size', {
	      get: function () {
	        return this._c.size;
	      }
	    });
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var es6_weakMap = createCommonjsModule(function (module) {

	var each = _arrayMethods(0);






	var NATIVE_WEAK_MAP = _validateCollection;
	var IS_IE11 = !_global.ActiveXObject && 'ActiveXObject' in _global;
	var WEAK_MAP = 'WeakMap';
	var getWeak = _meta.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = _collectionWeak.ufstore;
	var InternalMap;

	var wrapper = function (get) {
	  return function WeakMap() {
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};

	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key) {
	    if (_isObject(key)) {
	      var data = getWeak(key);
	      if (data === true) return uncaughtFrozenStore(_validateCollection(this, WEAK_MAP)).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionWeak.def(_validateCollection(this, WEAK_MAP), key, value);
	  }
	};

	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = _collection(WEAK_MAP, wrapper, methods, _collectionWeak, true, true);

	// IE11 WeakMap frozen keys fix
	if (NATIVE_WEAK_MAP && IS_IE11) {
	  InternalMap = _collectionWeak.getConstructor(wrapper, WEAK_MAP);
	  _objectAssign(InternalMap.prototype, methods);
	  _meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function (key) {
	    var proto = $WeakMap.prototype;
	    var method = proto[key];
	    _redefine(proto, key, function (a, b) {
	      // store frozen objects on internal weakmap shim
	      if (_isObject(a) && !isExtensible(a)) {
	        if (!this._f) this._f = new InternalMap();
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	// https://tc39.github.io/proposal-setmap-offrom/


	var _setCollectionOf = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { of: function of() {
	    var length = arguments.length;
	    var A = new Array(length);
	    while (length--) A[length] = arguments[length];
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	_setCollectionOf('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/





	var _setCollectionFrom = function (COLLECTION) {
	  _export(_export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
	    var mapFn = arguments[1];
	    var mapping, A, n, cb;
	    _aFunction(this);
	    mapping = mapFn !== undefined;
	    if (mapping) _aFunction(mapFn);
	    if (source == undefined) return new this();
	    A = [];
	    if (mapping) {
	      n = 0;
	      cb = _ctx(mapFn, arguments[2], 2);
	      _forOf(source, false, function (nextItem) {
	        A.push(cb(nextItem, n++));
	      });
	    } else {
	      _forOf(source, false, A.push, A);
	    }
	    return new this(A);
	  } });
	};

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	_setCollectionFrom('WeakMap');

	var weakMap = _core.WeakMap;

	var weakMap$1 = weakMap;

	var dP$3 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$3(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  _forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	var _collectionToJson = function (NAME) {
	  return function toJSON() {
	    if (_classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return _arrayFromIterable(this);
	  };
	};

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	_export(_export.P + _export.R, 'Map', { toJSON: _collectionToJson('Map') });

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	_setCollectionOf('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	_setCollectionFrom('Map');

	var map = _core.Map;

	var map$1 = map;

	var isEnum$1 = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!_descriptors || isEnum$1.call(O, key)) {
	        result.push(isEntries ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $values = _objectToArray(false);

	_export(_export.S, 'Object', {
	  values: function values(it) {
	    return $values(it);
	  }
	});

	var values = _core.Object.values;

	var values$1 = values;

	var MODES = {
	  RECORD: 'record',
	  REPLAY: 'replay',
	  PASSTHROUGH: 'passthrough',
	  STOPPED: 'stopped'
	};

	var ACTIONS = {
	  RECORD: 'record',
	  REPLAY: 'replay',
	  INTERCEPT: 'intercept',
	  PASSTHROUGH: 'passthrough'
	};

	var HTTP_METHODS = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'MERGE', 'HEAD', 'OPTIONS'];

	var HTTP_STATUS_CODES = {
	  100: 'Continue',
	  101: 'Switching Protocols',
	  200: 'OK',
	  201: 'Created',
	  202: 'Accepted',
	  203: 'Non-Authoritative Information',
	  204: 'No Content',
	  205: 'Reset Content',
	  206: 'Partial Content',
	  207: 'Multi-Status',
	  300: 'Multiple Choice',
	  301: 'Moved Permanently',
	  302: 'Found',
	  303: 'See Other',
	  304: 'Not Modified',
	  305: 'Use Proxy',
	  307: 'Temporary Redirect',
	  400: 'Bad Request',
	  401: 'Unauthorized',
	  402: 'Payment Required',
	  403: 'Forbidden',
	  404: 'Not Found',
	  405: 'Method Not Allowed',
	  406: 'Not Acceptable',
	  407: 'Proxy Authentication Required',
	  408: 'Request Timeout',
	  409: 'Conflict',
	  410: 'Gone',
	  411: 'Length Required',
	  412: 'Precondition Failed',
	  413: 'Request Entity Too Large',
	  414: 'Request-URI Too Long',
	  415: 'Unsupported Media Type',
	  416: 'Requested Range Not Satisfiable',
	  417: 'Expectation Failed',
	  422: 'Unprocessable Entity',
	  500: 'Internal Server Error',
	  501: 'Not Implemented',
	  502: 'Bad Gateway',
	  503: 'Service Unavailable',
	  504: 'Gateway Timeout',
	  505: 'HTTP Version Not Supported'
	};

	var EXPIRY_STRATEGIES = {
	  RECORD: 'record',
	  WARN: 'warn',
	  ERROR: 'error'
	};

	var arraySlice = [].slice;
	var factories = {};

	var construct = function (F, len, args) {
	  if (!(len in factories)) {
	    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};

	var _bind = Function.bind || function bind(that /* , ...args */) {
	  var fn = _aFunction(this);
	  var partArgs = arraySlice.call(arguments, 1);
	  var bound = function (/* args... */) {
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
	  };
	  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
	  return bound;
	};

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])







	var rConstruct = (_global.Reflect || {}).construct;

	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = _fails(function () {
	  function F() { /* empty */ }
	  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !_fails(function () {
	  rConstruct(function () { /* empty */ });
	});

	_export(_export.S + _export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /* , newTarget */) {
	    _aFunction(Target);
	    _anObject(args);
	    var newTarget = arguments.length < 3 ? Target : _aFunction(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (_bind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = _objectCreate(_isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return _isObject(result) ? result : instance;
	  }
	});

	var construct$1 = _core.Reflect.construct;

	var construct$2 = construct$1;

	var assertThisInitialized = createCommonjsModule(function (module) {
	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	module.exports = _assertThisInitialized;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _assertThisInitialized = unwrapExports(assertThisInitialized);

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	var $Object$1 = _core.Object;
	var create = function create(P, D) {
	  return $Object$1.create(P, D);
	};

	var create$1 = create;

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	_export(_export.S, 'Object', { setPrototypeOf: _setProto.set });

	var setPrototypeOf = _core.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf;

	var setPrototypeOf$2 = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = setPrototypeOf$1 || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(setPrototypeOf$2);

	var inherits = createCommonjsModule(function (module) {
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create$1(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf$2(subClass, superClass);
	}

	module.exports = _inherits;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _inherits = unwrapExports(inherits);

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _typeof = unwrapExports(_typeof_1);

	var possibleConstructorReturn = createCommonjsModule(function (module) {
	var _typeof = _typeof_1["default"];



	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }

	  return assertThisInitialized(self);
	}

	module.exports = _possibleConstructorReturn;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.9 Object.getPrototypeOf(O)



	_objectSap('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return _objectGpo(_toObject(it));
	  };
	});

	var getPrototypeOf = _core.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf;

	var getPrototypeOf$2 = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = setPrototypeOf$1 ? getPrototypeOf$1 : function _getPrototypeOf(o) {
	    return o.__proto__ || getPrototypeOf$1(o);
	  };
	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _getPrototypeOf = unwrapExports(getPrototypeOf$2);

	var isNativeFunction = createCommonjsModule(function (module) {
	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	module.exports = _isNativeFunction;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(isNativeFunction);

	var isNativeReflectConstruct = createCommonjsModule(function (module) {
	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !construct$2) return false;
	  if (construct$2.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	module.exports = _isNativeReflectConstruct;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(isNativeReflectConstruct);

	var construct$3 = createCommonjsModule(function (module) {
	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    module.exports = _construct = construct$2;
	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf$2(instance, Class.prototype);
	      return instance;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _construct = unwrapExports(construct$3);

	var wrapNativeSuper = createCommonjsModule(function (module) {
	function _wrapNativeSuper(Class) {
	  var _cache = typeof map$1 === "function" ? new map$1() : undefined;

	  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !isNativeFunction(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return construct$3(Class, arguments, getPrototypeOf$2(this).constructor);
	    }

	    Wrapper.prototype = create$1(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf$2(Wrapper, Class);
	  };

	  module.exports["default"] = module.exports, module.exports.__esModule = true;
	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _wrapNativeSuper = unwrapExports(wrapNativeSuper);

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct$2(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct$2) return false; if (construct$2.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var PollyError = /*#__PURE__*/function (_Error) {
	  _inherits(PollyError, _Error);

	  var _super = _createSuper(PollyError);

	  function PollyError(message) {
	    var _this;

	    _classCallCheck(this, PollyError);

	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    _this = _super.call.apply(_super, [this, "[Polly] ".concat(message)].concat(args)); // Maintains proper stack trace for where our error was thrown (only available on V8)

	    if (Error.captureStackTrace) {
	      Error.captureStackTrace(_assertThisInitialized(_this), PollyError);
	    }

	    _this.name = 'PollyError';
	    return _this;
	  }

	  return PollyError;
	}( /*#__PURE__*/_wrapNativeSuper(Error));

	function assert (msg, condition) {
	  if (!condition) {
	    throw new PollyError(msg);
	  }
	}

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var $parseInt = _global.parseInt;
	var $trim = _stringTrim.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs + '08') !== 8 || $parseInt(_stringWs + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export(_export.G + _export.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var _parseInt$1 = _core.parseInt;

	var _parseInt$2 = _parseInt$1;

	function timeout(time) {
	  var ms = _parseInt$2(time, 10);

	  return new promise$1(function (resolve) {
	    return ms > 0 ? setTimeout(resolve, ms) : resolve();
	  });
	}

	function timestamp() {
	  return new Date().toISOString();
	}

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = keys;

	var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols;

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor$1 = _objectGopd.f;

	_objectSap('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor$1(_toIobject(it), key);
	  };
	});

	var $Object$2 = _core.Object;
	var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  return $Object$2.getOwnPropertyDescriptor(it, key);
	};

	var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor;

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors = _core.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

	var $Object$3 = _core.Object;
	var defineProperties = function defineProperties(T, D) {
	  return $Object$3.defineProperties(T, D);
	};

	var defineProperties$1 = defineProperties;

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])







	function get(target, propertyKey /* , receiver */) {
	  var receiver = arguments.length < 3 ? target : arguments[2];
	  var desc, proto;
	  if (_anObject(target) === receiver) return target[propertyKey];
	  if (desc = _objectGopd.f(target, propertyKey)) return _has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if (_isObject(proto = _objectGpo(target))) return get(proto, propertyKey, receiver);
	}

	_export(_export.S, 'Reflect', { get: get });

	var get$1 = _core.Reflect.get;

	var get$2 = get$1;

	var superPropBase = createCommonjsModule(function (module) {
	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf$2(object);
	    if (object === null) break;
	  }

	  return object;
	}

	module.exports = _superPropBase;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(superPropBase);

	var get$3 = createCommonjsModule(function (module) {
	function _get() {
	  if (typeof Reflect !== "undefined" && get$2) {
	    module.exports = _get = get$2;
	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;

	      var desc = getOwnPropertyDescriptor$1(base, property);

	      if (desc.get) {
	        return desc.get.call(arguments.length < 3 ? target : receiver);
	      }

	      return desc.value;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  }

	  return _get.apply(this, arguments);
	}

	module.exports = _get;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _get = unwrapExports(get$3);

	var defineProperty$3 = createCommonjsModule(function (module) {
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$2(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	module.exports = _defineProperty;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _defineProperty = unwrapExports(defineProperty$3);

	/**
	 * Check if we're required to add a port number.
	 *
	 * @see https://url.spec.whatwg.org/#default-port
	 * @param {Number|String} port Port number we need to check
	 * @param {String} protocol Protocol we need to check against.
	 * @returns {Boolean} Is it a default port for the given protocol
	 * @api private
	 */
	var requiresPort = function required(port, protocol) {
	  protocol = protocol.split(':')[0];
	  port = +port;

	  if (!port) return false;

	  switch (protocol) {
	    case 'http':
	    case 'ws':
	    return port !== 80;

	    case 'https':
	    case 'wss':
	    return port !== 443;

	    case 'ftp':
	    return port !== 21;

	    case 'gopher':
	    return port !== 70;

	    case 'file':
	    return false;
	  }

	  return port !== 0;
	};

	var has = Object.prototype.hasOwnProperty
	  , undef;

	/**
	 * Decode a URI encoded string.
	 *
	 * @param {String} input The URI encoded string.
	 * @returns {String|Null} The decoded string.
	 * @api private
	 */
	function decode(input) {
	  try {
	    return decodeURIComponent(input.replace(/\+/g, ' '));
	  } catch (e) {
	    return null;
	  }
	}

	/**
	 * Simple query string parser.
	 *
	 * @param {String} query The query string that needs to be parsed.
	 * @returns {Object}
	 * @api public
	 */
	function querystring(query) {
	  var parser = /([^=?&]+)=?([^&]*)/g
	    , result = {}
	    , part;

	  while (part = parser.exec(query)) {
	    var key = decode(part[1])
	      , value = decode(part[2]);

	    //
	    // Prevent overriding of existing properties. This ensures that build-in
	    // methods like `toString` or __proto__ are not overriden by malicious
	    // querystrings.
	    //
	    // In the case if failed decoding, we want to omit the key/value pairs
	    // from the result.
	    //
	    if (key === null || value === null || key in result) continue;
	    result[key] = value;
	  }

	  return result;
	}

	/**
	 * Transform a query string to an object.
	 *
	 * @param {Object} obj Object that should be transformed.
	 * @param {String} prefix Optional prefix.
	 * @returns {String}
	 * @api public
	 */
	function querystringify(obj, prefix) {
	  prefix = prefix || '';

	  var pairs = []
	    , value
	    , key;

	  //
	  // Optionally prefix with a '?' if needed
	  //
	  if ('string' !== typeof prefix) prefix = '?';

	  for (key in obj) {
	    if (has.call(obj, key)) {
	      value = obj[key];

	      //
	      // Edge cases where we actually want to encode the value to an empty
	      // string instead of the stringified value.
	      //
	      if (!value && (value === null || value === undef || isNaN(value))) {
	        value = '';
	      }

	      key = encodeURIComponent(key);
	      value = encodeURIComponent(value);

	      //
	      // If we failed to encode the strings, we should bail out as we don't
	      // want to add invalid strings to the query.
	      //
	      if (key === null || value === null) continue;
	      pairs.push(key +'='+ value);
	    }
	  }

	  return pairs.length ? prefix + pairs.join('&') : '';
	}

	//
	// Expose the module.
	//
	var stringify = querystringify;
	var parse = querystring;

	var querystringify_1 = {
		stringify: stringify,
		parse: parse
	};

	var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
	  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i
	  , windowsDriveLetter = /^[a-zA-Z]:/
	  , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
	  , left = new RegExp('^'+ whitespace +'+');

	/**
	 * Trim a given string.
	 *
	 * @param {String} str String to trim.
	 * @public
	 */
	function trimLeft(str) {
	  return (str ? str : '').toString().replace(left, '');
	}

	/**
	 * These are the parse rules for the URL parser, it informs the parser
	 * about:
	 *
	 * 0. The char it Needs to parse, if it's a string it should be done using
	 *    indexOf, RegExp using exec and NaN means set as current value.
	 * 1. The property we should set when parsing this value.
	 * 2. Indication if it's backwards or forward parsing, when set as number it's
	 *    the value of extra chars that should be split off.
	 * 3. Inherit from location if non existing in the parser.
	 * 4. `toLowerCase` the resulting value.
	 */
	var rules = [
	  ['#', 'hash'],                        // Extract from the back.
	  ['?', 'query'],                       // Extract from the back.
	  function sanitize(address, url) {     // Sanitize what is left of the address
	    return isSpecial(url.protocol) ? address.replace(/\\/g, '/') : address;
	  },
	  ['/', 'pathname'],                    // Extract from the back.
	  ['@', 'auth', 1],                     // Extract from the front.
	  [NaN, 'host', undefined, 1, 1],       // Set left over value.
	  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
	  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
	];

	/**
	 * These properties should not be copied or inherited from. This is only needed
	 * for all non blob URL's as a blob URL does not include a hash, only the
	 * origin.
	 *
	 * @type {Object}
	 * @private
	 */
	var ignore = { hash: 1, query: 1 };

	/**
	 * The location object differs when your code is loaded through a normal page,
	 * Worker or through a worker using a blob. And with the blobble begins the
	 * trouble as the location object will contain the URL of the blob, not the
	 * location of the page where our code is loaded in. The actual origin is
	 * encoded in the `pathname` so we can thankfully generate a good "default"
	 * location from it so we can generate proper relative URL's again.
	 *
	 * @param {Object|String} loc Optional default location object.
	 * @returns {Object} lolcation object.
	 * @public
	 */
	function lolcation(loc) {
	  var globalVar;

	  if (typeof window !== 'undefined') globalVar = window;
	  else if (typeof commonjsGlobal !== 'undefined') globalVar = commonjsGlobal;
	  else if (typeof self !== 'undefined') globalVar = self;
	  else globalVar = {};

	  var location = globalVar.location || {};
	  loc = loc || location;

	  var finaldestination = {}
	    , type = typeof loc
	    , key;

	  if ('blob:' === loc.protocol) {
	    finaldestination = new Url(unescape(loc.pathname), {});
	  } else if ('string' === type) {
	    finaldestination = new Url(loc, {});
	    for (key in ignore) delete finaldestination[key];
	  } else if ('object' === type) {
	    for (key in loc) {
	      if (key in ignore) continue;
	      finaldestination[key] = loc[key];
	    }

	    if (finaldestination.slashes === undefined) {
	      finaldestination.slashes = slashes.test(loc.href);
	    }
	  }

	  return finaldestination;
	}

	/**
	 * Check whether a protocol scheme is special.
	 *
	 * @param {String} The protocol scheme of the URL
	 * @return {Boolean} `true` if the protocol scheme is special, else `false`
	 * @private
	 */
	function isSpecial(scheme) {
	  return (
	    scheme === 'file:' ||
	    scheme === 'ftp:' ||
	    scheme === 'http:' ||
	    scheme === 'https:' ||
	    scheme === 'ws:' ||
	    scheme === 'wss:'
	  );
	}

	/**
	 * @typedef ProtocolExtract
	 * @type Object
	 * @property {String} protocol Protocol matched in the URL, in lowercase.
	 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
	 * @property {String} rest Rest of the URL that is not part of the protocol.
	 */

	/**
	 * Extract protocol information from a URL with/without double slash ("//").
	 *
	 * @param {String} address URL we want to extract from.
	 * @param {Object} location
	 * @return {ProtocolExtract} Extracted information.
	 * @private
	 */
	function extractProtocol(address, location) {
	  address = trimLeft(address);
	  location = location || {};

	  var match = protocolre.exec(address);
	  var protocol = match[1] ? match[1].toLowerCase() : '';
	  var forwardSlashes = !!match[2];
	  var otherSlashes = !!match[3];
	  var slashesCount = 0;
	  var rest;

	  if (forwardSlashes) {
	    if (otherSlashes) {
	      rest = match[2] + match[3] + match[4];
	      slashesCount = match[2].length + match[3].length;
	    } else {
	      rest = match[2] + match[4];
	      slashesCount = match[2].length;
	    }
	  } else {
	    if (otherSlashes) {
	      rest = match[3] + match[4];
	      slashesCount = match[3].length;
	    } else {
	      rest = match[4];
	    }
	  }

	  if (protocol === 'file:') {
	    if (slashesCount >= 2) {
	      rest = rest.slice(2);
	    }
	  } else if (isSpecial(protocol)) {
	    rest = match[4];
	  } else if (protocol) {
	    if (forwardSlashes) {
	      rest = rest.slice(2);
	    }
	  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
	    rest = match[4];
	  }

	  return {
	    protocol: protocol,
	    slashes: forwardSlashes || isSpecial(protocol),
	    slashesCount: slashesCount,
	    rest: rest
	  };
	}

	/**
	 * Resolve a relative URL pathname against a base URL pathname.
	 *
	 * @param {String} relative Pathname of the relative URL.
	 * @param {String} base Pathname of the base URL.
	 * @return {String} Resolved pathname.
	 * @private
	 */
	function resolve(relative, base) {
	  if (relative === '') return base;

	  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
	    , i = path.length
	    , last = path[i - 1]
	    , unshift = false
	    , up = 0;

	  while (i--) {
	    if (path[i] === '.') {
	      path.splice(i, 1);
	    } else if (path[i] === '..') {
	      path.splice(i, 1);
	      up++;
	    } else if (up) {
	      if (i === 0) unshift = true;
	      path.splice(i, 1);
	      up--;
	    }
	  }

	  if (unshift) path.unshift('');
	  if (last === '.' || last === '..') path.push('');

	  return path.join('/');
	}

	/**
	 * The actual URL instance. Instead of returning an object we've opted-in to
	 * create an actual constructor as it's much more memory efficient and
	 * faster and it pleases my OCD.
	 *
	 * It is worth noting that we should not use `URL` as class name to prevent
	 * clashes with the global URL instance that got introduced in browsers.
	 *
	 * @constructor
	 * @param {String} address URL we want to parse.
	 * @param {Object|String} [location] Location defaults for relative paths.
	 * @param {Boolean|Function} [parser] Parser for the query string.
	 * @private
	 */
	function Url(address, location, parser) {
	  address = trimLeft(address);

	  if (!(this instanceof Url)) {
	    return new Url(address, location, parser);
	  }

	  var relative, extracted, parse, instruction, index, key
	    , instructions = rules.slice()
	    , type = typeof location
	    , url = this
	    , i = 0;

	  //
	  // The following if statements allows this module two have compatibility with
	  // 2 different API:
	  //
	  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
	  //    where the boolean indicates that the query string should also be parsed.
	  //
	  // 2. The `URL` interface of the browser which accepts a URL, object as
	  //    arguments. The supplied object will be used as default values / fall-back
	  //    for relative paths.
	  //
	  if ('object' !== type && 'string' !== type) {
	    parser = location;
	    location = null;
	  }

	  if (parser && 'function' !== typeof parser) parser = querystringify_1.parse;

	  location = lolcation(location);

	  //
	  // Extract protocol information before running the instructions.
	  //
	  extracted = extractProtocol(address || '', location);
	  relative = !extracted.protocol && !extracted.slashes;
	  url.slashes = extracted.slashes || relative && location.slashes;
	  url.protocol = extracted.protocol || location.protocol || '';
	  address = extracted.rest;

	  //
	  // When the authority component is absent the URL starts with a path
	  // component.
	  //
	  if (
	    extracted.protocol === 'file:' && (
	      extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) ||
	    (!extracted.slashes &&
	      (extracted.protocol ||
	        extracted.slashesCount < 2 ||
	        !isSpecial(url.protocol)))
	  ) {
	    instructions[3] = [/(.*)/, 'pathname'];
	  }

	  for (; i < instructions.length; i++) {
	    instruction = instructions[i];

	    if (typeof instruction === 'function') {
	      address = instruction(address, url);
	      continue;
	    }

	    parse = instruction[0];
	    key = instruction[1];

	    if (parse !== parse) {
	      url[key] = address;
	    } else if ('string' === typeof parse) {
	      if (~(index = address.indexOf(parse))) {
	        if ('number' === typeof instruction[2]) {
	          url[key] = address.slice(0, index);
	          address = address.slice(index + instruction[2]);
	        } else {
	          url[key] = address.slice(index);
	          address = address.slice(0, index);
	        }
	      }
	    } else if ((index = parse.exec(address))) {
	      url[key] = index[1];
	      address = address.slice(0, index.index);
	    }

	    url[key] = url[key] || (
	      relative && instruction[3] ? location[key] || '' : ''
	    );

	    //
	    // Hostname, host and protocol should be lowercased so they can be used to
	    // create a proper `origin`.
	    //
	    if (instruction[4]) url[key] = url[key].toLowerCase();
	  }

	  //
	  // Also parse the supplied query string in to an object. If we're supplied
	  // with a custom parser as function use that instead of the default build-in
	  // parser.
	  //
	  if (parser) url.query = parser(url.query);

	  //
	  // If the URL is relative, resolve the pathname against the base URL.
	  //
	  if (
	      relative
	    && location.slashes
	    && url.pathname.charAt(0) !== '/'
	    && (url.pathname !== '' || location.pathname !== '')
	  ) {
	    url.pathname = resolve(url.pathname, location.pathname);
	  }

	  //
	  // Default to a / for pathname if none exists. This normalizes the URL
	  // to always have a /
	  //
	  if (url.pathname.charAt(0) !== '/' && isSpecial(url.protocol)) {
	    url.pathname = '/' + url.pathname;
	  }

	  //
	  // We should not add port numbers if they are already the default port number
	  // for a given protocol. As the host also contains the port number we're going
	  // override it with the hostname which contains no port number.
	  //
	  if (!requiresPort(url.port, url.protocol)) {
	    url.host = url.hostname;
	    url.port = '';
	  }

	  //
	  // Parse down the `auth` for the username and password.
	  //
	  url.username = url.password = '';
	  if (url.auth) {
	    instruction = url.auth.split(':');
	    url.username = instruction[0] || '';
	    url.password = instruction[1] || '';
	  }

	  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  //
	  // The href is just the compiled result.
	  //
	  url.href = url.toString();
	}

	/**
	 * This is convenience method for changing properties in the URL instance to
	 * insure that they all propagate correctly.
	 *
	 * @param {String} part          Property we need to adjust.
	 * @param {Mixed} value          The newly assigned value.
	 * @param {Boolean|Function} fn  When setting the query, it will be the function
	 *                               used to parse the query.
	 *                               When setting the protocol, double slash will be
	 *                               removed from the final url if it is true.
	 * @returns {URL} URL instance for chaining.
	 * @public
	 */
	function set(part, value, fn) {
	  var url = this;

	  switch (part) {
	    case 'query':
	      if ('string' === typeof value && value.length) {
	        value = (fn || querystringify_1.parse)(value);
	      }

	      url[part] = value;
	      break;

	    case 'port':
	      url[part] = value;

	      if (!requiresPort(value, url.protocol)) {
	        url.host = url.hostname;
	        url[part] = '';
	      } else if (value) {
	        url.host = url.hostname +':'+ value;
	      }

	      break;

	    case 'hostname':
	      url[part] = value;

	      if (url.port) value += ':'+ url.port;
	      url.host = value;
	      break;

	    case 'host':
	      url[part] = value;

	      if (/:\d+$/.test(value)) {
	        value = value.split(':');
	        url.port = value.pop();
	        url.hostname = value.join(':');
	      } else {
	        url.hostname = value;
	        url.port = '';
	      }

	      break;

	    case 'protocol':
	      url.protocol = value.toLowerCase();
	      url.slashes = !fn;
	      break;

	    case 'pathname':
	    case 'hash':
	      if (value) {
	        var char = part === 'pathname' ? '/' : '#';
	        url[part] = value.charAt(0) !== char ? char + value : value;
	      } else {
	        url[part] = value;
	      }
	      break;

	    default:
	      url[part] = value;
	  }

	  for (var i = 0; i < rules.length; i++) {
	    var ins = rules[i];

	    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
	  }

	  url.origin = url.protocol !== 'file:' && isSpecial(url.protocol) && url.host
	    ? url.protocol +'//'+ url.host
	    : 'null';

	  url.href = url.toString();

	  return url;
	}

	/**
	 * Transform the properties back in to a valid and full URL string.
	 *
	 * @param {Function} stringify Optional query stringify function.
	 * @returns {String} Compiled version of the URL.
	 * @public
	 */
	function toString$2(stringify) {
	  if (!stringify || 'function' !== typeof stringify) stringify = querystringify_1.stringify;

	  var query
	    , url = this
	    , protocol = url.protocol;

	  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

	  var result = protocol + (url.slashes || isSpecial(url.protocol) ? '//' : '');

	  if (url.username) {
	    result += url.username;
	    if (url.password) result += ':'+ url.password;
	    result += '@';
	  }

	  result += url.host + url.pathname;

	  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
	  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

	  if (url.hash) result += url.hash;

	  return result;
	}

	Url.prototype = { set: set, toString: toString$2 };

	//
	// Expose the URL parser and some additional properties that might be useful for
	// others or testing.
	//
	Url.extractProtocol = extractProtocol;
	Url.location = lolcation;
	Url.trimLeft = trimLeft;
	Url.qs = querystringify_1;

	var urlParse = Url;

	/* eslint complexity: [2, 18], max-statements: [2, 33] */
	var shams = function hasSymbols() {
		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
		if (typeof Symbol.iterator === 'symbol') { return true; }

		var obj = {};
		var sym = Symbol('test');
		var symObj = Object(sym);
		if (typeof sym === 'string') { return false; }

		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

		// temp disabled per https://github.com/ljharb/object.assign/issues/17
		// if (sym instanceof Symbol) { return false; }
		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
		// if (!(symObj instanceof Symbol)) { return false; }

		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

		var symVal = 42;
		obj[sym] = symVal;
		for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) { return false; }

		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

		if (typeof Object.getOwnPropertyDescriptor === 'function') {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
		}

		return true;
	};

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;


	var hasSymbols = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return shams();
	};

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	var implementation = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

	var functionBind = Function.prototype.bind || implementation;

	var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

	var undefined$1;

	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError = TypeError;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;
	if ($gOPD) {
		try {
			$gOPD({}, '');
		} catch (e) {
			$gOPD = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols$1 = hasSymbols();

	var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

	var INTRINSICS = {
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols$1 ? getProto([][Symbol.iterator]()) : undefined$1,
		'%AsyncFromSyncIteratorPrototype%': undefined$1,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols$1 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
		'%RangeError%': RangeError,
		'%ReferenceError%': ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$1 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols$1 ? getProto(''[Symbol.iterator]()) : undefined$1,
		'%Symbol%': hasSymbols$1 ? Symbol : undefined$1,
		'%SyntaxError%': $SyntaxError,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
		'%URIError%': URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen) {
				value = getProto(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};



	var $concat = functionBind.call(Function.call, Array.prototype.concat);
	var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
	var $replace = functionBind.call(Function.call, String.prototype.replace);
	var $strSlice = functionBind.call(Function.call, String.prototype.slice);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (src(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (src(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError('"allowMissing" argument must be a boolean');
		}

		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (src(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined$1;
				}
				if ($gOPD && (i + 1) >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = src(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};

	var callBind = createCommonjsModule(function (module) {




	var $apply = getIntrinsic('%Function.prototype.apply%');
	var $call = getIntrinsic('%Function.prototype.call%');
	var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);

	var $gOPD = getIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = getIntrinsic('%Object.defineProperty%', true);
	var $max = getIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(functionBind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	}
	});
	var callBind_1 = callBind.apply;

	var $indexOf = callBind(getIntrinsic('String.prototype.indexOf'));

	var callBound = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = getIntrinsic(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
			return callBind(intrinsic);
		}
		return intrinsic;
	};

	var _nodeResolve_empty = {};

	var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
		'default': _nodeResolve_empty
	});

	var require$$0 = getCjsExportFromNamespace(_nodeResolve_empty$1);

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
	var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
	var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var match = String.prototype.match;
	var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
	var gOPS = Object.getOwnPropertySymbols;
	var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
	var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
	var isEnumerable = Object.prototype.propertyIsEnumerable;

	var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || (
	    [].__proto__ === Array.prototype // eslint-disable-line no-proto
	        ? function (O) {
	            return O.__proto__; // eslint-disable-line no-proto
	        }
	        : null
	);

	var inspectCustom = require$$0.custom;
	var inspectSymbol = inspectCustom && isSymbol$1(inspectCustom) ? inspectCustom : null;
	var toStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag !== 'undefined' ? Symbol.toStringTag : null;

	var objectInspect = function inspect_(obj, options, depth, seen) {
	    var opts = options || {};

	    if (has$1(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
	        throw new TypeError('option "quoteStyle" must be "single" or "double"');
	    }
	    if (
	        has$1(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
	            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
	            : opts.maxStringLength !== null
	        )
	    ) {
	        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
	    }
	    var customInspect = has$1(opts, 'customInspect') ? opts.customInspect : true;
	    if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
	        throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
	    }

	    if (
	        has$1(opts, 'indent')
	        && opts.indent !== null
	        && opts.indent !== '\t'
	        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
	    ) {
	        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
	    }

	    if (typeof obj === 'undefined') {
	        return 'undefined';
	    }
	    if (obj === null) {
	        return 'null';
	    }
	    if (typeof obj === 'boolean') {
	        return obj ? 'true' : 'false';
	    }

	    if (typeof obj === 'string') {
	        return inspectString(obj, opts);
	    }
	    if (typeof obj === 'number') {
	        if (obj === 0) {
	            return Infinity / obj > 0 ? '0' : '-0';
	        }
	        return String(obj);
	    }
	    if (typeof obj === 'bigint') {
	        return String(obj) + 'n';
	    }

	    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
	    if (typeof depth === 'undefined') { depth = 0; }
	    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
	        return isArray$2(obj) ? '[Array]' : '[Object]';
	    }

	    var indent = getIndent(opts, depth);

	    if (typeof seen === 'undefined') {
	        seen = [];
	    } else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }

	    function inspect(value, from, noIndent) {
	        if (from) {
	            seen = seen.slice();
	            seen.push(from);
	        }
	        if (noIndent) {
	            var newOpts = {
	                depth: opts.depth
	            };
	            if (has$1(opts, 'quoteStyle')) {
	                newOpts.quoteStyle = opts.quoteStyle;
	            }
	            return inspect_(value, newOpts, depth + 1, seen);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }

	    if (typeof obj === 'function') {
	        var name = nameOf(obj);
	        var keys = arrObjKeys(obj, inspect);
	        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + keys.join(', ') + ' }' : '');
	    }
	    if (isSymbol$1(obj)) {
	        var symString = hasShammedSymbols ? String(obj).replace(/^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
	        return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
	    }
	    if (isElement(obj)) {
	        var s = '<' + String(obj.nodeName).toLowerCase();
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
	        s += '</' + String(obj.nodeName).toLowerCase() + '>';
	        return s;
	    }
	    if (isArray$2(obj)) {
	        if (obj.length === 0) { return '[]'; }
	        var xs = arrObjKeys(obj, inspect);
	        if (indent && !singleLineValues(xs)) {
	            return '[' + indentedJoin(xs, indent) + ']';
	        }
	        return '[ ' + xs.join(', ') + ' ]';
	    }
	    if (isError(obj)) {
	        var parts = arrObjKeys(obj, inspect);
	        if (parts.length === 0) { return '[' + String(obj) + ']'; }
	        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
	    }
	    if (typeof obj === 'object' && customInspect) {
	        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
	            return obj[inspectSymbol]();
	        } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
	            return obj.inspect();
	        }
	    }
	    if (isMap(obj)) {
	        var mapParts = [];
	        mapForEach.call(obj, function (value, key) {
	            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
	        });
	        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
	    }
	    if (isSet(obj)) {
	        var setParts = [];
	        setForEach.call(obj, function (value) {
	            setParts.push(inspect(value, obj));
	        });
	        return collectionOf('Set', setSize.call(obj), setParts, indent);
	    }
	    if (isWeakMap(obj)) {
	        return weakCollectionOf('WeakMap');
	    }
	    if (isWeakSet(obj)) {
	        return weakCollectionOf('WeakSet');
	    }
	    if (isWeakRef(obj)) {
	        return weakCollectionOf('WeakRef');
	    }
	    if (isNumber(obj)) {
	        return markBoxed(inspect(Number(obj)));
	    }
	    if (isBigInt(obj)) {
	        return markBoxed(inspect(bigIntValueOf.call(obj)));
	    }
	    if (isBoolean(obj)) {
	        return markBoxed(booleanValueOf.call(obj));
	    }
	    if (isString(obj)) {
	        return markBoxed(inspect(String(obj)));
	    }
	    if (!isDate(obj) && !isRegExp(obj)) {
	        var ys = arrObjKeys(obj, inspect);
	        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
	        var protoTag = obj instanceof Object ? '' : 'null prototype';
	        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? toStr$1(obj).slice(8, -1) : protoTag ? 'Object' : '';
	        var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
	        var tag = constructorTag + (stringTag || protoTag ? '[' + [].concat(stringTag || [], protoTag || []).join(': ') + '] ' : '');
	        if (ys.length === 0) { return tag + '{}'; }
	        if (indent) {
	            return tag + '{' + indentedJoin(ys, indent) + '}';
	        }
	        return tag + '{ ' + ys.join(', ') + ' }';
	    }
	    return String(obj);
	};

	function wrapQuotes(s, defaultStyle, opts) {
	    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
	    return quoteChar + s + quoteChar;
	}

	function quote(s) {
	    return String(s).replace(/"/g, '&quot;');
	}

	function isArray$2(obj) { return toStr$1(obj) === '[object Array]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isDate(obj) { return toStr$1(obj) === '[object Date]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isRegExp(obj) { return toStr$1(obj) === '[object RegExp]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isError(obj) { return toStr$1(obj) === '[object Error]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isString(obj) { return toStr$1(obj) === '[object String]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isNumber(obj) { return toStr$1(obj) === '[object Number]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }
	function isBoolean(obj) { return toStr$1(obj) === '[object Boolean]' && (!toStringTag || !(typeof obj === 'object' && toStringTag in obj)); }

	// Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
	function isSymbol$1(obj) {
	    if (hasShammedSymbols) {
	        return obj && typeof obj === 'object' && obj instanceof Symbol;
	    }
	    if (typeof obj === 'symbol') {
	        return true;
	    }
	    if (!obj || typeof obj !== 'object' || !symToString) {
	        return false;
	    }
	    try {
	        symToString.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isBigInt(obj) {
	    if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
	        return false;
	    }
	    try {
	        bigIntValueOf.call(obj);
	        return true;
	    } catch (e) {}
	    return false;
	}

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has$1(obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr$1(obj) {
	    return objectToString.call(obj);
	}

	function nameOf(f) {
	    if (f.name) { return f.name; }
	    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
	    if (m) { return m[1]; }
	    return null;
	}

	function indexOf(xs, x) {
	    if (xs.indexOf) { return xs.indexOf(x); }
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) { return i; }
	    }
	    return -1;
	}

	function isMap(x) {
	    if (!mapSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        mapSize.call(x);
	        try {
	            setSize.call(x);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof Map; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakMap(x) {
	    if (!weakMapHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakMapHas.call(x, weakMapHas);
	        try {
	            weakSetHas.call(x, weakSetHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakRef(x) {
	    if (!weakRefDeref || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakRefDeref.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isSet(x) {
	    if (!setSize || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        setSize.call(x);
	        try {
	            mapSize.call(x);
	        } catch (m) {
	            return true;
	        }
	        return x instanceof Set; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isWeakSet(x) {
	    if (!weakSetHas || !x || typeof x !== 'object') {
	        return false;
	    }
	    try {
	        weakSetHas.call(x, weakSetHas);
	        try {
	            weakMapHas.call(x, weakMapHas);
	        } catch (s) {
	            return true;
	        }
	        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
	    } catch (e) {}
	    return false;
	}

	function isElement(x) {
	    if (!x || typeof x !== 'object') { return false; }
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str, opts) {
	    if (str.length > opts.maxStringLength) {
	        var remaining = str.length - opts.maxStringLength;
	        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
	        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
	    }
	    // eslint-disable-next-line no-control-regex
	    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	    return wrapQuotes(s, 'single', opts);
	}

	function lowbyte(c) {
	    var n = c.charCodeAt(0);
	    var x = {
	        8: 'b',
	        9: 't',
	        10: 'n',
	        12: 'f',
	        13: 'r'
	    }[n];
	    if (x) { return '\\' + x; }
	    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16).toUpperCase();
	}

	function markBoxed(str) {
	    return 'Object(' + str + ')';
	}

	function weakCollectionOf(type) {
	    return type + ' { ? }';
	}

	function collectionOf(type, size, entries, indent) {
	    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
	    return type + ' (' + size + ') {' + joinedEntries + '}';
	}

	function singleLineValues(xs) {
	    for (var i = 0; i < xs.length; i++) {
	        if (indexOf(xs[i], '\n') >= 0) {
	            return false;
	        }
	    }
	    return true;
	}

	function getIndent(opts, depth) {
	    var baseIndent;
	    if (opts.indent === '\t') {
	        baseIndent = '\t';
	    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
	        baseIndent = Array(opts.indent + 1).join(' ');
	    } else {
	        return null;
	    }
	    return {
	        base: baseIndent,
	        prev: Array(depth + 1).join(baseIndent)
	    };
	}

	function indentedJoin(xs, indent) {
	    if (xs.length === 0) { return ''; }
	    var lineJoiner = '\n' + indent.prev + indent.base;
	    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
	}

	function arrObjKeys(obj, inspect) {
	    var isArr = isArray$2(obj);
	    var xs = [];
	    if (isArr) {
	        xs.length = obj.length;
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has$1(obj, i) ? inspect(obj[i], obj) : '';
	        }
	    }
	    var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
	    var symMap;
	    if (hasShammedSymbols) {
	        symMap = {};
	        for (var k = 0; k < syms.length; k++) {
	            symMap['$' + syms[k]] = syms[k];
	        }
	    }

	    for (var key in obj) { // eslint-disable-line no-restricted-syntax
	        if (!has$1(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
	        if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
	            // this is to prevent shammed Symbols, which are stored as strings, from being included in the string key section
	            continue; // eslint-disable-line no-restricted-syntax, no-continue
	        } else if ((/[^\w$]/).test(key)) {
	            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
	        } else {
	            xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	    }
	    if (typeof gOPS === 'function') {
	        for (var j = 0; j < syms.length; j++) {
	            if (isEnumerable.call(obj, syms[j])) {
	                xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
	            }
	        }
	    }
	    return xs;
	}

	var $TypeError$1 = getIntrinsic('%TypeError%');
	var $WeakMap = getIntrinsic('%WeakMap%', true);
	var $Map = getIntrinsic('%Map%', true);

	var $weakMapGet = callBound('WeakMap.prototype.get', true);
	var $weakMapSet = callBound('WeakMap.prototype.set', true);
	var $weakMapHas = callBound('WeakMap.prototype.has', true);
	var $mapGet = callBound('Map.prototype.get', true);
	var $mapSet = callBound('Map.prototype.set', true);
	var $mapHas = callBound('Map.prototype.has', true);

	/*
	 * This function traverses the list returning the node corresponding to the
	 * given key.
	 *
	 * That node is also moved to the head of the list, so that if it's accessed
	 * again we don't need to traverse the whole list. By doing so, all the recently
	 * used nodes can be accessed relatively quickly.
	 */
	var listGetNode = function (list, key) { // eslint-disable-line consistent-return
		for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
			if (curr.key === key) {
				prev.next = curr.next;
				curr.next = list.next;
				list.next = curr; // eslint-disable-line no-param-reassign
				return curr;
			}
		}
	};

	var listGet = function (objects, key) {
		var node = listGetNode(objects, key);
		return node && node.value;
	};
	var listSet = function (objects, key, value) {
		var node = listGetNode(objects, key);
		if (node) {
			node.value = value;
		} else {
			// Prepend the new node to the beginning of the list
			objects.next = { // eslint-disable-line no-param-reassign
				key: key,
				next: objects.next,
				value: value
			};
		}
	};
	var listHas = function (objects, key) {
		return !!listGetNode(objects, key);
	};

	var sideChannel = function getSideChannel() {
		var $wm;
		var $m;
		var $o;
		var channel = {
			assert: function (key) {
				if (!channel.has(key)) {
					throw new $TypeError$1('Side channel does not contain ' + objectInspect(key));
				}
			},
			get: function (key) { // eslint-disable-line consistent-return
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapGet($wm, key);
					}
				} else if ($Map) {
					if ($m) {
						return $mapGet($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listGet($o, key);
					}
				}
			},
			has: function (key) {
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if ($wm) {
						return $weakMapHas($wm, key);
					}
				} else if ($Map) {
					if ($m) {
						return $mapHas($m, key);
					}
				} else {
					if ($o) { // eslint-disable-line no-lonely-if
						return listHas($o, key);
					}
				}
				return false;
			},
			set: function (key, value) {
				if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
					if (!$wm) {
						$wm = new $WeakMap();
					}
					$weakMapSet($wm, key, value);
				} else if ($Map) {
					if (!$m) {
						$m = new $Map();
					}
					$mapSet($m, key, value);
				} else {
					if (!$o) {
						/*
						 * Initialize the linked list as an empty node, so that we don't have
						 * to special-case handling of the first node: we can always refer to
						 * it as (previous node).next, instead of something like (list).head
						 */
						$o = { key: {}, next: null };
					}
					listSet($o, key, value);
				}
			}
		};
		return channel;
	};

	var replace = String.prototype.replace;
	var percentTwenties = /%20/g;
	var Format = {
	  RFC1738: 'RFC1738',
	  RFC3986: 'RFC3986'
	};
	var formats = {
	  'default': Format.RFC3986,
	  formatters: {
	    RFC1738: function RFC1738(value) {
	      return replace.call(value, percentTwenties, '+');
	    },
	    RFC3986: function RFC3986(value) {
	      return String(value);
	    }
	  },
	  RFC1738: Format.RFC1738,
	  RFC3986: Format.RFC3986
	};

	var has$2 = Object.prototype.hasOwnProperty;
	var isArray$3 = isArray$1;

	var hexTable = function () {
	  var array = [];

	  for (var i = 0; i < 256; ++i) {
	    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
	  }

	  return array;
	}();

	var compactQueue = function compactQueue(queue) {
	  while (queue.length > 1) {
	    var item = queue.pop();
	    var obj = item.obj[item.prop];

	    if (isArray$3(obj)) {
	      var compacted = [];

	      for (var j = 0; j < obj.length; ++j) {
	        if (typeof obj[j] !== 'undefined') {
	          compacted.push(obj[j]);
	        }
	      }

	      item.obj[item.prop] = compacted;
	    }
	  }
	};

	var arrayToObject = function arrayToObject(source, options) {
	  var obj = options && options.plainObjects ? create$1(null) : {};

	  for (var i = 0; i < source.length; ++i) {
	    if (typeof source[i] !== 'undefined') {
	      obj[i] = source[i];
	    }
	  }

	  return obj;
	};

	var merge = function merge(target, source, options) {
	  /* eslint no-param-reassign: 0 */
	  if (!source) {
	    return target;
	  }

	  if (_typeof(source) !== 'object') {
	    if (isArray$3(target)) {
	      target.push(source);
	    } else if (target && _typeof(target) === 'object') {
	      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
	        target[source] = true;
	      }
	    } else {
	      return [target, source];
	    }

	    return target;
	  }

	  if (!target || _typeof(target) !== 'object') {
	    return [target].concat(source);
	  }

	  var mergeTarget = target;

	  if (isArray$3(target) && !isArray$3(source)) {
	    mergeTarget = arrayToObject(target, options);
	  }

	  if (isArray$3(target) && isArray$3(source)) {
	    source.forEach(function (item, i) {
	      if (has$2.call(target, i)) {
	        var targetItem = target[i];

	        if (targetItem && _typeof(targetItem) === 'object' && item && _typeof(item) === 'object') {
	          target[i] = merge(targetItem, item, options);
	        } else {
	          target.push(item);
	        }
	      } else {
	        target[i] = item;
	      }
	    });
	    return target;
	  }

	  return keys$1(source).reduce(function (acc, key) {
	    var value = source[key];

	    if (has$2.call(acc, key)) {
	      acc[key] = merge(acc[key], value, options);
	    } else {
	      acc[key] = value;
	    }

	    return acc;
	  }, mergeTarget);
	};

	var assign = function assignSingleSource(target, source) {
	  return keys$1(source).reduce(function (acc, key) {
	    acc[key] = source[key];
	    return acc;
	  }, target);
	};

	var decode$1 = function decode(str, decoder, charset) {
	  var strWithoutPlus = str.replace(/\+/g, ' ');

	  if (charset === 'iso-8859-1') {
	    // unescape never throws, no try...catch needed:
	    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
	  } // utf-8


	  try {
	    return decodeURIComponent(strWithoutPlus);
	  } catch (e) {
	    return strWithoutPlus;
	  }
	};

	var encode = function encode(str, defaultEncoder, charset, kind, format) {
	  // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	  // It has been adapted here for stricter adherence to RFC 3986
	  if (str.length === 0) {
	    return str;
	  }

	  var string = str;

	  if (_typeof(str) === 'symbol') {
	    string = symbol$1.prototype.toString.call(str);
	  } else if (typeof str !== 'string') {
	    string = String(str);
	  }

	  if (charset === 'iso-8859-1') {
	    return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
	      return '%26%23' + _parseInt$2($0.slice(2), 16) + '%3B';
	    });
	  }

	  var out = '';

	  for (var i = 0; i < string.length; ++i) {
	    var c = string.charCodeAt(i);

	    if (c === 0x2D // -
	    || c === 0x2E // .
	    || c === 0x5F // _
	    || c === 0x7E // ~
	    || c >= 0x30 && c <= 0x39 // 0-9
	    || c >= 0x41 && c <= 0x5A // a-z
	    || c >= 0x61 && c <= 0x7A // A-Z
	    || format === formats.RFC1738 && (c === 0x28 || c === 0x29) // ( )
	    ) {
	      out += string.charAt(i);
	      continue;
	    }

	    if (c < 0x80) {
	      out = out + hexTable[c];
	      continue;
	    }

	    if (c < 0x800) {
	      out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
	      continue;
	    }

	    if (c < 0xD800 || c >= 0xE000) {
	      out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
	      continue;
	    }

	    i += 1;
	    c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
	    out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
	  }

	  return out;
	};

	var compact = function compact(value) {
	  var queue = [{
	    obj: {
	      o: value
	    },
	    prop: 'o'
	  }];
	  var refs = [];

	  for (var i = 0; i < queue.length; ++i) {
	    var item = queue[i];
	    var obj = item.obj[item.prop];

	    var keys = keys$1(obj);

	    for (var j = 0; j < keys.length; ++j) {
	      var key = keys[j];
	      var val = obj[key];

	      if (_typeof(val) === 'object' && val !== null && refs.indexOf(val) === -1) {
	        queue.push({
	          obj: obj,
	          prop: key
	        });
	        refs.push(val);
	      }
	    }
	  }

	  compactQueue(queue);
	  return value;
	};

	var isRegExp$1 = function isRegExp(obj) {
	  return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	var isBuffer = function isBuffer(obj) {
	  if (!obj || _typeof(obj) !== 'object') {
	    return false;
	  }

	  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};

	var combine = function combine(a, b) {
	  return [].concat(a, b);
	};

	var maybeMap = function maybeMap(val, fn) {
	  if (isArray$3(val)) {
	    var mapped = [];

	    for (var i = 0; i < val.length; i += 1) {
	      mapped.push(fn(val[i]));
	    }

	    return mapped;
	  }

	  return fn(val);
	};

	var utils = {
	  arrayToObject: arrayToObject,
	  assign: assign,
	  combine: combine,
	  compact: compact,
	  decode: decode$1,
	  encode: encode,
	  isBuffer: isBuffer,
	  isRegExp: isRegExp$1,
	  maybeMap: maybeMap,
	  merge: merge
	};

	var has$3 = Object.prototype.hasOwnProperty;
	var arrayPrefixGenerators = {
	  brackets: function brackets(prefix) {
	    return prefix + '[]';
	  },
	  comma: 'comma',
	  indices: function indices(prefix, key) {
	    return prefix + '[' + key + ']';
	  },
	  repeat: function repeat(prefix) {
	    return prefix;
	  }
	};
	var isArray$4 = isArray$1;
	var push = Array.prototype.push;

	var pushToArray = function pushToArray(arr, valueOrArray) {
	  push.apply(arr, isArray$4(valueOrArray) ? valueOrArray : [valueOrArray]);
	};

	var toISO = Date.prototype.toISOString;
	var defaultFormat = formats['default'];
	var defaults = {
	  addQueryPrefix: false,
	  allowDots: false,
	  charset: 'utf-8',
	  charsetSentinel: false,
	  delimiter: '&',
	  encode: true,
	  encoder: utils.encode,
	  encodeValuesOnly: false,
	  format: defaultFormat,
	  formatter: formats.formatters[defaultFormat],
	  // deprecated
	  indices: false,
	  serializeDate: function serializeDate(date) {
	    return toISO.call(date);
	  },
	  skipNulls: false,
	  strictNullHandling: false
	};

	var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
	  return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || _typeof(v) === 'symbol' || typeof v === 'bigint';
	};

	var stringify$1 = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel$1) {
	  var obj = object;

	  if (sideChannel$1.has(object)) {
	    throw new RangeError('Cyclic object value');
	  }

	  if (typeof filter === 'function') {
	    obj = filter(prefix, obj);
	  } else if (obj instanceof Date) {
	    obj = serializeDate(obj);
	  } else if (generateArrayPrefix === 'comma' && isArray$4(obj)) {
	    obj = utils.maybeMap(obj, function (value) {
	      if (value instanceof Date) {
	        return serializeDate(value);
	      }

	      return value;
	    });
	  }

	  if (obj === null) {
	    if (strictNullHandling) {
	      return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
	    }

	    obj = '';
	  }

	  if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
	    if (encoder) {
	      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
	      return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))];
	    }

	    return [formatter(prefix) + '=' + formatter(String(obj))];
	  }

	  var values = [];

	  if (typeof obj === 'undefined') {
	    return values;
	  }

	  var objKeys;

	  if (generateArrayPrefix === 'comma' && isArray$4(obj)) {
	    // we need to join elements in
	    objKeys = [{
	      value: obj.length > 0 ? obj.join(',') || null : undefined
	    }];
	  } else if (isArray$4(filter)) {
	    objKeys = filter;
	  } else {
	    var keys = keys$1(obj);

	    objKeys = sort ? keys.sort(sort) : keys;
	  }

	  for (var i = 0; i < objKeys.length; ++i) {
	    var key = objKeys[i];
	    var value = _typeof(key) === 'object' && key.value !== undefined ? key.value : obj[key];

	    if (skipNulls && value === null) {
	      continue;
	    }

	    var keyPrefix = isArray$4(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? '.' + key : '[' + key + ']');
	    sideChannel$1.set(object, true);
	    var valueSideChannel = sideChannel();
	    pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
	  }

	  return values;
	};

	var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
	  if (!opts) {
	    return defaults;
	  }

	  if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
	    throw new TypeError('Encoder has to be a function.');
	  }

	  var charset = opts.charset || defaults.charset;

	  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	  }

	  var format = formats['default'];

	  if (typeof opts.format !== 'undefined') {
	    if (!has$3.call(formats.formatters, opts.format)) {
	      throw new TypeError('Unknown format option provided.');
	    }

	    format = opts.format;
	  }

	  var formatter = formats.formatters[format];
	  var filter = defaults.filter;

	  if (typeof opts.filter === 'function' || isArray$4(opts.filter)) {
	    filter = opts.filter;
	  }

	  return {
	    addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
	    allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
	    charset: charset,
	    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
	    delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
	    encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
	    encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
	    encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
	    filter: filter,
	    format: format,
	    formatter: formatter,
	    serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
	    skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
	    sort: typeof opts.sort === 'function' ? opts.sort : null,
	    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
	  };
	};

	var stringify_1 = function stringify_1(object, opts) {
	  var obj = object;
	  var options = normalizeStringifyOptions(opts);
	  var objKeys;
	  var filter;

	  if (typeof options.filter === 'function') {
	    filter = options.filter;
	    obj = filter('', obj);
	  } else if (isArray$4(options.filter)) {
	    filter = options.filter;
	    objKeys = filter;
	  }

	  var keys = [];

	  if (_typeof(obj) !== 'object' || obj === null) {
	    return '';
	  }

	  var arrayFormat;

	  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
	    arrayFormat = opts.arrayFormat;
	  } else if (opts && 'indices' in opts) {
	    arrayFormat = opts.indices ? 'indices' : 'repeat';
	  } else {
	    arrayFormat = 'indices';
	  }

	  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

	  if (!objKeys) {
	    objKeys = keys$1(obj);
	  }

	  if (options.sort) {
	    objKeys.sort(options.sort);
	  }

	  var sideChannel$1 = sideChannel();

	  for (var i = 0; i < objKeys.length; ++i) {
	    var key = objKeys[i];

	    if (options.skipNulls && obj[key] === null) {
	      continue;
	    }

	    pushToArray(keys, stringify$1(obj[key], key, generateArrayPrefix, options.strictNullHandling, options.skipNulls, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel$1));
	  }

	  var joined = keys.join(options.delimiter);
	  var prefix = options.addQueryPrefix === true ? '?' : '';

	  if (options.charsetSentinel) {
	    if (options.charset === 'iso-8859-1') {
	      // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
	      prefix += 'utf8=%26%2310003%3B&';
	    } else {
	      // encodeURIComponent('✓')
	      prefix += 'utf8=%E2%9C%93&';
	    }
	  }

	  return joined.length > 0 ? prefix + joined : '';
	};

	var has$4 = Object.prototype.hasOwnProperty;
	var isArray$5 = isArray$1;
	var defaults$1 = {
	  allowDots: false,
	  allowPrototypes: false,
	  allowSparse: false,
	  arrayLimit: 20,
	  charset: 'utf-8',
	  charsetSentinel: false,
	  comma: false,
	  decoder: utils.decode,
	  delimiter: '&',
	  depth: 5,
	  ignoreQueryPrefix: false,
	  interpretNumericEntities: false,
	  parameterLimit: 1000,
	  parseArrays: true,
	  plainObjects: false,
	  strictNullHandling: false
	};

	var interpretNumericEntities = function interpretNumericEntities(str) {
	  return str.replace(/&#(\d+);/g, function ($0, numberStr) {
	    return String.fromCharCode(_parseInt$2(numberStr, 10));
	  });
	};

	var parseArrayValue = function parseArrayValue(val, options) {
	  if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
	    return val.split(',');
	  }

	  return val;
	}; // This is what browsers will submit when the ✓ character occurs in an
	// application/x-www-form-urlencoded body and the encoding of the page containing
	// the form is iso-8859-1, or when the submitted form has an accept-charset
	// attribute of iso-8859-1. Presumably also with other charsets that do not contain
	// the ✓ character, such as us-ascii.


	var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
	// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.

	var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

	var parseValues = function parseQueryStringValues(str, options) {
	  var obj = {};
	  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
	  var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
	  var parts = cleanStr.split(options.delimiter, limit);
	  var skipIndex = -1; // Keep track of where the utf8 sentinel was found

	  var i;
	  var charset = options.charset;

	  if (options.charsetSentinel) {
	    for (i = 0; i < parts.length; ++i) {
	      if (parts[i].indexOf('utf8=') === 0) {
	        if (parts[i] === charsetSentinel) {
	          charset = 'utf-8';
	        } else if (parts[i] === isoSentinel) {
	          charset = 'iso-8859-1';
	        }

	        skipIndex = i;
	        i = parts.length; // The eslint settings do not allow break;
	      }
	    }
	  }

	  for (i = 0; i < parts.length; ++i) {
	    if (i === skipIndex) {
	      continue;
	    }

	    var part = parts[i];
	    var bracketEqualsPos = part.indexOf(']=');
	    var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
	    var key, val;

	    if (pos === -1) {
	      key = options.decoder(part, defaults$1.decoder, charset, 'key');
	      val = options.strictNullHandling ? null : '';
	    } else {
	      key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
	      val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options), function (encodedVal) {
	        return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
	      });
	    }

	    if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
	      val = interpretNumericEntities(val);
	    }

	    if (part.indexOf('[]=') > -1) {
	      val = isArray$5(val) ? [val] : val;
	    }

	    if (has$4.call(obj, key)) {
	      obj[key] = utils.combine(obj[key], val);
	    } else {
	      obj[key] = val;
	    }
	  }

	  return obj;
	};

	var parseObject = function parseObject(chain, val, options, valuesParsed) {
	  var leaf = valuesParsed ? val : parseArrayValue(val, options);

	  for (var i = chain.length - 1; i >= 0; --i) {
	    var obj;
	    var root = chain[i];

	    if (root === '[]' && options.parseArrays) {
	      obj = [].concat(leaf);
	    } else {
	      obj = options.plainObjects ? create$1(null) : {};
	      var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;

	      var index = _parseInt$2(cleanRoot, 10);

	      if (!options.parseArrays && cleanRoot === '') {
	        obj = {
	          0: leaf
	        };
	      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
	        obj = [];
	        obj[index] = leaf;
	      } else {
	        obj[cleanRoot] = leaf;
	      }
	    }

	    leaf = obj;
	  }

	  return leaf;
	};

	var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
	  if (!givenKey) {
	    return;
	  } // Transform dot notation to bracket notation


	  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey; // The regex chunks

	  var brackets = /(\[[^[\]]*])/;
	  var child = /(\[[^[\]]*])/g; // Get the parent

	  var segment = options.depth > 0 && brackets.exec(key);
	  var parent = segment ? key.slice(0, segment.index) : key; // Stash the parent if it exists

	  var keys = [];

	  if (parent) {
	    // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
	    if (!options.plainObjects && has$4.call(Object.prototype, parent)) {
	      if (!options.allowPrototypes) {
	        return;
	      }
	    }

	    keys.push(parent);
	  } // Loop through children appending to the array until we hit depth


	  var i = 0;

	  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
	    i += 1;

	    if (!options.plainObjects && has$4.call(Object.prototype, segment[1].slice(1, -1))) {
	      if (!options.allowPrototypes) {
	        return;
	      }
	    }

	    keys.push(segment[1]);
	  } // If there's a remainder, just add whatever is left


	  if (segment) {
	    keys.push('[' + key.slice(segment.index) + ']');
	  }

	  return parseObject(keys, val, options, valuesParsed);
	};

	var normalizeParseOptions = function normalizeParseOptions(opts) {
	  if (!opts) {
	    return defaults$1;
	  }

	  if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
	    throw new TypeError('Decoder has to be a function.');
	  }

	  if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
	    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
	  }

	  var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;
	  return {
	    allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
	    allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
	    allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults$1.allowSparse,
	    arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
	    charset: charset,
	    charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
	    comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
	    decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
	    delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
	    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
	    depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults$1.depth,
	    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
	    interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
	    parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
	    parseArrays: opts.parseArrays !== false,
	    plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
	    strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
	  };
	};

	var parse$1 = function parse(str, opts) {
	  var options = normalizeParseOptions(opts);

	  if (str === '' || str === null || typeof str === 'undefined') {
	    return options.plainObjects ? create$1(null) : {};
	  }

	  var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	  var obj = options.plainObjects ? create$1(null) : {}; // Iterate over the keys and setup the new object

	  var keys = keys$1(tempObj);

	  for (var i = 0; i < keys.length; ++i) {
	    var key = keys[i];
	    var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
	    obj = utils.merge(obj, newObj, options);
	  }

	  if (options.allowSparse === true) {
	    return obj;
	  }

	  return utils.compact(obj);
	};

	var lib = {
	  formats: formats,
	  parse: parse$1,
	  stringify: stringify_1
	};

	function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct$2(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct$2) return false; if (construct$2.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof symbol$1 !== "undefined" && o[iterator$1] || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$1(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

	function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function ownKeys(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { var symbols = getOwnPropertySymbols$1(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys(Object(source)).forEach(function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

	var ARRAY_FORMAT = symbol$1();

	var INDICES_REGEX = /\[\d+\]$/;
	var BRACKETS_REGEX = /\[\]$/;

	function parseQuery(query, options) {
	  return lib.parse(query, _objectSpread({
	    plainObjects: true,
	    ignoreQueryPrefix: true,
	    strictNullHandling: true
	  }, options));
	}

	function stringifyQuery(obj) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  return lib.stringify(obj, _objectSpread({
	    addQueryPrefix: true,
	    strictNullHandling: true
	  }, options));
	}
	/**
	 * Given a query string, determine the array format used. Returns `undefined`
	 * if one cannot be determined.
	 *
	 * @param {String} query
	 * @returns {String | undefined}
	 */


	function arrayFormat(query) {
	  var keys = (query || '').replace('?', '').split('&').map(function (str) {
	    return decodeURIComponent(str.split('=')[0]);
	  });

	  var _iterator = _createForOfIteratorHelper(keys),
	      _step;

	  try {
	    for (_iterator.s(); !(_step = _iterator.n()).done;) {
	      var key = _step.value;

	      if (INDICES_REGEX.test(key)) {
	        // a[0]=b&a[1]=c
	        return 'indices';
	      } else if (BRACKETS_REGEX.test(key)) {
	        // a[]=b&a[]=c
	        return 'brackets';
	      }
	    } // Look to see if any key has a duplicate

	  } catch (err) {
	    _iterator.e(err);
	  } finally {
	    _iterator.f();
	  }

	  var hasDuplicate = keys.some(function (key, index) {
	    return keys.indexOf(key) !== index;
	  });

	  if (hasDuplicate) {
	    // 'a=b&a=c'
	    return 'repeat';
	  }
	}
	/**
	 * An extended url-parse class that uses `qs` instead of the default
	 * `querystringify` to support array and nested object query param strings.
	 */


	var URL = /*#__PURE__*/function (_URLParse) {
	  _inherits(URL, _URLParse);

	  var _super = _createSuper$1(URL);

	  function URL(url, parse) {
	    var _this;

	    _classCallCheck(this, URL);

	    // Construct the url with an un-parsed querystring
	    _this = _super.call(this, url);

	    if (parse) {
	      // If we want the querystring to be parsed, use this.set('query', query)
	      // as it will always parse the string. If there is no initial querystring
	      // pass an object which will act as the parsed query.
	      _this.set('query', _this.query || {});
	    }

	    return _this;
	  }
	  /**
	   * Override set for `query` so we can pass it our custom parser.
	   * https://github.com/unshiftio/url-parse/blob/1.4.4/index.js#L314-L316
	   *
	   * @override
	   */


	  _createClass(URL, [{
	    key: "set",
	    value: function set(part, value, fn) {
	      if (part === 'query') {
	        if (value && typeof value === 'string') {
	          // Save the array format used so when we stringify it,
	          // we can use the correct format.
	          this[ARRAY_FORMAT] = arrayFormat(value) || this[ARRAY_FORMAT];
	        }

	        return _get(_getPrototypeOf(URL.prototype), "set", this).call(this, part, value, parseQuery);
	      }

	      return _get(_getPrototypeOf(URL.prototype), "set", this).call(this, part, value, fn);
	    }
	    /**
	     * Override toString so we can pass it our custom query stringify method.
	     * https://github.com/unshiftio/url-parse/blob/1.4.4/index.js#L414
	     *
	     * @override
	     */

	  }, {
	    key: "toString",
	    value: function toString() {
	      var _this2 = this;

	      return _get(_getPrototypeOf(URL.prototype), "toString", this).call(this, function (obj) {
	        return stringifyQuery(obj, {
	          arrayFormat: _this2[ARRAY_FORMAT]
	        });
	      });
	    }
	  }]);

	  return URL;
	}(urlParse);

	function buildUrl() {
	  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
	    paths[_key] = arguments[_key];
	  }

	  var url = new URL(paths.map(function (p) {
	    return p && (p + '').trim();
	  }) // Trim each string
	  .filter(Boolean) // Remove empty strings or other falsy paths
	  .join('/')); // Replace 2+ consecutive slashes with 1. (e.g. `///` --> `/`)

	  url.set('pathname', url.pathname.replace(/\/{2,}/g, '/'));
	  return url.href;
	}

	var supportsBlob = function () {
	  try {
	    return !!new Blob();
	  } catch (e) {
	    return false;
	  }
	}();

	var arrayWithHoles = createCommonjsModule(function (module) {
	function _arrayWithHoles(arr) {
	  if (isArray$1(arr)) return arr;
	}

	module.exports = _arrayWithHoles;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(arrayWithHoles);

	var iterableToArrayLimit = createCommonjsModule(function (module) {
	function _iterableToArrayLimit(arr, i) {
	  var _i = arr == null ? null : typeof symbol$1 !== "undefined" && arr[iterator$1] || arr["@@iterator"];

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	module.exports = _iterableToArrayLimit;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(iterableToArrayLimit);

	var nonIterableRest = createCommonjsModule(function (module) {
	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	module.exports = _nonIterableRest;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(nonIterableRest);

	var slicedToArray = createCommonjsModule(function (module) {
	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
	}

	module.exports = _slicedToArray;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	unwrapExports(slicedToArray);

	var global$1 = (typeof global !== "undefined" ? global :
	            typeof self !== "undefined" ? self :
	            typeof window !== "undefined" ? window : {});

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString$3 = {}.toString;

	var isArray$6 = Array.isArray || function (arr) {
	  return toString$3.call(arr) == '[object Array]';
	};

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
	  ? global$1.TYPED_ARRAY_SUPPORT
	  : true;

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray$6(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	Buffer.isBuffer = isBuffer$1;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!isArray$6(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf$1(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf$1(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf$1 (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer$1(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	/**
	 * Clone an array buffer
	 *
	 * @param {ArrayBuffer} arrayBuffer
	 */

	var version = "6.0.5";

	var loglevel = createCommonjsModule(function (module) {
	/*
	* loglevel - https://github.com/pimterry/loglevel
	*
	* Copyright (c) 2013 Tim Perry
	* Licensed under the MIT license.
	*/
	(function (root, definition) {
	    if (module.exports) {
	        module.exports = definition();
	    } else {
	        root.log = definition();
	    }
	}(commonjsGlobal, function () {

	    // Slightly dubious tricks to cut down minimized file size
	    var noop = function() {};
	    var undefinedType = "undefined";
	    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
	        /Trident\/|MSIE /.test(window.navigator.userAgent)
	    );

	    var logMethods = [
	        "trace",
	        "debug",
	        "info",
	        "warn",
	        "error"
	    ];

	    // Cross-browser bind equivalent that works at least back to IE6
	    function bindMethod(obj, methodName) {
	        var method = obj[methodName];
	        if (typeof method.bind === 'function') {
	            return method.bind(obj);
	        } else {
	            try {
	                return Function.prototype.bind.call(method, obj);
	            } catch (e) {
	                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
	                return function() {
	                    return Function.prototype.apply.apply(method, [obj, arguments]);
	                };
	            }
	        }
	    }

	    // Trace() doesn't print the message in IE, so for that case we need to wrap it
	    function traceForIE() {
	        if (console.log) {
	            if (console.log.apply) {
	                console.log.apply(console, arguments);
	            } else {
	                // In old IE, native console methods themselves don't have apply().
	                Function.prototype.apply.apply(console.log, [console, arguments]);
	            }
	        }
	        if (console.trace) console.trace();
	    }

	    // Build the best logging method possible for this env
	    // Wherever possible we want to bind, not wrap, to preserve stack traces
	    function realMethod(methodName) {
	        if (methodName === 'debug') {
	            methodName = 'log';
	        }

	        if (typeof console === undefinedType) {
	            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
	        } else if (methodName === 'trace' && isIE) {
	            return traceForIE;
	        } else if (console[methodName] !== undefined) {
	            return bindMethod(console, methodName);
	        } else if (console.log !== undefined) {
	            return bindMethod(console, 'log');
	        } else {
	            return noop;
	        }
	    }

	    // These private functions always need `this` to be set properly

	    function replaceLoggingMethods(level, loggerName) {
	        /*jshint validthis:true */
	        for (var i = 0; i < logMethods.length; i++) {
	            var methodName = logMethods[i];
	            this[methodName] = (i < level) ?
	                noop :
	                this.methodFactory(methodName, level, loggerName);
	        }

	        // Define log.log as an alias for log.debug
	        this.log = this.debug;
	    }

	    // In old IE versions, the console isn't present until you first open it.
	    // We build realMethod() replacements here that regenerate logging methods
	    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
	        return function () {
	            if (typeof console !== undefinedType) {
	                replaceLoggingMethods.call(this, level, loggerName);
	                this[methodName].apply(this, arguments);
	            }
	        };
	    }

	    // By default, we use closely bound real methods wherever possible, and
	    // otherwise we wait for a console to appear, and then try again.
	    function defaultMethodFactory(methodName, level, loggerName) {
	        /*jshint validthis:true */
	        return realMethod(methodName) ||
	               enableLoggingWhenConsoleArrives.apply(this, arguments);
	    }

	    function Logger(name, defaultLevel, factory) {
	      var self = this;
	      var currentLevel;
	      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;

	      var storageKey = "loglevel";
	      if (typeof name === "string") {
	        storageKey += ":" + name;
	      } else if (typeof name === "symbol") {
	        storageKey = undefined;
	      }

	      function persistLevelIfPossible(levelNum) {
	          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

	          if (typeof window === undefinedType || !storageKey) return;

	          // Use localStorage if available
	          try {
	              window.localStorage[storageKey] = levelName;
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=" + levelName + ";";
	          } catch (ignore) {}
	      }

	      function getPersistedLevel() {
	          var storedLevel;

	          if (typeof window === undefinedType || !storageKey) return;

	          try {
	              storedLevel = window.localStorage[storageKey];
	          } catch (ignore) {}

	          // Fallback to cookies if local storage gives us nothing
	          if (typeof storedLevel === undefinedType) {
	              try {
	                  var cookie = window.document.cookie;
	                  var location = cookie.indexOf(
	                      encodeURIComponent(storageKey) + "=");
	                  if (location !== -1) {
	                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
	                  }
	              } catch (ignore) {}
	          }

	          // If the stored level is not valid, treat it as if nothing was stored.
	          if (self.levels[storedLevel] === undefined) {
	              storedLevel = undefined;
	          }

	          return storedLevel;
	      }

	      function clearPersistedLevel() {
	          if (typeof window === undefinedType || !storageKey) return;

	          // Use localStorage if available
	          try {
	              window.localStorage.removeItem(storageKey);
	              return;
	          } catch (ignore) {}

	          // Use session cookie as fallback
	          try {
	              window.document.cookie =
	                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	          } catch (ignore) {}
	      }

	      /*
	       *
	       * Public logger API - see https://github.com/pimterry/loglevel for details
	       *
	       */

	      self.name = name;

	      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
	          "ERROR": 4, "SILENT": 5};

	      self.methodFactory = factory || defaultMethodFactory;

	      self.getLevel = function () {
	          return currentLevel;
	      };

	      self.setLevel = function (level, persist) {
	          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
	              level = self.levels[level.toUpperCase()];
	          }
	          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
	              currentLevel = level;
	              if (persist !== false) {  // defaults to true
	                  persistLevelIfPossible(level);
	              }
	              replaceLoggingMethods.call(self, level, name);
	              if (typeof console === undefinedType && level < self.levels.SILENT) {
	                  return "No console available for logging";
	              }
	          } else {
	              throw "log.setLevel() called with invalid level: " + level;
	          }
	      };

	      self.setDefaultLevel = function (level) {
	          defaultLevel = level;
	          if (!getPersistedLevel()) {
	              self.setLevel(level, false);
	          }
	      };

	      self.resetLevel = function () {
	          self.setLevel(defaultLevel, false);
	          clearPersistedLevel();
	      };

	      self.enableAll = function(persist) {
	          self.setLevel(self.levels.TRACE, persist);
	      };

	      self.disableAll = function(persist) {
	          self.setLevel(self.levels.SILENT, persist);
	      };

	      // Initialize with the right level
	      var initialLevel = getPersistedLevel();
	      if (initialLevel == null) {
	          initialLevel = defaultLevel;
	      }
	      self.setLevel(initialLevel, false);
	    }

	    /*
	     *
	     * Top-level API
	     *
	     */

	    var defaultLogger = new Logger();

	    var _loggersByName = {};
	    defaultLogger.getLogger = function getLogger(name) {
	        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
	          throw new TypeError("You must supply a name when creating a logger.");
	        }

	        var logger = _loggersByName[name];
	        if (!logger) {
	          logger = _loggersByName[name] = new Logger(
	            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
	        }
	        return logger;
	    };

	    // Grab the current global log variable in case of overwrite
	    var _log = (typeof window !== undefinedType) ? window.log : undefined;
	    defaultLogger.noConflict = function() {
	        if (typeof window !== undefinedType &&
	               window.log === defaultLogger) {
	            window.log = _log;
	        }

	        return defaultLogger;
	    };

	    defaultLogger.getLoggers = function getLoggers() {
	        return _loggersByName;
	    };

	    // ES6 default export, for compatibility
	    defaultLogger['default'] = defaultLogger;

	    return defaultLogger;
	}));
	});

	var _FORMATTED_ACTIONS;
	var FORMATTED_ACTIONS = (_FORMATTED_ACTIONS = {}, _defineProperty(_FORMATTED_ACTIONS, ACTIONS.RECORD, 'Recorded'), _defineProperty(_FORMATTED_ACTIONS, ACTIONS.REPLAY, 'Replayed'), _defineProperty(_FORMATTED_ACTIONS, ACTIONS.INTERCEPT, 'Intercepted'), _defineProperty(_FORMATTED_ACTIONS, ACTIONS.PASSTHROUGH, 'Passthrough'), _FORMATTED_ACTIONS);

	var Logger = /*#__PURE__*/function () {
	  function Logger(polly) {
	    _classCallCheck(this, Logger);

	    this.polly = polly;
	    this.log = loglevel.getLogger("@pollyjs/core:".concat(this.polly.recordingName));
	    this.log.setLevel(polly.config.logLevel);
	  }

	  _createClass(Logger, [{
	    key: "connect",
	    value: function connect() {
	      var _this = this;

	      this._middleware = this.polly.server.any().on('error', function () {
	        return _this.logRequestError.apply(_this, arguments);
	      }).on('request', function () {
	        return _this.logRequest.apply(_this, arguments);
	      }).on('response', function () {
	        return _this.logRequestResponse.apply(_this, arguments);
	      });
	    }
	  }, {
	    key: "disconnect",
	    value: function disconnect() {
	      this._middleware.off('error');

	      this._middleware.off('response');
	    }
	  }, {
	    key: "logRequest",
	    value: function logRequest(request) {
	      var log = request.log;
	      var debug = log.getLevel() <= log.levels.DEBUG;
	      log.info.apply(log, ["Request: ".concat(request.method, " ").concat(request.url)].concat(_toConsumableArray(debug ? [{
	        request: request
	      }] : [])));
	    }
	  }, {
	    key: "logRequestResponse",
	    value: function logRequestResponse(request, response) {
	      var log = request.log;
	      var debug = log.getLevel() <= log.levels.DEBUG;
	      log.info.apply(log, ["Response: ".concat(FORMATTED_ACTIONS[request.action], " \u279E ").concat(request.method, " ").concat(request.url, " ").concat(response.statusCode, " \u2022 ").concat(request.responseTime, "ms")].concat(_toConsumableArray(debug ? [{
	        request: request,
	        response: response
	      }] : [])));
	    }
	  }, {
	    key: "logRequestError",
	    value: function logRequestError(request, error) {
	      var log = request.log;
	      var debug = log.getLevel() <= log.levels.DEBUG;
	      log.error.apply(log, ["Errored \u279E ".concat(request.method, " ").concat(request.url), error].concat(_toConsumableArray(debug ? [{
	        request: request
	      }] : [])));
	    }
	  }]);

	  return Logger;
	}();

	function keyFor(Factory) {
	  return "".concat(Factory.type, ":").concat(Factory.id);
	}

	var Container = /*#__PURE__*/function () {
	  function Container() {
	    _classCallCheck(this, Container);

	    this._registry = new map$1();
	  }
	  /**
	   * Register a factory onto the container.
	   *
	   * @param {Function} Factory
	   */


	  _createClass(Container, [{
	    key: "register",
	    value: function register(Factory) {
	      assert("Attempted to register ".concat(Factory, " but invalid factory provided. Expected function, received: \"").concat(_typeof(Factory), "\""), typeof Factory === 'function');
	      var type = Factory.type;
	      var name = Factory.id;
	      assert("Invalid registration id provided. Expected string, received: \"".concat(_typeof(name), "\""), typeof name === 'string');
	      assert("Invalid registration type provided. Expected string, received: \"".concat(_typeof(type), "\""), typeof type === 'string');

	      this._registry.set(keyFor(Factory), Factory);
	    }
	    /**
	     * Unregister a factory from the container via a key (e.g. `adapter:fetch`)
	     * or Factory class.
	     *
	     * @param {String|Function} keyOrFactory
	     */

	  }, {
	    key: "unregister",
	    value: function unregister(keyOrFactory) {
	      var registry = this._registry;
	      var key = typeof keyOrFactory === 'function' ? keyFor(keyOrFactory) : keyOrFactory;
	      registry.delete(key);
	    }
	    /**
	     * Lookup a factory by the given key (e.g. `adapter:fetch`)
	     *
	     * @param {String} key
	     * @returns {Function}
	     */

	  }, {
	    key: "lookup",
	    value: function lookup(key) {
	      return this._registry.get(key) || null;
	    }
	    /**
	     * Check if a factory has been registered via a key (e.g. `adapter:fetch`)
	     * or Factory class.
	     *
	     * @param {String|Function} keyOrFactory
	     * @returns {Boolean}
	     */

	  }, {
	    key: "has",
	    value: function has(keyOrFactory) {
	      var registry = this._registry;
	      var key = typeof keyOrFactory === 'function' ? keyFor(keyOrFactory) : keyOrFactory;
	      return registry.has(key);
	    }
	  }]);

	  return Container;
	}();

	var Timing = {
	  fixed: function fixed(ms) {
	    return function () {
	      return timeout(ms);
	    };
	  },
	  relative: function relative(ratio) {
	    return function (ms) {
	      return timeout(ratio * ms);
	    };
	  }
	};

	var DefaultConfig = {
	  mode: MODES.REPLAY,
	  adapters: [],
	  adapterOptions: {},
	  persister: null,
	  persisterOptions: {
	    keepUnusedRequests: false,
	    disableSortingHarEntries: false
	  },
	  logLevel: loglevel.levels.WARN,
	  flushRequestsOnStop: false,
	  recordIfMissing: true,
	  recordFailedRequests: false,
	  expiresIn: null,
	  expiryStrategy: EXPIRY_STRATEGIES.WARN,
	  timing: Timing.fixed(0),
	  matchRequestsBy: {
	    method: true,
	    headers: true,
	    body: true,
	    order: true,
	    url: {
	      protocol: true,
	      username: true,
	      password: true,
	      hostname: true,
	      port: true,
	      pathname: true,
	      query: true,
	      hash: false
	    }
	  }
	};

	// 19.1.2.5 Object.freeze(O)

	var meta = _meta.onFreeze;

	_objectSap('freeze', function ($freeze) {
	  return function freeze(it) {
	    return $freeze && _isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

	var freeze = _core.Object.freeze;

	var freeze$1 = freeze;

	var md5 = createCommonjsModule(function (module) {
	(function ($) {

	  /**
	   * Add integers, wrapping at 2^32.
	   * This uses 16-bit operations internally to work around bugs in interpreters.
	   *
	   * @param {number} x First integer
	   * @param {number} y Second integer
	   * @returns {number} Sum
	   */
	  function safeAdd(x, y) {
	    var lsw = (x & 0xffff) + (y & 0xffff);
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	    return (msw << 16) | (lsw & 0xffff)
	  }

	  /**
	   * Bitwise rotate a 32-bit number to the left.
	   *
	   * @param {number} num 32-bit number
	   * @param {number} cnt Rotation count
	   * @returns {number} Rotated number
	   */
	  function bitRotateLeft(num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt))
	  }

	  /**
	   * Basic operation the algorithm uses.
	   *
	   * @param {number} q q
	   * @param {number} a a
	   * @param {number} b b
	   * @param {number} x x
	   * @param {number} s s
	   * @param {number} t t
	   * @returns {number} Result
	   */
	  function md5cmn(q, a, b, x, s, t) {
	    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
	  }
	  /**
	   * Basic operation the algorithm uses.
	   *
	   * @param {number} a a
	   * @param {number} b b
	   * @param {number} c c
	   * @param {number} d d
	   * @param {number} x x
	   * @param {number} s s
	   * @param {number} t t
	   * @returns {number} Result
	   */
	  function md5ff(a, b, c, d, x, s, t) {
	    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
	  }
	  /**
	   * Basic operation the algorithm uses.
	   *
	   * @param {number} a a
	   * @param {number} b b
	   * @param {number} c c
	   * @param {number} d d
	   * @param {number} x x
	   * @param {number} s s
	   * @param {number} t t
	   * @returns {number} Result
	   */
	  function md5gg(a, b, c, d, x, s, t) {
	    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
	  }
	  /**
	   * Basic operation the algorithm uses.
	   *
	   * @param {number} a a
	   * @param {number} b b
	   * @param {number} c c
	   * @param {number} d d
	   * @param {number} x x
	   * @param {number} s s
	   * @param {number} t t
	   * @returns {number} Result
	   */
	  function md5hh(a, b, c, d, x, s, t) {
	    return md5cmn(b ^ c ^ d, a, b, x, s, t)
	  }
	  /**
	   * Basic operation the algorithm uses.
	   *
	   * @param {number} a a
	   * @param {number} b b
	   * @param {number} c c
	   * @param {number} d d
	   * @param {number} x x
	   * @param {number} s s
	   * @param {number} t t
	   * @returns {number} Result
	   */
	  function md5ii(a, b, c, d, x, s, t) {
	    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
	  }

	  /**
	   * Calculate the MD5 of an array of little-endian words, and a bit length.
	   *
	   * @param {Array} x Array of little-endian words
	   * @param {number} len Bit length
	   * @returns {Array<number>} MD5 Array
	   */
	  function binlMD5(x, len) {
	    /* append padding */
	    x[len >> 5] |= 0x80 << len % 32;
	    x[(((len + 64) >>> 9) << 4) + 14] = len;

	    var i;
	    var olda;
	    var oldb;
	    var oldc;
	    var oldd;
	    var a = 1732584193;
	    var b = -271733879;
	    var c = -1732584194;
	    var d = 271733878;

	    for (i = 0; i < x.length; i += 16) {
	      olda = a;
	      oldb = b;
	      oldc = c;
	      oldd = d;

	      a = md5ff(a, b, c, d, x[i], 7, -680876936);
	      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
	      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
	      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
	      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
	      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
	      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
	      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
	      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
	      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
	      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
	      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
	      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
	      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
	      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
	      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

	      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
	      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
	      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
	      b = md5gg(b, c, d, a, x[i], 20, -373897302);
	      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
	      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
	      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
	      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
	      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
	      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
	      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
	      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
	      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
	      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
	      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
	      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

	      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
	      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
	      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
	      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
	      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
	      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
	      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
	      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
	      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
	      d = md5hh(d, a, b, c, x[i], 11, -358537222);
	      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
	      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
	      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
	      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
	      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
	      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

	      a = md5ii(a, b, c, d, x[i], 6, -198630844);
	      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
	      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
	      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
	      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
	      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
	      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
	      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
	      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
	      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
	      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
	      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
	      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
	      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
	      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
	      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

	      a = safeAdd(a, olda);
	      b = safeAdd(b, oldb);
	      c = safeAdd(c, oldc);
	      d = safeAdd(d, oldd);
	    }
	    return [a, b, c, d]
	  }

	  /**
	   * Convert an array of little-endian words to a string
	   *
	   * @param {Array<number>} input MD5 Array
	   * @returns {string} MD5 string
	   */
	  function binl2rstr(input) {
	    var i;
	    var output = '';
	    var length32 = input.length * 32;
	    for (i = 0; i < length32; i += 8) {
	      output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
	    }
	    return output
	  }

	  /**
	   * Convert a raw string to an array of little-endian words
	   * Characters >255 have their high-byte silently ignored.
	   *
	   * @param {string} input Raw input string
	   * @returns {Array<number>} Array of little-endian words
	   */
	  function rstr2binl(input) {
	    var i;
	    var output = [];
	    output[(input.length >> 2) - 1] = undefined;
	    for (i = 0; i < output.length; i += 1) {
	      output[i] = 0;
	    }
	    var length8 = input.length * 8;
	    for (i = 0; i < length8; i += 8) {
	      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
	    }
	    return output
	  }

	  /**
	   * Calculate the MD5 of a raw string
	   *
	   * @param {string} s Input string
	   * @returns {string} Raw MD5 string
	   */
	  function rstrMD5(s) {
	    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
	  }

	  /**
	   * Calculates the HMAC-MD5 of a key and some data (raw strings)
	   *
	   * @param {string} key HMAC key
	   * @param {string} data Raw input string
	   * @returns {string} Raw MD5 string
	   */
	  function rstrHMACMD5(key, data) {
	    var i;
	    var bkey = rstr2binl(key);
	    var ipad = [];
	    var opad = [];
	    var hash;
	    ipad[15] = opad[15] = undefined;
	    if (bkey.length > 16) {
	      bkey = binlMD5(bkey, key.length * 8);
	    }
	    for (i = 0; i < 16; i += 1) {
	      ipad[i] = bkey[i] ^ 0x36363636;
	      opad[i] = bkey[i] ^ 0x5c5c5c5c;
	    }
	    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
	    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
	  }

	  /**
	   * Convert a raw string to a hex string
	   *
	   * @param {string} input Raw input string
	   * @returns {string} Hex encoded string
	   */
	  function rstr2hex(input) {
	    var hexTab = '0123456789abcdef';
	    var output = '';
	    var x;
	    var i;
	    for (i = 0; i < input.length; i += 1) {
	      x = input.charCodeAt(i);
	      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
	    }
	    return output
	  }

	  /**
	   * Encode a string as UTF-8
	   *
	   * @param {string} input Input string
	   * @returns {string} UTF8 string
	   */
	  function str2rstrUTF8(input) {
	    return unescape(encodeURIComponent(input))
	  }

	  /**
	   * Encodes input string as raw MD5 string
	   *
	   * @param {string} s Input string
	   * @returns {string} Raw MD5 string
	   */
	  function rawMD5(s) {
	    return rstrMD5(str2rstrUTF8(s))
	  }
	  /**
	   * Encodes input string as Hex encoded string
	   *
	   * @param {string} s Input string
	   * @returns {string} Hex encoded string
	   */
	  function hexMD5(s) {
	    return rstr2hex(rawMD5(s))
	  }
	  /**
	   * Calculates the raw HMAC-MD5 for the given key and data
	   *
	   * @param {string} k HMAC key
	   * @param {string} d Input string
	   * @returns {string} Raw MD5 string
	   */
	  function rawHMACMD5(k, d) {
	    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
	  }
	  /**
	   * Calculates the Hex encoded HMAC-MD5 for the given key and data
	   *
	   * @param {string} k HMAC key
	   * @param {string} d Input string
	   * @returns {string} Raw MD5 string
	   */
	  function hexHMACMD5(k, d) {
	    return rstr2hex(rawHMACMD5(k, d))
	  }

	  /**
	   * Calculates MD5 value for a given string.
	   * If a key is provided, calculates the HMAC-MD5 value.
	   * Returns a Hex encoded string unless the raw argument is given.
	   *
	   * @param {string} string Input string
	   * @param {string} [key] HMAC key
	   * @param {boolean} [raw] Raw output switch
	   * @returns {string} MD5 output
	   */
	  function md5(string, key, raw) {
	    if (!key) {
	      if (!raw) {
	        return hexMD5(string)
	      }
	      return rawMD5(string)
	    }
	    if (!raw) {
	      return hexHMACMD5(key, string)
	    }
	    return rawHMACMD5(key, string)
	  }

	  if (module.exports) {
	    module.exports = md5;
	  } else {
	    $.md5 = md5;
	  }
	})(commonjsGlobal);
	});

	var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
	var stringify$2 = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON$1.stringify.apply($JSON$1, arguments);
	};

	var stringify$3 = stringify$2;

	var fastJsonStableStringify = function fastJsonStableStringify(data, opts) {
	  if (!opts) opts = {};
	  if (typeof opts === 'function') opts = {
	    cmp: opts
	  };
	  var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;

	  var cmp = opts.cmp && function (f) {
	    return function (node) {
	      return function (a, b) {
	        var aobj = {
	          key: a,
	          value: node[a]
	        };
	        var bobj = {
	          key: b,
	          value: node[b]
	        };
	        return f(aobj, bobj);
	      };
	    };
	  }(opts.cmp);

	  var seen = [];
	  return function stringify(node) {
	    if (node && node.toJSON && typeof node.toJSON === 'function') {
	      node = node.toJSON();
	    }

	    if (node === undefined) return;
	    if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
	    if (_typeof(node) !== 'object') return stringify$3(node);
	    var i, out;

	    if (isArray$1(node)) {
	      out = '[';

	      for (i = 0; i < node.length; i++) {
	        if (i) out += ',';
	        out += stringify(node[i]) || 'null';
	      }

	      return out + ']';
	    }

	    if (node === null) return 'null';

	    if (seen.indexOf(node) !== -1) {
	      if (cycles) return stringify$3('__cycle__');
	      throw new TypeError('Converting circular structure to JSON');
	    }

	    var seenIndex = seen.push(node) - 1;

	    var keys = keys$1(node).sort(cmp && cmp(node));

	    out = '';

	    for (i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var value = stringify(node[key]);
	      if (!value) continue;
	      if (out) out += ',';
	      out += stringify$3(key) + ':' + value;
	    }

	    seen.splice(seenIndex, 1);
	    return '{' + out + '}';
	  }(data);
	};

	var isAbsoluteUrl = url => {
		if (typeof url !== 'string') {
			throw new TypeError(`Expected a \`string\`, got \`${typeof url}\``);
		}

		// Don't match Windows paths `c:\`
		if (/^[a-zA-Z]:\\/.test(url)) {
			return false;
		}

		// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
		// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
		return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url);
	};

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	/**
	 * Remove the host, protocol, and slashes from a URL instance.
	 *
	 * @param {URL} url
	 */
	function removeHostFromUrl(url) {
	  url.set('protocol', '');
	  url.set('host', '');
	  url.set('slashes', false);
	  return url;
	}

	/**
	 * Creates an exact representation of the passed url string with url-parse.
	 *
	 * @param {String} url
	 * @param {...args} args Arguments to pass through to the URL constructor
	 * @returns {URL} A url-parse URL instance
	 */

	function parseUrl(url) {
	  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  var parsedUrl = _construct(URL, [url].concat(args));

	  if (!isAbsoluteUrl(url)) {
	    if (url.startsWith('//')) {
	      /*
	        If the url is protocol-relative, strip out the protocol
	      */
	      parsedUrl.set('protocol', '');
	    } else {
	      /*
	        If the url is relative, setup the parsed url to reflect just that
	        by removing the host. By default URL sets the host via window.location if
	        it does not exist.
	      */
	      removeHostFromUrl(parsedUrl);
	    }
	  }

	  return parsedUrl;
	}

	var keys$2 = keys$1;
	var HANDLER = {
	  get: function get(obj, prop) {
	    // `prop` can be a Symbol so only lower-case string based props.
	    return obj[typeof prop === 'string' ? prop.toLowerCase() : prop];
	  },
	  set: function set(obj, prop, value) {
	    if (typeof prop !== 'string') {
	      return false;
	    }

	    if (value === null || typeof value === 'undefined') {
	      delete obj[prop.toLowerCase()];
	    } else {
	      obj[prop.toLowerCase()] = value;
	    }

	    return true;
	  },
	  deleteProperty: function deleteProperty(obj, prop) {
	    if (typeof prop !== 'string') {
	      return false;
	    }

	    delete obj[prop.toLowerCase()];
	    return true;
	  }
	};
	function HTTPHeaders(headers) {
	  var proxy = new Proxy({}, HANDLER);

	  if (isObjectLike(headers)) {
	    keys$2(headers).forEach(function (h) {
	      return proxy[h] = headers[h];
	    });
	  }

	  return proxy;
	}

	var keys$3 = keys$1;
	var isArray$7 = isArray$1;
	var parse$2 = JSON.parse;

	function isFunction(fn) {
	  return typeof fn === 'function';
	}

	function method(method, config, req) {
	  return isFunction(config) ? config(method, req) : method.toUpperCase();
	}
	function url(url, config, req) {
	  var parsedUrl = parseUrl(url, true);

	  if (isFunction(config)) {
	    parsedUrl = parseUrl(config(url, req), true);
	  } else {
	    // Remove any url properties that have been disabled via the config
	    keys$3(config || {}).forEach(function (key) {
	      if (isFunction(config[key])) {
	        parsedUrl.set(key, config[key](parsedUrl[key], req));
	      } else if (!config[key]) {
	        parsedUrl.set(key, '');
	      }
	    });
	  } // Sort Query Params


	  if (isObjectLike(parsedUrl.query)) {
	    parsedUrl.set('query', parse$2(fastJsonStableStringify(parsedUrl.query)));
	  }

	  return parsedUrl.href;
	}
	function headers(headers, config, req) {
	  var normalizedHeaders = new HTTPHeaders(headers);

	  if (isFunction(config)) {
	    return config(normalizedHeaders, req);
	  }

	  if (isObjectLike(config) && isArray$7(config.exclude)) {
	    config.exclude.forEach(function (header) {
	      return delete normalizedHeaders[header];
	    });
	  }

	  return normalizedHeaders;
	}
	function body(body, config, req) {
	  return isFunction(config) ? config(body, req) : body;
	}
	var NormalizeRequest = {
	  headers: headers,
	  method: method,
	  body: body,
	  url: url
	};

	// FNV_PRIMES and FNV_OFFSETS from
	// http://www.isthe.com/chongo/tech/comp/fnv/index.html#FNV-param

	const FNV_PRIMES = {
		32: 16777619n,
		64: 1099511628211n,
		128: 309485009821345068724781371n,
		256: 374144419156711147060143317175368453031918731002211n,
		512: 35835915874844867368919076489095108449946327955754392558399825615420669938882575126094039892345713852759n,
		1024: 5016456510113118655434598811035278955030765345404790744303017523831112055108147451509157692220295382716162651878526895249385292291816524375083746691371804094271873160484737966720260389217684476157468082573n
	};

	const FNV_OFFSETS = {
		32: 2166136261n,
		64: 14695981039346656037n,
		128: 144066263297769815596495629667062367629n,
		256: 100029257958052580907070968620625704837092796014241193945225284501741471925557n,
		512: 9659303129496669498009435400716310466090418745672637896108374329434462657994582932197716438449813051892206539805784495328239340083876191928701583869517785n,
		1024: 14197795064947621068722070641403218320880622795441933960878474914617582723252296732303717722150864096521202355549365628174669108571814760471015076148029755969804077320157692458563003215304957150157403644460363550505412711285966361610267868082893823963790439336411086884584107735010676915n
	};

	// Legacy implementation for 32-bit + number types
	function fnv1a(string) {
		// Handle Unicode code points > 0x7f
		let hash = Number(FNV_OFFSETS[32]);
		let isUnicoded = false;

		for (let i = 0; i < string.length; i++) {
			let characterCode = string.charCodeAt(i);

			// Non-ASCII characters trigger the Unicode escape logic
			if (characterCode > 0x7F && !isUnicoded) {
				string = unescape(encodeURIComponent(string));
				characterCode = string.charCodeAt(i);
				isUnicoded = true;
			}

			hash ^= characterCode;
			hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
		}

		return hash >>> 0;
	}

	function bigInt(string, {size = 32} = {}) {
		if (!FNV_PRIMES[size]) {
			throw new Error('The `size` option must be one of 32, 64, 128, 256, 512, or 1024');
		}

		let hash = FNV_OFFSETS[size];
		const fnvPrime = FNV_PRIMES[size];

		// Handle Unicode code points > 0x7f
		let isUnicoded = false;

		for (let i = 0; i < string.length; i++) {
			let characterCode = string.charCodeAt(i);

			// Non-ASCII characters trigger the Unicode escape logic
			if (characterCode > 0x7F && !isUnicoded) {
				string = unescape(encodeURIComponent(string));
				characterCode = string.charCodeAt(i);
				isUnicoded = true;
			}

			hash ^= BigInt(characterCode);
			hash = BigInt.asUintN(size, hash * fnvPrime);
		}

		return hash;
	}

	var fnv1a_1 = fnv1a;
	var bigInt_1 = bigInt;
	fnv1a_1.bigInt = bigInt_1;

	var slugify = createCommonjsModule(function (module, exports) {
	(function (name, root, factory) {
	  {
	    module.exports = factory();
	    module.exports['default'] = factory();
	  }
	}('slugify', commonjsGlobal, function () {
	  var charMap = JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E\'","Ը":"Y\'","Թ":"T\'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C\'","Կ":"K","Հ":"H","Ձ":"D\'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R\'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P\'","Ք":"Q\'","Օ":"O\'\'","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"\'","’":"\'","“":"\\\"","”":"\\\"","„":"\\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}');
	  var locales = JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och"}}');

	  function replace (string, options) {
	    if (typeof string !== 'string') {
	      throw new Error('slugify: string argument expected')
	    }

	    options = (typeof options === 'string')
	      ? {replacement: options}
	      : options || {};

	    var locale = locales[options.locale] || {};

	    var replacement = options.replacement === undefined ? '-' : options.replacement;

	    var trim = options.trim === undefined ? true : options.trim;

	    var slug = string.normalize().split('')
	      // replace characters based on charMap
	      .reduce(function (result, ch) {
	        return result + (locale[ch] || charMap[ch] ||  (ch === replacement ? ' ' : ch))
	          // remove not allowed characters
	          .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, '')
	      }, '');

	    if (options.strict) {
	      slug = slug.replace(/[^A-Za-z0-9\s]/g, '');
	    }

	    if (trim) {
	      slug = slug.trim();
	    }

	    // Replace spaces with replacement character, treating multiple consecutive
	    // spaces as a single space.
	    slug = slug.replace(/\s+/g, replacement);

	    if (options.lower) {
	      slug = slug.toLowerCase();
	    }

	    return slug
	  }

	  replace.extend = function (customMap) {
	    Object.assign(charMap, customMap);
	  };

	  return replace
	}));
	});

	function sanitize(str) {
	  // Strip non-alphanumeric chars (\W is the equivalent of [^0-9a-zA-Z_])
	  return str.replace(/\W/g, '-');
	}

	function guidFor(str) {
	  var hash = fnv1a_1(str).toString();
	  var slug = slugify(sanitize(str)); // Max the slug at 100 char

	  slug = slug.substring(0, 100 - hash.length - 1);
	  return "".concat(slug, "_").concat(hash);
	}

	function guidForRecording(recording) {
	  return (recording || '').split('/').map(guidFor).join('/');
	}

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global$1 == 'object' && global$1 && global$1.Object === Object && global$1;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	/** Built-in value references. */
	var Symbol$1 = root.Symbol;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty$1.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString$1(value) {
	  return nativeObjectToString$1.call(value);
	}

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? getRawTag(value)
	    : objectToString$1(value);
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction$1(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto$1 = Function.prototype,
	    objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	/* Built-in method references that are verified to be native. */
	var Map$1 = getNative(root, 'Map');

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty$3.call(data, key) ? data[key] : undefined;
	}

	/** Used for built-in method references. */
	var objectProto$4 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$4.call(data, key);
	}

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
	  return this;
	}

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map$1 || ListCache),
	    'string': new Hash
	  };
	}

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	var defineProperty$4 = (function() {
	  try {
	    var func = getNative(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue(object, key, value) {
	  if (key == '__proto__' && defineProperty$4) {
	    defineProperty$4(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	/**
	 * This function is like `assignValue` except that it doesn't assign
	 * `undefined` values.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignMergeValue(object, key, value) {
	  if ((value !== undefined && !eq(object[key], value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer$1 = moduleExports ? root.Buffer : undefined,
	    allocUnsafe$1 = Buffer$1 ? Buffer$1.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe$1 ? allocUnsafe$1(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	/** Built-in value references. */
	var Uint8Array$1 = root.Uint8Array;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
	  return result;
	}

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function copyArray(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

	  return value === proto;
	}

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray$8 = Array.isArray;

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction$1(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	/** Detect free variable `exports`. */
	var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

	/** Built-in value references. */
	var Buffer$2 = moduleExports$1 ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer$2 ? Buffer$2.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer$2 = nativeIsBuffer || stubFalse;

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto$2 = Function.prototype,
	    objectProto$7 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$2 = funcProto$2.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString$2.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$6.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString$2.call(Ctor) == objectCtorString;
	}

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag$1 = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	/** Detect free variable `exports`. */
	var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports$2 && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule$2 && freeModule$2.require && freeModule$2.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	/**
	 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function safeGet(object, key) {
	  if (key === 'constructor' && typeof object[key] === 'function') {
	    return;
	  }

	  if (key == '__proto__') {
	    return;
	  }

	  return object[key];
	}

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue(object, key, value);
	  }
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue(object, key, newValue);
	    }
	  }
	  return object;
	}

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray$8(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer$2(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$8.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function nativeKeysIn(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/** Used for built-in method references. */
	var objectProto$a = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$a.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  if (!isObject(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$9.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	/**
	 * Converts `value` to a plain object flattening inherited enumerable string
	 * keyed properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return copyObject(value, keysIn(value));
	}

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
	  var objValue = safeGet(object, key),
	      srcValue = safeGet(source, key),
	      stacked = stack.get(srcValue);

	  if (stacked) {
	    assignMergeValue(object, key, stacked);
	    return;
	  }
	  var newValue = customizer
	    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
	    : undefined;

	  var isCommon = newValue === undefined;

	  if (isCommon) {
	    var isArr = isArray$8(srcValue),
	        isBuff = !isArr && isBuffer$2(srcValue),
	        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

	    newValue = srcValue;
	    if (isArr || isBuff || isTyped) {
	      if (isArray$8(objValue)) {
	        newValue = objValue;
	      }
	      else if (isArrayLikeObject(objValue)) {
	        newValue = copyArray(objValue);
	      }
	      else if (isBuff) {
	        isCommon = false;
	        newValue = cloneBuffer(srcValue, true);
	      }
	      else if (isTyped) {
	        isCommon = false;
	        newValue = cloneTypedArray(srcValue, true);
	      }
	      else {
	        newValue = [];
	      }
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      newValue = objValue;
	      if (isArguments(objValue)) {
	        newValue = toPlainObject(objValue);
	      }
	      else if (!isObject(objValue) || isFunction$1(objValue)) {
	        newValue = initCloneObject(srcValue);
	      }
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    stack.set(srcValue, newValue);
	    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
	    stack['delete'](srcValue);
	  }
	  assignMergeValue(object, key, newValue);
	}

	/**
	 * The base implementation of `_.merge` without support for multiple sources.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {number} srcIndex The index of `source`.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Object} [stack] Tracks traversed source values and their merged
	 *  counterparts.
	 */
	function baseMerge(object, source, srcIndex, customizer, stack) {
	  if (object === source) {
	    return;
	  }
	  baseFor(source, function(srcValue, key) {
	    stack || (stack = new Stack);
	    if (isObject(srcValue)) {
	      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
	    }
	    else {
	      var newValue = customizer
	        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
	        : undefined;

	      if (newValue === undefined) {
	        newValue = srcValue;
	      }
	      assignMergeValue(object, key, newValue);
	    }
	  }, keysIn);
	}

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty$4 ? identity : function(func, string) {
	  return defineProperty$4(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	/**
	 * This method is like `_.merge` except that it accepts `customizer` which
	 * is invoked to produce the merged values of the destination and source
	 * properties. If `customizer` returns `undefined`, merging is handled by the
	 * method instead. The `customizer` is invoked with six arguments:
	 * (objValue, srcValue, key, object, source, stack).
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} sources The source objects.
	 * @param {Function} customizer The function to customize assigned values.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function customizer(objValue, srcValue) {
	 *   if (_.isArray(objValue)) {
	 *     return objValue.concat(srcValue);
	 *   }
	 * }
	 *
	 * var object = { 'a': [1], 'b': [2] };
	 * var other = { 'a': [3], 'b': [4] };
	 *
	 * _.mergeWith(object, other, customizer);
	 * // => { 'a': [1, 3], 'b': [2, 4] }
	 */
	var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
	  baseMerge(object, source, srcIndex, customizer);
	});

	function customizer(objValue, srcValue, key) {
	  // Arrays and `context` options should just replace the existing value
	  // and not be deep merged.
	  if (isArray$1(objValue) || ['context'].includes(key)) {
	    return srcValue;
	  }
	}

	function mergeConfigs() {
	  for (var _len = arguments.length, configs = new Array(_len), _key = 0; _key < _len; _key++) {
	    configs[_key] = arguments[_key];
	  }

	  return mergeWith.apply(void 0, [{}].concat(configs, [customizer]));
	}

	/**
	 * Create a deferred promise with `resolve` and `reject` methods.
	 */
	function defer$1() {
	  var _resolve;

	  var _reject;

	  var promise = new promise$1(function (resolve, reject) {
	    _resolve = resolve;
	    _reject = reject;
	  }); // Prevent unhandled rejection warnings

	  promise.catch(function () {});
	  promise.resolve = _resolve;
	  promise.reject = _reject;
	  return promise;
	}

	function validateRecordingName(name) {
	  assert("Invalid recording name provided. Expected string, received: \"".concat(_typeof(name), "\"."), typeof name === 'string');
	  assert("Invalid recording name provided. Received An empty or blank string.", name.trim().length > 0);
	}
	function validateRequestConfig(config) {
	  assert("Invalid config provided. Expected object, received: \"".concat(_typeof(config), "\"."), isObjectLike(config) && !isArray$1(config)); // The following options cannot be overridden on a per request basis

	  ['mode', 'adapters', 'adapterOptions', 'persister', 'persisterOptions'].forEach(function (key) {
	    return assert("Invalid configuration option provided. The \"".concat(key, "\" option cannot be overridden using the server configuration API."), !(key in config));
	  });
	}
	function validateTimesOption(times) {
	  assert("Invalid number provided. Expected number, received: \"".concat(_typeof(times), "\"."), typeof times === 'number');
	  assert("Invalid number provided. The number must be greater than 0, received \"".concat(_typeof(times), "\"."), times > 0);
	}

	function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof symbol$1 !== "undefined" && o[iterator$1] || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$1(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

	function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
	var freeze$2 = freeze$1;
	var parse$3 = JSON.parse;

	var HTTPBase = /*#__PURE__*/function () {
	  function HTTPBase() {
	    _classCallCheck(this, HTTPBase);

	    this.headers = new HTTPHeaders();
	  }

	  _createClass(HTTPBase, [{
	    key: "getHeader",
	    value: function getHeader(name) {
	      return this.headers[name];
	    }
	  }, {
	    key: "setHeader",
	    value: function setHeader(name, value) {
	      this.headers[name] = value;
	      return this;
	    }
	  }, {
	    key: "setHeaders",
	    value: function setHeaders() {
	      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      for (var name in headers) {
	        this.setHeader(name, headers[name]);
	      }

	      return this;
	    }
	  }, {
	    key: "removeHeader",
	    value: function removeHeader(name) {
	      this.setHeader(name, null);
	      return this;
	    }
	  }, {
	    key: "removeHeaders",
	    value: function removeHeaders() {
	      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      var _iterator = _createForOfIteratorHelper$1(headers),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var name = _step.value;
	          this.removeHeader(name);
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }

	      return this;
	    }
	  }, {
	    key: "hasHeader",
	    value: function hasHeader(name) {
	      return !!this.getHeader(name);
	    }
	  }, {
	    key: "type",
	    value: function type(_type) {
	      return this.setHeader('Content-Type', _type);
	    }
	  }, {
	    key: "send",
	    value: function send(data) {
	      var body = data;

	      switch (_typeof(body)) {
	        case 'string':
	          // String defaulting to html
	          if (!this.hasHeader('Content-Type')) {
	            this.type('text/html');
	          }

	          break;

	        case 'boolean':
	        case 'number':
	        case 'object':
	          if (body === null) {
	            body = '';
	          } else {
	            return this.json(body);
	          }

	          break;
	      }

	      if (typeof body === 'string') {
	        var contentType = this.getHeader('Content-Type'); // Write strings in utf-8

	        if (contentType && !contentType.includes('charset')) {
	          this.type("".concat(contentType, "; charset=utf-8"));
	        }
	      }

	      this.body = body;
	      return this;
	    }
	  }, {
	    key: "json",
	    value: function json(obj) {
	      if (!this.hasHeader('Content-Type')) {
	        this.type('application/json');
	      }

	      return this.send(fastJsonStableStringify(obj));
	    }
	  }, {
	    key: "jsonBody",
	    value: function jsonBody() {
	      return parse$3(this.body);
	    }
	  }, {
	    key: "end",
	    value: function end() {
	      freeze$2(this);
	      freeze$2(this.headers);
	      return this;
	    }
	  }]);

	  return HTTPBase;
	}();

	function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct$2(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !construct$2) return false; if (construct$2.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var DEFAULT_STATUS_CODE = 200;

	var PollyResponse = /*#__PURE__*/function (_HTTPBase) {
	  _inherits(PollyResponse, _HTTPBase);

	  var _super = _createSuper$2(PollyResponse);

	  function PollyResponse(statusCode, headers, body, encoding) {
	    var _this;

	    _classCallCheck(this, PollyResponse);

	    _this = _super.call(this);

	    _this.status(statusCode || DEFAULT_STATUS_CODE);

	    _this.setHeaders(headers);

	    _this.body = body;
	    _this.encoding = encoding;
	    return _this;
	  }

	  _createClass(PollyResponse, [{
	    key: "ok",
	    get: function get() {
	      return this.statusCode && this.statusCode >= 200 && this.statusCode < 300;
	    }
	  }, {
	    key: "statusText",
	    get: function get() {
	      return HTTP_STATUS_CODES[this.statusCode] || HTTP_STATUS_CODES[DEFAULT_STATUS_CODE];
	    }
	  }, {
	    key: "status",
	    value: function status(statusCode) {
	      var status = _parseInt$2(statusCode, 10);

	      assert("[Response] Invalid status code: ".concat(status), status >= 100 && status < 600);
	      this.statusCode = status;
	      return this;
	    }
	  }, {
	    key: "sendStatus",
	    value: function sendStatus(status) {
	      this.status(status);
	      this.type('text/plain');
	      return this.send(this.statusText);
	    }
	  }]);

	  return PollyResponse;
	}(HTTPBase);

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	_export(_export.P + _export.R, 'Set', { toJSON: _collectionToJson('Set') });

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
	_setCollectionOf('Set');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
	_setCollectionFrom('Set');

	var set$1 = _core.Set;

	var set$2 = set$1;

	/**
	 * Create a function that will execute the given fn and call the cancel
	 * callback after being called n times.
	 *
	 * @export
	 * @param {Function} fn
	 * @param {Number} nTimes
	 * @param {Function} cancel
	 * @returns
	 */
	function cancelFnAfterNTimes(fn, nTimes, cancel) {
	  var callCount = 0;
	  return function () {
	    if (++callCount >= nTimes) {
	      cancel();
	    }

	    return fn.apply(void 0, arguments);
	  };
	}

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign$1 = _core.Object.assign;

	var assign$2 = assign$1;

	var STOP_PROPAGATION = symbol$1();

	var Event = /*#__PURE__*/function () {
	  function Event(type, props) {
	    _classCallCheck(this, Event);

	    assert("Invalid type provided. Expected a non-empty string, received: \"".concat(_typeof(type), "\"."), type && typeof type === 'string');

	    defineProperty$2(this, 'type', {
	      value: type
	    }); // eslint-disable-next-line no-restricted-properties


	    assign$2(this, props || {});

	    this[STOP_PROPAGATION] = false;
	  }

	  _createClass(Event, [{
	    key: "stopPropagation",
	    value: function stopPropagation() {
	      this[STOP_PROPAGATION] = true;
	    }
	  }, {
	    key: "shouldStopPropagating",
	    get: function get() {
	      return this[STOP_PROPAGATION];
	    }
	  }]);

	  return Event;
	}();

	function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof symbol$1 !== "undefined" && o[iterator$1] || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$1(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

	function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function ownKeys$1(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { var symbols = getOwnPropertySymbols$1(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

	var EVENTS = symbol$1();

	var EVENT_NAMES = symbol$1();

	function assertEventName(eventName, eventNames) {
	  assert("Invalid event name provided. Expected string, received: \"".concat(_typeof(eventName), "\"."), typeof eventName === 'string');
	  assert("Invalid event name provided: \"".concat(eventName, "\". Possible events: ").concat(_toConsumableArray(eventNames).join(', '), "."), eventNames.has(eventName));
	}

	function assertListener(listener) {
	  assert("Invalid listener provided. Expected function, received: \"".concat(_typeof(listener), "\"."), typeof listener === 'function');
	}

	var EventEmitter = /*#__PURE__*/function () {
	  /**
	   * @constructor
	   * @param {Object} options
	   * @param {String[]} options.eventNames - Supported events
	   */
	  function EventEmitter() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, EventEmitter);

	    var eventNames = options.eventNames;
	    assert('An array of supported events must be provided via the `eventNames` option.', isArray$1(eventNames) && eventNames.length > 0);
	    this[EVENTS] = new map$1();
	    this[EVENT_NAMES] = new set$2(eventNames);
	  }
	  /**
	   * Returns an array listing the events for which the emitter has
	   * registered listeners
	   *
	   * @returns {String[]}
	   */


	  _createClass(EventEmitter, [{
	    key: "eventNames",
	    value: function eventNames() {
	      var _this = this;

	      var eventNames = [];
	      this[EVENTS].forEach(function (_, eventName) {
	        return _this.hasListeners(eventName) && eventNames.push(eventName);
	      });
	      return eventNames;
	    }
	    /**
	     * Adds the `listener` function to the end of the listeners array for the
	     * event named `eventName`
	     *
	     * @param {String} eventName - The name of the event
	     * @param {Function} listener - The callback function
	     * @param {Object} [options={}]
	     * @param {Number} options.times - listener will be cancelled after this many times
	     * @returns {EventEmitter}
	     */

	  }, {
	    key: "on",
	    value: function on(eventName, listener) {
	      var _this2 = this;

	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      assertEventName(eventName, this[EVENT_NAMES]);
	      assertListener(listener);
	      var events = this[EVENTS];
	      var times = options.times;

	      if (!events.has(eventName)) {
	        events.set(eventName, new set$2());
	      }

	      if (times) {
	        validateTimesOption(times);
	        var tempListener = cancelFnAfterNTimes(listener, times, function () {
	          return _this2.off(eventName, tempListener);
	        });
	        /*
	          Remove any existing listener or tempListener that match this one.
	           For example, if the following would get called:
	            this.on('request', listener);
	            this.on('request', listener, { times: 1 });
	           We want to make sure that there is only one instance of the given
	          listener for the given event.
	        */

	        this.off(eventName, listener); // Save the original listener on the temp one so we can easily match it
	        // given the original.

	        tempListener.listener = listener;
	        listener = tempListener;
	      }

	      events.get(eventName).add(listener);
	      return this;
	    }
	    /**
	     * Adds a one-time `listener` function for the event named `eventName`.
	     * The next time `eventName` is triggered, this listener is removed and
	     * then invoked.
	     *
	     * @param {String} eventName - The name of the event
	     * @param {Function} listener - The callback function
	     * @param {Object} [options={}]
	     * @returns {EventEmitter}
	     */

	  }, {
	    key: "once",
	    value: function once(eventName, listener) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      this.on(eventName, listener, _objectSpread$1(_objectSpread$1({}, options), {}, {
	        times: 1
	      }));
	      return this;
	    }
	    /**
	     * Removes the specified `listener` from the listener array for
	     * the event named `eventName`. If `listener` is not provided then it removes
	     * all listeners, or those of the specified `eventName`.
	     *
	     * @param {String} eventName - The name of the event
	     * @param {Function} [listener] - The callback function
	     * @returns {EventEmitter}
	     */

	  }, {
	    key: "off",
	    value: function off(eventName, listener) {
	      assertEventName(eventName, this[EVENT_NAMES]);
	      var events = this[EVENTS];

	      if (this.hasListeners(eventName)) {
	        if (typeof listener === 'function') {
	          events.get(eventName).delete(listener); // Remove any temp listeners that use the provided listener

	          this.listeners(eventName).forEach(function (l) {
	            if (l.listener === listener) {
	              events.get(eventName).delete(l);
	            }
	          });
	        } else {
	          events.get(eventName).clear(eventName);
	        }
	      }

	      return this;
	    }
	    /**
	     * Returns a copy of the array of listeners for the event named `eventName`.
	     *
	     * @param {String} eventName - The name of the event
	     * @returns {Function[]}
	     */

	  }, {
	    key: "listeners",
	    value: function listeners(eventName) {
	      assertEventName(eventName, this[EVENT_NAMES]);
	      return this.hasListeners(eventName) ? _toConsumableArray(this[EVENTS].get(eventName)) : [];
	    }
	    /**
	     * Returns `true` if there are any listeners for the event named `eventName`
	     * or `false` otherwise.
	     *
	     * @param {String} eventName - The name of the event
	     * @returns {Boolean}
	     */

	  }, {
	    key: "hasListeners",
	    value: function hasListeners(eventName) {
	      assertEventName(eventName, this[EVENT_NAMES]);
	      var events = this[EVENTS];
	      return events.has(eventName) && events.get(eventName).size > 0;
	    }
	    /**
	     * Asynchronously calls each of the `listeners` registered for the event named
	     * `eventName`, in the order they were registered, passing the supplied
	     * arguments to each.
	     *
	     * Returns a promise that will resolve to `false` if a listener stopped
	     * propagation, `true` otherwise.
	     *
	     * @async
	     * @param {String} eventName - The name of the event
	     * @param {any} ...args - The arguments to pass to the listeners
	     * @returns {Promise<Boolean>}
	     */

	  }, {
	    key: "emit",
	    value: function () {
	      var _emit = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(eventName) {
	        var event,
	            _len,
	            args,
	            _key,
	            _iterator,
	            _step,
	            listener,
	            _args = arguments;

	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                assertEventName(eventName, this[EVENT_NAMES]);
	                event = new Event(eventName);

	                for (_len = _args.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                  args[_key - 1] = _args[_key];
	                }

	                _iterator = _createForOfIteratorHelper$2(this.listeners(eventName));
	                _context.prev = 4;

	                _iterator.s();

	              case 6:
	                if ((_step = _iterator.n()).done) {
	                  _context.next = 14;
	                  break;
	                }

	                listener = _step.value;
	                _context.next = 10;
	                return listener.apply(void 0, args.concat([event]));

	              case 10:
	                if (!event.shouldStopPropagating) {
	                  _context.next = 12;
	                  break;
	                }

	                return _context.abrupt("return", false);

	              case 12:
	                _context.next = 6;
	                break;

	              case 14:
	                _context.next = 19;
	                break;

	              case 16:
	                _context.prev = 16;
	                _context.t0 = _context["catch"](4);

	                _iterator.e(_context.t0);

	              case 19:
	                _context.prev = 19;

	                _iterator.f();

	                return _context.finish(19);

	              case 22:
	                return _context.abrupt("return", true);

	              case 23:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[4, 16, 19, 22]]);
	      }));

	      function emit(_x) {
	        return _emit.apply(this, arguments);
	      }

	      return emit;
	    }()
	    /**
	     * Asynchronously and concurrently calls each of the `listeners` registered
	     * for the event named `eventName`, in the order they were registered,
	     * passing the supplied arguments to each.
	     *
	     * Returns a promise that will resolve to `false` if a listener stopped
	     * propagation, `true` otherwise.
	     *
	     * @async
	     * @param {String} eventName - The name of the event
	     * @param {any} ...args - The arguments to pass to the listeners
	     * @returns {Promise<Boolean>}
	     */

	  }, {
	    key: "emitParallel",
	    value: function () {
	      var _emitParallel = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(eventName) {
	        var _len2,
	            args,
	            _key2,
	            event,
	            _args2 = arguments;

	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                for (_len2 = _args2.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                  args[_key2 - 1] = _args2[_key2];
	                }

	                assertEventName(eventName, this[EVENT_NAMES]);
	                event = new Event(eventName);
	                _context2.next = 5;
	                return promise$1.all(this.listeners(eventName).map(function (listener) {
	                  return listener.apply(void 0, args.concat([event]));
	                }));

	              case 5:
	                if (!event.shouldStopPropagating) {
	                  _context2.next = 7;
	                  break;
	                }

	                return _context2.abrupt("return", false);

	              case 7:
	                return _context2.abrupt("return", true);

	              case 8:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function emitParallel(_x2) {
	        return _emitParallel.apply(this, arguments);
	      }

	      return emitParallel;
	    }()
	    /**
	     * Synchronously calls each of the `listeners` registered for the event named
	     * `eventName`, in the order they were registered, passing the supplied
	     * arguments to each.
	     *
	     * Throws if a listener's return value is promise-like.
	     *
	     * Returns`false` if a listener stopped propagation, `true` otherwise.
	     *
	     * @param {String} eventName - The name of the event
	     * @param {any} ...args - The arguments to pass to the listeners
	     * @returns {Boolean}
	     */

	  }, {
	    key: "emitSync",
	    value: function emitSync(eventName) {
	      assertEventName(eventName, this[EVENT_NAMES]);
	      var event = new Event(eventName);

	      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	      }

	      var _iterator2 = _createForOfIteratorHelper$2(this.listeners(eventName)),
	          _step2;

	      try {
	        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
	          var listener = _step2.value;
	          var returnValue = listener.apply(void 0, args.concat([event]));
	          assert("Attempted to emit a synchronous event \"".concat(eventName, "\" but an asynchronous listener was called."), !(isObjectLike(returnValue) && typeof returnValue.then === 'function'));

	          if (event.shouldStopPropagating) {
	            return false;
	          }
	        }
	      } catch (err) {
	        _iterator2.e(err);
	      } finally {
	        _iterator2.f();
	      }

	      return true;
	    }
	  }]);

	  return EventEmitter;
	}();

	function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct$2(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !construct$2) return false; if (construct$2.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var ABORT = symbol$1();

	var PASSTHROUGH = symbol$1();

	function setDefaults(interceptor) {
	  interceptor[ABORT] = false;
	  interceptor[PASSTHROUGH] = false;
	}

	var Interceptor = /*#__PURE__*/function (_Event) {
	  _inherits(Interceptor, _Event);

	  var _super = _createSuper$3(Interceptor);

	  function Interceptor() {
	    var _this;

	    _classCallCheck(this, Interceptor);

	    _this = _super.call(this, 'intercept');
	    setDefaults(_assertThisInitialized(_this));
	    return _this;
	  }

	  _createClass(Interceptor, [{
	    key: "abort",
	    value: function abort() {
	      setDefaults(this);
	      this[ABORT] = true;
	    }
	  }, {
	    key: "passthrough",
	    value: function passthrough() {
	      setDefaults(this);
	      this[PASSTHROUGH] = true;
	    }
	  }, {
	    key: "shouldAbort",
	    get: function get() {
	      return this[ABORT];
	    }
	  }, {
	    key: "shouldPassthrough",
	    get: function get() {
	      return this[PASSTHROUGH];
	    }
	  }, {
	    key: "shouldIntercept",
	    get: function get() {
	      return !this.shouldAbort && !this.shouldPassthrough;
	    }
	  }]);

	  return Interceptor;
	}(Event);

	function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct$2(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !construct$2) return false; if (construct$2.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {})); return true; } catch (e) { return false; } }
	var keys$4 = keys$1,
	    freeze$3 = freeze$1;

	var ROUTE = symbol$1();

	var POLLY = symbol$1();

	var PARSED_URL = symbol$1();

	var EVENT_EMITTER = symbol$1();

	var SUPPORTED_EVENTS = ['identify'];

	var PollyRequest = /*#__PURE__*/function (_HTTPBase) {
	  _inherits(PollyRequest, _HTTPBase);

	  var _super = _createSuper$4(PollyRequest);

	  function PollyRequest(polly, request) {
	    var _this;

	    _classCallCheck(this, PollyRequest);

	    _this = _super.call(this);
	    assert('Url is required.', request.url);
	    assert('Method is required.', request.method && typeof request.method === 'string');
	    _this.didRespond = false;
	    _this.aborted = false;
	    _this.url = request.url;
	    _this.method = request.method.toUpperCase();
	    _this.body = request.body;

	    _this.setHeaders(request.headers);

	    _this.recordingName = polly.recordingName;
	    _this.recordingId = polly.recordingId;
	    _this.requestArguments = freeze$3(request.requestArguments);
	    _this.promise = defer$1();
	    _this[POLLY] = polly;
	    _this[EVENT_EMITTER] = new EventEmitter({
	      eventNames: SUPPORTED_EVENTS
	    });
	    /*
	      The action taken with this request (e.g. record, replay, intercept, or passthrough)
	      This will be set by the adapter.
	    */

	    _this.action = null; // Interceptor instance to be passed to each of the intercept handlers

	    _this._interceptor = new Interceptor(); // Lookup the associated route for this request

	    _this[ROUTE] = polly.server.lookup(_this.method, _this.url); // Filter all matched route handlers by this request

	    _this[ROUTE].applyFiltersWithArgs(_assertThisInitialized(_this)); // Handle config overrides defined by the route


	    _this.configure(_this[ROUTE].config()); // Handle recording name override defined by the route


	    var recordingName = _this[ROUTE].recordingName();

	    if (recordingName) {
	      _this.overrideRecordingName(recordingName);
	    }

	    return _this;
	  }

	  _createClass(PollyRequest, [{
	    key: "url",
	    get: function get() {
	      // Use .toString() to force a rebuild of the url. This guarantees that
	      // Any changes to the query object get propagated.
	      return this[PARSED_URL].toString();
	    },
	    set: function set(value) {
	      // Make sure to coerce the value into a string as the passed value could be
	      // a WHATWG's URL object.
	      this[PARSED_URL] = parseUrl("".concat(value), true);
	    }
	  }, {
	    key: "absoluteUrl",
	    get: function get() {
	      var url = this.url;
	      return isAbsoluteUrl(url) ? url : new URL(url).href;
	    }
	  }, {
	    key: "protocol",
	    get: function get() {
	      return this[PARSED_URL].protocol;
	    }
	  }, {
	    key: "hostname",
	    get: function get() {
	      return this[PARSED_URL].hostname;
	    }
	  }, {
	    key: "port",
	    get: function get() {
	      return this[PARSED_URL].port;
	    }
	  }, {
	    key: "origin",
	    get: function get() {
	      return this[PARSED_URL].origin;
	    }
	  }, {
	    key: "pathname",
	    get: function get() {
	      return this[PARSED_URL].pathname;
	    }
	  }, {
	    key: "query",
	    get: function get() {
	      return this[PARSED_URL].query;
	    },
	    set: function set(value) {
	      this[PARSED_URL].set('query', value);
	    }
	  }, {
	    key: "hash",
	    get: function get() {
	      return this[PARSED_URL].hash;
	    },
	    set: function set(value) {
	      this[PARSED_URL].set('hash', value);
	    }
	  }, {
	    key: "shouldPassthrough",
	    get: function get() {
	      return this[ROUTE].shouldPassthrough();
	    }
	  }, {
	    key: "shouldIntercept",
	    get: function get() {
	      return this[ROUTE].shouldIntercept();
	    }
	  }, {
	    key: "log",
	    get: function get() {
	      if (this.id) {
	        var log = loglevel.getLogger("@pollyjs/core:".concat(this.recordingName, ":").concat(this.id));
	        log.setLevel(this.config.logLevel);
	        return log;
	      } else {
	        return this[POLLY].logger.log;
	      }
	    }
	  }, {
	    key: "on",
	    value: function on(eventName, listener) {
	      this[EVENT_EMITTER].on(eventName, listener);
	      return this;
	    }
	  }, {
	    key: "once",
	    value: function once(eventName, listener) {
	      this[EVENT_EMITTER].once(eventName, listener);
	      return this;
	    }
	  }, {
	    key: "off",
	    value: function off(eventName, listener) {
	      this[EVENT_EMITTER].off(eventName, listener);
	      return this;
	    }
	  }, {
	    key: "init",
	    value: function () {
	      var _init = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return this._emit('request');

	              case 2:
	                // Setup the response
	                this.response = new PollyResponse();
	                this.didRespond = false; // Setup this request's identifiers, id, and order

	                _context.next = 6;
	                return this._identify();

	              case 6:
	                // Timestamp the request
	                this.timestamp = timestamp();

	              case 7:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function init() {
	        return _init.apply(this, arguments);
	      }

	      return init;
	    }()
	  }, {
	    key: "respond",
	    value: function () {
	      var _respond = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(response) {
	        var _ref, statusCode, headers, body, encoding;

	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                _ref = response || {}, statusCode = _ref.statusCode, headers = _ref.headers, body = _ref.body, encoding = _ref.encoding;
	                assert('Cannot respond to a request that already has a response.', !this.didRespond);

	                if (!this.aborted) {
	                  _context2.next = 4;
	                  break;
	                }

	                return _context2.abrupt("return");

	              case 4:
	                // Timestamp the response
	                this.response.timestamp = timestamp(); // Set the status code

	                this.response.status(statusCode); // Se the headers

	                this.response.setHeaders(headers); // Set the body without modifying any headers (instead of using .send())

	                this.response.body = body;
	                this.response.encoding = encoding; // Trigger the `beforeResponse` event

	                _context2.next = 11;
	                return this._emit('beforeResponse', this.response);

	              case 11:
	                // End the response so it can no longer be modified
	                this.response.end();
	                this.responseTime = new Date(this.response.timestamp).getTime() - new Date(this.timestamp).getTime();
	                this.didRespond = true;
	                this.end(); // Trigger the `response` event

	                _context2.next = 17;
	                return this._emit('response', this.response);

	              case 17:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function respond(_x) {
	        return _respond.apply(this, arguments);
	      }

	      return respond;
	    }()
	  }, {
	    key: "abort",
	    value: function abort() {
	      this.aborted = true;
	    }
	  }, {
	    key: "overrideRecordingName",
	    value: function overrideRecordingName(recordingName) {
	      validateRecordingName(recordingName);
	      this.recordingName = recordingName;
	      this.recordingId = guidForRecording(recordingName);
	    }
	  }, {
	    key: "configure",
	    value: function configure(config) {
	      validateRequestConfig(config);
	      this.config = mergeConfigs(this[POLLY].config, this.config || {}, config);
	    }
	  }, {
	    key: "_intercept",
	    value: function _intercept() {
	      var _this$ROUTE;

	      return (_this$ROUTE = this[ROUTE]).intercept.apply(_this$ROUTE, [this, this.response].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "_emit",
	    value: function _emit(eventName) {
	      var _this$ROUTE2;

	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return (_this$ROUTE2 = this[ROUTE]).emit.apply(_this$ROUTE2, [eventName, this].concat(args));
	    }
	  }, {
	    key: "_identify",
	    value: function () {
	      var _identify2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
	        var _this2 = this;

	        var polly, requests, matchRequestsBy;
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                polly = this[POLLY];
	                requests = polly._requests;
	                matchRequestsBy = this.config.matchRequestsBy;
	                this.identifiers = {}; // Iterate through each normalizer

	                keys$4(NormalizeRequest).forEach(function (key) {
	                  if (_this2[key] && matchRequestsBy[key]) {
	                    _this2.identifiers[key] = NormalizeRequest[key](_this2[key], matchRequestsBy[key], _this2);
	                  }
	                }); // Emit the `identify` event which adapters can use to serialize the request body

	                _context3.next = 7;
	                return this[EVENT_EMITTER].emit('identify', this);

	              case 7:
	                // Freeze the identifiers so they can no longer be modified
	                freeze$3(this.identifiers); // Guid is a string representation of the identifiers

	                this.id = md5(fastJsonStableStringify(this.identifiers)); // Order is calculated on other requests with the same id and recording id
	                // Only requests before this current one are taken into account.

	                this.order = matchRequestsBy.order && !this.shouldPassthrough && !this.shouldIntercept ? requests.slice(0, requests.indexOf(this)).filter(function (r) {
	                  return r.id === _this2.id && r.recordingId === _this2.recordingId;
	                }).length : 0;
	                this.log.debug('Request Identified:', {
	                  id: this.id,
	                  order: this.order,
	                  identifiers: this.identifiers,
	                  request: this
	                });

	              case 11:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function _identify() {
	        return _identify2.apply(this, arguments);
	      }

	      return _identify;
	    }()
	  }]);

	  return PollyRequest;
	}(HTTPBase);

	var createObject = Object.create;
	function createMap() {
	    var map = createObject(null);
	    map["__"] = undefined;
	    delete map["__"];
	    return map;
	}

	var Target = function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	};
	Target.prototype.to = function to (target, callback) {
	    var delegate = this.delegate;
	    if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	    }
	    this.matcher.add(this.path, target);
	    if (callback) {
	        if (callback.length === 0) {
	            throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	    }
	};
	var Matcher = function Matcher(target) {
	    this.routes = createMap();
	    this.children = createMap();
	    this.target = target;
	};
	Matcher.prototype.add = function add (path, target) {
	    this.routes[path] = target;
	};
	Matcher.prototype.addChild = function addChild (path, target, callback, delegate) {
	    var matcher = new Matcher(target);
	    this.children[path] = matcher;
	    var match = generateMatch(path, matcher, delegate);
	    if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	    }
	    callback(match);
	};
	function generateMatch(startingPath, matcher, delegate) {
	    function match(path, callback) {
	        var fullPath = startingPath + path;
	        if (callback) {
	            callback(generateMatch(fullPath, matcher, delegate));
	        }
	        else {
	            return new Target(fullPath, matcher, delegate);
	        }
	    }
	    
	    return match;
	}
	function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0; i < routeArray.length; i++) {
	        len += routeArray[i].path.length;
	    }
	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	}
	function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;
	    var paths = Object.keys(routes);
	    for (var i = 0; i < paths.length; i++) {
	        var path = paths[i];
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);
	        var nested = matcher.children[path];
	        if (nested) {
	            eachRoute(routeArray, nested, callback, binding);
	        }
	        else {
	            callback.call(binding, routeArray);
	        }
	    }
	}
	var map$2 = function (callback, addRouteCallback) {
	    var matcher = new Matcher();
	    callback(generateMatch("", matcher, this.delegate));
	    eachRoute([], matcher, function (routes) {
	        if (addRouteCallback) {
	            addRouteCallback(this, routes);
	        }
	        else {
	            this.add(routes);
	        }
	    }, this);
	};

	// Normalizes percent-encoded values in `path` to upper-case and decodes percent-encoded
	// values that are not reserved (i.e., unicode characters, emoji, etc). The reserved
	// chars are "/" and "%".
	// Safe to call multiple times on the same path.
	// Normalizes percent-encoded values in `path` to upper-case and decodes percent-encoded
	function normalizePath(path) {
	    return path.split("/")
	        .map(normalizeSegment)
	        .join("/");
	}
	// We want to ensure the characters "%" and "/" remain in percent-encoded
	// form when normalizing paths, so replace them with their encoded form after
	// decoding the rest of the path
	var SEGMENT_RESERVED_CHARS = /%|\//g;
	function normalizeSegment(segment) {
	    if (segment.length < 3 || segment.indexOf("%") === -1)
	        { return segment; }
	    return decodeURIComponent(segment).replace(SEGMENT_RESERVED_CHARS, encodeURIComponent);
	}
	// We do not want to encode these characters when generating dynamic path segments
	// See https://tools.ietf.org/html/rfc3986#section-3.3
	// sub-delims: "!", "$", "&", "'", "(", ")", "*", "+", ",", ";", "="
	// others allowed by RFC 3986: ":", "@"
	//
	// First encode the entire path segment, then decode any of the encoded special chars.
	//
	// The chars "!", "'", "(", ")", "*" do not get changed by `encodeURIComponent`,
	// so the possible encoded chars are:
	// ['%24', '%26', '%2B', '%2C', '%3B', '%3D', '%3A', '%40'].
	var PATH_SEGMENT_ENCODINGS = /%(?:2(?:4|6|B|C)|3(?:B|D|A)|40)/g;
	function encodePathSegment(str) {
	    return encodeURIComponent(str).replace(PATH_SEGMENT_ENCODINGS, decodeURIComponent);
	}

	var escapeRegex = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\)/g;
	var isArray$9 = Array.isArray;
	var hasOwnProperty$a = Object.prototype.hasOwnProperty;
	function getParam(params, key) {
	    if (typeof params !== "object" || params === null) {
	        throw new Error("You must pass an object as the second argument to `generate`.");
	    }
	    if (!hasOwnProperty$a.call(params, key)) {
	        throw new Error("You must provide param `" + key + "` to `generate`.");
	    }
	    var value = params[key];
	    var str = typeof value === "string" ? value : "" + value;
	    if (str.length === 0) {
	        throw new Error("You must provide a param `" + key + "`.");
	    }
	    return str;
	}
	var eachChar = [];
	eachChar[0 /* Static */] = function (segment, currentState) {
	    var state = currentState;
	    var value = segment.value;
	    for (var i = 0; i < value.length; i++) {
	        var ch = value.charCodeAt(i);
	        state = state.put(ch, false, false);
	    }
	    return state;
	};
	eachChar[1 /* Dynamic */] = function (_, currentState) {
	    return currentState.put(47 /* SLASH */, true, true);
	};
	eachChar[2 /* Star */] = function (_, currentState) {
	    return currentState.put(-1 /* ANY */, false, true);
	};
	eachChar[4 /* Epsilon */] = function (_, currentState) {
	    return currentState;
	};
	var regex = [];
	regex[0 /* Static */] = function (segment) {
	    return segment.value.replace(escapeRegex, "\\$1");
	};
	regex[1 /* Dynamic */] = function () {
	    return "([^/]+)";
	};
	regex[2 /* Star */] = function () {
	    return "(.+)";
	};
	regex[4 /* Epsilon */] = function () {
	    return "";
	};
	var generate = [];
	generate[0 /* Static */] = function (segment) {
	    return segment.value;
	};
	generate[1 /* Dynamic */] = function (segment, params) {
	    var value = getParam(params, segment.value);
	    if (RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS) {
	        return encodePathSegment(value);
	    }
	    else {
	        return value;
	    }
	};
	generate[2 /* Star */] = function (segment, params) {
	    return getParam(params, segment.value);
	};
	generate[4 /* Epsilon */] = function () {
	    return "";
	};
	var EmptyObject = Object.freeze({});
	var EmptyArray = Object.freeze([]);
	// The `names` will be populated with the paramter name for each dynamic/star
	// segment. `shouldDecodes` will be populated with a boolean for each dyanamic/star
	// segment, indicating whether it should be decoded during recognition.
	function parse$4(segments, route, types) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.length > 0 && route.charCodeAt(0) === 47 /* SLASH */) {
	        route = route.substr(1);
	    }
	    var parts = route.split("/");
	    var names = undefined;
	    var shouldDecodes = undefined;
	    for (var i = 0; i < parts.length; i++) {
	        var part = parts[i];
	        var flags = 0;
	        var type = 0;
	        if (part === "") {
	            type = 4 /* Epsilon */;
	        }
	        else if (part.charCodeAt(0) === 58 /* COLON */) {
	            type = 1 /* Dynamic */;
	        }
	        else if (part.charCodeAt(0) === 42 /* STAR */) {
	            type = 2 /* Star */;
	        }
	        else {
	            type = 0 /* Static */;
	        }
	        flags = 2 << type;
	        if (flags & 12 /* Named */) {
	            part = part.slice(1);
	            names = names || [];
	            names.push(part);
	            shouldDecodes = shouldDecodes || [];
	            shouldDecodes.push((flags & 4 /* Decoded */) !== 0);
	        }
	        if (flags & 14 /* Counted */) {
	            types[type]++;
	        }
	        segments.push({
	            type: type,
	            value: normalizeSegment(part)
	        });
	    }
	    return {
	        names: names || EmptyArray,
	        shouldDecodes: shouldDecodes || EmptyArray,
	    };
	}
	function isEqualCharSpec(spec, char, negate) {
	    return spec.char === char && spec.negate === negate;
	}
	// A State has a character specification and (`charSpec`) and a list of possible
	// subsequent states (`nextStates`).
	//
	// If a State is an accepting state, it will also have several additional
	// properties:
	//
	// * `regex`: A regular expression that is used to extract parameters from paths
	//   that reached this accepting state.
	// * `handlers`: Information on how to convert the list of captures into calls
	//   to registered handlers with the specified parameters
	// * `types`: How many static, dynamic or star segments in this route. Used to
	//   decide which route to use if multiple registered routes match a path.
	//
	// Currently, State is implemented naively by looping over `nextStates` and
	// comparing a character specification against a character. A more efficient
	// implementation would use a hash of keys pointing at one or more next states.
	var State = function State(states, id, char, negate, repeat) {
	    this.states = states;
	    this.id = id;
	    this.char = char;
	    this.negate = negate;
	    this.nextStates = repeat ? id : null;
	    this.pattern = "";
	    this._regex = undefined;
	    this.handlers = undefined;
	    this.types = undefined;
	};
	State.prototype.regex = function regex$1 () {
	    if (!this._regex) {
	        this._regex = new RegExp(this.pattern);
	    }
	    return this._regex;
	};
	State.prototype.get = function get (char, negate) {
	        var this$1 = this;

	    var nextStates = this.nextStates;
	    if (nextStates === null)
	        { return; }
	    if (isArray$9(nextStates)) {
	        for (var i = 0; i < nextStates.length; i++) {
	            var child = this$1.states[nextStates[i]];
	            if (isEqualCharSpec(child, char, negate)) {
	                return child;
	            }
	        }
	    }
	    else {
	        var child$1 = this.states[nextStates];
	        if (isEqualCharSpec(child$1, char, negate)) {
	            return child$1;
	        }
	    }
	};
	State.prototype.put = function put (char, negate, repeat) {
	    var state;
	    // If the character specification already exists in a child of the current
	    // state, just return that state.
	    if (state = this.get(char, negate)) {
	        return state;
	    }
	    // Make a new state for the character spec
	    var states = this.states;
	    state = new State(states, states.length, char, negate, repeat);
	    states[states.length] = state;
	    // Insert the new state as a child of the current state
	    if (this.nextStates == null) {
	        this.nextStates = state.id;
	    }
	    else if (isArray$9(this.nextStates)) {
	        this.nextStates.push(state.id);
	    }
	    else {
	        this.nextStates = [this.nextStates, state.id];
	    }
	    // Return the new state
	    return state;
	};
	// Find a list of child states matching the next character
	State.prototype.match = function match (ch) {
	        var this$1 = this;

	    var nextStates = this.nextStates;
	    if (!nextStates)
	        { return []; }
	    var returned = [];
	    if (isArray$9(nextStates)) {
	        for (var i = 0; i < nextStates.length; i++) {
	            var child = this$1.states[nextStates[i]];
	            if (isMatch(child, ch)) {
	                returned.push(child);
	            }
	        }
	    }
	    else {
	        var child$1 = this.states[nextStates];
	        if (isMatch(child$1, ch)) {
	            returned.push(child$1);
	        }
	    }
	    return returned;
	};
	function isMatch(spec, char) {
	    return spec.negate ? spec.char !== char && spec.char !== -1 /* ANY */ : spec.char === char || spec.char === -1 /* ANY */;
	}
	// This is a somewhat naive strategy, but should work in a lot of cases
	// A better strategy would properly resolve /posts/:id/new and /posts/edit/:id.
	//
	// This strategy generally prefers more static and less dynamic matching.
	// Specifically, it
	//
	//  * prefers fewer stars to more, then
	//  * prefers using stars for less of the match to more, then
	//  * prefers fewer dynamic segments to more, then
	//  * prefers more static segments to more
	function sortSolutions(states) {
	    return states.sort(function (a, b) {
	        var ref = a.types || [0, 0, 0];
	        var astatics = ref[0];
	        var adynamics = ref[1];
	        var astars = ref[2];
	        var ref$1 = b.types || [0, 0, 0];
	        var bstatics = ref$1[0];
	        var bdynamics = ref$1[1];
	        var bstars = ref$1[2];
	        if (astars !== bstars) {
	            return astars - bstars;
	        }
	        if (astars) {
	            if (astatics !== bstatics) {
	                return bstatics - astatics;
	            }
	            if (adynamics !== bdynamics) {
	                return bdynamics - adynamics;
	            }
	        }
	        if (adynamics !== bdynamics) {
	            return adynamics - bdynamics;
	        }
	        if (astatics !== bstatics) {
	            return bstatics - astatics;
	        }
	        return 0;
	    });
	}
	function recognizeChar(states, ch) {
	    var nextStates = [];
	    for (var i = 0, l = states.length; i < l; i++) {
	        var state = states[i];
	        nextStates = nextStates.concat(state.match(ch));
	    }
	    return nextStates;
	}
	var RecognizeResults = function RecognizeResults(queryParams) {
	    this.length = 0;
	    this.queryParams = queryParams || {};
	};

	RecognizeResults.prototype.splice = Array.prototype.splice;
	RecognizeResults.prototype.slice = Array.prototype.slice;
	RecognizeResults.prototype.push = Array.prototype.push;
	function findHandler(state, originalPath, queryParams) {
	    var handlers = state.handlers;
	    var regex = state.regex();
	    if (!regex || !handlers)
	        { throw new Error("state not initialized"); }
	    var captures = originalPath.match(regex);
	    var currentCapture = 1;
	    var result = new RecognizeResults(queryParams);
	    result.length = handlers.length;
	    for (var i = 0; i < handlers.length; i++) {
	        var handler = handlers[i];
	        var names = handler.names;
	        var shouldDecodes = handler.shouldDecodes;
	        var params = EmptyObject;
	        var isDynamic = false;
	        if (names !== EmptyArray && shouldDecodes !== EmptyArray) {
	            for (var j = 0; j < names.length; j++) {
	                isDynamic = true;
	                var name = names[j];
	                var capture = captures && captures[currentCapture++];
	                if (params === EmptyObject) {
	                    params = {};
	                }
	                if (RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS && shouldDecodes[j]) {
	                    params[name] = capture && decodeURIComponent(capture);
	                }
	                else {
	                    params[name] = capture;
	                }
	            }
	        }
	        result[i] = {
	            handler: handler.handler,
	            params: params,
	            isDynamic: isDynamic
	        };
	    }
	    return result;
	}
	function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, "%20");
	    var result;
	    try {
	        result = decodeURIComponent(part);
	    }
	    catch (error) {
	        result = "";
	    }
	    return result;
	}
	var RouteRecognizer = function RouteRecognizer() {
	    this.names = createMap();
	    var states = [];
	    var state = new State(states, 0, -1 /* ANY */, true, false);
	    states[0] = state;
	    this.states = states;
	    this.rootState = state;
	};
	RouteRecognizer.prototype.add = function add (routes, options) {
	    var currentState = this.rootState;
	    var pattern = "^";
	    var types = [0, 0, 0];
	    var handlers = new Array(routes.length);
	    var allSegments = [];
	    var isEmpty = true;
	    var j = 0;
	    for (var i = 0; i < routes.length; i++) {
	        var route = routes[i];
	        var ref = parse$4(allSegments, route.path, types);
	            var names = ref.names;
	            var shouldDecodes = ref.shouldDecodes;
	        // preserve j so it points to the start of newly added segments
	        for (; j < allSegments.length; j++) {
	            var segment = allSegments[j];
	            if (segment.type === 4 /* Epsilon */) {
	                continue;
	            }
	            isEmpty = false;
	            // Add a "/" for the new segment
	            currentState = currentState.put(47 /* SLASH */, false, false);
	            pattern += "/";
	            // Add a representation of the segment to the NFA and regex
	            currentState = eachChar[segment.type](segment, currentState);
	            pattern += regex[segment.type](segment);
	        }
	        handlers[i] = {
	            handler: route.handler,
	            names: names,
	            shouldDecodes: shouldDecodes
	        };
	    }
	    if (isEmpty) {
	        currentState = currentState.put(47 /* SLASH */, false, false);
	        pattern += "/";
	    }
	    currentState.handlers = handlers;
	    currentState.pattern = pattern + "$";
	    currentState.types = types;
	    var name;
	    if (typeof options === "object" && options !== null && options.as) {
	        name = options.as;
	    }
	    if (name) {
	        // if (this.names[name]) {
	        //   throw new Error("You may not add a duplicate route named `" + name + "`.");
	        // }
	        this.names[name] = {
	            segments: allSegments,
	            handlers: handlers
	        };
	    }
	};
	RouteRecognizer.prototype.handlersFor = function handlersFor (name) {
	    var route = this.names[name];
	    if (!route) {
	        throw new Error("There is no route named " + name);
	    }
	    var result = new Array(route.handlers.length);
	    for (var i = 0; i < route.handlers.length; i++) {
	        var handler = route.handlers[i];
	        result[i] = handler;
	    }
	    return result;
	};
	RouteRecognizer.prototype.hasRoute = function hasRoute (name) {
	    return !!this.names[name];
	};
	RouteRecognizer.prototype.generate = function generate$1 (name, params) {
	    var route = this.names[name];
	    var output = "";
	    if (!route) {
	        throw new Error("There is no route named " + name);
	    }
	    var segments = route.segments;
	    for (var i = 0; i < segments.length; i++) {
	        var segment = segments[i];
	        if (segment.type === 4 /* Epsilon */) {
	            continue;
	        }
	        output += "/";
	        output += generate[segment.type](segment, params);
	    }
	    if (output.charAt(0) !== "/") {
	        output = "/" + output;
	    }
	    if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	    }
	    return output;
	};
	RouteRecognizer.prototype.generateQueryString = function generateQueryString (params) {
	    var pairs = [];
	    var keys = Object.keys(params);
	    keys.sort();
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var value = params[key];
	        if (value == null) {
	            continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray$9(value)) {
	            for (var j = 0; j < value.length; j++) {
	                var arrayPair = key + "[]" + "=" + encodeURIComponent(value[j]);
	                pairs.push(arrayPair);
	            }
	        }
	        else {
	            pair += "=" + encodeURIComponent(value);
	            pairs.push(pair);
	        }
	    }
	    if (pairs.length === 0) {
	        return "";
	    }
	    return "?" + pairs.join("&");
	};
	RouteRecognizer.prototype.parseQueryString = function parseQueryString (queryString) {
	    var pairs = queryString.split("&");
	    var queryParams = {};
	    for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split("="), key = decodeQueryParamPart(pair[0]), keyLength = key.length, isArray = false, value = (void 0);
	        if (pair.length === 1) {
	            value = "true";
	        }
	        else {
	            // Handle arrays
	            if (keyLength > 2 && key.slice(keyLength - 2) === "[]") {
	                isArray = true;
	                key = key.slice(0, keyLength - 2);
	                if (!queryParams[key]) {
	                    queryParams[key] = [];
	                }
	            }
	            value = pair[1] ? decodeQueryParamPart(pair[1]) : "";
	        }
	        if (isArray) {
	            queryParams[key].push(value);
	        }
	        else {
	            queryParams[key] = value;
	        }
	    }
	    return queryParams;
	};
	RouteRecognizer.prototype.recognize = function recognize (path) {
	    var results;
	    var states = [this.rootState];
	    var queryParams = {};
	    var isSlashDropped = false;
	    var hashStart = path.indexOf("#");
	    if (hashStart !== -1) {
	        path = path.substr(0, hashStart);
	    }
	    var queryStart = path.indexOf("?");
	    if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        queryParams = this.parseQueryString(queryString);
	    }
	    if (path.charAt(0) !== "/") {
	        path = "/" + path;
	    }
	    var originalPath = path;
	    if (RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS) {
	        path = normalizePath(path);
	    }
	    else {
	        path = decodeURI(path);
	        originalPath = decodeURI(originalPath);
	    }
	    var pathLen = path.length;
	    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        originalPath = originalPath.substr(0, originalPath.length - 1);
	        isSlashDropped = true;
	    }
	    for (var i = 0; i < path.length; i++) {
	        states = recognizeChar(states, path.charCodeAt(i));
	        if (!states.length) {
	            break;
	        }
	    }
	    var solutions = [];
	    for (var i$1 = 0; i$1 < states.length; i$1++) {
	        if (states[i$1].handlers) {
	            solutions.push(states[i$1]);
	        }
	    }
	    states = sortSolutions(solutions);
	    var state = solutions[0];
	    if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.pattern && state.pattern.slice(-5) === "(.+)$") {
	            originalPath = originalPath + "/";
	        }
	        results = findHandler(state, originalPath, queryParams);
	    }
	    return results;
	};
	RouteRecognizer.VERSION = "0.3.4";
	// Set to false to opt-out of encoding and decoding path segments.
	// See https://github.com/tildeio/route-recognizer/pull/55
	RouteRecognizer.ENCODE_AND_DECODE_PATH_SEGMENTS = true;
	RouteRecognizer.Normalizer = {
	    normalizeSegment: normalizeSegment, normalizePath: normalizePath, encodePathSegment: encodePathSegment
	};
	RouteRecognizer.prototype.map = map$2;

	/**
	 * Casts `value` as an array if it's not one.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.4.0
	 * @category Lang
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast array.
	 * @example
	 *
	 * _.castArray(1);
	 * // => [1]
	 *
	 * _.castArray({ 'a': 1 });
	 * // => [{ 'a': 1 }]
	 *
	 * _.castArray('abc');
	 * // => ['abc']
	 *
	 * _.castArray(null);
	 * // => [null]
	 *
	 * _.castArray(undefined);
	 * // => [undefined]
	 *
	 * _.castArray();
	 * // => []
	 *
	 * var array = [1, 2, 3];
	 * console.log(_.castArray(array) === array);
	 * // => true
	 */
	function castArray() {
	  if (!arguments.length) {
	    return [];
	  }
	  var value = arguments[0];
	  return isArray$8(value) ? value : [value];
	}

	function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof symbol$1 !== "undefined" && o[iterator$1] || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$1(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

	function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	function ownKeys$2(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { var symbols = getOwnPropertySymbols$1(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

	var HANDLERS = symbol$1();

	function requestWithParams(req, _ref) {
	  var params = _ref.params;
	  return new Proxy(req, {
	    set: function set(source, prop, value) {
	      /* NOTE: IE's `Reflect.set` swallows the read-only assignment error */

	      /* see: https://codepen.io/jasonmit/pen/LrmLaz */
	      source[prop] = value;
	      return true;
	    },
	    get: function get(source, prop) {
	      if (prop === 'params') {
	        // Set the request's params to given route's matched params
	        return _objectSpread$2({}, params);
	      }

	      return get$2(source, prop);
	    }
	  });
	}

	var Route = /*#__PURE__*/function () {
	  /**
	   *
	   * @param {RecognizeResults} recognizeResults
	   * @param {Array<Route>} middleware
	   */
	  function Route(recognizeResults, middleware) {
	    _classCallCheck(this, Route);

	    var result = recognizeResults && recognizeResults[0];
	    this.params = {};
	    this.queryParams = {};
	    this.handlers = [];
	    this.middleware = middleware || [];

	    if (result) {
	      this.handlers = result.handler;
	      this.params = _objectSpread$2({}, result.params);
	      this.queryParams = recognizeResults.queryParams;
	    }

	    this[HANDLERS] = this._orderedHandlers();
	  }

	  _createClass(Route, [{
	    key: "shouldPassthrough",
	    value: function shouldPassthrough() {
	      return Boolean(this._valueFor('passthrough'));
	    }
	  }, {
	    key: "shouldIntercept",
	    value: function shouldIntercept() {
	      return Boolean(this._valueFor('intercept'));
	    }
	  }, {
	    key: "recordingName",
	    value: function recordingName() {
	      return this._valueFor('recordingName') || null;
	    }
	  }, {
	    key: "config",
	    value: function config() {
	      return mergeConfigs.apply(void 0, _toConsumableArray(this[HANDLERS].map(function (_ref2) {
	        var handler = _ref2.handler;
	        return handler.get('config');
	      })));
	    }
	  }, {
	    key: "applyFiltersWithArgs",
	    value: function applyFiltersWithArgs(req) {
	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      this[HANDLERS] = this[HANDLERS].filter(function (_ref3) {
	        var route = _ref3.route,
	            handler = _ref3.handler;
	        return _toConsumableArray(handler.get('filters')).every(function (fn) {
	          return fn.apply(void 0, [requestWithParams(req, route)].concat(args));
	        });
	      });
	    }
	    /**
	     * Invokes the intercept handlers defined on the routes + middleware.
	     * @param {PollyRequest} req
	     * @param {PollyResponse} res
	     * @param {Interceptor} interceptor
	     */

	  }, {
	    key: "intercept",
	    value: function () {
	      var _intercept = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(req, res, interceptor) {
	        var _iterator, _step, _step$value, route, handler;

	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _iterator = _createForOfIteratorHelper$3(this[HANDLERS]);
	                _context.prev = 1;

	                _iterator.s();

	              case 3:
	                if ((_step = _iterator.n()).done) {
	                  _context.next = 12;
	                  break;
	                }

	                _step$value = _step.value, route = _step$value.route, handler = _step$value.handler;

	                if (!(!interceptor.shouldIntercept || interceptor.shouldStopPropagating)) {
	                  _context.next = 7;
	                  break;
	                }

	                return _context.abrupt("return");

	              case 7:
	                if (!handler.has('intercept')) {
	                  _context.next = 10;
	                  break;
	                }

	                _context.next = 10;
	                return handler.get('intercept')(requestWithParams(req, route), res, interceptor);

	              case 10:
	                _context.next = 3;
	                break;

	              case 12:
	                _context.next = 17;
	                break;

	              case 14:
	                _context.prev = 14;
	                _context.t0 = _context["catch"](1);

	                _iterator.e(_context.t0);

	              case 17:
	                _context.prev = 17;

	                _iterator.f();

	                return _context.finish(17);

	              case 20:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[1, 14, 17, 20]]);
	      }));

	      function intercept(_x, _x2, _x3) {
	        return _intercept.apply(this, arguments);
	      }

	      return intercept;
	    }()
	    /**
	     * Emit an event registered on the handler + all middleware handler events
	     * @param {String} eventName
	     * @param {PollyRequest} req
	     * @param {...args} ...args
	     */

	  }, {
	    key: "emit",
	    value: function () {
	      var _emit = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(eventName, req) {
	        var _len2,
	            args,
	            _key2,
	            _iterator2,
	            _step2,
	            _handler$_eventEmitte,
	            _step2$value,
	            route,
	            handler,
	            shouldContinue,
	            _args2 = arguments;

	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                for (_len2 = _args2.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	                  args[_key2 - 2] = _args2[_key2];
	                }

	                _iterator2 = _createForOfIteratorHelper$3(this[HANDLERS]);
	                _context2.prev = 2;

	                _iterator2.s();

	              case 4:
	                if ((_step2 = _iterator2.n()).done) {
	                  _context2.next = 13;
	                  break;
	                }

	                _step2$value = _step2.value, route = _step2$value.route, handler = _step2$value.handler;
	                _context2.next = 8;
	                return (_handler$_eventEmitte = handler._eventEmitter).emit.apply(_handler$_eventEmitte, [eventName, requestWithParams(req, route)].concat(args));

	              case 8:
	                shouldContinue = _context2.sent;

	                if (shouldContinue) {
	                  _context2.next = 11;
	                  break;
	                }

	                return _context2.abrupt("return");

	              case 11:
	                _context2.next = 4;
	                break;

	              case 13:
	                _context2.next = 18;
	                break;

	              case 15:
	                _context2.prev = 15;
	                _context2.t0 = _context2["catch"](2);

	                _iterator2.e(_context2.t0);

	              case 18:
	                _context2.prev = 18;

	                _iterator2.f();

	                return _context2.finish(18);

	              case 21:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this, [[2, 15, 18, 21]]);
	      }));

	      function emit(_x4, _x5) {
	        return _emit.apply(this, arguments);
	      }

	      return emit;
	    }()
	  }, {
	    key: "_orderedHandlers",
	    value: function _orderedHandlers() {
	      return [].concat(_toConsumableArray(this.middleware), [this]).reduce(function (handlers, route) {
	        handlers.push.apply(handlers, _toConsumableArray(route.handlers.map(function (handler) {
	          return {
	            route: route,
	            handler: handler
	          };
	        })));
	        return handlers;
	      }, []);
	    }
	  }, {
	    key: "_valueFor",
	    value: function _valueFor(key) {
	      var value;

	      var _iterator3 = _createForOfIteratorHelper$3(this[HANDLERS]),
	          _step3;

	      try {
	        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
	          var handler = _step3.value.handler;

	          if (handler.has(key)) {
	            value = handler.get(key);
	          }
	        }
	      } catch (err) {
	        _iterator3.e(err);
	      } finally {
	        _iterator3.f();
	      }

	      return value;
	    }
	  }]);

	  return Route;
	}();

	function ownKeys$3(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { var symbols = getOwnPropertySymbols$1(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

	function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct$2(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !construct$2) return false; if (construct$2.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var Handler = /*#__PURE__*/function (_Map) {
	  _inherits(Handler, _Map);

	  var _super = _createSuper$5(Handler);

	  function Handler() {
	    var _this;

	    _classCallCheck(this, Handler);

	    _this = _super.call(this);

	    _this.set('config', {});

	    _this.set('defaultOptions', {});

	    _this.set('filters', new set$2());

	    _this._eventEmitter = new EventEmitter({
	      eventNames: ['error', 'abort', 'request', 'beforeReplay', 'beforePersist', 'beforeResponse', 'response']
	    });
	    return _this;
	  }

	  _createClass(Handler, [{
	    key: "on",
	    value: function on(eventName, listener) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      this._eventEmitter.on(eventName, listener, _objectSpread$3(_objectSpread$3({}, this.get('defaultOptions')), options));

	      return this;
	    }
	  }, {
	    key: "once",
	    value: function once(eventName, listener) {
	      this._eventEmitter.once(eventName, listener);

	      return this;
	    }
	  }, {
	    key: "off",
	    value: function off(eventName, listener) {
	      this._eventEmitter.off(eventName, listener);

	      return this;
	    }
	  }, {
	    key: "passthrough",
	    value: function passthrough() {
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      this.set('passthrough', Boolean(value));

	      if (this.get('passthrough')) {
	        this.delete('intercept');
	      }

	      return this;
	    }
	  }, {
	    key: "intercept",
	    value: function intercept(fn) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      assert("Invalid intercept handler provided. Expected function, received: \"".concat(_typeof(fn), "\"."), typeof fn === 'function');
	      options = _objectSpread$3(_objectSpread$3({}, this.get('defaultOptions')), options);

	      if ('times' in options) {
	        validateTimesOption(options.times);
	        fn = cancelFnAfterNTimes(fn, options.times, function () {
	          return _this2.delete('intercept');
	        });
	      }

	      this.set('intercept', fn);
	      this.passthrough(false);
	      return this;
	    }
	  }, {
	    key: "recordingName",
	    value: function recordingName(_recordingName) {
	      if (_recordingName) {
	        validateRecordingName(_recordingName);
	      }

	      this.set('recordingName', _recordingName);
	      return this;
	    }
	  }, {
	    key: "configure",
	    value: function configure(config) {
	      validateRequestConfig(config);
	      this.set('config', config);
	      return this;
	    }
	  }, {
	    key: "filter",
	    value: function filter(fn) {
	      assert("Invalid filter callback provided. Expected function, received: \"".concat(_typeof(fn), "\"."), typeof fn === 'function');
	      this.get('filters').add(fn);
	      return this;
	    }
	  }, {
	    key: "times",
	    value: function times(n) {
	      if (!n && typeof n !== 'number') {
	        delete this.get('defaultOptions').times;
	      } else {
	        validateTimesOption(n);
	        this.get('defaultOptions').times = n;
	      }

	      return this;
	    }
	  }]);

	  return Handler;
	}( /*#__PURE__*/_wrapNativeSuper(map$1));

	var GLOBAL = '__GLOBAL__';

	var Middleware = /*#__PURE__*/function () {
	  function Middleware(_ref) {
	    var _this = this;

	    var host = _ref.host,
	        paths = _ref.paths,
	        global = _ref.global,
	        handler = _ref.handler;

	    _classCallCheck(this, Middleware);

	    this.global = Boolean(global);
	    this.handler = handler;
	    this.host = host;
	    this.paths = this.global ? [GLOBAL] : paths;
	    this._routeRecognizer = new RouteRecognizer();
	    this.paths.forEach(function (path) {
	      return _this._routeRecognizer.add([{
	        path: path,
	        handler: [handler]
	      }]);
	    });
	  }

	  _createClass(Middleware, [{
	    key: "match",
	    value: function match(host, path) {
	      if (this.global) {
	        return new Route(this._routeRecognizer.recognize(GLOBAL));
	      }

	      if (this.host === host) {
	        var recognizeResult = this._routeRecognizer.recognize(path);

	        return recognizeResult && new Route(recognizeResult);
	      }
	    }
	  }]);

	  return Middleware;
	}();

	var HOST = symbol$1();

	var NAMESPACES = symbol$1();

	var REGISTRY = symbol$1();

	var MIDDLEWARE = symbol$1();

	var HANDLERS$1 = symbol$1();

	var CHARS = {
	  SLASH: '/',
	  STAR: '*',
	  COLON: ':'
	};
	var keys$5 = keys$1;

	function parseUrl$1(url) {
	  var parsedUrl = new URL(url);
	  /*
	    Use the full origin (http://hostname:port) if the host exists. If there
	    is no host, URL.origin returns "null" (null as a string) so set host to '/'
	  */

	  var host = parsedUrl.host ? parsedUrl.origin : CHARS.SLASH;
	  var path = parsedUrl.pathname || CHARS.SLASH;
	  return {
	    host: host,
	    path: path
	  };
	}

	var Server = /*#__PURE__*/function () {
	  function Server() {
	    _classCallCheck(this, Server);

	    this[HOST] = '';
	    this[REGISTRY] = {};
	    this[NAMESPACES] = [];
	    this[MIDDLEWARE] = [];
	  }

	  _createClass(Server, [{
	    key: "host",
	    value: function host(path, callback) {
	      var host = this[HOST];
	      assert("[Server] A host cannot be specified within another host.", !host);
	      this[HOST] = path;
	      callback(this);
	      this[HOST] = host;
	    }
	  }, {
	    key: "namespace",
	    value: function namespace(path, callback) {
	      var namespaces = this[NAMESPACES];
	      this[NAMESPACES] = [].concat(_toConsumableArray(namespaces), [path]);
	      callback(this);
	      this[NAMESPACES] = namespaces;
	    }
	  }, {
	    key: "timeout",
	    value: function timeout$1() {
	      return timeout.apply(void 0, arguments);
	    }
	  }, {
	    key: "get",
	    value: function get() {
	      return this._register.apply(this, ['GET'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "put",
	    value: function put() {
	      return this._register.apply(this, ['PUT'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "post",
	    value: function post() {
	      return this._register.apply(this, ['POST'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "delete",
	    value: function _delete() {
	      return this._register.apply(this, ['DELETE'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "patch",
	    value: function patch() {
	      return this._register.apply(this, ['PATCH'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "merge",
	    value: function merge() {
	      return this._register.apply(this, ['MERGE'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "head",
	    value: function head() {
	      return this._register.apply(this, ['HEAD'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "options",
	    value: function options() {
	      return this._register.apply(this, ['OPTIONS'].concat(Array.prototype.slice.call(arguments)));
	    }
	  }, {
	    key: "any",
	    value: function any() {
	      return this._registerMiddleware.apply(this, arguments);
	    }
	  }, {
	    key: "lookup",
	    value: function lookup(method, url) {
	      return new Route(this._recognize(method, url), this._lookupMiddleware(url));
	    }
	  }, {
	    key: "_lookupMiddleware",
	    value: function _lookupMiddleware(url) {
	      var _parseUrl = parseUrl$1(url),
	          host = _parseUrl.host,
	          path = _parseUrl.path;

	      return this[MIDDLEWARE].map(function (m) {
	        return m.match(host, path);
	      }).filter(Boolean);
	    }
	  }, {
	    key: "_register",
	    value: function _register(method, routes) {
	      var _this = this;

	      var handler = new Handler();
	      castArray(routes).forEach(function (route) {
	        var _parseUrl2 = parseUrl$1(_this._buildUrl(route)),
	            host = _parseUrl2.host,
	            path = _parseUrl2.path;

	        var registry = _this._registryForHost(host);

	        var name = _this._nameForPath(path);

	        var router = registry[method.toUpperCase()];

	        if (router[HANDLERS$1].has(name)) {
	          router[HANDLERS$1].get(name).push(handler);
	        } else {
	          router[HANDLERS$1].set(name, [handler]);
	          router.add([{
	            path: path,
	            handler: router[HANDLERS$1].get(name)
	          }]);
	        }
	      });
	      return handler;
	    }
	  }, {
	    key: "_registerMiddleware",
	    value: function _registerMiddleware(routes) {
	      var _this2 = this;

	      var handler = new Handler();
	      var pathsByHost = {};
	      castArray(routes).forEach(function (route) {
	        /*
	          If the route is a '*' or '' and there is no host or namespace
	          specified, treat the middleware as global so it will match all routes.
	        */
	        if ((!route || route === CHARS.STAR) && !_this2[HOST] && _this2[NAMESPACES].length === 0) {
	          _this2[MIDDLEWARE].push(new Middleware({
	            global: true,
	            handler: handler
	          }));
	        } else {
	          var _parseUrl3 = parseUrl$1(_this2._buildUrl(route)),
	              host = _parseUrl3.host,
	              path = _parseUrl3.path;

	          pathsByHost[host] = pathsByHost[host] || [];
	          pathsByHost[host].push(path);
	        }
	      });
	      keys$5(pathsByHost).forEach(function (host) {
	        _this2[MIDDLEWARE].push(new Middleware({
	          host: host,
	          paths: pathsByHost[host],
	          handler: handler
	        }));
	      });
	      return handler;
	    }
	  }, {
	    key: "_recognize",
	    value: function _recognize(method, url) {
	      var _parseUrl4 = parseUrl$1(url),
	          host = _parseUrl4.host,
	          path = _parseUrl4.path;

	      var registry = this._registryForHost(host);

	      return registry[method.toUpperCase()].recognize(path);
	    }
	  }, {
	    key: "_buildUrl",
	    value: function _buildUrl(path) {
	      return buildUrl.apply(void 0, [this[HOST]].concat(_toConsumableArray(this[NAMESPACES]), [path]));
	    }
	    /**
	     * Converts a url path into a name used to combine route handlers by
	     * normalizing dynamic and star segments
	     * @param {String} path
	     * @returns {String}
	     */

	  }, {
	    key: "_nameForPath",
	    value: function _nameForPath() {
	      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var name = path.split(CHARS.SLASH).map(function (segment) {
	        switch (segment.charAt(0)) {
	          // If this is a dynamic segment (e.g. :id), then just return `:`
	          // since /path/:id is the same as /path/:uuid
	          case CHARS.COLON:
	            return CHARS.COLON;
	          // If this is a star segment (e.g. *path), then just return `*`
	          // since /path/*path is the same as /path/*all

	          case CHARS.STAR:
	            return CHARS.STAR;

	          default:
	            return segment;
	        }
	      }).join(CHARS.SLASH); // Remove trailing slash, if we result with an empty string, return a slash

	      return name.replace(/\/$/, '') || CHARS.SLASH;
	    }
	  }, {
	    key: "_registryForHost",
	    value: function _registryForHost(host) {
	      if (!this[REGISTRY][host]) {
	        this[REGISTRY][host] = HTTP_METHODS.reduce(function (acc, method) {
	          acc[method] = new RouteRecognizer();
	          acc[method][HANDLERS$1] = new map$1();
	          return acc;
	        }, {});
	      }

	      return this[REGISTRY][host];
	    }
	  }]);

	  return Server;
	}();

	function _createForOfIteratorHelper$4(o, allowArrayLike) { var it = typeof symbol$1 !== "undefined" && o[iterator$1] || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

	function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$1(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

	function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

	var RECORDING_NAME = symbol$1();

	var RECORDING_ID = symbol$1();

	var PAUSED_ADAPTERS = symbol$1();

	var FACTORY_REGISTRATION = new weakMap$1();
	var EVENT_EMITTER$1 = new EventEmitter({
	  eventNames: ['register', 'create', 'stop']
	});
	/**
	 * @export
	 * @class Polly
	 */

	var Polly = /*#__PURE__*/function () {
	  function Polly(recordingName, config) {
	    _classCallCheck(this, Polly);

	    this.recordingName = recordingName;
	    this.server = new Server();
	    this.config = {};
	    this.container = new Container();
	    EVENT_EMITTER$1.emitSync('register', this.container);
	    /* running adapter instances */

	    this.adapters = new map$1();
	    /* running persister instance */

	    this.persister = null;
	    /* requests over the lifetime of the polly instance */

	    this._requests = [];
	    EVENT_EMITTER$1.emitSync('create', this);
	    this.configure(config);
	  }
	  /**
	   * Package version.
	   *
	   * @readonly
	   * @public
	   * @memberof Polly
	   */


	  _createClass(Polly, [{
	    key: "recordingName",
	    get:
	    /**
	     * @public
	     * @memberof Polly
	     */
	    function get() {
	      return this[RECORDING_NAME];
	    },
	    set: function set(name) {
	      validateRecordingName(name);
	      this[RECORDING_NAME] = name;
	      this[RECORDING_ID] = guidForRecording(name);
	    }
	    /**
	     * @readonly
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "recordingId",
	    get: function get() {
	      return this[RECORDING_ID];
	    }
	  }, {
	    key: "mode",
	    get: function get() {
	      return this.config.mode;
	    },
	    set: function set(mode) {
	      var possibleModes = values$1(MODES);

	      assert("Invalid mode provided: \"".concat(mode, "\". Possible modes: ").concat(possibleModes.join(', '), "."), possibleModes.includes(mode));
	      this.config.mode = mode;
	    }
	  }, {
	    key: "configure",
	    value:
	    /**
	     * @param {Object} [config={}]
	     * @public
	     * @memberof Polly
	     */
	    function configure() {
	      var _this = this;

	      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var container = this.container;
	      assert('Cannot call `configure` once requests have been handled.', this._requests.length === 0);
	      assert('Cannot call `configure` on an instance of Polly that is not running.', this.mode !== MODES.STOPPED); // Disconnect from all current adapters before updating the config

	      this.disconnect();

	      if (this.logger) {
	        this.logger.disconnect();
	      } // Update the config


	      this.config = mergeConfigs(DefaultConfig, this.config, config); // Create a new logger

	      this.logger = new Logger(this);
	      this.logger.connect(); // Register and connect to all specified adapters

	      this.config.adapters.forEach(function (adapter) {
	        return _this.connectTo(adapter);
	      });
	      /* Handle Persister */

	      var persister = this.config.persister;

	      if (persister) {
	        if (typeof persister === 'function') {
	          container.register(persister);
	          persister = persister.id;
	        }

	        assert("Persister matching the name `".concat(persister, "` was not registered."), container.has("persister:".concat(persister)));
	        this.persister = new (container.lookup("persister:".concat(persister)))(this);
	      }

	      this.logger.log.debug('Polly instance configured.', {
	        config: this.config
	      });
	    }
	    /**
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "record",
	    value: function record() {
	      this.mode = MODES.RECORD;
	    }
	    /**
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "replay",
	    value: function replay() {
	      this.mode = MODES.REPLAY;
	    }
	    /**
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "passthrough",
	    value: function passthrough() {
	      this.mode = MODES.PASSTHROUGH;
	    }
	    /**
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "pause",
	    value: function pause() {
	      this[PAUSED_ADAPTERS] = _toConsumableArray(this.adapters.keys());
	      this.disconnect();
	    }
	    /**
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "play",
	    value: function play() {
	      var _this2 = this;

	      if (this[PAUSED_ADAPTERS]) {
	        this[PAUSED_ADAPTERS].forEach(function (adapterId) {
	          return _this2.connectTo(adapterId);
	        });
	        delete this[PAUSED_ADAPTERS];
	      }
	    }
	    /**
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "stop",
	    value: function () {
	      var _stop = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!(this.mode !== MODES.STOPPED)) {
	                  _context.next = 12;
	                  break;
	                }

	                if (!this.config.flushRequestsOnStop) {
	                  _context.next = 4;
	                  break;
	                }

	                _context.next = 4;
	                return this.flush();

	              case 4:
	                this.disconnect();
	                _context.next = 7;
	                return this.persister && this.persister.persist();

	              case 7:
	                this.mode = MODES.STOPPED;
	                _context.next = 10;
	                return EVENT_EMITTER$1.emit('stop', this);

	              case 10:
	                this.logger.log.debug('Polly instance stopped.', {
	                  recordingName: this.recordingName
	                });
	                this.logger.disconnect();

	              case 12:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function stop() {
	        return _stop.apply(this, arguments);
	      }

	      return stop;
	    }()
	  }, {
	    key: "flush",
	    value: function () {
	      var _flush = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
	        var NOOP;
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                NOOP = function NOOP() {};

	                _context2.next = 3;
	                return promise$1.all( // The NOOP is there to handle both a resolved and rejected promise
	                // to ensure the promise resolves regardless of the outcome.
	                this._requests.map(function (r) {
	                  return promise$1.resolve(r.promise).then(NOOP, NOOP);
	                }));

	              case 3:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function flush() {
	        return _flush.apply(this, arguments);
	      }

	      return flush;
	    }()
	    /**
	     * @param {String|Function} idOrFactory
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "connectTo",
	    value: function connectTo(idOrAdapter) {
	      var container = this.container,
	          adapters = this.adapters;
	      var adapterId = idOrAdapter;

	      if (typeof idOrAdapter === 'function') {
	        container.register(idOrAdapter);
	        adapterId = idOrAdapter.id;
	      }

	      assert("Adapter matching the name `".concat(adapterId, "` was not registered."), container.has("adapter:".concat(adapterId)));
	      this.disconnectFrom(adapterId);
	      var adapter = new (container.lookup("adapter:".concat(adapterId)))(this);
	      adapter.connect();
	      adapters.set(adapterId, adapter);
	    }
	    /**
	     * @param {String|Function} idOrAdapter
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "disconnectFrom",
	    value: function disconnectFrom(idOrAdapter) {
	      var adapters = this.adapters;
	      var adapterId = idOrAdapter;

	      if (typeof idOrAdapter === 'function') {
	        adapterId = idOrAdapter.id;
	      }

	      if (adapters.has(adapterId)) {
	        adapters.get(adapterId).disconnect();
	        adapters.delete(adapterId);
	      }
	    }
	    /**
	     * @public
	     * @memberof Polly
	     */

	  }, {
	    key: "disconnect",
	    value: function disconnect() {
	      var _iterator = _createForOfIteratorHelper$4(this.adapters.keys()),
	          _step;

	      try {
	        for (_iterator.s(); !(_step = _iterator.n()).done;) {
	          var adapterId = _step.value;
	          this.disconnectFrom(adapterId);
	        }
	      } catch (err) {
	        _iterator.e(err);
	      } finally {
	        _iterator.f();
	      }
	    }
	    /**
	     * @param {Object} [request={}]
	     * @returns {PollyRequest}
	     * @private
	     * @memberof Polly
	     */

	  }, {
	    key: "registerRequest",
	    value: function registerRequest() {
	      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var pollyRequest = new PollyRequest(this, request);

	      this._requests.push(pollyRequest);

	      return pollyRequest;
	    }
	  }], [{
	    key: "VERSION",
	    get: function get() {
	      return version;
	    }
	  }, {
	    key: "on",
	    value: function on(eventName, listener) {
	      EVENT_EMITTER$1.on(eventName, listener);
	      return this;
	    }
	  }, {
	    key: "once",
	    value: function once(eventName, listener) {
	      EVENT_EMITTER$1.once(eventName, listener);
	      return this;
	    }
	  }, {
	    key: "off",
	    value: function off(eventName, listener) {
	      EVENT_EMITTER$1.off(eventName, listener);
	      return this;
	    }
	  }, {
	    key: "register",
	    value: function register(Factory) {
	      if (!FACTORY_REGISTRATION.has(Factory)) {
	        FACTORY_REGISTRATION.set(Factory, function (container) {
	          return container.register(Factory);
	        });
	      }

	      this.on('register', FACTORY_REGISTRATION.get(Factory));
	      return this;
	    }
	  }, {
	    key: "unregister",
	    value: function unregister(Factory) {
	      if (FACTORY_REGISTRATION.has(Factory)) {
	        this.off('register', FACTORY_REGISTRATION.get(Factory));
	      }

	      return this;
	    }
	  }]);

	  return Polly;
	}();

	var defineProperty$5 = defineProperty$2;
	function beforeEach(context, recordingName, defaults) {
	  defineProperty$5(context, 'polly', {
	    writable: true,
	    enumerable: true,
	    configurable: true,
	    value: new Polly(recordingName, defaults)
	  });
	}
	function afterEach(_x, _x2) {
	  return _afterEach.apply(this, arguments);
	}

	function _afterEach() {
	  _afterEach = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(context, framework) {
	    return regenerator.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return context.polly.stop();

	          case 2:
	            defineProperty$5(context, 'polly', {
	              enumerable: true,
	              configurable: true,
	              get: function get() {
	                throw new PollyError("You are trying to access an instance of Polly that is no longer available.\n" + "See: https://netflix.github.io/pollyjs/#/test-frameworks/".concat(framework, "?id=test-hook-ordering"));
	              }
	            });

	          case 3:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _afterEach.apply(this, arguments);
	}

	function generateRecordingName(assert) {
	  return assert.test.testReport.fullName.join('/');
	}

	function setupQunit(hooks) {
	  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  setupQunit.beforeEach(hooks, defaults);
	  setupQunit.afterEach(hooks);
	}

	setupQunit.beforeEach = function setupQunitBeforeEach(hooks) {
	  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  hooks.beforeEach(function () {
	    return beforeEach(this, generateRecordingName.apply(void 0, arguments), defaults);
	  });
	};

	setupQunit.afterEach = function setupQunitAfterEach(hooks) {
	  hooks.afterEach(function () {
	    return afterEach(this, 'qunit');
	  });
	};

	function generateRecordingName$1(context) {
	  var currentTest = context.currentTest;
	  var parts = [currentTest.title];
	  var parent = currentTest.parent;

	  while (parent && parent.title) {
	    parts.push(parent.title);
	    parent = parent.parent;
	  }

	  return parts.reverse().join('/');
	}

	function setupMocha() {
	  var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global$1;
	  setupMocha.beforeEach(defaults, ctx);
	  setupMocha.afterEach(ctx);
	}

	setupMocha.beforeEach = function setupMochaBeforeEach(defaults) {
	  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global$1;
	  ctx.beforeEach(function () {
	    return beforeEach(this, generateRecordingName$1(this), defaults);
	  });
	};

	setupMocha.afterEach = function setupMochaAfterEach() {
	  var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global$1;
	  ctx.afterEach(function () {
	    return afterEach(this, 'mocha');
	  });
	};

	exports.Polly = Polly;
	exports.Timing = Timing;
	exports.setupMocha = setupMocha;
	exports.setupQunit = setupQunit;

	Object.defineProperty(exports, '__esModule', { value: true });

}));