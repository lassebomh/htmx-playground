/**
* @pollyjs/adapter-fetch v6.0.5
*
* https://github.com/netflix/pollyjs
*
* Released under the Apache-2.0 License.
*/
(function (global, factory) {
            typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
            typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global['@pollyjs/adapter-fetch'] = factory());
}(this, function () { 'use strict';

            var global$1 = (typeof global !== "undefined" ? global :
                        typeof self !== "undefined" ? self :
                        typeof window !== "undefined" ? window : {});

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

            var toString = {}.toString;

            var _cof = function (it) {
              return toString.call(it).slice(8, -1);
            };

            // fallback for non-array-like ES3 and non-enumerable old V8 strings

            // eslint-disable-next-line no-prototype-builtins
            var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
              return _cof(it) == 'String' ? it.split('') : Object(it);
            };

            // 7.2.1 RequireObjectCoercible(argument)
            var _defined = function (it) {
              if (it == undefined) throw TypeError("Can't call method on  " + it);
              return it;
            };

            // to indexed object, toObject with fallback for non-array-like ES3 strings


            var _toIobject = function (it) {
              return _iobject(_defined(it));
            };

            // 7.1.4 ToInteger
            var ceil = Math.ceil;
            var floor = Math.floor;
            var _toInteger = function (it) {
              return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
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

            var _library = true;

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

            // 7.1.13 ToObject(argument)

            var _toObject = function (it) {
              return Object(_defined(it));
            };

            // most Object methods by ES6 should accept primitives



            var _objectSap = function (KEY, exec) {
              var fn = (_core.Object || {})[KEY] || Object[KEY];
              var exp = {};
              exp[KEY] = exec(fn);
              _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
            };

            // 19.1.2.14 Object.keys(O)



            _objectSap('keys', function () {
              return function keys(it) {
                return _objectKeys(_toObject(it));
              };
            });

            var keys = _core.Object.keys;

            var keys$1 = keys;

            var _redefine = _hide;

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

            var f$1 = _wks;

            var _wksExt = {
            	f: f$1
            };

            var defineProperty = _objectDp.f;
            var _wksDefine = function (name) {
              var $Symbol = _core.Symbol || (_core.Symbol = {});
              if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
            };

            var f$2 = Object.getOwnPropertySymbols;

            var _objectGops = {
            	f: f$2
            };

            var f$3 = {}.propertyIsEnumerable;

            var _objectPie = {
            	f: f$3
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

            // 7.2.2 IsArray(argument)

            var _isArray = Array.isArray || function isArray(arg) {
              return _cof(arg) == 'Array';
            };

            // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

            var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

            var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
              return _objectKeysInternal(O, hiddenKeys);
            };

            var _objectGopn = {
            	f: f$4
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

            var f$5 = function getOwnPropertyNames(it) {
              return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
            };

            var _objectGopnExt = {
            	f: f$5
            };

            var gOPD = Object.getOwnPropertyDescriptor;

            var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
              O = _toIobject(O);
              P = _toPrimitive(P, true);
              if (_ie8DomDefine) try {
                return gOPD(O, P);
              } catch (e) { /* empty */ }
              if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
            };

            var _objectGopd = {
            	f: f$6
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
            var ObjectProto = Object[PROTOTYPE$2];
            var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops.f;
            var QObject = _global.QObject;
            // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
            var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

            // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
            var setSymbolDesc = _descriptors && _fails(function () {
              return _objectCreate(dP$1({}, 'a', {
                get: function () { return dP$1(this, 'a', { value: 7 }).a; }
              })).a != 7;
            }) ? function (it, key, D) {
              var protoDesc = gOPD$1(ObjectProto, key);
              if (protoDesc) delete ObjectProto[key];
              dP$1(it, key, D);
              if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
            } : dP$1;

            var wrap = function (tag) {
              var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
              sym._k = tag;
              return sym;
            };

            var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
              return typeof it == 'symbol';
            } : function (it) {
              return it instanceof $Symbol;
            };

            var $defineProperty = function defineProperty(it, key, D) {
              if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
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
              if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
              return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
            };
            var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
              it = _toIobject(it);
              key = _toPrimitive(key, true);
              if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
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
              var IS_OP = it === ObjectProto;
              var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
              var result = [];
              var i = 0;
              var key;
              while (names.length > i) {
                if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
              } return result;
            };

            // 19.4.1.1 Symbol([description])
            if (!USE_NATIVE) {
              $Symbol = function Symbol() {
                if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
                var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
                var $set = function (value) {
                  if (this === ObjectProto) $set.call(OPSymbols, value);
                  if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                  setSymbolDesc(this, tag, _propertyDesc(1, value));
                };
                if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
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
                _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
              }

              _wksExt.f = function (name) {
                return wrap(_wks(name));
              };
            }

            _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

            for (var es6Symbols = (
              // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
              'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
            ).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

            for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

            _export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
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

            _export(_export.S + _export.F * !USE_NATIVE, 'Object', {
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
            $JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
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

            var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;

            var getOwnPropertySymbols$1 = getOwnPropertySymbols;

            // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

            var $getOwnPropertyDescriptor$1 = _objectGopd.f;

            _objectSap('getOwnPropertyDescriptor', function () {
              return function getOwnPropertyDescriptor(it, key) {
                return $getOwnPropertyDescriptor$1(_toIobject(it), key);
              };
            });

            var $Object = _core.Object;
            var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
              return $Object.getOwnPropertyDescriptor(it, key);
            };

            var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor;

            // all object keys, includes non-enumerable and symbols



            var Reflect$1 = _global.Reflect;
            var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
              var keys = _objectGopn.f(_anObject(it));
              var getSymbols = _objectGops.f;
              return getSymbols ? keys.concat(getSymbols(it)) : keys;
            };

            var _createProperty = function (object, index, value) {
              if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
              else object[index] = value;
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

            var $Object$1 = _core.Object;
            var defineProperties = function defineProperties(T, D) {
              return $Object$1.defineProperties(T, D);
            };

            var defineProperties$1 = defineProperties;

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

            var _iterators = {};

            var IteratorPrototype = {};

            // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
            _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

            var _iterCreate = function (Constructor, NAME, next) {
              Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
              _setToStringTag(Constructor, NAME + ' Iterator');
            };

            // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


            var IE_PROTO$2 = _sharedKey('IE_PROTO');
            var ObjectProto$1 = Object.prototype;

            var _objectGpo = Object.getPrototypeOf || function (O) {
              O = _toObject(O);
              if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
              if (typeof O.constructor == 'function' && O instanceof O.constructor) {
                return O.constructor.prototype;
              } return O instanceof Object ? ObjectProto$1 : null;
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

            var f$7 = function (C) {
              return new PromiseCapability(C);
            };

            var _newPromiseCapability = {
            	f: f$7
            };

            var _perform = function (exec) {
              try {
                return { e: false, v: exec() };
              } catch (e) {
                return { e: true, v: e };
              }
            };

            var navigator$1 = _global.navigator;

            var _userAgent = navigator$1 && navigator$1.userAgent || '';

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

            var USE_NATIVE$1 = !!function () {
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
            if (!USE_NATIVE$1) {
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

            _export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Promise: $Promise });
            _setToStringTag($Promise, PROMISE);
            _setSpecies(PROMISE);
            Wrapper = _core[PROMISE];

            // statics
            _export(_export.S + _export.F * !USE_NATIVE$1, PROMISE, {
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
            _export(_export.S + _export.F * !(USE_NATIVE$1 && _iterDetect(function (iter) {
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

            // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
            _export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

            var $Object$2 = _core.Object;
            var defineProperty$1 = function defineProperty(it, key, desc) {
              return $Object$2.defineProperty(it, key, desc);
            };

            var defineProperty$2 = defineProperty$1;

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

            _wksDefine('asyncIterator');

            _wksDefine('observable');

            var symbol = _core.Symbol;

            var symbol$1 = symbol;

            var iterator = _wksExt.f('iterator');

            var iterator$1 = iterator;

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

            // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
            _export(_export.S, 'Object', { create: _objectCreate });

            var $Object$3 = _core.Object;
            var create = function create(P, D) {
              return $Object$3.create(P, D);
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

            var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
            var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
              return $JSON$1.stringify.apply($JSON$1, arguments);
            };

            var stringify$1 = stringify;

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

            var EXPIRY_STRATEGIES = {
              RECORD: 'record',
              WARN: 'warn',
              ERROR: 'error'
            };

            var _validateCollection = function (it, TYPE) {
              if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
              return it;
            };

            var dP$2 = _objectDp.f;









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
                if (_descriptors) dP$2(C.prototype, 'size', {
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

            var dP$3 = _objectDp.f;
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
                IS_WEAK || dP$3(C.prototype, 'size', {
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

            // https://tc39.github.io/proposal-setmap-offrom/


            var _setCollectionOf = function (COLLECTION) {
              _export(_export.S, COLLECTION, { of: function of() {
                var length = arguments.length;
                var A = new Array(length);
                while (length--) A[length] = arguments[length];
                return new this(A);
              } });
            };

            // https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
            _setCollectionOf('Map');

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

            // https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
            _setCollectionFrom('Map');

            var map = _core.Map;

            var map$1 = map;

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

            unwrapExports(construct$3);

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

            function _assert (msg, condition) {
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

            // 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


            _export(_export.S, 'Array', { isArray: _isArray });

            var isArray = _core.Array.isArray;

            var isArray$1 = isArray;

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

            unwrapExports(get$3);

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
            var hasSet = typeof Set === 'function' && Set.prototype;
            var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
            var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
            var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
            var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
            var functionToString = Function.prototype.toString;
            var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
            var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
            var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';

            var inspectCustom = require$$0.custom;
            var inspectSymbol = inspectCustom && isSymbol$1(inspectCustom) ? inspectCustom : null;

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

            var $TypeError$1 = getIntrinsic('%TypeError%');
            var $WeakMap = getIntrinsic('%WeakMap%', true);
            var $Map = getIntrinsic('%Map%', true);

            var $weakMapGet = callBound('WeakMap.prototype.get', true);
            var $weakMapSet = callBound('WeakMap.prototype.set', true);
            var $weakMapHas = callBound('WeakMap.prototype.has', true);
            var $mapGet = callBound('Map.prototype.get', true);
            var $mapSet = callBound('Map.prototype.set', true);
            var $mapHas = callBound('Map.prototype.has', true);

            var hexTable = function () {
              var array = [];

              for (var i = 0; i < 256; ++i) {
                array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
              }

              return array;
            }();

            var ARRAY_FORMAT = symbol$1();

            var supportsBlob = function () {
              try {
                return !!new Blob();
              } catch (e) {
                return false;
              }
            }();
            function readBlob(blob) {
              return new promise$1(function (resolve, reject) {
                var reader = new FileReader();
                reader.onend = reject;
                reader.onabort = reject;

                reader.onload = function () {
                  return resolve(reader.result);
                };

                reader.readAsDataURL(new Blob([blob], {
                  type: blob.type
                }));
              });
            }
            function serialize(_x) {
              return _serialize.apply(this, arguments);
            }

            function _serialize() {
              _serialize = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(body) {
                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(supportsBlob && body instanceof Blob)) {
                          _context.next = 4;
                          break;
                        }

                        _context.next = 3;
                        return readBlob(body);

                      case 3:
                        return _context.abrupt("return", _context.sent);

                      case 4:
                        return _context.abrupt("return", body);

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return _serialize.apply(this, arguments);
            }

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

            var _slicedToArray = unwrapExports(slicedToArray);

            function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof symbol$1 !== "undefined" && o[iterator$1] || o["@@iterator"]; if (!it) { if (isArray$1(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return from_1$1(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
            var supportsFormData = typeof FormData !== 'undefined';
            function serialize$1(_x) {
              return _serialize$1.apply(this, arguments);
            }

            function _serialize$1() {
              _serialize$1 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(body) {
                var data, _iterator, _step, _step$value, key, value, blobContent;

                return regenerator.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(supportsFormData && body instanceof FormData)) {
                          _context.next = 26;
                          break;
                        }

                        data = [];
                        _iterator = _createForOfIteratorHelper(body.entries());
                        _context.prev = 3;

                        _iterator.s();

                      case 5:
                        if ((_step = _iterator.n()).done) {
                          _context.next = 17;
                          break;
                        }

                        _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];

                        if (!(supportsBlob && value instanceof Blob)) {
                          _context.next = 14;
                          break;
                        }

                        _context.next = 10;
                        return readBlob(value);

                      case 10:
                        blobContent = _context.sent;
                        data.push("".concat(key, "=").concat(blobContent));
                        _context.next = 15;
                        break;

                      case 14:
                        data.push("".concat(key, "=").concat(value));

                      case 15:
                        _context.next = 5;
                        break;

                      case 17:
                        _context.next = 22;
                        break;

                      case 19:
                        _context.prev = 19;
                        _context.t0 = _context["catch"](3);

                        _iterator.e(_context.t0);

                      case 22:
                        _context.prev = 22;

                        _iterator.f();

                        return _context.finish(22);

                      case 25:
                        return _context.abrupt("return", data.join('\r\n'));

                      case 26:
                        return _context.abrupt("return", body);

                      case 27:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 19, 22, 25]]);
              }));
              return _serialize$1.apply(this, arguments);
            }

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

            var toString$2 = {}.toString;

            var isArray$2 = Array.isArray || function (arr) {
              return toString$2.call(arr) == '[object Array]';
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

            /*
             * Export kMaxLength after typed array support is determined.
             */
            var _kMaxLength = kMaxLength();

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

                if (obj.type === 'Buffer' && isArray$2(obj.data)) {
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

            function SlowBuffer (length) {
              if (+length != length) { // eslint-disable-line eqeqeq
                length = 0;
              }
              return Buffer.alloc(+length)
            }
            Buffer.isBuffer = isBuffer;
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
              if (!isArray$2(list)) {
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
            function isBuffer(obj) {
              return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
            }

            function isFastBuffer (obj) {
              return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
            }

            // For Node v0.10 support. Remove this eventually.
            function isSlowBuffer (obj) {
              return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
            }

            var bufferEs6 = /*#__PURE__*/Object.freeze({
                        INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
                        kMaxLength: _kMaxLength,
                        Buffer: Buffer,
                        SlowBuffer: SlowBuffer,
                        isBuffer: isBuffer
            });

            /* eslint-env node */
            var supportsBuffer = typeof Buffer !== 'undefined';
            var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined';
            function serialize$2(body) {
              if (supportsBuffer && body) {
                var buffer;

                if (isBuffer(body)) {
                  buffer = body;
                } else if (isArray$1(body) && body.some(function (c) {
                  return isBuffer(c);
                })) {
                  // Body is a chunked array
                  var chunks = body.map(function (c) {
                    return Buffer.from(c);
                  });
                  buffer = Buffer.concat(chunks);
                } else if ("".concat(body) === '[object ArrayBuffer]') {
                  buffer = Buffer.from(body);
                } else if (supportsArrayBuffer && ArrayBuffer.isView(body)) {
                  buffer = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
                }

                if (isBuffer(buffer)) {
                  return buffer.toString('base64');
                }
              }

              return body;
            }

            var Serializers = {
              blob: serialize,
              formData: serialize$1,
              buffer: serialize$2
            };

            /**
             * Determine if the given buffer is utf8.
             * @param {Buffer} buffer
             */

            function isBufferUtf8Representable(buffer) {
              var utfEncodedBuffer = buffer.toString('utf8');
              var reconstructedBuffer = Buffer.from(utfEncodedBuffer, 'utf8');
              return reconstructedBuffer.equals(buffer);
            }

            /**
             * Clone an array buffer
             *
             * @param {ArrayBuffer} arrayBuffer
             */
            function cloneArrayBuffer(arrayBuffer) {
              var clonedArrayBuffer = new ArrayBuffer(arrayBuffer.byteLength);
              new Uint8Array(clonedArrayBuffer).set(new Uint8Array(arrayBuffer));
              return clonedArrayBuffer;
            }

            var $parseFloat = _global.parseFloat;
            var $trim$1 = _stringTrim.trim;

            var _parseFloat = 1 / $parseFloat(_stringWs + '-0') !== -Infinity ? function parseFloat(str) {
              var string = $trim$1(String(str), 3);
              var result = $parseFloat(string);
              return result === 0 && string.charAt(0) == '-' ? -0 : result;
            } : $parseFloat;

            // 18.2.4 parseFloat(string)
            _export(_export.G + _export.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

            var _parseFloat$1 = _core.parseFloat;

            var _parseFloat$2 = _parseFloat$1;

            var ALPHA_NUMERIC_DOT = /([0-9.]+)([a-zA-Z]+)/g;
            var TIMES = {
              ms: 1,
              millisecond: 1,
              milliseconds: 1,
              s: 1000,
              sec: 1000,
              secs: 1000,
              second: 1000,
              seconds: 1000,
              m: 60000,
              min: 60000,
              mins: 60000,
              minute: 60000,
              minutes: 60000,
              h: 3600000,
              hr: 3600000,
              hrs: 3600000,
              hour: 3600000,
              hours: 3600000,
              d: 86400000,
              day: 86400000,
              days: 86400000,
              w: 604800000,
              wk: 604800000,
              wks: 604800000,
              week: 604800000,
              weeks: 604800000,
              y: 31536000000,
              yr: 31536000000,
              yrs: 31536000000,
              year: 31536000000,
              years: 31536000000
            };
            function dehumanizeTime(input) {
              if (typeof input !== 'string') {
                return NaN;
              }

              var parts = input.replace(/ /g, '').match(ALPHA_NUMERIC_DOT);
              var sets = parts.map(function (part) {
                return part.split(ALPHA_NUMERIC_DOT).filter(function (o) {
                  return o;
                });
              });
              return sets.reduce(function (accum, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    number = _ref2[0],
                    unit = _ref2[1];

                return accum + _parseFloat$2(number) * TIMES[unit];
              }, 0);
            }

            function isExpired(recordedOn, expiresIn) {
              if (recordedOn && expiresIn) {
                return new Date() > new Date(new Date(recordedOn).getTime() + dehumanizeTime(expiresIn));
              }

              return false;
            }

            function ownKeys(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { var symbols = getOwnPropertySymbols$1(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys(Object(source)).forEach(function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

            function stringifyRequest(req) {
              var config = _objectSpread({}, req.config); // Remove all adapter & persister config options as they can cause a circular
              // structure to the final JSON


              ['adapter', 'adapterOptions', 'persister', 'persisterOptions'].forEach(function (k) {
                return delete config[k];
              });

              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }

              return stringify$1.apply(JSON, [{
                url: req.url,
                method: req.method,
                headers: req.headers,
                body: req.body,
                recordingName: req.recordingName,
                id: req.id,
                order: req.order,
                identifiers: req.identifiers,
                config: config
              }].concat(args));
            }

            var isArray$3 = isArray$1;
            function normalizeRecordedResponse(response) {
              var status = response.status,
                  statusText = response.statusText,
                  headers = response.headers,
                  content = response.content;
              return {
                statusText: statusText,
                statusCode: status,
                headers: normalizeHeaders(headers),
                body: content && content.text,
                encoding: content && content.encoding
              };
            }

            function normalizeHeaders(headers) {
              return (headers || []).reduce(function (accum, _ref) {
                var name = _ref.name,
                    value = _ref.value,
                    _fromType = _ref._fromType;
                var existingValue = accum[name];

                if (existingValue) {
                  if (!isArray$3(existingValue)) {
                    accum[name] = [existingValue];
                  }

                  accum[name].push(value);
                } else {
                  accum[name] = _fromType === 'array' ? [value] : value;
                }

                return accum;
              }, {});
            }

            function ownKeys$1(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { var symbols = getOwnPropertySymbols$1(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

            var REQUEST_HANDLER = symbol$1();

            var Adapter = /*#__PURE__*/function () {
              function Adapter(polly) {
                _classCallCheck(this, Adapter);

                this.polly = polly;
                this.isConnected = false;
              }

              _createClass(Adapter, [{
                key: "defaultOptions",
                get: function get() {
                  return {};
                }
              }, {
                key: "options",
                get: function get() {
                  return _objectSpread$1(_objectSpread$1({}, this.defaultOptions || {}), (this.polly.config.adapterOptions || {})[this.constructor.id] || {});
                }
              }, {
                key: "persister",
                get: function get() {
                  return this.polly.persister;
                }
              }, {
                key: "connect",
                value: function connect() {
                  if (!this.isConnected) {
                    this.onConnect();
                    this.isConnected = true;
                    this.polly.logger.log.debug("Connected to ".concat(this.constructor.id, " adapter."));
                  }
                }
              }, {
                key: "onConnect",
                value: function onConnect() {
                  this.assert('Must implement the `onConnect` hook.');
                }
              }, {
                key: "disconnect",
                value: function disconnect() {
                  if (this.isConnected) {
                    this.onDisconnect();
                    this.isConnected = false;
                    this.polly.logger.log.debug("Disconnected from ".concat(this.constructor.id, " adapter."));
                  }
                }
              }, {
                key: "onDisconnect",
                value: function onDisconnect() {
                  this.assert('Must implement the `onDisconnect` hook.');
                }
              }, {
                key: "timeout",
                value: function timeout(pollyRequest, _ref) {
                  var time = _ref.time;
                  var timing = pollyRequest.config.timing;

                  if (typeof timing === 'function') {
                    return timing(time);
                  }
                }
              }, {
                key: "handleRequest",
                value: function () {
                  var _handleRequest = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(request) {
                    var _this = this;

                    var pollyRequest;
                    return regenerator.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            pollyRequest = this.polly.registerRequest(request);
                            _context.prev = 1;
                            pollyRequest.on('identify', function () {
                              return _this.onIdentifyRequest.apply(_this, arguments);
                            });
                            _context.next = 5;
                            return this.onRequest(pollyRequest);

                          case 5:
                            _context.next = 7;
                            return pollyRequest.init();

                          case 7:
                            _context.next = 9;
                            return this[REQUEST_HANDLER](pollyRequest);

                          case 9:
                            if (!pollyRequest.aborted) {
                              _context.next = 11;
                              break;
                            }

                            throw new PollyError('Request aborted.');

                          case 11:
                            _context.next = 13;
                            return this.onRequestFinished(pollyRequest);

                          case 13:
                            _context.next = 19;
                            break;

                          case 15:
                            _context.prev = 15;
                            _context.t0 = _context["catch"](1);
                            _context.next = 19;
                            return this.onRequestFailed(pollyRequest, _context.t0);

                          case 19:
                            return _context.abrupt("return", pollyRequest);

                          case 20:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this, [[1, 15]]);
                  }));

                  function handleRequest(_x) {
                    return _handleRequest.apply(this, arguments);
                  }

                  return handleRequest;
                }()
              }, {
                key: REQUEST_HANDLER,
                value: function () {
                  var _value = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(pollyRequest) {
                    var mode, interceptor;
                    return regenerator.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            mode = this.polly.mode;
                            interceptor = pollyRequest._interceptor;

                            if (!pollyRequest.aborted) {
                              _context2.next = 4;
                              break;
                            }

                            return _context2.abrupt("return");

                          case 4:
                            if (!pollyRequest.shouldIntercept) {
                              _context2.next = 9;
                              break;
                            }

                            _context2.next = 7;
                            return this.intercept(pollyRequest, interceptor);

                          case 7:
                            if (!interceptor.shouldIntercept) {
                              _context2.next = 9;
                              break;
                            }

                            return _context2.abrupt("return");

                          case 9:
                            if (!(mode === MODES.PASSTHROUGH || pollyRequest.shouldPassthrough || interceptor.shouldPassthrough)) {
                              _context2.next = 11;
                              break;
                            }

                            return _context2.abrupt("return", this.passthrough(pollyRequest));

                          case 11:
                            this.assert('A persister must be configured in order to record and replay requests.', !!this.persister);

                            if (!(mode === MODES.RECORD)) {
                              _context2.next = 14;
                              break;
                            }

                            return _context2.abrupt("return", this.record(pollyRequest));

                          case 14:
                            if (!(mode === MODES.REPLAY)) {
                              _context2.next = 16;
                              break;
                            }

                            return _context2.abrupt("return", this.replay(pollyRequest));

                          case 16:
                            // This should never be reached. If it did, then something screwy happened.
                            this.assert('Unhandled request: \n' + stringifyRequest(pollyRequest, null, 2));

                          case 17:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, this);
                  }));

                  function value(_x2) {
                    return _value.apply(this, arguments);
                  }

                  return value;
                }()
              }, {
                key: "passthrough",
                value: function () {
                  var _passthrough = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(pollyRequest) {
                    return regenerator.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            pollyRequest.action = ACTIONS.PASSTHROUGH;
                            return _context3.abrupt("return", this.onPassthrough(pollyRequest));

                          case 2:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, this);
                  }));

                  function passthrough(_x3) {
                    return _passthrough.apply(this, arguments);
                  }

                  return passthrough;
                }()
                /**
                 * @param {PollyRequest} pollyRequest
                 */

              }, {
                key: "onPassthrough",
                value: function () {
                  var _onPassthrough = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(pollyRequest) {
                    var response;
                    return regenerator.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return this.onFetchResponse(pollyRequest);

                          case 2:
                            response = _context4.sent;
                            _context4.next = 5;
                            return pollyRequest.respond(response);

                          case 5:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4, this);
                  }));

                  function onPassthrough(_x4) {
                    return _onPassthrough.apply(this, arguments);
                  }

                  return onPassthrough;
                }()
              }, {
                key: "intercept",
                value: function () {
                  var _intercept = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(pollyRequest, interceptor) {
                    return regenerator.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            pollyRequest.action = ACTIONS.INTERCEPT;
                            _context5.next = 3;
                            return pollyRequest._intercept(interceptor);

                          case 3:
                            if (!interceptor.shouldIntercept) {
                              _context5.next = 5;
                              break;
                            }

                            return _context5.abrupt("return", this.onIntercept(pollyRequest, pollyRequest.response));

                          case 5:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5, this);
                  }));

                  function intercept(_x5, _x6) {
                    return _intercept.apply(this, arguments);
                  }

                  return intercept;
                }()
                /**
                 * @param {PollyRequest} pollyRequest
                 * @param {PollyResponse} pollyResponse
                 */

              }, {
                key: "onIntercept",
                value: function () {
                  var _onIntercept = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(pollyRequest, pollyResponse) {
                    return regenerator.wrap(function _callee6$(_context6) {
                      while (1) {
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            _context6.next = 2;
                            return pollyRequest.respond(pollyResponse);

                          case 2:
                          case "end":
                            return _context6.stop();
                        }
                      }
                    }, _callee6);
                  }));

                  function onIntercept(_x7, _x8) {
                    return _onIntercept.apply(this, arguments);
                  }

                  return onIntercept;
                }()
              }, {
                key: "record",
                value: function () {
                  var _record = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(pollyRequest) {
                    return regenerator.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            pollyRequest.action = ACTIONS.RECORD;

                            if ('navigator' in global$1 && !navigator.onLine) {
                              pollyRequest.log.warn('[Polly] Recording may fail because the browser is offline.\n' + "".concat(stringifyRequest(pollyRequest)));
                            }

                            return _context7.abrupt("return", this.onRecord(pollyRequest));

                          case 3:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7, this);
                  }));

                  function record(_x9) {
                    return _record.apply(this, arguments);
                  }

                  return record;
                }()
                /**
                 * @param {PollyRequest} pollyRequest
                 */

              }, {
                key: "onRecord",
                value: function () {
                  var _onRecord = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(pollyRequest) {
                    return regenerator.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            _context8.next = 2;
                            return this.onPassthrough(pollyRequest);

                          case 2:
                            if (pollyRequest.aborted) {
                              _context8.next = 5;
                              break;
                            }

                            _context8.next = 5;
                            return this.persister.recordRequest(pollyRequest);

                          case 5:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8, this);
                  }));

                  function onRecord(_x10) {
                    return _onRecord.apply(this, arguments);
                  }

                  return onRecord;
                }()
              }, {
                key: "replay",
                value: function () {
                  var _replay = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9(pollyRequest) {
                    var config, recordingEntry, clonedRecordingEntry, message;
                    return regenerator.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            config = pollyRequest.config;
                            _context9.next = 3;
                            return this.persister.findEntry(pollyRequest);

                          case 3:
                            recordingEntry = _context9.sent;

                            if (!recordingEntry) {
                              _context9.next = 24;
                              break;
                            }

                            /*
                              Clone the recording entry so any changes will not actually persist to
                              the stored recording.
                               Note: Using JSON.parse/stringify instead of lodash/cloneDeep since
                                    the recording entry is stored as json.
                            */
                            clonedRecordingEntry = JSON.parse(stringify$1(recordingEntry));
                            _context9.next = 8;
                            return pollyRequest._emit('beforeReplay', clonedRecordingEntry);

                          case 8:
                            if (!isExpired(clonedRecordingEntry.startedDateTime, config.expiresIn)) {
                              _context9.next = 20;
                              break;
                            }

                            message = 'Recording for the following request has expired.\n' + "".concat(stringifyRequest(pollyRequest, null, 2));
                            _context9.t0 = config.expiryStrategy;
                            _context9.next = _context9.t0 === EXPIRY_STRATEGIES.RECORD ? 13 : _context9.t0 === EXPIRY_STRATEGIES.ERROR ? 14 : _context9.t0 === EXPIRY_STRATEGIES.WARN ? 16 : 18;
                            break;

                          case 13:
                            return _context9.abrupt("return", this.record(pollyRequest));

                          case 14:
                            this.assert(message);
                            return _context9.abrupt("break", 20);

                          case 16:
                            pollyRequest.log.warn("[Polly] ".concat(message));
                            return _context9.abrupt("break", 20);

                          case 18:
                            this.assert("Invalid config option passed for \"expiryStrategy\": \"".concat(config.expiryStrategy, "\""));
                            return _context9.abrupt("break", 20);

                          case 20:
                            _context9.next = 22;
                            return this.timeout(pollyRequest, clonedRecordingEntry);

                          case 22:
                            pollyRequest.action = ACTIONS.REPLAY;
                            return _context9.abrupt("return", this.onReplay(pollyRequest, normalizeRecordedResponse(clonedRecordingEntry.response), clonedRecordingEntry));

                          case 24:
                            if (!config.recordIfMissing) {
                              _context9.next = 26;
                              break;
                            }

                            return _context9.abrupt("return", this.record(pollyRequest));

                          case 26:
                            this.assert('Recording for the following request is not found and `recordIfMissing` is `false`.\n' + stringifyRequest(pollyRequest, null, 2));

                          case 27:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9, this);
                  }));

                  function replay(_x11) {
                    return _replay.apply(this, arguments);
                  }

                  return replay;
                }()
                /**
                 * @param {PollyRequest} pollyRequest
                 * @param {Object} normalizedResponse The normalized response generated from the recording entry
                 * @param {Object} recordingEntry The entire recording entry
                 */

              }, {
                key: "onReplay",
                value: function () {
                  var _onReplay = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10(pollyRequest, normalizedResponse) {
                    return regenerator.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.next = 2;
                            return pollyRequest.respond(normalizedResponse);

                          case 2:
                          case "end":
                            return _context10.stop();
                        }
                      }
                    }, _callee10);
                  }));

                  function onReplay(_x12, _x13) {
                    return _onReplay.apply(this, arguments);
                  }

                  return onReplay;
                }()
              }, {
                key: "assert",
                value: function assert(message) {
                  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                  }

                  _assert.apply(void 0, ["[".concat(this.constructor.type, ":").concat(this.constructor.id, "] ").concat(message)].concat(args));
                }
                /**
                 * @param {PollyRequest} pollyRequest
                 */

              }, {
                key: "onRequest",
                value: function onRequest() {}
                /**
                 * @param {PollyRequest} pollyRequest
                 */

              }, {
                key: "onIdentifyRequest",
                value: function () {
                  var _onIdentifyRequest = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11(pollyRequest) {
                    var identifiers, _i, _arr, type;

                    return regenerator.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            identifiers = pollyRequest.identifiers; // Serialize the request body so it can be properly hashed

                            _i = 0, _arr = ['blob', 'formData', 'buffer'];

                          case 2:
                            if (!(_i < _arr.length)) {
                              _context11.next = 10;
                              break;
                            }

                            type = _arr[_i];
                            _context11.next = 6;
                            return Serializers[type](identifiers.body);

                          case 6:
                            identifiers.body = _context11.sent;

                          case 7:
                            _i++;
                            _context11.next = 2;
                            break;

                          case 10:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11);
                  }));

                  function onIdentifyRequest(_x14) {
                    return _onIdentifyRequest.apply(this, arguments);
                  }

                  return onIdentifyRequest;
                }()
                /**
                 * @param {PollyRequest} pollyRequest
                 */

              }, {
                key: "onRequestFinished",
                value: function () {
                  var _onRequestFinished = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12(pollyRequest) {
                    return regenerator.wrap(function _callee12$(_context12) {
                      while (1) {
                        switch (_context12.prev = _context12.next) {
                          case 0:
                            _context12.next = 2;
                            return this.onRespond(pollyRequest);

                          case 2:
                            pollyRequest.promise.resolve();

                          case 3:
                          case "end":
                            return _context12.stop();
                        }
                      }
                    }, _callee12, this);
                  }));

                  function onRequestFinished(_x15) {
                    return _onRequestFinished.apply(this, arguments);
                  }

                  return onRequestFinished;
                }()
                /**
                 * @param {PollyRequest} pollyRequest
                 * @param {Error} [error]
                 */

              }, {
                key: "onRequestFailed",
                value: function () {
                  var _onRequestFailed = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee13(pollyRequest, error) {
                    var aborted;
                    return regenerator.wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            aborted = pollyRequest.aborted;
                            error = error || new PollyError('Request failed due to an unknown error.');
                            _context13.prev = 2;

                            if (!aborted) {
                              _context13.next = 8;
                              break;
                            }

                            _context13.next = 6;
                            return pollyRequest._emit('abort');

                          case 6:
                            _context13.next = 10;
                            break;

                          case 8:
                            _context13.next = 10;
                            return pollyRequest._emit('error', error);

                          case 10:
                            _context13.next = 12;
                            return this.onRespond(pollyRequest, error);

                          case 12:
                            _context13.prev = 12;
                            pollyRequest.promise.reject(error);
                            return _context13.finish(12);

                          case 15:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    }, _callee13, this, [[2,, 12, 15]]);
                  }));

                  function onRequestFailed(_x16, _x17) {
                    return _onRequestFailed.apply(this, arguments);
                  }

                  return onRequestFailed;
                }()
                /**
                 * Make sure the response from a Polly request is delivered to the
                 * user through the adapter interface.
                 *
                 * Calling `pollyjs.flush()` will await this method.
                 *
                 * @param {PollyRequest} pollyRequest
                 * @param {Error} [error]
                 */

              }, {
                key: "onRespond",
                value: function () {
                  var _onRespond = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee14() {
                    return regenerator.wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    }, _callee14);
                  }));

                  function onRespond() {
                    return _onRespond.apply(this, arguments);
                  }

                  return onRespond;
                }()
                /**
                 * @param {PollyRequest} pollyRequest
                 * @returns {Object({ statusCode: number, headers: Object, body: string })}
                 */

              }, {
                key: "onFetchResponse",
                value: function () {
                  var _onFetchResponse = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee15() {
                    return regenerator.wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            this.assert('Must implement the `onFetchResponse` hook.');

                          case 1:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    }, _callee15, this);
                  }));

                  function onFetchResponse() {
                    return _onFetchResponse.apply(this, arguments);
                  }

                  return onFetchResponse;
                }()
              }], [{
                key: "type",
                get: function get() {
                  return 'adapter';
                }
                /* eslint-disable-next-line getter-return */

              }, {
                key: "id",
                get: function get() {
                  _assert('Must override the static `id` getter.');
                }
              }]);

              return Adapter;
            }();

            var byteLength_1 = byteLength$1;
            var toByteArray_1 = toByteArray$1;
            var fromByteArray_1 = fromByteArray$1;

            var lookup$1 = [];
            var revLookup$1 = [];
            var Arr$1 = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

            var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            for (var i$1 = 0, len = code.length; i$1 < len; ++i$1) {
              lookup$1[i$1] = code[i$1];
              revLookup$1[code.charCodeAt(i$1)] = i$1;
            }

            // Support decoding URL-safe base64 strings, as Node.js does.
            // See: https://en.wikipedia.org/wiki/Base64#URL_applications
            revLookup$1['-'.charCodeAt(0)] = 62;
            revLookup$1['_'.charCodeAt(0)] = 63;

            function getLens (b64) {
              var len = b64.length;

              if (len % 4 > 0) {
                throw new Error('Invalid string. Length must be a multiple of 4')
              }

              // Trim off extra bytes after placeholder bytes are found
              // See: https://github.com/beatgammit/base64-js/issues/42
              var validLen = b64.indexOf('=');
              if (validLen === -1) validLen = len;

              var placeHoldersLen = validLen === len
                ? 0
                : 4 - (validLen % 4);

              return [validLen, placeHoldersLen]
            }

            // base64 is 4/3 + up to two characters of the original data
            function byteLength$1 (b64) {
              var lens = getLens(b64);
              var validLen = lens[0];
              var placeHoldersLen = lens[1];
              return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
            }

            function _byteLength (b64, validLen, placeHoldersLen) {
              return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
            }

            function toByteArray$1 (b64) {
              var tmp;
              var lens = getLens(b64);
              var validLen = lens[0];
              var placeHoldersLen = lens[1];

              var arr = new Arr$1(_byteLength(b64, validLen, placeHoldersLen));

              var curByte = 0;

              // if there are placeholders, only get up to the last complete 4 chars
              var len = placeHoldersLen > 0
                ? validLen - 4
                : validLen;

              for (var i = 0; i < len; i += 4) {
                tmp =
                  (revLookup$1[b64.charCodeAt(i)] << 18) |
                  (revLookup$1[b64.charCodeAt(i + 1)] << 12) |
                  (revLookup$1[b64.charCodeAt(i + 2)] << 6) |
                  revLookup$1[b64.charCodeAt(i + 3)];
                arr[curByte++] = (tmp >> 16) & 0xFF;
                arr[curByte++] = (tmp >> 8) & 0xFF;
                arr[curByte++] = tmp & 0xFF;
              }

              if (placeHoldersLen === 2) {
                tmp =
                  (revLookup$1[b64.charCodeAt(i)] << 2) |
                  (revLookup$1[b64.charCodeAt(i + 1)] >> 4);
                arr[curByte++] = tmp & 0xFF;
              }

              if (placeHoldersLen === 1) {
                tmp =
                  (revLookup$1[b64.charCodeAt(i)] << 10) |
                  (revLookup$1[b64.charCodeAt(i + 1)] << 4) |
                  (revLookup$1[b64.charCodeAt(i + 2)] >> 2);
                arr[curByte++] = (tmp >> 8) & 0xFF;
                arr[curByte++] = tmp & 0xFF;
              }

              return arr
            }

            function tripletToBase64$1 (num) {
              return lookup$1[num >> 18 & 0x3F] +
                lookup$1[num >> 12 & 0x3F] +
                lookup$1[num >> 6 & 0x3F] +
                lookup$1[num & 0x3F]
            }

            function encodeChunk$1 (uint8, start, end) {
              var tmp;
              var output = [];
              for (var i = start; i < end; i += 3) {
                tmp =
                  ((uint8[i] << 16) & 0xFF0000) +
                  ((uint8[i + 1] << 8) & 0xFF00) +
                  (uint8[i + 2] & 0xFF);
                output.push(tripletToBase64$1(tmp));
              }
              return output.join('')
            }

            function fromByteArray$1 (uint8) {
              var tmp;
              var len = uint8.length;
              var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
              var parts = [];
              var maxChunkLength = 16383; // must be multiple of 3

              // go through the array every three bytes, we'll deal with trailing stuff later
              for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
                parts.push(encodeChunk$1(
                  uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
                ));
              }

              // pad the end with zeros, but make sure to not forget the extra bytes
              if (extraBytes === 1) {
                tmp = uint8[len - 1];
                parts.push(
                  lookup$1[tmp >> 2] +
                  lookup$1[(tmp << 4) & 0x3F] +
                  '=='
                );
              } else if (extraBytes === 2) {
                tmp = (uint8[len - 2] << 8) + uint8[len - 1];
                parts.push(
                  lookup$1[tmp >> 10] +
                  lookup$1[(tmp >> 4) & 0x3F] +
                  lookup$1[(tmp << 2) & 0x3F] +
                  '='
                );
              }

              return parts.join('')
            }

            var base64Js = {
            	byteLength: byteLength_1,
            	toByteArray: toByteArray_1,
            	fromByteArray: fromByteArray_1
            };

            var read$1 = function (buffer, offset, isLE, mLen, nBytes) {
              var e, m;
              var eLen = (nBytes * 8) - mLen - 1;
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
              for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

              m = e & ((1 << (-nBits)) - 1);
              e >>= (-nBits);
              nBits += mLen;
              for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

              if (e === 0) {
                e = 1 - eBias;
              } else if (e === eMax) {
                return m ? NaN : ((s ? -1 : 1) * Infinity)
              } else {
                m = m + Math.pow(2, mLen);
                e = e - eBias;
              }
              return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
            };

            var write$1 = function (buffer, value, offset, isLE, mLen, nBytes) {
              var e, m, c;
              var eLen = (nBytes * 8) - mLen - 1;
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
                  m = ((value * c) - 1) * Math.pow(2, mLen);
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
            };

            var ieee754 = {
            	read: read$1,
            	write: write$1
            };

            var toString$3 = {}.toString;

            var isarray = Array.isArray || function (arr) {
              return toString$3.call(arr) == '[object Array]';
            };

            var buffer = createCommonjsModule(function (module, exports) {





            exports.Buffer = Buffer;
            exports.SlowBuffer = SlowBuffer;
            exports.INSPECT_MAX_BYTES = 50;

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
            Buffer.TYPED_ARRAY_SUPPORT = commonjsGlobal.TYPED_ARRAY_SUPPORT !== undefined
              ? commonjsGlobal.TYPED_ARRAY_SUPPORT
              : typedArraySupport();

            /*
             * Export kMaxLength after typed array support is determined.
             */
            exports.kMaxLength = kMaxLength();

            function typedArraySupport () {
              try {
                var arr = new Uint8Array(1);
                arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }};
                return arr.foo() === 42 && // typed array instances can be augmented
                    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
                    arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
              } catch (e) {
                return false
              }
            }

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
              if (typeof Symbol !== 'undefined' && Symbol.species &&
                  Buffer[Symbol.species] === Buffer) {
                // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
                Object.defineProperty(Buffer, Symbol.species, {
                  value: null,
                  configurable: true
                });
              }
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
              if (Buffer.isBuffer(obj)) {
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

                if (obj.type === 'Buffer' && isarray(obj.data)) {
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

            function SlowBuffer (length) {
              if (+length != length) { // eslint-disable-line eqeqeq
                length = 0;
              }
              return Buffer.alloc(+length)
            }

            Buffer.isBuffer = function isBuffer (b) {
              return !!(b != null && b._isBuffer)
            };

            Buffer.compare = function compare (a, b) {
              if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
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
              if (!isarray(list)) {
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
                if (!Buffer.isBuffer(buf)) {
                  throw new TypeError('"list" argument must be an Array of Buffers')
                }
                buf.copy(buffer, pos);
                pos += buf.length;
              }
              return buffer
            };

            function byteLength (string, encoding) {
              if (Buffer.isBuffer(string)) {
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
              if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
              if (this === b) return true
              return Buffer.compare(this, b) === 0
            };

            Buffer.prototype.inspect = function inspect () {
              var str = '';
              var max = exports.INSPECT_MAX_BYTES;
              if (this.length > 0) {
                str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
                if (this.length > max) str += ' ... ';
              }
              return '<Buffer ' + str + '>'
            };

            Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
              if (!Buffer.isBuffer(target)) {
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
              if (Buffer.isBuffer(val)) {
                // Special case: looking for empty string/buffer always fails
                if (val.length === 0) {
                  return -1
                }
                return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
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
                return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
              }

              throw new TypeError('val must be string, number or Buffer')
            }

            function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
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
                return base64Js.fromByteArray(buf)
              } else {
                return base64Js.fromByteArray(buf.slice(start, end))
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
              return ieee754.read(this, offset, true, 23, 4)
            };

            Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 4, this.length);
              return ieee754.read(this, offset, false, 23, 4)
            };

            Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 8, this.length);
              return ieee754.read(this, offset, true, 52, 8)
            };

            Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
              if (!noAssert) checkOffset(offset, 8, this.length);
              return ieee754.read(this, offset, false, 52, 8)
            };

            function checkInt (buf, value, offset, ext, max, min) {
              if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
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
              ieee754.write(buf, value, offset, littleEndian, 23, 4);
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
              ieee754.write(buf, value, offset, littleEndian, 52, 8);
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
                var bytes = Buffer.isBuffer(val)
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
              return base64Js.toByteArray(base64clean(str))
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
            });
            var buffer_1 = buffer.Buffer;
            var buffer_2 = buffer.SlowBuffer;
            var buffer_3 = buffer.INSPECT_MAX_BYTES;
            var buffer_4 = buffer.kMaxLength;

            var Buffer$1 = bufferEs6.Buffer;

            var toArraybuffer = function (buf) {
            	// If the buffer is backed by a Uint8Array, a faster version will work
            	if (buf instanceof Uint8Array) {
            		// If the buffer isn't a subarray, return the underlying ArrayBuffer
            		if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
            			return buf.buffer
            		} else if (typeof buf.buffer.slice === 'function') {
            			// Otherwise we need to get a proper copy
            			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
            		}
            	}

            	if (Buffer$1.isBuffer(buf)) {
            		// This is the slow version that will work with any Buffer
            		// implementation (even in old browsers)
            		var arrayCopy = new Uint8Array(buf.length);
            		var len = buf.length;
            		for (var i = 0; i < len; i++) {
            			arrayCopy[i] = buf[i];
            		}
            		return arrayCopy.buffer
            	} else {
            		throw new Error('Argument must be a Buffer')
            	}
            };

            /**
             * Serialize a Headers instance into a pojo since it cannot be stringified.
             * @param {*} headers
             */
            function serializeHeaders(headers) {
              if (headers && typeof headers.forEach === 'function') {
                var serializedHeaders = {};
                headers.forEach(function (value, key) {
                  return serializedHeaders[key] = value;
                });
                return serializedHeaders;
              }

              return headers || {};
            }

            function ownKeys$2(object, enumerableOnly) { var keys = keys$1(object); if (getOwnPropertySymbols$1) { var symbols = getOwnPropertySymbols$1(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

            function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$1) { defineProperties$1(target, getOwnPropertyDescriptors$1(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

            function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct$2(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

            function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct$2) return false; if (construct$2.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct$2(Boolean, [], function () {})); return true; } catch (e) { return false; } }
            var defineProperty$4 = defineProperty$2;

            var IS_STUBBED = symbol$1();

            var ABORT_HANDLER = symbol$1();

            var REQUEST_ARGUMENTS = symbol$1();

            var FetchAdapter = /*#__PURE__*/function (_Adapter) {
              _inherits(FetchAdapter, _Adapter);

              var _super = _createSuper$1(FetchAdapter);

              function FetchAdapter() {
                _classCallCheck(this, FetchAdapter);

                return _super.apply(this, arguments);
              }

              _createClass(FetchAdapter, [{
                key: "defaultOptions",
                get: function get() {
                  return {
                    context: global$1
                  };
                }
              }, {
                key: "onConnect",
                value: function onConnect() {
                  var _this = this;

                  var context = this.options.context;

                  ['fetch', 'Request', 'Response', 'Headers'].forEach(function (key) {
                    return _this.assert("".concat(key, " global not found."), !!(context && context[key]));
                  });
                  this.assert('Running concurrent fetch adapters is unsupported, stop any running Polly instances.', !context.fetch[IS_STUBBED] && !context.Request[IS_STUBBED]);
                  this.nativeFetch = context.fetch;
                  this.NativeRequest = context.Request;
                  var NativeRequest = this.NativeRequest;
                  /*
                    Patch the Request constructor so we can store all the passed in options.
                    This allows us to access the `body` directly instead of having to do
                    `await req.blob()` as well as not having to hard code each option we want
                    to extract from the Request instance.
                  */

                  context.Request = function Request(url, options) {
                    var request = new NativeRequest(url, options);
                    var args;
                    options = options || {};
                    /*
                      The Request constructor can receive another Request instance as
                      the first argument so we use its arguments and merge it with the
                      new options.
                    */

                    if (_typeof(url) === 'object' && url[REQUEST_ARGUMENTS]) {
                      var reqArgs = url[REQUEST_ARGUMENTS];
                      args = _objectSpread$2(_objectSpread$2({}, reqArgs), {}, {
                        options: _objectSpread$2(_objectSpread$2({}, reqArgs.options), options)
                      });
                    } else {
                      args = {
                        url: url,
                        options: options
                      };
                    }

                    defineProperty$4(request, REQUEST_ARGUMENTS, {
                      value: args
                    }); // Override the clone method to use our overridden constructor

                    request.clone = function clone() {
                      return new context.Request(request);
                    };

                    return request;
                  };

                  defineProperty$4(context.Request, IS_STUBBED, {
                    value: true
                  });

                  context.fetch = function (url) {
                    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
                    var respond; // Support Request object

                    if (_typeof(url) === 'object' && url[REQUEST_ARGUMENTS]) {
                      var req = url;
                      var reqArgs = req[REQUEST_ARGUMENTS];
                      url = reqArgs.url;
                      options = _objectSpread$2(_objectSpread$2({}, reqArgs.options), options); // If a body exists in the Request instance, mimic reading the body

                      if ('body' in reqArgs.options) {
                        defineProperty$4(req, 'bodyUsed', {
                          value: true
                        });
                      }
                    }

                    var promise = new promise$1(function (resolve, reject) {
                      respond = function respond(_ref) {
                        var response = _ref.response,
                            error = _ref.error;

                        if (error) {
                          reject(error);
                        } else {
                          resolve(response);
                        }
                      };
                    });

                    _this.handleRequest({
                      url: url,
                      method: options.method || 'GET',
                      headers: serializeHeaders(new context.Headers(options.headers)),
                      body: options.body,
                      requestArguments: {
                        options: options,
                        respond: respond
                      }
                    });

                    return promise;
                  };

                  defineProperty$4(context.fetch, IS_STUBBED, {
                    value: true
                  });
                }
              }, {
                key: "onDisconnect",
                value: function onDisconnect() {
                  var context = this.options.context;
                  context.fetch = this.nativeFetch;
                  context.Request = this.NativeRequest;
                  this.nativeFetch = null;
                  this.NativeRequest = null;
                }
              }, {
                key: "onRequest",
                value: function onRequest(pollyRequest) {
                  var signal = pollyRequest.requestArguments.options.signal;

                  if (signal) {
                    if (signal.aborted) {
                      pollyRequest.abort();
                    } else {
                      pollyRequest[ABORT_HANDLER] = function () {
                        return pollyRequest.abort();
                      };

                      signal.addEventListener('abort', pollyRequest[ABORT_HANDLER]);
                    }
                  }
                }
              }, {
                key: "onFetchResponse",
                value: function () {
                  var _onFetchResponse = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(pollyRequest) {
                    var context, options, response, arrayBuffer, buffer, isBinaryBuffer;
                    return regenerator.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            context = this.options.context;
                            options = pollyRequest.requestArguments.options;
                            _context.next = 4;
                            return this.nativeFetch.apply(context, [pollyRequest.url, _objectSpread$2(_objectSpread$2({}, options), {}, {
                              method: pollyRequest.method,
                              headers: pollyRequest.headers,
                              body: pollyRequest.body
                            })]);

                          case 4:
                            response = _context.sent;
                            _context.next = 7;
                            return response.arrayBuffer();

                          case 7:
                            arrayBuffer = _context.sent;

                            /*
                              If the returned array buffer is not an instance of the global ArrayBuffer,
                              clone it in order to pass Buffer.from's instanceof check. This can happen
                              when using this adapter with a different context.
                               https://github.com/feross/buffer/issues/289
                            */
                            if (arrayBuffer && !(arrayBuffer instanceof ArrayBuffer) && 'byteLength' in arrayBuffer) {
                              arrayBuffer = cloneArrayBuffer(arrayBuffer);
                            }

                            buffer = buffer_1.from(arrayBuffer);
                            isBinaryBuffer = !isBufferUtf8Representable(buffer);
                            return _context.abrupt("return", {
                              statusCode: response.status,
                              headers: serializeHeaders(response.headers),
                              body: buffer.toString(isBinaryBuffer ? 'base64' : 'utf8'),
                              encoding: isBinaryBuffer ? 'base64' : undefined
                            });

                          case 12:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  function onFetchResponse(_x) {
                    return _onFetchResponse.apply(this, arguments);
                  }

                  return onFetchResponse;
                }()
              }, {
                key: "onRespond",
                value: function onRespond(pollyRequest, error) {
                  var Response = this.options.context.Response;
                  var _pollyRequest$request = pollyRequest.requestArguments,
                      respond = _pollyRequest$request.respond,
                      signal = _pollyRequest$request.options.signal;

                  if (signal && pollyRequest[ABORT_HANDLER]) {
                    signal.removeEventListener('abort', pollyRequest[ABORT_HANDLER]);
                  }

                  if (pollyRequest.aborted) {
                    respond({
                      error: new DOMException('The user aborted a request.', 'AbortError')
                    });
                    return;
                  }

                  if (error) {
                    respond({
                      error: error
                    });
                    return;
                  }

                  var absoluteUrl = pollyRequest.absoluteUrl,
                      pollyResponse = pollyRequest.response;
                  var statusCode = pollyResponse.statusCode,
                      body = pollyResponse.body,
                      encoding = pollyResponse.encoding;
                  var responseBody = body;

                  if (statusCode === 204 && responseBody === '') {
                    responseBody = null;
                  } else if (encoding) {
                    responseBody = toArraybuffer(buffer_1.from(body, encoding));
                  }

                  var response = new Response(responseBody, {
                    status: statusCode,
                    statusText: pollyResponse.statusText,
                    headers: pollyResponse.headers
                  });
                  /*
                    Response does not allow `url` to be set manually (either via the
                    constructor or assignment) so force the url property via `defineProperty`.
                  */

                  defineProperty$4(response, 'url', {
                    value: absoluteUrl
                  });
                  respond({
                    response: response
                  });
                }
              }], [{
                key: "id",
                get: function get() {
                  return 'fetch';
                }
              }]);

              return FetchAdapter;
            }(Adapter);

            return FetchAdapter;

}));