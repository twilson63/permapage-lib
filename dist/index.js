var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all7) => {
  for (var name2 in all7)
    __defProp(target, name2, { get: all7[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup2 = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code3.length; i < len; ++i) {
      lookup2[i] = code3[i];
      revLookup[code3.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(
          lookup2[tmp >> 2] + lookup2[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup2[tmp >> 10] + lookup2[tmp >> 4 & 63] + lookup2[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
  }
});

// node_modules/is-buffer/index.js
var require_is_buffer = __commonJS({
  "node_modules/is-buffer/index.js"(exports, module) {
    module.exports = function isBuffer2(obj) {
      return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    };
  }
});

// node_modules/extend/index.js
var require_extend = __commonJS({
  "node_modules/extend/index.js"(exports, module) {
    "use strict";
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject2 = function isPlainObject3(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key2;
      for (key2 in obj) {
      }
      return typeof key2 === "undefined" || hasOwn.call(obj, key2);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name2) {
      if (name2 === "__proto__") {
        if (!hasOwn.call(obj, name2)) {
          return void 0;
        } else if (gOPD) {
          return gOPD(obj, name2).value;
        }
      }
      return obj[name2];
    };
    module.exports = function extend2() {
      var options, name2, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (; i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name2 in options) {
            src = getProperty(target, name2);
            copy = getProperty(options, name2);
            if (target !== copy) {
              if (deep && copy && (isPlainObject2(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject2(src) ? src : {};
                }
                setProperty(target, { name: name2, newValue: extend2(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name: name2, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  }
});

// node_modules/boolbase/index.js
var require_boolbase = __commonJS({
  "node_modules/boolbase/index.js"(exports, module) {
    module.exports = {
      trueFunc: function trueFunc() {
        return true;
      },
      falseFunc: function falseFunc() {
        return false;
      }
    };
  }
});

// node_modules/css-selector-parser/lib/utils.js
var require_utils = __commonJS({
  "node_modules/css-selector-parser/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isIdentStart(c) {
      return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "-" || c === "_";
    }
    exports.isIdentStart = isIdentStart;
    function isIdent(c) {
      return c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "-" || c === "_";
    }
    exports.isIdent = isIdent;
    function isHex(c) {
      return c >= "a" && c <= "f" || c >= "A" && c <= "F" || c >= "0" && c <= "9";
    }
    exports.isHex = isHex;
    function escapeIdentifier(s2) {
      var len = s2.length;
      var result = "";
      var i = 0;
      while (i < len) {
        var chr = s2.charAt(i);
        if (exports.identSpecialChars[chr]) {
          result += "\\" + chr;
        } else {
          if (!(chr === "_" || chr === "-" || chr >= "A" && chr <= "Z" || chr >= "a" && chr <= "z" || i !== 0 && chr >= "0" && chr <= "9")) {
            var charCode = chr.charCodeAt(0);
            if ((charCode & 63488) === 55296) {
              var extraCharCode = s2.charCodeAt(i++);
              if ((charCode & 64512) !== 55296 || (extraCharCode & 64512) !== 56320) {
                throw Error("UCS-2(decode): illegal sequence");
              }
              charCode = ((charCode & 1023) << 10) + (extraCharCode & 1023) + 65536;
            }
            result += "\\" + charCode.toString(16) + " ";
          } else {
            result += chr;
          }
        }
        i++;
      }
      return result;
    }
    exports.escapeIdentifier = escapeIdentifier;
    function escapeStr(s2) {
      var len = s2.length;
      var result = "";
      var i = 0;
      var replacement;
      while (i < len) {
        var chr = s2.charAt(i);
        if (chr === '"') {
          chr = '\\"';
        } else if (chr === "\\") {
          chr = "\\\\";
        } else if ((replacement = exports.strReplacementsRev[chr]) !== void 0) {
          chr = replacement;
        }
        result += chr;
        i++;
      }
      return '"' + result + '"';
    }
    exports.escapeStr = escapeStr;
    exports.identSpecialChars = {
      "!": true,
      '"': true,
      "#": true,
      "$": true,
      "%": true,
      "&": true,
      "'": true,
      "(": true,
      ")": true,
      "*": true,
      "+": true,
      ",": true,
      ".": true,
      "/": true,
      ";": true,
      "<": true,
      "=": true,
      ">": true,
      "?": true,
      "@": true,
      "[": true,
      "\\": true,
      "]": true,
      "^": true,
      "`": true,
      "{": true,
      "|": true,
      "}": true,
      "~": true
    };
    exports.strReplacementsRev = {
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\f": "\\f",
      "\v": "\\v"
    };
    exports.singleQuoteEscapeChars = {
      n: "\n",
      r: "\r",
      t: "	",
      f: "\f",
      "\\": "\\",
      "'": "'"
    };
    exports.doubleQuotesEscapeChars = {
      n: "\n",
      r: "\r",
      t: "	",
      f: "\f",
      "\\": "\\",
      '"': '"'
    };
  }
});

// node_modules/css-selector-parser/lib/parser-context.js
var require_parser_context = __commonJS({
  "node_modules/css-selector-parser/lib/parser-context.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function parseCssSelector(str, pos, pseudos, attrEqualityMods, ruleNestingOperators, substitutesEnabled) {
      var l = str.length;
      var chr = "";
      function getStr(quote, escapeTable) {
        var result = "";
        pos++;
        chr = str.charAt(pos);
        while (pos < l) {
          if (chr === quote) {
            pos++;
            return result;
          } else if (chr === "\\") {
            pos++;
            chr = str.charAt(pos);
            var esc = void 0;
            if (chr === quote) {
              result += quote;
            } else if ((esc = escapeTable[chr]) !== void 0) {
              result += esc;
            } else if (utils_1.isHex(chr)) {
              var hex = chr;
              pos++;
              chr = str.charAt(pos);
              while (utils_1.isHex(chr)) {
                hex += chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (chr === " ") {
                pos++;
                chr = str.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            result += chr;
          }
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      }
      function getIdent() {
        var result = "";
        chr = str.charAt(pos);
        while (pos < l) {
          if (utils_1.isIdent(chr)) {
            result += chr;
          } else if (chr === "\\") {
            pos++;
            if (pos >= l) {
              throw Error("Expected symbol but end of file reached.");
            }
            chr = str.charAt(pos);
            if (utils_1.identSpecialChars[chr]) {
              result += chr;
            } else if (utils_1.isHex(chr)) {
              var hex = chr;
              pos++;
              chr = str.charAt(pos);
              while (utils_1.isHex(chr)) {
                hex += chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (chr === " ") {
                pos++;
                chr = str.charAt(pos);
              }
              result += String.fromCharCode(parseInt(hex, 16));
              continue;
            } else {
              result += chr;
            }
          } else {
            return result;
          }
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      }
      function skipWhitespace() {
        chr = str.charAt(pos);
        var result = false;
        while (chr === " " || chr === "	" || chr === "\n" || chr === "\r" || chr === "\f") {
          result = true;
          pos++;
          chr = str.charAt(pos);
        }
        return result;
      }
      function parse6() {
        var res = parseSelector2();
        if (pos < l) {
          throw Error('Rule expected but "' + str.charAt(pos) + '" found.');
        }
        return res;
      }
      function parseSelector2() {
        var selector = parseSingleSelector();
        if (!selector) {
          return null;
        }
        var res = selector;
        chr = str.charAt(pos);
        while (chr === ",") {
          pos++;
          skipWhitespace();
          if (res.type !== "selectors") {
            res = {
              type: "selectors",
              selectors: [selector]
            };
          }
          selector = parseSingleSelector();
          if (!selector) {
            throw Error('Rule expected after ",".');
          }
          res.selectors.push(selector);
        }
        return res;
      }
      function parseSingleSelector() {
        skipWhitespace();
        var selector = {
          type: "ruleSet"
        };
        var rule = parseRule();
        if (!rule) {
          return null;
        }
        var currentRule = selector;
        while (rule) {
          rule.type = "rule";
          currentRule.rule = rule;
          currentRule = rule;
          skipWhitespace();
          chr = str.charAt(pos);
          if (pos >= l || chr === "," || chr === ")") {
            break;
          }
          if (ruleNestingOperators[chr]) {
            var op = chr;
            pos++;
            skipWhitespace();
            rule = parseRule();
            if (!rule) {
              throw Error('Rule expected after "' + op + '".');
            }
            rule.nestingOperator = op;
          } else {
            rule = parseRule();
            if (rule) {
              rule.nestingOperator = null;
            }
          }
        }
        return selector;
      }
      function parseRule() {
        var rule = null;
        while (pos < l) {
          chr = str.charAt(pos);
          if (chr === "*") {
            pos++;
            (rule = rule || {}).tagName = "*";
          } else if (utils_1.isIdentStart(chr) || chr === "\\") {
            (rule = rule || {}).tagName = getIdent();
          } else if (chr === ".") {
            pos++;
            rule = rule || {};
            (rule.classNames = rule.classNames || []).push(getIdent());
          } else if (chr === "#") {
            pos++;
            (rule = rule || {}).id = getIdent();
          } else if (chr === "[") {
            pos++;
            skipWhitespace();
            var attr = {
              name: getIdent()
            };
            skipWhitespace();
            if (chr === "]") {
              pos++;
            } else {
              var operator = "";
              if (attrEqualityMods[chr]) {
                operator = chr;
                pos++;
                chr = str.charAt(pos);
              }
              if (pos >= l) {
                throw Error('Expected "=" but end of file reached.');
              }
              if (chr !== "=") {
                throw Error('Expected "=" but "' + chr + '" found.');
              }
              attr.operator = operator + "=";
              pos++;
              skipWhitespace();
              var attrValue = "";
              attr.valueType = "string";
              if (chr === '"') {
                attrValue = getStr('"', utils_1.doubleQuotesEscapeChars);
              } else if (chr === "'") {
                attrValue = getStr("'", utils_1.singleQuoteEscapeChars);
              } else if (substitutesEnabled && chr === "$") {
                pos++;
                attrValue = getIdent();
                attr.valueType = "substitute";
              } else {
                while (pos < l) {
                  if (chr === "]") {
                    break;
                  }
                  attrValue += chr;
                  pos++;
                  chr = str.charAt(pos);
                }
                attrValue = attrValue.trim();
              }
              skipWhitespace();
              if (pos >= l) {
                throw Error('Expected "]" but end of file reached.');
              }
              if (chr !== "]") {
                throw Error('Expected "]" but "' + chr + '" found.');
              }
              pos++;
              attr.value = attrValue;
            }
            rule = rule || {};
            (rule.attrs = rule.attrs || []).push(attr);
          } else if (chr === ":") {
            pos++;
            var pseudoName = getIdent();
            var pseudo2 = {
              name: pseudoName
            };
            if (chr === "(") {
              pos++;
              var value = "";
              skipWhitespace();
              if (pseudos[pseudoName] === "selector") {
                pseudo2.valueType = "selector";
                value = parseSelector2();
              } else {
                pseudo2.valueType = pseudos[pseudoName] || "string";
                if (chr === '"') {
                  value = getStr('"', utils_1.doubleQuotesEscapeChars);
                } else if (chr === "'") {
                  value = getStr("'", utils_1.singleQuoteEscapeChars);
                } else if (substitutesEnabled && chr === "$") {
                  pos++;
                  value = getIdent();
                  pseudo2.valueType = "substitute";
                } else {
                  while (pos < l) {
                    if (chr === ")") {
                      break;
                    }
                    value += chr;
                    pos++;
                    chr = str.charAt(pos);
                  }
                  value = value.trim();
                }
                skipWhitespace();
              }
              if (pos >= l) {
                throw Error('Expected ")" but end of file reached.');
              }
              if (chr !== ")") {
                throw Error('Expected ")" but "' + chr + '" found.');
              }
              pos++;
              pseudo2.value = value;
            }
            rule = rule || {};
            (rule.pseudos = rule.pseudos || []).push(pseudo2);
          } else {
            break;
          }
        }
        return rule;
      }
      return parse6();
    }
    exports.parseCssSelector = parseCssSelector;
  }
});

// node_modules/css-selector-parser/lib/render.js
var require_render = __commonJS({
  "node_modules/css-selector-parser/lib/render.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require_utils();
    function renderEntity(entity) {
      var res = "";
      switch (entity.type) {
        case "ruleSet":
          var currentEntity = entity.rule;
          var parts = [];
          while (currentEntity) {
            if (currentEntity.nestingOperator) {
              parts.push(currentEntity.nestingOperator);
            }
            parts.push(renderEntity(currentEntity));
            currentEntity = currentEntity.rule;
          }
          res = parts.join(" ");
          break;
        case "selectors":
          res = entity.selectors.map(renderEntity).join(", ");
          break;
        case "rule":
          if (entity.tagName) {
            if (entity.tagName === "*") {
              res = "*";
            } else {
              res = utils_1.escapeIdentifier(entity.tagName);
            }
          }
          if (entity.id) {
            res += "#" + utils_1.escapeIdentifier(entity.id);
          }
          if (entity.classNames) {
            res += entity.classNames.map(function(cn) {
              return "." + utils_1.escapeIdentifier(cn);
            }).join("");
          }
          if (entity.attrs) {
            res += entity.attrs.map(function(attr) {
              if ("operator" in attr) {
                if (attr.valueType === "substitute") {
                  return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + "$" + attr.value + "]";
                } else {
                  return "[" + utils_1.escapeIdentifier(attr.name) + attr.operator + utils_1.escapeStr(attr.value) + "]";
                }
              } else {
                return "[" + utils_1.escapeIdentifier(attr.name) + "]";
              }
            }).join("");
          }
          if (entity.pseudos) {
            res += entity.pseudos.map(function(pseudo2) {
              if (pseudo2.valueType) {
                if (pseudo2.valueType === "selector") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + renderEntity(pseudo2.value) + ")";
                } else if (pseudo2.valueType === "substitute") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "($" + pseudo2.value + ")";
                } else if (pseudo2.valueType === "numeric") {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + pseudo2.value + ")";
                } else {
                  return ":" + utils_1.escapeIdentifier(pseudo2.name) + "(" + utils_1.escapeIdentifier(pseudo2.value) + ")";
                }
              } else {
                return ":" + utils_1.escapeIdentifier(pseudo2.name);
              }
            }).join("");
          }
          break;
        default:
          throw Error('Unknown entity type: "' + entity.type + '".');
      }
      return res;
    }
    exports.renderEntity = renderEntity;
  }
});

// node_modules/css-selector-parser/lib/index.js
var require_lib = __commonJS({
  "node_modules/css-selector-parser/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var parser_context_1 = require_parser_context();
    var render_1 = require_render();
    var CssSelectorParser2 = (
      /** @class */
      function() {
        function CssSelectorParser3() {
          this.pseudos = {};
          this.attrEqualityMods = {};
          this.ruleNestingOperators = {};
          this.substitutesEnabled = false;
        }
        CssSelectorParser3.prototype.registerSelectorPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_1 = pseudos; _a < pseudos_1.length; _a++) {
            var pseudo2 = pseudos_1[_a];
            this.pseudos[pseudo2] = "selector";
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterSelectorPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_2 = pseudos; _a < pseudos_2.length; _a++) {
            var pseudo2 = pseudos_2[_a];
            delete this.pseudos[pseudo2];
          }
          return this;
        };
        CssSelectorParser3.prototype.registerNumericPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_3 = pseudos; _a < pseudos_3.length; _a++) {
            var pseudo2 = pseudos_3[_a];
            this.pseudos[pseudo2] = "numeric";
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterNumericPseudos = function() {
          var pseudos = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            pseudos[_i] = arguments[_i];
          }
          for (var _a = 0, pseudos_4 = pseudos; _a < pseudos_4.length; _a++) {
            var pseudo2 = pseudos_4[_a];
            delete this.pseudos[pseudo2];
          }
          return this;
        };
        CssSelectorParser3.prototype.registerNestingOperators = function() {
          var operators = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
          }
          for (var _a = 0, operators_1 = operators; _a < operators_1.length; _a++) {
            var operator = operators_1[_a];
            this.ruleNestingOperators[operator] = true;
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterNestingOperators = function() {
          var operators = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            operators[_i] = arguments[_i];
          }
          for (var _a = 0, operators_2 = operators; _a < operators_2.length; _a++) {
            var operator = operators_2[_a];
            delete this.ruleNestingOperators[operator];
          }
          return this;
        };
        CssSelectorParser3.prototype.registerAttrEqualityMods = function() {
          var mods = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
          }
          for (var _a = 0, mods_1 = mods; _a < mods_1.length; _a++) {
            var mod = mods_1[_a];
            this.attrEqualityMods[mod] = true;
          }
          return this;
        };
        CssSelectorParser3.prototype.unregisterAttrEqualityMods = function() {
          var mods = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            mods[_i] = arguments[_i];
          }
          for (var _a = 0, mods_2 = mods; _a < mods_2.length; _a++) {
            var mod = mods_2[_a];
            delete this.attrEqualityMods[mod];
          }
          return this;
        };
        CssSelectorParser3.prototype.enableSubstitutes = function() {
          this.substitutesEnabled = true;
          return this;
        };
        CssSelectorParser3.prototype.disableSubstitutes = function() {
          this.substitutesEnabled = false;
          return this;
        };
        CssSelectorParser3.prototype.parse = function(str) {
          return parser_context_1.parseCssSelector(str, 0, this.pseudos, this.attrEqualityMods, this.ruleNestingOperators, this.substitutesEnabled);
        };
        CssSelectorParser3.prototype.render = function(path5) {
          return render_1.renderEntity(path5).trim();
        };
        return CssSelectorParser3;
      }()
    );
    exports.CssSelectorParser = CssSelectorParser2;
  }
});

// node_modules/parse5/lib/common/unicode.js
var require_unicode = __commonJS({
  "node_modules/parse5/lib/common/unicode.js"(exports) {
    "use strict";
    var UNDEFINED_CODE_POINTS = [
      65534,
      65535,
      131070,
      131071,
      196606,
      196607,
      262142,
      262143,
      327678,
      327679,
      393214,
      393215,
      458750,
      458751,
      524286,
      524287,
      589822,
      589823,
      655358,
      655359,
      720894,
      720895,
      786430,
      786431,
      851966,
      851967,
      917502,
      917503,
      983038,
      983039,
      1048574,
      1048575,
      1114110,
      1114111
    ];
    exports.REPLACEMENT_CHARACTER = "\uFFFD";
    exports.CODE_POINTS = {
      EOF: -1,
      NULL: 0,
      TABULATION: 9,
      CARRIAGE_RETURN: 13,
      LINE_FEED: 10,
      FORM_FEED: 12,
      SPACE: 32,
      EXCLAMATION_MARK: 33,
      QUOTATION_MARK: 34,
      NUMBER_SIGN: 35,
      AMPERSAND: 38,
      APOSTROPHE: 39,
      HYPHEN_MINUS: 45,
      SOLIDUS: 47,
      DIGIT_0: 48,
      DIGIT_9: 57,
      SEMICOLON: 59,
      LESS_THAN_SIGN: 60,
      EQUALS_SIGN: 61,
      GREATER_THAN_SIGN: 62,
      QUESTION_MARK: 63,
      LATIN_CAPITAL_A: 65,
      LATIN_CAPITAL_F: 70,
      LATIN_CAPITAL_X: 88,
      LATIN_CAPITAL_Z: 90,
      RIGHT_SQUARE_BRACKET: 93,
      GRAVE_ACCENT: 96,
      LATIN_SMALL_A: 97,
      LATIN_SMALL_F: 102,
      LATIN_SMALL_X: 120,
      LATIN_SMALL_Z: 122,
      REPLACEMENT_CHARACTER: 65533
    };
    exports.CODE_POINT_SEQUENCES = {
      DASH_DASH_STRING: [45, 45],
      //--
      DOCTYPE_STRING: [68, 79, 67, 84, 89, 80, 69],
      //DOCTYPE
      CDATA_START_STRING: [91, 67, 68, 65, 84, 65, 91],
      //[CDATA[
      SCRIPT_STRING: [115, 99, 114, 105, 112, 116],
      //script
      PUBLIC_STRING: [80, 85, 66, 76, 73, 67],
      //PUBLIC
      SYSTEM_STRING: [83, 89, 83, 84, 69, 77]
      //SYSTEM
    };
    exports.isSurrogate = function(cp) {
      return cp >= 55296 && cp <= 57343;
    };
    exports.isSurrogatePair = function(cp) {
      return cp >= 56320 && cp <= 57343;
    };
    exports.getSurrogatePairCodePoint = function(cp1, cp2) {
      return (cp1 - 55296) * 1024 + 9216 + cp2;
    };
    exports.isControlCodePoint = function(cp) {
      return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
    };
    exports.isUndefinedCodePoint = function(cp) {
      return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.indexOf(cp) > -1;
    };
  }
});

// node_modules/parse5/lib/common/error-codes.js
var require_error_codes = __commonJS({
  "node_modules/parse5/lib/common/error-codes.js"(exports, module) {
    "use strict";
    module.exports = {
      controlCharacterInInputStream: "control-character-in-input-stream",
      noncharacterInInputStream: "noncharacter-in-input-stream",
      surrogateInInputStream: "surrogate-in-input-stream",
      nonVoidHtmlElementStartTagWithTrailingSolidus: "non-void-html-element-start-tag-with-trailing-solidus",
      endTagWithAttributes: "end-tag-with-attributes",
      endTagWithTrailingSolidus: "end-tag-with-trailing-solidus",
      unexpectedSolidusInTag: "unexpected-solidus-in-tag",
      unexpectedNullCharacter: "unexpected-null-character",
      unexpectedQuestionMarkInsteadOfTagName: "unexpected-question-mark-instead-of-tag-name",
      invalidFirstCharacterOfTagName: "invalid-first-character-of-tag-name",
      unexpectedEqualsSignBeforeAttributeName: "unexpected-equals-sign-before-attribute-name",
      missingEndTagName: "missing-end-tag-name",
      unexpectedCharacterInAttributeName: "unexpected-character-in-attribute-name",
      unknownNamedCharacterReference: "unknown-named-character-reference",
      missingSemicolonAfterCharacterReference: "missing-semicolon-after-character-reference",
      unexpectedCharacterAfterDoctypeSystemIdentifier: "unexpected-character-after-doctype-system-identifier",
      unexpectedCharacterInUnquotedAttributeValue: "unexpected-character-in-unquoted-attribute-value",
      eofBeforeTagName: "eof-before-tag-name",
      eofInTag: "eof-in-tag",
      missingAttributeValue: "missing-attribute-value",
      missingWhitespaceBetweenAttributes: "missing-whitespace-between-attributes",
      missingWhitespaceAfterDoctypePublicKeyword: "missing-whitespace-after-doctype-public-keyword",
      missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: "missing-whitespace-between-doctype-public-and-system-identifiers",
      missingWhitespaceAfterDoctypeSystemKeyword: "missing-whitespace-after-doctype-system-keyword",
      missingQuoteBeforeDoctypePublicIdentifier: "missing-quote-before-doctype-public-identifier",
      missingQuoteBeforeDoctypeSystemIdentifier: "missing-quote-before-doctype-system-identifier",
      missingDoctypePublicIdentifier: "missing-doctype-public-identifier",
      missingDoctypeSystemIdentifier: "missing-doctype-system-identifier",
      abruptDoctypePublicIdentifier: "abrupt-doctype-public-identifier",
      abruptDoctypeSystemIdentifier: "abrupt-doctype-system-identifier",
      cdataInHtmlContent: "cdata-in-html-content",
      incorrectlyOpenedComment: "incorrectly-opened-comment",
      eofInScriptHtmlCommentLikeText: "eof-in-script-html-comment-like-text",
      eofInDoctype: "eof-in-doctype",
      nestedComment: "nested-comment",
      abruptClosingOfEmptyComment: "abrupt-closing-of-empty-comment",
      eofInComment: "eof-in-comment",
      incorrectlyClosedComment: "incorrectly-closed-comment",
      eofInCdata: "eof-in-cdata",
      absenceOfDigitsInNumericCharacterReference: "absence-of-digits-in-numeric-character-reference",
      nullCharacterReference: "null-character-reference",
      surrogateCharacterReference: "surrogate-character-reference",
      characterReferenceOutsideUnicodeRange: "character-reference-outside-unicode-range",
      controlCharacterReference: "control-character-reference",
      noncharacterCharacterReference: "noncharacter-character-reference",
      missingWhitespaceBeforeDoctypeName: "missing-whitespace-before-doctype-name",
      missingDoctypeName: "missing-doctype-name",
      invalidCharacterSequenceAfterDoctypeName: "invalid-character-sequence-after-doctype-name",
      duplicateAttribute: "duplicate-attribute",
      nonConformingDoctype: "non-conforming-doctype",
      missingDoctype: "missing-doctype",
      misplacedDoctype: "misplaced-doctype",
      endTagWithoutMatchingOpenElement: "end-tag-without-matching-open-element",
      closingOfElementWithOpenChildElements: "closing-of-element-with-open-child-elements",
      disallowedContentInNoscriptInHead: "disallowed-content-in-noscript-in-head",
      openElementsLeftAfterEof: "open-elements-left-after-eof",
      abandonedHeadElementChild: "abandoned-head-element-child",
      misplacedStartTagForHeadElement: "misplaced-start-tag-for-head-element",
      nestedNoscriptInHead: "nested-noscript-in-head",
      eofInElementThatCanContainOnlyText: "eof-in-element-that-can-contain-only-text"
    };
  }
});

// node_modules/parse5/lib/tokenizer/preprocessor.js
var require_preprocessor = __commonJS({
  "node_modules/parse5/lib/tokenizer/preprocessor.js"(exports, module) {
    "use strict";
    var unicode = require_unicode();
    var ERR = require_error_codes();
    var $ = unicode.CODE_POINTS;
    var DEFAULT_BUFFER_WATERLINE = 1 << 16;
    var Preprocessor = class {
      constructor() {
        this.html = null;
        this.pos = -1;
        this.lastGapPos = -1;
        this.lastCharPos = -1;
        this.gapStack = [];
        this.skipNextNewLine = false;
        this.lastChunkWritten = false;
        this.endOfChunkHit = false;
        this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
      }
      _err() {
      }
      _addGap() {
        this.gapStack.push(this.lastGapPos);
        this.lastGapPos = this.pos;
      }
      _processSurrogate(cp) {
        if (this.pos !== this.lastCharPos) {
          const nextCp = this.html.charCodeAt(this.pos + 1);
          if (unicode.isSurrogatePair(nextCp)) {
            this.pos++;
            this._addGap();
            return unicode.getSurrogatePairCodePoint(cp, nextCp);
          }
        } else if (!this.lastChunkWritten) {
          this.endOfChunkHit = true;
          return $.EOF;
        }
        this._err(ERR.surrogateInInputStream);
        return cp;
      }
      dropParsedChunk() {
        if (this.pos > this.bufferWaterline) {
          this.lastCharPos -= this.pos;
          this.html = this.html.substring(this.pos);
          this.pos = 0;
          this.lastGapPos = -1;
          this.gapStack = [];
        }
      }
      write(chunk, isLastChunk) {
        if (this.html) {
          this.html += chunk;
        } else {
          this.html = chunk;
        }
        this.lastCharPos = this.html.length - 1;
        this.endOfChunkHit = false;
        this.lastChunkWritten = isLastChunk;
      }
      insertHtmlAtCurrentPos(chunk) {
        this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1, this.html.length);
        this.lastCharPos = this.html.length - 1;
        this.endOfChunkHit = false;
      }
      advance() {
        this.pos++;
        if (this.pos > this.lastCharPos) {
          this.endOfChunkHit = !this.lastChunkWritten;
          return $.EOF;
        }
        let cp = this.html.charCodeAt(this.pos);
        if (this.skipNextNewLine && cp === $.LINE_FEED) {
          this.skipNextNewLine = false;
          this._addGap();
          return this.advance();
        }
        if (cp === $.CARRIAGE_RETURN) {
          this.skipNextNewLine = true;
          return $.LINE_FEED;
        }
        this.skipNextNewLine = false;
        if (unicode.isSurrogate(cp)) {
          cp = this._processSurrogate(cp);
        }
        const isCommonValidRange = cp > 31 && cp < 127 || cp === $.LINE_FEED || cp === $.CARRIAGE_RETURN || cp > 159 && cp < 64976;
        if (!isCommonValidRange) {
          this._checkForProblematicCharacters(cp);
        }
        return cp;
      }
      _checkForProblematicCharacters(cp) {
        if (unicode.isControlCodePoint(cp)) {
          this._err(ERR.controlCharacterInInputStream);
        } else if (unicode.isUndefinedCodePoint(cp)) {
          this._err(ERR.noncharacterInInputStream);
        }
      }
      retreat() {
        if (this.pos === this.lastGapPos) {
          this.lastGapPos = this.gapStack.pop();
          this.pos--;
        }
        this.pos--;
      }
    };
    module.exports = Preprocessor;
  }
});

// node_modules/parse5/lib/tokenizer/named-entity-data.js
var require_named_entity_data = __commonJS({
  "node_modules/parse5/lib/tokenizer/named-entity-data.js"(exports, module) {
    "use strict";
    module.exports = new Uint16Array([4, 52, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 106, 303, 412, 810, 1432, 1701, 1796, 1987, 2114, 2360, 2420, 2484, 3170, 3251, 4140, 4393, 4575, 4610, 5106, 5512, 5728, 6117, 6274, 6315, 6345, 6427, 6516, 7002, 7910, 8733, 9323, 9870, 10170, 10631, 10893, 11318, 11386, 11467, 12773, 13092, 14474, 14922, 15448, 15542, 16419, 17666, 18166, 18611, 19004, 19095, 19298, 19397, 4, 16, 69, 77, 97, 98, 99, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 140, 150, 158, 169, 176, 194, 199, 210, 216, 222, 226, 242, 256, 266, 283, 294, 108, 105, 103, 5, 198, 1, 59, 148, 1, 198, 80, 5, 38, 1, 59, 156, 1, 38, 99, 117, 116, 101, 5, 193, 1, 59, 167, 1, 193, 114, 101, 118, 101, 59, 1, 258, 4, 2, 105, 121, 182, 191, 114, 99, 5, 194, 1, 59, 189, 1, 194, 59, 1, 1040, 114, 59, 3, 55349, 56580, 114, 97, 118, 101, 5, 192, 1, 59, 208, 1, 192, 112, 104, 97, 59, 1, 913, 97, 99, 114, 59, 1, 256, 100, 59, 1, 10835, 4, 2, 103, 112, 232, 237, 111, 110, 59, 1, 260, 102, 59, 3, 55349, 56632, 112, 108, 121, 70, 117, 110, 99, 116, 105, 111, 110, 59, 1, 8289, 105, 110, 103, 5, 197, 1, 59, 264, 1, 197, 4, 2, 99, 115, 272, 277, 114, 59, 3, 55349, 56476, 105, 103, 110, 59, 1, 8788, 105, 108, 100, 101, 5, 195, 1, 59, 292, 1, 195, 109, 108, 5, 196, 1, 59, 301, 1, 196, 4, 8, 97, 99, 101, 102, 111, 114, 115, 117, 321, 350, 354, 383, 388, 394, 400, 405, 4, 2, 99, 114, 327, 336, 107, 115, 108, 97, 115, 104, 59, 1, 8726, 4, 2, 118, 119, 342, 345, 59, 1, 10983, 101, 100, 59, 1, 8966, 121, 59, 1, 1041, 4, 3, 99, 114, 116, 362, 369, 379, 97, 117, 115, 101, 59, 1, 8757, 110, 111, 117, 108, 108, 105, 115, 59, 1, 8492, 97, 59, 1, 914, 114, 59, 3, 55349, 56581, 112, 102, 59, 3, 55349, 56633, 101, 118, 101, 59, 1, 728, 99, 114, 59, 1, 8492, 109, 112, 101, 113, 59, 1, 8782, 4, 14, 72, 79, 97, 99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 117, 442, 447, 456, 504, 542, 547, 569, 573, 577, 616, 678, 784, 790, 796, 99, 121, 59, 1, 1063, 80, 89, 5, 169, 1, 59, 454, 1, 169, 4, 3, 99, 112, 121, 464, 470, 497, 117, 116, 101, 59, 1, 262, 4, 2, 59, 105, 476, 478, 1, 8914, 116, 97, 108, 68, 105, 102, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 1, 8517, 108, 101, 121, 115, 59, 1, 8493, 4, 4, 97, 101, 105, 111, 514, 520, 530, 535, 114, 111, 110, 59, 1, 268, 100, 105, 108, 5, 199, 1, 59, 528, 1, 199, 114, 99, 59, 1, 264, 110, 105, 110, 116, 59, 1, 8752, 111, 116, 59, 1, 266, 4, 2, 100, 110, 553, 560, 105, 108, 108, 97, 59, 1, 184, 116, 101, 114, 68, 111, 116, 59, 1, 183, 114, 59, 1, 8493, 105, 59, 1, 935, 114, 99, 108, 101, 4, 4, 68, 77, 80, 84, 591, 596, 603, 609, 111, 116, 59, 1, 8857, 105, 110, 117, 115, 59, 1, 8854, 108, 117, 115, 59, 1, 8853, 105, 109, 101, 115, 59, 1, 8855, 111, 4, 2, 99, 115, 623, 646, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8754, 101, 67, 117, 114, 108, 121, 4, 2, 68, 81, 658, 671, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 1, 8221, 117, 111, 116, 101, 59, 1, 8217, 4, 4, 108, 110, 112, 117, 688, 701, 736, 753, 111, 110, 4, 2, 59, 101, 696, 698, 1, 8759, 59, 1, 10868, 4, 3, 103, 105, 116, 709, 717, 722, 114, 117, 101, 110, 116, 59, 1, 8801, 110, 116, 59, 1, 8751, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8750, 4, 2, 102, 114, 742, 745, 59, 1, 8450, 111, 100, 117, 99, 116, 59, 1, 8720, 110, 116, 101, 114, 67, 108, 111, 99, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8755, 111, 115, 115, 59, 1, 10799, 99, 114, 59, 3, 55349, 56478, 112, 4, 2, 59, 67, 803, 805, 1, 8915, 97, 112, 59, 1, 8781, 4, 11, 68, 74, 83, 90, 97, 99, 101, 102, 105, 111, 115, 834, 850, 855, 860, 865, 888, 903, 916, 921, 1011, 1415, 4, 2, 59, 111, 840, 842, 1, 8517, 116, 114, 97, 104, 100, 59, 1, 10513, 99, 121, 59, 1, 1026, 99, 121, 59, 1, 1029, 99, 121, 59, 1, 1039, 4, 3, 103, 114, 115, 873, 879, 883, 103, 101, 114, 59, 1, 8225, 114, 59, 1, 8609, 104, 118, 59, 1, 10980, 4, 2, 97, 121, 894, 900, 114, 111, 110, 59, 1, 270, 59, 1, 1044, 108, 4, 2, 59, 116, 910, 912, 1, 8711, 97, 59, 1, 916, 114, 59, 3, 55349, 56583, 4, 2, 97, 102, 927, 998, 4, 2, 99, 109, 933, 992, 114, 105, 116, 105, 99, 97, 108, 4, 4, 65, 68, 71, 84, 950, 957, 978, 985, 99, 117, 116, 101, 59, 1, 180, 111, 4, 2, 116, 117, 964, 967, 59, 1, 729, 98, 108, 101, 65, 99, 117, 116, 101, 59, 1, 733, 114, 97, 118, 101, 59, 1, 96, 105, 108, 100, 101, 59, 1, 732, 111, 110, 100, 59, 1, 8900, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 1, 8518, 4, 4, 112, 116, 117, 119, 1021, 1026, 1048, 1249, 102, 59, 3, 55349, 56635, 4, 3, 59, 68, 69, 1034, 1036, 1041, 1, 168, 111, 116, 59, 1, 8412, 113, 117, 97, 108, 59, 1, 8784, 98, 108, 101, 4, 6, 67, 68, 76, 82, 85, 86, 1065, 1082, 1101, 1189, 1211, 1236, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8751, 111, 4, 2, 116, 119, 1089, 1092, 59, 1, 168, 110, 65, 114, 114, 111, 119, 59, 1, 8659, 4, 2, 101, 111, 1107, 1141, 102, 116, 4, 3, 65, 82, 84, 1117, 1124, 1136, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8660, 101, 101, 59, 1, 10980, 110, 103, 4, 2, 76, 82, 1149, 1177, 101, 102, 116, 4, 2, 65, 82, 1158, 1165, 114, 114, 111, 119, 59, 1, 10232, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10234, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10233, 105, 103, 104, 116, 4, 2, 65, 84, 1199, 1206, 114, 114, 111, 119, 59, 1, 8658, 101, 101, 59, 1, 8872, 112, 4, 2, 65, 68, 1218, 1225, 114, 114, 111, 119, 59, 1, 8657, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8661, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8741, 110, 4, 6, 65, 66, 76, 82, 84, 97, 1264, 1292, 1299, 1352, 1391, 1408, 114, 114, 111, 119, 4, 3, 59, 66, 85, 1276, 1278, 1283, 1, 8595, 97, 114, 59, 1, 10515, 112, 65, 114, 114, 111, 119, 59, 1, 8693, 114, 101, 118, 101, 59, 1, 785, 101, 102, 116, 4, 3, 82, 84, 86, 1310, 1323, 1334, 105, 103, 104, 116, 86, 101, 99, 116, 111, 114, 59, 1, 10576, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10590, 101, 99, 116, 111, 114, 4, 2, 59, 66, 1345, 1347, 1, 8637, 97, 114, 59, 1, 10582, 105, 103, 104, 116, 4, 2, 84, 86, 1362, 1373, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10591, 101, 99, 116, 111, 114, 4, 2, 59, 66, 1384, 1386, 1, 8641, 97, 114, 59, 1, 10583, 101, 101, 4, 2, 59, 65, 1399, 1401, 1, 8868, 114, 114, 111, 119, 59, 1, 8615, 114, 114, 111, 119, 59, 1, 8659, 4, 2, 99, 116, 1421, 1426, 114, 59, 3, 55349, 56479, 114, 111, 107, 59, 1, 272, 4, 16, 78, 84, 97, 99, 100, 102, 103, 108, 109, 111, 112, 113, 115, 116, 117, 120, 1466, 1470, 1478, 1489, 1515, 1520, 1525, 1536, 1544, 1593, 1609, 1617, 1650, 1664, 1668, 1677, 71, 59, 1, 330, 72, 5, 208, 1, 59, 1476, 1, 208, 99, 117, 116, 101, 5, 201, 1, 59, 1487, 1, 201, 4, 3, 97, 105, 121, 1497, 1503, 1512, 114, 111, 110, 59, 1, 282, 114, 99, 5, 202, 1, 59, 1510, 1, 202, 59, 1, 1069, 111, 116, 59, 1, 278, 114, 59, 3, 55349, 56584, 114, 97, 118, 101, 5, 200, 1, 59, 1534, 1, 200, 101, 109, 101, 110, 116, 59, 1, 8712, 4, 2, 97, 112, 1550, 1555, 99, 114, 59, 1, 274, 116, 121, 4, 2, 83, 86, 1563, 1576, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9723, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9643, 4, 2, 103, 112, 1599, 1604, 111, 110, 59, 1, 280, 102, 59, 3, 55349, 56636, 115, 105, 108, 111, 110, 59, 1, 917, 117, 4, 2, 97, 105, 1624, 1640, 108, 4, 2, 59, 84, 1631, 1633, 1, 10869, 105, 108, 100, 101, 59, 1, 8770, 108, 105, 98, 114, 105, 117, 109, 59, 1, 8652, 4, 2, 99, 105, 1656, 1660, 114, 59, 1, 8496, 109, 59, 1, 10867, 97, 59, 1, 919, 109, 108, 5, 203, 1, 59, 1675, 1, 203, 4, 2, 105, 112, 1683, 1689, 115, 116, 115, 59, 1, 8707, 111, 110, 101, 110, 116, 105, 97, 108, 69, 59, 1, 8519, 4, 5, 99, 102, 105, 111, 115, 1713, 1717, 1722, 1762, 1791, 121, 59, 1, 1060, 114, 59, 3, 55349, 56585, 108, 108, 101, 100, 4, 2, 83, 86, 1732, 1745, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9724, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9642, 4, 3, 112, 114, 117, 1770, 1775, 1781, 102, 59, 3, 55349, 56637, 65, 108, 108, 59, 1, 8704, 114, 105, 101, 114, 116, 114, 102, 59, 1, 8497, 99, 114, 59, 1, 8497, 4, 12, 74, 84, 97, 98, 99, 100, 102, 103, 111, 114, 115, 116, 1822, 1827, 1834, 1848, 1855, 1877, 1882, 1887, 1890, 1896, 1978, 1984, 99, 121, 59, 1, 1027, 5, 62, 1, 59, 1832, 1, 62, 109, 109, 97, 4, 2, 59, 100, 1843, 1845, 1, 915, 59, 1, 988, 114, 101, 118, 101, 59, 1, 286, 4, 3, 101, 105, 121, 1863, 1869, 1874, 100, 105, 108, 59, 1, 290, 114, 99, 59, 1, 284, 59, 1, 1043, 111, 116, 59, 1, 288, 114, 59, 3, 55349, 56586, 59, 1, 8921, 112, 102, 59, 3, 55349, 56638, 101, 97, 116, 101, 114, 4, 6, 69, 70, 71, 76, 83, 84, 1915, 1933, 1944, 1953, 1959, 1971, 113, 117, 97, 108, 4, 2, 59, 76, 1925, 1927, 1, 8805, 101, 115, 115, 59, 1, 8923, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8807, 114, 101, 97, 116, 101, 114, 59, 1, 10914, 101, 115, 115, 59, 1, 8823, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 10878, 105, 108, 100, 101, 59, 1, 8819, 99, 114, 59, 3, 55349, 56482, 59, 1, 8811, 4, 8, 65, 97, 99, 102, 105, 111, 115, 117, 2005, 2012, 2026, 2032, 2036, 2049, 2073, 2089, 82, 68, 99, 121, 59, 1, 1066, 4, 2, 99, 116, 2018, 2023, 101, 107, 59, 1, 711, 59, 1, 94, 105, 114, 99, 59, 1, 292, 114, 59, 1, 8460, 108, 98, 101, 114, 116, 83, 112, 97, 99, 101, 59, 1, 8459, 4, 2, 112, 114, 2055, 2059, 102, 59, 1, 8461, 105, 122, 111, 110, 116, 97, 108, 76, 105, 110, 101, 59, 1, 9472, 4, 2, 99, 116, 2079, 2083, 114, 59, 1, 8459, 114, 111, 107, 59, 1, 294, 109, 112, 4, 2, 68, 69, 2097, 2107, 111, 119, 110, 72, 117, 109, 112, 59, 1, 8782, 113, 117, 97, 108, 59, 1, 8783, 4, 14, 69, 74, 79, 97, 99, 100, 102, 103, 109, 110, 111, 115, 116, 117, 2144, 2149, 2155, 2160, 2171, 2189, 2194, 2198, 2209, 2245, 2307, 2329, 2334, 2341, 99, 121, 59, 1, 1045, 108, 105, 103, 59, 1, 306, 99, 121, 59, 1, 1025, 99, 117, 116, 101, 5, 205, 1, 59, 2169, 1, 205, 4, 2, 105, 121, 2177, 2186, 114, 99, 5, 206, 1, 59, 2184, 1, 206, 59, 1, 1048, 111, 116, 59, 1, 304, 114, 59, 1, 8465, 114, 97, 118, 101, 5, 204, 1, 59, 2207, 1, 204, 4, 3, 59, 97, 112, 2217, 2219, 2238, 1, 8465, 4, 2, 99, 103, 2225, 2229, 114, 59, 1, 298, 105, 110, 97, 114, 121, 73, 59, 1, 8520, 108, 105, 101, 115, 59, 1, 8658, 4, 2, 116, 118, 2251, 2281, 4, 2, 59, 101, 2257, 2259, 1, 8748, 4, 2, 103, 114, 2265, 2271, 114, 97, 108, 59, 1, 8747, 115, 101, 99, 116, 105, 111, 110, 59, 1, 8898, 105, 115, 105, 98, 108, 101, 4, 2, 67, 84, 2293, 2300, 111, 109, 109, 97, 59, 1, 8291, 105, 109, 101, 115, 59, 1, 8290, 4, 3, 103, 112, 116, 2315, 2320, 2325, 111, 110, 59, 1, 302, 102, 59, 3, 55349, 56640, 97, 59, 1, 921, 99, 114, 59, 1, 8464, 105, 108, 100, 101, 59, 1, 296, 4, 2, 107, 109, 2347, 2352, 99, 121, 59, 1, 1030, 108, 5, 207, 1, 59, 2358, 1, 207, 4, 5, 99, 102, 111, 115, 117, 2372, 2386, 2391, 2397, 2414, 4, 2, 105, 121, 2378, 2383, 114, 99, 59, 1, 308, 59, 1, 1049, 114, 59, 3, 55349, 56589, 112, 102, 59, 3, 55349, 56641, 4, 2, 99, 101, 2403, 2408, 114, 59, 3, 55349, 56485, 114, 99, 121, 59, 1, 1032, 107, 99, 121, 59, 1, 1028, 4, 7, 72, 74, 97, 99, 102, 111, 115, 2436, 2441, 2446, 2452, 2467, 2472, 2478, 99, 121, 59, 1, 1061, 99, 121, 59, 1, 1036, 112, 112, 97, 59, 1, 922, 4, 2, 101, 121, 2458, 2464, 100, 105, 108, 59, 1, 310, 59, 1, 1050, 114, 59, 3, 55349, 56590, 112, 102, 59, 3, 55349, 56642, 99, 114, 59, 3, 55349, 56486, 4, 11, 74, 84, 97, 99, 101, 102, 108, 109, 111, 115, 116, 2508, 2513, 2520, 2562, 2585, 2981, 2986, 3004, 3011, 3146, 3167, 99, 121, 59, 1, 1033, 5, 60, 1, 59, 2518, 1, 60, 4, 5, 99, 109, 110, 112, 114, 2532, 2538, 2544, 2548, 2558, 117, 116, 101, 59, 1, 313, 98, 100, 97, 59, 1, 923, 103, 59, 1, 10218, 108, 97, 99, 101, 116, 114, 102, 59, 1, 8466, 114, 59, 1, 8606, 4, 3, 97, 101, 121, 2570, 2576, 2582, 114, 111, 110, 59, 1, 317, 100, 105, 108, 59, 1, 315, 59, 1, 1051, 4, 2, 102, 115, 2591, 2907, 116, 4, 10, 65, 67, 68, 70, 82, 84, 85, 86, 97, 114, 2614, 2663, 2672, 2728, 2735, 2760, 2820, 2870, 2888, 2895, 4, 2, 110, 114, 2620, 2633, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10216, 114, 111, 119, 4, 3, 59, 66, 82, 2644, 2646, 2651, 1, 8592, 97, 114, 59, 1, 8676, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8646, 101, 105, 108, 105, 110, 103, 59, 1, 8968, 111, 4, 2, 117, 119, 2679, 2692, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10214, 110, 4, 2, 84, 86, 2699, 2710, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10593, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2721, 2723, 1, 8643, 97, 114, 59, 1, 10585, 108, 111, 111, 114, 59, 1, 8970, 105, 103, 104, 116, 4, 2, 65, 86, 2745, 2752, 114, 114, 111, 119, 59, 1, 8596, 101, 99, 116, 111, 114, 59, 1, 10574, 4, 2, 101, 114, 2766, 2792, 101, 4, 3, 59, 65, 86, 2775, 2777, 2784, 1, 8867, 114, 114, 111, 119, 59, 1, 8612, 101, 99, 116, 111, 114, 59, 1, 10586, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 2806, 2808, 2813, 1, 8882, 97, 114, 59, 1, 10703, 113, 117, 97, 108, 59, 1, 8884, 112, 4, 3, 68, 84, 86, 2829, 2841, 2852, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 1, 10577, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10592, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2863, 2865, 1, 8639, 97, 114, 59, 1, 10584, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2881, 2883, 1, 8636, 97, 114, 59, 1, 10578, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8660, 115, 4, 6, 69, 70, 71, 76, 83, 84, 2922, 2936, 2947, 2956, 2962, 2974, 113, 117, 97, 108, 71, 114, 101, 97, 116, 101, 114, 59, 1, 8922, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8806, 114, 101, 97, 116, 101, 114, 59, 1, 8822, 101, 115, 115, 59, 1, 10913, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 10877, 105, 108, 100, 101, 59, 1, 8818, 114, 59, 3, 55349, 56591, 4, 2, 59, 101, 2992, 2994, 1, 8920, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8666, 105, 100, 111, 116, 59, 1, 319, 4, 3, 110, 112, 119, 3019, 3110, 3115, 103, 4, 4, 76, 82, 108, 114, 3030, 3058, 3070, 3098, 101, 102, 116, 4, 2, 65, 82, 3039, 3046, 114, 114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10231, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10230, 101, 102, 116, 4, 2, 97, 114, 3079, 3086, 114, 114, 111, 119, 59, 1, 10232, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10234, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10233, 102, 59, 3, 55349, 56643, 101, 114, 4, 2, 76, 82, 3123, 3134, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8601, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8600, 4, 3, 99, 104, 116, 3154, 3158, 3161, 114, 59, 1, 8466, 59, 1, 8624, 114, 111, 107, 59, 1, 321, 59, 1, 8810, 4, 8, 97, 99, 101, 102, 105, 111, 115, 117, 3188, 3192, 3196, 3222, 3227, 3237, 3243, 3248, 112, 59, 1, 10501, 121, 59, 1, 1052, 4, 2, 100, 108, 3202, 3213, 105, 117, 109, 83, 112, 97, 99, 101, 59, 1, 8287, 108, 105, 110, 116, 114, 102, 59, 1, 8499, 114, 59, 3, 55349, 56592, 110, 117, 115, 80, 108, 117, 115, 59, 1, 8723, 112, 102, 59, 3, 55349, 56644, 99, 114, 59, 1, 8499, 59, 1, 924, 4, 9, 74, 97, 99, 101, 102, 111, 115, 116, 117, 3271, 3276, 3283, 3306, 3422, 3427, 4120, 4126, 4137, 99, 121, 59, 1, 1034, 99, 117, 116, 101, 59, 1, 323, 4, 3, 97, 101, 121, 3291, 3297, 3303, 114, 111, 110, 59, 1, 327, 100, 105, 108, 59, 1, 325, 59, 1, 1053, 4, 3, 103, 115, 119, 3314, 3380, 3415, 97, 116, 105, 118, 101, 4, 3, 77, 84, 86, 3327, 3340, 3365, 101, 100, 105, 117, 109, 83, 112, 97, 99, 101, 59, 1, 8203, 104, 105, 4, 2, 99, 110, 3348, 3357, 107, 83, 112, 97, 99, 101, 59, 1, 8203, 83, 112, 97, 99, 101, 59, 1, 8203, 101, 114, 121, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8203, 116, 101, 100, 4, 2, 71, 76, 3389, 3405, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 114, 59, 1, 8811, 101, 115, 115, 76, 101, 115, 115, 59, 1, 8810, 76, 105, 110, 101, 59, 1, 10, 114, 59, 3, 55349, 56593, 4, 4, 66, 110, 112, 116, 3437, 3444, 3460, 3464, 114, 101, 97, 107, 59, 1, 8288, 66, 114, 101, 97, 107, 105, 110, 103, 83, 112, 97, 99, 101, 59, 1, 160, 102, 59, 1, 8469, 4, 13, 59, 67, 68, 69, 71, 72, 76, 78, 80, 82, 83, 84, 86, 3492, 3494, 3517, 3536, 3578, 3657, 3685, 3784, 3823, 3860, 3915, 4066, 4107, 1, 10988, 4, 2, 111, 117, 3500, 3510, 110, 103, 114, 117, 101, 110, 116, 59, 1, 8802, 112, 67, 97, 112, 59, 1, 8813, 111, 117, 98, 108, 101, 86, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8742, 4, 3, 108, 113, 120, 3544, 3552, 3571, 101, 109, 101, 110, 116, 59, 1, 8713, 117, 97, 108, 4, 2, 59, 84, 3561, 3563, 1, 8800, 105, 108, 100, 101, 59, 3, 8770, 824, 105, 115, 116, 115, 59, 1, 8708, 114, 101, 97, 116, 101, 114, 4, 7, 59, 69, 70, 71, 76, 83, 84, 3600, 3602, 3609, 3621, 3631, 3637, 3650, 1, 8815, 113, 117, 97, 108, 59, 1, 8817, 117, 108, 108, 69, 113, 117, 97, 108, 59, 3, 8807, 824, 114, 101, 97, 116, 101, 114, 59, 3, 8811, 824, 101, 115, 115, 59, 1, 8825, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3, 10878, 824, 105, 108, 100, 101, 59, 1, 8821, 117, 109, 112, 4, 2, 68, 69, 3666, 3677, 111, 119, 110, 72, 117, 109, 112, 59, 3, 8782, 824, 113, 117, 97, 108, 59, 3, 8783, 824, 101, 4, 2, 102, 115, 3692, 3724, 116, 84, 114, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3709, 3711, 3717, 1, 8938, 97, 114, 59, 3, 10703, 824, 113, 117, 97, 108, 59, 1, 8940, 115, 4, 6, 59, 69, 71, 76, 83, 84, 3739, 3741, 3748, 3757, 3764, 3777, 1, 8814, 113, 117, 97, 108, 59, 1, 8816, 114, 101, 97, 116, 101, 114, 59, 1, 8824, 101, 115, 115, 59, 3, 8810, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3, 10877, 824, 105, 108, 100, 101, 59, 1, 8820, 101, 115, 116, 101, 100, 4, 2, 71, 76, 3795, 3812, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 114, 59, 3, 10914, 824, 101, 115, 115, 76, 101, 115, 115, 59, 3, 10913, 824, 114, 101, 99, 101, 100, 101, 115, 4, 3, 59, 69, 83, 3838, 3840, 3848, 1, 8832, 113, 117, 97, 108, 59, 3, 10927, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8928, 4, 2, 101, 105, 3866, 3881, 118, 101, 114, 115, 101, 69, 108, 101, 109, 101, 110, 116, 59, 1, 8716, 103, 104, 116, 84, 114, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3900, 3902, 3908, 1, 8939, 97, 114, 59, 3, 10704, 824, 113, 117, 97, 108, 59, 1, 8941, 4, 2, 113, 117, 3921, 3973, 117, 97, 114, 101, 83, 117, 4, 2, 98, 112, 3933, 3952, 115, 101, 116, 4, 2, 59, 69, 3942, 3945, 3, 8847, 824, 113, 117, 97, 108, 59, 1, 8930, 101, 114, 115, 101, 116, 4, 2, 59, 69, 3963, 3966, 3, 8848, 824, 113, 117, 97, 108, 59, 1, 8931, 4, 3, 98, 99, 112, 3981, 4e3, 4045, 115, 101, 116, 4, 2, 59, 69, 3990, 3993, 3, 8834, 8402, 113, 117, 97, 108, 59, 1, 8840, 99, 101, 101, 100, 115, 4, 4, 59, 69, 83, 84, 4015, 4017, 4025, 4037, 1, 8833, 113, 117, 97, 108, 59, 3, 10928, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8929, 105, 108, 100, 101, 59, 3, 8831, 824, 101, 114, 115, 101, 116, 4, 2, 59, 69, 4056, 4059, 3, 8835, 8402, 113, 117, 97, 108, 59, 1, 8841, 105, 108, 100, 101, 4, 4, 59, 69, 70, 84, 4080, 4082, 4089, 4100, 1, 8769, 113, 117, 97, 108, 59, 1, 8772, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8775, 105, 108, 100, 101, 59, 1, 8777, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8740, 99, 114, 59, 3, 55349, 56489, 105, 108, 100, 101, 5, 209, 1, 59, 4135, 1, 209, 59, 1, 925, 4, 14, 69, 97, 99, 100, 102, 103, 109, 111, 112, 114, 115, 116, 117, 118, 4170, 4176, 4187, 4205, 4212, 4217, 4228, 4253, 4259, 4292, 4295, 4316, 4337, 4346, 108, 105, 103, 59, 1, 338, 99, 117, 116, 101, 5, 211, 1, 59, 4185, 1, 211, 4, 2, 105, 121, 4193, 4202, 114, 99, 5, 212, 1, 59, 4200, 1, 212, 59, 1, 1054, 98, 108, 97, 99, 59, 1, 336, 114, 59, 3, 55349, 56594, 114, 97, 118, 101, 5, 210, 1, 59, 4226, 1, 210, 4, 3, 97, 101, 105, 4236, 4241, 4246, 99, 114, 59, 1, 332, 103, 97, 59, 1, 937, 99, 114, 111, 110, 59, 1, 927, 112, 102, 59, 3, 55349, 56646, 101, 110, 67, 117, 114, 108, 121, 4, 2, 68, 81, 4272, 4285, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 1, 8220, 117, 111, 116, 101, 59, 1, 8216, 59, 1, 10836, 4, 2, 99, 108, 4301, 4306, 114, 59, 3, 55349, 56490, 97, 115, 104, 5, 216, 1, 59, 4314, 1, 216, 105, 4, 2, 108, 109, 4323, 4332, 100, 101, 5, 213, 1, 59, 4330, 1, 213, 101, 115, 59, 1, 10807, 109, 108, 5, 214, 1, 59, 4344, 1, 214, 101, 114, 4, 2, 66, 80, 4354, 4380, 4, 2, 97, 114, 4360, 4364, 114, 59, 1, 8254, 97, 99, 4, 2, 101, 107, 4372, 4375, 59, 1, 9182, 101, 116, 59, 1, 9140, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 1, 9180, 4, 9, 97, 99, 102, 104, 105, 108, 111, 114, 115, 4413, 4422, 4426, 4431, 4435, 4438, 4448, 4471, 4561, 114, 116, 105, 97, 108, 68, 59, 1, 8706, 121, 59, 1, 1055, 114, 59, 3, 55349, 56595, 105, 59, 1, 934, 59, 1, 928, 117, 115, 77, 105, 110, 117, 115, 59, 1, 177, 4, 2, 105, 112, 4454, 4467, 110, 99, 97, 114, 101, 112, 108, 97, 110, 101, 59, 1, 8460, 102, 59, 1, 8473, 4, 4, 59, 101, 105, 111, 4481, 4483, 4526, 4531, 1, 10939, 99, 101, 100, 101, 115, 4, 4, 59, 69, 83, 84, 4498, 4500, 4507, 4519, 1, 8826, 113, 117, 97, 108, 59, 1, 10927, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8828, 105, 108, 100, 101, 59, 1, 8830, 109, 101, 59, 1, 8243, 4, 2, 100, 112, 4537, 4543, 117, 99, 116, 59, 1, 8719, 111, 114, 116, 105, 111, 110, 4, 2, 59, 97, 4555, 4557, 1, 8759, 108, 59, 1, 8733, 4, 2, 99, 105, 4567, 4572, 114, 59, 3, 55349, 56491, 59, 1, 936, 4, 4, 85, 102, 111, 115, 4585, 4594, 4599, 4604, 79, 84, 5, 34, 1, 59, 4592, 1, 34, 114, 59, 3, 55349, 56596, 112, 102, 59, 1, 8474, 99, 114, 59, 3, 55349, 56492, 4, 12, 66, 69, 97, 99, 101, 102, 104, 105, 111, 114, 115, 117, 4636, 4642, 4650, 4681, 4704, 4763, 4767, 4771, 5047, 5069, 5081, 5094, 97, 114, 114, 59, 1, 10512, 71, 5, 174, 1, 59, 4648, 1, 174, 4, 3, 99, 110, 114, 4658, 4664, 4668, 117, 116, 101, 59, 1, 340, 103, 59, 1, 10219, 114, 4, 2, 59, 116, 4675, 4677, 1, 8608, 108, 59, 1, 10518, 4, 3, 97, 101, 121, 4689, 4695, 4701, 114, 111, 110, 59, 1, 344, 100, 105, 108, 59, 1, 342, 59, 1, 1056, 4, 2, 59, 118, 4710, 4712, 1, 8476, 101, 114, 115, 101, 4, 2, 69, 85, 4722, 4748, 4, 2, 108, 113, 4728, 4736, 101, 109, 101, 110, 116, 59, 1, 8715, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 8651, 112, 69, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 10607, 114, 59, 1, 8476, 111, 59, 1, 929, 103, 104, 116, 4, 8, 65, 67, 68, 70, 84, 85, 86, 97, 4792, 4840, 4849, 4905, 4912, 4972, 5022, 5040, 4, 2, 110, 114, 4798, 4811, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10217, 114, 111, 119, 4, 3, 59, 66, 76, 4822, 4824, 4829, 1, 8594, 97, 114, 59, 1, 8677, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8644, 101, 105, 108, 105, 110, 103, 59, 1, 8969, 111, 4, 2, 117, 119, 4856, 4869, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10215, 110, 4, 2, 84, 86, 4876, 4887, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10589, 101, 99, 116, 111, 114, 4, 2, 59, 66, 4898, 4900, 1, 8642, 97, 114, 59, 1, 10581, 108, 111, 111, 114, 59, 1, 8971, 4, 2, 101, 114, 4918, 4944, 101, 4, 3, 59, 65, 86, 4927, 4929, 4936, 1, 8866, 114, 114, 111, 119, 59, 1, 8614, 101, 99, 116, 111, 114, 59, 1, 10587, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 4958, 4960, 4965, 1, 8883, 97, 114, 59, 1, 10704, 113, 117, 97, 108, 59, 1, 8885, 112, 4, 3, 68, 84, 86, 4981, 4993, 5004, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 1, 10575, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10588, 101, 99, 116, 111, 114, 4, 2, 59, 66, 5015, 5017, 1, 8638, 97, 114, 59, 1, 10580, 101, 99, 116, 111, 114, 4, 2, 59, 66, 5033, 5035, 1, 8640, 97, 114, 59, 1, 10579, 114, 114, 111, 119, 59, 1, 8658, 4, 2, 112, 117, 5053, 5057, 102, 59, 1, 8477, 110, 100, 73, 109, 112, 108, 105, 101, 115, 59, 1, 10608, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8667, 4, 2, 99, 104, 5087, 5091, 114, 59, 1, 8475, 59, 1, 8625, 108, 101, 68, 101, 108, 97, 121, 101, 100, 59, 1, 10740, 4, 13, 72, 79, 97, 99, 102, 104, 105, 109, 111, 113, 115, 116, 117, 5134, 5150, 5157, 5164, 5198, 5203, 5259, 5265, 5277, 5283, 5374, 5380, 5385, 4, 2, 67, 99, 5140, 5146, 72, 99, 121, 59, 1, 1065, 121, 59, 1, 1064, 70, 84, 99, 121, 59, 1, 1068, 99, 117, 116, 101, 59, 1, 346, 4, 5, 59, 97, 101, 105, 121, 5176, 5178, 5184, 5190, 5195, 1, 10940, 114, 111, 110, 59, 1, 352, 100, 105, 108, 59, 1, 350, 114, 99, 59, 1, 348, 59, 1, 1057, 114, 59, 3, 55349, 56598, 111, 114, 116, 4, 4, 68, 76, 82, 85, 5216, 5227, 5238, 5250, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8595, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8592, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8594, 112, 65, 114, 114, 111, 119, 59, 1, 8593, 103, 109, 97, 59, 1, 931, 97, 108, 108, 67, 105, 114, 99, 108, 101, 59, 1, 8728, 112, 102, 59, 3, 55349, 56650, 4, 2, 114, 117, 5289, 5293, 116, 59, 1, 8730, 97, 114, 101, 4, 4, 59, 73, 83, 85, 5306, 5308, 5322, 5367, 1, 9633, 110, 116, 101, 114, 115, 101, 99, 116, 105, 111, 110, 59, 1, 8851, 117, 4, 2, 98, 112, 5329, 5347, 115, 101, 116, 4, 2, 59, 69, 5338, 5340, 1, 8847, 113, 117, 97, 108, 59, 1, 8849, 101, 114, 115, 101, 116, 4, 2, 59, 69, 5358, 5360, 1, 8848, 113, 117, 97, 108, 59, 1, 8850, 110, 105, 111, 110, 59, 1, 8852, 99, 114, 59, 3, 55349, 56494, 97, 114, 59, 1, 8902, 4, 4, 98, 99, 109, 112, 5395, 5420, 5475, 5478, 4, 2, 59, 115, 5401, 5403, 1, 8912, 101, 116, 4, 2, 59, 69, 5411, 5413, 1, 8912, 113, 117, 97, 108, 59, 1, 8838, 4, 2, 99, 104, 5426, 5468, 101, 101, 100, 115, 4, 4, 59, 69, 83, 84, 5440, 5442, 5449, 5461, 1, 8827, 113, 117, 97, 108, 59, 1, 10928, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8829, 105, 108, 100, 101, 59, 1, 8831, 84, 104, 97, 116, 59, 1, 8715, 59, 1, 8721, 4, 3, 59, 101, 115, 5486, 5488, 5507, 1, 8913, 114, 115, 101, 116, 4, 2, 59, 69, 5498, 5500, 1, 8835, 113, 117, 97, 108, 59, 1, 8839, 101, 116, 59, 1, 8913, 4, 11, 72, 82, 83, 97, 99, 102, 104, 105, 111, 114, 115, 5536, 5546, 5552, 5567, 5579, 5602, 5607, 5655, 5695, 5701, 5711, 79, 82, 78, 5, 222, 1, 59, 5544, 1, 222, 65, 68, 69, 59, 1, 8482, 4, 2, 72, 99, 5558, 5563, 99, 121, 59, 1, 1035, 121, 59, 1, 1062, 4, 2, 98, 117, 5573, 5576, 59, 1, 9, 59, 1, 932, 4, 3, 97, 101, 121, 5587, 5593, 5599, 114, 111, 110, 59, 1, 356, 100, 105, 108, 59, 1, 354, 59, 1, 1058, 114, 59, 3, 55349, 56599, 4, 2, 101, 105, 5613, 5631, 4, 2, 114, 116, 5619, 5627, 101, 102, 111, 114, 101, 59, 1, 8756, 97, 59, 1, 920, 4, 2, 99, 110, 5637, 5647, 107, 83, 112, 97, 99, 101, 59, 3, 8287, 8202, 83, 112, 97, 99, 101, 59, 1, 8201, 108, 100, 101, 4, 4, 59, 69, 70, 84, 5668, 5670, 5677, 5688, 1, 8764, 113, 117, 97, 108, 59, 1, 8771, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8773, 105, 108, 100, 101, 59, 1, 8776, 112, 102, 59, 3, 55349, 56651, 105, 112, 108, 101, 68, 111, 116, 59, 1, 8411, 4, 2, 99, 116, 5717, 5722, 114, 59, 3, 55349, 56495, 114, 111, 107, 59, 1, 358, 4, 14, 97, 98, 99, 100, 102, 103, 109, 110, 111, 112, 114, 115, 116, 117, 5758, 5789, 5805, 5823, 5830, 5835, 5846, 5852, 5921, 5937, 6089, 6095, 6101, 6108, 4, 2, 99, 114, 5764, 5774, 117, 116, 101, 5, 218, 1, 59, 5772, 1, 218, 114, 4, 2, 59, 111, 5781, 5783, 1, 8607, 99, 105, 114, 59, 1, 10569, 114, 4, 2, 99, 101, 5796, 5800, 121, 59, 1, 1038, 118, 101, 59, 1, 364, 4, 2, 105, 121, 5811, 5820, 114, 99, 5, 219, 1, 59, 5818, 1, 219, 59, 1, 1059, 98, 108, 97, 99, 59, 1, 368, 114, 59, 3, 55349, 56600, 114, 97, 118, 101, 5, 217, 1, 59, 5844, 1, 217, 97, 99, 114, 59, 1, 362, 4, 2, 100, 105, 5858, 5905, 101, 114, 4, 2, 66, 80, 5866, 5892, 4, 2, 97, 114, 5872, 5876, 114, 59, 1, 95, 97, 99, 4, 2, 101, 107, 5884, 5887, 59, 1, 9183, 101, 116, 59, 1, 9141, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 1, 9181, 111, 110, 4, 2, 59, 80, 5913, 5915, 1, 8899, 108, 117, 115, 59, 1, 8846, 4, 2, 103, 112, 5927, 5932, 111, 110, 59, 1, 370, 102, 59, 3, 55349, 56652, 4, 8, 65, 68, 69, 84, 97, 100, 112, 115, 5955, 5985, 5996, 6009, 6026, 6033, 6044, 6075, 114, 114, 111, 119, 4, 3, 59, 66, 68, 5967, 5969, 5974, 1, 8593, 97, 114, 59, 1, 10514, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8645, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8597, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 10606, 101, 101, 4, 2, 59, 65, 6017, 6019, 1, 8869, 114, 114, 111, 119, 59, 1, 8613, 114, 114, 111, 119, 59, 1, 8657, 111, 119, 110, 97, 114, 114, 111, 119, 59, 1, 8661, 101, 114, 4, 2, 76, 82, 6052, 6063, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8598, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8599, 105, 4, 2, 59, 108, 6082, 6084, 1, 978, 111, 110, 59, 1, 933, 105, 110, 103, 59, 1, 366, 99, 114, 59, 3, 55349, 56496, 105, 108, 100, 101, 59, 1, 360, 109, 108, 5, 220, 1, 59, 6115, 1, 220, 4, 9, 68, 98, 99, 100, 101, 102, 111, 115, 118, 6137, 6143, 6148, 6152, 6166, 6250, 6255, 6261, 6267, 97, 115, 104, 59, 1, 8875, 97, 114, 59, 1, 10987, 121, 59, 1, 1042, 97, 115, 104, 4, 2, 59, 108, 6161, 6163, 1, 8873, 59, 1, 10982, 4, 2, 101, 114, 6172, 6175, 59, 1, 8897, 4, 3, 98, 116, 121, 6183, 6188, 6238, 97, 114, 59, 1, 8214, 4, 2, 59, 105, 6194, 6196, 1, 8214, 99, 97, 108, 4, 4, 66, 76, 83, 84, 6209, 6214, 6220, 6231, 97, 114, 59, 1, 8739, 105, 110, 101, 59, 1, 124, 101, 112, 97, 114, 97, 116, 111, 114, 59, 1, 10072, 105, 108, 100, 101, 59, 1, 8768, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8202, 114, 59, 3, 55349, 56601, 112, 102, 59, 3, 55349, 56653, 99, 114, 59, 3, 55349, 56497, 100, 97, 115, 104, 59, 1, 8874, 4, 5, 99, 101, 102, 111, 115, 6286, 6292, 6298, 6303, 6309, 105, 114, 99, 59, 1, 372, 100, 103, 101, 59, 1, 8896, 114, 59, 3, 55349, 56602, 112, 102, 59, 3, 55349, 56654, 99, 114, 59, 3, 55349, 56498, 4, 4, 102, 105, 111, 115, 6325, 6330, 6333, 6339, 114, 59, 3, 55349, 56603, 59, 1, 926, 112, 102, 59, 3, 55349, 56655, 99, 114, 59, 3, 55349, 56499, 4, 9, 65, 73, 85, 97, 99, 102, 111, 115, 117, 6365, 6370, 6375, 6380, 6391, 6405, 6410, 6416, 6422, 99, 121, 59, 1, 1071, 99, 121, 59, 1, 1031, 99, 121, 59, 1, 1070, 99, 117, 116, 101, 5, 221, 1, 59, 6389, 1, 221, 4, 2, 105, 121, 6397, 6402, 114, 99, 59, 1, 374, 59, 1, 1067, 114, 59, 3, 55349, 56604, 112, 102, 59, 3, 55349, 56656, 99, 114, 59, 3, 55349, 56500, 109, 108, 59, 1, 376, 4, 8, 72, 97, 99, 100, 101, 102, 111, 115, 6445, 6450, 6457, 6472, 6477, 6501, 6505, 6510, 99, 121, 59, 1, 1046, 99, 117, 116, 101, 59, 1, 377, 4, 2, 97, 121, 6463, 6469, 114, 111, 110, 59, 1, 381, 59, 1, 1047, 111, 116, 59, 1, 379, 4, 2, 114, 116, 6483, 6497, 111, 87, 105, 100, 116, 104, 83, 112, 97, 99, 101, 59, 1, 8203, 97, 59, 1, 918, 114, 59, 1, 8488, 112, 102, 59, 1, 8484, 99, 114, 59, 3, 55349, 56501, 4, 16, 97, 98, 99, 101, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 119, 6550, 6561, 6568, 6612, 6622, 6634, 6645, 6672, 6699, 6854, 6870, 6923, 6933, 6963, 6974, 6983, 99, 117, 116, 101, 5, 225, 1, 59, 6559, 1, 225, 114, 101, 118, 101, 59, 1, 259, 4, 6, 59, 69, 100, 105, 117, 121, 6582, 6584, 6588, 6591, 6600, 6609, 1, 8766, 59, 3, 8766, 819, 59, 1, 8767, 114, 99, 5, 226, 1, 59, 6598, 1, 226, 116, 101, 5, 180, 1, 59, 6607, 1, 180, 59, 1, 1072, 108, 105, 103, 5, 230, 1, 59, 6620, 1, 230, 4, 2, 59, 114, 6628, 6630, 1, 8289, 59, 3, 55349, 56606, 114, 97, 118, 101, 5, 224, 1, 59, 6643, 1, 224, 4, 2, 101, 112, 6651, 6667, 4, 2, 102, 112, 6657, 6663, 115, 121, 109, 59, 1, 8501, 104, 59, 1, 8501, 104, 97, 59, 1, 945, 4, 2, 97, 112, 6678, 6692, 4, 2, 99, 108, 6684, 6688, 114, 59, 1, 257, 103, 59, 1, 10815, 5, 38, 1, 59, 6697, 1, 38, 4, 2, 100, 103, 6705, 6737, 4, 5, 59, 97, 100, 115, 118, 6717, 6719, 6724, 6727, 6734, 1, 8743, 110, 100, 59, 1, 10837, 59, 1, 10844, 108, 111, 112, 101, 59, 1, 10840, 59, 1, 10842, 4, 7, 59, 101, 108, 109, 114, 115, 122, 6753, 6755, 6758, 6762, 6814, 6835, 6848, 1, 8736, 59, 1, 10660, 101, 59, 1, 8736, 115, 100, 4, 2, 59, 97, 6770, 6772, 1, 8737, 4, 8, 97, 98, 99, 100, 101, 102, 103, 104, 6790, 6793, 6796, 6799, 6802, 6805, 6808, 6811, 59, 1, 10664, 59, 1, 10665, 59, 1, 10666, 59, 1, 10667, 59, 1, 10668, 59, 1, 10669, 59, 1, 10670, 59, 1, 10671, 116, 4, 2, 59, 118, 6821, 6823, 1, 8735, 98, 4, 2, 59, 100, 6830, 6832, 1, 8894, 59, 1, 10653, 4, 2, 112, 116, 6841, 6845, 104, 59, 1, 8738, 59, 1, 197, 97, 114, 114, 59, 1, 9084, 4, 2, 103, 112, 6860, 6865, 111, 110, 59, 1, 261, 102, 59, 3, 55349, 56658, 4, 7, 59, 69, 97, 101, 105, 111, 112, 6886, 6888, 6891, 6897, 6900, 6904, 6908, 1, 8776, 59, 1, 10864, 99, 105, 114, 59, 1, 10863, 59, 1, 8778, 100, 59, 1, 8779, 115, 59, 1, 39, 114, 111, 120, 4, 2, 59, 101, 6917, 6919, 1, 8776, 113, 59, 1, 8778, 105, 110, 103, 5, 229, 1, 59, 6931, 1, 229, 4, 3, 99, 116, 121, 6941, 6946, 6949, 114, 59, 3, 55349, 56502, 59, 1, 42, 109, 112, 4, 2, 59, 101, 6957, 6959, 1, 8776, 113, 59, 1, 8781, 105, 108, 100, 101, 5, 227, 1, 59, 6972, 1, 227, 109, 108, 5, 228, 1, 59, 6981, 1, 228, 4, 2, 99, 105, 6989, 6997, 111, 110, 105, 110, 116, 59, 1, 8755, 110, 116, 59, 1, 10769, 4, 16, 78, 97, 98, 99, 100, 101, 102, 105, 107, 108, 110, 111, 112, 114, 115, 117, 7036, 7041, 7119, 7135, 7149, 7155, 7219, 7224, 7347, 7354, 7463, 7489, 7786, 7793, 7814, 7866, 111, 116, 59, 1, 10989, 4, 2, 99, 114, 7047, 7094, 107, 4, 4, 99, 101, 112, 115, 7058, 7064, 7073, 7080, 111, 110, 103, 59, 1, 8780, 112, 115, 105, 108, 111, 110, 59, 1, 1014, 114, 105, 109, 101, 59, 1, 8245, 105, 109, 4, 2, 59, 101, 7088, 7090, 1, 8765, 113, 59, 1, 8909, 4, 2, 118, 119, 7100, 7105, 101, 101, 59, 1, 8893, 101, 100, 4, 2, 59, 103, 7113, 7115, 1, 8965, 101, 59, 1, 8965, 114, 107, 4, 2, 59, 116, 7127, 7129, 1, 9141, 98, 114, 107, 59, 1, 9142, 4, 2, 111, 121, 7141, 7146, 110, 103, 59, 1, 8780, 59, 1, 1073, 113, 117, 111, 59, 1, 8222, 4, 5, 99, 109, 112, 114, 116, 7167, 7181, 7188, 7193, 7199, 97, 117, 115, 4, 2, 59, 101, 7176, 7178, 1, 8757, 59, 1, 8757, 112, 116, 121, 118, 59, 1, 10672, 115, 105, 59, 1, 1014, 110, 111, 117, 59, 1, 8492, 4, 3, 97, 104, 119, 7207, 7210, 7213, 59, 1, 946, 59, 1, 8502, 101, 101, 110, 59, 1, 8812, 114, 59, 3, 55349, 56607, 103, 4, 7, 99, 111, 115, 116, 117, 118, 119, 7241, 7262, 7288, 7305, 7328, 7335, 7340, 4, 3, 97, 105, 117, 7249, 7253, 7258, 112, 59, 1, 8898, 114, 99, 59, 1, 9711, 112, 59, 1, 8899, 4, 3, 100, 112, 116, 7270, 7275, 7281, 111, 116, 59, 1, 10752, 108, 117, 115, 59, 1, 10753, 105, 109, 101, 115, 59, 1, 10754, 4, 2, 113, 116, 7294, 7300, 99, 117, 112, 59, 1, 10758, 97, 114, 59, 1, 9733, 114, 105, 97, 110, 103, 108, 101, 4, 2, 100, 117, 7318, 7324, 111, 119, 110, 59, 1, 9661, 112, 59, 1, 9651, 112, 108, 117, 115, 59, 1, 10756, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896, 97, 114, 111, 119, 59, 1, 10509, 4, 3, 97, 107, 111, 7362, 7436, 7458, 4, 2, 99, 110, 7368, 7432, 107, 4, 3, 108, 115, 116, 7377, 7386, 7394, 111, 122, 101, 110, 103, 101, 59, 1, 10731, 113, 117, 97, 114, 101, 59, 1, 9642, 114, 105, 97, 110, 103, 108, 101, 4, 4, 59, 100, 108, 114, 7411, 7413, 7419, 7425, 1, 9652, 111, 119, 110, 59, 1, 9662, 101, 102, 116, 59, 1, 9666, 105, 103, 104, 116, 59, 1, 9656, 107, 59, 1, 9251, 4, 2, 49, 51, 7442, 7454, 4, 2, 50, 52, 7448, 7451, 59, 1, 9618, 59, 1, 9617, 52, 59, 1, 9619, 99, 107, 59, 1, 9608, 4, 2, 101, 111, 7469, 7485, 4, 2, 59, 113, 7475, 7478, 3, 61, 8421, 117, 105, 118, 59, 3, 8801, 8421, 116, 59, 1, 8976, 4, 4, 112, 116, 119, 120, 7499, 7504, 7517, 7523, 102, 59, 3, 55349, 56659, 4, 2, 59, 116, 7510, 7512, 1, 8869, 111, 109, 59, 1, 8869, 116, 105, 101, 59, 1, 8904, 4, 12, 68, 72, 85, 86, 98, 100, 104, 109, 112, 116, 117, 118, 7549, 7571, 7597, 7619, 7655, 7660, 7682, 7708, 7715, 7721, 7728, 7750, 4, 4, 76, 82, 108, 114, 7559, 7562, 7565, 7568, 59, 1, 9559, 59, 1, 9556, 59, 1, 9558, 59, 1, 9555, 4, 5, 59, 68, 85, 100, 117, 7583, 7585, 7588, 7591, 7594, 1, 9552, 59, 1, 9574, 59, 1, 9577, 59, 1, 9572, 59, 1, 9575, 4, 4, 76, 82, 108, 114, 7607, 7610, 7613, 7616, 59, 1, 9565, 59, 1, 9562, 59, 1, 9564, 59, 1, 9561, 4, 7, 59, 72, 76, 82, 104, 108, 114, 7635, 7637, 7640, 7643, 7646, 7649, 7652, 1, 9553, 59, 1, 9580, 59, 1, 9571, 59, 1, 9568, 59, 1, 9579, 59, 1, 9570, 59, 1, 9567, 111, 120, 59, 1, 10697, 4, 4, 76, 82, 108, 114, 7670, 7673, 7676, 7679, 59, 1, 9557, 59, 1, 9554, 59, 1, 9488, 59, 1, 9484, 4, 5, 59, 68, 85, 100, 117, 7694, 7696, 7699, 7702, 7705, 1, 9472, 59, 1, 9573, 59, 1, 9576, 59, 1, 9516, 59, 1, 9524, 105, 110, 117, 115, 59, 1, 8863, 108, 117, 115, 59, 1, 8862, 105, 109, 101, 115, 59, 1, 8864, 4, 4, 76, 82, 108, 114, 7738, 7741, 7744, 7747, 59, 1, 9563, 59, 1, 9560, 59, 1, 9496, 59, 1, 9492, 4, 7, 59, 72, 76, 82, 104, 108, 114, 7766, 7768, 7771, 7774, 7777, 7780, 7783, 1, 9474, 59, 1, 9578, 59, 1, 9569, 59, 1, 9566, 59, 1, 9532, 59, 1, 9508, 59, 1, 9500, 114, 105, 109, 101, 59, 1, 8245, 4, 2, 101, 118, 7799, 7804, 118, 101, 59, 1, 728, 98, 97, 114, 5, 166, 1, 59, 7812, 1, 166, 4, 4, 99, 101, 105, 111, 7824, 7829, 7834, 7846, 114, 59, 3, 55349, 56503, 109, 105, 59, 1, 8271, 109, 4, 2, 59, 101, 7841, 7843, 1, 8765, 59, 1, 8909, 108, 4, 3, 59, 98, 104, 7855, 7857, 7860, 1, 92, 59, 1, 10693, 115, 117, 98, 59, 1, 10184, 4, 2, 108, 109, 7872, 7885, 108, 4, 2, 59, 101, 7879, 7881, 1, 8226, 116, 59, 1, 8226, 112, 4, 3, 59, 69, 101, 7894, 7896, 7899, 1, 8782, 59, 1, 10926, 4, 2, 59, 113, 7905, 7907, 1, 8783, 59, 1, 8783, 4, 15, 97, 99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 116, 117, 119, 121, 7942, 8021, 8075, 8080, 8121, 8126, 8157, 8279, 8295, 8430, 8446, 8485, 8491, 8707, 8726, 4, 3, 99, 112, 114, 7950, 7956, 8007, 117, 116, 101, 59, 1, 263, 4, 6, 59, 97, 98, 99, 100, 115, 7970, 7972, 7977, 7984, 7998, 8003, 1, 8745, 110, 100, 59, 1, 10820, 114, 99, 117, 112, 59, 1, 10825, 4, 2, 97, 117, 7990, 7994, 112, 59, 1, 10827, 112, 59, 1, 10823, 111, 116, 59, 1, 10816, 59, 3, 8745, 65024, 4, 2, 101, 111, 8013, 8017, 116, 59, 1, 8257, 110, 59, 1, 711, 4, 4, 97, 101, 105, 117, 8031, 8046, 8056, 8061, 4, 2, 112, 114, 8037, 8041, 115, 59, 1, 10829, 111, 110, 59, 1, 269, 100, 105, 108, 5, 231, 1, 59, 8054, 1, 231, 114, 99, 59, 1, 265, 112, 115, 4, 2, 59, 115, 8069, 8071, 1, 10828, 109, 59, 1, 10832, 111, 116, 59, 1, 267, 4, 3, 100, 109, 110, 8088, 8097, 8104, 105, 108, 5, 184, 1, 59, 8095, 1, 184, 112, 116, 121, 118, 59, 1, 10674, 116, 5, 162, 2, 59, 101, 8112, 8114, 1, 162, 114, 100, 111, 116, 59, 1, 183, 114, 59, 3, 55349, 56608, 4, 3, 99, 101, 105, 8134, 8138, 8154, 121, 59, 1, 1095, 99, 107, 4, 2, 59, 109, 8146, 8148, 1, 10003, 97, 114, 107, 59, 1, 10003, 59, 1, 967, 114, 4, 7, 59, 69, 99, 101, 102, 109, 115, 8174, 8176, 8179, 8258, 8261, 8268, 8273, 1, 9675, 59, 1, 10691, 4, 3, 59, 101, 108, 8187, 8189, 8193, 1, 710, 113, 59, 1, 8791, 101, 4, 2, 97, 100, 8200, 8223, 114, 114, 111, 119, 4, 2, 108, 114, 8210, 8216, 101, 102, 116, 59, 1, 8634, 105, 103, 104, 116, 59, 1, 8635, 4, 5, 82, 83, 97, 99, 100, 8235, 8238, 8241, 8246, 8252, 59, 1, 174, 59, 1, 9416, 115, 116, 59, 1, 8859, 105, 114, 99, 59, 1, 8858, 97, 115, 104, 59, 1, 8861, 59, 1, 8791, 110, 105, 110, 116, 59, 1, 10768, 105, 100, 59, 1, 10991, 99, 105, 114, 59, 1, 10690, 117, 98, 115, 4, 2, 59, 117, 8288, 8290, 1, 9827, 105, 116, 59, 1, 9827, 4, 4, 108, 109, 110, 112, 8305, 8326, 8376, 8400, 111, 110, 4, 2, 59, 101, 8313, 8315, 1, 58, 4, 2, 59, 113, 8321, 8323, 1, 8788, 59, 1, 8788, 4, 2, 109, 112, 8332, 8344, 97, 4, 2, 59, 116, 8339, 8341, 1, 44, 59, 1, 64, 4, 3, 59, 102, 108, 8352, 8354, 8358, 1, 8705, 110, 59, 1, 8728, 101, 4, 2, 109, 120, 8365, 8371, 101, 110, 116, 59, 1, 8705, 101, 115, 59, 1, 8450, 4, 2, 103, 105, 8382, 8395, 4, 2, 59, 100, 8388, 8390, 1, 8773, 111, 116, 59, 1, 10861, 110, 116, 59, 1, 8750, 4, 3, 102, 114, 121, 8408, 8412, 8417, 59, 3, 55349, 56660, 111, 100, 59, 1, 8720, 5, 169, 2, 59, 115, 8424, 8426, 1, 169, 114, 59, 1, 8471, 4, 2, 97, 111, 8436, 8441, 114, 114, 59, 1, 8629, 115, 115, 59, 1, 10007, 4, 2, 99, 117, 8452, 8457, 114, 59, 3, 55349, 56504, 4, 2, 98, 112, 8463, 8474, 4, 2, 59, 101, 8469, 8471, 1, 10959, 59, 1, 10961, 4, 2, 59, 101, 8480, 8482, 1, 10960, 59, 1, 10962, 100, 111, 116, 59, 1, 8943, 4, 7, 100, 101, 108, 112, 114, 118, 119, 8507, 8522, 8536, 8550, 8600, 8697, 8702, 97, 114, 114, 4, 2, 108, 114, 8516, 8519, 59, 1, 10552, 59, 1, 10549, 4, 2, 112, 115, 8528, 8532, 114, 59, 1, 8926, 99, 59, 1, 8927, 97, 114, 114, 4, 2, 59, 112, 8545, 8547, 1, 8630, 59, 1, 10557, 4, 6, 59, 98, 99, 100, 111, 115, 8564, 8566, 8573, 8587, 8592, 8596, 1, 8746, 114, 99, 97, 112, 59, 1, 10824, 4, 2, 97, 117, 8579, 8583, 112, 59, 1, 10822, 112, 59, 1, 10826, 111, 116, 59, 1, 8845, 114, 59, 1, 10821, 59, 3, 8746, 65024, 4, 4, 97, 108, 114, 118, 8610, 8623, 8663, 8672, 114, 114, 4, 2, 59, 109, 8618, 8620, 1, 8631, 59, 1, 10556, 121, 4, 3, 101, 118, 119, 8632, 8651, 8656, 113, 4, 2, 112, 115, 8639, 8645, 114, 101, 99, 59, 1, 8926, 117, 99, 99, 59, 1, 8927, 101, 101, 59, 1, 8910, 101, 100, 103, 101, 59, 1, 8911, 101, 110, 5, 164, 1, 59, 8670, 1, 164, 101, 97, 114, 114, 111, 119, 4, 2, 108, 114, 8684, 8690, 101, 102, 116, 59, 1, 8630, 105, 103, 104, 116, 59, 1, 8631, 101, 101, 59, 1, 8910, 101, 100, 59, 1, 8911, 4, 2, 99, 105, 8713, 8721, 111, 110, 105, 110, 116, 59, 1, 8754, 110, 116, 59, 1, 8753, 108, 99, 116, 121, 59, 1, 9005, 4, 19, 65, 72, 97, 98, 99, 100, 101, 102, 104, 105, 106, 108, 111, 114, 115, 116, 117, 119, 122, 8773, 8778, 8783, 8821, 8839, 8854, 8887, 8914, 8930, 8944, 9036, 9041, 9058, 9197, 9227, 9258, 9281, 9297, 9305, 114, 114, 59, 1, 8659, 97, 114, 59, 1, 10597, 4, 4, 103, 108, 114, 115, 8793, 8799, 8805, 8809, 103, 101, 114, 59, 1, 8224, 101, 116, 104, 59, 1, 8504, 114, 59, 1, 8595, 104, 4, 2, 59, 118, 8816, 8818, 1, 8208, 59, 1, 8867, 4, 2, 107, 108, 8827, 8834, 97, 114, 111, 119, 59, 1, 10511, 97, 99, 59, 1, 733, 4, 2, 97, 121, 8845, 8851, 114, 111, 110, 59, 1, 271, 59, 1, 1076, 4, 3, 59, 97, 111, 8862, 8864, 8880, 1, 8518, 4, 2, 103, 114, 8870, 8876, 103, 101, 114, 59, 1, 8225, 114, 59, 1, 8650, 116, 115, 101, 113, 59, 1, 10871, 4, 3, 103, 108, 109, 8895, 8902, 8907, 5, 176, 1, 59, 8900, 1, 176, 116, 97, 59, 1, 948, 112, 116, 121, 118, 59, 1, 10673, 4, 2, 105, 114, 8920, 8926, 115, 104, 116, 59, 1, 10623, 59, 3, 55349, 56609, 97, 114, 4, 2, 108, 114, 8938, 8941, 59, 1, 8643, 59, 1, 8642, 4, 5, 97, 101, 103, 115, 118, 8956, 8986, 8989, 8996, 9001, 109, 4, 3, 59, 111, 115, 8965, 8967, 8983, 1, 8900, 110, 100, 4, 2, 59, 115, 8975, 8977, 1, 8900, 117, 105, 116, 59, 1, 9830, 59, 1, 9830, 59, 1, 168, 97, 109, 109, 97, 59, 1, 989, 105, 110, 59, 1, 8946, 4, 3, 59, 105, 111, 9009, 9011, 9031, 1, 247, 100, 101, 5, 247, 2, 59, 111, 9020, 9022, 1, 247, 110, 116, 105, 109, 101, 115, 59, 1, 8903, 110, 120, 59, 1, 8903, 99, 121, 59, 1, 1106, 99, 4, 2, 111, 114, 9048, 9053, 114, 110, 59, 1, 8990, 111, 112, 59, 1, 8973, 4, 5, 108, 112, 116, 117, 119, 9070, 9076, 9081, 9130, 9144, 108, 97, 114, 59, 1, 36, 102, 59, 3, 55349, 56661, 4, 5, 59, 101, 109, 112, 115, 9093, 9095, 9109, 9116, 9122, 1, 729, 113, 4, 2, 59, 100, 9102, 9104, 1, 8784, 111, 116, 59, 1, 8785, 105, 110, 117, 115, 59, 1, 8760, 108, 117, 115, 59, 1, 8724, 113, 117, 97, 114, 101, 59, 1, 8865, 98, 108, 101, 98, 97, 114, 119, 101, 100, 103, 101, 59, 1, 8966, 110, 4, 3, 97, 100, 104, 9153, 9160, 9172, 114, 114, 111, 119, 59, 1, 8595, 111, 119, 110, 97, 114, 114, 111, 119, 115, 59, 1, 8650, 97, 114, 112, 111, 111, 110, 4, 2, 108, 114, 9184, 9190, 101, 102, 116, 59, 1, 8643, 105, 103, 104, 116, 59, 1, 8642, 4, 2, 98, 99, 9203, 9211, 107, 97, 114, 111, 119, 59, 1, 10512, 4, 2, 111, 114, 9217, 9222, 114, 110, 59, 1, 8991, 111, 112, 59, 1, 8972, 4, 3, 99, 111, 116, 9235, 9248, 9252, 4, 2, 114, 121, 9241, 9245, 59, 3, 55349, 56505, 59, 1, 1109, 108, 59, 1, 10742, 114, 111, 107, 59, 1, 273, 4, 2, 100, 114, 9264, 9269, 111, 116, 59, 1, 8945, 105, 4, 2, 59, 102, 9276, 9278, 1, 9663, 59, 1, 9662, 4, 2, 97, 104, 9287, 9292, 114, 114, 59, 1, 8693, 97, 114, 59, 1, 10607, 97, 110, 103, 108, 101, 59, 1, 10662, 4, 2, 99, 105, 9311, 9315, 121, 59, 1, 1119, 103, 114, 97, 114, 114, 59, 1, 10239, 4, 18, 68, 97, 99, 100, 101, 102, 103, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 9361, 9376, 9398, 9439, 9444, 9447, 9462, 9495, 9531, 9585, 9598, 9614, 9659, 9755, 9771, 9792, 9808, 9826, 4, 2, 68, 111, 9367, 9372, 111, 116, 59, 1, 10871, 116, 59, 1, 8785, 4, 2, 99, 115, 9382, 9392, 117, 116, 101, 5, 233, 1, 59, 9390, 1, 233, 116, 101, 114, 59, 1, 10862, 4, 4, 97, 105, 111, 121, 9408, 9414, 9430, 9436, 114, 111, 110, 59, 1, 283, 114, 4, 2, 59, 99, 9421, 9423, 1, 8790, 5, 234, 1, 59, 9428, 1, 234, 108, 111, 110, 59, 1, 8789, 59, 1, 1101, 111, 116, 59, 1, 279, 59, 1, 8519, 4, 2, 68, 114, 9453, 9458, 111, 116, 59, 1, 8786, 59, 3, 55349, 56610, 4, 3, 59, 114, 115, 9470, 9472, 9482, 1, 10906, 97, 118, 101, 5, 232, 1, 59, 9480, 1, 232, 4, 2, 59, 100, 9488, 9490, 1, 10902, 111, 116, 59, 1, 10904, 4, 4, 59, 105, 108, 115, 9505, 9507, 9515, 9518, 1, 10905, 110, 116, 101, 114, 115, 59, 1, 9191, 59, 1, 8467, 4, 2, 59, 100, 9524, 9526, 1, 10901, 111, 116, 59, 1, 10903, 4, 3, 97, 112, 115, 9539, 9544, 9564, 99, 114, 59, 1, 275, 116, 121, 4, 3, 59, 115, 118, 9554, 9556, 9561, 1, 8709, 101, 116, 59, 1, 8709, 59, 1, 8709, 112, 4, 2, 49, 59, 9571, 9583, 4, 2, 51, 52, 9577, 9580, 59, 1, 8196, 59, 1, 8197, 1, 8195, 4, 2, 103, 115, 9591, 9594, 59, 1, 331, 112, 59, 1, 8194, 4, 2, 103, 112, 9604, 9609, 111, 110, 59, 1, 281, 102, 59, 3, 55349, 56662, 4, 3, 97, 108, 115, 9622, 9635, 9640, 114, 4, 2, 59, 115, 9629, 9631, 1, 8917, 108, 59, 1, 10723, 117, 115, 59, 1, 10865, 105, 4, 3, 59, 108, 118, 9649, 9651, 9656, 1, 949, 111, 110, 59, 1, 949, 59, 1, 1013, 4, 4, 99, 115, 117, 118, 9669, 9686, 9716, 9747, 4, 2, 105, 111, 9675, 9680, 114, 99, 59, 1, 8790, 108, 111, 110, 59, 1, 8789, 4, 2, 105, 108, 9692, 9696, 109, 59, 1, 8770, 97, 110, 116, 4, 2, 103, 108, 9705, 9710, 116, 114, 59, 1, 10902, 101, 115, 115, 59, 1, 10901, 4, 3, 97, 101, 105, 9724, 9729, 9734, 108, 115, 59, 1, 61, 115, 116, 59, 1, 8799, 118, 4, 2, 59, 68, 9741, 9743, 1, 8801, 68, 59, 1, 10872, 112, 97, 114, 115, 108, 59, 1, 10725, 4, 2, 68, 97, 9761, 9766, 111, 116, 59, 1, 8787, 114, 114, 59, 1, 10609, 4, 3, 99, 100, 105, 9779, 9783, 9788, 114, 59, 1, 8495, 111, 116, 59, 1, 8784, 109, 59, 1, 8770, 4, 2, 97, 104, 9798, 9801, 59, 1, 951, 5, 240, 1, 59, 9806, 1, 240, 4, 2, 109, 114, 9814, 9822, 108, 5, 235, 1, 59, 9820, 1, 235, 111, 59, 1, 8364, 4, 3, 99, 105, 112, 9834, 9838, 9843, 108, 59, 1, 33, 115, 116, 59, 1, 8707, 4, 2, 101, 111, 9849, 9859, 99, 116, 97, 116, 105, 111, 110, 59, 1, 8496, 110, 101, 110, 116, 105, 97, 108, 101, 59, 1, 8519, 4, 12, 97, 99, 101, 102, 105, 106, 108, 110, 111, 112, 114, 115, 9896, 9910, 9914, 9921, 9954, 9960, 9967, 9989, 9994, 10027, 10036, 10164, 108, 108, 105, 110, 103, 100, 111, 116, 115, 101, 113, 59, 1, 8786, 121, 59, 1, 1092, 109, 97, 108, 101, 59, 1, 9792, 4, 3, 105, 108, 114, 9929, 9935, 9950, 108, 105, 103, 59, 1, 64259, 4, 2, 105, 108, 9941, 9945, 103, 59, 1, 64256, 105, 103, 59, 1, 64260, 59, 3, 55349, 56611, 108, 105, 103, 59, 1, 64257, 108, 105, 103, 59, 3, 102, 106, 4, 3, 97, 108, 116, 9975, 9979, 9984, 116, 59, 1, 9837, 105, 103, 59, 1, 64258, 110, 115, 59, 1, 9649, 111, 102, 59, 1, 402, 4, 2, 112, 114, 1e4, 10005, 102, 59, 3, 55349, 56663, 4, 2, 97, 107, 10011, 10016, 108, 108, 59, 1, 8704, 4, 2, 59, 118, 10022, 10024, 1, 8916, 59, 1, 10969, 97, 114, 116, 105, 110, 116, 59, 1, 10765, 4, 2, 97, 111, 10042, 10159, 4, 2, 99, 115, 10048, 10155, 4, 6, 49, 50, 51, 52, 53, 55, 10062, 10102, 10114, 10135, 10139, 10151, 4, 6, 50, 51, 52, 53, 54, 56, 10076, 10083, 10086, 10093, 10096, 10099, 5, 189, 1, 59, 10081, 1, 189, 59, 1, 8531, 5, 188, 1, 59, 10091, 1, 188, 59, 1, 8533, 59, 1, 8537, 59, 1, 8539, 4, 2, 51, 53, 10108, 10111, 59, 1, 8532, 59, 1, 8534, 4, 3, 52, 53, 56, 10122, 10129, 10132, 5, 190, 1, 59, 10127, 1, 190, 59, 1, 8535, 59, 1, 8540, 53, 59, 1, 8536, 4, 2, 54, 56, 10145, 10148, 59, 1, 8538, 59, 1, 8541, 56, 59, 1, 8542, 108, 59, 1, 8260, 119, 110, 59, 1, 8994, 99, 114, 59, 3, 55349, 56507, 4, 17, 69, 97, 98, 99, 100, 101, 102, 103, 105, 106, 108, 110, 111, 114, 115, 116, 118, 10206, 10217, 10247, 10254, 10268, 10273, 10358, 10363, 10374, 10380, 10385, 10406, 10458, 10464, 10470, 10497, 10610, 4, 2, 59, 108, 10212, 10214, 1, 8807, 59, 1, 10892, 4, 3, 99, 109, 112, 10225, 10231, 10244, 117, 116, 101, 59, 1, 501, 109, 97, 4, 2, 59, 100, 10239, 10241, 1, 947, 59, 1, 989, 59, 1, 10886, 114, 101, 118, 101, 59, 1, 287, 4, 2, 105, 121, 10260, 10265, 114, 99, 59, 1, 285, 59, 1, 1075, 111, 116, 59, 1, 289, 4, 4, 59, 108, 113, 115, 10283, 10285, 10288, 10308, 1, 8805, 59, 1, 8923, 4, 3, 59, 113, 115, 10296, 10298, 10301, 1, 8805, 59, 1, 8807, 108, 97, 110, 116, 59, 1, 10878, 4, 4, 59, 99, 100, 108, 10318, 10320, 10324, 10345, 1, 10878, 99, 59, 1, 10921, 111, 116, 4, 2, 59, 111, 10332, 10334, 1, 10880, 4, 2, 59, 108, 10340, 10342, 1, 10882, 59, 1, 10884, 4, 2, 59, 101, 10351, 10354, 3, 8923, 65024, 115, 59, 1, 10900, 114, 59, 3, 55349, 56612, 4, 2, 59, 103, 10369, 10371, 1, 8811, 59, 1, 8921, 109, 101, 108, 59, 1, 8503, 99, 121, 59, 1, 1107, 4, 4, 59, 69, 97, 106, 10395, 10397, 10400, 10403, 1, 8823, 59, 1, 10898, 59, 1, 10917, 59, 1, 10916, 4, 4, 69, 97, 101, 115, 10416, 10419, 10434, 10453, 59, 1, 8809, 112, 4, 2, 59, 112, 10426, 10428, 1, 10890, 114, 111, 120, 59, 1, 10890, 4, 2, 59, 113, 10440, 10442, 1, 10888, 4, 2, 59, 113, 10448, 10450, 1, 10888, 59, 1, 8809, 105, 109, 59, 1, 8935, 112, 102, 59, 3, 55349, 56664, 97, 118, 101, 59, 1, 96, 4, 2, 99, 105, 10476, 10480, 114, 59, 1, 8458, 109, 4, 3, 59, 101, 108, 10489, 10491, 10494, 1, 8819, 59, 1, 10894, 59, 1, 10896, 5, 62, 6, 59, 99, 100, 108, 113, 114, 10512, 10514, 10527, 10532, 10538, 10545, 1, 62, 4, 2, 99, 105, 10520, 10523, 59, 1, 10919, 114, 59, 1, 10874, 111, 116, 59, 1, 8919, 80, 97, 114, 59, 1, 10645, 117, 101, 115, 116, 59, 1, 10876, 4, 5, 97, 100, 101, 108, 115, 10557, 10574, 10579, 10599, 10605, 4, 2, 112, 114, 10563, 10570, 112, 114, 111, 120, 59, 1, 10886, 114, 59, 1, 10616, 111, 116, 59, 1, 8919, 113, 4, 2, 108, 113, 10586, 10592, 101, 115, 115, 59, 1, 8923, 108, 101, 115, 115, 59, 1, 10892, 101, 115, 115, 59, 1, 8823, 105, 109, 59, 1, 8819, 4, 2, 101, 110, 10616, 10626, 114, 116, 110, 101, 113, 113, 59, 3, 8809, 65024, 69, 59, 3, 8809, 65024, 4, 10, 65, 97, 98, 99, 101, 102, 107, 111, 115, 121, 10653, 10658, 10713, 10718, 10724, 10760, 10765, 10786, 10850, 10875, 114, 114, 59, 1, 8660, 4, 4, 105, 108, 109, 114, 10668, 10674, 10678, 10684, 114, 115, 112, 59, 1, 8202, 102, 59, 1, 189, 105, 108, 116, 59, 1, 8459, 4, 2, 100, 114, 10690, 10695, 99, 121, 59, 1, 1098, 4, 3, 59, 99, 119, 10703, 10705, 10710, 1, 8596, 105, 114, 59, 1, 10568, 59, 1, 8621, 97, 114, 59, 1, 8463, 105, 114, 99, 59, 1, 293, 4, 3, 97, 108, 114, 10732, 10748, 10754, 114, 116, 115, 4, 2, 59, 117, 10741, 10743, 1, 9829, 105, 116, 59, 1, 9829, 108, 105, 112, 59, 1, 8230, 99, 111, 110, 59, 1, 8889, 114, 59, 3, 55349, 56613, 115, 4, 2, 101, 119, 10772, 10779, 97, 114, 111, 119, 59, 1, 10533, 97, 114, 111, 119, 59, 1, 10534, 4, 5, 97, 109, 111, 112, 114, 10798, 10803, 10809, 10839, 10844, 114, 114, 59, 1, 8703, 116, 104, 116, 59, 1, 8763, 107, 4, 2, 108, 114, 10816, 10827, 101, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8617, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8618, 102, 59, 3, 55349, 56665, 98, 97, 114, 59, 1, 8213, 4, 3, 99, 108, 116, 10858, 10863, 10869, 114, 59, 3, 55349, 56509, 97, 115, 104, 59, 1, 8463, 114, 111, 107, 59, 1, 295, 4, 2, 98, 112, 10881, 10887, 117, 108, 108, 59, 1, 8259, 104, 101, 110, 59, 1, 8208, 4, 15, 97, 99, 101, 102, 103, 105, 106, 109, 110, 111, 112, 113, 115, 116, 117, 10925, 10936, 10958, 10977, 10990, 11001, 11039, 11045, 11101, 11192, 11220, 11226, 11237, 11285, 11299, 99, 117, 116, 101, 5, 237, 1, 59, 10934, 1, 237, 4, 3, 59, 105, 121, 10944, 10946, 10955, 1, 8291, 114, 99, 5, 238, 1, 59, 10953, 1, 238, 59, 1, 1080, 4, 2, 99, 120, 10964, 10968, 121, 59, 1, 1077, 99, 108, 5, 161, 1, 59, 10975, 1, 161, 4, 2, 102, 114, 10983, 10986, 59, 1, 8660, 59, 3, 55349, 56614, 114, 97, 118, 101, 5, 236, 1, 59, 10999, 1, 236, 4, 4, 59, 105, 110, 111, 11011, 11013, 11028, 11034, 1, 8520, 4, 2, 105, 110, 11019, 11024, 110, 116, 59, 1, 10764, 116, 59, 1, 8749, 102, 105, 110, 59, 1, 10716, 116, 97, 59, 1, 8489, 108, 105, 103, 59, 1, 307, 4, 3, 97, 111, 112, 11053, 11092, 11096, 4, 3, 99, 103, 116, 11061, 11065, 11088, 114, 59, 1, 299, 4, 3, 101, 108, 112, 11073, 11076, 11082, 59, 1, 8465, 105, 110, 101, 59, 1, 8464, 97, 114, 116, 59, 1, 8465, 104, 59, 1, 305, 102, 59, 1, 8887, 101, 100, 59, 1, 437, 4, 5, 59, 99, 102, 111, 116, 11113, 11115, 11121, 11136, 11142, 1, 8712, 97, 114, 101, 59, 1, 8453, 105, 110, 4, 2, 59, 116, 11129, 11131, 1, 8734, 105, 101, 59, 1, 10717, 100, 111, 116, 59, 1, 305, 4, 5, 59, 99, 101, 108, 112, 11154, 11156, 11161, 11179, 11186, 1, 8747, 97, 108, 59, 1, 8890, 4, 2, 103, 114, 11167, 11173, 101, 114, 115, 59, 1, 8484, 99, 97, 108, 59, 1, 8890, 97, 114, 104, 107, 59, 1, 10775, 114, 111, 100, 59, 1, 10812, 4, 4, 99, 103, 112, 116, 11202, 11206, 11211, 11216, 121, 59, 1, 1105, 111, 110, 59, 1, 303, 102, 59, 3, 55349, 56666, 97, 59, 1, 953, 114, 111, 100, 59, 1, 10812, 117, 101, 115, 116, 5, 191, 1, 59, 11235, 1, 191, 4, 2, 99, 105, 11243, 11248, 114, 59, 3, 55349, 56510, 110, 4, 5, 59, 69, 100, 115, 118, 11261, 11263, 11266, 11271, 11282, 1, 8712, 59, 1, 8953, 111, 116, 59, 1, 8949, 4, 2, 59, 118, 11277, 11279, 1, 8948, 59, 1, 8947, 59, 1, 8712, 4, 2, 59, 105, 11291, 11293, 1, 8290, 108, 100, 101, 59, 1, 297, 4, 2, 107, 109, 11305, 11310, 99, 121, 59, 1, 1110, 108, 5, 239, 1, 59, 11316, 1, 239, 4, 6, 99, 102, 109, 111, 115, 117, 11332, 11346, 11351, 11357, 11363, 11380, 4, 2, 105, 121, 11338, 11343, 114, 99, 59, 1, 309, 59, 1, 1081, 114, 59, 3, 55349, 56615, 97, 116, 104, 59, 1, 567, 112, 102, 59, 3, 55349, 56667, 4, 2, 99, 101, 11369, 11374, 114, 59, 3, 55349, 56511, 114, 99, 121, 59, 1, 1112, 107, 99, 121, 59, 1, 1108, 4, 8, 97, 99, 102, 103, 104, 106, 111, 115, 11404, 11418, 11433, 11438, 11445, 11450, 11455, 11461, 112, 112, 97, 4, 2, 59, 118, 11413, 11415, 1, 954, 59, 1, 1008, 4, 2, 101, 121, 11424, 11430, 100, 105, 108, 59, 1, 311, 59, 1, 1082, 114, 59, 3, 55349, 56616, 114, 101, 101, 110, 59, 1, 312, 99, 121, 59, 1, 1093, 99, 121, 59, 1, 1116, 112, 102, 59, 3, 55349, 56668, 99, 114, 59, 3, 55349, 56512, 4, 23, 65, 66, 69, 72, 97, 98, 99, 100, 101, 102, 103, 104, 106, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 11515, 11538, 11544, 11555, 11560, 11721, 11780, 11818, 11868, 12136, 12160, 12171, 12203, 12208, 12246, 12275, 12327, 12509, 12523, 12569, 12641, 12732, 12752, 4, 3, 97, 114, 116, 11523, 11528, 11532, 114, 114, 59, 1, 8666, 114, 59, 1, 8656, 97, 105, 108, 59, 1, 10523, 97, 114, 114, 59, 1, 10510, 4, 2, 59, 103, 11550, 11552, 1, 8806, 59, 1, 10891, 97, 114, 59, 1, 10594, 4, 9, 99, 101, 103, 109, 110, 112, 113, 114, 116, 11580, 11586, 11594, 11600, 11606, 11624, 11627, 11636, 11694, 117, 116, 101, 59, 1, 314, 109, 112, 116, 121, 118, 59, 1, 10676, 114, 97, 110, 59, 1, 8466, 98, 100, 97, 59, 1, 955, 103, 4, 3, 59, 100, 108, 11615, 11617, 11620, 1, 10216, 59, 1, 10641, 101, 59, 1, 10216, 59, 1, 10885, 117, 111, 5, 171, 1, 59, 11634, 1, 171, 114, 4, 8, 59, 98, 102, 104, 108, 112, 115, 116, 11655, 11657, 11669, 11673, 11677, 11681, 11685, 11690, 1, 8592, 4, 2, 59, 102, 11663, 11665, 1, 8676, 115, 59, 1, 10527, 115, 59, 1, 10525, 107, 59, 1, 8617, 112, 59, 1, 8619, 108, 59, 1, 10553, 105, 109, 59, 1, 10611, 108, 59, 1, 8610, 4, 3, 59, 97, 101, 11702, 11704, 11709, 1, 10923, 105, 108, 59, 1, 10521, 4, 2, 59, 115, 11715, 11717, 1, 10925, 59, 3, 10925, 65024, 4, 3, 97, 98, 114, 11729, 11734, 11739, 114, 114, 59, 1, 10508, 114, 107, 59, 1, 10098, 4, 2, 97, 107, 11745, 11758, 99, 4, 2, 101, 107, 11752, 11755, 59, 1, 123, 59, 1, 91, 4, 2, 101, 115, 11764, 11767, 59, 1, 10635, 108, 4, 2, 100, 117, 11774, 11777, 59, 1, 10639, 59, 1, 10637, 4, 4, 97, 101, 117, 121, 11790, 11796, 11811, 11815, 114, 111, 110, 59, 1, 318, 4, 2, 100, 105, 11802, 11807, 105, 108, 59, 1, 316, 108, 59, 1, 8968, 98, 59, 1, 123, 59, 1, 1083, 4, 4, 99, 113, 114, 115, 11828, 11832, 11845, 11864, 97, 59, 1, 10550, 117, 111, 4, 2, 59, 114, 11840, 11842, 1, 8220, 59, 1, 8222, 4, 2, 100, 117, 11851, 11857, 104, 97, 114, 59, 1, 10599, 115, 104, 97, 114, 59, 1, 10571, 104, 59, 1, 8626, 4, 5, 59, 102, 103, 113, 115, 11880, 11882, 12008, 12011, 12031, 1, 8804, 116, 4, 5, 97, 104, 108, 114, 116, 11895, 11913, 11935, 11947, 11996, 114, 114, 111, 119, 4, 2, 59, 116, 11905, 11907, 1, 8592, 97, 105, 108, 59, 1, 8610, 97, 114, 112, 111, 111, 110, 4, 2, 100, 117, 11925, 11931, 111, 119, 110, 59, 1, 8637, 112, 59, 1, 8636, 101, 102, 116, 97, 114, 114, 111, 119, 115, 59, 1, 8647, 105, 103, 104, 116, 4, 3, 97, 104, 115, 11959, 11974, 11984, 114, 114, 111, 119, 4, 2, 59, 115, 11969, 11971, 1, 8596, 59, 1, 8646, 97, 114, 112, 111, 111, 110, 115, 59, 1, 8651, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1, 8621, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8907, 59, 1, 8922, 4, 3, 59, 113, 115, 12019, 12021, 12024, 1, 8804, 59, 1, 8806, 108, 97, 110, 116, 59, 1, 10877, 4, 5, 59, 99, 100, 103, 115, 12043, 12045, 12049, 12070, 12083, 1, 10877, 99, 59, 1, 10920, 111, 116, 4, 2, 59, 111, 12057, 12059, 1, 10879, 4, 2, 59, 114, 12065, 12067, 1, 10881, 59, 1, 10883, 4, 2, 59, 101, 12076, 12079, 3, 8922, 65024, 115, 59, 1, 10899, 4, 5, 97, 100, 101, 103, 115, 12095, 12103, 12108, 12126, 12131, 112, 112, 114, 111, 120, 59, 1, 10885, 111, 116, 59, 1, 8918, 113, 4, 2, 103, 113, 12115, 12120, 116, 114, 59, 1, 8922, 103, 116, 114, 59, 1, 10891, 116, 114, 59, 1, 8822, 105, 109, 59, 1, 8818, 4, 3, 105, 108, 114, 12144, 12150, 12156, 115, 104, 116, 59, 1, 10620, 111, 111, 114, 59, 1, 8970, 59, 3, 55349, 56617, 4, 2, 59, 69, 12166, 12168, 1, 8822, 59, 1, 10897, 4, 2, 97, 98, 12177, 12198, 114, 4, 2, 100, 117, 12184, 12187, 59, 1, 8637, 4, 2, 59, 108, 12193, 12195, 1, 8636, 59, 1, 10602, 108, 107, 59, 1, 9604, 99, 121, 59, 1, 1113, 4, 5, 59, 97, 99, 104, 116, 12220, 12222, 12227, 12235, 12241, 1, 8810, 114, 114, 59, 1, 8647, 111, 114, 110, 101, 114, 59, 1, 8990, 97, 114, 100, 59, 1, 10603, 114, 105, 59, 1, 9722, 4, 2, 105, 111, 12252, 12258, 100, 111, 116, 59, 1, 320, 117, 115, 116, 4, 2, 59, 97, 12267, 12269, 1, 9136, 99, 104, 101, 59, 1, 9136, 4, 4, 69, 97, 101, 115, 12285, 12288, 12303, 12322, 59, 1, 8808, 112, 4, 2, 59, 112, 12295, 12297, 1, 10889, 114, 111, 120, 59, 1, 10889, 4, 2, 59, 113, 12309, 12311, 1, 10887, 4, 2, 59, 113, 12317, 12319, 1, 10887, 59, 1, 8808, 105, 109, 59, 1, 8934, 4, 8, 97, 98, 110, 111, 112, 116, 119, 122, 12345, 12359, 12364, 12421, 12446, 12467, 12474, 12490, 4, 2, 110, 114, 12351, 12355, 103, 59, 1, 10220, 114, 59, 1, 8701, 114, 107, 59, 1, 10214, 103, 4, 3, 108, 109, 114, 12373, 12401, 12409, 101, 102, 116, 4, 2, 97, 114, 12382, 12389, 114, 114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10231, 97, 112, 115, 116, 111, 59, 1, 10236, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10230, 112, 97, 114, 114, 111, 119, 4, 2, 108, 114, 12433, 12439, 101, 102, 116, 59, 1, 8619, 105, 103, 104, 116, 59, 1, 8620, 4, 3, 97, 102, 108, 12454, 12458, 12462, 114, 59, 1, 10629, 59, 3, 55349, 56669, 117, 115, 59, 1, 10797, 105, 109, 101, 115, 59, 1, 10804, 4, 2, 97, 98, 12480, 12485, 115, 116, 59, 1, 8727, 97, 114, 59, 1, 95, 4, 3, 59, 101, 102, 12498, 12500, 12506, 1, 9674, 110, 103, 101, 59, 1, 9674, 59, 1, 10731, 97, 114, 4, 2, 59, 108, 12517, 12519, 1, 40, 116, 59, 1, 10643, 4, 5, 97, 99, 104, 109, 116, 12535, 12540, 12548, 12561, 12564, 114, 114, 59, 1, 8646, 111, 114, 110, 101, 114, 59, 1, 8991, 97, 114, 4, 2, 59, 100, 12556, 12558, 1, 8651, 59, 1, 10605, 59, 1, 8206, 114, 105, 59, 1, 8895, 4, 6, 97, 99, 104, 105, 113, 116, 12583, 12589, 12594, 12597, 12614, 12635, 113, 117, 111, 59, 1, 8249, 114, 59, 3, 55349, 56513, 59, 1, 8624, 109, 4, 3, 59, 101, 103, 12606, 12608, 12611, 1, 8818, 59, 1, 10893, 59, 1, 10895, 4, 2, 98, 117, 12620, 12623, 59, 1, 91, 111, 4, 2, 59, 114, 12630, 12632, 1, 8216, 59, 1, 8218, 114, 111, 107, 59, 1, 322, 5, 60, 8, 59, 99, 100, 104, 105, 108, 113, 114, 12660, 12662, 12675, 12680, 12686, 12692, 12698, 12705, 1, 60, 4, 2, 99, 105, 12668, 12671, 59, 1, 10918, 114, 59, 1, 10873, 111, 116, 59, 1, 8918, 114, 101, 101, 59, 1, 8907, 109, 101, 115, 59, 1, 8905, 97, 114, 114, 59, 1, 10614, 117, 101, 115, 116, 59, 1, 10875, 4, 2, 80, 105, 12711, 12716, 97, 114, 59, 1, 10646, 4, 3, 59, 101, 102, 12724, 12726, 12729, 1, 9667, 59, 1, 8884, 59, 1, 9666, 114, 4, 2, 100, 117, 12739, 12746, 115, 104, 97, 114, 59, 1, 10570, 104, 97, 114, 59, 1, 10598, 4, 2, 101, 110, 12758, 12768, 114, 116, 110, 101, 113, 113, 59, 3, 8808, 65024, 69, 59, 3, 8808, 65024, 4, 14, 68, 97, 99, 100, 101, 102, 104, 105, 108, 110, 111, 112, 115, 117, 12803, 12809, 12893, 12908, 12914, 12928, 12933, 12937, 13011, 13025, 13032, 13049, 13052, 13069, 68, 111, 116, 59, 1, 8762, 4, 4, 99, 108, 112, 114, 12819, 12827, 12849, 12887, 114, 5, 175, 1, 59, 12825, 1, 175, 4, 2, 101, 116, 12833, 12836, 59, 1, 9794, 4, 2, 59, 101, 12842, 12844, 1, 10016, 115, 101, 59, 1, 10016, 4, 2, 59, 115, 12855, 12857, 1, 8614, 116, 111, 4, 4, 59, 100, 108, 117, 12869, 12871, 12877, 12883, 1, 8614, 111, 119, 110, 59, 1, 8615, 101, 102, 116, 59, 1, 8612, 112, 59, 1, 8613, 107, 101, 114, 59, 1, 9646, 4, 2, 111, 121, 12899, 12905, 109, 109, 97, 59, 1, 10793, 59, 1, 1084, 97, 115, 104, 59, 1, 8212, 97, 115, 117, 114, 101, 100, 97, 110, 103, 108, 101, 59, 1, 8737, 114, 59, 3, 55349, 56618, 111, 59, 1, 8487, 4, 3, 99, 100, 110, 12945, 12954, 12985, 114, 111, 5, 181, 1, 59, 12952, 1, 181, 4, 4, 59, 97, 99, 100, 12964, 12966, 12971, 12976, 1, 8739, 115, 116, 59, 1, 42, 105, 114, 59, 1, 10992, 111, 116, 5, 183, 1, 59, 12983, 1, 183, 117, 115, 4, 3, 59, 98, 100, 12995, 12997, 13e3, 1, 8722, 59, 1, 8863, 4, 2, 59, 117, 13006, 13008, 1, 8760, 59, 1, 10794, 4, 2, 99, 100, 13017, 13021, 112, 59, 1, 10971, 114, 59, 1, 8230, 112, 108, 117, 115, 59, 1, 8723, 4, 2, 100, 112, 13038, 13044, 101, 108, 115, 59, 1, 8871, 102, 59, 3, 55349, 56670, 59, 1, 8723, 4, 2, 99, 116, 13058, 13063, 114, 59, 3, 55349, 56514, 112, 111, 115, 59, 1, 8766, 4, 3, 59, 108, 109, 13077, 13079, 13087, 1, 956, 116, 105, 109, 97, 112, 59, 1, 8888, 97, 112, 59, 1, 8888, 4, 24, 71, 76, 82, 86, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 108, 109, 111, 112, 114, 115, 116, 117, 118, 119, 13142, 13165, 13217, 13229, 13247, 13330, 13359, 13414, 13420, 13508, 13513, 13579, 13602, 13626, 13631, 13762, 13767, 13855, 13936, 13995, 14214, 14285, 14312, 14432, 4, 2, 103, 116, 13148, 13152, 59, 3, 8921, 824, 4, 2, 59, 118, 13158, 13161, 3, 8811, 8402, 59, 3, 8811, 824, 4, 3, 101, 108, 116, 13173, 13200, 13204, 102, 116, 4, 2, 97, 114, 13181, 13188, 114, 114, 111, 119, 59, 1, 8653, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8654, 59, 3, 8920, 824, 4, 2, 59, 118, 13210, 13213, 3, 8810, 8402, 59, 3, 8810, 824, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8655, 4, 2, 68, 100, 13235, 13241, 97, 115, 104, 59, 1, 8879, 97, 115, 104, 59, 1, 8878, 4, 5, 98, 99, 110, 112, 116, 13259, 13264, 13270, 13275, 13308, 108, 97, 59, 1, 8711, 117, 116, 101, 59, 1, 324, 103, 59, 3, 8736, 8402, 4, 5, 59, 69, 105, 111, 112, 13287, 13289, 13293, 13298, 13302, 1, 8777, 59, 3, 10864, 824, 100, 59, 3, 8779, 824, 115, 59, 1, 329, 114, 111, 120, 59, 1, 8777, 117, 114, 4, 2, 59, 97, 13316, 13318, 1, 9838, 108, 4, 2, 59, 115, 13325, 13327, 1, 9838, 59, 1, 8469, 4, 2, 115, 117, 13336, 13344, 112, 5, 160, 1, 59, 13342, 1, 160, 109, 112, 4, 2, 59, 101, 13352, 13355, 3, 8782, 824, 59, 3, 8783, 824, 4, 5, 97, 101, 111, 117, 121, 13371, 13385, 13391, 13407, 13411, 4, 2, 112, 114, 13377, 13380, 59, 1, 10819, 111, 110, 59, 1, 328, 100, 105, 108, 59, 1, 326, 110, 103, 4, 2, 59, 100, 13399, 13401, 1, 8775, 111, 116, 59, 3, 10861, 824, 112, 59, 1, 10818, 59, 1, 1085, 97, 115, 104, 59, 1, 8211, 4, 7, 59, 65, 97, 100, 113, 115, 120, 13436, 13438, 13443, 13466, 13472, 13478, 13494, 1, 8800, 114, 114, 59, 1, 8663, 114, 4, 2, 104, 114, 13450, 13454, 107, 59, 1, 10532, 4, 2, 59, 111, 13460, 13462, 1, 8599, 119, 59, 1, 8599, 111, 116, 59, 3, 8784, 824, 117, 105, 118, 59, 1, 8802, 4, 2, 101, 105, 13484, 13489, 97, 114, 59, 1, 10536, 109, 59, 3, 8770, 824, 105, 115, 116, 4, 2, 59, 115, 13503, 13505, 1, 8708, 59, 1, 8708, 114, 59, 3, 55349, 56619, 4, 4, 69, 101, 115, 116, 13523, 13527, 13563, 13568, 59, 3, 8807, 824, 4, 3, 59, 113, 115, 13535, 13537, 13559, 1, 8817, 4, 3, 59, 113, 115, 13545, 13547, 13551, 1, 8817, 59, 3, 8807, 824, 108, 97, 110, 116, 59, 3, 10878, 824, 59, 3, 10878, 824, 105, 109, 59, 1, 8821, 4, 2, 59, 114, 13574, 13576, 1, 8815, 59, 1, 8815, 4, 3, 65, 97, 112, 13587, 13592, 13597, 114, 114, 59, 1, 8654, 114, 114, 59, 1, 8622, 97, 114, 59, 1, 10994, 4, 3, 59, 115, 118, 13610, 13612, 13623, 1, 8715, 4, 2, 59, 100, 13618, 13620, 1, 8956, 59, 1, 8954, 59, 1, 8715, 99, 121, 59, 1, 1114, 4, 7, 65, 69, 97, 100, 101, 115, 116, 13647, 13652, 13656, 13661, 13665, 13737, 13742, 114, 114, 59, 1, 8653, 59, 3, 8806, 824, 114, 114, 59, 1, 8602, 114, 59, 1, 8229, 4, 4, 59, 102, 113, 115, 13675, 13677, 13703, 13725, 1, 8816, 116, 4, 2, 97, 114, 13684, 13691, 114, 114, 111, 119, 59, 1, 8602, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8622, 4, 3, 59, 113, 115, 13711, 13713, 13717, 1, 8816, 59, 3, 8806, 824, 108, 97, 110, 116, 59, 3, 10877, 824, 4, 2, 59, 115, 13731, 13734, 3, 10877, 824, 59, 1, 8814, 105, 109, 59, 1, 8820, 4, 2, 59, 114, 13748, 13750, 1, 8814, 105, 4, 2, 59, 101, 13757, 13759, 1, 8938, 59, 1, 8940, 105, 100, 59, 1, 8740, 4, 2, 112, 116, 13773, 13778, 102, 59, 3, 55349, 56671, 5, 172, 3, 59, 105, 110, 13787, 13789, 13829, 1, 172, 110, 4, 4, 59, 69, 100, 118, 13800, 13802, 13806, 13812, 1, 8713, 59, 3, 8953, 824, 111, 116, 59, 3, 8949, 824, 4, 3, 97, 98, 99, 13820, 13823, 13826, 59, 1, 8713, 59, 1, 8951, 59, 1, 8950, 105, 4, 2, 59, 118, 13836, 13838, 1, 8716, 4, 3, 97, 98, 99, 13846, 13849, 13852, 59, 1, 8716, 59, 1, 8958, 59, 1, 8957, 4, 3, 97, 111, 114, 13863, 13892, 13899, 114, 4, 4, 59, 97, 115, 116, 13874, 13876, 13883, 13888, 1, 8742, 108, 108, 101, 108, 59, 1, 8742, 108, 59, 3, 11005, 8421, 59, 3, 8706, 824, 108, 105, 110, 116, 59, 1, 10772, 4, 3, 59, 99, 101, 13907, 13909, 13914, 1, 8832, 117, 101, 59, 1, 8928, 4, 2, 59, 99, 13920, 13923, 3, 10927, 824, 4, 2, 59, 101, 13929, 13931, 1, 8832, 113, 59, 3, 10927, 824, 4, 4, 65, 97, 105, 116, 13946, 13951, 13971, 13982, 114, 114, 59, 1, 8655, 114, 114, 4, 3, 59, 99, 119, 13961, 13963, 13967, 1, 8603, 59, 3, 10547, 824, 59, 3, 8605, 824, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8603, 114, 105, 4, 2, 59, 101, 13990, 13992, 1, 8939, 59, 1, 8941, 4, 7, 99, 104, 105, 109, 112, 113, 117, 14011, 14036, 14060, 14080, 14085, 14090, 14106, 4, 4, 59, 99, 101, 114, 14021, 14023, 14028, 14032, 1, 8833, 117, 101, 59, 1, 8929, 59, 3, 10928, 824, 59, 3, 55349, 56515, 111, 114, 116, 4, 2, 109, 112, 14045, 14050, 105, 100, 59, 1, 8740, 97, 114, 97, 108, 108, 101, 108, 59, 1, 8742, 109, 4, 2, 59, 101, 14067, 14069, 1, 8769, 4, 2, 59, 113, 14075, 14077, 1, 8772, 59, 1, 8772, 105, 100, 59, 1, 8740, 97, 114, 59, 1, 8742, 115, 117, 4, 2, 98, 112, 14098, 14102, 101, 59, 1, 8930, 101, 59, 1, 8931, 4, 3, 98, 99, 112, 14114, 14157, 14171, 4, 4, 59, 69, 101, 115, 14124, 14126, 14130, 14133, 1, 8836, 59, 3, 10949, 824, 59, 1, 8840, 101, 116, 4, 2, 59, 101, 14141, 14144, 3, 8834, 8402, 113, 4, 2, 59, 113, 14151, 14153, 1, 8840, 59, 3, 10949, 824, 99, 4, 2, 59, 101, 14164, 14166, 1, 8833, 113, 59, 3, 10928, 824, 4, 4, 59, 69, 101, 115, 14181, 14183, 14187, 14190, 1, 8837, 59, 3, 10950, 824, 59, 1, 8841, 101, 116, 4, 2, 59, 101, 14198, 14201, 3, 8835, 8402, 113, 4, 2, 59, 113, 14208, 14210, 1, 8841, 59, 3, 10950, 824, 4, 4, 103, 105, 108, 114, 14224, 14228, 14238, 14242, 108, 59, 1, 8825, 108, 100, 101, 5, 241, 1, 59, 14236, 1, 241, 103, 59, 1, 8824, 105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 14254, 14269, 101, 102, 116, 4, 2, 59, 101, 14263, 14265, 1, 8938, 113, 59, 1, 8940, 105, 103, 104, 116, 4, 2, 59, 101, 14279, 14281, 1, 8939, 113, 59, 1, 8941, 4, 2, 59, 109, 14291, 14293, 1, 957, 4, 3, 59, 101, 115, 14301, 14303, 14308, 1, 35, 114, 111, 59, 1, 8470, 112, 59, 1, 8199, 4, 9, 68, 72, 97, 100, 103, 105, 108, 114, 115, 14332, 14338, 14344, 14349, 14355, 14369, 14376, 14408, 14426, 97, 115, 104, 59, 1, 8877, 97, 114, 114, 59, 1, 10500, 112, 59, 3, 8781, 8402, 97, 115, 104, 59, 1, 8876, 4, 2, 101, 116, 14361, 14365, 59, 3, 8805, 8402, 59, 3, 62, 8402, 110, 102, 105, 110, 59, 1, 10718, 4, 3, 65, 101, 116, 14384, 14389, 14393, 114, 114, 59, 1, 10498, 59, 3, 8804, 8402, 4, 2, 59, 114, 14399, 14402, 3, 60, 8402, 105, 101, 59, 3, 8884, 8402, 4, 2, 65, 116, 14414, 14419, 114, 114, 59, 1, 10499, 114, 105, 101, 59, 3, 8885, 8402, 105, 109, 59, 3, 8764, 8402, 4, 3, 65, 97, 110, 14440, 14445, 14468, 114, 114, 59, 1, 8662, 114, 4, 2, 104, 114, 14452, 14456, 107, 59, 1, 10531, 4, 2, 59, 111, 14462, 14464, 1, 8598, 119, 59, 1, 8598, 101, 97, 114, 59, 1, 10535, 4, 18, 83, 97, 99, 100, 101, 102, 103, 104, 105, 108, 109, 111, 112, 114, 115, 116, 117, 118, 14512, 14515, 14535, 14560, 14597, 14603, 14618, 14643, 14657, 14662, 14701, 14741, 14747, 14769, 14851, 14877, 14907, 14916, 59, 1, 9416, 4, 2, 99, 115, 14521, 14531, 117, 116, 101, 5, 243, 1, 59, 14529, 1, 243, 116, 59, 1, 8859, 4, 2, 105, 121, 14541, 14557, 114, 4, 2, 59, 99, 14548, 14550, 1, 8858, 5, 244, 1, 59, 14555, 1, 244, 59, 1, 1086, 4, 5, 97, 98, 105, 111, 115, 14572, 14577, 14583, 14587, 14591, 115, 104, 59, 1, 8861, 108, 97, 99, 59, 1, 337, 118, 59, 1, 10808, 116, 59, 1, 8857, 111, 108, 100, 59, 1, 10684, 108, 105, 103, 59, 1, 339, 4, 2, 99, 114, 14609, 14614, 105, 114, 59, 1, 10687, 59, 3, 55349, 56620, 4, 3, 111, 114, 116, 14626, 14630, 14640, 110, 59, 1, 731, 97, 118, 101, 5, 242, 1, 59, 14638, 1, 242, 59, 1, 10689, 4, 2, 98, 109, 14649, 14654, 97, 114, 59, 1, 10677, 59, 1, 937, 110, 116, 59, 1, 8750, 4, 4, 97, 99, 105, 116, 14672, 14677, 14693, 14698, 114, 114, 59, 1, 8634, 4, 2, 105, 114, 14683, 14687, 114, 59, 1, 10686, 111, 115, 115, 59, 1, 10683, 110, 101, 59, 1, 8254, 59, 1, 10688, 4, 3, 97, 101, 105, 14709, 14714, 14719, 99, 114, 59, 1, 333, 103, 97, 59, 1, 969, 4, 3, 99, 100, 110, 14727, 14733, 14736, 114, 111, 110, 59, 1, 959, 59, 1, 10678, 117, 115, 59, 1, 8854, 112, 102, 59, 3, 55349, 56672, 4, 3, 97, 101, 108, 14755, 14759, 14764, 114, 59, 1, 10679, 114, 112, 59, 1, 10681, 117, 115, 59, 1, 8853, 4, 7, 59, 97, 100, 105, 111, 115, 118, 14785, 14787, 14792, 14831, 14837, 14841, 14848, 1, 8744, 114, 114, 59, 1, 8635, 4, 4, 59, 101, 102, 109, 14802, 14804, 14817, 14824, 1, 10845, 114, 4, 2, 59, 111, 14811, 14813, 1, 8500, 102, 59, 1, 8500, 5, 170, 1, 59, 14822, 1, 170, 5, 186, 1, 59, 14829, 1, 186, 103, 111, 102, 59, 1, 8886, 114, 59, 1, 10838, 108, 111, 112, 101, 59, 1, 10839, 59, 1, 10843, 4, 3, 99, 108, 111, 14859, 14863, 14873, 114, 59, 1, 8500, 97, 115, 104, 5, 248, 1, 59, 14871, 1, 248, 108, 59, 1, 8856, 105, 4, 2, 108, 109, 14884, 14893, 100, 101, 5, 245, 1, 59, 14891, 1, 245, 101, 115, 4, 2, 59, 97, 14901, 14903, 1, 8855, 115, 59, 1, 10806, 109, 108, 5, 246, 1, 59, 14914, 1, 246, 98, 97, 114, 59, 1, 9021, 4, 12, 97, 99, 101, 102, 104, 105, 108, 109, 111, 114, 115, 117, 14948, 14992, 14996, 15033, 15038, 15068, 15090, 15189, 15192, 15222, 15427, 15441, 114, 4, 4, 59, 97, 115, 116, 14959, 14961, 14976, 14989, 1, 8741, 5, 182, 2, 59, 108, 14968, 14970, 1, 182, 108, 101, 108, 59, 1, 8741, 4, 2, 105, 108, 14982, 14986, 109, 59, 1, 10995, 59, 1, 11005, 59, 1, 8706, 121, 59, 1, 1087, 114, 4, 5, 99, 105, 109, 112, 116, 15009, 15014, 15019, 15024, 15027, 110, 116, 59, 1, 37, 111, 100, 59, 1, 46, 105, 108, 59, 1, 8240, 59, 1, 8869, 101, 110, 107, 59, 1, 8241, 114, 59, 3, 55349, 56621, 4, 3, 105, 109, 111, 15046, 15057, 15063, 4, 2, 59, 118, 15052, 15054, 1, 966, 59, 1, 981, 109, 97, 116, 59, 1, 8499, 110, 101, 59, 1, 9742, 4, 3, 59, 116, 118, 15076, 15078, 15087, 1, 960, 99, 104, 102, 111, 114, 107, 59, 1, 8916, 59, 1, 982, 4, 2, 97, 117, 15096, 15119, 110, 4, 2, 99, 107, 15103, 15115, 107, 4, 2, 59, 104, 15110, 15112, 1, 8463, 59, 1, 8462, 118, 59, 1, 8463, 115, 4, 9, 59, 97, 98, 99, 100, 101, 109, 115, 116, 15140, 15142, 15148, 15151, 15156, 15168, 15171, 15179, 15184, 1, 43, 99, 105, 114, 59, 1, 10787, 59, 1, 8862, 105, 114, 59, 1, 10786, 4, 2, 111, 117, 15162, 15165, 59, 1, 8724, 59, 1, 10789, 59, 1, 10866, 110, 5, 177, 1, 59, 15177, 1, 177, 105, 109, 59, 1, 10790, 119, 111, 59, 1, 10791, 59, 1, 177, 4, 3, 105, 112, 117, 15200, 15208, 15213, 110, 116, 105, 110, 116, 59, 1, 10773, 102, 59, 3, 55349, 56673, 110, 100, 5, 163, 1, 59, 15220, 1, 163, 4, 10, 59, 69, 97, 99, 101, 105, 110, 111, 115, 117, 15244, 15246, 15249, 15253, 15258, 15334, 15347, 15367, 15416, 15421, 1, 8826, 59, 1, 10931, 112, 59, 1, 10935, 117, 101, 59, 1, 8828, 4, 2, 59, 99, 15264, 15266, 1, 10927, 4, 6, 59, 97, 99, 101, 110, 115, 15280, 15282, 15290, 15299, 15303, 15329, 1, 8826, 112, 112, 114, 111, 120, 59, 1, 10935, 117, 114, 108, 121, 101, 113, 59, 1, 8828, 113, 59, 1, 10927, 4, 3, 97, 101, 115, 15311, 15319, 15324, 112, 112, 114, 111, 120, 59, 1, 10937, 113, 113, 59, 1, 10933, 105, 109, 59, 1, 8936, 105, 109, 59, 1, 8830, 109, 101, 4, 2, 59, 115, 15342, 15344, 1, 8242, 59, 1, 8473, 4, 3, 69, 97, 115, 15355, 15358, 15362, 59, 1, 10933, 112, 59, 1, 10937, 105, 109, 59, 1, 8936, 4, 3, 100, 102, 112, 15375, 15378, 15404, 59, 1, 8719, 4, 3, 97, 108, 115, 15386, 15392, 15398, 108, 97, 114, 59, 1, 9006, 105, 110, 101, 59, 1, 8978, 117, 114, 102, 59, 1, 8979, 4, 2, 59, 116, 15410, 15412, 1, 8733, 111, 59, 1, 8733, 105, 109, 59, 1, 8830, 114, 101, 108, 59, 1, 8880, 4, 2, 99, 105, 15433, 15438, 114, 59, 3, 55349, 56517, 59, 1, 968, 110, 99, 115, 112, 59, 1, 8200, 4, 6, 102, 105, 111, 112, 115, 117, 15462, 15467, 15472, 15478, 15485, 15491, 114, 59, 3, 55349, 56622, 110, 116, 59, 1, 10764, 112, 102, 59, 3, 55349, 56674, 114, 105, 109, 101, 59, 1, 8279, 99, 114, 59, 3, 55349, 56518, 4, 3, 97, 101, 111, 15499, 15520, 15534, 116, 4, 2, 101, 105, 15506, 15515, 114, 110, 105, 111, 110, 115, 59, 1, 8461, 110, 116, 59, 1, 10774, 115, 116, 4, 2, 59, 101, 15528, 15530, 1, 63, 113, 59, 1, 8799, 116, 5, 34, 1, 59, 15540, 1, 34, 4, 21, 65, 66, 72, 97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 110, 111, 112, 114, 115, 116, 117, 120, 15586, 15609, 15615, 15620, 15796, 15855, 15893, 15931, 15977, 16001, 16039, 16183, 16204, 16222, 16228, 16285, 16312, 16318, 16363, 16408, 16416, 4, 3, 97, 114, 116, 15594, 15599, 15603, 114, 114, 59, 1, 8667, 114, 59, 1, 8658, 97, 105, 108, 59, 1, 10524, 97, 114, 114, 59, 1, 10511, 97, 114, 59, 1, 10596, 4, 7, 99, 100, 101, 110, 113, 114, 116, 15636, 15651, 15656, 15664, 15687, 15696, 15770, 4, 2, 101, 117, 15642, 15646, 59, 3, 8765, 817, 116, 101, 59, 1, 341, 105, 99, 59, 1, 8730, 109, 112, 116, 121, 118, 59, 1, 10675, 103, 4, 4, 59, 100, 101, 108, 15675, 15677, 15680, 15683, 1, 10217, 59, 1, 10642, 59, 1, 10661, 101, 59, 1, 10217, 117, 111, 5, 187, 1, 59, 15694, 1, 187, 114, 4, 11, 59, 97, 98, 99, 102, 104, 108, 112, 115, 116, 119, 15721, 15723, 15727, 15739, 15742, 15746, 15750, 15754, 15758, 15763, 15767, 1, 8594, 112, 59, 1, 10613, 4, 2, 59, 102, 15733, 15735, 1, 8677, 115, 59, 1, 10528, 59, 1, 10547, 115, 59, 1, 10526, 107, 59, 1, 8618, 112, 59, 1, 8620, 108, 59, 1, 10565, 105, 109, 59, 1, 10612, 108, 59, 1, 8611, 59, 1, 8605, 4, 2, 97, 105, 15776, 15781, 105, 108, 59, 1, 10522, 111, 4, 2, 59, 110, 15788, 15790, 1, 8758, 97, 108, 115, 59, 1, 8474, 4, 3, 97, 98, 114, 15804, 15809, 15814, 114, 114, 59, 1, 10509, 114, 107, 59, 1, 10099, 4, 2, 97, 107, 15820, 15833, 99, 4, 2, 101, 107, 15827, 15830, 59, 1, 125, 59, 1, 93, 4, 2, 101, 115, 15839, 15842, 59, 1, 10636, 108, 4, 2, 100, 117, 15849, 15852, 59, 1, 10638, 59, 1, 10640, 4, 4, 97, 101, 117, 121, 15865, 15871, 15886, 15890, 114, 111, 110, 59, 1, 345, 4, 2, 100, 105, 15877, 15882, 105, 108, 59, 1, 343, 108, 59, 1, 8969, 98, 59, 1, 125, 59, 1, 1088, 4, 4, 99, 108, 113, 115, 15903, 15907, 15914, 15927, 97, 59, 1, 10551, 100, 104, 97, 114, 59, 1, 10601, 117, 111, 4, 2, 59, 114, 15922, 15924, 1, 8221, 59, 1, 8221, 104, 59, 1, 8627, 4, 3, 97, 99, 103, 15939, 15966, 15970, 108, 4, 4, 59, 105, 112, 115, 15950, 15952, 15957, 15963, 1, 8476, 110, 101, 59, 1, 8475, 97, 114, 116, 59, 1, 8476, 59, 1, 8477, 116, 59, 1, 9645, 5, 174, 1, 59, 15975, 1, 174, 4, 3, 105, 108, 114, 15985, 15991, 15997, 115, 104, 116, 59, 1, 10621, 111, 111, 114, 59, 1, 8971, 59, 3, 55349, 56623, 4, 2, 97, 111, 16007, 16028, 114, 4, 2, 100, 117, 16014, 16017, 59, 1, 8641, 4, 2, 59, 108, 16023, 16025, 1, 8640, 59, 1, 10604, 4, 2, 59, 118, 16034, 16036, 1, 961, 59, 1, 1009, 4, 3, 103, 110, 115, 16047, 16167, 16171, 104, 116, 4, 6, 97, 104, 108, 114, 115, 116, 16063, 16081, 16103, 16130, 16143, 16155, 114, 114, 111, 119, 4, 2, 59, 116, 16073, 16075, 1, 8594, 97, 105, 108, 59, 1, 8611, 97, 114, 112, 111, 111, 110, 4, 2, 100, 117, 16093, 16099, 111, 119, 110, 59, 1, 8641, 112, 59, 1, 8640, 101, 102, 116, 4, 2, 97, 104, 16112, 16120, 114, 114, 111, 119, 115, 59, 1, 8644, 97, 114, 112, 111, 111, 110, 115, 59, 1, 8652, 105, 103, 104, 116, 97, 114, 114, 111, 119, 115, 59, 1, 8649, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1, 8605, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8908, 103, 59, 1, 730, 105, 110, 103, 100, 111, 116, 115, 101, 113, 59, 1, 8787, 4, 3, 97, 104, 109, 16191, 16196, 16201, 114, 114, 59, 1, 8644, 97, 114, 59, 1, 8652, 59, 1, 8207, 111, 117, 115, 116, 4, 2, 59, 97, 16214, 16216, 1, 9137, 99, 104, 101, 59, 1, 9137, 109, 105, 100, 59, 1, 10990, 4, 4, 97, 98, 112, 116, 16238, 16252, 16257, 16278, 4, 2, 110, 114, 16244, 16248, 103, 59, 1, 10221, 114, 59, 1, 8702, 114, 107, 59, 1, 10215, 4, 3, 97, 102, 108, 16265, 16269, 16273, 114, 59, 1, 10630, 59, 3, 55349, 56675, 117, 115, 59, 1, 10798, 105, 109, 101, 115, 59, 1, 10805, 4, 2, 97, 112, 16291, 16304, 114, 4, 2, 59, 103, 16298, 16300, 1, 41, 116, 59, 1, 10644, 111, 108, 105, 110, 116, 59, 1, 10770, 97, 114, 114, 59, 1, 8649, 4, 4, 97, 99, 104, 113, 16328, 16334, 16339, 16342, 113, 117, 111, 59, 1, 8250, 114, 59, 3, 55349, 56519, 59, 1, 8625, 4, 2, 98, 117, 16348, 16351, 59, 1, 93, 111, 4, 2, 59, 114, 16358, 16360, 1, 8217, 59, 1, 8217, 4, 3, 104, 105, 114, 16371, 16377, 16383, 114, 101, 101, 59, 1, 8908, 109, 101, 115, 59, 1, 8906, 105, 4, 4, 59, 101, 102, 108, 16394, 16396, 16399, 16402, 1, 9657, 59, 1, 8885, 59, 1, 9656, 116, 114, 105, 59, 1, 10702, 108, 117, 104, 97, 114, 59, 1, 10600, 59, 1, 8478, 4, 19, 97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 111, 112, 113, 114, 115, 116, 117, 119, 122, 16459, 16466, 16472, 16572, 16590, 16672, 16687, 16746, 16844, 16850, 16924, 16963, 16988, 17115, 17121, 17154, 17206, 17614, 17656, 99, 117, 116, 101, 59, 1, 347, 113, 117, 111, 59, 1, 8218, 4, 10, 59, 69, 97, 99, 101, 105, 110, 112, 115, 121, 16494, 16496, 16499, 16513, 16518, 16531, 16536, 16556, 16564, 16569, 1, 8827, 59, 1, 10932, 4, 2, 112, 114, 16505, 16508, 59, 1, 10936, 111, 110, 59, 1, 353, 117, 101, 59, 1, 8829, 4, 2, 59, 100, 16524, 16526, 1, 10928, 105, 108, 59, 1, 351, 114, 99, 59, 1, 349, 4, 3, 69, 97, 115, 16544, 16547, 16551, 59, 1, 10934, 112, 59, 1, 10938, 105, 109, 59, 1, 8937, 111, 108, 105, 110, 116, 59, 1, 10771, 105, 109, 59, 1, 8831, 59, 1, 1089, 111, 116, 4, 3, 59, 98, 101, 16582, 16584, 16587, 1, 8901, 59, 1, 8865, 59, 1, 10854, 4, 7, 65, 97, 99, 109, 115, 116, 120, 16606, 16611, 16634, 16642, 16646, 16652, 16668, 114, 114, 59, 1, 8664, 114, 4, 2, 104, 114, 16618, 16622, 107, 59, 1, 10533, 4, 2, 59, 111, 16628, 16630, 1, 8600, 119, 59, 1, 8600, 116, 5, 167, 1, 59, 16640, 1, 167, 105, 59, 1, 59, 119, 97, 114, 59, 1, 10537, 109, 4, 2, 105, 110, 16659, 16665, 110, 117, 115, 59, 1, 8726, 59, 1, 8726, 116, 59, 1, 10038, 114, 4, 2, 59, 111, 16679, 16682, 3, 55349, 56624, 119, 110, 59, 1, 8994, 4, 4, 97, 99, 111, 121, 16697, 16702, 16716, 16739, 114, 112, 59, 1, 9839, 4, 2, 104, 121, 16708, 16713, 99, 121, 59, 1, 1097, 59, 1, 1096, 114, 116, 4, 2, 109, 112, 16724, 16729, 105, 100, 59, 1, 8739, 97, 114, 97, 108, 108, 101, 108, 59, 1, 8741, 5, 173, 1, 59, 16744, 1, 173, 4, 2, 103, 109, 16752, 16770, 109, 97, 4, 3, 59, 102, 118, 16762, 16764, 16767, 1, 963, 59, 1, 962, 59, 1, 962, 4, 8, 59, 100, 101, 103, 108, 110, 112, 114, 16788, 16790, 16795, 16806, 16817, 16828, 16832, 16838, 1, 8764, 111, 116, 59, 1, 10858, 4, 2, 59, 113, 16801, 16803, 1, 8771, 59, 1, 8771, 4, 2, 59, 69, 16812, 16814, 1, 10910, 59, 1, 10912, 4, 2, 59, 69, 16823, 16825, 1, 10909, 59, 1, 10911, 101, 59, 1, 8774, 108, 117, 115, 59, 1, 10788, 97, 114, 114, 59, 1, 10610, 97, 114, 114, 59, 1, 8592, 4, 4, 97, 101, 105, 116, 16860, 16883, 16891, 16904, 4, 2, 108, 115, 16866, 16878, 108, 115, 101, 116, 109, 105, 110, 117, 115, 59, 1, 8726, 104, 112, 59, 1, 10803, 112, 97, 114, 115, 108, 59, 1, 10724, 4, 2, 100, 108, 16897, 16900, 59, 1, 8739, 101, 59, 1, 8995, 4, 2, 59, 101, 16910, 16912, 1, 10922, 4, 2, 59, 115, 16918, 16920, 1, 10924, 59, 3, 10924, 65024, 4, 3, 102, 108, 112, 16932, 16938, 16958, 116, 99, 121, 59, 1, 1100, 4, 2, 59, 98, 16944, 16946, 1, 47, 4, 2, 59, 97, 16952, 16954, 1, 10692, 114, 59, 1, 9023, 102, 59, 3, 55349, 56676, 97, 4, 2, 100, 114, 16970, 16985, 101, 115, 4, 2, 59, 117, 16978, 16980, 1, 9824, 105, 116, 59, 1, 9824, 59, 1, 8741, 4, 3, 99, 115, 117, 16996, 17028, 17089, 4, 2, 97, 117, 17002, 17015, 112, 4, 2, 59, 115, 17009, 17011, 1, 8851, 59, 3, 8851, 65024, 112, 4, 2, 59, 115, 17022, 17024, 1, 8852, 59, 3, 8852, 65024, 117, 4, 2, 98, 112, 17035, 17062, 4, 3, 59, 101, 115, 17043, 17045, 17048, 1, 8847, 59, 1, 8849, 101, 116, 4, 2, 59, 101, 17056, 17058, 1, 8847, 113, 59, 1, 8849, 4, 3, 59, 101, 115, 17070, 17072, 17075, 1, 8848, 59, 1, 8850, 101, 116, 4, 2, 59, 101, 17083, 17085, 1, 8848, 113, 59, 1, 8850, 4, 3, 59, 97, 102, 17097, 17099, 17112, 1, 9633, 114, 4, 2, 101, 102, 17106, 17109, 59, 1, 9633, 59, 1, 9642, 59, 1, 9642, 97, 114, 114, 59, 1, 8594, 4, 4, 99, 101, 109, 116, 17131, 17136, 17142, 17148, 114, 59, 3, 55349, 56520, 116, 109, 110, 59, 1, 8726, 105, 108, 101, 59, 1, 8995, 97, 114, 102, 59, 1, 8902, 4, 2, 97, 114, 17160, 17172, 114, 4, 2, 59, 102, 17167, 17169, 1, 9734, 59, 1, 9733, 4, 2, 97, 110, 17178, 17202, 105, 103, 104, 116, 4, 2, 101, 112, 17188, 17197, 112, 115, 105, 108, 111, 110, 59, 1, 1013, 104, 105, 59, 1, 981, 115, 59, 1, 175, 4, 5, 98, 99, 109, 110, 112, 17218, 17351, 17420, 17423, 17427, 4, 9, 59, 69, 100, 101, 109, 110, 112, 114, 115, 17238, 17240, 17243, 17248, 17261, 17267, 17279, 17285, 17291, 1, 8834, 59, 1, 10949, 111, 116, 59, 1, 10941, 4, 2, 59, 100, 17254, 17256, 1, 8838, 111, 116, 59, 1, 10947, 117, 108, 116, 59, 1, 10945, 4, 2, 69, 101, 17273, 17276, 59, 1, 10955, 59, 1, 8842, 108, 117, 115, 59, 1, 10943, 97, 114, 114, 59, 1, 10617, 4, 3, 101, 105, 117, 17299, 17335, 17339, 116, 4, 3, 59, 101, 110, 17308, 17310, 17322, 1, 8834, 113, 4, 2, 59, 113, 17317, 17319, 1, 8838, 59, 1, 10949, 101, 113, 4, 2, 59, 113, 17330, 17332, 1, 8842, 59, 1, 10955, 109, 59, 1, 10951, 4, 2, 98, 112, 17345, 17348, 59, 1, 10965, 59, 1, 10963, 99, 4, 6, 59, 97, 99, 101, 110, 115, 17366, 17368, 17376, 17385, 17389, 17415, 1, 8827, 112, 112, 114, 111, 120, 59, 1, 10936, 117, 114, 108, 121, 101, 113, 59, 1, 8829, 113, 59, 1, 10928, 4, 3, 97, 101, 115, 17397, 17405, 17410, 112, 112, 114, 111, 120, 59, 1, 10938, 113, 113, 59, 1, 10934, 105, 109, 59, 1, 8937, 105, 109, 59, 1, 8831, 59, 1, 8721, 103, 59, 1, 9834, 4, 13, 49, 50, 51, 59, 69, 100, 101, 104, 108, 109, 110, 112, 115, 17455, 17462, 17469, 17476, 17478, 17481, 17496, 17509, 17524, 17530, 17536, 17548, 17554, 5, 185, 1, 59, 17460, 1, 185, 5, 178, 1, 59, 17467, 1, 178, 5, 179, 1, 59, 17474, 1, 179, 1, 8835, 59, 1, 10950, 4, 2, 111, 115, 17487, 17491, 116, 59, 1, 10942, 117, 98, 59, 1, 10968, 4, 2, 59, 100, 17502, 17504, 1, 8839, 111, 116, 59, 1, 10948, 115, 4, 2, 111, 117, 17516, 17520, 108, 59, 1, 10185, 98, 59, 1, 10967, 97, 114, 114, 59, 1, 10619, 117, 108, 116, 59, 1, 10946, 4, 2, 69, 101, 17542, 17545, 59, 1, 10956, 59, 1, 8843, 108, 117, 115, 59, 1, 10944, 4, 3, 101, 105, 117, 17562, 17598, 17602, 116, 4, 3, 59, 101, 110, 17571, 17573, 17585, 1, 8835, 113, 4, 2, 59, 113, 17580, 17582, 1, 8839, 59, 1, 10950, 101, 113, 4, 2, 59, 113, 17593, 17595, 1, 8843, 59, 1, 10956, 109, 59, 1, 10952, 4, 2, 98, 112, 17608, 17611, 59, 1, 10964, 59, 1, 10966, 4, 3, 65, 97, 110, 17622, 17627, 17650, 114, 114, 59, 1, 8665, 114, 4, 2, 104, 114, 17634, 17638, 107, 59, 1, 10534, 4, 2, 59, 111, 17644, 17646, 1, 8601, 119, 59, 1, 8601, 119, 97, 114, 59, 1, 10538, 108, 105, 103, 5, 223, 1, 59, 17664, 1, 223, 4, 13, 97, 98, 99, 100, 101, 102, 104, 105, 111, 112, 114, 115, 119, 17694, 17709, 17714, 17737, 17742, 17749, 17754, 17860, 17905, 17957, 17964, 18090, 18122, 4, 2, 114, 117, 17700, 17706, 103, 101, 116, 59, 1, 8982, 59, 1, 964, 114, 107, 59, 1, 9140, 4, 3, 97, 101, 121, 17722, 17728, 17734, 114, 111, 110, 59, 1, 357, 100, 105, 108, 59, 1, 355, 59, 1, 1090, 111, 116, 59, 1, 8411, 108, 114, 101, 99, 59, 1, 8981, 114, 59, 3, 55349, 56625, 4, 4, 101, 105, 107, 111, 17764, 17805, 17836, 17851, 4, 2, 114, 116, 17770, 17786, 101, 4, 2, 52, 102, 17777, 17780, 59, 1, 8756, 111, 114, 101, 59, 1, 8756, 97, 4, 3, 59, 115, 118, 17795, 17797, 17802, 1, 952, 121, 109, 59, 1, 977, 59, 1, 977, 4, 2, 99, 110, 17811, 17831, 107, 4, 2, 97, 115, 17818, 17826, 112, 112, 114, 111, 120, 59, 1, 8776, 105, 109, 59, 1, 8764, 115, 112, 59, 1, 8201, 4, 2, 97, 115, 17842, 17846, 112, 59, 1, 8776, 105, 109, 59, 1, 8764, 114, 110, 5, 254, 1, 59, 17858, 1, 254, 4, 3, 108, 109, 110, 17868, 17873, 17901, 100, 101, 59, 1, 732, 101, 115, 5, 215, 3, 59, 98, 100, 17884, 17886, 17898, 1, 215, 4, 2, 59, 97, 17892, 17894, 1, 8864, 114, 59, 1, 10801, 59, 1, 10800, 116, 59, 1, 8749, 4, 3, 101, 112, 115, 17913, 17917, 17953, 97, 59, 1, 10536, 4, 4, 59, 98, 99, 102, 17927, 17929, 17934, 17939, 1, 8868, 111, 116, 59, 1, 9014, 105, 114, 59, 1, 10993, 4, 2, 59, 111, 17945, 17948, 3, 55349, 56677, 114, 107, 59, 1, 10970, 97, 59, 1, 10537, 114, 105, 109, 101, 59, 1, 8244, 4, 3, 97, 105, 112, 17972, 17977, 18082, 100, 101, 59, 1, 8482, 4, 7, 97, 100, 101, 109, 112, 115, 116, 17993, 18051, 18056, 18059, 18066, 18072, 18076, 110, 103, 108, 101, 4, 5, 59, 100, 108, 113, 114, 18009, 18011, 18017, 18032, 18035, 1, 9653, 111, 119, 110, 59, 1, 9663, 101, 102, 116, 4, 2, 59, 101, 18026, 18028, 1, 9667, 113, 59, 1, 8884, 59, 1, 8796, 105, 103, 104, 116, 4, 2, 59, 101, 18045, 18047, 1, 9657, 113, 59, 1, 8885, 111, 116, 59, 1, 9708, 59, 1, 8796, 105, 110, 117, 115, 59, 1, 10810, 108, 117, 115, 59, 1, 10809, 98, 59, 1, 10701, 105, 109, 101, 59, 1, 10811, 101, 122, 105, 117, 109, 59, 1, 9186, 4, 3, 99, 104, 116, 18098, 18111, 18116, 4, 2, 114, 121, 18104, 18108, 59, 3, 55349, 56521, 59, 1, 1094, 99, 121, 59, 1, 1115, 114, 111, 107, 59, 1, 359, 4, 2, 105, 111, 18128, 18133, 120, 116, 59, 1, 8812, 104, 101, 97, 100, 4, 2, 108, 114, 18143, 18154, 101, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8606, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8608, 4, 18, 65, 72, 97, 98, 99, 100, 102, 103, 104, 108, 109, 111, 112, 114, 115, 116, 117, 119, 18204, 18209, 18214, 18234, 18250, 18268, 18292, 18308, 18319, 18343, 18379, 18397, 18413, 18504, 18547, 18553, 18584, 18603, 114, 114, 59, 1, 8657, 97, 114, 59, 1, 10595, 4, 2, 99, 114, 18220, 18230, 117, 116, 101, 5, 250, 1, 59, 18228, 1, 250, 114, 59, 1, 8593, 114, 4, 2, 99, 101, 18241, 18245, 121, 59, 1, 1118, 118, 101, 59, 1, 365, 4, 2, 105, 121, 18256, 18265, 114, 99, 5, 251, 1, 59, 18263, 1, 251, 59, 1, 1091, 4, 3, 97, 98, 104, 18276, 18281, 18287, 114, 114, 59, 1, 8645, 108, 97, 99, 59, 1, 369, 97, 114, 59, 1, 10606, 4, 2, 105, 114, 18298, 18304, 115, 104, 116, 59, 1, 10622, 59, 3, 55349, 56626, 114, 97, 118, 101, 5, 249, 1, 59, 18317, 1, 249, 4, 2, 97, 98, 18325, 18338, 114, 4, 2, 108, 114, 18332, 18335, 59, 1, 8639, 59, 1, 8638, 108, 107, 59, 1, 9600, 4, 2, 99, 116, 18349, 18374, 4, 2, 111, 114, 18355, 18369, 114, 110, 4, 2, 59, 101, 18363, 18365, 1, 8988, 114, 59, 1, 8988, 111, 112, 59, 1, 8975, 114, 105, 59, 1, 9720, 4, 2, 97, 108, 18385, 18390, 99, 114, 59, 1, 363, 5, 168, 1, 59, 18395, 1, 168, 4, 2, 103, 112, 18403, 18408, 111, 110, 59, 1, 371, 102, 59, 3, 55349, 56678, 4, 6, 97, 100, 104, 108, 115, 117, 18427, 18434, 18445, 18470, 18475, 18494, 114, 114, 111, 119, 59, 1, 8593, 111, 119, 110, 97, 114, 114, 111, 119, 59, 1, 8597, 97, 114, 112, 111, 111, 110, 4, 2, 108, 114, 18457, 18463, 101, 102, 116, 59, 1, 8639, 105, 103, 104, 116, 59, 1, 8638, 117, 115, 59, 1, 8846, 105, 4, 3, 59, 104, 108, 18484, 18486, 18489, 1, 965, 59, 1, 978, 111, 110, 59, 1, 965, 112, 97, 114, 114, 111, 119, 115, 59, 1, 8648, 4, 3, 99, 105, 116, 18512, 18537, 18542, 4, 2, 111, 114, 18518, 18532, 114, 110, 4, 2, 59, 101, 18526, 18528, 1, 8989, 114, 59, 1, 8989, 111, 112, 59, 1, 8974, 110, 103, 59, 1, 367, 114, 105, 59, 1, 9721, 99, 114, 59, 3, 55349, 56522, 4, 3, 100, 105, 114, 18561, 18566, 18572, 111, 116, 59, 1, 8944, 108, 100, 101, 59, 1, 361, 105, 4, 2, 59, 102, 18579, 18581, 1, 9653, 59, 1, 9652, 4, 2, 97, 109, 18590, 18595, 114, 114, 59, 1, 8648, 108, 5, 252, 1, 59, 18601, 1, 252, 97, 110, 103, 108, 101, 59, 1, 10663, 4, 15, 65, 66, 68, 97, 99, 100, 101, 102, 108, 110, 111, 112, 114, 115, 122, 18643, 18648, 18661, 18667, 18847, 18851, 18857, 18904, 18909, 18915, 18931, 18937, 18943, 18949, 18996, 114, 114, 59, 1, 8661, 97, 114, 4, 2, 59, 118, 18656, 18658, 1, 10984, 59, 1, 10985, 97, 115, 104, 59, 1, 8872, 4, 2, 110, 114, 18673, 18679, 103, 114, 116, 59, 1, 10652, 4, 7, 101, 107, 110, 112, 114, 115, 116, 18695, 18704, 18711, 18720, 18742, 18754, 18810, 112, 115, 105, 108, 111, 110, 59, 1, 1013, 97, 112, 112, 97, 59, 1, 1008, 111, 116, 104, 105, 110, 103, 59, 1, 8709, 4, 3, 104, 105, 114, 18728, 18732, 18735, 105, 59, 1, 981, 59, 1, 982, 111, 112, 116, 111, 59, 1, 8733, 4, 2, 59, 104, 18748, 18750, 1, 8597, 111, 59, 1, 1009, 4, 2, 105, 117, 18760, 18766, 103, 109, 97, 59, 1, 962, 4, 2, 98, 112, 18772, 18791, 115, 101, 116, 110, 101, 113, 4, 2, 59, 113, 18784, 18787, 3, 8842, 65024, 59, 3, 10955, 65024, 115, 101, 116, 110, 101, 113, 4, 2, 59, 113, 18803, 18806, 3, 8843, 65024, 59, 3, 10956, 65024, 4, 2, 104, 114, 18816, 18822, 101, 116, 97, 59, 1, 977, 105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 18834, 18840, 101, 102, 116, 59, 1, 8882, 105, 103, 104, 116, 59, 1, 8883, 121, 59, 1, 1074, 97, 115, 104, 59, 1, 8866, 4, 3, 101, 108, 114, 18865, 18884, 18890, 4, 3, 59, 98, 101, 18873, 18875, 18880, 1, 8744, 97, 114, 59, 1, 8891, 113, 59, 1, 8794, 108, 105, 112, 59, 1, 8942, 4, 2, 98, 116, 18896, 18901, 97, 114, 59, 1, 124, 59, 1, 124, 114, 59, 3, 55349, 56627, 116, 114, 105, 59, 1, 8882, 115, 117, 4, 2, 98, 112, 18923, 18927, 59, 3, 8834, 8402, 59, 3, 8835, 8402, 112, 102, 59, 3, 55349, 56679, 114, 111, 112, 59, 1, 8733, 116, 114, 105, 59, 1, 8883, 4, 2, 99, 117, 18955, 18960, 114, 59, 3, 55349, 56523, 4, 2, 98, 112, 18966, 18981, 110, 4, 2, 69, 101, 18973, 18977, 59, 3, 10955, 65024, 59, 3, 8842, 65024, 110, 4, 2, 69, 101, 18988, 18992, 59, 3, 10956, 65024, 59, 3, 8843, 65024, 105, 103, 122, 97, 103, 59, 1, 10650, 4, 7, 99, 101, 102, 111, 112, 114, 115, 19020, 19026, 19061, 19066, 19072, 19075, 19089, 105, 114, 99, 59, 1, 373, 4, 2, 100, 105, 19032, 19055, 4, 2, 98, 103, 19038, 19043, 97, 114, 59, 1, 10847, 101, 4, 2, 59, 113, 19050, 19052, 1, 8743, 59, 1, 8793, 101, 114, 112, 59, 1, 8472, 114, 59, 3, 55349, 56628, 112, 102, 59, 3, 55349, 56680, 59, 1, 8472, 4, 2, 59, 101, 19081, 19083, 1, 8768, 97, 116, 104, 59, 1, 8768, 99, 114, 59, 3, 55349, 56524, 4, 14, 99, 100, 102, 104, 105, 108, 109, 110, 111, 114, 115, 117, 118, 119, 19125, 19146, 19152, 19157, 19173, 19176, 19192, 19197, 19202, 19236, 19252, 19269, 19286, 19291, 4, 3, 97, 105, 117, 19133, 19137, 19142, 112, 59, 1, 8898, 114, 99, 59, 1, 9711, 112, 59, 1, 8899, 116, 114, 105, 59, 1, 9661, 114, 59, 3, 55349, 56629, 4, 2, 65, 97, 19163, 19168, 114, 114, 59, 1, 10234, 114, 114, 59, 1, 10231, 59, 1, 958, 4, 2, 65, 97, 19182, 19187, 114, 114, 59, 1, 10232, 114, 114, 59, 1, 10229, 97, 112, 59, 1, 10236, 105, 115, 59, 1, 8955, 4, 3, 100, 112, 116, 19210, 19215, 19230, 111, 116, 59, 1, 10752, 4, 2, 102, 108, 19221, 19225, 59, 3, 55349, 56681, 117, 115, 59, 1, 10753, 105, 109, 101, 59, 1, 10754, 4, 2, 65, 97, 19242, 19247, 114, 114, 59, 1, 10233, 114, 114, 59, 1, 10230, 4, 2, 99, 113, 19258, 19263, 114, 59, 3, 55349, 56525, 99, 117, 112, 59, 1, 10758, 4, 2, 112, 116, 19275, 19281, 108, 117, 115, 59, 1, 10756, 114, 105, 59, 1, 9651, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896, 4, 8, 97, 99, 101, 102, 105, 111, 115, 117, 19316, 19335, 19349, 19357, 19362, 19367, 19373, 19379, 99, 4, 2, 117, 121, 19323, 19332, 116, 101, 5, 253, 1, 59, 19330, 1, 253, 59, 1, 1103, 4, 2, 105, 121, 19341, 19346, 114, 99, 59, 1, 375, 59, 1, 1099, 110, 5, 165, 1, 59, 19355, 1, 165, 114, 59, 3, 55349, 56630, 99, 121, 59, 1, 1111, 112, 102, 59, 3, 55349, 56682, 99, 114, 59, 3, 55349, 56526, 4, 2, 99, 109, 19385, 19389, 121, 59, 1, 1102, 108, 5, 255, 1, 59, 19395, 1, 255, 4, 10, 97, 99, 100, 101, 102, 104, 105, 111, 115, 119, 19419, 19426, 19441, 19446, 19462, 19467, 19472, 19480, 19486, 19492, 99, 117, 116, 101, 59, 1, 378, 4, 2, 97, 121, 19432, 19438, 114, 111, 110, 59, 1, 382, 59, 1, 1079, 111, 116, 59, 1, 380, 4, 2, 101, 116, 19452, 19458, 116, 114, 102, 59, 1, 8488, 97, 59, 1, 950, 114, 59, 3, 55349, 56631, 99, 121, 59, 1, 1078, 103, 114, 97, 114, 114, 59, 1, 8669, 112, 102, 59, 3, 55349, 56683, 99, 114, 59, 3, 55349, 56527, 4, 2, 106, 110, 19498, 19501, 59, 1, 8205, 106, 59, 1, 8204]);
  }
});

// node_modules/parse5/lib/tokenizer/index.js
var require_tokenizer = __commonJS({
  "node_modules/parse5/lib/tokenizer/index.js"(exports, module) {
    "use strict";
    var Preprocessor = require_preprocessor();
    var unicode = require_unicode();
    var neTree = require_named_entity_data();
    var ERR = require_error_codes();
    var $ = unicode.CODE_POINTS;
    var $$ = unicode.CODE_POINT_SEQUENCES;
    var C1_CONTROLS_REFERENCE_REPLACEMENTS = {
      128: 8364,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      142: 381,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      158: 382,
      159: 376
    };
    var HAS_DATA_FLAG = 1 << 0;
    var DATA_DUPLET_FLAG = 1 << 1;
    var HAS_BRANCHES_FLAG = 1 << 2;
    var MAX_BRANCH_MARKER_VALUE = HAS_DATA_FLAG | DATA_DUPLET_FLAG | HAS_BRANCHES_FLAG;
    var DATA_STATE = "DATA_STATE";
    var RCDATA_STATE = "RCDATA_STATE";
    var RAWTEXT_STATE = "RAWTEXT_STATE";
    var SCRIPT_DATA_STATE = "SCRIPT_DATA_STATE";
    var PLAINTEXT_STATE = "PLAINTEXT_STATE";
    var TAG_OPEN_STATE = "TAG_OPEN_STATE";
    var END_TAG_OPEN_STATE = "END_TAG_OPEN_STATE";
    var TAG_NAME_STATE = "TAG_NAME_STATE";
    var RCDATA_LESS_THAN_SIGN_STATE = "RCDATA_LESS_THAN_SIGN_STATE";
    var RCDATA_END_TAG_OPEN_STATE = "RCDATA_END_TAG_OPEN_STATE";
    var RCDATA_END_TAG_NAME_STATE = "RCDATA_END_TAG_NAME_STATE";
    var RAWTEXT_LESS_THAN_SIGN_STATE = "RAWTEXT_LESS_THAN_SIGN_STATE";
    var RAWTEXT_END_TAG_OPEN_STATE = "RAWTEXT_END_TAG_OPEN_STATE";
    var RAWTEXT_END_TAG_NAME_STATE = "RAWTEXT_END_TAG_NAME_STATE";
    var SCRIPT_DATA_LESS_THAN_SIGN_STATE = "SCRIPT_DATA_LESS_THAN_SIGN_STATE";
    var SCRIPT_DATA_END_TAG_OPEN_STATE = "SCRIPT_DATA_END_TAG_OPEN_STATE";
    var SCRIPT_DATA_END_TAG_NAME_STATE = "SCRIPT_DATA_END_TAG_NAME_STATE";
    var SCRIPT_DATA_ESCAPE_START_STATE = "SCRIPT_DATA_ESCAPE_START_STATE";
    var SCRIPT_DATA_ESCAPE_START_DASH_STATE = "SCRIPT_DATA_ESCAPE_START_DASH_STATE";
    var SCRIPT_DATA_ESCAPED_STATE = "SCRIPT_DATA_ESCAPED_STATE";
    var SCRIPT_DATA_ESCAPED_DASH_STATE = "SCRIPT_DATA_ESCAPED_DASH_STATE";
    var SCRIPT_DATA_ESCAPED_DASH_DASH_STATE = "SCRIPT_DATA_ESCAPED_DASH_DASH_STATE";
    var SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
    var SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE";
    var SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE = "SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE = "SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE = "SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE";
    var BEFORE_ATTRIBUTE_NAME_STATE = "BEFORE_ATTRIBUTE_NAME_STATE";
    var ATTRIBUTE_NAME_STATE = "ATTRIBUTE_NAME_STATE";
    var AFTER_ATTRIBUTE_NAME_STATE = "AFTER_ATTRIBUTE_NAME_STATE";
    var BEFORE_ATTRIBUTE_VALUE_STATE = "BEFORE_ATTRIBUTE_VALUE_STATE";
    var ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE = "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE";
    var ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE = "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE";
    var ATTRIBUTE_VALUE_UNQUOTED_STATE = "ATTRIBUTE_VALUE_UNQUOTED_STATE";
    var AFTER_ATTRIBUTE_VALUE_QUOTED_STATE = "AFTER_ATTRIBUTE_VALUE_QUOTED_STATE";
    var SELF_CLOSING_START_TAG_STATE = "SELF_CLOSING_START_TAG_STATE";
    var BOGUS_COMMENT_STATE = "BOGUS_COMMENT_STATE";
    var MARKUP_DECLARATION_OPEN_STATE = "MARKUP_DECLARATION_OPEN_STATE";
    var COMMENT_START_STATE = "COMMENT_START_STATE";
    var COMMENT_START_DASH_STATE = "COMMENT_START_DASH_STATE";
    var COMMENT_STATE2 = "COMMENT_STATE";
    var COMMENT_LESS_THAN_SIGN_STATE = "COMMENT_LESS_THAN_SIGN_STATE";
    var COMMENT_LESS_THAN_SIGN_BANG_STATE = "COMMENT_LESS_THAN_SIGN_BANG_STATE";
    var COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE = "COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE";
    var COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE";
    var COMMENT_END_DASH_STATE = "COMMENT_END_DASH_STATE";
    var COMMENT_END_STATE = "COMMENT_END_STATE";
    var COMMENT_END_BANG_STATE = "COMMENT_END_BANG_STATE";
    var DOCTYPE_STATE = "DOCTYPE_STATE";
    var BEFORE_DOCTYPE_NAME_STATE = "BEFORE_DOCTYPE_NAME_STATE";
    var DOCTYPE_NAME_STATE = "DOCTYPE_NAME_STATE";
    var AFTER_DOCTYPE_NAME_STATE = "AFTER_DOCTYPE_NAME_STATE";
    var AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE = "AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE";
    var BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
    var DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE";
    var DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE";
    var AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
    var BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE";
    var AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE = "AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE";
    var BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
    var DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
    var DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
    var AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
    var BOGUS_DOCTYPE_STATE = "BOGUS_DOCTYPE_STATE";
    var CDATA_SECTION_STATE = "CDATA_SECTION_STATE";
    var CDATA_SECTION_BRACKET_STATE = "CDATA_SECTION_BRACKET_STATE";
    var CDATA_SECTION_END_STATE = "CDATA_SECTION_END_STATE";
    var CHARACTER_REFERENCE_STATE = "CHARACTER_REFERENCE_STATE";
    var NAMED_CHARACTER_REFERENCE_STATE = "NAMED_CHARACTER_REFERENCE_STATE";
    var AMBIGUOUS_AMPERSAND_STATE = "AMBIGUOS_AMPERSAND_STATE";
    var NUMERIC_CHARACTER_REFERENCE_STATE = "NUMERIC_CHARACTER_REFERENCE_STATE";
    var HEXADEMICAL_CHARACTER_REFERENCE_START_STATE = "HEXADEMICAL_CHARACTER_REFERENCE_START_STATE";
    var DECIMAL_CHARACTER_REFERENCE_START_STATE = "DECIMAL_CHARACTER_REFERENCE_START_STATE";
    var HEXADEMICAL_CHARACTER_REFERENCE_STATE = "HEXADEMICAL_CHARACTER_REFERENCE_STATE";
    var DECIMAL_CHARACTER_REFERENCE_STATE = "DECIMAL_CHARACTER_REFERENCE_STATE";
    var NUMERIC_CHARACTER_REFERENCE_END_STATE = "NUMERIC_CHARACTER_REFERENCE_END_STATE";
    function isWhitespace(cp) {
      return cp === $.SPACE || cp === $.LINE_FEED || cp === $.TABULATION || cp === $.FORM_FEED;
    }
    function isAsciiDigit(cp) {
      return cp >= $.DIGIT_0 && cp <= $.DIGIT_9;
    }
    function isAsciiUpper(cp) {
      return cp >= $.LATIN_CAPITAL_A && cp <= $.LATIN_CAPITAL_Z;
    }
    function isAsciiLower(cp) {
      return cp >= $.LATIN_SMALL_A && cp <= $.LATIN_SMALL_Z;
    }
    function isAsciiLetter(cp) {
      return isAsciiLower(cp) || isAsciiUpper(cp);
    }
    function isAsciiAlphaNumeric(cp) {
      return isAsciiLetter(cp) || isAsciiDigit(cp);
    }
    function isAsciiUpperHexDigit(cp) {
      return cp >= $.LATIN_CAPITAL_A && cp <= $.LATIN_CAPITAL_F;
    }
    function isAsciiLowerHexDigit(cp) {
      return cp >= $.LATIN_SMALL_A && cp <= $.LATIN_SMALL_F;
    }
    function isAsciiHexDigit(cp) {
      return isAsciiDigit(cp) || isAsciiUpperHexDigit(cp) || isAsciiLowerHexDigit(cp);
    }
    function toAsciiLowerCodePoint(cp) {
      return cp + 32;
    }
    function toChar(cp) {
      if (cp <= 65535) {
        return String.fromCharCode(cp);
      }
      cp -= 65536;
      return String.fromCharCode(cp >>> 10 & 1023 | 55296) + String.fromCharCode(56320 | cp & 1023);
    }
    function toAsciiLowerChar(cp) {
      return String.fromCharCode(toAsciiLowerCodePoint(cp));
    }
    function findNamedEntityTreeBranch(nodeIx, cp) {
      const branchCount = neTree[++nodeIx];
      let lo = ++nodeIx;
      let hi = lo + branchCount - 1;
      while (lo <= hi) {
        const mid = lo + hi >>> 1;
        const midCp = neTree[mid];
        if (midCp < cp) {
          lo = mid + 1;
        } else if (midCp > cp) {
          hi = mid - 1;
        } else {
          return neTree[mid + branchCount];
        }
      }
      return -1;
    }
    var Tokenizer = class {
      constructor() {
        this.preprocessor = new Preprocessor();
        this.tokenQueue = [];
        this.allowCDATA = false;
        this.state = DATA_STATE;
        this.returnState = "";
        this.charRefCode = -1;
        this.tempBuff = [];
        this.lastStartTagName = "";
        this.consumedAfterSnapshot = -1;
        this.active = false;
        this.currentCharacterToken = null;
        this.currentToken = null;
        this.currentAttr = null;
      }
      //Errors
      _err() {
      }
      _errOnNextCodePoint(err2) {
        this._consume();
        this._err(err2);
        this._unconsume();
      }
      //API
      getNextToken() {
        while (!this.tokenQueue.length && this.active) {
          this.consumedAfterSnapshot = 0;
          const cp = this._consume();
          if (!this._ensureHibernation()) {
            this[this.state](cp);
          }
        }
        return this.tokenQueue.shift();
      }
      write(chunk, isLastChunk) {
        this.active = true;
        this.preprocessor.write(chunk, isLastChunk);
      }
      insertHtmlAtCurrentPos(chunk) {
        this.active = true;
        this.preprocessor.insertHtmlAtCurrentPos(chunk);
      }
      //Hibernation
      _ensureHibernation() {
        if (this.preprocessor.endOfChunkHit) {
          for (; this.consumedAfterSnapshot > 0; this.consumedAfterSnapshot--) {
            this.preprocessor.retreat();
          }
          this.active = false;
          this.tokenQueue.push({ type: Tokenizer.HIBERNATION_TOKEN });
          return true;
        }
        return false;
      }
      //Consumption
      _consume() {
        this.consumedAfterSnapshot++;
        return this.preprocessor.advance();
      }
      _unconsume() {
        this.consumedAfterSnapshot--;
        this.preprocessor.retreat();
      }
      _reconsumeInState(state) {
        this.state = state;
        this._unconsume();
      }
      _consumeSequenceIfMatch(pattern, startCp, caseSensitive) {
        let consumedCount = 0;
        let isMatch = true;
        const patternLength = pattern.length;
        let patternPos = 0;
        let cp = startCp;
        let patternCp = void 0;
        for (; patternPos < patternLength; patternPos++) {
          if (patternPos > 0) {
            cp = this._consume();
            consumedCount++;
          }
          if (cp === $.EOF) {
            isMatch = false;
            break;
          }
          patternCp = pattern[patternPos];
          if (cp !== patternCp && (caseSensitive || cp !== toAsciiLowerCodePoint(patternCp))) {
            isMatch = false;
            break;
          }
        }
        if (!isMatch) {
          while (consumedCount--) {
            this._unconsume();
          }
        }
        return isMatch;
      }
      //Temp buffer
      _isTempBufferEqualToScriptString() {
        if (this.tempBuff.length !== $$.SCRIPT_STRING.length) {
          return false;
        }
        for (let i = 0; i < this.tempBuff.length; i++) {
          if (this.tempBuff[i] !== $$.SCRIPT_STRING[i]) {
            return false;
          }
        }
        return true;
      }
      //Token creation
      _createStartTagToken() {
        this.currentToken = {
          type: Tokenizer.START_TAG_TOKEN,
          tagName: "",
          selfClosing: false,
          ackSelfClosing: false,
          attrs: []
        };
      }
      _createEndTagToken() {
        this.currentToken = {
          type: Tokenizer.END_TAG_TOKEN,
          tagName: "",
          selfClosing: false,
          attrs: []
        };
      }
      _createCommentToken() {
        this.currentToken = {
          type: Tokenizer.COMMENT_TOKEN,
          data: ""
        };
      }
      _createDoctypeToken(initialName) {
        this.currentToken = {
          type: Tokenizer.DOCTYPE_TOKEN,
          name: initialName,
          forceQuirks: false,
          publicId: null,
          systemId: null
        };
      }
      _createCharacterToken(type, ch) {
        this.currentCharacterToken = {
          type,
          chars: ch
        };
      }
      _createEOFToken() {
        this.currentToken = { type: Tokenizer.EOF_TOKEN };
      }
      //Tag attributes
      _createAttr(attrNameFirstCh) {
        this.currentAttr = {
          name: attrNameFirstCh,
          value: ""
        };
      }
      _leaveAttrName(toState) {
        if (Tokenizer.getTokenAttr(this.currentToken, this.currentAttr.name) === null) {
          this.currentToken.attrs.push(this.currentAttr);
        } else {
          this._err(ERR.duplicateAttribute);
        }
        this.state = toState;
      }
      _leaveAttrValue(toState) {
        this.state = toState;
      }
      //Token emission
      _emitCurrentToken() {
        this._emitCurrentCharacterToken();
        const ct = this.currentToken;
        this.currentToken = null;
        if (ct.type === Tokenizer.START_TAG_TOKEN) {
          this.lastStartTagName = ct.tagName;
        } else if (ct.type === Tokenizer.END_TAG_TOKEN) {
          if (ct.attrs.length > 0) {
            this._err(ERR.endTagWithAttributes);
          }
          if (ct.selfClosing) {
            this._err(ERR.endTagWithTrailingSolidus);
          }
        }
        this.tokenQueue.push(ct);
      }
      _emitCurrentCharacterToken() {
        if (this.currentCharacterToken) {
          this.tokenQueue.push(this.currentCharacterToken);
          this.currentCharacterToken = null;
        }
      }
      _emitEOFToken() {
        this._createEOFToken();
        this._emitCurrentToken();
      }
      //Characters emission
      //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
      //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
      //If we have a sequence of characters that belong to the same group, parser can process it
      //as a single solid character token.
      //So, there are 3 types of character tokens in parse5:
      //1)NULL_CHARACTER_TOKEN - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
      //2)WHITESPACE_CHARACTER_TOKEN - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
      //3)CHARACTER_TOKEN - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
      _appendCharToCurrentCharacterToken(type, ch) {
        if (this.currentCharacterToken && this.currentCharacterToken.type !== type) {
          this._emitCurrentCharacterToken();
        }
        if (this.currentCharacterToken) {
          this.currentCharacterToken.chars += ch;
        } else {
          this._createCharacterToken(type, ch);
        }
      }
      _emitCodePoint(cp) {
        let type = Tokenizer.CHARACTER_TOKEN;
        if (isWhitespace(cp)) {
          type = Tokenizer.WHITESPACE_CHARACTER_TOKEN;
        } else if (cp === $.NULL) {
          type = Tokenizer.NULL_CHARACTER_TOKEN;
        }
        this._appendCharToCurrentCharacterToken(type, toChar(cp));
      }
      _emitSeveralCodePoints(codePoints) {
        for (let i = 0; i < codePoints.length; i++) {
          this._emitCodePoint(codePoints[i]);
        }
      }
      //NOTE: used then we emit character explicitly. This is always a non-whitespace and a non-null character.
      //So we can avoid additional checks here.
      _emitChars(ch) {
        this._appendCharToCurrentCharacterToken(Tokenizer.CHARACTER_TOKEN, ch);
      }
      // Character reference helpers
      _matchNamedCharacterReference(startCp) {
        let result = null;
        let excess = 1;
        let i = findNamedEntityTreeBranch(0, startCp);
        this.tempBuff.push(startCp);
        while (i > -1) {
          const current = neTree[i];
          const inNode = current < MAX_BRANCH_MARKER_VALUE;
          const nodeWithData = inNode && current & HAS_DATA_FLAG;
          if (nodeWithData) {
            result = current & DATA_DUPLET_FLAG ? [neTree[++i], neTree[++i]] : [neTree[++i]];
            excess = 0;
          }
          const cp = this._consume();
          this.tempBuff.push(cp);
          excess++;
          if (cp === $.EOF) {
            break;
          }
          if (inNode) {
            i = current & HAS_BRANCHES_FLAG ? findNamedEntityTreeBranch(i, cp) : -1;
          } else {
            i = cp === current ? ++i : -1;
          }
        }
        while (excess--) {
          this.tempBuff.pop();
          this._unconsume();
        }
        return result;
      }
      _isCharacterReferenceInAttribute() {
        return this.returnState === ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE || this.returnState === ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE || this.returnState === ATTRIBUTE_VALUE_UNQUOTED_STATE;
      }
      _isCharacterReferenceAttributeQuirk(withSemicolon) {
        if (!withSemicolon && this._isCharacterReferenceInAttribute()) {
          const nextCp = this._consume();
          this._unconsume();
          return nextCp === $.EQUALS_SIGN || isAsciiAlphaNumeric(nextCp);
        }
        return false;
      }
      _flushCodePointsConsumedAsCharacterReference() {
        if (this._isCharacterReferenceInAttribute()) {
          for (let i = 0; i < this.tempBuff.length; i++) {
            this.currentAttr.value += toChar(this.tempBuff[i]);
          }
        } else {
          this._emitSeveralCodePoints(this.tempBuff);
        }
        this.tempBuff = [];
      }
      // State machine
      // Data state
      //------------------------------------------------------------------
      [DATA_STATE](cp) {
        this.preprocessor.dropParsedChunk();
        if (cp === $.LESS_THAN_SIGN) {
          this.state = TAG_OPEN_STATE;
        } else if (cp === $.AMPERSAND) {
          this.returnState = DATA_STATE;
          this.state = CHARACTER_REFERENCE_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._emitCodePoint(cp);
        } else if (cp === $.EOF) {
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      //  RCDATA state
      //------------------------------------------------------------------
      [RCDATA_STATE](cp) {
        this.preprocessor.dropParsedChunk();
        if (cp === $.AMPERSAND) {
          this.returnState = RCDATA_STATE;
          this.state = CHARACTER_REFERENCE_STATE;
        } else if (cp === $.LESS_THAN_SIGN) {
          this.state = RCDATA_LESS_THAN_SIGN_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      // RAWTEXT state
      //------------------------------------------------------------------
      [RAWTEXT_STATE](cp) {
        this.preprocessor.dropParsedChunk();
        if (cp === $.LESS_THAN_SIGN) {
          this.state = RAWTEXT_LESS_THAN_SIGN_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      // Script data state
      //------------------------------------------------------------------
      [SCRIPT_DATA_STATE](cp) {
        this.preprocessor.dropParsedChunk();
        if (cp === $.LESS_THAN_SIGN) {
          this.state = SCRIPT_DATA_LESS_THAN_SIGN_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      // PLAINTEXT state
      //------------------------------------------------------------------
      [PLAINTEXT_STATE](cp) {
        this.preprocessor.dropParsedChunk();
        if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      // Tag open state
      //------------------------------------------------------------------
      [TAG_OPEN_STATE](cp) {
        if (cp === $.EXCLAMATION_MARK) {
          this.state = MARKUP_DECLARATION_OPEN_STATE;
        } else if (cp === $.SOLIDUS) {
          this.state = END_TAG_OPEN_STATE;
        } else if (isAsciiLetter(cp)) {
          this._createStartTagToken();
          this._reconsumeInState(TAG_NAME_STATE);
        } else if (cp === $.QUESTION_MARK) {
          this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
          this._createCommentToken();
          this._reconsumeInState(BOGUS_COMMENT_STATE);
        } else if (cp === $.EOF) {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("<");
          this._emitEOFToken();
        } else {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._emitChars("<");
          this._reconsumeInState(DATA_STATE);
        }
      }
      // End tag open state
      //------------------------------------------------------------------
      [END_TAG_OPEN_STATE](cp) {
        if (isAsciiLetter(cp)) {
          this._createEndTagToken();
          this._reconsumeInState(TAG_NAME_STATE);
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.missingEndTagName);
          this.state = DATA_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("</");
          this._emitEOFToken();
        } else {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._createCommentToken();
          this._reconsumeInState(BOGUS_COMMENT_STATE);
        }
      }
      // Tag name state
      //------------------------------------------------------------------
      [TAG_NAME_STATE](cp) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_ATTRIBUTE_NAME_STATE;
        } else if (cp === $.SOLIDUS) {
          this.state = SELF_CLOSING_START_TAG_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (isAsciiUpper(cp)) {
          this.currentToken.tagName += toAsciiLowerChar(cp);
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.tagName += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
        } else {
          this.currentToken.tagName += toChar(cp);
        }
      }
      // RCDATA less-than sign state
      //------------------------------------------------------------------
      [RCDATA_LESS_THAN_SIGN_STATE](cp) {
        if (cp === $.SOLIDUS) {
          this.tempBuff = [];
          this.state = RCDATA_END_TAG_OPEN_STATE;
        } else {
          this._emitChars("<");
          this._reconsumeInState(RCDATA_STATE);
        }
      }
      // RCDATA end tag open state
      //------------------------------------------------------------------
      [RCDATA_END_TAG_OPEN_STATE](cp) {
        if (isAsciiLetter(cp)) {
          this._createEndTagToken();
          this._reconsumeInState(RCDATA_END_TAG_NAME_STATE);
        } else {
          this._emitChars("</");
          this._reconsumeInState(RCDATA_STATE);
        }
      }
      // RCDATA end tag name state
      //------------------------------------------------------------------
      [RCDATA_END_TAG_NAME_STATE](cp) {
        if (isAsciiUpper(cp)) {
          this.currentToken.tagName += toAsciiLowerChar(cp);
          this.tempBuff.push(cp);
        } else if (isAsciiLower(cp)) {
          this.currentToken.tagName += toChar(cp);
          this.tempBuff.push(cp);
        } else {
          if (this.lastStartTagName === this.currentToken.tagName) {
            if (isWhitespace(cp)) {
              this.state = BEFORE_ATTRIBUTE_NAME_STATE;
              return;
            }
            if (cp === $.SOLIDUS) {
              this.state = SELF_CLOSING_START_TAG_STATE;
              return;
            }
            if (cp === $.GREATER_THAN_SIGN) {
              this.state = DATA_STATE;
              this._emitCurrentToken();
              return;
            }
          }
          this._emitChars("</");
          this._emitSeveralCodePoints(this.tempBuff);
          this._reconsumeInState(RCDATA_STATE);
        }
      }
      // RAWTEXT less-than sign state
      //------------------------------------------------------------------
      [RAWTEXT_LESS_THAN_SIGN_STATE](cp) {
        if (cp === $.SOLIDUS) {
          this.tempBuff = [];
          this.state = RAWTEXT_END_TAG_OPEN_STATE;
        } else {
          this._emitChars("<");
          this._reconsumeInState(RAWTEXT_STATE);
        }
      }
      // RAWTEXT end tag open state
      //------------------------------------------------------------------
      [RAWTEXT_END_TAG_OPEN_STATE](cp) {
        if (isAsciiLetter(cp)) {
          this._createEndTagToken();
          this._reconsumeInState(RAWTEXT_END_TAG_NAME_STATE);
        } else {
          this._emitChars("</");
          this._reconsumeInState(RAWTEXT_STATE);
        }
      }
      // RAWTEXT end tag name state
      //------------------------------------------------------------------
      [RAWTEXT_END_TAG_NAME_STATE](cp) {
        if (isAsciiUpper(cp)) {
          this.currentToken.tagName += toAsciiLowerChar(cp);
          this.tempBuff.push(cp);
        } else if (isAsciiLower(cp)) {
          this.currentToken.tagName += toChar(cp);
          this.tempBuff.push(cp);
        } else {
          if (this.lastStartTagName === this.currentToken.tagName) {
            if (isWhitespace(cp)) {
              this.state = BEFORE_ATTRIBUTE_NAME_STATE;
              return;
            }
            if (cp === $.SOLIDUS) {
              this.state = SELF_CLOSING_START_TAG_STATE;
              return;
            }
            if (cp === $.GREATER_THAN_SIGN) {
              this._emitCurrentToken();
              this.state = DATA_STATE;
              return;
            }
          }
          this._emitChars("</");
          this._emitSeveralCodePoints(this.tempBuff);
          this._reconsumeInState(RAWTEXT_STATE);
        }
      }
      // Script data less-than sign state
      //------------------------------------------------------------------
      [SCRIPT_DATA_LESS_THAN_SIGN_STATE](cp) {
        if (cp === $.SOLIDUS) {
          this.tempBuff = [];
          this.state = SCRIPT_DATA_END_TAG_OPEN_STATE;
        } else if (cp === $.EXCLAMATION_MARK) {
          this.state = SCRIPT_DATA_ESCAPE_START_STATE;
          this._emitChars("<!");
        } else {
          this._emitChars("<");
          this._reconsumeInState(SCRIPT_DATA_STATE);
        }
      }
      // Script data end tag open state
      //------------------------------------------------------------------
      [SCRIPT_DATA_END_TAG_OPEN_STATE](cp) {
        if (isAsciiLetter(cp)) {
          this._createEndTagToken();
          this._reconsumeInState(SCRIPT_DATA_END_TAG_NAME_STATE);
        } else {
          this._emitChars("</");
          this._reconsumeInState(SCRIPT_DATA_STATE);
        }
      }
      // Script data end tag name state
      //------------------------------------------------------------------
      [SCRIPT_DATA_END_TAG_NAME_STATE](cp) {
        if (isAsciiUpper(cp)) {
          this.currentToken.tagName += toAsciiLowerChar(cp);
          this.tempBuff.push(cp);
        } else if (isAsciiLower(cp)) {
          this.currentToken.tagName += toChar(cp);
          this.tempBuff.push(cp);
        } else {
          if (this.lastStartTagName === this.currentToken.tagName) {
            if (isWhitespace(cp)) {
              this.state = BEFORE_ATTRIBUTE_NAME_STATE;
              return;
            } else if (cp === $.SOLIDUS) {
              this.state = SELF_CLOSING_START_TAG_STATE;
              return;
            } else if (cp === $.GREATER_THAN_SIGN) {
              this._emitCurrentToken();
              this.state = DATA_STATE;
              return;
            }
          }
          this._emitChars("</");
          this._emitSeveralCodePoints(this.tempBuff);
          this._reconsumeInState(SCRIPT_DATA_STATE);
        }
      }
      // Script data escape start state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPE_START_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = SCRIPT_DATA_ESCAPE_START_DASH_STATE;
          this._emitChars("-");
        } else {
          this._reconsumeInState(SCRIPT_DATA_STATE);
        }
      }
      // Script data escape start dash state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPE_START_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = SCRIPT_DATA_ESCAPED_DASH_DASH_STATE;
          this._emitChars("-");
        } else {
          this._reconsumeInState(SCRIPT_DATA_STATE);
        }
      }
      // Script data escaped state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPED_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = SCRIPT_DATA_ESCAPED_DASH_STATE;
          this._emitChars("-");
        } else if (cp === $.LESS_THAN_SIGN) {
          this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      // Script data escaped dash state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPED_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = SCRIPT_DATA_ESCAPED_DASH_DASH_STATE;
          this._emitChars("-");
        } else if (cp === $.LESS_THAN_SIGN) {
          this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.state = SCRIPT_DATA_ESCAPED_STATE;
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
        } else {
          this.state = SCRIPT_DATA_ESCAPED_STATE;
          this._emitCodePoint(cp);
        }
      }
      // Script data escaped dash dash state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPED_DASH_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this._emitChars("-");
        } else if (cp === $.LESS_THAN_SIGN) {
          this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this.state = SCRIPT_DATA_STATE;
          this._emitChars(">");
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.state = SCRIPT_DATA_ESCAPED_STATE;
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
        } else {
          this.state = SCRIPT_DATA_ESCAPED_STATE;
          this._emitCodePoint(cp);
        }
      }
      // Script data escaped less-than sign state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE](cp) {
        if (cp === $.SOLIDUS) {
          this.tempBuff = [];
          this.state = SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE;
        } else if (isAsciiLetter(cp)) {
          this.tempBuff = [];
          this._emitChars("<");
          this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE);
        } else {
          this._emitChars("<");
          this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
        }
      }
      // Script data escaped end tag open state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE](cp) {
        if (isAsciiLetter(cp)) {
          this._createEndTagToken();
          this._reconsumeInState(SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE);
        } else {
          this._emitChars("</");
          this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
        }
      }
      // Script data escaped end tag name state
      //------------------------------------------------------------------
      [SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE](cp) {
        if (isAsciiUpper(cp)) {
          this.currentToken.tagName += toAsciiLowerChar(cp);
          this.tempBuff.push(cp);
        } else if (isAsciiLower(cp)) {
          this.currentToken.tagName += toChar(cp);
          this.tempBuff.push(cp);
        } else {
          if (this.lastStartTagName === this.currentToken.tagName) {
            if (isWhitespace(cp)) {
              this.state = BEFORE_ATTRIBUTE_NAME_STATE;
              return;
            }
            if (cp === $.SOLIDUS) {
              this.state = SELF_CLOSING_START_TAG_STATE;
              return;
            }
            if (cp === $.GREATER_THAN_SIGN) {
              this._emitCurrentToken();
              this.state = DATA_STATE;
              return;
            }
          }
          this._emitChars("</");
          this._emitSeveralCodePoints(this.tempBuff);
          this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
        }
      }
      // Script data double escape start state
      //------------------------------------------------------------------
      [SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE](cp) {
        if (isWhitespace(cp) || cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN) {
          this.state = this._isTempBufferEqualToScriptString() ? SCRIPT_DATA_DOUBLE_ESCAPED_STATE : SCRIPT_DATA_ESCAPED_STATE;
          this._emitCodePoint(cp);
        } else if (isAsciiUpper(cp)) {
          this.tempBuff.push(toAsciiLowerCodePoint(cp));
          this._emitCodePoint(cp);
        } else if (isAsciiLower(cp)) {
          this.tempBuff.push(cp);
          this._emitCodePoint(cp);
        } else {
          this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
        }
      }
      // Script data double escaped state
      //------------------------------------------------------------------
      [SCRIPT_DATA_DOUBLE_ESCAPED_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE;
          this._emitChars("-");
        } else if (cp === $.LESS_THAN_SIGN) {
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;
          this._emitChars("<");
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      // Script data double escaped dash state
      //------------------------------------------------------------------
      [SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE;
          this._emitChars("-");
        } else if (cp === $.LESS_THAN_SIGN) {
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;
          this._emitChars("<");
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
        } else {
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
          this._emitCodePoint(cp);
        }
      }
      // Script data double escaped dash dash state
      //------------------------------------------------------------------
      [SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this._emitChars("-");
        } else if (cp === $.LESS_THAN_SIGN) {
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;
          this._emitChars("<");
        } else if (cp === $.GREATER_THAN_SIGN) {
          this.state = SCRIPT_DATA_STATE;
          this._emitChars(">");
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
          this._emitChars(unicode.REPLACEMENT_CHARACTER);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInScriptHtmlCommentLikeText);
          this._emitEOFToken();
        } else {
          this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
          this._emitCodePoint(cp);
        }
      }
      // Script data double escaped less-than sign state
      //------------------------------------------------------------------
      [SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE](cp) {
        if (cp === $.SOLIDUS) {
          this.tempBuff = [];
          this.state = SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE;
          this._emitChars("/");
        } else {
          this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPED_STATE);
        }
      }
      // Script data double escape end state
      //------------------------------------------------------------------
      [SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE](cp) {
        if (isWhitespace(cp) || cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN) {
          this.state = this._isTempBufferEqualToScriptString() ? SCRIPT_DATA_ESCAPED_STATE : SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
          this._emitCodePoint(cp);
        } else if (isAsciiUpper(cp)) {
          this.tempBuff.push(toAsciiLowerCodePoint(cp));
          this._emitCodePoint(cp);
        } else if (isAsciiLower(cp)) {
          this.tempBuff.push(cp);
          this._emitCodePoint(cp);
        } else {
          this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPED_STATE);
        }
      }
      // Before attribute name state
      //------------------------------------------------------------------
      [BEFORE_ATTRIBUTE_NAME_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN || cp === $.EOF) {
          this._reconsumeInState(AFTER_ATTRIBUTE_NAME_STATE);
        } else if (cp === $.EQUALS_SIGN) {
          this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
          this._createAttr("=");
          this.state = ATTRIBUTE_NAME_STATE;
        } else {
          this._createAttr("");
          this._reconsumeInState(ATTRIBUTE_NAME_STATE);
        }
      }
      // Attribute name state
      //------------------------------------------------------------------
      [ATTRIBUTE_NAME_STATE](cp) {
        if (isWhitespace(cp) || cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN || cp === $.EOF) {
          this._leaveAttrName(AFTER_ATTRIBUTE_NAME_STATE);
          this._unconsume();
        } else if (cp === $.EQUALS_SIGN) {
          this._leaveAttrName(BEFORE_ATTRIBUTE_VALUE_STATE);
        } else if (isAsciiUpper(cp)) {
          this.currentAttr.name += toAsciiLowerChar(cp);
        } else if (cp === $.QUOTATION_MARK || cp === $.APOSTROPHE || cp === $.LESS_THAN_SIGN) {
          this._err(ERR.unexpectedCharacterInAttributeName);
          this.currentAttr.name += toChar(cp);
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.name += unicode.REPLACEMENT_CHARACTER;
        } else {
          this.currentAttr.name += toChar(cp);
        }
      }
      // After attribute name state
      //------------------------------------------------------------------
      [AFTER_ATTRIBUTE_NAME_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.SOLIDUS) {
          this.state = SELF_CLOSING_START_TAG_STATE;
        } else if (cp === $.EQUALS_SIGN) {
          this.state = BEFORE_ATTRIBUTE_VALUE_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
        } else {
          this._createAttr("");
          this._reconsumeInState(ATTRIBUTE_NAME_STATE);
        }
      }
      // Before attribute value state
      //------------------------------------------------------------------
      [BEFORE_ATTRIBUTE_VALUE_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.QUOTATION_MARK) {
          this.state = ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE;
        } else if (cp === $.APOSTROPHE) {
          this.state = ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.missingAttributeValue);
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else {
          this._reconsumeInState(ATTRIBUTE_VALUE_UNQUOTED_STATE);
        }
      }
      // Attribute value (double-quoted) state
      //------------------------------------------------------------------
      [ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE](cp) {
        if (cp === $.QUOTATION_MARK) {
          this.state = AFTER_ATTRIBUTE_VALUE_QUOTED_STATE;
        } else if (cp === $.AMPERSAND) {
          this.returnState = ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE;
          this.state = CHARACTER_REFERENCE_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
        } else {
          this.currentAttr.value += toChar(cp);
        }
      }
      // Attribute value (single-quoted) state
      //------------------------------------------------------------------
      [ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE](cp) {
        if (cp === $.APOSTROPHE) {
          this.state = AFTER_ATTRIBUTE_VALUE_QUOTED_STATE;
        } else if (cp === $.AMPERSAND) {
          this.returnState = ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE;
          this.state = CHARACTER_REFERENCE_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
        } else {
          this.currentAttr.value += toChar(cp);
        }
      }
      // Attribute value (unquoted) state
      //------------------------------------------------------------------
      [ATTRIBUTE_VALUE_UNQUOTED_STATE](cp) {
        if (isWhitespace(cp)) {
          this._leaveAttrValue(BEFORE_ATTRIBUTE_NAME_STATE);
        } else if (cp === $.AMPERSAND) {
          this.returnState = ATTRIBUTE_VALUE_UNQUOTED_STATE;
          this.state = CHARACTER_REFERENCE_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._leaveAttrValue(DATA_STATE);
          this._emitCurrentToken();
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentAttr.value += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.QUOTATION_MARK || cp === $.APOSTROPHE || cp === $.LESS_THAN_SIGN || cp === $.EQUALS_SIGN || cp === $.GRAVE_ACCENT) {
          this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
          this.currentAttr.value += toChar(cp);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
        } else {
          this.currentAttr.value += toChar(cp);
        }
      }
      // After attribute value (quoted) state
      //------------------------------------------------------------------
      [AFTER_ATTRIBUTE_VALUE_QUOTED_STATE](cp) {
        if (isWhitespace(cp)) {
          this._leaveAttrValue(BEFORE_ATTRIBUTE_NAME_STATE);
        } else if (cp === $.SOLIDUS) {
          this._leaveAttrValue(SELF_CLOSING_START_TAG_STATE);
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._leaveAttrValue(DATA_STATE);
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
        } else {
          this._err(ERR.missingWhitespaceBetweenAttributes);
          this._reconsumeInState(BEFORE_ATTRIBUTE_NAME_STATE);
        }
      }
      // Self-closing start tag state
      //------------------------------------------------------------------
      [SELF_CLOSING_START_TAG_STATE](cp) {
        if (cp === $.GREATER_THAN_SIGN) {
          this.currentToken.selfClosing = true;
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInTag);
          this._emitEOFToken();
        } else {
          this._err(ERR.unexpectedSolidusInTag);
          this._reconsumeInState(BEFORE_ATTRIBUTE_NAME_STATE);
        }
      }
      // Bogus comment state
      //------------------------------------------------------------------
      [BOGUS_COMMENT_STATE](cp) {
        if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._emitCurrentToken();
          this._emitEOFToken();
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.data += unicode.REPLACEMENT_CHARACTER;
        } else {
          this.currentToken.data += toChar(cp);
        }
      }
      // Markup declaration open state
      //------------------------------------------------------------------
      [MARKUP_DECLARATION_OPEN_STATE](cp) {
        if (this._consumeSequenceIfMatch($$.DASH_DASH_STRING, cp, true)) {
          this._createCommentToken();
          this.state = COMMENT_START_STATE;
        } else if (this._consumeSequenceIfMatch($$.DOCTYPE_STRING, cp, false)) {
          this.state = DOCTYPE_STATE;
        } else if (this._consumeSequenceIfMatch($$.CDATA_START_STRING, cp, true)) {
          if (this.allowCDATA) {
            this.state = CDATA_SECTION_STATE;
          } else {
            this._err(ERR.cdataInHtmlContent);
            this._createCommentToken();
            this.currentToken.data = "[CDATA[";
            this.state = BOGUS_COMMENT_STATE;
          }
        } else if (!this._ensureHibernation()) {
          this._err(ERR.incorrectlyOpenedComment);
          this._createCommentToken();
          this._reconsumeInState(BOGUS_COMMENT_STATE);
        }
      }
      // Comment start state
      //------------------------------------------------------------------
      [COMMENT_START_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = COMMENT_START_DASH_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.abruptClosingOfEmptyComment);
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else {
          this._reconsumeInState(COMMENT_STATE2);
        }
      }
      // Comment start dash state
      //------------------------------------------------------------------
      [COMMENT_START_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = COMMENT_END_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.abruptClosingOfEmptyComment);
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInComment);
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.data += "-";
          this._reconsumeInState(COMMENT_STATE2);
        }
      }
      // Comment state
      //------------------------------------------------------------------
      [COMMENT_STATE2](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = COMMENT_END_DASH_STATE;
        } else if (cp === $.LESS_THAN_SIGN) {
          this.currentToken.data += "<";
          this.state = COMMENT_LESS_THAN_SIGN_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.data += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInComment);
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.data += toChar(cp);
        }
      }
      // Comment less-than sign state
      //------------------------------------------------------------------
      [COMMENT_LESS_THAN_SIGN_STATE](cp) {
        if (cp === $.EXCLAMATION_MARK) {
          this.currentToken.data += "!";
          this.state = COMMENT_LESS_THAN_SIGN_BANG_STATE;
        } else if (cp === $.LESS_THAN_SIGN) {
          this.currentToken.data += "!";
        } else {
          this._reconsumeInState(COMMENT_STATE2);
        }
      }
      // Comment less-than sign bang state
      //------------------------------------------------------------------
      [COMMENT_LESS_THAN_SIGN_BANG_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE;
        } else {
          this._reconsumeInState(COMMENT_STATE2);
        }
      }
      // Comment less-than sign bang dash state
      //------------------------------------------------------------------
      [COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE;
        } else {
          this._reconsumeInState(COMMENT_END_DASH_STATE);
        }
      }
      // Comment less-than sign bang dash dash state
      //------------------------------------------------------------------
      [COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE](cp) {
        if (cp !== $.GREATER_THAN_SIGN && cp !== $.EOF) {
          this._err(ERR.nestedComment);
        }
        this._reconsumeInState(COMMENT_END_STATE);
      }
      // Comment end dash state
      //------------------------------------------------------------------
      [COMMENT_END_DASH_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.state = COMMENT_END_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInComment);
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.data += "-";
          this._reconsumeInState(COMMENT_STATE2);
        }
      }
      // Comment end state
      //------------------------------------------------------------------
      [COMMENT_END_STATE](cp) {
        if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EXCLAMATION_MARK) {
          this.state = COMMENT_END_BANG_STATE;
        } else if (cp === $.HYPHEN_MINUS) {
          this.currentToken.data += "-";
        } else if (cp === $.EOF) {
          this._err(ERR.eofInComment);
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.data += "--";
          this._reconsumeInState(COMMENT_STATE2);
        }
      }
      // Comment end bang state
      //------------------------------------------------------------------
      [COMMENT_END_BANG_STATE](cp) {
        if (cp === $.HYPHEN_MINUS) {
          this.currentToken.data += "--!";
          this.state = COMMENT_END_DASH_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.incorrectlyClosedComment);
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInComment);
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.data += "--!";
          this._reconsumeInState(COMMENT_STATE2);
        }
      }
      // DOCTYPE state
      //------------------------------------------------------------------
      [DOCTYPE_STATE](cp) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_DOCTYPE_NAME_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._reconsumeInState(BEFORE_DOCTYPE_NAME_STATE);
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.missingWhitespaceBeforeDoctypeName);
          this._reconsumeInState(BEFORE_DOCTYPE_NAME_STATE);
        }
      }
      // Before DOCTYPE name state
      //------------------------------------------------------------------
      [BEFORE_DOCTYPE_NAME_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (isAsciiUpper(cp)) {
          this._createDoctypeToken(toAsciiLowerChar(cp));
          this.state = DOCTYPE_NAME_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this._createDoctypeToken(unicode.REPLACEMENT_CHARACTER);
          this.state = DOCTYPE_NAME_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.missingDoctypeName);
          this._createDoctypeToken(null);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._createDoctypeToken(toChar(cp));
          this.state = DOCTYPE_NAME_STATE;
        }
      }
      // DOCTYPE name state
      //------------------------------------------------------------------
      [DOCTYPE_NAME_STATE](cp) {
        if (isWhitespace(cp)) {
          this.state = AFTER_DOCTYPE_NAME_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (isAsciiUpper(cp)) {
          this.currentToken.name += toAsciiLowerChar(cp);
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.name += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.name += toChar(cp);
        }
      }
      // After DOCTYPE name state
      //------------------------------------------------------------------
      [AFTER_DOCTYPE_NAME_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else if (this._consumeSequenceIfMatch($$.PUBLIC_STRING, cp, false)) {
          this.state = AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE;
        } else if (this._consumeSequenceIfMatch($$.SYSTEM_STRING, cp, false)) {
          this.state = AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE;
        } else if (!this._ensureHibernation()) {
          this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
          this.currentToken.forceQuirks = true;
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // After DOCTYPE public keyword state
      //------------------------------------------------------------------
      [AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE](cp) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE;
        } else if (cp === $.QUOTATION_MARK) {
          this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
          this.currentToken.publicId = "";
          this.state = DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE;
        } else if (cp === $.APOSTROPHE) {
          this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
          this.currentToken.publicId = "";
          this.state = DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.missingDoctypePublicIdentifier);
          this.currentToken.forceQuirks = true;
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
          this.currentToken.forceQuirks = true;
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // Before DOCTYPE public identifier state
      //------------------------------------------------------------------
      [BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.QUOTATION_MARK) {
          this.currentToken.publicId = "";
          this.state = DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE;
        } else if (cp === $.APOSTROPHE) {
          this.currentToken.publicId = "";
          this.state = DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.missingDoctypePublicIdentifier);
          this.currentToken.forceQuirks = true;
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
          this.currentToken.forceQuirks = true;
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // DOCTYPE public identifier (double-quoted) state
      //------------------------------------------------------------------
      [DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE](cp) {
        if (cp === $.QUOTATION_MARK) {
          this.state = AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.publicId += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.abruptDoctypePublicIdentifier);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.publicId += toChar(cp);
        }
      }
      // DOCTYPE public identifier (single-quoted) state
      //------------------------------------------------------------------
      [DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE](cp) {
        if (cp === $.APOSTROPHE) {
          this.state = AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.publicId += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.abruptDoctypePublicIdentifier);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.publicId += toChar(cp);
        }
      }
      // After DOCTYPE public identifier state
      //------------------------------------------------------------------
      [AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE](cp) {
        if (isWhitespace(cp)) {
          this.state = BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.QUOTATION_MARK) {
          this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
        } else if (cp === $.APOSTROPHE) {
          this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // Between DOCTYPE public and system identifiers state
      //------------------------------------------------------------------
      [BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.GREATER_THAN_SIGN) {
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.QUOTATION_MARK) {
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
        } else if (cp === $.APOSTROPHE) {
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // After DOCTYPE system keyword state
      //------------------------------------------------------------------
      [AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE](cp) {
        if (isWhitespace(cp)) {
          this.state = BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
        } else if (cp === $.QUOTATION_MARK) {
          this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
        } else if (cp === $.APOSTROPHE) {
          this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.missingDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // Before DOCTYPE system identifier state
      //------------------------------------------------------------------
      [BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.QUOTATION_MARK) {
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
        } else if (cp === $.APOSTROPHE) {
          this.currentToken.systemId = "";
          this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.missingDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this.state = DATA_STATE;
          this._emitCurrentToken();
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // DOCTYPE system identifier (double-quoted) state
      //------------------------------------------------------------------
      [DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE](cp) {
        if (cp === $.QUOTATION_MARK) {
          this.state = AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.systemId += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.abruptDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.systemId += toChar(cp);
        }
      }
      // DOCTYPE system identifier (single-quoted) state
      //------------------------------------------------------------------
      [DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE](cp) {
        if (cp === $.APOSTROPHE) {
          this.state = AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
          this.currentToken.systemId += unicode.REPLACEMENT_CHARACTER;
        } else if (cp === $.GREATER_THAN_SIGN) {
          this._err(ERR.abruptDoctypeSystemIdentifier);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this.currentToken.systemId += toChar(cp);
        }
      }
      // After DOCTYPE system identifier state
      //------------------------------------------------------------------
      [AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE](cp) {
        if (isWhitespace(cp)) {
          return;
        }
        if (cp === $.GREATER_THAN_SIGN) {
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInDoctype);
          this.currentToken.forceQuirks = true;
          this._emitCurrentToken();
          this._emitEOFToken();
        } else {
          this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
          this._reconsumeInState(BOGUS_DOCTYPE_STATE);
        }
      }
      // Bogus DOCTYPE state
      //------------------------------------------------------------------
      [BOGUS_DOCTYPE_STATE](cp) {
        if (cp === $.GREATER_THAN_SIGN) {
          this._emitCurrentToken();
          this.state = DATA_STATE;
        } else if (cp === $.NULL) {
          this._err(ERR.unexpectedNullCharacter);
        } else if (cp === $.EOF) {
          this._emitCurrentToken();
          this._emitEOFToken();
        }
      }
      // CDATA section state
      //------------------------------------------------------------------
      [CDATA_SECTION_STATE](cp) {
        if (cp === $.RIGHT_SQUARE_BRACKET) {
          this.state = CDATA_SECTION_BRACKET_STATE;
        } else if (cp === $.EOF) {
          this._err(ERR.eofInCdata);
          this._emitEOFToken();
        } else {
          this._emitCodePoint(cp);
        }
      }
      // CDATA section bracket state
      //------------------------------------------------------------------
      [CDATA_SECTION_BRACKET_STATE](cp) {
        if (cp === $.RIGHT_SQUARE_BRACKET) {
          this.state = CDATA_SECTION_END_STATE;
        } else {
          this._emitChars("]");
          this._reconsumeInState(CDATA_SECTION_STATE);
        }
      }
      // CDATA section end state
      //------------------------------------------------------------------
      [CDATA_SECTION_END_STATE](cp) {
        if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
        } else if (cp === $.RIGHT_SQUARE_BRACKET) {
          this._emitChars("]");
        } else {
          this._emitChars("]]");
          this._reconsumeInState(CDATA_SECTION_STATE);
        }
      }
      // Character reference state
      //------------------------------------------------------------------
      [CHARACTER_REFERENCE_STATE](cp) {
        this.tempBuff = [$.AMPERSAND];
        if (cp === $.NUMBER_SIGN) {
          this.tempBuff.push(cp);
          this.state = NUMERIC_CHARACTER_REFERENCE_STATE;
        } else if (isAsciiAlphaNumeric(cp)) {
          this._reconsumeInState(NAMED_CHARACTER_REFERENCE_STATE);
        } else {
          this._flushCodePointsConsumedAsCharacterReference();
          this._reconsumeInState(this.returnState);
        }
      }
      // Named character reference state
      //------------------------------------------------------------------
      [NAMED_CHARACTER_REFERENCE_STATE](cp) {
        const matchResult = this._matchNamedCharacterReference(cp);
        if (this._ensureHibernation()) {
          this.tempBuff = [$.AMPERSAND];
        } else if (matchResult) {
          const withSemicolon = this.tempBuff[this.tempBuff.length - 1] === $.SEMICOLON;
          if (!this._isCharacterReferenceAttributeQuirk(withSemicolon)) {
            if (!withSemicolon) {
              this._errOnNextCodePoint(ERR.missingSemicolonAfterCharacterReference);
            }
            this.tempBuff = matchResult;
          }
          this._flushCodePointsConsumedAsCharacterReference();
          this.state = this.returnState;
        } else {
          this._flushCodePointsConsumedAsCharacterReference();
          this.state = AMBIGUOUS_AMPERSAND_STATE;
        }
      }
      // Ambiguos ampersand state
      //------------------------------------------------------------------
      [AMBIGUOUS_AMPERSAND_STATE](cp) {
        if (isAsciiAlphaNumeric(cp)) {
          if (this._isCharacterReferenceInAttribute()) {
            this.currentAttr.value += toChar(cp);
          } else {
            this._emitCodePoint(cp);
          }
        } else {
          if (cp === $.SEMICOLON) {
            this._err(ERR.unknownNamedCharacterReference);
          }
          this._reconsumeInState(this.returnState);
        }
      }
      // Numeric character reference state
      //------------------------------------------------------------------
      [NUMERIC_CHARACTER_REFERENCE_STATE](cp) {
        this.charRefCode = 0;
        if (cp === $.LATIN_SMALL_X || cp === $.LATIN_CAPITAL_X) {
          this.tempBuff.push(cp);
          this.state = HEXADEMICAL_CHARACTER_REFERENCE_START_STATE;
        } else {
          this._reconsumeInState(DECIMAL_CHARACTER_REFERENCE_START_STATE);
        }
      }
      // Hexademical character reference start state
      //------------------------------------------------------------------
      [HEXADEMICAL_CHARACTER_REFERENCE_START_STATE](cp) {
        if (isAsciiHexDigit(cp)) {
          this._reconsumeInState(HEXADEMICAL_CHARACTER_REFERENCE_STATE);
        } else {
          this._err(ERR.absenceOfDigitsInNumericCharacterReference);
          this._flushCodePointsConsumedAsCharacterReference();
          this._reconsumeInState(this.returnState);
        }
      }
      // Decimal character reference start state
      //------------------------------------------------------------------
      [DECIMAL_CHARACTER_REFERENCE_START_STATE](cp) {
        if (isAsciiDigit(cp)) {
          this._reconsumeInState(DECIMAL_CHARACTER_REFERENCE_STATE);
        } else {
          this._err(ERR.absenceOfDigitsInNumericCharacterReference);
          this._flushCodePointsConsumedAsCharacterReference();
          this._reconsumeInState(this.returnState);
        }
      }
      // Hexademical character reference state
      //------------------------------------------------------------------
      [HEXADEMICAL_CHARACTER_REFERENCE_STATE](cp) {
        if (isAsciiUpperHexDigit(cp)) {
          this.charRefCode = this.charRefCode * 16 + cp - 55;
        } else if (isAsciiLowerHexDigit(cp)) {
          this.charRefCode = this.charRefCode * 16 + cp - 87;
        } else if (isAsciiDigit(cp)) {
          this.charRefCode = this.charRefCode * 16 + cp - 48;
        } else if (cp === $.SEMICOLON) {
          this.state = NUMERIC_CHARACTER_REFERENCE_END_STATE;
        } else {
          this._err(ERR.missingSemicolonAfterCharacterReference);
          this._reconsumeInState(NUMERIC_CHARACTER_REFERENCE_END_STATE);
        }
      }
      // Decimal character reference state
      //------------------------------------------------------------------
      [DECIMAL_CHARACTER_REFERENCE_STATE](cp) {
        if (isAsciiDigit(cp)) {
          this.charRefCode = this.charRefCode * 10 + cp - 48;
        } else if (cp === $.SEMICOLON) {
          this.state = NUMERIC_CHARACTER_REFERENCE_END_STATE;
        } else {
          this._err(ERR.missingSemicolonAfterCharacterReference);
          this._reconsumeInState(NUMERIC_CHARACTER_REFERENCE_END_STATE);
        }
      }
      // Numeric character reference end state
      //------------------------------------------------------------------
      [NUMERIC_CHARACTER_REFERENCE_END_STATE]() {
        if (this.charRefCode === $.NULL) {
          this._err(ERR.nullCharacterReference);
          this.charRefCode = $.REPLACEMENT_CHARACTER;
        } else if (this.charRefCode > 1114111) {
          this._err(ERR.characterReferenceOutsideUnicodeRange);
          this.charRefCode = $.REPLACEMENT_CHARACTER;
        } else if (unicode.isSurrogate(this.charRefCode)) {
          this._err(ERR.surrogateCharacterReference);
          this.charRefCode = $.REPLACEMENT_CHARACTER;
        } else if (unicode.isUndefinedCodePoint(this.charRefCode)) {
          this._err(ERR.noncharacterCharacterReference);
        } else if (unicode.isControlCodePoint(this.charRefCode) || this.charRefCode === $.CARRIAGE_RETURN) {
          this._err(ERR.controlCharacterReference);
          const replacement = C1_CONTROLS_REFERENCE_REPLACEMENTS[this.charRefCode];
          if (replacement) {
            this.charRefCode = replacement;
          }
        }
        this.tempBuff = [this.charRefCode];
        this._flushCodePointsConsumedAsCharacterReference();
        this._reconsumeInState(this.returnState);
      }
    };
    Tokenizer.CHARACTER_TOKEN = "CHARACTER_TOKEN";
    Tokenizer.NULL_CHARACTER_TOKEN = "NULL_CHARACTER_TOKEN";
    Tokenizer.WHITESPACE_CHARACTER_TOKEN = "WHITESPACE_CHARACTER_TOKEN";
    Tokenizer.START_TAG_TOKEN = "START_TAG_TOKEN";
    Tokenizer.END_TAG_TOKEN = "END_TAG_TOKEN";
    Tokenizer.COMMENT_TOKEN = "COMMENT_TOKEN";
    Tokenizer.DOCTYPE_TOKEN = "DOCTYPE_TOKEN";
    Tokenizer.EOF_TOKEN = "EOF_TOKEN";
    Tokenizer.HIBERNATION_TOKEN = "HIBERNATION_TOKEN";
    Tokenizer.MODE = {
      DATA: DATA_STATE,
      RCDATA: RCDATA_STATE,
      RAWTEXT: RAWTEXT_STATE,
      SCRIPT_DATA: SCRIPT_DATA_STATE,
      PLAINTEXT: PLAINTEXT_STATE
    };
    Tokenizer.getTokenAttr = function(token, attrName) {
      for (let i = token.attrs.length - 1; i >= 0; i--) {
        if (token.attrs[i].name === attrName) {
          return token.attrs[i].value;
        }
      }
      return null;
    };
    module.exports = Tokenizer;
  }
});

// node_modules/parse5/lib/common/html.js
var require_html = __commonJS({
  "node_modules/parse5/lib/common/html.js"(exports) {
    "use strict";
    var NS = exports.NAMESPACES = {
      HTML: "http://www.w3.org/1999/xhtml",
      MATHML: "http://www.w3.org/1998/Math/MathML",
      SVG: "http://www.w3.org/2000/svg",
      XLINK: "http://www.w3.org/1999/xlink",
      XML: "http://www.w3.org/XML/1998/namespace",
      XMLNS: "http://www.w3.org/2000/xmlns/"
    };
    exports.ATTRS = {
      TYPE: "type",
      ACTION: "action",
      ENCODING: "encoding",
      PROMPT: "prompt",
      NAME: "name",
      COLOR: "color",
      FACE: "face",
      SIZE: "size"
    };
    exports.DOCUMENT_MODE = {
      NO_QUIRKS: "no-quirks",
      QUIRKS: "quirks",
      LIMITED_QUIRKS: "limited-quirks"
    };
    var $ = exports.TAG_NAMES = {
      A: "a",
      ADDRESS: "address",
      ANNOTATION_XML: "annotation-xml",
      APPLET: "applet",
      AREA: "area",
      ARTICLE: "article",
      ASIDE: "aside",
      B: "b",
      BASE: "base",
      BASEFONT: "basefont",
      BGSOUND: "bgsound",
      BIG: "big",
      BLOCKQUOTE: "blockquote",
      BODY: "body",
      BR: "br",
      BUTTON: "button",
      CAPTION: "caption",
      CENTER: "center",
      CODE: "code",
      COL: "col",
      COLGROUP: "colgroup",
      DD: "dd",
      DESC: "desc",
      DETAILS: "details",
      DIALOG: "dialog",
      DIR: "dir",
      DIV: "div",
      DL: "dl",
      DT: "dt",
      EM: "em",
      EMBED: "embed",
      FIELDSET: "fieldset",
      FIGCAPTION: "figcaption",
      FIGURE: "figure",
      FONT: "font",
      FOOTER: "footer",
      FOREIGN_OBJECT: "foreignObject",
      FORM: "form",
      FRAME: "frame",
      FRAMESET: "frameset",
      H1: "h1",
      H2: "h2",
      H3: "h3",
      H4: "h4",
      H5: "h5",
      H6: "h6",
      HEAD: "head",
      HEADER: "header",
      HGROUP: "hgroup",
      HR: "hr",
      HTML: "html",
      I: "i",
      IMG: "img",
      IMAGE: "image",
      INPUT: "input",
      IFRAME: "iframe",
      KEYGEN: "keygen",
      LABEL: "label",
      LI: "li",
      LINK: "link",
      LISTING: "listing",
      MAIN: "main",
      MALIGNMARK: "malignmark",
      MARQUEE: "marquee",
      MATH: "math",
      MENU: "menu",
      META: "meta",
      MGLYPH: "mglyph",
      MI: "mi",
      MO: "mo",
      MN: "mn",
      MS: "ms",
      MTEXT: "mtext",
      NAV: "nav",
      NOBR: "nobr",
      NOFRAMES: "noframes",
      NOEMBED: "noembed",
      NOSCRIPT: "noscript",
      OBJECT: "object",
      OL: "ol",
      OPTGROUP: "optgroup",
      OPTION: "option",
      P: "p",
      PARAM: "param",
      PLAINTEXT: "plaintext",
      PRE: "pre",
      RB: "rb",
      RP: "rp",
      RT: "rt",
      RTC: "rtc",
      RUBY: "ruby",
      S: "s",
      SCRIPT: "script",
      SECTION: "section",
      SELECT: "select",
      SOURCE: "source",
      SMALL: "small",
      SPAN: "span",
      STRIKE: "strike",
      STRONG: "strong",
      STYLE: "style",
      SUB: "sub",
      SUMMARY: "summary",
      SUP: "sup",
      TABLE: "table",
      TBODY: "tbody",
      TEMPLATE: "template",
      TEXTAREA: "textarea",
      TFOOT: "tfoot",
      TD: "td",
      TH: "th",
      THEAD: "thead",
      TITLE: "title",
      TR: "tr",
      TRACK: "track",
      TT: "tt",
      U: "u",
      UL: "ul",
      SVG: "svg",
      VAR: "var",
      WBR: "wbr",
      XMP: "xmp"
    };
    exports.SPECIAL_ELEMENTS = {
      [NS.HTML]: {
        [$.ADDRESS]: true,
        [$.APPLET]: true,
        [$.AREA]: true,
        [$.ARTICLE]: true,
        [$.ASIDE]: true,
        [$.BASE]: true,
        [$.BASEFONT]: true,
        [$.BGSOUND]: true,
        [$.BLOCKQUOTE]: true,
        [$.BODY]: true,
        [$.BR]: true,
        [$.BUTTON]: true,
        [$.CAPTION]: true,
        [$.CENTER]: true,
        [$.COL]: true,
        [$.COLGROUP]: true,
        [$.DD]: true,
        [$.DETAILS]: true,
        [$.DIR]: true,
        [$.DIV]: true,
        [$.DL]: true,
        [$.DT]: true,
        [$.EMBED]: true,
        [$.FIELDSET]: true,
        [$.FIGCAPTION]: true,
        [$.FIGURE]: true,
        [$.FOOTER]: true,
        [$.FORM]: true,
        [$.FRAME]: true,
        [$.FRAMESET]: true,
        [$.H1]: true,
        [$.H2]: true,
        [$.H3]: true,
        [$.H4]: true,
        [$.H5]: true,
        [$.H6]: true,
        [$.HEAD]: true,
        [$.HEADER]: true,
        [$.HGROUP]: true,
        [$.HR]: true,
        [$.HTML]: true,
        [$.IFRAME]: true,
        [$.IMG]: true,
        [$.INPUT]: true,
        [$.LI]: true,
        [$.LINK]: true,
        [$.LISTING]: true,
        [$.MAIN]: true,
        [$.MARQUEE]: true,
        [$.MENU]: true,
        [$.META]: true,
        [$.NAV]: true,
        [$.NOEMBED]: true,
        [$.NOFRAMES]: true,
        [$.NOSCRIPT]: true,
        [$.OBJECT]: true,
        [$.OL]: true,
        [$.P]: true,
        [$.PARAM]: true,
        [$.PLAINTEXT]: true,
        [$.PRE]: true,
        [$.SCRIPT]: true,
        [$.SECTION]: true,
        [$.SELECT]: true,
        [$.SOURCE]: true,
        [$.STYLE]: true,
        [$.SUMMARY]: true,
        [$.TABLE]: true,
        [$.TBODY]: true,
        [$.TD]: true,
        [$.TEMPLATE]: true,
        [$.TEXTAREA]: true,
        [$.TFOOT]: true,
        [$.TH]: true,
        [$.THEAD]: true,
        [$.TITLE]: true,
        [$.TR]: true,
        [$.TRACK]: true,
        [$.UL]: true,
        [$.WBR]: true,
        [$.XMP]: true
      },
      [NS.MATHML]: {
        [$.MI]: true,
        [$.MO]: true,
        [$.MN]: true,
        [$.MS]: true,
        [$.MTEXT]: true,
        [$.ANNOTATION_XML]: true
      },
      [NS.SVG]: {
        [$.TITLE]: true,
        [$.FOREIGN_OBJECT]: true,
        [$.DESC]: true
      }
    };
  }
});

// node_modules/parse5/lib/parser/open-element-stack.js
var require_open_element_stack = __commonJS({
  "node_modules/parse5/lib/parser/open-element-stack.js"(exports, module) {
    "use strict";
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    function isImpliedEndTagRequired(tn) {
      switch (tn.length) {
        case 1:
          return tn === $.P;
        case 2:
          return tn === $.RB || tn === $.RP || tn === $.RT || tn === $.DD || tn === $.DT || tn === $.LI;
        case 3:
          return tn === $.RTC;
        case 6:
          return tn === $.OPTION;
        case 8:
          return tn === $.OPTGROUP;
      }
      return false;
    }
    function isImpliedEndTagRequiredThoroughly(tn) {
      switch (tn.length) {
        case 1:
          return tn === $.P;
        case 2:
          return tn === $.RB || tn === $.RP || tn === $.RT || tn === $.DD || tn === $.DT || tn === $.LI || tn === $.TD || tn === $.TH || tn === $.TR;
        case 3:
          return tn === $.RTC;
        case 5:
          return tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD;
        case 6:
          return tn === $.OPTION;
        case 7:
          return tn === $.CAPTION;
        case 8:
          return tn === $.OPTGROUP || tn === $.COLGROUP;
      }
      return false;
    }
    function isScopingElement(tn, ns) {
      switch (tn.length) {
        case 2:
          if (tn === $.TD || tn === $.TH) {
            return ns === NS.HTML;
          } else if (tn === $.MI || tn === $.MO || tn === $.MN || tn === $.MS) {
            return ns === NS.MATHML;
          }
          break;
        case 4:
          if (tn === $.HTML) {
            return ns === NS.HTML;
          } else if (tn === $.DESC) {
            return ns === NS.SVG;
          }
          break;
        case 5:
          if (tn === $.TABLE) {
            return ns === NS.HTML;
          } else if (tn === $.MTEXT) {
            return ns === NS.MATHML;
          } else if (tn === $.TITLE) {
            return ns === NS.SVG;
          }
          break;
        case 6:
          return (tn === $.APPLET || tn === $.OBJECT) && ns === NS.HTML;
        case 7:
          return (tn === $.CAPTION || tn === $.MARQUEE) && ns === NS.HTML;
        case 8:
          return tn === $.TEMPLATE && ns === NS.HTML;
        case 13:
          return tn === $.FOREIGN_OBJECT && ns === NS.SVG;
        case 14:
          return tn === $.ANNOTATION_XML && ns === NS.MATHML;
      }
      return false;
    }
    var OpenElementStack = class {
      constructor(document4, treeAdapter) {
        this.stackTop = -1;
        this.items = [];
        this.current = document4;
        this.currentTagName = null;
        this.currentTmplContent = null;
        this.tmplCount = 0;
        this.treeAdapter = treeAdapter;
      }
      //Index of element
      _indexOf(element4) {
        let idx = -1;
        for (let i = this.stackTop; i >= 0; i--) {
          if (this.items[i] === element4) {
            idx = i;
            break;
          }
        }
        return idx;
      }
      //Update current element
      _isInTemplate() {
        return this.currentTagName === $.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
      }
      _updateCurrentElement() {
        this.current = this.items[this.stackTop];
        this.currentTagName = this.current && this.treeAdapter.getTagName(this.current);
        this.currentTmplContent = this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : null;
      }
      //Mutations
      push(element4) {
        this.items[++this.stackTop] = element4;
        this._updateCurrentElement();
        if (this._isInTemplate()) {
          this.tmplCount++;
        }
      }
      pop() {
        this.stackTop--;
        if (this.tmplCount > 0 && this._isInTemplate()) {
          this.tmplCount--;
        }
        this._updateCurrentElement();
      }
      replace(oldElement, newElement) {
        const idx = this._indexOf(oldElement);
        this.items[idx] = newElement;
        if (idx === this.stackTop) {
          this._updateCurrentElement();
        }
      }
      insertAfter(referenceElement, newElement) {
        const insertionIdx = this._indexOf(referenceElement) + 1;
        this.items.splice(insertionIdx, 0, newElement);
        if (insertionIdx === ++this.stackTop) {
          this._updateCurrentElement();
        }
      }
      popUntilTagNamePopped(tagName) {
        while (this.stackTop > -1) {
          const tn = this.currentTagName;
          const ns = this.treeAdapter.getNamespaceURI(this.current);
          this.pop();
          if (tn === tagName && ns === NS.HTML) {
            break;
          }
        }
      }
      popUntilElementPopped(element4) {
        while (this.stackTop > -1) {
          const poppedElement = this.current;
          this.pop();
          if (poppedElement === element4) {
            break;
          }
        }
      }
      popUntilNumberedHeaderPopped() {
        while (this.stackTop > -1) {
          const tn = this.currentTagName;
          const ns = this.treeAdapter.getNamespaceURI(this.current);
          this.pop();
          if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6 && ns === NS.HTML) {
            break;
          }
        }
      }
      popUntilTableCellPopped() {
        while (this.stackTop > -1) {
          const tn = this.currentTagName;
          const ns = this.treeAdapter.getNamespaceURI(this.current);
          this.pop();
          if (tn === $.TD || tn === $.TH && ns === NS.HTML) {
            break;
          }
        }
      }
      popAllUpToHtmlElement() {
        this.stackTop = 0;
        this._updateCurrentElement();
      }
      clearBackToTableContext() {
        while (this.currentTagName !== $.TABLE && this.currentTagName !== $.TEMPLATE && this.currentTagName !== $.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS.HTML) {
          this.pop();
        }
      }
      clearBackToTableBodyContext() {
        while (this.currentTagName !== $.TBODY && this.currentTagName !== $.TFOOT && this.currentTagName !== $.THEAD && this.currentTagName !== $.TEMPLATE && this.currentTagName !== $.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS.HTML) {
          this.pop();
        }
      }
      clearBackToTableRowContext() {
        while (this.currentTagName !== $.TR && this.currentTagName !== $.TEMPLATE && this.currentTagName !== $.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS.HTML) {
          this.pop();
        }
      }
      remove(element4) {
        for (let i = this.stackTop; i >= 0; i--) {
          if (this.items[i] === element4) {
            this.items.splice(i, 1);
            this.stackTop--;
            this._updateCurrentElement();
            break;
          }
        }
      }
      //Search
      tryPeekProperlyNestedBodyElement() {
        const element4 = this.items[1];
        return element4 && this.treeAdapter.getTagName(element4) === $.BODY ? element4 : null;
      }
      contains(element4) {
        return this._indexOf(element4) > -1;
      }
      getCommonAncestor(element4) {
        let elementIdx = this._indexOf(element4);
        return --elementIdx >= 0 ? this.items[elementIdx] : null;
      }
      isRootHtmlElementCurrent() {
        return this.stackTop === 0 && this.currentTagName === $.HTML;
      }
      //Element in scope
      hasInScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
          const tn = this.treeAdapter.getTagName(this.items[i]);
          const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
          if (tn === tagName && ns === NS.HTML) {
            return true;
          }
          if (isScopingElement(tn, ns)) {
            return false;
          }
        }
        return true;
      }
      hasNumberedHeaderInScope() {
        for (let i = this.stackTop; i >= 0; i--) {
          const tn = this.treeAdapter.getTagName(this.items[i]);
          const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
          if ((tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) && ns === NS.HTML) {
            return true;
          }
          if (isScopingElement(tn, ns)) {
            return false;
          }
        }
        return true;
      }
      hasInListItemScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
          const tn = this.treeAdapter.getTagName(this.items[i]);
          const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
          if (tn === tagName && ns === NS.HTML) {
            return true;
          }
          if ((tn === $.UL || tn === $.OL) && ns === NS.HTML || isScopingElement(tn, ns)) {
            return false;
          }
        }
        return true;
      }
      hasInButtonScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
          const tn = this.treeAdapter.getTagName(this.items[i]);
          const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
          if (tn === tagName && ns === NS.HTML) {
            return true;
          }
          if (tn === $.BUTTON && ns === NS.HTML || isScopingElement(tn, ns)) {
            return false;
          }
        }
        return true;
      }
      hasInTableScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
          const tn = this.treeAdapter.getTagName(this.items[i]);
          const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
          if (ns !== NS.HTML) {
            continue;
          }
          if (tn === tagName) {
            return true;
          }
          if (tn === $.TABLE || tn === $.TEMPLATE || tn === $.HTML) {
            return false;
          }
        }
        return true;
      }
      hasTableBodyContextInTableScope() {
        for (let i = this.stackTop; i >= 0; i--) {
          const tn = this.treeAdapter.getTagName(this.items[i]);
          const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
          if (ns !== NS.HTML) {
            continue;
          }
          if (tn === $.TBODY || tn === $.THEAD || tn === $.TFOOT) {
            return true;
          }
          if (tn === $.TABLE || tn === $.HTML) {
            return false;
          }
        }
        return true;
      }
      hasInSelectScope(tagName) {
        for (let i = this.stackTop; i >= 0; i--) {
          const tn = this.treeAdapter.getTagName(this.items[i]);
          const ns = this.treeAdapter.getNamespaceURI(this.items[i]);
          if (ns !== NS.HTML) {
            continue;
          }
          if (tn === tagName) {
            return true;
          }
          if (tn !== $.OPTION && tn !== $.OPTGROUP) {
            return false;
          }
        }
        return true;
      }
      //Implied end tags
      generateImpliedEndTags() {
        while (isImpliedEndTagRequired(this.currentTagName)) {
          this.pop();
        }
      }
      generateImpliedEndTagsThoroughly() {
        while (isImpliedEndTagRequiredThoroughly(this.currentTagName)) {
          this.pop();
        }
      }
      generateImpliedEndTagsWithExclusion(exclusionTagName) {
        while (isImpliedEndTagRequired(this.currentTagName) && this.currentTagName !== exclusionTagName) {
          this.pop();
        }
      }
    };
    module.exports = OpenElementStack;
  }
});

// node_modules/parse5/lib/parser/formatting-element-list.js
var require_formatting_element_list = __commonJS({
  "node_modules/parse5/lib/parser/formatting-element-list.js"(exports, module) {
    "use strict";
    var NOAH_ARK_CAPACITY = 3;
    var FormattingElementList = class {
      constructor(treeAdapter) {
        this.length = 0;
        this.entries = [];
        this.treeAdapter = treeAdapter;
        this.bookmark = null;
      }
      //Noah Ark's condition
      //OPTIMIZATION: at first we try to find possible candidates for exclusion using
      //lightweight heuristics without thorough attributes check.
      _getNoahArkConditionCandidates(newElement) {
        const candidates = [];
        if (this.length >= NOAH_ARK_CAPACITY) {
          const neAttrsLength = this.treeAdapter.getAttrList(newElement).length;
          const neTagName = this.treeAdapter.getTagName(newElement);
          const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
          for (let i = this.length - 1; i >= 0; i--) {
            const entry = this.entries[i];
            if (entry.type === FormattingElementList.MARKER_ENTRY) {
              break;
            }
            const element4 = entry.element;
            const elementAttrs = this.treeAdapter.getAttrList(element4);
            const isCandidate = this.treeAdapter.getTagName(element4) === neTagName && this.treeAdapter.getNamespaceURI(element4) === neNamespaceURI && elementAttrs.length === neAttrsLength;
            if (isCandidate) {
              candidates.push({ idx: i, attrs: elementAttrs });
            }
          }
        }
        return candidates.length < NOAH_ARK_CAPACITY ? [] : candidates;
      }
      _ensureNoahArkCondition(newElement) {
        const candidates = this._getNoahArkConditionCandidates(newElement);
        let cLength = candidates.length;
        if (cLength) {
          const neAttrs = this.treeAdapter.getAttrList(newElement);
          const neAttrsLength = neAttrs.length;
          const neAttrsMap = /* @__PURE__ */ Object.create(null);
          for (let i = 0; i < neAttrsLength; i++) {
            const neAttr = neAttrs[i];
            neAttrsMap[neAttr.name] = neAttr.value;
          }
          for (let i = 0; i < neAttrsLength; i++) {
            for (let j = 0; j < cLength; j++) {
              const cAttr = candidates[j].attrs[i];
              if (neAttrsMap[cAttr.name] !== cAttr.value) {
                candidates.splice(j, 1);
                cLength--;
              }
              if (candidates.length < NOAH_ARK_CAPACITY) {
                return;
              }
            }
          }
          for (let i = cLength - 1; i >= NOAH_ARK_CAPACITY - 1; i--) {
            this.entries.splice(candidates[i].idx, 1);
            this.length--;
          }
        }
      }
      //Mutations
      insertMarker() {
        this.entries.push({ type: FormattingElementList.MARKER_ENTRY });
        this.length++;
      }
      pushElement(element4, token) {
        this._ensureNoahArkCondition(element4);
        this.entries.push({
          type: FormattingElementList.ELEMENT_ENTRY,
          element: element4,
          token
        });
        this.length++;
      }
      insertElementAfterBookmark(element4, token) {
        let bookmarkIdx = this.length - 1;
        for (; bookmarkIdx >= 0; bookmarkIdx--) {
          if (this.entries[bookmarkIdx] === this.bookmark) {
            break;
          }
        }
        this.entries.splice(bookmarkIdx + 1, 0, {
          type: FormattingElementList.ELEMENT_ENTRY,
          element: element4,
          token
        });
        this.length++;
      }
      removeEntry(entry) {
        for (let i = this.length - 1; i >= 0; i--) {
          if (this.entries[i] === entry) {
            this.entries.splice(i, 1);
            this.length--;
            break;
          }
        }
      }
      clearToLastMarker() {
        while (this.length) {
          const entry = this.entries.pop();
          this.length--;
          if (entry.type === FormattingElementList.MARKER_ENTRY) {
            break;
          }
        }
      }
      //Search
      getElementEntryInScopeWithTagName(tagName) {
        for (let i = this.length - 1; i >= 0; i--) {
          const entry = this.entries[i];
          if (entry.type === FormattingElementList.MARKER_ENTRY) {
            return null;
          }
          if (this.treeAdapter.getTagName(entry.element) === tagName) {
            return entry;
          }
        }
        return null;
      }
      getElementEntry(element4) {
        for (let i = this.length - 1; i >= 0; i--) {
          const entry = this.entries[i];
          if (entry.type === FormattingElementList.ELEMENT_ENTRY && entry.element === element4) {
            return entry;
          }
        }
        return null;
      }
    };
    FormattingElementList.MARKER_ENTRY = "MARKER_ENTRY";
    FormattingElementList.ELEMENT_ENTRY = "ELEMENT_ENTRY";
    module.exports = FormattingElementList;
  }
});

// node_modules/parse5/lib/utils/mixin.js
var require_mixin = __commonJS({
  "node_modules/parse5/lib/utils/mixin.js"(exports, module) {
    "use strict";
    var Mixin = class {
      constructor(host) {
        const originalMethods = {};
        const overriddenMethods = this._getOverriddenMethods(this, originalMethods);
        for (const key2 of Object.keys(overriddenMethods)) {
          if (typeof overriddenMethods[key2] === "function") {
            originalMethods[key2] = host[key2];
            host[key2] = overriddenMethods[key2];
          }
        }
      }
      _getOverriddenMethods() {
        throw new Error("Not implemented");
      }
    };
    Mixin.install = function(host, Ctor, opts) {
      if (!host.__mixins) {
        host.__mixins = [];
      }
      for (let i = 0; i < host.__mixins.length; i++) {
        if (host.__mixins[i].constructor === Ctor) {
          return host.__mixins[i];
        }
      }
      const mixin = new Ctor(host, opts);
      host.__mixins.push(mixin);
      return mixin;
    };
    module.exports = Mixin;
  }
});

// node_modules/parse5/lib/extensions/position-tracking/preprocessor-mixin.js
var require_preprocessor_mixin = __commonJS({
  "node_modules/parse5/lib/extensions/position-tracking/preprocessor-mixin.js"(exports, module) {
    "use strict";
    var Mixin = require_mixin();
    var PositionTrackingPreprocessorMixin = class extends Mixin {
      constructor(preprocessor) {
        super(preprocessor);
        this.preprocessor = preprocessor;
        this.isEol = false;
        this.lineStartPos = 0;
        this.droppedBufferSize = 0;
        this.offset = 0;
        this.col = 0;
        this.line = 1;
      }
      _getOverriddenMethods(mxn, orig) {
        return {
          advance() {
            const pos = this.pos + 1;
            const ch = this.html[pos];
            if (mxn.isEol) {
              mxn.isEol = false;
              mxn.line++;
              mxn.lineStartPos = pos;
            }
            if (ch === "\n" || ch === "\r" && this.html[pos + 1] !== "\n") {
              mxn.isEol = true;
            }
            mxn.col = pos - mxn.lineStartPos + 1;
            mxn.offset = mxn.droppedBufferSize + pos;
            return orig.advance.call(this);
          },
          retreat() {
            orig.retreat.call(this);
            mxn.isEol = false;
            mxn.col = this.pos - mxn.lineStartPos + 1;
          },
          dropParsedChunk() {
            const prevPos = this.pos;
            orig.dropParsedChunk.call(this);
            const reduction = prevPos - this.pos;
            mxn.lineStartPos -= reduction;
            mxn.droppedBufferSize += reduction;
            mxn.offset = mxn.droppedBufferSize + this.pos;
          }
        };
      }
    };
    module.exports = PositionTrackingPreprocessorMixin;
  }
});

// node_modules/parse5/lib/extensions/location-info/tokenizer-mixin.js
var require_tokenizer_mixin = __commonJS({
  "node_modules/parse5/lib/extensions/location-info/tokenizer-mixin.js"(exports, module) {
    "use strict";
    var Mixin = require_mixin();
    var Tokenizer = require_tokenizer();
    var PositionTrackingPreprocessorMixin = require_preprocessor_mixin();
    var LocationInfoTokenizerMixin = class extends Mixin {
      constructor(tokenizer) {
        super(tokenizer);
        this.tokenizer = tokenizer;
        this.posTracker = Mixin.install(tokenizer.preprocessor, PositionTrackingPreprocessorMixin);
        this.currentAttrLocation = null;
        this.ctLoc = null;
      }
      _getCurrentLocation() {
        return {
          startLine: this.posTracker.line,
          startCol: this.posTracker.col,
          startOffset: this.posTracker.offset,
          endLine: -1,
          endCol: -1,
          endOffset: -1
        };
      }
      _attachCurrentAttrLocationInfo() {
        this.currentAttrLocation.endLine = this.posTracker.line;
        this.currentAttrLocation.endCol = this.posTracker.col;
        this.currentAttrLocation.endOffset = this.posTracker.offset;
        const currentToken = this.tokenizer.currentToken;
        const currentAttr = this.tokenizer.currentAttr;
        if (!currentToken.location.attrs) {
          currentToken.location.attrs = /* @__PURE__ */ Object.create(null);
        }
        currentToken.location.attrs[currentAttr.name] = this.currentAttrLocation;
      }
      _getOverriddenMethods(mxn, orig) {
        const methods = {
          _createStartTagToken() {
            orig._createStartTagToken.call(this);
            this.currentToken.location = mxn.ctLoc;
          },
          _createEndTagToken() {
            orig._createEndTagToken.call(this);
            this.currentToken.location = mxn.ctLoc;
          },
          _createCommentToken() {
            orig._createCommentToken.call(this);
            this.currentToken.location = mxn.ctLoc;
          },
          _createDoctypeToken(initialName) {
            orig._createDoctypeToken.call(this, initialName);
            this.currentToken.location = mxn.ctLoc;
          },
          _createCharacterToken(type, ch) {
            orig._createCharacterToken.call(this, type, ch);
            this.currentCharacterToken.location = mxn.ctLoc;
          },
          _createEOFToken() {
            orig._createEOFToken.call(this);
            this.currentToken.location = mxn._getCurrentLocation();
          },
          _createAttr(attrNameFirstCh) {
            orig._createAttr.call(this, attrNameFirstCh);
            mxn.currentAttrLocation = mxn._getCurrentLocation();
          },
          _leaveAttrName(toState) {
            orig._leaveAttrName.call(this, toState);
            mxn._attachCurrentAttrLocationInfo();
          },
          _leaveAttrValue(toState) {
            orig._leaveAttrValue.call(this, toState);
            mxn._attachCurrentAttrLocationInfo();
          },
          _emitCurrentToken() {
            const ctLoc = this.currentToken.location;
            if (this.currentCharacterToken) {
              this.currentCharacterToken.location.endLine = ctLoc.startLine;
              this.currentCharacterToken.location.endCol = ctLoc.startCol;
              this.currentCharacterToken.location.endOffset = ctLoc.startOffset;
            }
            if (this.currentToken.type === Tokenizer.EOF_TOKEN) {
              ctLoc.endLine = ctLoc.startLine;
              ctLoc.endCol = ctLoc.startCol;
              ctLoc.endOffset = ctLoc.startOffset;
            } else {
              ctLoc.endLine = mxn.posTracker.line;
              ctLoc.endCol = mxn.posTracker.col + 1;
              ctLoc.endOffset = mxn.posTracker.offset + 1;
            }
            orig._emitCurrentToken.call(this);
          },
          _emitCurrentCharacterToken() {
            const ctLoc = this.currentCharacterToken && this.currentCharacterToken.location;
            if (ctLoc && ctLoc.endOffset === -1) {
              ctLoc.endLine = mxn.posTracker.line;
              ctLoc.endCol = mxn.posTracker.col;
              ctLoc.endOffset = mxn.posTracker.offset;
            }
            orig._emitCurrentCharacterToken.call(this);
          }
        };
        Object.keys(Tokenizer.MODE).forEach((modeName) => {
          const state = Tokenizer.MODE[modeName];
          methods[state] = function(cp) {
            mxn.ctLoc = mxn._getCurrentLocation();
            orig[state].call(this, cp);
          };
        });
        return methods;
      }
    };
    module.exports = LocationInfoTokenizerMixin;
  }
});

// node_modules/parse5/lib/extensions/location-info/open-element-stack-mixin.js
var require_open_element_stack_mixin = __commonJS({
  "node_modules/parse5/lib/extensions/location-info/open-element-stack-mixin.js"(exports, module) {
    "use strict";
    var Mixin = require_mixin();
    var LocationInfoOpenElementStackMixin = class extends Mixin {
      constructor(stack, opts) {
        super(stack);
        this.onItemPop = opts.onItemPop;
      }
      _getOverriddenMethods(mxn, orig) {
        return {
          pop() {
            mxn.onItemPop(this.current);
            orig.pop.call(this);
          },
          popAllUpToHtmlElement() {
            for (let i = this.stackTop; i > 0; i--) {
              mxn.onItemPop(this.items[i]);
            }
            orig.popAllUpToHtmlElement.call(this);
          },
          remove(element4) {
            mxn.onItemPop(this.current);
            orig.remove.call(this, element4);
          }
        };
      }
    };
    module.exports = LocationInfoOpenElementStackMixin;
  }
});

// node_modules/parse5/lib/extensions/location-info/parser-mixin.js
var require_parser_mixin = __commonJS({
  "node_modules/parse5/lib/extensions/location-info/parser-mixin.js"(exports, module) {
    "use strict";
    var Mixin = require_mixin();
    var Tokenizer = require_tokenizer();
    var LocationInfoTokenizerMixin = require_tokenizer_mixin();
    var LocationInfoOpenElementStackMixin = require_open_element_stack_mixin();
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var LocationInfoParserMixin = class extends Mixin {
      constructor(parser2) {
        super(parser2);
        this.parser = parser2;
        this.treeAdapter = this.parser.treeAdapter;
        this.posTracker = null;
        this.lastStartTagToken = null;
        this.lastFosterParentingLocation = null;
        this.currentToken = null;
      }
      _setStartLocation(element4) {
        let loc = null;
        if (this.lastStartTagToken) {
          loc = Object.assign({}, this.lastStartTagToken.location);
          loc.startTag = this.lastStartTagToken.location;
        }
        this.treeAdapter.setNodeSourceCodeLocation(element4, loc);
      }
      _setEndLocation(element4, closingToken) {
        const loc = this.treeAdapter.getNodeSourceCodeLocation(element4);
        if (loc) {
          if (closingToken.location) {
            const ctLoc = closingToken.location;
            const tn = this.treeAdapter.getTagName(element4);
            const isClosingEndTag = closingToken.type === Tokenizer.END_TAG_TOKEN && tn === closingToken.tagName;
            const endLoc = {};
            if (isClosingEndTag) {
              endLoc.endTag = Object.assign({}, ctLoc);
              endLoc.endLine = ctLoc.endLine;
              endLoc.endCol = ctLoc.endCol;
              endLoc.endOffset = ctLoc.endOffset;
            } else {
              endLoc.endLine = ctLoc.startLine;
              endLoc.endCol = ctLoc.startCol;
              endLoc.endOffset = ctLoc.startOffset;
            }
            this.treeAdapter.updateNodeSourceCodeLocation(element4, endLoc);
          }
        }
      }
      _getOverriddenMethods(mxn, orig) {
        return {
          _bootstrap(document4, fragmentContext) {
            orig._bootstrap.call(this, document4, fragmentContext);
            mxn.lastStartTagToken = null;
            mxn.lastFosterParentingLocation = null;
            mxn.currentToken = null;
            const tokenizerMixin = Mixin.install(this.tokenizer, LocationInfoTokenizerMixin);
            mxn.posTracker = tokenizerMixin.posTracker;
            Mixin.install(this.openElements, LocationInfoOpenElementStackMixin, {
              onItemPop: function(element4) {
                mxn._setEndLocation(element4, mxn.currentToken);
              }
            });
          },
          _runParsingLoop(scriptHandler) {
            orig._runParsingLoop.call(this, scriptHandler);
            for (let i = this.openElements.stackTop; i >= 0; i--) {
              mxn._setEndLocation(this.openElements.items[i], mxn.currentToken);
            }
          },
          //Token processing
          _processTokenInForeignContent(token) {
            mxn.currentToken = token;
            orig._processTokenInForeignContent.call(this, token);
          },
          _processToken(token) {
            mxn.currentToken = token;
            orig._processToken.call(this, token);
            const requireExplicitUpdate = token.type === Tokenizer.END_TAG_TOKEN && (token.tagName === $.HTML || token.tagName === $.BODY && this.openElements.hasInScope($.BODY));
            if (requireExplicitUpdate) {
              for (let i = this.openElements.stackTop; i >= 0; i--) {
                const element4 = this.openElements.items[i];
                if (this.treeAdapter.getTagName(element4) === token.tagName) {
                  mxn._setEndLocation(element4, token);
                  break;
                }
              }
            }
          },
          //Doctype
          _setDocumentType(token) {
            orig._setDocumentType.call(this, token);
            const documentChildren = this.treeAdapter.getChildNodes(this.document);
            const cnLength = documentChildren.length;
            for (let i = 0; i < cnLength; i++) {
              const node2 = documentChildren[i];
              if (this.treeAdapter.isDocumentTypeNode(node2)) {
                this.treeAdapter.setNodeSourceCodeLocation(node2, token.location);
                break;
              }
            }
          },
          //Elements
          _attachElementToTree(element4) {
            mxn._setStartLocation(element4);
            mxn.lastStartTagToken = null;
            orig._attachElementToTree.call(this, element4);
          },
          _appendElement(token, namespaceURI) {
            mxn.lastStartTagToken = token;
            orig._appendElement.call(this, token, namespaceURI);
          },
          _insertElement(token, namespaceURI) {
            mxn.lastStartTagToken = token;
            orig._insertElement.call(this, token, namespaceURI);
          },
          _insertTemplate(token) {
            mxn.lastStartTagToken = token;
            orig._insertTemplate.call(this, token);
            const tmplContent = this.treeAdapter.getTemplateContent(this.openElements.current);
            this.treeAdapter.setNodeSourceCodeLocation(tmplContent, null);
          },
          _insertFakeRootElement() {
            orig._insertFakeRootElement.call(this);
            this.treeAdapter.setNodeSourceCodeLocation(this.openElements.current, null);
          },
          //Comments
          _appendCommentNode(token, parent) {
            orig._appendCommentNode.call(this, token, parent);
            const children = this.treeAdapter.getChildNodes(parent);
            const commentNode = children[children.length - 1];
            this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
          },
          //Text
          _findFosterParentingLocation() {
            mxn.lastFosterParentingLocation = orig._findFosterParentingLocation.call(this);
            return mxn.lastFosterParentingLocation;
          },
          _insertCharacters(token) {
            orig._insertCharacters.call(this, token);
            const hasFosterParent = this._shouldFosterParentOnInsertion();
            const parent = hasFosterParent && mxn.lastFosterParentingLocation.parent || this.openElements.currentTmplContent || this.openElements.current;
            const siblings2 = this.treeAdapter.getChildNodes(parent);
            const textNodeIdx = hasFosterParent && mxn.lastFosterParentingLocation.beforeElement ? siblings2.indexOf(mxn.lastFosterParentingLocation.beforeElement) - 1 : siblings2.length - 1;
            const textNode = siblings2[textNodeIdx];
            const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
            if (tnLoc) {
              const { endLine, endCol, endOffset } = token.location;
              this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
            } else {
              this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
            }
          }
        };
      }
    };
    module.exports = LocationInfoParserMixin;
  }
});

// node_modules/parse5/lib/extensions/error-reporting/mixin-base.js
var require_mixin_base = __commonJS({
  "node_modules/parse5/lib/extensions/error-reporting/mixin-base.js"(exports, module) {
    "use strict";
    var Mixin = require_mixin();
    var ErrorReportingMixinBase = class extends Mixin {
      constructor(host, opts) {
        super(host);
        this.posTracker = null;
        this.onParseError = opts.onParseError;
      }
      _setErrorLocation(err2) {
        err2.startLine = err2.endLine = this.posTracker.line;
        err2.startCol = err2.endCol = this.posTracker.col;
        err2.startOffset = err2.endOffset = this.posTracker.offset;
      }
      _reportError(code3) {
        const err2 = {
          code: code3,
          startLine: -1,
          startCol: -1,
          startOffset: -1,
          endLine: -1,
          endCol: -1,
          endOffset: -1
        };
        this._setErrorLocation(err2);
        this.onParseError(err2);
      }
      _getOverriddenMethods(mxn) {
        return {
          _err(code3) {
            mxn._reportError(code3);
          }
        };
      }
    };
    module.exports = ErrorReportingMixinBase;
  }
});

// node_modules/parse5/lib/extensions/error-reporting/preprocessor-mixin.js
var require_preprocessor_mixin2 = __commonJS({
  "node_modules/parse5/lib/extensions/error-reporting/preprocessor-mixin.js"(exports, module) {
    "use strict";
    var ErrorReportingMixinBase = require_mixin_base();
    var PositionTrackingPreprocessorMixin = require_preprocessor_mixin();
    var Mixin = require_mixin();
    var ErrorReportingPreprocessorMixin = class extends ErrorReportingMixinBase {
      constructor(preprocessor, opts) {
        super(preprocessor, opts);
        this.posTracker = Mixin.install(preprocessor, PositionTrackingPreprocessorMixin);
        this.lastErrOffset = -1;
      }
      _reportError(code3) {
        if (this.lastErrOffset !== this.posTracker.offset) {
          this.lastErrOffset = this.posTracker.offset;
          super._reportError(code3);
        }
      }
    };
    module.exports = ErrorReportingPreprocessorMixin;
  }
});

// node_modules/parse5/lib/extensions/error-reporting/tokenizer-mixin.js
var require_tokenizer_mixin2 = __commonJS({
  "node_modules/parse5/lib/extensions/error-reporting/tokenizer-mixin.js"(exports, module) {
    "use strict";
    var ErrorReportingMixinBase = require_mixin_base();
    var ErrorReportingPreprocessorMixin = require_preprocessor_mixin2();
    var Mixin = require_mixin();
    var ErrorReportingTokenizerMixin = class extends ErrorReportingMixinBase {
      constructor(tokenizer, opts) {
        super(tokenizer, opts);
        const preprocessorMixin = Mixin.install(tokenizer.preprocessor, ErrorReportingPreprocessorMixin, opts);
        this.posTracker = preprocessorMixin.posTracker;
      }
    };
    module.exports = ErrorReportingTokenizerMixin;
  }
});

// node_modules/parse5/lib/extensions/error-reporting/parser-mixin.js
var require_parser_mixin2 = __commonJS({
  "node_modules/parse5/lib/extensions/error-reporting/parser-mixin.js"(exports, module) {
    "use strict";
    var ErrorReportingMixinBase = require_mixin_base();
    var ErrorReportingTokenizerMixin = require_tokenizer_mixin2();
    var LocationInfoTokenizerMixin = require_tokenizer_mixin();
    var Mixin = require_mixin();
    var ErrorReportingParserMixin = class extends ErrorReportingMixinBase {
      constructor(parser2, opts) {
        super(parser2, opts);
        this.opts = opts;
        this.ctLoc = null;
        this.locBeforeToken = false;
      }
      _setErrorLocation(err2) {
        if (this.ctLoc) {
          err2.startLine = this.ctLoc.startLine;
          err2.startCol = this.ctLoc.startCol;
          err2.startOffset = this.ctLoc.startOffset;
          err2.endLine = this.locBeforeToken ? this.ctLoc.startLine : this.ctLoc.endLine;
          err2.endCol = this.locBeforeToken ? this.ctLoc.startCol : this.ctLoc.endCol;
          err2.endOffset = this.locBeforeToken ? this.ctLoc.startOffset : this.ctLoc.endOffset;
        }
      }
      _getOverriddenMethods(mxn, orig) {
        return {
          _bootstrap(document4, fragmentContext) {
            orig._bootstrap.call(this, document4, fragmentContext);
            Mixin.install(this.tokenizer, ErrorReportingTokenizerMixin, mxn.opts);
            Mixin.install(this.tokenizer, LocationInfoTokenizerMixin);
          },
          _processInputToken(token) {
            mxn.ctLoc = token.location;
            orig._processInputToken.call(this, token);
          },
          _err(code3, options) {
            mxn.locBeforeToken = options && options.beforeToken;
            mxn._reportError(code3);
          }
        };
      }
    };
    module.exports = ErrorReportingParserMixin;
  }
});

// node_modules/parse5/lib/tree-adapters/default.js
var require_default = __commonJS({
  "node_modules/parse5/lib/tree-adapters/default.js"(exports) {
    "use strict";
    var { DOCUMENT_MODE } = require_html();
    exports.createDocument = function() {
      return {
        nodeName: "#document",
        mode: DOCUMENT_MODE.NO_QUIRKS,
        childNodes: []
      };
    };
    exports.createDocumentFragment = function() {
      return {
        nodeName: "#document-fragment",
        childNodes: []
      };
    };
    exports.createElement = function(tagName, namespaceURI, attrs) {
      return {
        nodeName: tagName,
        tagName,
        attrs,
        namespaceURI,
        childNodes: [],
        parentNode: null
      };
    };
    exports.createCommentNode = function(data) {
      return {
        nodeName: "#comment",
        data,
        parentNode: null
      };
    };
    var createTextNode = function(value) {
      return {
        nodeName: "#text",
        value,
        parentNode: null
      };
    };
    var appendChild = exports.appendChild = function(parentNode, newNode) {
      parentNode.childNodes.push(newNode);
      newNode.parentNode = parentNode;
    };
    var insertBefore = exports.insertBefore = function(parentNode, newNode, referenceNode) {
      const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
      parentNode.childNodes.splice(insertionIdx, 0, newNode);
      newNode.parentNode = parentNode;
    };
    exports.setTemplateContent = function(templateElement, contentElement) {
      templateElement.content = contentElement;
    };
    exports.getTemplateContent = function(templateElement) {
      return templateElement.content;
    };
    exports.setDocumentType = function(document4, name2, publicId, systemId) {
      let doctypeNode = null;
      for (let i = 0; i < document4.childNodes.length; i++) {
        if (document4.childNodes[i].nodeName === "#documentType") {
          doctypeNode = document4.childNodes[i];
          break;
        }
      }
      if (doctypeNode) {
        doctypeNode.name = name2;
        doctypeNode.publicId = publicId;
        doctypeNode.systemId = systemId;
      } else {
        appendChild(document4, {
          nodeName: "#documentType",
          name: name2,
          publicId,
          systemId
        });
      }
    };
    exports.setDocumentMode = function(document4, mode) {
      document4.mode = mode;
    };
    exports.getDocumentMode = function(document4) {
      return document4.mode;
    };
    exports.detachNode = function(node2) {
      if (node2.parentNode) {
        const idx = node2.parentNode.childNodes.indexOf(node2);
        node2.parentNode.childNodes.splice(idx, 1);
        node2.parentNode = null;
      }
    };
    exports.insertText = function(parentNode, text6) {
      if (parentNode.childNodes.length) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
        if (prevNode.nodeName === "#text") {
          prevNode.value += text6;
          return;
        }
      }
      appendChild(parentNode, createTextNode(text6));
    };
    exports.insertTextBefore = function(parentNode, text6, referenceNode) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
      if (prevNode && prevNode.nodeName === "#text") {
        prevNode.value += text6;
      } else {
        insertBefore(parentNode, createTextNode(text6), referenceNode);
      }
    };
    exports.adoptAttributes = function(recipient, attrs) {
      const recipientAttrsMap = [];
      for (let i = 0; i < recipient.attrs.length; i++) {
        recipientAttrsMap.push(recipient.attrs[i].name);
      }
      for (let j = 0; j < attrs.length; j++) {
        if (recipientAttrsMap.indexOf(attrs[j].name) === -1) {
          recipient.attrs.push(attrs[j]);
        }
      }
    };
    exports.getFirstChild = function(node2) {
      return node2.childNodes[0];
    };
    exports.getChildNodes = function(node2) {
      return node2.childNodes;
    };
    exports.getParentNode = function(node2) {
      return node2.parentNode;
    };
    exports.getAttrList = function(element4) {
      return element4.attrs;
    };
    exports.getTagName = function(element4) {
      return element4.tagName;
    };
    exports.getNamespaceURI = function(element4) {
      return element4.namespaceURI;
    };
    exports.getTextNodeContent = function(textNode) {
      return textNode.value;
    };
    exports.getCommentNodeContent = function(commentNode) {
      return commentNode.data;
    };
    exports.getDocumentTypeNodeName = function(doctypeNode) {
      return doctypeNode.name;
    };
    exports.getDocumentTypeNodePublicId = function(doctypeNode) {
      return doctypeNode.publicId;
    };
    exports.getDocumentTypeNodeSystemId = function(doctypeNode) {
      return doctypeNode.systemId;
    };
    exports.isTextNode = function(node2) {
      return node2.nodeName === "#text";
    };
    exports.isCommentNode = function(node2) {
      return node2.nodeName === "#comment";
    };
    exports.isDocumentTypeNode = function(node2) {
      return node2.nodeName === "#documentType";
    };
    exports.isElementNode = function(node2) {
      return !!node2.tagName;
    };
    exports.setNodeSourceCodeLocation = function(node2, location2) {
      node2.sourceCodeLocation = location2;
    };
    exports.getNodeSourceCodeLocation = function(node2) {
      return node2.sourceCodeLocation;
    };
    exports.updateNodeSourceCodeLocation = function(node2, endLocation) {
      node2.sourceCodeLocation = Object.assign(node2.sourceCodeLocation, endLocation);
    };
  }
});

// node_modules/parse5/lib/utils/merge-options.js
var require_merge_options = __commonJS({
  "node_modules/parse5/lib/utils/merge-options.js"(exports, module) {
    "use strict";
    module.exports = function mergeOptions(defaults, options) {
      options = options || /* @__PURE__ */ Object.create(null);
      return [defaults, options].reduce((merged, optObj) => {
        Object.keys(optObj).forEach((key2) => {
          merged[key2] = optObj[key2];
        });
        return merged;
      }, /* @__PURE__ */ Object.create(null));
    };
  }
});

// node_modules/parse5/lib/common/doctype.js
var require_doctype = __commonJS({
  "node_modules/parse5/lib/common/doctype.js"(exports) {
    "use strict";
    var { DOCUMENT_MODE } = require_html();
    var VALID_DOCTYPE_NAME = "html";
    var VALID_SYSTEM_ID = "about:legacy-compat";
    var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
    var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
      "+//silmaril//dtd html pro v0r11 19970101//",
      "-//as//dtd html 3.0 aswedit + extensions//",
      "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
      "-//ietf//dtd html 2.0 level 1//",
      "-//ietf//dtd html 2.0 level 2//",
      "-//ietf//dtd html 2.0 strict level 1//",
      "-//ietf//dtd html 2.0 strict level 2//",
      "-//ietf//dtd html 2.0 strict//",
      "-//ietf//dtd html 2.0//",
      "-//ietf//dtd html 2.1e//",
      "-//ietf//dtd html 3.0//",
      "-//ietf//dtd html 3.2 final//",
      "-//ietf//dtd html 3.2//",
      "-//ietf//dtd html 3//",
      "-//ietf//dtd html level 0//",
      "-//ietf//dtd html level 1//",
      "-//ietf//dtd html level 2//",
      "-//ietf//dtd html level 3//",
      "-//ietf//dtd html strict level 0//",
      "-//ietf//dtd html strict level 1//",
      "-//ietf//dtd html strict level 2//",
      "-//ietf//dtd html strict level 3//",
      "-//ietf//dtd html strict//",
      "-//ietf//dtd html//",
      "-//metrius//dtd metrius presentational//",
      "-//microsoft//dtd internet explorer 2.0 html strict//",
      "-//microsoft//dtd internet explorer 2.0 html//",
      "-//microsoft//dtd internet explorer 2.0 tables//",
      "-//microsoft//dtd internet explorer 3.0 html strict//",
      "-//microsoft//dtd internet explorer 3.0 html//",
      "-//microsoft//dtd internet explorer 3.0 tables//",
      "-//netscape comm. corp.//dtd html//",
      "-//netscape comm. corp.//dtd strict html//",
      "-//o'reilly and associates//dtd html 2.0//",
      "-//o'reilly and associates//dtd html extended 1.0//",
      "-//o'reilly and associates//dtd html extended relaxed 1.0//",
      "-//sq//dtd html 2.0 hotmetal + extensions//",
      "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
      "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
      "-//spyglass//dtd html 2.0 extended//",
      "-//sun microsystems corp.//dtd hotjava html//",
      "-//sun microsystems corp.//dtd hotjava strict html//",
      "-//w3c//dtd html 3 1995-03-24//",
      "-//w3c//dtd html 3.2 draft//",
      "-//w3c//dtd html 3.2 final//",
      "-//w3c//dtd html 3.2//",
      "-//w3c//dtd html 3.2s draft//",
      "-//w3c//dtd html 4.0 frameset//",
      "-//w3c//dtd html 4.0 transitional//",
      "-//w3c//dtd html experimental 19960712//",
      "-//w3c//dtd html experimental 970421//",
      "-//w3c//dtd w3 html//",
      "-//w3o//dtd w3 html 3.0//",
      "-//webtechs//dtd mozilla html 2.0//",
      "-//webtechs//dtd mozilla html//"
    ];
    var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = QUIRKS_MODE_PUBLIC_ID_PREFIXES.concat([
      "-//w3c//dtd html 4.01 frameset//",
      "-//w3c//dtd html 4.01 transitional//"
    ]);
    var QUIRKS_MODE_PUBLIC_IDS = ["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"];
    var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
    var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = LIMITED_QUIRKS_PUBLIC_ID_PREFIXES.concat([
      "-//w3c//dtd html 4.01 frameset//",
      "-//w3c//dtd html 4.01 transitional//"
    ]);
    function enquoteDoctypeId(id2) {
      const quote = id2.indexOf('"') !== -1 ? "'" : '"';
      return quote + id2 + quote;
    }
    function hasPrefix(publicId, prefixes) {
      for (let i = 0; i < prefixes.length; i++) {
        if (publicId.indexOf(prefixes[i]) === 0) {
          return true;
        }
      }
      return false;
    }
    exports.isConforming = function(token) {
      return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
    };
    exports.getDocumentMode = function(token) {
      if (token.name !== VALID_DOCTYPE_NAME) {
        return DOCUMENT_MODE.QUIRKS;
      }
      const systemId = token.systemId;
      if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
        return DOCUMENT_MODE.QUIRKS;
      }
      let publicId = token.publicId;
      if (publicId !== null) {
        publicId = publicId.toLowerCase();
        if (QUIRKS_MODE_PUBLIC_IDS.indexOf(publicId) > -1) {
          return DOCUMENT_MODE.QUIRKS;
        }
        let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
        if (hasPrefix(publicId, prefixes)) {
          return DOCUMENT_MODE.QUIRKS;
        }
        prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
        if (hasPrefix(publicId, prefixes)) {
          return DOCUMENT_MODE.LIMITED_QUIRKS;
        }
      }
      return DOCUMENT_MODE.NO_QUIRKS;
    };
    exports.serializeContent = function(name2, publicId, systemId) {
      let str = "!DOCTYPE ";
      if (name2) {
        str += name2;
      }
      if (publicId) {
        str += " PUBLIC " + enquoteDoctypeId(publicId);
      } else if (systemId) {
        str += " SYSTEM";
      }
      if (systemId !== null) {
        str += " " + enquoteDoctypeId(systemId);
      }
      return str;
    };
  }
});

// node_modules/parse5/lib/common/foreign-content.js
var require_foreign_content = __commonJS({
  "node_modules/parse5/lib/common/foreign-content.js"(exports) {
    "use strict";
    var Tokenizer = require_tokenizer();
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    var ATTRS = HTML.ATTRS;
    var MIME_TYPES = {
      TEXT_HTML: "text/html",
      APPLICATION_XML: "application/xhtml+xml"
    };
    var DEFINITION_URL_ATTR = "definitionurl";
    var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
    var SVG_ATTRS_ADJUSTMENT_MAP = {
      attributename: "attributeName",
      attributetype: "attributeType",
      basefrequency: "baseFrequency",
      baseprofile: "baseProfile",
      calcmode: "calcMode",
      clippathunits: "clipPathUnits",
      diffuseconstant: "diffuseConstant",
      edgemode: "edgeMode",
      filterunits: "filterUnits",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      limitingconeangle: "limitingConeAngle",
      markerheight: "markerHeight",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      numoctaves: "numOctaves",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      refx: "refX",
      refy: "refY",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stitchtiles: "stitchTiles",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textlength: "textLength",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      xchannelselector: "xChannelSelector",
      ychannelselector: "yChannelSelector",
      zoomandpan: "zoomAndPan"
    };
    var XML_ATTRS_ADJUSTMENT_MAP = {
      "xlink:actuate": { prefix: "xlink", name: "actuate", namespace: NS.XLINK },
      "xlink:arcrole": { prefix: "xlink", name: "arcrole", namespace: NS.XLINK },
      "xlink:href": { prefix: "xlink", name: "href", namespace: NS.XLINK },
      "xlink:role": { prefix: "xlink", name: "role", namespace: NS.XLINK },
      "xlink:show": { prefix: "xlink", name: "show", namespace: NS.XLINK },
      "xlink:title": { prefix: "xlink", name: "title", namespace: NS.XLINK },
      "xlink:type": { prefix: "xlink", name: "type", namespace: NS.XLINK },
      "xml:base": { prefix: "xml", name: "base", namespace: NS.XML },
      "xml:lang": { prefix: "xml", name: "lang", namespace: NS.XML },
      "xml:space": { prefix: "xml", name: "space", namespace: NS.XML },
      xmlns: { prefix: "", name: "xmlns", namespace: NS.XMLNS },
      "xmlns:xlink": { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }
    };
    var SVG_TAG_NAMES_ADJUSTMENT_MAP = exports.SVG_TAG_NAMES_ADJUSTMENT_MAP = {
      altglyph: "altGlyph",
      altglyphdef: "altGlyphDef",
      altglyphitem: "altGlyphItem",
      animatecolor: "animateColor",
      animatemotion: "animateMotion",
      animatetransform: "animateTransform",
      clippath: "clipPath",
      feblend: "feBlend",
      fecolormatrix: "feColorMatrix",
      fecomponenttransfer: "feComponentTransfer",
      fecomposite: "feComposite",
      feconvolvematrix: "feConvolveMatrix",
      fediffuselighting: "feDiffuseLighting",
      fedisplacementmap: "feDisplacementMap",
      fedistantlight: "feDistantLight",
      feflood: "feFlood",
      fefunca: "feFuncA",
      fefuncb: "feFuncB",
      fefuncg: "feFuncG",
      fefuncr: "feFuncR",
      fegaussianblur: "feGaussianBlur",
      feimage: "feImage",
      femerge: "feMerge",
      femergenode: "feMergeNode",
      femorphology: "feMorphology",
      feoffset: "feOffset",
      fepointlight: "fePointLight",
      fespecularlighting: "feSpecularLighting",
      fespotlight: "feSpotLight",
      fetile: "feTile",
      feturbulence: "feTurbulence",
      foreignobject: "foreignObject",
      glyphref: "glyphRef",
      lineargradient: "linearGradient",
      radialgradient: "radialGradient",
      textpath: "textPath"
    };
    var EXITS_FOREIGN_CONTENT = {
      [$.B]: true,
      [$.BIG]: true,
      [$.BLOCKQUOTE]: true,
      [$.BODY]: true,
      [$.BR]: true,
      [$.CENTER]: true,
      [$.CODE]: true,
      [$.DD]: true,
      [$.DIV]: true,
      [$.DL]: true,
      [$.DT]: true,
      [$.EM]: true,
      [$.EMBED]: true,
      [$.H1]: true,
      [$.H2]: true,
      [$.H3]: true,
      [$.H4]: true,
      [$.H5]: true,
      [$.H6]: true,
      [$.HEAD]: true,
      [$.HR]: true,
      [$.I]: true,
      [$.IMG]: true,
      [$.LI]: true,
      [$.LISTING]: true,
      [$.MENU]: true,
      [$.META]: true,
      [$.NOBR]: true,
      [$.OL]: true,
      [$.P]: true,
      [$.PRE]: true,
      [$.RUBY]: true,
      [$.S]: true,
      [$.SMALL]: true,
      [$.SPAN]: true,
      [$.STRONG]: true,
      [$.STRIKE]: true,
      [$.SUB]: true,
      [$.SUP]: true,
      [$.TABLE]: true,
      [$.TT]: true,
      [$.U]: true,
      [$.UL]: true,
      [$.VAR]: true
    };
    exports.causesExit = function(startTagToken) {
      const tn = startTagToken.tagName;
      const isFontWithAttrs = tn === $.FONT && (Tokenizer.getTokenAttr(startTagToken, ATTRS.COLOR) !== null || Tokenizer.getTokenAttr(startTagToken, ATTRS.SIZE) !== null || Tokenizer.getTokenAttr(startTagToken, ATTRS.FACE) !== null);
      return isFontWithAttrs ? true : EXITS_FOREIGN_CONTENT[tn];
    };
    exports.adjustTokenMathMLAttrs = function(token) {
      for (let i = 0; i < token.attrs.length; i++) {
        if (token.attrs[i].name === DEFINITION_URL_ATTR) {
          token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
          break;
        }
      }
    };
    exports.adjustTokenSVGAttrs = function(token) {
      for (let i = 0; i < token.attrs.length; i++) {
        const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP[token.attrs[i].name];
        if (adjustedAttrName) {
          token.attrs[i].name = adjustedAttrName;
        }
      }
    };
    exports.adjustTokenXMLAttrs = function(token) {
      for (let i = 0; i < token.attrs.length; i++) {
        const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP[token.attrs[i].name];
        if (adjustedAttrEntry) {
          token.attrs[i].prefix = adjustedAttrEntry.prefix;
          token.attrs[i].name = adjustedAttrEntry.name;
          token.attrs[i].namespace = adjustedAttrEntry.namespace;
        }
      }
    };
    exports.adjustTokenSVGTagName = function(token) {
      const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP[token.tagName];
      if (adjustedTagName) {
        token.tagName = adjustedTagName;
      }
    };
    function isMathMLTextIntegrationPoint(tn, ns) {
      return ns === NS.MATHML && (tn === $.MI || tn === $.MO || tn === $.MN || tn === $.MS || tn === $.MTEXT);
    }
    function isHtmlIntegrationPoint(tn, ns, attrs) {
      if (ns === NS.MATHML && tn === $.ANNOTATION_XML) {
        for (let i = 0; i < attrs.length; i++) {
          if (attrs[i].name === ATTRS.ENCODING) {
            const value = attrs[i].value.toLowerCase();
            return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
          }
        }
      }
      return ns === NS.SVG && (tn === $.FOREIGN_OBJECT || tn === $.DESC || tn === $.TITLE);
    }
    exports.isIntegrationPoint = function(tn, ns, attrs, foreignNS) {
      if ((!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs)) {
        return true;
      }
      if ((!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns)) {
        return true;
      }
      return false;
    };
  }
});

// node_modules/parse5/lib/parser/index.js
var require_parser = __commonJS({
  "node_modules/parse5/lib/parser/index.js"(exports, module) {
    "use strict";
    var Tokenizer = require_tokenizer();
    var OpenElementStack = require_open_element_stack();
    var FormattingElementList = require_formatting_element_list();
    var LocationInfoParserMixin = require_parser_mixin();
    var ErrorReportingParserMixin = require_parser_mixin2();
    var Mixin = require_mixin();
    var defaultTreeAdapter = require_default();
    var mergeOptions = require_merge_options();
    var doctype2 = require_doctype();
    var foreignContent = require_foreign_content();
    var ERR = require_error_codes();
    var unicode = require_unicode();
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    var ATTRS = HTML.ATTRS;
    var DEFAULT_OPTIONS = {
      scriptingEnabled: true,
      sourceCodeLocationInfo: false,
      onParseError: null,
      treeAdapter: defaultTreeAdapter
    };
    var HIDDEN_INPUT_TYPE = "hidden";
    var AA_OUTER_LOOP_ITER = 8;
    var AA_INNER_LOOP_ITER = 3;
    var INITIAL_MODE = "INITIAL_MODE";
    var BEFORE_HTML_MODE = "BEFORE_HTML_MODE";
    var BEFORE_HEAD_MODE = "BEFORE_HEAD_MODE";
    var IN_HEAD_MODE = "IN_HEAD_MODE";
    var IN_HEAD_NO_SCRIPT_MODE = "IN_HEAD_NO_SCRIPT_MODE";
    var AFTER_HEAD_MODE = "AFTER_HEAD_MODE";
    var IN_BODY_MODE = "IN_BODY_MODE";
    var TEXT_MODE = "TEXT_MODE";
    var IN_TABLE_MODE = "IN_TABLE_MODE";
    var IN_TABLE_TEXT_MODE = "IN_TABLE_TEXT_MODE";
    var IN_CAPTION_MODE = "IN_CAPTION_MODE";
    var IN_COLUMN_GROUP_MODE = "IN_COLUMN_GROUP_MODE";
    var IN_TABLE_BODY_MODE = "IN_TABLE_BODY_MODE";
    var IN_ROW_MODE = "IN_ROW_MODE";
    var IN_CELL_MODE = "IN_CELL_MODE";
    var IN_SELECT_MODE = "IN_SELECT_MODE";
    var IN_SELECT_IN_TABLE_MODE = "IN_SELECT_IN_TABLE_MODE";
    var IN_TEMPLATE_MODE = "IN_TEMPLATE_MODE";
    var AFTER_BODY_MODE = "AFTER_BODY_MODE";
    var IN_FRAMESET_MODE = "IN_FRAMESET_MODE";
    var AFTER_FRAMESET_MODE = "AFTER_FRAMESET_MODE";
    var AFTER_AFTER_BODY_MODE = "AFTER_AFTER_BODY_MODE";
    var AFTER_AFTER_FRAMESET_MODE = "AFTER_AFTER_FRAMESET_MODE";
    var INSERTION_MODE_RESET_MAP = {
      [$.TR]: IN_ROW_MODE,
      [$.TBODY]: IN_TABLE_BODY_MODE,
      [$.THEAD]: IN_TABLE_BODY_MODE,
      [$.TFOOT]: IN_TABLE_BODY_MODE,
      [$.CAPTION]: IN_CAPTION_MODE,
      [$.COLGROUP]: IN_COLUMN_GROUP_MODE,
      [$.TABLE]: IN_TABLE_MODE,
      [$.BODY]: IN_BODY_MODE,
      [$.FRAMESET]: IN_FRAMESET_MODE
    };
    var TEMPLATE_INSERTION_MODE_SWITCH_MAP = {
      [$.CAPTION]: IN_TABLE_MODE,
      [$.COLGROUP]: IN_TABLE_MODE,
      [$.TBODY]: IN_TABLE_MODE,
      [$.TFOOT]: IN_TABLE_MODE,
      [$.THEAD]: IN_TABLE_MODE,
      [$.COL]: IN_COLUMN_GROUP_MODE,
      [$.TR]: IN_TABLE_BODY_MODE,
      [$.TD]: IN_ROW_MODE,
      [$.TH]: IN_ROW_MODE
    };
    var TOKEN_HANDLERS = {
      [INITIAL_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenInInitialMode,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenInInitialMode,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: doctypeInInitialMode,
        [Tokenizer.START_TAG_TOKEN]: tokenInInitialMode,
        [Tokenizer.END_TAG_TOKEN]: tokenInInitialMode,
        [Tokenizer.EOF_TOKEN]: tokenInInitialMode
      },
      [BEFORE_HTML_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenBeforeHtml,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenBeforeHtml,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagBeforeHtml,
        [Tokenizer.END_TAG_TOKEN]: endTagBeforeHtml,
        [Tokenizer.EOF_TOKEN]: tokenBeforeHtml
      },
      [BEFORE_HEAD_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenBeforeHead,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenBeforeHead,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
        [Tokenizer.START_TAG_TOKEN]: startTagBeforeHead,
        [Tokenizer.END_TAG_TOKEN]: endTagBeforeHead,
        [Tokenizer.EOF_TOKEN]: tokenBeforeHead
      },
      [IN_HEAD_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenInHead,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenInHead,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
        [Tokenizer.START_TAG_TOKEN]: startTagInHead,
        [Tokenizer.END_TAG_TOKEN]: endTagInHead,
        [Tokenizer.EOF_TOKEN]: tokenInHead
      },
      [IN_HEAD_NO_SCRIPT_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenInHeadNoScript,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenInHeadNoScript,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
        [Tokenizer.START_TAG_TOKEN]: startTagInHeadNoScript,
        [Tokenizer.END_TAG_TOKEN]: endTagInHeadNoScript,
        [Tokenizer.EOF_TOKEN]: tokenInHeadNoScript
      },
      [AFTER_HEAD_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenAfterHead,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenAfterHead,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: misplacedDoctype,
        [Tokenizer.START_TAG_TOKEN]: startTagAfterHead,
        [Tokenizer.END_TAG_TOKEN]: endTagAfterHead,
        [Tokenizer.EOF_TOKEN]: tokenAfterHead
      },
      [IN_BODY_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInBody,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInBody,
        [Tokenizer.END_TAG_TOKEN]: endTagInBody,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [TEXT_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.NULL_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: ignoreToken,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: ignoreToken,
        [Tokenizer.END_TAG_TOKEN]: endTagInText,
        [Tokenizer.EOF_TOKEN]: eofInText
      },
      [IN_TABLE_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.NULL_CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInTable,
        [Tokenizer.END_TAG_TOKEN]: endTagInTable,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_TABLE_TEXT_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInTableText,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInTableText,
        [Tokenizer.COMMENT_TOKEN]: tokenInTableText,
        [Tokenizer.DOCTYPE_TOKEN]: tokenInTableText,
        [Tokenizer.START_TAG_TOKEN]: tokenInTableText,
        [Tokenizer.END_TAG_TOKEN]: tokenInTableText,
        [Tokenizer.EOF_TOKEN]: tokenInTableText
      },
      [IN_CAPTION_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInBody,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInCaption,
        [Tokenizer.END_TAG_TOKEN]: endTagInCaption,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_COLUMN_GROUP_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenInColumnGroup,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenInColumnGroup,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInColumnGroup,
        [Tokenizer.END_TAG_TOKEN]: endTagInColumnGroup,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_TABLE_BODY_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.NULL_CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInTableBody,
        [Tokenizer.END_TAG_TOKEN]: endTagInTableBody,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_ROW_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.NULL_CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: characterInTable,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInRow,
        [Tokenizer.END_TAG_TOKEN]: endTagInRow,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_CELL_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInBody,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInCell,
        [Tokenizer.END_TAG_TOKEN]: endTagInCell,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_SELECT_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInSelect,
        [Tokenizer.END_TAG_TOKEN]: endTagInSelect,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_SELECT_IN_TABLE_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInSelectInTable,
        [Tokenizer.END_TAG_TOKEN]: endTagInSelectInTable,
        [Tokenizer.EOF_TOKEN]: eofInBody
      },
      [IN_TEMPLATE_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: characterInBody,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInTemplate,
        [Tokenizer.END_TAG_TOKEN]: endTagInTemplate,
        [Tokenizer.EOF_TOKEN]: eofInTemplate
      },
      [AFTER_BODY_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenAfterBody,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenAfterBody,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
        [Tokenizer.COMMENT_TOKEN]: appendCommentToRootHtmlElement,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagAfterBody,
        [Tokenizer.END_TAG_TOKEN]: endTagAfterBody,
        [Tokenizer.EOF_TOKEN]: stopParsing
      },
      [IN_FRAMESET_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagInFrameset,
        [Tokenizer.END_TAG_TOKEN]: endTagInFrameset,
        [Tokenizer.EOF_TOKEN]: stopParsing
      },
      [AFTER_FRAMESET_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: insertCharacters,
        [Tokenizer.COMMENT_TOKEN]: appendComment,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagAfterFrameset,
        [Tokenizer.END_TAG_TOKEN]: endTagAfterFrameset,
        [Tokenizer.EOF_TOKEN]: stopParsing
      },
      [AFTER_AFTER_BODY_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: tokenAfterAfterBody,
        [Tokenizer.NULL_CHARACTER_TOKEN]: tokenAfterAfterBody,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
        [Tokenizer.COMMENT_TOKEN]: appendCommentToDocument,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagAfterAfterBody,
        [Tokenizer.END_TAG_TOKEN]: tokenAfterAfterBody,
        [Tokenizer.EOF_TOKEN]: stopParsing
      },
      [AFTER_AFTER_FRAMESET_MODE]: {
        [Tokenizer.CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.NULL_CHARACTER_TOKEN]: ignoreToken,
        [Tokenizer.WHITESPACE_CHARACTER_TOKEN]: whitespaceCharacterInBody,
        [Tokenizer.COMMENT_TOKEN]: appendCommentToDocument,
        [Tokenizer.DOCTYPE_TOKEN]: ignoreToken,
        [Tokenizer.START_TAG_TOKEN]: startTagAfterAfterFrameset,
        [Tokenizer.END_TAG_TOKEN]: ignoreToken,
        [Tokenizer.EOF_TOKEN]: stopParsing
      }
    };
    var Parser = class {
      constructor(options) {
        this.options = mergeOptions(DEFAULT_OPTIONS, options);
        this.treeAdapter = this.options.treeAdapter;
        this.pendingScript = null;
        if (this.options.sourceCodeLocationInfo) {
          Mixin.install(this, LocationInfoParserMixin);
        }
        if (this.options.onParseError) {
          Mixin.install(this, ErrorReportingParserMixin, { onParseError: this.options.onParseError });
        }
      }
      // API
      parse(html6) {
        const document4 = this.treeAdapter.createDocument();
        this._bootstrap(document4, null);
        this.tokenizer.write(html6, true);
        this._runParsingLoop(null);
        return document4;
      }
      parseFragment(html6, fragmentContext) {
        if (!fragmentContext) {
          fragmentContext = this.treeAdapter.createElement($.TEMPLATE, NS.HTML, []);
        }
        const documentMock = this.treeAdapter.createElement("documentmock", NS.HTML, []);
        this._bootstrap(documentMock, fragmentContext);
        if (this.treeAdapter.getTagName(fragmentContext) === $.TEMPLATE) {
          this._pushTmplInsertionMode(IN_TEMPLATE_MODE);
        }
        this._initTokenizerForFragmentParsing();
        this._insertFakeRootElement();
        this._resetInsertionMode();
        this._findFormInFragmentContext();
        this.tokenizer.write(html6, true);
        this._runParsingLoop(null);
        const rootElement = this.treeAdapter.getFirstChild(documentMock);
        const fragment = this.treeAdapter.createDocumentFragment();
        this._adoptNodes(rootElement, fragment);
        return fragment;
      }
      //Bootstrap parser
      _bootstrap(document4, fragmentContext) {
        this.tokenizer = new Tokenizer(this.options);
        this.stopped = false;
        this.insertionMode = INITIAL_MODE;
        this.originalInsertionMode = "";
        this.document = document4;
        this.fragmentContext = fragmentContext;
        this.headElement = null;
        this.formElement = null;
        this.openElements = new OpenElementStack(this.document, this.treeAdapter);
        this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
        this.tmplInsertionModeStack = [];
        this.tmplInsertionModeStackTop = -1;
        this.currentTmplInsertionMode = null;
        this.pendingCharacterTokens = [];
        this.hasNonWhitespacePendingCharacterToken = false;
        this.framesetOk = true;
        this.skipNextNewLine = false;
        this.fosterParentingEnabled = false;
      }
      //Errors
      _err() {
      }
      //Parsing loop
      _runParsingLoop(scriptHandler) {
        while (!this.stopped) {
          this._setupTokenizerCDATAMode();
          const token = this.tokenizer.getNextToken();
          if (token.type === Tokenizer.HIBERNATION_TOKEN) {
            break;
          }
          if (this.skipNextNewLine) {
            this.skipNextNewLine = false;
            if (token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN && token.chars[0] === "\n") {
              if (token.chars.length === 1) {
                continue;
              }
              token.chars = token.chars.substr(1);
            }
          }
          this._processInputToken(token);
          if (scriptHandler && this.pendingScript) {
            break;
          }
        }
      }
      runParsingLoopForCurrentChunk(writeCallback, scriptHandler) {
        this._runParsingLoop(scriptHandler);
        if (scriptHandler && this.pendingScript) {
          const script = this.pendingScript;
          this.pendingScript = null;
          scriptHandler(script);
          return;
        }
        if (writeCallback) {
          writeCallback();
        }
      }
      //Text parsing
      _setupTokenizerCDATAMode() {
        const current = this._getAdjustedCurrentElement();
        this.tokenizer.allowCDATA = current && current !== this.document && this.treeAdapter.getNamespaceURI(current) !== NS.HTML && !this._isIntegrationPoint(current);
      }
      _switchToTextParsing(currentToken, nextTokenizerState) {
        this._insertElement(currentToken, NS.HTML);
        this.tokenizer.state = nextTokenizerState;
        this.originalInsertionMode = this.insertionMode;
        this.insertionMode = TEXT_MODE;
      }
      switchToPlaintextParsing() {
        this.insertionMode = TEXT_MODE;
        this.originalInsertionMode = IN_BODY_MODE;
        this.tokenizer.state = Tokenizer.MODE.PLAINTEXT;
      }
      //Fragment parsing
      _getAdjustedCurrentElement() {
        return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
      }
      _findFormInFragmentContext() {
        let node2 = this.fragmentContext;
        do {
          if (this.treeAdapter.getTagName(node2) === $.FORM) {
            this.formElement = node2;
            break;
          }
          node2 = this.treeAdapter.getParentNode(node2);
        } while (node2);
      }
      _initTokenizerForFragmentParsing() {
        if (this.treeAdapter.getNamespaceURI(this.fragmentContext) === NS.HTML) {
          const tn = this.treeAdapter.getTagName(this.fragmentContext);
          if (tn === $.TITLE || tn === $.TEXTAREA) {
            this.tokenizer.state = Tokenizer.MODE.RCDATA;
          } else if (tn === $.STYLE || tn === $.XMP || tn === $.IFRAME || tn === $.NOEMBED || tn === $.NOFRAMES || tn === $.NOSCRIPT) {
            this.tokenizer.state = Tokenizer.MODE.RAWTEXT;
          } else if (tn === $.SCRIPT) {
            this.tokenizer.state = Tokenizer.MODE.SCRIPT_DATA;
          } else if (tn === $.PLAINTEXT) {
            this.tokenizer.state = Tokenizer.MODE.PLAINTEXT;
          }
        }
      }
      //Tree mutation
      _setDocumentType(token) {
        const name2 = token.name || "";
        const publicId = token.publicId || "";
        const systemId = token.systemId || "";
        this.treeAdapter.setDocumentType(this.document, name2, publicId, systemId);
      }
      _attachElementToTree(element4) {
        if (this._shouldFosterParentOnInsertion()) {
          this._fosterParentElement(element4);
        } else {
          const parent = this.openElements.currentTmplContent || this.openElements.current;
          this.treeAdapter.appendChild(parent, element4);
        }
      }
      _appendElement(token, namespaceURI) {
        const element4 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
        this._attachElementToTree(element4);
      }
      _insertElement(token, namespaceURI) {
        const element4 = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
        this._attachElementToTree(element4);
        this.openElements.push(element4);
      }
      _insertFakeElement(tagName) {
        const element4 = this.treeAdapter.createElement(tagName, NS.HTML, []);
        this._attachElementToTree(element4);
        this.openElements.push(element4);
      }
      _insertTemplate(token) {
        const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
        const content3 = this.treeAdapter.createDocumentFragment();
        this.treeAdapter.setTemplateContent(tmpl, content3);
        this._attachElementToTree(tmpl);
        this.openElements.push(tmpl);
      }
      _insertFakeRootElement() {
        const element4 = this.treeAdapter.createElement($.HTML, NS.HTML, []);
        this.treeAdapter.appendChild(this.openElements.current, element4);
        this.openElements.push(element4);
      }
      _appendCommentNode(token, parent) {
        const commentNode = this.treeAdapter.createCommentNode(token.data);
        this.treeAdapter.appendChild(parent, commentNode);
      }
      _insertCharacters(token) {
        if (this._shouldFosterParentOnInsertion()) {
          this._fosterParentText(token.chars);
        } else {
          const parent = this.openElements.currentTmplContent || this.openElements.current;
          this.treeAdapter.insertText(parent, token.chars);
        }
      }
      _adoptNodes(donor, recipient) {
        for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
          this.treeAdapter.detachNode(child);
          this.treeAdapter.appendChild(recipient, child);
        }
      }
      //Token processing
      _shouldProcessTokenInForeignContent(token) {
        const current = this._getAdjustedCurrentElement();
        if (!current || current === this.document) {
          return false;
        }
        const ns = this.treeAdapter.getNamespaceURI(current);
        if (ns === NS.HTML) {
          return false;
        }
        if (this.treeAdapter.getTagName(current) === $.ANNOTATION_XML && ns === NS.MATHML && token.type === Tokenizer.START_TAG_TOKEN && token.tagName === $.SVG) {
          return false;
        }
        const isCharacterToken = token.type === Tokenizer.CHARACTER_TOKEN || token.type === Tokenizer.NULL_CHARACTER_TOKEN || token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN;
        const isMathMLTextStartTag = token.type === Tokenizer.START_TAG_TOKEN && token.tagName !== $.MGLYPH && token.tagName !== $.MALIGNMARK;
        if ((isMathMLTextStartTag || isCharacterToken) && this._isIntegrationPoint(current, NS.MATHML)) {
          return false;
        }
        if ((token.type === Tokenizer.START_TAG_TOKEN || isCharacterToken) && this._isIntegrationPoint(current, NS.HTML)) {
          return false;
        }
        return token.type !== Tokenizer.EOF_TOKEN;
      }
      _processToken(token) {
        TOKEN_HANDLERS[this.insertionMode][token.type](this, token);
      }
      _processTokenInBodyMode(token) {
        TOKEN_HANDLERS[IN_BODY_MODE][token.type](this, token);
      }
      _processTokenInForeignContent(token) {
        if (token.type === Tokenizer.CHARACTER_TOKEN) {
          characterInForeignContent(this, token);
        } else if (token.type === Tokenizer.NULL_CHARACTER_TOKEN) {
          nullCharacterInForeignContent(this, token);
        } else if (token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN) {
          insertCharacters(this, token);
        } else if (token.type === Tokenizer.COMMENT_TOKEN) {
          appendComment(this, token);
        } else if (token.type === Tokenizer.START_TAG_TOKEN) {
          startTagInForeignContent(this, token);
        } else if (token.type === Tokenizer.END_TAG_TOKEN) {
          endTagInForeignContent(this, token);
        }
      }
      _processInputToken(token) {
        if (this._shouldProcessTokenInForeignContent(token)) {
          this._processTokenInForeignContent(token);
        } else {
          this._processToken(token);
        }
        if (token.type === Tokenizer.START_TAG_TOKEN && token.selfClosing && !token.ackSelfClosing) {
          this._err(ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
        }
      }
      //Integration points
      _isIntegrationPoint(element4, foreignNS) {
        const tn = this.treeAdapter.getTagName(element4);
        const ns = this.treeAdapter.getNamespaceURI(element4);
        const attrs = this.treeAdapter.getAttrList(element4);
        return foreignContent.isIntegrationPoint(tn, ns, attrs, foreignNS);
      }
      //Active formatting elements reconstruction
      _reconstructActiveFormattingElements() {
        const listLength = this.activeFormattingElements.length;
        if (listLength) {
          let unopenIdx = listLength;
          let entry = null;
          do {
            unopenIdx--;
            entry = this.activeFormattingElements.entries[unopenIdx];
            if (entry.type === FormattingElementList.MARKER_ENTRY || this.openElements.contains(entry.element)) {
              unopenIdx++;
              break;
            }
          } while (unopenIdx > 0);
          for (let i = unopenIdx; i < listLength; i++) {
            entry = this.activeFormattingElements.entries[i];
            this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
            entry.element = this.openElements.current;
          }
        }
      }
      //Close elements
      _closeTableCell() {
        this.openElements.generateImpliedEndTags();
        this.openElements.popUntilTableCellPopped();
        this.activeFormattingElements.clearToLastMarker();
        this.insertionMode = IN_ROW_MODE;
      }
      _closePElement() {
        this.openElements.generateImpliedEndTagsWithExclusion($.P);
        this.openElements.popUntilTagNamePopped($.P);
      }
      //Insertion modes
      _resetInsertionMode() {
        for (let i = this.openElements.stackTop, last = false; i >= 0; i--) {
          let element4 = this.openElements.items[i];
          if (i === 0) {
            last = true;
            if (this.fragmentContext) {
              element4 = this.fragmentContext;
            }
          }
          const tn = this.treeAdapter.getTagName(element4);
          const newInsertionMode = INSERTION_MODE_RESET_MAP[tn];
          if (newInsertionMode) {
            this.insertionMode = newInsertionMode;
            break;
          } else if (!last && (tn === $.TD || tn === $.TH)) {
            this.insertionMode = IN_CELL_MODE;
            break;
          } else if (!last && tn === $.HEAD) {
            this.insertionMode = IN_HEAD_MODE;
            break;
          } else if (tn === $.SELECT) {
            this._resetInsertionModeForSelect(i);
            break;
          } else if (tn === $.TEMPLATE) {
            this.insertionMode = this.currentTmplInsertionMode;
            break;
          } else if (tn === $.HTML) {
            this.insertionMode = this.headElement ? AFTER_HEAD_MODE : BEFORE_HEAD_MODE;
            break;
          } else if (last) {
            this.insertionMode = IN_BODY_MODE;
            break;
          }
        }
      }
      _resetInsertionModeForSelect(selectIdx) {
        if (selectIdx > 0) {
          for (let i = selectIdx - 1; i > 0; i--) {
            const ancestor = this.openElements.items[i];
            const tn = this.treeAdapter.getTagName(ancestor);
            if (tn === $.TEMPLATE) {
              break;
            } else if (tn === $.TABLE) {
              this.insertionMode = IN_SELECT_IN_TABLE_MODE;
              return;
            }
          }
        }
        this.insertionMode = IN_SELECT_MODE;
      }
      _pushTmplInsertionMode(mode) {
        this.tmplInsertionModeStack.push(mode);
        this.tmplInsertionModeStackTop++;
        this.currentTmplInsertionMode = mode;
      }
      _popTmplInsertionMode() {
        this.tmplInsertionModeStack.pop();
        this.tmplInsertionModeStackTop--;
        this.currentTmplInsertionMode = this.tmplInsertionModeStack[this.tmplInsertionModeStackTop];
      }
      //Foster parenting
      _isElementCausesFosterParenting(element4) {
        const tn = this.treeAdapter.getTagName(element4);
        return tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR;
      }
      _shouldFosterParentOnInsertion() {
        return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.current);
      }
      _findFosterParentingLocation() {
        const location2 = {
          parent: null,
          beforeElement: null
        };
        for (let i = this.openElements.stackTop; i >= 0; i--) {
          const openElement = this.openElements.items[i];
          const tn = this.treeAdapter.getTagName(openElement);
          const ns = this.treeAdapter.getNamespaceURI(openElement);
          if (tn === $.TEMPLATE && ns === NS.HTML) {
            location2.parent = this.treeAdapter.getTemplateContent(openElement);
            break;
          } else if (tn === $.TABLE) {
            location2.parent = this.treeAdapter.getParentNode(openElement);
            if (location2.parent) {
              location2.beforeElement = openElement;
            } else {
              location2.parent = this.openElements.items[i - 1];
            }
            break;
          }
        }
        if (!location2.parent) {
          location2.parent = this.openElements.items[0];
        }
        return location2;
      }
      _fosterParentElement(element4) {
        const location2 = this._findFosterParentingLocation();
        if (location2.beforeElement) {
          this.treeAdapter.insertBefore(location2.parent, element4, location2.beforeElement);
        } else {
          this.treeAdapter.appendChild(location2.parent, element4);
        }
      }
      _fosterParentText(chars) {
        const location2 = this._findFosterParentingLocation();
        if (location2.beforeElement) {
          this.treeAdapter.insertTextBefore(location2.parent, chars, location2.beforeElement);
        } else {
          this.treeAdapter.insertText(location2.parent, chars);
        }
      }
      //Special elements
      _isSpecialElement(element4) {
        const tn = this.treeAdapter.getTagName(element4);
        const ns = this.treeAdapter.getNamespaceURI(element4);
        return HTML.SPECIAL_ELEMENTS[ns][tn];
      }
    };
    module.exports = Parser;
    function aaObtainFormattingElementEntry(p2, token) {
      let formattingElementEntry = p2.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
      if (formattingElementEntry) {
        if (!p2.openElements.contains(formattingElementEntry.element)) {
          p2.activeFormattingElements.removeEntry(formattingElementEntry);
          formattingElementEntry = null;
        } else if (!p2.openElements.hasInScope(token.tagName)) {
          formattingElementEntry = null;
        }
      } else {
        genericEndTagInBody(p2, token);
      }
      return formattingElementEntry;
    }
    function aaObtainFurthestBlock(p2, formattingElementEntry) {
      let furthestBlock = null;
      for (let i = p2.openElements.stackTop; i >= 0; i--) {
        const element4 = p2.openElements.items[i];
        if (element4 === formattingElementEntry.element) {
          break;
        }
        if (p2._isSpecialElement(element4)) {
          furthestBlock = element4;
        }
      }
      if (!furthestBlock) {
        p2.openElements.popUntilElementPopped(formattingElementEntry.element);
        p2.activeFormattingElements.removeEntry(formattingElementEntry);
      }
      return furthestBlock;
    }
    function aaInnerLoop(p2, furthestBlock, formattingElement) {
      let lastElement = furthestBlock;
      let nextElement = p2.openElements.getCommonAncestor(furthestBlock);
      for (let i = 0, element4 = nextElement; element4 !== formattingElement; i++, element4 = nextElement) {
        nextElement = p2.openElements.getCommonAncestor(element4);
        const elementEntry = p2.activeFormattingElements.getElementEntry(element4);
        const counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER;
        const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
        if (shouldRemoveFromOpenElements) {
          if (counterOverflow) {
            p2.activeFormattingElements.removeEntry(elementEntry);
          }
          p2.openElements.remove(element4);
        } else {
          element4 = aaRecreateElementFromEntry(p2, elementEntry);
          if (lastElement === furthestBlock) {
            p2.activeFormattingElements.bookmark = elementEntry;
          }
          p2.treeAdapter.detachNode(lastElement);
          p2.treeAdapter.appendChild(element4, lastElement);
          lastElement = element4;
        }
      }
      return lastElement;
    }
    function aaRecreateElementFromEntry(p2, elementEntry) {
      const ns = p2.treeAdapter.getNamespaceURI(elementEntry.element);
      const newElement = p2.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
      p2.openElements.replace(elementEntry.element, newElement);
      elementEntry.element = newElement;
      return newElement;
    }
    function aaInsertLastNodeInCommonAncestor(p2, commonAncestor, lastElement) {
      if (p2._isElementCausesFosterParenting(commonAncestor)) {
        p2._fosterParentElement(lastElement);
      } else {
        const tn = p2.treeAdapter.getTagName(commonAncestor);
        const ns = p2.treeAdapter.getNamespaceURI(commonAncestor);
        if (tn === $.TEMPLATE && ns === NS.HTML) {
          commonAncestor = p2.treeAdapter.getTemplateContent(commonAncestor);
        }
        p2.treeAdapter.appendChild(commonAncestor, lastElement);
      }
    }
    function aaReplaceFormattingElement(p2, furthestBlock, formattingElementEntry) {
      const ns = p2.treeAdapter.getNamespaceURI(formattingElementEntry.element);
      const token = formattingElementEntry.token;
      const newElement = p2.treeAdapter.createElement(token.tagName, ns, token.attrs);
      p2._adoptNodes(furthestBlock, newElement);
      p2.treeAdapter.appendChild(furthestBlock, newElement);
      p2.activeFormattingElements.insertElementAfterBookmark(newElement, formattingElementEntry.token);
      p2.activeFormattingElements.removeEntry(formattingElementEntry);
      p2.openElements.remove(formattingElementEntry.element);
      p2.openElements.insertAfter(furthestBlock, newElement);
    }
    function callAdoptionAgency(p2, token) {
      let formattingElementEntry;
      for (let i = 0; i < AA_OUTER_LOOP_ITER; i++) {
        formattingElementEntry = aaObtainFormattingElementEntry(p2, token, formattingElementEntry);
        if (!formattingElementEntry) {
          break;
        }
        const furthestBlock = aaObtainFurthestBlock(p2, formattingElementEntry);
        if (!furthestBlock) {
          break;
        }
        p2.activeFormattingElements.bookmark = formattingElementEntry;
        const lastElement = aaInnerLoop(p2, furthestBlock, formattingElementEntry.element);
        const commonAncestor = p2.openElements.getCommonAncestor(formattingElementEntry.element);
        p2.treeAdapter.detachNode(lastElement);
        aaInsertLastNodeInCommonAncestor(p2, commonAncestor, lastElement);
        aaReplaceFormattingElement(p2, furthestBlock, formattingElementEntry);
      }
    }
    function ignoreToken() {
    }
    function misplacedDoctype(p2) {
      p2._err(ERR.misplacedDoctype);
    }
    function appendComment(p2, token) {
      p2._appendCommentNode(token, p2.openElements.currentTmplContent || p2.openElements.current);
    }
    function appendCommentToRootHtmlElement(p2, token) {
      p2._appendCommentNode(token, p2.openElements.items[0]);
    }
    function appendCommentToDocument(p2, token) {
      p2._appendCommentNode(token, p2.document);
    }
    function insertCharacters(p2, token) {
      p2._insertCharacters(token);
    }
    function stopParsing(p2) {
      p2.stopped = true;
    }
    function doctypeInInitialMode(p2, token) {
      p2._setDocumentType(token);
      const mode = token.forceQuirks ? HTML.DOCUMENT_MODE.QUIRKS : doctype2.getDocumentMode(token);
      if (!doctype2.isConforming(token)) {
        p2._err(ERR.nonConformingDoctype);
      }
      p2.treeAdapter.setDocumentMode(p2.document, mode);
      p2.insertionMode = BEFORE_HTML_MODE;
    }
    function tokenInInitialMode(p2, token) {
      p2._err(ERR.missingDoctype, { beforeToken: true });
      p2.treeAdapter.setDocumentMode(p2.document, HTML.DOCUMENT_MODE.QUIRKS);
      p2.insertionMode = BEFORE_HTML_MODE;
      p2._processToken(token);
    }
    function startTagBeforeHtml(p2, token) {
      if (token.tagName === $.HTML) {
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = BEFORE_HEAD_MODE;
      } else {
        tokenBeforeHtml(p2, token);
      }
    }
    function endTagBeforeHtml(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML || tn === $.HEAD || tn === $.BODY || tn === $.BR) {
        tokenBeforeHtml(p2, token);
      }
    }
    function tokenBeforeHtml(p2, token) {
      p2._insertFakeRootElement();
      p2.insertionMode = BEFORE_HEAD_MODE;
      p2._processToken(token);
    }
    function startTagBeforeHead(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.HEAD) {
        p2._insertElement(token, NS.HTML);
        p2.headElement = p2.openElements.current;
        p2.insertionMode = IN_HEAD_MODE;
      } else {
        tokenBeforeHead(p2, token);
      }
    }
    function endTagBeforeHead(p2, token) {
      const tn = token.tagName;
      if (tn === $.HEAD || tn === $.BODY || tn === $.HTML || tn === $.BR) {
        tokenBeforeHead(p2, token);
      } else {
        p2._err(ERR.endTagWithoutMatchingOpenElement);
      }
    }
    function tokenBeforeHead(p2, token) {
      p2._insertFakeElement($.HEAD);
      p2.headElement = p2.openElements.current;
      p2.insertionMode = IN_HEAD_MODE;
      p2._processToken(token);
    }
    function startTagInHead(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META) {
        p2._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
      } else if (tn === $.TITLE) {
        p2._switchToTextParsing(token, Tokenizer.MODE.RCDATA);
      } else if (tn === $.NOSCRIPT) {
        if (p2.options.scriptingEnabled) {
          p2._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
        } else {
          p2._insertElement(token, NS.HTML);
          p2.insertionMode = IN_HEAD_NO_SCRIPT_MODE;
        }
      } else if (tn === $.NOFRAMES || tn === $.STYLE) {
        p2._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
      } else if (tn === $.SCRIPT) {
        p2._switchToTextParsing(token, Tokenizer.MODE.SCRIPT_DATA);
      } else if (tn === $.TEMPLATE) {
        p2._insertTemplate(token, NS.HTML);
        p2.activeFormattingElements.insertMarker();
        p2.framesetOk = false;
        p2.insertionMode = IN_TEMPLATE_MODE;
        p2._pushTmplInsertionMode(IN_TEMPLATE_MODE);
      } else if (tn === $.HEAD) {
        p2._err(ERR.misplacedStartTagForHeadElement);
      } else {
        tokenInHead(p2, token);
      }
    }
    function endTagInHead(p2, token) {
      const tn = token.tagName;
      if (tn === $.HEAD) {
        p2.openElements.pop();
        p2.insertionMode = AFTER_HEAD_MODE;
      } else if (tn === $.BODY || tn === $.BR || tn === $.HTML) {
        tokenInHead(p2, token);
      } else if (tn === $.TEMPLATE) {
        if (p2.openElements.tmplCount > 0) {
          p2.openElements.generateImpliedEndTagsThoroughly();
          if (p2.openElements.currentTagName !== $.TEMPLATE) {
            p2._err(ERR.closingOfElementWithOpenChildElements);
          }
          p2.openElements.popUntilTagNamePopped($.TEMPLATE);
          p2.activeFormattingElements.clearToLastMarker();
          p2._popTmplInsertionMode();
          p2._resetInsertionMode();
        } else {
          p2._err(ERR.endTagWithoutMatchingOpenElement);
        }
      } else {
        p2._err(ERR.endTagWithoutMatchingOpenElement);
      }
    }
    function tokenInHead(p2, token) {
      p2.openElements.pop();
      p2.insertionMode = AFTER_HEAD_MODE;
      p2._processToken(token);
    }
    function startTagInHeadNoScript(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.BASEFONT || tn === $.BGSOUND || tn === $.HEAD || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.STYLE) {
        startTagInHead(p2, token);
      } else if (tn === $.NOSCRIPT) {
        p2._err(ERR.nestedNoscriptInHead);
      } else {
        tokenInHeadNoScript(p2, token);
      }
    }
    function endTagInHeadNoScript(p2, token) {
      const tn = token.tagName;
      if (tn === $.NOSCRIPT) {
        p2.openElements.pop();
        p2.insertionMode = IN_HEAD_MODE;
      } else if (tn === $.BR) {
        tokenInHeadNoScript(p2, token);
      } else {
        p2._err(ERR.endTagWithoutMatchingOpenElement);
      }
    }
    function tokenInHeadNoScript(p2, token) {
      const errCode = token.type === Tokenizer.EOF_TOKEN ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
      p2._err(errCode);
      p2.openElements.pop();
      p2.insertionMode = IN_HEAD_MODE;
      p2._processToken(token);
    }
    function startTagAfterHead(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.BODY) {
        p2._insertElement(token, NS.HTML);
        p2.framesetOk = false;
        p2.insertionMode = IN_BODY_MODE;
      } else if (tn === $.FRAMESET) {
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = IN_FRAMESET_MODE;
      } else if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.SCRIPT || tn === $.STYLE || tn === $.TEMPLATE || tn === $.TITLE) {
        p2._err(ERR.abandonedHeadElementChild);
        p2.openElements.push(p2.headElement);
        startTagInHead(p2, token);
        p2.openElements.remove(p2.headElement);
      } else if (tn === $.HEAD) {
        p2._err(ERR.misplacedStartTagForHeadElement);
      } else {
        tokenAfterHead(p2, token);
      }
    }
    function endTagAfterHead(p2, token) {
      const tn = token.tagName;
      if (tn === $.BODY || tn === $.HTML || tn === $.BR) {
        tokenAfterHead(p2, token);
      } else if (tn === $.TEMPLATE) {
        endTagInHead(p2, token);
      } else {
        p2._err(ERR.endTagWithoutMatchingOpenElement);
      }
    }
    function tokenAfterHead(p2, token) {
      p2._insertFakeElement($.BODY);
      p2.insertionMode = IN_BODY_MODE;
      p2._processToken(token);
    }
    function whitespaceCharacterInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._insertCharacters(token);
    }
    function characterInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._insertCharacters(token);
      p2.framesetOk = false;
    }
    function htmlStartTagInBody(p2, token) {
      if (p2.openElements.tmplCount === 0) {
        p2.treeAdapter.adoptAttributes(p2.openElements.items[0], token.attrs);
      }
    }
    function bodyStartTagInBody(p2, token) {
      const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement && p2.openElements.tmplCount === 0) {
        p2.framesetOk = false;
        p2.treeAdapter.adoptAttributes(bodyElement, token.attrs);
      }
    }
    function framesetStartTagInBody(p2, token) {
      const bodyElement = p2.openElements.tryPeekProperlyNestedBodyElement();
      if (p2.framesetOk && bodyElement) {
        p2.treeAdapter.detachNode(bodyElement);
        p2.openElements.popAllUpToHtmlElement();
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = IN_FRAMESET_MODE;
      }
    }
    function addressStartTagInBody(p2, token) {
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._insertElement(token, NS.HTML);
    }
    function numberedHeaderStartTagInBody(p2, token) {
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      const tn = p2.openElements.currentTagName;
      if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) {
        p2.openElements.pop();
      }
      p2._insertElement(token, NS.HTML);
    }
    function preStartTagInBody(p2, token) {
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._insertElement(token, NS.HTML);
      p2.skipNextNewLine = true;
      p2.framesetOk = false;
    }
    function formStartTagInBody(p2, token) {
      const inTemplate = p2.openElements.tmplCount > 0;
      if (!p2.formElement || inTemplate) {
        if (p2.openElements.hasInButtonScope($.P)) {
          p2._closePElement();
        }
        p2._insertElement(token, NS.HTML);
        if (!inTemplate) {
          p2.formElement = p2.openElements.current;
        }
      }
    }
    function listItemStartTagInBody(p2, token) {
      p2.framesetOk = false;
      const tn = token.tagName;
      for (let i = p2.openElements.stackTop; i >= 0; i--) {
        const element4 = p2.openElements.items[i];
        const elementTn = p2.treeAdapter.getTagName(element4);
        let closeTn = null;
        if (tn === $.LI && elementTn === $.LI) {
          closeTn = $.LI;
        } else if ((tn === $.DD || tn === $.DT) && (elementTn === $.DD || elementTn === $.DT)) {
          closeTn = elementTn;
        }
        if (closeTn) {
          p2.openElements.generateImpliedEndTagsWithExclusion(closeTn);
          p2.openElements.popUntilTagNamePopped(closeTn);
          break;
        }
        if (elementTn !== $.ADDRESS && elementTn !== $.DIV && elementTn !== $.P && p2._isSpecialElement(element4)) {
          break;
        }
      }
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._insertElement(token, NS.HTML);
    }
    function plaintextStartTagInBody(p2, token) {
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._insertElement(token, NS.HTML);
      p2.tokenizer.state = Tokenizer.MODE.PLAINTEXT;
    }
    function buttonStartTagInBody(p2, token) {
      if (p2.openElements.hasInScope($.BUTTON)) {
        p2.openElements.generateImpliedEndTags();
        p2.openElements.popUntilTagNamePopped($.BUTTON);
      }
      p2._reconstructActiveFormattingElements();
      p2._insertElement(token, NS.HTML);
      p2.framesetOk = false;
    }
    function aStartTagInBody(p2, token) {
      const activeElementEntry = p2.activeFormattingElements.getElementEntryInScopeWithTagName($.A);
      if (activeElementEntry) {
        callAdoptionAgency(p2, token);
        p2.openElements.remove(activeElementEntry.element);
        p2.activeFormattingElements.removeEntry(activeElementEntry);
      }
      p2._reconstructActiveFormattingElements();
      p2._insertElement(token, NS.HTML);
      p2.activeFormattingElements.pushElement(p2.openElements.current, token);
    }
    function bStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._insertElement(token, NS.HTML);
      p2.activeFormattingElements.pushElement(p2.openElements.current, token);
    }
    function nobrStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      if (p2.openElements.hasInScope($.NOBR)) {
        callAdoptionAgency(p2, token);
        p2._reconstructActiveFormattingElements();
      }
      p2._insertElement(token, NS.HTML);
      p2.activeFormattingElements.pushElement(p2.openElements.current, token);
    }
    function appletStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._insertElement(token, NS.HTML);
      p2.activeFormattingElements.insertMarker();
      p2.framesetOk = false;
    }
    function tableStartTagInBody(p2, token) {
      if (p2.treeAdapter.getDocumentMode(p2.document) !== HTML.DOCUMENT_MODE.QUIRKS && p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._insertElement(token, NS.HTML);
      p2.framesetOk = false;
      p2.insertionMode = IN_TABLE_MODE;
    }
    function areaStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._appendElement(token, NS.HTML);
      p2.framesetOk = false;
      token.ackSelfClosing = true;
    }
    function inputStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._appendElement(token, NS.HTML);
      const inputType = Tokenizer.getTokenAttr(token, ATTRS.TYPE);
      if (!inputType || inputType.toLowerCase() !== HIDDEN_INPUT_TYPE) {
        p2.framesetOk = false;
      }
      token.ackSelfClosing = true;
    }
    function paramStartTagInBody(p2, token) {
      p2._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
    }
    function hrStartTagInBody(p2, token) {
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._appendElement(token, NS.HTML);
      p2.framesetOk = false;
      token.ackSelfClosing = true;
    }
    function imageStartTagInBody(p2, token) {
      token.tagName = $.IMG;
      areaStartTagInBody(p2, token);
    }
    function textareaStartTagInBody(p2, token) {
      p2._insertElement(token, NS.HTML);
      p2.skipNextNewLine = true;
      p2.tokenizer.state = Tokenizer.MODE.RCDATA;
      p2.originalInsertionMode = p2.insertionMode;
      p2.framesetOk = false;
      p2.insertionMode = TEXT_MODE;
    }
    function xmpStartTagInBody(p2, token) {
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._reconstructActiveFormattingElements();
      p2.framesetOk = false;
      p2._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
    }
    function iframeStartTagInBody(p2, token) {
      p2.framesetOk = false;
      p2._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
    }
    function noembedStartTagInBody(p2, token) {
      p2._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
    }
    function selectStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._insertElement(token, NS.HTML);
      p2.framesetOk = false;
      if (p2.insertionMode === IN_TABLE_MODE || p2.insertionMode === IN_CAPTION_MODE || p2.insertionMode === IN_TABLE_BODY_MODE || p2.insertionMode === IN_ROW_MODE || p2.insertionMode === IN_CELL_MODE) {
        p2.insertionMode = IN_SELECT_IN_TABLE_MODE;
      } else {
        p2.insertionMode = IN_SELECT_MODE;
      }
    }
    function optgroupStartTagInBody(p2, token) {
      if (p2.openElements.currentTagName === $.OPTION) {
        p2.openElements.pop();
      }
      p2._reconstructActiveFormattingElements();
      p2._insertElement(token, NS.HTML);
    }
    function rbStartTagInBody(p2, token) {
      if (p2.openElements.hasInScope($.RUBY)) {
        p2.openElements.generateImpliedEndTags();
      }
      p2._insertElement(token, NS.HTML);
    }
    function rtStartTagInBody(p2, token) {
      if (p2.openElements.hasInScope($.RUBY)) {
        p2.openElements.generateImpliedEndTagsWithExclusion($.RTC);
      }
      p2._insertElement(token, NS.HTML);
    }
    function menuStartTagInBody(p2, token) {
      if (p2.openElements.hasInButtonScope($.P)) {
        p2._closePElement();
      }
      p2._insertElement(token, NS.HTML);
    }
    function mathStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      foreignContent.adjustTokenMathMLAttrs(token);
      foreignContent.adjustTokenXMLAttrs(token);
      if (token.selfClosing) {
        p2._appendElement(token, NS.MATHML);
      } else {
        p2._insertElement(token, NS.MATHML);
      }
      token.ackSelfClosing = true;
    }
    function svgStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      foreignContent.adjustTokenSVGAttrs(token);
      foreignContent.adjustTokenXMLAttrs(token);
      if (token.selfClosing) {
        p2._appendElement(token, NS.SVG);
      } else {
        p2._insertElement(token, NS.SVG);
      }
      token.ackSelfClosing = true;
    }
    function genericStartTagInBody(p2, token) {
      p2._reconstructActiveFormattingElements();
      p2._insertElement(token, NS.HTML);
    }
    function startTagInBody(p2, token) {
      const tn = token.tagName;
      switch (tn.length) {
        case 1:
          if (tn === $.I || tn === $.S || tn === $.B || tn === $.U) {
            bStartTagInBody(p2, token);
          } else if (tn === $.P) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.A) {
            aStartTagInBody(p2, token);
          } else {
            genericStartTagInBody(p2, token);
          }
          break;
        case 2:
          if (tn === $.DL || tn === $.OL || tn === $.UL) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) {
            numberedHeaderStartTagInBody(p2, token);
          } else if (tn === $.LI || tn === $.DD || tn === $.DT) {
            listItemStartTagInBody(p2, token);
          } else if (tn === $.EM || tn === $.TT) {
            bStartTagInBody(p2, token);
          } else if (tn === $.BR) {
            areaStartTagInBody(p2, token);
          } else if (tn === $.HR) {
            hrStartTagInBody(p2, token);
          } else if (tn === $.RB) {
            rbStartTagInBody(p2, token);
          } else if (tn === $.RT || tn === $.RP) {
            rtStartTagInBody(p2, token);
          } else if (tn !== $.TH && tn !== $.TD && tn !== $.TR) {
            genericStartTagInBody(p2, token);
          }
          break;
        case 3:
          if (tn === $.DIV || tn === $.DIR || tn === $.NAV) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.PRE) {
            preStartTagInBody(p2, token);
          } else if (tn === $.BIG) {
            bStartTagInBody(p2, token);
          } else if (tn === $.IMG || tn === $.WBR) {
            areaStartTagInBody(p2, token);
          } else if (tn === $.XMP) {
            xmpStartTagInBody(p2, token);
          } else if (tn === $.SVG) {
            svgStartTagInBody(p2, token);
          } else if (tn === $.RTC) {
            rbStartTagInBody(p2, token);
          } else if (tn !== $.COL) {
            genericStartTagInBody(p2, token);
          }
          break;
        case 4:
          if (tn === $.HTML) {
            htmlStartTagInBody(p2, token);
          } else if (tn === $.BASE || tn === $.LINK || tn === $.META) {
            startTagInHead(p2, token);
          } else if (tn === $.BODY) {
            bodyStartTagInBody(p2, token);
          } else if (tn === $.MAIN || tn === $.MENU) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.FORM) {
            formStartTagInBody(p2, token);
          } else if (tn === $.CODE || tn === $.FONT) {
            bStartTagInBody(p2, token);
          } else if (tn === $.NOBR) {
            nobrStartTagInBody(p2, token);
          } else if (tn === $.AREA) {
            areaStartTagInBody(p2, token);
          } else if (tn === $.MATH) {
            mathStartTagInBody(p2, token);
          } else if (tn === $.MENU) {
            menuStartTagInBody(p2, token);
          } else if (tn !== $.HEAD) {
            genericStartTagInBody(p2, token);
          }
          break;
        case 5:
          if (tn === $.STYLE || tn === $.TITLE) {
            startTagInHead(p2, token);
          } else if (tn === $.ASIDE) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.SMALL) {
            bStartTagInBody(p2, token);
          } else if (tn === $.TABLE) {
            tableStartTagInBody(p2, token);
          } else if (tn === $.EMBED) {
            areaStartTagInBody(p2, token);
          } else if (tn === $.INPUT) {
            inputStartTagInBody(p2, token);
          } else if (tn === $.PARAM || tn === $.TRACK) {
            paramStartTagInBody(p2, token);
          } else if (tn === $.IMAGE) {
            imageStartTagInBody(p2, token);
          } else if (tn !== $.FRAME && tn !== $.TBODY && tn !== $.TFOOT && tn !== $.THEAD) {
            genericStartTagInBody(p2, token);
          }
          break;
        case 6:
          if (tn === $.SCRIPT) {
            startTagInHead(p2, token);
          } else if (tn === $.CENTER || tn === $.FIGURE || tn === $.FOOTER || tn === $.HEADER || tn === $.HGROUP || tn === $.DIALOG) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.BUTTON) {
            buttonStartTagInBody(p2, token);
          } else if (tn === $.STRIKE || tn === $.STRONG) {
            bStartTagInBody(p2, token);
          } else if (tn === $.APPLET || tn === $.OBJECT) {
            appletStartTagInBody(p2, token);
          } else if (tn === $.KEYGEN) {
            areaStartTagInBody(p2, token);
          } else if (tn === $.SOURCE) {
            paramStartTagInBody(p2, token);
          } else if (tn === $.IFRAME) {
            iframeStartTagInBody(p2, token);
          } else if (tn === $.SELECT) {
            selectStartTagInBody(p2, token);
          } else if (tn === $.OPTION) {
            optgroupStartTagInBody(p2, token);
          } else {
            genericStartTagInBody(p2, token);
          }
          break;
        case 7:
          if (tn === $.BGSOUND) {
            startTagInHead(p2, token);
          } else if (tn === $.DETAILS || tn === $.ADDRESS || tn === $.ARTICLE || tn === $.SECTION || tn === $.SUMMARY) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.LISTING) {
            preStartTagInBody(p2, token);
          } else if (tn === $.MARQUEE) {
            appletStartTagInBody(p2, token);
          } else if (tn === $.NOEMBED) {
            noembedStartTagInBody(p2, token);
          } else if (tn !== $.CAPTION) {
            genericStartTagInBody(p2, token);
          }
          break;
        case 8:
          if (tn === $.BASEFONT) {
            startTagInHead(p2, token);
          } else if (tn === $.FRAMESET) {
            framesetStartTagInBody(p2, token);
          } else if (tn === $.FIELDSET) {
            addressStartTagInBody(p2, token);
          } else if (tn === $.TEXTAREA) {
            textareaStartTagInBody(p2, token);
          } else if (tn === $.TEMPLATE) {
            startTagInHead(p2, token);
          } else if (tn === $.NOSCRIPT) {
            if (p2.options.scriptingEnabled) {
              noembedStartTagInBody(p2, token);
            } else {
              genericStartTagInBody(p2, token);
            }
          } else if (tn === $.OPTGROUP) {
            optgroupStartTagInBody(p2, token);
          } else if (tn !== $.COLGROUP) {
            genericStartTagInBody(p2, token);
          }
          break;
        case 9:
          if (tn === $.PLAINTEXT) {
            plaintextStartTagInBody(p2, token);
          } else {
            genericStartTagInBody(p2, token);
          }
          break;
        case 10:
          if (tn === $.BLOCKQUOTE || tn === $.FIGCAPTION) {
            addressStartTagInBody(p2, token);
          } else {
            genericStartTagInBody(p2, token);
          }
          break;
        default:
          genericStartTagInBody(p2, token);
      }
    }
    function bodyEndTagInBody(p2) {
      if (p2.openElements.hasInScope($.BODY)) {
        p2.insertionMode = AFTER_BODY_MODE;
      }
    }
    function htmlEndTagInBody(p2, token) {
      if (p2.openElements.hasInScope($.BODY)) {
        p2.insertionMode = AFTER_BODY_MODE;
        p2._processToken(token);
      }
    }
    function addressEndTagInBody(p2, token) {
      const tn = token.tagName;
      if (p2.openElements.hasInScope(tn)) {
        p2.openElements.generateImpliedEndTags();
        p2.openElements.popUntilTagNamePopped(tn);
      }
    }
    function formEndTagInBody(p2) {
      const inTemplate = p2.openElements.tmplCount > 0;
      const formElement = p2.formElement;
      if (!inTemplate) {
        p2.formElement = null;
      }
      if ((formElement || inTemplate) && p2.openElements.hasInScope($.FORM)) {
        p2.openElements.generateImpliedEndTags();
        if (inTemplate) {
          p2.openElements.popUntilTagNamePopped($.FORM);
        } else {
          p2.openElements.remove(formElement);
        }
      }
    }
    function pEndTagInBody(p2) {
      if (!p2.openElements.hasInButtonScope($.P)) {
        p2._insertFakeElement($.P);
      }
      p2._closePElement();
    }
    function liEndTagInBody(p2) {
      if (p2.openElements.hasInListItemScope($.LI)) {
        p2.openElements.generateImpliedEndTagsWithExclusion($.LI);
        p2.openElements.popUntilTagNamePopped($.LI);
      }
    }
    function ddEndTagInBody(p2, token) {
      const tn = token.tagName;
      if (p2.openElements.hasInScope(tn)) {
        p2.openElements.generateImpliedEndTagsWithExclusion(tn);
        p2.openElements.popUntilTagNamePopped(tn);
      }
    }
    function numberedHeaderEndTagInBody(p2) {
      if (p2.openElements.hasNumberedHeaderInScope()) {
        p2.openElements.generateImpliedEndTags();
        p2.openElements.popUntilNumberedHeaderPopped();
      }
    }
    function appletEndTagInBody(p2, token) {
      const tn = token.tagName;
      if (p2.openElements.hasInScope(tn)) {
        p2.openElements.generateImpliedEndTags();
        p2.openElements.popUntilTagNamePopped(tn);
        p2.activeFormattingElements.clearToLastMarker();
      }
    }
    function brEndTagInBody(p2) {
      p2._reconstructActiveFormattingElements();
      p2._insertFakeElement($.BR);
      p2.openElements.pop();
      p2.framesetOk = false;
    }
    function genericEndTagInBody(p2, token) {
      const tn = token.tagName;
      for (let i = p2.openElements.stackTop; i > 0; i--) {
        const element4 = p2.openElements.items[i];
        if (p2.treeAdapter.getTagName(element4) === tn) {
          p2.openElements.generateImpliedEndTagsWithExclusion(tn);
          p2.openElements.popUntilElementPopped(element4);
          break;
        }
        if (p2._isSpecialElement(element4)) {
          break;
        }
      }
    }
    function endTagInBody(p2, token) {
      const tn = token.tagName;
      switch (tn.length) {
        case 1:
          if (tn === $.A || tn === $.B || tn === $.I || tn === $.S || tn === $.U) {
            callAdoptionAgency(p2, token);
          } else if (tn === $.P) {
            pEndTagInBody(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 2:
          if (tn === $.DL || tn === $.UL || tn === $.OL) {
            addressEndTagInBody(p2, token);
          } else if (tn === $.LI) {
            liEndTagInBody(p2, token);
          } else if (tn === $.DD || tn === $.DT) {
            ddEndTagInBody(p2, token);
          } else if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) {
            numberedHeaderEndTagInBody(p2, token);
          } else if (tn === $.BR) {
            brEndTagInBody(p2, token);
          } else if (tn === $.EM || tn === $.TT) {
            callAdoptionAgency(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 3:
          if (tn === $.BIG) {
            callAdoptionAgency(p2, token);
          } else if (tn === $.DIR || tn === $.DIV || tn === $.NAV || tn === $.PRE) {
            addressEndTagInBody(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 4:
          if (tn === $.BODY) {
            bodyEndTagInBody(p2, token);
          } else if (tn === $.HTML) {
            htmlEndTagInBody(p2, token);
          } else if (tn === $.FORM) {
            formEndTagInBody(p2, token);
          } else if (tn === $.CODE || tn === $.FONT || tn === $.NOBR) {
            callAdoptionAgency(p2, token);
          } else if (tn === $.MAIN || tn === $.MENU) {
            addressEndTagInBody(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 5:
          if (tn === $.ASIDE) {
            addressEndTagInBody(p2, token);
          } else if (tn === $.SMALL) {
            callAdoptionAgency(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 6:
          if (tn === $.CENTER || tn === $.FIGURE || tn === $.FOOTER || tn === $.HEADER || tn === $.HGROUP || tn === $.DIALOG) {
            addressEndTagInBody(p2, token);
          } else if (tn === $.APPLET || tn === $.OBJECT) {
            appletEndTagInBody(p2, token);
          } else if (tn === $.STRIKE || tn === $.STRONG) {
            callAdoptionAgency(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 7:
          if (tn === $.ADDRESS || tn === $.ARTICLE || tn === $.DETAILS || tn === $.SECTION || tn === $.SUMMARY || tn === $.LISTING) {
            addressEndTagInBody(p2, token);
          } else if (tn === $.MARQUEE) {
            appletEndTagInBody(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 8:
          if (tn === $.FIELDSET) {
            addressEndTagInBody(p2, token);
          } else if (tn === $.TEMPLATE) {
            endTagInHead(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        case 10:
          if (tn === $.BLOCKQUOTE || tn === $.FIGCAPTION) {
            addressEndTagInBody(p2, token);
          } else {
            genericEndTagInBody(p2, token);
          }
          break;
        default:
          genericEndTagInBody(p2, token);
      }
    }
    function eofInBody(p2, token) {
      if (p2.tmplInsertionModeStackTop > -1) {
        eofInTemplate(p2, token);
      } else {
        p2.stopped = true;
      }
    }
    function endTagInText(p2, token) {
      if (token.tagName === $.SCRIPT) {
        p2.pendingScript = p2.openElements.current;
      }
      p2.openElements.pop();
      p2.insertionMode = p2.originalInsertionMode;
    }
    function eofInText(p2, token) {
      p2._err(ERR.eofInElementThatCanContainOnlyText);
      p2.openElements.pop();
      p2.insertionMode = p2.originalInsertionMode;
      p2._processToken(token);
    }
    function characterInTable(p2, token) {
      const curTn = p2.openElements.currentTagName;
      if (curTn === $.TABLE || curTn === $.TBODY || curTn === $.TFOOT || curTn === $.THEAD || curTn === $.TR) {
        p2.pendingCharacterTokens = [];
        p2.hasNonWhitespacePendingCharacterToken = false;
        p2.originalInsertionMode = p2.insertionMode;
        p2.insertionMode = IN_TABLE_TEXT_MODE;
        p2._processToken(token);
      } else {
        tokenInTable(p2, token);
      }
    }
    function captionStartTagInTable(p2, token) {
      p2.openElements.clearBackToTableContext();
      p2.activeFormattingElements.insertMarker();
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = IN_CAPTION_MODE;
    }
    function colgroupStartTagInTable(p2, token) {
      p2.openElements.clearBackToTableContext();
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = IN_COLUMN_GROUP_MODE;
    }
    function colStartTagInTable(p2, token) {
      p2.openElements.clearBackToTableContext();
      p2._insertFakeElement($.COLGROUP);
      p2.insertionMode = IN_COLUMN_GROUP_MODE;
      p2._processToken(token);
    }
    function tbodyStartTagInTable(p2, token) {
      p2.openElements.clearBackToTableContext();
      p2._insertElement(token, NS.HTML);
      p2.insertionMode = IN_TABLE_BODY_MODE;
    }
    function tdStartTagInTable(p2, token) {
      p2.openElements.clearBackToTableContext();
      p2._insertFakeElement($.TBODY);
      p2.insertionMode = IN_TABLE_BODY_MODE;
      p2._processToken(token);
    }
    function tableStartTagInTable(p2, token) {
      if (p2.openElements.hasInTableScope($.TABLE)) {
        p2.openElements.popUntilTagNamePopped($.TABLE);
        p2._resetInsertionMode();
        p2._processToken(token);
      }
    }
    function inputStartTagInTable(p2, token) {
      const inputType = Tokenizer.getTokenAttr(token, ATTRS.TYPE);
      if (inputType && inputType.toLowerCase() === HIDDEN_INPUT_TYPE) {
        p2._appendElement(token, NS.HTML);
      } else {
        tokenInTable(p2, token);
      }
      token.ackSelfClosing = true;
    }
    function formStartTagInTable(p2, token) {
      if (!p2.formElement && p2.openElements.tmplCount === 0) {
        p2._insertElement(token, NS.HTML);
        p2.formElement = p2.openElements.current;
        p2.openElements.pop();
      }
    }
    function startTagInTable(p2, token) {
      const tn = token.tagName;
      switch (tn.length) {
        case 2:
          if (tn === $.TD || tn === $.TH || tn === $.TR) {
            tdStartTagInTable(p2, token);
          } else {
            tokenInTable(p2, token);
          }
          break;
        case 3:
          if (tn === $.COL) {
            colStartTagInTable(p2, token);
          } else {
            tokenInTable(p2, token);
          }
          break;
        case 4:
          if (tn === $.FORM) {
            formStartTagInTable(p2, token);
          } else {
            tokenInTable(p2, token);
          }
          break;
        case 5:
          if (tn === $.TABLE) {
            tableStartTagInTable(p2, token);
          } else if (tn === $.STYLE) {
            startTagInHead(p2, token);
          } else if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
            tbodyStartTagInTable(p2, token);
          } else if (tn === $.INPUT) {
            inputStartTagInTable(p2, token);
          } else {
            tokenInTable(p2, token);
          }
          break;
        case 6:
          if (tn === $.SCRIPT) {
            startTagInHead(p2, token);
          } else {
            tokenInTable(p2, token);
          }
          break;
        case 7:
          if (tn === $.CAPTION) {
            captionStartTagInTable(p2, token);
          } else {
            tokenInTable(p2, token);
          }
          break;
        case 8:
          if (tn === $.COLGROUP) {
            colgroupStartTagInTable(p2, token);
          } else if (tn === $.TEMPLATE) {
            startTagInHead(p2, token);
          } else {
            tokenInTable(p2, token);
          }
          break;
        default:
          tokenInTable(p2, token);
      }
    }
    function endTagInTable(p2, token) {
      const tn = token.tagName;
      if (tn === $.TABLE) {
        if (p2.openElements.hasInTableScope($.TABLE)) {
          p2.openElements.popUntilTagNamePopped($.TABLE);
          p2._resetInsertionMode();
        }
      } else if (tn === $.TEMPLATE) {
        endTagInHead(p2, token);
      } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML && tn !== $.TBODY && tn !== $.TD && tn !== $.TFOOT && tn !== $.TH && tn !== $.THEAD && tn !== $.TR) {
        tokenInTable(p2, token);
      }
    }
    function tokenInTable(p2, token) {
      const savedFosterParentingState = p2.fosterParentingEnabled;
      p2.fosterParentingEnabled = true;
      p2._processTokenInBodyMode(token);
      p2.fosterParentingEnabled = savedFosterParentingState;
    }
    function whitespaceCharacterInTableText(p2, token) {
      p2.pendingCharacterTokens.push(token);
    }
    function characterInTableText(p2, token) {
      p2.pendingCharacterTokens.push(token);
      p2.hasNonWhitespacePendingCharacterToken = true;
    }
    function tokenInTableText(p2, token) {
      let i = 0;
      if (p2.hasNonWhitespacePendingCharacterToken) {
        for (; i < p2.pendingCharacterTokens.length; i++) {
          tokenInTable(p2, p2.pendingCharacterTokens[i]);
        }
      } else {
        for (; i < p2.pendingCharacterTokens.length; i++) {
          p2._insertCharacters(p2.pendingCharacterTokens[i]);
        }
      }
      p2.insertionMode = p2.originalInsertionMode;
      p2._processToken(token);
    }
    function startTagInCaption(p2, token) {
      const tn = token.tagName;
      if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TD || tn === $.TFOOT || tn === $.TH || tn === $.THEAD || tn === $.TR) {
        if (p2.openElements.hasInTableScope($.CAPTION)) {
          p2.openElements.generateImpliedEndTags();
          p2.openElements.popUntilTagNamePopped($.CAPTION);
          p2.activeFormattingElements.clearToLastMarker();
          p2.insertionMode = IN_TABLE_MODE;
          p2._processToken(token);
        }
      } else {
        startTagInBody(p2, token);
      }
    }
    function endTagInCaption(p2, token) {
      const tn = token.tagName;
      if (tn === $.CAPTION || tn === $.TABLE) {
        if (p2.openElements.hasInTableScope($.CAPTION)) {
          p2.openElements.generateImpliedEndTags();
          p2.openElements.popUntilTagNamePopped($.CAPTION);
          p2.activeFormattingElements.clearToLastMarker();
          p2.insertionMode = IN_TABLE_MODE;
          if (tn === $.TABLE) {
            p2._processToken(token);
          }
        }
      } else if (tn !== $.BODY && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML && tn !== $.TBODY && tn !== $.TD && tn !== $.TFOOT && tn !== $.TH && tn !== $.THEAD && tn !== $.TR) {
        endTagInBody(p2, token);
      }
    }
    function startTagInColumnGroup(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.COL) {
        p2._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
      } else if (tn === $.TEMPLATE) {
        startTagInHead(p2, token);
      } else {
        tokenInColumnGroup(p2, token);
      }
    }
    function endTagInColumnGroup(p2, token) {
      const tn = token.tagName;
      if (tn === $.COLGROUP) {
        if (p2.openElements.currentTagName === $.COLGROUP) {
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_MODE;
        }
      } else if (tn === $.TEMPLATE) {
        endTagInHead(p2, token);
      } else if (tn !== $.COL) {
        tokenInColumnGroup(p2, token);
      }
    }
    function tokenInColumnGroup(p2, token) {
      if (p2.openElements.currentTagName === $.COLGROUP) {
        p2.openElements.pop();
        p2.insertionMode = IN_TABLE_MODE;
        p2._processToken(token);
      }
    }
    function startTagInTableBody(p2, token) {
      const tn = token.tagName;
      if (tn === $.TR) {
        p2.openElements.clearBackToTableBodyContext();
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = IN_ROW_MODE;
      } else if (tn === $.TH || tn === $.TD) {
        p2.openElements.clearBackToTableBodyContext();
        p2._insertFakeElement($.TR);
        p2.insertionMode = IN_ROW_MODE;
        p2._processToken(token);
      } else if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
        if (p2.openElements.hasTableBodyContextInTableScope()) {
          p2.openElements.clearBackToTableBodyContext();
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_MODE;
          p2._processToken(token);
        }
      } else {
        startTagInTable(p2, token);
      }
    }
    function endTagInTableBody(p2, token) {
      const tn = token.tagName;
      if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
        if (p2.openElements.hasInTableScope(tn)) {
          p2.openElements.clearBackToTableBodyContext();
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_MODE;
        }
      } else if (tn === $.TABLE) {
        if (p2.openElements.hasTableBodyContextInTableScope()) {
          p2.openElements.clearBackToTableBodyContext();
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_MODE;
          p2._processToken(token);
        }
      } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP || tn !== $.HTML && tn !== $.TD && tn !== $.TH && tn !== $.TR) {
        endTagInTable(p2, token);
      }
    }
    function startTagInRow(p2, token) {
      const tn = token.tagName;
      if (tn === $.TH || tn === $.TD) {
        p2.openElements.clearBackToTableRowContext();
        p2._insertElement(token, NS.HTML);
        p2.insertionMode = IN_CELL_MODE;
        p2.activeFormattingElements.insertMarker();
      } else if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR) {
        if (p2.openElements.hasInTableScope($.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_BODY_MODE;
          p2._processToken(token);
        }
      } else {
        startTagInTable(p2, token);
      }
    }
    function endTagInRow(p2, token) {
      const tn = token.tagName;
      if (tn === $.TR) {
        if (p2.openElements.hasInTableScope($.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_BODY_MODE;
        }
      } else if (tn === $.TABLE) {
        if (p2.openElements.hasInTableScope($.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_BODY_MODE;
          p2._processToken(token);
        }
      } else if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
        if (p2.openElements.hasInTableScope(tn) || p2.openElements.hasInTableScope($.TR)) {
          p2.openElements.clearBackToTableRowContext();
          p2.openElements.pop();
          p2.insertionMode = IN_TABLE_BODY_MODE;
          p2._processToken(token);
        }
      } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP || tn !== $.HTML && tn !== $.TD && tn !== $.TH) {
        endTagInTable(p2, token);
      }
    }
    function startTagInCell(p2, token) {
      const tn = token.tagName;
      if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TD || tn === $.TFOOT || tn === $.TH || tn === $.THEAD || tn === $.TR) {
        if (p2.openElements.hasInTableScope($.TD) || p2.openElements.hasInTableScope($.TH)) {
          p2._closeTableCell();
          p2._processToken(token);
        }
      } else {
        startTagInBody(p2, token);
      }
    }
    function endTagInCell(p2, token) {
      const tn = token.tagName;
      if (tn === $.TD || tn === $.TH) {
        if (p2.openElements.hasInTableScope(tn)) {
          p2.openElements.generateImpliedEndTags();
          p2.openElements.popUntilTagNamePopped(tn);
          p2.activeFormattingElements.clearToLastMarker();
          p2.insertionMode = IN_ROW_MODE;
        }
      } else if (tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR) {
        if (p2.openElements.hasInTableScope(tn)) {
          p2._closeTableCell();
          p2._processToken(token);
        }
      } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML) {
        endTagInBody(p2, token);
      }
    }
    function startTagInSelect(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.OPTION) {
        if (p2.openElements.currentTagName === $.OPTION) {
          p2.openElements.pop();
        }
        p2._insertElement(token, NS.HTML);
      } else if (tn === $.OPTGROUP) {
        if (p2.openElements.currentTagName === $.OPTION) {
          p2.openElements.pop();
        }
        if (p2.openElements.currentTagName === $.OPTGROUP) {
          p2.openElements.pop();
        }
        p2._insertElement(token, NS.HTML);
      } else if (tn === $.INPUT || tn === $.KEYGEN || tn === $.TEXTAREA || tn === $.SELECT) {
        if (p2.openElements.hasInSelectScope($.SELECT)) {
          p2.openElements.popUntilTagNamePopped($.SELECT);
          p2._resetInsertionMode();
          if (tn !== $.SELECT) {
            p2._processToken(token);
          }
        }
      } else if (tn === $.SCRIPT || tn === $.TEMPLATE) {
        startTagInHead(p2, token);
      }
    }
    function endTagInSelect(p2, token) {
      const tn = token.tagName;
      if (tn === $.OPTGROUP) {
        const prevOpenElement = p2.openElements.items[p2.openElements.stackTop - 1];
        const prevOpenElementTn = prevOpenElement && p2.treeAdapter.getTagName(prevOpenElement);
        if (p2.openElements.currentTagName === $.OPTION && prevOpenElementTn === $.OPTGROUP) {
          p2.openElements.pop();
        }
        if (p2.openElements.currentTagName === $.OPTGROUP) {
          p2.openElements.pop();
        }
      } else if (tn === $.OPTION) {
        if (p2.openElements.currentTagName === $.OPTION) {
          p2.openElements.pop();
        }
      } else if (tn === $.SELECT && p2.openElements.hasInSelectScope($.SELECT)) {
        p2.openElements.popUntilTagNamePopped($.SELECT);
        p2._resetInsertionMode();
      } else if (tn === $.TEMPLATE) {
        endTagInHead(p2, token);
      }
    }
    function startTagInSelectInTable(p2, token) {
      const tn = token.tagName;
      if (tn === $.CAPTION || tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR || tn === $.TD || tn === $.TH) {
        p2.openElements.popUntilTagNamePopped($.SELECT);
        p2._resetInsertionMode();
        p2._processToken(token);
      } else {
        startTagInSelect(p2, token);
      }
    }
    function endTagInSelectInTable(p2, token) {
      const tn = token.tagName;
      if (tn === $.CAPTION || tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR || tn === $.TD || tn === $.TH) {
        if (p2.openElements.hasInTableScope(tn)) {
          p2.openElements.popUntilTagNamePopped($.SELECT);
          p2._resetInsertionMode();
          p2._processToken(token);
        }
      } else {
        endTagInSelect(p2, token);
      }
    }
    function startTagInTemplate(p2, token) {
      const tn = token.tagName;
      if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.SCRIPT || tn === $.STYLE || tn === $.TEMPLATE || tn === $.TITLE) {
        startTagInHead(p2, token);
      } else {
        const newInsertionMode = TEMPLATE_INSERTION_MODE_SWITCH_MAP[tn] || IN_BODY_MODE;
        p2._popTmplInsertionMode();
        p2._pushTmplInsertionMode(newInsertionMode);
        p2.insertionMode = newInsertionMode;
        p2._processToken(token);
      }
    }
    function endTagInTemplate(p2, token) {
      if (token.tagName === $.TEMPLATE) {
        endTagInHead(p2, token);
      }
    }
    function eofInTemplate(p2, token) {
      if (p2.openElements.tmplCount > 0) {
        p2.openElements.popUntilTagNamePopped($.TEMPLATE);
        p2.activeFormattingElements.clearToLastMarker();
        p2._popTmplInsertionMode();
        p2._resetInsertionMode();
        p2._processToken(token);
      } else {
        p2.stopped = true;
      }
    }
    function startTagAfterBody(p2, token) {
      if (token.tagName === $.HTML) {
        startTagInBody(p2, token);
      } else {
        tokenAfterBody(p2, token);
      }
    }
    function endTagAfterBody(p2, token) {
      if (token.tagName === $.HTML) {
        if (!p2.fragmentContext) {
          p2.insertionMode = AFTER_AFTER_BODY_MODE;
        }
      } else {
        tokenAfterBody(p2, token);
      }
    }
    function tokenAfterBody(p2, token) {
      p2.insertionMode = IN_BODY_MODE;
      p2._processToken(token);
    }
    function startTagInFrameset(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.FRAMESET) {
        p2._insertElement(token, NS.HTML);
      } else if (tn === $.FRAME) {
        p2._appendElement(token, NS.HTML);
        token.ackSelfClosing = true;
      } else if (tn === $.NOFRAMES) {
        startTagInHead(p2, token);
      }
    }
    function endTagInFrameset(p2, token) {
      if (token.tagName === $.FRAMESET && !p2.openElements.isRootHtmlElementCurrent()) {
        p2.openElements.pop();
        if (!p2.fragmentContext && p2.openElements.currentTagName !== $.FRAMESET) {
          p2.insertionMode = AFTER_FRAMESET_MODE;
        }
      }
    }
    function startTagAfterFrameset(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.NOFRAMES) {
        startTagInHead(p2, token);
      }
    }
    function endTagAfterFrameset(p2, token) {
      if (token.tagName === $.HTML) {
        p2.insertionMode = AFTER_AFTER_FRAMESET_MODE;
      }
    }
    function startTagAfterAfterBody(p2, token) {
      if (token.tagName === $.HTML) {
        startTagInBody(p2, token);
      } else {
        tokenAfterAfterBody(p2, token);
      }
    }
    function tokenAfterAfterBody(p2, token) {
      p2.insertionMode = IN_BODY_MODE;
      p2._processToken(token);
    }
    function startTagAfterAfterFrameset(p2, token) {
      const tn = token.tagName;
      if (tn === $.HTML) {
        startTagInBody(p2, token);
      } else if (tn === $.NOFRAMES) {
        startTagInHead(p2, token);
      }
    }
    function nullCharacterInForeignContent(p2, token) {
      token.chars = unicode.REPLACEMENT_CHARACTER;
      p2._insertCharacters(token);
    }
    function characterInForeignContent(p2, token) {
      p2._insertCharacters(token);
      p2.framesetOk = false;
    }
    function startTagInForeignContent(p2, token) {
      if (foreignContent.causesExit(token) && !p2.fragmentContext) {
        while (p2.treeAdapter.getNamespaceURI(p2.openElements.current) !== NS.HTML && !p2._isIntegrationPoint(p2.openElements.current)) {
          p2.openElements.pop();
        }
        p2._processToken(token);
      } else {
        const current = p2._getAdjustedCurrentElement();
        const currentNs = p2.treeAdapter.getNamespaceURI(current);
        if (currentNs === NS.MATHML) {
          foreignContent.adjustTokenMathMLAttrs(token);
        } else if (currentNs === NS.SVG) {
          foreignContent.adjustTokenSVGTagName(token);
          foreignContent.adjustTokenSVGAttrs(token);
        }
        foreignContent.adjustTokenXMLAttrs(token);
        if (token.selfClosing) {
          p2._appendElement(token, currentNs);
        } else {
          p2._insertElement(token, currentNs);
        }
        token.ackSelfClosing = true;
      }
    }
    function endTagInForeignContent(p2, token) {
      for (let i = p2.openElements.stackTop; i > 0; i--) {
        const element4 = p2.openElements.items[i];
        if (p2.treeAdapter.getNamespaceURI(element4) === NS.HTML) {
          p2._processToken(token);
          break;
        }
        if (p2.treeAdapter.getTagName(element4).toLowerCase() === token.tagName) {
          p2.openElements.popUntilElementPopped(element4);
          break;
        }
      }
    }
  }
});

// src/index.js
var import_base64_js = __toESM(require_base64_js(), 1);

// node_modules/pako/dist/pako.esm.mjs
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
);
var extra_dbits = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
);
var extra_blbits = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist) => {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};
var put_short = (s2, w) => {
  s2.pending_buf[s2.pending++] = w & 255;
  s2.pending_buf[s2.pending++] = w >>> 8 & 255;
};
var send_bits = (s2, value, length) => {
  if (s2.bi_valid > Buf_size - length) {
    s2.bi_buf |= value << s2.bi_valid & 65535;
    put_short(s2, s2.bi_buf);
    s2.bi_buf = value >> Buf_size - s2.bi_valid;
    s2.bi_valid += length - Buf_size;
  } else {
    s2.bi_buf |= value << s2.bi_valid & 65535;
    s2.bi_valid += length;
  }
};
var send_code = (s2, c, tree) => {
  send_bits(
    s2,
    tree[c * 2],
    tree[c * 2 + 1]
    /*.Len*/
  );
};
var bi_reverse = (code3, len) => {
  let res = 0;
  do {
    res |= code3 & 1;
    code3 >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s2) => {
  if (s2.bi_valid === 16) {
    put_short(s2, s2.bi_buf);
    s2.bi_buf = 0;
    s2.bi_valid = 0;
  } else if (s2.bi_valid >= 8) {
    s2.pending_buf[s2.pending++] = s2.bi_buf & 255;
    s2.bi_buf >>= 8;
    s2.bi_valid -= 8;
  }
};
var gen_bitlen = (s2, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base3 = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h2;
  let n, m;
  let bits;
  let xbits;
  let f;
  let overflow = 0;
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s2.bl_count[bits] = 0;
  }
  tree[s2.heap[s2.heap_max] * 2 + 1] = 0;
  for (h2 = s2.heap_max + 1; h2 < HEAP_SIZE$1; h2++) {
    n = s2.heap[h2];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s2.bl_count[bits]++;
    xbits = 0;
    if (n >= base3) {
      xbits = extra[n - base3];
    }
    f = tree[n * 2];
    s2.opt_len += f * (bits + xbits);
    if (has_stree) {
      s2.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s2.bl_count[bits] === 0) {
      bits--;
    }
    s2.bl_count[bits]--;
    s2.bl_count[bits + 1] += 2;
    s2.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s2.bl_count[bits];
    while (n !== 0) {
      m = s2.heap[--h2];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s2.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code3 = 0;
  let bits;
  let n;
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    code3 = code3 + bl_count[bits - 1] << 1;
    next_code[bits] = code3;
  }
  for (n = 0; n <= max_code; n++) {
    let len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n;
  let bits;
  let length;
  let code3;
  let dist;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code3 = 0; code3 < LENGTH_CODES$1 - 1; code3++) {
    base_length[code3] = length;
    for (n = 0; n < 1 << extra_lbits[code3]; n++) {
      _length_code[length++] = code3;
    }
  }
  _length_code[length - 1] = code3;
  dist = 0;
  for (code3 = 0; code3 < 16; code3++) {
    base_dist[code3] = dist;
    for (n = 0; n < 1 << extra_dbits[code3]; n++) {
      _dist_code[dist++] = code3;
    }
  }
  dist >>= 7;
  for (; code3 < D_CODES$1; code3++) {
    base_dist[code3] = dist << 7;
    for (n = 0; n < 1 << extra_dbits[code3] - 7; n++) {
      _dist_code[256 + dist++] = code3;
    }
  }
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s2) => {
  let n;
  for (n = 0; n < L_CODES$1; n++) {
    s2.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES$1; n++) {
    s2.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES$1; n++) {
    s2.bl_tree[n * 2] = 0;
  }
  s2.dyn_ltree[END_BLOCK * 2] = 1;
  s2.opt_len = s2.static_len = 0;
  s2.sym_next = s2.matches = 0;
};
var bi_windup = (s2) => {
  if (s2.bi_valid > 8) {
    put_short(s2, s2.bi_buf);
  } else if (s2.bi_valid > 0) {
    s2.pending_buf[s2.pending++] = s2.bi_buf;
  }
  s2.bi_buf = 0;
  s2.bi_valid = 0;
};
var smaller = (tree, n, m, depth) => {
  const _n2 = n * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
};
var pqdownheap = (s2, tree, k) => {
  const v = s2.heap[k];
  let j = k << 1;
  while (j <= s2.heap_len) {
    if (j < s2.heap_len && smaller(tree, s2.heap[j + 1], s2.heap[j], s2.depth)) {
      j++;
    }
    if (smaller(tree, v, s2.heap[j], s2.depth)) {
      break;
    }
    s2.heap[k] = s2.heap[j];
    k = j;
    j <<= 1;
  }
  s2.heap[k] = v;
};
var compress_block = (s2, ltree, dtree) => {
  let dist;
  let lc;
  let sx = 0;
  let code3;
  let extra;
  if (s2.sym_next !== 0) {
    do {
      dist = s2.pending_buf[s2.sym_buf + sx++] & 255;
      dist += (s2.pending_buf[s2.sym_buf + sx++] & 255) << 8;
      lc = s2.pending_buf[s2.sym_buf + sx++];
      if (dist === 0) {
        send_code(s2, lc, ltree);
      } else {
        code3 = _length_code[lc];
        send_code(s2, code3 + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code3];
        if (extra !== 0) {
          lc -= base_length[code3];
          send_bits(s2, lc, extra);
        }
        dist--;
        code3 = d_code(dist);
        send_code(s2, code3, dtree);
        extra = extra_dbits[code3];
        if (extra !== 0) {
          dist -= base_dist[code3];
          send_bits(s2, dist, extra);
        }
      }
    } while (sx < s2.sym_next);
  }
  send_code(s2, END_BLOCK, ltree);
};
var build_tree = (s2, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n, m;
  let max_code = -1;
  let node2;
  s2.heap_len = 0;
  s2.heap_max = HEAP_SIZE$1;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s2.heap[++s2.heap_len] = max_code = n;
      s2.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s2.heap_len < 2) {
    node2 = s2.heap[++s2.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node2 * 2] = 1;
    s2.depth[node2] = 0;
    s2.opt_len--;
    if (has_stree) {
      s2.static_len -= stree[node2 * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s2.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s2, tree, n);
  }
  node2 = elems;
  do {
    n = s2.heap[
      1
      /*SMALLEST*/
    ];
    s2.heap[
      1
      /*SMALLEST*/
    ] = s2.heap[s2.heap_len--];
    pqdownheap(
      s2,
      tree,
      1
      /*SMALLEST*/
    );
    m = s2.heap[
      1
      /*SMALLEST*/
    ];
    s2.heap[--s2.heap_max] = n;
    s2.heap[--s2.heap_max] = m;
    tree[node2 * 2] = tree[n * 2] + tree[m * 2];
    s2.depth[node2] = (s2.depth[n] >= s2.depth[m] ? s2.depth[n] : s2.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node2;
    s2.heap[
      1
      /*SMALLEST*/
    ] = node2++;
    pqdownheap(
      s2,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s2.heap_len >= 2);
  s2.heap[--s2.heap_max] = s2.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s2, desc);
  gen_codes(tree, max_code, s2.bl_count);
};
var scan_tree = (s2, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count2 = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count2 < max_count && curlen === nextlen) {
      continue;
    } else if (count2 < min_count) {
      s2.bl_tree[curlen * 2] += count2;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s2.bl_tree[curlen * 2]++;
      }
      s2.bl_tree[REP_3_6 * 2]++;
    } else if (count2 <= 10) {
      s2.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s2.bl_tree[REPZ_11_138 * 2]++;
    }
    count2 = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s2, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count2 = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count2 < max_count && curlen === nextlen) {
      continue;
    } else if (count2 < min_count) {
      do {
        send_code(s2, curlen, s2.bl_tree);
      } while (--count2 !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s2, curlen, s2.bl_tree);
        count2--;
      }
      send_code(s2, REP_3_6, s2.bl_tree);
      send_bits(s2, count2 - 3, 2);
    } else if (count2 <= 10) {
      send_code(s2, REPZ_3_10, s2.bl_tree);
      send_bits(s2, count2 - 3, 3);
    } else {
      send_code(s2, REPZ_11_138, s2.bl_tree);
      send_bits(s2, count2 - 11, 7);
    }
    count2 = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s2) => {
  let max_blindex;
  scan_tree(s2, s2.dyn_ltree, s2.l_desc.max_code);
  scan_tree(s2, s2.dyn_dtree, s2.d_desc.max_code);
  build_tree(s2, s2.bl_desc);
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s2.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s2.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s2, lcodes, dcodes, blcodes) => {
  let rank2;
  send_bits(s2, lcodes - 257, 5);
  send_bits(s2, dcodes - 1, 5);
  send_bits(s2, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s2, s2.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s2, s2.dyn_ltree, lcodes - 1);
  send_tree(s2, s2.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s2) => {
  let block_mask = 4093624447;
  let n;
  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
    if (block_mask & 1 && s2.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s2.dyn_ltree[9 * 2] !== 0 || s2.dyn_ltree[10 * 2] !== 0 || s2.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s2.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s2) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s2.l_desc = new TreeDesc(s2.dyn_ltree, static_l_desc);
  s2.d_desc = new TreeDesc(s2.dyn_dtree, static_d_desc);
  s2.bl_desc = new TreeDesc(s2.bl_tree, static_bl_desc);
  s2.bi_buf = 0;
  s2.bi_valid = 0;
  init_block(s2);
};
var _tr_stored_block$1 = (s2, buf, stored_len, last) => {
  send_bits(s2, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s2);
  put_short(s2, stored_len);
  put_short(s2, ~stored_len);
  if (stored_len) {
    s2.pending_buf.set(s2.window.subarray(buf, buf + stored_len), s2.pending);
  }
  s2.pending += stored_len;
};
var _tr_align$1 = (s2) => {
  send_bits(s2, STATIC_TREES << 1, 3);
  send_code(s2, END_BLOCK, static_ltree);
  bi_flush(s2);
};
var _tr_flush_block$1 = (s2, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s2.level > 0) {
    if (s2.strm.data_type === Z_UNKNOWN$1) {
      s2.strm.data_type = detect_data_type(s2);
    }
    build_tree(s2, s2.l_desc);
    build_tree(s2, s2.d_desc);
    max_blindex = build_bl_tree(s2);
    opt_lenb = s2.opt_len + 3 + 7 >>> 3;
    static_lenb = s2.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s2, buf, stored_len, last);
  } else if (s2.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s2, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s2, static_ltree, static_dtree);
  } else {
    send_bits(s2, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s2, s2.l_desc.max_code + 1, s2.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s2, s2.dyn_ltree, s2.dyn_dtree);
  }
  init_block(s2);
  if (last) {
    bi_windup(s2);
  }
};
var _tr_tally$1 = (s2, dist, lc) => {
  s2.pending_buf[s2.sym_buf + s2.sym_next++] = dist;
  s2.pending_buf[s2.sym_buf + s2.sym_next++] = dist >> 8;
  s2.pending_buf[s2.sym_buf + s2.sym_next++] = lc;
  if (dist === 0) {
    s2.dyn_ltree[lc * 2]++;
  } else {
    s2.matches++;
    dist--;
    s2.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s2.dyn_dtree[d_code(dist) * 2]++;
  }
  return s2.sym_next === s2.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table2 = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table2[n] = c;
  }
  return table2;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
var constants$2 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f) => {
  return f * 2 - (f > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s2) => {
  let n, m;
  let p2;
  let wsize = s2.w_size;
  n = s2.hash_size;
  p2 = n;
  do {
    m = s2.head[--p2];
    s2.head[p2] = m >= wsize ? m - wsize : 0;
  } while (--n);
  n = wsize;
  p2 = n;
  do {
    m = s2.prev[--p2];
    s2.prev[p2] = m >= wsize ? m - wsize : 0;
  } while (--n);
};
var HASH_ZLIB = (s2, prev, data) => (prev << s2.hash_shift ^ data) & s2.hash_mask;
var HASH = HASH_ZLIB;
var flush_pending = (strm) => {
  const s2 = strm.state;
  let len = s2.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s2.pending_buf.subarray(s2.pending_out, s2.pending_out + len), strm.next_out);
  strm.next_out += len;
  s2.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s2.pending -= len;
  if (s2.pending === 0) {
    s2.pending_out = 0;
  }
};
var flush_block_only = (s2, last) => {
  _tr_flush_block(s2, s2.block_start >= 0 ? s2.block_start : -1, s2.strstart - s2.block_start, last);
  s2.block_start = s2.strstart;
  flush_pending(s2.strm);
};
var put_byte = (s2, b) => {
  s2.pending_buf[s2.pending++] = b;
};
var putShortMSB = (s2, b) => {
  s2.pending_buf[s2.pending++] = b >>> 8 & 255;
  s2.pending_buf[s2.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size) => {
  let len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s2, cur_match) => {
  let chain_length = s2.max_chain_length;
  let scan = s2.strstart;
  let match;
  let len;
  let best_len = s2.prev_length;
  let nice_match = s2.nice_match;
  const limit = s2.strstart > s2.w_size - MIN_LOOKAHEAD ? s2.strstart - (s2.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s2.window;
  const wmask = s2.w_mask;
  const prev = s2.prev;
  const strend = s2.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s2.prev_length >= s2.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s2.lookahead) {
    nice_match = s2.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s2.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s2.lookahead) {
    return best_len;
  }
  return s2.lookahead;
};
var fill_window = (s2) => {
  const _w_size = s2.w_size;
  let n, more, str;
  do {
    more = s2.window_size - s2.lookahead - s2.strstart;
    if (s2.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s2.window.set(s2.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s2.match_start -= _w_size;
      s2.strstart -= _w_size;
      s2.block_start -= _w_size;
      if (s2.insert > s2.strstart) {
        s2.insert = s2.strstart;
      }
      slide_hash(s2);
      more += _w_size;
    }
    if (s2.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s2.strm, s2.window, s2.strstart + s2.lookahead, more);
    s2.lookahead += n;
    if (s2.lookahead + s2.insert >= MIN_MATCH) {
      str = s2.strstart - s2.insert;
      s2.ins_h = s2.window[str];
      s2.ins_h = HASH(s2, s2.ins_h, s2.window[str + 1]);
      while (s2.insert) {
        s2.ins_h = HASH(s2, s2.ins_h, s2.window[str + MIN_MATCH - 1]);
        s2.prev[str & s2.w_mask] = s2.head[s2.ins_h];
        s2.head[s2.ins_h] = str;
        str++;
        s2.insert--;
        if (s2.lookahead + s2.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s2.lookahead < MIN_LOOKAHEAD && s2.strm.avail_in !== 0);
};
var deflate_stored = (s2, flush) => {
  let min_block = s2.pending_buf_size - 5 > s2.w_size ? s2.w_size : s2.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s2.strm.avail_in;
  do {
    len = 65535;
    have = s2.bi_valid + 42 >> 3;
    if (s2.strm.avail_out < have) {
      break;
    }
    have = s2.strm.avail_out - have;
    left = s2.strstart - s2.block_start;
    if (len > left + s2.strm.avail_in) {
      len = left + s2.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s2.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s2.strm.avail_in ? 1 : 0;
    _tr_stored_block(s2, 0, 0, last);
    s2.pending_buf[s2.pending - 4] = len;
    s2.pending_buf[s2.pending - 3] = len >> 8;
    s2.pending_buf[s2.pending - 2] = ~len;
    s2.pending_buf[s2.pending - 1] = ~len >> 8;
    flush_pending(s2.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s2.strm.output.set(s2.window.subarray(s2.block_start, s2.block_start + left), s2.strm.next_out);
      s2.strm.next_out += left;
      s2.strm.avail_out -= left;
      s2.strm.total_out += left;
      s2.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s2.strm, s2.strm.output, s2.strm.next_out, len);
      s2.strm.next_out += len;
      s2.strm.avail_out -= len;
      s2.strm.total_out += len;
    }
  } while (last === 0);
  used -= s2.strm.avail_in;
  if (used) {
    if (used >= s2.w_size) {
      s2.matches = 2;
      s2.window.set(s2.strm.input.subarray(s2.strm.next_in - s2.w_size, s2.strm.next_in), 0);
      s2.strstart = s2.w_size;
      s2.insert = s2.strstart;
    } else {
      if (s2.window_size - s2.strstart <= used) {
        s2.strstart -= s2.w_size;
        s2.window.set(s2.window.subarray(s2.w_size, s2.w_size + s2.strstart), 0);
        if (s2.matches < 2) {
          s2.matches++;
        }
        if (s2.insert > s2.strstart) {
          s2.insert = s2.strstart;
        }
      }
      s2.window.set(s2.strm.input.subarray(s2.strm.next_in - used, s2.strm.next_in), s2.strstart);
      s2.strstart += used;
      s2.insert += used > s2.w_size - s2.insert ? s2.w_size - s2.insert : used;
    }
    s2.block_start = s2.strstart;
  }
  if (s2.high_water < s2.strstart) {
    s2.high_water = s2.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s2.strm.avail_in === 0 && s2.strstart === s2.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s2.window_size - s2.strstart;
  if (s2.strm.avail_in > have && s2.block_start >= s2.w_size) {
    s2.block_start -= s2.w_size;
    s2.strstart -= s2.w_size;
    s2.window.set(s2.window.subarray(s2.w_size, s2.w_size + s2.strstart), 0);
    if (s2.matches < 2) {
      s2.matches++;
    }
    have += s2.w_size;
    if (s2.insert > s2.strstart) {
      s2.insert = s2.strstart;
    }
  }
  if (have > s2.strm.avail_in) {
    have = s2.strm.avail_in;
  }
  if (have) {
    read_buf(s2.strm, s2.window, s2.strstart, have);
    s2.strstart += have;
    s2.insert += have > s2.w_size - s2.insert ? s2.w_size - s2.insert : have;
  }
  if (s2.high_water < s2.strstart) {
    s2.high_water = s2.strstart;
  }
  have = s2.bi_valid + 42 >> 3;
  have = s2.pending_buf_size - have > 65535 ? 65535 : s2.pending_buf_size - have;
  min_block = have > s2.w_size ? s2.w_size : have;
  left = s2.strstart - s2.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s2.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s2.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s2, s2.block_start, len, last);
    s2.block_start += len;
    flush_pending(s2.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s2, flush) => {
  let hash_head;
  let bflush;
  for (; ; ) {
    if (s2.lookahead < MIN_LOOKAHEAD) {
      fill_window(s2);
      if (s2.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s2.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s2.lookahead >= MIN_MATCH) {
      s2.ins_h = HASH(s2, s2.ins_h, s2.window[s2.strstart + MIN_MATCH - 1]);
      hash_head = s2.prev[s2.strstart & s2.w_mask] = s2.head[s2.ins_h];
      s2.head[s2.ins_h] = s2.strstart;
    }
    if (hash_head !== 0 && s2.strstart - hash_head <= s2.w_size - MIN_LOOKAHEAD) {
      s2.match_length = longest_match(s2, hash_head);
    }
    if (s2.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s2, s2.strstart - s2.match_start, s2.match_length - MIN_MATCH);
      s2.lookahead -= s2.match_length;
      if (s2.match_length <= s2.max_lazy_match && s2.lookahead >= MIN_MATCH) {
        s2.match_length--;
        do {
          s2.strstart++;
          s2.ins_h = HASH(s2, s2.ins_h, s2.window[s2.strstart + MIN_MATCH - 1]);
          hash_head = s2.prev[s2.strstart & s2.w_mask] = s2.head[s2.ins_h];
          s2.head[s2.ins_h] = s2.strstart;
        } while (--s2.match_length !== 0);
        s2.strstart++;
      } else {
        s2.strstart += s2.match_length;
        s2.match_length = 0;
        s2.ins_h = s2.window[s2.strstart];
        s2.ins_h = HASH(s2, s2.ins_h, s2.window[s2.strstart + 1]);
      }
    } else {
      bflush = _tr_tally(s2, 0, s2.window[s2.strstart]);
      s2.lookahead--;
      s2.strstart++;
    }
    if (bflush) {
      flush_block_only(s2, false);
      if (s2.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s2.insert = s2.strstart < MIN_MATCH - 1 ? s2.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s2, true);
    if (s2.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s2.sym_next) {
    flush_block_only(s2, false);
    if (s2.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s2, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (; ; ) {
    if (s2.lookahead < MIN_LOOKAHEAD) {
      fill_window(s2);
      if (s2.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s2.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s2.lookahead >= MIN_MATCH) {
      s2.ins_h = HASH(s2, s2.ins_h, s2.window[s2.strstart + MIN_MATCH - 1]);
      hash_head = s2.prev[s2.strstart & s2.w_mask] = s2.head[s2.ins_h];
      s2.head[s2.ins_h] = s2.strstart;
    }
    s2.prev_length = s2.match_length;
    s2.prev_match = s2.match_start;
    s2.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s2.prev_length < s2.max_lazy_match && s2.strstart - hash_head <= s2.w_size - MIN_LOOKAHEAD) {
      s2.match_length = longest_match(s2, hash_head);
      if (s2.match_length <= 5 && (s2.strategy === Z_FILTERED || s2.match_length === MIN_MATCH && s2.strstart - s2.match_start > 4096)) {
        s2.match_length = MIN_MATCH - 1;
      }
    }
    if (s2.prev_length >= MIN_MATCH && s2.match_length <= s2.prev_length) {
      max_insert = s2.strstart + s2.lookahead - MIN_MATCH;
      bflush = _tr_tally(s2, s2.strstart - 1 - s2.prev_match, s2.prev_length - MIN_MATCH);
      s2.lookahead -= s2.prev_length - 1;
      s2.prev_length -= 2;
      do {
        if (++s2.strstart <= max_insert) {
          s2.ins_h = HASH(s2, s2.ins_h, s2.window[s2.strstart + MIN_MATCH - 1]);
          hash_head = s2.prev[s2.strstart & s2.w_mask] = s2.head[s2.ins_h];
          s2.head[s2.ins_h] = s2.strstart;
        }
      } while (--s2.prev_length !== 0);
      s2.match_available = 0;
      s2.match_length = MIN_MATCH - 1;
      s2.strstart++;
      if (bflush) {
        flush_block_only(s2, false);
        if (s2.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s2.match_available) {
      bflush = _tr_tally(s2, 0, s2.window[s2.strstart - 1]);
      if (bflush) {
        flush_block_only(s2, false);
      }
      s2.strstart++;
      s2.lookahead--;
      if (s2.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s2.match_available = 1;
      s2.strstart++;
      s2.lookahead--;
    }
  }
  if (s2.match_available) {
    bflush = _tr_tally(s2, 0, s2.window[s2.strstart - 1]);
    s2.match_available = 0;
  }
  s2.insert = s2.strstart < MIN_MATCH - 1 ? s2.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s2, true);
    if (s2.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s2.sym_next) {
    flush_block_only(s2, false);
    if (s2.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s2, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s2.window;
  for (; ; ) {
    if (s2.lookahead <= MAX_MATCH) {
      fill_window(s2);
      if (s2.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s2.lookahead === 0) {
        break;
      }
    }
    s2.match_length = 0;
    if (s2.lookahead >= MIN_MATCH && s2.strstart > 0) {
      scan = s2.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s2.strstart + MAX_MATCH;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s2.match_length = MAX_MATCH - (strend - scan);
        if (s2.match_length > s2.lookahead) {
          s2.match_length = s2.lookahead;
        }
      }
    }
    if (s2.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s2, 1, s2.match_length - MIN_MATCH);
      s2.lookahead -= s2.match_length;
      s2.strstart += s2.match_length;
      s2.match_length = 0;
    } else {
      bflush = _tr_tally(s2, 0, s2.window[s2.strstart]);
      s2.lookahead--;
      s2.strstart++;
    }
    if (bflush) {
      flush_block_only(s2, false);
      if (s2.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s2.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s2, true);
    if (s2.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s2.sym_next) {
    flush_block_only(s2, false);
    if (s2.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s2, flush) => {
  let bflush;
  for (; ; ) {
    if (s2.lookahead === 0) {
      fill_window(s2);
      if (s2.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s2.match_length = 0;
    bflush = _tr_tally(s2, 0, s2.window[s2.strstart]);
    s2.lookahead--;
    s2.strstart++;
    if (bflush) {
      flush_block_only(s2, false);
      if (s2.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s2.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s2, true);
    if (s2.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s2.sym_next) {
    flush_block_only(s2, false);
    if (s2.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
var lm_init = (s2) => {
  s2.window_size = 2 * s2.w_size;
  zero(s2.head);
  s2.max_lazy_match = configuration_table[s2.level].max_lazy;
  s2.good_match = configuration_table[s2.level].good_length;
  s2.nice_match = configuration_table[s2.level].nice_length;
  s2.max_chain_length = configuration_table[s2.level].max_chain;
  s2.strstart = 0;
  s2.block_start = 0;
  s2.lookahead = 0;
  s2.insert = 0;
  s2.match_length = s2.prev_length = MIN_MATCH - 1;
  s2.match_available = 0;
  s2.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s2 = strm.state;
  if (!s2 || s2.strm !== strm || s2.status !== INIT_STATE && //#ifdef GZIP
  s2.status !== GZIP_STATE && //#endif
  s2.status !== EXTRA_STATE && s2.status !== NAME_STATE && s2.status !== COMMENT_STATE && s2.status !== HCRC_STATE && s2.status !== BUSY_STATE && s2.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s2 = strm.state;
  s2.pending = 0;
  s2.pending_out = 0;
  if (s2.wrap < 0) {
    s2.wrap = -s2.wrap;
  }
  s2.status = //#ifdef GZIP
  s2.wrap === 2 ? GZIP_STATE : (
    //#endif
    s2.wrap ? INIT_STATE : BUSY_STATE
  );
  strm.adler = s2.wrap === 2 ? 0 : 1;
  s2.last_flush = -2;
  _tr_init(s2);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head2) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head2;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap3 = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap3 = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap3 = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap3 !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s2 = new DeflateState();
  strm.state = s2;
  s2.strm = strm;
  s2.status = INIT_STATE;
  s2.wrap = wrap3;
  s2.gzhead = null;
  s2.w_bits = windowBits;
  s2.w_size = 1 << s2.w_bits;
  s2.w_mask = s2.w_size - 1;
  s2.hash_bits = memLevel + 7;
  s2.hash_size = 1 << s2.hash_bits;
  s2.hash_mask = s2.hash_size - 1;
  s2.hash_shift = ~~((s2.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s2.window = new Uint8Array(s2.w_size * 2);
  s2.head = new Uint16Array(s2.hash_size);
  s2.prev = new Uint16Array(s2.w_size);
  s2.lit_bufsize = 1 << memLevel + 6;
  s2.pending_buf_size = s2.lit_bufsize * 4;
  s2.pending_buf = new Uint8Array(s2.pending_buf_size);
  s2.sym_buf = s2.lit_bufsize;
  s2.sym_end = (s2.lit_bufsize - 1) * 3;
  s2.level = level;
  s2.strategy = strategy;
  s2.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s2 = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s2.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }
  const old_flush = s2.last_flush;
  s2.last_flush = flush;
  if (s2.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s2.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s2.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s2.status === INIT_STATE && s2.wrap === 0) {
    s2.status = BUSY_STATE;
  }
  if (s2.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s2.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s2.strategy >= Z_HUFFMAN_ONLY || s2.level < 2) {
      level_flags = 0;
    } else if (s2.level < 6) {
      level_flags = 1;
    } else if (s2.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s2.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s2, header);
    if (s2.strstart !== 0) {
      putShortMSB(s2, strm.adler >>> 16);
      putShortMSB(s2, strm.adler & 65535);
    }
    strm.adler = 1;
    s2.status = BUSY_STATE;
    flush_pending(strm);
    if (s2.pending !== 0) {
      s2.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s2.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s2, 31);
    put_byte(s2, 139);
    put_byte(s2, 8);
    if (!s2.gzhead) {
      put_byte(s2, 0);
      put_byte(s2, 0);
      put_byte(s2, 0);
      put_byte(s2, 0);
      put_byte(s2, 0);
      put_byte(s2, s2.level === 9 ? 2 : s2.strategy >= Z_HUFFMAN_ONLY || s2.level < 2 ? 4 : 0);
      put_byte(s2, OS_CODE);
      s2.status = BUSY_STATE;
      flush_pending(strm);
      if (s2.pending !== 0) {
        s2.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(
        s2,
        (s2.gzhead.text ? 1 : 0) + (s2.gzhead.hcrc ? 2 : 0) + (!s2.gzhead.extra ? 0 : 4) + (!s2.gzhead.name ? 0 : 8) + (!s2.gzhead.comment ? 0 : 16)
      );
      put_byte(s2, s2.gzhead.time & 255);
      put_byte(s2, s2.gzhead.time >> 8 & 255);
      put_byte(s2, s2.gzhead.time >> 16 & 255);
      put_byte(s2, s2.gzhead.time >> 24 & 255);
      put_byte(s2, s2.level === 9 ? 2 : s2.strategy >= Z_HUFFMAN_ONLY || s2.level < 2 ? 4 : 0);
      put_byte(s2, s2.gzhead.os & 255);
      if (s2.gzhead.extra && s2.gzhead.extra.length) {
        put_byte(s2, s2.gzhead.extra.length & 255);
        put_byte(s2, s2.gzhead.extra.length >> 8 & 255);
      }
      if (s2.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s2.pending_buf, s2.pending, 0);
      }
      s2.gzindex = 0;
      s2.status = EXTRA_STATE;
    }
  }
  if (s2.status === EXTRA_STATE) {
    if (s2.gzhead.extra) {
      let beg = s2.pending;
      let left = (s2.gzhead.extra.length & 65535) - s2.gzindex;
      while (s2.pending + left > s2.pending_buf_size) {
        let copy = s2.pending_buf_size - s2.pending;
        s2.pending_buf.set(s2.gzhead.extra.subarray(s2.gzindex, s2.gzindex + copy), s2.pending);
        s2.pending = s2.pending_buf_size;
        if (s2.gzhead.hcrc && s2.pending > beg) {
          strm.adler = crc32_1(strm.adler, s2.pending_buf, s2.pending - beg, beg);
        }
        s2.gzindex += copy;
        flush_pending(strm);
        if (s2.pending !== 0) {
          s2.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s2.gzhead.extra);
      s2.pending_buf.set(gzhead_extra.subarray(s2.gzindex, s2.gzindex + left), s2.pending);
      s2.pending += left;
      if (s2.gzhead.hcrc && s2.pending > beg) {
        strm.adler = crc32_1(strm.adler, s2.pending_buf, s2.pending - beg, beg);
      }
      s2.gzindex = 0;
    }
    s2.status = NAME_STATE;
  }
  if (s2.status === NAME_STATE) {
    if (s2.gzhead.name) {
      let beg = s2.pending;
      let val;
      do {
        if (s2.pending === s2.pending_buf_size) {
          if (s2.gzhead.hcrc && s2.pending > beg) {
            strm.adler = crc32_1(strm.adler, s2.pending_buf, s2.pending - beg, beg);
          }
          flush_pending(strm);
          if (s2.pending !== 0) {
            s2.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s2.gzindex < s2.gzhead.name.length) {
          val = s2.gzhead.name.charCodeAt(s2.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s2, val);
      } while (val !== 0);
      if (s2.gzhead.hcrc && s2.pending > beg) {
        strm.adler = crc32_1(strm.adler, s2.pending_buf, s2.pending - beg, beg);
      }
      s2.gzindex = 0;
    }
    s2.status = COMMENT_STATE;
  }
  if (s2.status === COMMENT_STATE) {
    if (s2.gzhead.comment) {
      let beg = s2.pending;
      let val;
      do {
        if (s2.pending === s2.pending_buf_size) {
          if (s2.gzhead.hcrc && s2.pending > beg) {
            strm.adler = crc32_1(strm.adler, s2.pending_buf, s2.pending - beg, beg);
          }
          flush_pending(strm);
          if (s2.pending !== 0) {
            s2.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s2.gzindex < s2.gzhead.comment.length) {
          val = s2.gzhead.comment.charCodeAt(s2.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s2, val);
      } while (val !== 0);
      if (s2.gzhead.hcrc && s2.pending > beg) {
        strm.adler = crc32_1(strm.adler, s2.pending_buf, s2.pending - beg, beg);
      }
    }
    s2.status = HCRC_STATE;
  }
  if (s2.status === HCRC_STATE) {
    if (s2.gzhead.hcrc) {
      if (s2.pending + 2 > s2.pending_buf_size) {
        flush_pending(strm);
        if (s2.pending !== 0) {
          s2.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s2, strm.adler & 255);
      put_byte(s2, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s2.status = BUSY_STATE;
    flush_pending(strm);
    if (s2.pending !== 0) {
      s2.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s2.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s2.status !== FINISH_STATE) {
    let bstate = s2.level === 0 ? deflate_stored(s2, flush) : s2.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s2, flush) : s2.strategy === Z_RLE ? deflate_rle(s2, flush) : configuration_table[s2.level].func(s2, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s2.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s2.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s2);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s2, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s2.head);
          if (s2.lookahead === 0) {
            s2.strstart = 0;
            s2.block_start = 0;
            s2.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s2.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s2.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s2.wrap === 2) {
    put_byte(s2, strm.adler & 255);
    put_byte(s2, strm.adler >> 8 & 255);
    put_byte(s2, strm.adler >> 16 & 255);
    put_byte(s2, strm.adler >> 24 & 255);
    put_byte(s2, strm.total_in & 255);
    put_byte(s2, strm.total_in >> 8 & 255);
    put_byte(s2, strm.total_in >> 16 & 255);
    put_byte(s2, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s2, strm.adler >>> 16);
    putShortMSB(s2, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s2.wrap > 0) {
    s2.wrap = -s2.wrap;
  }
  return s2.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s2 = strm.state;
  const wrap3 = s2.wrap;
  if (wrap3 === 2 || wrap3 === 1 && s2.status !== INIT_STATE || s2.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap3 === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s2.wrap = 0;
  if (dictLength >= s2.w_size) {
    if (wrap3 === 0) {
      zero(s2.head);
      s2.strstart = 0;
      s2.block_start = 0;
      s2.insert = 0;
    }
    let tmpDict = new Uint8Array(s2.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s2.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s2.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s2);
  while (s2.lookahead >= MIN_MATCH) {
    let str = s2.strstart;
    let n = s2.lookahead - (MIN_MATCH - 1);
    do {
      s2.ins_h = HASH(s2, s2.ins_h, s2.window[str + MIN_MATCH - 1]);
      s2.prev[str & s2.w_mask] = s2.head[s2.ins_h];
      s2.head[s2.ins_h] = str;
      str++;
    } while (--n);
    s2.strstart = str;
    s2.lookahead = MIN_MATCH - 1;
    fill_window(s2);
  }
  s2.strstart += s2.lookahead;
  s2.block_start = s2.strstart;
  s2.insert = s2.lookahead;
  s2.lookahead = 0;
  s2.match_length = s2.prev_length = MIN_MATCH - 1;
  s2.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s2.wrap = wrap3;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key2) => {
  return Object.prototype.hasOwnProperty.call(obj, key2);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p2 in source) {
      if (_has(source, p2)) {
        obj[p2] = source[p2];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks) => {
  let len = 0;
  for (let i = 0, l = chunks.length; i < l; i++) {
    len += chunks[i].length;
  }
  const result = new Uint8Array(len);
  for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q = 0; q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (str) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }
  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i = 0; i < len; ) {
    let c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode)
    _flush_mode = flush_mode;
  else
    _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0)
      break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist;
  let from;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]);
var dbase = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type, lens, lens_index, codes, table2, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root4 = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask;
  let next;
  let base3 = null;
  let match;
  const count2 = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count2[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count2[lens[lens_index + sym]]++;
  }
  root4 = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count2[max] !== 0) {
      break;
    }
  }
  if (root4 > max) {
    root4 = max;
  }
  if (max === 0) {
    table2[table_index++] = 1 << 24 | 64 << 16 | 0;
    table2[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count2[min] !== 0) {
      break;
    }
  }
  if (root4 < min) {
    root4 = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count2[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count2[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base3 = extra = work;
    match = 20;
  } else if (type === LENS$1) {
    base3 = lbase;
    extra = lext;
    match = 257;
  } else {
    base3 = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root4;
  drop = 0;
  low = -1;
  used = 1 << root4;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base3[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table2[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count2[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root4 && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root4;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count2[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table2[low] = root4 << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table2[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root4;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q) => {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap3;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap3 = 0;
    windowBits = -windowBits;
  } else {
    wrap3 = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap3;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState();
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist;
  const state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n;
  const order2 = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(
                  input.subarray(
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    next + copy
                  ),
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case COPY_:
          state.mode = COPY;
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order2[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order2[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case LEN_:
          state.mode = LEN;
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
              state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
      ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head2) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head2;
  head2.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} = constants$2;
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader();
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended)
    return false;
  if (flush_mode === ~~flush_mode)
    _flush_mode = flush_mode;
  else
    _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail)
            strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }
    if (status === Z_OK && last_avail_out === 0)
      continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0)
      break;
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input);
  if (inflator.err)
    throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var Deflate_1 = Deflate;
var deflate_1 = deflate;
var deflateRaw_1 = deflateRaw;
var gzip_1 = gzip;
var Inflate_1 = Inflate;
var inflate_1 = inflate;
var inflateRaw_1 = inflateRaw;
var ungzip_1 = ungzip;
var constants_1 = constants$2;
var pako = {
  Deflate: Deflate_1,
  deflate: deflate_1,
  deflateRaw: deflateRaw_1,
  gzip: gzip_1,
  Inflate: Inflate_1,
  inflate: inflate_1,
  inflateRaw: inflateRaw_1,
  ungzip: ungzip_1,
  constants: constants_1
};

// node_modules/bail/index.js
function bail(error) {
  if (error) {
    throw error;
  }
}

// node_modules/unified/lib/index.js
var import_is_buffer2 = __toESM(require_is_buffer(), 1);
var import_extend = __toESM(require_extend(), 1);

// node_modules/is-plain-obj/index.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}

// node_modules/trough/index.js
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn) {
        wrap(fn, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = (
        /** @type {Error} */
        error
      );
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}

// node_modules/vfile/lib/index.js
var import_is_buffer = __toESM(require_is_buffer(), 1);

// node_modules/unist-util-stringify-position/lib/index.js
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point(value);
  }
  return "";
}
function point(point5) {
  return index(point5 && point5.line) + ":" + index(point5 && point5.column);
}
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}

// node_modules/vfile-message/index.js
var VFileMessage = class extends Error {
  /**
   * Create a message for `reason` at `place` from `origin`.
   *
   * When an error is passed in as `reason`, the `stack` is copied.
   *
   * @param {string|Error|VFileMessage} reason
   *   Reason for message.
   *   Uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place at which the message occurred in a file.
   * @param {string} [origin]
   *   Place in code the message originates from (example `'my-package:my-rule-name'`)
   */
  constructor(reason, place, origin) {
    const parts = [null, null];
    let position4 = {
      // @ts-expect-error: we always follows the structure of `position`.
      start: { line: null, column: null },
      // @ts-expect-error: "
      end: { line: null, column: null }
    };
    super();
    if (typeof place === "string") {
      origin = place;
      place = void 0;
    }
    if (typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        parts[1] = origin;
      } else {
        parts[0] = origin.slice(0, index2);
        parts[1] = origin.slice(index2 + 1);
      }
    }
    if (place) {
      if ("type" in place || "position" in place) {
        if (place.position) {
          position4 = place.position;
        }
      } else if ("start" in place || "end" in place) {
        position4 = place;
      } else if ("line" in place || "column" in place) {
        position4.start = place;
      }
    }
    this.name = stringifyPosition(place) || "1:1";
    this.message = typeof reason === "object" ? reason.message : reason;
    this.stack = "";
    if (typeof reason === "object" && reason.stack) {
      this.stack = reason.stack;
    }
    this.reason = this.message;
    this.fatal;
    this.line = position4.start.line;
    this.column = position4.start.column;
    this.position = position4;
    this.source = parts[0];
    this.ruleId = parts[1];
    this.file;
    this.actual;
    this.expected;
    this.url;
    this.note;
  }
};
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.fatal = null;
VFileMessage.prototype.column = null;
VFileMessage.prototype.line = null;
VFileMessage.prototype.source = null;
VFileMessage.prototype.ruleId = null;
VFileMessage.prototype.position = null;

// node_modules/vfile/lib/minpath.browser.js
var path = { basename, dirname, extname, join, sep: "/" };
function basename(path5, ext) {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath(path5);
  let start = 0;
  let end = -1;
  let index2 = path5.length;
  let seenNonSlash;
  if (ext === void 0 || ext.length === 0 || ext.length > path5.length) {
    while (index2--) {
      if (path5.charCodeAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else if (end < 0) {
        seenNonSlash = true;
        end = index2 + 1;
      }
    }
    return end < 0 ? "" : path5.slice(start, end);
  }
  if (ext === path5) {
    return "";
  }
  let firstNonSlashEnd = -1;
  let extIndex = ext.length - 1;
  while (index2--) {
    if (path5.charCodeAt(index2) === 47) {
      if (seenNonSlash) {
        start = index2 + 1;
        break;
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true;
        firstNonSlashEnd = index2 + 1;
      }
      if (extIndex > -1) {
        if (path5.charCodeAt(index2) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            end = index2;
          }
        } else {
          extIndex = -1;
          end = firstNonSlashEnd;
        }
      }
    }
  }
  if (start === end) {
    end = firstNonSlashEnd;
  } else if (end < 0) {
    end = path5.length;
  }
  return path5.slice(start, end);
}
function dirname(path5) {
  assertPath(path5);
  if (path5.length === 0) {
    return ".";
  }
  let end = -1;
  let index2 = path5.length;
  let unmatchedSlash;
  while (--index2) {
    if (path5.charCodeAt(index2) === 47) {
      if (unmatchedSlash) {
        end = index2;
        break;
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true;
    }
  }
  return end < 0 ? path5.charCodeAt(0) === 47 ? "/" : "." : end === 1 && path5.charCodeAt(0) === 47 ? "//" : path5.slice(0, end);
}
function extname(path5) {
  assertPath(path5);
  let index2 = path5.length;
  let end = -1;
  let startPart = 0;
  let startDot = -1;
  let preDotState = 0;
  let unmatchedSlash;
  while (index2--) {
    const code3 = path5.charCodeAt(index2);
    if (code3 === 47) {
      if (unmatchedSlash) {
        startPart = index2 + 1;
        break;
      }
      continue;
    }
    if (end < 0) {
      unmatchedSlash = true;
      end = index2 + 1;
    }
    if (code3 === 46) {
      if (startDot < 0) {
        startDot = index2;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot > -1) {
      preDotState = -1;
    }
  }
  if (startDot < 0 || end < 0 || // We saw a non-dot character immediately before the dot.
  preDotState === 0 || // The (right-most) trimmed path component is exactly `..`.
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return "";
  }
  return path5.slice(startDot, end);
}
function join(...segments) {
  let index2 = -1;
  let joined;
  while (++index2 < segments.length) {
    assertPath(segments[index2]);
    if (segments[index2]) {
      joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
    }
  }
  return joined === void 0 ? "." : normalize(joined);
}
function normalize(path5) {
  assertPath(path5);
  const absolute = path5.charCodeAt(0) === 47;
  let value = normalizeString(path5, !absolute);
  if (value.length === 0 && !absolute) {
    value = ".";
  }
  if (value.length > 0 && path5.charCodeAt(path5.length - 1) === 47) {
    value += "/";
  }
  return absolute ? "/" + value : value;
}
function normalizeString(path5, allowAboveRoot) {
  let result = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let index2 = -1;
  let code3;
  let lastSlashIndex;
  while (++index2 <= path5.length) {
    if (index2 < path5.length) {
      code3 = path5.charCodeAt(index2);
    } else if (code3 === 47) {
      break;
    } else {
      code3 = 47;
    }
    if (code3 === 47) {
      if (lastSlash === index2 - 1 || dots === 1) {
      } else if (lastSlash !== index2 - 1 && dots === 2) {
        if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = "";
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
              }
              lastSlash = index2;
              dots = 0;
              continue;
            }
          } else if (result.length > 0) {
            result = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += "/" + path5.slice(lastSlash + 1, index2);
        } else {
          result = path5.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (code3 === 46 && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }
  return result;
}
function assertPath(path5) {
  if (typeof path5 !== "string") {
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(path5)
    );
  }
}

// node_modules/vfile/lib/minproc.browser.js
var proc = { cwd };
function cwd() {
  return "/";
}

// node_modules/vfile/lib/minurl.shared.js
function isUrl(fileURLOrPath) {
  return fileURLOrPath !== null && typeof fileURLOrPath === "object" && // @ts-expect-error: indexable.
  fileURLOrPath.href && // @ts-expect-error: indexable.
  fileURLOrPath.origin;
}

// node_modules/vfile/lib/minurl.browser.js
function urlToPath(path5) {
  if (typeof path5 === "string") {
    path5 = new URL(path5);
  } else if (!isUrl(path5)) {
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + path5 + "`"
    );
    error.code = "ERR_INVALID_ARG_TYPE";
    throw error;
  }
  if (path5.protocol !== "file:") {
    const error = new TypeError("The URL must be of scheme file");
    error.code = "ERR_INVALID_URL_SCHEME";
    throw error;
  }
  return getPathFromURLPosix(path5);
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    error.code = "ERR_INVALID_FILE_URL_HOST";
    throw error;
  }
  const pathname = url.pathname;
  let index2 = -1;
  while (++index2 < pathname.length) {
    if (pathname.charCodeAt(index2) === 37 && pathname.charCodeAt(index2 + 1) === 50) {
      const third = pathname.charCodeAt(index2 + 2);
      if (third === 70 || third === 102) {
        const error = new TypeError(
          "File URL path must not include encoded / characters"
        );
        error.code = "ERR_INVALID_FILE_URL_PATH";
        throw error;
      }
    }
  }
  return decodeURIComponent(pathname);
}

// node_modules/vfile/lib/index.js
var order = ["history", "path", "basename", "stem", "extname", "dirname"];
var VFile = class {
  /**
   * Create a new virtual file.
   *
   * If `options` is `string` or `Buffer`, it’s treated as `{value: options}`.
   * If `options` is a `URL`, it’s treated as `{path: options}`.
   * If `options` is a `VFile`, shallow copies its data over to the new file.
   * All fields in `options` are set on the newly created `VFile`.
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * It’s not possible to set either `dirname` or `extname` without setting
   * either `history`, `path`, `basename`, or `stem` as well.
   *
   * @param {Compatible} [value]
   */
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (typeof value === "string" || (0, import_is_buffer.default)(value)) {
      options = { value };
    } else if (isUrl(value)) {
      options = { path: value };
    } else {
      options = value;
    }
    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = proc.cwd();
    this.value;
    this.stored;
    this.result;
    this.map;
    let index2 = -1;
    while (++index2 < order.length) {
      const prop2 = order[index2];
      if (prop2 in options && options[prop2] !== void 0) {
        this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2];
      }
    }
    let prop;
    for (prop in options) {
      if (!order.includes(prop))
        this[prop] = options[prop];
    }
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   * @returns {string}
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   * @param {string|URL} path
   */
  set path(path5) {
    if (isUrl(path5)) {
      path5 = urlToPath(path5);
    }
    assertNonEmpty(path5, "path");
    if (this.path !== path5) {
      this.history.push(path5);
    }
  }
  /**
   * Get the parent path (example: `'~'`).
   */
  get dirname() {
    return typeof this.path === "string" ? path.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   * Cannot be set if there’s no `path` yet.
   */
  set dirname(dirname2) {
    assertPath2(this.basename, "dirname");
    this.path = path.join(dirname2 || "", this.basename);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   */
  get basename() {
    return typeof this.path === "string" ? path.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set basename(basename2) {
    assertNonEmpty(basename2, "basename");
    assertPart(basename2, "basename");
    this.path = path.join(this.dirname || "", basename2);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   */
  get extname() {
    return typeof this.path === "string" ? path.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   */
  set extname(extname2) {
    assertPart(extname2, "extname");
    assertPath2(this.dirname, "extname");
    if (extname2) {
      if (extname2.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = path.join(this.dirname, this.stem + (extname2 || ""));
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   */
  get stem() {
    return typeof this.path === "string" ? path.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   */
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = path.join(this.dirname || "", stem + (this.extname || ""));
  }
  /**
   * Serialize the file.
   *
   * @param {BufferEncoding} [encoding='utf8']
   *   When `value` is a `Buffer`, `encoding` is a character encoding to
   *   understand it as (default: `'utf8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(encoding) {
    return (this.value || "").toString(encoding);
  }
  /**
   * Constructs a new `VFileMessage`, where `fatal` is set to `false`, and
   * associates it with the file by adding it to `vfile.messages` and setting
   * `message.file` to the current filepath.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  message(reason, place, origin) {
    const message = new VFileMessage(reason, place, origin);
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  /**
   * Like `VFile#message()`, but associates an informational message where
   * `fatal` is set to `null`.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {VFileMessage}
   *   Message.
   */
  info(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = null;
    return message;
  }
  /**
   * Like `VFile#message()`, but associates a fatal message where `fatal` is
   * set to `true`, and then immediately throws it.
   *
   * > 👉 **Note**: a fatal error means that a file is no longer processable.
   *
   * @param {string|Error|VFileMessage} reason
   *   Human readable reason for the message, uses the stack and message of the error if given.
   * @param {Node|NodeLike|Position|Point} [place]
   *   Place where the message occurred in the file.
   * @param {string} [origin]
   *   Computer readable reason for the message
   * @returns {never}
   *   Message.
   */
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = true;
    throw message;
  }
};
function assertPart(part, name2) {
  if (part && part.includes(path.sep)) {
    throw new Error(
      "`" + name2 + "` cannot be a path: did not expect `" + path.sep + "`"
    );
  }
}
function assertNonEmpty(part, name2) {
  if (!part) {
    throw new Error("`" + name2 + "` cannot be empty");
  }
}
function assertPath2(path5, name2) {
  if (!path5) {
    throw new Error("Setting `" + name2 + "` requires `path` to be set too");
  }
}

// node_modules/unified/lib/index.js
var unified = base().freeze();
var own = {}.hasOwnProperty;
function base() {
  const transformers = trough();
  const attachers = [];
  let namespace = {};
  let frozen;
  let freezeIndex = -1;
  processor.data = data;
  processor.Parser = void 0;
  processor.Compiler = void 0;
  processor.freeze = freeze;
  processor.attachers = attachers;
  processor.use = use;
  processor.parse = parse6;
  processor.stringify = stringify3;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;
  return processor;
  function processor() {
    const destination = base();
    let index2 = -1;
    while (++index2 < attachers.length) {
      destination.use(...attachers[index2]);
    }
    destination.data((0, import_extend.default)(true, {}, namespace));
    return destination;
  }
  function data(key2, value) {
    if (typeof key2 === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", frozen);
        namespace[key2] = value;
        return processor;
      }
      return own.call(namespace, key2) && namespace[key2] || null;
    }
    if (key2) {
      assertUnfrozen("data", frozen);
      namespace = key2;
      return processor;
    }
    return namespace;
  }
  function freeze() {
    if (frozen) {
      return processor;
    }
    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(processor, ...options);
      if (typeof transformer === "function") {
        transformers.use(transformer);
      }
    }
    frozen = true;
    freezeIndex = Number.POSITIVE_INFINITY;
    return processor;
  }
  function use(value, ...options) {
    let settings;
    assertUnfrozen("use", frozen);
    if (value === null || value === void 0) {
    } else if (typeof value === "function") {
      addPlugin(value, ...options);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings);
    }
    return processor;
    function add2(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...options2] = value2;
          addPlugin(plugin, ...options2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      addList(result.plugins);
      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0) {
      } else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add2(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, value2) {
      let index2 = -1;
      let entry;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entry = attachers[index2];
          break;
        }
      }
      if (entry) {
        if (isPlainObject(entry[1]) && isPlainObject(value2)) {
          value2 = (0, import_extend.default)(true, entry[1], value2);
        }
        entry[1] = value2;
      } else {
        attachers.push([...arguments]);
      }
    }
  }
  function parse6(doc) {
    processor.freeze();
    const file = vfile(doc);
    const Parser = processor.Parser;
    assertParser("parse", Parser);
    if (newable(Parser, "parse")) {
      return new Parser(String(file), file).parse();
    }
    return Parser(String(file), file);
  }
  function stringify3(node2, doc) {
    processor.freeze();
    const file = vfile(doc);
    const Compiler = processor.Compiler;
    assertCompiler("stringify", Compiler);
    assertNode(node2);
    if (newable(Compiler, "compile")) {
      return new Compiler(node2, file).compile();
    }
    return Compiler(node2, file);
  }
  function run(node2, doc, callback) {
    assertNode(node2);
    processor.freeze();
    if (!callback && typeof doc === "function") {
      callback = doc;
      doc = void 0;
    }
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      transformers.run(node2, vfile(doc), done);
      function done(error, tree, file) {
        tree = tree || node2;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          callback(null, tree, file);
        }
      }
    }
  }
  function runSync(node2, file) {
    let result;
    let complete;
    processor.run(node2, file, done);
    assertDone("runSync", "run", complete);
    return result;
    function done(error, tree) {
      bail(error);
      result = tree;
      complete = true;
    }
  }
  function process(doc, callback) {
    processor.freeze();
    assertParser("process", processor.Parser);
    assertCompiler("process", processor.Compiler);
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      const file = vfile(doc);
      processor.run(processor.parse(file), file, (error, tree, file2) => {
        if (error || !tree || !file2) {
          done(error);
        } else {
          const result = processor.stringify(tree, file2);
          if (result === void 0 || result === null) {
          } else if (looksLikeAVFileValue(result)) {
            file2.value = result;
          } else {
            file2.result = result;
          }
          done(error, file2);
        }
      });
      function done(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          callback(null, file2);
        }
      }
    }
  }
  function processSync(doc) {
    let complete;
    processor.freeze();
    assertParser("processSync", processor.Parser);
    assertCompiler("processSync", processor.Compiler);
    const file = vfile(doc);
    processor.process(file, done);
    assertDone("processSync", "process", complete);
    return file;
    function done(error) {
      complete = true;
      bail(error);
    }
  }
}
function newable(value, name2) {
  return typeof value === "function" && // Prototypes do exist.
  // type-coverage:ignore-next-line
  value.prototype && // A function with keys in its prototype is probably a constructor.
  // Classes’ prototype methods are not enumerable, so we check if some value
  // exists in the prototype.
  // type-coverage:ignore-next-line
  (keys(value.prototype) || name2 in value.prototype);
}
function keys(value) {
  let key2;
  for (key2 in value) {
    if (own.call(value, key2)) {
      return true;
    }
  }
  return false;
}
function assertParser(name2, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name2 + "` without `Parser`");
  }
}
function assertCompiler(name2, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name2 + "` without `Compiler`");
  }
}
function assertUnfrozen(name2, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name2 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node2) {
  if (!isPlainObject(node2) || typeof node2.type !== "string") {
    throw new TypeError("Expected node, got `" + node2 + "`");
  }
}
function assertDone(name2, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name2 + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function looksLikeAVFileValue(value) {
  return typeof value === "string" || (0, import_is_buffer2.default)(value);
}

// node_modules/mdast-util-to-string/lib/index.js
function toString2(value, options) {
  const includeImageAlt = (options || {}).includeImageAlt;
  return one(
    value,
    typeof includeImageAlt === "boolean" ? includeImageAlt : true
  );
}
function one(value, includeImageAlt) {
  return node(value) && ("value" in value && value.value || includeImageAlt && "alt" in value && value.alt || "children" in value && all(value.children, includeImageAlt)) || Array.isArray(value) && all(value, includeImageAlt) || "";
}
function all(values, includeImageAlt) {
  const result = [];
  let index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one(values[index2], includeImageAlt);
  }
  return result.join("");
}
function node(value) {
  return Boolean(value && typeof value === "object");
}

// node_modules/micromark-util-chunked/index.js
function splice(list3, start, remove, items) {
  const end = list3.length;
  let chunkStart = 0;
  let parameters;
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    [].splice.apply(list3, parameters);
  } else {
    if (remove)
      [].splice.apply(list3, [start, remove]);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start, 0);
      [].splice.apply(list3, parameters);
      chunkStart += 1e4;
      start += 1e4;
    }
  }
}
function push(list3, items) {
  if (list3.length > 0) {
    splice(list3, list3.length, 0, items);
    return list3;
  }
  return items;
}

// node_modules/micromark-util-combine-extensions/index.js
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all7 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all7, extensions[index2]);
  }
  return all7;
}
function syntaxExtension(all7, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all7, hook) ? all7[hook] : void 0;
    const left = maybe || (all7[hook] = {});
    const right = extension2[hook];
    let code3;
    for (code3 in right) {
      if (!hasOwnProperty.call(left, code3))
        left[code3] = [];
      const value = right[code3];
      constructs(
        // @ts-expect-error Looks like a list.
        left[code3],
        Array.isArray(value) ? value : value ? [value] : []
      );
    }
  }
}
function constructs(existing, list3) {
  let index2 = -1;
  const before = [];
  while (++index2 < list3.length) {
    ;
    (list3[index2].add === "after" ? existing : before).push(list3[index2]);
  }
  splice(existing, 0, 0, before);
}

// node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
var unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

// node_modules/micromark-util-character/index.js
var asciiAlpha = regexCheck(/[A-Za-z]/);
var asciiDigit = regexCheck(/\d/);
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code3) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code3 !== null && (code3 < 32 || code3 === 127)
  );
}
function markdownLineEndingOrSpace(code3) {
  return code3 !== null && (code3 < 0 || code3 === 32);
}
function markdownLineEnding(code3) {
  return code3 !== null && code3 < -2;
}
function markdownSpace(code3) {
  return code3 === -2 || code3 === -1 || code3 === 32;
}
var unicodeWhitespace = regexCheck(/\s/);
var unicodePunctuation = regexCheck(unicodePunctuationRegex);
function regexCheck(regex) {
  return check;
  function check(code3) {
    return code3 !== null && regex.test(String.fromCharCode(code3));
  }
}

// node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok2, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;
  function start(code3) {
    if (markdownSpace(code3)) {
      effects.enter(type);
      return prefix(code3);
    }
    return ok2(code3);
  }
  function prefix(code3) {
    if (markdownSpace(code3) && size++ < limit) {
      effects.consume(code3);
      return prefix;
    }
    effects.exit(type);
    return ok2(code3);
  }
}

// node_modules/micromark/lib/initialize/content.js
var content = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  let previous3;
  return contentStart;
  function afterContentStartConstruct(code3) {
    if (code3 === null) {
      effects.consume(code3);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code3) {
    effects.enter("paragraph");
    return lineStart(code3);
  }
  function lineStart(code3) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous3
    });
    if (previous3) {
      previous3.next = token;
    }
    previous3 = token;
    return data(code3);
  }
  function data(code3) {
    if (code3 === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code3);
      return;
    }
    if (markdownLineEnding(code3)) {
      effects.consume(code3);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code3);
    return data;
  }
}

// node_modules/micromark/lib/initialize/document.js
var document2 = {
  tokenize: initializeDocument
};
var containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start;
  function start(code3) {
    if (continued < stack.length) {
      const item = stack[continued];
      self.containerState = item[1];
      return effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers
      )(code3);
    }
    return checkNewContainers(code3);
  }
  function documentContinue(code3) {
    continued++;
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point5;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          point5 = self.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point5);
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
      return checkNewContainers(code3);
    }
    return start(code3);
  }
  function checkNewContainers(code3) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code3);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code3);
      }
      self.interrupt = Boolean(
        childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack
      );
    }
    self.containerState = {};
    return effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer
    )(code3);
  }
  function thereIsANewContainer(code3) {
    if (childFlow)
      closeFlow();
    exitContainers(continued);
    return documentContinued(code3);
  }
  function thereIsNoNewContainer(code3) {
    self.parser.lazy[self.now().line] = continued !== stack.length;
    lineStartOffset = self.now().offset;
    return flowStart(code3);
  }
  function documentContinued(code3) {
    self.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code3);
  }
  function containerContinue(code3) {
    continued++;
    stack.push([self.currentConstruct, self.containerState]);
    return documentContinued(code3);
  }
  function flowStart(code3) {
    if (code3 === null) {
      if (childFlow)
        closeFlow();
      exitContainers(0);
      effects.consume(code3);
      return;
    }
    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter("chunkFlow", {
      contentType: "flow",
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code3);
  }
  function flowContinue(code3) {
    if (code3 === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code3);
      return;
    }
    if (markdownLineEnding(code3)) {
      effects.consume(code3);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self.interrupt = void 0;
      return start;
    }
    effects.consume(code3);
    return flowContinue;
  }
  function writeToChild(token, eof) {
    const stream = self.sliceStream(token);
    if (eof)
      stream.push(null);
    token.previous = childToken;
    if (childToken)
      childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);
    if (self.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (
          // The token starts before the line ending…
          childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
          (!childFlow.events[index2][1].end || // …or ends after it.
          childFlow.events[index2][1].end.offset > lineStartOffset)
        ) {
          return;
        }
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point5;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point5 = self.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point5);
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self.containerState = entry[1];
      entry[0].exit.call(self, effects);
    }
    stack.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok2, nok) {
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok2, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}

// node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code3) {
  if (code3 === null || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
    return 1;
  }
  if (unicodePunctuation(code3)) {
    return 2;
  }
}

// node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve = constructs2[index2].resolveAll;
    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }
  return events;
}

// node_modules/micromark-core-commonmark/lib/attention.js
var attention = {
  name: "attention",
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1;
  let open;
  let group;
  let text6;
  let openingSequence;
  let closingSequence;
  let use;
  let nextEvents;
  let offset;
  while (++index2 < events.length) {
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      open = index2;
      while (open--) {
        if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && // If the markers are the same:
        context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
            continue;
          }
          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          const start = Object.assign({}, events[open][1].end);
          const end = Object.assign({}, events[index2][1].start);
          movePoint(start, -use);
          movePoint(end, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: Object.assign({}, events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, events[index2][1].start),
            end
          };
          text6 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, events[open][1].end),
            end: Object.assign({}, events[index2][1].start)
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end)
          };
          events[open][1].end = Object.assign({}, openingSequence.start);
          events[index2][1].start = Object.assign({}, closingSequence.end);
          nextEvents = [];
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [
              ["enter", events[open][1], context],
              ["exit", events[open][1], context]
            ]);
          }
          nextEvents = push(nextEvents, [
            ["enter", group, context],
            ["enter", openingSequence, context],
            ["exit", openingSequence, context],
            ["enter", text6, context]
          ]);
          nextEvents = push(
            nextEvents,
            resolveAll(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index2),
              context
            )
          );
          nextEvents = push(nextEvents, [
            ["exit", text6, context],
            ["enter", closingSequence, context],
            ["exit", closingSequence, context],
            ["exit", group, context]
          ]);
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset = 2;
            nextEvents = push(nextEvents, [
              ["enter", events[index2][1], context],
              ["exit", events[index2][1], context]
            ]);
          } else {
            offset = 0;
          }
          splice(events, open - 1, index2 - open + 3, nextEvents);
          index2 = open + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data";
    }
  }
  return events;
}
function tokenizeAttention(effects, ok2) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous3 = this.previous;
  const before = classifyCharacter(previous3);
  let marker;
  return start;
  function start(code3) {
    effects.enter("attentionSequence");
    marker = code3;
    return sequence(code3);
  }
  function sequence(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      return sequence;
    }
    const token = effects.exit("attentionSequence");
    const after = classifyCharacter(code3);
    const open = !after || after === 2 && before || attentionMarkers2.includes(code3);
    const close = !before || before === 2 && after || attentionMarkers2.includes(previous3);
    token._open = Boolean(marker === 42 ? open : open && (before || !close));
    token._close = Boolean(marker === 42 ? close : close && (after || !open));
    return ok2(code3);
  }
}
function movePoint(point5, offset) {
  point5.column += offset;
  point5.offset += offset;
  point5._bufferIndex += offset;
}

// node_modules/micromark-core-commonmark/lib/autolink.js
var autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok2, nok) {
  let size = 1;
  return start;
  function start(code3) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code3);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }
  function open(code3) {
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return schemeOrEmailAtext;
    }
    return asciiAtext(code3) ? emailAtext(code3) : nok(code3);
  }
  function schemeOrEmailAtext(code3) {
    return code3 === 43 || code3 === 45 || code3 === 46 || asciiAlphanumeric(code3) ? schemeInsideOrEmailAtext(code3) : emailAtext(code3);
  }
  function schemeInsideOrEmailAtext(code3) {
    if (code3 === 58) {
      effects.consume(code3);
      return urlInside;
    }
    if ((code3 === 43 || code3 === 45 || code3 === 46 || asciiAlphanumeric(code3)) && size++ < 32) {
      effects.consume(code3);
      return schemeInsideOrEmailAtext;
    }
    return emailAtext(code3);
  }
  function urlInside(code3) {
    if (code3 === 62) {
      effects.exit("autolinkProtocol");
      return end(code3);
    }
    if (code3 === null || code3 === 32 || code3 === 60 || asciiControl(code3)) {
      return nok(code3);
    }
    effects.consume(code3);
    return urlInside;
  }
  function emailAtext(code3) {
    if (code3 === 64) {
      effects.consume(code3);
      size = 0;
      return emailAtSignOrDot;
    }
    if (asciiAtext(code3)) {
      effects.consume(code3);
      return emailAtext;
    }
    return nok(code3);
  }
  function emailAtSignOrDot(code3) {
    return asciiAlphanumeric(code3) ? emailLabel(code3) : nok(code3);
  }
  function emailLabel(code3) {
    if (code3 === 46) {
      effects.consume(code3);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code3 === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      return end(code3);
    }
    return emailValue(code3);
  }
  function emailValue(code3) {
    if ((code3 === 45 || asciiAlphanumeric(code3)) && size++ < 63) {
      effects.consume(code3);
      return code3 === 45 ? emailValue : emailLabel;
    }
    return nok(code3);
  }
  function end(code3) {
    effects.enter("autolinkMarker");
    effects.consume(code3);
    effects.exit("autolinkMarker");
    effects.exit("autolink");
    return ok2;
  }
}

// node_modules/micromark-core-commonmark/lib/blank-line.js
var blankLine = {
  tokenize: tokenizeBlankLine,
  partial: true
};
function tokenizeBlankLine(effects, ok2, nok) {
  return factorySpace(effects, afterWhitespace, "linePrefix");
  function afterWhitespace(code3) {
    return code3 === null || markdownLineEnding(code3) ? ok2(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/block-quote.js
var blockQuote = {
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit
};
function tokenizeBlockQuoteStart(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    if (code3 === 62) {
      const state = self.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code3);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    if (markdownSpace(code3)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code3);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok2;
    }
    effects.exit("blockQuotePrefix");
    return ok2(code3);
  }
}
function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
  return factorySpace(
    effects,
    effects.attempt(blockQuote, ok2, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function exit(effects) {
  effects.exit("blockQuote");
}

// node_modules/micromark-core-commonmark/lib/character-escape.js
var characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code3);
    effects.exit("escapeMarker");
    return open;
  }
  function open(code3) {
    if (asciiPunctuation(code3)) {
      effects.enter("characterEscapeValue");
      effects.consume(code3);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok2;
    }
    return nok(code3);
  }
}

// node_modules/decode-named-character-reference/index.dom.js
var element = document.createElement("i");
function decodeNamedCharacterReference(value) {
  const characterReference2 = "&" + value + ";";
  element.innerHTML = characterReference2;
  const char = element.textContent;
  if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
    return false;
  }
  return char === characterReference2 ? false : char;
}

// node_modules/micromark-core-commonmark/lib/character-reference.js
var characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok2, nok) {
  const self = this;
  let size = 0;
  let max;
  let test2;
  return start;
  function start(code3) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code3);
    effects.exit("characterReferenceMarker");
    return open;
  }
  function open(code3) {
    if (code3 === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code3);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max = 31;
    test2 = asciiAlphanumeric;
    return value(code3);
  }
  function numeric(code3) {
    if (code3 === 88 || code3 === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code3);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max = 6;
      test2 = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max = 7;
    test2 = asciiDigit;
    return value(code3);
  }
  function value(code3) {
    let token;
    if (code3 === 59 && size) {
      token = effects.exit("characterReferenceValue");
      if (test2 === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
        return nok(code3);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code3);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok2;
    }
    if (test2(code3) && size++ < max) {
      effects.consume(code3);
      return value;
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/code-fenced.js
var codeFenced = {
  name: "codeFenced",
  tokenize: tokenizeCodeFenced,
  concrete: true
};
function tokenizeCodeFenced(effects, ok2, nok) {
  const self = this;
  const closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  const nonLazyLine = {
    tokenize: tokenizeNonLazyLine,
    partial: true
  };
  const tail = this.events[this.events.length - 1];
  const initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let sizeOpen = 0;
  let marker;
  return start;
  function start(code3) {
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    marker = code3;
    return sequenceOpen(code3);
  }
  function sequenceOpen(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeFencedFenceSequence");
    return sizeOpen < 3 ? nok(code3) : factorySpace(effects, infoOpen, "whitespace")(code3);
  }
  function infoOpen(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return openAfter(code3);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code3);
  }
  function info(code3) {
    if (code3 === null || markdownLineEndingOrSpace(code3)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, infoAfter, "whitespace")(code3);
    }
    if (code3 === 96 && code3 === marker)
      return nok(code3);
    effects.consume(code3);
    return info;
  }
  function infoAfter(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return openAfter(code3);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code3);
  }
  function meta(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return openAfter(code3);
    }
    if (code3 === 96 && code3 === marker)
      return nok(code3);
    effects.consume(code3);
    return meta;
  }
  function openAfter(code3) {
    effects.exit("codeFencedFence");
    return self.interrupt ? ok2(code3) : contentStart(code3);
  }
  function contentStart(code3) {
    if (code3 === null) {
      return after(code3);
    }
    if (markdownLineEnding(code3)) {
      return effects.attempt(
        nonLazyLine,
        effects.attempt(
          closingFenceConstruct,
          after,
          initialPrefix ? factorySpace(
            effects,
            contentStart,
            "linePrefix",
            initialPrefix + 1
          ) : contentStart
        ),
        after
      )(code3);
    }
    effects.enter("codeFlowValue");
    return contentContinue(code3);
  }
  function contentContinue(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("codeFlowValue");
      return contentStart(code3);
    }
    effects.consume(code3);
    return contentContinue;
  }
  function after(code3) {
    effects.exit("codeFenced");
    return ok2(code3);
  }
  function tokenizeNonLazyLine(effects2, ok3, nok2) {
    const self2 = this;
    return start2;
    function start2(code3) {
      effects2.enter("lineEnding");
      effects2.consume(code3);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code3) {
      return self2.parser.lazy[self2.now().line] ? nok2(code3) : ok3(code3);
    }
  }
  function tokenizeClosingFence(effects2, ok3, nok2) {
    let size = 0;
    return factorySpace(
      effects2,
      closingSequenceStart,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
    function closingSequenceStart(code3) {
      effects2.enter("codeFencedFence");
      effects2.enter("codeFencedFenceSequence");
      return closingSequence(code3);
    }
    function closingSequence(code3) {
      if (code3 === marker) {
        effects2.consume(code3);
        size++;
        return closingSequence;
      }
      if (size < sizeOpen)
        return nok2(code3);
      effects2.exit("codeFencedFenceSequence");
      return factorySpace(effects2, closingSequenceEnd, "whitespace")(code3);
    }
    function closingSequenceEnd(code3) {
      if (code3 === null || markdownLineEnding(code3)) {
        effects2.exit("codeFencedFence");
        return ok3(code3);
      }
      return nok2(code3);
    }
  }
}

// node_modules/micromark-core-commonmark/lib/code-indented.js
var codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
var indentedContent = {
  tokenize: tokenizeIndentedContent,
  partial: true
};
function tokenizeCodeIndented(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterStartPrefix, "linePrefix", 4 + 1)(code3);
  }
  function afterStartPrefix(code3) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? afterPrefix(code3) : nok(code3);
  }
  function afterPrefix(code3) {
    if (code3 === null) {
      return after(code3);
    }
    if (markdownLineEnding(code3)) {
      return effects.attempt(indentedContent, afterPrefix, after)(code3);
    }
    effects.enter("codeFlowValue");
    return content3(code3);
  }
  function content3(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("codeFlowValue");
      return afterPrefix(code3);
    }
    effects.consume(code3);
    return content3;
  }
  function after(code3) {
    effects.exit("codeIndented");
    return ok2(code3);
  }
}
function tokenizeIndentedContent(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    if (self.parser.lazy[self.now().line]) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return start;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code3);
  }
  function afterPrefix(code3) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok2(code3) : markdownLineEnding(code3) ? start(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/code-text.js
var codeText = {
  name: "codeText",
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2;
      }
    } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end;
        events.splice(enter + 2, index2 - enter - 2);
        tailExitIndex -= index2 - enter - 2;
        index2 = enter + 2;
      }
      enter = void 0;
    }
  }
  return events;
}
function previous(code3) {
  return code3 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok2, nok) {
  const self = this;
  let sizeOpen = 0;
  let size;
  let token;
  return start;
  function start(code3) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return openingSequence(code3);
  }
  function openingSequence(code3) {
    if (code3 === 96) {
      effects.consume(code3);
      sizeOpen++;
      return openingSequence;
    }
    effects.exit("codeTextSequence");
    return gap(code3);
  }
  function gap(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 96) {
      token = effects.enter("codeTextSequence");
      size = 0;
      return closingSequence(code3);
    }
    if (code3 === 32) {
      effects.enter("space");
      effects.consume(code3);
      effects.exit("space");
      return gap;
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return gap;
    }
    effects.enter("codeTextData");
    return data(code3);
  }
  function data(code3) {
    if (code3 === null || code3 === 32 || code3 === 96 || markdownLineEnding(code3)) {
      effects.exit("codeTextData");
      return gap(code3);
    }
    effects.consume(code3);
    return data;
  }
  function closingSequence(code3) {
    if (code3 === 96) {
      effects.consume(code3);
      size++;
      return closingSequence;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok2(code3);
    }
    token.type = "codeTextData";
    return data(code3);
  }
}

// node_modules/micromark-util-subtokenize/index.js
function subtokenize(events) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events[index2];
    if (index2 && event[1].type === "chunkFlow" && events[index2 - 1][1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events[otherIndex];
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events[lineIndex][1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = Object.assign({}, events[lineIndex][1].start);
        parameters = events.slice(lineIndex, index2);
        parameters.unshift(event);
        splice(events, lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  return !more;
}
function subcontent(events, eventIndex) {
  const token = events[eventIndex][1];
  const context = events[eventIndex][2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  const tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
  const childEvents = tokenizer.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous3;
  let index2 = -1;
  let current = token;
  let adjust = 0;
  let start = 0;
  const breaks = [start];
  while (current) {
    while (events[++startPosition][1] !== current) {
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous3) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous3 = current;
    current = current.next;
  }
  current = token;
  while (++index2 < childEvents.length) {
    if (
      // Find a void token that includes a break.
      childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line
    ) {
      start = index2 + 1;
      breaks.push(start);
      current._tokenizer = void 0;
      current.previous = void 0;
      current = current.next;
    }
  }
  tokenizer.events = [];
  if (current) {
    current._tokenizer = void 0;
    current.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start2 = startPositions.pop();
    jumps.unshift([start2, start2 + slice.length - 1]);
    splice(events, start2, 2, slice);
  }
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}

// node_modules/micromark-core-commonmark/lib/content.js
var content2 = {
  tokenize: tokenizeContent,
  resolve: resolveContent
};
var continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
};
function resolveContent(events) {
  subtokenize(events);
  return events;
}
function tokenizeContent(effects, ok2) {
  let previous3;
  return start;
  function start(code3) {
    effects.enter("content");
    previous3 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return data(code3);
  }
  function data(code3) {
    if (code3 === null) {
      return contentEnd(code3);
    }
    if (markdownLineEnding(code3)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code3);
    }
    effects.consume(code3);
    return data;
  }
  function contentEnd(code3) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok2(code3);
  }
  function contentContinue(code3) {
    effects.consume(code3);
    effects.exit("chunkContent");
    previous3.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous3
    });
    previous3 = previous3.next;
    return data;
  }
}
function tokenizeContinuation(effects, ok2, nok) {
  const self = this;
  return startLookahead;
  function startLookahead(code3) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return nok(code3);
    }
    const tail = self.events[self.events.length - 1];
    if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok2(code3);
    }
    return effects.interrupt(self.parser.constructs.flow, nok, ok2)(code3);
  }
}

// node_modules/micromark-factory-destination/index.js
function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  const limit = max || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start;
  function start(code3) {
    if (code3 === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code3);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore;
    }
    if (code3 === null || code3 === 41 || asciiControl(code3)) {
      return nok(code3);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationRaw(code3);
  }
  function destinationEnclosedBefore(code3) {
    if (code3 === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code3);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationEnclosed(code3);
  }
  function destinationEnclosed(code3) {
    if (code3 === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return destinationEnclosedBefore(code3);
    }
    if (code3 === null || code3 === 60 || markdownLineEnding(code3)) {
      return nok(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? destinationEnclosedEscape : destinationEnclosed;
  }
  function destinationEnclosedEscape(code3) {
    if (code3 === 60 || code3 === 62 || code3 === 92) {
      effects.consume(code3);
      return destinationEnclosed;
    }
    return destinationEnclosed(code3);
  }
  function destinationRaw(code3) {
    if (code3 === 40) {
      if (++balance > limit)
        return nok(code3);
      effects.consume(code3);
      return destinationRaw;
    }
    if (code3 === 41) {
      if (!balance--) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code3);
      }
      effects.consume(code3);
      return destinationRaw;
    }
    if (code3 === null || markdownLineEndingOrSpace(code3)) {
      if (balance)
        return nok(code3);
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok2(code3);
    }
    if (asciiControl(code3))
      return nok(code3);
    effects.consume(code3);
    return code3 === 92 ? destinationRawEscape : destinationRaw;
  }
  function destinationRawEscape(code3) {
    if (code3 === 40 || code3 === 41 || code3 === 92) {
      effects.consume(code3);
      return destinationRaw;
    }
    return destinationRaw(code3);
  }
}

// node_modules/micromark-factory-label/index.js
function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
  const self = this;
  let size = 0;
  let data;
  return start;
  function start(code3) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code3);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  function atBreak(code3) {
    if (code3 === null || code3 === 91 || code3 === 93 && !data || /* To do: remove in the future once we’ve switched from
     * `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
     * which doesn’t need this */
    /* Hidden footnotes hook */
    /* c8 ignore next 3 */
    code3 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs || size > 999) {
      return nok(code3);
    }
    if (code3 === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code3);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return label(code3);
  }
  function label(code3) {
    if (code3 === null || code3 === 91 || code3 === 93 || markdownLineEnding(code3) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code3);
    }
    effects.consume(code3);
    data = data || !markdownSpace(code3);
    return code3 === 92 ? labelEscape : label;
  }
  function labelEscape(code3) {
    if (code3 === 91 || code3 === 92 || code3 === 93) {
      effects.consume(code3);
      size++;
      return label;
    }
    return label(code3);
  }
}

// node_modules/micromark-factory-title/index.js
function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
  let marker;
  return start;
  function start(code3) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code3);
    effects.exit(markerType);
    marker = code3 === 40 ? 41 : code3;
    return atFirstTitleBreak;
  }
  function atFirstTitleBreak(code3) {
    if (code3 === marker) {
      effects.enter(markerType);
      effects.consume(code3);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    return atTitleBreak(code3);
  }
  function atTitleBreak(code3) {
    if (code3 === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker);
    }
    if (code3 === null) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      return factorySpace(effects, atTitleBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return title(code3);
  }
  function title(code3) {
    if (code3 === marker || code3 === null || markdownLineEnding(code3)) {
      effects.exit("chunkString");
      return atTitleBreak(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? titleEscape : title;
  }
  function titleEscape(code3) {
    if (code3 === marker || code3 === 92) {
      effects.consume(code3);
      return title;
    }
    return title(code3);
  }
}

// node_modules/micromark-factory-whitespace/index.js
function factoryWhitespace(effects, ok2) {
  let seen;
  return start;
  function start(code3) {
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      seen = true;
      return start;
    }
    if (markdownSpace(code3)) {
      return factorySpace(
        effects,
        start,
        seen ? "linePrefix" : "lineSuffix"
      )(code3);
    }
    return ok2(code3);
  }
}

// node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}

// node_modules/micromark-core-commonmark/lib/definition.js
var definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
var titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};
function tokenizeDefinition(effects, ok2, nok) {
  const self = this;
  let identifier;
  return start;
  function start(code3) {
    effects.enter("definition");
    return factoryLabel.call(
      self,
      effects,
      labelAfter,
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code3);
  }
  function labelAfter(code3) {
    identifier = normalizeIdentifier(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
    );
    if (code3 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code3);
      effects.exit("definitionMarker");
      return factoryWhitespace(
        effects,
        factoryDestination(
          effects,
          effects.attempt(
            titleConstruct,
            factorySpace(effects, after, "whitespace"),
            factorySpace(effects, after, "whitespace")
          ),
          nok,
          "definitionDestination",
          "definitionDestinationLiteral",
          "definitionDestinationLiteralMarker",
          "definitionDestinationRaw",
          "definitionDestinationString"
        )
      );
    }
    return nok(code3);
  }
  function after(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("definition");
      if (!self.parser.defined.includes(identifier)) {
        self.parser.defined.push(identifier);
      }
      return ok2(code3);
    }
    return nok(code3);
  }
}
function tokenizeTitle(effects, ok2, nok) {
  return start;
  function start(code3) {
    return markdownLineEndingOrSpace(code3) ? factoryWhitespace(effects, before)(code3) : nok(code3);
  }
  function before(code3) {
    if (code3 === 34 || code3 === 39 || code3 === 40) {
      return factoryTitle(
        effects,
        factorySpace(effects, after, "whitespace"),
        nok,
        "definitionTitle",
        "definitionTitleMarker",
        "definitionTitleString"
      )(code3);
    }
    return nok(code3);
  }
  function after(code3) {
    return code3 === null || markdownLineEnding(code3) ? ok2(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.enter("hardBreakEscape");
    effects.enter("escapeMarker");
    effects.consume(code3);
    return open;
  }
  function open(code3) {
    if (markdownLineEnding(code3)) {
      effects.exit("escapeMarker");
      effects.exit("hardBreakEscape");
      return ok2(code3);
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/heading-atx.js
var headingAtx = {
  name: "headingAtx",
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  let content3;
  let text6;
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content3 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text6 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      // @ts-expect-error Constants are fine to assign.
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [
      ["enter", content3, context],
      ["enter", text6, context],
      ["exit", text6, context],
      ["exit", content3, context]
    ]);
  }
  return events;
}
function tokenizeHeadingAtx(effects, ok2, nok) {
  const self = this;
  let size = 0;
  return start;
  function start(code3) {
    effects.enter("atxHeading");
    effects.enter("atxHeadingSequence");
    return fenceOpenInside(code3);
  }
  function fenceOpenInside(code3) {
    if (code3 === 35 && size++ < 6) {
      effects.consume(code3);
      return fenceOpenInside;
    }
    if (code3 === null || markdownLineEndingOrSpace(code3)) {
      effects.exit("atxHeadingSequence");
      return self.interrupt ? ok2(code3) : headingBreak(code3);
    }
    return nok(code3);
  }
  function headingBreak(code3) {
    if (code3 === 35) {
      effects.enter("atxHeadingSequence");
      return sequence(code3);
    }
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("atxHeading");
      return ok2(code3);
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, headingBreak, "whitespace")(code3);
    }
    effects.enter("atxHeadingText");
    return data(code3);
  }
  function sequence(code3) {
    if (code3 === 35) {
      effects.consume(code3);
      return sequence;
    }
    effects.exit("atxHeadingSequence");
    return headingBreak(code3);
  }
  function data(code3) {
    if (code3 === null || code3 === 35 || markdownLineEndingOrSpace(code3)) {
      effects.exit("atxHeadingText");
      return headingBreak(code3);
    }
    effects.consume(code3);
    return data;
  }
}

// node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];
var htmlRawNames = ["pre", "script", "style", "textarea"];

// node_modules/micromark-core-commonmark/lib/html-flow.js
var htmlFlow = {
  name: "htmlFlow",
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
var nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  while (index2--) {
    if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start;
    events[index2 + 1][1].start = events[index2 - 2][1].start;
    events.splice(index2 - 2, 2);
  }
  return events;
}
function tokenizeHtmlFlow(effects, ok2, nok) {
  const self = this;
  let kind;
  let startTag;
  let buffer2;
  let index2;
  let marker;
  return start;
  function start(code3) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code3);
    return open;
  }
  function open(code3) {
    if (code3 === 33) {
      effects.consume(code3);
      return declarationStart;
    }
    if (code3 === 47) {
      effects.consume(code3);
      return tagCloseStart;
    }
    if (code3 === 63) {
      effects.consume(code3);
      kind = 3;
      return self.interrupt ? ok2 : continuationDeclarationInside;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      buffer2 = String.fromCharCode(code3);
      startTag = true;
      return tagName;
    }
    return nok(code3);
  }
  function declarationStart(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      kind = 2;
      return commentOpenInside;
    }
    if (code3 === 91) {
      effects.consume(code3);
      kind = 5;
      buffer2 = "CDATA[";
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      kind = 4;
      return self.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code3);
  }
  function commentOpenInside(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return self.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code3);
  }
  function cdataOpenInside(code3) {
    if (code3 === buffer2.charCodeAt(index2++)) {
      effects.consume(code3);
      return index2 === buffer2.length ? self.interrupt ? ok2 : continuation : cdataOpenInside;
    }
    return nok(code3);
  }
  function tagCloseStart(code3) {
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      buffer2 = String.fromCharCode(code3);
      return tagName;
    }
    return nok(code3);
  }
  function tagName(code3) {
    if (code3 === null || code3 === 47 || code3 === 62 || markdownLineEndingOrSpace(code3)) {
      if (code3 !== 47 && startTag && htmlRawNames.includes(buffer2.toLowerCase())) {
        kind = 1;
        return self.interrupt ? ok2(code3) : continuation(code3);
      }
      if (htmlBlockNames.includes(buffer2.toLowerCase())) {
        kind = 6;
        if (code3 === 47) {
          effects.consume(code3);
          return basicSelfClosing;
        }
        return self.interrupt ? ok2(code3) : continuation(code3);
      }
      kind = 7;
      return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code3) : startTag ? completeAttributeNameBefore(code3) : completeClosingTagAfter(code3);
    }
    if (code3 === 45 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      buffer2 += String.fromCharCode(code3);
      return tagName;
    }
    return nok(code3);
  }
  function basicSelfClosing(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      return self.interrupt ? ok2 : continuation;
    }
    return nok(code3);
  }
  function completeClosingTagAfter(code3) {
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeClosingTagAfter;
    }
    return completeEnd(code3);
  }
  function completeAttributeNameBefore(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      return completeEnd;
    }
    if (code3 === 58 || code3 === 95 || asciiAlpha(code3)) {
      effects.consume(code3);
      return completeAttributeName;
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAttributeNameBefore;
    }
    return completeEnd(code3);
  }
  function completeAttributeName(code3) {
    if (code3 === 45 || code3 === 46 || code3 === 58 || code3 === 95 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code3);
  }
  function completeAttributeNameAfter(code3) {
    if (code3 === 61) {
      effects.consume(code3);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code3);
  }
  function completeAttributeValueBefore(code3) {
    if (code3 === null || code3 === 60 || code3 === 61 || code3 === 62 || code3 === 96) {
      return nok(code3);
    }
    if (code3 === 34 || code3 === 39) {
      effects.consume(code3);
      marker = code3;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAttributeValueBefore;
    }
    marker = null;
    return completeAttributeValueUnquoted(code3);
  }
  function completeAttributeValueQuoted(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return nok(code3);
    }
    if (code3 === marker) {
      effects.consume(code3);
      return completeAttributeValueQuotedAfter;
    }
    effects.consume(code3);
    return completeAttributeValueQuoted;
  }
  function completeAttributeValueUnquoted(code3) {
    if (code3 === null || code3 === 34 || code3 === 39 || code3 === 60 || code3 === 61 || code3 === 62 || code3 === 96 || markdownLineEndingOrSpace(code3)) {
      return completeAttributeNameAfter(code3);
    }
    effects.consume(code3);
    return completeAttributeValueUnquoted;
  }
  function completeAttributeValueQuotedAfter(code3) {
    if (code3 === 47 || code3 === 62 || markdownSpace(code3)) {
      return completeAttributeNameBefore(code3);
    }
    return nok(code3);
  }
  function completeEnd(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      return completeAfter;
    }
    return nok(code3);
  }
  function completeAfter(code3) {
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return completeAfter;
    }
    return code3 === null || markdownLineEnding(code3) ? continuation(code3) : nok(code3);
  }
  function continuation(code3) {
    if (code3 === 45 && kind === 2) {
      effects.consume(code3);
      return continuationCommentInside;
    }
    if (code3 === 60 && kind === 1) {
      effects.consume(code3);
      return continuationRawTagOpen;
    }
    if (code3 === 62 && kind === 4) {
      effects.consume(code3);
      return continuationClose;
    }
    if (code3 === 63 && kind === 3) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    if (code3 === 93 && kind === 5) {
      effects.consume(code3);
      return continuationCharacterDataInside;
    }
    if (markdownLineEnding(code3) && (kind === 6 || kind === 7)) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding
      )(code3);
    }
    if (code3 === null || markdownLineEnding(code3)) {
      return continuationAtLineEnding(code3);
    }
    effects.consume(code3);
    return continuation;
  }
  function continuationAtLineEnding(code3) {
    effects.exit("htmlFlowData");
    return htmlContinueStart(code3);
  }
  function htmlContinueStart(code3) {
    if (code3 === null) {
      return done(code3);
    }
    if (markdownLineEnding(code3)) {
      return effects.attempt(
        {
          tokenize: htmlLineEnd,
          partial: true
        },
        htmlContinueStart,
        done
      )(code3);
    }
    effects.enter("htmlFlowData");
    return continuation(code3);
  }
  function htmlLineEnd(effects2, ok3, nok2) {
    return start2;
    function start2(code3) {
      effects2.enter("lineEnding");
      effects2.consume(code3);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code3) {
      return self.parser.lazy[self.now().line] ? nok2(code3) : ok3(code3);
    }
  }
  function continuationCommentInside(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    return continuation(code3);
  }
  function continuationRawTagOpen(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      buffer2 = "";
      return continuationRawEndTag;
    }
    return continuation(code3);
  }
  function continuationRawEndTag(code3) {
    if (code3 === 62 && htmlRawNames.includes(buffer2.toLowerCase())) {
      effects.consume(code3);
      return continuationClose;
    }
    if (asciiAlpha(code3) && buffer2.length < 8) {
      effects.consume(code3);
      buffer2 += String.fromCharCode(code3);
      return continuationRawEndTag;
    }
    return continuation(code3);
  }
  function continuationCharacterDataInside(code3) {
    if (code3 === 93) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    return continuation(code3);
  }
  function continuationDeclarationInside(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      return continuationClose;
    }
    if (code3 === 45 && kind === 2) {
      effects.consume(code3);
      return continuationDeclarationInside;
    }
    return continuation(code3);
  }
  function continuationClose(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("htmlFlowData");
      return done(code3);
    }
    effects.consume(code3);
    return continuationClose;
  }
  function done(code3) {
    effects.exit("htmlFlow");
    return ok2(code3);
  }
}
function tokenizeNextBlank(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.exit("htmlFlowData");
    effects.enter("lineEndingBlank");
    effects.consume(code3);
    effects.exit("lineEndingBlank");
    return effects.attempt(blankLine, ok2, nok);
  }
}

// node_modules/micromark-core-commonmark/lib/html-text.js
var htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok2, nok) {
  const self = this;
  let marker;
  let buffer2;
  let index2;
  let returnState;
  return start;
  function start(code3) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code3);
    return open;
  }
  function open(code3) {
    if (code3 === 33) {
      effects.consume(code3);
      return declarationOpen;
    }
    if (code3 === 47) {
      effects.consume(code3);
      return tagCloseStart;
    }
    if (code3 === 63) {
      effects.consume(code3);
      return instruction;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return tagOpen;
    }
    return nok(code3);
  }
  function declarationOpen(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return commentOpen;
    }
    if (code3 === 91) {
      effects.consume(code3);
      buffer2 = "CDATA[";
      index2 = 0;
      return cdataOpen;
    }
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return declaration;
    }
    return nok(code3);
  }
  function commentOpen(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return commentStart;
    }
    return nok(code3);
  }
  function commentStart(code3) {
    if (code3 === null || code3 === 62) {
      return nok(code3);
    }
    if (code3 === 45) {
      effects.consume(code3);
      return commentStartDash;
    }
    return comment2(code3);
  }
  function commentStartDash(code3) {
    if (code3 === null || code3 === 62) {
      return nok(code3);
    }
    return comment2(code3);
  }
  function comment2(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 45) {
      effects.consume(code3);
      return commentClose;
    }
    if (markdownLineEnding(code3)) {
      returnState = comment2;
      return atLineEnding(code3);
    }
    effects.consume(code3);
    return comment2;
  }
  function commentClose(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return end;
    }
    return comment2(code3);
  }
  function cdataOpen(code3) {
    if (code3 === buffer2.charCodeAt(index2++)) {
      effects.consume(code3);
      return index2 === buffer2.length ? cdata : cdataOpen;
    }
    return nok(code3);
  }
  function cdata(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 93) {
      effects.consume(code3);
      return cdataClose;
    }
    if (markdownLineEnding(code3)) {
      returnState = cdata;
      return atLineEnding(code3);
    }
    effects.consume(code3);
    return cdata;
  }
  function cdataClose(code3) {
    if (code3 === 93) {
      effects.consume(code3);
      return cdataEnd;
    }
    return cdata(code3);
  }
  function cdataEnd(code3) {
    if (code3 === 62) {
      return end(code3);
    }
    if (code3 === 93) {
      effects.consume(code3);
      return cdataEnd;
    }
    return cdata(code3);
  }
  function declaration(code3) {
    if (code3 === null || code3 === 62) {
      return end(code3);
    }
    if (markdownLineEnding(code3)) {
      returnState = declaration;
      return atLineEnding(code3);
    }
    effects.consume(code3);
    return declaration;
  }
  function instruction(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    if (code3 === 63) {
      effects.consume(code3);
      return instructionClose;
    }
    if (markdownLineEnding(code3)) {
      returnState = instruction;
      return atLineEnding(code3);
    }
    effects.consume(code3);
    return instruction;
  }
  function instructionClose(code3) {
    return code3 === 62 ? end(code3) : instruction(code3);
  }
  function tagCloseStart(code3) {
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return tagClose;
    }
    return nok(code3);
  }
  function tagClose(code3) {
    if (code3 === 45 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return tagClose;
    }
    return tagCloseBetween(code3);
  }
  function tagCloseBetween(code3) {
    if (markdownLineEnding(code3)) {
      returnState = tagCloseBetween;
      return atLineEnding(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagCloseBetween;
    }
    return end(code3);
  }
  function tagOpen(code3) {
    if (code3 === 45 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return tagOpen;
    }
    if (code3 === 47 || code3 === 62 || markdownLineEndingOrSpace(code3)) {
      return tagOpenBetween(code3);
    }
    return nok(code3);
  }
  function tagOpenBetween(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      return end;
    }
    if (code3 === 58 || code3 === 95 || asciiAlpha(code3)) {
      effects.consume(code3);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenBetween;
      return atLineEnding(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagOpenBetween;
    }
    return end(code3);
  }
  function tagOpenAttributeName(code3) {
    if (code3 === 45 || code3 === 46 || code3 === 58 || code3 === 95 || asciiAlphanumeric(code3)) {
      effects.consume(code3);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code3);
  }
  function tagOpenAttributeNameAfter(code3) {
    if (code3 === 61) {
      effects.consume(code3);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code3);
  }
  function tagOpenAttributeValueBefore(code3) {
    if (code3 === null || code3 === 60 || code3 === 61 || code3 === 62 || code3 === 96) {
      return nok(code3);
    }
    if (code3 === 34 || code3 === 39) {
      effects.consume(code3);
      marker = code3;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code3);
    }
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code3);
    marker = void 0;
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuoted(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code3 === null) {
      return nok(code3);
    }
    if (markdownLineEnding(code3)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code3);
    }
    effects.consume(code3);
    return tagOpenAttributeValueQuoted;
  }
  function tagOpenAttributeValueQuotedAfter(code3) {
    if (code3 === 62 || code3 === 47 || markdownLineEndingOrSpace(code3)) {
      return tagOpenBetween(code3);
    }
    return nok(code3);
  }
  function tagOpenAttributeValueUnquoted(code3) {
    if (code3 === null || code3 === 34 || code3 === 39 || code3 === 60 || code3 === 61 || code3 === 96) {
      return nok(code3);
    }
    if (code3 === 62 || markdownLineEndingOrSpace(code3)) {
      return tagOpenBetween(code3);
    }
    effects.consume(code3);
    return tagOpenAttributeValueUnquoted;
  }
  function atLineEnding(code3) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return factorySpace(
      effects,
      afterPrefix,
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function afterPrefix(code3) {
    effects.enter("htmlTextData");
    return returnState(code3);
  }
  function end(code3) {
    if (code3 === 62) {
      effects.consume(code3);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok2;
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/label-end.js
var labelEnd = {
  name: "labelEnd",
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
var collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  let token;
  while (++index2 < events.length) {
    token = events[index2][1];
    if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
      events.splice(index2 + 1, token.type === "labelImage" ? 4 : 2);
      token.type = "data";
      index2++;
    }
  }
  return events;
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length;
  let offset = 0;
  let token;
  let open;
  let close;
  let media;
  while (index2--) {
    token = events[index2][1];
    if (open) {
      if (token.type === "link" || token.type === "labelLink" && token._inactive) {
        break;
      }
      if (events[index2][0] === "enter" && token.type === "labelLink") {
        token._inactive = true;
      }
    } else if (close) {
      if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
        open = index2;
        if (token.type !== "labelLink") {
          offset = 2;
          break;
        }
      }
    } else if (token.type === "labelEnd") {
      close = index2;
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const label = {
    type: "label",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[close][1].end)
  };
  const text6 = {
    type: "labelText",
    start: Object.assign({}, events[open + offset + 2][1].end),
    end: Object.assign({}, events[close - 2][1].start)
  };
  media = [
    ["enter", group, context],
    ["enter", label, context]
  ];
  media = push(media, events.slice(open + 1, open + offset + 3));
  media = push(media, [["enter", text6, context]]);
  media = push(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset + 4, close - 3),
      context
    )
  );
  media = push(media, [
    ["exit", text6, context],
    events[close - 2],
    events[close - 1],
    ["exit", label, context]
  ]);
  media = push(media, events.slice(close + 1));
  media = push(media, [["exit", group, context]]);
  splice(events, open, events.length, media);
  return events;
}
function tokenizeLabelEnd(effects, ok2, nok) {
  const self = this;
  let index2 = self.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self.events[index2][1].type === "labelImage" || self.events[index2][1].type === "labelLink") && !self.events[index2][1]._balanced) {
      labelStart = self.events[index2][1];
      break;
    }
  }
  return start;
  function start(code3) {
    if (!labelStart) {
      return nok(code3);
    }
    if (labelStart._inactive)
      return balanced(code3);
    defined = self.parser.defined.includes(
      normalizeIdentifier(
        self.sliceSerialize({
          start: labelStart.end,
          end: self.now()
        })
      )
    );
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code3);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return afterLabelEnd;
  }
  function afterLabelEnd(code3) {
    if (code3 === 40) {
      return effects.attempt(
        resourceConstruct,
        ok2,
        defined ? ok2 : balanced
      )(code3);
    }
    if (code3 === 91) {
      return effects.attempt(
        fullReferenceConstruct,
        ok2,
        defined ? effects.attempt(collapsedReferenceConstruct, ok2, balanced) : balanced
      )(code3);
    }
    return defined ? ok2(code3) : balanced(code3);
  }
  function balanced(code3) {
    labelStart._balanced = true;
    return nok(code3);
  }
}
function tokenizeResource(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code3);
    effects.exit("resourceMarker");
    return factoryWhitespace(effects, open);
  }
  function open(code3) {
    if (code3 === 41) {
      return end(code3);
    }
    return factoryDestination(
      effects,
      destinationAfter,
      nok,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(code3);
  }
  function destinationAfter(code3) {
    return markdownLineEndingOrSpace(code3) ? factoryWhitespace(effects, between2)(code3) : end(code3);
  }
  function between2(code3) {
    if (code3 === 34 || code3 === 39 || code3 === 40) {
      return factoryTitle(
        effects,
        factoryWhitespace(effects, end),
        nok,
        "resourceTitle",
        "resourceTitleMarker",
        "resourceTitleString"
      )(code3);
    }
    return end(code3);
  }
  function end(code3) {
    if (code3 === 41) {
      effects.enter("resourceMarker");
      effects.consume(code3);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok2;
    }
    return nok(code3);
  }
}
function tokenizeFullReference(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    return factoryLabel.call(
      self,
      effects,
      afterLabel,
      nok,
      "reference",
      "referenceMarker",
      "referenceString"
    )(code3);
  }
  function afterLabel(code3) {
    return self.parser.defined.includes(
      normalizeIdentifier(
        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
      )
    ) ? ok2(code3) : nok(code3);
  }
}
function tokenizeCollapsedReference(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code3);
    effects.exit("referenceMarker");
    return open;
  }
  function open(code3) {
    if (code3 === 93) {
      effects.enter("referenceMarker");
      effects.consume(code3);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok2;
    }
    return nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/label-start-image.js
var labelStartImage = {
  name: "labelStartImage",
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartImage(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code3);
    effects.exit("labelImageMarker");
    return open;
  }
  function open(code3) {
    if (code3 === 91) {
      effects.enter("labelMarker");
      effects.consume(code3);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    return code3 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code3) : ok2(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/label-start-link.js
var labelStartLink = {
  name: "labelStartLink",
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartLink(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code3);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  function after(code3) {
    return code3 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code3) : ok2(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/line-ending.js
var lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok2) {
  return start;
  function start(code3) {
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    return factorySpace(effects, ok2, "linePrefix");
  }
}

// node_modules/micromark-core-commonmark/lib/thematic-break.js
var thematicBreak = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok2, nok) {
  let size = 0;
  let marker;
  return start;
  function start(code3) {
    effects.enter("thematicBreak");
    marker = code3;
    return atBreak(code3);
  }
  function atBreak(code3) {
    if (code3 === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code3);
    }
    if (markdownSpace(code3)) {
      return factorySpace(effects, atBreak, "whitespace")(code3);
    }
    if (size < 3 || code3 !== null && !markdownLineEnding(code3)) {
      return nok(code3);
    }
    effects.exit("thematicBreak");
    return ok2(code3);
  }
  function sequence(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return atBreak(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/list.js
var list = {
  name: "list",
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
var listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
var indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};
function tokenizeListStart(effects, ok2, nok) {
  const self = this;
  const tail = self.events[self.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start;
  function start(code3) {
    const kind = self.containerState.type || (code3 === 42 || code3 === 43 || code3 === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self.containerState.marker || code3 === self.containerState.marker : asciiDigit(code3)) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code3 === 42 || code3 === 45 ? effects.check(thematicBreak, nok, atMarker)(code3) : atMarker(code3);
      }
      if (!self.interrupt || code3 === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code3);
      }
    }
    return nok(code3);
  }
  function inside(code3) {
    if (asciiDigit(code3) && ++size < 10) {
      effects.consume(code3);
      return inside;
    }
    if ((!self.interrupt || size < 2) && (self.containerState.marker ? code3 === self.containerState.marker : code3 === 41 || code3 === 46)) {
      effects.exit("listItemValue");
      return atMarker(code3);
    }
    return nok(code3);
  }
  function atMarker(code3) {
    effects.enter("listItemMarker");
    effects.consume(code3);
    effects.exit("listItemMarker");
    self.containerState.marker = self.containerState.marker || code3;
    return effects.check(
      blankLine,
      // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    );
  }
  function onBlank(code3) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code3);
  }
  function otherPrefix(code3) {
    if (markdownSpace(code3)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code3);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code3);
  }
  function endOfPrefix(code3) {
    self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok2(code3);
  }
}
function tokenizeListContinuation(effects, ok2, nok) {
  const self = this;
  self.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code3) {
    self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
    return factorySpace(
      effects,
      ok2,
      "listItemIndent",
      self.containerState.size + 1
    )(code3);
  }
  function notBlank(code3) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code3)) {
      self.containerState.furtherBlankLines = void 0;
      self.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code3);
    }
    self.containerState.furtherBlankLines = void 0;
    self.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code3);
  }
  function notInCurrentItem(code3) {
    self.containerState._closeFlow = true;
    self.interrupt = void 0;
    return factorySpace(
      effects,
      effects.attempt(list, ok2, nok),
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code3);
  }
}
function tokenizeIndent(effects, ok2, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemIndent",
    self.containerState.size + 1
  );
  function afterPrefix(code3) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok2(code3) : nok(code3);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemPrefixWhitespace",
    self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function afterPrefix(code3) {
    const tail = self.events[self.events.length - 1];
    return !markdownSpace(code3) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code3) : nok(code3);
  }
}

// node_modules/micromark-core-commonmark/lib/setext-underline.js
var setextUnderline = {
  name: "setextUnderline",
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length;
  let content3;
  let text6;
  let definition2;
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content3 = index2;
        break;
      }
      if (events[index2][1].type === "paragraph") {
        text6 = index2;
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1);
      }
      if (!definition2 && events[index2][1].type === "definition") {
        definition2 = index2;
      }
    }
  }
  const heading2 = {
    type: "setextHeading",
    start: Object.assign({}, events[text6][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  events[text6][1].type = "setextHeadingText";
  if (definition2) {
    events.splice(text6, 0, ["enter", heading2, context]);
    events.splice(definition2 + 1, 0, ["exit", events[content3][1], context]);
    events[content3][1].end = Object.assign({}, events[definition2][1].end);
  } else {
    events[content3][1] = heading2;
  }
  events.push(["exit", heading2, context]);
  return events;
}
function tokenizeSetextUnderline(effects, ok2, nok) {
  const self = this;
  let index2 = self.events.length;
  let marker;
  let paragraph2;
  while (index2--) {
    if (self.events[index2][1].type !== "lineEnding" && self.events[index2][1].type !== "linePrefix" && self.events[index2][1].type !== "content") {
      paragraph2 = self.events[index2][1].type === "paragraph";
      break;
    }
  }
  return start;
  function start(code3) {
    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph2)) {
      effects.enter("setextHeadingLine");
      effects.enter("setextHeadingLineSequence");
      marker = code3;
      return closingSequence(code3);
    }
    return nok(code3);
  }
  function closingSequence(code3) {
    if (code3 === marker) {
      effects.consume(code3);
      return closingSequence;
    }
    effects.exit("setextHeadingLineSequence");
    return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code3);
  }
  function closingSequenceEnd(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      effects.exit("setextHeadingLine");
      return ok2(code3);
    }
    return nok(code3);
  }
}

// node_modules/micromark/lib/initialize/flow.js
var flow = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self = this;
  const initial = effects.attempt(
    // Try to parse a blank line.
    blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content2, afterConstruct)
        ),
        "linePrefix"
      )
    )
  );
  return initial;
  function atBlankEnding(code3) {
    if (code3 === null) {
      effects.consume(code3);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code3);
    effects.exit("lineEndingBlank");
    self.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code3) {
    if (code3 === null) {
      effects.consume(code3);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code3);
    effects.exit("lineEnding");
    self.currentConstruct = void 0;
    return initial;
  }
}

// node_modules/micromark/lib/initialize/text.js
var resolver = {
  resolveAll: createResolver()
};
var string = initializeFactory("string");
var text = initializeFactory("text");
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === "text" ? resolveAllLineSuffixes : void 0
    )
  };
  function initializeText(effects) {
    const self = this;
    const constructs2 = this.parser.constructs[field];
    const text6 = effects.attempt(constructs2, start, notText);
    return start;
    function start(code3) {
      return atBreak(code3) ? text6(code3) : notText(code3);
    }
    function notText(code3) {
      if (code3 === null) {
        effects.consume(code3);
        return;
      }
      effects.enter("data");
      effects.consume(code3);
      return data;
    }
    function data(code3) {
      if (atBreak(code3)) {
        effects.exit("data");
        return text6(code3);
      }
      effects.consume(code3);
      return data;
    }
    function atBreak(code3) {
      if (code3 === null) {
        return true;
      }
      const list3 = constructs2[code3];
      let index2 = -1;
      if (list3) {
        while (++index2 < list3.length) {
          const item = list3[index2];
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex)
            break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1) {
        } else {
          index2++;
          break;
        }
      }
      if (size) {
        const token = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index2,
            _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex
          },
          end: Object.assign({}, data.end)
        };
        data.end = Object.assign({}, token.start);
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token);
        } else {
          events.splice(
            eventIndex,
            0,
            ["enter", token, context],
            ["exit", token, context]
          );
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}

// node_modules/micromark/lib/create-tokenizer.js
function createTokenizer(parser2, initialize, from) {
  let point5 = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  let consumed = true;
  const effects = {
    consume,
    enter,
    exit: exit3,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser: parser2,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  let expectedCode;
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    return Object.assign({}, point5);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point5._index < chunks.length) {
      const chunk = chunks[point5._index];
      if (typeof chunk === "string") {
        chunkIndex = point5._index;
        if (point5._bufferIndex < 0) {
          point5._bufferIndex = 0;
        }
        while (point5._index === chunkIndex && point5._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point5._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code3) {
    consumed = void 0;
    expectedCode = code3;
    state = state(code3);
  }
  function consume(code3) {
    if (markdownLineEnding(code3)) {
      point5.line++;
      point5.column = 1;
      point5.offset += code3 === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code3 !== -1) {
      point5.column++;
      point5.offset++;
    }
    if (point5._bufferIndex < 0) {
      point5._index++;
    } else {
      point5._bufferIndex++;
      if (point5._bufferIndex === chunks[point5._index].length) {
        point5._bufferIndex = -1;
        point5._index++;
      }
    }
    context.previous = code3;
    consumed = true;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit3(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? (
        /* c8 ignore next 1 */
        handleListOfConstructs(constructs2)
      ) : "tokenize" in constructs2 ? handleListOfConstructs([constructs2]) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map2) {
        return start;
        function start(code3) {
          const def = code3 !== null && map2[code3];
          const all7 = code3 !== null && map2.null;
          const list3 = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all7) ? all7 : all7 ? [all7] : []
          ];
          return handleListOfConstructs(list3)(code3);
        }
      }
      function handleListOfConstructs(list3) {
        listOfConstructs = list3;
        constructIndex = 0;
        if (list3.length === 0) {
          return bogusState;
        }
        return handleConstruct(list3[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code3) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok(code3);
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok2,
            nok
          )(code3);
        }
      }
      function ok2(code3) {
        consumed = true;
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code3) {
        consumed = true;
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point5 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point5.line in columnStart && point5.column < 2) {
      point5.column = columnStart[point5.line];
      point5.offset += columnStart[point5.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

// node_modules/micromark/lib/constructs.js
var constructs_exports = {};
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document3,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2
});
var document3 = {
  [42]: list,
  [43]: list,
  [45]: list,
  [48]: list,
  [49]: list,
  [50]: list,
  [51]: list,
  [52]: list,
  [53]: list,
  [54]: list,
  [55]: list,
  [56]: list,
  [57]: list,
  [62]: blockQuote
};
var contentInitial = {
  [91]: definition
};
var flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
var flow2 = {
  [35]: headingAtx,
  [42]: thematicBreak,
  [45]: [setextUnderline, thematicBreak],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak,
  [96]: codeFenced,
  [126]: codeFenced
};
var string2 = {
  [38]: characterReference,
  [92]: characterEscape
};
var text2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
var insideSpan = {
  null: [attention, resolver]
};
var attentionMarkers = {
  null: [42, 95]
};
var disable = {
  null: []
};

// node_modules/micromark/lib/parse.js
function parse(options = {}) {
  const constructs2 = combineExtensions(
    // @ts-expect-error Same as above.
    [constructs_exports].concat(options.extensions || [])
  );
  const parser2 = {
    defined: [],
    lazy: {},
    constructs: constructs2,
    content: create2(content),
    document: create2(document2),
    flow: create2(flow),
    string: create2(string),
    text: create2(text)
  };
  return parser2;
  function create2(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser2, initial, from);
    }
  }
}

// node_modules/micromark/lib/preprocess.js
var search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer2 = "";
  let start = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code3;
    value = buffer2 + value.toString(encoding);
    startPosition = 0;
    buffer2 = "";
    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match && match.index !== void 0 ? match.index : value.length;
      code3 = value.charCodeAt(endPosition);
      if (!match) {
        buffer2 = value.slice(startPosition);
        break;
      }
      if (code3 === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code3) {
          case 0: {
            chunks.push(65533);
            column++;
            break;
          }
          case 9: {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next)
              chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn)
        chunks.push(-5);
      if (buffer2)
        chunks.push(buffer2);
      chunks.push(null);
    }
    return chunks;
  }
}

// node_modules/micromark/lib/postprocess.js
function postprocess(events) {
  while (!subtokenize(events)) {
  }
  return events;
}

// node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value, base3) {
  const code3 = Number.parseInt(value, base3);
  if (
    // C0 except for HT, LF, FF, CR, space
    code3 < 9 || code3 === 11 || code3 > 13 && code3 < 32 || // Control character (DEL) of the basic block and C1 controls.
    code3 > 126 && code3 < 160 || // Lone high surrogates and low surrogates.
    code3 > 55295 && code3 < 57344 || // Noncharacters.
    code3 > 64975 && code3 < 65008 || (code3 & 65535) === 65535 || (code3 & 65535) === 65534 || // Out of range
    code3 > 1114111
  ) {
    return "\uFFFD";
  }
  return String.fromCharCode(code3);
}

// node_modules/micromark-util-decode-string/index.js
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head2 = $2.charCodeAt(0);
  if (head2 === 35) {
    const head3 = $2.charCodeAt(1);
    const hex = head3 === 120 || head3 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}

// node_modules/mdast-util-from-markdown/lib/index.js
var own2 = {}.hasOwnProperty;
var fromMarkdown = (
  /**
   * @type {(
   *   ((value: Value, encoding: Encoding, options?: Options | null | undefined) => Root) &
   *   ((value: Value, options?: Options | null | undefined) => Root)
   * )}
   */
  /**
   * @param {Value} value
   * @param {Encoding | Options | null | undefined} [encoding]
   * @param {Options | null | undefined} [options]
   * @returns {Root}
   */
  function(value, encoding, options) {
    if (typeof encoding !== "string") {
      options = encoding;
      encoding = void 0;
    }
    return compiler(options)(
      postprocess(
        // @ts-expect-error: micromark types need to accept `null`.
        parse(options).document().write(preprocess()(value, encoding, true))
      )
    );
  }
);
function compiler(options) {
  const config = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: opener(link2),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading2),
      blockQuote: opener(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer2,
      codeFencedFenceMeta: buffer2,
      codeIndented: opener(codeFlow, buffer2),
      codeText: opener(codeText2, buffer2),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition2),
      definitionDestinationString: buffer2,
      definitionLabelString: buffer2,
      definitionTitleString: buffer2,
      emphasis: opener(emphasis2),
      hardBreakEscape: opener(hardBreak2),
      hardBreakTrailing: opener(hardBreak2),
      htmlFlow: opener(html6, buffer2),
      htmlFlowData: onenterdata,
      htmlText: opener(html6, buffer2),
      htmlTextData: onenterdata,
      image: opener(image2),
      label: buffer2,
      link: opener(link2),
      listItem: opener(listItem3),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list3, onenterlistordered),
      listUnordered: opener(list3),
      paragraph: opener(paragraph2),
      reference: onenterreference,
      referenceString: buffer2,
      resourceDestinationString: buffer2,
      resourceTitleString: buffer2,
      setextHeading: opener(heading2),
      strong: opener(strong2),
      thematicBreak: opener(thematicBreak3)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  };
  configure(config, (options || {}).mdastExtensions || []);
  const data = {};
  return compile2;
  function compile2(events) {
    let tree = {
      type: "root",
      children: []
    };
    const context = {
      stack: [tree],
      tokenStack: [],
      config,
      enter,
      exit: exit3,
      buffer: buffer2,
      resume,
      setData,
      getData
    };
    const listStack = [];
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
        if (events[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler = config[events[index2][0]];
      if (own2.call(handler, events[index2][1].type)) {
        handler[events[index2][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index2][2].sliceSerialize
            },
            context
          ),
          events[index2][1]
        );
      }
    }
    if (context.tokenStack.length > 0) {
      const tail = context.tokenStack[context.tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(
        events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: point2(
        events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events, start, length) {
    let index2 = start - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem4;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
        if (event[0] === "enter") {
          containerBalance++;
        } else {
          containerBalance--;
        }
        atMarker = void 0;
      } else if (event[1].type === "lineEndingBlank") {
        if (event[0] === "enter") {
          if (listItem4 && !atMarker && !containerBalance && !firstBlankLineIndex) {
            firstBlankLineIndex = index2;
          }
          atMarker = void 0;
        }
      } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {
      } else {
        atMarker = void 0;
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem4) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit")
                continue;
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
            } else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem4._spread = true;
          }
          listItem4.end = Object.assign(
            {},
            lineIndex ? events[lineIndex][1].start : event[1].end
          );
          events.splice(lineIndex || index2, 0, ["exit", listItem4, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          listItem4 = {
            type: "listItem",
            // @ts-expect-error Patched
            _spread: false,
            start: Object.assign({}, event[1].start)
          };
          events.splice(index2, 0, ["enter", listItem4, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start][1]._spread = listSpread;
    return length;
  }
  function setData(key2, value) {
    data[key2] = value;
  }
  function getData(key2) {
    return data[key2];
  }
  function opener(create2, and) {
    return open;
    function open(token) {
      enter.call(this, create2(token), token);
      if (and)
        and.call(this, token);
    }
  }
  function buffer2() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter(node2, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node2);
    this.stack.push(node2);
    this.tokenStack.push([token, errorHandler]);
    node2.position = {
      start: point2(token.start)
    };
    return node2;
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and)
        and.call(this, token);
      exit3.call(this, token);
    }
  }
  function exit3(token, onExitError) {
    const node2 = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node2.position.end = point2(token.end);
    return node2;
  }
  function resume() {
    return toString2(this.stack.pop());
  }
  function onenterlistordered() {
    setData("expectingFirstListItemValue", true);
  }
  function onenterlistitemvalue(token) {
    if (getData("expectingFirstListItemValue")) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
      setData("expectingFirstListItemValue");
    }
  }
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.lang = data2;
  }
  function onexitcodefencedfencemeta() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.meta = data2;
  }
  function onexitcodefencedfence() {
    if (getData("flowCodeInside"))
      return;
    this.buffer();
    setData("flowCodeInside", true);
  }
  function onexitcodefenced() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    setData("flowCodeInside");
  }
  function onexitcodeindented() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  function onexitatxheadingsequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    if (!node2.depth) {
      const depth = this.sliceSerialize(token).length;
      node2.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    setData("setextHeadingSlurpLineEnding", true);
  }
  function onexitsetextheadinglinesequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    node2.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    setData("setextHeadingSlurpLineEnding");
  }
  function onenterdata(token) {
    const node2 = this.stack[this.stack.length - 1];
    let tail = node2.children[node2.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text6();
      tail.position = {
        start: point2(token.start)
      };
      node2.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point2(token.end);
  }
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1];
    if (getData("atHardBreak")) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token.end);
      setData("atHardBreak");
      return;
    }
    if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.includes(context.type)) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }
  function onexithardbreak() {
    setData("atHardBreak", true);
  }
  function onexithtmlflow() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexithtmltext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexitcodetext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  function onexitlink() {
    const node2 = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      const referenceType = getData("referenceType") || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    setData("referenceType");
  }
  function onexitimage() {
    const node2 = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      const referenceType = getData("referenceType") || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    setData("referenceType");
  }
  function onexitlabeltext(token) {
    const string3 = this.sliceSerialize(token);
    const ancestor = this.stack[this.stack.length - 2];
    ancestor.label = decodeString(string3);
    ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    setData("inReference", true);
    if (node2.type === "link") {
      const children = fragment.children;
      node2.children = children;
    } else {
      node2.alt = value;
    }
  }
  function onexitresourcedestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  function onexitresourcetitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  function onexitresource() {
    setData("inReference");
  }
  function onenterreference() {
    setData("referenceType", "collapsed");
  }
  function onexitreferencestring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    setData("referenceType", "full");
  }
  function onexitcharacterreferencemarker(token) {
    setData("characterReferenceType", token.type);
  }
  function onexitcharacterreferencevalue(token) {
    const data2 = this.sliceSerialize(token);
    const type = getData("characterReferenceType");
    let value;
    if (type) {
      value = decodeNumericCharacterReference(
        data2,
        type === "characterReferenceMarkerNumeric" ? 10 : 16
      );
      setData("characterReferenceType");
    } else {
      const result = decodeNamedCharacterReference(data2);
      value = result;
    }
    const tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point2(token.end);
  }
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = this.sliceSerialize(token);
  }
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = "mailto:" + this.sliceSerialize(token);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis2() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading2() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  function hardBreak2() {
    return {
      type: "break"
    };
  }
  function html6() {
    return {
      type: "html",
      value: ""
    };
  }
  function image2() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link2() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list3(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      // @ts-expect-error Patched.
      spread: token._spread,
      children: []
    };
  }
  function listItem3(token) {
    return {
      type: "listItem",
      // @ts-expect-error Patched.
      spread: token._spread,
      checked: null,
      children: []
    };
  }
  function paragraph2() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong2() {
    return {
      type: "strong",
      children: []
    };
  }
  function text6() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak3() {
    return {
      type: "thematicBreak"
    };
  }
}
function point2(d) {
  return {
    line: d.line,
    column: d.column,
    offset: d.offset
  };
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
}
function extension(combined, extension2) {
  let key2;
  for (key2 in extension2) {
    if (own2.call(extension2, key2)) {
      if (key2 === "canContainEols") {
        const right = extension2[key2];
        if (right) {
          combined[key2].push(...right);
        }
      } else if (key2 === "transforms") {
        const right = extension2[key2];
        if (right) {
          combined[key2].push(...right);
        }
      } else if (key2 === "enter" || key2 === "exit") {
        const right = extension2[key2];
        if (right) {
          Object.assign(combined[key2], right);
        }
      }
    }
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}

// node_modules/remark-parse/lib/index.js
function remarkParse(options) {
  const parser2 = (doc) => {
    const settings = (
      /** @type {Options} */
      this.data("settings")
    );
    return fromMarkdown(
      doc,
      Object.assign({}, settings, options, {
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: this.data("micromarkExtensions") || [],
        mdastExtensions: this.data("fromMarkdownExtensions") || []
      })
    );
  };
  Object.assign(this, { Parser: parser2 });
}

// node_modules/remark-parse/index.js
var remark_parse_default = remarkParse;

// node_modules/micromark-extension-gfm-autolink-literal/lib/syntax.js
var www = {
  tokenize: tokenizeWww,
  partial: true
};
var domain = {
  tokenize: tokenizeDomain,
  partial: true
};
var path2 = {
  tokenize: tokenizePath,
  partial: true
};
var punctuation = {
  tokenize: tokenizePunctuation,
  partial: true
};
var namedCharacterReference = {
  tokenize: tokenizeNamedCharacterReference,
  partial: true
};
var wwwAutolink = {
  tokenize: tokenizeWwwAutolink,
  previous: previousWww
};
var httpAutolink = {
  tokenize: tokenizeHttpAutolink,
  previous: previousHttp
};
var emailAutolink = {
  tokenize: tokenizeEmailAutolink,
  previous: previousEmail
};
var text3 = {};
var gfmAutolinkLiteral = {
  text: text3
};
var code = 48;
while (code < 123) {
  text3[code] = emailAutolink;
  code++;
  if (code === 58)
    code = 65;
  else if (code === 91)
    code = 97;
}
text3[43] = emailAutolink;
text3[45] = emailAutolink;
text3[46] = emailAutolink;
text3[95] = emailAutolink;
text3[72] = [emailAutolink, httpAutolink];
text3[104] = [emailAutolink, httpAutolink];
text3[87] = [emailAutolink, wwwAutolink];
text3[119] = [emailAutolink, wwwAutolink];
function tokenizeEmailAutolink(effects, ok2, nok) {
  const self = this;
  let hasDot;
  let hasDigitInLastSegment;
  return start;
  function start(code3) {
    if (!gfmAtext(code3) || !previousEmail(self.previous) || previousUnbalanced(self.events)) {
      return nok(code3);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkEmail");
    return atext(code3);
  }
  function atext(code3) {
    if (gfmAtext(code3)) {
      effects.consume(code3);
      return atext;
    }
    if (code3 === 64) {
      effects.consume(code3);
      return label;
    }
    return nok(code3);
  }
  function label(code3) {
    if (code3 === 46) {
      return effects.check(punctuation, done, dotContinuation)(code3);
    }
    if (code3 === 45 || code3 === 95) {
      return effects.check(punctuation, nok, dashOrUnderscoreContinuation)(code3);
    }
    if (asciiAlphanumeric(code3)) {
      if (!hasDigitInLastSegment && asciiDigit(code3)) {
        hasDigitInLastSegment = true;
      }
      effects.consume(code3);
      return label;
    }
    return done(code3);
  }
  function dotContinuation(code3) {
    effects.consume(code3);
    hasDot = true;
    hasDigitInLastSegment = void 0;
    return label;
  }
  function dashOrUnderscoreContinuation(code3) {
    effects.consume(code3);
    return afterDashOrUnderscore;
  }
  function afterDashOrUnderscore(code3) {
    if (code3 === 46) {
      return effects.check(punctuation, nok, dotContinuation)(code3);
    }
    return label(code3);
  }
  function done(code3) {
    if (hasDot && !hasDigitInLastSegment) {
      effects.exit("literalAutolinkEmail");
      effects.exit("literalAutolink");
      return ok2(code3);
    }
    return nok(code3);
  }
}
function tokenizeWwwAutolink(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    if (code3 !== 87 && code3 !== 119 || !previousWww(self.previous) || previousUnbalanced(self.events)) {
      return nok(code3);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkWww");
    return effects.check(
      www,
      effects.attempt(domain, effects.attempt(path2, done), nok),
      nok
    )(code3);
  }
  function done(code3) {
    effects.exit("literalAutolinkWww");
    effects.exit("literalAutolink");
    return ok2(code3);
  }
}
function tokenizeHttpAutolink(effects, ok2, nok) {
  const self = this;
  return start;
  function start(code3) {
    if (code3 !== 72 && code3 !== 104 || !previousHttp(self.previous) || previousUnbalanced(self.events)) {
      return nok(code3);
    }
    effects.enter("literalAutolink");
    effects.enter("literalAutolinkHttp");
    effects.consume(code3);
    return t1;
  }
  function t1(code3) {
    if (code3 === 84 || code3 === 116) {
      effects.consume(code3);
      return t2;
    }
    return nok(code3);
  }
  function t2(code3) {
    if (code3 === 84 || code3 === 116) {
      effects.consume(code3);
      return p2;
    }
    return nok(code3);
  }
  function p2(code3) {
    if (code3 === 80 || code3 === 112) {
      effects.consume(code3);
      return s2;
    }
    return nok(code3);
  }
  function s2(code3) {
    if (code3 === 83 || code3 === 115) {
      effects.consume(code3);
      return colon;
    }
    return colon(code3);
  }
  function colon(code3) {
    if (code3 === 58) {
      effects.consume(code3);
      return slash1;
    }
    return nok(code3);
  }
  function slash1(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      return slash2;
    }
    return nok(code3);
  }
  function slash2(code3) {
    if (code3 === 47) {
      effects.consume(code3);
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    return code3 === null || asciiControl(code3) || unicodeWhitespace(code3) || unicodePunctuation(code3) ? nok(code3) : effects.attempt(domain, effects.attempt(path2, done), nok)(code3);
  }
  function done(code3) {
    effects.exit("literalAutolinkHttp");
    effects.exit("literalAutolink");
    return ok2(code3);
  }
}
function tokenizeWww(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.consume(code3);
    return w2;
  }
  function w2(code3) {
    if (code3 === 87 || code3 === 119) {
      effects.consume(code3);
      return w3;
    }
    return nok(code3);
  }
  function w3(code3) {
    if (code3 === 87 || code3 === 119) {
      effects.consume(code3);
      return dot;
    }
    return nok(code3);
  }
  function dot(code3) {
    if (code3 === 46) {
      effects.consume(code3);
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    return code3 === null || markdownLineEnding(code3) ? nok(code3) : ok2(code3);
  }
}
function tokenizeDomain(effects, ok2, nok) {
  let hasUnderscoreInLastSegment;
  let hasUnderscoreInLastLastSegment;
  return domain2;
  function domain2(code3) {
    if (code3 === 38) {
      return effects.check(
        namedCharacterReference,
        done,
        punctuationContinuation
      )(code3);
    }
    if (code3 === 46 || code3 === 95) {
      return effects.check(punctuation, done, punctuationContinuation)(code3);
    }
    if (code3 === null || asciiControl(code3) || unicodeWhitespace(code3) || code3 !== 45 && unicodePunctuation(code3)) {
      return done(code3);
    }
    effects.consume(code3);
    return domain2;
  }
  function punctuationContinuation(code3) {
    if (code3 === 46) {
      hasUnderscoreInLastLastSegment = hasUnderscoreInLastSegment;
      hasUnderscoreInLastSegment = void 0;
      effects.consume(code3);
      return domain2;
    }
    if (code3 === 95)
      hasUnderscoreInLastSegment = true;
    effects.consume(code3);
    return domain2;
  }
  function done(code3) {
    if (!hasUnderscoreInLastLastSegment && !hasUnderscoreInLastSegment) {
      return ok2(code3);
    }
    return nok(code3);
  }
}
function tokenizePath(effects, ok2) {
  let balance = 0;
  return inPath;
  function inPath(code3) {
    if (code3 === 38) {
      return effects.check(
        namedCharacterReference,
        ok2,
        continuedPunctuation
      )(code3);
    }
    if (code3 === 40) {
      balance++;
    }
    if (code3 === 41) {
      return effects.check(
        punctuation,
        parenAtPathEnd,
        continuedPunctuation
      )(code3);
    }
    if (pathEnd(code3)) {
      return ok2(code3);
    }
    if (trailingPunctuation(code3)) {
      return effects.check(punctuation, ok2, continuedPunctuation)(code3);
    }
    effects.consume(code3);
    return inPath;
  }
  function continuedPunctuation(code3) {
    effects.consume(code3);
    return inPath;
  }
  function parenAtPathEnd(code3) {
    balance--;
    return balance < 0 ? ok2(code3) : continuedPunctuation(code3);
  }
}
function tokenizeNamedCharacterReference(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.consume(code3);
    return inside;
  }
  function inside(code3) {
    if (asciiAlpha(code3)) {
      effects.consume(code3);
      return inside;
    }
    if (code3 === 59) {
      effects.consume(code3);
      return after;
    }
    return nok(code3);
  }
  function after(code3) {
    return pathEnd(code3) ? ok2(code3) : nok(code3);
  }
}
function tokenizePunctuation(effects, ok2, nok) {
  return start;
  function start(code3) {
    effects.consume(code3);
    return after;
  }
  function after(code3) {
    if (trailingPunctuation(code3)) {
      effects.consume(code3);
      return after;
    }
    return pathEnd(code3) ? ok2(code3) : nok(code3);
  }
}
function trailingPunctuation(code3) {
  return code3 === 33 || code3 === 34 || code3 === 39 || code3 === 41 || code3 === 42 || code3 === 44 || code3 === 46 || code3 === 58 || code3 === 59 || code3 === 60 || code3 === 63 || code3 === 95 || code3 === 126;
}
function pathEnd(code3) {
  return code3 === null || code3 === 60 || markdownLineEndingOrSpace(code3);
}
function gfmAtext(code3) {
  return code3 === 43 || code3 === 45 || code3 === 46 || code3 === 95 || asciiAlphanumeric(code3);
}
function previousWww(code3) {
  return code3 === null || code3 === 40 || code3 === 42 || code3 === 95 || code3 === 126 || markdownLineEndingOrSpace(code3);
}
function previousHttp(code3) {
  return code3 === null || !asciiAlpha(code3);
}
function previousEmail(code3) {
  return code3 !== 47 && previousHttp(code3);
}
function previousUnbalanced(events) {
  let index2 = events.length;
  let result = false;
  while (index2--) {
    const token = events[index2][1];
    if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
      result = true;
      break;
    }
    if (token._gfmAutolinkLiteralWalkedInto) {
      result = false;
      break;
    }
  }
  if (events.length > 0 && !result) {
    events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return result;
}

// node_modules/micromark-util-sanitize-uri/index.js
function normalizeUri(value) {
  const result = [];
  let index2 = -1;
  let start = 0;
  let skip = 0;
  while (++index2 < value.length) {
    const code3 = value.charCodeAt(index2);
    let replace2 = "";
    if (code3 === 37 && asciiAlphanumeric(value.charCodeAt(index2 + 1)) && asciiAlphanumeric(value.charCodeAt(index2 + 2))) {
      skip = 2;
    } else if (code3 < 128) {
      if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code3))) {
        replace2 = String.fromCharCode(code3);
      }
    } else if (code3 > 55295 && code3 < 57344) {
      const next = value.charCodeAt(index2 + 1);
      if (code3 < 56320 && next > 56319 && next < 57344) {
        replace2 = String.fromCharCode(code3, next);
        skip = 1;
      } else {
        replace2 = "\uFFFD";
      }
    } else {
      replace2 = String.fromCharCode(code3);
    }
    if (replace2) {
      result.push(value.slice(start, index2), encodeURIComponent(replace2));
      start = index2 + skip + 1;
      replace2 = "";
    }
    if (skip) {
      index2 += skip;
      skip = 0;
    }
  }
  return result.join("") + value.slice(start);
}

// node_modules/micromark-extension-gfm-footnote/lib/syntax.js
var indent = {
  tokenize: tokenizeIndent2,
  partial: true
};
function gfmFootnote() {
  return {
    document: {
      [91]: {
        tokenize: tokenizeDefinitionStart,
        continuation: {
          tokenize: tokenizeDefinitionContinuation
        },
        exit: gfmFootnoteDefinitionEnd
      }
    },
    text: {
      [91]: {
        tokenize: tokenizeGfmFootnoteCall
      },
      [93]: {
        add: "after",
        tokenize: tokenizePotentialGfmFootnoteCall,
        resolveTo: resolveToPotentialGfmFootnoteCall
      }
    }
  };
}
function tokenizePotentialGfmFootnoteCall(effects, ok2, nok) {
  const self = this;
  let index2 = self.events.length;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let labelStart;
  while (index2--) {
    const token = self.events[index2][1];
    if (token.type === "labelImage") {
      labelStart = token;
      break;
    }
    if (token.type === "gfmFootnoteCall" || token.type === "labelLink" || token.type === "label" || token.type === "image" || token.type === "link") {
      break;
    }
  }
  return start;
  function start(code3) {
    if (!labelStart || !labelStart._balanced) {
      return nok(code3);
    }
    const id2 = normalizeIdentifier(
      self.sliceSerialize({
        start: labelStart.end,
        end: self.now()
      })
    );
    if (id2.charCodeAt(0) !== 94 || !defined.includes(id2.slice(1))) {
      return nok(code3);
    }
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallLabelMarker");
    return ok2(code3);
  }
}
function resolveToPotentialGfmFootnoteCall(events, context) {
  let index2 = events.length;
  let labelStart;
  while (index2--) {
    if (events[index2][1].type === "labelImage" && events[index2][0] === "enter") {
      labelStart = events[index2][1];
      break;
    }
  }
  events[index2 + 1][1].type = "data";
  events[index2 + 3][1].type = "gfmFootnoteCallLabelMarker";
  const call = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, events[index2 + 3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const marker = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, events[index2 + 3][1].end),
    end: Object.assign({}, events[index2 + 3][1].end)
  };
  marker.end.column++;
  marker.end.offset++;
  marker.end._bufferIndex++;
  const string3 = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, marker.end),
    end: Object.assign({}, events[events.length - 1][1].start)
  };
  const chunk = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, string3.start),
    end: Object.assign({}, string3.end)
  };
  const replacement = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    events[index2 + 1],
    events[index2 + 2],
    ["enter", call, context],
    // The `[`
    events[index2 + 3],
    events[index2 + 4],
    // The `^`.
    ["enter", marker, context],
    ["exit", marker, context],
    // Everything in between.
    ["enter", string3, context],
    ["enter", chunk, context],
    ["exit", chunk, context],
    ["exit", string3, context],
    // The ending (`]`, properly parsed and labelled).
    events[events.length - 2],
    events[events.length - 1],
    ["exit", call, context]
  ];
  events.splice(index2, events.length - index2 + 1, ...replacement);
  return events;
}
function tokenizeGfmFootnoteCall(effects, ok2, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let size = 0;
  let data;
  return start;
  function start(code3) {
    effects.enter("gfmFootnoteCall");
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallLabelMarker");
    return callStart;
  }
  function callStart(code3) {
    if (code3 !== 94)
      return nok(code3);
    effects.enter("gfmFootnoteCallMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallMarker");
    effects.enter("gfmFootnoteCallString");
    effects.enter("chunkString").contentType = "string";
    return callData;
  }
  function callData(code3) {
    let token;
    if (code3 === null || code3 === 91 || size++ > 999) {
      return nok(code3);
    }
    if (code3 === 93) {
      if (!data) {
        return nok(code3);
      }
      effects.exit("chunkString");
      token = effects.exit("gfmFootnoteCallString");
      return defined.includes(normalizeIdentifier(self.sliceSerialize(token))) ? end(code3) : nok(code3);
    }
    effects.consume(code3);
    if (!markdownLineEndingOrSpace(code3)) {
      data = true;
    }
    return code3 === 92 ? callEscape : callData;
  }
  function callEscape(code3) {
    if (code3 === 91 || code3 === 92 || code3 === 93) {
      effects.consume(code3);
      size++;
      return callData;
    }
    return callData(code3);
  }
  function end(code3) {
    effects.enter("gfmFootnoteCallLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteCallLabelMarker");
    effects.exit("gfmFootnoteCall");
    return ok2;
  }
}
function tokenizeDefinitionStart(effects, ok2, nok) {
  const self = this;
  const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
  let identifier;
  let size = 0;
  let data;
  return start;
  function start(code3) {
    effects.enter("gfmFootnoteDefinition")._container = true;
    effects.enter("gfmFootnoteDefinitionLabel");
    effects.enter("gfmFootnoteDefinitionLabelMarker");
    effects.consume(code3);
    effects.exit("gfmFootnoteDefinitionLabelMarker");
    return labelStart;
  }
  function labelStart(code3) {
    if (code3 === 94) {
      effects.enter("gfmFootnoteDefinitionMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteDefinitionMarker");
      effects.enter("gfmFootnoteDefinitionLabelString");
      return atBreak;
    }
    return nok(code3);
  }
  function atBreak(code3) {
    let token;
    if (code3 === null || code3 === 91 || size > 999) {
      return nok(code3);
    }
    if (code3 === 93) {
      if (!data) {
        return nok(code3);
      }
      token = effects.exit("gfmFootnoteDefinitionLabelString");
      identifier = normalizeIdentifier(self.sliceSerialize(token));
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      effects.exit("gfmFootnoteDefinitionLabel");
      return labelAfter;
    }
    if (markdownLineEnding(code3)) {
      effects.enter("lineEnding");
      effects.consume(code3);
      effects.exit("lineEnding");
      size++;
      return atBreak;
    }
    effects.enter("chunkString").contentType = "string";
    return label(code3);
  }
  function label(code3) {
    if (code3 === null || markdownLineEnding(code3) || code3 === 91 || code3 === 93 || size > 999) {
      effects.exit("chunkString");
      return atBreak(code3);
    }
    if (!markdownLineEndingOrSpace(code3)) {
      data = true;
    }
    size++;
    effects.consume(code3);
    return code3 === 92 ? labelEscape : label;
  }
  function labelEscape(code3) {
    if (code3 === 91 || code3 === 92 || code3 === 93) {
      effects.consume(code3);
      size++;
      return label;
    }
    return label(code3);
  }
  function labelAfter(code3) {
    if (code3 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code3);
      effects.exit("definitionMarker");
      return factorySpace(effects, done, "gfmFootnoteDefinitionWhitespace");
    }
    return nok(code3);
  }
  function done(code3) {
    if (!defined.includes(identifier)) {
      defined.push(identifier);
    }
    return ok2(code3);
  }
}
function tokenizeDefinitionContinuation(effects, ok2, nok) {
  return effects.check(blankLine, ok2, effects.attempt(indent, ok2, nok));
}
function gfmFootnoteDefinitionEnd(effects) {
  effects.exit("gfmFootnoteDefinition");
}
function tokenizeIndent2(effects, ok2, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "gfmFootnoteDefinitionIndent",
    4 + 1
  );
  function afterPrefix(code3) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === 4 ? ok2(code3) : nok(code3);
  }
}

// node_modules/micromark-extension-gfm-strikethrough/lib/syntax.js
function gfmStrikethrough(options = {}) {
  let single = options.singleTilde;
  const tokenizer = {
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  };
  if (single === null || single === void 0) {
    single = true;
  }
  return {
    text: {
      [126]: tokenizer
    },
    insideSpan: {
      null: [tokenizer]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function resolveAllStrikethrough(events, context) {
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][0] === "enter" && events[index2][1].type === "strikethroughSequenceTemporary" && events[index2][1]._close) {
        let open = index2;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && // If the sizes are the same:
          events[index2][1].end.offset - events[index2][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
            events[index2][1].type = "strikethroughSequence";
            events[open][1].type = "strikethroughSequence";
            const strikethrough2 = {
              type: "strikethrough",
              start: Object.assign({}, events[open][1].start),
              end: Object.assign({}, events[index2][1].end)
            };
            const text6 = {
              type: "strikethroughText",
              start: Object.assign({}, events[open][1].end),
              end: Object.assign({}, events[index2][1].start)
            };
            const nextEvents = [
              ["enter", strikethrough2, context],
              ["enter", events[open][1], context],
              ["exit", events[open][1], context],
              ["enter", text6, context]
            ];
            splice(
              nextEvents,
              nextEvents.length,
              0,
              resolveAll(
                context.parser.constructs.insideSpan.null,
                events.slice(open + 1, index2),
                context
              )
            );
            splice(nextEvents, nextEvents.length, 0, [
              ["exit", text6, context],
              ["enter", events[index2][1], context],
              ["exit", events[index2][1], context],
              ["exit", strikethrough2, context]
            ]);
            splice(events, open - 1, index2 - open + 3, nextEvents);
            index2 = open + nextEvents.length - 2;
            break;
          }
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "strikethroughSequenceTemporary") {
        events[index2][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeStrikethrough(effects, ok2, nok) {
    const previous3 = this.previous;
    const events = this.events;
    let size = 0;
    return start;
    function start(code3) {
      if (previous3 === 126 && events[events.length - 1][1].type !== "characterEscape") {
        return nok(code3);
      }
      effects.enter("strikethroughSequenceTemporary");
      return more(code3);
    }
    function more(code3) {
      const before = classifyCharacter(previous3);
      if (code3 === 126) {
        if (size > 1)
          return nok(code3);
        effects.consume(code3);
        size++;
        return more;
      }
      if (size < 2 && !single)
        return nok(code3);
      const token = effects.exit("strikethroughSequenceTemporary");
      const after = classifyCharacter(code3);
      token._open = !after || after === 2 && Boolean(before);
      token._close = !before || before === 2 && Boolean(after);
      return ok2(code3);
    }
  }
}

// node_modules/micromark-extension-gfm-table/lib/syntax.js
var gfmTable = {
  flow: {
    null: {
      tokenize: tokenizeTable,
      resolve: resolveTable
    }
  }
};
var nextPrefixedOrBlank = {
  tokenize: tokenizeNextPrefixedOrBlank,
  partial: true
};
function resolveTable(events, context) {
  let index2 = -1;
  let inHead;
  let inDelimiterRow;
  let inRow;
  let contentStart;
  let contentEnd;
  let cellStart;
  let seenCellInRow;
  while (++index2 < events.length) {
    const token = events[index2][1];
    if (inRow) {
      if (token.type === "temporaryTableCellContent") {
        contentStart = contentStart || index2;
        contentEnd = index2;
      }
      if (
        // Combine separate content parts into one.
        (token.type === "tableCellDivider" || token.type === "tableRow") && contentEnd
      ) {
        const content3 = {
          type: "tableContent",
          start: events[contentStart][1].start,
          end: events[contentEnd][1].end
        };
        const text6 = {
          type: "chunkText",
          start: content3.start,
          end: content3.end,
          // @ts-expect-error It’s fine.
          contentType: "text"
        };
        events.splice(
          contentStart,
          contentEnd - contentStart + 1,
          ["enter", content3, context],
          ["enter", text6, context],
          ["exit", text6, context],
          ["exit", content3, context]
        );
        index2 -= contentEnd - contentStart - 3;
        contentStart = void 0;
        contentEnd = void 0;
      }
    }
    if (events[index2][0] === "exit" && cellStart !== void 0 && cellStart + (seenCellInRow ? 0 : 1) < index2 && (token.type === "tableCellDivider" || token.type === "tableRow" && (cellStart + 3 < index2 || events[cellStart][1].type !== "whitespace"))) {
      const cell = {
        type: inDelimiterRow ? "tableDelimiter" : inHead ? "tableHeader" : "tableData",
        start: events[cellStart][1].start,
        end: events[index2][1].end
      };
      events.splice(index2 + (token.type === "tableCellDivider" ? 1 : 0), 0, [
        "exit",
        cell,
        context
      ]);
      events.splice(cellStart, 0, ["enter", cell, context]);
      index2 += 2;
      cellStart = index2 + 1;
      seenCellInRow = true;
    }
    if (token.type === "tableRow") {
      inRow = events[index2][0] === "enter";
      if (inRow) {
        cellStart = index2 + 1;
        seenCellInRow = false;
      }
    }
    if (token.type === "tableDelimiterRow") {
      inDelimiterRow = events[index2][0] === "enter";
      if (inDelimiterRow) {
        cellStart = index2 + 1;
        seenCellInRow = false;
      }
    }
    if (token.type === "tableHead") {
      inHead = events[index2][0] === "enter";
    }
  }
  return events;
}
function tokenizeTable(effects, ok2, nok) {
  const self = this;
  const align = [];
  let tableHeaderCount = 0;
  let seenDelimiter;
  let hasDash;
  return start;
  function start(code3) {
    effects.enter("table")._align = align;
    effects.enter("tableHead");
    effects.enter("tableRow");
    if (code3 === 124) {
      return cellDividerHead(code3);
    }
    tableHeaderCount++;
    effects.enter("temporaryTableCellContent");
    return inCellContentHead(code3);
  }
  function cellDividerHead(code3) {
    effects.enter("tableCellDivider");
    effects.consume(code3);
    effects.exit("tableCellDivider");
    seenDelimiter = true;
    return cellBreakHead;
  }
  function cellBreakHead(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return atRowEndHead(code3);
    }
    if (markdownSpace(code3)) {
      effects.enter("whitespace");
      effects.consume(code3);
      return inWhitespaceHead;
    }
    if (seenDelimiter) {
      seenDelimiter = void 0;
      tableHeaderCount++;
    }
    if (code3 === 124) {
      return cellDividerHead(code3);
    }
    effects.enter("temporaryTableCellContent");
    return inCellContentHead(code3);
  }
  function inWhitespaceHead(code3) {
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return inWhitespaceHead;
    }
    effects.exit("whitespace");
    return cellBreakHead(code3);
  }
  function inCellContentHead(code3) {
    if (code3 === null || code3 === 124 || markdownLineEndingOrSpace(code3)) {
      effects.exit("temporaryTableCellContent");
      return cellBreakHead(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? inCellContentEscapeHead : inCellContentHead;
  }
  function inCellContentEscapeHead(code3) {
    if (code3 === 92 || code3 === 124) {
      effects.consume(code3);
      return inCellContentHead;
    }
    return inCellContentHead(code3);
  }
  function atRowEndHead(code3) {
    if (code3 === null) {
      return nok(code3);
    }
    effects.exit("tableRow");
    effects.exit("tableHead");
    const originalInterrupt = self.interrupt;
    self.interrupt = true;
    return effects.attempt(
      {
        tokenize: tokenizeRowEnd,
        partial: true
      },
      function(code4) {
        self.interrupt = originalInterrupt;
        effects.enter("tableDelimiterRow");
        return atDelimiterRowBreak(code4);
      },
      function(code4) {
        self.interrupt = originalInterrupt;
        return nok(code4);
      }
    )(code3);
  }
  function atDelimiterRowBreak(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return rowEndDelimiter(code3);
    }
    if (markdownSpace(code3)) {
      effects.enter("whitespace");
      effects.consume(code3);
      return inWhitespaceDelimiter;
    }
    if (code3 === 45) {
      effects.enter("tableDelimiterFiller");
      effects.consume(code3);
      hasDash = true;
      align.push("none");
      return inFillerDelimiter;
    }
    if (code3 === 58) {
      effects.enter("tableDelimiterAlignment");
      effects.consume(code3);
      effects.exit("tableDelimiterAlignment");
      align.push("left");
      return afterLeftAlignment;
    }
    if (code3 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      return atDelimiterRowBreak;
    }
    return nok(code3);
  }
  function inWhitespaceDelimiter(code3) {
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return inWhitespaceDelimiter;
    }
    effects.exit("whitespace");
    return atDelimiterRowBreak(code3);
  }
  function inFillerDelimiter(code3) {
    if (code3 === 45) {
      effects.consume(code3);
      return inFillerDelimiter;
    }
    effects.exit("tableDelimiterFiller");
    if (code3 === 58) {
      effects.enter("tableDelimiterAlignment");
      effects.consume(code3);
      effects.exit("tableDelimiterAlignment");
      align[align.length - 1] = align[align.length - 1] === "left" ? "center" : "right";
      return afterRightAlignment;
    }
    return atDelimiterRowBreak(code3);
  }
  function afterLeftAlignment(code3) {
    if (code3 === 45) {
      effects.enter("tableDelimiterFiller");
      effects.consume(code3);
      hasDash = true;
      return inFillerDelimiter;
    }
    return nok(code3);
  }
  function afterRightAlignment(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return rowEndDelimiter(code3);
    }
    if (markdownSpace(code3)) {
      effects.enter("whitespace");
      effects.consume(code3);
      return inWhitespaceDelimiter;
    }
    if (code3 === 124) {
      effects.enter("tableCellDivider");
      effects.consume(code3);
      effects.exit("tableCellDivider");
      return atDelimiterRowBreak;
    }
    return nok(code3);
  }
  function rowEndDelimiter(code3) {
    effects.exit("tableDelimiterRow");
    if (!hasDash || tableHeaderCount !== align.length) {
      return nok(code3);
    }
    if (code3 === null) {
      return tableClose(code3);
    }
    return effects.check(
      nextPrefixedOrBlank,
      tableClose,
      effects.attempt(
        {
          tokenize: tokenizeRowEnd,
          partial: true
        },
        factorySpace(effects, bodyStart, "linePrefix", 4),
        tableClose
      )
    )(code3);
  }
  function tableClose(code3) {
    effects.exit("table");
    return ok2(code3);
  }
  function bodyStart(code3) {
    effects.enter("tableBody");
    return rowStartBody(code3);
  }
  function rowStartBody(code3) {
    effects.enter("tableRow");
    if (code3 === 124) {
      return cellDividerBody(code3);
    }
    effects.enter("temporaryTableCellContent");
    return inCellContentBody(code3);
  }
  function cellDividerBody(code3) {
    effects.enter("tableCellDivider");
    effects.consume(code3);
    effects.exit("tableCellDivider");
    return cellBreakBody;
  }
  function cellBreakBody(code3) {
    if (code3 === null || markdownLineEnding(code3)) {
      return atRowEndBody(code3);
    }
    if (markdownSpace(code3)) {
      effects.enter("whitespace");
      effects.consume(code3);
      return inWhitespaceBody;
    }
    if (code3 === 124) {
      return cellDividerBody(code3);
    }
    effects.enter("temporaryTableCellContent");
    return inCellContentBody(code3);
  }
  function inWhitespaceBody(code3) {
    if (markdownSpace(code3)) {
      effects.consume(code3);
      return inWhitespaceBody;
    }
    effects.exit("whitespace");
    return cellBreakBody(code3);
  }
  function inCellContentBody(code3) {
    if (code3 === null || code3 === 124 || markdownLineEndingOrSpace(code3)) {
      effects.exit("temporaryTableCellContent");
      return cellBreakBody(code3);
    }
    effects.consume(code3);
    return code3 === 92 ? inCellContentEscapeBody : inCellContentBody;
  }
  function inCellContentEscapeBody(code3) {
    if (code3 === 92 || code3 === 124) {
      effects.consume(code3);
      return inCellContentBody;
    }
    return inCellContentBody(code3);
  }
  function atRowEndBody(code3) {
    effects.exit("tableRow");
    if (code3 === null) {
      return tableBodyClose(code3);
    }
    return effects.check(
      nextPrefixedOrBlank,
      tableBodyClose,
      effects.attempt(
        {
          tokenize: tokenizeRowEnd,
          partial: true
        },
        factorySpace(effects, rowStartBody, "linePrefix", 4),
        tableBodyClose
      )
    )(code3);
  }
  function tableBodyClose(code3) {
    effects.exit("tableBody");
    return tableClose(code3);
  }
  function tokenizeRowEnd(effects2, ok3, nok2) {
    return start2;
    function start2(code3) {
      effects2.enter("lineEnding");
      effects2.consume(code3);
      effects2.exit("lineEnding");
      return factorySpace(effects2, prefixed, "linePrefix");
    }
    function prefixed(code3) {
      if (self.parser.lazy[self.now().line] || code3 === null || markdownLineEnding(code3)) {
        return nok2(code3);
      }
      const tail = self.events[self.events.length - 1];
      if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
        return nok2(code3);
      }
      self._gfmTableDynamicInterruptHack = true;
      return effects2.check(
        self.parser.constructs.flow,
        function(code4) {
          self._gfmTableDynamicInterruptHack = false;
          return nok2(code4);
        },
        function(code4) {
          self._gfmTableDynamicInterruptHack = false;
          return ok3(code4);
        }
      )(code3);
    }
  }
}
function tokenizeNextPrefixedOrBlank(effects, ok2, nok) {
  let size = 0;
  return start;
  function start(code3) {
    effects.enter("check");
    effects.consume(code3);
    return whitespace3;
  }
  function whitespace3(code3) {
    if (code3 === -1 || code3 === 32) {
      effects.consume(code3);
      size++;
      return size === 4 ? ok2 : whitespace3;
    }
    if (code3 === null || markdownLineEndingOrSpace(code3)) {
      return ok2(code3);
    }
    return nok(code3);
  }
}

// node_modules/micromark-extension-gfm-task-list-item/lib/syntax.js
var tasklistCheck = {
  tokenize: tokenizeTasklistCheck
};
var gfmTaskListItem = {
  text: {
    [91]: tasklistCheck
  }
};
function tokenizeTasklistCheck(effects, ok2, nok) {
  const self = this;
  return open;
  function open(code3) {
    if (
      // Exit if there’s stuff before.
      self.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !self._gfmTasklistFirstContentOfListItem
    ) {
      return nok(code3);
    }
    effects.enter("taskListCheck");
    effects.enter("taskListCheckMarker");
    effects.consume(code3);
    effects.exit("taskListCheckMarker");
    return inside;
  }
  function inside(code3) {
    if (markdownLineEndingOrSpace(code3)) {
      effects.enter("taskListCheckValueUnchecked");
      effects.consume(code3);
      effects.exit("taskListCheckValueUnchecked");
      return close;
    }
    if (code3 === 88 || code3 === 120) {
      effects.enter("taskListCheckValueChecked");
      effects.consume(code3);
      effects.exit("taskListCheckValueChecked");
      return close;
    }
    return nok(code3);
  }
  function close(code3) {
    if (code3 === 93) {
      effects.enter("taskListCheckMarker");
      effects.consume(code3);
      effects.exit("taskListCheckMarker");
      effects.exit("taskListCheck");
      return effects.check(
        {
          tokenize: spaceThenNonSpace
        },
        ok2,
        nok
      );
    }
    return nok(code3);
  }
}
function spaceThenNonSpace(effects, ok2, nok) {
  const self = this;
  return factorySpace(effects, after, "whitespace");
  function after(code3) {
    const tail = self.events[self.events.length - 1];
    return (
      // We either found spaces…
      (tail && tail[1].type === "whitespace" || // …or it was followed by a line ending, in which case, there has to be
      // non-whitespace after that line ending, because otherwise we’d get an
      // EOF as the content is closed with blank lines.
      markdownLineEnding(code3)) && code3 !== null ? ok2(code3) : nok(code3)
    );
  }
}

// node_modules/micromark-extension-gfm/index.js
function gfm(options) {
  return combineExtensions([
    gfmAutolinkLiteral,
    gfmFootnote(),
    gfmStrikethrough(options),
    gfmTable,
    gfmTaskListItem
  ]);
}

// node_modules/ccount/index.js
function ccount(value, character) {
  const source = String(value);
  if (typeof character !== "string") {
    throw new TypeError("Expected character");
  }
  let count2 = 0;
  let index2 = source.indexOf(character);
  while (index2 !== -1) {
    count2++;
    index2 = source.indexOf(character, index2 + character.length);
  }
  return count2;
}

// node_modules/escape-string-regexp/index.js
function escapeStringRegexp(string3) {
  if (typeof string3 !== "string") {
    throw new TypeError("Expected a string");
  }
  return string3.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

// node_modules/unist-util-is/lib/index.js
var convert = (
  /**
   * @type {(
   *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {AssertAnything}
   */
  function(test2) {
    if (test2 === void 0 || test2 === null) {
      return ok;
    }
    if (typeof test2 === "string") {
      return typeFactory(test2);
    }
    if (typeof test2 === "object") {
      return Array.isArray(test2) ? anyFactory(test2) : propsFactory(test2);
    }
    if (typeof test2 === "function") {
      return castFactory(test2);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks2 = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks2[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks2.length) {
      if (checks2[index3].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all7);
  function all7(node2) {
    let key2;
    for (key2 in check) {
      if (node2[key2] !== check[key2])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node2) {
    return node2 && node2.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(node2, ...parameters) {
    return Boolean(
      node2 && typeof node2 === "object" && "type" in node2 && // @ts-expect-error: fine.
      Boolean(check.call(this, node2, ...parameters))
    );
  }
}
function ok() {
  return true;
}

// node_modules/unist-util-visit-parents/lib/color.browser.js
function color(d) {
  return d;
}

// node_modules/unist-util-visit-parents/lib/index.js
var CONTINUE = true;
var EXIT = false;
var SKIP = "skip";
var visitParents = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor<Node>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test2, visitor, reverse) {
    if (typeof test2 === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test2;
      test2 = null;
    }
    const is2 = convert(test2);
    const step = reverse ? -1 : 1;
    factory2(tree, void 0, [])();
    function factory2(node2, index2, parents) {
      const value = node2 && typeof node2 === "object" ? node2 : {};
      if (typeof value.type === "string") {
        const name2 = (
          // `hast`
          typeof value.tagName === "string" ? value.tagName : (
            // `xast`
            typeof value.name === "string" ? value.name : void 0
          )
        );
        Object.defineProperty(visit2, "name", {
          value: "node (" + color(node2.type + (name2 ? "<" + name2 + ">" : "")) + ")"
        });
      }
      return visit2;
      function visit2() {
        let result = [];
        let subresult;
        let offset;
        let grandparents;
        if (!test2 || is2(node2, index2, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node2, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node2.children && result[0] !== SKIP) {
          offset = (reverse ? node2.children.length : -1) + step;
          grandparents = parents.concat(node2);
          while (offset > -1 && offset < node2.children.length) {
            subresult = factory2(node2.children[offset], offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
        return result;
      }
    }
  }
);
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}

// node_modules/mdast-util-find-and-replace/lib/index.js
var own3 = {}.hasOwnProperty;
var findAndReplace = (
  /**
   * @type {(
   *   (<Tree extends Node>(tree: Tree, find: Find, replace?: Replace | null | undefined, options?: Options | null | undefined) => Tree) &
   *   (<Tree extends Node>(tree: Tree, schema: FindAndReplaceSchema | FindAndReplaceList, options?: Options | null | undefined) => Tree)
   * )}
   **/
  /**
   * @template {Node} Tree
   * @param {Tree} tree
   * @param {Find | FindAndReplaceSchema | FindAndReplaceList} find
   * @param {Replace | Options | null | undefined} [replace]
   * @param {Options | null | undefined} [options]
   * @returns {Tree}
   */
  function(tree, find2, replace2, options) {
    let settings;
    let schema;
    if (typeof find2 === "string" || find2 instanceof RegExp) {
      schema = [[find2, replace2]];
      settings = options;
    } else {
      schema = find2;
      settings = replace2;
    }
    if (!settings) {
      settings = {};
    }
    const ignored = convert(settings.ignore || []);
    const pairs = toPairs(schema);
    let pairIndex = -1;
    while (++pairIndex < pairs.length) {
      visitParents(tree, "text", visitor);
    }
    return tree;
    function visitor(node2, parents) {
      let index2 = -1;
      let grandparent;
      while (++index2 < parents.length) {
        const parent = parents[index2];
        if (ignored(
          parent,
          // @ts-expect-error: TS doesn’t understand but it’s perfect.
          grandparent ? grandparent.children.indexOf(parent) : void 0,
          grandparent
        )) {
          return;
        }
        grandparent = parent;
      }
      if (grandparent) {
        return handler(node2, parents);
      }
    }
    function handler(node2, parents) {
      const parent = parents[parents.length - 1];
      const find3 = pairs[pairIndex][0];
      const replace3 = pairs[pairIndex][1];
      let start = 0;
      const index2 = parent.children.indexOf(node2);
      let change = false;
      let nodes = [];
      find3.lastIndex = 0;
      let match = find3.exec(node2.value);
      while (match) {
        const position4 = match.index;
        const matchObject = {
          index: match.index,
          input: match.input,
          // @ts-expect-error: stack is fine.
          stack: [...parents, node2]
        };
        let value = replace3(...match, matchObject);
        if (typeof value === "string") {
          value = value.length > 0 ? { type: "text", value } : void 0;
        }
        if (value !== false) {
          if (start !== position4) {
            nodes.push({
              type: "text",
              value: node2.value.slice(start, position4)
            });
          }
          if (Array.isArray(value)) {
            nodes.push(...value);
          } else if (value) {
            nodes.push(value);
          }
          start = position4 + match[0].length;
          change = true;
        }
        if (!find3.global) {
          break;
        }
        match = find3.exec(node2.value);
      }
      if (change) {
        if (start < node2.value.length) {
          nodes.push({ type: "text", value: node2.value.slice(start) });
        }
        parent.children.splice(index2, 1, ...nodes);
      } else {
        nodes = [node2];
      }
      return index2 + nodes.length;
    }
  }
);
function toPairs(schema) {
  const result = [];
  if (typeof schema !== "object") {
    throw new TypeError("Expected array or object as schema");
  }
  if (Array.isArray(schema)) {
    let index2 = -1;
    while (++index2 < schema.length) {
      result.push([
        toExpression(schema[index2][0]),
        toFunction(schema[index2][1])
      ]);
    }
  } else {
    let key2;
    for (key2 in schema) {
      if (own3.call(schema, key2)) {
        result.push([toExpression(key2), toFunction(schema[key2])]);
      }
    }
  }
  return result;
}
function toExpression(find2) {
  return typeof find2 === "string" ? new RegExp(escapeStringRegexp(find2), "g") : find2;
}
function toFunction(replace2) {
  return typeof replace2 === "function" ? replace2 : () => replace2;
}

// node_modules/mdast-util-gfm-autolink-literal/lib/index.js
var inConstruct = "phrasing";
var notInConstruct = ["autolink", "link", "image", "label"];
var gfmAutolinkLiteralFromMarkdown = {
  transforms: [transformGfmAutolinkLiterals],
  enter: {
    literalAutolink: enterLiteralAutolink,
    literalAutolinkEmail: enterLiteralAutolinkValue,
    literalAutolinkHttp: enterLiteralAutolinkValue,
    literalAutolinkWww: enterLiteralAutolinkValue
  },
  exit: {
    literalAutolink: exitLiteralAutolink,
    literalAutolinkEmail: exitLiteralAutolinkEmail,
    literalAutolinkHttp: exitLiteralAutolinkHttp,
    literalAutolinkWww: exitLiteralAutolinkWww
  }
};
var gfmAutolinkLiteralToMarkdown = {
  unsafe: [
    {
      character: "@",
      before: "[+\\-.\\w]",
      after: "[\\-.\\w]",
      inConstruct,
      notInConstruct
    },
    {
      character: ".",
      before: "[Ww]",
      after: "[\\-.\\w]",
      inConstruct,
      notInConstruct
    },
    { character: ":", before: "[ps]", after: "\\/", inConstruct, notInConstruct }
  ]
};
function enterLiteralAutolink(token) {
  this.enter({ type: "link", title: null, url: "", children: [] }, token);
}
function enterLiteralAutolinkValue(token) {
  this.config.enter.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkHttp(token) {
  this.config.exit.autolinkProtocol.call(this, token);
}
function exitLiteralAutolinkWww(token) {
  this.config.exit.data.call(this, token);
  const node2 = (
    /** @type {Link} */
    this.stack[this.stack.length - 1]
  );
  node2.url = "http://" + this.sliceSerialize(token);
}
function exitLiteralAutolinkEmail(token) {
  this.config.exit.autolinkEmail.call(this, token);
}
function exitLiteralAutolink(token) {
  this.exit(token);
}
function transformGfmAutolinkLiterals(tree) {
  findAndReplace(
    tree,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
      [/([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/g, findEmail]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function findUrl(_, protocol, domain2, path5, match) {
  let prefix = "";
  if (!previous2(match)) {
    return false;
  }
  if (/^w/i.test(protocol)) {
    domain2 = protocol + domain2;
    protocol = "";
    prefix = "http://";
  }
  if (!isCorrectDomain(domain2)) {
    return false;
  }
  const parts = splitUrl(domain2 + path5);
  if (!parts[0])
    return false;
  const result = {
    type: "link",
    title: null,
    url: prefix + protocol + parts[0],
    children: [{ type: "text", value: protocol + parts[0] }]
  };
  if (parts[1]) {
    return [result, { type: "text", value: parts[1] }];
  }
  return result;
}
function findEmail(_, atext, label, match) {
  if (
    // Not an expected previous character.
    !previous2(match, true) || // Label ends in not allowed character.
    /[-\d_]$/.test(label)
  ) {
    return false;
  }
  return {
    type: "link",
    title: null,
    url: "mailto:" + atext + "@" + label,
    children: [{ type: "text", value: atext + "@" + label }]
  };
}
function isCorrectDomain(domain2) {
  const parts = domain2.split(".");
  if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
    return false;
  }
  return true;
}
function splitUrl(url) {
  const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
  if (!trailExec) {
    return [url, void 0];
  }
  url = url.slice(0, trailExec.index);
  let trail = trailExec[0];
  let closingParenIndex = trail.indexOf(")");
  const openingParens = ccount(url, "(");
  let closingParens = ccount(url, ")");
  while (closingParenIndex !== -1 && openingParens > closingParens) {
    url += trail.slice(0, closingParenIndex + 1);
    trail = trail.slice(closingParenIndex + 1);
    closingParenIndex = trail.indexOf(")");
    closingParens++;
  }
  return [url, trail];
}
function previous2(match, email) {
  const code3 = match.input.charCodeAt(match.index - 1);
  return (match.index === 0 || unicodeWhitespace(code3) || unicodePunctuation(code3)) && (!email || code3 !== 47);
}

// node_modules/mdast-util-to-markdown/lib/util/association.js
function association(node2) {
  if (node2.label || !node2.identifier) {
    return node2.label || "";
  }
  return decodeString(node2.identifier);
}

// node_modules/mdast-util-to-markdown/lib/util/container-flow.js
function containerFlow(parent, state, info) {
  const indexStack = state.indexStack;
  const children = parent.children || [];
  const tracker = state.createTracker(info);
  const results = [];
  let index2 = -1;
  indexStack.push(-1);
  while (++index2 < children.length) {
    const child = children[index2];
    indexStack[indexStack.length - 1] = index2;
    results.push(
      tracker.move(
        state.handle(child, parent, state, {
          before: "\n",
          after: "\n",
          ...tracker.current()
        })
      )
    );
    if (child.type !== "list") {
      state.bulletLastUsed = void 0;
    }
    if (index2 < children.length - 1) {
      results.push(
        tracker.move(between(child, children[index2 + 1], parent, state))
      );
    }
  }
  indexStack.pop();
  return results.join("");
}
function between(left, right, parent, state) {
  let index2 = state.join.length;
  while (index2--) {
    const result = state.join[index2](left, right, parent, state);
    if (result === true || result === 1) {
      break;
    }
    if (typeof result === "number") {
      return "\n".repeat(1 + result);
    }
    if (result === false) {
      return "\n\n<!---->\n\n";
    }
  }
  return "\n\n";
}

// node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
var eol = /\r?\n|\r/g;
function indentLines(value, map2) {
  const result = [];
  let start = 0;
  let line = 0;
  let match;
  while (match = eol.exec(value)) {
    one7(value.slice(start, match.index));
    result.push(match[0]);
    start = match.index + match[0].length;
    line++;
  }
  one7(value.slice(start));
  return result.join("");
  function one7(value2) {
    result.push(map2(value2, line, !value2));
  }
}

// node_modules/mdast-util-to-markdown/lib/util/pattern-compile.js
function patternCompile(pattern) {
  if (!pattern._compiled) {
    const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
    pattern._compiled = new RegExp(
      (before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""),
      "g"
    );
  }
  return pattern._compiled;
}

// node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
function patternInScope(stack, pattern) {
  return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
}
function listInScope(stack, list3, none) {
  if (typeof list3 === "string") {
    list3 = [list3];
  }
  if (!list3 || list3.length === 0) {
    return none;
  }
  let index2 = -1;
  while (++index2 < list3.length) {
    if (stack.includes(list3[index2])) {
      return true;
    }
  }
  return false;
}

// node_modules/mdast-util-to-markdown/lib/util/safe.js
function safe(state, input, config) {
  const value = (config.before || "") + (input || "") + (config.after || "");
  const positions = [];
  const result = [];
  const infos = {};
  let index2 = -1;
  while (++index2 < state.unsafe.length) {
    const pattern = state.unsafe[index2];
    if (!patternInScope(state.stack, pattern)) {
      continue;
    }
    const expression = patternCompile(pattern);
    let match;
    while (match = expression.exec(value)) {
      const before = "before" in pattern || Boolean(pattern.atBreak);
      const after = "after" in pattern;
      const position4 = match.index + (before ? match[1].length : 0);
      if (positions.includes(position4)) {
        if (infos[position4].before && !before) {
          infos[position4].before = false;
        }
        if (infos[position4].after && !after) {
          infos[position4].after = false;
        }
      } else {
        positions.push(position4);
        infos[position4] = { before, after };
      }
    }
  }
  positions.sort(numerical);
  let start = config.before ? config.before.length : 0;
  const end = value.length - (config.after ? config.after.length : 0);
  index2 = -1;
  while (++index2 < positions.length) {
    const position4 = positions[index2];
    if (position4 < start || position4 >= end) {
      continue;
    }
    if (position4 + 1 < end && positions[index2 + 1] === position4 + 1 && infos[position4].after && !infos[position4 + 1].before && !infos[position4 + 1].after || positions[index2 - 1] === position4 - 1 && infos[position4].before && !infos[position4 - 1].before && !infos[position4 - 1].after) {
      continue;
    }
    if (start !== position4) {
      result.push(escapeBackslashes(value.slice(start, position4), "\\"));
    }
    start = position4;
    if (/[!-/:-@[-`{-~]/.test(value.charAt(position4)) && (!config.encode || !config.encode.includes(value.charAt(position4)))) {
      result.push("\\");
    } else {
      result.push(
        "&#x" + value.charCodeAt(position4).toString(16).toUpperCase() + ";"
      );
      start++;
    }
  }
  result.push(escapeBackslashes(value.slice(start, end), config.after));
  return result.join("");
}
function numerical(a, b) {
  return a - b;
}
function escapeBackslashes(value, after) {
  const expression = /\\(?=[!-/:-@[-`{-~])/g;
  const positions = [];
  const results = [];
  const whole = value + after;
  let index2 = -1;
  let start = 0;
  let match;
  while (match = expression.exec(whole)) {
    positions.push(match.index);
  }
  while (++index2 < positions.length) {
    if (start !== positions[index2]) {
      results.push(value.slice(start, positions[index2]));
    }
    results.push("\\");
    start = positions[index2];
  }
  results.push(value.slice(start));
  return results.join("");
}

// node_modules/mdast-util-to-markdown/lib/util/track.js
function track(config) {
  const options = config || {};
  const now = options.now || {};
  let lineShift = options.lineShift || 0;
  let line = now.line || 1;
  let column = now.column || 1;
  return { move, current, shift };
  function current() {
    return { now: { line, column }, lineShift };
  }
  function shift(value) {
    lineShift += value;
  }
  function move(input) {
    const value = input || "";
    const chunks = value.split(/\r?\n|\r/g);
    const tail = chunks[chunks.length - 1];
    line += chunks.length - 1;
    column = chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
    return value;
  }
}

// node_modules/mdast-util-gfm-footnote/lib/index.js
footnoteReference.peek = footnoteReferencePeek;
function gfmFootnoteFromMarkdown() {
  return {
    enter: {
      gfmFootnoteDefinition: enterFootnoteDefinition,
      gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
      gfmFootnoteCall: enterFootnoteCall,
      gfmFootnoteCallString: enterFootnoteCallString
    },
    exit: {
      gfmFootnoteDefinition: exitFootnoteDefinition,
      gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
      gfmFootnoteCall: exitFootnoteCall,
      gfmFootnoteCallString: exitFootnoteCallString
    }
  };
}
function gfmFootnoteToMarkdown() {
  return {
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["phrasing", "label", "reference"] }],
    handlers: { footnoteDefinition, footnoteReference }
  };
}
function enterFootnoteDefinition(token) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    token
  );
}
function enterFootnoteDefinitionLabelString() {
  this.buffer();
}
function exitFootnoteDefinitionLabelString(token) {
  const label = this.resume();
  const node2 = (
    /** @type {FootnoteDefinition} */
    this.stack[this.stack.length - 1]
  );
  node2.label = label;
  node2.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
}
function exitFootnoteDefinition(token) {
  this.exit(token);
}
function enterFootnoteCall(token) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
}
function enterFootnoteCallString() {
  this.buffer();
}
function exitFootnoteCallString(token) {
  const label = this.resume();
  const node2 = (
    /** @type {FootnoteDefinition} */
    this.stack[this.stack.length - 1]
  );
  node2.label = label;
  node2.identifier = normalizeIdentifier(
    this.sliceSerialize(token)
  ).toLowerCase();
}
function exitFootnoteCall(token) {
  this.exit(token);
}
function footnoteReference(node2, _, context, safeOptions) {
  const tracker = track(safeOptions);
  let value = tracker.move("[^");
  const exit3 = context.enter("footnoteReference");
  const subexit = context.enter("reference");
  value += tracker.move(
    safe(context, association(node2), {
      ...tracker.current(),
      before: value,
      after: "]"
    })
  );
  subexit();
  exit3();
  value += tracker.move("]");
  return value;
}
function footnoteReferencePeek() {
  return "[";
}
function footnoteDefinition(node2, _, context, safeOptions) {
  const tracker = track(safeOptions);
  let value = tracker.move("[^");
  const exit3 = context.enter("footnoteDefinition");
  const subexit = context.enter("label");
  value += tracker.move(
    safe(context, association(node2), {
      ...tracker.current(),
      before: value,
      after: "]"
    })
  );
  subexit();
  value += tracker.move(
    "]:" + (node2.children && node2.children.length > 0 ? " " : "")
  );
  tracker.shift(4);
  value += tracker.move(
    indentLines(containerFlow(node2, context, tracker.current()), map)
  );
  exit3();
  return value;
}
function map(line, index2, blank2) {
  if (index2 === 0) {
    return line;
  }
  return (blank2 ? "" : "    ") + line;
}

// node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
function containerPhrasing(parent, state, info) {
  const indexStack = state.indexStack;
  const children = parent.children || [];
  const results = [];
  let index2 = -1;
  let before = info.before;
  indexStack.push(-1);
  let tracker = state.createTracker(info);
  while (++index2 < children.length) {
    const child = children[index2];
    let after;
    indexStack[indexStack.length - 1] = index2;
    if (index2 + 1 < children.length) {
      let handle4 = state.handle.handlers[children[index2 + 1].type];
      if (handle4 && handle4.peek)
        handle4 = handle4.peek;
      after = handle4 ? handle4(children[index2 + 1], parent, state, {
        before: "",
        after: "",
        ...tracker.current()
      }).charAt(0) : "";
    } else {
      after = info.after;
    }
    if (results.length > 0 && (before === "\r" || before === "\n") && child.type === "html") {
      results[results.length - 1] = results[results.length - 1].replace(
        /(\r?\n|\r)$/,
        " "
      );
      before = " ";
      tracker = state.createTracker(info);
      tracker.move(results.join(""));
    }
    results.push(
      tracker.move(
        state.handle(child, parent, state, {
          ...tracker.current(),
          before,
          after
        })
      )
    );
    before = results[results.length - 1].slice(-1);
  }
  indexStack.pop();
  return results.join("");
}

// node_modules/mdast-util-gfm-strikethrough/lib/index.js
var constructsWithoutStrikethrough = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
handleDelete.peek = peekDelete;
var gfmStrikethroughFromMarkdown = {
  canContainEols: ["delete"],
  enter: { strikethrough: enterStrikethrough },
  exit: { strikethrough: exitStrikethrough }
};
var gfmStrikethroughToMarkdown = {
  unsafe: [
    {
      character: "~",
      inConstruct: "phrasing",
      notInConstruct: constructsWithoutStrikethrough
    }
  ],
  handlers: { delete: handleDelete }
};
function enterStrikethrough(token) {
  this.enter({ type: "delete", children: [] }, token);
}
function exitStrikethrough(token) {
  this.exit(token);
}
function handleDelete(node2, _, context, safeOptions) {
  const tracker = track(safeOptions);
  const exit3 = context.enter("strikethrough");
  let value = tracker.move("~~");
  value += containerPhrasing(node2, context, {
    ...tracker.current(),
    before: value,
    after: "~"
  });
  value += tracker.move("~~");
  exit3();
  return value;
}
function peekDelete() {
  return "~";
}

// node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
inlineCode.peek = inlineCodePeek;
function inlineCode(node2, _, state) {
  let value = node2.value || "";
  let sequence = "`";
  let index2 = -1;
  while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
    sequence += "`";
  }
  if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
    value = " " + value + " ";
  }
  while (++index2 < state.unsafe.length) {
    const pattern = state.unsafe[index2];
    const expression = patternCompile(pattern);
    let match;
    if (!pattern.atBreak)
      continue;
    while (match = expression.exec(value)) {
      let position4 = match.index;
      if (value.charCodeAt(position4) === 10 && value.charCodeAt(position4 - 1) === 13) {
        position4--;
      }
      value = value.slice(0, position4) + " " + value.slice(match.index + 1);
    }
  }
  return sequence + value + sequence;
}
function inlineCodePeek() {
  return "`";
}

// node_modules/markdown-table/index.js
function markdownTable(table2, options = {}) {
  const align = (options.align || []).concat();
  const stringLength = options.stringLength || defaultStringLength;
  const alignments = [];
  const cellMatrix = [];
  const sizeMatrix = [];
  const longestCellByColumn = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;
  while (++rowIndex < table2.length) {
    const row2 = [];
    const sizes2 = [];
    let columnIndex2 = -1;
    if (table2[rowIndex].length > mostCellsPerRow) {
      mostCellsPerRow = table2[rowIndex].length;
    }
    while (++columnIndex2 < table2[rowIndex].length) {
      const cell = serialize(table2[rowIndex][columnIndex2]);
      if (options.alignDelimiters !== false) {
        const size = stringLength(cell);
        sizes2[columnIndex2] = size;
        if (longestCellByColumn[columnIndex2] === void 0 || size > longestCellByColumn[columnIndex2]) {
          longestCellByColumn[columnIndex2] = size;
        }
      }
      row2.push(cell);
    }
    cellMatrix[rowIndex] = row2;
    sizeMatrix[rowIndex] = sizes2;
  }
  let columnIndex = -1;
  if (typeof align === "object" && "length" in align) {
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = toAlignment(align[columnIndex]);
    }
  } else {
    const code3 = toAlignment(align);
    while (++columnIndex < mostCellsPerRow) {
      alignments[columnIndex] = code3;
    }
  }
  columnIndex = -1;
  const row = [];
  const sizes = [];
  while (++columnIndex < mostCellsPerRow) {
    const code3 = alignments[columnIndex];
    let before = "";
    let after = "";
    if (code3 === 99) {
      before = ":";
      after = ":";
    } else if (code3 === 108) {
      before = ":";
    } else if (code3 === 114) {
      after = ":";
    }
    let size = options.alignDelimiters === false ? 1 : Math.max(
      1,
      longestCellByColumn[columnIndex] - before.length - after.length
    );
    const cell = before + "-".repeat(size) + after;
    if (options.alignDelimiters !== false) {
      size = before.length + size + after.length;
      if (size > longestCellByColumn[columnIndex]) {
        longestCellByColumn[columnIndex] = size;
      }
      sizes[columnIndex] = size;
    }
    row[columnIndex] = cell;
  }
  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);
  rowIndex = -1;
  const lines = [];
  while (++rowIndex < cellMatrix.length) {
    const row2 = cellMatrix[rowIndex];
    const sizes2 = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line = [];
    while (++columnIndex < mostCellsPerRow) {
      const cell = row2[columnIndex] || "";
      let before = "";
      let after = "";
      if (options.alignDelimiters !== false) {
        const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
        const code3 = alignments[columnIndex];
        if (code3 === 114) {
          before = " ".repeat(size);
        } else if (code3 === 99) {
          if (size % 2) {
            before = " ".repeat(size / 2 + 0.5);
            after = " ".repeat(size / 2 - 0.5);
          } else {
            before = " ".repeat(size / 2);
            after = before;
          }
        } else {
          after = " ".repeat(size);
        }
      }
      if (options.delimiterStart !== false && !columnIndex) {
        line.push("|");
      }
      if (options.padding !== false && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(options.alignDelimiters === false && cell === "") && (options.delimiterStart !== false || columnIndex)) {
        line.push(" ");
      }
      if (options.alignDelimiters !== false) {
        line.push(before);
      }
      line.push(cell);
      if (options.alignDelimiters !== false) {
        line.push(after);
      }
      if (options.padding !== false) {
        line.push(" ");
      }
      if (options.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
        line.push("|");
      }
    }
    lines.push(
      options.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join("")
    );
  }
  return lines.join("\n");
}
function serialize(value) {
  return value === null || value === void 0 ? "" : String(value);
}
function defaultStringLength(value) {
  return value.length;
}
function toAlignment(value) {
  const code3 = typeof value === "string" ? value.codePointAt(0) : 0;
  return code3 === 67 || code3 === 99 ? 99 : code3 === 76 || code3 === 108 ? 108 : code3 === 82 || code3 === 114 ? 114 : 0;
}

// node_modules/mdast-util-gfm-table/lib/index.js
var gfmTableFromMarkdown = {
  enter: {
    table: enterTable,
    tableData: enterCell,
    tableHeader: enterCell,
    tableRow: enterRow
  },
  exit: {
    codeText: exitCodeText,
    table: exitTable,
    tableData: exit2,
    tableHeader: exit2,
    tableRow: exit2
  }
};
function enterTable(token) {
  const align = token._align;
  this.enter(
    {
      type: "table",
      align: align.map((d) => d === "none" ? null : d),
      children: []
    },
    token
  );
  this.setData("inTable", true);
}
function exitTable(token) {
  this.exit(token);
  this.setData("inTable");
}
function enterRow(token) {
  this.enter({ type: "tableRow", children: [] }, token);
}
function exit2(token) {
  this.exit(token);
}
function enterCell(token) {
  this.enter({ type: "tableCell", children: [] }, token);
}
function exitCodeText(token) {
  let value = this.resume();
  if (this.getData("inTable")) {
    value = value.replace(/\\([\\|])/g, replace);
  }
  const node2 = (
    /** @type {InlineCode} */
    this.stack[this.stack.length - 1]
  );
  node2.value = value;
  this.exit(token);
}
function replace($0, $1) {
  return $1 === "|" ? $1 : $0;
}
function gfmTableToMarkdown(options) {
  const settings = options || {};
  const padding = settings.tableCellPadding;
  const alignDelimiters = settings.tablePipeAlign;
  const stringLength = settings.stringLength;
  const around = padding ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: "\n", inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: true, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: true, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: true, character: "-", after: "[:|-]" }
    ],
    handlers: {
      table: handleTable,
      tableRow: handleTableRow,
      tableCell: handleTableCell,
      inlineCode: inlineCodeWithTable
    }
  };
  function handleTable(node2, _, context, safeOptions) {
    return serializeData(
      handleTableAsData(node2, context, safeOptions),
      node2.align
    );
  }
  function handleTableRow(node2, _, context, safeOptions) {
    const row = handleTableRowAsData(node2, context, safeOptions);
    const value = serializeData([row]);
    return value.slice(0, value.indexOf("\n"));
  }
  function handleTableCell(node2, _, context, safeOptions) {
    const exit3 = context.enter("tableCell");
    const subexit = context.enter("phrasing");
    const value = containerPhrasing(node2, context, {
      ...safeOptions,
      before: around,
      after: around
    });
    subexit();
    exit3();
    return value;
  }
  function serializeData(matrix, align) {
    return markdownTable(matrix, {
      align,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength
    });
  }
  function handleTableAsData(node2, context, safeOptions) {
    const children = node2.children;
    let index2 = -1;
    const result = [];
    const subexit = context.enter("table");
    while (++index2 < children.length) {
      result[index2] = handleTableRowAsData(
        children[index2],
        context,
        safeOptions
      );
    }
    subexit();
    return result;
  }
  function handleTableRowAsData(node2, context, safeOptions) {
    const children = node2.children;
    let index2 = -1;
    const result = [];
    const subexit = context.enter("tableRow");
    while (++index2 < children.length) {
      result[index2] = handleTableCell(
        children[index2],
        node2,
        context,
        safeOptions
      );
    }
    subexit();
    return result;
  }
  function inlineCodeWithTable(node2, parent, context) {
    let value = inlineCode(node2, parent, context);
    if (context.stack.includes("tableCell")) {
      value = value.replace(/\|/g, "\\$&");
    }
    return value;
  }
}

// node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
function checkBullet(state) {
  const marker = state.options.bullet || "*";
  if (marker !== "*" && marker !== "+" && marker !== "-") {
    throw new Error(
      "Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  }
  return marker;
}

// node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
function checkListItemIndent(state) {
  const style2 = state.options.listItemIndent || "tab";
  if (style2 === 1 || style2 === "1") {
    return "one";
  }
  if (style2 !== "tab" && style2 !== "one" && style2 !== "mixed") {
    throw new Error(
      "Cannot serialize items with `" + style2 + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  }
  return style2;
}

// node_modules/mdast-util-to-markdown/lib/handle/list-item.js
function listItem(node2, parent, state, info) {
  const listItemIndent = checkListItemIndent(state);
  let bullet = state.bulletCurrent || checkBullet(state);
  if (parent && parent.type === "list" && parent.ordered) {
    bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node2)) + bullet;
  }
  let size = bullet.length + 1;
  if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node2.spread)) {
    size = Math.ceil(size / 4) * 4;
  }
  const tracker = state.createTracker(info);
  tracker.move(bullet + " ".repeat(size - bullet.length));
  tracker.shift(size);
  const exit3 = state.enter("listItem");
  const value = state.indentLines(
    state.containerFlow(node2, tracker.current()),
    map2
  );
  exit3();
  return value;
  function map2(line, index2, blank2) {
    if (index2) {
      return (blank2 ? "" : " ".repeat(size)) + line;
    }
    return (blank2 ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
  }
}

// node_modules/mdast-util-gfm-task-list-item/lib/index.js
var gfmTaskListItemFromMarkdown = {
  exit: {
    taskListCheckValueChecked: exitCheck,
    taskListCheckValueUnchecked: exitCheck,
    paragraph: exitParagraphWithTaskListItem
  }
};
var gfmTaskListItemToMarkdown = {
  unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
  handlers: { listItem: listItemWithTaskListItem }
};
function exitCheck(token) {
  const node2 = (
    /** @type {ListItem} */
    this.stack[this.stack.length - 2]
  );
  node2.checked = token.type === "taskListCheckValueChecked";
}
function exitParagraphWithTaskListItem(token) {
  const parent = (
    /** @type {Parents} */
    this.stack[this.stack.length - 2]
  );
  if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
    const node2 = (
      /** @type {Paragraph} */
      this.stack[this.stack.length - 1]
    );
    const head2 = node2.children[0];
    if (head2 && head2.type === "text") {
      const siblings2 = parent.children;
      let index2 = -1;
      let firstParaghraph;
      while (++index2 < siblings2.length) {
        const sibling = siblings2[index2];
        if (sibling.type === "paragraph") {
          firstParaghraph = sibling;
          break;
        }
      }
      if (firstParaghraph === node2) {
        head2.value = head2.value.slice(1);
        if (head2.value.length === 0) {
          node2.children.shift();
        } else if (node2.position && head2.position && typeof head2.position.start.offset === "number") {
          head2.position.start.column++;
          head2.position.start.offset++;
          node2.position.start = Object.assign({}, head2.position.start);
        }
      }
    }
  }
  this.exit(token);
}
function listItemWithTaskListItem(node2, parent, context, safeOptions) {
  const head2 = node2.children[0];
  const checkable = typeof node2.checked === "boolean" && head2 && head2.type === "paragraph";
  const checkbox = "[" + (node2.checked ? "x" : " ") + "] ";
  const tracker = track(safeOptions);
  if (checkable) {
    tracker.move(checkbox);
  }
  let value = listItem(node2, parent, context, {
    ...safeOptions,
    ...tracker.current()
  });
  if (checkable) {
    value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
  }
  return value;
  function check($0) {
    return $0 + checkbox;
  }
}

// node_modules/mdast-util-gfm/lib/index.js
function gfmFromMarkdown() {
  return [
    gfmAutolinkLiteralFromMarkdown,
    gfmFootnoteFromMarkdown(),
    gfmStrikethroughFromMarkdown,
    gfmTableFromMarkdown,
    gfmTaskListItemFromMarkdown
  ];
}
function gfmToMarkdown(options) {
  return {
    extensions: [
      gfmAutolinkLiteralToMarkdown,
      gfmFootnoteToMarkdown(),
      gfmStrikethroughToMarkdown,
      gfmTableToMarkdown(options),
      gfmTaskListItemToMarkdown
    ]
  };
}

// node_modules/remark-gfm/index.js
function remarkGfm(options = {}) {
  const data = this.data();
  add2("micromarkExtensions", gfm(options));
  add2("fromMarkdownExtensions", gfmFromMarkdown());
  add2("toMarkdownExtensions", gfmToMarkdown(options));
  function add2(field, value) {
    const list3 = (
      /** @type {unknown[]} */
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : data[field] = []
    );
    list3.push(value);
  }
}

// node_modules/mdast-util-to-hast/lib/handlers/blockquote.js
function blockquote(state, node2) {
  const result = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: state.wrap(state.all(node2), true)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/break.js
function hardBreak(state, node2) {
  const result = { type: "element", tagName: "br", properties: {}, children: [] };
  state.patch(node2, result);
  return [state.applyData(node2, result), { type: "text", value: "\n" }];
}

// node_modules/mdast-util-to-hast/lib/handlers/code.js
function code2(state, node2) {
  const value = node2.value ? node2.value + "\n" : "";
  const lang2 = node2.lang ? node2.lang.match(/^[^ \t]+(?=[ \t]|$)/) : null;
  const properties = {};
  if (lang2) {
    properties.className = ["language-" + lang2];
  }
  let result = {
    type: "element",
    tagName: "code",
    properties,
    children: [{ type: "text", value }]
  };
  if (node2.meta) {
    result.data = { meta: node2.meta };
  }
  state.patch(node2, result);
  result = state.applyData(node2, result);
  result = { type: "element", tagName: "pre", properties: {}, children: [result] };
  state.patch(node2, result);
  return result;
}

// node_modules/mdast-util-to-hast/lib/handlers/delete.js
function strikethrough(state, node2) {
  const result = {
    type: "element",
    tagName: "del",
    properties: {},
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/emphasis.js
function emphasis(state, node2) {
  const result = {
    type: "element",
    tagName: "em",
    properties: {},
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/footnote-reference.js
function footnoteReference2(state, node2) {
  const id2 = String(node2.identifier).toUpperCase();
  const safeId = normalizeUri(id2.toLowerCase());
  const index2 = state.footnoteOrder.indexOf(id2);
  let counter;
  if (index2 === -1) {
    state.footnoteOrder.push(id2);
    state.footnoteCounts[id2] = 1;
    counter = state.footnoteOrder.length;
  } else {
    state.footnoteCounts[id2]++;
    counter = index2 + 1;
  }
  const reuseCounter = state.footnoteCounts[id2];
  const link2 = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + state.clobberPrefix + "fn-" + safeId,
      id: state.clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
      dataFootnoteRef: true,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(counter) }]
  };
  state.patch(node2, link2);
  const sup = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [link2]
  };
  state.patch(node2, sup);
  return state.applyData(node2, sup);
}

// node_modules/mdast-util-to-hast/lib/handlers/footnote.js
function footnote(state, node2) {
  const footnoteById = state.footnoteById;
  let no = 1;
  while (no in footnoteById)
    no++;
  const identifier = String(no);
  footnoteById[identifier] = {
    type: "footnoteDefinition",
    identifier,
    children: [{ type: "paragraph", children: node2.children }],
    position: node2.position
  };
  return footnoteReference2(state, {
    type: "footnoteReference",
    identifier,
    position: node2.position
  });
}

// node_modules/mdast-util-to-hast/lib/handlers/heading.js
function heading(state, node2) {
  const result = {
    type: "element",
    tagName: "h" + node2.depth,
    properties: {},
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/html.js
function html(state, node2) {
  if (state.dangerous) {
    const result = { type: "raw", value: node2.value };
    state.patch(node2, result);
    return state.applyData(node2, result);
  }
  return null;
}

// node_modules/mdast-util-to-hast/lib/revert.js
function revert(state, node2) {
  const subtype = node2.referenceType;
  let suffix = "]";
  if (subtype === "collapsed") {
    suffix += "[]";
  } else if (subtype === "full") {
    suffix += "[" + (node2.label || node2.identifier) + "]";
  }
  if (node2.type === "imageReference") {
    return { type: "text", value: "![" + node2.alt + suffix };
  }
  const contents = state.all(node2);
  const head2 = contents[0];
  if (head2 && head2.type === "text") {
    head2.value = "[" + head2.value;
  } else {
    contents.unshift({ type: "text", value: "[" });
  }
  const tail = contents[contents.length - 1];
  if (tail && tail.type === "text") {
    tail.value += suffix;
  } else {
    contents.push({ type: "text", value: suffix });
  }
  return contents;
}

// node_modules/mdast-util-to-hast/lib/handlers/image-reference.js
function imageReference(state, node2) {
  const def = state.definition(node2.identifier);
  if (!def) {
    return revert(state, node2);
  }
  const properties = { src: normalizeUri(def.url || ""), alt: node2.alt };
  if (def.title !== null && def.title !== void 0) {
    properties.title = def.title;
  }
  const result = { type: "element", tagName: "img", properties, children: [] };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/image.js
function image(state, node2) {
  const properties = { src: normalizeUri(node2.url) };
  if (node2.alt !== null && node2.alt !== void 0) {
    properties.alt = node2.alt;
  }
  if (node2.title !== null && node2.title !== void 0) {
    properties.title = node2.title;
  }
  const result = { type: "element", tagName: "img", properties, children: [] };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/inline-code.js
function inlineCode2(state, node2) {
  const text6 = { type: "text", value: node2.value.replace(/\r?\n|\r/g, " ") };
  state.patch(node2, text6);
  const result = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [text6]
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/link-reference.js
function linkReference(state, node2) {
  const def = state.definition(node2.identifier);
  if (!def) {
    return revert(state, node2);
  }
  const properties = { href: normalizeUri(def.url || "") };
  if (def.title !== null && def.title !== void 0) {
    properties.title = def.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/link.js
function link(state, node2) {
  const properties = { href: normalizeUri(node2.url) };
  if (node2.title !== null && node2.title !== void 0) {
    properties.title = node2.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/list-item.js
function listItem2(state, node2, parent) {
  const results = state.all(node2);
  const loose = parent ? listLoose(parent) : listItemLoose(node2);
  const properties = {};
  const children = [];
  if (typeof node2.checked === "boolean") {
    const head2 = results[0];
    let paragraph2;
    if (head2 && head2.type === "element" && head2.tagName === "p") {
      paragraph2 = head2;
    } else {
      paragraph2 = { type: "element", tagName: "p", properties: {}, children: [] };
      results.unshift(paragraph2);
    }
    if (paragraph2.children.length > 0) {
      paragraph2.children.unshift({ type: "text", value: " " });
    }
    paragraph2.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: node2.checked, disabled: true },
      children: []
    });
    properties.className = ["task-list-item"];
  }
  let index2 = -1;
  while (++index2 < results.length) {
    const child = results[index2];
    if (loose || index2 !== 0 || child.type !== "element" || child.tagName !== "p") {
      children.push({ type: "text", value: "\n" });
    }
    if (child.type === "element" && child.tagName === "p" && !loose) {
      children.push(...child.children);
    } else {
      children.push(child);
    }
  }
  const tail = results[results.length - 1];
  if (tail && (loose || tail.type !== "element" || tail.tagName !== "p")) {
    children.push({ type: "text", value: "\n" });
  }
  const result = { type: "element", tagName: "li", properties, children };
  state.patch(node2, result);
  return state.applyData(node2, result);
}
function listLoose(node2) {
  let loose = false;
  if (node2.type === "list") {
    loose = node2.spread || false;
    const children = node2.children;
    let index2 = -1;
    while (!loose && ++index2 < children.length) {
      loose = listItemLoose(children[index2]);
    }
  }
  return loose;
}
function listItemLoose(node2) {
  const spread = node2.spread;
  return spread === void 0 || spread === null ? node2.children.length > 1 : spread;
}

// node_modules/mdast-util-to-hast/lib/handlers/list.js
function list2(state, node2) {
  const properties = {};
  const results = state.all(node2);
  let index2 = -1;
  if (typeof node2.start === "number" && node2.start !== 1) {
    properties.start = node2.start;
  }
  while (++index2 < results.length) {
    const child = results[index2];
    if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
      properties.className = ["contains-task-list"];
      break;
    }
  }
  const result = {
    type: "element",
    tagName: node2.ordered ? "ol" : "ul",
    properties,
    children: state.wrap(results, true)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/paragraph.js
function paragraph(state, node2) {
  const result = {
    type: "element",
    tagName: "p",
    properties: {},
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/root.js
function root(state, node2) {
  const result = { type: "root", children: state.wrap(state.all(node2)) };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/strong.js
function strong(state, node2) {
  const result = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/unist-util-position/lib/index.js
var pointStart = point3("start");
var pointEnd = point3("end");
function position2(node2) {
  return { start: pointStart(node2), end: pointEnd(node2) };
}
function point3(type) {
  return point5;
  function point5(node2) {
    const point6 = node2 && node2.position && node2.position[type] || {};
    return {
      // @ts-expect-error: in practice, null is allowed.
      line: point6.line || null,
      // @ts-expect-error: in practice, null is allowed.
      column: point6.column || null,
      // @ts-expect-error: in practice, null is allowed.
      offset: point6.offset > -1 ? point6.offset : null
    };
  }
}

// node_modules/mdast-util-to-hast/lib/handlers/table.js
function table(state, node2) {
  const rows = state.all(node2);
  const firstRow = rows.shift();
  const tableContent = [];
  if (firstRow) {
    const head2 = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: state.wrap([firstRow], true)
    };
    state.patch(node2.children[0], head2);
    tableContent.push(head2);
  }
  if (rows.length > 0) {
    const body3 = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: state.wrap(rows, true)
    };
    const start = pointStart(node2.children[1]);
    const end = pointEnd(node2.children[node2.children.length - 1]);
    if (start.line && end.line)
      body3.position = { start, end };
    tableContent.push(body3);
  }
  const result = {
    type: "element",
    tagName: "table",
    properties: {},
    children: state.wrap(tableContent, true)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/table-row.js
function tableRow(state, node2, parent) {
  const siblings2 = parent ? parent.children : void 0;
  const rowIndex = siblings2 ? siblings2.indexOf(node2) : 1;
  const tagName = rowIndex === 0 ? "th" : "td";
  const align = parent && parent.type === "table" ? parent.align : void 0;
  const length = align ? align.length : node2.children.length;
  let cellIndex = -1;
  const cells2 = [];
  while (++cellIndex < length) {
    const cell = node2.children[cellIndex];
    const properties = {};
    const alignValue = align ? align[cellIndex] : void 0;
    if (alignValue) {
      properties.align = alignValue;
    }
    let result2 = { type: "element", tagName, properties, children: [] };
    if (cell) {
      result2.children = state.all(cell);
      state.patch(cell, result2);
      result2 = state.applyData(node2, result2);
    }
    cells2.push(result2);
  }
  const result = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: state.wrap(cells2, true)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/table-cell.js
function tableCell(state, node2) {
  const result = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: state.all(node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/trim-lines/index.js
var tab = 9;
var space = 32;
function trimLines(value) {
  const source = String(value);
  const search3 = /\r?\n|\r/g;
  let match = search3.exec(source);
  let last = 0;
  const lines = [];
  while (match) {
    lines.push(
      trimLine(source.slice(last, match.index), last > 0, true),
      match[0]
    );
    last = match.index + match[0].length;
    match = search3.exec(source);
  }
  lines.push(trimLine(source.slice(last), last > 0, false));
  return lines.join("");
}
function trimLine(value, start, end) {
  let startIndex = 0;
  let endIndex = value.length;
  if (start) {
    let code3 = value.codePointAt(startIndex);
    while (code3 === tab || code3 === space) {
      startIndex++;
      code3 = value.codePointAt(startIndex);
    }
  }
  if (end) {
    let code3 = value.codePointAt(endIndex - 1);
    while (code3 === tab || code3 === space) {
      endIndex--;
      code3 = value.codePointAt(endIndex - 1);
    }
  }
  return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}

// node_modules/mdast-util-to-hast/lib/handlers/text.js
function text4(state, node2) {
  const result = { type: "text", value: trimLines(String(node2.value)) };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/thematic-break.js
function thematicBreak2(state, node2) {
  const result = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}

// node_modules/mdast-util-to-hast/lib/handlers/index.js
var handlers = {
  blockquote,
  break: hardBreak,
  code: code2,
  delete: strikethrough,
  emphasis,
  footnoteReference: footnoteReference2,
  footnote,
  heading,
  html,
  imageReference,
  image,
  inlineCode: inlineCode2,
  linkReference,
  link,
  listItem: listItem2,
  list: list2,
  paragraph,
  root,
  strong,
  table,
  tableCell,
  tableRow,
  text: text4,
  thematicBreak: thematicBreak2,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
};
function ignore() {
  return null;
}

// node_modules/unist-util-visit/lib/index.js
var visit = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test2, visitor, reverse) {
    if (typeof test2 === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test2;
      test2 = null;
    }
    visitParents(tree, test2, overload, reverse);
    function overload(node2, parents) {
      const parent = parents[parents.length - 1];
      return visitor(
        node2,
        parent ? parent.children.indexOf(node2) : null,
        parent
      );
    }
  }
);

// node_modules/unist-util-generated/lib/index.js
function generated(node2) {
  return !node2 || !node2.position || !node2.position.start || !node2.position.start.line || !node2.position.start.column || !node2.position.end || !node2.position.end.line || !node2.position.end.column;
}

// node_modules/mdast-util-definitions/lib/index.js
var own4 = {}.hasOwnProperty;
function definitions(tree) {
  const cache = /* @__PURE__ */ Object.create(null);
  if (!tree || !tree.type) {
    throw new Error("mdast-util-definitions expected node");
  }
  visit(tree, "definition", (definition3) => {
    const id2 = clean(definition3.identifier);
    if (id2 && !own4.call(cache, id2)) {
      cache[id2] = definition3;
    }
  });
  return definition2;
  function definition2(identifier) {
    const id2 = clean(identifier);
    return id2 && own4.call(cache, id2) ? cache[id2] : null;
  }
}
function clean(value) {
  return String(value || "").toUpperCase();
}

// node_modules/mdast-util-to-hast/lib/state.js
var own5 = {}.hasOwnProperty;
function createState(tree, options) {
  const settings = options || {};
  const dangerous2 = settings.allowDangerousHtml || false;
  const footnoteById = {};
  state.dangerous = dangerous2;
  state.clobberPrefix = settings.clobberPrefix === void 0 || settings.clobberPrefix === null ? "user-content-" : settings.clobberPrefix;
  state.footnoteLabel = settings.footnoteLabel || "Footnotes";
  state.footnoteLabelTagName = settings.footnoteLabelTagName || "h2";
  state.footnoteLabelProperties = settings.footnoteLabelProperties || {
    className: ["sr-only"]
  };
  state.footnoteBackLabel = settings.footnoteBackLabel || "Back to content";
  state.unknownHandler = settings.unknownHandler;
  state.passThrough = settings.passThrough;
  state.handlers = { ...handlers, ...settings.handlers };
  state.definition = definitions(tree);
  state.footnoteById = footnoteById;
  state.footnoteOrder = [];
  state.footnoteCounts = {};
  state.patch = patch;
  state.applyData = applyData;
  state.one = oneBound;
  state.all = allBound;
  state.wrap = wrap2;
  state.augment = augment;
  visit(tree, "footnoteDefinition", (definition2) => {
    const id2 = String(definition2.identifier).toUpperCase();
    if (!own5.call(footnoteById, id2)) {
      footnoteById[id2] = definition2;
    }
  });
  return state;
  function augment(left, right) {
    if (left && "data" in left && left.data) {
      const data = left.data;
      if (data.hName) {
        if (right.type !== "element") {
          right = {
            type: "element",
            tagName: "",
            properties: {},
            children: []
          };
        }
        right.tagName = data.hName;
      }
      if (right.type === "element" && data.hProperties) {
        right.properties = { ...right.properties, ...data.hProperties };
      }
      if ("children" in right && right.children && data.hChildren) {
        right.children = data.hChildren;
      }
    }
    if (left) {
      const ctx = "type" in left ? left : { position: left };
      if (!generated(ctx)) {
        right.position = { start: pointStart(ctx), end: pointEnd(ctx) };
      }
    }
    return right;
  }
  function state(node2, tagName, props, children) {
    if (Array.isArray(props)) {
      children = props;
      props = {};
    }
    return augment(node2, {
      type: "element",
      tagName,
      properties: props || {},
      children: children || []
    });
  }
  function oneBound(node2, parent) {
    return one2(state, node2, parent);
  }
  function allBound(parent) {
    return all2(state, parent);
  }
}
function patch(from, to) {
  if (from.position)
    to.position = position2(from);
}
function applyData(from, to) {
  let result = to;
  if (from && from.data) {
    const hName = from.data.hName;
    const hChildren = from.data.hChildren;
    const hProperties = from.data.hProperties;
    if (typeof hName === "string") {
      if (result.type === "element") {
        result.tagName = hName;
      } else {
        result = {
          type: "element",
          tagName: hName,
          properties: {},
          children: []
        };
      }
    }
    if (result.type === "element" && hProperties) {
      result.properties = { ...result.properties, ...hProperties };
    }
    if ("children" in result && result.children && hChildren !== null && hChildren !== void 0) {
      result.children = hChildren;
    }
  }
  return result;
}
function one2(state, node2, parent) {
  const type = node2 && node2.type;
  if (!type) {
    throw new Error("Expected node, got `" + node2 + "`");
  }
  if (own5.call(state.handlers, type)) {
    return state.handlers[type](state, node2, parent);
  }
  if (state.passThrough && state.passThrough.includes(type)) {
    return "children" in node2 ? { ...node2, children: all2(state, node2) } : node2;
  }
  if (state.unknownHandler) {
    return state.unknownHandler(state, node2, parent);
  }
  return defaultUnknownHandler(state, node2);
}
function all2(state, parent) {
  const values = [];
  if ("children" in parent) {
    const nodes = parent.children;
    let index2 = -1;
    while (++index2 < nodes.length) {
      const result = one2(state, nodes[index2], parent);
      if (result) {
        if (index2 && nodes[index2 - 1].type === "break") {
          if (!Array.isArray(result) && result.type === "text") {
            result.value = result.value.replace(/^\s+/, "");
          }
          if (!Array.isArray(result) && result.type === "element") {
            const head2 = result.children[0];
            if (head2 && head2.type === "text") {
              head2.value = head2.value.replace(/^\s+/, "");
            }
          }
        }
        if (Array.isArray(result)) {
          values.push(...result);
        } else {
          values.push(result);
        }
      }
    }
  }
  return values;
}
function defaultUnknownHandler(state, node2) {
  const data = node2.data || {};
  const result = "value" in node2 && !(own5.call(data, "hProperties") || own5.call(data, "hChildren")) ? { type: "text", value: node2.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: all2(state, node2)
  };
  state.patch(node2, result);
  return state.applyData(node2, result);
}
function wrap2(nodes, loose) {
  const result = [];
  let index2 = -1;
  if (loose) {
    result.push({ type: "text", value: "\n" });
  }
  while (++index2 < nodes.length) {
    if (index2)
      result.push({ type: "text", value: "\n" });
    result.push(nodes[index2]);
  }
  if (loose && nodes.length > 0) {
    result.push({ type: "text", value: "\n" });
  }
  return result;
}

// node_modules/mdast-util-to-hast/lib/footer.js
function footer(state) {
  const listItems = [];
  let index2 = -1;
  while (++index2 < state.footnoteOrder.length) {
    const def = state.footnoteById[state.footnoteOrder[index2]];
    if (!def) {
      continue;
    }
    const content3 = state.all(def);
    const id2 = String(def.identifier).toUpperCase();
    const safeId = normalizeUri(id2.toLowerCase());
    let referenceIndex = 0;
    const backReferences = [];
    while (++referenceIndex <= state.footnoteCounts[id2]) {
      const backReference = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + state.clobberPrefix + "fnref-" + safeId + (referenceIndex > 1 ? "-" + referenceIndex : ""),
          dataFootnoteBackref: true,
          className: ["data-footnote-backref"],
          ariaLabel: state.footnoteBackLabel
        },
        children: [{ type: "text", value: "\u21A9" }]
      };
      if (referenceIndex > 1) {
        backReference.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(referenceIndex) }]
        });
      }
      if (backReferences.length > 0) {
        backReferences.push({ type: "text", value: " " });
      }
      backReferences.push(backReference);
    }
    const tail = content3[content3.length - 1];
    if (tail && tail.type === "element" && tail.tagName === "p") {
      const tailTail = tail.children[tail.children.length - 1];
      if (tailTail && tailTail.type === "text") {
        tailTail.value += " ";
      } else {
        tail.children.push({ type: "text", value: " " });
      }
      tail.children.push(...backReferences);
    } else {
      content3.push(...backReferences);
    }
    const listItem3 = {
      type: "element",
      tagName: "li",
      properties: { id: state.clobberPrefix + "fn-" + safeId },
      children: state.wrap(content3, true)
    };
    state.patch(def, listItem3);
    listItems.push(listItem3);
  }
  if (listItems.length === 0) {
    return;
  }
  return {
    type: "element",
    tagName: "section",
    properties: { dataFootnotes: true, className: ["footnotes"] },
    children: [
      {
        type: "element",
        tagName: state.footnoteLabelTagName,
        properties: {
          // To do: use structured clone.
          ...JSON.parse(JSON.stringify(state.footnoteLabelProperties)),
          id: "footnote-label"
        },
        children: [{ type: "text", value: state.footnoteLabel }]
      },
      { type: "text", value: "\n" },
      {
        type: "element",
        tagName: "ol",
        properties: {},
        children: state.wrap(listItems, true)
      },
      { type: "text", value: "\n" }
    ]
  };
}

// node_modules/mdast-util-to-hast/lib/index.js
function toHast(tree, options) {
  const state = createState(tree, options);
  const node2 = state.one(tree, null);
  const foot = footer(state);
  if (foot) {
    node2.children.push({ type: "text", value: "\n" }, foot);
  }
  return Array.isArray(node2) ? { type: "root", children: node2 } : node2;
}

// node_modules/remark-rehype/lib/index.js
var remarkRehype = (
  /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */
  function(destination, options) {
    return destination && "run" in destination ? bridge(destination, options) : mutate(destination || options);
  }
);
var lib_default = remarkRehype;
function bridge(destination, options) {
  return (node2, file, next) => {
    destination.run(toHast(node2, options), file, (error) => {
      next(error);
    });
  };
}
function mutate(options) {
  return (node2) => toHast(node2, options);
}

// node_modules/property-information/lib/util/schema.js
var Schema = class {
  /**
   * @constructor
   * @param {Properties} property
   * @param {Normal} normal
   * @param {string} [space]
   */
  constructor(property, normal, space2) {
    this.property = property;
    this.normal = normal;
    if (space2) {
      this.space = space2;
    }
  }
};
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;

// node_modules/property-information/lib/util/merge.js
function merge(definitions2, space2) {
  const property = {};
  const normal = {};
  let index2 = -1;
  while (++index2 < definitions2.length) {
    Object.assign(property, definitions2[index2].property);
    Object.assign(normal, definitions2[index2].normal);
  }
  return new Schema(property, normal, space2);
}

// node_modules/property-information/lib/normalize.js
function normalize2(value) {
  return value.toLowerCase();
}

// node_modules/property-information/lib/util/info.js
var Info = class {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   */
  constructor(property, attribute2) {
    this.property = property;
    this.attribute = attribute2;
  }
};
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;

// node_modules/property-information/lib/util/types.js
var types_exports = {};
__export(types_exports, {
  boolean: () => boolean,
  booleanish: () => booleanish,
  commaOrSpaceSeparated: () => commaOrSpaceSeparated,
  commaSeparated: () => commaSeparated,
  number: () => number,
  overloadedBoolean: () => overloadedBoolean,
  spaceSeparated: () => spaceSeparated
});
var powers = 0;
var boolean = increment();
var booleanish = increment();
var overloadedBoolean = increment();
var number = increment();
var spaceSeparated = increment();
var commaSeparated = increment();
var commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}

// node_modules/property-information/lib/util/defined-info.js
var checks = Object.keys(types_exports);
var DefinedInfo = class extends Info {
  /**
   * @constructor
   * @param {string} property
   * @param {string} attribute
   * @param {number|null} [mask]
   * @param {string} [space]
   */
  constructor(property, attribute2, mask, space2) {
    let index2 = -1;
    super(property, attribute2);
    mark(this, "space", space2);
    if (typeof mask === "number") {
      while (++index2 < checks.length) {
        const check = checks[index2];
        mark(this, checks[index2], (mask & types_exports[check]) === types_exports[check]);
      }
    }
  }
};
DefinedInfo.prototype.defined = true;
function mark(values, key2, value) {
  if (value) {
    values[key2] = value;
  }
}

// node_modules/property-information/lib/util/create.js
var own6 = {}.hasOwnProperty;
function create(definition2) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition2.properties) {
    if (own6.call(definition2.properties, prop)) {
      const value = definition2.properties[prop];
      const info = new DefinedInfo(
        prop,
        definition2.transform(definition2.attributes || {}, prop),
        value,
        definition2.space
      );
      if (definition2.mustUseProperty && definition2.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize2(prop)] = prop;
      normal[normalize2(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition2.space);
}

// node_modules/property-information/lib/xlink.js
var xlink = create({
  space: "xlink",
  transform(_, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});

// node_modules/property-information/lib/xml.js
var xml = create({
  space: "xml",
  transform(_, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});

// node_modules/property-information/lib/util/case-sensitive-transform.js
function caseSensitiveTransform(attributes, attribute2) {
  return attribute2 in attributes ? attributes[attribute2] : attribute2;
}

// node_modules/property-information/lib/util/case-insensitive-transform.js
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}

// node_modules/property-information/lib/xmlns.js
var xmlns = create({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});

// node_modules/property-information/lib/aria.js
var aria = create({
  transform(_, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});

// node_modules/property-information/lib/html.js
var html2 = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: number,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: boolean,
    // Lists. Use CSS to reduce space between items instead
    declare: boolean,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: number,
    // `<img>` and `<object>`
    leftMargin: number,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: number,
    // `<body>`
    marginWidth: number,
    // `<body>`
    noResize: boolean,
    // `<frame>`
    noHref: boolean,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: number,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: booleanish,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: number,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});

// node_modules/property-information/lib/svg.js
var svg = create({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});

// node_modules/property-information/lib/find.js
var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;
function find(schema, value) {
  const normal = normalize2(value);
  let prop = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}

// node_modules/property-information/index.js
var html3 = merge([xml, xlink, xmlns, aria, html2], "html");
var svg2 = merge([xml, xlink, xmlns, aria, svg], "svg");

// node_modules/html-void-elements/index.js
var htmlVoidElements = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "nextid",
  "param",
  "source",
  "track",
  "wbr"
];

// node_modules/zwitch/index.js
var own7 = {}.hasOwnProperty;
function zwitch(key2, options) {
  const settings = options || {};
  function one7(value, ...parameters) {
    let fn = one7.invalid;
    const handlers2 = one7.handlers;
    if (value && own7.call(value, key2)) {
      const id2 = String(value[key2]);
      fn = own7.call(handlers2, id2) ? handlers2[id2] : one7.unknown;
    }
    if (fn) {
      return fn.call(this, value, ...parameters);
    }
  }
  one7.handlers = settings.handlers || {};
  one7.invalid = settings.invalid;
  one7.unknown = settings.unknown;
  return one7;
}

// node_modules/stringify-entities/lib/core.js
function core(value, options) {
  value = value.replace(
    options.subset ? charactersToExpression(options.subset) : /["&'<>`]/g,
    basic
  );
  if (options.subset || options.escapeOnly) {
    return value;
  }
  return value.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, surrogate).replace(
    // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
    /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
    basic
  );
  function surrogate(pair, index2, all7) {
    return options.format(
      (pair.charCodeAt(0) - 55296) * 1024 + pair.charCodeAt(1) - 56320 + 65536,
      all7.charCodeAt(index2 + 2),
      options
    );
  }
  function basic(character, index2, all7) {
    return options.format(
      character.charCodeAt(0),
      all7.charCodeAt(index2 + 1),
      options
    );
  }
}
function charactersToExpression(subset) {
  const groups = [];
  let index2 = -1;
  while (++index2 < subset.length) {
    groups.push(subset[index2].replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"));
  }
  return new RegExp("(?:" + groups.join("|") + ")", "g");
}

// node_modules/stringify-entities/lib/util/to-hexadecimal.js
function toHexadecimal(code3, next, omit) {
  const value = "&#x" + code3.toString(16).toUpperCase();
  return omit && next && !/[\dA-Fa-f]/.test(String.fromCharCode(next)) ? value : value + ";";
}

// node_modules/stringify-entities/lib/util/to-decimal.js
function toDecimal(code3, next, omit) {
  const value = "&#" + String(code3);
  return omit && next && !/\d/.test(String.fromCharCode(next)) ? value : value + ";";
}

// node_modules/character-entities-legacy/index.js
var characterEntitiesLegacy = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
];

// node_modules/character-entities-html4/index.js
var characterEntitiesHtml4 = {
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  fnof: "\u0192",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  bull: "\u2022",
  hellip: "\u2026",
  prime: "\u2032",
  Prime: "\u2033",
  oline: "\u203E",
  frasl: "\u2044",
  weierp: "\u2118",
  image: "\u2111",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  circ: "\u02C6",
  tilde: "\u02DC",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  permil: "\u2030",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  euro: "\u20AC"
};

// node_modules/stringify-entities/lib/constant/dangerous.js
var dangerous = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
];

// node_modules/stringify-entities/lib/util/to-named.js
var own8 = {}.hasOwnProperty;
var characters = {};
var key;
for (key in characterEntitiesHtml4) {
  if (own8.call(characterEntitiesHtml4, key)) {
    characters[characterEntitiesHtml4[key]] = key;
  }
}
function toNamed(code3, next, omit, attribute2) {
  const character = String.fromCharCode(code3);
  if (own8.call(characters, character)) {
    const name2 = characters[character];
    const value = "&" + name2;
    if (omit && characterEntitiesLegacy.includes(name2) && !dangerous.includes(name2) && (!attribute2 || next && next !== 61 && /[^\da-z]/i.test(String.fromCharCode(next)))) {
      return value;
    }
    return value + ";";
  }
  return "";
}

// node_modules/stringify-entities/lib/util/format-smart.js
function formatSmart(code3, next, options) {
  let numeric = toHexadecimal(code3, next, options.omitOptionalSemicolons);
  let named;
  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed(
      code3,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    );
  }
  if ((options.useShortestReferences || !named) && options.useShortestReferences) {
    const decimal = toDecimal(code3, next, options.omitOptionalSemicolons);
    if (decimal.length < numeric.length) {
      numeric = decimal;
    }
  }
  return named && (!options.useShortestReferences || named.length < numeric.length) ? named : numeric;
}

// node_modules/stringify-entities/lib/index.js
function stringifyEntities(value, options) {
  return core(value, Object.assign({ format: formatSmart }, options));
}

// node_modules/hast-util-to-html/lib/handle/comment.js
function comment(node2, _1, _2, state) {
  return state.settings.bogusComments ? "<?" + stringifyEntities(
    node2.value,
    Object.assign({}, state.settings.characterReferences, { subset: [">"] })
  ) + ">" : "<!--" + node2.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, encode) + "-->";
  function encode($0) {
    return stringifyEntities(
      $0,
      Object.assign({}, state.settings.characterReferences, {
        subset: ["<", ">"]
      })
    );
  }
}

// node_modules/hast-util-to-html/lib/handle/doctype.js
function doctype(_1, _2, _3, state) {
  return "<!" + (state.settings.upperDoctype ? "DOCTYPE" : "doctype") + (state.settings.tightDoctype ? "" : " ") + "html>";
}

// node_modules/comma-separated-tokens/index.js
function parse2(value) {
  const tokens = [];
  const input = String(value || "");
  let index2 = input.indexOf(",");
  let start = 0;
  let end = false;
  while (!end) {
    if (index2 === -1) {
      index2 = input.length;
      end = true;
    }
    const token = input.slice(start, index2).trim();
    if (token || !end) {
      tokens.push(token);
    }
    start = index2 + 1;
    index2 = input.indexOf(",", start);
  }
  return tokens;
}
function stringify(values, options) {
  const settings = options || {};
  const input = values[values.length - 1] === "" ? [...values, ""] : values;
  return input.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}

// node_modules/space-separated-tokens/index.js
function parse3(value) {
  const input = String(value || "").trim();
  return input ? input.split(/[ \t\n\r\f]+/g) : [];
}
function stringify2(values) {
  return values.join(" ").trim();
}

// node_modules/hast-util-whitespace/index.js
function whitespace(thing) {
  const value = (
    // @ts-expect-error looks like a node.
    thing && typeof thing === "object" && thing.type === "text" ? (
      // @ts-expect-error looks like a text.
      thing.value || ""
    ) : thing
  );
  return typeof value === "string" && value.replace(/[ \t\n\f\r]/g, "") === "";
}

// node_modules/hast-util-to-html/lib/omission/util/siblings.js
var siblingAfter = siblings(1);
var siblingBefore = siblings(-1);
function siblings(increment2) {
  return sibling;
  function sibling(parent, index2, includeWhitespace) {
    const siblings2 = parent ? parent.children : [];
    let offset = (index2 || 0) + increment2;
    let next = siblings2 && siblings2[offset];
    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment2;
        next = siblings2[offset];
      }
    }
    return next;
  }
}

// node_modules/hast-util-to-html/lib/omission/omission.js
var own9 = {}.hasOwnProperty;
function omission(handlers2) {
  return omit;
  function omit(node2, index2, parent) {
    return own9.call(handlers2, node2.tagName) && handlers2[node2.tagName](node2, index2, parent);
  }
}

// node_modules/hast-util-to-html/lib/omission/closing.js
var closing = omission({
  html: html4,
  head: headOrColgroupOrCaption,
  body,
  p,
  li,
  dt,
  dd,
  rt: rubyElement,
  rp: rubyElement,
  optgroup,
  option,
  menuitem,
  colgroup: headOrColgroupOrCaption,
  caption: headOrColgroupOrCaption,
  thead,
  tbody,
  tfoot,
  tr,
  td: cells,
  th: cells
});
function headOrColgroupOrCaption(_, index2, parent) {
  const next = siblingAfter(parent, index2, true);
  return !next || next.type !== "comment" && !(next.type === "text" && whitespace(next.value.charAt(0)));
}
function html4(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type !== "comment";
}
function body(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type !== "comment";
}
function p(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return next ? next.type === "element" && (next.tagName === "address" || next.tagName === "article" || next.tagName === "aside" || next.tagName === "blockquote" || next.tagName === "details" || next.tagName === "div" || next.tagName === "dl" || next.tagName === "fieldset" || next.tagName === "figcaption" || next.tagName === "figure" || next.tagName === "footer" || next.tagName === "form" || next.tagName === "h1" || next.tagName === "h2" || next.tagName === "h3" || next.tagName === "h4" || next.tagName === "h5" || next.tagName === "h6" || next.tagName === "header" || next.tagName === "hgroup" || next.tagName === "hr" || next.tagName === "main" || next.tagName === "menu" || next.tagName === "nav" || next.tagName === "ol" || next.tagName === "p" || next.tagName === "pre" || next.tagName === "section" || next.tagName === "table" || next.tagName === "ul") : !parent || // Confusing parent.
  !(parent.type === "element" && (parent.tagName === "a" || parent.tagName === "audio" || parent.tagName === "del" || parent.tagName === "ins" || parent.tagName === "map" || parent.tagName === "noscript" || parent.tagName === "video"));
}
function li(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && next.tagName === "li";
}
function dt(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return next && next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function dd(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "dt" || next.tagName === "dd");
}
function rubyElement(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "rp" || next.tagName === "rt");
}
function optgroup(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && next.tagName === "optgroup";
}
function option(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "option" || next.tagName === "optgroup");
}
function menuitem(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "menuitem" || next.tagName === "hr" || next.tagName === "menu");
}
function thead(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return next && next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tbody(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "tbody" || next.tagName === "tfoot");
}
function tfoot(_, index2, parent) {
  return !siblingAfter(parent, index2);
}
function tr(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && next.tagName === "tr";
}
function cells(_, index2, parent) {
  const next = siblingAfter(parent, index2);
  return !next || next.type === "element" && (next.tagName === "td" || next.tagName === "th");
}

// node_modules/hast-util-to-html/lib/omission/opening.js
var opening = omission({
  html: html5,
  head,
  body: body2,
  colgroup,
  tbody: tbody2
});
function html5(node2) {
  const head2 = siblingAfter(node2, -1);
  return !head2 || head2.type !== "comment";
}
function head(node2) {
  const children = node2.children;
  const seen = [];
  let index2 = -1;
  while (++index2 < children.length) {
    const child = children[index2];
    if (child.type === "element" && (child.tagName === "title" || child.tagName === "base")) {
      if (seen.includes(child.tagName))
        return false;
      seen.push(child.tagName);
    }
  }
  return children.length > 0;
}
function body2(node2) {
  const head2 = siblingAfter(node2, -1, true);
  return !head2 || head2.type !== "comment" && !(head2.type === "text" && whitespace(head2.value.charAt(0))) && !(head2.type === "element" && (head2.tagName === "meta" || head2.tagName === "link" || head2.tagName === "script" || head2.tagName === "style" || head2.tagName === "template"));
}
function colgroup(node2, index2, parent) {
  const previous3 = siblingBefore(parent, index2);
  const head2 = siblingAfter(node2, -1, true);
  if (parent && previous3 && previous3.type === "element" && previous3.tagName === "colgroup" && closing(previous3, parent.children.indexOf(previous3), parent)) {
    return false;
  }
  return head2 && head2.type === "element" && head2.tagName === "col";
}
function tbody2(node2, index2, parent) {
  const previous3 = siblingBefore(parent, index2);
  const head2 = siblingAfter(node2, -1);
  if (parent && previous3 && previous3.type === "element" && (previous3.tagName === "thead" || previous3.tagName === "tbody") && closing(previous3, parent.children.indexOf(previous3), parent)) {
    return false;
  }
  return head2 && head2.type === "element" && head2.tagName === "tr";
}

// node_modules/hast-util-to-html/lib/handle/element.js
var constants2 = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ["	\n\f\r &/=>".split(""), "	\n\f\r \"&'/=>`".split("")],
    [`\0	
\f\r "&'/<=>`.split(""), "\0	\n\f\r \"&'/<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ["	\n\f\r &>".split(""), "\0	\n\f\r \"&'<=>`".split("")],
    ["\0	\n\f\r \"&'<=>`".split(""), "\0	\n\f\r \"&'<=>`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function element2(node2, index2, parent, state) {
  const schema = state.schema;
  const omit = schema.space === "svg" ? false : state.settings.omitOptionalTags;
  let selfClosing = schema.space === "svg" ? state.settings.closeEmptyElements : state.settings.voids.includes(node2.tagName.toLowerCase());
  const parts = [];
  let last;
  if (schema.space === "html" && node2.tagName === "svg") {
    state.schema = svg2;
  }
  const attrs = serializeAttributes(state, node2.properties);
  const content3 = state.all(
    schema.space === "html" && node2.tagName === "template" ? node2.content : node2
  );
  state.schema = schema;
  if (content3)
    selfClosing = false;
  if (attrs || !omit || !opening(node2, index2, parent)) {
    parts.push("<", node2.tagName, attrs ? " " + attrs : "");
    if (selfClosing && (schema.space === "svg" || state.settings.closeSelfClosing)) {
      last = attrs.charAt(attrs.length - 1);
      if (!state.settings.tightSelfClosing || last === "/" || last && last !== '"' && last !== "'") {
        parts.push(" ");
      }
      parts.push("/");
    }
    parts.push(">");
  }
  parts.push(content3);
  if (!selfClosing && (!omit || !closing(node2, index2, parent))) {
    parts.push("</" + node2.tagName + ">");
  }
  return parts.join("");
}
function serializeAttributes(state, props) {
  const values = [];
  let index2 = -1;
  let key2;
  if (props) {
    for (key2 in props) {
      if (props[key2] !== void 0 && props[key2] !== null) {
        const value = serializeAttribute(state, key2, props[key2]);
        if (value)
          values.push(value);
      }
    }
  }
  while (++index2 < values.length) {
    const last = state.settings.tightAttributes ? values[index2].charAt(values[index2].length - 1) : null;
    if (index2 !== values.length - 1 && last !== '"' && last !== "'") {
      values[index2] += " ";
    }
  }
  return values.join("");
}
function serializeAttribute(state, key2, value) {
  const info = find(state.schema, key2);
  const x = state.settings.allowParseErrors && state.schema.space === "html" ? 0 : 1;
  const y = state.settings.allowDangerousCharacters ? 0 : 1;
  let quote = state.quote;
  let result;
  if (info.overloadedBoolean && (value === info.attribute || value === "")) {
    value = true;
  } else if (info.boolean || info.overloadedBoolean && typeof value !== "string") {
    value = Boolean(value);
  }
  if (value === void 0 || value === null || value === false || typeof value === "number" && Number.isNaN(value)) {
    return "";
  }
  const name2 = stringifyEntities(
    info.attribute,
    Object.assign({}, state.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: constants2.name[x][y]
    })
  );
  if (value === true)
    return name2;
  value = Array.isArray(value) ? (info.commaSeparated ? stringify : stringify2)(value, {
    padLeft: !state.settings.tightCommaSeparatedLists
  }) : String(value);
  if (state.settings.collapseEmptyAttributes && !value)
    return name2;
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        subset: constants2.unquoted[x][y],
        attribute: true
      })
    );
  }
  if (result !== value) {
    if (state.settings.quoteSmart && ccount(value, quote) > ccount(value, state.alternative)) {
      quote = state.alternative;
    }
    result = quote + stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        // Always encode without parse errors in non-HTML.
        subset: (quote === "'" ? constants2.single : constants2.double)[x][y],
        attribute: true
      })
    ) + quote;
  }
  return name2 + (result ? "=" + result : result);
}

// node_modules/hast-util-to-html/lib/handle/text.js
function text5(node2, _, parent, state) {
  return parent && parent.type === "element" && (parent.tagName === "script" || parent.tagName === "style") ? node2.value : stringifyEntities(
    node2.value,
    Object.assign({}, state.settings.characterReferences, {
      subset: ["<", "&"]
    })
  );
}

// node_modules/hast-util-to-html/lib/handle/raw.js
function raw(node2, index2, parent, state) {
  return state.settings.allowDangerousHtml ? node2.value : text5(node2, index2, parent, state);
}

// node_modules/hast-util-to-html/lib/handle/root.js
function root2(node2, _1, _2, state) {
  return state.all(node2);
}

// node_modules/hast-util-to-html/lib/handle/index.js
var handle = zwitch("type", {
  invalid,
  unknown,
  handlers: { comment, doctype, element: element2, raw, root: root2, text: text5 }
});
function invalid(node2) {
  throw new Error("Expected node, not `" + node2 + "`");
}
function unknown(node2) {
  throw new Error("Cannot compile unknown node `" + node2.type + "`");
}

// node_modules/hast-util-to-html/lib/index.js
function toHtml(tree, options) {
  const options_ = options || {};
  const quote = options_.quote || '"';
  const alternative = quote === '"' ? "'" : '"';
  if (quote !== '"' && quote !== "'") {
    throw new Error("Invalid quote `" + quote + "`, expected `'` or `\"`");
  }
  const state = {
    one: one3,
    all: all3,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences: options_.characterReferences || options_.entities || {},
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === "svg" ? svg2 : html3,
    quote,
    alternative
  };
  return state.one(
    Array.isArray(tree) ? { type: "root", children: tree } : tree,
    void 0,
    void 0
  );
}
function one3(node2, index2, parent) {
  return handle(node2, index2, parent, this);
}
function all3(parent) {
  const results = [];
  const children = parent && parent.children || [];
  let index2 = -1;
  while (++index2 < children.length) {
    results[index2] = this.one(children[index2], index2, parent);
  }
  return results.join("");
}

// node_modules/rehype-stringify/lib/index.js
function rehypeStringify(config) {
  const processorSettings = (
    /** @type {Options} */
    this.data("settings")
  );
  const settings = Object.assign({}, processorSettings, config);
  Object.assign(this, { Compiler: compiler2 });
  function compiler2(tree) {
    return toHtml(tree, settings);
  }
}

// node_modules/hast-util-parse-selector/lib/index.js
var search2 = /[#.]/g;
function parseSelector(selector, defaultTagName) {
  const value = selector || "";
  const props = {};
  let start = 0;
  let previous3;
  let tagName;
  while (start < value.length) {
    search2.lastIndex = start;
    const match = search2.exec(value);
    const subvalue = value.slice(start, match ? match.index : value.length);
    if (subvalue) {
      if (!previous3) {
        tagName = subvalue;
      } else if (previous3 === "#") {
        props.id = subvalue;
      } else if (Array.isArray(props.className)) {
        props.className.push(subvalue);
      } else {
        props.className = [subvalue];
      }
      start += subvalue.length;
    }
    if (match) {
      previous3 = match[0];
      start++;
    }
  }
  return {
    type: "element",
    // @ts-expect-error: fine.
    tagName: tagName || defaultTagName || "div",
    properties: props,
    children: []
  };
}

// node_modules/hastscript/lib/core.js
var buttonTypes = /* @__PURE__ */ new Set(["menu", "submit", "reset", "button"]);
var own10 = {}.hasOwnProperty;
function core2(schema, defaultTagName, caseSensitive) {
  const adjust = caseSensitive && createAdjustMap(caseSensitive);
  const h2 = (
    /**
     * @type {{
     *   (): Root
     *   (selector: null | undefined, ...children: Array<HChild>): Root
     *   (selector: string, properties?: HProperties, ...children: Array<HChild>): Element
     *   (selector: string, ...children: Array<HChild>): Element
     * }}
     */
    /**
     * Hyperscript compatible DSL for creating virtual hast trees.
     *
     * @param {string | null} [selector]
     * @param {HProperties | HChild} [properties]
     * @param {Array<HChild>} children
     * @returns {HResult}
     */
    function(selector, properties, ...children) {
      let index2 = -1;
      let node2;
      if (selector === void 0 || selector === null) {
        node2 = { type: "root", children: [] };
        children.unshift(properties);
      } else {
        node2 = parseSelector(selector, defaultTagName);
        node2.tagName = node2.tagName.toLowerCase();
        if (adjust && own10.call(adjust, node2.tagName)) {
          node2.tagName = adjust[node2.tagName];
        }
        if (isProperties(properties, node2.tagName)) {
          let key2;
          for (key2 in properties) {
            if (own10.call(properties, key2)) {
              addProperty(schema, node2.properties, key2, properties[key2]);
            }
          }
        } else {
          children.unshift(properties);
        }
      }
      while (++index2 < children.length) {
        addChild(node2.children, children[index2]);
      }
      if (node2.type === "element" && node2.tagName === "template") {
        node2.content = { type: "root", children: node2.children };
        node2.children = [];
      }
      return node2;
    }
  );
  return h2;
}
function isProperties(value, name2) {
  if (value === null || value === void 0 || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  if (name2 === "input" || !value.type || typeof value.type !== "string") {
    return true;
  }
  if ("children" in value && Array.isArray(value.children)) {
    return false;
  }
  if (name2 === "button") {
    return buttonTypes.has(value.type.toLowerCase());
  }
  return !("value" in value);
}
function addProperty(schema, properties, key2, value) {
  const info = find(schema, key2);
  let index2 = -1;
  let result;
  if (value === void 0 || value === null)
    return;
  if (typeof value === "number") {
    if (Number.isNaN(value))
      return;
    result = value;
  } else if (typeof value === "boolean") {
    result = value;
  } else if (typeof value === "string") {
    if (info.spaceSeparated) {
      result = parse3(value);
    } else if (info.commaSeparated) {
      result = parse2(value);
    } else if (info.commaOrSpaceSeparated) {
      result = parse3(parse2(value).join(" "));
    } else {
      result = parsePrimitive(info, info.property, value);
    }
  } else if (Array.isArray(value)) {
    result = value.concat();
  } else {
    result = info.property === "style" ? style(value) : String(value);
  }
  if (Array.isArray(result)) {
    const finalResult = [];
    while (++index2 < result.length) {
      finalResult[index2] = parsePrimitive(info, info.property, result[index2]);
    }
    result = finalResult;
  }
  if (info.property === "className" && Array.isArray(properties.className)) {
    result = properties.className.concat(result);
  }
  properties[info.property] = result;
}
function addChild(nodes, value) {
  let index2 = -1;
  if (value === void 0 || value === null) {
  } else if (typeof value === "string" || typeof value === "number") {
    nodes.push({ type: "text", value: String(value) });
  } else if (Array.isArray(value)) {
    while (++index2 < value.length) {
      addChild(nodes, value[index2]);
    }
  } else if (typeof value === "object" && "type" in value) {
    if (value.type === "root") {
      addChild(nodes, value.children);
    } else {
      nodes.push(value);
    }
  } else {
    throw new Error("Expected node, nodes, or string, got `" + value + "`");
  }
}
function parsePrimitive(info, name2, value) {
  if (typeof value === "string") {
    if (info.number && value && !Number.isNaN(Number(value))) {
      return Number(value);
    }
    if ((info.boolean || info.overloadedBoolean) && (value === "" || normalize2(value) === normalize2(name2))) {
      return true;
    }
  }
  return value;
}
function style(value) {
  const result = [];
  let key2;
  for (key2 in value) {
    if (own10.call(value, key2)) {
      result.push([key2, value[key2]].join(": "));
    }
  }
  return result.join("; ");
}
function createAdjustMap(values) {
  const result = {};
  let index2 = -1;
  while (++index2 < values.length) {
    result[values[index2].toLowerCase()] = values[index2];
  }
  return result;
}

// node_modules/hastscript/lib/html.js
var h = core2(html3, "div");

// node_modules/hastscript/lib/svg-case-sensitive-tag-names.js
var svgCaseSensitiveTagNames = [
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "solidColor",
  "textArea",
  "textPath"
];

// node_modules/hastscript/lib/svg.js
var s = core2(svg2, "g", svgCaseSensitiveTagNames);

// node_modules/rehype-document/index.js
function rehypeDocument(options = {}) {
  const meta = cast(options.meta);
  const link2 = cast(options.link);
  const styles = cast(options.style);
  const css = cast(options.css);
  const scripts = cast(options.script);
  const js = cast(options.js);
  if (options.responsive !== false) {
    meta.unshift({
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    });
  }
  return (tree, file) => {
    const title = options.title || file.stem;
    const contents = tree.type === "root" ? tree.children.concat() : [tree];
    const head2 = [{ type: "text", value: "\n" }, h("meta", { charSet: "utf-8" })];
    let index2 = -1;
    if (contents.length > 0) {
      contents.unshift({ type: "text", value: "\n" });
    }
    if (title) {
      head2.push({ type: "text", value: "\n" }, h("title", [title]));
    }
    while (++index2 < meta.length) {
      head2.push({ type: "text", value: "\n" }, h("meta", meta[index2]));
    }
    index2 = -1;
    while (++index2 < link2.length) {
      head2.push({ type: "text", value: "\n" }, h("link", link2[index2]));
    }
    index2 = -1;
    while (++index2 < styles.length) {
      head2.push({ type: "text", value: "\n" }, h("style", styles[index2]));
    }
    index2 = -1;
    while (++index2 < css.length) {
      head2.push(
        { type: "text", value: "\n" },
        h("link", { rel: "stylesheet", href: css[index2] })
      );
    }
    head2.push({ type: "text", value: "\n" });
    index2 = -1;
    while (++index2 < scripts.length) {
      contents.push({ type: "text", value: "\n" }, h("script", scripts[index2]));
    }
    index2 = -1;
    while (++index2 < js.length) {
      contents.push({ type: "text", value: "\n" }, h("script", { src: js[index2] }));
    }
    contents.push({ type: "text", value: "\n" });
    const doctype2 = { type: "doctype" };
    return {
      type: "root",
      children: [
        doctype2,
        { type: "text", value: "\n" },
        h("html", { lang: options.language || "en", dir: options.dir }, [
          { type: "text", value: "\n" },
          h("head", head2),
          { type: "text", value: "\n" },
          h("body", contents),
          { type: "text", value: "\n" }
        ]),
        { type: "text", value: "\n" }
      ]
    };
  };
}
function cast(value) {
  return value === null || value === void 0 ? [] : typeof value === "string" || !Array.isArray(value) ? [value] : value;
}

// node_modules/direction/index.js
var rtlRange = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
var ltrRange = "A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C\uFE00-\uFE6F\uFEFD-\uFFFF";
var rtl = new RegExp("^[^" + ltrRange + "]*[" + rtlRange + "]");
var ltr = new RegExp("^[^" + rtlRange + "]*[" + ltrRange + "]");
function direction(value) {
  const source = String(value || "");
  return rtl.test(source) ? "rtl" : ltr.test(source) ? "ltr" : "neutral";
}

// node_modules/hast-util-to-string/index.js
function toString3(node2) {
  if ("children" in node2) {
    return all4(node2);
  }
  return "value" in node2 ? node2.value : "";
}
function one4(node2) {
  if (node2.type === "text") {
    return node2.value;
  }
  return "children" in node2 ? all4(node2) : "";
}
function all4(node2) {
  let index2 = -1;
  const result = [];
  while (++index2 < node2.children.length) {
    result[index2] = one4(node2.children[index2]);
  }
  return result.join("");
}

// node_modules/hast-util-select/lib/enter-state.js
function enterState(state, node2) {
  const schema = state.schema;
  const language = state.language;
  const currentDirection = state.direction;
  const editableOrEditingHost = state.editableOrEditingHost;
  let dirInferred;
  if (node2.type === "element" && node2.properties) {
    const lang2 = node2.properties.xmlLang || node2.properties.lang;
    const type = node2.properties.type || "text";
    const dir2 = dirProperty(node2);
    if (lang2 !== void 0 && lang2 !== null) {
      state.language = String(lang2);
    }
    if (schema && schema.space === "html") {
      if (node2.properties.contentEditable === "true") {
        state.editableOrEditingHost = true;
      }
      if (node2.tagName === "svg") {
        state.schema = svg2;
      }
      if (dir2 === "rtl") {
        dirInferred = dir2;
      } else if (
        // Explicit `[dir=ltr]`.
        dir2 === "ltr" || // HTML with an invalid or no `[dir]`.
        dir2 !== "auto" && node2.tagName === "html" || // `input[type=tel]` with an invalid or no `[dir]`.
        dir2 !== "auto" && node2.tagName === "input" && type === "tel"
      ) {
        dirInferred = "ltr";
      } else if (dir2 === "auto" || node2.tagName === "bdi") {
        if (node2.tagName === "textarea") {
          dirInferred = dirBidi(toString3(node2));
        } else if (node2.tagName === "input" && (type === "email" || type === "search" || type === "tel" || type === "text")) {
          dirInferred = node2.properties.value ? (
            // @ts-expect-error Assume string
            dirBidi(node2.properties.value)
          ) : "ltr";
        } else {
          visit(node2, inferDirectionality);
        }
      }
      if (dirInferred) {
        state.direction = dirInferred;
      }
    } else if (state.editableOrEditingHost) {
      state.editableOrEditingHost = false;
    }
  }
  return reset;
  function reset() {
    state.schema = schema;
    state.language = language;
    state.direction = currentDirection;
    state.editableOrEditingHost = editableOrEditingHost;
  }
  function inferDirectionality(child) {
    if (child.type === "text") {
      dirInferred = dirBidi(child.value);
      return dirInferred ? EXIT : void 0;
    }
    if (child !== node2 && child.type === "element" && (child.tagName === "bdi" || child.tagName === "script" || child.tagName === "style" || child.tagName === "textare" || dirProperty(child))) {
      return SKIP;
    }
  }
}
function dirBidi(value) {
  const result = direction(value);
  return result === "neutral" ? void 0 : result;
}
function dirProperty(node2) {
  const value = node2.type === "element" && node2.properties && typeof node2.properties.dir === "string" ? node2.properties.dir.toLowerCase() : void 0;
  return value === "auto" || value === "ltr" || value === "rtl" ? value : void 0;
}

// node_modules/hast-util-has-property/lib/index.js
var own11 = {}.hasOwnProperty;
function hasProperty(node2, field) {
  const value = typeof field === "string" && isNode(node2) && node2.type === "element" && node2.properties && own11.call(node2.properties, field) && node2.properties[field];
  return value !== null && value !== void 0 && value !== false;
}
function isNode(value) {
  return Boolean(value && typeof value === "object" && "type" in value);
}

// node_modules/hast-util-select/lib/attribute.js
var handle2 = zwitch("operator", {
  unknown: unknownOperator,
  // @ts-expect-error: hush.
  invalid: exists,
  handlers: {
    "=": exact,
    "~=": spaceSeparatedList,
    "|=": exactOrPrefix,
    "^=": begins,
    "$=": ends,
    "*=": contains
  }
});
function attribute(query, element4, schema) {
  const attrs = query.attrs;
  let index2 = -1;
  while (++index2 < attrs.length) {
    if (!handle2(attrs[index2], element4, find(schema, attrs[index2].name))) {
      return false;
    }
  }
  return true;
}
function exists(_, element4, info) {
  return hasProperty(element4, info.property);
}
function exact(query, element4, info) {
  return Boolean(
    hasProperty(element4, info.property) && element4.properties && normalizeValue(element4.properties[info.property], info) === query.value
  );
}
function spaceSeparatedList(query, element4, info) {
  const value = element4.properties && element4.properties[info.property];
  return (
    // If this is a space-separated list, and the query is contained in it, return
    // true.
    !info.commaSeparated && value && typeof value === "object" && query.value && value.includes(query.value) || // For all other values (including comma-separated lists), return whether this
    // is an exact match.
    hasProperty(element4, info.property) && normalizeValue(value, info) === query.value
  );
}
function exactOrPrefix(query, element4, info) {
  const value = normalizeValue(
    element4.properties && element4.properties[info.property],
    info
  );
  return Boolean(
    hasProperty(element4, info.property) && query.value && (value === query.value || value.slice(0, query.value.length) === query.value && value.charAt(query.value.length) === "-")
  );
}
function begins(query, element4, info) {
  return Boolean(
    hasProperty(element4, info.property) && element4.properties && query.value && normalizeValue(element4.properties[info.property], info).slice(
      0,
      query.value.length
    ) === query.value
  );
}
function ends(query, element4, info) {
  return Boolean(
    hasProperty(element4, info.property) && element4.properties && query.value && normalizeValue(element4.properties[info.property], info).slice(
      -query.value.length
    ) === query.value
  );
}
function contains(query, element4, info) {
  return Boolean(
    hasProperty(element4, info.property) && element4.properties && query.value && normalizeValue(element4.properties[info.property], info).includes(
      query.value
    )
  );
}
function unknownOperator(query) {
  throw new Error("Unknown operator `" + query.operator + "`");
}
function normalizeValue(value, info) {
  if (typeof value === "boolean") {
    return info.attribute;
  }
  if (Array.isArray(value)) {
    return (info.commaSeparated ? stringify : stringify2)(value);
  }
  return String(value);
}

// node_modules/hast-util-select/lib/class-name.js
function className(query, element4) {
  const value = element4.properties.className || [];
  let index2 = -1;
  if (query.classNames) {
    while (++index2 < query.classNames.length) {
      if (!value.includes(query.classNames[index2]))
        return false;
    }
  }
  return true;
}

// node_modules/hast-util-select/lib/id.js
function id(query, element4) {
  return Boolean(element4.properties && element4.properties.id === query.id);
}

// node_modules/hast-util-select/lib/name.js
function name(query, element4) {
  return query.tagName === "*" || query.tagName === element4.tagName;
}

// node_modules/bcp-47-match/index.js
function factory(check, filter) {
  return function(tags, ranges) {
    let left = cast2(tags, "tag");
    const right = cast2(
      ranges === null || ranges === void 0 ? "*" : ranges,
      "range"
    );
    const matches3 = [];
    let rightIndex = -1;
    while (++rightIndex < right.length) {
      const range = right[rightIndex].toLowerCase();
      if (!filter && range === "*")
        continue;
      let leftIndex = -1;
      const next = [];
      while (++leftIndex < left.length) {
        if (check(left[leftIndex].toLowerCase(), range)) {
          if (!filter) {
            return (
              /** @type {IsFilter extends true ? Tags : Tag|undefined} */
              left[leftIndex]
            );
          }
          matches3.push(left[leftIndex]);
        } else {
          next.push(left[leftIndex]);
        }
      }
      left = next;
    }
    return (
      /** @type {IsFilter extends true ? Tags : Tag|undefined} */
      filter ? matches3 : void 0
    );
  };
}
var basicFilter = factory(function(tag, range) {
  return range === "*" || tag === range || tag.includes(range + "-");
}, true);
var extendedFilter = factory(function(tag, range) {
  const left = tag.split("-");
  const right = range.split("-");
  let leftIndex = 0;
  let rightIndex = 0;
  if (right[rightIndex] !== "*" && left[leftIndex] !== right[rightIndex]) {
    return false;
  }
  leftIndex++;
  rightIndex++;
  while (rightIndex < right.length) {
    if (right[rightIndex] === "*") {
      rightIndex++;
      continue;
    }
    if (!left[leftIndex])
      return false;
    if (left[leftIndex] === right[rightIndex]) {
      leftIndex++;
      rightIndex++;
      continue;
    }
    if (left[leftIndex].length === 1)
      return false;
    leftIndex++;
  }
  return true;
}, true);
var lookup = factory(function(tag, range) {
  let right = range;
  while (true) {
    if (right === "*" || tag === right)
      return true;
    let index2 = right.lastIndexOf("-");
    if (index2 < 0)
      return false;
    if (right.charAt(index2 - 2) === "-")
      index2 -= 2;
    right = right.slice(0, index2);
  }
}, false);
function cast2(values, name2) {
  const value = values && typeof values === "string" ? [values] : values;
  if (!value || typeof value !== "object" || !("length" in value)) {
    throw new Error(
      "Invalid " + name2 + " `" + value + "`, expected non-empty string"
    );
  }
  return value;
}

// node_modules/nth-check/lib/esm/parse.js
var whitespace2 = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]);
var ZERO = "0".charCodeAt(0);
var NINE = "9".charCodeAt(0);
function parse4(formula) {
  formula = formula.trim().toLowerCase();
  if (formula === "even") {
    return [2, 0];
  } else if (formula === "odd") {
    return [2, 1];
  }
  let idx = 0;
  let a = 0;
  let sign = readSign();
  let number2 = readNumber();
  if (idx < formula.length && formula.charAt(idx) === "n") {
    idx++;
    a = sign * (number2 !== null && number2 !== void 0 ? number2 : 1);
    skipWhitespace();
    if (idx < formula.length) {
      sign = readSign();
      skipWhitespace();
      number2 = readNumber();
    } else {
      sign = number2 = 0;
    }
  }
  if (number2 === null || idx < formula.length) {
    throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
  }
  return [a, sign * number2];
  function readSign() {
    if (formula.charAt(idx) === "-") {
      idx++;
      return -1;
    }
    if (formula.charAt(idx) === "+") {
      idx++;
    }
    return 1;
  }
  function readNumber() {
    const start = idx;
    let value = 0;
    while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
      value = value * 10 + (formula.charCodeAt(idx) - ZERO);
      idx++;
    }
    return idx === start ? null : value;
  }
  function skipWhitespace() {
    while (idx < formula.length && whitespace2.has(formula.charCodeAt(idx))) {
      idx++;
    }
  }
}

// node_modules/nth-check/lib/esm/compile.js
var import_boolbase = __toESM(require_boolbase(), 1);
function compile(parsed) {
  const a = parsed[0];
  const b = parsed[1] - 1;
  if (b < 0 && a <= 0)
    return import_boolbase.default.falseFunc;
  if (a === -1)
    return (index2) => index2 <= b;
  if (a === 0)
    return (index2) => index2 === b;
  if (a === 1)
    return b < 0 ? import_boolbase.default.trueFunc : (index2) => index2 >= b;
  const absA = Math.abs(a);
  const bMod = (b % absA + absA) % absA;
  return a > 1 ? (index2) => index2 >= b && index2 % absA === bMod : (index2) => index2 <= b && index2 % absA === bMod;
}

// node_modules/nth-check/lib/esm/index.js
function nthCheck(formula) {
  return compile(parse4(formula));
}

// node_modules/hast-util-select/lib/pseudo.js
var nthCheck2 = nthCheck.default || nthCheck;
var handle3 = zwitch("name", {
  unknown: unknownPseudo,
  invalid: invalidPseudo,
  handlers: {
    any: matches,
    "any-link": anyLink,
    blank,
    checked,
    dir,
    disabled,
    empty,
    enabled,
    "first-child": firstChild,
    "first-of-type": firstOfType,
    has,
    lang,
    "last-child": lastChild,
    "last-of-type": lastOfType,
    matches,
    not,
    "nth-child": nthChild,
    "nth-last-child": nthLastChild,
    "nth-of-type": nthOfType,
    "nth-last-of-type": nthLastOfType,
    "only-child": onlyChild,
    "only-of-type": onlyOfType,
    optional,
    "read-only": readOnly,
    "read-write": readWrite,
    required,
    root: root3,
    scope
  }
});
pseudo.needsIndex = [
  "any",
  "first-child",
  "first-of-type",
  "last-child",
  "last-of-type",
  "matches",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-of-type",
  "nth-last-of-type",
  "only-child",
  "only-of-type"
];
function pseudo(query, element4, index2, parent, state) {
  const pseudos = query.pseudos;
  let offset = -1;
  while (++offset < pseudos.length) {
    if (!handle3(pseudos[offset], element4, index2, parent, state))
      return false;
  }
  return true;
}
function anyLink(_, element4) {
  return (element4.tagName === "a" || element4.tagName === "area" || element4.tagName === "link") && hasProperty(element4, "href");
}
function blank(_, element4) {
  return !someChildren(element4, check);
  function check(child) {
    return child.type === "element" || child.type === "text" && !whitespace(child);
  }
}
function checked(_, element4) {
  if (element4.tagName === "input" || element4.tagName === "menuitem") {
    return Boolean(
      element4.properties && (element4.properties.type === "checkbox" || element4.properties.type === "radio") && hasProperty(element4, "checked")
    );
  }
  if (element4.tagName === "option") {
    return hasProperty(element4, "selected");
  }
  return false;
}
function dir(query, _1, _2, _3, state) {
  return state.direction === query.value;
}
function disabled(_, element4) {
  return (element4.tagName === "button" || element4.tagName === "input" || element4.tagName === "select" || element4.tagName === "textarea" || element4.tagName === "optgroup" || element4.tagName === "option" || element4.tagName === "menuitem" || element4.tagName === "fieldset") && hasProperty(element4, "disabled");
}
function empty(_, element4) {
  return !someChildren(element4, check);
  function check(child) {
    return child.type === "element" || child.type === "text";
  }
}
function enabled(query, element4) {
  return !disabled(query, element4);
}
function firstChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.elementIndex === 0;
}
function firstOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeIndex === 0;
}
function has(query, element4, _1, _2, state) {
  const childState = {
    ...state,
    // Not found yet.
    found: false,
    // Do walk deep.
    shallow: false,
    // One result is enough.
    one: true,
    scopeElements: [element4],
    results: [],
    rootQuery: queryToSelectors(query.value)
  };
  walk(childState, { type: "root", children: element4.children });
  return childState.results.length > 0;
}
function lang(query, _1, _2, _3, state) {
  return state.language !== "" && state.language !== void 0 && // @ts-expect-error never `selectors`.
  extendedFilter(state.language, parse2(query.value)).length > 0;
}
function lastChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return Boolean(
    state.elementCount && state.elementIndex === state.elementCount - 1
  );
}
function lastOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return typeof state.typeIndex === "number" && typeof state.typeCount === "number" && state.typeIndex === state.typeCount - 1;
}
function matches(query, element4, _, parent, state) {
  const childState = {
    ...state,
    // Not found yet.
    found: false,
    // Do walk deep.
    shallow: false,
    // One result is enough.
    one: true,
    scopeElements: [element4],
    results: [],
    rootQuery: queryToSelectors(query.value)
  };
  walk(childState, element4);
  return childState.results[0] === element4;
}
function not(query, element4, index2, parent, state) {
  return !matches(query, element4, index2, parent, state);
}
function nthChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.elementIndex === "number" && fn(state.elementIndex);
}
function nthLastChild(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return Boolean(
    typeof state.elementCount === "number" && typeof state.elementIndex === "number" && fn(state.elementCount - state.elementIndex - 1)
  );
}
function nthLastOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.typeCount === "number" && typeof state.typeIndex === "number" && fn(state.typeCount - 1 - state.typeIndex);
}
function nthOfType(query, _1, _2, _3, state) {
  const fn = getCachedNthCheck(query);
  assertDeep(state, query);
  return typeof state.typeIndex === "number" && fn(state.typeIndex);
}
function onlyChild(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.elementCount === 1;
}
function onlyOfType(query, _1, _2, _3, state) {
  assertDeep(state, query);
  return state.typeCount === 1;
}
function optional(query, element4) {
  return !required(query, element4);
}
function readOnly(query, element4, index2, parent, state) {
  return !readWrite(query, element4, index2, parent, state);
}
function readWrite(_, element4, _1, _2, state) {
  return element4.tagName === "input" || element4.tagName === "textarea" ? !hasProperty(element4, "readOnly") && !hasProperty(element4, "disabled") : Boolean(state.editableOrEditingHost);
}
function required(_, element4) {
  return (element4.tagName === "input" || element4.tagName === "textarea" || element4.tagName === "select") && hasProperty(element4, "required");
}
function root3(_, element4, _1, parent, state) {
  return Boolean(
    (!parent || parent.type === "root") && state.schema && (state.schema.space === "html" || state.schema.space === "svg") && (element4.tagName === "html" || element4.tagName === "svg")
  );
}
function scope(_, element4, _1, _2, state) {
  return state.scopeElements.includes(element4);
}
function invalidPseudo() {
  throw new Error("Invalid pseudo-selector");
}
function unknownPseudo(query) {
  if (query.name) {
    throw new Error("Unknown pseudo-selector `" + query.name + "`");
  }
  throw new Error("Unexpected pseudo-element or empty pseudo-class");
}
function someChildren(element4, check) {
  const children = element4.children;
  let index2 = -1;
  while (++index2 < children.length) {
    if (check(children[index2]))
      return true;
  }
  return false;
}
function assertDeep(state, query) {
  if (state.shallow) {
    throw new Error("Cannot use `:" + query.name + "` without parent");
  }
}
function getCachedNthCheck(query) {
  let fn = query._cachedFn;
  if (!fn) {
    fn = nthCheck2(query.value);
    query._cachedFn = fn;
  }
  return fn;
}

// node_modules/hast-util-select/lib/test.js
function test(query, element4, index2, parent, state) {
  return Boolean(
    (!query.tagName || name(query, element4)) && (!query.classNames || className(query, element4)) && (!query.id || id(query, element4)) && (!query.attrs || attribute(query, element4, state.schema)) && (!query.pseudos || pseudo(query, element4, index2, parent, state))
  );
}

// node_modules/hast-util-select/lib/walk.js
var empty2 = [];
function queryToSelectors(query) {
  if (query === null) {
    return { type: "selectors", selectors: [] };
  }
  if (query.type === "ruleSet") {
    return { type: "selectors", selectors: [query] };
  }
  return query;
}
function walk(state, tree) {
  if (tree) {
    one5(state, [], tree, void 0, void 0);
  }
}
function one5(state, currentRules, node2, index2, parent) {
  let nestResult = {
    directChild: void 0,
    descendant: void 0,
    adjacentSibling: void 0,
    generalSibling: void 0
  };
  const exit3 = enterState(state, node2);
  if (node2.type === "element") {
    nestResult = applySelectors(
      state,
      // Try the root rules for this element too.
      combine(currentRules, state.rootQuery.selectors),
      node2,
      index2,
      parent
    );
  }
  if ("children" in node2 && !state.shallow && !(state.one && state.found)) {
    all5(state, nestResult, node2);
  }
  exit3();
  return nestResult;
}
function all5(state, nest, node2) {
  const fromParent = combine(nest.descendant, nest.directChild);
  let fromSibling;
  let index2 = -1;
  const total = { count: 0, types: /* @__PURE__ */ new Map() };
  const before = { count: 0, types: /* @__PURE__ */ new Map() };
  while (++index2 < node2.children.length) {
    count(total, node2.children[index2]);
  }
  index2 = -1;
  while (++index2 < node2.children.length) {
    const child = node2.children[index2];
    const name2 = child.type === "element" ? child.tagName.toUpperCase() : void 0;
    state.elementIndex = before.count;
    state.typeIndex = name2 ? before.types.get(name2) || 0 : 0;
    state.elementCount = total.count;
    state.typeCount = name2 ? total.types.get(name2) : 0;
    if ("children" in child) {
      const forSibling = combine(fromParent, fromSibling);
      const nest2 = one5(state, forSibling, node2.children[index2], index2, node2);
      fromSibling = combine(nest2.generalSibling, nest2.adjacentSibling);
    }
    if (state.one && state.found) {
      break;
    }
    count(before, node2.children[index2]);
  }
}
function applySelectors(state, rules, node2, index2, parent) {
  const nestResult = {
    directChild: void 0,
    descendant: void 0,
    adjacentSibling: void 0,
    generalSibling: void 0
  };
  let selectorIndex = -1;
  while (++selectorIndex < rules.length) {
    const ruleSet = rules[selectorIndex];
    if (state.one && state.found) {
      break;
    }
    if (state.shallow && ruleSet.rule.rule) {
      throw new Error("Expected selector without nesting");
    }
    if (test(ruleSet.rule, node2, index2, parent, state)) {
      const nest = ruleSet.rule.rule;
      if (nest) {
        const rule = { type: "ruleSet", rule: nest };
        const label = nest.nestingOperator === "+" ? "adjacentSibling" : nest.nestingOperator === "~" ? "generalSibling" : nest.nestingOperator === ">" ? "directChild" : "descendant";
        add(nestResult, label, rule);
      } else {
        state.found = true;
        if (!state.results.includes(node2)) {
          state.results.push(node2);
        }
      }
    }
    if (ruleSet.rule.nestingOperator === null) {
      add(nestResult, "descendant", ruleSet);
    } else if (ruleSet.rule.nestingOperator === "~") {
      add(nestResult, "generalSibling", ruleSet);
    }
  }
  return nestResult;
}
function combine(left, right) {
  return left && right && left.length > 0 && right.length > 0 ? [...left, ...right] : left && left.length > 0 ? left : right && right.length > 0 ? right : empty2;
}
function add(nest, field, rule) {
  const list3 = nest[field];
  if (list3) {
    list3.push(rule);
  } else {
    nest[field] = [rule];
  }
}
function count(counts, node2) {
  if (node2.type === "element") {
    const name2 = node2.tagName.toUpperCase();
    const count2 = (counts.types.get(name2) || 0) + 1;
    counts.count++;
    counts.types.set(name2, count2);
  }
}

// node_modules/hast-util-select/lib/parse.js
var import_css_selector_parser = __toESM(require_lib(), 1);
var parser = new import_css_selector_parser.CssSelectorParser();
parser.registerAttrEqualityMods("~", "|", "^", "$", "*");
parser.registerSelectorPseudos("any", "matches", "not", "has");
parser.registerNestingOperators(">", "+", "~");
function parse5(selector) {
  if (typeof selector !== "string") {
    throw new TypeError("Expected `string` as selector, not `" + selector + "`");
  }
  return parser.parse(selector);
}

// node_modules/hast-util-select/lib/index.js
function select(selector, tree, space2) {
  const state = createState2(selector, tree, space2);
  state.one = true;
  walk(state, tree || void 0);
  return state.results[0] || null;
}
function createState2(selector, tree, space2) {
  return {
    // State of the query.
    rootQuery: queryToSelectors(parse5(selector)),
    results: [],
    // @ts-expect-error assume elements.
    scopeElements: tree ? tree.type === "root" ? tree.children : [tree] : [],
    one: false,
    shallow: false,
    found: false,
    // State in the tree.
    schema: space2 === "svg" ? svg2 : html3,
    language: void 0,
    direction: "ltr",
    editableOrEditingHost: false,
    typeIndex: void 0,
    elementIndex: void 0,
    typeCount: void 0,
    elementCount: void 0
  };
}

// node_modules/rehype-parse/lib/index.js
var import_parser = __toESM(require_parser(), 1);

// node_modules/vfile-location/index.js
function location(file) {
  var value = String(file);
  var indices = [];
  var search3 = /\r?\n|\r/g;
  while (search3.test(value)) {
    indices.push(search3.lastIndex);
  }
  indices.push(value.length + 1);
  return { toPoint, toOffset };
  function toPoint(offset) {
    var index2 = -1;
    if (offset > -1 && offset < indices[indices.length - 1]) {
      while (++index2 < indices.length) {
        if (indices[index2] > offset) {
          return {
            line: index2 + 1,
            column: offset - (indices[index2 - 1] || 0) + 1,
            offset
          };
        }
      }
    }
    return { line: void 0, column: void 0, offset: void 0 };
  }
  function toOffset(point5) {
    var line = point5 && point5.line;
    var column = point5 && point5.column;
    var offset;
    if (typeof line === "number" && typeof column === "number" && !Number.isNaN(line) && !Number.isNaN(column) && line - 1 in indices) {
      offset = (indices[line - 2] || 0) + column - 1 || 0;
    }
    return offset > -1 && offset < indices[indices.length - 1] ? offset : -1;
  }
}

// node_modules/web-namespaces/index.js
var webNamespaces = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// node_modules/hast-util-from-parse5/lib/index.js
var own12 = {}.hasOwnProperty;
function fromParse5(tree, options) {
  const options_ = options || {};
  let settings;
  let file;
  if (isFile(options_)) {
    file = options_;
    settings = {};
  } else {
    file = options_.file || void 0;
    settings = options_;
  }
  return one6(
    {
      schema: settings.space === "svg" ? svg2 : html3,
      file,
      verbose: settings.verbose,
      location: false
    },
    tree
  );
}
function one6(state, node2) {
  let result;
  switch (node2.nodeName) {
    case "#comment": {
      const reference = (
        /** @type {P5Comment} */
        node2
      );
      result = { type: "comment", value: reference.data };
      patch2(state, reference, result);
      return result;
    }
    case "#document":
    case "#document-fragment": {
      const reference = (
        /** @type {P5Document | P5DocumentFragment} */
        node2
      );
      const quirksMode = "mode" in reference ? reference.mode === "quirks" || reference.mode === "limited-quirks" : false;
      result = {
        type: "root",
        children: all6(state, node2.childNodes),
        data: { quirksMode }
      };
      if (state.file && state.location) {
        const doc = String(state.file);
        const loc = location(doc);
        result.position = { start: loc.toPoint(0), end: loc.toPoint(doc.length) };
      }
      return result;
    }
    case "#documentType": {
      const reference = (
        /** @type {P5DocumentType} */
        node2
      );
      result = { type: "doctype" };
      patch2(state, reference, result);
      return result;
    }
    case "#text": {
      const reference = (
        /** @type {P5Text} */
        node2
      );
      result = { type: "text", value: reference.value };
      patch2(state, reference, result);
      return result;
    }
    default: {
      const reference = (
        /** @type {P5Element} */
        node2
      );
      result = element3(state, reference);
      return result;
    }
  }
}
function all6(state, nodes) {
  let index2 = -1;
  const result = [];
  while (++index2 < nodes.length) {
    result[index2] = one6(state, nodes[index2]);
  }
  return result;
}
function element3(state, node2) {
  const schema = state.schema;
  state.schema = node2.namespaceURI === webNamespaces.svg ? svg2 : html3;
  let index2 = -1;
  const props = {};
  while (++index2 < node2.attrs.length) {
    const attribute2 = node2.attrs[index2];
    props[(attribute2.prefix ? attribute2.prefix + ":" : "") + attribute2.name] = attribute2.value;
  }
  const fn = state.schema.space === "svg" ? s : h;
  const result = fn(node2.tagName, props, all6(state, node2.childNodes));
  patch2(state, node2, result);
  if (result.tagName === "template") {
    const reference = (
      /** @type {P5Template} */
      node2
    );
    const pos = reference.sourceCodeLocation;
    const startTag = pos && pos.startTag && position3(pos.startTag);
    const endTag = pos && pos.endTag && position3(pos.endTag);
    const content3 = one6(state, reference.content);
    if (startTag && endTag && state.file) {
      content3.position = { start: startTag.end, end: endTag.start };
    }
    result.content = content3;
  }
  state.schema = schema;
  return result;
}
function patch2(state, from, to) {
  if ("sourceCodeLocation" in from && from.sourceCodeLocation && state.file) {
    const position4 = createLocation(state, to, from.sourceCodeLocation);
    if (position4) {
      state.location = true;
      to.position = position4;
    }
  }
}
function createLocation(state, node2, location2) {
  const result = position3(location2);
  if (node2.type === "element") {
    const tail = node2.children[node2.children.length - 1];
    if (result && !location2.endTag && tail && tail.position && tail.position.end) {
      result.end = Object.assign({}, tail.position.end);
    }
    if (state.verbose) {
      const props = {};
      let key2;
      if (location2.attrs) {
        for (key2 in location2.attrs) {
          if (own12.call(location2.attrs, key2)) {
            props[find(state.schema, key2).property] = position3(
              location2.attrs[key2]
            );
          }
        }
      }
      node2.data = {
        position: {
          // @ts-expect-error: assume not `undefined`.
          opening: position3(location2.startTag),
          closing: location2.endTag ? position3(location2.endTag) : null,
          properties: props
        }
      };
    }
  }
  return result;
}
function position3(loc) {
  const start = point4({
    line: loc.startLine,
    column: loc.startCol,
    offset: loc.startOffset
  });
  const end = point4({
    line: loc.endLine,
    column: loc.endCol,
    offset: loc.endOffset
  });
  return start || end ? { start, end } : void 0;
}
function point4(point5) {
  return point5.line && point5.column ? point5 : void 0;
}
function isFile(value) {
  return "messages" in value;
}

// node_modules/rehype-parse/lib/errors.js
var errors = {
  abandonedHeadElementChild: {
    reason: "Unexpected metadata element after head",
    description: "Unexpected element after head. Expected the element before `</head>`",
    url: false
  },
  abruptClosingOfEmptyComment: {
    reason: "Unexpected abruptly closed empty comment",
    description: "Unexpected `>` or `->`. Expected `-->` to close comments"
  },
  abruptDoctypePublicIdentifier: {
    reason: "Unexpected abruptly closed public identifier",
    description: "Unexpected `>`. Expected a closing `\"` or `'` after the public identifier"
  },
  abruptDoctypeSystemIdentifier: {
    reason: "Unexpected abruptly closed system identifier",
    description: "Unexpected `>`. Expected a closing `\"` or `'` after the identifier identifier"
  },
  absenceOfDigitsInNumericCharacterReference: {
    reason: "Unexpected non-digit at start of numeric character reference",
    description: "Unexpected `%c`. Expected `[0-9]` for decimal references or `[0-9a-fA-F]` for hexadecimal references"
  },
  cdataInHtmlContent: {
    reason: "Unexpected CDATA section in HTML",
    description: "Unexpected `<![CDATA[` in HTML. Remove it, use a comment, or encode special characters instead"
  },
  characterReferenceOutsideUnicodeRange: {
    reason: "Unexpected too big numeric character reference",
    description: "Unexpectedly high character reference. Expected character references to be at most hexadecimal 10ffff (or decimal 1114111)"
  },
  closingOfElementWithOpenChildElements: {
    reason: "Unexpected closing tag with open child elements",
    description: "Unexpectedly closing tag. Expected other tags to be closed first",
    url: false
  },
  controlCharacterInInputStream: {
    reason: "Unexpected control character",
    description: "Unexpected control character `%x`. Expected a non-control code point, 0x00, or ASCII whitespace"
  },
  controlCharacterReference: {
    reason: "Unexpected control character reference",
    description: "Unexpectedly control character in reference. Expected a non-control code point, 0x00, or ASCII whitespace"
  },
  disallowedContentInNoscriptInHead: {
    reason: "Disallowed content inside `<noscript>` in `<head>`",
    description: "Unexpected text character `%c`. Only use text in `<noscript>`s in `<body>`",
    url: false
  },
  duplicateAttribute: {
    reason: "Unexpected duplicate attribute",
    description: "Unexpectedly double attribute. Expected attributes to occur only once"
  },
  endTagWithAttributes: {
    reason: "Unexpected attribute on closing tag",
    description: "Unexpected attribute. Expected `>` instead"
  },
  endTagWithTrailingSolidus: {
    reason: "Unexpected slash at end of closing tag",
    description: "Unexpected `%c-1`. Expected `>` instead"
  },
  endTagWithoutMatchingOpenElement: {
    reason: "Unexpected unopened end tag",
    description: "Unexpected end tag. Expected no end tag or another end tag",
    url: false
  },
  eofBeforeTagName: {
    reason: "Unexpected end of file",
    description: "Unexpected end of file. Expected tag name instead"
  },
  eofInCdata: {
    reason: "Unexpected end of file in CDATA",
    description: "Unexpected end of file. Expected `]]>` to close the CDATA"
  },
  eofInComment: {
    reason: "Unexpected end of file in comment",
    description: "Unexpected end of file. Expected `-->` to close the comment"
  },
  eofInDoctype: {
    reason: "Unexpected end of file in doctype",
    description: "Unexpected end of file. Expected a valid doctype (such as `<!doctype html>`)"
  },
  eofInElementThatCanContainOnlyText: {
    reason: "Unexpected end of file in element that can only contain text",
    description: "Unexpected end of file. Expected text or a closing tag",
    url: false
  },
  eofInScriptHtmlCommentLikeText: {
    reason: "Unexpected end of file in comment inside script",
    description: "Unexpected end of file. Expected `-->` to close the comment"
  },
  eofInTag: {
    reason: "Unexpected end of file in tag",
    description: "Unexpected end of file. Expected `>` to close the tag"
  },
  incorrectlyClosedComment: {
    reason: "Incorrectly closed comment",
    description: "Unexpected `%c-1`. Expected `-->` to close the comment"
  },
  incorrectlyOpenedComment: {
    reason: "Incorrectly opened comment",
    description: "Unexpected `%c`. Expected `<!--` to open the comment"
  },
  invalidCharacterSequenceAfterDoctypeName: {
    reason: "Invalid sequence after doctype name",
    description: "Unexpected sequence at `%c`. Expected `public` or `system`"
  },
  invalidFirstCharacterOfTagName: {
    reason: "Invalid first character in tag name",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  misplacedDoctype: {
    reason: "Misplaced doctype",
    description: "Unexpected doctype. Expected doctype before head",
    url: false
  },
  misplacedStartTagForHeadElement: {
    reason: "Misplaced `<head>` start tag",
    description: "Unexpected start tag `<head>`. Expected `<head>` directly after doctype",
    url: false
  },
  missingAttributeValue: {
    reason: "Missing attribute value",
    description: "Unexpected `%c-1`. Expected an attribute value or no `%c-1` instead"
  },
  missingDoctype: {
    reason: "Missing doctype before other content",
    description: "Expected a `<!doctype html>` before anything else",
    url: false
  },
  missingDoctypeName: {
    reason: "Missing doctype name",
    description: "Unexpected doctype end at `%c`. Expected `html` instead"
  },
  missingDoctypePublicIdentifier: {
    reason: "Missing public identifier in doctype",
    description: "Unexpected `%c`. Expected identifier for `public` instead"
  },
  missingDoctypeSystemIdentifier: {
    reason: "Missing system identifier in doctype",
    description: 'Unexpected `%c`. Expected identifier for `system` instead (suggested: `"about:legacy-compat"`)'
  },
  missingEndTagName: {
    reason: "Missing name in end tag",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  missingQuoteBeforeDoctypePublicIdentifier: {
    reason: "Missing quote before public identifier in doctype",
    description: "Unexpected `%c`. Expected `\"` or `'` instead"
  },
  missingQuoteBeforeDoctypeSystemIdentifier: {
    reason: "Missing quote before system identifier in doctype",
    description: "Unexpected `%c`. Expected `\"` or `'` instead"
  },
  missingSemicolonAfterCharacterReference: {
    reason: "Missing semicolon after character reference",
    description: "Unexpected `%c`. Expected `;` instead"
  },
  missingWhitespaceAfterDoctypePublicKeyword: {
    reason: "Missing whitespace after public identifier in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  missingWhitespaceAfterDoctypeSystemKeyword: {
    reason: "Missing whitespace after system identifier in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  missingWhitespaceBeforeDoctypeName: {
    reason: "Missing whitespace before doctype name",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  missingWhitespaceBetweenAttributes: {
    reason: "Missing whitespace between attributes",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers: {
    reason: "Missing whitespace between public and system identifiers in doctype",
    description: "Unexpected `%c`. Expected ASCII whitespace instead"
  },
  nestedComment: {
    reason: "Unexpected nested comment",
    description: "Unexpected `<!--`. Expected `-->`"
  },
  nestedNoscriptInHead: {
    reason: "Unexpected nested `<noscript>` in `<head>`",
    description: "Unexpected `<noscript>`. Expected a closing tag or a meta element",
    url: false
  },
  nonConformingDoctype: {
    reason: "Unexpected non-conforming doctype declaration",
    description: 'Expected `<!doctype html>` or `<!doctype html system "about:legacy-compat">`',
    url: false
  },
  nonVoidHtmlElementStartTagWithTrailingSolidus: {
    reason: "Unexpected trailing slash on start tag of non-void element",
    description: "Unexpected `/`. Expected `>` instead"
  },
  noncharacterCharacterReference: {
    reason: "Unexpected noncharacter code point referenced by character reference",
    description: "Unexpected code point. Do not use noncharacters in HTML"
  },
  noncharacterInInputStream: {
    reason: "Unexpected noncharacter character",
    description: "Unexpected code point `%x`. Do not use noncharacters in HTML"
  },
  nullCharacterReference: {
    reason: "Unexpected NULL character referenced by character reference",
    description: "Unexpected code point. Do not use NULL characters in HTML"
  },
  openElementsLeftAfterEof: {
    reason: "Unexpected end of file",
    description: "Unexpected end of file. Expected closing tag instead",
    url: false
  },
  surrogateCharacterReference: {
    reason: "Unexpected surrogate character referenced by character reference",
    description: "Unexpected code point. Do not use lone surrogate characters in HTML"
  },
  surrogateInInputStream: {
    reason: "Unexpected surrogate character",
    description: "Unexpected code point `%x`. Do not use lone surrogate characters in HTML"
  },
  unexpectedCharacterAfterDoctypeSystemIdentifier: {
    reason: "Invalid character after system identifier in doctype",
    description: "Unexpected character at `%c`. Expected `>`"
  },
  unexpectedCharacterInAttributeName: {
    reason: "Unexpected character in attribute name",
    description: "Unexpected `%c`. Expected whitespace, `/`, `>`, `=`, or probably an ASCII letter"
  },
  unexpectedCharacterInUnquotedAttributeValue: {
    reason: "Unexpected character in unquoted attribute value",
    description: "Unexpected `%c`. Quote the attribute value to include it"
  },
  unexpectedEqualsSignBeforeAttributeName: {
    reason: "Unexpected equals sign before attribute name",
    description: "Unexpected `%c`. Add an attribute name before it"
  },
  unexpectedNullCharacter: {
    reason: "Unexpected NULL character",
    description: "Unexpected code point `%x`. Do not use NULL characters in HTML"
  },
  unexpectedQuestionMarkInsteadOfTagName: {
    reason: "Unexpected question mark instead of tag name",
    description: "Unexpected `%c`. Expected an ASCII letter instead"
  },
  unexpectedSolidusInTag: {
    reason: "Unexpected slash in tag",
    description: "Unexpected `%c-1`. Expected it followed by `>` or in a quoted attribute value"
  },
  unknownNamedCharacterReference: {
    reason: "Unexpected unknown named character reference",
    description: "Unexpected character reference. Expected known named character references"
  }
};

// node_modules/rehype-parse/lib/index.js
var base2 = "https://html.spec.whatwg.org/multipage/parsing.html#parse-error-";
var fatalities = { 2: true, 1: false, 0: null };
function rehypeParse(options) {
  const processorSettings = (
    /** @type {Options} */
    this.data("settings")
  );
  const settings = Object.assign({}, processorSettings, options);
  Object.assign(this, { Parser: parser2 });
  function parser2(doc, file) {
    const fn = settings.fragment ? "parseFragment" : "parse";
    const onParseError = settings.emitParseErrors ? onerror : null;
    const parse52 = new import_parser.default({
      sourceCodeLocationInfo: true,
      onParseError,
      scriptingEnabled: false
    });
    return fromParse5(parse52[fn](doc), {
      space: settings.space,
      file,
      verbose: settings.verbose
    });
    function onerror(error) {
      const code3 = error.code;
      const name2 = camelcase2(code3);
      const setting = settings[name2];
      const config = setting === void 0 || setting === null ? true : setting;
      const level = typeof config === "number" ? config : config ? 1 : 0;
      const start = {
        line: error.startLine,
        column: error.startCol,
        offset: error.startOffset
      };
      const end = {
        line: error.endLine,
        column: error.endCol,
        offset: error.endOffset
      };
      if (level) {
        const info = errors[name2] || { reason: "", description: "", url: "" };
        const message = file.message(format(info.reason), { start, end });
        message.source = "parse-error";
        message.ruleId = code3;
        message.fatal = fatalities[level];
        message.note = format(info.description);
        message.url = "url" in info && info.url === false ? null : base2 + code3;
      }
      function format(value) {
        return value.replace(/%c(?:-(\d+))?/g, (_, $1) => {
          const offset = $1 ? -Number.parseInt($1, 10) : 0;
          const char = doc.charAt(error.startOffset + offset);
          return char === "`" ? "` ` `" : char;
        }).replace(
          /%x/g,
          () => "0x" + doc.charCodeAt(error.startOffset).toString(16).toUpperCase()
        );
      }
    }
  }
}
function camelcase2(value) {
  return value.replace(/-[a-z]/g, ($0) => $0.charAt(1).toUpperCase());
}

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a) {
  return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
}

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

// node_modules/ramda/es/internal/_isArray.js
var isArray_default = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
};

// node_modules/ramda/es/internal/_isString.js
function _isString(x) {
  return Object.prototype.toString.call(x) === "[object String]";
}

// node_modules/ramda/es/internal/_isInteger.js
var isInteger_default = Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
};

// node_modules/ramda/es/nth.js
var nth = /* @__PURE__ */ _curry2(function nth2(offset, list3) {
  var idx = offset < 0 ? list3.length + offset : offset;
  return _isString(list3) ? list3.charAt(idx) : list3[idx];
});
var nth_default = nth;

// node_modules/ramda/es/internal/_toISOString.js
var pad = function pad2(n) {
  return (n < 10 ? "0" : "") + n;
};
var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
  return d.toISOString();
} : function _toISOString3(d) {
  return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};

// node_modules/ramda/es/paths.js
var paths = /* @__PURE__ */ _curry2(function paths2(pathsArray, obj) {
  return pathsArray.map(function(paths3) {
    var val = obj;
    var idx = 0;
    var p2;
    while (idx < paths3.length) {
      if (val == null) {
        return;
      }
      p2 = paths3[idx];
      val = isInteger_default(p2) ? nth_default(p2, val) : val[p2];
      idx += 1;
    }
    return val;
  });
});
var paths_default = paths;

// node_modules/ramda/es/path.js
var path3 = /* @__PURE__ */ _curry2(function path4(pathAr, obj) {
  return paths_default([pathAr], obj)[0];
});
var path_default = path3;

// node_modules/ramda/es/trim.js
var hasProtoTrim = typeof String.prototype.trim === "function";

// src/index.js
var src_default = Object.freeze({
  init: function() {
    return {
      /**
       * @param {any} page
       */
      generateHTML: async (page) => {
        const _src = import_base64_js.default.fromByteArray(pako.deflate(JSON.stringify(page)));
        return await unified().use(remark_parse_default).use(remarkGfm).use(lib_default).use(rehypeDocument, { title: page.title, meta: [{ name: "source", content: _src }] }).use(rehypeStringify).process(page.content).then(String);
      },
      /**
       * @param {string} html
       */
      extractModel: async (html6) => {
        return await unified().use(rehypeParse).use(getSource).use(rehypeStringify).process(html6).then(path_default(["data", "source"])).then(import_base64_js.default.toByteArray).then((a) => pako.inflate(a, { to: "string" })).then(JSON.parse);
      }
    };
  }
});
function getSource() {
  return function(tree, file) {
    const x = select('meta[name="source"]', tree);
    file.data.source = x.properties.content;
  };
}
export {
  src_default as default
};
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/
