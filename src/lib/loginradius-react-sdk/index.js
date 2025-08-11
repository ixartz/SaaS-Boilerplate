import "./index.css";
import { jsx as i, jsxs as f, Fragment as Wn } from "react/jsx-runtime";
import * as o from "react";
import Mn, { createContext as Ta, useState as k, useCallback as ne, useEffect as X, useMemo as be, useContext as qn, useRef as Ce, forwardRef as Ia, useImperativeHandle as Bo, memo as Fo } from "react";
import { flushSync as So } from "react-dom";
var jo = Object.defineProperty, $o = (t, e, n) => e in t ? jo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, Q = (t, e, n) => $o(t, typeof e != "symbol" ? e + "" : e, n);
function Ma(t, e) {
  return function() {
    return t.apply(e, arguments);
  };
}
const { toString: _o } = Object.prototype, { getPrototypeOf: Kn } = Object, cn = /* @__PURE__ */ ((t) => (e) => {
  const n = _o.call(e);
  return t[n] || (t[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), _e = (t) => (t = t.toLowerCase(), (e) => cn(e) === t), dn = (t) => (e) => typeof e === t, { isArray: ft } = Array, Rt = dn("undefined");
function Vo(t) {
  return t !== null && !Rt(t) && t.constructor !== null && !Rt(t.constructor) && Oe(t.constructor.isBuffer) && t.constructor.isBuffer(t);
}
const Na = _e("ArrayBuffer");
function Do(t) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(t) : e = t && t.buffer && Na(t.buffer), e;
}
const Uo = dn("string"), Oe = dn("function"), Oa = dn("number"), un = (t) => t !== null && typeof t == "object", Ho = (t) => t === !0 || t === !1, Xt = (t) => {
  if (cn(t) !== "object")
    return !1;
  const e = Kn(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}, Zo = _e("Date"), Wo = _e("File"), qo = _e("Blob"), Ko = _e("FileList"), zo = (t) => un(t) && Oe(t.pipe), Go = (t) => {
  let e;
  return t && (typeof FormData == "function" && t instanceof FormData || Oe(t.append) && ((e = cn(t)) === "formdata" || // detect form-data instance
  e === "object" && Oe(t.toString) && t.toString() === "[object FormData]"));
}, Jo = _e("URLSearchParams"), [Qo, Xo, Yo, er] = ["ReadableStream", "Request", "Response", "Headers"].map(_e), tr = (t) => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Et(t, e, { allOwnKeys: n = !1 } = {}) {
  if (t === null || typeof t > "u")
    return;
  let a, r;
  if (typeof t != "object" && (t = [t]), ft(t))
    for (a = 0, r = t.length; a < r; a++)
      e.call(null, t[a], a, t);
  else {
    const s = n ? Object.getOwnPropertyNames(t) : Object.keys(t), l = s.length;
    let c;
    for (a = 0; a < l; a++)
      c = s[a], e.call(null, t[c], c, t);
  }
}
function Ba(t, e) {
  e = e.toLowerCase();
  const n = Object.keys(t);
  let a = n.length, r;
  for (; a-- > 0; )
    if (r = n[a], e === r.toLowerCase())
      return r;
  return null;
}
const nt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Fa = (t) => !Rt(t) && t !== nt;
function Nn() {
  const { caseless: t } = Fa(this) && this || {}, e = {}, n = (a, r) => {
    const s = t && Ba(e, r) || r;
    Xt(e[s]) && Xt(a) ? e[s] = Nn(e[s], a) : Xt(a) ? e[s] = Nn({}, a) : ft(a) ? e[s] = a.slice() : e[s] = a;
  };
  for (let a = 0, r = arguments.length; a < r; a++)
    arguments[a] && Et(arguments[a], n);
  return e;
}
const nr = (t, e, n, { allOwnKeys: a } = {}) => (Et(e, (r, s) => {
  n && Oe(r) ? t[s] = Ma(r, n) : t[s] = r;
}, { allOwnKeys: a }), t), ar = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t), or = (t, e, n, a) => {
  t.prototype = Object.create(e.prototype, a), t.prototype.constructor = t, Object.defineProperty(t, "super", {
    value: e.prototype
  }), n && Object.assign(t.prototype, n);
}, rr = (t, e, n, a) => {
  let r, s, l;
  const c = {};
  if (e = e || {}, t == null) return e;
  do {
    for (r = Object.getOwnPropertyNames(t), s = r.length; s-- > 0; )
      l = r[s], (!a || a(l, t, e)) && !c[l] && (e[l] = t[l], c[l] = !0);
    t = n !== !1 && Kn(t);
  } while (t && (!n || n(t, e)) && t !== Object.prototype);
  return e;
}, ir = (t, e, n) => {
  t = String(t), (n === void 0 || n > t.length) && (n = t.length), n -= e.length;
  const a = t.indexOf(e, n);
  return a !== -1 && a === n;
}, sr = (t) => {
  if (!t) return null;
  if (ft(t)) return t;
  let e = t.length;
  if (!Oa(e)) return null;
  const n = new Array(e);
  for (; e-- > 0; )
    n[e] = t[e];
  return n;
}, lr = /* @__PURE__ */ ((t) => (e) => t && e instanceof t)(typeof Uint8Array < "u" && Kn(Uint8Array)), cr = (t, e) => {
  const n = (t && t[Symbol.iterator]).call(t);
  let a;
  for (; (a = n.next()) && !a.done; ) {
    const r = a.value;
    e.call(t, r[0], r[1]);
  }
}, dr = (t, e) => {
  let n;
  const a = [];
  for (; (n = t.exec(e)) !== null; )
    a.push(n);
  return a;
}, ur = _e("HTMLFormElement"), hr = (t) => t.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(e, n, a) {
    return n.toUpperCase() + a;
  }
), ia = (({ hasOwnProperty: t }) => (e, n) => t.call(e, n))(Object.prototype), mr = _e("RegExp"), Sa = (t, e) => {
  const n = Object.getOwnPropertyDescriptors(t), a = {};
  Et(n, (r, s) => {
    let l;
    (l = e(r, s, t)) !== !1 && (a[s] = l || r);
  }), Object.defineProperties(t, a);
}, fr = (t) => {
  Sa(t, (e, n) => {
    if (Oe(t) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const a = t[n];
    if (Oe(a)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, pr = (t, e) => {
  const n = {}, a = (r) => {
    r.forEach((s) => {
      n[s] = !0;
    });
  };
  return ft(t) ? a(t) : a(String(t).split(e)), n;
}, gr = () => {
}, wr = (t, e) => t != null && Number.isFinite(t = +t) ? t : e;
function vr(t) {
  return !!(t && Oe(t.append) && t[Symbol.toStringTag] === "FormData" && t[Symbol.iterator]);
}
const yr = (t) => {
  const e = new Array(10), n = (a, r) => {
    if (un(a)) {
      if (e.indexOf(a) >= 0)
        return;
      if (!("toJSON" in a)) {
        e[r] = a;
        const s = ft(a) ? [] : {};
        return Et(a, (l, c) => {
          const d = n(l, r + 1);
          !Rt(d) && (s[c] = d);
        }), e[r] = void 0, s;
      }
    }
    return a;
  };
  return n(t, 0);
}, kr = _e("AsyncFunction"), Cr = (t) => t && (un(t) || Oe(t)) && Oe(t.then) && Oe(t.catch), ja = ((t, e) => t ? setImmediate : e ? ((n, a) => (nt.addEventListener("message", ({ source: r, data: s }) => {
  r === nt && s === n && a.length && a.shift()();
}, !1), (r) => {
  a.push(r), nt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Oe(nt.postMessage)
), br = typeof queueMicrotask < "u" ? queueMicrotask.bind(nt) : typeof process < "u" && process.nextTick || ja, S = {
  isArray: ft,
  isArrayBuffer: Na,
  isBuffer: Vo,
  isFormData: Go,
  isArrayBufferView: Do,
  isString: Uo,
  isNumber: Oa,
  isBoolean: Ho,
  isObject: un,
  isPlainObject: Xt,
  isReadableStream: Qo,
  isRequest: Xo,
  isResponse: Yo,
  isHeaders: er,
  isUndefined: Rt,
  isDate: Zo,
  isFile: Wo,
  isBlob: qo,
  isRegExp: mr,
  isFunction: Oe,
  isStream: zo,
  isURLSearchParams: Jo,
  isTypedArray: lr,
  isFileList: Ko,
  forEach: Et,
  merge: Nn,
  extend: nr,
  trim: tr,
  stripBOM: ar,
  inherits: or,
  toFlatObject: rr,
  kindOf: cn,
  kindOfTest: _e,
  endsWith: ir,
  toArray: sr,
  forEachEntry: cr,
  matchAll: dr,
  isHTMLForm: ur,
  hasOwnProperty: ia,
  hasOwnProp: ia,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Sa,
  freezeMethods: fr,
  toObjectSet: pr,
  toCamelCase: hr,
  noop: gr,
  toFiniteNumber: wr,
  findKey: Ba,
  global: nt,
  isContextDefined: Fa,
  isSpecCompliantForm: vr,
  toJSONObject: yr,
  isAsyncFn: kr,
  isThenable: Cr,
  setImmediate: ja,
  asap: br
};
function oe(t, e, n, a, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), a && (this.request = a), r && (this.response = r, this.status = r.status ? r.status : null);
}
S.inherits(oe, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: S.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const $a = oe.prototype, _a = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((t) => {
  _a[t] = { value: t };
});
Object.defineProperties(oe, _a);
Object.defineProperty($a, "isAxiosError", { value: !0 });
oe.from = (t, e, n, a, r, s) => {
  const l = Object.create($a);
  return S.toFlatObject(t, l, function(c) {
    return c !== Error.prototype;
  }, (c) => c !== "isAxiosError"), oe.call(l, t.message, e, n, a, r), l.cause = t, l.name = t.name, s && Object.assign(l, s), l;
};
const xr = null;
function On(t) {
  return S.isPlainObject(t) || S.isArray(t);
}
function Va(t) {
  return S.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function sa(t, e, n) {
  return t ? t.concat(e).map(function(a, r) {
    return a = Va(a), !n && r ? "[" + a + "]" : a;
  }).join(n ? "." : "") : e;
}
function Lr(t) {
  return S.isArray(t) && !t.some(On);
}
const Rr = S.toFlatObject(S, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function hn(t, e, n) {
  if (!S.isObject(t))
    throw new TypeError("target must be an object");
  e = e || new FormData(), n = S.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(p, b) {
    return !S.isUndefined(b[p]);
  });
  const a = n.metaTokens, r = n.visitor || h, s = n.dots, l = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && S.isSpecCompliantForm(e);
  if (!S.isFunction(r))
    throw new TypeError("visitor must be a function");
  function d(p) {
    if (p === null) return "";
    if (S.isDate(p))
      return p.toISOString();
    if (!c && S.isBlob(p))
      throw new oe("Blob is not supported. Use a Buffer instead.");
    return S.isArrayBuffer(p) || S.isTypedArray(p) ? c && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function h(p, b, x) {
    let P = p;
    if (p && !x && typeof p == "object") {
      if (S.endsWith(b, "{}"))
        b = a ? b : b.slice(0, -2), p = JSON.stringify(p);
      else if (S.isArray(p) && Lr(p) || (S.isFileList(p) || S.endsWith(b, "[]")) && (P = S.toArray(p)))
        return b = Va(b), P.forEach(function(E, w) {
          !(S.isUndefined(E) || E === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            l === !0 ? sa([b], w, s) : l === null ? b : b + "[]",
            d(E)
          );
        }), !1;
    }
    return On(p) ? !0 : (e.append(sa(x, b, s), d(p)), !1);
  }
  const u = [], m = Object.assign(Rr, {
    defaultVisitor: h,
    convertValue: d,
    isVisitable: On
  });
  function g(p, b) {
    if (!S.isUndefined(p)) {
      if (u.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      u.push(p), S.forEach(p, function(x, P) {
        (!(S.isUndefined(x) || x === null) && r.call(
          e,
          x,
          S.isString(P) ? P.trim() : P,
          b,
          m
        )) === !0 && g(x, b ? b.concat(P) : [P]);
      }), u.pop();
    }
  }
  if (!S.isObject(t))
    throw new TypeError("data must be an object");
  return g(t), e;
}
function la(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function zn(t, e) {
  this._pairs = [], t && hn(t, this, e);
}
const Da = zn.prototype;
Da.append = function(t, e) {
  this._pairs.push([t, e]);
};
Da.toString = function(t) {
  const e = t ? function(n) {
    return t.call(this, n, la);
  } : la;
  return this._pairs.map(function(n) {
    return e(n[0]) + "=" + e(n[1]);
  }, "").join("&");
};
function Ar(t) {
  return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Ua(t, e, n) {
  if (!e)
    return t;
  const a = n && n.encode || Ar;
  S.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let s;
  if (r ? s = r(e, n) : s = S.isURLSearchParams(e) ? e.toString() : new zn(e, n).toString(a), s) {
    const l = t.indexOf("#");
    l !== -1 && (t = t.slice(0, l)), t += (t.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return t;
}
class ca {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, n, a) {
    return this.handlers.push({
      fulfilled: e,
      rejected: n,
      synchronous: a ? a.synchronous : !1,
      runWhen: a ? a.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    S.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const Ha = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Er = typeof URLSearchParams < "u" ? URLSearchParams : zn, Pr = typeof FormData < "u" ? FormData : null, Tr = typeof Blob < "u" ? Blob : null, Ir = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Er,
    FormData: Pr,
    Blob: Tr
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Gn = typeof window < "u" && typeof document < "u", Bn = typeof navigator == "object" && navigator || void 0, Mr = Gn && (!Bn || ["ReactNative", "NativeScript", "NS"].indexOf(Bn.product) < 0), Nr = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Or = Gn && window.location.href || "http://localhost", Br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Gn,
  hasStandardBrowserEnv: Mr,
  hasStandardBrowserWebWorkerEnv: Nr,
  navigator: Bn,
  origin: Or
}, Symbol.toStringTag, { value: "Module" })), Ae = {
  ...Br,
  ...Ir
};
function Fr(t, e) {
  return hn(t, new Ae.classes.URLSearchParams(), Object.assign({
    visitor: function(n, a, r, s) {
      return Ae.isNode && S.isBuffer(n) ? (this.append(a, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Sr(t) {
  return S.matchAll(/\w+|\[(\w*)]/g, t).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function jr(t) {
  const e = {}, n = Object.keys(t);
  let a;
  const r = n.length;
  let s;
  for (a = 0; a < r; a++)
    s = n[a], e[s] = t[s];
  return e;
}
function Za(t) {
  function e(n, a, r, s) {
    let l = n[s++];
    if (l === "__proto__") return !0;
    const c = Number.isFinite(+l), d = s >= n.length;
    return l = !l && S.isArray(r) ? r.length : l, d ? (S.hasOwnProp(r, l) ? r[l] = [r[l], a] : r[l] = a, !c) : ((!r[l] || !S.isObject(r[l])) && (r[l] = []), e(n, a, r[l], s) && S.isArray(r[l]) && (r[l] = jr(r[l])), !c);
  }
  if (S.isFormData(t) && S.isFunction(t.entries)) {
    const n = {};
    return S.forEachEntry(t, (a, r) => {
      e(Sr(a), r, n, 0);
    }), n;
  }
  return null;
}
function $r(t, e, n) {
  if (S.isString(t))
    try {
      return (e || JSON.parse)(t), S.trim(t);
    } catch (a) {
      if (a.name !== "SyntaxError")
        throw a;
    }
  return (n || JSON.stringify)(t);
}
const Pt = {
  transitional: Ha,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, e) {
    const n = e.getContentType() || "", a = n.indexOf("application/json") > -1, r = S.isObject(t);
    if (r && S.isHTMLForm(t) && (t = new FormData(t)), S.isFormData(t))
      return a ? JSON.stringify(Za(t)) : t;
    if (S.isArrayBuffer(t) || S.isBuffer(t) || S.isStream(t) || S.isFile(t) || S.isBlob(t) || S.isReadableStream(t))
      return t;
    if (S.isArrayBufferView(t))
      return t.buffer;
    if (S.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let s;
    if (r) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Fr(t, this.formSerializer).toString();
      if ((s = S.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return hn(
          s ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return r || a ? (e.setContentType("application/json", !1), $r(t)) : t;
  }],
  transformResponse: [function(t) {
    const e = this.transitional || Pt.transitional, n = e && e.forcedJSONParsing, a = this.responseType === "json";
    if (S.isResponse(t) || S.isReadableStream(t))
      return t;
    if (t && S.isString(t) && (n && !this.responseType || a)) {
      const r = !(e && e.silentJSONParsing) && a;
      try {
        return JSON.parse(t);
      } catch (s) {
        if (r)
          throw s.name === "SyntaxError" ? oe.from(s, oe.ERR_BAD_RESPONSE, this, null, this.response) : s;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Ae.classes.FormData,
    Blob: Ae.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
S.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  Pt.headers[t] = {};
});
const _r = S.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), Vr = (t) => {
  const e = {};
  let n, a, r;
  return t && t.split(`
`).forEach(function(s) {
    r = s.indexOf(":"), n = s.substring(0, r).trim().toLowerCase(), a = s.substring(r + 1).trim(), !(!n || e[n] && _r[n]) && (n === "set-cookie" ? e[n] ? e[n].push(a) : e[n] = [a] : e[n] = e[n] ? e[n] + ", " + a : a);
  }), e;
}, da = Symbol("internals");
function wt(t) {
  return t && String(t).trim().toLowerCase();
}
function Yt(t) {
  return t === !1 || t == null ? t : S.isArray(t) ? t.map(Yt) : String(t);
}
function Dr(t) {
  const e = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; a = n.exec(t); )
    e[a[1]] = a[2];
  return e;
}
const Ur = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function yn(t, e, n, a, r) {
  if (S.isFunction(a))
    return a.call(this, e, n);
  if (r && (e = n), !!S.isString(e)) {
    if (S.isString(a))
      return e.indexOf(a) !== -1;
    if (S.isRegExp(a))
      return a.test(e);
  }
}
function Hr(t) {
  return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, n, a) => n.toUpperCase() + a);
}
function Zr(t, e) {
  const n = S.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(t, a + n, {
      value: function(r, s, l) {
        return this[a].call(this, e, r, s, l);
      },
      configurable: !0
    });
  });
}
let Ie = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, e, n) {
    const a = this;
    function r(l, c, d) {
      const h = wt(c);
      if (!h)
        throw new Error("header name must be a non-empty string");
      const u = S.findKey(a, h);
      (!u || a[u] === void 0 || d === !0 || d === void 0 && a[u] !== !1) && (a[u || c] = Yt(l));
    }
    const s = (l, c) => S.forEach(l, (d, h) => r(d, h, c));
    if (S.isPlainObject(t) || t instanceof this.constructor)
      s(t, e);
    else if (S.isString(t) && (t = t.trim()) && !Ur(t))
      s(Vr(t), e);
    else if (S.isHeaders(t))
      for (const [l, c] of t.entries())
        r(c, l, n);
    else
      t != null && r(e, t, n);
    return this;
  }
  get(t, e) {
    if (t = wt(t), t) {
      const n = S.findKey(this, t);
      if (n) {
        const a = this[n];
        if (!e)
          return a;
        if (e === !0)
          return Dr(a);
        if (S.isFunction(e))
          return e.call(this, a, n);
        if (S.isRegExp(e))
          return e.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, e) {
    if (t = wt(t), t) {
      const n = S.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!e || yn(this, this[n], n, e)));
    }
    return !1;
  }
  delete(t, e) {
    const n = this;
    let a = !1;
    function r(s) {
      if (s = wt(s), s) {
        const l = S.findKey(n, s);
        l && (!e || yn(n, n[l], l, e)) && (delete n[l], a = !0);
      }
    }
    return S.isArray(t) ? t.forEach(r) : r(t), a;
  }
  clear(t) {
    const e = Object.keys(this);
    let n = e.length, a = !1;
    for (; n--; ) {
      const r = e[n];
      (!t || yn(this, this[r], r, t, !0)) && (delete this[r], a = !0);
    }
    return a;
  }
  normalize(t) {
    const e = this, n = {};
    return S.forEach(this, (a, r) => {
      const s = S.findKey(n, r);
      if (s) {
        e[s] = Yt(a), delete e[r];
        return;
      }
      const l = t ? Hr(r) : String(r).trim();
      l !== r && delete e[r], e[l] = Yt(a), n[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const e = /* @__PURE__ */ Object.create(null);
    return S.forEach(this, (n, a) => {
      n != null && n !== !1 && (e[a] = t && S.isArray(n) ? n.join(", ") : n);
    }), e;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, e]) => t + ": " + e).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...e) {
    const n = new this(t);
    return e.forEach((a) => n.set(a)), n;
  }
  static accessor(t) {
    const e = (this[da] = this[da] = {
      accessors: {}
    }).accessors, n = this.prototype;
    function a(r) {
      const s = wt(r);
      e[s] || (Zr(n, r), e[s] = !0);
    }
    return S.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
Ie.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
S.reduceDescriptors(Ie.prototype, ({ value: t }, e) => {
  let n = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(a) {
      this[n] = a;
    }
  };
});
S.freezeMethods(Ie);
function kn(t, e) {
  const n = this || Pt, a = e || n, r = Ie.from(a.headers);
  let s = a.data;
  return S.forEach(t, function(l) {
    s = l.call(n, s, r.normalize(), e ? e.status : void 0);
  }), r.normalize(), s;
}
function Wa(t) {
  return !!(t && t.__CANCEL__);
}
function pt(t, e, n) {
  oe.call(this, t ?? "canceled", oe.ERR_CANCELED, e, n), this.name = "CanceledError";
}
S.inherits(pt, oe, {
  __CANCEL__: !0
});
function qa(t, e, n) {
  const a = n.config.validateStatus;
  !n.status || !a || a(n.status) ? t(n) : e(new oe(
    "Request failed with status code " + n.status,
    [oe.ERR_BAD_REQUEST, oe.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Wr(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return e && e[1] || "";
}
function qr(t, e) {
  t = t || 10;
  const n = new Array(t), a = new Array(t);
  let r = 0, s = 0, l;
  return e = e !== void 0 ? e : 1e3, function(c) {
    const d = Date.now(), h = a[s];
    l || (l = d), n[r] = c, a[r] = d;
    let u = s, m = 0;
    for (; u !== r; )
      m += n[u++], u = u % t;
    if (r = (r + 1) % t, r === s && (s = (s + 1) % t), d - l < e)
      return;
    const g = h && d - h;
    return g ? Math.round(m * 1e3 / g) : void 0;
  };
}
function Kr(t, e) {
  let n = 0, a = 1e3 / e, r, s;
  const l = (c, d = Date.now()) => {
    n = d, r = null, s && (clearTimeout(s), s = null), t.apply(null, c);
  };
  return [(...c) => {
    const d = Date.now(), h = d - n;
    h >= a ? l(c, d) : (r = c, s || (s = setTimeout(() => {
      s = null, l(r);
    }, a - h)));
  }, () => r && l(r)];
}
const on = (t, e, n = 3) => {
  let a = 0;
  const r = qr(50, 250);
  return Kr((s) => {
    const l = s.loaded, c = s.lengthComputable ? s.total : void 0, d = l - a, h = r(d), u = l <= c;
    a = l;
    const m = {
      loaded: l,
      total: c,
      progress: c ? l / c : void 0,
      bytes: d,
      rate: h || void 0,
      estimated: h && c && u ? (c - l) / h : void 0,
      event: s,
      lengthComputable: c != null,
      [e ? "download" : "upload"]: !0
    };
    t(m);
  }, n);
}, ua = (t, e) => {
  const n = t != null;
  return [(a) => e[0]({
    lengthComputable: n,
    total: t,
    loaded: a
  }), e[1]];
}, ha = (t) => (...e) => S.asap(() => t(...e)), zr = Ae.hasStandardBrowserEnv ? /* @__PURE__ */ ((t, e) => (n) => (n = new URL(n, Ae.origin), t.protocol === n.protocol && t.host === n.host && (e || t.port === n.port)))(
  new URL(Ae.origin),
  Ae.navigator && /(msie|trident)/i.test(Ae.navigator.userAgent)
) : () => !0, Gr = Ae.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(t, e, n, a, r, s) {
      const l = [t + "=" + encodeURIComponent(e)];
      S.isNumber(n) && l.push("expires=" + new Date(n).toGMTString()), S.isString(a) && l.push("path=" + a), S.isString(r) && l.push("domain=" + r), s === !0 && l.push("secure"), document.cookie = l.join("; ");
    },
    read(t) {
      const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
      return e ? decodeURIComponent(e[3]) : null;
    },
    remove(t) {
      this.write(t, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Jr(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function Qr(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Ka(t, e, n) {
  let a = !Jr(e);
  return t && a || n == !1 ? Qr(t, e) : e;
}
const ma = (t) => t instanceof Ie ? { ...t } : t;
function rt(t, e) {
  e = e || {};
  const n = {};
  function a(h, u, m, g) {
    return S.isPlainObject(h) && S.isPlainObject(u) ? S.merge.call({ caseless: g }, h, u) : S.isPlainObject(u) ? S.merge({}, u) : S.isArray(u) ? u.slice() : u;
  }
  function r(h, u, m, g) {
    if (S.isUndefined(u)) {
      if (!S.isUndefined(h))
        return a(void 0, h, m, g);
    } else return a(h, u, m, g);
  }
  function s(h, u) {
    if (!S.isUndefined(u))
      return a(void 0, u);
  }
  function l(h, u) {
    if (S.isUndefined(u)) {
      if (!S.isUndefined(h))
        return a(void 0, h);
    } else return a(void 0, u);
  }
  function c(h, u, m) {
    if (m in e)
      return a(h, u);
    if (m in t)
      return a(void 0, h);
  }
  const d = {
    url: s,
    method: s,
    data: s,
    baseURL: l,
    transformRequest: l,
    transformResponse: l,
    paramsSerializer: l,
    timeout: l,
    timeoutMessage: l,
    withCredentials: l,
    withXSRFToken: l,
    adapter: l,
    responseType: l,
    xsrfCookieName: l,
    xsrfHeaderName: l,
    onUploadProgress: l,
    onDownloadProgress: l,
    decompress: l,
    maxContentLength: l,
    maxBodyLength: l,
    beforeRedirect: l,
    transport: l,
    httpAgent: l,
    httpsAgent: l,
    cancelToken: l,
    socketPath: l,
    responseEncoding: l,
    validateStatus: c,
    headers: (h, u, m) => r(ma(h), ma(u), m, !0)
  };
  return S.forEach(Object.keys(Object.assign({}, t, e)), function(h) {
    const u = d[h] || r, m = u(t[h], e[h], h);
    S.isUndefined(m) && u !== c || (n[h] = m);
  }), n;
}
const za = (t) => {
  const e = rt({}, t);
  let { data: n, withXSRFToken: a, xsrfHeaderName: r, xsrfCookieName: s, headers: l, auth: c } = e;
  e.headers = l = Ie.from(l), e.url = Ua(Ka(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), c && l.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let d;
  if (S.isFormData(n)) {
    if (Ae.hasStandardBrowserEnv || Ae.hasStandardBrowserWebWorkerEnv)
      l.setContentType(void 0);
    else if ((d = l.getContentType()) !== !1) {
      const [h, ...u] = d ? d.split(";").map((m) => m.trim()).filter(Boolean) : [];
      l.setContentType([h || "multipart/form-data", ...u].join("; "));
    }
  }
  if (Ae.hasStandardBrowserEnv && (a && S.isFunction(a) && (a = a(e)), a || a !== !1 && zr(e.url))) {
    const h = r && s && Gr.read(s);
    h && l.set(r, h);
  }
  return e;
}, Xr = typeof XMLHttpRequest < "u", Yr = Xr && function(t) {
  return new Promise(function(e, n) {
    const a = za(t);
    let r = a.data;
    const s = Ie.from(a.headers).normalize();
    let { responseType: l, onUploadProgress: c, onDownloadProgress: d } = a, h, u, m, g, p;
    function b() {
      g && g(), p && p(), a.cancelToken && a.cancelToken.unsubscribe(h), a.signal && a.signal.removeEventListener("abort", h);
    }
    let x = new XMLHttpRequest();
    x.open(a.method.toUpperCase(), a.url, !0), x.timeout = a.timeout;
    function P() {
      if (!x)
        return;
      const w = Ie.from(
        "getAllResponseHeaders" in x && x.getAllResponseHeaders()
      ), R = {
        data: !l || l === "text" || l === "json" ? x.responseText : x.response,
        status: x.status,
        statusText: x.statusText,
        headers: w,
        config: t,
        request: x
      };
      qa(function(v) {
        e(v), b();
      }, function(v) {
        n(v), b();
      }, R), x = null;
    }
    "onloadend" in x ? x.onloadend = P : x.onreadystatechange = function() {
      !x || x.readyState !== 4 || x.status === 0 && !(x.responseURL && x.responseURL.indexOf("file:") === 0) || setTimeout(P);
    }, x.onabort = function() {
      x && (n(new oe("Request aborted", oe.ECONNABORTED, t, x)), x = null);
    }, x.onerror = function() {
      n(new oe("Network Error", oe.ERR_NETWORK, t, x)), x = null;
    }, x.ontimeout = function() {
      let w = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
      const R = a.transitional || Ha;
      a.timeoutErrorMessage && (w = a.timeoutErrorMessage), n(new oe(
        w,
        R.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED,
        t,
        x
      )), x = null;
    }, r === void 0 && s.setContentType(null), "setRequestHeader" in x && S.forEach(s.toJSON(), function(w, R) {
      x.setRequestHeader(R, w);
    }), S.isUndefined(a.withCredentials) || (x.withCredentials = !!a.withCredentials), l && l !== "json" && (x.responseType = a.responseType), d && ([m, p] = on(d, !0), x.addEventListener("progress", m)), c && x.upload && ([u, g] = on(c), x.upload.addEventListener("progress", u), x.upload.addEventListener("loadend", g)), (a.cancelToken || a.signal) && (h = (w) => {
      x && (n(!w || w.type ? new pt(null, t, x) : w), x.abort(), x = null);
    }, a.cancelToken && a.cancelToken.subscribe(h), a.signal && (a.signal.aborted ? h() : a.signal.addEventListener("abort", h)));
    const E = Wr(a.url);
    if (E && Ae.protocols.indexOf(E) === -1) {
      n(new oe("Unsupported protocol " + E + ":", oe.ERR_BAD_REQUEST, t));
      return;
    }
    x.send(r || null);
  });
}, ei = (t, e) => {
  const { length: n } = t = t ? t.filter(Boolean) : [];
  if (e || n) {
    let a = new AbortController(), r;
    const s = function(h) {
      if (!r) {
        r = !0, c();
        const u = h instanceof Error ? h : this.reason;
        a.abort(u instanceof oe ? u : new pt(u instanceof Error ? u.message : u));
      }
    };
    let l = e && setTimeout(() => {
      l = null, s(new oe(`timeout ${e} of ms exceeded`, oe.ETIMEDOUT));
    }, e);
    const c = () => {
      t && (l && clearTimeout(l), l = null, t.forEach((h) => {
        h.unsubscribe ? h.unsubscribe(s) : h.removeEventListener("abort", s);
      }), t = null);
    };
    t.forEach((h) => h.addEventListener("abort", s));
    const { signal: d } = a;
    return d.unsubscribe = () => S.asap(c), d;
  }
}, ti = function* (t, e) {
  let n = t.byteLength;
  if (n < e) {
    yield t;
    return;
  }
  let a = 0, r;
  for (; a < n; )
    r = a + e, yield t.slice(a, r), a = r;
}, ni = async function* (t, e) {
  for await (const n of ai(t))
    yield* ti(n, e);
}, ai = async function* (t) {
  if (t[Symbol.asyncIterator]) {
    yield* t;
    return;
  }
  const e = t.getReader();
  try {
    for (; ; ) {
      const { done: n, value: a } = await e.read();
      if (n)
        break;
      yield a;
    }
  } finally {
    await e.cancel();
  }
}, fa = (t, e, n, a) => {
  const r = ni(t, e);
  let s = 0, l, c = (d) => {
    l || (l = !0, a && a(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: h, value: u } = await r.next();
        if (h) {
          c(), d.close();
          return;
        }
        let m = u.byteLength;
        if (n) {
          let g = s += m;
          n(g);
        }
        d.enqueue(new Uint8Array(u));
      } catch (h) {
        throw c(h), h;
      }
    },
    cancel(d) {
      return c(d), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, mn = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ga = mn && typeof ReadableStream == "function", oi = mn && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((t) => (e) => t.encode(e))(new TextEncoder()) : async (t) => new Uint8Array(await new Response(t).arrayBuffer())), Ja = (t, ...e) => {
  try {
    return !!t(...e);
  } catch {
    return !1;
  }
}, ri = Ga && Ja(() => {
  let t = !1;
  const e = new Request(Ae.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return t = !0, "half";
    }
  }).headers.has("Content-Type");
  return t && !e;
}), pa = 64 * 1024, Fn = Ga && Ja(() => S.isReadableStream(new Response("").body)), rn = {
  stream: Fn && ((t) => t.body)
};
mn && ((t) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e) => {
    !rn[e] && (rn[e] = S.isFunction(t[e]) ? (n) => n[e]() : (n, a) => {
      throw new oe(`Response type '${e}' is not supported`, oe.ERR_NOT_SUPPORT, a);
    });
  });
})(new Response());
const ii = async (t) => {
  if (t == null)
    return 0;
  if (S.isBlob(t))
    return t.size;
  if (S.isSpecCompliantForm(t))
    return (await new Request(Ae.origin, {
      method: "POST",
      body: t
    }).arrayBuffer()).byteLength;
  if (S.isArrayBufferView(t) || S.isArrayBuffer(t))
    return t.byteLength;
  if (S.isURLSearchParams(t) && (t = t + ""), S.isString(t))
    return (await oi(t)).byteLength;
}, si = async (t, e) => S.toFiniteNumber(t.getContentLength()) ?? ii(e), li = mn && (async (t) => {
  let {
    url: e,
    method: n,
    data: a,
    signal: r,
    cancelToken: s,
    timeout: l,
    onDownloadProgress: c,
    onUploadProgress: d,
    responseType: h,
    headers: u,
    withCredentials: m = "same-origin",
    fetchOptions: g
  } = za(t);
  h = h ? (h + "").toLowerCase() : "text";
  let p = ei([r, s && s.toAbortSignal()], l), b;
  const x = p && p.unsubscribe && (() => {
    p.unsubscribe();
  });
  let P;
  try {
    if (d && ri && n !== "get" && n !== "head" && (P = await si(u, a)) !== 0) {
      let O = new Request(e, {
        method: "POST",
        body: a,
        duplex: "half"
      }), L;
      if (S.isFormData(a) && (L = O.headers.get("content-type")) && u.setContentType(L), O.body) {
        const [A, C] = ua(
          P,
          on(ha(d))
        );
        a = fa(O.body, pa, A, C);
      }
    }
    S.isString(m) || (m = m ? "include" : "omit");
    const E = "credentials" in Request.prototype;
    b = new Request(e, {
      ...g,
      signal: p,
      method: n.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: a,
      duplex: "half",
      credentials: E ? m : void 0
    });
    let w = await fetch(b);
    const R = Fn && (h === "stream" || h === "response");
    if (Fn && (c || R && x)) {
      const O = {};
      ["status", "statusText", "headers"].forEach((y) => {
        O[y] = w[y];
      });
      const L = S.toFiniteNumber(w.headers.get("content-length")), [A, C] = c && ua(
        L,
        on(ha(c), !0)
      ) || [];
      w = new Response(
        fa(w.body, pa, A, () => {
          C && C(), x && x();
        }),
        O
      );
    }
    h = h || "text";
    let v = await rn[S.findKey(rn, h) || "text"](w, t);
    return !R && x && x(), await new Promise((O, L) => {
      qa(O, L, {
        data: v,
        headers: Ie.from(w.headers),
        status: w.status,
        statusText: w.statusText,
        config: t,
        request: b
      });
    });
  } catch (E) {
    throw x && x(), E && E.name === "TypeError" && /fetch/i.test(E.message) ? Object.assign(
      new oe("Network Error", oe.ERR_NETWORK, t, b),
      {
        cause: E.cause || E
      }
    ) : oe.from(E, E && E.code, t, b);
  }
}), Sn = {
  http: xr,
  xhr: Yr,
  fetch: li
};
S.forEach(Sn, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {
    }
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const ga = (t) => `- ${t}`, ci = (t) => S.isFunction(t) || t === null || t === !1, Qa = {
  getAdapter: (t) => {
    t = S.isArray(t) ? t : [t];
    const { length: e } = t;
    let n, a;
    const r = {};
    for (let s = 0; s < e; s++) {
      n = t[s];
      let l;
      if (a = n, !ci(n) && (a = Sn[(l = String(n)).toLowerCase()], a === void 0))
        throw new oe(`Unknown adapter '${l}'`);
      if (a)
        break;
      r[l || "#" + s] = a;
    }
    if (!a) {
      const s = Object.entries(r).map(
        ([c, d]) => `adapter ${c} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let l = e ? s.length > 1 ? `since :
` + s.map(ga).join(`
`) : " " + ga(s[0]) : "as no adapter specified";
      throw new oe(
        "There is no suitable adapter to dispatch the request " + l,
        "ERR_NOT_SUPPORT"
      );
    }
    return a;
  },
  adapters: Sn
};
function Cn(t) {
  if (t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)
    throw new pt(null, t);
}
function wa(t) {
  return Cn(t), t.headers = Ie.from(t.headers), t.data = kn.call(
    t,
    t.transformRequest
  ), ["post", "put", "patch"].indexOf(t.method) !== -1 && t.headers.setContentType("application/x-www-form-urlencoded", !1), Qa.getAdapter(t.adapter || Pt.adapter)(t).then(function(e) {
    return Cn(t), e.data = kn.call(
      t,
      t.transformResponse,
      e
    ), e.headers = Ie.from(e.headers), e;
  }, function(e) {
    return Wa(e) || (Cn(t), e && e.response && (e.response.data = kn.call(
      t,
      t.transformResponse,
      e.response
    ), e.response.headers = Ie.from(e.response.headers))), Promise.reject(e);
  });
}
const Xa = "1.8.3", fn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
  fn[t] = function(n) {
    return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
  };
});
const va = {};
fn.transitional = function(t, e, n) {
  function a(r, s) {
    return "[Axios v" + Xa + "] Transitional option '" + r + "'" + s + (n ? ". " + n : "");
  }
  return (r, s, l) => {
    if (t === !1)
      throw new oe(
        a(s, " has been removed" + (e ? " in " + e : "")),
        oe.ERR_DEPRECATED
      );
    return e && !va[s] && (va[s] = !0, console.warn(
      a(
        s,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(r, s, l) : !0;
  };
};
fn.spelling = function(t) {
  return (e, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function di(t, e, n) {
  if (typeof t != "object")
    throw new oe("options must be an object", oe.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(t);
  let r = a.length;
  for (; r-- > 0; ) {
    const s = a[r], l = e[s];
    if (l) {
      const c = t[s], d = c === void 0 || l(c, s, t);
      if (d !== !0)
        throw new oe("option " + s + " must be " + d, oe.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new oe("Unknown option " + s, oe.ERR_BAD_OPTION);
  }
}
const en = {
  assertOptions: di,
  validators: fn
}, Ze = en.validators;
let at = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new ca(),
      response: new ca()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, e) {
    try {
      return await this._request(t, e);
    } catch (n) {
      if (n instanceof Error) {
        let a = {};
        Error.captureStackTrace ? Error.captureStackTrace(a) : a = new Error();
        const r = a.stack ? a.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack ? r && !String(n.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (n.stack += `
` + r) : n.stack = r;
        } catch {
        }
      }
      throw n;
    }
  }
  _request(t, e) {
    typeof t == "string" ? (e = e || {}, e.url = t) : e = t || {}, e = rt(this.defaults, e);
    const { transitional: n, paramsSerializer: a, headers: r } = e;
    n !== void 0 && en.assertOptions(n, {
      silentJSONParsing: Ze.transitional(Ze.boolean),
      forcedJSONParsing: Ze.transitional(Ze.boolean),
      clarifyTimeoutError: Ze.transitional(Ze.boolean)
    }, !1), a != null && (S.isFunction(a) ? e.paramsSerializer = {
      serialize: a
    } : en.assertOptions(a, {
      encode: Ze.function,
      serialize: Ze.function
    }, !0)), e.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? e.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : e.allowAbsoluteUrls = !0), en.assertOptions(e, {
      baseUrl: Ze.spelling("baseURL"),
      withXsrfToken: Ze.spelling("withXSRFToken")
    }, !0), e.method = (e.method || this.defaults.method || "get").toLowerCase();
    let s = r && S.merge(
      r.common,
      r[e.method]
    );
    r && S.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete r[p];
      }
    ), e.headers = Ie.concat(s, r);
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function(p) {
      typeof p.runWhen == "function" && p.runWhen(e) === !1 || (c = c && p.synchronous, l.unshift(p.fulfilled, p.rejected));
    });
    const d = [];
    this.interceptors.response.forEach(function(p) {
      d.push(p.fulfilled, p.rejected);
    });
    let h, u = 0, m;
    if (!c) {
      const p = [wa.bind(this), void 0];
      for (p.unshift.apply(p, l), p.push.apply(p, d), m = p.length, h = Promise.resolve(e); u < m; )
        h = h.then(p[u++], p[u++]);
      return h;
    }
    m = l.length;
    let g = e;
    for (u = 0; u < m; ) {
      const p = l[u++], b = l[u++];
      try {
        g = p(g);
      } catch (x) {
        b.call(this, x);
        break;
      }
    }
    try {
      h = wa.call(this, g);
    } catch (p) {
      return Promise.reject(p);
    }
    for (u = 0, m = d.length; u < m; )
      h = h.then(d[u++], d[u++]);
    return h;
  }
  getUri(t) {
    t = rt(this.defaults, t);
    const e = Ka(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Ua(e, t.params, t.paramsSerializer);
  }
};
S.forEach(["delete", "get", "head", "options"], function(t) {
  at.prototype[t] = function(e, n) {
    return this.request(rt(n || {}, {
      method: t,
      url: e,
      data: (n || {}).data
    }));
  };
});
S.forEach(["post", "put", "patch"], function(t) {
  function e(n) {
    return function(a, r, s) {
      return this.request(rt(s || {}, {
        method: t,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: a,
        data: r
      }));
    };
  }
  at.prototype[t] = e(), at.prototype[t + "Form"] = e(!0);
});
let ui = class Ya {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(r) {
      n = r;
    });
    const a = this;
    this.promise.then((r) => {
      if (!a._listeners) return;
      let s = a._listeners.length;
      for (; s-- > 0; )
        a._listeners[s](r);
      a._listeners = null;
    }), this.promise.then = (r) => {
      let s;
      const l = new Promise((c) => {
        a.subscribe(c), s = c;
      }).then(r);
      return l.cancel = function() {
        a.unsubscribe(s);
      }, l;
    }, e(function(r, s, l) {
      a.reason || (a.reason = new pt(r, s, l), n(a.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(e);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), n = (a) => {
      e.abort(a);
    };
    return this.subscribe(n), e.signal.unsubscribe = () => this.unsubscribe(n), e.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new Ya(function(n) {
        e = n;
      }),
      cancel: e
    };
  }
};
function hi(t) {
  return function(e) {
    return t.apply(null, e);
  };
}
function mi(t) {
  return S.isObject(t) && t.isAxiosError === !0;
}
const jn = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(jn).forEach(([t, e]) => {
  jn[e] = t;
});
function eo(t) {
  const e = new at(t), n = Ma(at.prototype.request, e);
  return S.extend(n, at.prototype, e, { allOwnKeys: !0 }), S.extend(n, e, null, { allOwnKeys: !0 }), n.create = function(a) {
    return eo(rt(t, a));
  }, n;
}
const we = eo(Pt);
we.Axios = at;
we.CanceledError = pt;
we.CancelToken = ui;
we.isCancel = Wa;
we.VERSION = Xa;
we.toFormData = hn;
we.AxiosError = oe;
we.Cancel = we.CanceledError;
we.all = function(t) {
  return Promise.all(t);
};
we.spread = hi;
we.isAxiosError = mi;
we.mergeConfig = rt;
we.AxiosHeaders = Ie;
we.formToJSON = (t) => Za(S.isHTMLForm(t) ? new FormData(t) : t);
we.getAdapter = Qa.getAdapter;
we.HttpStatusCode = jn;
we.default = we;
const {
  Axios: vf,
  AxiosError: yf,
  CanceledError: kf,
  isCancel: Cf,
  CancelToken: bf,
  VERSION: xf,
  all: Lf,
  Cancel: Rf,
  isAxiosError: Af,
  spread: Ef,
  toFormData: Pf,
  AxiosHeaders: Tf,
  HttpStatusCode: If,
  formToJSON: Mf,
  getAdapter: Nf,
  mergeConfig: Of
} = we, fe = {
  idPrefix: "loginradius-",
  classPrefix: "loginradius-",
  apiDomain: "@@API_DOMAIN",
  hubDomain: "@@HUB_DOMAIN",
  cloudApiDomain: "@@CLOUD_HOST",
  configApiDomain: "@@CONFIG_HOST",
  socialApiDomain: "@@SOCIAL_HOST",
  externalLibrary: "@@EXTERNAL_LIB",
  isRegFormSchemaLock: !1,
  isSecurityFormSchemaLock: !1,
  innerHTML: !1,
  autoFilledFieldforPasswordLesLogin: !1,
  socialRegFormId: "",
  lrResponseCounter: 0,
  LRPhoneNo: "",
  lrCounterJwtResponse: "",
  lrCounterTokenResponse: "",
  storedTokenName: "LRTokenKey",
  sessionTokenName: "lr-session-token",
  storedTwoFAToken: "lr2fatok",
  storedSessionTokenData: "lrSessionTokenObj",
  storedOTPAuth: "lrotpauthver",
  storedGAAuth: "lrgaauthver",
  storedEmailOTPAuth: "lremailotpauthver",
  storedPushNotificationAuth: "lrpushnotificationauthver",
  storedSQAuth: "lrsqauthver",
  storedUidName: "lr-user-uid",
  storedDuoAuth: "lrduoauthver",
  storedPasskeyAuth: "lrpasskeyauthver",
  tokenCookie: "lr-user--token",
  fedSessCookie: "lr_fed_sess",
  storedOrganization: "lrorganization",
  isSSOInitFired: !1,
  pingCount: 1,
  _uuidFormat: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  loginURLs: [
    "/auth/login",
    "/auth/email",
    "/auth/onetouchlogin",
    "/auth/password"
  ],
  captchaActions: [
    "login",
    "passwordlesslogin",
    "onetouchlogin",
    "verifyotp",
    "verifyemail",
    "resetpassword",
    "forgotpassword",
    "changepassword",
    "login##otp",
    "otp",
    "twofaotp",
    "twofaemailotp"
  ]
}, H = {
  login: "login",
  registration: "registration",
  passwordlessloginEmailText: "passwordlessloginEmailText",
  passwordlessloginText: "passwordlessloginText",
  passkeyregister: "passkeyregister",
  passkeylogin: "passkeylogin",
  back: "back",
  resend: "resend",
  skip: "skip",
  switch: "switch",
  smsOtp: "sms-otp",
  verify: "verify",
  authenticatorlogin: "authenticator-login",
  authenticatorSetup: "authenticator-setup",
  updatephone: "updatephone",
  forgotpassword: "forgotpassword",
  footerlink: "footerlink",
  changepassword: "changepassword",
  resendemailverification: "resendemailverification",
  profileeditor: "profile",
  resendotp: "resendotp",
  resendemailotp: "resendemailotp",
  resendvoiceotp: "resendvoiceotp",
  backupcode: "backupcode",
  privacypolicyupdate: "privacypolicyupdate",
  consenteditor: "consenteditor"
}, D = {
  otpResendSuccess: "OTP resent successfully.",
  otpResendError: "Failed to resend OTP.",
  phoneUpdateError: "Phone update failed.",
  otpResendUnexpectedError: "An unexpected error occurred while resending OTP",
  magicLinkSuccess: "Magic link sent successfully.",
  magicLinkError: "Failed to send magic link.",
  emailResendSuccess: "Verification email resent successfully.",
  emailResendError: "Failed to resend verification email.",
  passwordResetSuccess: "Password reset successfully.",
  passwordResetError: "Failed to reset password.",
  emailVerificationSuccess: "Email verified successfully.",
  emailVerificationError: "Failed to verify email.",
  otpVerificationError: "Failed to verify OTP. Please try again.",
  ForgotPasswordError: "Failed to send reset password email",
  otpVerificationSuccess: "OTP verified successfully.",
  phoneVerificationSuccess: "Phone number verified successfully.",
  phoneVerificationError: "Failed to verify phone number.",
  loginSuccess: "Login successful.",
  loginError: "Login failed. Please check your credentials.",
  unexpectedError: "An unexpected error occurred",
  requiredAllFieldsError: "Please fill in all required fields correctly.",
  passwordlessInvalidTypeError: "Invalid passwordless login type or missing identifier",
  registrationSuccess: "Registration successful. Please check your email to verify your account.",
  registrationError: "Registration failed. Please try again later.",
  passkeyRegistrationError: "Failed to register passkey. Please try again later.",
  passkeyRegistrationSuccess: "Passkey registered successfully.",
  passkeyLoginError: "Failed to login with passkey. Please try again later.",
  passkeyLoginSuccess: "Logged in successfully with passkey.",
  consentFormError: "Failed to submit consent form. Please try again later.",
  consentFormSuccess: "Consent form submitted successfully.",
  privacyPolicyError: "Failed to accept privacy policy. Please try again later.",
  privacyPolicySuccess: "Privacy policy accepted successfully.",
  backupCodeVerificationSuccess: "Backup code verified successfully.",
  backupCodeVerificationError: "Failed to verify backup code. Please try again later.",
  pinSetSuccess: "PIN set successfully.",
  pinSetError: "Failed to set PIN. Please try again later.",
  pinVerificationSuccess: "PIN verified successfully.",
  pinVerificationError: "Failed to verify PIN. Please try again later.",
  authenticatorLoginSuccess: "Logged in successfully with authenticator app.",
  authenticatorLoginError: "Failed to login with authenticator app. Please try again later.",
  duoVerificationSuccess: "Duo verification successful.",
  duoVerificationError: "Failed to verify with Duo. Please try again later.",
  updatePhoneSuccess: "Phone number updated successfully.",
  updatePhoneError: "Failed to update phone number. Please try again later."
}, ya = [
  {
    name: "Afghanistan",
    dialCode: "+93",
    code: "AF"
  },
  {
    name: "Albania",
    dialCode: "+355",
    code: "AL"
  },
  {
    name: "Algeria",
    dialCode: "+213",
    code: "DZ"
  },
  {
    name: "AmericanSamoa",
    dialCode: "+1684",
    code: "AS"
  },
  {
    name: "Andorra",
    dialCode: "+376",
    code: "AD"
  },
  {
    name: "Angola",
    dialCode: "+244",
    code: "AO"
  },
  {
    name: "Anguilla",
    dialCode: "+1264",
    code: "AI"
  },
  {
    name: "Antigua and Barbuda",
    dialCode: "+1268",
    code: "AG"
  },
  {
    name: "Argentina",
    dialCode: "+54",
    code: "AR"
  },
  {
    name: "Armenia",
    dialCode: "+374",
    code: "AM"
  },
  {
    name: "Aruba",
    dialCode: "+297",
    code: "AW"
  },
  {
    name: "Australia",
    dialCode: "+61",
    code: "AU"
  },
  {
    name: "Austria",
    dialCode: "+43",
    code: "AT"
  },
  {
    name: "Azerbaijan",
    dialCode: "+994",
    code: "AZ"
  },
  {
    name: "Bahamas",
    dialCode: "+1242",
    code: "BS"
  },
  {
    name: "Bahrain",
    dialCode: "+973",
    code: "BH"
  },
  {
    name: "Bangladesh",
    dialCode: "+880",
    code: "BD"
  },
  {
    name: "Barbados",
    dialCode: "+1246",
    code: "BB"
  },
  {
    name: "Belarus",
    dialCode: "+375",
    code: "BY"
  },
  {
    name: "Belgium",
    dialCode: "+32",
    code: "BE"
  },
  {
    name: "Belize",
    dialCode: "+501",
    code: "BZ"
  },
  {
    name: "Benin",
    dialCode: "+229",
    code: "BJ"
  },
  {
    name: "Bermuda",
    dialCode: "+1441",
    code: "BM"
  },
  {
    name: "Bhutan",
    dialCode: "+975",
    code: "BT"
  },
  {
    name: "Bosnia and Herzegovina",
    dialCode: "+387",
    code: "BA"
  },
  {
    name: "Botswana",
    dialCode: "+267",
    code: "BW"
  },
  {
    name: "Brazil",
    dialCode: "+55",
    code: "BR"
  },
  {
    name: "British Indian Ocean Territory",
    dialCode: "+246",
    code: "IO"
  },
  {
    name: "Bulgaria",
    dialCode: "+359",
    code: "BG"
  },
  {
    name: "Burkina Faso",
    dialCode: "+226",
    code: "BF"
  },
  {
    name: "Burundi",
    dialCode: "+257",
    code: "BI"
  },
  {
    name: "Cambodia",
    dialCode: "+855",
    code: "KH"
  },
  {
    name: "Cameroon",
    dialCode: "+237",
    code: "CM"
  },
  {
    name: "Canada/United States",
    dialCode: "+1",
    code: "CA"
  },
  {
    name: "Cape Verde",
    dialCode: "+238",
    code: "CV"
  },
  {
    name: "Cayman Islands",
    dialCode: "+345",
    code: "KY"
  },
  {
    name: "Central African Republic",
    dialCode: "+236",
    code: "CF"
  },
  {
    name: "Chad",
    dialCode: "+235",
    code: "TD"
  },
  {
    name: "Chile",
    dialCode: "+56",
    code: "CL"
  },
  {
    name: "China",
    dialCode: "+86",
    code: "CN"
  },
  {
    name: "Christmas Island",
    dialCode: "+61",
    code: "CX"
  },
  {
    name: "Colombia",
    dialCode: "+57",
    code: "CO"
  },
  {
    name: "Comoros",
    dialCode: "+269",
    code: "KM"
  },
  {
    name: "Congo",
    dialCode: "+242",
    code: "CG"
  },
  {
    name: "Cook Islands",
    dialCode: "+682",
    code: "CK"
  },
  {
    name: "Costa Rica",
    dialCode: "+506",
    code: "CR"
  },
  {
    name: "Croatia",
    dialCode: "+385",
    code: "HR"
  },
  {
    name: "Cuba",
    dialCode: "+53",
    code: "CU"
  },
  {
    name: "Cyprus",
    dialCode: "+537",
    code: "CY"
  },
  {
    name: "Czech Republic",
    dialCode: "+420",
    code: "CZ"
  },
  {
    name: "Denmark",
    dialCode: "+45",
    code: "DK"
  },
  {
    name: "Djibouti",
    dialCode: "+253",
    code: "DJ"
  },
  {
    name: "Dominica",
    dialCode: "+1767",
    code: "DM"
  },
  {
    name: "Dominican Republic",
    dialCode: "+1849",
    code: "DO"
  },
  {
    name: "Ecuador",
    dialCode: "+593",
    code: "EC"
  },
  {
    name: "Egypt",
    dialCode: "+20",
    code: "EG"
  },
  {
    name: "El Salvador",
    dialCode: "+503",
    code: "SV"
  },
  {
    name: "Equatorial Guinea",
    dialCode: "+240",
    code: "GQ"
  },
  {
    name: "Eritrea",
    dialCode: "+291",
    code: "ER"
  },
  {
    name: "Estonia",
    dialCode: "+372",
    code: "EE"
  },
  {
    name: "Ethiopia",
    dialCode: "+251",
    code: "ET"
  },
  {
    name: "Faroe Islands",
    dialCode: "+298",
    code: "FO"
  },
  {
    name: "Fiji",
    dialCode: "+679",
    code: "FJ"
  },
  {
    name: "Finland",
    dialCode: "+358",
    code: "FI"
  },
  {
    name: "France",
    dialCode: "+33",
    code: "FR"
  },
  {
    name: "French Guiana",
    dialCode: "+594",
    code: "GF"
  },
  {
    name: "French Polynesia",
    dialCode: "+689",
    code: "PF"
  },
  {
    name: "Gabon",
    dialCode: "+241",
    code: "GA"
  },
  {
    name: "Gambia",
    dialCode: "+220",
    code: "GM"
  },
  {
    name: "Georgia",
    dialCode: "+995",
    code: "GE"
  },
  {
    name: "Germany",
    dialCode: "+49",
    code: "DE"
  },
  {
    name: "Ghana",
    dialCode: "+233",
    code: "GH"
  },
  {
    name: "Gibraltar",
    dialCode: "+350",
    code: "GI"
  },
  {
    name: "Greece",
    dialCode: "+30",
    code: "GR"
  },
  {
    name: "Greenland",
    dialCode: "+299",
    code: "GL"
  },
  {
    name: "Grenada",
    dialCode: "+1473",
    code: "GD"
  },
  {
    name: "Guadeloupe",
    dialCode: "+590",
    code: "GP"
  },
  {
    name: "Guam",
    dialCode: "+1671",
    code: "GU"
  },
  {
    name: "Guatemala",
    dialCode: "+502",
    code: "GT"
  },
  {
    name: "Guinea",
    dialCode: "+224",
    code: "GN"
  },
  {
    name: "Guinea-Bissau",
    dialCode: "+245",
    code: "GW"
  },
  {
    name: "Guyana",
    dialCode: "+595",
    code: "GY"
  },
  {
    name: "Haiti",
    dialCode: "+509",
    code: "HT"
  },
  {
    name: "Honduras",
    dialCode: "+504",
    code: "HN"
  },
  {
    name: "Hungary",
    dialCode: "+36",
    code: "HU"
  },
  {
    name: "Iceland",
    dialCode: "+354",
    code: "IS"
  },
  {
    name: "India",
    dialCode: "+91",
    code: "IN"
  },
  {
    name: "Indonesia",
    dialCode: "+62",
    code: "ID"
  },
  {
    name: "Iraq",
    dialCode: "+964",
    code: "IQ"
  },
  {
    name: "Ireland",
    dialCode: "+353",
    code: "IE"
  },
  {
    name: "Israel",
    dialCode: "+972",
    code: "IL"
  },
  {
    name: "Italy",
    dialCode: "+39",
    code: "IT"
  },
  {
    name: "Jamaica",
    dialCode: "+1876",
    code: "JM"
  },
  {
    name: "Japan",
    dialCode: "+81",
    code: "JP"
  },
  {
    name: "Jordan",
    dialCode: "+962",
    code: "JO"
  },
  {
    name: "Kazakhstan",
    dialCode: "+77",
    code: "KZ"
  },
  {
    name: "Kenya",
    dialCode: "+254",
    code: "KE"
  },
  {
    name: "Kiribati",
    dialCode: "+686",
    code: "KI"
  },
  {
    name: "Kuwait",
    dialCode: "+965",
    code: "KW"
  },
  {
    name: "Kyrgyzstan",
    dialCode: "+996",
    code: "KG"
  },
  {
    name: "Latvia",
    dialCode: "+371",
    code: "LV"
  },
  {
    name: "Lebanon",
    dialCode: "+961",
    code: "LB"
  },
  {
    name: "Lesotho",
    dialCode: "+266",
    code: "LS"
  },
  {
    name: "Liberia",
    dialCode: "+231",
    code: "LR"
  },
  {
    name: "Liechtenstein",
    dialCode: "+423",
    code: "LI"
  },
  {
    name: "Lithuania",
    dialCode: "+370",
    code: "LT"
  },
  {
    name: "Luxembourg",
    dialCode: "+352",
    code: "LU"
  },
  {
    name: "Madagascar",
    dialCode: "+261",
    code: "MG"
  },
  {
    name: "Malawi",
    dialCode: "+265",
    code: "MW"
  },
  {
    name: "Malaysia",
    dialCode: "+60",
    code: "MY"
  },
  {
    name: "Maldives",
    dialCode: "+960",
    code: "MV"
  },
  {
    name: "Mali",
    dialCode: "+223",
    code: "ML"
  },
  {
    name: "Malta",
    dialCode: "+356",
    code: "MT"
  },
  {
    name: "Marshall Islands",
    dialCode: "+692",
    code: "MH"
  },
  {
    name: "Martinique",
    dialCode: "+596",
    code: "MQ"
  },
  {
    name: "Mauritania",
    dialCode: "+222",
    code: "MR"
  },
  {
    name: "Mauritius",
    dialCode: "+230",
    code: "MU"
  },
  {
    name: "Mayotte",
    dialCode: "+262",
    code: "YT"
  },
  {
    name: "Mexico",
    dialCode: "+52",
    code: "MX"
  },
  {
    name: "Monaco",
    dialCode: "+377",
    code: "MC"
  },
  {
    name: "Mongolia",
    dialCode: "+976",
    code: "MN"
  },
  {
    name: "Montenegro",
    dialCode: "+382",
    code: "ME"
  },
  {
    name: "Montserrat",
    dialCode: "+1664",
    code: "MS"
  },
  {
    name: "Morocco",
    dialCode: "+212",
    code: "MA"
  },
  {
    name: "Myanmar",
    dialCode: "+95",
    code: "MM"
  },
  {
    name: "Namibia",
    dialCode: "+264",
    code: "NA"
  },
  {
    name: "Nauru",
    dialCode: "+674",
    code: "NR"
  },
  {
    name: "Nepal",
    dialCode: "+977",
    code: "NP"
  },
  {
    name: "Netherlands",
    dialCode: "+31",
    code: "NL"
  },
  {
    name: "Netherlands Antilles",
    dialCode: "+599",
    code: "AN"
  },
  {
    name: "New Caledonia",
    dialCode: "+687",
    code: "NC"
  },
  {
    name: "New Zealand",
    dialCode: "+64",
    code: "NZ"
  },
  {
    name: "Nicaragua",
    dialCode: "+505",
    code: "NI"
  },
  {
    name: "Niger",
    dialCode: "+227",
    code: "NE"
  },
  {
    name: "Nigeria",
    dialCode: "+234",
    code: "NG"
  },
  {
    name: "Niue",
    dialCode: "+683",
    code: "NU"
  },
  {
    name: "Norfolk Island",
    dialCode: "+672",
    code: "NF"
  },
  {
    name: "Northern Mariana Islands",
    dialCode: "+1670",
    code: "MP"
  },
  {
    name: "Norway",
    dialCode: "+47",
    code: "NO"
  },
  {
    name: "Oman",
    dialCode: "+968",
    code: "OM"
  },
  {
    name: "Pakistan",
    dialCode: "+92",
    code: "PK"
  },
  {
    name: "Palau",
    dialCode: "+680",
    code: "PW"
  },
  {
    name: "Panama",
    dialCode: "+507",
    code: "PA"
  },
  {
    name: "Papua New Guinea",
    dialCode: "+675",
    code: "PG"
  },
  {
    name: "Paraguay",
    dialCode: "+595",
    code: "PY"
  },
  {
    name: "Peru",
    dialCode: "+51",
    code: "PE"
  },
  {
    name: "Philippines",
    dialCode: "+63",
    code: "PH"
  },
  {
    name: "Poland",
    dialCode: "+48",
    code: "PL"
  },
  {
    name: "Portugal",
    dialCode: "+351",
    code: "PT"
  },
  {
    name: "Puerto Rico",
    dialCode: "+1939",
    code: "PR"
  },
  {
    name: "Qatar",
    dialCode: "+974",
    code: "QA"
  },
  {
    name: "Romania",
    dialCode: "+40",
    code: "RO"
  },
  {
    name: "Rwanda",
    dialCode: "+250",
    code: "RW"
  },
  {
    name: "Samoa",
    dialCode: "+685",
    code: "WS"
  },
  {
    name: "San Marino",
    dialCode: "+378",
    code: "SM"
  },
  {
    name: "Saudi Arabia",
    dialCode: "+966",
    code: "SA"
  },
  {
    name: "Senegal",
    dialCode: "+221",
    code: "SN"
  },
  {
    name: "Serbia",
    dialCode: "+381",
    code: "RS"
  },
  {
    name: "Seychelles",
    dialCode: "+248",
    code: "SC"
  },
  {
    name: "Sierra Leone",
    dialCode: "+232",
    code: "SL"
  },
  {
    name: "Singapore",
    dialCode: "+65",
    code: "SG"
  },
  {
    name: "Slovakia",
    dialCode: "+421",
    code: "SK"
  },
  {
    name: "Slovenia",
    dialCode: "+386",
    code: "SI"
  },
  {
    name: "Solomon Islands",
    dialCode: "+677",
    code: "SB"
  },
  {
    name: "South Africa",
    dialCode: "+27",
    code: "ZA"
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    dialCode: "+500",
    code: "GS"
  },
  {
    name: "Spain",
    dialCode: "+34",
    code: "ES"
  },
  {
    name: "Sri Lanka",
    dialCode: "+94",
    code: "LK"
  },
  {
    name: "Sudan",
    dialCode: "+249",
    code: "SD"
  },
  {
    name: "Suriname",
    dialCode: "+597",
    code: "SR"
  },
  {
    name: "Swaziland",
    dialCode: "+268",
    code: "SZ"
  },
  {
    name: "Sweden",
    dialCode: "+46",
    code: "SE"
  },
  {
    name: "Switzerland",
    dialCode: "+41",
    code: "CH"
  },
  {
    name: "Tajikistan",
    dialCode: "+992",
    code: "TJ"
  },
  {
    name: "Thailand",
    dialCode: "+66",
    code: "TH"
  },
  {
    name: "Togo",
    dialCode: "+228",
    code: "TG"
  },
  {
    name: "Tokelau",
    dialCode: "+690",
    code: "TK"
  },
  {
    name: "Tonga",
    dialCode: "+676",
    code: "TO"
  },
  {
    name: "Trinidad and Tobago",
    dialCode: "+1868",
    code: "TT"
  },
  {
    name: "Tunisia",
    dialCode: "+216",
    code: "TN"
  },
  {
    name: "Turkey",
    dialCode: "+90",
    code: "TR"
  },
  {
    name: "Turkmenistan",
    dialCode: "+993",
    code: "TM"
  },
  {
    name: "Turks and Caicos Islands",
    dialCode: "+1649",
    code: "TC"
  },
  {
    name: "Tuvalu",
    dialCode: "+688",
    code: "TV"
  },
  {
    name: "Uganda",
    dialCode: "+256",
    code: "UG"
  },
  {
    name: "Ukraine",
    dialCode: "+380",
    code: "UA"
  },
  {
    name: "United Arab Emirates",
    dialCode: "+971",
    code: "AE"
  },
  {
    name: "United Kingdom",
    dialCode: "+44",
    code: "GB"
  },
  {
    name: "United States/Canada",
    dialCode: "+1",
    code: "US"
  },
  {
    name: "Uruguay",
    dialCode: "+598",
    code: "UY"
  },
  {
    name: "Uzbekistan",
    dialCode: "+998",
    code: "UZ"
  },
  {
    name: "Vanuatu",
    dialCode: "+678",
    code: "VU"
  },
  {
    name: "Wallis and Futuna",
    dialCode: "+681",
    code: "WF"
  },
  {
    name: "Yemen",
    dialCode: "+967",
    code: "YE"
  },
  {
    name: "Zambia",
    dialCode: "+260",
    code: "ZM"
  },
  {
    name: "Zimbabwe",
    dialCode: "+263",
    code: "ZW"
  },
  {
    name: "land Islands",
    dialCode: "+358",
    code: "AX"
  },
  {
    name: "Antarctica",
    dialCode: "+672",
    code: "AQ"
  },
  {
    name: "Bolivia, Plurinational State of",
    dialCode: "+591",
    code: "BO"
  },
  {
    name: "Brunei Darussalam",
    dialCode: "+673",
    code: "BN"
  },
  {
    name: "Cocos (Keeling) Islands",
    dialCode: "+61",
    code: "CC"
  },
  {
    name: "Congo, The Democratic Republic of the",
    dialCode: "+243",
    code: "CD"
  },
  {
    name: "Cote d'Ivoire",
    dialCode: "+225",
    code: "CI"
  },
  {
    name: "Falkland Islands (Malvinas)",
    dialCode: "+500",
    code: "FK"
  },
  {
    name: "Holy See (Vatican City State)",
    dialCode: "+379",
    code: "VA"
  },
  {
    name: "Hong Kong",
    dialCode: "+852",
    code: "HK"
  },
  {
    name: "Iran, Islamic Republic of",
    dialCode: "+98",
    code: "IR"
  },
  {
    name: "Korea, Democratic People's Republic of",
    dialCode: "+850",
    code: "KP"
  },
  {
    name: "Korea, Republic of",
    dialCode: "+82",
    code: "KR"
  },
  {
    name: "Lao People's Democratic Republic",
    dialCode: "+856",
    code: "LA"
  },
  {
    name: "Libyan Arab Jamahiriya",
    dialCode: "+218",
    code: "LY"
  },
  {
    name: "Macao",
    dialCode: "+853",
    code: "MO"
  },
  {
    name: "Macedonia, The Former Yugoslav Republic of",
    dialCode: "+389",
    code: "MK"
  },
  {
    name: "Micronesia, Federated States of",
    dialCode: "+691",
    code: "FM"
  },
  {
    name: "Moldova, Republic of",
    dialCode: "+373",
    code: "MD"
  },
  {
    name: "Mozambique",
    dialCode: "+258",
    code: "MZ"
  },
  {
    name: "Palestinian Territory, Occupied",
    dialCode: "+970",
    code: "PS"
  },
  {
    name: "Pitcairn",
    dialCode: "+872",
    code: "PN"
  },
  {
    name: "Réunion",
    dialCode: "+262",
    code: "RE"
  },
  {
    name: "Russia",
    dialCode: "+7",
    code: "RU"
  },
  {
    name: "Saint Barthélemy",
    dialCode: "+590",
    code: "BL"
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    dialCode: "+290",
    code: "SH"
  },
  {
    name: "Saint Kitts and Nevis",
    dialCode: "+1869",
    code: "KN"
  },
  {
    name: "Saint Lucia",
    dialCode: "+1758",
    code: "LC"
  },
  {
    name: "Saint Martin",
    dialCode: "+590",
    code: "MF"
  },
  {
    name: "Saint Pierre and Miquelon",
    dialCode: "+508",
    code: "PM"
  },
  {
    name: "Saint Vincent and the Grenadines",
    dialCode: "+1784",
    code: "VC"
  },
  {
    name: "Sao Tome and Principe",
    dialCode: "+239",
    code: "ST"
  },
  {
    name: "Somalia",
    dialCode: "+252",
    code: "SO"
  },
  {
    name: "Svalbard and Jan Mayen",
    dialCode: "+47",
    code: "SJ"
  },
  {
    name: "Syrian Arab Republic",
    dialCode: "+963",
    code: "SY"
  },
  {
    name: "Taiwan, Province of China",
    dialCode: "+886",
    code: "TW"
  },
  {
    name: "Tanzania, United Republic of",
    dialCode: "+255",
    code: "TZ"
  },
  {
    name: "Timor-Leste",
    dialCode: "+670",
    code: "TL"
  },
  {
    name: "Venezuela, Bolivarian Republic of",
    dialCode: "+58",
    code: "VE"
  },
  {
    name: "Viet Nam",
    dialCode: "+84",
    code: "VN"
  },
  {
    name: "Virgin Islands, British",
    dialCode: "+1284",
    code: "VG"
  },
  {
    name: "Virgin Islands, U.S.",
    dialCode: "+1340",
    code: "VI"
  }
], he = {
  EMAIL: "email",
  EMAILID: "emailid",
  IDENTIFIER: "identifier",
  USERNAME: "username",
  EMAIL_OR_PHONE: "emailorphone",
  EMAIL_OR_USERNAME: "emailorusername",
  EMAIL_OR_USERNAME_OR_PHONE: "emailorusernameorphone"
}, ht = {
  recaptcha_v2: {
    scriptUrl: "https://www.google.com/recaptcha/api.js?render=explicit",
    globalVar: "grecaptcha",
    requiresContainer: !0,
    supportsInvisible: !0,
    hasReadyCallback: !0
  },
  recaptcha_v3: {
    scriptUrl: "https://www.google.com/recaptcha/api.js",
    globalVar: "grecaptcha",
    requiresContainer: !1,
    supportsInvisible: !0,
    hasReadyCallback: !0
  },
  hcaptcha: {
    scriptUrl: "https://js.hcaptcha.com/1/api.js",
    globalVar: "hcaptcha",
    requiresContainer: !0,
    supportsInvisible: !0,
    hasReadyCallback: !1
  },
  tencent: {
    scriptUrl: "https://ssl.captcha.qq.com/TCaptcha.js",
    globalVar: "TencentCaptcha",
    requiresContainer: !0,
    supportsInvisible: !1,
    hasReadyCallback: !1
  }
}, Re = {
  tokenValid: {
    message: "Access token is not valid",
    description: "LoginRadius Access Token is invalid, please verify the authentication response",
    errorCode: 905
  },
  twofaTokenValid: {
    message: "Token is not valid",
    description: "Your session is not valid"
  },
  twofaGAAuthDisable: {
    message: "Already Disabled",
    description: "Authenticator App is already disabled"
  },
  twofaOTPAuthDisable: {
    message: "Already Disabled",
    description: "SMS authenticator is already disabled"
  },
  twofaAuthRequired: {
    message: "Cannot Disable",
    description: "Two factor authentication is required, so at least one authenticator should be required"
  },
  invalidEmail: {
    message: "Invalid Email",
    description: "The email entered is not a valid email"
  },
  invalidPhone: {
    message: "Invalid Phone",
    description: "The mobile number entered is not valid"
  },
  disabledAccountLinking: {
    message: "Account Linking disabled",
    description: "Account Linking is disabled in your account"
  },
  noSecurityQuestions: {
    message: "No security questions",
    description: "There are no security questions for this application"
  },
  invalidSott: {
    message: "Invalid SOTT",
    description: "Something went wrong, please try again"
  },
  notValidMessage: {
    message: "Error Message element not valid",
    description: "Error Message element is not valid"
  },
  passwordStrengthMessage: {
    message: "Invalid password strength configuration",
    description: "Password strength meter configuration is not valid"
  },
  otpSent: {
    message: "Verification Code Sent",
    description: "Verification Code Sent Successfully"
  },
  vTokenError: {
    message: "Verification token not found",
    description: "Verification token not found in query string"
  },
  notFound: {
    message: "Data not found",
    description: "Data not found"
  },
  emailNotVerified: {
    message: "The email is not verified",
    description: "The email is not verified, please verify the link in your email",
    errorCode: 970
  },
  phoneNotVerified: {
    message: "Phone number is not verified",
    description: "The provided phone number is not verified, please use a verified phone number for login",
    errorCode: 1066
  },
  blockedUser: {
    message: "User is blocked",
    description: "This user is blocked by site admin",
    errorCode: 991
  },
  unverifiedUser: {
    message: "This Uid has only traditional unverified account",
    description: "This Uid has only traditional unverified account",
    errorCode: 1028
  },
  captchaError: {
    message: "The Captcha is required",
    description: "The Captcha is required"
  }
}, fi = [
  "profile",
  "loginRequiredFieldsUpdate",
  "progressiveProfiling",
  "socialRegistration"
], tn = 6, pi = [4, 5, 6, 7, 8], to = "min_length[6]|max_length[32]|required", ka = `${to}|matches[password]`, bn = "Light", $n = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, _n = /^(\\+)|(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{8,14}$/, Vn = /^[^\s]{3,}$/, G = {
  common: {
    favIcon: "cdn-dev.lrinternal.com/hosted-page/images/favicon.ico",
    showLogo: !0,
    logoUrl: "undefined/assets/image/logo-icon.svg",
    brandColor: "#0078D4",
    background: "#FFFFFF",
    primaryTextColor: "#1a1a1a",
    secondaryTextColor: "#666666",
    fontFamily: "'Inter Tight', sans-serif",
    textAlignment: "center"
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: 380,
    padding: {
      top: 24,
      right: 24,
      bottom: 24,
      left: 24
    },
    border: {
      width: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      },
      radius: {
        topLeft: 16,
        topRight: 16,
        bottomLeft: 16,
        bottomRight: 16
      },
      color: "#EDEDED"
    },
    boxShadow: "0px 6px 16px 0px rgba(0, 0, 0, 0.06), 0px 3px 6px -4px rgba(0, 0, 0, 0.1), 0px 9px 28px 8px rgba(0, 0, 0, 0.03);",
    button: {
      primaryButton: {
        borderColor: "#0078D4",
        boxShadow: "0 2px 8px rgba(0, 120, 212, 0.3)",
        color: "#0078D4",
        textColor: "#FFFFFF",
        borderRadius: 8
      },
      secondaryButton: {
        borderColor: "#0078D4",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        color: "#FFFFFF",
        textColor: "#0078D4",
        borderRadius: 8
      },
      link: {
        textColor: "#0078D4",
        fontWeight: 600
      }
    },
    footer: {
      textColor: "#757575",
      borderTop: "1px solid #E0E0E0",
      backgroundColor: "#F5F5F5"
    },
    input: {
      backgroundColor: "#FFFFFF",
      textColor: "#8b8b8b",
      borderColor: "#dcdfe3"
    },
    social: {
      backgroundColor: "#ffffff",
      showIconOnly: !1,
      borderRadius: 8,
      boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 2px 4px 0px rgba(0, 0, 0, 0.02);",
      layout: "top",
      borderColor: "#dcdfe3",
      textColor: "#374151"
    },
    header: {
      fontSize: 20,
      fontWeight: 600
    },
    subHeader: {
      fontSize: 14,
      fontWeight: 300
    }
  }
}, gi = "username webauthn";
/*! js-cookie v3.0.5 | MIT */
function _t(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e];
    for (var a in n)
      t[a] = n[a];
  }
  return t;
}
var wi = {
  read: function(t) {
    return t[0] === '"' && (t = t.slice(1, -1)), t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(t) {
    return encodeURIComponent(t).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function Dn(t, e) {
  function n(r, s, l) {
    if (!(typeof document > "u")) {
      l = _t({}, e, l), typeof l.expires == "number" && (l.expires = new Date(Date.now() + l.expires * 864e5)), l.expires && (l.expires = l.expires.toUTCString()), r = encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var c = "";
      for (var d in l)
        l[d] && (c += "; " + d, l[d] !== !0 && (c += "=" + l[d].split(";")[0]));
      return document.cookie = r + "=" + t.write(s, r) + c;
    }
  }
  function a(r) {
    if (!(typeof document > "u" || arguments.length && !r)) {
      for (var s = document.cookie ? document.cookie.split("; ") : [], l = {}, c = 0; c < s.length; c++) {
        var d = s[c].split("="), h = d.slice(1).join("=");
        try {
          var u = decodeURIComponent(d[0]);
          if (l[u] = t.read(h, u), r === u)
            break;
        } catch {
        }
      }
      return r ? l[r] : l;
    }
  }
  return Object.create(
    {
      set: n,
      get: a,
      remove: function(r, s) {
        n(
          r,
          "",
          _t({}, s, {
            expires: -1
          })
        );
      },
      withAttributes: function(r) {
        return Dn(this.converter, _t({}, this.attributes, r));
      },
      withConverter: function(r) {
        return Dn(_t({}, this.converter, r), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(e) },
      converter: { value: Object.freeze(t) }
    }
  );
}
var vt = Dn(wi, { path: "/" });
function Ca(t) {
  return "_" + t + "_compat";
}
class vi {
  constructor(e = {}) {
    Q(this, "_options"), this._options = e;
  }
  /**
   * Retrieves an item from cookie storage
   * @param key - The key of the item to retrieve
   * @returns The stored value or undefined
   */
  getItem(e) {
    return vt.get(e) || vt.get(Ca(e));
  }
  /**
   * Removes an item from cookie storage
   * @param key - The key of the item to remove
   */
  removeItem(e) {
    const n = {};
    this._options.cookieDomain && (n.domain = this._options.cookieDomain), vt.remove(e, n), vt.remove(Ca(e), n);
  }
  /**
   * Sets an item in cookie storage
   * @param key - The key of the item to set
   * @param value - The value to store
   * @param options - Optional cookie storage options
   */
  setItem(e, n, a = "") {
    const r = {};
    window.location.protocol === "https:" && (r.secure = !0, r.sameSite = "none"), a && (r.domain = a), vt.set(e, n, r);
  }
}
const sn = {
  organizationFormSchema: [
    {
      type: "string",
      name: "organizationname",
      display: "Organization Name",
      rules: "required",
      permission: "r"
    }
  ],
  lookupFormSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email Id",
      rules: "required|valid_email",
      permission: "r"
    }
  ],
  loginFormSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email Id",
      rules: "required|valid_email",
      permission: "r"
    },
    {
      type: "password",
      name: "password",
      display: "Password",
      rules: "required|min_length[6]|max_length[32]",
      permission: "w"
    }
  ],
  backupCodeFormSchema: [
    {
      type: "string",
      name: "backupcode",
      display: "Backup Code",
      rules: "required",
      permission: "r"
    }
  ],
  resetPasswordByPhoneSchema: [
    {
      type: "string",
      name: "otp",
      display: "Verification Code",
      rules: "required",
      permission: "r"
    },
    {
      type: "password",
      name: "password",
      display: "Password",
      rules: "required|min_length[6]|max_length[32]",
      permission: "w"
    }
  ],
  resetPINByPhoneSchema: [
    {
      type: "string",
      name: "otp",
      display: "Verification Code",
      rules: "required",
      permission: "r"
    },
    {
      type: "password",
      name: "pin",
      display: "PIN",
      rules: "required|min_length[4]|max_length[32]",
      permission: "w"
    }
  ],
  checkPhoneNumberSchema: [
    {
      type: "string",
      name: "phone",
      display: "Phone Number",
      rules: "required|valid_phoneno",
      permission: "r"
    }
  ],
  QRCodeSchema: [
    {
      type: "string",
      name: "AuthenticatorCode",
      display: "Authenticator Code",
      rules: "required",
      permission: "r"
    }
  ],
  getSecQSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email Id",
      rules: "required|valid_email",
      permission: "r"
    }
  ],
  otpSchema: [
    {
      type: "string",
      name: "otp",
      display: "Verification Code",
      rules: "required",
      permission: "r"
    }
  ],
  forgotPasswordFormSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email",
      rules: "required",
      permission: "r"
    }
  ],
  forgotPINFormSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email",
      rules: "required",
      permission: "r"
    }
  ],
  forgotPassKeyFormSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email",
      rules: "required",
      permission: "r"
    }
  ],
  smartLoginSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email Id",
      rules: "required",
      permission: "r"
    }
  ],
  passwordLessLoginSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email",
      rules: "required",
      permission: "r"
    }
  ],
  passwordLessLoginSMSSchema: [
    {
      type: "tel",
      name: "phone",
      display: "Phone Number",
      rules: "required|valid_phoneno",
      permission: "r"
    }
  ],
  passkeyRegistrationSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email Id",
      rules: "required|valid_email",
      permission: "r"
    }
  ],
  changePasswordFormSchema: [
    {
      type: "password",
      name: "oldpassword",
      display: "Old Password",
      rules: "required",
      permission: "w"
    },
    {
      type: "password",
      name: "newpassword",
      display: "Password",
      rules: "required|min_length[6]|max_length[32]",
      permission: "w"
    },
    {
      type: "password",
      name: "confirmnewpassword",
      display: "Confirm Password",
      rules: "required|min_length[6]|max_length[32]|matches[newpassword]",
      permission: "w"
    }
  ],
  emailSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email",
      rules: "required",
      permission: "r"
    }
  ],
  addEmailSchema: [
    {
      type: "string",
      name: "emailid",
      display: "Email",
      rules: "required|valid_email",
      permission: "r"
    },
    {
      type: "string",
      name: "type",
      display: "Type",
      rules: "required",
      permission: "r"
    }
  ],
  changeUsernameFormSchema: [
    {
      type: "string",
      name: "username",
      display: "Username",
      rules: "required",
      permission: "r"
    }
  ],
  changePINFormSchema: [
    {
      type: "password",
      name: "oldpin",
      display: "Old PIN",
      rules: "required",
      permission: "w"
    },
    {
      type: "password",
      name: "newpin",
      display: "PIN",
      rules: "required",
      permission: "w"
    },
    {
      type: "password",
      name: "confirmnewpin",
      display: "Confirm PIN",
      rules: "required|matches[newpin]",
      permission: "w"
    }
  ],
  resetPasswordFormSchema: [
    {
      type: "password",
      name: "password",
      display: "Password",
      rules: "required|min_length[6]|max_length[32]",
      permission: "w"
    },
    {
      type: "password",
      name: "confirmpassword",
      display: "Confirm Password",
      rules: "required|matches[password]|min_length[6]|max_length[32]",
      permission: "w"
    },
    {
      type: "hidden",
      name: "resettoken",
      display: "",
      rules: "required",
      permission: "w",
      value: ""
    }
  ],
  resetPINFormSchema: [
    {
      type: "password",
      name: "pin",
      display: "PIN",
      rules: "required|min_length[4]|max_length[32]",
      permission: "w"
    },
    {
      type: "password",
      name: "confirmpin",
      display: "Confirm PIN",
      rules: "required|matches[pin]|min_length[4]|max_length[32]",
      permission: "w"
    },
    {
      type: "hidden",
      name: "resettoken",
      display: "",
      rules: "required",
      permission: "w",
      value: ""
    }
  ],
  pinLoginFormSchema: [
    {
      type: "password",
      name: "pin",
      display: "PIN",
      rules: "required",
      permission: "r"
    }
  ],
  privacyPolicySchema: [
    {
      type: "multi",
      name: "acceptprivacypolicy",
      display: "I agree to the terms of service",
      rules: "",
      permission: "r"
    }
  ]
}, yi = {
  btnOTPSchema: {
    type: "button",
    name: "click",
    display: "click",
    rules: "",
    permission: "r",
    event: "click",
    eventCallback: () => {
    }
  }
};
function no(t, e) {
  return e && !t.some(
    (n) => n.name === "stayLogin"
  ) && t.push({
    type: "multi",
    name: "stayLogin",
    display: "Remember me",
    rules: "",
    permission: "w"
  }), t;
}
function ki(t, e, n) {
  return e && !t.some(
    (a) => a.name === "acceptprivacypolicy"
  ) && t.push({
    type: "multi",
    name: "acceptprivacypolicy",
    display: "I agree to the terms of service",
    rules: `${n ? "required" : ""}`,
    permission: "r"
  }), t;
}
function Un(t, e, n) {
  return t.find((a) => a[e] === n) || null;
}
function ba(t, e) {
  for (let n = 0; n < e.length; n++)
    if (e[n].includes(t))
      return n;
  return null;
}
function xa(t) {
  return !t || Object.keys(t).length === 0;
}
function Ci(t, e) {
  const n = {};
  for (const a in t)
    Object.prototype.hasOwnProperty.call(t, a) && (n[a] = t[a]);
  for (const a in e)
    Object.prototype.hasOwnProperty.call(e, a) && (n[a] = e[a]);
  return n;
}
const bi = (t, e) => ({
  type: "socialProviders",
  name: `social_${t.toLowerCase()}`,
  display: `Sign in with ${t}`,
  rules: "",
  permission: "r",
  event: "click",
  data: { endpoint: e }
});
function pn(t) {
  var e;
  const { SocialSchema: n } = t;
  return { SocialProviders: (e = n == null ? void 0 : n.Providers) != null && e.length ? n.Providers.filter(
    (a) => a.Name && a.Endpoint
  ).map(
    (a) => bi(a.Name, a.Endpoint)
  ) : [] };
}
function xi(t) {
  var e;
  const n = [];
  if (!t.isPINAuthentication || !t.RegistrationFormSchema)
    return console.warn(
      "PIN authentication is disabled or RegistrationFormSchema is not defined"
    ), n;
  const a = Un(t.RegistrationFormSchema, "name", "pin");
  if (xa(a))
    console.warn("Pin schema is not defined");
  else {
    n.push(a), (e = t.PINConfiguration) != null && e.IsRequired && (!a.rules || !a.rules.includes("required")) && (a.rules = a.rules ? `${a.rules}|required` : "required");
    const r = Un(
      t.RegistrationFormSchema,
      "name",
      "confirmpin"
    );
    xa(r) || n.push(r);
  }
  return n;
}
function Jn(t) {
  const {
    phoneLogin: e = !1,
    usernameLogin: n = !1,
    duplicateEmailWithUniqueUsername: a = !1,
    isPasskeyAutofill: r = !1
  } = t, s = {
    fieldType: e ? "identifier" : "string",
    ...r && { autoComplete: gi }
  };
  return a ? {
    ...s,
    displayText: "Username",
    validationRules: "required",
    fieldName: he.USERNAME
  } : n && e ? {
    ...s,
    displayText: "Email Id/Username",
    validationRules: "required",
    fieldName: he.EMAIL_OR_USERNAME_OR_PHONE
  } : n ? {
    ...s,
    displayText: "Email Id/Username",
    validationRules: "required",
    fieldName: he.EMAIL_OR_USERNAME
  } : e ? {
    ...s,
    displayText: "Email Id",
    validationRules: "required",
    fieldName: he.EMAIL_OR_PHONE
  } : {
    ...s,
    displayText: "Email Id",
    validationRules: "required|valid_email",
    fieldName: he.EMAIL
  };
}
function Li(t) {
  var e;
  const n = pi.includes(
    t.OtpLength ?? tn
  ) ? t.OtpLength ?? tn : tn, a = (e = t.OtpType) == null ? void 0 : e.trim(), r = a || "NUMERIC";
  return {
    Inputs: Array.from({ length: n }, (s, l) => ({
      type: "Otp",
      name: `otp${l + 1}`,
      display: "One-Time Password",
      rules: `required|min_length[1]|max_length[1]|${r}`,
      permission: "r"
    }))
  };
}
function Ri(t) {
  const e = [
    {
      type: "password",
      name: "password",
      display: "Password",
      rules: "required",
      permission: "w"
    }
  ], n = Jn(t);
  e.unshift({
    type: n.fieldType,
    name: n.fieldName,
    display: n.displayText,
    rules: n.validationRules,
    permission: "r",
    ...n.autoComplete && { autoComplete: n.autoComplete }
  });
  const a = no(e, t.stayLogin ?? !1), r = [];
  return t.passwordlessLogin && r.push({
    ...yi.btnOTPSchema,
    name: "emaillink",
    display: "Email me a link to Sign In"
  }), t.isPassKeysEnabled && r.push({
    type: "button",
    name: "passkeys_signin",
    display: "Sign in with Passkeys",
    rules: "",
    permission: "r",
    event: "click"
  }), t.passwordlessLogin && r.push({
    type: "button",
    name: "passwordless_signin",
    display: "Send Verification Code to Sign In",
    rules: "",
    permission: "r",
    event: "click"
  }), {
    Inputs: a,
    Buttons: r,
    SocialProviders: pn(t).SocialProviders
  };
}
const Ai = (t) => {
  const e = Jn(t), n = [
    {
      type: e.fieldType,
      name: e.fieldName,
      display: e.displayText,
      rules: e.validationRules,
      permission: "r"
    }
  ];
  return {
    Inputs: no(n, t.stayLogin ?? !1),
    Buttons: [],
    SocialProviders: pn(t).SocialProviders
  };
};
function Ei(t) {
  const e = Jn(t);
  return {
    Inputs: [
      {
        type: e.fieldType,
        name: e.fieldName,
        display: e.displayText,
        rules: e.validationRules,
        permission: "r"
      }
    ]
  };
}
const xn = (t, e, n = to) => ({
  type: "password",
  name: t,
  display: e,
  rules: n,
  permission: "w"
}), ao = (t) => {
  const e = [
    xn(
      "password",
      "New Password",
      ka
    ),
    xn(
      "confirmpassword",
      "Confirm Password",
      ka
    )
  ];
  return t && e.unshift(
    xn(
      "currentpassword",
      "Current Password",
      "required"
    )
  ), { Inputs: e };
}, Pi = () => ao(!1), Ti = () => ao(!0);
function Ii(t, e) {
  var n;
  const a = JSON.parse(
    JSON.stringify(t.RegistrationFormSchema || [])
  ), r = (n = t.privacyPolicyConfiguration) != null && n.IsEnabled ? {
    ...sn.privacyPolicySchema[0],
    rules: t.privacyPolicyConfiguration.Mode === "Strict" ? "required" : ""
  } : null, s = oo(
    t,
    e,
    "Register"
  );
  return {
    Inputs: r ? [...a, r, ...s] : a,
    Buttons: [],
    SocialProviders: pn(t).SocialProviders
  };
}
const Mi = (t, e, n) => t.isConsentManagementEnabled && Array.isArray(e) ? e.find(
  (a) => {
    var r;
    return (r = a.Events) == null ? void 0 : r.find((s) => s.Name === n);
  }
) : null, oo = (t, e, n) => {
  const a = Mi(t, e, n);
  if (a && a.ConsentForm && a.ConsentForm[0] && a.ConsentForm[0].Consents) {
    const r = a.ConsentForm[0].Consents.map(
      ({ ConsentId: s, Description: l, IsRequired: c, Title: d }) => ({
        type: "consent",
        name: `loginradius_consent_${s}`,
        display: d || "Consent",
        description: l || "",
        rules: c ? "required" : "",
        permission: "r"
      })
    );
    return a.PrivacyPolicy && r.push({
      type: "plain",
      name: "privacy_policy",
      display: "Privacy Policy",
      rules: "",
      value: a.PrivacyPolicy,
      permission: "r"
    }), a.TermOfService && r.push({
      type: "plain",
      name: "term_of_service",
      display: "Terms of Service",
      rules: "",
      value: a.TermOfService,
      permission: "r"
    }), r;
  }
  return [];
}, Ni = (t, e) => {
  var n, a;
  const r = sn.passkeyRegistrationSchema, s = oo(
    t,
    e,
    "Register"
  );
  return {
    Inputs: [
      ...ki(
        r,
        ((n = t.privacyPolicyConfiguration) == null ? void 0 : n.IsEnabled) ?? !1,
        ((a = t.privacyPolicyConfiguration) == null ? void 0 : a.Mode) === "Strict"
      ),
      ...s
    ]
  };
}, Oi = function(t) {
  return new Promise((e, n) => {
    if (t.publicKey.challenge = Lt(t.publicKey.challenge), t.publicKey.user.id = Lt(t.publicKey.user.id), t.publicKey.excludeCredentials)
      for (let a = 0; a < t.publicKey.excludeCredentials.length; a++)
        t.publicKey.excludeCredentials[a].id = Lt(
          t.publicKey.excludeCredentials[a].id
        );
    je && je.abort(), je = new AbortController(), navigator.credentials.create({
      publicKey: t.publicKey,
      signal: je.signal
    }).then(
      (a) => {
        e({
          id: a.id,
          rawId: Ln(a.rawId),
          type: a.type,
          response: {
            attestationObject: Ln(
              a.response.attestationObject
            ),
            clientDataJSON: Ln(a.response.clientDataJSON)
          }
        });
      }
    ).catch((a) => {
      n(a);
    }).finally(() => {
      je = null;
    });
  });
}, Bi = [
  he.EMAIL_OR_USERNAME_OR_PHONE,
  he.EMAIL_OR_PHONE,
  he.EMAILID,
  he.EMAIL,
  he.USERNAME,
  he.EMAIL_OR_USERNAME,
  he.IDENTIFIER
];
function ro(t) {
  const e = Bi.find((a) => a in t);
  if (!e)
    return {
      success: !1,
      error: "No valid identifier key found in payload"
    };
  const n = t[e];
  if (typeof n != "string")
    return {
      success: !1,
      error: `Invalid ${e}: expected string but got ${typeof n}`
    };
  try {
    return {
      success: !0,
      authPayload: Fi(n, e)
    };
  } catch (a) {
    return {
      success: !1,
      error: a instanceof Error ? a.message : "Invalid input provided"
    };
  }
}
function Fi(t, e) {
  let n = {};
  if (/\s/.test(t))
    throw console.warn(
      "Input contains whitespace for key:",
      e,
      "value:",
      t
    ), new Error("Input cannot contain whitespace");
  if (e.toLowerCase().includes("email") && $n.test(t))
    n = { email: t };
  else if (e.toLowerCase().includes("phone") && _n.test(t))
    n = { phone: t };
  else if ((e.toLowerCase().includes(he.USERNAME) || e.toLowerCase().includes(he.EMAIL_OR_USERNAME_OR_PHONE)) && Vn.test(t))
    n = { username: t };
  else if (!$n.test(t) && !_n.test(t) && Vn.test(t))
    n = { username: t };
  else
    throw console.warn(
      "Invalid input provided for key:",
      e,
      "value:",
      t
    ), new Error("Please provide a valid email, phone number, or username");
  return n;
}
let je = null;
const La = function(t, e) {
  return new Promise((n, a) => {
    try {
      je && je.abort(), t.publicKey.challenge = Lt(
        t.publicKey.challenge
      ), t.publicKey.allowCredentials = t.publicKey.allowCredentials || [], t.publicKey.allowCredentials.forEach((s) => {
        s.id = Lt(s.id);
      }), je = new AbortController();
      const r = {
        publicKey: t.publicKey,
        mediation: e ? "conditional" : "optional",
        signal: je.signal
      };
      navigator.credentials.get(r).then((s) => {
        je = null, n(s);
      }).catch((s) => {
        je = null, a(s);
      });
    } catch (r) {
      a(r);
    }
  });
}, Lt = (t) => {
  t = t.replace(/-/g, "+").replace(/_/g, "/");
  const e = t.length % 4;
  if (e) {
    if (e === 1)
      throw new Error(
        "InvalidLengthError: Input base64url string is the wrong length to determine padding"
      );
    t += "=".repeat(4 - e);
  }
  return new Uint8Array(
    atob(t).split("").map((n) => n.charCodeAt(0))
  );
}, Ln = (t) => btoa(String.fromCharCode(...new Uint8Array(t))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""), Si = (t) => t ? t.charAt(0).toUpperCase() + t.slice(1) : "", ji = function(t) {
  return t != null && t.includes("ALPHANUMERICONLYCAPSLETTER") ? {
    regex: /^[A-Z0-9]$/,
    sanitizeRegex: /[^A-Z0-9]/g,
    transform: (e) => e.toUpperCase()
  } : t != null && t.includes("ALPHANUMERICONLYSMALLLETTER") ? {
    regex: /^[a-z0-9]$/,
    sanitizeRegex: /[^a-z0-9]/g,
    transform: (e) => e.toLowerCase()
  } : t != null && t.includes("ALPHANUMERIC") ? {
    regex: /^[a-zA-Z0-9]$/,
    sanitizeRegex: /[^a-zA-Z0-9]/g,
    transform: (e) => e
  } : t != null && t.includes("NUMERIC") ? {
    regex: /^[0-9]$/,
    sanitizeRegex: /[^0-9]/g,
    transform: (e) => e
  } : {
    regex: /^[0-9]$/,
    sanitizeRegex: /[^0-9]/g,
    transform: (e) => e
  };
}, mt = {
  getHashParam: (t) => typeof window < "u" && new URLSearchParams(window.location.hash).get(t) || "",
  encodedString: (t) => encodeURIComponent(t),
  parseQueryString: (t) => Object.fromEntries(new URLSearchParams(t)),
  keyslowerToUpperCamelCase: (t) => Object.fromEntries(
    Object.entries(t).map(([e, n]) => [
      e.charAt(0).toUpperCase() + e.slice(1).toLowerCase(),
      n
    ])
  ),
  validateAndGetAuthPayload: ro,
  getValidationRules: ji
}, Qn = () => {
  const t = navigator.userAgent.toLowerCase();
  return {
    browser: {
      version: (t.match(/.+(?:rv|it|ra|ie)[/: ]([\d.]+)/) || [])[1] || "",
      safari: /webkit/.test(t),
      opera: /opera/.test(t),
      msie: (/msie/.test(t) || /trident/.test(t)) && !/opera/.test(t),
      mozilla: /mozilla/.test(t) && !/(compatible|webkit)/.test(t)
    },
    getHashParam: function(e) {
      let n;
      const a = window.location.hash.match(new RegExp(e + "=([^&]*)"));
      return window.location.hash && a != null ? n = a[1] : n = this.getQueryParameterByName(e), n;
    },
    keysToLowerCase: function(e) {
      let n;
      const a = Object.keys(e);
      let r = a.length;
      const s = {};
      for (; r--; )
        n = a[r], s[n.toLowerCase()] = e[n], typeof s[n.toLowerCase()] == "object" && s[n.toLowerCase()] != null && (s[n.toLowerCase()] = this.keysToLowerCase(
          s[n.toLowerCase()]
        ));
      return s;
    },
    isValidUrl: function(e) {
      return !!/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(e);
    },
    isSubstring: function(e, n) {
      for (const a in n)
        if (n[a].indexOf(e) !== -1)
          return a;
      return !1;
    },
    isJWT: function(e) {
      try {
        const [n] = e.split(".");
        return typeof JSON.parse(atob(n)) == "object";
      } catch {
        return !1;
      }
    },
    isJsonString: function(e) {
      try {
        return JSON.parse(e);
      } catch {
        return !1;
      }
    },
    getQueryParameterByName: function(e, n) {
      n = "&" + (n || location.search), e = e.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      const a = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(n);
      return a == null ? null : decodeURIComponent(a[1].replace(/\+/g, " "));
    },
    getParameterByName: function(e) {
      e = e.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
      const n = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(location.search);
      return n === null ? "" : decodeURIComponent(n[1].replace(/\+/g, " "));
    },
    getQueryStringValue: function(e, n) {
      const a = e || window.location.href, r = new RegExp("[?&]" + n + "=([^&#]*)", "i").exec(a);
      return r ? r[1] : null;
    },
    extend: function(e, n) {
      for (const a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    },
    parseQueryString: function(e) {
      const n = {};
      if ((e || e !== "") && typeof e == "string") {
        const a = e.split("&");
        for (let r = 0; r < a.length; r++) {
          const s = a[r].split("=");
          n[decodeURIComponent(s[0])] = decodeURIComponent(
            s[1]
          );
        }
      }
      return n;
    },
    encodedString: function(e) {
      return e.indexOf("%2B") === -1 && (e = e.replace(/\+/g, "%2B")), e;
    },
    mergeOptions: function(e, n) {
      const a = {};
      for (const r in e)
        a[r] = e[r];
      for (const r in n)
        a[r] = n[r];
      return a;
    },
    mergeObjects: function(e, n, a) {
      const r = [];
      let s;
      for (const l in e) {
        s = !1;
        for (const c in n)
          if (s = a ? n[c] === e[l] : n[c].name === e[l].name, s) break;
        s || r.push(e[l]);
      }
      return r.concat(n);
    },
    isArray: function(e) {
      return Object.prototype.toString.call(e) === "[object Array]";
    },
    randomString: function(e) {
      const n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(
        ""
      );
      e || (e = Math.floor(Math.random() * n.length));
      let a = "";
      for (let r = 0; r < e; r++)
        a += n[Math.floor(Math.random() * n.length)];
      return a;
    },
    findInSchema: function(e, n, a, r) {
      for (let s = 0; s < e.length; s++)
        if ((r ? e[s] && e[s][n].toLowerCase() : e[s] && e[s][n]) === a)
          return e[s];
      return null;
    },
    jsonToQueryString: function(e) {
      return Object.keys(e).map(function(n) {
        return e[n] ? encodeURIComponent(n) + "=" + encodeURIComponent(e[n]) : "";
      }).join("&");
    },
    isEmpty: function(e) {
      for (const n in e)
        if (Object.prototype.hasOwnProperty.call(e, n))
          return !1;
      return !0;
    },
    keyslowerToUpperCamelCase: function(e) {
      let n;
      const a = Object.keys(e);
      let r = a.length;
      const s = {};
      for (; r--; )
        n = a[r], s[n.charAt(0).toUpperCase() + n.substr(1)] = e[n];
      return s;
    },
    isObject: function(e) {
      return e instanceof Object && e.constructor === Object;
    },
    parseString: function(e) {
      if (e === void 0)
        return !1;
      try {
        return JSON.parse(e);
      } catch {
        return !1;
      }
    },
    containsObject: function(e, n, a) {
      if (a) {
        for (let r = 0; r < e.length; r++)
          if (e[r][a] === n[a])
            return !0;
      }
      return !1;
    },
    base64UrlDecode: function(e) {
      e = e.replace(/-/g, "+").replace(/_/g, "/");
      const n = e.length % 4;
      if (n) {
        if (n === 1)
          throw new Error(
            "InvalidLengthError: Input base64url string is the wrong length to determine padding"
          );
        e += new Array(5 - n).join("=");
      }
      return new Uint8Array(
        atob(e).split("").map(function(a) {
          return a.charCodeAt(0);
        })
      );
    },
    base64UrlEncode: function(e) {
      return btoa(String.fromCharCode.apply(null, e)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
  };
};
function At(t) {
  const e = [
    { key: "g-recaptcha-response" },
    { key: "tencent-captcha-response" },
    { key: "h-captcha-response" }
  ], n = (r) => {
    if (typeof t[r] == "string")
      return t[r];
    if (t.captcha && typeof t.captcha[r] == "string")
      return t.captcha[r];
  }, a = e.find(({ key: r }) => n(r));
  return a ? { [a.key]: n(a.key) } : {};
}
function $i(t, e) {
  var n, a;
  if (!e) return !1;
  const r = t.toLowerCase(), s = (n = e.optionalRecaptchaConfiguration) == null ? void 0 : n.IsEnabled, l = ((a = e.optionalRecaptchaConfiguration) == null ? void 0 : a.Apis) || {};
  if (r === "register")
    return !!e.isCaptchaEnabled;
  if (!s) return !1;
  if (fi.includes(r))
    return !!l.PutUpdateProfile;
  switch (r) {
    case "changepassword":
      return !!l.PutChangePassword;
    case "forgotpassword":
      return e.phoneLogin ? !!(l.PostForgotPasswordByPhone || l.PostForgotPasswordByEmail) : !!l.PostForgotPasswordByEmail;
    case "login":
      return _i(e, l);
    case "passwordlesslogin":
      return io(e, l);
    default:
      return !1;
  }
}
function _i(t, e) {
  const { phoneLogin: n, usernameLogin: a } = t, {
    PostLoginByUserNameAndPassword: r,
    PostLoginByEmailAndPassword: s,
    PostLoginByPhoneAndPassword: l
  } = e;
  return a && n ? !!(r || s || l) : n ? !!(s || l) : a ? !!r : !!s;
}
function io(t, e) {
  var n;
  if (!((n = t == null ? void 0 : t.optionalRecaptchaConfiguration) != null && n.IsEnabled)) return !1;
  const { phoneLogin: a, usernameLogin: r } = t || {}, {
    GetPasswordlessLoginByUsername: s,
    GetPasswordlessLoginByEmail: l,
    GetPasswordlessLoginByPhone: c
  } = e || {};
  return r && a ? !!(s || l || c) : a ? !!(l || c) : r ? !!s : !!l;
}
const Ra = (t) => {
  const e = [
    { key: "g-recaptcha-response", param: "g-recaptcha-response" },
    { key: "tencent-captcha-response", param: "tencent-captcha-response" },
    { key: "h-captcha-response", param: "h-captcha-response" }
  ].find((n) => t[n.key]);
  return e ? `${e.param}=${t[e.key]}` : "";
};
function Aa(t) {
  return t === !0 ? Vi() : "en";
}
function Vi() {
  return ((typeof navigator < "u" && navigator.language ? navigator.language : "en") || "en").split("-")[0].toLowerCase();
}
const Di = (t, e, n) => {
  let a = t.get(e);
  a || (a = [], t.set(e, a)), a.push(n);
}, Ui = (t, e, n) => {
  const a = t.get(e);
  a && (n ? a.splice(a.indexOf(n) >>> 0, 1) : t.set(e, []));
}, Hi = (t, e, n) => (t.get(e) || []).map((a) => a(n)), Zi = () => {
  const t = /* @__PURE__ */ new Map();
  return {
    // Subscribe to an event
    register: (...e) => Di(t, ...e),
    call: (e, n) => {
      Hi(t, e, n);
    },
    // Unsubscribe from an event
    unregister: (...e) => Ui(t, ...e)
  };
}, Hn = Zi();
class so {
  constructor(e) {
    Q(this, "options"), Q(this, "api"), Q(this, "util"), Q(this, "cookie"), this.options = e, this.api = we.create({
      baseURL: "https://devapi.lrinternal.com/identity/v2",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }), this.options = e, this.api.interceptors.request.use(
      (n) => this.requestInterceptor(n)
    ), this.util = Qn(), this.cookie = new vi(), this.api.interceptors.response.use(
      (n) => (Hn.call("successCallback", n.data), n),
      (n) => {
        var a, r, s;
        const l = ((a = n.response) == null ? void 0 : a.status) || 0, c = ((s = (r = n.response) == null ? void 0 : r.data) == null ? void 0 : s.Description) || n.message || "An error occurred";
        return Promise.reject(new Wi(l, c));
      }
    );
  }
  // Interceptor to handle request modifications
  requestInterceptor(e) {
    const { action: n } = e;
    let { url: a } = e;
    const r = this.util.getQueryParameterByName("access_token", a);
    r && (a.includes(fe.apiDomain) || a.includes("/ssologin/")) && (a = a.replace(`&access_token=${r}`, "").replace(`?access_token=${r}&`, "?").replace(`?access_token=${r}`, "?"), e.headers.Authorization = `Bearer ${r}`), (a.includes("/ssologin/") || n === "setToken") && (e.withCredentials = !0), !a.includes("cdn") && !a.includes(".json") && (e.headers["X-Requested-With"] = "XMLHttpRequest");
    let s = !1;
    for (const l of fe.loginURLs)
      if (a.includes(l)) {
        s = !0;
        break;
      }
    if (s) {
      const l = this.cookie.getItem(fe.fedSessCookie);
      l && (e.headers["X-Params"] = l);
    }
    return e;
  }
  // SSO Login API call
  async fetchToken() {
    const e = `https://${this.options.customDomain || "dev-auth-ignite.devhub.lrinternal.com".replace("%s", this.options.appName)}/ssologin/login`;
    return this.api.get(e);
  }
  async ssoLogout() {
    const e = `https://${this.options.customDomain || "dev-auth-ignite.devhub.lrinternal.com".replace("%s", this.options.appName)}/ssologin/logout`;
    return this.api.get(e);
  }
  async setSecureCookie(e) {
    return this.api.get(e);
  }
  // Login API call
  async login(e, n) {
    const { invitation_token: a, ...r } = e, s = JSON.stringify(r), l = this.buildTemplate("login");
    let c = this.buildLoginUrl(l);
    if (n) {
      const d = encodeURIComponent(this.options.callbackUrl);
      c += `&duoredirecturi=${d}`;
    }
    return a && (c += `&invitation_token=${a}`), this.api.post(c, s);
  }
  async updateConsent(e, n) {
    const a = JSON.stringify(e), r = `/auth/consent?apiKey=${this.options.apiKey}&consenttoken=${n}`;
    return this.api.post(r, a);
  }
  async acceptPrivacyPolicy(e) {
    const n = `/auth/privacypolicy/accept?apiKey=${this.options.apiKey}&access_token=${e}`;
    return this.api.get(n);
  }
  async emailVerify(e, n) {
    const a = JSON.stringify(e);
    let r = `/auth/email?apiKey=${this.options.apiKey}`;
    if (n) {
      const s = encodeURIComponent(this.options.callbackUrl);
      r += `&duoredirecturi=${s}`;
    }
    return this.api.put(r, a);
  }
  async emailVerifyLink(e, n) {
    let a = `/auth/email?apiKey=${this.options.apiKey}&verificationtoken=${e.verificationToken}`;
    if (n) {
      const r = encodeURIComponent(this.options.callbackUrl);
      a += `&duoredirecturi=${r}`;
    }
    return this.api.get(a);
  }
  async resendEmailVerification(e) {
    const n = JSON.stringify(e), a = this.buildTemplate(), r = `/auth/register?apiKey=${this.options.apiKey}&${a}`;
    return this.api.put(r, n);
  }
  async phoneVerify(e) {
    const { phone: n } = e, a = JSON.stringify({ phone: n }), r = `/auth/phone/otp?apiKey=${this.options.apiKey}&otp=${e.otp}`;
    return this.api.put(r, a);
  }
  async resendPhoneVerify(e, n) {
    const a = JSON.stringify(e);
    let r = `/auth/phone/otp?apiKey=${this.options.apiKey}`;
    return n && (r += `&isvoiceotp=${this.options.isVoiceOtp}`), this.api.post(r, a);
  }
  // Register API call
  async register(e, n) {
    const { invitation_token: a, ...r } = e;
    let s = typeof r == "string" ? r : JSON.stringify(r);
    n && (s = this.mapRegistrationSchema(
      n,
      s
    ));
    const l = this.buildTemplate("register");
    let c = this.buildRegisterUrl(l);
    a && (c += `&invitation_token=${a}`);
    const d = this.options.sott ? { "X-LoginRadius-Sott": decodeURIComponent(this.options.sott) } : {};
    return this.api.post(c, s, { headers: d });
  }
  // Get Account API call
  async getAccount(e) {
    const n = `/auth/account?apiKey=${this.options.apiKey}&access_token=${e}`;
    return this.api.get(n);
  }
  // MFA Email OTP API call
  async mfaEmailOTP(e, n) {
    const a = JSON.stringify(e), r = `/auth/login/2fa/otp/email?apiKey=${this.options.apiKey}&secondfactorauthenticationtoken=${n}`;
    return this.api.post(r, a);
  }
  // MFA Email OTP Verify API call
  async mfaEmailOTPVerify(e, n) {
    const a = JSON.stringify(e), r = `/auth/login/2fa/verification/otp/email?apiKey=${this.options.apiKey}&SecondFactorAuthenticationToken=${n}`;
    return this.api.put(r, a);
  }
  // Account Email OTP API call
  async accountEmailOTP(e, n) {
    const a = `/auth/account/2fa/otp/email?apikey=${this.options.apiKey}&access_token=${n}&EmailID=${e.emailid}`;
    return this.api.get(a);
  }
  // Account Email OTP Verify API call
  async accountEmailOTPVerify(e, n) {
    const a = JSON.stringify(e), r = `/auth/account/2fa/verification/otp/email?apikey=${this.options.apiKey}&access_token=${n}`;
    return this.api.put(r, a);
  }
  // MFA SMS OTP Verify API call
  async mfaSMSOTPVerify(e, n) {
    const a = JSON.stringify(e), r = `/auth/login/2fa/verification/otp?apiKey=${this.options.apiKey}&SecondFactorAuthenticationToken=${n}`;
    return this.api.put(r, a);
  }
  // Account SMS OTP Verify API call
  async accountSMSOTPVerify(e, n) {
    const a = JSON.stringify(e), r = { Authorization: `Bearer ${n}` }, s = `/auth/account/2FA/verification/otp?apikey=${this.options.apiKey}`;
    return this.api.put(s, a, { headers: r });
  }
  // Resend SMS OTP API call
  async resendSMSOTP(e, n) {
    let a = `/auth/login/2FA/resend?apiKey=${this.options.apiKey}&SecondFactorAuthenticationToken=${e}`;
    return n && (a += `&isvoiceotp=${this.options.isVoiceOtp}`), this.api.get(a);
  }
  // Update Phone API call
  async updatePhone(e, n, a) {
    const r = JSON.stringify(e);
    let s = `/auth/login/2fa?apiKey=${this.options.apiKey}&SecondFactorAuthenticationToken=${n}`;
    return a && (s += `&isvoiceotp=${this.options.isVoiceOtp}`), this.api.put(s, r);
  }
  // Update Account Phone API call
  async updateAccountPhone(e, n, a) {
    const r = JSON.stringify(e);
    let s = `/auth/account/2fa?apikey=${this.options.apiKey}`;
    return a && (s += `&isvoiceotp=${this.options.isVoiceOtp}`), this.api.put(s, r, {
      headers: { Authorization: `Bearer ${n}` }
    });
  }
  // MFA Authenticator Code Verify API call
  async mfaAuthenticatorCodeVerify(e, n) {
    const a = JSON.stringify(e), r = `/auth/login/2fa/verification/authenticatorcode?apiKey=${this.options.apiKey}&SecondFactorAuthenticationToken=${n}`;
    return this.api.put(r, a);
  }
  // Account Authenticator Code Verify API call
  async accountAuthenticatorCodeVerify(e, n) {
    const a = JSON.stringify(e), r = { Authorization: `Bearer ${n}` }, s = `/auth/account/2fa/verification/authenticatorcode?apikey=${this.options.apiKey}`;
    return this.api.put(s, a, {
      headers: r
    });
  }
  // Get Second Factor Config API call
  async getSecondFactorConfig(e, n) {
    let a = `/auth/account/2fa?apikey=${this.options.apiKey}`;
    if (n) {
      const r = encodeURIComponent(this.options.callbackUrl);
      a += `&duoredirecturi=${r}`;
    }
    return this.api.get(a, {
      headers: { Authorization: `Bearer ${e}` }
    });
  }
  async verifyBackupCode(e, n) {
    const a = JSON.stringify(e), r = `/auth/login/2FA/verification/BackupCode?apikey=${this.options.apiKey}&secondfactorauthenticationtoken=${n}`;
    return this.api.put(r, a);
  }
  // MFA Push Ping API call
  async mfaPushPing(e) {
    const n = `/auth/login/2fa/push/ping?apiKey=${this.options.apiKey}&secondfactorauthenticationtoken=${e}`;
    return this.api.get(n);
  }
  // MFA Push Resend API call
  async mfaPushResend(e) {
    const n = `/auth/login/2FA/push?apiKey=${this.options.apiKey}&SecondFactorAuthenticationToken=${e}`;
    return this.api.post(n, {});
  }
  // MFA Duo Verify API call
  async mfaDuoVerify(e, n) {
    const a = JSON.stringify(e), r = `/auth/login/2fa/verification/duo?apikey=${this.options.apiKey}&secondfactorauthenticationtoken=${n}`;
    return this.api.put(r, a);
  }
  // Account Duo Verify API call
  async accountDuoVerify(e, n) {
    const a = JSON.stringify(e), r = `/auth/account/2fa/verification/duo?apikey=${this.options.apiKey}&access_token=${n}`;
    return this.api.put(r, a);
  }
  // Set PIN by PIN Auth API call
  async setPinByPinAuth(e, n) {
    const a = JSON.stringify(e), r = `/auth/pin/set/pinauthtoken?apikey=${this.options.apiKey}&pinauthtoken=${n}`;
    return this.api.post(r, a);
  }
  // Login by PIN API call
  async loginByPIN(e, n) {
    const a = JSON.stringify(e), r = `/auth/login/pin?apikey=${this.options.apiKey}&session_token=${n}`;
    return this.api.post(r, a);
  }
  // Update Account API call
  async updateAccount(e, n) {
    const a = JSON.stringify(e), r = `/auth/account?apiKey=${this.options.apiKey}&access_token=${n}`;
    return this.api.put(r, a);
  }
  // Send Reset Password Email API call
  async sendResetPasswordEmail(e) {
    const n = JSON.stringify(e), a = this.options.resetPasswordUrl || (typeof window < "u" ? window.location.origin : ""), r = `/auth/password?apiKey=${this.options.apiKey}&resetpasswordurl=${encodeURIComponent(a)}`;
    return this.api.post(r, n);
  }
  async sendResetPasswordPhoneOTP(e, n) {
    const a = JSON.stringify(e);
    let r = `/auth/password/otp?apikey=${this.options.apiKey}&phone=${e.phone}`;
    return n && (r += `&isvoiceotp=${this.options.isVoiceOtp}`), this.api.post(r, a);
  }
  // Reset Password API call
  async resetPassword(e) {
    const n = JSON.stringify(e), a = `/auth/password/reset?apikey=${this.options.apiKey}`;
    return this.api.put(a, n);
  }
  async resetPasswordPhoneOTP(e) {
    const n = JSON.stringify(e), a = `/auth/password/otp?apikey=${this.options.apiKey}`;
    return this.api.put(a, n);
  }
  // Passwordless Login Email Verify API call
  async passwordlessLoginEmailVerify(e) {
    const n = `/auth/login/passwordlesslogin/email/verify?apikey=${this.options.apiKey}&verificationtoken=${e.verificationToken}`;
    return this.api.get(n);
  }
  // Passwordless Login Email API call
  async passwordlessLoginEmail(e) {
    const n = Ra(e), a = e.email ? `email=${e.email}` : `username=${e.username}`;
    let r = `/auth/login/passwordlesslogin/email?apikey=${this.options.apiKey}&verificationUrl=${this.options.verificationUrl}&${a}&oneClickSignIn=true`;
    return n && (r += `&${n}`), e.invitation_token && (r += `&invitation_token=${e.invitation_token}`), this.api.get(r);
  }
  // Passwordless Login SMS API call
  async passwordlessLoginSMS(e) {
    const n = Ra(e);
    let a = `/auth/login/passwordlesslogin/otp?apikey=${this.options.apiKey}&phone=${e.phone}`;
    return n && (a += `&${n}`), this.api.get(a);
  }
  // Passwordless Login Email OTP Verify API call
  async passwordlessLoginEmailOTPVerify(e) {
    const n = JSON.stringify(e), a = `/auth/login/passwordlesslogin/email/verifyotp?apikey=${this.options.apiKey}`;
    return this.api.post(a, n);
  }
  async passwordlessLoginUsernameOTPVerify(e) {
    const n = JSON.stringify(e), a = `/auth/login/passwordlesslogin/username/verifyotp?apikey=${this.options.apiKey}`;
    return this.api.post(a, n);
  }
  async passwordlessLoginSMSOTPVerify(e) {
    const n = JSON.stringify(e), a = `/auth/login/passwordlesslogin/otp/verify?apikey=${this.options.apiKey}`;
    return this.api.put(a, n);
  }
  async registerPasskeyBegin(e) {
    const n = `/auth/register/passkey/begin?apikey=${this.options.apiKey}&identifier=${e.identifier}&verificationUrl=${this.options.verificationUrl}`;
    return this.api.get(n);
  }
  async registerPasskeyFinish(e) {
    let n;
    this.options.isPINAuthentication && this.options.PINConfiguration.AskOnRegistration ? n = JSON.stringify({
      ...e,
      PinInfo: {
        PIN: "",
        Skipped: !0
      }
    }) : n = JSON.stringify(e);
    const a = `/auth/register/passkey/finish?apikey=${this.options.apiKey}`;
    return this.api.post(a, n);
  }
  async loginPasskeyBegin(e) {
    const n = `/auth/login/passkey/begin?apikey=${this.options.apiKey}&identifier=${e.identifier}`;
    return this.api.get(n);
  }
  async loginPasskeyFinish(e) {
    const n = JSON.stringify(e), a = `/auth/login/passkey/finish?apikey=${this.options.apiKey}`;
    return this.api.post(a, n);
  }
  async autofillLoginBegin() {
    const e = `/auth/login/passkey/autofill/begin?apikey=${this.options.apiKey}`;
    return this.api.get(e);
  }
  async autofillLoginFinish(e) {
    const n = JSON.stringify(e), a = `/auth/login/passkey/autofill/finish?apikey=${this.options.apiKey}`;
    return this.api.post(a, n);
  }
  async getInvitationByInvitationToken(e) {
    let n = `/auth/invitations/${e.invitationToken}?apikey=${this.options.apiKey}`;
    return e.invitation_token && (n += `&invitation_token=${e.invitation_token}`), this.api.get(n);
  }
  async accountPing(e) {
    const n = `/auth/account/ping?apiKey=${this.options.apiKey}&clientGuid=${e}`;
    return this.api.get(n);
  }
  buildTemplate(e) {
    const {
      emailTemplate: n,
      verificationEmailTemplate: a,
      verificationUrl: r,
      welcomeEmailTemplate: s,
      smsTemplatePhoneVerification: l,
      rbaOneclickEmailTemplate: c,
      rbaOTPSmsTemplate: d,
      rbaCityEmailTemplate: h,
      rbaCountryEmailTemplate: u,
      rbaBrowserEmailTemplate: m,
      rbaIpEmailTemplate: g,
      rbaDeviceEmailTemplate: p,
      rbaCitySmsTemplate: b,
      rbaCountrySmsTemplate: x,
      rbaBrowserSmsTemplate: P,
      rbaIpSmsTemplate: E,
      rbaDeviceSmsTemplate: w
    } = this.options;
    let R = `emailTemplate=${n || a || ""}&verificationUrl=${r || ""}&welcomeEmailTemplate=${s || ""}`;
    return this.options.phoneLogin && l && (R += `&smsTemplate=${l}`), this.options.riskBasedAuthentication && (R += `&RbaOneclickEmailTemplate=${c || ""}`, R += `&RbaOTPSmsTemplate=${d || ""}`, R += `&RbaCityEmailTemplate=${h || ""}`, R += `&RbaCountryEmailTemplate=${u || ""}`, R += `&RbaBrowserEmailTemplate=${m || ""}`, R += `&RbaIpEmailTemplate=${g || ""}`, R += `&RbaDeviceEmailTemplate=${p || ""}`, R += `&RbaCitySmsTemplate=${b || ""}`, R += `&RbaCountrySmsTemplate=${x || ""}`, R += `&RbaBrowserSmsTemplate=${P || ""}`, R += `&RbaIpSmsTemplate=${E || ""}`, R += `&RbaDeviceSmsTemplate=${w || ""}`), this.options.isB2BEnabled && this.options.organizationObj && this.options.organizationObj.Id && (R += "&org_id=" + this.options.organizationObj.Id), R;
  }
  buildLoginUrl(e) {
    const { apiKey: n, loginUrl: a } = this.options;
    return `/auth/login?apiKey=${n}&loginUrl=${a || ""}&${e}`;
  }
  buildRegisterUrl(e) {
    const { apiKey: n, sott: a, isCaptchaEnabled: r } = this.options;
    return a || console.warn("[buildRegisterUrl] Missing SOTT. Registration may fail."), `${r ? "/auth/register/captcha" : "/auth/register"}?apiKey=${n}&${e}`;
  }
  mapRegistrationSchema(e, n) {
    return n;
  }
}
class Wi extends Error {
  constructor(e, n) {
    super(n), Q(this, "status"), this.status = e;
  }
}
const qi = "loginradius", Ki = "::";
class Rn {
  constructor(e, n) {
    this.prefix = e, this.key = n, this.prefix = e, this.key = n;
  }
  toKey() {
    return [this.prefix, this.key].join(Ki);
  }
}
const zi = (t = qi) => {
  const e = /* @__PURE__ */ new Map();
  return { getItem: (n) => {
    const a = new Rn(t, n).toKey(), r = e.get(a);
    if (r)
      return r;
  }, setItem: (n, a) => {
    const r = new Rn(t, n).toKey();
    e.set(r, a);
  }, clear: () => {
    e.clear();
  }, size: () => e.size, removeItem: (n) => {
    const a = new Rn(t, n).toKey();
    e.has(a) && e.delete(a);
  } };
}, ie = zi();
class Gi {
  constructor(e) {
    Q(this, "options"), Q(this, "apiClient"), Q(this, "util"), this.options = e, this.util = Qn(), this.apiClient = new so(e);
  }
  async _getToken() {
    try {
      const { data: e } = await this.apiClient.fetchToken();
      return e.isauthenticated ? e.token : null;
    } catch {
      return null;
    }
  }
  // Initialize session: check cache, then validate or fetch token
  async initializeSession() {
    const e = await this._getToken();
    e && ie.setItem(fe.storedTokenName, e);
  }
  async setSecureTokenCookie(e) {
    try {
      const n = navigator.userAgent.toLowerCase(), a = n.indexOf("crios") === -1 && n.indexOf("chrome") === -1 && n.indexOf("safari") >= 0, r = /ipad|iphone|ipod/.test(n) && !(typeof window < "u" && "MSStream" in window), s = n.indexOf("ucbrowser") >= 0, l = /crios/i.test(n), c = "dev-auth-ignite.devhub.lrinternal.com".replace("%s", this.options.appName), d = this.options.customDomain || `${c}`;
      let h = window.location.href;
      const u = this.util.getQueryParameterByName("vtype"), m = this.util.getQueryParameterByName("vtoken");
      u && (h = h.replace(`?vtype=${u}`, "").replace(`&vtype=${u}`, "")), m && (h = h.replace(`&vtoken=${m}`, "").replace(`?vtoken=${m}`, ""));
      const g = encodeURIComponent(h);
      if (window.location.hostname.replace("www.", "") !== d && (a || r && s || r && l)) {
        let p = `token=${encodeURIComponent(
          e
        )}&apiKey=${encodeURIComponent(
          this.options.apiKey
        )}&callback=${g}`, b = `${d}/ssologin/setSafariToken`;
        if (this.options.stayLogin) {
          const x = ie.getItem("lr-rememberme") || "false";
          ie.removeItem("lr-rememberme"), b = `${d}/ssologin/setCustomSafariToken`, p += `&isrememberMe=${x}`;
        }
        window.location.href = `https://${b}?${p}`;
      } else {
        let p = `${d}/ssologin/setToken`, b = `access_token=${encodeURIComponent(
          e
        )}&apiKey=${encodeURIComponent(this.options.apiKey)}`;
        if (this.options.stayLogin) {
          const x = ie.getItem("lr-rememberme") || "false";
          ie.removeItem("lr-rememberme"), p = `${d}/ssologin/setCustomToken`, b += `&isrememberMe=${x}`;
        }
        await this.apiClient.setSecureCookie(
          `https://${p}?${b}`
        ), ie.setItem(fe.storedTokenName, e);
      }
    } catch (n) {
      console.error("Failed to set token cookie:", n);
    }
  }
}
const lo = (t) => {
  const e = new Gi(t);
  return {
    initializeSession: () => e.initializeSession(),
    setSecureTokenCookie: (n) => e.setSecureTokenCookie(n)
  };
};
class co {
  constructor(e) {
    Q(this, "apiClient"), Q(this, "options"), Q(this, "sessionStorage"), Q(this, "passwordlessLoginEmail", async (n, a, r) => this.handleApiCall(
      () => this.apiClient.passwordlessLoginEmail(n),
      "Passwordless Login Email",
      (s) => s.IsPosted ? { success: !0, data: s, error: "" } : {
        success: !1,
        error: "Failed to send passwordless login email"
      },
      a,
      r
    )), Q(this, "passwordlessLoginSMS", async (n, a, r) => this.handleApiCall(
      () => this.apiClient.passwordlessLoginSMS(n),
      "Passwordless Login SMS",
      (s) => s.IsPosted ? { success: !0, data: s, error: "" } : { success: !1, error: "Failed to send passwordless login SMS" },
      a,
      r
    )), this.options = e, this.apiClient = new so(e), this.sessionStorage = lo(e);
  }
  // Core Authentication Methods
  async login(e, n, a, r) {
    const s = {
      ...ro(e).authPayload,
      password: e.password,
      stayLogin: e.stayLogin,
      ...e.invitationToken ? { invitation_token: e.invitationToken } : {},
      ...e["g-recaptcha-response"] ? { "g-recaptcha-response": e["g-recaptcha-response"] } : e["tencent-captcha-response"] ? { "tencent-captcha-response": e["tencent-captcha-response"] } : e["h-captcha-response"] ? { "h-captcha-response": e["h-captcha-response"] } : {}
    };
    return this.handleApiCall(
      () => this.apiClient.login(s, n),
      "login",
      (l) => !l.SecondFactorAuthentication || this.isValidAccessToken(l.access_token) ? this.createUserSession(l) : {
        success: !1,
        data: l,
        error: "Second factor authentication required math"
      },
      a,
      r
    );
  }
  async ssoLogout(e, n) {
    return this.handleApiCall(
      () => this.apiClient.ssoLogout(),
      "SSO logout",
      (a) => a,
      // Assuming the response is already the desired string | null
      e,
      n
    );
  }
  async logout() {
    ie.clear(), [
      fe.storedTokenName,
      "session",
      "SecondFactorAuthenticationToken"
    ].forEach((e) => ie.removeItem(e));
  }
  async updateConsent(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.updateConsent(e, n),
      "consent update",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  async acceptPrivacyPolicy(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.acceptPrivacyPolicy(e),
      "privacy policy acceptance",
      (r) => this.handleVerificationResponse({
        access_token: e,
        Profile: r
      }),
      n,
      a
    );
  }
  async emailVerify(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.emailVerify(e),
      "email verification",
      (r) => !r.Data.access_token && r.Data.Email && r.IsPosted ? {
        success: !0,
        data: r.Data,
        successMessage: "Email verification successful, please login again"
      } : this.handleVerificationResponse({
        ...r.Data,
        AccessToken: r.Data.access_token
      }),
      n,
      a
    );
  }
  async emailVerifyLink(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.emailVerifyLink(e),
      "email verification link",
      (r) => !r.Data.access_token && r.Data.Email && r.IsPosted ? {
        success: !0,
        data: r.Data,
        successMessage: "Email verification successful, please login again"
      } : this.handleVerificationResponse({
        ...r.Data,
        access_token: r.Data.access_token
      }),
      n,
      a
    );
  }
  async resendEmailVerification(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.resendEmailVerification(e),
      "resend email verification",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  async phoneVerify(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.phoneVerify(e),
      "phone verification",
      (r) => this.handleVerificationResponse(r),
      n,
      a
    );
  }
  async resendPhoneVerificationOTP(e, n = !1, a, r) {
    return this.handleApiCall(
      () => this.apiClient.resendPhoneVerify(e, n),
      "resend phone verification",
      (s) => ({ success: !0, data: s, error: "" }),
      a,
      r
    );
  }
  async register(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.register(e, n),
      "registration",
      (s) => {
        if (!s.Data && s.IsPosted)
          return {
            success: !0,
            data: s,
            error: ""
          };
        const l = s.Data;
        return l.Profile && this.isValidAccessToken(l.access_token) ? {
          success: !0,
          data: {
            ...l,
            AccessToken: l.access_token
          },
          error: ""
        } : { success: !1, error: "Email registration failed" };
      },
      a,
      r
    );
  }
  async getAccount(e, n, a) {
    const r = e || ie.getItem(fe.storedTokenName);
    if (!r) {
      const s = "No access token available. Please log in first.";
      return a == null || a({ error: s, errorCode: 0 }), { success: !1, error: s };
    }
    return this.handleApiCall(
      () => this.apiClient.getAccount(r),
      "account fetch",
      (s) => ({ success: !0, data: s }),
      n,
      a
    );
  }
  // MFA Email OTP Methods
  async mfaEmailOTP(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.mfaEmailOTP(e, n),
      "MFA Email OTP sending",
      (s) => ({ success: !0, data: s, error: "" }),
      a,
      r
    );
  }
  async mfaEmailOTPVerify(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.mfaEmailOTPVerify(e, n),
      "MFA Email OTP verification",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  // Account Email OTP Methods
  async accountEmailOTP(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.accountEmailOTP(e, n),
      "Account Email OTP sending",
      (s) => ({ success: !0, data: s, error: "" }),
      a,
      r
    );
  }
  async accountEmailOTPVerify(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.accountEmailOTPVerify(e, n),
      "Account Email OTP verification",
      (s) => {
        var l;
        return s && ((l = s.Email[0]) == null ? void 0 : l.Value) === e.EmailId ? {
          success: !0,
          acccess_token: n,
          data: s.Data || s
        } : { success: !1, error: "Email verification failed" };
      },
      a,
      r
    );
  }
  // MFA SMS OTP Methods
  async mfaSMSOTPVerify(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.mfaSMSOTPVerify(e, n),
      "MFA SMS OTP verification",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  async accountSMSOTPVerify(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.accountSMSOTPVerify(e, n),
      "Account SMS OTP verification",
      (s) => s ? {
        success: !0,
        acccess_token: n,
        data: s.Data || s
      } : { success: !1, error: D.otpVerificationError },
      a,
      r
    );
  }
  async resendSMSOTP(e, n = !1, a, r) {
    return this.handleApiCall(
      () => this.apiClient.resendSMSOTP(e, n),
      "SMS OTP resending",
      (s) => ({ success: !0, data: s, error: "" }),
      a,
      r
    );
  }
  // Phone Update Methods
  async updatePhone(e, n, a = !1, r, s) {
    return this.handleApiCall(
      () => this.apiClient.updatePhone(e, n, a),
      "phone update",
      (l) => ({ success: !0, data: l, error: "" }),
      r,
      s
    );
  }
  async updateAccountPhone(e, n, a = !1, r, s) {
    return this.handleApiCall(
      () => this.apiClient.updateAccountPhone(e, n, a),
      "account phone update",
      (l) => ({ success: !0, data: l, error: "" }),
      r,
      s
    );
  }
  async verifyBackupCode(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.verifyBackupCode(e, n),
      "Backup Code verification",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  // MFA Authenticator Code Methods
  async mfaAuthenticatorCodeVerify(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.mfaAuthenticatorCodeVerify(e, n),
      "MFA Authenticator Code verification",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  async accountAuthenticatorCodeVerify(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.accountAuthenticatorCodeVerify(e, n),
      "Account Authenticator Code verification",
      (s) => s ? {
        success: !0,
        acccess_token: n,
        data: s.Data || s
      } : { success: !1, error: D.otpVerificationError },
      a,
      r
    );
  }
  // Second Factor Config Method
  async getSecondFactorConfig(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.getSecondFactorConfig(
        e,
        n
      ),
      "Second Factor Config fetch",
      (s) => ({ success: !0, data: s, error: "" }),
      a,
      r
    );
  }
  // MFA Push Methods
  async mfaPushPing(e, n, a) {
    return this.handleApiCall(
      async () => {
        for (; ; ) {
          const r = (await this.apiClient.mfaPushPing(e)).data;
          if (r.ErrorCode === 1295) {
            await new Promise((s) => setTimeout(s, 5e3));
            continue;
          }
          return { data: r };
        }
      },
      "MFA Push Ping",
      (r) => this.handleVerificationResponse(r),
      n,
      a
    );
  }
  async mfaPushResend(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.mfaPushResend(e),
      "MFA Push Resend",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  // MFA Duo Methods
  async mfaDuoVerify(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.mfaDuoVerify(e, n),
      "MFA Duo verification",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  async accountDuoVerify(e, n, a, r) {
    return await this.handleApiCall(
      () => this.apiClient.accountDuoVerify(e, n),
      "Account Duo verification",
      (s) => ({
        success: !0,
        token: n,
        data: s.Data || s
      }),
      a,
      r
    );
  }
  // PIN Authentication Methods
  async setPinByPinAuth(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.setPinByPinAuth(e, n),
      "Set PIN by PIN Auth",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  async loginByPIN(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.loginByPIN(e, n),
      "Login by PIN",
      (s) => this.handleVerificationResponse(s),
      a,
      r
    );
  }
  // Account Update Method
  async updateAccount(e, n, a, r) {
    return this.handleApiCall(
      () => this.apiClient.updateAccount(e, n),
      "Account update",
      (s) => s ? {
        success: !0,
        acccess_token: n,
        data: s.Data || s
      } : { success: !1, error: "Update failed" },
      a,
      r
    );
  }
  // Password Reset Methods
  async sendResetPasswordEmail(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.sendResetPasswordEmail(e),
      "Send Reset Password Email",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  async sendResetPasswordPhoneOTP(e, n = !1, a, r) {
    return this.handleApiCall(
      () => this.apiClient.sendResetPasswordPhoneOTP(e, n),
      "Send Reset Password Phone OTP",
      (s) => ({ success: !0, data: s, error: "" }),
      a,
      r
    );
  }
  async forgotPassword(e, n, a) {
    var r;
    try {
      const s = e["g-recaptcha-response"] ? { "g-recaptcha-response": e["g-recaptcha-response"] } : e["tencent-captcha-response"] ? { "tencent-captcha-response": e["tencent-captcha-response"] } : { "h-captcha-response": e["h-captcha-response"] }, l = {
        ...e.email ? { email: e.email } : e.phone ? { phone: e.phone } : { username: e.username },
        ...s
      }, c = await (e.email ? this.sendResetPasswordEmail(l) : e.phone ? this.sendResetPasswordPhoneOTP(l) : this.sendResetPasswordEmail(l));
      if (!c.success) {
        const d = c.error || "Forgot Password operation failed";
        return console.error("Forgot Password error:", d), a == null || a({
          error: d,
          errorCode: ((r = c.data) == null ? void 0 : r.ErrorCode) || 0
        }), { success: !1, error: d, data: c.data };
      }
      return n == null || n(c), c;
    } catch (s) {
      const l = s instanceof Error ? s.message : "An unexpected error occurred during Forgot Password";
      return console.error("Forgot Password error:", s), a == null || a({ error: l }), { success: !1, error: l };
    }
  }
  async resetPassword(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.resetPassword(e),
      "Reset Password",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  async resetPasswordPhoneOTP(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.resetPasswordPhoneOTP(e),
      "Reset Password Phone OTP",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  async passwordlessLoginEmailVerify(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.passwordlessLoginEmailVerify(e),
      "Passwordless Login Email Verify",
      (r) => this.handleVerificationResponse(r),
      n,
      a
    );
  }
  async passwordlessLoginEmailOTPVerify(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.passwordlessLoginEmailOTPVerify(e),
      "Passwordless Login Email OTP Verify",
      (r) => this.handleVerificationResponse(r),
      n,
      a
    );
  }
  async passwordlessLoginUsernameOTPVerify(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.passwordlessLoginUsernameOTPVerify(e),
      "Passwordless Login Username OTP Verify",
      (r) => this.handleVerificationResponse(r),
      n,
      a
    );
  }
  async passwordlessLoginSMSOTPVerify(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.passwordlessLoginSMSOTPVerify(e),
      "Passwordless Login SMS Verify",
      (r) => this.handleVerificationResponse(r),
      n,
      a
    );
  }
  async registerPasskeyBegin(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.registerPasskeyBegin(e),
      "Register Passkey Begin",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  async registerPasskeyFinish(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.registerPasskeyFinish(e),
      "Register Passkey Finish",
      (r) => !r.Data && r.IsPosted ? {
        success: !0,
        data: r,
        error: ""
      } : this.handleVerificationResponse(r.Data),
      n,
      a
    );
  }
  async registerPasskey(e, n, a) {
    var r, s;
    if (!e.identifier || typeof e.identifier != "string") {
      const l = "Invalid or missing identifier";
      return console.error("Passkey Registration error:", l), a == null || a({ error: l, errorCode: 0 }), { success: !1, error: l };
    }
    try {
      const l = await this.registerPasskeyBegin({
        identifier: e.identifier
      });
      if (!l.success || !l.data.RegisterBeginCredential) {
        const g = l.error || "Passkey registration initialization failed";
        return console.error("Passkey Registration error:", g), a == null || a({
          error: g,
          errorCode: ((r = l.data) == null ? void 0 : r.ErrorCode) || 0
        }), { success: !1, error: g, data: l.data };
      }
      let c;
      try {
        c = await Oi(
          l.data.RegisterBeginCredential
        );
      } catch (g) {
        const p = "Failed to generate passkey credentials";
        return console.error("Passkey Registration error:", g), a == null || a({
          error: p,
          errorCode: 0
        }), { success: !1, error: p };
      }
      if (!c || typeof c != "object") {
        const g = "Invalid passkey credentials generated";
        return console.error("Passkey Registration error:", g), a == null || a({ error: g, errorCode: 0 }), { success: !1, error: g };
      }
      const d = {
        Email: [
          {
            Type: "primary",
            Value: e.identifier
          }
        ],
        PasskeyCredential: c,
        acceptprivacypolicy: e.acceptprivacypolicy || !1,
        ...e.Consents ? { Consents: e.Consents } : {}
      }, h = await this.registerPasskeyFinish(d);
      if (!h.data.Data && h.data.IsPosted)
        return n == null || n({
          success: !0,
          data: h.data,
          error: ""
        }), {
          success: !0,
          data: h.data,
          error: ""
        };
      if (!h.success) {
        const g = h.error || "Passkey registration completion failed";
        return console.error("Passkey Registration error:", g), a == null || a({
          error: g,
          errorCode: ((s = h.data) == null ? void 0 : s.ErrorCode) || 0
        }), {
          success: !1,
          error: g,
          data: h.data
        };
      }
      const u = h.data, m = this.handleVerificationResponse(u);
      return n == null || n(m), m;
    } catch (l) {
      const c = l instanceof Error ? l.message : "An unexpected error occurred during Passkey Registration";
      return console.error("Passkey Registration error:", l), a == null || a({ error: c }), { success: !1, error: c };
    }
  }
  async loginPasskeyBegin(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.loginPasskeyBegin(e),
      "Login Passkey Begin",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  async loginPasskeyFinish(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.loginPasskeyFinish(e),
      "Login Passkey Finish",
      (r) => this.handleVerificationResponse(r),
      n,
      a
    );
  }
  async loginPasskey(e, n, a) {
    var r, s;
    if (!e.identifier || typeof e.identifier != "string") {
      const l = "Invalid or missing identifier";
      return console.error("Passkey Login error:", l), a == null || a({ error: l, errorCode: 0 }), { success: !1, error: l };
    }
    try {
      const l = await this.loginPasskeyBegin({
        identifier: e.identifier
      });
      if (!l.success || !l.data.LoginBeginCredential) {
        const g = l.error || "Passkey login initialization failed";
        return console.error("Passkey Login error:", g), a == null || a({
          error: g,
          errorCode: ((r = l.data) == null ? void 0 : r.ErrorCode) || 0
        }), { success: !1, error: g, data: l.data };
      }
      let c;
      try {
        c = await La(
          l.data.LoginBeginCredential
        );
      } catch (g) {
        const p = "Failed to generate passkey credentials";
        return console.error("Passkey Login error:", g), a == null || a({
          error: p,
          errorCode: 0
        }), { success: !1, error: p };
      }
      if (!c || typeof c != "object") {
        const g = "Invalid passkey credentials generated";
        return console.error("Passkey Login error:", g), a == null || a({ error: g, errorCode: 0 }), { success: !1, error: g };
      }
      const d = {
        email: e.identifier,
        PasskeyCredential: c
      }, h = await this.loginPasskeyFinish(d);
      if (!h.success) {
        const g = h.error || "Passkey login completion failed";
        return console.error("Passkey Login error:", g), a == null || a({
          error: g,
          errorCode: ((s = h.data) == null ? void 0 : s.ErrorCode) || 0
        }), {
          success: !1,
          error: g,
          data: h.data
        };
      }
      const u = h.data, m = this.handleVerificationResponse(u);
      return n == null || n(m), m;
    } catch (l) {
      const c = l instanceof Error ? l.message : "An unexpected error occurred during Passkey Registration";
      return console.error("Passkey Registration error:", l), a == null || a({ error: c }), { success: !1, error: c };
    }
  }
  async autofillLoginBegin(e, n) {
    return this.handleApiCall(
      () => this.apiClient.autofillLoginBegin(),
      "Autofill Login Begin",
      (a) => ({ success: !0, data: a, error: "" }),
      e,
      n
    );
  }
  async autofillLoginFinish(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.autofillLoginFinish(e),
      "Autofill Login Finish",
      (r) => ({ success: !0, data: r, error: "" }),
      n,
      a
    );
  }
  async loginWithAutofillPasskey(e, n) {
    var a, r;
    try {
      const s = await this.autofillLoginBegin();
      if (!s.success || !((a = s.data.LoginBeginCredential) != null && a.publicKey)) {
        const u = s.error || "Failed to start autofill passkey login";
        return n == null || n({ error: u }), { success: !1, error: u };
      }
      let l;
      try {
        l = await La(
          s.data.LoginBeginCredential,
          !0
          // isAutofill
        );
      } catch (u) {
        const m = "Failed to get autofill passkey credential";
        return console.error("Autofill error:", u), n == null || n({ error: m }), { success: !1, error: m };
      }
      if (!l || typeof l != "object") {
        const u = "Invalid passkey credentials generated (autofill)";
        return console.error(u), n == null || n({ error: u }), { success: !1, error: u };
      }
      const c = {
        PasskeyCredential: l
      }, d = await this.autofillLoginFinish(c);
      if (!d.success) {
        const u = d.error || "Autofill passkey login failed";
        return console.error("Autofill login error:", u), n == null || n({
          error: u,
          errorCode: ((r = d.data) == null ? void 0 : r.Errorcode) || 0
        }), {
          success: !1,
          error: u,
          data: d.data
        };
      }
      const h = this.handleVerificationResponse(d.data);
      return e == null || e(h), h;
    } catch (s) {
      const l = s instanceof Error ? s.message : "An unexpected error occurred during Autofill Login";
      return console.error("Autofill login fatal error:", s), n == null || n({ error: l }), { success: !1, error: l };
    }
  }
  async getInvitationByInvitationToken(e, n, a) {
    return this.handleApiCall(
      () => this.apiClient.getInvitationByInvitationToken(e),
      "Get Invitation by Token",
      (r) => {
        if (r.Status === "Expired") {
          const s = "Invitation token has expired";
          return console.error("Invitation Error:", s), { success: !1, error: s, data: r };
        } else if (r.Status === "Accepted") {
          const s = "Invitation token has already been accepted";
          return console.error("Invitation Error:", s), { success: !1, error: s, data: r };
        } else if (r.Status === "Revoked") {
          const s = "Invitation token has been revoked";
          return console.error("Invitation Error:", s), { success: !1, error: s, data: r };
        } else if (r.Status === "Invited")
          return {
            success: !0,
            data: r,
            error: ""
          };
      },
      n,
      a
    );
  }
  async pingForSocialLogin(e, n, a) {
    const { data: r } = await this.apiClient.accountPing(e);
    r.ErrorCode === 1139 || r.ErrorCode === 1140 ? setTimeout(() => {
      fe.pingCount < 100 && (this.pingForSocialLogin(e, n), fe.pingCount++);
    }, 1e3) : r.ErrorCode && r.ErrorCode === 1026 ? a == null || a({
      error: "Social login failed. Please try again.",
      errorCode: r.ErrorCode,
      data: r
    }) : (fe.pingCount = 0, r.access_token && this.isValidAccessToken(r.access_token) && this.setAccessToken(r.access_token), n == null || n({
      success: !0,
      data: r,
      error: ""
    }));
  }
  // Cookie Management
  getAccessToken() {
    return ie.getItem(fe.storedTokenName);
  }
  setAccessToken(e) {
    ie.setItem(fe.storedTokenName, e);
  }
  setMFAToken(e) {
    ie.setItem("SecondFactorAuthenticationToken", e);
  }
  setPinAuthToken(e) {
    ie.setItem("PinAuthenticationToken", e);
  }
  setConsentToken(e) {
    ie.setItem("ConsentToken", e);
  }
  setPrivacyPolicyAccessToken(e) {
    ie.setItem("PrivacyPolicyAccessToken", e);
  }
  getEmail() {
    return ie.getItem("Email");
  }
  setEmail(e) {
    ie.setItem("Email", e);
  }
  getPhoneId() {
    return ie.getItem("PhoneId");
  }
  setPhoneId(e) {
    ie.setItem("PhoneId", e);
  }
  getUsername() {
    return ie.getItem("UserName");
  }
  setUsername(e) {
    ie.setItem("UserName", e);
  }
  getMFAToken() {
    return ie.getItem("SecondFactorAuthenticationToken");
  }
  getPinAuthToken() {
    return ie.getItem("PinAuthenticationToken");
  }
  getConsentToken() {
    return ie.getItem("ConsentToken");
  }
  getPrivacyPolicyAccessToken() {
    return ie.getItem("PrivacyPolicyAccessToken");
  }
  getInvitationToken() {
    return ie.getItem("InvitationToken");
  }
  setInvitationToken(e) {
    ie.setItem("InvitationToken", e);
  }
  // Token Removal Methods
  removeInvitationToken() {
    ie.removeItem("InvitationToken");
  }
  removeMFAToken() {
    ie.removeItem("SecondFactorAuthenticationToken");
  }
  removeAccessToken() {
    ie.removeItem(fe.storedTokenName);
  }
  removePinAuthToken() {
    ie.removeItem("PinAuthenticationToken");
  }
  removeConsentToken() {
    ie.removeItem("ConsentToken");
  }
  removeEmail() {
    ie.removeItem("Email");
  }
  removePhoneId() {
    ie.removeItem("PhoneId");
  }
  removeUsername() {
    ie.removeItem("UserName");
  }
  removePrivacyPolicyAccessToken() {
    ie.removeItem("PrivacyPolicyAccessToken");
  }
  // Private Helper Methods
  async handleApiCall(e, n, a, r, s) {
    try {
      const { data: l } = await e(), c = l;
      if (c.ErrorCode) {
        const u = c.Description || `An error occurred during ${n}`;
        return s == null || s({
          error: u,
          errorCode: c.ErrorCode,
          data: c.Data
        }), { success: !1, error: u, data: c };
      }
      let d = c.access_token || "";
      if (c.Data && Object.prototype.hasOwnProperty.call(c.Data, "Profile") && (d = c.Data.access_token), this.isValidAccessToken(d)) {
        await this.sessionStorage.setSecureTokenCookie(d);
        const u = this.createUserSession(c);
        await this.setSessionCookies(u), this.options.federationTokenCallback && await this.postAndRedirect(this.options.federationTokenCallback, {
          token: d
        });
      }
      let h;
      try {
        h = a ? a(c) : { success: !0, data: c, error: "" }, r == null || r(h);
      } catch (u) {
        console.error("Error in onSuccess callback:", u);
      }
      return h;
    } catch (l) {
      const c = l instanceof Error ? l.message : `An unexpected error occurred during ${n}`;
      return console.error(`${n} error:`, l), s == null || s({ error: c, errorCode: 0 }), { success: !1, error: c };
    }
  }
  /**
   * Posts data to a URL using a dynamically created form and then redirects.
   * Uses FormData and requestSubmit for better compatibility and security.
   */
  async postAndRedirect(e, n) {
    const a = document.createElement("form");
    a.method = "post", a.action = e, a.style.display = "none", Object.entries(n).forEach(([r, s]) => {
      const l = document.createElement("input");
      l.type = "hidden", l.name = r, l.value = s, a.appendChild(l);
    }), document.body.appendChild(a), typeof a.requestSubmit == "function" ? a.requestSubmit() : a.submit(), setTimeout(() => {
      a.parentNode && a.parentNode.removeChild(a);
    }, 1e3);
  }
  isValidAccessToken(e) {
    return !(!e || e.trim() === "" || /^[0]{8}-[0]{4}-[0]{4}-[0]{4}-[0]{12}$/.test(e));
  }
  createUserSession(e, n) {
    var a;
    return {
      success: !0,
      token: n || e.access_token || ((a = e.Data) == null ? void 0 : a.access_token) || e.access_token || "",
      data: e.Data || e
    };
  }
  handleVerificationResponse(e) {
    return e.access_token ? {
      success: !0,
      token: e.access_token,
      data: e.Data || e
    } : { success: !1, error: "No access token received", data: e };
  }
  setSessionCookies(e) {
    var n, a;
    const { data: r } = e;
    this.setAccessToken((r == null ? void 0 : r.access_token) || ""), this.removeMFAToken(), this.removeConsentToken(), this.removePrivacyPolicyAccessToken();
    const s = (r == null ? void 0 : r.Profile) || {}, l = {
      userName: s.Fullname || "",
      phoneId: s.PhoneId || "",
      gender: s.Gender || "",
      lastLoginLocation: s.LastLoginLocation || "",
      email: ((a = (n = s.Email) == null ? void 0 : n[0]) == null ? void 0 : a.Value) || "",
      imageUrl: s.ImageUrl || ""
    };
    ie.setItem("session", JSON.stringify(l));
  }
}
const Ea = (t) => new co(t);
function Vt(t, e) {
  var n, a, r, s, l, c, d;
  const h = {};
  if (e.organizationObj = t.Organization, e.securityQuestionEnabled = t.IsSecurityQuestion, e.appName = e.appName || t.AppName, e.RegistrationFormSchema = t.RegistrationFormSchema, e.loginLockedType = (n = t.LoginLockedConfiguration) == null ? void 0 : n.LoginLockedType, e.isB2BEnabled = t.IsB2BEnabled, e.securityQuestionEnabled && (e.SecurityQuestions = (a = t.SecurityQuestions) == null ? void 0 : a.Questions, e.securityQuestionsCount = e.securityQuestionsCount === void 0 ? (r = t.SecurityQuestions) == null ? void 0 : r.SecurityQuestionCount : e.securityQuestionsCount), e.passwordLength === void 0 && e.displayPasswordStrength && e.RegistrationFormSchema) {
    const g = Un(
      e.RegistrationFormSchema,
      "name",
      "password"
    );
    if (g != null && g.rules) {
      const p = g.rules.split("|"), b = ba("min_length[", p), x = b !== -1 ? parseInt(
        p[b].substring(
          p[b].indexOf("min_length[") + 11,
          p[b].indexOf("]")
        )
      ) : void 0, P = ba("max_length[", p), E = P !== -1 ? parseInt(
        p[P].substring(
          p[P].indexOf("max_length[") + 11,
          p[P].indexOf("]")
        )
      ) : void 0, w = {};
      x !== void 0 && !isNaN(x) && (w.min = x), E !== void 0 && !isNaN(E) && (w.max = E), e.passwordLength = w;
    }
  }
  e.SocialSchema = t.SocialSchema, e.maskSensitiveInput = e.encryptedAnswer || e.maskSensitiveInput, e.OtpType = t.OtpType || e.OtpType, e.OtpLength = t.OtpLength || e.OtpLength, (s = t.TwoFactorAuthentication) != null && s.IsEnabled && (h.optionalTwoFactorAuthentication = !0, h.twoFactorAuthentication = !1, h.qrCodeAuthentication = t.TwoFactorAuthentication.IsAuthenticator, h.emailOTPAuthentication = t.TwoFactorAuthentication.IsEmailOTPAuthenticator, h.pushNotificationAuthenticator = t.TwoFactorAuthentication.IsPushAuthenticator, h.securityQuestionAuthentication = t.TwoFactorAuthentication.IsSecurityQuestionAuthenticator, h.smsOTPAuthentication = t.TwoFactorAuthentication.IsSmsOTPAuthenticator, h.duoAuthentication = t.TwoFactorAuthentication.IsDuoSecurityAuthenticator, h.passkeyAuthenticator = t.TwoFactorAuthentication.IsPasskeyAuthenticator, t.TwoFactorAuthentication.IsRequired && (h.optionalTwoFactorAuthentication = !1, h.twoFactorAuthentication = !0)), e.optionalTwoFactorAuthentication = e.optionalTwoFactorAuthentication === void 0 ? h.optionalTwoFactorAuthentication : e.optionalTwoFactorAuthentication, e.twoFactorAuthentication = e.twoFactorAuthentication === void 0 ? h.twoFactorAuthentication : e.twoFactorAuthentication, e.qrCodeAuthentication = e.googleAuthentication === void 0 ? e.qrCodeAuthentication === void 0 ? h.qrCodeAuthentication : e.qrCodeAuthentication : e.googleAuthentication, e.phoneLogin = e.phoneLogin === void 0 ? t.IsPhoneLogin : e.phoneLogin, e.passwordlessLoginOTP = e.instantOTPLogin === void 0 && e.passwordlessLoginOTP === void 0 ? (l = t.IsInstantSignin) == null ? void 0 : l.SmsOtp : e.instantOTPLogin || e.passwordlessLoginOTP, t.EmailVerificationFlow === "optional" ? h.optionalEmailVerification = !0 : t.EmailVerificationFlow === "disabled" && (h.disabledEmailVerification = !0), e.otpEmailVerification = t.OTPEmailVerification, e.optionalEmailVerification = e.optionalEmailVerification === void 0 ? h.optionalEmailVerification : e.optionalEmailVerification, e.disabledEmailVerification = e.disabledEmailVerification === void 0 ? h.disabledEmailVerification : e.disabledEmailVerification, e.loginOnEmailVerification = e.loginOnEmailVerification === void 0 ? t.IsLoginOnEmailVerification : e.loginOnEmailVerification, e.passwordlessLogin = e.instantLinkLogin === void 0 && e.passwordlessLogin === void 0 ? (c = t.IsInstantSignin) == null ? void 0 : c.EmailLink : e.instantLinkLogin || e.passwordlessLogin, e.askRequiredFieldForTraditionalLogin = e.askRequiredFieldForTraditionalLogin === void 0 ? t.AskRequiredFieldsOnTraditionalLogin : e.askRequiredFieldForTraditionalLogin, e.stayLogin = e.stayLogin === void 0 ? t.IsRememberMe : e.stayLogin, e.disableSignup = e.disableSignup === void 0 ? t.IsDisabledRegistration : e.disableSignup, e.riskBasedAuthentication = e.riskBasedAuthentication === void 0 ? t.IsRiskBasedAuthentication : e.riskBasedAuthentication, e.noCallbackForSocialLogin = e.noCallbackForSocialLogin === void 0 ? t.IsNoCallbackForSocialLogin : e.noCallbackForSocialLogin, e.usernameLogin = e.usernameLogin === void 0 ? t.IsUserNameLogin : e.usernameLogin, e.promptPasswordOnSocialLogin = e.promptPasswordOnSocialLogin === void 0 ? t.AskPasswordOnSocialLogin : e.promptPasswordOnSocialLogin, e.askOptionalFieldsOnRegistration = e.askOptionalFieldsOnRegistration === void 0 ? t.AskOptionalFieldsOnSocialSignup : e.askOptionalFieldsOnRegistration, e.askEmailForUnverifiedProfileAlways = e.askEmailForUnverifiedProfileAlways === void 0 ? t.AskEmailIdForUnverifiedUserLogin : e.askEmailForUnverifiedProfileAlways, e.logoutOnVerifyEmail = e.logoutOnVerifyEmail === void 0 ? t.IsLogoutOnEmailVerification : e.logoutOnVerifyEmail, e.disableAccountLinking = t.IsDisabledAccountLinking, e.duplicateEmailWithUniqueUsername = t.DuplicateEmailWithUniqueUsername, e.customDomain = e.customDomain || t.CustomDomain, e.privacyPolicyConfiguration = t.PrivacyPolicyConfiguration, e.isConsentManagementEnabled = e.isConsentManagementEnabled === void 0 ? t.IsConsentManagementEnabled : e.isConsentManagementEnabled, e.loginOnPasswordReset = t.LoginOnPasswordReset, e.optionalRecaptchaConfiguration = t.OptionalRecaptchaConfiguration, e.isVoiceOtp = t.IsVoiceOTP, (e.v2Recaptcha || t.IsV2Recaptcha) && (e.invisibleRecaptcha = !1, e.v2Recaptcha = !0), (e.invisibleRecaptcha || t.IsInvisibleRecaptcha) && (e.invisibleRecaptcha = !0, e.v2Recaptcha = !1), e.isCaptchaEnabled = e.v2Recaptcha || e.invisibleRecaptcha;
  const u = t.CaptchaConfig;
  u != null && u.IsEnabled && (e.isCaptchaEnabled = !0, u.GoogleRecaptchaV2 && (e.v2RecaptchaSiteKey = u.GoogleRecaptchaV2.PublicKey, e.v2Recaptcha = e.v2Recaptcha ?? !u.GoogleRecaptchaV2.IsInvisibleCaptcha, e.invisibleRecaptcha = e.invisibleRecaptcha ?? u.GoogleRecaptchaV2.IsInvisibleCaptcha, e.v2Recaptcha = !0), u.QQTencentCaptcha && (e.tencentCaptchaAppid = u.QQTencentCaptcha.PublicKey, e.tencentCaptcha = e.tencentCaptcha === void 0 ? !0 : e.tencentCaptcha), u.GoogleRecaptchaV3 && (e.v3RecaptchaSiteKey = u.GoogleRecaptchaV3.PublicKey, e.invisibleRecaptcha = !0, e.v2Recaptcha = !1), u.HCaptcha && (e.hCaptchaSiteKey = e.hCaptchaSiteKey || u.HCaptcha.PublicKey, e.captchaTheme = e.captchaTheme || (u.HCaptcha.IsDarkTheme ? "dark" : "light"), e.invisibleRecaptcha = u.HCaptcha.IsInvisibleCaptcha));
  const m = t.PassKeysConfig;
  return m != null && m.IsEnabled && (e.isPassKeysEnabled = !0, e.isPasskeyAutofill = m.PasskeySelection === "Autofill" || m.PasskeySelection === "Both", e.isPasskeyButton = m.PasskeySelection === "Button" || m.PasskeySelection === "Both"), h.isPINAuthentication = !1, (d = t.PINAuthentication) != null && d.IsEnabled && (h.isPINAuthentication = !0, h.PINConfiguration = { ...t.PINAuthentication.Configuration }, e.PINConfiguration = e.PINConfiguration ? { ...h.PINConfiguration, ...e.PINConfiguration } : { ...h.PINConfiguration }), e.isPINAuthentication = h.isPINAuthentication, e.emailOTPAuthentication = h.emailOTPAuthentication, e.smsOTPAuthentication = h.smsOTPAuthentication, e.duoAuthentication = h.duoAuthentication, e.securityQuestionAuthentication = h.securityQuestionAuthentication, e.templateVerificationTypes = t.TemplateVerificationTypes, e.pushNotificationAuthentication = h.pushNotificationAuthenticator, e.passkeyAuthentication = h.passkeyAuthenticator, e;
}
const Ji = { title: "Login", description: "Please enter your credentials to login.", buttonText: "Login", forgotPassword: "Forgot Password?", passwordlessloginText: "Passwordless Login", footerText: "Don't have an account? ", footerLinkText: "Sign Up", passkeyButtonText: "Login with Passkey" }, Qi = { title: "Register", description: "Create a new account.", buttonText: "Register", terms: "", passkeyButtonText: "Register with Passkey", footerText: "Already have an account? ", footerLinkText: "Login" }, Xi = { title: "Forgot Password", description: "Enter your Email address/Phone and we will send you instructions to reset your password.", submitButtonText: "Send Instructions", backButtonText: "Back to Login" }, Yi = { title: "Update Phone Number", description: "Enter your new phone number. We will send a verification code to this number.", buttonText: "Update Phone Number", footerLinkText: "Back to Other Methods" }, es = { title: "Account", description: "Manage your account information.", buttonText: "Logout", headerText: "Welcome", footerText: "Powered By" }, Pa = {
  login: Ji,
  registration: Qi,
  "passkey-registration": { title: "Register Passkey", description: "Secure your account with a passkey.", buttonText: "Register with Passkey", footerLinkText: "Continue with Password" },
  forgotpassword: Xi,
  "mfa-selector": { title: "Multi-Factor Authentication", description: "Select your preferred method for multi-factor authentication.", skipText: "Skip for now", backText: "Back to Login" },
  "email-otp": { title: "Email OTP Verification", description: "Enter the OTP sent to your email.", buttonText: "Verify OTP", backButtonText: "Back to other methods", forgotButtonText: "Use Backup Codes", footerText: "Didn't receive the OTP?", footerLinkText: "Resend" },
  "sms-otp": { title: "SMS OTP Verification", description: "Enter the OTP sent to your phone.", buttonText: "Verify OTP", backButtonText: "Back to other methods", forgotButtonText: "Use Backup Codes", footerText: "Didn't receive the OTP?", footerLinkText: "Resend via", footerLinkPrimaryText: "SMS OTP", footerLinkSecondaryText: "Voice Call" },
  updatephone: Yi,
  "authenticator-login": { title: "Authenticator Login", description: "Enter the code from your authenticator app. If you don't have an authenticator app, please contact support.", backButtonText: "Back to Other Methods", forgotButtonText: "Use Backup Codes", buttonText: "Login with Authenticator App" },
  "authenticator-setup": { title: "Authenticator Setup", description: "Scan the QR code with your authenticator app to set up two-factor authentication.", qrcodeText: "Scan the QR code with your authenticator app", buttonText: "Setup Authenticator", backButtonText: "Back to Other Methods", forgotButtonText: "Use Backup Codes" },
  "passwordless-login": { title: "Passwordless Login", description: "Enter your credentials to proceed", buttonText: "Login" },
  "verify-passwordless-login-email": { title: "Verify Passwordless Login", description: "Check your email for the login link.", buttonText: "Resend Login Link", resendButtonText: "Resend Verification Link", footerText: "Not able to find the email sent? Make sure to check spam folder" },
  "verify-passwordless-login-email-otp": { title: "Verify Passwordless Login", description: "Enter the OTP sent to your email.", buttonText: "Verify OTP", footerText: "Didn't receive the OTP?", footerLinkText: "Resend" },
  "verify-passwordless-login-sms-otp": { title: "Verify Passwordless Login", description: "Enter the OTP sent to your phone.", buttonText: "Verify OTP", footerText: "Didn't receive the OTP?", footerLinkText: "Resend via", footerLinkPrimaryText: "SMS OTP", footerLinkSecondaryText: "Voice Call" },
  "pin-authentication": { title: "Set Your PIN", description: "Please enter a secure PIN to proceed.", buttonText: "Set PIN" },
  "verify-email-otp": { title: "Verify Email", description: "Verify your email before login", buttonText: "Verify OTP", footerText: "Didn't receive email?", footerLinkText: "Resend", skipButtonText: "Skip for now" },
  "verify-email-link": { title: "Verify Email", description: "We have sent a verification link to your email.", buttonText: "Verify Email", resendButtonText: "Resend Verification email", skipButtonText: "Skip this step", footerText: "Not able to find the email sent? Make sure to check spam folder" },
  "verify-sms-otp": { title: "Verify Phone Number", description: "Verify you phone number before login", buttonText: "Verify OTP", footerText: "Didn't receive the OTP?", footerLinkText: "Resend via", footerLinkPrimaryText: "SMS OTP", footerLinkSecondaryText: "Voice Call", skipButtonText: "Skip for now" },
  "consent-form": { title: "Consent Form", description: "Please review and accept the terms.", buttonText: "Accept", backButtonText: "Back to Login" },
  "privacy-policy": { title: "Privacy Policy", description: "Please review our privacy policy.", buttonText: "Accept", privacyPolicyText: "I agree to the Privacy Policy", backButtonText: "Back to Login" },
  "magic-link-login": { title: "Verify your Account", description: "We have sent a magic link to your email.", resendButtonText: "Resend Email", footerText: "Not able to find the email sent? Make sure to check spam folder" },
  "reset-password-by-token": { title: "Create Password", description: "Create a new password for your account.", buttonText: "Continue", footerText: "Create a strong password to keep your account secure." },
  "reset-password-by-email-otp": { title: "Create Password", description: "Enter the OTP sent to your email to reset your password.", buttonText: "Reset Password", footerText: "Didn't receive the OTP?", footerLinkText: "Resend" },
  "reset-password-by-phone-otp": { title: "Create Password", description: "Enter the OTP sent to your phone to reset your password.", buttonText: "Reset Password", footerText: "Didn't receive the OTP?", footerLinkText: "Resend via", footerLinkPrimaryText: "SMS OTP", footerLinkSecondaryText: "Voice Call" },
  "verify-backup-code": { title: "Verify Backup Code", description: "Enter your backup code to verify your account.", buttonText: "Verify Backup Code", footerLinkText: "Back to Method" },
  "org-invite": { title: "Organization Invitation", description: "You have been invited to join an organization.", footerText: "Verifying your Invitation" },
  "email-verified": { title: "Email Verified", description: "Your email has been successfully verified.", footerLinkText: "Continue to Login" },
  "account-blocked": { title: "Account Blocked", description: "Your account has been blocked due to suspicious activity. Please contact support to regain access.", footerText: "Need help? ", footerLinkText: "Contact Support" },
  "account-suspended": { title: "Account Temporarily Suspended", timerText: "Try again in %s minutes, %s seconds", timerSecondsText: "Try again in %s seconds", description: "Your account has been temporarily locked due to multiple failed login attempts. Please follow the steps below to regain access.", footerText: "Need help? ", footerLinkText: "Contact Support" },
  "account-restricted": { title: "Account Temporarily Restricted", description: "Your account has been temporarily locked due to multiple failed login attempts. For security reasons, please complete the CAPTCHA below to prove you’re human.", footerText: "Need help? ", footerLinkText: "Contact Support" },
  profile: es
}, ts = {
  developmentMode: !1,
  passwordlessLoginEmailTemplate: "",
  callbackUrl: typeof window < "u" ? window.location.href : "",
  callbackInsideSameWindow: "",
  callbackType: "",
  scope: "",
  loginUrl: "",
  deleteUrl: "",
  emailTemplate: "",
  verificationUrl: "",
  verificationEmailTemplate: "",
  resetPasswordEmailTemplate: "",
  resetPassKeyEmailTemplate: "",
  resetPINEmailTemplate: "",
  resetPasswordConfirmationEmailTemplate: "",
  resetPINConfirmationEmailTemplate: "",
  smartLoginRedirectUrl: "",
  autoLoginRedirectUrl: "",
  smartLoginEmailTemplate: "",
  autoLoginEmailTemplate: "",
  smsTemplate2FA: "",
  smsTemplateForgot: "",
  smsTemplateWelcome: "",
  smsTemplateOneTouchLoginWelcome: "",
  smsTemplateOneTouchLogin: "",
  passwordlessLoginSMSTemplate: "",
  smsTemplate2FAWelcome: "",
  smsTemplatePhoneVerification: "",
  smsTemplateUpdatePhone: "",
  welcomeEmailTemplate: "",
  onetouchLoginEmailTemplate: "",
  deleteUserEmailTemplate: "",
  onetouchLoginRedirectUrl: "",
  resetPasswordUrl: "",
  resetPassKeyUrl: "",
  resetPINUrl: "",
  templateName: "",
  debugMode: !1,
  tokenType: "lrtoken",
  integrationName: "",
  smartLoginPingCount: 100,
  smartLoginPingInterval: 5,
  crossDeviceSSOPingCount: 100,
  crossDeviceSSOPingInterval: 5,
  maskSensitiveInput: !1,
  enableHeaderSott: !0,
  accessTokenResponse: !0,
  rbaOneclickEmailTemplate: "",
  rbaOTPSmsTemplate: "",
  rbaCityEmailTemplate: "",
  rbaCountryEmailTemplate: "",
  rbaBrowserEmailTemplate: "",
  rbaIpEmailTemplate: "",
  rbaDeviceEmailTemplate: "",
  rbaCitySmsTemplate: "",
  rbaCountrySmsTemplate: "",
  rbaBrowserSmsTemplate: "",
  rbaIpSmsTemplate: "",
  rbaDeviceSmsTemplate: "",
  setLRSession: !1,
  askOptionalFieldsOnProgressiveSteps: !0,
  disableResendOTPButton: !1,
  disableResendOTPButtonDelay: 5,
  EmailTemplate2FA: "",
  authenticatorOptionsOrder: [
    "emailotp",
    "securityquestion",
    "auth",
    "sms",
    "pushnotification",
    "duomfa",
    "passkey"
  ]
}, Zn = class nn {
  // 5 minutes
  constructor(e) {
    if (Q(this, "options"), Q(this, "appConfig", null), Q(this, "consentOptions", null), Q(this, "controller"), Q(this, "initializing", !1), Q(this, "pinSchema", []), Q(this, "version", "3.28.4"), Q(this, "LRCheckRegistration", !1), Q(this, "passwordlessLoginFlag", !1), Q(this, "duoLoginFlag", !1), Q(this, "socialLoginFlag", !1), Q(this, "LRCheckLogin", !1), Q(this, "LRCheck2FA", !1), Q(this, "loginAction", !1), Q(this, "errorMessages", []), Q(this, "validationMessages", []), Q(this, "formCustomLabel", {}), Q(this, "formElementsTitle", {}), Q(this, "defaultOptionField", {}), Q(this, "formValidations", {}), Q(this, "formPlaceholder", {}), Q(this, "formElementAttributes", {}), Q(this, "buttonElements", {}), Q(this, "passwordMeterConfiguration", []), Q(this, "buttonsName", {}), Q(this, "eventsName", {}), Q(this, "translations", {}), !e.apiKey)
      throw new Error("API key is required");
    this.options = Ci(ts, {
      brandName: "",
      ...e
    });
  }
  async setTranslations(e) {
    this.translations = e;
  }
  async getTranslation() {
    return this.translations;
  }
  async getCacheKey() {
    this.appConfig || await this.initializeConfig();
    const e = Aa(this.options.localization !== !1), n = `${nn.CACHE_KEY_PREFIX}${this.options.apiKey}-${this.options.brandName ?? ""}-${this.options.styleName ?? ""}-${e}`;
    return this.options.developmentMode ? "" : n;
  }
  getCachedData(e) {
    try {
      const n = localStorage.getItem(e);
      if (!n)
        return null;
      const a = JSON.parse(n);
      return Date.now() - a.timestamp > nn.CACHE_TTL || !a.appConfig || !a.branding || !a.branding.style || !a.branding.translation ? (localStorage.removeItem(e), null) : a;
    } catch (n) {
      return console.error("Error retrieving cached data:", n), localStorage.removeItem(e), null;
    }
  }
  setCachedData(e, n, a) {
    try {
      if (!n || !a) {
        console.warn("Not caching data; appConfig or branding is null");
        return;
      }
      const r = {
        appConfig: n,
        branding: a,
        timestamp: Date.now()
      };
      localStorage.setItem(e, JSON.stringify(r));
    } catch (r) {
      console.error("Failed to cache data:", r);
    }
  }
  async setSessionCache() {
    ie.getItem(fe.storedTokenName) || await lo(this.options).initializeSession();
  }
  async initialize() {
    const e = await this.getCacheKey(), n = this.getCachedData(e);
    if (n && n.appConfig && n.branding) {
      this.appConfig = n.appConfig;
      const a = await this.getCSSVars(
        n.branding.style.Config[bn]
      );
      this.applyBranding(a), this.setTranslations(n.branding.translation.Translations), this.options = Vt(this.appConfig, this.options), this.controller = Ea(this.options), await this.setSessionCache(), this.appConfig.IsConsentManagementEnabled && await this.initializeConsentOptions();
      return;
    }
    try {
      const a = await this.initializeConfig();
      if (a) {
        this.options = Vt(a, this.options), this.controller = Ea(this.options), await this.setSessionCache();
        const r = await this.initializeBranding();
        this.options.developmentMode || this.setCachedData(e, a, r), a.IsConsentManagementEnabled && await this.initializeConsentOptions();
      } else
        throw console.warn("No appConfig returned from initializeConfig"), new Error("Failed to initialize appConfig");
    } catch (a) {
      console.error("SDK Initialization failed:", a), this.appConfig = this.appConfig || {}, this.applyBranding(null);
    }
  }
  applyBranding(e) {
    var n;
    if (typeof document > "u") {
      console.warn(
        "document is undefined; cannot apply branding (possibly running in SSR)"
      );
      return;
    }
    const a = document.documentElement;
    if (!a) {
      console.error("document.documentElement is not available");
      return;
    }
    const r = e || this.getCSSVars(G);
    if (r["--sdk-font-family"]) {
      const s = ((n = r["--sdk-font-family"].split(",")[0]) == null ? void 0 : n.trim()) || "Arial", l = `https://fonts.googleapis.com/css2?family=${s.replace(
        /\s+/g,
        "+"
      )}:wght@300;400;500;600;700&display=swap`;
      if (!document.querySelector(`link[data-sdk-font="${s}"]`)) {
        const c = document.createElement("link");
        c.rel = "stylesheet", c.href = l, c.setAttribute("data-sdk-font", s), document.head.appendChild(c);
      }
    }
    try {
      Object.entries(r).forEach(([s, l]) => {
        l != null ? a.style.setProperty(s, l) : console.warn(`Skipping invalid CSS variable: ${s} = ${l}`);
      });
    } catch (s) {
      console.error("Error applying CSS variables:", s);
    }
  }
  async initializeBranding() {
    var e, n, a;
    const r = Aa(this.options.localization !== !1);
    try {
      const s = await this.initializeBrandConfig(r), l = await this.getCSSVars(
        s.style.Config[bn]
      );
      this.setTranslations(s.translation.Translations || {});
      const c = (n = (e = s == null ? void 0 : s.style) == null ? void 0 : e.Config[bn]) == null ? void 0 : n.common.fontFamily;
      if (c) {
        const d = ((a = c.split(",")[0]) == null ? void 0 : a.trim()) || "Arial", h = `https://fonts.googleapis.com/css2?family=${d.replace(
          /\s+/g,
          "+"
        )}:wght@300;400;500;600;700&display=swap`;
        if (!document.querySelector(`link[data-sdk-font="${d}"]`)) {
          const u = document.createElement("link");
          u.rel = "stylesheet", u.href = h, u.setAttribute("data-sdk-font", d), document.head.appendChild(u);
        }
      }
      return this.applyBranding(l), s;
    } catch (s) {
      console.error("Error fetching branding colors:", s), this.applyBranding(await this.getCSSVars(G)), this.setTranslations(Pa);
    }
  }
  async getCSSVars(e) {
    const {
      common: {
        showLogo: n,
        logoUrl: a,
        brandColor: r,
        favIcon: s,
        background: l,
        fontFamily: c,
        textAlignment: d,
        primaryTextColor: h,
        secondaryTextColor: u
      },
      card: {
        backgroundColor: m,
        width: g,
        padding: p,
        border: b,
        boxShadow: x,
        button: P,
        footer: E,
        input: w,
        social: R,
        header: v,
        subHeader: O
      }
    } = e, {
      top: L,
      right: A,
      bottom: C,
      left: y
    } = p || {}, {
      width: I,
      radius: N,
      color: W
    } = b, {
      top: $,
      right: Z,
      bottom: M,
      left: U
    } = I, {
      topLeft: _,
      topRight: B,
      bottomLeft: z,
      bottomRight: j
    } = N, { fontSize: V, fontWeight: T } = v, { fontSize: F, fontWeight: q } = O, {
      borderColor: ee,
      backgroundColor: me,
      textColor: ue
    } = w, { primaryButton: ge, secondaryButton: ke, link: Ne } = P, {
      color: Fe,
      textColor: Je,
      borderRadius: Ot,
      borderColor: Bt,
      boxShadow: Ft
    } = ge, {
      color: St,
      textColor: jt,
      borderRadius: $t,
      borderColor: K,
      boxShadow: J
    } = ke, { textColor: ae, fontWeight: it } = Ne || {}, {
      layout: Le,
      borderColor: Se,
      textColor: st,
      backgroundColor: gt,
      showIconOnly: ve,
      borderRadius: se,
      boxShadow: He
    } = R, {
      backgroundColor: Mo,
      textColor: No,
      borderTop: Oo
    } = E, le = (vn) => typeof vn == "number" ? `${vn}px` : vn ?? "";
    return {
      // Logo & Brand
      "--sdk-show-logo": n ? "block" : "none",
      "--sdk-logo-url": a ? `url('${a}')` : `url('${G.common.logoUrl}')`,
      "--sdk-brand-primary-color": r || G.common.brandColor,
      "--sdk-brand-primary-ring-color": r ? `${r}05` : G.common.brandColor + "05",
      "--sdk-favicon-url": s ? `url('${s}')` : `url('${G.common.favIcon}')`,
      // Page background/layout
      "--sdk-page-bg-color": l || G.common.background,
      // Typography
      "--sdk-font-family": c || G.common.fontFamily,
      "--sdk-text-align": d || G.common.textAlignment,
      "--sdk-header-font-size": le(V) || G.card.header.fontSize,
      "--sdk-header-font-weight": T || G.card.header.fontWeight,
      "--sdk-subheader-font-size": le(F) || le(G.card.subHeader.fontSize),
      "--sdk-subheader-font-weight": q || G.card.subHeader.fontWeight,
      // Card styles
      "--sdk-card-bg-color": m || G.card.backgroundColor,
      "--sdk-card-width": le(g) || le(G.card.width),
      "--sdk-card-text-color": h || G.common.primaryTextColor,
      "--sdk-card-subtext-color": u || G.common.secondaryTextColor,
      "--sdk-card-padding-top": le(L) || le(G.card.padding.top),
      "--sdk-card-padding-right": le(A) || le(G.card.padding.right),
      "--sdk-card-padding-bottom": le(C) || le(G.card.padding.bottom),
      "--sdk-card-padding-left": le(y) || le(G.card.padding.left),
      "--sdk-card-border-radius-top-left": le(_) || le(G.card.border.radius.topLeft),
      "--sdk-card-border-radius-top-right": le(B) || le(G.card.border.radius.topRight),
      "--sdk-card-border-radius-bottom-left": le(z) || le(G.card.border.radius.bottomLeft),
      "--sdk-card-border-radius-bottom-right": le(j) || le(G.card.border.radius.bottomRight),
      "--sdk-card-border-top-width": le($) || le(G.card.border.width.top),
      "--sdk-card-border-right-width": le(Z) || le(G.card.border.width.right),
      "--sdk-card-border-bottom-width": le(M) || le(G.card.border.width.bottom),
      "--sdk-card-border-left-width": le(U) || le(G.card.border.width.left),
      "--sdk-card-border-color": W || G.card.border.color,
      "--sdk-card-box-shadow": x || G.card.boxShadow,
      // Input styles
      "--sdk-input-border-color": ee || G.card.input.borderColor,
      "--sdk-input-bg-color": me || G.card.input.backgroundColor,
      "--sdk-input-text-color": ue || G.card.input.textColor,
      // Button styles - Primary
      "--sdk-button-primary-bg-color": Fe || G.card.button.primaryButton.color,
      "--sdk-button-primary-text-color": Je || G.card.button.primaryButton.textColor,
      "--sdk-button-primary-radius": le(Ot) || le(G.card.button.primaryButton.borderRadius),
      "--sdk-button-primary-border-color": Bt || G.card.button.primaryButton.borderColor,
      "--sdk-button-primary-shadow": Ft || G.card.button.primaryButton.boxShadow,
      // Button styles - Secondary
      "--sdk-button-secondary-bg-color": St || G.card.button.secondaryButton.color,
      "--sdk-button-secondary-text-color": jt || G.card.button.secondaryButton.textColor,
      "--sdk-button-secondary-radius": le($t) || le(G.card.button.secondaryButton.borderRadius),
      "--sdk-button-secondary-border-color": K || G.card.button.secondaryButton.borderColor,
      "--sdk-button-secondary-shadow": J || G.card.button.secondaryButton.boxShadow,
      // Link styles
      "--sdk-link-text-color": ae || G.card.button.link.textColor,
      "--sdk-link-font-weight": it || G.card.button.link.fontWeight,
      // Social styles
      "--sdk-social-layout": Le ? Le === "top" ? "column" : "column-reverse" : G.card.social.layout === "top" ? "column" : "column-reverse",
      "--sdk-social-border-color": Se || G.card.social.borderColor,
      "--sdk-social-text-color": st || G.card.social.textColor,
      "--sdk-social-bg-color": gt || G.card.social.backgroundColor,
      "--sdk-social-icon-only": ve ? "none" : "block",
      "--sdk-social-border-radius": le(se) || le(G.card.social.borderRadius),
      "--sdk-social-box-shadow": He || G.card.social.boxShadow,
      // Footer styles
      "--sdk-footer-bg-color": Mo || G.card.footer.backgroundColor,
      "--sdk-footer-text-color": No || G.card.footer.textColor,
      "--sdk-footer-border-top": Oo || G.card.footer.borderTop
    };
  }
  async initializeConfig() {
    const e = this.buildConfigUrl();
    return this.appConfig = await this.fetchConfig(e), this.appConfig;
  }
  async initializeBrandConfig(e) {
    const n = this.buildBrandConfigUrl(e);
    try {
      if (!n || !/^https?:\/\//.test(n))
        throw new Error(`Invalid URL: ${n}`);
      const a = await this.fetchBrandConfig(n);
      if (!a || !a.style || !a.style.Config)
        throw new Error("Branding configuration not found or incomplete");
      return a;
    } catch (a) {
      if (console.error("Error fetching brand config:", {
        error: a.message,
        errorCode: a.ErrorCode,
        errorMessage: a.Message,
        url: n
      }), a.ErrorCode === 1106) {
        const r = `cdn-dev.lrinternal.com/languages/en.json?v=${Date.now()}`;
        try {
          throw this.applyBranding(await this.getCSSVars(G)), await this.setTranslations(Pa), new Error("Branding configuration not found (ErrorCode 1106)");
        } catch (s) {
          throw console.error("Failed to fetch default translations:", {
            error: s.message,
            fallbackUrl: r
          }), this.applyBranding(await this.getCSSVars(G)), new Error(
            "Branding configuration not found and failed to fetch default translations"
          );
        }
      } else if (a.ErrorCode)
        throw new Error(
          `Error fetching brand config: ${a.Message || a.message}`
        );
      throw new Error(`Unexpected error fetching brand config: ${a.message}`);
    }
  }
  async initializeConsentOptions() {
    const e = this.buildConsentUrl();
    this.consentOptions = await this.fetchConsentOptions(e);
  }
  buildConfigUrl() {
    const { apiKey: e } = this.options;
    return `https://config-dev.lrinternal.com/ciam/appinfo?apikey=${e}`;
  }
  buildConsentUrl() {
    const { apiKey: e } = this.options;
    return `https://config-dev.lrinternal.com/ciam/consent?apikey=${e}`;
  }
  buildBrandConfigUrl(e) {
    const { apiKey: n, brandName: a, styleName: r } = this.options;
    let s = `https://config-dev.lrinternal.com/brands/config?apikey=${n}`;
    return a && (s += `&b=${a}`), r && (s += `&s=${r}`), e && (s += `&l=${e}`), s;
  }
  async fetchConsentOptions(e) {
    try {
      const n = await fetch(e);
      if (!n.ok)
        throw new Error(`HTTP error! status: ${n.status}`);
      return await n.json();
    } catch (n) {
      throw console.error("Failed to fetch consent options:", n), n;
    }
  }
  async fetchConfig(e) {
    try {
      const n = await fetch(e);
      if (!n.ok)
        throw new Error(`HTTP error! status: ${n.status}`);
      return await n.json();
    } catch (n) {
      throw console.error("Failed to fetch config:", n), n;
    }
  }
  async fetchBrandConfig(e) {
    try {
      const n = await fetch(e, {
        cache: "no-cache"
      });
      if (!n.ok) {
        const a = await n.json();
        throw console.error("Brand config API returned error:", a), a;
      }
      return await n.json();
    } catch (n) {
      throw console.error("Failed to fetch brand config:", n), n;
    }
  }
  async ensureConfig() {
    this.appConfig || await this.initializeConfig();
  }
  async getOptions() {
    if (await this.ensureConfig(), !this.appConfig)
      throw new Error("App configuration not initialized");
    return this.options = Vt(this.appConfig, this.options), this.options;
  }
  async getCaptcha() {
    if (await this.ensureConfig(), !this.appConfig) throw new Error("App configuration not initialized");
    this.options = Vt(this.appConfig, this.options);
    const {
      v2RecaptchaSiteKey: e,
      optionalRecaptchaConfiguration: n,
      v3RecaptchaSiteKey: a,
      isCaptchaEnabled: r,
      hCaptchaSiteKey: s,
      tencentCaptchaAppid: l,
      phoneLogin: c,
      usernameLogin: d
    } = this.options;
    return {
      v2RecaptchaSiteKey: e,
      optionalRecaptchaConfiguration: n,
      v3RecaptchaSiteKey: a,
      isCaptchaEnabled: r,
      hCaptchaSiteKey: s,
      tencentCaptchaAppid: l,
      phoneLogin: c,
      usernameLogin: d
    };
  }
  async getConsentOptions() {
    var e;
    return await this.ensureConfig(), !this.consentOptions && (e = this.appConfig) != null && e.IsConsentManagementEnabled && await this.initializeConsentOptions(), this.consentOptions || [];
  }
  async getConsentEvents(e) {
    var n, a;
    await this.ensureConfig(), !this.consentOptions && (n = this.appConfig) != null && n.IsConsentManagementEnabled && await this.initializeConsentOptions();
    const r = (a = this.consentOptions) == null ? void 0 : a.find((s) => s.Events.find((l) => l.Name === e));
    return (r == null ? void 0 : r.Events.map((s) => ({
      Event: s.Name,
      IsCustom: s.IsCustom
    }))) || [];
  }
  async getSchema(e) {
    switch (e) {
      case "loginFormSchema":
        return Ri(this.options);
      case "forgotPasswordFormSchema":
        return Ei(this.options);
      case "registrationFormSchema":
        return Ii(
          this.options,
          this.consentOptions || []
        );
      case "SocialProviderSchema":
        return pn(this.options);
      case "pinSchema":
        return xi(this.options);
      case "passkeyRegistrationSchema":
        return Ni(this.options, this.consentOptions);
      case "passwordlessLoginSchema":
        return Ai(this.options);
      case "OtpSchema":
        return Li(this.options);
      case "resetPasswordSchema":
        return Pi();
      case "changePassword":
        return Ti();
      default:
        if (!sn[e])
          throw new Error(`Schema for "${e}" not found`);
        return sn[e];
    }
  }
  getMFAMethods() {
    var e, n, a, r, s;
    const l = [], c = this.appConfig;
    return (e = c == null ? void 0 : c.TwoFactorAuthentication) != null && e.IsSmsOTPAuthenticator && l.push({
      id: "sms_otp",
      name: "SMS OTP",
      description: "Use your mobile number to recieve an otp"
    }), (n = c == null ? void 0 : c.TwoFactorAuthentication) != null && n.IsEmailOTPAuthenticator && l.push({
      id: "email_otp",
      name: "Email OTP",
      description: "Use your email address to recieve an otp"
    }), (a = c == null ? void 0 : c.TwoFactorAuthentication) != null && a.IsGoogleAuthenticator && l.push({
      id: "totp",
      name: "TOTP",
      description: "Use the authenticator app to get a verification code"
    }), (r = c == null ? void 0 : c.TwoFactorAuthentication) != null && r.IsPushAuthenticator && l.push({
      id: "push_register",
      name: "Push Notification",
      description: "Use the push authenticator to verify your login"
    }), (s = c == null ? void 0 : c.TwoFactorAuthentication) != null && s.IsDuoSecurityAuthenticator && l.push({
      id: "duo_security",
      name: "Duo Security",
      description: "Use the duo auth security to verify your login"
    }), l;
  }
  async getSteps(e) {
    await this.ensureConfig();
  }
  async clearCache() {
    const e = await this.getCacheKey();
    localStorage.removeItem(e);
  }
  static async createLoginRadius(e) {
    const n = new nn(e);
    return await n.initialize(), n;
  }
};
Q(Zn, "CACHE_KEY_PREFIX", "lr-core-cache-"), Q(Zn, "CACHE_TTL", 5 * 60 * 1e3);
let ns = Zn;
class as {
  constructor(e) {
    Q(this, "options"), Q(this, "controller"), Q(this, "util"), Q(this, "socialLogin", (n, a) => {
      Hn.register("socialCalls", (r) => {
        if (this.options.noCallbackForSocialLogin) {
          const s = (l) => {
            const { data: c } = l;
            c.access_token ? n(c) : a == null || a(c);
          };
          this.controller.pingForSocialLogin(
            r,
            s
          );
        }
      });
    }), Q(this, "openWindow", (n) => {
      if (this.options.isMobile) {
        let a = "no";
        this.options.debugMode && (a = "yes");
        const r = window.open(n, "_blank", `location=${a}`);
        r.addEventListener("loadstop", function(s) {
          const l = function(c) {
            const d = new RegExp(`[\\?&]${c}=([^&#]*)`).exec(
              s.url
            );
            return d === null ? "" : decodeURIComponent(d[1].replace(/\+/g, " "));
          }("token");
          l !== null && l !== "" && (r.close(), window.html5passToken(l));
        });
      } else {
        const a = document.createElement("a");
        a.href = n;
        const r = this.util.getQueryParameterByName(
          "provider",
          a.search
        );
        let s = "";
        this.options.noCallbackForSocialLogin && (s = this.util.randomString(16), n += `&nocallback=true&callbackguid=${s}`);
        const l = r && r.toLowerCase() === "facebook" ? "650" : "450", c = this.options.customizeSocialPopup || `menubar=1,resizable=1,width=${l},height=450,scrollbars=1`;
        return window.open(n, "lrpopupchildwindow", c), Hn.call("socialCalls", s), !1;
      }
      return !1;
    }), Q(this, "addSocialEndpointOptions", (n) => {
      const a = this.util.getQueryParameterByName("scope");
      this.options.scope === "" && a && (this.options.scope = a);
      let r = `&callback=${this.options.callbackUrl}&same_window=${this.options.callbackInsideSameWindow}&is_access_token=${this.options.accessTokenResponse}&callbacktype=${this.options.callbackType}&disablesignup=${this.options.disableSignup}`;
      if (r.indexOf("scope") === -1 && (r += `&scope=${this.options.scope}`), this.options.isMobile && (r += "&ismobile=true"), n && (r += "&ac_linking=true"), this.options.isCustomScope && (r += "&is_custom_scope=true"), this.options.isB2BEnabled && this.util.getHashParam("vtype") === "orginvite") {
        const s = this.util.getHashParam("vtoken");
        s && (r += `&invitation_token=${s}`);
      }
      return r;
    }), this.options = e, this.controller = new co(e), this.util = Qn();
  }
}
const gn = (t) => ({
  ...new as(t)
}), os = (t) => {
  const e = !!t.getAccessToken();
  return {
    getConsentToken: () => t.getConsentToken() || "",
    getMFAToken: () => t.getMFAToken() || "",
    getPinAuthToken: () => t.getPinAuthToken() || "",
    getPrivacyPolicyAccessToken: () => t.getPrivacyPolicyAccessToken() || "",
    getAccessToken: () => t.getAccessToken() || "",
    setConsentToken: (n) => t.setConsentToken(n),
    setAccessToken: (n) => t.setAccessToken(n),
    setMFAToken: (n) => t.setMFAToken(n),
    setPinAuthToken: (n) => t.setPinAuthToken(n),
    setPrivacyPolicyAccessToken: (n) => t.setPrivacyPolicyAccessToken(n),
    removeConsentToken: () => t.removeConsentToken(),
    removeMFAToken: () => t.removeMFAToken(),
    removePinAuthToken: () => t.removePinAuthToken(),
    removeAccessToken: () => t.removeAccessToken(),
    removePrivacyPolicyAccessToken: () => t.removePrivacyPolicyAccessToken(),
    getInvitationToken: () => t.getInvitationToken() || null,
    setInvitationToken: (n) => t.setInvitationToken(n),
    removeInvitationToken: () => t.removeInvitationToken(),
    // Additional methods
    getUser: () => new Promise((n) => {
      const a = t.getAccessToken();
      if (!a) {
        console.error("No access token available"), n(null);
        return;
      }
      t.getAccount(
        a,
        (r) => {
          r.success && r.data ? n(r.data) : (console.error("Failed to fetch user data:", r.error), n(null));
        },
        (r) => {
          console.error("Error in getUser:", r), n(null);
        }
      );
    }),
    getEmail: () => t.getEmail() || null,
    getPhone: () => t.getPhoneId() || null,
    getUsername: () => t.getUsername() || null,
    setEmail: (n) => t.setEmail(n),
    setPhone: (n) => t.setPhoneId(n),
    setUsername: (n) => t.setUsername(n),
    removeEmail: () => t.removeEmail(),
    removePhone: () => t.removePhoneId(),
    removeUsername: () => t.removeUsername(),
    isAuthenticated: e,
    logout: () => {
      t.logout();
    }
  };
}, Tt = {
  login: {
    component: "login",
    condition: () => !0,
    getNext: (t, e) => {
      var n, a, r, s, l, c, d, h, u, m, g, p, b, x, P, E, w, R, v, O, L, A, C, y, I, N, W, $, Z, M;
      if ((n = t == null ? void 0 : t.data) != null && n.PINAuthToken || (((r = (a = t.data) == null ? void 0 : a.Profile) == null ? void 0 : r.PIN) === null || !((c = (l = (s = t.data) == null ? void 0 : s.Profile) == null ? void 0 : l.PIN) != null && c.PIN)) && ((h = (d = t.data) == null ? void 0 : d.Profile) != null && h.FirstLogin && (u = e.PINConfiguration) != null && u.AskOnlyOnFirstLogin || (m = e.PINConfiguration) != null && m.AskOnLogin))
        return "set_login_pin";
      if (e != null && e.twoFactorAuthentication || e != null && e.optionalTwoFactorAuthentication)
        if ([
          (p = (g = t.data) == null ? void 0 : g.SecondFactorAuthentication) == null ? void 0 : p.IsEmailOtpAuthenticatorVerified,
          (x = (b = t.data) == null ? void 0 : b.SecondFactorAuthentication) == null ? void 0 : x.IsOTPAuthenticatorVerified,
          (E = (P = t.data) == null ? void 0 : P.SecondFactorAuthentication) == null ? void 0 : E.IsGoogleAuthenticatorVerified,
          (R = (w = t.data) == null ? void 0 : w.SecondFactorAuthentication) == null ? void 0 : R.IsPushDeviceRegistered,
          (O = (v = t.data) == null ? void 0 : v.SecondFactorAuthentication) == null ? void 0 : O.IsDuoAuthenticatorVerified
        ].filter(Boolean).length === 1) {
          if ((A = (L = t.data) == null ? void 0 : L.SecondFactorAuthentication) != null && A.IsEmailOtpAuthenticatorVerified)
            return "email_otp";
          if ((y = (C = t.data) == null ? void 0 : C.SecondFactorAuthentication) != null && y.IsOTPAuthenticatorVerified)
            return "sms_otp";
          if ((N = (I = t.data) == null ? void 0 : I.SecondFactorAuthentication) != null && N.IsGoogleAuthenticatorVerified)
            return "totp";
          if (($ = (W = t.data) == null ? void 0 : W.SecondFactorAuthentication) != null && $.IsPushDeviceRegistered)
            return "push_login";
          if ((M = (Z = t.data) == null ? void 0 : Z.SecondFactorAuthentication) != null && M.IsDuoAuthenticatorVerified)
            return "duo_security";
        } else
          return t != null && t.isDuoCallBackSuccess ? "end" : "mfa_selector";
      return "end";
    },
    handleError: (t, e) => {
      var n, a;
      return (t == null ? void 0 : t.errorCode) === 970 ? !e.optionalEmailVerification && !e.disabledEmailVerification ? (n = e.templateVerificationTypes) != null && n.Registration ? ((a = e.templateVerificationTypes) == null ? void 0 : a.Registration) === "OTP" ? "verify_email_otp" : "verify_email_link" : e.otpEmailVerification ? "verify_email_otp" : "verify_email_link" : "" : (t == null ? void 0 : t.errorCode) === 1066 ? "verify_sms_otp" : (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : (t == null ? void 0 : t.errorCode) === 1198 ? "account_suspended" : (t == null ? void 0 : t.errorCode) === 991 ? "account_blocked" : "";
    },
    handleSecondaryAction: (t, e, n) => {
      var a;
      switch (t) {
        case "passwordless_login_email":
          return n.passwordlessLogin && ((a = n.templateVerificationTypes) == null ? void 0 : a.OneClickSignin) === "MAGICLINK" ? "verify_passwordless_login_email" : "verify_passwordless_login_email_otp";
        case "passwordless_login_sms":
          return n.passwordlessLoginOTP ? "verify_passwordless_login_sms" : "";
        case "passkey_login":
          return n.isPassKeysEnabled ? "end" : "";
        default:
          return "";
      }
    }
  },
  passwordless_login: {
    component: "passwordless_login",
    condition: (t) => t.passwordlessLogin,
    getNext: (t, e) => {
      var n, a;
      return (n = t.data.Data) != null && n.Sid && e.passwordlessLoginOTP ? "verify_passwordless_login_sms" : e.passwordlessLogin && ((a = e.templateVerificationTypes) == null ? void 0 : a.OneClickSignin) === "MAGICLINK" ? "verify_passwordless_login_email" : "verify_passwordless_login_email_otp";
    },
    handleBack: (t) => "login"
  },
  verify_passwordless_login_sms: {
    component: "verify_passwordless_login_sms",
    condition: (t) => t.passwordlessLoginOTP,
    getNext: () => "end",
    handleBack: (t) => "passwordless_login",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  verify_passwordless_login_email: {
    component: "verify_passwordless_login_email",
    condition: (t) => {
      var e;
      return t.passwordlessLogin && ((e = t.templateVerificationTypes) == null ? void 0 : e.OneClickSignin) === "MAGICLINK";
    },
    getNext: () => "end",
    handleBack: (t) => "passwordless_login",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  verify_passwordless_login_email_otp: {
    component: "verify_passwordless_login_email_otp",
    condition: (t) => {
      var e;
      return t.passwordlessLogin && ((e = t.templateVerificationTypes) == null ? void 0 : e.OneClickSignin) === "OTP";
    },
    getNext: () => "end",
    handleBack: (t) => "passwordless_login_email",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  set_login_pin: {
    component: "set_login_pin",
    condition: () => !0,
    getNext: () => "end",
    handleError: (t) => (t == null ? void 0 : t.errorCode) === 1246 ? "login" : (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  login_by_pin: {
    component: "login_by_pin",
    condition: (t) => t.isPINAuthentication,
    getNext: () => "end",
    handleError: (t) => (t == null ? void 0 : t.errorCode) === 1246 ? "login" : (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  mfa_selector: {
    component: "mfa_selector",
    condition: (t) => (t.twoFactorAuthentication || t.optionalTwoFactorAuthentication) ?? !1,
    getNext: (t, e, n) => {
      var a, r, s, l, c, d, h, u, m;
      return (t == null ? void 0 : t.id) === "sms_otp" && (s = (r = (a = n == null ? void 0 : n.login) == null ? void 0 : a.data) == null ? void 0 : r.SecondFactorAuthentication) != null && s.OTPPhoneNo && (d = (c = (l = n == null ? void 0 : n.login) == null ? void 0 : l.data) == null ? void 0 : c.SecondFactorAuthentication) != null && d.IsOTPAuthenticatorVerified ? "sms_otp" : (t == null ? void 0 : t.id) === "sms_otp" ? "update_phone" : (t == null ? void 0 : t.id) === "skip_mfa" ? "end" : (t == null ? void 0 : t.id) === "push" ? (m = (u = (h = n == null ? void 0 : n.login) == null ? void 0 : h.data) == null ? void 0 : u.SecondFactorAuthentication) != null && m.IsPushDeviceRegistered ? "push_login" : "push_register" : (t == null ? void 0 : t.id) || "end";
    },
    handleBack: (t) => "login"
  },
  sms_otp: {
    component: "sms_otp",
    condition: (t) => t.smsOTPAuthentication,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "",
    handleBack: (t) => "mfa_selector",
    handleSecondaryAction: (t, e, n) => "verify_backup_code"
  },
  update_phone: {
    component: "update_phone",
    condition: (t) => t.smsOTPAuthentication,
    getNext: () => "sms_otp",
    handleBack: () => "mfa_selector"
  },
  email_otp: {
    component: "email_otp",
    condition: (t) => t.emailOTPAuthentication,
    getNext: () => "end",
    handleBack: () => "mfa_selector",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "",
    handleSecondaryAction: (t, e, n) => "verify_backup_code"
  },
  totp: {
    component: "totp",
    condition: (t) => t.qrCodeAuthentication,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "",
    handleBack: (t) => "mfa_selector",
    handleSecondaryAction: (t, e, n) => "verify_backup_code"
  },
  push_register: {
    component: "push_register",
    condition: (t) => t.pushNotificationAuthentication,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  push_login: {
    component: "push_login",
    condition: (t) => t.pushNotificationAuthentication,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "",
    handleSecondaryAction: (t, e, n) => "verify_backup_code"
  },
  duo_security: {
    component: "duo_security",
    condition: (t) => t.duoAuthentication,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "",
    handleSecondaryAction: (t, e, n) => "verify_backup_code"
  },
  verify_backup_code: {
    component: "verify_backup_code",
    condition: (t) => !0,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "",
    handleBack: (t) => t.nextStepId ? t.nextStepId : "mfa_selector"
  },
  forgot_password: {
    component: "forgot_password",
    condition: () => !0,
    getNext: (t, e) => {
      var n, a, r;
      return (a = (n = t.data) == null ? void 0 : n.Data) != null && a.Sid ? "reset_password_by_phone_otp" : ((r = e.templateVerificationTypes) == null ? void 0 : r.ForgotPassword) === "MAGICLINK" ? "magic_link" : "reset_password_by_otp";
    },
    handleError: (t) => (t == null ? void 0 : t.errorCode) === 1245 ? "login" : "",
    handleBack: (t) => "login"
  },
  reset_password_by_token: {
    component: "reset_password_by_token",
    condition: () => !0,
    getNext: () => "login",
    handleError: (t) => (t == null ? void 0 : t.errorCode) === 1245 ? "login" : "",
    handleBack: (t) => "login"
  },
  reset_password_by_otp: {
    component: "reset_password_by_otp",
    condition: (t) => {
      var e;
      return ((e = t.templateVerificationTypes) == null ? void 0 : e.ForgotPassword) === "OTP";
    },
    getNext: () => "login",
    handleError: (t) => (t == null ? void 0 : t.errorCode) === 1245 ? "login" : "",
    handleBack: (t) => "login"
  },
  reset_password_by_phone_otp: {
    component: "reset_password_by_phone_otp",
    condition: (t) => t.phoneLogin,
    getNext: () => "login",
    handleError: (t) => (t == null ? void 0 : t.errorCode) === 1245 ? "login" : "",
    handleBack: (t) => "login"
  },
  passkey_login: {
    component: "passkey_login",
    condition: (t) => t.passkeyAuthentication,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  magic_link: {
    component: "magic_link",
    condition: (t) => {
      var e;
      return ((e = t.templateVerificationTypes) == null ? void 0 : e.ForgotPassword) === "MAGICLINK";
    },
    getNext: () => "end",
    handleBack: (t) => "forgot_password",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  verify_email_otp: {
    component: "verify_email_otp",
    condition: (t) => {
      var e, n;
      return !t.optionalEmailVerification && !t.disabledEmailVerification && (e = t.templateVerificationTypes) != null && e.Registration ? ((n = t.templateVerificationTypes) == null ? void 0 : n.Registration) === "OTP" : t.otpEmailVerification;
    },
    getNext: (t) => {
      var e;
      return (e = t.data) != null && e.Email ? "email_verified" : "end";
    },
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "",
    handleBack: (t) => "login"
  },
  verify_email_link: {
    component: "verify_email_link",
    condition: (t) => {
      var e, n;
      return !t.optionalEmailVerification && !t.disabledEmailVerification && (e = t.templateVerificationTypes) != null && e.Registration ? ((n = t.templateVerificationTypes) == null ? void 0 : n.Registration) === "MAGICLINK" : !t.otpEmailVerification;
    },
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  verify_sms_otp: {
    component: "verify_sms_otp",
    condition: (t) => t.phoneLogin,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  consent_form: {
    component: "consent_form",
    condition: (t) => t.isConsentManagementEnabled,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  register: {
    component: "register",
    condition: () => !0,
    getNext: (t, e) => {
      var n, a, r;
      return e.RegistrationFormSchema.find(
        (s) => s.name === "emailid" && s.rules.includes("required")
      ) ? !e.disabledEmailVerification && !((n = t.data) != null && n.Profile) ? (a = e.templateVerificationTypes) != null && a.Registration ? ((r = e.templateVerificationTypes) == null ? void 0 : r.Registration) === "OTP" ? "verify_email_otp" : "verify_email_link" : e.otpEmailVerification ? "verify_email_otp" : "verify_email_link" : e.phoneLogin && e.RegistrationFormSchema.find(
        (s) => s.name === "phoneid"
      ) && t.data.Profile.PhoneId ? "verify_sms_otp" : "end" : e.phoneLogin && e.RegistrationFormSchema.find((s) => s.name === "phoneid") ? "verify_sms_otp" : "end";
    },
    handleError: (t, e) => {
      var n, a;
      return (t == null ? void 0 : t.errorCode) === 970 ? e.disabledEmailVerification ? "" : (n = e.templateVerificationTypes) != null && n.Registration ? ((a = e.templateVerificationTypes) == null ? void 0 : a.Registration) === "OTP" ? "verify_email_otp" : "verify_email_link" : e.otpEmailVerification ? "verify_email_otp" : "verify_email_link" : (t == null ? void 0 : t.errorCode) === 1066 ? e.phoneLogin ? "verify_sms_otp" : "" : (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : "";
    }
  },
  passkey_registration: {
    component: "passkey_registration",
    condition: (t) => t.isPassKeysEnabled,
    getNext: (t, e) => {
      var n, a, r;
      return e.RegistrationFormSchema.find(
        (s) => s.name === "emailid" && s.rules.includes("required")
      ) ? !e.disabledEmailVerification && !((n = t.data) != null && n.Profile) ? (a = e.templateVerificationTypes) != null && a.Registration ? ((r = e.templateVerificationTypes) == null ? void 0 : r.Registration) === "OTP" ? "verify_email_otp" : "verify_email_link" : e.otpEmailVerification ? "verify_email_otp" : "verify_email_link" : e.phoneLogin && e.RegistrationFormSchema.find(
        (s) => s.name === "phoneid"
      ) && t.data.Profile.PhoneId ? "verify_sms_otp" : "end" : e.phoneLogin && e.RegistrationFormSchema.find((s) => s.name === "phoneid") ? "verify_sms_otp" : "end";
    },
    handleBack: (t) => "register",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1226 ? "consent_form" : (t == null ? void 0 : t.errorCode) === 1194 || (t == null ? void 0 : t.errorCode) === 1196 ? "privacy_policy" : ""
  },
  privacy_policy: {
    component: "privacy_policy",
    condition: (t) => !0,
    getNext: () => "end",
    handleError: (t, e) => (t == null ? void 0 : t.errorCode) === 1194 ? "privacy_policy" : ""
  },
  org_invite: {
    component: "org_invite",
    condition: (t) => t.isB2BEnabled,
    getNext: (t, e, n) => t.data.Isemailexist ? "login" : "register",
    handleError: (t, e) => ""
  },
  email_verified: {
    component: "email_verified",
    condition: () => !0,
    getNext: () => "end",
    handleBack: (t) => "login"
  },
  account_blocked: {
    component: "account_blocked",
    condition: () => !0,
    getNext: () => "end",
    handleError: (t) => ""
  },
  account_suspended: {
    component: "account_suspended",
    condition: () => !0,
    getNext: () => "end",
    handleBack: () => "login",
    handleError: (t) => ""
  },
  account_restricted: {
    component: "account_restricted",
    condition: () => !0,
    getNext: () => "end",
    handleError: (t) => ""
  }
};
class ln extends Error {
  constructor(e, n, a = "") {
    super(e), Q(this, "errorCode"), Q(this, "description"), this.name = "CommonError", this.errorCode = n, this.description = a, Error.captureStackTrace && Error.captureStackTrace(this, ln);
  }
}
const rs = (t) => !Object.prototype.hasOwnProperty.call(t, "errorCode");
function ye(t, e) {
  if (rs(e)) {
    const { message: n, description: a } = e;
    throw new ln(n, t.toUpperCase(), a);
  } else {
    const { message: n, description: a, errorCode: r } = e;
    throw new ln(n, r ?? t.toUpperCase(), a);
  }
}
const is = ({
  loading: t,
  error: e,
  retry: n,
  labels: a = {
    loading: "Loading...",
    error: "An error occurred",
    retry: "Try Again"
  }
}) => /* @__PURE__ */ i(
  "div",
  {
    className: `loginradius-loading-container ${t || e ? "loginradius-loading-visible" : "loginradius-loading-hidden"}`,
    role: "status",
    "aria-live": "polite",
    "aria-hidden": !t && !e,
    children: /* @__PURE__ */ f("div", { className: "loginradius-loading-form-wrapper", children: [
      t && /* @__PURE__ */ f("div", { className: "loginradius-loading-content", children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: "loginradius-loading-spinner",
            "aria-label": "labels.loading",
            role: "img"
          }
        ),
        /* @__PURE__ */ f("div", { className: "loginradius-loading-form", children: [
          /* @__PURE__ */ f("div", { className: "loginradius-loading-field", children: [
            /* @__PURE__ */ i("div", { className: "loginradius-loading-label-skeleton" }),
            /* @__PURE__ */ i("div", { className: "loginradius-loading-input-skeleton" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-loading-field", children: [
            /* @__PURE__ */ i("div", { className: "loginradius-loading-label-skeleton" }),
            /* @__PURE__ */ i("div", { className: "loginradius-loading-input-skeleton" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-loading-field", children: [
            /* @__PURE__ */ i(
              "div",
              {
                className: "loginradius-loading-label-skeleton",
                style: { width: "45%" }
              }
            ),
            /* @__PURE__ */ i("div", { className: "loginradius-loading-input-skeleton" })
          ] }),
          /* @__PURE__ */ i("div", { className: "loginradius-loading-button-skeleton" })
        ] })
      ] }),
      e && /* @__PURE__ */ f("div", { className: "loginradius-loading-content", children: [
        /* @__PURE__ */ f("div", { className: "loginradius-loading-form", children: [
          /* @__PURE__ */ f("div", { className: "loginradius-loading-field", children: [
            /* @__PURE__ */ i("div", { className: "loginradius-loading-label-skeleton" }),
            /* @__PURE__ */ i("div", { className: "loginradius-loading-input-skeleton" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-loading-field", children: [
            /* @__PURE__ */ i("div", { className: "loginradius-loading-label-skeleton" }),
            /* @__PURE__ */ i("div", { className: "loginradius-loading-input-skeleton" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-loading-field", children: [
            /* @__PURE__ */ i(
              "div",
              {
                className: "loginradius-loading-label-skeleton",
                style: { width: "45%" }
              }
            ),
            /* @__PURE__ */ i("div", { className: "loginradius-loading-input-skeleton" })
          ] }),
          /* @__PURE__ */ i("div", { className: "loginradius-loading-button-skeleton" })
        ] }),
        /* @__PURE__ */ f(
          "p",
          {
            className: "loginradius-loading-error-message",
            "aria-live": "assertive",
            children: [
              a.error,
              ": ",
              e.message
            ]
          }
        ),
        n && /* @__PURE__ */ i(
          "button",
          {
            className: "loginradius-loading-retry-button",
            onClick: (r) => {
              r.preventDefault(), n();
            },
            type: "button",
            "aria-label": a.retry,
            children: a.retry
          }
        )
      ] })
    ] })
  }
), Xn = Ta(void 0), Bf = ({
  options: t,
  children: e
}) => {
  if (!t.apiKey)
    throw new Error("LoginRadiusProvider requires an apiKey");
  const [n, a] = k(null), [r, s] = k(!0), [l, c] = k(null), [d, h] = k(null), [u, m] = k(null), [g, p] = k(null), [b, x] = k({}), P = ne(() => {
    let R = !0;
    return s(!0), c(null), ns.createLoginRadius(t).then((v) => {
      R && (a(v), s(!1));
    }).catch((v) => {
      R && (c(
        v instanceof Error ? v : new Error("Initialization failed")
      ), s(!1));
    }), () => {
      R = !1;
    };
  }, [t.apiKey, t.styleName]);
  X(() => P(), [P]), X(() => {
    n && (n.getOptions().then((R) => {
      m(R);
    }), n.getTranslation().then((R) => (x(R), R)));
  }, [n]);
  const E = ne(() => {
    P();
  }, [P]), w = be(
    () => ({
      lrInstance: n,
      options: u,
      content: b,
      loading: r,
      error: l,
      retry: E,
      setTimer: p,
      timer: g,
      secondFactorConfig: d,
      setSecondFactorConfig: h
    }),
    [
      n,
      r,
      l,
      E,
      d,
      u,
      b,
      g
    ]
  );
  return /* @__PURE__ */ f("div", { style: { position: "relative", minHeight: 300 }, children: [
    /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(is, { loading: r, error: l, retry: E }) }),
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
          opacity: r || l ? 0 : 1,
          pointerEvents: r || l ? "none" : "auto",
          position: r || l ? "absolute" : "static",
          top: 0,
          left: 0,
          width: "100%"
        },
        children: !r && !l && /* @__PURE__ */ i(Xn.Provider, { value: w, children: e })
      }
    )
  ] });
}, It = () => {
  const t = qn(Xn);
  if (!t)
    throw new Error(
      "useLoginRadiusSDK must be used within a LoginRadiusProvider"
    );
  return t;
}, re = () => {
  const t = qn(Xn);
  if (!t)
    throw new Error("useLoginRadiusSDK must be used within a LoginRadiusProvider");
  return t;
}, Y = (t) => {
  const {
    ButtonText: e,
    children: n,
    onClick: a,
    className: r = "",
    style: s,
    type: l = "submit",
    ButtonId: c
  } = t, d = `${fe.idPrefix}${l}-${c}`;
  return /* @__PURE__ */ i(
    "button",
    {
      className: `loginradius-link-button ${r}`,
      id: d,
      style: {
        ...s
      },
      onClick: a,
      type: "button",
      children: e || n || "Link"
    }
  );
}, Ee = ({
  field: t,
  fieldId: e,
  value: n,
  error: a,
  touched: r,
  onChange: s,
  switchText: l,
  onSwitchClick: c,
  type: d = "text",
  // Default to "text" if not provided
  className: h = "",
  style: u
}) => {
  const m = r && !!a, g = `${fe.idPrefix}${e}-${t.name}`;
  return /* @__PURE__ */ f(
    "div",
    {
      className: `loginradius-input-field-container ${m ? "loginradius-error-icon" : ""}`,
      children: [
        /* @__PURE__ */ f("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ i("label", { htmlFor: t.name, className: "loginradius-input-label", children: t.display }),
          l && c && /* @__PURE__ */ i(
            Y,
            {
              ButtonText: l,
              onClick: c,
              ButtonId: H.switch
            }
          )
        ] }),
        /* @__PURE__ */ i(
          "input",
          {
            type: d === "username" ? "text" : d,
            placeholder: d === "email" ? "Enter your email" : d === "username" ? "Enter your User Name" : `Enter your ${t.display}`,
            id: g,
            name: t.name,
            value: n,
            onChange: s,
            style: { ...u },
            className: `${h} loginradius-input-field ${m ? "loginradius-error-field" : ""} ${t.disabled ? "loginradius-disabled-field" : ""} `,
            "aria-label": t.display,
            "aria-invalid": m,
            autoComplete: t.autoComplete,
            "aria-describedby": m ? `${t.name}-error` : void 0,
            "aria-placeholder": d === "email" ? "Enter your email" : d === "username" ? "Enter your User Name" : `Enter your ${t.display}`,
            disabled: t.disabled
          }
        ),
        m && /* @__PURE__ */ i("p", { id: `${t.name}-error`, className: "loginradius-error-message", children: a })
      ]
    }
  );
}, ss = ({
  field: t,
  fieldId: e,
  disabled: n = !1,
  value: a,
  error: r,
  touched: s,
  onChange: l,
  className: c = "",
  style: d
}) => {
  const [h, u] = k(!1), [m, g] = k(!1), p = s && !!r, b = `${fe.idPrefix}${e}-${t.name}`, E = { ...{
    width: "100%",
    padding: "10px 16px",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    borderWidth: "1px",
    borderStyle: "solid"
  }, ...{
    borderColor: p ? "red" : h ? "var(--sdk-body-primary-color, #3B82F6)" : "var(--sdk-input-border-color, #D1D5DB)",
    backgroundColor: "var(--sdk-input-bg-color, #FFFFFF)",
    color: "var(--sdk-body-text-color, #111827)",
    boxShadow: p ? "0 0 0 2px #ff000033" : m ? "0 0 0 2px var(--sdk-body-primary-ring-color, #3B82F6)" : "0 0 0 2px transparent"
  }, ...d };
  return /* @__PURE__ */ f("div", { className: "loginradius-input-field-container", children: [
    /* @__PURE__ */ i("label", { htmlFor: t.name, className: "loginradius-input-label", children: t.display }),
    /* @__PURE__ */ i(
      "textarea",
      {
        disabled: t.readonly || n,
        id: b,
        name: t.name,
        value: a,
        onChange: l,
        onMouseEnter: () => u(!0),
        onMouseLeave: () => u(!1),
        onFocus: () => g(!0),
        onBlur: () => g(!1),
        style: E,
        className: `${c} loginradius-input-field ${p ? "loginradius-error-field" : ""} `,
        "aria-label": t.display,
        "aria-invalid": p,
        "aria-describedby": p ? `${t.name}-error` : void 0
      }
    ),
    p && /* @__PURE__ */ i("p", { id: `${t.name}-error`, className: "loginradius-error-message", children: r })
  ] });
}, Mt = ({
  field: t,
  fieldId: e,
  value: n,
  error: a,
  touched: r,
  onChange: s
}) => {
  const l = r && !!a, c = `${fe.idPrefix}${e}-${t.name}`;
  return /* @__PURE__ */ f("div", { className: "loginradius-input-field-container", children: [
    /* @__PURE__ */ f("div", { style: { display: "flex", alignItems: "center" }, children: [
      /* @__PURE__ */ i(
        "input",
        {
          type: "checkbox",
          id: c,
          name: t.name,
          checked: n,
          onChange: s,
          className: `loginradius-input-checkbox ${l ? "loginradius-error-checkbox" : ""} ${n ? "checked" : ""}`,
          "aria-label": t.display,
          "aria-invalid": l,
          "aria-describedby": l ? `${t.name}-error` : void 0
        }
      ),
      /* @__PURE__ */ i(
        "label",
        {
          htmlFor: t.name,
          style: { marginLeft: "10px" },
          className: "loginradius-input-label",
          children: t.display
        }
      )
    ] }),
    l && /* @__PURE__ */ i("p", { id: `${t.name}-error`, className: "loginradius-error-message", children: a })
  ] });
};
function ls({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
  }));
}
const cs = /* @__PURE__ */ o.forwardRef(ls);
function ds({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
  }));
}
const us = /* @__PURE__ */ o.forwardRef(ds);
function hs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
  }));
}
const ms = /* @__PURE__ */ o.forwardRef(hs);
function fs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
  }));
}
const ps = /* @__PURE__ */ o.forwardRef(fs);
function gs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
  }));
}
const ws = /* @__PURE__ */ o.forwardRef(gs);
function vs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
  }));
}
const ys = /* @__PURE__ */ o.forwardRef(vs);
function ks({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const Cs = /* @__PURE__ */ o.forwardRef(ks);
function bs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
  }));
}
const xs = /* @__PURE__ */ o.forwardRef(bs);
function Ls({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
  }));
}
const Rs = /* @__PURE__ */ o.forwardRef(Ls);
function As({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
  }));
}
const Es = /* @__PURE__ */ o.forwardRef(As);
function Ps({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
  }));
}
const Ts = /* @__PURE__ */ o.forwardRef(Ps);
function Is({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
  }));
}
const Ms = /* @__PURE__ */ o.forwardRef(Is);
function Ns({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
  }));
}
const Os = /* @__PURE__ */ o.forwardRef(Ns);
function Bs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const Fs = /* @__PURE__ */ o.forwardRef(Bs);
function Ss({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
  }));
}
const js = /* @__PURE__ */ o.forwardRef(Ss);
function $s({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
  }));
}
const _s = /* @__PURE__ */ o.forwardRef($s);
function Vs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
  }));
}
const Ds = /* @__PURE__ */ o.forwardRef(Vs);
function Us({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
  }));
}
const Hs = /* @__PURE__ */ o.forwardRef(Us);
function Zs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
  }));
}
const Ws = /* @__PURE__ */ o.forwardRef(Zs);
function qs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
  }));
}
const Ks = /* @__PURE__ */ o.forwardRef(qs);
function zs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
  }));
}
const Gs = /* @__PURE__ */ o.forwardRef(zs);
function Js({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
  }));
}
const Qs = /* @__PURE__ */ o.forwardRef(Js);
function Xs({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
  }));
}
const Ys = /* @__PURE__ */ o.forwardRef(Xs);
function el({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
  }));
}
const tl = /* @__PURE__ */ o.forwardRef(el);
function nl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const al = /* @__PURE__ */ o.forwardRef(nl);
function ol({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
  }));
}
const rl = /* @__PURE__ */ o.forwardRef(ol);
function il({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
  }));
}
const sl = /* @__PURE__ */ o.forwardRef(il);
function ll({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
  }));
}
const cl = /* @__PURE__ */ o.forwardRef(ll);
function dl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
  }));
}
const ul = /* @__PURE__ */ o.forwardRef(dl);
function hl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m0 0 6.75-6.75M12 19.5l-6.75-6.75"
  }));
}
const ml = /* @__PURE__ */ o.forwardRef(hl);
function fl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 12h-15m0 0 6.75 6.75M4.5 12l6.75-6.75"
  }));
}
const pl = /* @__PURE__ */ o.forwardRef(fl);
function gl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.5 12h15m0 0-6.75-6.75M19.5 12l-6.75 6.75"
  }));
}
const wl = /* @__PURE__ */ o.forwardRef(gl);
function vl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 19.5v-15m0 0-6.75 6.75M12 4.5l6.75 6.75"
  }));
}
const yl = /* @__PURE__ */ o.forwardRef(vl);
function kl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
  }));
}
const Cl = /* @__PURE__ */ o.forwardRef(kl);
function bl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
  }));
}
const xl = /* @__PURE__ */ o.forwardRef(bl);
function Ll({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
  }));
}
const Rl = /* @__PURE__ */ o.forwardRef(Ll);
function Al({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"
  }));
}
const El = /* @__PURE__ */ o.forwardRef(Al);
function Pl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
  }));
}
const Tl = /* @__PURE__ */ o.forwardRef(Pl);
function Il({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.99 16.5-3.75 3.75m0 0L4.49 16.5m3.75 3.75V3.75h11.25"
  }));
}
const Ml = /* @__PURE__ */ o.forwardRef(Il);
function Nl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.99 7.5 8.24 3.75m0 0L4.49 7.5m3.75-3.75v16.499h11.25"
  }));
}
const Ol = /* @__PURE__ */ o.forwardRef(Nl);
function Bl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.99 16.5 3.75 3.75m0 0 3.75-3.75m-3.75 3.75V3.75H4.49"
  }));
}
const Fl = /* @__PURE__ */ o.forwardRef(Bl);
function Sl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.99 7.5 3.75-3.75m0 0 3.75 3.75m-3.75-3.75v16.499H4.49"
  }));
}
const jl = /* @__PURE__ */ o.forwardRef(Sl);
function $l({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.49 12 3.74 8.248m0 0 3.75-3.75m-3.75 3.75h16.5V19.5"
  }));
}
const _l = /* @__PURE__ */ o.forwardRef($l);
function Vl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.49 12 3.75-3.751m0 0-3.75-3.75m3.75 3.75H3.74V19.5"
  }));
}
const Dl = /* @__PURE__ */ o.forwardRef(Vl);
function Ul({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const Hl = /* @__PURE__ */ o.forwardRef(Ul);
function Zl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
  }));
}
const Wl = /* @__PURE__ */ o.forwardRef(Zl);
function ql({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
  }));
}
const Kl = /* @__PURE__ */ o.forwardRef(ql);
function zl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
  }));
}
const Gl = /* @__PURE__ */ o.forwardRef(zl);
function Jl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
  }));
}
const Ql = /* @__PURE__ */ o.forwardRef(Jl);
function Xl({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
  }));
}
const Yl = /* @__PURE__ */ o.forwardRef(Xl);
function ec({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
  }));
}
const tc = /* @__PURE__ */ o.forwardRef(ec);
function nc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15 15-6 6m0 0-6-6m6 6V9a6 6 0 0 1 12 0v3"
  }));
}
const ac = /* @__PURE__ */ o.forwardRef(nc);
function oc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
  }));
}
const rc = /* @__PURE__ */ o.forwardRef(oc);
function ic({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
  }));
}
const sc = /* @__PURE__ */ o.forwardRef(ic);
function lc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3"
  }));
}
const cc = /* @__PURE__ */ o.forwardRef(lc);
function dc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
  }));
}
const uc = /* @__PURE__ */ o.forwardRef(dc);
function hc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
  }));
}
const mc = /* @__PURE__ */ o.forwardRef(hc);
function fc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
  }));
}
const pc = /* @__PURE__ */ o.forwardRef(fc);
function gc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
  }));
}
const wc = /* @__PURE__ */ o.forwardRef(gc);
function vc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
  }));
}
const yc = /* @__PURE__ */ o.forwardRef(vc);
function kc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
  }));
}
const Cc = /* @__PURE__ */ o.forwardRef(kc);
function bc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
  }));
}
const xc = /* @__PURE__ */ o.forwardRef(bc);
function Lc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
  }));
}
const Rc = /* @__PURE__ */ o.forwardRef(Lc);
function Ac({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 9h16.5m-16.5 6.75h16.5"
  }));
}
const Ec = /* @__PURE__ */ o.forwardRef(Ac);
function Pc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
  }));
}
const Tc = /* @__PURE__ */ o.forwardRef(Pc);
function Ic({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
  }));
}
const Mc = /* @__PURE__ */ o.forwardRef(Ic);
function Nc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
  }));
}
const Oc = /* @__PURE__ */ o.forwardRef(Nc);
function Bc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  }));
}
const Fc = /* @__PURE__ */ o.forwardRef(Bc);
function Sc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
  }));
}
const jc = /* @__PURE__ */ o.forwardRef(Sc);
function $c({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
  }));
}
const _c = /* @__PURE__ */ o.forwardRef($c);
function Vc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
  }));
}
const Dc = /* @__PURE__ */ o.forwardRef(Vc);
function Uc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
  }));
}
const Hc = /* @__PURE__ */ o.forwardRef(Uc);
function Zc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
  }));
}
const Wc = /* @__PURE__ */ o.forwardRef(Zc);
function qc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5h6.75V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z"
  }));
}
const Kc = /* @__PURE__ */ o.forwardRef(qc);
function zc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
  }));
}
const Gc = /* @__PURE__ */ o.forwardRef(zc);
function Jc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
  }));
}
const Qc = /* @__PURE__ */ o.forwardRef(Jc);
function Xc({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.143 17.082a24.248 24.248 0 0 0 3.844.148m-3.844-.148a23.856 23.856 0 0 1-5.455-1.31 8.964 8.964 0 0 0 2.3-5.542m3.155 6.852a3 3 0 0 0 5.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 0 0 3.536-1.003A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53"
  }));
}
const Yc = /* @__PURE__ */ o.forwardRef(Xc);
function e2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M10.5 8.25h3l-3 4.5h3"
  }));
}
const t2 = /* @__PURE__ */ o.forwardRef(e2);
function n2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
  }));
}
const a2 = /* @__PURE__ */ o.forwardRef(n2);
function o2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinejoin: "round",
    d: "M6.75 3.744h-.753v8.25h7.125a4.125 4.125 0 0 0 0-8.25H6.75Zm0 0v.38m0 16.122h6.747a4.5 4.5 0 0 0 0-9.001h-7.5v9h.753Zm0 0v-.37m0-15.751h6a3.75 3.75 0 1 1 0 7.5h-6m0-7.5v7.5m0 0v8.25m0-8.25h6.375a4.125 4.125 0 0 1 0 8.25H6.75m.747-15.38h4.875a3.375 3.375 0 0 1 0 6.75H7.497v-6.75Zm0 7.5h5.25a3.75 3.75 0 0 1 0 7.5h-5.25v-7.5Z"
  }));
}
const r2 = /* @__PURE__ */ o.forwardRef(o2);
function i2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21"
  }));
}
const s2 = /* @__PURE__ */ o.forwardRef(i2);
function l2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
  }));
}
const c2 = /* @__PURE__ */ o.forwardRef(l2);
function d2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
  }));
}
const u2 = /* @__PURE__ */ o.forwardRef(d2);
function h2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
  }));
}
const m2 = /* @__PURE__ */ o.forwardRef(h2);
function f2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
  }));
}
const p2 = /* @__PURE__ */ o.forwardRef(f2);
function g2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
  }));
}
const w2 = /* @__PURE__ */ o.forwardRef(g2);
function v2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
  }));
}
const y2 = /* @__PURE__ */ o.forwardRef(v2);
function k2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082"
  }));
}
const C2 = /* @__PURE__ */ o.forwardRef(k2);
function b2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
  }));
}
const x2 = /* @__PURE__ */ o.forwardRef(b2);
function L2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
  }));
}
const R2 = /* @__PURE__ */ o.forwardRef(L2);
function A2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
  }));
}
const E2 = /* @__PURE__ */ o.forwardRef(A2);
function P2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
  }));
}
const T2 = /* @__PURE__ */ o.forwardRef(P2);
function I2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
  }));
}
const M2 = /* @__PURE__ */ o.forwardRef(I2);
function N2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
  }));
}
const O2 = /* @__PURE__ */ o.forwardRef(N2);
function B2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
  }));
}
const F2 = /* @__PURE__ */ o.forwardRef(B2);
function S2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
  }));
}
const j2 = /* @__PURE__ */ o.forwardRef(S2);
function $2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
  }));
}
const _2 = /* @__PURE__ */ o.forwardRef($2);
function V2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
  }));
}
const D2 = /* @__PURE__ */ o.forwardRef(V2);
function U2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
  }));
}
const H2 = /* @__PURE__ */ o.forwardRef(U2);
function Z2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
  }));
}
const W2 = /* @__PURE__ */ o.forwardRef(Z2);
function q2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
  }));
}
const K2 = /* @__PURE__ */ o.forwardRef(q2);
function z2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
  }));
}
const G2 = /* @__PURE__ */ o.forwardRef(z2);
function J2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
  }));
}
const Q2 = /* @__PURE__ */ o.forwardRef(J2);
function X2({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
  }));
}
const Y2 = /* @__PURE__ */ o.forwardRef(X2);
function e0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
  }));
}
const t0 = /* @__PURE__ */ o.forwardRef(e0);
function n0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
  }));
}
const a0 = /* @__PURE__ */ o.forwardRef(n0);
function o0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
  }));
}
const r0 = /* @__PURE__ */ o.forwardRef(o0);
function i0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
  }));
}
const s0 = /* @__PURE__ */ o.forwardRef(i0);
function l0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
  }));
}
const c0 = /* @__PURE__ */ o.forwardRef(l0);
function d0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const u0 = /* @__PURE__ */ o.forwardRef(d0);
function h0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 12.75 6 6 9-13.5"
  }));
}
const m0 = /* @__PURE__ */ o.forwardRef(h0);
function f0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
  }));
}
const p0 = /* @__PURE__ */ o.forwardRef(f0);
function g0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
  }));
}
const w0 = /* @__PURE__ */ o.forwardRef(g0);
function v0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
  }));
}
const y0 = /* @__PURE__ */ o.forwardRef(v0);
function k0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 18.75 7.5-7.5 7.5 7.5"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 12.75 7.5-7.5 7.5 7.5"
  }));
}
const C0 = /* @__PURE__ */ o.forwardRef(k0);
function b0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m19.5 8.25-7.5 7.5-7.5-7.5"
  }));
}
const x0 = /* @__PURE__ */ o.forwardRef(b0);
function L0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 19.5 8.25 12l7.5-7.5"
  }));
}
const R0 = /* @__PURE__ */ o.forwardRef(L0);
function A0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 4.5 7.5 7.5-7.5 7.5"
  }));
}
const E0 = /* @__PURE__ */ o.forwardRef(A0);
function P0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
  }));
}
const T0 = /* @__PURE__ */ o.forwardRef(P0);
function I0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m4.5 15.75 7.5-7.5 7.5 7.5"
  }));
}
const M0 = /* @__PURE__ */ o.forwardRef(I0);
function N0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
  }));
}
const O0 = /* @__PURE__ */ o.forwardRef(N0);
function B0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
  }));
}
const F0 = /* @__PURE__ */ o.forwardRef(B0);
function S0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
  }));
}
const j0 = /* @__PURE__ */ o.forwardRef(S0);
function $0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
  }));
}
const _0 = /* @__PURE__ */ o.forwardRef($0);
function V0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
  }));
}
const D0 = /* @__PURE__ */ o.forwardRef(V0);
function U0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const H0 = /* @__PURE__ */ o.forwardRef(U0);
function Z0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const W0 = /* @__PURE__ */ o.forwardRef(Z0);
function q0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
  }));
}
const K0 = /* @__PURE__ */ o.forwardRef(q0);
function z0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
  }));
}
const G0 = /* @__PURE__ */ o.forwardRef(z0);
function J0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
  }));
}
const Q0 = /* @__PURE__ */ o.forwardRef(J0);
function X0({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
  }));
}
const Y0 = /* @__PURE__ */ o.forwardRef(X0);
function e1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const t1 = /* @__PURE__ */ o.forwardRef(e1);
function n1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const a1 = /* @__PURE__ */ o.forwardRef(n1);
function o1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
  }));
}
const r1 = /* @__PURE__ */ o.forwardRef(o1);
function i1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const s1 = /* @__PURE__ */ o.forwardRef(i1);
function l1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
  }));
}
const c1 = /* @__PURE__ */ o.forwardRef(l1);
function d1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
  }));
}
const u1 = /* @__PURE__ */ o.forwardRef(d1);
function h1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
  }));
}
const m1 = /* @__PURE__ */ o.forwardRef(h1);
function f1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
  }));
}
const p1 = /* @__PURE__ */ o.forwardRef(f1);
function g1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
  }));
}
const w1 = /* @__PURE__ */ o.forwardRef(g1);
function v1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.25 7.5.415-.207a.75.75 0 0 1 1.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 0 0 5.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const y1 = /* @__PURE__ */ o.forwardRef(v1);
function k1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const C1 = /* @__PURE__ */ o.forwardRef(k1);
function b1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const x1 = /* @__PURE__ */ o.forwardRef(b1);
function L1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.121 7.629A3 3 0 0 0 9.017 9.43c-.023.212-.002.425.028.636l.506 3.541a4.5 4.5 0 0 1-.43 2.65L9 16.5l1.539-.513a2.25 2.25 0 0 1 1.422 0l.655.218a2.25 2.25 0 0 0 1.718-.122L15 15.75M8.25 12H12m9 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const R1 = /* @__PURE__ */ o.forwardRef(L1);
function A1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const E1 = /* @__PURE__ */ o.forwardRef(A1);
function P1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9 7.5 3 4.5m0 0 3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const T1 = /* @__PURE__ */ o.forwardRef(P1);
function I1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
  }));
}
const M1 = /* @__PURE__ */ o.forwardRef(I1);
function N1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
  }));
}
const O1 = /* @__PURE__ */ o.forwardRef(N1);
function B1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
  }));
}
const F1 = /* @__PURE__ */ o.forwardRef(B1);
function S1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-15a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const j1 = /* @__PURE__ */ o.forwardRef(S1);
function $1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.499 11.998h15m-7.5-6.75h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM12 18.751h.007v.007H12v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const _1 = /* @__PURE__ */ o.forwardRef($1);
function V1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const D1 = /* @__PURE__ */ o.forwardRef(V1);
function U1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const H1 = /* @__PURE__ */ o.forwardRef(U1);
function Z1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const W1 = /* @__PURE__ */ o.forwardRef(Z1);
function q1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
  }));
}
const K1 = /* @__PURE__ */ o.forwardRef(q1);
function z1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 8.25.22-.22a.75.75 0 0 1 1.28.53v6.441c0 .472.214.934.64 1.137a3.75 3.75 0 0 0 4.994-1.77c.205-.428-.152-.868-.627-.868h-.507m-6-2.25h7.5M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const G1 = /* @__PURE__ */ o.forwardRef(z1);
function J1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v7.5m2.25-6.466a9.016 9.016 0 0 0-3.461-.203c-.536.072-.974.478-1.021 1.017a4.559 4.559 0 0 0-.018.402c0 .464.336.844.775.994l2.95 1.012c.44.15.775.53.775.994 0 .136-.006.27-.018.402-.047.539-.485.945-1.021 1.017a9.077 9.077 0 0 1-3.461-.203M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const Q1 = /* @__PURE__ */ o.forwardRef(J1);
function X1({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 11.625h4.5m-4.5 2.25h4.5m2.121 1.527c-1.171 1.464-3.07 1.464-4.242 0-1.172-1.465-1.172-3.84 0-5.304 1.171-1.464 3.07-1.464 4.242 0M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const Y1 = /* @__PURE__ */ o.forwardRef(X1);
function ed({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.621 9.879a3 3 0 0 0-5.02 2.897l.164.609a4.5 4.5 0 0 1-.108 2.676l-.157.439.44-.22a2.863 2.863 0 0 1 2.185-.155c.72.24 1.507.184 2.186-.155L15 18M8.25 15.75H12m-1.5-13.5H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const td = /* @__PURE__ */ o.forwardRef(ed);
function nd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 9h3.75m-4.5 2.625h4.5M12 18.75 9.75 16.5h.375a2.625 2.625 0 0 0 0-5.25H9.75m.75-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const ad = /* @__PURE__ */ o.forwardRef(nd);
function od({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m1.5 9 2.25 3m0 0 2.25-3m-2.25 3v4.5M9.75 15h4.5m-4.5 2.25h4.5m-3.75-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const rd = /* @__PURE__ */ o.forwardRef(od);
function id({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
  }));
}
const sd = /* @__PURE__ */ o.forwardRef(id);
function ld({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
  }));
}
const cd = /* @__PURE__ */ o.forwardRef(ld);
function dd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const ud = /* @__PURE__ */ o.forwardRef(dd);
function hd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const md = /* @__PURE__ */ o.forwardRef(hd);
function fd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const pd = /* @__PURE__ */ o.forwardRef(fd);
function gd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
  }));
}
const wd = /* @__PURE__ */ o.forwardRef(gd);
function vd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const yd = /* @__PURE__ */ o.forwardRef(vd);
function kd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
  }));
}
const Cd = /* @__PURE__ */ o.forwardRef(kd);
function bd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
  }));
}
const xd = /* @__PURE__ */ o.forwardRef(bd);
function Ld({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
  }));
}
const Rd = /* @__PURE__ */ o.forwardRef(Ld);
function Ad({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
  }));
}
const Ed = /* @__PURE__ */ o.forwardRef(Ad);
function Pd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.499 8.248h15m-15 7.501h15"
  }));
}
const Td = /* @__PURE__ */ o.forwardRef(Pd);
function Id({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
  }));
}
const Md = /* @__PURE__ */ o.forwardRef(Id);
function Nd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
  }));
}
const Od = /* @__PURE__ */ o.forwardRef(Nd);
function Bd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9"
  }));
}
const Fd = /* @__PURE__ */ o.forwardRef(Bd);
function Sd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
  }));
}
const jd = /* @__PURE__ */ o.forwardRef(Sd);
function $d({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const _d = /* @__PURE__ */ o.forwardRef($d);
function Vd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
  }));
}
const Dd = /* @__PURE__ */ o.forwardRef(Vd);
function Ud({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
  }));
}
const Hd = /* @__PURE__ */ o.forwardRef(Ud);
function Zd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
  }));
}
const Wd = /* @__PURE__ */ o.forwardRef(Zd);
function qd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
  }));
}
const Kd = /* @__PURE__ */ o.forwardRef(qd);
function zd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
  }));
}
const Gd = /* @__PURE__ */ o.forwardRef(zd);
function Jd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
  }));
}
const Qd = /* @__PURE__ */ o.forwardRef(Jd);
function Xd({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
  }));
}
const Yd = /* @__PURE__ */ o.forwardRef(Xd);
function e5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
  }));
}
const t5 = /* @__PURE__ */ o.forwardRef(e5);
function n5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
  }));
}
const a5 = /* @__PURE__ */ o.forwardRef(n5);
function o5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
  }));
}
const r5 = /* @__PURE__ */ o.forwardRef(o5);
function i5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
  }));
}
const s5 = /* @__PURE__ */ o.forwardRef(i5);
function l5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
  }));
}
const c5 = /* @__PURE__ */ o.forwardRef(l5);
function d5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
  }));
}
const u5 = /* @__PURE__ */ o.forwardRef(d5);
function h5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
  }));
}
const m5 = /* @__PURE__ */ o.forwardRef(h5);
function f5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
  }));
}
const p5 = /* @__PURE__ */ o.forwardRef(f5);
function g5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
  }));
}
const w5 = /* @__PURE__ */ o.forwardRef(g5);
function v5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
  }));
}
const y5 = /* @__PURE__ */ o.forwardRef(v5);
function k5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64"
  }));
}
const C5 = /* @__PURE__ */ o.forwardRef(k5);
function b5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
  }));
}
const x5 = /* @__PURE__ */ o.forwardRef(b5);
function L5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"
  }));
}
const R5 = /* @__PURE__ */ o.forwardRef(L5);
function A5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501m4.501-8.627 2.25-1.5v10.126m0 0h-2.25m2.25 0h2.25"
  }));
}
const E5 = /* @__PURE__ */ o.forwardRef(A5);
function P5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.75 19.5H16.5v-1.609a2.25 2.25 0 0 1 1.244-2.012l2.89-1.445c.651-.326 1.116-.955 1.116-1.683 0-.498-.04-.987-.118-1.463-.135-.825-.835-1.422-1.668-1.489a15.202 15.202 0 0 0-3.464.12M2.243 4.492v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
  }));
}
const T5 = /* @__PURE__ */ o.forwardRef(P5);
function I5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.905 14.626a4.52 4.52 0 0 1 .738 3.603c-.154.695-.794 1.143-1.504 1.208a15.194 15.194 0 0 1-3.639-.104m4.405-4.707a4.52 4.52 0 0 0 .738-3.603c-.154-.696-.794-1.144-1.504-1.209a15.19 15.19 0 0 0-3.639.104m4.405 4.708H18M2.243 4.493v7.5m0 0v7.502m0-7.501h10.5m0-7.5v7.5m0 0v7.501"
  }));
}
const M5 = /* @__PURE__ */ o.forwardRef(I5);
function N5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
  }));
}
const O5 = /* @__PURE__ */ o.forwardRef(N5);
function B5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
  }));
}
const F5 = /* @__PURE__ */ o.forwardRef(B5);
function S5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
  }));
}
const j5 = /* @__PURE__ */ o.forwardRef(S5);
function $5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
  }));
}
const _5 = /* @__PURE__ */ o.forwardRef($5);
function V5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
  }));
}
const D5 = /* @__PURE__ */ o.forwardRef(V5);
function U5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
  }));
}
const H5 = /* @__PURE__ */ o.forwardRef(U5);
function Z5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
  }));
}
const W5 = /* @__PURE__ */ o.forwardRef(Z5);
function q5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
  }));
}
const K5 = /* @__PURE__ */ o.forwardRef(q5);
function z5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
  }));
}
const G5 = /* @__PURE__ */ o.forwardRef(z5);
function J5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const Q5 = /* @__PURE__ */ o.forwardRef(J5);
function X5({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
  }));
}
const Y5 = /* @__PURE__ */ o.forwardRef(X5);
function eu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
  }));
}
const tu = /* @__PURE__ */ o.forwardRef(eu);
function nu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.248 20.246H9.05m0 0h3.696m-3.696 0 5.893-16.502m0 0h-3.697m3.697 0h3.803"
  }));
}
const au = /* @__PURE__ */ o.forwardRef(nu);
function ou({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
  }));
}
const ru = /* @__PURE__ */ o.forwardRef(ou);
function iu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
  }));
}
const su = /* @__PURE__ */ o.forwardRef(iu);
function lu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
  }));
}
const cu = /* @__PURE__ */ o.forwardRef(lu);
function du({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
  }));
}
const uu = /* @__PURE__ */ o.forwardRef(du);
function hu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9"
  }));
}
const mu = /* @__PURE__ */ o.forwardRef(hu);
function fu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
  }));
}
const pu = /* @__PURE__ */ o.forwardRef(fu);
function gu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const wu = /* @__PURE__ */ o.forwardRef(gu);
function vu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const yu = /* @__PURE__ */ o.forwardRef(vu);
function ku({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const Cu = /* @__PURE__ */ o.forwardRef(ku);
function bu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const xu = /* @__PURE__ */ o.forwardRef(bu);
function Lu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
  }));
}
const Ru = /* @__PURE__ */ o.forwardRef(Lu);
function Au({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
  }));
}
const Eu = /* @__PURE__ */ o.forwardRef(Au);
function Pu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
  }));
}
const Tu = /* @__PURE__ */ o.forwardRef(Pu);
function Iu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
  }));
}
const Mu = /* @__PURE__ */ o.forwardRef(Iu);
function Nu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
  }));
}
const Ou = /* @__PURE__ */ o.forwardRef(Nu);
function Bu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
  }));
}
const Fu = /* @__PURE__ */ o.forwardRef(Bu);
function Su({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
  }));
}
const ju = /* @__PURE__ */ o.forwardRef(Su);
function $u({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const _u = /* @__PURE__ */ o.forwardRef($u);
function Vu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M18 12H6"
  }));
}
const Du = /* @__PURE__ */ o.forwardRef(Vu);
function Uu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5 12h14"
  }));
}
const Hu = /* @__PURE__ */ o.forwardRef(Uu);
function Zu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
  }));
}
const Wu = /* @__PURE__ */ o.forwardRef(Zu);
function qu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
  }));
}
const Ku = /* @__PURE__ */ o.forwardRef(qu);
function zu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
  }));
}
const Gu = /* @__PURE__ */ o.forwardRef(zu);
function Ju({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
  }));
}
const Qu = /* @__PURE__ */ o.forwardRef(Ju);
function Xu({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
  }));
}
const Yu = /* @__PURE__ */ o.forwardRef(Xu);
function e3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
  }));
}
const t3 = /* @__PURE__ */ o.forwardRef(e3);
function n3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
  }));
}
const a3 = /* @__PURE__ */ o.forwardRef(n3);
function o3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
  }));
}
const r3 = /* @__PURE__ */ o.forwardRef(o3);
function i3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const s3 = /* @__PURE__ */ o.forwardRef(i3);
function l3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 5.25v13.5m-7.5-13.5v13.5"
  }));
}
const c3 = /* @__PURE__ */ o.forwardRef(l3);
function d3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
  }));
}
const u3 = /* @__PURE__ */ o.forwardRef(d3);
function h3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
  }));
}
const m3 = /* @__PURE__ */ o.forwardRef(h3);
function f3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const p3 = /* @__PURE__ */ o.forwardRef(f3);
function g3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
  }));
}
const w3 = /* @__PURE__ */ o.forwardRef(g3);
function v3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
  }));
}
const y3 = /* @__PURE__ */ o.forwardRef(v3);
function k3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
  }));
}
const C3 = /* @__PURE__ */ o.forwardRef(k3);
function b3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
  }));
}
const x3 = /* @__PURE__ */ o.forwardRef(b3);
function L3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const R3 = /* @__PURE__ */ o.forwardRef(L3);
function A3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
  }));
}
const E3 = /* @__PURE__ */ o.forwardRef(A3);
function P3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
  }));
}
const T3 = /* @__PURE__ */ o.forwardRef(P3);
function I3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
  }));
}
const M3 = /* @__PURE__ */ o.forwardRef(I3);
function N3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const O3 = /* @__PURE__ */ o.forwardRef(N3);
function B3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 6v12m6-6H6"
  }));
}
const F3 = /* @__PURE__ */ o.forwardRef(B3);
function S3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 4.5v15m7.5-7.5h-15"
  }));
}
const j3 = /* @__PURE__ */ o.forwardRef(S3);
function $3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
  }));
}
const _3 = /* @__PURE__ */ o.forwardRef($3);
function V3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
  }));
}
const D3 = /* @__PURE__ */ o.forwardRef(V3);
function U3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
  }));
}
const H3 = /* @__PURE__ */ o.forwardRef(U3);
function Z3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
  }));
}
const W3 = /* @__PURE__ */ o.forwardRef(Z3);
function q3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
  }));
}
const K3 = /* @__PURE__ */ o.forwardRef(q3);
function z3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
  }));
}
const G3 = /* @__PURE__ */ o.forwardRef(z3);
function J3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
  }));
}
const Q3 = /* @__PURE__ */ o.forwardRef(J3);
function X3({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
  }));
}
const Y3 = /* @__PURE__ */ o.forwardRef(X3);
function eh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m3.75 7.5 16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0 0 12 6.75Zm-1.683 6.443-.005.005-.006-.005.006-.005.005.005Zm-.005 2.127-.005-.006.005-.005.005.005-.005.005Zm-2.116-.006-.005.006-.006-.006.005-.005.006.005Zm-.005-2.116-.006-.005.006-.005.005.005-.005.005ZM9.255 10.5v.008h-.008V10.5h.008Zm3.249 1.88-.007.004-.003-.007.006-.003.004.006Zm-1.38 5.126-.003-.006.006-.004.004.007-.006.003Zm.007-6.501-.003.006-.007-.003.004-.007.006.004Zm1.37 5.129-.007-.004.004-.006.006.003-.004.007Zm.504-1.877h-.008v-.007h.008v.007ZM9.255 18v.008h-.008V18h.008Zm-3.246-1.87-.007.004L6 16.127l.006-.003.004.006Zm1.366-5.119-.004-.006.006-.004.004.007-.006.003ZM7.38 17.5l-.003.006-.007-.003.004-.007.006.004Zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007Zm-.5 1.873h-.008v-.007h.008v.007ZM17.25 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm0 4.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
  }));
}
const th = /* @__PURE__ */ o.forwardRef(eh);
function nh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const ah = /* @__PURE__ */ o.forwardRef(nh);
function oh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
  }));
}
const rh = /* @__PURE__ */ o.forwardRef(oh);
function ih({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
  }));
}
const sh = /* @__PURE__ */ o.forwardRef(ih);
function lh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
  }));
}
const ch = /* @__PURE__ */ o.forwardRef(lh);
function dh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
  }));
}
const uh = /* @__PURE__ */ o.forwardRef(dh);
function hh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
  }));
}
const mh = /* @__PURE__ */ o.forwardRef(hh);
function fh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
  }));
}
const ph = /* @__PURE__ */ o.forwardRef(fh);
function gh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664"
  }));
}
const wh = /* @__PURE__ */ o.forwardRef(gh);
function vh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
  }));
}
const yh = /* @__PURE__ */ o.forwardRef(vh);
function kh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
  }));
}
const Ch = /* @__PURE__ */ o.forwardRef(kh);
function bh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
  }));
}
const xh = /* @__PURE__ */ o.forwardRef(bh);
function Lh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
  }));
}
const Rh = /* @__PURE__ */ o.forwardRef(Lh);
function Ah({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
  }));
}
const Eh = /* @__PURE__ */ o.forwardRef(Ah);
function Ph({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const Th = /* @__PURE__ */ o.forwardRef(Ph);
function Ih({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
  }));
}
const Mh = /* @__PURE__ */ o.forwardRef(Ih);
function Nh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m3 3 8.735 8.735m0 0a.374.374 0 1 1 .53.53m-.53-.53.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 0 1 0 5.304m2.121-7.425a6.75 6.75 0 0 1 0 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 0 1-1.06-2.122m-1.061 4.243a6.75 6.75 0 0 1-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12Z"
  }));
}
const Oh = /* @__PURE__ */ o.forwardRef(Nh);
function Bh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
  }));
}
const Fh = /* @__PURE__ */ o.forwardRef(Bh);
function Sh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9 20.247 6-16.5"
  }));
}
const jh = /* @__PURE__ */ o.forwardRef(Sh);
function $h({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
  }));
}
const _h = /* @__PURE__ */ o.forwardRef($h);
function Vh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
  }));
}
const Dh = /* @__PURE__ */ o.forwardRef(Vh);
function Uh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
  }));
}
const Hh = /* @__PURE__ */ o.forwardRef(Uh);
function Zh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
  }));
}
const Wh = /* @__PURE__ */ o.forwardRef(Zh);
function qh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
  }));
}
const Kh = /* @__PURE__ */ o.forwardRef(qh);
function zh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
  }));
}
const Gh = /* @__PURE__ */ o.forwardRef(zh);
function Jh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const Qh = /* @__PURE__ */ o.forwardRef(Jh);
function Xh({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
  }));
}
const Yh = /* @__PURE__ */ o.forwardRef(Xh);
function em({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
  }));
}
const tm = /* @__PURE__ */ o.forwardRef(em);
function nm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
  }));
}
const am = /* @__PURE__ */ o.forwardRef(nm);
function om({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617M3.75 12h16.5"
  }));
}
const rm = /* @__PURE__ */ o.forwardRef(om);
function im({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
  }));
}
const sm = /* @__PURE__ */ o.forwardRef(im);
function lm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"
  }));
}
const cm = /* @__PURE__ */ o.forwardRef(lm);
function dm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
  }));
}
const um = /* @__PURE__ */ o.forwardRef(dm);
function hm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 6h.008v.008H6V6Z"
  }));
}
const mm = /* @__PURE__ */ o.forwardRef(hm);
function fm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
  }));
}
const pm = /* @__PURE__ */ o.forwardRef(fm);
function gm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
  }));
}
const wm = /* @__PURE__ */ o.forwardRef(gm);
function vm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
  }));
}
const ym = /* @__PURE__ */ o.forwardRef(vm);
function km({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
  }));
}
const Cm = /* @__PURE__ */ o.forwardRef(km);
function bm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
  }));
}
const xm = /* @__PURE__ */ o.forwardRef(bm);
function Lm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.995 3.744v7.5a6 6 0 1 1-12 0v-7.5m-2.25 16.502h16.5"
  }));
}
const Rm = /* @__PURE__ */ o.forwardRef(Lm);
function Am({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const Em = /* @__PURE__ */ o.forwardRef(Am);
function Pm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
  }));
}
const Tm = /* @__PURE__ */ o.forwardRef(Pm);
function Im({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
  }));
}
const Mm = /* @__PURE__ */ o.forwardRef(Im);
function Nm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
  }));
}
const Om = /* @__PURE__ */ o.forwardRef(Nm);
function Bm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
  }));
}
const Fm = /* @__PURE__ */ o.forwardRef(Bm);
function Sm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
  }));
}
const jm = /* @__PURE__ */ o.forwardRef(Sm);
function $m({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.745 3A23.933 23.933 0 0 0 3 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 0 1 1.105.402l2.402 7.206a.75.75 0 0 0 1.104.401l1.445-.889m-8.25.75.213.09a1.687 1.687 0 0 0 2.062-.617l4.45-6.676a1.688 1.688 0 0 1 2.062-.618l.213.09"
  }));
}
const _m = /* @__PURE__ */ o.forwardRef($m);
function Vm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 0 1-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 0 0-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409"
  }));
}
const Dm = /* @__PURE__ */ o.forwardRef(Vm);
function Um({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
  }));
}
const Hm = /* @__PURE__ */ o.forwardRef(Um);
function Zm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
  }));
}
const Wm = /* @__PURE__ */ o.forwardRef(Zm);
function qm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
  }));
}
const Km = /* @__PURE__ */ o.forwardRef(qm);
function zm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
  }));
}
const Gm = /* @__PURE__ */ o.forwardRef(zm);
function Jm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
  }));
}
const Qm = /* @__PURE__ */ o.forwardRef(Jm);
function Xm({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
  }));
}
const Ym = /* @__PURE__ */ o.forwardRef(Xm);
function e4({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
  }));
}
const t4 = /* @__PURE__ */ o.forwardRef(e4);
function n4({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
  }), /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M4.867 19.125h.008v.008h-.008v-.008Z"
  }));
}
const a4 = /* @__PURE__ */ o.forwardRef(n4);
function o4({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  }));
}
const r4 = /* @__PURE__ */ o.forwardRef(o4);
function i4({
  title: t,
  titleId: e,
  ...n
}, a) {
  return /* @__PURE__ */ o.createElement("svg", Object.assign({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon",
    ref: a,
    "aria-labelledby": e
  }, n), t ? /* @__PURE__ */ o.createElement("title", {
    id: e
  }, t) : null, /* @__PURE__ */ o.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: "M6 18 18 6M6 6l12 12"
  }));
}
const s4 = /* @__PURE__ */ o.forwardRef(i4), l4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AcademicCapIcon: cs,
  AdjustmentsHorizontalIcon: us,
  AdjustmentsVerticalIcon: ms,
  ArchiveBoxArrowDownIcon: ps,
  ArchiveBoxIcon: ys,
  ArchiveBoxXMarkIcon: ws,
  ArrowDownCircleIcon: Cs,
  ArrowDownIcon: Os,
  ArrowDownLeftIcon: xs,
  ArrowDownOnSquareIcon: Es,
  ArrowDownOnSquareStackIcon: Rs,
  ArrowDownRightIcon: Ts,
  ArrowDownTrayIcon: Ms,
  ArrowLeftCircleIcon: Fs,
  ArrowLeftEndOnRectangleIcon: js,
  ArrowLeftIcon: Hs,
  ArrowLeftOnRectangleIcon: _s,
  ArrowLeftStartOnRectangleIcon: Ds,
  ArrowLongDownIcon: Ws,
  ArrowLongLeftIcon: Ks,
  ArrowLongRightIcon: Gs,
  ArrowLongUpIcon: Qs,
  ArrowPathIcon: tl,
  ArrowPathRoundedSquareIcon: Ys,
  ArrowRightCircleIcon: al,
  ArrowRightEndOnRectangleIcon: rl,
  ArrowRightIcon: ul,
  ArrowRightOnRectangleIcon: sl,
  ArrowRightStartOnRectangleIcon: cl,
  ArrowSmallDownIcon: ml,
  ArrowSmallLeftIcon: pl,
  ArrowSmallRightIcon: wl,
  ArrowSmallUpIcon: yl,
  ArrowTopRightOnSquareIcon: Cl,
  ArrowTrendingDownIcon: xl,
  ArrowTrendingUpIcon: Rl,
  ArrowTurnDownLeftIcon: El,
  ArrowTurnDownRightIcon: Tl,
  ArrowTurnLeftDownIcon: Ml,
  ArrowTurnLeftUpIcon: Ol,
  ArrowTurnRightDownIcon: Fl,
  ArrowTurnRightUpIcon: jl,
  ArrowTurnUpLeftIcon: _l,
  ArrowTurnUpRightIcon: Dl,
  ArrowUpCircleIcon: Hl,
  ArrowUpIcon: tc,
  ArrowUpLeftIcon: Wl,
  ArrowUpOnSquareIcon: Gl,
  ArrowUpOnSquareStackIcon: Kl,
  ArrowUpRightIcon: Ql,
  ArrowUpTrayIcon: Yl,
  ArrowUturnDownIcon: ac,
  ArrowUturnLeftIcon: rc,
  ArrowUturnRightIcon: sc,
  ArrowUturnUpIcon: cc,
  ArrowsPointingInIcon: uc,
  ArrowsPointingOutIcon: mc,
  ArrowsRightLeftIcon: pc,
  ArrowsUpDownIcon: wc,
  AtSymbolIcon: yc,
  BackspaceIcon: Cc,
  BackwardIcon: xc,
  BanknotesIcon: Rc,
  Bars2Icon: Ec,
  Bars3BottomLeftIcon: Tc,
  Bars3BottomRightIcon: Mc,
  Bars3CenterLeftIcon: Oc,
  Bars3Icon: Fc,
  Bars4Icon: jc,
  BarsArrowDownIcon: _c,
  BarsArrowUpIcon: Dc,
  Battery0Icon: Hc,
  Battery100Icon: Wc,
  Battery50Icon: Kc,
  BeakerIcon: Gc,
  BellAlertIcon: Qc,
  BellIcon: a2,
  BellSlashIcon: Yc,
  BellSnoozeIcon: t2,
  BoldIcon: r2,
  BoltIcon: c2,
  BoltSlashIcon: s2,
  BookOpenIcon: u2,
  BookmarkIcon: w2,
  BookmarkSlashIcon: m2,
  BookmarkSquareIcon: p2,
  BriefcaseIcon: y2,
  BugAntIcon: C2,
  BuildingLibraryIcon: x2,
  BuildingOffice2Icon: R2,
  BuildingOfficeIcon: E2,
  BuildingStorefrontIcon: T2,
  CakeIcon: M2,
  CalculatorIcon: O2,
  CalendarDateRangeIcon: F2,
  CalendarDaysIcon: j2,
  CalendarIcon: _2,
  CameraIcon: D2,
  ChartBarIcon: W2,
  ChartBarSquareIcon: H2,
  ChartPieIcon: K2,
  ChatBubbleBottomCenterIcon: Q2,
  ChatBubbleBottomCenterTextIcon: G2,
  ChatBubbleLeftEllipsisIcon: Y2,
  ChatBubbleLeftIcon: a0,
  ChatBubbleLeftRightIcon: t0,
  ChatBubbleOvalLeftEllipsisIcon: r0,
  ChatBubbleOvalLeftIcon: s0,
  CheckBadgeIcon: c0,
  CheckCircleIcon: u0,
  CheckIcon: m0,
  ChevronDoubleDownIcon: p0,
  ChevronDoubleLeftIcon: w0,
  ChevronDoubleRightIcon: y0,
  ChevronDoubleUpIcon: C0,
  ChevronDownIcon: x0,
  ChevronLeftIcon: R0,
  ChevronRightIcon: E0,
  ChevronUpDownIcon: T0,
  ChevronUpIcon: M0,
  CircleStackIcon: O0,
  ClipboardDocumentCheckIcon: F0,
  ClipboardDocumentIcon: _0,
  ClipboardDocumentListIcon: j0,
  ClipboardIcon: D0,
  ClockIcon: H0,
  CloudArrowDownIcon: W0,
  CloudArrowUpIcon: K0,
  CloudIcon: G0,
  CodeBracketIcon: Y0,
  CodeBracketSquareIcon: Q0,
  Cog6ToothIcon: t1,
  Cog8ToothIcon: a1,
  CogIcon: r1,
  CommandLineIcon: s1,
  ComputerDesktopIcon: c1,
  CpuChipIcon: u1,
  CreditCardIcon: m1,
  CubeIcon: w1,
  CubeTransparentIcon: p1,
  CurrencyBangladeshiIcon: y1,
  CurrencyDollarIcon: C1,
  CurrencyEuroIcon: x1,
  CurrencyPoundIcon: R1,
  CurrencyRupeeIcon: E1,
  CurrencyYenIcon: T1,
  CursorArrowRaysIcon: M1,
  CursorArrowRippleIcon: O1,
  DevicePhoneMobileIcon: F1,
  DeviceTabletIcon: j1,
  DivideIcon: _1,
  DocumentArrowDownIcon: D1,
  DocumentArrowUpIcon: H1,
  DocumentChartBarIcon: W1,
  DocumentCheckIcon: K1,
  DocumentCurrencyBangladeshiIcon: G1,
  DocumentCurrencyDollarIcon: Q1,
  DocumentCurrencyEuroIcon: Y1,
  DocumentCurrencyPoundIcon: td,
  DocumentCurrencyRupeeIcon: ad,
  DocumentCurrencyYenIcon: rd,
  DocumentDuplicateIcon: sd,
  DocumentIcon: wd,
  DocumentMagnifyingGlassIcon: cd,
  DocumentMinusIcon: ud,
  DocumentPlusIcon: md,
  DocumentTextIcon: pd,
  EllipsisHorizontalCircleIcon: yd,
  EllipsisHorizontalIcon: Cd,
  EllipsisVerticalIcon: xd,
  EnvelopeIcon: Ed,
  EnvelopeOpenIcon: Rd,
  EqualsIcon: Td,
  ExclamationCircleIcon: Md,
  ExclamationTriangleIcon: Od,
  EyeDropperIcon: Fd,
  EyeIcon: _d,
  EyeSlashIcon: jd,
  FaceFrownIcon: Dd,
  FaceSmileIcon: Hd,
  FilmIcon: Wd,
  FingerPrintIcon: Kd,
  FireIcon: Gd,
  FlagIcon: Qd,
  FolderArrowDownIcon: Yd,
  FolderIcon: s5,
  FolderMinusIcon: t5,
  FolderOpenIcon: a5,
  FolderPlusIcon: r5,
  ForwardIcon: c5,
  FunnelIcon: u5,
  GifIcon: m5,
  GiftIcon: w5,
  GiftTopIcon: p5,
  GlobeAltIcon: y5,
  GlobeAmericasIcon: C5,
  GlobeAsiaAustraliaIcon: x5,
  GlobeEuropeAfricaIcon: R5,
  H1Icon: E5,
  H2Icon: T5,
  H3Icon: M5,
  HandRaisedIcon: O5,
  HandThumbDownIcon: F5,
  HandThumbUpIcon: j5,
  HashtagIcon: _5,
  HeartIcon: D5,
  HomeIcon: W5,
  HomeModernIcon: H5,
  IdentificationIcon: K5,
  InboxArrowDownIcon: G5,
  InboxIcon: Y5,
  InboxStackIcon: Q5,
  InformationCircleIcon: tu,
  ItalicIcon: au,
  KeyIcon: ru,
  LanguageIcon: su,
  LifebuoyIcon: cu,
  LightBulbIcon: uu,
  LinkIcon: pu,
  LinkSlashIcon: mu,
  ListBulletIcon: wu,
  LockClosedIcon: yu,
  LockOpenIcon: Cu,
  MagnifyingGlassCircleIcon: xu,
  MagnifyingGlassIcon: Tu,
  MagnifyingGlassMinusIcon: Ru,
  MagnifyingGlassPlusIcon: Eu,
  MapIcon: Ou,
  MapPinIcon: Mu,
  MegaphoneIcon: Fu,
  MicrophoneIcon: ju,
  MinusCircleIcon: _u,
  MinusIcon: Hu,
  MinusSmallIcon: Du,
  MoonIcon: Wu,
  MusicalNoteIcon: Ku,
  NewspaperIcon: Gu,
  NoSymbolIcon: Qu,
  NumberedListIcon: Yu,
  PaintBrushIcon: t3,
  PaperAirplaneIcon: a3,
  PaperClipIcon: r3,
  PauseCircleIcon: s3,
  PauseIcon: c3,
  PencilIcon: m3,
  PencilSquareIcon: u3,
  PercentBadgeIcon: p3,
  PhoneArrowDownLeftIcon: w3,
  PhoneArrowUpRightIcon: y3,
  PhoneIcon: x3,
  PhoneXMarkIcon: C3,
  PhotoIcon: R3,
  PlayCircleIcon: E3,
  PlayIcon: M3,
  PlayPauseIcon: T3,
  PlusCircleIcon: O3,
  PlusIcon: j3,
  PlusSmallIcon: F3,
  PowerIcon: _3,
  PresentationChartBarIcon: D3,
  PresentationChartLineIcon: H3,
  PrinterIcon: W3,
  PuzzlePieceIcon: K3,
  QrCodeIcon: G3,
  QuestionMarkCircleIcon: Q3,
  QueueListIcon: Y3,
  RadioIcon: th,
  ReceiptPercentIcon: ah,
  ReceiptRefundIcon: rh,
  RectangleGroupIcon: sh,
  RectangleStackIcon: ch,
  RocketLaunchIcon: uh,
  RssIcon: mh,
  ScaleIcon: ph,
  ScissorsIcon: wh,
  ServerIcon: Ch,
  ServerStackIcon: yh,
  ShareIcon: xh,
  ShieldCheckIcon: Rh,
  ShieldExclamationIcon: Eh,
  ShoppingBagIcon: Th,
  ShoppingCartIcon: Mh,
  SignalIcon: Fh,
  SignalSlashIcon: Oh,
  SlashIcon: jh,
  SparklesIcon: _h,
  SpeakerWaveIcon: Dh,
  SpeakerXMarkIcon: Hh,
  Square2StackIcon: Wh,
  Square3Stack3DIcon: Kh,
  Squares2X2Icon: Gh,
  SquaresPlusIcon: Qh,
  StarIcon: Yh,
  StopCircleIcon: tm,
  StopIcon: am,
  StrikethroughIcon: rm,
  SunIcon: sm,
  SwatchIcon: cm,
  TableCellsIcon: um,
  TagIcon: mm,
  TicketIcon: pm,
  TrashIcon: wm,
  TrophyIcon: ym,
  TruckIcon: Cm,
  TvIcon: xm,
  UnderlineIcon: Rm,
  UserCircleIcon: Em,
  UserGroupIcon: Tm,
  UserIcon: Fm,
  UserMinusIcon: Mm,
  UserPlusIcon: Om,
  UsersIcon: jm,
  VariableIcon: _m,
  VideoCameraIcon: Hm,
  VideoCameraSlashIcon: Dm,
  ViewColumnsIcon: Wm,
  ViewfinderCircleIcon: Km,
  WalletIcon: Gm,
  WifiIcon: Qm,
  WindowIcon: Ym,
  WrenchIcon: a4,
  WrenchScrewdriverIcon: t4,
  XCircleIcon: r4,
  XMarkIcon: s4
}, Symbol.toStringTag, { value: "Module" })), Pe = ({
  name: t,
  size: e = 20,
  className: n = "",
  style: a
}) => {
  const r = l4[t];
  return r ? /* @__PURE__ */ i(
    r,
    {
      className: n,
      style: { width: e, height: e, ...a },
      "aria-hidden": "true"
    }
  ) : (console.warn(`Icon "${t}" not found in @heroicons/react`), null);
}, Be = ({
  field: t,
  fieldId: e,
  value: n,
  error: a,
  touched: r,
  onChange: s,
  hasLabel: l = !0,
  className: c = "",
  optionsClassName: d = "",
  style: h
}) => {
  var O, L;
  const [u, m] = k(!1), [g, p] = k(!1), [b, x] = k(!1), P = Ce(null), E = r && !!a, w = `${fe.idPrefix}${e}-${t.name}`;
  X(() => {
    const A = (C) => {
      P.current && !P.current.contains(C.target) && (m(!1), x(!1));
    };
    return document.addEventListener("mousedown", A), () => document.removeEventListener("mousedown", A);
  }, []);
  const R = (O = t.options) == null ? void 0 : O.find((A) => A.value === n), v = (R == null ? void 0 : R.text) || (R == null ? void 0 : R.value) || "";
  return /* @__PURE__ */ f(
    "div",
    {
      className: "loginradius-input-field-container loginradius-select-container",
      ref: P,
      children: [
        l && /* @__PURE__ */ i("label", { htmlFor: w, className: "loginradius-input-label", children: t.display }),
        /* @__PURE__ */ f(
          "div",
          {
            id: w,
            onClick: () => m(!u),
            onMouseEnter: () => p(!0),
            onMouseLeave: () => p(!1),
            onFocus: () => x(!0),
            onBlur: () => x(!1),
            className: `${c} ${l ? "loginradius-input-field" : ""} ${E ? "loginradius-error-field" : ""}`,
            style: { ...h },
            tabIndex: 0,
            "aria-label": t.display,
            "aria-invalid": E,
            children: [
              v || `Select ${t.display}`,
              /* @__PURE__ */ i(
                Pe,
                {
                  name: "ChevronDownIcon",
                  size: 16,
                  style: {
                    // top: '50%',
                    // transform: 'translateY(-50%)',
                    pointerEvents: "none",
                    color: "var(--sdk-input-border-color, #6B7280)"
                  }
                }
              )
            ]
          }
        ),
        u && /* @__PURE__ */ i(
          "div",
          {
            className: `${l ? "with-label" : ""} loginradius-select-options-container`,
            children: (L = t.options) == null ? void 0 : L.map((A) => /* @__PURE__ */ f(
              "div",
              {
                onClick: () => {
                  const C = {
                    target: {
                      name: t.name,
                      value: A.value
                    }
                  };
                  s(C), m(!1);
                },
                className: `${d} loginradius-select-option`,
                children: [
                  A.name,
                  " (",
                  A.text || A.value,
                  ")"
                ]
              },
              A.value
            ))
          }
        ),
        E && /* @__PURE__ */ i("p", { id: `${t.name}-error`, className: "loginradius-error-message", children: a })
      ]
    }
  );
}, qe = ({
  field: t,
  fieldId: e,
  value: n,
  error: a,
  touched: r,
  onChange: s,
  className: l = "",
  style: c
}) => {
  const d = r && !!a, [h, u] = k(!1), m = `${fe.idPrefix}${e}-${t.name}`, g = () => {
    u((p) => !p);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `loginradius-input-field-container loginradius-password-wrapper
      `,
      children: [
        /* @__PURE__ */ i("label", { htmlFor: t.name, className: "loginradius-input-label", children: t.display }),
        /* @__PURE__ */ i(
          "input",
          {
            placeholder: "Enter your password",
            type: h ? "text" : "password",
            id: m,
            name: t.name,
            value: n,
            onChange: s,
            className: `${l} loginradius-input-field loginradius-password-input ${d ? "loginradius-error-field" : ""} `,
            "aria-label": t.display,
            "aria-invalid": d,
            "aria-describedby": d ? `${t.name}-error` : void 0,
            style: c
          }
        ),
        /* @__PURE__ */ i(
          "span",
          {
            className: "loginradius-password-toggle",
            onClick: g,
            children: h ? (
              // Eye Off SVG
              /* @__PURE__ */ i(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "20",
                  height: "20",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  children: /* @__PURE__ */ i(
                    "path",
                    {
                      d: "M14.7219 7.59688C13.2407 4.47656 11.0016 2.90625 8.00006 2.90625C4.99693 2.90625 2.75943 4.47656 1.27818 7.59844C1.21877 7.72425 1.18796 7.86165 1.18796 8.00078C1.18796 8.13991 1.21877 8.27732 1.27818 8.40312C2.75943 11.5234 4.9985 13.0938 8.00006 13.0938C11.0032 13.0938 13.2407 11.5234 14.7219 8.40156C14.8422 8.14844 14.8422 7.85469 14.7219 7.59688ZM8.00006 11.9688C5.47975 11.9688 3.63443 10.6906 2.33287 8C3.63443 5.30938 5.47975 4.03125 8.00006 4.03125C10.5204 4.03125 12.3657 5.30938 13.6672 8C12.3672 10.6906 10.5219 11.9688 8.00006 11.9688ZM7.93756 5.25C6.41881 5.25 5.18756 6.48125 5.18756 8C5.18756 9.51875 6.41881 10.75 7.93756 10.75C9.45631 10.75 10.6876 9.51875 10.6876 8C10.6876 6.48125 9.45631 5.25 7.93756 5.25ZM7.93756 9.75C6.97037 9.75 6.18756 8.96719 6.18756 8C6.18756 7.03281 6.97037 6.25 7.93756 6.25C8.90475 6.25 9.68756 7.03281 9.68756 8C9.68756 8.96719 8.90475 9.75 7.93756 9.75Z",
                      fill: "currentColor",
                      "fill-opacity": "1"
                    }
                  )
                }
              )
            ) : (
              // Eye SVG
              /* @__PURE__ */ f(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "20",
                  height: "20",
                  viewBox: "0 0 16 16",
                  fill: "none",
                  children: [
                    /* @__PURE__ */ i(
                      "path",
                      {
                        d: "M14.7219 7.59733C14.1727 6.44014 13.519 5.49639 12.761 4.76607L11.966 5.56107C12.6143 6.18061 13.179 6.99108 13.6672 8.00045C12.3672 10.6911 10.5219 11.9692 8.00006 11.9692C7.24308 11.9692 6.54584 11.8526 5.90834 11.6195L5.04693 12.4809C5.93235 12.8898 6.91673 13.0942 8.00006 13.0942C11.0032 13.0942 13.2438 11.5301 14.7219 8.40201C14.7814 8.27621 14.8122 8.1388 14.8122 7.99967C14.8122 7.86054 14.7814 7.72313 14.7219 7.59733ZM13.7287 2.58732L13.0626 1.92045C13.051 1.90883 13.0372 1.89961 13.022 1.89332C13.0068 1.88703 12.9905 1.88379 12.9741 1.88379C12.9577 1.88379 12.9414 1.88703 12.9263 1.89332C12.9111 1.89961 12.8973 1.90883 12.8857 1.92045L11.1768 3.62857C10.2346 3.14732 9.17568 2.9067 8.00006 2.9067C4.99693 2.9067 2.75631 4.47076 1.27818 7.59889C1.21877 7.7247 1.18796 7.8621 1.18796 8.00123C1.18796 8.14036 1.21877 8.27777 1.27818 8.40357C1.86871 9.64733 2.57964 10.6443 3.411 11.3944L1.75756 13.0473C1.73414 13.0708 1.72098 13.1025 1.72098 13.1357C1.72098 13.1688 1.73414 13.2006 1.75756 13.224L2.42459 13.8911C2.44803 13.9145 2.47981 13.9277 2.51295 13.9277C2.54609 13.9277 2.57787 13.9145 2.60131 13.8911L13.7287 2.7642C13.7403 2.75259 13.7495 2.7388 13.7558 2.72363C13.7621 2.70846 13.7653 2.69219 13.7653 2.67576C13.7653 2.65934 13.7621 2.64307 13.7558 2.62789C13.7495 2.61272 13.7403 2.59893 13.7287 2.58732ZM2.33287 8.00045C3.63443 5.30983 5.47975 4.0317 8.00006 4.0317C8.85225 4.0317 9.62709 4.17795 10.3301 4.47529L9.23162 5.57373C8.71142 5.29617 8.11577 5.19316 7.53257 5.2799C6.94936 5.36663 6.40947 5.63851 5.99255 6.05544C5.57562 6.47236 5.30374 7.01225 5.21701 7.59546C5.13027 8.17867 5.23328 8.77431 5.51084 9.29451L4.2074 10.5979C3.486 9.96123 2.86412 9.09858 2.33287 8.00045ZM6.18756 8.00045C6.18783 7.72493 6.2531 7.45335 6.37804 7.20779C6.50299 6.96223 6.68411 6.7496 6.90667 6.58718C7.12923 6.42477 7.38697 6.31714 7.65894 6.27305C7.93092 6.22895 8.20946 6.24964 8.47193 6.33342L6.27053 8.53483C6.21535 8.36208 6.18736 8.1818 6.18756 8.00045Z",
                        fill: "currentColor",
                        fillOpacity: "1"
                      }
                    ),
                    /* @__PURE__ */ i(
                      "path",
                      {
                        d: "M7.9377 9.75031C7.88364 9.75031 7.83036 9.74781 7.77754 9.74297L6.95223 10.5683C7.44862 10.7584 7.98945 10.8006 8.50934 10.6899C9.02923 10.5792 9.50591 10.3203 9.88177 9.94439C10.2576 9.56853 10.5166 9.09185 10.6273 8.57196C10.738 8.05207 10.6958 7.51124 10.5057 7.01485L9.68035 7.84016C9.6852 7.89297 9.6877 7.94626 9.6877 8.00032C9.68782 8.23017 9.64264 8.45778 9.55474 8.67016C9.46684 8.88253 9.33794 9.0755 9.17541 9.23803C9.01288 9.40055 8.81992 9.52945 8.60754 9.61735C8.39517 9.70526 8.16755 9.75044 7.9377 9.75031Z",
                        fill: "currentColor",
                        fillOpacity: "1"
                      }
                    )
                  ]
                }
              )
            )
          }
        ),
        d && /* @__PURE__ */ i("p", { id: `${t.name}-error`, className: "loginradius-error-message", children: a })
      ]
    }
  );
}, ot = ({
  field: t,
  value: e,
  fieldId: n,
  error: a,
  touched: r,
  onChange: s,
  switchText: l,
  onSwitchClick: c,
  className: d = ""
}) => {
  const [h, u] = k("91"), [m, g] = k(""), p = be(
    () => ya.map((v) => ({
      value: v.dialCode.slice(1),
      text: v.dialCode,
      label: `${v.name} (${v.dialCode})`,
      name: v.name
    })),
    []
  );
  X(() => {
    if (!e) {
      g("");
      return;
    }
    const v = ya.find(
      (O) => e.startsWith(O.dialCode.replace("+", ""))
    );
    if (v) {
      const O = v.dialCode.replace("+", "");
      u(O), g(e.slice(O.length));
    } else
      g(e);
  }, [e]);
  const b = (v, O) => {
    const L = O ? `${v}${O}` : "";
    s({
      target: { name: t.name, value: L }
    });
  }, x = (v) => v.replace(/[^\d\-()]/g, ""), P = (v) => {
    const O = v.target.value, L = x(O);
    L !== m && (g(L), b(h, L));
  }, E = (v) => {
    const O = v.target.value;
    u(O), b(O, m);
  }, w = r && !!a, R = `${fe.idPrefix}${n}-${t.name}`;
  return /* @__PURE__ */ f(
    "div",
    {
      className: `loginradius-input-field-container ${w ? "loginradius-error-icon" : ""}`,
      children: [
        /* @__PURE__ */ f("div", { style: { display: "flex", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ i("label", { htmlFor: R, className: "loginradius-input-label", children: t.display }),
          l && c && /* @__PURE__ */ i(
            Y,
            {
              ButtonText: l,
              onClick: c,
              ButtonId: H.switch
            }
          )
        ] }),
        /* @__PURE__ */ f(
          "div",
          {
            className: `loginradius-phone-input-wrapper ${w ? "loginradius-error-field" : ""}`,
            children: [
              /* @__PURE__ */ i(
                Be,
                {
                  field: {
                    name: "countryCode",
                    display: "Country Code",
                    options: p
                  },
                  hasLabel: !1,
                  className: "loginradius-country-code-selector",
                  optionsClassName: "loginradius-country-option",
                  value: h,
                  onChange: E,
                  fieldId: "country"
                }
              ),
              /* @__PURE__ */ i(
                "input",
                {
                  type: "tel",
                  inputMode: "tel",
                  placeholder: "Enter your phone number",
                  id: R,
                  name: t.name,
                  value: m,
                  onChange: P,
                  className: `loginradius-input-field ${w ? "loginradius-error-field" : ""}`,
                  "aria-label": t.display,
                  "aria-describedby": w ? `${t.name}-error` : void 0,
                  autoComplete: "tel",
                  maxLength: 15
                }
              )
            ]
          }
        ),
        w && /* @__PURE__ */ i(
          "p",
          {
            id: `${t.name}-error`,
            className: "loginradius-error-message",
            role: "alert",
            "aria-live": "polite",
            children: a
          }
        )
      ]
    }
  );
}, Yn = ({
  field: t,
  fieldId: e,
  className: n = "",
  style: a,
  error: r,
  value: s,
  touched: l,
  description: c,
  onChange: d
}) => {
  const h = l && !!r, u = `${fe.idPrefix}${e}-${t.name}`;
  return /* @__PURE__ */ f("div", { className: "loginradius-input-field-container", children: [
    /* @__PURE__ */ f(
      "div",
      {
        style: { display: "flex", flexDirection: "column", gap: 8 },
        className: n,
        children: [
          /* @__PURE__ */ i("h5", { children: t.display }),
          /* @__PURE__ */ f("div", { style: { display: "flex", alignItems: "center" }, children: [
            /* @__PURE__ */ i(
              "input",
              {
                type: "checkbox",
                id: u,
                name: t.name,
                checked: s,
                onChange: d,
                className: `loginradius-input-checkbox ${h ? "loginradius-error-checkbox" : ""} ${s ? "checked" : ""}`,
                "aria-label": t.display,
                "aria-invalid": h,
                "aria-describedby": h ? `${t.name}-error` : void 0
              }
            ),
            /* @__PURE__ */ i(
              "label",
              {
                htmlFor: t.name,
                style: { marginLeft: "10px" },
                className: "loginradius-input-label",
                children: t.description
              }
            )
          ] })
        ]
      }
    ),
    h && /* @__PURE__ */ i("p", { id: `${t.name}-error`, className: "loginradius-error-message", children: r })
  ] });
}, c4 = (t) => {
  const [e, n] = k(
    t.field.name === "username" ? "username" : "email"
  ), a = (r) => {
    n(r), t.onChange({
      target: { name: t.field.name, value: "" }
    }), t.onComponentChange && t.onComponentChange(r);
  };
  return /* @__PURE__ */ i("div", { children: e === "email" || e === "username" ? /* @__PURE__ */ i(
    Ee,
    {
      ...t,
      field: { ...t.field },
      switchText: e === "username" ? "" : "Use Phone",
      onSwitchClick: () => a("phone")
    }
  ) : /* @__PURE__ */ i(
    ot,
    {
      ...t,
      field: { ...t.field, display: "Phone" },
      switchText: "Use Email",
      onSwitchClick: () => a("email")
    }
  ) });
}, $e = ({
  field: t,
  value: e,
  fieldId: n,
  error: a,
  touched: r,
  onChange: s,
  handleComponentChange: l
}) => t.type === "hidden" ? null : t.name === "phoneid" && t.type === "string" ? /* @__PURE__ */ i(
  ot,
  {
    field: t,
    fieldId: n,
    value: e,
    onChange: s,
    error: a,
    touched: r
  }
) : /* @__PURE__ */ i("div", { children: (() => {
  switch (t.type) {
    case "string":
      return /* @__PURE__ */ i(
        Ee,
        {
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "identifier":
      return /* @__PURE__ */ i(
        c4,
        {
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          onComponentChange: l,
          error: a,
          touched: r
        }
      );
    case "text":
      return /* @__PURE__ */ i(
        ss,
        {
          field: t,
          fieldId: n,
          disabled: t.readonly,
          className: "loginradius-textarea",
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "email":
      return /* @__PURE__ */ i(
        Ee,
        {
          type: "email",
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "password":
      return /* @__PURE__ */ i(
        qe,
        {
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "phone":
      return /* @__PURE__ */ i(
        ot,
        {
          type: "tel",
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "tel":
      return /* @__PURE__ */ i(
        ot,
        {
          type: "tel",
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "username":
      return /* @__PURE__ */ i(
        Ee,
        {
          type: "username",
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "consent":
      return /* @__PURE__ */ i(
        Yn,
        {
          field: t,
          fieldId: n,
          value: e,
          className: "loginradius-consent-toggle",
          touched: r,
          error: a,
          onChange: (d) => s(d)
        }
      );
    case "checkbox":
    case "multi":
      return /* @__PURE__ */ i(
        Mt,
        {
          field: t,
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      );
    case "option":
      return t.options ? /* @__PURE__ */ i(
        Be,
        {
          field: {
            ...t,
            options: t.options.map((d) => ({
              name: d.name,
              text: d.name,
              value: d.value
            }))
          },
          fieldId: n,
          value: e,
          onChange: s,
          error: a,
          touched: r
        }
      ) : null;
    case "plain":
      return /* @__PURE__ */ f("div", { className: "loginradius-plain-text", children: [
        /* @__PURE__ */ i("h5", { children: t.display }),
        /* @__PURE__ */ i("div", { children: t.value })
      ] });
    default:
      return null;
  }
})() }), Ke = (t) => {
  const e = (L) => L.reduce((A, C) => (A[C.name] = C.type === "checkbox" || C.type === "multi" ? !1 : C.type === "Otp" ? "" : C.value || "", A), {}), n = e(t), [a, r] = k(n), [s, l] = k({}), [c, d] = k({}), [h, u] = k(
    "email"
  );
  X(() => {
    const L = e(t);
    r((A) => {
      const C = {};
      return t.forEach((y) => {
        C[y.name] = y.name in A ? A[y.name] : L[y.name];
      }), C;
    });
  }, [t]);
  const m = (L) => $n.test(L), g = (L) => _n.test(L), p = (L) => Vn.test(L), b = ne(
    (L, A) => {
      var I, N, W;
      if (!L.rules) return "";
      const C = L.rules.split("|"), y = A == null ? "" : String(A);
      for (const $ of C) {
        if ($ === "required") {
          if (L.type === "checkbox" || L.type === "multi") {
            if (A !== !0) return `${L.display} is required`;
          } else if (!y)
            return L.type === "identifier" && h === "phone" ? "Phone is required" : `${L.display} is required`;
        }
        if (!(!y && !$.includes("required"))) {
          if ($ === "valid_email" && !m(y))
            return `${L.display} must be a valid email address`;
          if (L.type === "identifier") {
            if (L.name === he.EMAIL || L.name === he.EMAIL_OR_PHONE) {
              if (h === "email" && !m(y))
                return `${L.display} must be a valid email address`;
            } else if (L.name === he.EMAIL_OR_USERNAME || L.name === he.EMAIL_OR_USERNAME_OR_PHONE) {
              if (h === "email" && !m(y) && !p(y))
                return `${L.display} must be a valid email or username`;
            } else if (L.name === he.USERNAME && !p(y))
              return `${L.display} must be a valid username`;
            if (h === "phone" && !g(y))
              return "Phone must be a valid phone number";
          } else if (L.type === "string") {
            if (L.name === he.EMAIL_OR_USERNAME) {
              const Z = m(y), M = p(y);
              if (!Z && !M)
                return `${L.display} must be a valid email or username`;
            } else if (L.name === he.USERNAME) {
              if (!p(y))
                return `${L.display} must be a valid username`;
            } else if (L.name === he.EMAIL && !m(y))
              return `${L.display} must be a valid email`;
          }
          if ($.startsWith("min_length")) {
            const Z = parseInt(((I = $.match(/\[(\d+)\]/)) == null ? void 0 : I[1]) || "0");
            if (y.length < Z)
              return `${L.display} must be at least ${Z} character${Z > 1 ? "s" : ""}`;
          }
          if ($.startsWith("max_length")) {
            const Z = parseInt(((N = $.match(/\[(\d+)\]/)) == null ? void 0 : N[1]) || "0");
            if (y.length > Z)
              return `${L.display} must be at most ${Z} character${Z > 1 ? "s" : ""}`;
          }
          if ($.startsWith("matches")) {
            const Z = (W = $.match(/\[(.+)\]/)) == null ? void 0 : W[1];
            if (Z && a[Z] !== A)
              return `${L.display} must match ${Z}`;
          }
        }
      }
      return "";
    },
    [a, h]
  ), x = (L) => {
    const A = L.target, C = "name" in A ? String(A.name) : "", y = "value" in A ? String(A.value) : "";
    if (("type" in A ? A.type : "") === "checkbox") {
      const N = A;
      r((W) => ({ ...W, [C]: N.checked }));
    } else
      r((N) => ({ ...N, [C]: y }));
    d((N) => ({ ...N, [C]: !0 })), w(C);
  }, P = (L) => {
    r((A) => {
      const C = [
        he.EMAIL,
        he.IDENTIFIER,
        he.EMAIL_OR_PHONE,
        he.EMAIL_OR_USERNAME,
        he.EMAIL_OR_USERNAME_OR_PHONE
      ], y = { ...A };
      return C.forEach((I) => {
        I in A && (y[I] = "");
      }), y;
    }), u(L);
  }, E = () => {
    const L = {};
    let A = !0;
    t.forEach((y) => {
      const I = b(y, a[y.name]);
      I && (L[y.name] = I, A = !1);
    }), l(L);
    const C = t.reduce((y, I) => (y[I.name] = !0, y), {});
    return d(C), A;
  }, w = ne(
    (L) => {
      const A = t.find((y) => y.name === L);
      if (!A) return "";
      const C = b(A, a[L]);
      return l((y) => y[L] === C ? y : { ...y, [L]: C }), d((y) => ({ ...y, [L]: !0 })), C;
    },
    [t, a, b]
  ), R = (L) => (A) => {
    A.preventDefault(), E() && L(a);
  }, v = ne(
    (L, A = tn) => L ? L.length !== A ? `OTP must be ${A} digits` : "" : "OTP is required",
    []
  ), O = ne(
    (L) => L.every((A) => {
      const C = a[A.name];
      return typeof C == "string" && C.length === 1;
    }),
    [a]
  );
  return X(() => {
    const L = {};
    t.forEach((A) => {
      if (c[A.name]) {
        const C = b(A, a[A.name]);
        C && (L[A.name] = C);
      }
    }), JSON.stringify(s) !== JSON.stringify(L) && l(L);
  }, [a, c, t, b, h]), {
    values: a,
    errors: s,
    touched: c,
    handleChange: x,
    handleComponentChange: P,
    handleSubmit: R,
    validateForm: E,
    validateSingleField: w,
    validateCompleteOtp: v,
    isOtpComplete: O
  };
}, ce = () => {
  const { lrInstance: t } = re(), e = os(t.controller), [n, a] = k(
    e.getAccessToken() || null
  ), [r, s] = k(
    e.getInvitationToken() || null
  ), [l, c] = k(
    e.getMFAToken() || null
  ), [d, h] = k(
    e.getPinAuthToken() || null
  ), [u, m] = k(
    e.getConsentToken() || null
  ), [g, p] = k(e.getPrivacyPolicyAccessToken() || null), [b, x] = k(
    e.getEmail() || null
  ), [P, E] = k(
    e.getPhone() || null
  ), [w, R] = k(
    e.getUsername() || null
  ), v = ne(
    (M) => {
      M ? (e.setPhone(M), E(M)) : (e.removePhone(), E(null));
    },
    [e]
  ), O = ne(
    (M) => {
      M ? (e.setEmail(M), x(M)) : (e.removeEmail(), x(null));
    },
    [e]
  ), L = ne(
    (M) => {
      M ? (e.setUsername(M), R(M)) : (e.removeUsername(), R(null));
    },
    [e]
  ), A = ne(
    (M) => {
      M ? (e.setAccessToken(M), a(M)) : (e.removeAccessToken(), a(null));
    },
    [e]
  ), C = ne(
    (M) => {
      M ? (e.setMFAToken(M), c(M)) : (e.removeAccessToken(), c(null));
    },
    [e]
  ), y = ne(
    (M) => {
      M ? (e.setInvitationToken(M), s(M)) : (e.removeInvitationToken(), s(null));
    },
    [e]
  ), I = ne(
    (M) => {
      M ? (e.setPinAuthToken(M), h(M)) : (e.removePinAuthToken(), h(null));
    },
    [e]
  ), N = ne(
    (M) => {
      M ? (e.setConsentToken(M), m(M)) : (e.removeConsentToken(), m(null));
    },
    [e]
  ), W = ne(
    (M) => {
      M ? (e.setPrivacyPolicyAccessToken(M), p(M)) : (e.removePrivacyPolicyAccessToken(), p(null));
    },
    [e]
  ), $ = ne(async () => await e.getUser(), [e]), Z = ne(() => {
    e.logout(), a(null);
  }, [e]);
  return {
    accessToken: n,
    MFAToken: l,
    pinAuthToken: d,
    consentToken: u,
    privacyPolicyAccessToken: g,
    invitationToken: r,
    email: b,
    phone: P,
    username: w,
    setEmail: O,
    setPhone: v,
    setUsername: L,
    setAccessToken: A,
    setMFAToken: C,
    setPinAuthToken: I,
    setConsentToken: N,
    setPrivacyPolicyAccessToken: W,
    setInvitationToken: y,
    getUser: $,
    isAuthenticated: e.isAuthenticated,
    logout: Z
  };
}, an = {
  body: {
    bg: "#f5f5f5",
    // light grey background
    text: "#000000",
    // black text
    subtext: "#00000033",
    // grey text for subtext
    primary: "#007bff",
    // blue primary color
    primaryring: "#007bff33"
    // light blue for focus ring
  },
  card: { bg: "#ffffff" },
  // white background for cards
  input: { border: "#cccccc", bg: "#ffffff" },
  // light grey border and white background for inputs
  button: { bg: "#007bff", text: "#ffffff" },
  // blue background and white text for buttons
  link: { text: "#007bff" },
  // blue for links
  // default logo URL
  fontFamily: "Arial, sans-serif"
  // default font family
}, uo = Ta({
  theme: an
}), Ff = ({
  theme: t,
  children: e
}) => {
  var a;
  const n = {
    ...an,
    ...t,
    body: {
      ...an.body,
      ...t == null ? void 0 : t.body,
      primaryring: t.body.primary ? `${(a = t == null ? void 0 : t.body) == null ? void 0 : a.primary}33` : an.body.primaryring
    }
  };
  return /* @__PURE__ */ i(
    uo.Provider,
    {
      value: { theme: n },
      children: e
    }
  );
}, ho = () => qn(uo), de = ({
  src: t,
  alt: e = "Logo",
  width: n,
  height: a,
  className: r,
  style: s
}) => {
  const { theme: l } = ho(), c = t || l.logo;
  return c ? /* @__PURE__ */ i(
    "img",
    {
      src: c,
      alt: e,
      className: r || "loginradius-card-logo",
      width: n || 80,
      height: a || 80
    }
  ) : /* @__PURE__ */ i("div", { className: r || "loginradius-card-logo" });
}, pe = ({ error: t, setError: e }) => (X(() => {
  const n = setTimeout(() => {
    e(null);
  }, 5e3);
  return () => clearTimeout(n);
}, [t, e]), /* @__PURE__ */ f("div", { className: "loginradius-error-container", children: [
  /* @__PURE__ */ i("div", { className: "loginradius-error-icon", children: /* @__PURE__ */ i(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      x: "0px",
      y: "0px",
      width: "100",
      height: "100",
      viewBox: "0,0,256,256",
      children: /* @__PURE__ */ i(
        "g",
        {
          fill: "currentColor",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: "1",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: "10",
          strokeDasharray: "",
          strokeDashoffset: "0",
          fontFamily: "none",
          fontWeight: "none",
          fontSize: "none",
          textAnchor: "none",
          children: /* @__PURE__ */ i("g", { transform: "scale(5.12,5.12)", children: /* @__PURE__ */ i("path", { d: "M25,2c-12.681,0 -23,10.319 -23,23c0,12.681 10.319,23 23,23c12.681,0 23,-10.319 23,-23c0,-12.681 -10.319,-23 -23,-23zM33.71,32.29c0.39,0.39 0.39,1.03 0,1.42c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29l-7.29,-7.29l-7.29,7.29c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29c-0.39,-0.39 -0.39,-1.03 0,-1.42l7.29,-7.29l-7.29,-7.29c-0.39,-0.39 -0.39,-1.03 0,-1.42c0.39,-0.39 1.03,-0.39 1.42,0l7.29,7.29l7.29,-7.29c0.39,-0.39 1.03,-0.39 1.42,0c0.39,0.39 0.39,1.03 0,1.42l-7.29,7.29z" }) })
        }
      )
    }
  ) }),
  /* @__PURE__ */ i("span", { className: "loginradius-error-message", children: t })
] })), te = ({
  ButtonText: t,
  ButtonId: e = "",
  type: n,
  icon: a,
  iconPosition: r = "left",
  className: s = "",
  style: l,
  loading: c = !1,
  onClick: d
}) => {
  const h = `${fe.idPrefix}${n}-${e}`;
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      id: h,
      className: `loginradius-button ${s}`.trim(),
      style: l,
      onClick: d,
      disabled: c,
      children: c ? /* @__PURE__ */ i("div", { className: "spinner" }) : /* @__PURE__ */ f(Wn, { children: [
        a && r === "left" && /* @__PURE__ */ i(Pe, { name: a, size: 20 }),
        /* @__PURE__ */ i("span", { children: t }),
        a && r === "right" && /* @__PURE__ */ i(Pe, { name: a, size: 20 })
      ] })
    }
  );
}, d4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Send Magic Link",
    icon: "EnvelopeIcon",
    iconPosition: "left",
    ...t
  }
), u4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='21'%20height='20'%20viewBox='0%200%2021%2020'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_428_24941)'%3e%3cpath%20d='M7.30071%200.658267C5.3024%201.3515%203.57906%202.66728%202.38382%204.41233C1.18858%206.15739%200.584442%208.23974%200.660147%2010.3535C0.735851%2012.4673%201.48741%2014.5011%202.80442%2016.1562C4.12143%2017.8113%205.93449%2019.0004%207.97727%2019.5489C9.6334%2019.9762%2011.3685%2019.995%2013.0335%2019.6036C14.5418%2019.2648%2015.9363%2018.5401%2017.0804%2017.5005C18.2711%2016.3854%2019.1355%2014.9668%2019.5804%2013.3973C20.064%2011.6906%2020.1501%209.89566%2019.832%208.15045H10.532V12.0083H15.9179C15.8103%2012.6236%2015.5796%2013.2108%2015.2397%2013.7349C14.8998%2014.2589%2014.4577%2014.7091%2013.9398%2015.0583C13.2821%2015.4933%2012.5407%2015.786%2011.7632%2015.9176C10.9834%2016.0626%2010.1836%2016.0626%209.40383%2015.9176C8.6135%2015.7542%207.86586%2015.428%207.20852%2014.9598C6.1525%2014.2123%205.35958%2013.1503%204.94289%2011.9255C4.51917%2010.6776%204.51917%209.32484%204.94289%208.07702C5.2395%207.20235%205.72982%206.40598%206.37727%205.74733C7.11819%204.97975%208.05622%204.43107%209.08845%204.16151C10.1207%203.89195%2011.2072%203.91191%2012.2288%204.2192C13.0269%204.46419%2013.7567%204.89223%2014.3601%205.4692C14.9674%204.86504%2015.5736%204.25931%2016.1788%203.65202C16.4913%203.32545%2016.832%203.01452%2017.1398%202.68014C16.2188%201.82307%2015.1377%201.15617%2013.9585%200.717642C11.8112%20-0.062061%209.46161%20-0.0830148%207.30071%200.658267Z'%20fill='white'/%3e%3cpath%20d='M7.30059%200.65805C9.46131%20-0.0837359%2011.8109%20-0.0633337%2013.9584%200.715863C15.1378%201.15737%2016.2184%201.82748%2017.1381%202.68774C16.8256%203.02211%2016.4959%203.33461%2016.1771%203.65961C15.5709%204.26482%2014.9652%204.86795%2014.36%205.46899C13.7566%204.89201%2013.0268%204.46397%2012.2287%204.21899C11.2074%203.91061%2010.1209%203.8895%209.08843%204.15796C8.05593%204.42642%207.11732%204.97408%206.37559%205.74086C5.72814%206.39951%205.23781%207.19589%204.94121%208.07055L1.70215%205.56274C2.86154%203.26361%204.86894%201.50496%207.30059%200.65805Z'%20fill='%23E33629'/%3e%3cpath%20d='M0.84316%208.04688C1.01726%207.18405%201.30629%206.34848%201.70253%205.5625L4.9416%208.07656C4.51787%209.32438%204.51787%2010.6772%204.9416%2011.925C3.86243%2012.7583%202.78274%2013.5958%201.70253%2014.4375C0.710583%2012.463%200.408054%2010.2133%200.84316%208.04688Z'%20fill='%23F8BD00'/%3e%3cpath%20d='M10.5319%208.14844H19.8319C20.1501%209.89365%2020.064%2011.6885%2019.5804%2013.3953C19.1354%2014.9648%2018.2711%2016.3834%2017.0804%2017.4984C16.0351%2016.6828%2014.9851%2015.8734%2013.9398%2015.0578C14.458%2014.7082%2014.9003%2014.2576%2015.2402%2013.733C15.5801%2013.2084%2015.8106%2012.6205%2015.9179%2012.0047H10.5319C10.5304%2010.7203%2010.5319%209.43437%2010.5319%208.14844Z'%20fill='%23587DBD'/%3e%3cpath%20d='M1.70068%2014.4373C2.78089%2013.604%203.86058%2012.7665%204.93975%2011.9248C5.35726%2013.1501%206.15132%2014.2121%207.2085%2014.9592C7.86788%2015.4252%208.61714%2015.7488%209.4085%2015.9092C10.1883%2016.0542%2010.9881%2016.0542%2011.7679%2015.9092C12.5454%2015.7776%2013.2867%2015.4849%2013.9444%2015.0498C14.9897%2015.8654%2016.0397%2016.6748%2017.0851%2017.4904C15.9411%2018.5306%2014.5466%2019.2559%2013.0382%2019.5951C11.3732%2019.9865%209.63806%2019.9678%207.98193%2019.5404C6.67209%2019.1907%205.44861%2018.5742%204.38818%2017.7295C3.26578%2016.8384%202.34905%2015.7154%201.70068%2014.4373Z'%20fill='%23319F43'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_428_24941'%3e%3crect%20width='20'%20height='20'%20fill='white'%20transform='translate(0.333496)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", h4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='21'%20height='20'%20viewBox='0%200%2021%2020'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_428_25049)'%3e%3cpath%20d='M20.5%2010C20.5%204.47719%2016.0228%200%2010.5%200C4.97719%200%200.5%204.47719%200.5%2010C0.5%2014.9913%204.15687%2019.1284%208.9375%2019.8785V12.8906H6.39844V10H8.9375V7.79688C8.9375%205.29063%2010.4305%203.90625%2012.7147%203.90625C13.8088%203.90625%2014.9531%204.10156%2014.9531%204.10156V6.5625H13.6922C12.4499%206.5625%2012.0625%207.33336%2012.0625%208.12422V10H14.8359L14.3926%2012.8906H12.0625V19.8785C16.8431%2019.1284%2020.5%2014.9913%2020.5%2010Z'%20fill='%231877F2'/%3e%3cpath%20d='M14.3926%2012.8906L14.8359%2010H12.0625V8.12422C12.0625%207.33328%2012.4499%206.5625%2013.6922%206.5625H14.9531V4.10156C14.9531%204.10156%2013.8088%203.90625%2012.7146%203.90625C10.4305%203.90625%208.9375%205.29063%208.9375%207.79688V10H6.39844V12.8906H8.9375V19.8785C9.45439%2019.9595%209.9768%2020.0001%2010.5%2020C11.0232%2020.0001%2011.5456%2019.9595%2012.0625%2019.8785V12.8906H14.3926Z'%20fill='white'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_428_25049'%3e%3crect%20width='20'%20height='20'%20fill='white'%20transform='translate(0.5)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", m4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='19'%20height='18'%20viewBox='0%200%2019%2018'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_428_24985)'%3e%3cpath%20d='M11.3425%207.62188L17.8993%200H16.3454L10.6524%206.61781L6.1051%200H0.860352L7.73663%2010.0074L0.860352%2018H2.41426L8.42654%2011.0114L13.2286%2018H18.4734L11.3421%207.62188H11.3425ZM9.21432%2010.0955L8.51752%209.099L2.97409%201.16972H5.36077L9.8342%207.569L10.5309%208.56547L16.3461%2016.8834H13.9597L9.21432%2010.0959V10.0955Z'%20fill='black'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_428_24985'%3e%3crect%20width='18'%20height='18'%20fill='white'%20transform='translate(0.666992)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e", f4 = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eLinkedIn%3c/title%3e%3cpath%20fill='%23007bb6'%20d='M20.447%2020.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853%200-2.136%201.445-2.136%202.939v5.667H9.351V9h3.414v1.561h.046c.477-.9%201.637-1.85%203.37-1.85%203.601%200%204.267%202.37%204.267%205.455v6.286zM5.337%207.433c-1.144%200-2.063-.926-2.063-2.065%200-1.138.92-2.063%202.063-2.063%201.14%200%202.064.925%202.064%202.063%200%201.139-.925%202.065-2.064%202.065zm1.782%2013.019H3.555V9h3.564v11.452zM22.225%200H1.771C.792%200%200%20.774%200%201.729v20.542C0%2023.227.792%2024%201.771%2024h20.451C23.2%2024%2024%2023.227%2024%2022.271V1.729C24%20.774%2023.2%200%2022.222%200h.003z'/%3e%3c/svg%3e", p4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='21'%20height='20'%20viewBox='0%200%2021%2020'%20fill='none'%3e%3cpath%20d='M10.4998%201.66699C9.40549%201.66699%208.32185%201.88254%207.31081%202.30133C6.29976%202.72012%205.3811%203.33395%204.60728%204.10777C3.04448%205.67057%202.1665%207.79019%202.1665%2010.0003C2.1665%2013.6837%204.55817%2016.8087%207.8665%2017.917C8.28317%2017.9837%208.4165%2017.7253%208.4165%2017.5003V16.092C6.10817%2016.592%205.6165%2014.9753%205.6165%2014.9753C5.23317%2014.0087%204.6915%2013.7503%204.6915%2013.7503C3.93317%2013.2337%204.74984%2013.2503%204.74984%2013.2503C5.58317%2013.3087%206.02484%2014.1087%206.02484%2014.1087C6.74984%2015.3753%207.97484%2015.0003%208.44984%2014.8003C8.52484%2014.2587%208.7415%2013.892%208.97484%2013.6837C7.12484%2013.4753%205.18317%2012.7587%205.18317%209.58366C5.18317%208.65866%205.49984%207.91699%206.0415%207.32533C5.95817%207.11699%205.6665%206.25033%206.12484%205.12533C6.12484%205.12533%206.82484%204.90033%208.4165%205.97533C9.07484%205.79199%209.7915%205.70033%2010.4998%205.70033C11.2082%205.70033%2011.9248%205.79199%2012.5832%205.97533C14.1748%204.90033%2014.8748%205.12533%2014.8748%205.12533C15.3332%206.25033%2015.0415%207.11699%2014.9582%207.32533C15.4998%207.91699%2015.8165%208.65866%2015.8165%209.58366C15.8165%2012.767%2013.8665%2013.467%2012.0082%2013.6753C12.3082%2013.9337%2012.5832%2014.442%2012.5832%2015.217V17.5003C12.5832%2017.7253%2012.7165%2017.992%2013.1415%2017.917C16.4498%2016.8003%2018.8332%2013.6837%2018.8332%2010.0003C18.8332%208.90598%2018.6176%207.82234%2018.1988%206.8113C17.78%205.80025%2017.1662%204.88159%2016.3924%204.10777C15.6186%203.33395%2014.6999%202.72012%2013.6889%202.30133C12.6778%201.88254%2011.5942%201.66699%2010.4998%201.66699Z'%20fill='black'/%3e%3c/svg%3e", g4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='25'%20height='24'%20viewBox='0%200%2025%2024'%20fill='none'%3e%3cpath%20d='M17.5502%2020.28C16.5702%2021.23%2015.5002%2021.08%2014.4702%2020.63C13.3802%2020.17%2012.3802%2020.15%2011.2302%2020.63C9.79016%2021.25%209.03016%2021.07%208.17016%2020.28C3.29016%2015.25%204.01016%207.59%209.55016%207.31C10.9002%207.38%2011.8402%208.05%2012.6302%208.11C13.8102%207.87%2014.9402%207.18%2016.2002%207.27C17.7102%207.39%2018.8502%207.99%2019.6002%209.07C16.4802%2010.94%2017.2202%2015.05%2020.0802%2016.2C19.5102%2017.7%2018.7702%2019.19%2017.5402%2020.29L17.5502%2020.28ZM12.5302%207.25C12.3802%205.02%2014.1902%203.18%2016.2702%203C16.5602%205.58%2013.9302%207.5%2012.5302%207.25Z'%20fill='black'/%3e%3c/svg%3e", w4 = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eFoursquare%20City%20Guide%3c/title%3e%3cpath%20fill='%23f84777'%20d='M17.727%203.465l-.535%202.799c-.064.303-.445.623-.801.623H11.41c-.562%200-.963.391-.963.945v.614c0%20.569.405.96.966.96h4.23c.395%200%20.785.436.697.855l-.535%202.76c-.051.24-.314.63-.785.63h-3.457c-.63%200-.818.091-1.239.601-.42.524-4.206%205.069-4.206%205.069-.037.045-.074.029-.074-.015V3.42c0-.359.311-.78.776-.78h10.274c.375%200%20.73.356.633.821v.004zm.451%2010.98c.145-.578%201.746-8.784%202.281-11.385M18.486%200H5.683C3.918%200%203.4%201.328%203.4%202.164v20.34c0%20.94.504%201.291.789%201.405.284.117%201.069.214%201.541-.328%200%200%206.044-7.014%206.146-7.117.165-.157.165-.157.315-.157h3.914c1.65%200%201.906-1.17%202.086-1.86.15-.569%201.754-8.774%202.279-11.385C20.875%201.08%2020.365%200%2018.49%200h-.004z'/%3e%3c/svg%3e", v4 = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eWindows%2010%3c/title%3e%3cpath%20fill='%23004c9a'%20d='M0%203.449L9.75%202.1v9.451H0m10.949-9.602L24%200v11.4H10.949M0%2012.6h9.75v9.451L0%2020.699M10.949%2012.6H24V24l-12.9-1.801'/%3e%3c/svg%3e", y4 = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3ePayPal%3c/title%3e%3cpath%20fill='%2313487b'%20d='M7.016%2019.198h-4.2a.562.562%200%200%201-.555-.65L5.093.584A.692.692%200%200%201%205.776%200h7.222c3.417%200%205.904%202.488%205.846%205.5-.006.25-.027.5-.066.747A6.794%206.794%200%200%201%2012.071%2012H8.743a.69.69%200%200%200-.682.583l-.325%202.056-.013.083-.692%204.39-.015.087zM19.79%206.142c-.01.087-.01.175-.023.261a7.76%207.76%200%200%201-7.695%206.598H9.007l-.283%201.795-.013.083-.692%204.39-.134.843-.014.088H6.86l-.497%203.15a.562.562%200%200%200%20.555.65h3.612c.34%200%20.63-.249.683-.585l.952-6.031a.692.692%200%200%201%20.683-.584h2.126a6.793%206.793%200%200%200%206.707-5.752c.306-1.95-.466-3.744-1.89-4.906z'/%3e%3c/svg%3e", k4 = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eTencent%20QQ%3c/title%3e%3cpath%20fill='%2329d'%20d='M21.395%2015.035a39.548%2039.548%200%200%200-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526%204.632%2017.351%200%2012%200S4.474%204.632%204.474%209.241c0%20.274.013.804.014.836l-1.08%202.695a38.97%2038.97%200%200%200-.802%202.264c-1.021%203.283-.69%204.643-.438%204.673.54.065%202.103-2.472%202.103-2.472%200%201.469.756%203.387%202.394%204.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578%205.883.369%207.482.189%201.6.18%207.14.389%207.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836%201.637-1.384%202.393-3.302%202.393-4.771%200%200%201.563%202.537%202.103%202.472.251-.03.581-1.39-.438-4.673zM12.662%204.846c.039-1.052.659-1.878%201.385-1.846s1.281.912%201.242%201.964c-.039%201.051-.659%201.878-1.385%201.846s-1.282-.912-1.242-1.964zM9.954%203c.725-.033%201.345.794%201.384%201.846.04%201.052-.517%201.931-1.242%201.963-.726.033-1.346-.794-1.385-1.845C8.672%203.912%209.228%203.033%209.954%203zM7.421%208.294c.194-.43%202.147-.908%204.566-.908h.026c2.418%200%204.372.479%204.566.908a.14.14%200%200%201%20.014.061c0%20.031-.01.059-.026.083-.163.238-2.333%201.416-4.553%201.416h-.026c-2.221%200-4.39-1.178-4.553-1.416a.136.136%200%200%201-.014-.144zm10.422%208.622c-.22%203.676-2.403%205.987-5.774%206.021h-.137c-3.37-.033-5.554-2.345-5.773-6.021-.081-1.35.001-2.496.147-3.43.318.063.638.122.958.176v3.506s1.658.334%203.318.103v-3.225c.488.027.96.04%201.406.034h.025c1.678.021%203.714-.204%205.683-.594.146.934.227%202.08.147%203.43zM10.48%205.804c.313-.041.542-.409.508-.825-.033-.415-.314-.72-.629-.679-.313.04-.541.409-.508.824.034.417.315.72.629.68zM14.479%205.156c.078.037.221.042.289-.146.035-.095.025-.165-.009-.214-.023-.033-.133-.118-.371-.176-.904-.22-1.341.384-1.405.499-.04.072-.012.176.056.227.067.051.139.037.179-.006.58-.628%201.21-.208%201.261-.184z'/%3e%3c/svg%3e", C4 = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eSalesforce%3c/title%3e%3cpath%20fill='%2321a0df'%20d='M10.006%205.415a4.195%204.195%200%20013.045-1.306c1.56%200%202.954.9%203.69%202.205.63-.3%201.35-.45%202.1-.45%202.85%200%205.159%202.34%205.159%205.22s-2.31%205.22-5.176%205.22c-.345%200-.69-.044-1.02-.104a3.75%203.75%200%2001-3.3%201.95c-.6%200-1.155-.15-1.65-.375A4.314%204.314%200%20018.88%2020.4a4.302%204.302%200%2001-4.05-2.82c-.27.062-.54.076-.825.076-2.204%200-4.005-1.8-4.005-4.05%200-1.5.811-2.805%202.01-3.51-.255-.57-.39-1.2-.39-1.846%200-2.58%202.1-4.65%204.65-4.65%201.53%200%202.85.705%203.72%201.8'/%3e%3c/svg%3e", b4 = "data:image/svg+xml,%3csvg%20role='img'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3ctitle%3eSina%20Weibo%3c/title%3e%3cpath%20fill='%23bb3e3e'%20d='M10.098%2020.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609%202.759-5.047%206.74-5.441%203.979-.394%207.413%201.404%207.671%204.018.259%202.6-2.759%205.049-6.737%205.439l-.002.004zM9.05%2017.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595%201.176-.861%201.793-.601.622.263.82.972.442%201.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857%202.118-.836%201.704-.026%203.591%201.886%204.21%201.983.64%204.318-.341%205.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804%200-2.404-.781-1.112-2.915-1.053-5.364-.03%200%200-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888%203.08C1.309%2010.87%200%2013.273%200%2015.348c0%203.981%205.099%206.395%2010.086%206.395%206.536%200%2010.888-3.801%2010.888-6.82%200-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105%201.067.044%201.442.465.376.421.466.977.316%201.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706%201.081.104.496.586.813%201.082.707%201.532-.331%203.185.15%204.296%201.383%201.112%201.246%201.429%202.943.947%204.416-.165.48.106%201.007.586%201.157.479.165.991-.104%201.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z'/%3e%3c/svg%3e", x4 = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20aria-label='Yahoo!'%20role='img'%20viewBox='0%200%20512%20512'%20fill='%23ffffff'%3e%3crect%20width='512'%20height='512'%20rx='15%25'%20fill='%235f01d1'/%3e%3cg%20fill='%23ffffff'%3e%3cpath%20d='M203%20404h-62l25-59-69-165h63l37%2095%2037-95h62m58%2076h-69l62-148h69'/%3e%3ccircle%20cx='303'%20cy='308'%20r='38'/%3e%3c/g%3e%3c/svg%3e", L4 = "data:image/svg+xml,%3csvg%20width='40'%20height='40'%20viewBox='0%200%2040%2040'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.3851%205L20.5426%206.025C21.4001%206.785%2022.2601%207.5425%2023.1076%208.3125C28.6001%2013.3%2033.2501%2018.9125%2036.7501%2025.3725C36.9301%2025.7025%2037.0926%2026.0425%2037.2551%2026.38L37.5001%2026.8875L37.2301%2027.03L37.0276%2026.7425L36.5026%2025.995L36.1351%2025.46C33.5876%2021.7625%2031.0351%2018.06%2027.5301%2015.0975C26.4697%2014.1998%2025.2995%2013.4403%2024.0476%2012.8375C21.5126%2011.625%2019.2576%2012.11%2017.3226%2014.1C15.4826%2015.9925%2014.5276%2018.3425%2013.6651%2020.7325C13.5526%2021.04%2013.4351%2021.345%2013.3176%2021.65L13.1126%2022.1875L12.6826%2022.05C12.9326%2021.18%2013.1626%2020.305%2013.3926%2019.4275C13.9176%2017.44%2014.4426%2015.4525%2015.1726%2013.5375C15.9476%2011.4975%2016.9276%209.53%2017.9051%207.5625C18.3276%206.71%2018.7501%205.8575%2019.1551%205H19.3851Z'%20fill='%23C22E33'/%3e%3cpath%20d='M21.1201%2029.5554C17.0551%2031.4804%207.22012%2033.4654%202.55512%2032.9554C1.79262%2028.9404%209.27512%2010.1254%2012.9501%207.27539L12.7126%207.82039C12.6067%208.07694%2012.4916%208.3296%2012.3676%208.57789L12.2026%208.90039C10.3026%2012.5554%208.40512%2016.2154%207.43262%2020.2254C7.08241%2021.6066%206.89117%2023.0233%206.86262%2024.4479C6.83762%2027.7979%208.92262%2030.0779%2012.4051%2030.2204C14.0801%2030.2879%2015.7726%2030.1129%2017.4626%2029.9354C18.1976%2029.8604%2018.9301%2029.7829%2019.6626%2029.7254C19.9326%2029.7054%2020.1976%2029.6729%2020.5426%2029.6279L21.1201%2029.5579V29.5554Z'%20fill='%23C22E33'/%3e%3cpath%20d='M9.56272%2036.9516C8.45022%2037.0366%207.33772%2037.1216%206.23022%2037.2216C16.4727%2038.1966%2026.3052%2036.5291%2036.0052%2033.1116C32.8427%2027.5366%2028.5802%2023.1341%2023.6252%2019.3066C23.6902%2019.5516%2023.8352%2019.7291%2023.9777%2019.9041L24.0977%2020.0541C24.5227%2020.6191%2024.9677%2021.1741%2025.4152%2021.7291C26.4377%2023.0016%2027.4602%2024.2741%2028.2302%2025.6741C30.1752%2029.2241%2029.1202%2032.2941%2025.3102%2033.9141C22.8052%2034.9816%2020.0677%2035.7091%2017.3602%2036.1441C14.7852%2036.5541%2012.1727%2036.7516%209.56272%2036.9516Z'%20fill='%23C22E33'/%3e%3c/svg%3e", R4 = "data:image/svg+xml,%3csvg%20width='40'%20height='38'%20viewBox='0%200%2040%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M18.1787%203.43699V33.7228V37.5215L24.2382%2034.6696V0.476757L18.1787%203.43699Z'%20fill='%23F8931E'/%3e%3cpath%20d='M39.1629%2013.4461L39.9993%2022.1309L28.2812%2019.5813'%20fill='%23B3B3B3'/%3e%3cpath%20d='M6.05945%2024.5489C6.05945%2020.2554%2010.7379%2016.6396%2017.1147%2015.5359V11.6871C7.36091%2012.8661%200%2018.1759%200%2024.5489C0%2031.1517%207.90095%2036.6128%2018.1783%2037.5215V33.7228C11.2638%2032.8559%206.05945%2029.0782%206.05945%2024.5489ZM25.3014%2011.6887V15.5359C27.8386%2015.975%2030.1083%2016.8097%2031.9197%2017.9293L36.2043%2015.2814C33.2844%2013.4766%2029.5158%2012.198%2025.3014%2011.6887Z'%20fill='%23B3B3B3'/%3e%3c/svg%3e", A4 = "data:image/svg+xml,%3csvg%20width='14'%20height='14'%20viewBox='0%200%2014%2014'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7%200C3.13438%200%200%203.13438%200%207C0%2010.8656%203.13438%2014%207%2014C10.8656%2014%2014%2010.8656%2014%207C14%203.13438%2010.8656%200%207%200ZM7%2012.8125C3.79063%2012.8125%201.1875%2010.2094%201.1875%207C1.1875%203.79063%203.79063%201.1875%207%201.1875C10.2094%201.1875%2012.8125%203.79063%2012.8125%207C12.8125%2010.2094%2010.2094%2012.8125%207%2012.8125Z'%20fill='black'%20fill-opacity='0.45'/%3e%3cpath%20d='M6.25%204.25C6.25%204.44891%206.32902%204.63968%206.46967%204.78033C6.61032%204.92098%206.80109%205%207%205C7.19891%205%207.38968%204.92098%207.53033%204.78033C7.67098%204.63968%207.75%204.44891%207.75%204.25C7.75%204.05109%207.67098%203.86032%207.53033%203.71967C7.38968%203.57902%207.19891%203.5%207%203.5C6.80109%203.5%206.61032%203.57902%206.46967%203.71967C6.32902%203.86032%206.25%204.05109%206.25%204.25ZM7.375%206H6.625C6.55625%206%206.5%206.05625%206.5%206.125V10.375C6.5%2010.4438%206.55625%2010.5%206.625%2010.5H7.375C7.44375%2010.5%207.5%2010.4438%207.5%2010.375V6.125C7.5%206.05625%207.44375%206%207.375%206Z'%20fill='black'%20fill-opacity='0.45'/%3e%3c/svg%3e", E4 = "data:image/svg+xml,%3csvg%20width='48'%20height='42'%20viewBox='0%200%2048%2042'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2.3588%2042C1.93102%2042%201.54213%2041.8934%201.19213%2041.6803C0.842131%2041.4672%200.569909%2041.1849%200.375464%2040.8333C0.18102%2040.4818%200.0744646%2040.1022%200.0557979%2039.6947C0.0371312%2039.2871%200.143687%2038.8889%200.375464%2038.5L21.9588%201.16667C22.1921%200.777778%2022.4939%200.486111%2022.8641%200.291667C23.2344%200.0972222%2023.6131%200%2024.0005%200C24.3878%200%2024.7674%200.0972222%2025.1391%200.291667C25.5109%200.486111%2025.8119%200.777778%2026.0421%201.16667L47.6255%2038.5C47.8588%2038.8889%2047.9661%2039.2879%2047.9475%2039.697C47.9288%2040.1061%2047.8215%2040.4849%2047.6255%2040.8333C47.4295%2041.1818%2047.1572%2041.4641%2046.8088%2041.6803C46.4604%2041.8966%2046.0715%2042.0031%2045.6421%2042H2.3588ZM6.3838%2037.3333H41.6171L24.0005%207L6.3838%2037.3333ZM24.0005%2035C24.6616%2035%2025.2161%2034.776%2025.6641%2034.328C26.1121%2033.88%2026.3354%2033.3262%2026.3338%2032.6667C26.3322%2032.0071%2026.1082%2031.4533%2025.6618%2031.0053C25.2154%2030.5573%2024.6616%2030.3333%2024.0005%2030.3333C23.3394%2030.3333%2022.7856%2030.5573%2022.3391%2031.0053C21.8927%2031.4533%2021.6687%2032.0071%2021.6671%2032.6667C21.6656%2033.3262%2021.8896%2033.8808%2022.3391%2034.3303C22.7887%2034.7799%2023.3425%2035.0031%2024.0005%2035ZM24.0005%2028C24.6616%2028%2025.2161%2027.776%2025.6641%2027.328C26.1121%2026.88%2026.3354%2026.3262%2026.3338%2025.6667V18.6667C26.3338%2018.0056%2026.1098%2017.4518%2025.6618%2017.0053C25.2138%2016.5589%2024.66%2016.3349%2024.0005%2016.3333C23.3409%2016.3318%2022.7871%2016.5558%2022.3391%2017.0053C21.8911%2017.4549%2021.6671%2018.0087%2021.6671%2018.6667V25.6667C21.6671%2026.3278%2021.8911%2026.8823%2022.3391%2027.3303C22.7871%2027.7783%2023.3409%2028.0016%2024.0005%2028Z'%20fill='%23FAAD14'/%3e%3c/svg%3e", P4 = "data:image/svg+xml,%3csvg%20width='15'%20height='16'%20viewBox='0%200%2015%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.4803%202.6791L13.4889%203.4543C12.1371%201.72637%2010.0348%200.617188%207.67403%200.617188C3.59766%200.617188%200.298248%203.91309%200.292975%207.99121C0.287702%2012.0729%203.59415%2015.3828%207.67403%2015.3828C10.8609%2015.3828%2013.5768%2013.3613%2014.6104%2010.5295C14.6367%2010.4557%2014.5981%2010.373%2014.5242%2010.3484L13.5275%2010.0057C13.4928%209.99375%2013.4548%209.99591%2013.4216%2010.0117C13.3884%2010.0274%2013.3627%2010.0556%2013.35%2010.09C13.3184%2010.1779%2013.2832%2010.2658%2013.2463%2010.352C12.9422%2011.0727%2012.5063%2011.7195%2011.9508%2012.275C11.3998%2012.827%2010.7474%2013.2675%2010.0295%2013.5723C9.28594%2013.8869%208.49317%2014.0469%207.67755%2014.0469C6.86016%2014.0469%206.06915%2013.8869%205.32559%2013.5723C4.60696%2013.2688%203.95436%2012.8282%203.4043%2012.275C2.85182%2011.7241%202.41181%2011.0709%202.1088%2010.352C1.79415%209.60664%201.63419%208.81563%201.63419%207.99824C1.63419%207.18086%201.79415%206.38984%202.1088%205.64453C2.4129%204.92383%202.84883%204.27695%203.4043%203.72148C3.95977%203.16602%204.60665%202.73008%205.32559%202.42422C6.06915%202.10957%206.86192%201.94961%207.67755%201.94961C8.49493%201.94961%209.28594%202.10957%2010.0295%202.42422C10.7481%202.7277%2011.4007%203.16833%2011.9508%203.72148C12.1248%203.89551%2012.2883%204.08008%2012.4395%204.27344L11.3813%205.09961C11.3603%205.11581%2011.3444%205.13758%2011.3353%205.16244C11.3262%205.18729%2011.3242%205.21421%2011.3298%205.2401C11.3353%205.26599%2011.348%205.2898%2011.3664%205.3088C11.3848%205.32779%2011.4083%205.34119%2011.434%205.34746L14.5207%206.10332C14.6086%206.12441%2014.6947%206.05762%2014.6947%205.96797L14.7088%202.78809C14.707%202.67207%2014.5717%202.60703%2014.4803%202.6791Z'%20fill='white'/%3e%3c/svg%3e", T4 = "data:image/svg+xml,%3csvg%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M24.0003%2047.3346C20.7725%2047.3346%2017.7392%2046.7217%2014.9003%2045.496C12.0614%2044.2702%209.592%2042.6081%207.492%2040.5096C5.392%2038.4112%203.72988%2035.9417%202.50566%2033.1013C1.28144%2030.2609%200.668551%2027.2275%200.666995%2024.0013C0.66544%2020.7751%201.27833%2017.7417%202.50566%2014.9013C3.733%2012.0609%205.39511%209.59141%207.492%207.49297C9.58888%205.39452%2012.0583%203.73241%2014.9003%202.50664C17.7423%201.28086%2020.7757%200.667969%2024.0003%200.667969C27.225%200.667969%2030.2583%201.28086%2033.1003%202.50664C35.9423%203.73241%2038.4118%205.39452%2040.5087%207.49297C42.6056%209.59141%2044.2684%2012.0609%2045.4973%2014.9013C46.7262%2017.7417%2047.3383%2020.7751%2047.3337%2024.0013C47.329%2027.2275%2046.7161%2030.2609%2045.495%2033.1013C44.2739%2035.9417%2042.6118%2038.4112%2040.5087%2040.5096C38.4056%2042.6081%2035.9361%2044.271%2033.1003%2045.4983C30.2645%2046.7256%2027.2312%2047.3377%2024.0003%2047.3346ZM24.0003%2042.668C26.1003%2042.668%2028.1225%2042.3281%2030.067%2041.6483C32.0114%2040.9685%2033.8003%2039.9862%2035.4337%2038.7013L9.30033%2012.568C8.01699%2014.2013%207.03466%2015.9902%206.35333%2017.9346C5.67199%2019.8791%205.33211%2021.9013%205.33366%2024.0013C5.33366%2029.2124%207.14199%2033.6263%2010.7587%2037.243C14.3753%2040.8596%2018.7892%2042.668%2024.0003%2042.668ZM38.7003%2035.4346C39.9837%2033.8013%2040.966%2032.0124%2041.6473%2030.068C42.3287%2028.1235%2042.6686%2026.1013%2042.667%2024.0013C42.667%2018.7902%2040.8587%2014.3763%2037.242%2010.7596C33.6253%207.14297%2029.2114%205.33464%2024.0003%205.33464C21.9003%205.33464%2019.8781%205.67452%2017.9337%206.3543C15.9892%207.03408%2014.2003%208.01641%2012.567%209.3013L38.7003%2035.4346Z'%20fill='%23F5222D'/%3e%3c/svg%3e", I4 = {
  google: u4,
  facebook: h4,
  twitter: m4,
  linkedin: f4,
  github: p4,
  apple: g4,
  // microsoft: microsoftIcon,
  // amazon: amazonIcon,
  // instagram: instagramIcon,
  // pinterest: pinterestIcon,
  // snapchat: snapchatIcon,
  foursquare: w4,
  live: v4,
  paypal: y4,
  qq: k4,
  salesforce: C4,
  sinaweibo: b4,
  yahoo: x4,
  timerinfo: A4,
  warningicon: E4,
  retryicon: P4,
  blockicon: T4
}, mo = (t) => {
  const e = t.toLowerCase();
  if (e.includes("saml"))
    return L4;
  const n = I4[e];
  return n || (console.warn(
    `No SVG found for provider: ${t}. Falling back to default icon.`
  ), R4);
}, M4 = ({
  displayName: t,
  style: e = {},
  imageSource: n = "",
  onClick: a
}) => /* @__PURE__ */ f(
  "button",
  {
    type: "button",
    className: "loginradius-social-button",
    style: e,
    onClick: a,
    children: [
      /* @__PURE__ */ i("img", { width: 20, src: n, alt: `${t} icon` }),
      /* @__PURE__ */ i("div", { className: "loginradius-social-button-text", children: Si(t) })
    ]
  }
), fo = ({
  buttonsConfig: t,
  style: e,
  className: n,
  options: a
}) => {
  const r = t.filter((l) => {
    var c;
    return (c = l.display) == null ? void 0 : c.trim();
  }), s = gn(a);
  return /* @__PURE__ */ i("div", { className: `${n} loginradius-social-login`, style: e, children: /* @__PURE__ */ i("div", { className: "loginradius-social-login-row", children: r.map((l, c) => {
    const d = l.name.substring(l.name.indexOf("_") + 1).toLowerCase(), h = r.length > 1 ? "loginradius-social-login-col" : "loginradius-social-login-col loginradius-full-width", u = s.addSocialEndpointOptions();
    return /* @__PURE__ */ i("div", { className: h, children: /* @__PURE__ */ i(
      M4,
      {
        imageSource: mo(d),
        onClick: (m) => {
          var g;
          m.preventDefault(), (g = l.data) != null && g.endpoint && s.openWindow(l.data.endpoint + u);
        },
        displayName: d
      }
    ) }, c);
  }) }) });
}, Ve = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Submit",
    icon: "PaperAirplaneIcon",
    iconPosition: "left",
    type: "submit",
    ...t
  }
), po = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Register",
    icon: "KeyIcon",
    iconPosition: "left",
    ...t
  }
), Te = ({
  success: t,
  setSuccess: e
}) => (X(() => {
  const n = setTimeout(() => {
    e(null);
  }, 5e3);
  return () => clearTimeout(n);
}, [t, e]), /* @__PURE__ */ f("div", { className: "loginradius-success-container", children: [
  /* @__PURE__ */ i("div", { className: "loginradius-success-icon", children: /* @__PURE__ */ i(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      x: "0px",
      y: "0px",
      width: "100",
      height: "100",
      viewBox: "0,0,256,256",
      children: /* @__PURE__ */ i(
        "g",
        {
          fill: "currentColor",
          fillRule: "nonzero",
          stroke: "none",
          strokeWidth: "1",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: "10",
          strokeDasharray: "",
          strokeDashoffset: "0",
          fontFamily: "none",
          fontWeight: "none",
          fontSize: "none",
          textAnchor: "none",
          children: /* @__PURE__ */ i("g", { transform: "scale(5.12,5.12)", children: /* @__PURE__ */ i("path", { d: "M25,2c-12.681,0 -23,10.319 -23,23c0,12.681 10.319,23 23,23c12.681,0 23,-10.319 23,-23c0,-12.681 -10.319,-23 -23,-23zM20.707,33.707c-0.391,0.391 -1.023,0.391 -1.414,0l-6-6c-0.391,-0.391 -0.391,-1.023 0,-1.414c0.391,-0.391 1.023,-0.391 1.414,0l5.293,5.293l10.293,-10.293c0.391,-0.391 1.023,-0.391 1.414,0c0.391,0.391 0.391,1.023 0,1.414z" }) })
        }
      )
    }
  ) }),
  /* @__PURE__ */ i("span", { className: "loginradius-success-message", children: t })
] })), N4 = (t, e) => {
  const { lrInstance: n } = re(), [a, r] = k({
    type: null,
    siteKey: "",
    isInvisible: !1,
    theme: "light",
    appId: ""
  }), [s, l] = k(!1), [c, d] = k(null), h = Ce(null), u = Ce({
    widgetId: null,
    tencentInstance: null,
    scripts: /* @__PURE__ */ new Set(),
    promise: null,
    mounted: !0
  }), m = ne(
    (v) => {
      u.current.mounted && (console.error("Captcha error", v), d(null), t(null), e == null || e(v));
    },
    [t, e]
  ), g = ne(
    (v) => {
      const O = [
        [
          (v == null ? void 0 : v.tencentCaptcha) && (v == null ? void 0 : v.tencentCaptchaAppid),
          "tencent",
          "",
          v.tencentCaptchaAppid,
          !1,
          "Tencent Captcha selected appId"
        ],
        [
          v == null ? void 0 : v.hCaptchaSiteKey,
          "hcaptcha",
          v.hCaptchaSiteKey,
          "",
          v.invisibleRecaptcha ?? !1,
          "hCaptcha selected"
        ],
        [
          v == null ? void 0 : v.v3RecaptchaSiteKey,
          "recaptcha_v3",
          v.v3RecaptchaSiteKey,
          "",
          !0,
          "reCAPTCHA v3 selected"
        ],
        [
          (v == null ? void 0 : v.v2Recaptcha) && (v == null ? void 0 : v.v2RecaptchaSiteKey),
          "recaptcha_v2",
          v.v2RecaptchaSiteKey,
          "",
          !0,
          "reCAPTCHA v2 selected"
        ]
      ];
      for (const [
        L,
        A,
        C,
        y,
        I,
        N
      ] of O)
        if (L)
          return {
            type: A,
            siteKey: C,
            appId: y,
            isInvisible: I,
            theme: v.captchaTheme ?? "light"
          };
      return console.info("No valid captcha configuration found"), {
        type: null,
        siteKey: "",
        isInvisible: !1,
        theme: "light",
        appId: ""
      };
    },
    []
  ), p = ne(
    (v) => {
      if (!u.current.mounted) return;
      const O = typeof v == "object" && "ticket" in v ? v.ret === 0 ? `${v.ticket}|${v.randstr}` : null : v;
      if (!O) {
        m(
          ye("tokenVerification", Re.captchaError)
        );
        return;
      }
      console.debug(`${a.type} token received`), d(O), t(O), u.current.promise && (clearTimeout(u.current.promise.timeout), u.current.promise.resolve(O), u.current.promise = null);
    },
    [t, m, a.type]
  ), b = ne(() => {
    u.current.mounted && (console.debug(`${a.type} token expired`), d(null), t(null), u.current.promise && (clearTimeout(u.current.promise.timeout), u.current.promise.resolve(null), u.current.promise = null));
  }, [t, a.type]), x = ne(() => {
    if (!u.current.mounted) return;
    const v = ye("tokenVerification", Re.captchaError);
    u.current.promise && (clearTimeout(u.current.promise.timeout), u.current.promise.reject(v), u.current.promise = null), m(v);
  }, [m]), P = ne((v) => u.current.scripts.has(v) ? Promise.resolve() : new Promise((O, L) => {
    const A = document.createElement("script");
    A.src = v, A.id = "recaptcha-script", A.async = !0;
    const C = () => {
      A.removeEventListener("load", y), A.removeEventListener("error", I);
    }, y = () => {
      C(), u.current.scripts.add(v), O();
    }, I = () => {
      C(), L(
        ye(`SCRIPT_LOAD_ERROR ${v}`, Re.captchaError)
      );
    };
    A.addEventListener("load", y), A.addEventListener("error", I), document.head.appendChild(A), setTimeout(() => {
      A.parentNode && (C(), L(ye("SCRIPT_TIMEOUT", Re.captchaError)));
    }, 1e4);
  }), []), E = ne(
    async (v) => {
      const O = ht[v.type], L = window[O.globalVar];
      if (!L)
        throw ye(
          `${v.type} API_NOT_AVAILABLE`,
          Re.captchaError
        );
      if (v.type !== "recaptcha_v3") {
        if (!h.current)
          throw ye("CAPTCHA_CONTAINER_ERROR", Re.captchaError);
        if (v.type === "tencent") {
          if (!v.appId)
            throw ye("TENCENT_APPID_ERROR", Re.captchaError);
          u.current.tencentInstance = new L(
            h.current,
            v.appId,
            p,
            { userLanguage: "en" }
          ), u.current.widgetId = v.appId, console.debug(`${v.type} widget initialized`);
        } else {
          const A = {
            sitekey: v.siteKey,
            size: v.isInvisible ? "invisible" : "normal",
            theme: v.theme,
            callback: p,
            "expired-callback": b,
            "error-callback": x
          }, C = () => {
            u.current.widgetId === null && (u.current.widgetId = L.render(
              h.current,
              A
            ), console.debug(
              `${v.type} widget rendered:`,
              u.current.widgetId
            ));
          };
          if (O.hasReadyCallback && L.ready)
            return new Promise(
              (y) => L.ready(() => {
                C(), y();
              })
            );
          C();
        }
      }
    },
    [p, b, x]
  );
  X(() => {
    let v = !0;
    return (async () => {
      try {
        const L = await n.getOptions();
        if (!v) return;
        const A = g(L);
        if (r(A), !A.type)
          throw ye("NO_CAPTCHA_CONFIG", Re.captchaError);
        if ((A.type === "recaptcha_v2" || A.type === "hcaptcha" || A.type === "recaptcha_v3") && !A.siteKey)
          throw ye(
            `${A.type}_INVALID_SITEKEY`,
            Re.captchaError
          );
        console.info(`Initializing ${A.type}`, {
          invisible: A.isInvisible,
          theme: A.theme,
          appId: A.appId,
          siteKey: A.siteKey
        });
        const C = ht[A.type].scriptUrl, y = A.type === "recaptcha_v3" ? `${C}?render=${A.siteKey}` : A.type === "hcaptcha" && !A.isInvisible ? `${C}?render=explicit` : C;
        if (await P(y), !v || (await E(A), !v)) return;
        l(!0);
      } catch {
        if (!v) return;
        m(ye("INIT_FAILED", Re.captchaError));
      }
    })(), () => {
      v = !1;
    };
  }, [n, g, P, E, m]);
  const w = ne(async () => {
    if (!s || !a.type)
      throw ye("CAPTCHA_NOT_READY", Re.captchaError);
    const v = window[ht[a.type].globalVar];
    if (!v)
      throw ye("CAPTCHA_API_NOT_AVAILABLE", Re.captchaError);
    if (a.type === "recaptcha_v3")
      return new Promise((O, L) => {
        v.ready(() => {
          v.execute(a.siteKey, { action: "submit" }).then((A) => {
            u.current.mounted && (d(A), t(A), O(A));
          }).catch(
            (A) => L(
              ye("v3_EXECUTION_ERROR", {
                message: "v3_EXECUTION_ERROR",
                description: `${A.message}`
              })
            )
          );
        });
      });
    if (a.type === "tencent") {
      if (!u.current.tencentInstance)
        throw ye("TENCENT_NOT_INITIALIZED", Re.captchaError);
      return new Promise((O, L) => {
        const A = setTimeout(() => {
          u.current.promise = null, L(ye("EXECUTION_TIMEOUT", Re.captchaError));
        }, 3e4);
        u.current.promise = { resolve: O, reject: L, timeout: A }, u.current.tencentInstance.show();
      });
    }
    if (!a.isInvisible)
      return c ? (console.debug(`Returning existing ${a.type} token`), c) : (console.debug(
        `No ${a.type} token available, waiting for user interaction`
      ), null);
    if (u.current.widgetId === null)
      throw ye("WIDGET_NOT_READY", Re.captchaError);
    return new Promise((O, L) => {
      const A = setTimeout(() => {
        u.current.promise = null, L(ye("EXECUTION_TIMEOUT", Re.captchaError));
      }, 3e4);
      u.current.promise = { resolve: O, reject: L, timeout: A }, v.reset && v.reset(u.current.widgetId), a.type === "hcaptcha" ? v.execute(String(u.current.widgetId)) : v.execute(u.current.widgetId);
    });
  }, [s, a, c, t]), R = ne(() => {
    if (!(!u.current.widgetId || !a.type))
      try {
        const v = window[ht[a.type].globalVar];
        a.type === "tencent" && u.current.tencentInstance ? (u.current.tencentInstance.destroy(), u.current.tencentInstance = null, u.current.widgetId = null, console.debug("Tencent Captcha destroyed")) : v != null && v.reset && (v.reset(u.current.widgetId), console.debug(`${a.type} reset`)), d(null), t(null);
      } catch (v) {
        m(
          ye("CAPTCHA_RESET_ERROR", {
            message: "CAPTCHA_RESET_ERROR",
            description: v instanceof Error ? v.message : String(v)
          })
        );
      }
  }, [a.type, t, m]);
  return X(() => () => {
    u.current.mounted = !1, u.current.promise && (clearTimeout(u.current.promise.timeout), u.current.promise = null);
  }, []), {
    captchaState: a,
    isReady: s,
    currentToken: c,
    containerRef: h,
    executeCaptcha: w,
    handleError: m,
    resetCaptcha: R
  };
}, go = Ia(
  ({ onTokenChange: t, onError: e }, n) => {
    const {
      captchaState: a,
      isReady: r,
      containerRef: s,
      executeCaptcha: l,
      resetCaptcha: c,
      handleError: d
    } = N4(t, e);
    return X(() => () => {
      var m;
      const u = [
        ".grecaptcha-badge",
        // reCAPTCHA
        'iframe[src*="hcaptcha.com"]'
        // hCaptcha
      ];
      for (const g of u) {
        const p = (m = document.querySelector(g)) == null ? void 0 : m.parentElement;
        p && p.remove();
      }
      try {
        if (window[ht.tencent.globalVar] && s.current) {
          const p = document.querySelector(".tcaptcha-popup");
          p && p.remove();
        }
      } catch (g) {
        console.warn("Failed to cleanup Tencent Captcha:", g);
      }
    }, [s]), Bo(
      n,
      () => ({
        executeCaptcha: async () => {
          try {
            return await l();
          } catch (u) {
            const m = ye("CAPTCHA_EXECUTION_ERROR", {
              message: "CAPTCHA_EXECUTION_ERROR",
              description: u.message
            });
            return d(m), null;
          }
        },
        resetCaptcha: c,
        isReady: () => r
      }),
      [l, c, r, d]
    ), a.type && ht[a.type].requiresContainer ? /* @__PURE__ */ i(
      "div",
      {
        ref: s,
        "aria-label": "Captcha verification",
        style: { minHeight: a.isInvisible ? "0px" : "auto" }
      }
    ) : null;
  }
);
go.displayName = "ReCaptcha";
const De = (t, e) => function(a) {
  const [r, s] = k(null), [l, c] = k(null), [d, h] = k(null), [u, m] = k(!1), g = Ce(null), { lrInstance: p } = re();
  X(() => {
    (async () => {
      try {
        const v = await p.getCaptcha();
        c(v);
      } catch (v) {
        console.error("Error fetching options:", v), h("Failed to fetch options.");
      }
    })();
  }, [p]);
  const b = () => {
    g.current.resetCaptcha(), s(null), h(null);
  }, x = (l == null ? void 0 : l.isCaptchaEnabled) && $i(t.action, l) || u, P = async (R, v) => {
    let O = r;
    if (x && g.current)
      try {
        if (O = await g.current.executeCaptcha(), !O)
          return h("CAPTCHA verification is required."), Promise.reject(
            new Error("CAPTCHA verification is required.")
          );
        s(O);
      } catch {
        return h("Failed to verify CAPTCHA. Please try again."), Promise.reject(new Error("Failed to verify CAPTCHA."));
      }
    const L = l != null && l.hCaptchaSiteKey ? "h-captcha-response" : l != null && l.tencentCaptchaAppid ? "tencent-captcha-response" : "g-recaptcha-response";
    h(null);
    const A = {
      ...R,
      ...x && O ? { [L]: O } : {}
    };
    try {
      return await v(A);
    } catch (C) {
      throw h("Submission failed. Please try again."), C;
    } finally {
      try {
        So(() => {
          b();
        });
      } catch (C) {
        console.error("Reset captcha failed:", C);
      }
    }
  }, E = (R) => {
    m(R);
  };
  return /* @__PURE__ */ i(
    e,
    {
      ...a,
      captchaComponent: x && /* @__PURE__ */ i("div", { className: "loginradius-captcha-wrapper", children: /* @__PURE__ */ f("div", { className: "loginradius-captcha-container", children: [
        /* @__PURE__ */ i(go, { onTokenChange: s, ref: g }),
        d && !r && /* @__PURE__ */ i(
          "p",
          {
            id: "captcha-error",
            className: "loginradius-captcha-error",
            role: "alert",
            children: d
          }
        )
      ] }) }),
      onCaptchaRequired: E,
      handleCaptcha: P
    }
  );
};
function O4({
  isAutoFillEnabled: t,
  onAutofillSuccess: e,
  onAutofillError: n
}) {
  const a = Ce(!1), { lrInstance: r, loading: s } = re();
  X(() => {
    (async () => {
      if (!(a.current || !t || !r || s || !("credentials" in navigator) || !window.PublicKeyCredential)) {
        a.current = !0;
        try {
          r.controller.loginWithAutofillPasskey(
            (c) => {
              c != null && c.success && e(c);
            },
            (c) => {
              n == null || n(c);
            }
          );
        } catch (c) {
          n == null || n(c);
        }
      }
    })();
  }, [
    t,
    e,
    n,
    r,
    s
  ]);
}
const wo = (t) => Object.entries(t).reduce((e, [n, a]) => {
  if (n.startsWith("loginradius_consent_")) {
    const r = n.replace("loginradius_consent_", "");
    e[r] = a;
  }
  return e;
}, {}), Ue = (t, e, n) => {
  const a = t(), r = e();
  return a != null && a.length ? r ? !0 : (n("OTP is incomplete. Please enter the full OTP."), !1) : (n("OTP is required. Please enter a valid OTP."), !1);
}, B4 = (t) => {
  const [e, n] = k({
    minutes: 0,
    seconds: 0,
    total: 0,
    isExpired: !1
  });
  return X(() => {
    if (!t) return;
    const a = () => {
      const s = new Date(t), l = /* @__PURE__ */ new Date(), c = s.getTime() - l.getTime();
      if (c > 0) {
        const d = Math.floor(c / 6e4), h = Math.floor(c % (1e3 * 60) / 1e3);
        n((u) => u.minutes !== d || u.seconds !== h ? {
          minutes: d,
          seconds: h,
          total: c,
          isExpired: !1
        } : u);
      } else
        n((d) => d.isExpired ? d : {
          minutes: 0,
          seconds: 0,
          total: 0,
          isExpired: !0
        });
    };
    a();
    const r = setInterval(a, 1e3);
    return () => clearInterval(r);
  }, [t]), e;
}, lt = () => {
  ["duoToken", "IsDuoAuthenticatorVerified"].forEach((t) => {
    localStorage.removeItem(t);
  });
}, ze = H.login, F4 = ({
  onSuccess: t,
  onError: e,
  onForgotPassword: n,
  onSecondaryAction: a,
  onFooterClick: r,
  hasFooter: s = !1,
  style: l,
  className: c,
  captchaComponent: d,
  onCaptchaRequired: h,
  handleCaptcha: u
}) => {
  var Bt, Ft, St, jt, $t;
  const { lrInstance: m, options: g, content: p, setTimer: b } = re(), {
    MFAToken: x,
    accessToken: P,
    setPinAuthToken: E,
    invitationToken: w,
    setEmail: R,
    setPhone: v,
    setUsername: O,
    email: L
  } = ce(), [A, C] = k(!0), [y, I] = k(null), [N, W] = k(null), [$, Z] = k(null), [M, U] = k(!1), [_, B] = k(!1), [z, j] = k(!1), V = io(
    g,
    (Bt = g == null ? void 0 : g.optionalRecaptchaConfiguration) == null ? void 0 : Bt.Apis
  ), {
    values: T,
    errors: F,
    touched: q,
    handleChange: ee,
    handleSubmit: me,
    handleComponentChange: ue,
    validateSingleField: ge
  } = Ke(($ == null ? void 0 : $.Inputs) || []);
  O4({
    isAutoFillEnabled: g == null ? void 0 : g.isPasskeyAutofill,
    onAutofillSuccess: (K) => {
      a == null || a("passkey_login", K);
    },
    onAutofillError: (K) => {
      e(K);
    }
  }), X(() => {
    const K = new URLSearchParams(window.location.search), J = K.get("duo_code"), ae = encodeURIComponent(
      K.get("duo_state") || K.get("state")
    ), it = K.get("vtype"), Le = K.get("vtoken"), Se = localStorage.getItem("duoToken"), st = localStorage.getItem(
      "IsDuoAuthenticatorVerified"
    );
    J && ae && (g.twoFactorAuthentication || st === "true") ? m.controller.mfaDuoVerify(
      { state: ae, code: J },
      Se,
      (ve) => {
        if (ve.success)
          t == null || t({ ...ve, isDuoCallBackSuccess: !0 }), lt();
        else {
          const se = ve.error || D.duoVerificationError;
          I(se), lt(), e == null || e({ error: se });
        }
      },
      (ve) => {
        const se = ve.error || D.duoVerificationError;
        I(se), lt(), e == null || e({ error: se });
      }
    ) : J && ae && m.controller.accountDuoVerify(
      { state: ae, code: J },
      Se,
      (ve) => {
        if (ve.success)
          t == null || t({ ...ve, isDuoCallBackSuccess: !0 }), lt();
        else {
          const se = ve.error || D.duoVerificationError;
          I(se), lt(), e == null || e({ error: se });
        }
      },
      (ve) => {
        const se = ve.error || D.duoVerificationError;
        I(se), lt(), e == null || e({ error: se });
      }
    ), it === "emailverification" && Le && (async () => {
      var ve;
      try {
        if (!((ve = m == null ? void 0 : m.controller) != null && ve.emailVerifyLink)) {
          console.error("++ Email verification method is unavailable");
          const se = D.emailVerificationError;
          I(se), e == null || e({ error: se });
          return;
        }
        await m.controller.emailVerifyLink(
          { verificationToken: Le },
          (se) => {
            if (se != null && se.success)
              se.successMessage ? W(se.successMessage) : t == null || t(se);
            else {
              const He = (se == null ? void 0 : se.error) || D.emailVerificationError;
              I(He), e == null || e({ error: He });
            }
          },
          (se) => {
            console.error("Error during email verification:", se);
            const He = (se == null ? void 0 : se.error) || D.emailVerificationError;
            I(He), e == null || e({ error: He });
          }
        );
      } catch (se) {
        console.error("Unexpected error during email verification:", se);
        const He = se.message || D.emailVerificationError;
        I(He), e == null || e({ error: He });
      }
    })();
  }, []), X(() => {
    const K = async () => {
      C(!0);
      try {
        const J = await m.getSchema(
          "loginFormSchema"
        );
        if (!J || typeof J != "object" || !("Inputs" in J))
          throw new Error("Invalid schema received");
        L && w && (J != null && J.Inputs) && (J.Inputs = J.Inputs.map(
          (ae) => ae.name === "email" ? { ...ae, value: L, disabled: !0 } : ae
        )), U(!!(g != null && g.duoAuthentication)), Z(J);
      } catch (J) {
        const ae = (J == null ? void 0 : J.message) || "Failed to load schema";
        I(ae), e == null || e(ae), Z(null);
      } finally {
        C(!1);
      }
    };
    V && (h == null || h(!0)), K();
  }, [m]);
  const ke = () => {
    Z((K) => {
      const J = K.Inputs.map(
        (ae) => ae.type === "password" ? { ...ae, rules: "" } : ae
      );
      return { ...K, Inputs: J };
    });
  }, Ne = () => {
    var J;
    const K = (J = $.Inputs[0]) == null ? void 0 : J.name;
    return K && ge(K);
  }, Fe = async (K) => {
    C(!0), I(null);
    const J = mt.validateAndGetAuthPayload(K);
    m.controller.login(
      {
        ...K,
        ...w ? { invitationToken: w } : {}
      },
      M,
      (ae) => {
        var Le, Se, st, gt, ve;
        if (ae.success || ((Le = ae.data) == null ? void 0 : Le.SecondFactorAuthentication) || ((Se = ae.data) == null ? void 0 : Se.PINAuthToken))
          (st = ae.data) != null && st.Session_token && E(ae.data.Session_token), localStorage.setItem(
            "IsDuoAuthenticatorVerified",
            ((ve = (gt = ae.data) == null ? void 0 : gt.SecondFactorAuthentication) == null ? void 0 : ve.IsDuoAuthenticatorVerified) || !1
          ), R(J.authPayload.email), v(J.authPayload.phone), t == null || t(ae);
        else {
          const se = ae.error || "Login failed";
          I(se), e == null || e({
            error: se
          });
        }
        C(!1);
      },
      (ae) => {
        ae.errorCode === 970 && R(J.authPayload.email), ae.errorCode === 1066 && v(J.authPayload.phone), ae.errorCode === 1132 && (h == null || h(!0)), ae.errorCode === 1198 && b(ae.data.LoginLockedTimeout), I(ae.error || "Login failed"), e == null || e(ae), C(!1);
      }
    );
  }, Je = async () => {
    if (ke(), Ne()) {
      B(!1);
      return;
    }
    const K = mt.validateAndGetAuthPayload(T);
    B(!0), m.controller.loginPasskey(
      {
        identifier: K.authPayload.email || K.authPayload.phone || K.authPayload.username || "",
        ...w ? { invitationToken: w } : {}
      },
      (J) => {
        J.success ? a == null || a("passkey_login", J) : (I(J.error || D.passkeyRegistrationError), e == null || e({
          error: J.error || D.passkeyRegistrationError
        })), B(!1);
      },
      (J) => {
        J.errorCode === 970 && R(K.authPayload.email), J.errorCode === 1066 && v(K.authPayload.phone), B(!1), I(J.error || D.unexpectedError), e == null || e(J);
      }
    );
  }, Ot = async (K) => {
    const J = mt.validateAndGetAuthPayload(K);
    if (ke(), Ne()) {
      B(!1);
      return;
    }
    j(!0);
    let ae;
    if (J.authPayload.email || J.authPayload.username)
      ae = m.controller.passwordlessLoginEmail;
    else if (J.authPayload.phone)
      ae = m.controller.passwordlessLoginSMS;
    else {
      j(!1);
      return;
    }
    const it = {
      ...J.authPayload,
      ...At(K)
    };
    ae(
      it,
      (Le) => {
        if (Le.success) {
          R(J.authPayload.email), O(J.authPayload.username), v(J.authPayload.phone);
          const Se = () => J.authPayload.email || J.authPayload.username ? "passwordless_login_email" : J.authPayload.phone ? "passwordless_login_sms" : "";
          a == null || a(Se(), Le);
        } else {
          const Se = Le.error || D.loginError;
          I(Se);
        }
        j(!1);
      },
      (Le) => {
        Le.errorCode === 982 && (h == null || h(!0)), I(Le.error || D.loginError), j(!1), e == null || e(Le);
      }
    );
  };
  return /* @__PURE__ */ f("div", { style: l, className: `${c} loginradius-card-container`, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: p[ze].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: p[ze].description })
      ] })
    ] }),
    y && /* @__PURE__ */ i(pe, { setError: I, error: y }),
    N && /* @__PURE__ */ i(Te, { setSuccess: W, success: N }),
    /* @__PURE__ */ f(
      "form",
      {
        className: "loginradius-form-container",
        onSubmit: me(
          (K) => u(K, Fe)
        ),
        children: [
          $ && ((Ft = $ == null ? void 0 : $.SocialProviders) == null ? void 0 : Ft.length) > 0 && /* @__PURE__ */ f(Wn, { children: [
            /* @__PURE__ */ i(
              fo,
              {
                buttonsConfig: $.SocialProviders,
                options: g,
                onSuccess: t
              }
            ),
            /* @__PURE__ */ i("div", { className: "loginradius-or-separator", children: /* @__PURE__ */ i("span", { className: "loginradius-or-separator-text", children: "OR" }) })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
            /* @__PURE__ */ f("div", { className: "loginradius-form-group", children: [
              (St = $ == null ? void 0 : $.Inputs) != null && St.length ? $.Inputs.filter((K) => K.name !== "stayLogin").map(
                (K) => /* @__PURE__ */ i(
                  $e,
                  {
                    field: K,
                    fieldId: H.login,
                    value: T[K.name],
                    error: F[K.name],
                    touched: q[K.name],
                    onChange: ee,
                    handleComponentChange: ue
                  },
                  K.name
                )
              ) : /* @__PURE__ */ i("p", { children: "No input fields available." }),
              /* @__PURE__ */ f(
                "div",
                {
                  className: `flex items-center ${(jt = $ == null ? void 0 : $.Inputs) != null && jt.filter((K) => K.name === "stayLogin") ? "justify-between" : "justify-end"}`,
                  children: [
                    ($t = $ == null ? void 0 : $.Inputs) == null ? void 0 : $t.filter(
                      (K) => K.name === "stayLogin"
                    ).map((K) => /* @__PURE__ */ i(
                      $e,
                      {
                        field: K,
                        fieldId: H.login,
                        value: T[K.name],
                        error: F[K.name],
                        touched: q[K.name],
                        onChange: ee
                      },
                      K.name
                    )),
                    /* @__PURE__ */ i("div", { children: n && /* @__PURE__ */ i(
                      Y,
                      {
                        onClick: n,
                        ButtonId: H.forgotpassword,
                        children: p[ze].forgotPassword
                      }
                    ) })
                  ]
                }
              )
            ] }),
            d,
            /* @__PURE__ */ f("div", { className: "loginradius-button-container", children: [
              /* @__PURE__ */ i(
                Ve,
                {
                  loading: A,
                  ButtonId: H.login,
                  onClick: () => {
                    Z((K) => {
                      const J = K.Inputs.map(
                        (ae) => ae.type === "password" ? { ...ae, rules: "required" } : ae
                      );
                      return { ...K, Inputs: J };
                    });
                  },
                  ButtonText: p[ze].buttonText
                }
              ),
              ((g == null ? void 0 : g.passwordlessLogin) || (g == null ? void 0 : g.passwordlessLoginOTP)) && /* @__PURE__ */ i(
                d4,
                {
                  ButtonId: H.passwordlessloginText,
                  loading: z,
                  className: "loginradius-secondary-button",
                  formType: ze,
                  ButtonText: p[ze].passwordlessloginText,
                  onClick: (K) => {
                    K.preventDefault(), V ? u(T, Ot) : Ot(T);
                  }
                }
              ),
              (g == null ? void 0 : g.isPassKeysEnabled) && (g == null ? void 0 : g.isPasskeyButton) && /* @__PURE__ */ i(
                po,
                {
                  ButtonId: H.passkeylogin,
                  loading: _,
                  ButtonText: p[ze].passkeyButtonText,
                  onClick: (K) => {
                    K.preventDefault(), Je();
                  },
                  className: "loginradius-secondary-button"
                }
              )
            ] })
          ] })
        ]
      }
    ),
    s && /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      p[ze].footerText,
      /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.footerlink,
          onClick: r,
          ButtonText: p[ze].footerLinkText
        }
      )
    ] })
  ] });
}, S4 = De({ action: "login" }, F4), et = H.registration, j4 = ({
  onSuccess: t,
  onError: e,
  onPasskeyRegistration: n,
  style: a,
  className: r,
  hasFooter: s = !1,
  onFooterClick: l,
  captchaComponent: c,
  handleCaptcha: d
}) => {
  var $, Z;
  const { lrInstance: h, content: u, options: m } = re(), [g, p] = k(!1), { invitationToken: b, email: x, setEmail: P, setPhone: E } = ce(), [w, R] = k(null), [v, O] = k(null), { values: L, errors: A, touched: C, handleChange: y, handleSubmit: I } = Ke(
    (v == null ? void 0 : v.Inputs) || []
  ), N = !!(m != null && m.isCaptchaEnabled);
  X(() => {
    (async () => {
      p(!0);
      try {
        const U = await h.getSchema(
          "registrationFormSchema"
        );
        p(!1), x && b && (U != null && U.Inputs) && (U.Inputs = U.Inputs.map(
          (_) => _.name === "emailid" ? { ..._, value: x, disabled: !0 } : _
        )), O(U);
      } catch (U) {
        R("Failed to load form configuration."), console.error(U);
      } finally {
        p(!1);
      }
    })();
  }, [h, h.initializing]);
  const W = async (M) => {
    R(null), p(!0);
    const U = M.emailid, { emailid: _, pin: B, ...z } = M;
    try {
      const j = await h.getConsentEvents("Register"), V = wo(z), T = Object.entries(V).filter(
        ([, q]) => q === !0
      ), F = {
        ...Object.fromEntries(
          Object.entries(z).map(([q, ee]) => [
            q,
            String(ee)
          ])
        ),
        ...B && {
          PINInfo: { PIN: B, Skipped: null }
        },
        ...U && { email: [{ type: "Primary", value: U }] },
        ...T.length > 0 && {
          Consents: {
            Data: Object.entries(V).map(([q, ee]) => ({
              ConsentOptionId: q,
              IsAccepted: ee
            })),
            Events: j
          }
        },
        ...b && { invitation_token: b }
        // CAPTCHA token is added by handleSubmitWithCaptcha
      };
      h.controller.register(
        F,
        null,
        (q) => {
          if (p(!1), q.success)
            P(U), z.phoneid && E(z.phoneid), t == null || t(q);
          else {
            const ee = q.error || "Registration failed";
            R(ee), e == null || e({ error: ee });
          }
        },
        (q) => {
          p(!1);
          const ee = q.error || "An unexpected error occurred";
          R(ee), e == null || e(q);
        }
      );
    } catch (j) {
      p(!1);
      const V = j instanceof Error ? j.message : "An unexpected error occurred";
      R(V), e == null || e({ error: V });
    }
  };
  return /* @__PURE__ */ f(
    "div",
    {
      style: { ...a },
      className: `loginradius-card-container ${r}`,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: u[et].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: u[et].description })
          ] })
        ] }),
        w && /* @__PURE__ */ i(pe, { setError: R, error: w }),
        /* @__PURE__ */ f(
          "form",
          {
            className: "loginradius-form-container",
            onSubmit: I(
              (M) => d(M, W)
            ),
            children: [
              v && (($ = v == null ? void 0 : v.SocialProviders) == null ? void 0 : $.length) > 0 && /* @__PURE__ */ f(Wn, { children: [
                /* @__PURE__ */ i(
                  fo,
                  {
                    buttonsConfig: v.SocialProviders,
                    options: m,
                    onSuccess: t
                  }
                ),
                /* @__PURE__ */ i("div", { className: "loginradius-or-separator", children: /* @__PURE__ */ i("span", { className: "loginradius-or-separator-text", children: "OR" }) })
              ] }),
              /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
                /* @__PURE__ */ i("div", { className: "loginradius-form-group", children: v && ((Z = v == null ? void 0 : v.Inputs) == null ? void 0 : Z.length) > 0 ? v.Inputs.map((M) => /* @__PURE__ */ i(
                  $e,
                  {
                    field: M,
                    fieldId: H.registration,
                    value: L[M.name],
                    error: A[M.name],
                    touched: C[M.name],
                    onChange: y
                  },
                  M.name
                )) : /* @__PURE__ */ i("p", { children: g ? "Loading form..." : "No input fields available." }) }),
                /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
                  Ve,
                  {
                    ButtonId: H.registration,
                    ButtonText: u[et].buttonText,
                    loading: g
                  }
                ) })
              ] }),
              N && c,
              u[et].terms && /* @__PURE__ */ i("div", { className: "loginradius-form-text-content", children: u[et].terms })
            ]
          }
        ),
        s && /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
          u[et].footerText,
          /* @__PURE__ */ i(
            Y,
            {
              ButtonId: H.footerlink,
              onClick: l,
              ButtonText: u[et].footerLinkText
            }
          )
        ] })
      ]
    }
  );
}, $4 = De({ action: "register" }, j4), yt = H.profileeditor, Sf = ({
  logoutRedirectUrl: t,
  onSuccess: e,
  onError: n
}) => {
  var p, b, x, P;
  const { getUser: a, isAuthenticated: r, logout: s } = ce(), { content: l, lrInstance: c } = re(), [d, h] = k(null), [u, m] = k(!0);
  X(() => {
    (async () => {
      if (!r) {
        m(!1);
        return;
      }
      try {
        const w = await a();
        if (!w) {
          console.error("User profile not found"), t && window.location.replace(t), m(!1);
          return;
        }
        h(w), m(!1);
      } catch (w) {
        t ? window.location.replace(t) : n == null || n(w), m(!1);
      }
    })();
  }, []);
  const g = async () => {
    try {
      await c.controller.ssoLogout(
        (E) => {
          t ? window.location.replace(t) : e == null || e(E), s();
        },
        (E) => {
          n == null || n(E), console.error("SSO logout failed:", E);
        }
      );
    } catch {
    }
  };
  return u || !d ? /* @__PURE__ */ i(_4, {}) : /* @__PURE__ */ i("div", { className: "loginradius-profile-container", children: /* @__PURE__ */ f("div", { className: "loginradius-profile-wrapper", children: [
    /* @__PURE__ */ f("div", { className: "loginradius-profile-navigation", children: [
      /* @__PURE__ */ f("div", { className: "loginradius-navigation-header", children: [
        /* @__PURE__ */ i("h1", { className: "loginradius-navigation-title", children: l[yt].title }),
        /* @__PURE__ */ i("h4", { className: "loginradius-navigation-subtitle", children: l[yt].description })
      ] }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-nav-list", children: [
        /* @__PURE__ */ f("div", { className: "loginradius-profile-nav-item", children: [
          /* @__PURE__ */ i(Pe, { name: "AcademicCapIcon" }),
          /* @__PURE__ */ i("span", { className: "loginradius-profile-nav-item-content", children: "My Account" })
        ] }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-nav-item", children: [
          /* @__PURE__ */ i(Pe, { name: "Cog6ToothIcon" }),
          /* @__PURE__ */ i("span", { className: "loginradius-profile-nav-item-content", children: "Security" })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "loginradius-profile-nav-footer", children: /* @__PURE__ */ f("div", { className: "loginradius-profile-nav-footer-item", children: [
        /* @__PURE__ */ i("div", { className: "loginradius-profile-nav-item-content", children: l[yt].footerText }),
        /* @__PURE__ */ i(
          "a",
          {
            href: "https://www.loginradius.com",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "loginradius-profile-nav-footer-link",
            children: /* @__PURE__ */ i(de, { className: "loginradius-profile-nav-footer-logo" })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-profile-content-container", children: [
      /* @__PURE__ */ f("div", { className: "loginradius-profile-header", children: [
        /* @__PURE__ */ f("div", { className: "loginradius-profile-header-content", children: [
          /* @__PURE__ */ i("div", { className: "loginradius-profile-avatar", children: ((p = d == null ? void 0 : d.FullName) == null ? void 0 : p[0]) || `${(b = d == null ? void 0 : d.Email[0].Value) == null ? void 0 : b.split("@")[0][0]}` || "U" }),
          /* @__PURE__ */ f("div", { className: "loginradius-profile-header-content-text", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-profile-title", children: `${l[yt].headerText}, ${(d == null ? void 0 : d.FullName) || `${d == null ? void 0 : d.Email[0].Value.split("@")[0]}` || "User"}` }),
            /* @__PURE__ */ i("p", { className: "loginradius-profile-subtitle", children: ((P = (x = d == null ? void 0 : d.Email) == null ? void 0 : x[0]) == null ? void 0 : P.Value) || "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ i(
          te,
          {
            ButtonText: l[yt].buttonText,
            onClick: g,
            className: "loginradius-edit-profile-button"
          }
        )
      ] }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-field-container", children: [
        /* @__PURE__ */ i("h1", { className: "loginradius-profile-field-title", children: "Profile Info" }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field-details", children: [
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Name" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: (d == null ? void 0 : d.FirstName) || "N/A" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Last Name" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: (d == null ? void 0 : d.LastName) || "N/A" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Middle Name" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: (d == null ? void 0 : d.MiddleName) || "N/A" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Account Created on" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: d != null && d.CreatedDate ? new Date(d.CreatedDate).toLocaleString(
              "en-US",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: !0
              }
            ) : "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-field-container", children: [
        /* @__PURE__ */ i("h1", { className: "loginradius-profile-field-title", children: "Email Addresses" }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field-details", children: [
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Email ID" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: (d == null ? void 0 : d.Email[0].Value) || "N/A" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Primary Email Provider" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: (d == null ? void 0 : d.Provider) || "N/A" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-field-container", children: [
        /* @__PURE__ */ i("h1", { className: "loginradius-profile-field-title", children: "Connected Socials" }),
        /* @__PURE__ */ i("div", { className: "loginradius-profile-field-details", children: d != null && d.Identities && d.Identities.length > 0 ? d.Identities.map((E, w) => /* @__PURE__ */ f("div", { children: [
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Name of social" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: E.Provider || "N/A" })
          ] }),
          /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
            /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "Fields" }),
            /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: E ? Object.values(E).filter(
              (R) => R != null
            ).length : 0 })
          ] })
        ] }, w)) : /* @__PURE__ */ i("div", { className: "loginradius-profile-field", children: /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: "No connected socials" }) }) })
      ] })
    ] })
  ] }) });
}, _4 = () => /* @__PURE__ */ i("div", { className: "loginradius-profile-container", children: /* @__PURE__ */ f("div", { className: "loginradius-profile-wrapper", children: [
  /* @__PURE__ */ f("div", { className: "loginradius-profile-navigation", children: [
    /* @__PURE__ */ f("div", { className: "loginradius-navigation-header", children: [
      /* @__PURE__ */ i("h1", { className: "loginradius-navigation-title", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-title" }) }),
      /* @__PURE__ */ i("h4", { className: "loginradius-navigation-subtitle", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-subtitle" }) })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-profile-nav-list", children: [
      /* @__PURE__ */ f("div", { className: "loginradius-profile-nav-item", children: [
        /* @__PURE__ */ i("div", { className: "skeleton skeleton-icon" }),
        /* @__PURE__ */ i("span", { className: "loginradius-profile-nav-item-content", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-nav" }) })
      ] }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-nav-item", children: [
        /* @__PURE__ */ i("div", { className: "skeleton skeleton-icon" }),
        /* @__PURE__ */ i("span", { className: "loginradius-profile-nav-item-content", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-nav" }) })
      ] })
    ] })
  ] }),
  /* @__PURE__ */ f("div", { className: "loginradius-profile-content-container", children: [
    /* @__PURE__ */ f("div", { className: "loginradius-profile-header", children: [
      /* @__PURE__ */ f("div", { className: "loginradius-profile-header-content", children: [
        /* @__PURE__ */ i("div", { className: "loginradius-profile-avatar", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-avatar" }) }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-header-content-text", children: [
          /* @__PURE__ */ i("h2", { className: "loginradius-profile-title", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-title" }) }),
          /* @__PURE__ */ i("p", { className: "loginradius-profile-subtitle", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-subtitle" }) })
        ] })
      ] }),
      /* @__PURE__ */ i("div", { className: "loginradius-edit-profile-button" })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-profile-field-container", children: [
      /* @__PURE__ */ i("h1", { className: "loginradius-profile-field-title", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-field-title" }) }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-field-details", children: [
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-profile-field-container", children: [
      /* @__PURE__ */ i("h1", { className: "loginradius-profile-field-title", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-field-title" }) }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-field-details", children: [
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-profile-field-container", children: [
      /* @__PURE__ */ i("h1", { className: "loginradius-profile-field-title", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-field-title" }) }),
      /* @__PURE__ */ f("div", { className: "loginradius-profile-field-details", children: [
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] }),
        /* @__PURE__ */ f("div", { className: "loginradius-profile-field", children: [
          /* @__PURE__ */ i("label", { className: "loginradius-profile-label", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-label" }) }),
          /* @__PURE__ */ i("div", { className: "loginradius-profile-value", children: /* @__PURE__ */ i("div", { className: "skeleton skeleton-value" }) })
        ] })
      ] })
    ] })
  ] })
] }) }), ea = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Reset",
    icon: "ArrowPathIcon",
    iconPosition: "left",
    ...t
  }
), V4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Log Out",
    icon: "ArrowLeftOnRectangleIcon",
    iconPosition: "left",
    ...t
  }
), wn = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Save",
    icon: "CheckCircleIcon",
    iconPosition: "left",
    ...t
  }
), vo = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Confirm",
    icon: "CheckIcon",
    iconPosition: "left",
    ...t
  }
), D4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Link Device",
    icon: "LinkIcon",
    iconPosition: "left",
    ...t
  }
), yo = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Change",
    icon: "PencilIcon",
    iconPosition: "left",
    ...t
  }
), U4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Enable",
    icon: "PowerIcon",
    iconPosition: "left",
    ...t
  }
), H4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Generate Code",
    icon: "KeyIcon",
    iconPosition: "left",
    ...t
  }
), Z4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Reset Code",
    icon: "ArrowPathIcon",
    iconPosition: "left",
    ...t
  }
), ta = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Update",
    icon: "ArrowUpTrayIcon",
    iconPosition: "left",
    loading: t.loading,
    ...t
  }
), W4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Add",
    icon: "PlusIcon",
    iconPosition: "left",
    ...t
  }
), q4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Remove",
    icon: "TrashIcon",
    iconPosition: "left",
    ...t
  }
), ko = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Unlink",
    icon: "LinkSlashIcon",
    iconPosition: "left",
    ...t
  }
), na = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Resend",
    icon: "ArrowPathIcon",
    iconPosition: "left",
    ...t
  }
), K4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Delete",
    icon: "TrashIcon",
    iconPosition: "left",
    ...t
  }
), jf = ({
  isEditing: t,
  onToggle: e,
  className: n = "",
  style: a
}) => /* @__PURE__ */ f(
  "button",
  {
    onClick: e,
    className: n,
    style: {
      padding: "0.5rem 1rem",
      borderRadius: "0.25rem",
      backgroundColor: t ? "#f56565" : "#3182ce",
      // red-500 and body-primary equivalent
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      // space-x-1 equivalent
      ...a
    },
    children: [
      /* @__PURE__ */ i(Pe, { name: t ? "XMarkIcon" : "PencilIcon", size: 16 }),
      /* @__PURE__ */ i("span", { children: t ? "Cancel" : "Edit" })
    ]
  }
), z4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Log In with SSO",
    icon: "ArrowRightOnRectangleIcon",
    iconPosition: "left",
    ...t
  }
), Xe = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Verify OTP",
    icon: "CheckIcon",
    iconPosition: "left",
    loading: t.loading,
    ...t
  }
), G4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Log Out Other Devices",
    icon: "ArrowLeftOnRectangleIcon",
    iconPosition: "left",
    ...t
  }
), J4 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Contact Admin",
    icon: "UserIcon",
    iconPosition: "left",
    ...t
  }
), Q4 = ({
  className: t = "",
  style: e
}) => {
  const n = {
    padding: "16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "var(--sdk-card-bg-color, #FFFFFF)",
    ...e
  };
  return /* @__PURE__ */ f("div", { style: n, children: [
    /* @__PURE__ */ i(
      Pe,
      {
        name: "DevicePhoneMobileIcon",
        size: 20,
        style: { color: "#6b7280" }
      }
    ),
    /* @__PURE__ */ i("p", { style: {
      color: "var(--sdk-body-text-color, #111827)",
      fontSize: "14px"
    }, children: "Is this your device? Verify to proceed." })
  ] });
}, X4 = ({
  message: t,
  className: e = "",
  style: n
}) => /* @__PURE__ */ f(
  "div",
  {
    className: e,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px",
      color: "#EF4444",
      // Tailwind's text-red-500 equivalent
      ...n
    },
    children: [
      /* @__PURE__ */ i(Pe, { name: "ExclamationCircleIcon", size: 20 }),
      /* @__PURE__ */ i("span", { children: t })
    ]
  }
), Co = ({
  onClick: t,
  className: e = "",
  style: n,
  children: a
}) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  /* @__PURE__ */ f(
    "a",
    {
      href: "#",
      onClick: (s) => {
        s.preventDefault(), t == null || t();
      },
      className: e,
      style: { ...{
        fontSize: "0.875rem",
        // text-sm
        textDecoration: "underline",
        transition: "opacity 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.25rem",
        // space-x-1
        color: "var(--sdk-link-text-color, #007bff)"
      }, ...n },
      children: [
        /* @__PURE__ */ i(Pe, { name: "QuestionMarkCircleIcon", size: 16 }),
        /* @__PURE__ */ i(
          "span",
          {
            style: {
              color: "var(--sdk-link-text-color, #007bff)",
              textDecoration: "underline",
              cursor: "pointer"
            },
            children: a || "Forgot Password?"
          }
        )
      ]
    }
  )
), Y4 = (t) => /* @__PURE__ */ i(te, { ButtonText: t.ButtonText || "Register", ...t }), $f = (t) => /* @__PURE__ */ i(
  Mt,
  {
    ...t,
    field: { ...t.field, display: "I agree to the terms" }
  }
), bo = Ia(
  ({
    field: t,
    index: e,
    id: n,
    value: a,
    placeholder: r,
    displayError: s,
    inputClassName: l = "",
    disabled: c = !1,
    onChange: d,
    onKeyDown: h,
    onPaste: u,
    onFocus: m,
    setInputRef: g,
    isComplete: p
  }, b) => /* @__PURE__ */ i(
    "input",
    {
      ref: (x) => {
        g(x, e), typeof b == "function" ? b(x) : b && (b.current = x);
      },
      type: "text",
      maxLength: 1,
      id: n,
      name: t.name,
      placeholder: r,
      onChange: (x) => d(x.target, e),
      onKeyDown: (x) => h(x, e),
      onPaste: u,
      onFocus: () => m(e),
      autoComplete: "one-time-code",
      className: `loginradius-otp-input-field ${!p && s ? "loginradius-error-field" : ""}`,
      "aria-label": t.display,
      "aria-describedby": s ? "otp-error" : void 0,
      value: a
    }
  )
);
bo.displayName = "OtpField";
const Me = Mn.forwardRef(
  (t, e) => {
    const {
      onComplete: n,
      onChange: a,
      disabled: r = !1,
      className: s = "",
      inputClassName: l = "",
      display: c = "",
      error: d = "",
      autoFocus: h = !0,
      placeholder: u = "",
      autoSubmit: m = !1
    } = t, { lrInstance: g } = re(), [p, b] = k([]), [x, P] = k(!1), E = Ce([]), w = mt.getValidationRules, { values: R, errors: v, handleChange: O, validateForm: L, isOtpComplete: A } = Ke(p), C = p.length, y = be(
      () => p.map((T) => R[T.name] || "").join(""),
      [p, R]
    ), I = be(
      () => p.length > 0 && A(p),
      [p, A]
    ), N = be(() => y.length > 0, [y]), W = ne(
      (T, F) => {
        if (!T) return !1;
        const { regex: q } = w(F);
        return q.test(T);
      },
      [w]
    ), $ = ne(
      (T, F) => {
        const { sanitizeRegex: q, transform: ee } = w(F);
        return ee(T).replace(q, "");
      },
      [w]
    );
    X(() => {
      g.getSchema("OtpSchema").then((T) => {
        if ("Inputs" in T) {
          const F = T.Inputs.filter(
            (q) => q.type === "Otp"
          ).map((q) => ({
            name: q.name,
            type: "Otp",
            display: q.display,
            rules: q.rules,
            permission: q.permission,
            value: ""
          }));
          b(F);
        }
      }).catch((T) => console.error("Failed to fetch OTP schema:", T));
    }, [g]), X(() => {
      E.current = E.current.slice(0, C), h && C > 0 && setTimeout(() => {
        var T;
        return (T = E.current[0]) == null ? void 0 : T.focus();
      }, 0);
    }, [C, h]), X(() => {
      p.length > 0 && (a == null || a(y), I && (n == null || n(y), m && E.current.forEach((T) => T == null ? void 0 : T.blur())));
    }, [y, I, a, n, m, p.length]);
    const Z = ne(
      (T, F) => {
        var ue;
        const q = (ue = p[T]) == null ? void 0 : ue.name;
        if (!q) return;
        O({
          target: {
            name: q,
            value: F,
            type: "text"
          }
        });
        const me = E.current[T];
        me && (me.value = F);
      },
      [p, O]
    ), M = ne(() => {
      var T;
      p.forEach((F) => {
        const q = {
          target: { name: F.name, value: "", type: "text" }
        };
        O(q);
      }), E.current.forEach((F) => {
        F && (F.value = "");
      }), (T = E.current[0]) == null || T.focus(), a == null || a(""), P(!1);
    }, [p, O, a]), U = ne(
      (T, F) => {
        var ge;
        const q = p[F];
        if (!q || I) return;
        P(!0);
        const ee = T.value, ue = $(ee, q.rules).slice(-1);
        T.value = ue, Z(F, ue), ue && W(ue, q.rules) && F < C - 1 && ((ge = E.current[F + 1]) == null || ge.focus());
      },
      [Z, C, p, $, W]
    ), _ = ne(
      (T, F) => {
        var me, ue, ge, ke;
        const { key: q } = T, ee = R[(me = p[F]) == null ? void 0 : me.name] || "";
        switch (P(!0), q) {
          case "Backspace":
            T.preventDefault(), ee ? Z(F, "") : F > 0 && (Z(F - 1, ""), (ue = E.current[F - 1]) == null || ue.focus());
            break;
          case "Delete":
            T.preventDefault(), Z(F, "");
            break;
          case "ArrowLeft":
            F > 0 && (T.preventDefault(), (ge = E.current[F - 1]) == null || ge.focus());
            break;
          case "ArrowRight":
            F < C - 1 && (T.preventDefault(), (ke = E.current[F + 1]) == null || ke.focus());
            break;
          case "Enter":
            I && (n == null || n(y));
            break;
        }
      },
      [
        R,
        p,
        Z,
        C,
        I,
        n,
        y
      ]
    ), B = ne(
      (T) => {
        var q, ee;
        T.preventDefault(), P(!0);
        const F = T.clipboardData.getData("text");
        if (F.length > 0) {
          const me = (q = p[0]) == null ? void 0 : q.rules, ge = $(F, me).slice(0, C).split("");
          M(), ge.forEach((Ne, Fe) => {
            if (Fe < C) {
              const Je = p[Fe];
              Je && W(Ne, Je.rules) && Z(Fe, Ne);
            }
          });
          const ke = Math.min(ge.length, C) - 1;
          (ee = E.current[Math.max(0, ke)]) == null || ee.focus();
        }
      },
      [C, M, Z, p, $, W]
    ), z = ne((T) => {
      setTimeout(() => {
        var F;
        return (F = E.current[T]) == null ? void 0 : F.select();
      }, 0);
    }, []), j = ne(
      (T, F) => {
        E.current[F] = T;
      },
      []
    );
    Mn.useImperativeHandle(
      e,
      () => ({
        clear: M,
        focus: () => {
          var T;
          return (T = E.current[0]) == null ? void 0 : T.focus();
        },
        getValue: () => y,
        setValue: (T) => {
          var me;
          const F = (me = p[0]) == null ? void 0 : me.rules, ee = $(T, F).slice(0, C).split("");
          M(), ee.forEach((ue, ge) => {
            if (ge < C) {
              const ke = p[ge];
              ke && W(ue, ke.rules) && Z(ge, ue);
            }
          });
        },
        isOtpComplete: () => I,
        getErrors: () => v,
        validateOtp: L
      }),
      [
        M,
        y,
        C,
        v,
        L,
        Z,
        p,
        I,
        $,
        W
      ]
    );
    const V = be(() => {
      if (d)
        return d;
      if (x && N) {
        const T = p.find((F) => v[F.name]);
        return T ? v[T.name] : "";
      }
      return "";
    }, [p, v, x, N, d]);
    return p.length === 0 ? null : /* @__PURE__ */ f("div", { className: "loginradius-input-field-container", children: [
      c && /* @__PURE__ */ i("label", { htmlFor: c, className: "loginradius-input-label", children: c }),
      /* @__PURE__ */ i("div", { className: "loginradius-otp-input-field-container", children: p.map((T, F) => /* @__PURE__ */ i(
        bo,
        {
          field: T,
          index: F,
          id: `${fe.idPrefix}${T.name}`,
          value: R[T.name] || "",
          placeholder: u,
          displayError: !!V,
          inputClassName: l,
          disabled: r,
          onChange: U,
          onKeyDown: _,
          onPaste: B,
          isComplete: I,
          onFocus: z,
          setInputRef: j
        },
        T.name
      )) }),
      V && !I && /* @__PURE__ */ i("p", { id: "otp-error", className: "loginradius-error-message", role: "alert", children: V })
    ] });
  }
);
Me.displayName = "OTPInput";
const e7 = (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t), t7 = (t) => /^\+?[1-9]\d{1,14}$/.test(t), n7 = (t) => t.length >= 8, a7 = (t) => typeof t == "string" ? !!t.trim() : !!t, xe = (t, e, n) => {
  if (!e) return { isValid: !0 };
  const a = e.split("|"), r = typeof t == "string" ? t : String(t);
  if (a.includes("required") && !a7(t))
    return { isValid: !1, errorMessage: "This field is required" };
  if (!r && !a.includes("required"))
    return { isValid: !0 };
  for (const s of a)
    if (s !== "required") {
      if (s.startsWith("min:")) {
        const l = parseInt(s.split(":")[1], 10);
        if (r.length < l)
          return {
            isValid: !1,
            errorMessage: `Must be at least ${l} characters`
          };
      }
      if (s.startsWith("max:")) {
        const l = parseInt(s.split(":")[1], 10);
        if (r.length > l)
          return {
            isValid: !1,
            errorMessage: `Must be no more than ${l} characters`
          };
      }
      if (s.startsWith("length:")) {
        const l = parseInt(s.split(":")[1], 10);
        if (r.length !== l)
          return {
            isValid: !1,
            errorMessage: `Must be exactly ${l} characters`
          };
      }
      if (s === "numeric" && !/^\d+$/.test(r))
        return { isValid: !1, errorMessage: "Must be numeric" };
      if (s === "alpha" && !/^[a-zA-Z]+$/.test(r))
        return { isValid: !1, errorMessage: "Must contain only letters" };
      if (s === "alphanumeric" && !/^[a-zA-Z0-9]+$/.test(r))
        return {
          isValid: !1,
          errorMessage: "Must contain only letters and numbers"
        };
      if (s.startsWith("match:")) {
        const l = s.split(":")[1];
        if (!new RegExp(l).test(r))
          return { isValid: !1, errorMessage: "Invalid format" };
      }
      if ((s === "email" || n === "email") && !e7(r))
        return { isValid: !1, errorMessage: "Invalid email format" };
      if ((s === "phone" || n === "tel") && !t7(r))
        return { isValid: !1, errorMessage: "Invalid phone number" };
      if ((s === "password" || n === "password") && !n7(r))
        return {
          isValid: !1,
          errorMessage: "Password must be at least 8 characters"
        };
      if (s === "integer" && (!Number.isInteger(Number(r)) || isNaN(Number(r))))
        return { isValid: !1, errorMessage: "Must be an integer" };
      if (s === "positive") {
        const l = Number(r);
        if (isNaN(l) || l <= 0)
          return { isValid: !1, errorMessage: "Must be a positive number" };
      }
      if (s === "negative") {
        const l = Number(r);
        if (isNaN(l) || l >= 0)
          return { isValid: !1, errorMessage: "Must be a negative number" };
      }
      if (s.startsWith("min_value:")) {
        const l = parseFloat(s.split(":")[1]), c = Number(r);
        if (isNaN(c) || c < l)
          return { isValid: !1, errorMessage: `Must be at least ${l}` };
      }
      if (s.startsWith("max_value:")) {
        const l = parseFloat(s.split(":")[1]), c = Number(r);
        if (isNaN(c) || c > l)
          return {
            isValid: !1,
            errorMessage: `Must be no more than ${l}`
          };
      }
      if (s === "url" && !/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i.test(r))
        return { isValid: !1, errorMessage: "Invalid URL" };
      if (s === "no_whitespace" && /\s/.test(r))
        return { isValid: !1, errorMessage: "Must not contain whitespace" };
      if (s.startsWith("starts_with:")) {
        const l = s.split(":")[1];
        if (!r.startsWith(l))
          return { isValid: !1, errorMessage: `Must start with ${l}` };
      }
      if (s.startsWith("ends_with:")) {
        const l = s.split(":")[1];
        if (!r.endsWith(l))
          return { isValid: !1, errorMessage: `Must end with ${l}` };
      }
    }
  return { isValid: !0 };
}, _f = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  });
  return /* @__PURE__ */ i(
    Me,
    {
      display: "Verify Code",
      onChange: (s) => {
        e.onChange(s);
        const l = xe(s, e.field.rules);
        a(l), t == null || t(l);
      },
      error: "",
      autoFocus: !0
    }
  );
}, Vf = (t) => /* @__PURE__ */ i(te, { ButtonText: t.ButtonText || "Verify", ...t }), Df = (t) => /* @__PURE__ */ i(Co, { ...t, children: "Resend Email" }), Uf = (t) => /* @__PURE__ */ i(te, { ButtonText: t.ButtonText || "Use One-Time Link", ...t }), xo = (t) => /* @__PURE__ */ i(te, { ButtonText: t.ButtonText || "Log In", ...t }), o7 = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules);
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "text",
      ...e,
      field: { ...e.field, display: "Enter Token" },
      onChange: r,
      error: e.hasError && n.errorMessage
    }
  );
}, Lo = ({ onValidation: t, ...e }) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules);
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "password",
      ...e,
      field: { ...e.field, display: "New PIN" },
      onChange: r,
      error: e.hasError && n.errorMessage
    }
  );
}, Ro = ({
  onValidation: t,
  pinToMatch: e,
  ...n
}) => {
  const [a, r] = k({
    isValid: !0
  }), s = (l) => {
    n.onChange(l);
    const c = l.target.value;
    let d = xe(c, n.field.rules);
    d.isValid && c !== e && (d = { isValid: !1, errorMessage: "PINs do not match" }), r(d), t == null || t(d);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "password",
      ...n,
      field: { ...n.field, display: "Confirm New PIN" },
      onChange: s,
      error: n.hasError && a.errorMessage
    }
  );
}, aa = ({ onValidation: t, ...e }) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules);
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "password",
      ...e,
      field: { ...e.field, display: "PIN" },
      onChange: r,
      error: e.hasError && n.errorMessage
    }
  );
}, Hf = ({
  className: t = "",
  style: e
}) => /* @__PURE__ */ i(
  "div",
  {
    style: {
      padding: "16px",
      backgroundColor: "#f8f9fa",
      // Replace with your desired background color
      borderRadius: "8px",
      ...e
    },
    className: t,
    children: /* @__PURE__ */ i("p", { children: "Use your passkey to log in" })
  }
), Zf = ({
  className: t = "",
  style: e
}) => /* @__PURE__ */ i("div", { className: `p-4 bg-card-bg rounded-lg ${t}`, style: e, children: /* @__PURE__ */ i("p", { children: "Set up a new passkey for secure login." }) }), r7 = (t) => {
  var e;
  return /* @__PURE__ */ i(
    Be,
    {
      ...t,
      field: {
        ...t.field,
        display: "SSO Provider",
        options: (e = t.field.options) == null ? void 0 : e.map((n) => ({
          text: n.text || "",
          name: n.name,
          value: n.value
        }))
      }
    }
  );
}, Ao = ({
  qrCodeUrl: t,
  className: e = "",
  style: n
}) => /* @__PURE__ */ f(
  "div",
  {
    style: {
      ...n
    },
    className: `${e} loginradius-qrcode-container`,
    children: [
      /* @__PURE__ */ i("img", { src: t, alt: "QR Code", width: 150, height: 150 }),
      /* @__PURE__ */ i("p", { className: "loginradius-qrcode-text", children: "Scan this QR Code to proceed" })
    ]
  }
), Wf = ({
  status: t,
  className: e = "",
  style: n
}) => /* @__PURE__ */ f(
  "div",
  {
    className: e,
    style: {
      padding: "0.5rem",
      fontSize: "0.875rem",
      color: t === "active" ? "green" : "red",
      ...n
    },
    children: [
      "SSO Status: ",
      t
    ]
  }
), qf = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), [r, s] = k(e.value), l = (c) => {
    s(c.target.value), e.onChange(c);
    const d = xe(c.target.value, e.field.rules, "password");
    a(d), t == null || t(d);
  };
  return /* @__PURE__ */ i(
    qe,
    {
      ...e,
      field: { ...e.field, display: "Current Password" },
      onChange: l,
      value: r,
      error: e.hasError && n.errorMessage
    }
  );
}, Kf = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules, "password");
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    qe,
    {
      ...e,
      field: { ...e.field, display: "New Password" },
      onChange: r,
      error: e.hasError && n.errorMessage
    }
  );
}, zf = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), [r, s] = k(e.value), l = (c) => {
    s(c.target.value), e.onChange(c);
    const d = xe(c.target.value, e.field.rules, "password");
    a(d), t == null || t(d);
  };
  return /* @__PURE__ */ i(
    qe,
    {
      ...e,
      field: { ...e.field, display: "Current PIN" },
      onChange: l,
      value: r,
      error: e.hasError && n.errorMessage
    }
  );
}, Dt = "mfa-selector", i7 = {
  id: "skip_mfa",
  name: "Skip MFA"
}, An = /* @__PURE__ */ f(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    children: [
      /* @__PURE__ */ i(
        "path",
        {
          d: "M12.4986 1.2556C14.513 1.0199 16.584 1.26162 18.4849 1.9731C20.2007 2.61486 21.7823 3.62494 23.071 4.92869C21.9688 6.02162 20.8767 7.12467 19.7758 8.21896C19.0662 7.52306 18.2394 6.94338 17.3294 6.54088C16.1202 5.99892 14.7757 5.76049 13.4542 5.85181C11.9613 5.94806 10.4981 6.46678 9.28074 7.33658C7.77028 8.40162 6.63906 9.99494 6.14168 11.7758C5.76871 13.0823 5.73781 14.482 6.03887 15.8063C6.28086 16.8894 6.75227 17.9197 7.40742 18.8149C8.01555 19.6476 8.78281 20.3637 9.65563 20.9125C10.6616 21.5479 11.8092 21.9576 12.9905 22.1014C14.0027 22.2285 15.0385 22.1624 16.027 21.91C16.1355 21.8578 16.1976 21.9813 16.2657 22.0429C17.3797 23.1626 18.4991 24.2769 19.6134 25.396C17.6088 26.3695 15.348 26.8141 13.1247 26.6571C11.264 26.5338 9.43141 25.9987 7.80063 25.0936C7.12059 24.7217 6.48184 24.2782 5.87754 23.7937C5.40012 23.3887 4.92844 22.9731 4.51801 22.499C3.8232 21.75 3.22711 20.91 2.73602 20.0142C2.62664 19.8031 2.49977 19.6008 2.41063 19.3799C2.2884 19.1324 2.18176 18.8778 2.07567 18.6233C1.94004 18.2604 1.79512 17.9003 1.69613 17.5254C1.68438 17.4759 1.6543 17.4344 1.62723 17.3928C1.40027 16.6091 1.27313 15.7978 1.20504 14.9854C1.1334 13.9639 1.16867 12.9333 1.33574 11.9221C1.66879 9.85822 2.52274 7.88236 3.79285 6.2226C4.61645 5.14252 5.61203 4.19342 6.73121 3.42396C8.43856 2.24517 10.4371 1.49103 12.4986 1.2556ZM13.8433 2.63592C13.6875 2.66299 13.5436 2.73873 13.4228 2.83908C13.1384 3.08326 13.0361 3.51748 13.1994 3.85845C13.3725 4.26916 13.8873 4.4901 14.303 4.3233C14.7249 4.18002 14.9805 3.68045 14.8427 3.25525C14.7306 2.83334 14.2707 2.55006 13.8433 2.63592ZM6.51629 5.69814C6.37055 5.7058 6.22672 5.75064 6.10176 5.82611C5.78813 6.01834 5.61285 6.42056 5.7091 6.77931C5.79359 7.16431 6.16793 7.46455 6.56387 7.45224C6.97484 7.46346 7.35902 7.1408 7.42629 6.73666C7.48754 6.4542 7.38227 6.1474 7.17637 5.94779C7.00574 5.77471 6.75801 5.68474 6.51629 5.69814ZM3.34551 13.1356C3.16449 13.1693 2.99442 13.2609 2.8659 13.3927C2.6075 13.6585 2.54543 14.0919 2.72863 14.4159C2.92442 14.7976 3.42535 14.9863 3.82184 14.8156C4.23254 14.665 4.47781 14.1753 4.34301 13.7572C4.23254 13.3358 3.77262 13.0473 3.34551 13.1356ZM6.40746 20.5745C6.09328 20.6278 5.82012 20.8676 5.72824 21.1728C5.62242 21.4908 5.72469 21.8608 5.9716 22.085C6.13977 22.2348 6.36535 22.3229 6.59149 22.3125C6.89664 22.3056 7.1925 22.1246 7.33305 21.8531C7.46785 21.6117 7.47387 21.3057 7.35246 21.0574C7.19332 20.7079 6.78344 20.5015 6.40746 20.5745ZM13.8466 23.6378C13.525 23.6931 13.2472 23.9405 13.1605 24.2558C13.0547 24.5995 13.1914 25.0009 13.4862 25.2071C13.7011 25.3654 13.9899 25.4168 14.2455 25.34C14.5083 25.2642 14.7295 25.06 14.8217 24.8019C14.9576 24.4535 14.8315 24.0275 14.5324 23.8049C14.3404 23.6559 14.0853 23.5952 13.8466 23.6378Z",
          fill: "#A0A0A0"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M13.8429 2.63597C14.2703 2.55011 14.7302 2.83339 14.8423 3.2553C14.9802 3.6805 14.7245 4.18007 14.3026 4.32335C13.887 4.49015 13.3721 4.26921 13.199 3.85851C13.0357 3.51753 13.138 3.08331 13.4224 2.83913C13.5432 2.73878 13.6871 2.66304 13.8429 2.63597Z",
          fill: "#C1C1C1"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M3.34526 13.1357C3.77237 13.0474 4.23229 13.3359 4.34276 13.7572C4.47756 14.1753 4.23229 14.665 3.82158 14.8157C3.4251 14.9863 2.92416 14.7976 2.72838 14.4159C2.54518 14.0919 2.60725 13.6585 2.86565 13.3927C2.99416 13.2609 3.16424 13.1693 3.34526 13.1357Z",
          fill: "#C1C1C1"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M23.07 4.92867L23.073 4.92566C23.7467 5.61253 24.357 6.36394 24.867 7.1807C25.8517 8.74367 26.4907 10.5227 26.7228 12.3555C26.8779 13.5827 26.8669 14.8328 26.6668 16.0543C26.3195 18.2421 25.3833 20.3311 23.9898 22.0524C22.8332 23.4874 21.3684 24.6785 19.713 25.4912L19.6958 25.4841C19.6681 25.454 19.6402 25.425 19.6124 25.396C18.4981 24.2768 17.3786 23.1626 16.2647 22.0428C16.1966 21.9813 16.1345 21.8577 16.0259 21.91C15.0375 22.1623 14.0017 22.2285 12.9894 22.1014C11.8082 21.9575 10.6606 21.5479 9.65458 20.9125C8.78177 20.3637 8.0145 19.6475 7.40638 18.8149C6.75122 17.9197 6.27982 16.8894 6.03782 15.8063C5.73677 14.482 5.76767 13.0823 6.14064 11.7758C6.63802 9.99492 7.76923 8.4016 9.2797 7.33656C10.497 6.46675 11.9602 5.94804 13.4532 5.85179C14.7747 5.76046 16.1192 5.9989 17.3283 6.54085C18.2383 6.94335 19.0652 7.52304 19.7748 8.21894C20.8756 7.12464 21.9677 6.0216 23.07 4.92867ZM13.4518 9.9591C12.8713 10.037 12.3064 10.2402 11.8145 10.559C11.1834 10.9541 10.6726 11.5319 10.3406 12.1972C9.94197 12.9956 9.83095 13.9256 9.99884 14.7995C10.1063 15.3423 10.3278 15.8626 10.6431 16.3173C10.8599 16.6323 11.1257 16.9096 11.3991 17.1754C12.9667 18.7452 14.533 20.3161 16.102 21.8843C17.4443 21.5269 18.6906 20.8195 19.6854 19.8499C20.9188 18.6648 21.7542 17.0761 22.0454 15.3912C22.052 15.3628 22.0514 15.3116 22.096 15.3201C22.9062 15.3212 23.7164 15.3198 24.5268 15.3215C25.0475 15.3133 25.535 14.9176 25.6414 14.4066C25.6474 14.3735 25.6414 14.3431 25.6231 14.315C25.6564 14.1588 25.6799 13.9983 25.6608 13.8384L25.6542 13.8493C25.5982 13.2931 25.0844 12.8343 24.5263 12.8329C22.3213 12.831 20.1163 12.8327 17.911 12.831C17.7349 12.2273 17.4052 11.6735 16.9805 11.2114C16.2751 10.4595 15.2781 9.9807 14.2456 9.93121C13.9809 9.93175 13.714 9.91644 13.4518 9.9591ZM21.2822 20.5769C20.9366 20.6333 20.6432 20.9212 20.5795 21.2655C20.539 21.488 20.5757 21.7309 20.7088 21.9176C20.8663 22.1692 21.1682 22.3212 21.4638 22.3073C21.6913 22.3081 21.909 22.1993 22.0697 22.0431C22.2029 21.89 22.3008 21.6967 22.3068 21.4908C22.3303 21.1799 22.1685 20.8591 21.9002 20.6989C21.7219 20.5769 21.4931 20.5417 21.2822 20.5769Z",
          fill: "#686868"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M6.51521 5.69821C6.75693 5.68481 7.00466 5.77477 7.17529 5.94786C7.38119 6.14747 7.48646 6.45426 7.42521 6.73672C7.35795 7.14086 6.97377 7.46352 6.56279 7.45231C6.16685 7.46461 5.79252 7.16438 5.70802 6.77938C5.61177 6.42063 5.78705 6.0184 6.10068 5.82618C6.22564 5.75071 6.36947 5.70586 6.51521 5.69821Z",
          fill: "#C3C3C3"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M13.4524 9.95908C13.7146 9.91643 13.9815 9.93174 14.2461 9.93119C15.2786 9.98068 16.2756 10.4595 16.9811 11.2114C17.4057 11.6735 17.7355 12.2272 17.9116 12.831C16.6081 12.8307 15.3044 12.8307 14.0006 12.8307C13.6673 12.8277 13.3381 12.9789 13.1199 13.2302C12.9555 13.4175 12.8535 13.6581 12.8344 13.9067C12.8018 14.2942 12.981 14.6915 13.2908 14.9261C13.4991 15.0877 13.7633 15.1722 14.0268 15.1667C17.491 15.1656 20.9555 15.1651 24.4197 15.1675C24.5498 15.1686 24.6819 15.1634 24.8079 15.1271C25.1965 15.0226 25.5194 14.704 25.6236 14.3149C25.6419 14.3431 25.6479 14.3735 25.6419 14.4065C25.5356 14.9176 25.048 15.3133 24.5274 15.3215C23.7169 15.3198 22.9067 15.3212 22.0965 15.3201C22.052 15.3116 22.0525 15.3628 22.046 15.3912C21.7547 17.0761 20.9194 18.6648 19.6859 19.8499C18.6911 20.8195 17.4448 21.5269 16.1025 21.8842C14.5335 20.3161 12.9673 18.7452 11.3997 17.1754C11.1262 16.9096 10.8604 16.6323 10.6436 16.3173C10.3283 15.8626 10.1068 15.3422 9.99939 14.7995C9.8315 13.9256 9.94251 12.9956 10.3412 12.1972C10.6731 11.5319 11.1839 10.9541 11.815 10.559C12.3069 10.2402 12.8718 10.037 13.4524 9.95908Z",
          fill: "#474747"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M13.1195 13.2302C13.3377 12.9789 13.6669 12.8277 14.0002 12.8307C15.3039 12.8307 16.6077 12.8307 17.9112 12.831C20.1164 12.8326 22.3214 12.831 24.5264 12.8329C25.0845 12.8343 25.5983 13.2931 25.6544 13.8493C25.6492 13.8583 25.6385 13.8758 25.633 13.8846C25.5324 13.3784 25.0432 12.9778 24.5264 12.9809C21.1093 12.9836 17.6921 12.9841 14.275 12.9855C14.0636 12.9891 13.8446 12.9636 13.642 13.0391C13.3943 13.1167 13.1845 13.2879 13.033 13.4957C12.9417 13.6201 12.913 13.7757 12.834 13.9067C12.8531 13.6582 12.9551 13.4175 13.1195 13.2302Z",
          fill: "#BFBFBF"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M6.40623 20.5744C6.78221 20.5014 7.19209 20.7079 7.35123 21.0573C7.47264 21.3056 7.46663 21.6116 7.33182 21.853C7.19127 22.1246 6.89541 22.3056 6.59026 22.3124C6.36413 22.3228 6.13854 22.2348 5.97038 22.0849C5.72346 21.8607 5.6212 21.4907 5.72702 21.1727C5.81889 20.8676 6.09206 20.6278 6.40623 20.5744Z",
          fill: "#BFBFBF"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M13.6419 13.0391C13.8445 12.9636 14.0635 12.9891 14.2749 12.9855C17.692 12.9841 21.1092 12.9836 24.5263 12.9809C25.0431 12.9778 25.5323 13.3784 25.6329 13.8846C25.6384 13.8758 25.6491 13.8583 25.6543 13.8493L25.6608 13.8384C25.68 13.9983 25.6564 14.1588 25.6231 14.315C25.5189 14.7041 25.196 15.0226 24.8074 15.1271C24.6814 15.1634 24.5493 15.1686 24.4191 15.1675C20.955 15.1651 17.4905 15.1656 14.0263 15.1667C13.7627 15.1722 13.4986 15.0877 13.2902 14.9261C12.9804 14.6915 12.8013 14.2942 12.8339 13.9067C12.9129 13.7757 12.9416 13.6201 13.0329 13.4957C13.1844 13.2879 13.3941 13.1167 13.6419 13.0391Z",
          fill: "#B0B0B0"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M1.62695 17.3928C1.65402 17.4344 1.6841 17.4759 1.69586 17.5254C1.79484 17.9003 1.93977 18.2604 2.07539 18.6233C2.18148 18.8779 2.28812 19.1324 2.41035 19.3799C2.49949 19.6008 2.62637 19.8032 2.73574 20.0143C3.22684 20.91 3.82293 21.75 4.51773 22.499C4.92816 22.9731 5.39984 23.3888 5.87727 23.7937C6.48156 24.2783 7.12031 24.7218 7.80035 25.0936C9.43113 25.9987 11.2637 26.5338 13.1245 26.6572C15.3478 26.8141 17.6086 26.3695 19.6131 25.3961C19.641 25.425 19.6689 25.454 19.6965 25.4841L19.6973 25.5008C18.5402 26.0758 17.2944 26.4723 16.018 26.6741C14.4618 26.9175 12.8609 26.8789 11.3198 26.5511C9.4634 26.1587 7.69891 25.3422 6.195 24.1856C4.45812 22.8558 3.06906 21.0758 2.20664 19.0649C1.97641 18.5216 1.77105 17.9651 1.62695 17.3928Z",
          fill: "#939393"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M21.2828 20.577C21.4936 20.5417 21.7225 20.5769 21.9008 20.6989C22.169 20.8591 22.3309 21.1799 22.3074 21.4908C22.3013 21.6967 22.2034 21.89 22.0703 22.0431C21.9095 22.1993 21.6918 22.3081 21.4643 22.3073C21.1688 22.3212 20.8669 22.1692 20.7094 21.9176C20.5762 21.7309 20.5396 21.488 20.58 21.2655C20.6438 20.9212 20.9372 20.6333 21.2828 20.577Z",
          fill: "#767676"
        }
      ),
      /* @__PURE__ */ i(
        "path",
        {
          d: "M13.8466 23.6378C14.0853 23.5952 14.3404 23.6559 14.5324 23.8049C14.8315 24.0275 14.9576 24.4535 14.8217 24.8019C14.7295 25.06 14.5083 25.2643 14.2456 25.34C13.9899 25.4168 13.7011 25.3654 13.4862 25.2071C13.1915 25.0009 13.0547 24.5995 13.1606 24.2558C13.2472 23.9405 13.5251 23.6931 13.8466 23.6378Z",
          fill: "#BEBEBE"
        }
      )
    ]
  }
), s7 = {
  sms_otp: /* @__PURE__ */ i(
    "svg",
    {
      width: "28",
      height: "28",
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ i("g", { id: "material-symbols:sms-outline-rounded", children: /* @__PURE__ */ i(
        "path",
        {
          id: "Vector",
          d: "M7.00065 21L4.31732 23.6834C3.94788 24.0528 3.52476 24.1357 3.04799 23.9319C2.57121 23.7281 2.33321 23.3633 2.33399 22.8375V4.66671C2.33399 4.02504 2.56265 3.47593 3.01999 3.01937C3.47732 2.56282 4.02643 2.33415 4.66732 2.33337H23.334C23.9757 2.33337 24.5252 2.56204 24.9825 3.01937C25.4398 3.47671 25.6681 4.02582 25.6673 4.66671V18.6667C25.6673 19.3084 25.439 19.8579 24.9825 20.3152C24.5259 20.7725 23.9764 21.0008 23.334 21H7.00065ZM6.00899 18.6667H23.334V4.66671H4.66732V19.9792L6.00899 18.6667ZM9.33399 12.8334C9.66454 12.8334 9.94182 12.7214 10.1658 12.4974C10.3898 12.2734 10.5014 11.9965 10.5007 11.6667C10.4999 11.3369 10.3879 11.06 10.1647 10.836C9.94143 10.612 9.66454 10.5 9.33399 10.5C9.00343 10.5 8.72654 10.612 8.50332 10.836C8.2801 11.06 8.1681 11.3369 8.16732 11.6667C8.16654 11.9965 8.27854 12.2738 8.50332 12.4985C8.7281 12.7233 9.00499 12.8349 9.33399 12.8334ZM14.0007 12.8334C14.3312 12.8334 14.6085 12.7214 14.8325 12.4974C15.0565 12.2734 15.1681 11.9965 15.1673 11.6667C15.1665 11.3369 15.0545 11.06 14.8313 10.836C14.6081 10.612 14.3312 10.5 14.0007 10.5C13.6701 10.5 13.3932 10.612 13.17 10.836C12.9468 11.06 12.8348 11.3369 12.834 11.6667C12.8332 11.9965 12.9452 12.2738 13.17 12.4985C13.3948 12.7233 13.6717 12.8349 14.0007 12.8334ZM18.6673 12.8334C18.9979 12.8334 19.2752 12.7214 19.4992 12.4974C19.7232 12.2734 19.8348 11.9965 19.834 11.6667C19.8332 11.3369 19.7212 11.06 19.498 10.836C19.2748 10.612 18.9979 10.5 18.6673 10.5C18.3368 10.5 18.0599 10.612 17.8367 10.836C17.6134 11.06 17.5014 11.3369 17.5007 11.6667C17.4999 11.9965 17.6119 12.2738 17.8367 12.4985C18.0614 12.7233 18.3383 12.8349 18.6673 12.8334Z",
          fill: "#69B1FF"
        }
      ) })
    }
  ),
  email_otp: /* @__PURE__ */ i(
    "svg",
    {
      width: "28",
      height: "28",
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ i("g", { id: "ic:outline-email", children: /* @__PURE__ */ i(
        "path",
        {
          id: "Vector",
          d: "M25.6673 6.99996C25.6673 5.71663 24.6173 4.66663 23.334 4.66663H4.66732C3.38398 4.66663 2.33398 5.71663 2.33398 6.99996V21C2.33398 22.2833 3.38398 23.3333 4.66732 23.3333H23.334C24.6173 23.3333 25.6673 22.2833 25.6673 21V6.99996ZM23.334 6.99996L14.0007 12.8333L4.66732 6.99996H23.334ZM23.334 21H4.66732V9.33329L14.0007 15.1666L23.334 9.33329V21Z",
          fill: "#69B1FF"
        }
      ) })
    }
  ),
  totp: An,
  push_register: An,
  duo_security: An
}, l7 = ({
  isRequired: t,
  methods: e,
  onMethodSelect: n,
  onBack: a,
  className: r,
  style: s
}) => {
  const { lrInstance: l, content: c, secondFactorConfig: d } = re(), [h, u] = k(!t), [m, g] = k(e), { accessToken: p, MFAToken: b, email: x } = ce(), P = (E) => {
    if (E.id === "sms_otp" && d && d.OTPPhoneNo && d.IsOTPAuthenticatorVerified) {
      const w = l.controller.resendSMSOTP(b);
      w ? n(E) : console.error("Error in MFA method selection:", w), n(E);
    } else E.id === "email_otp" && (d ? l.controller.mfaEmailOTP(
      {
        emailid: x
      },
      b
    ) ? n(E) : console.error("Error in MFA method selection:") : l.controller.accountEmailOTP(
      {
        emailid: x
      },
      p
    ) ? n(E) : console.error("Error in MFA method selection:"));
    n(E);
  };
  return X(() => {
    if (e && d) {
      const E = [
        (d == null ? void 0 : d.IsEmailOtpAuthenticatorVerified) && "email_otp",
        (d == null ? void 0 : d.IsOTPAuthenticatorVerified) && "sms_otp",
        (d == null ? void 0 : d.IsGoogleAuthenticatorVerified) && "totp",
        (d == null ? void 0 : d.IsPushDeviceRegistered) && "push_register",
        (d == null ? void 0 : d.IsDuoAuthenticatorVerified) && "duo_security"
      ].filter(Boolean);
      u(
        (R) => R && E.length < 1
      );
      const w = E.length ? e.filter((R) => E.includes(R.id)) : e.filter(
        (R) => !(R.id === "email_otp" && (!(d != null && d.Email) || (d == null ? void 0 : d.Email.length) === 0))
      );
      g(w);
    }
  }, [e, d, h]), /* @__PURE__ */ f("div", { style: { ...s }, className: "loginradius-card-container", children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(
        de,
        {
          style: { objectFit: "contain" }
        }
      ),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: c[Dt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: c[Dt].description })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "loginradius-selector-container", children: m.map((E) => /* @__PURE__ */ f(
      "div",
      {
        className: "loginradius-selector-item",
        onClick: () => P(E),
        children: [
          s7[E.id],
          /* @__PURE__ */ f("div", { className: "loginradius-selector-text", children: [
            /* @__PURE__ */ i("h4", { children: E.name }),
            /* @__PURE__ */ i("h6", { children: E.description })
          ] })
        ]
      },
      E.id
    )) }),
    h ? /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: /* @__PURE__ */ i(
      Y,
      {
        ButtonId: H.skip,
        style: { display: "block", margin: "0 auto" },
        onClick: () => {
          P(i7);
        },
        children: c[Dt].skipText
      }
    ) }) : /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: /* @__PURE__ */ i(
      Y,
      {
        ButtonId: H.back,
        style: { display: "block", margin: "0 auto" },
        onClick: a,
        children: c[Dt].backText
      }
    ) })
  ] });
}, c7 = (t) => /* @__PURE__ */ i(
  Me,
  {
    display: "Enter Code",
    error: "",
    autoFocus: !0
  }
), Gf = ({
  code: t,
  className: e = "",
  style: n
}) => {
  const [a, r] = k(t);
  return /* @__PURE__ */ f("div", { children: [
    /* @__PURE__ */ i(
      "textarea",
      {
        value: a,
        onChange: (l) => {
          r(l.target.value);
        },
        style: {
          padding: "16px",
          backgroundColor: "#1a202c",
          borderRadius: "8px",
          color: "white",
          fontFamily: "monospace",
          overflow: "auto",
          maxHeight: "400px",
          border: "1px solid #ccc",
          width: "100%",
          height: "200px",
          ...n
        }
      }
    ),
    /* @__PURE__ */ i(
      "pre",
      {
        style: {
          padding: "16px",
          backgroundColor: "#1a202c",
          borderRadius: "8px",
          color: "white",
          fontFamily: "monospace",
          overflow: "auto",
          maxHeight: "400px",
          border: "1px solid #ccc",
          ...n
        },
        children: /* @__PURE__ */ i("code", { children: a })
      }
    )
  ] });
}, Jf = (t) => {
  var e;
  return /* @__PURE__ */ i(
    Be,
    {
      ...t,
      field: {
        ...t.field,
        display: "Select Security Question",
        options: (e = t.field.options) == null ? void 0 : e.map((n) => ({
          ...n,
          text: n.text || n.name || "Default Text",
          name: n.name || "Default Name"
        }))
      }
    }
  );
}, oa = ({ onValidation: t, ...e }) => {
  const [n, a] = k({
    isValid: !0
  }), [r, s] = k(e.value || ""), l = (c) => {
    s(c.target.value), e.onChange(c);
    const d = xe(c.target.value, e.field.rules);
    a(d), t == null || t(d);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "text",
      ...e,
      field: { ...e.field, display: "Answer", type: "text" },
      value: r,
      onChange: l,
      error: n.errorMessage
    }
  );
}, Qf = ({
  question: t,
  className: e = "",
  style: n
}) => /* @__PURE__ */ i(
  "div",
  {
    style: {
      padding: "0.5rem",
      color: "var(--sdk-body-text-color)",
      // Equivalent to Tailwind's "text-body-text"
      ...n
    },
    className: e,
    children: t
  }
), Eo = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules);
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "text",
      ...e,
      field: { ...e.field, display: "Full Name" },
      onChange: r,
      error: e.hasError && n.errorMessage
    }
  );
}, Xf = ({
  className: t = "",
  style: e
}) => {
  const n = Ce(null);
  return /* @__PURE__ */ f(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
        ...e
      },
      children: [
        /* @__PURE__ */ i(
          "button",
          {
            onClick: () => {
              var a;
              return (a = n.current) == null ? void 0 : a.click();
            },
            style: {
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer"
            },
            children: "Upload Avatar"
          }
        ),
        /* @__PURE__ */ i(
          "input",
          {
            type: "file",
            ref: n,
            accept: "image/*",
            style: { display: "none" },
            onChange: (a) => {
              if (a.target.files && a.target.files[0]) {
                const r = new FileReader();
                r.onload = (s) => {
                  var c;
                  const l = document.getElementById(
                    "avatar-preview"
                  );
                  l && (l.src = (c = s.target) == null ? void 0 : c.result, l.style.display = "block");
                }, r.readAsDataURL(a.target.files[0]);
              }
            }
          }
        ),
        /* @__PURE__ */ i(
          "img",
          {
            id: "avatar-preview",
            alt: "Avatar Preview",
            style: {
              display: "none",
              width: "32px",
              height: "32px",
              marginInline: "8px",
              borderRadius: "50%"
            }
          }
        ),
        /* @__PURE__ */ i("div", { id: "file-info", style: { marginTop: "8px", display: "none" }, children: /* @__PURE__ */ i("p", { id: "file-name" }) })
      ]
    }
  );
}, ra = ({
  field: t,
  value: e,
  onChange: n,
  hasError: a,
  onValidation: r,
  className: s = "",
  style: l
}) => {
  const [c, d] = k({
    isValid: !0
  }), [h, u] = k(e || ""), [m, g] = k(!1), [p, b] = k(!1), x = (R) => {
    n(R), u(R.target.value);
    const v = xe(R.target.value, t.rules, "text");
    d(v), r == null || r(v);
  }, P = {
    width: "100%",
    padding: "10px 16px",
    borderRadius: "8px",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    borderWidth: "1px",
    borderStyle: "solid"
  }, E = {
    borderColor: a || !c.isValid ? "red" : m ? "var(--sdk-body-primary-color, #3B82F6)" : "var(--sdk-input-border-color, #D1D5DB)",
    backgroundColor: "var(--sdk-input-bg-color, #FFFFFF)",
    color: "var(--sdk-body-text-color, #111827)",
    boxShadow: a || !c.isValid ? "0 0 0 2px #ff000033" : p ? "0 0 0 2px var(--sdk-body-primary-ring-color, #3B82F6)" : "0 0 0 2px transparent"
  }, w = {
    ...P,
    ...E,
    ...l
  };
  return /* @__PURE__ */ i("div", { style: { marginBottom: "4px" }, children: /* @__PURE__ */ i(
    "input",
    {
      type: "text",
      id: t.name,
      name: t.name,
      value: h,
      onChange: x,
      onMouseEnter: () => g(!0),
      onMouseLeave: () => g(!1),
      onFocus: () => b(!0),
      onBlur: () => b(!1),
      style: w,
      className: s,
      "aria-label": t.display,
      "aria-invalid": a || !c.isValid,
      "aria-describedby": a || !c.isValid ? `${t.name}-error` : void 0
    }
  ) });
}, d7 = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules);
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    ra,
    {
      ...e,
      field: { ...e.field, display: "New Username" },
      onChange: r,
      hasError: e.hasError || !n.isValid
    }
  );
}, Ye = (t) => /* @__PURE__ */ i(
  Ee,
  {
    type: "email",
    ...t,
    field: { ...t.field, display: "Email", type: "email" }
  }
), u7 = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules, "email");
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    Ye,
    {
      ...e,
      field: { ...e.field, display: "New Email" },
      onChange: r,
      hasError: e.hasError || !n.isValid
    }
  );
}, Yf = (t) => {
  const e = { ...t.field, display: "Select Email" };
  return /* @__PURE__ */ i(Be, { ...t, field: e });
}, e6 = (t) => {
  var e;
  return /* @__PURE__ */ i(
    Be,
    {
      ...t,
      field: {
        ...t.field,
        display: "Select Provider",
        options: (e = t.field.options) == null ? void 0 : e.map((n) => ({
          text: n.text || n.name,
          // Ensure 'text' is provided
          name: n.name,
          value: n.value
        }))
      }
    }
  );
}, h7 = {
  Google: "GlobeAltIcon",
  Facebook: "UserCircleIcon",
  Twitter: "ChatBubbleOvalLeftIcon"
}, m7 = ({
  accounts: t,
  className: e = "",
  style: n
}) => {
  const a = (r) => h7[r] || "LinkIcon";
  return /* @__PURE__ */ i(
    "div",
    {
      style: {
        backgroundColor: "var(--sdk-body-bg-color)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ...n
      },
      className: e,
      children: t.length === 0 ? /* @__PURE__ */ i("p", { style: { color: "gray" }, children: "No linked accounts" }) : t.map((r) => /* @__PURE__ */ f(
        "div",
        {
          style: {
            padding: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid",
            borderRadius: "8px",
            borderColor: "var(--sdk-body-text-color)"
          },
          children: [
            /* @__PURE__ */ i(
              Pe,
              {
                name: a(r.provider),
                size: 20,
                style: { color: "gray" }
              }
            ),
            /* @__PURE__ */ i("span", { style: { color: "var(--sdk-body-text-color)" }, children: r.provider })
          ]
        },
        r.id
      ))
    }
  );
}, f7 = ({
  email: t,
  className: e = "",
  style: n
}) => {
  const a = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ...n
  };
  return /* @__PURE__ */ f("div", { className: e, style: a, children: [
    /* @__PURE__ */ i(Pe, { name: "EnvelopeIcon", size: 20, style: {
      color: "#6b7280"
      // Equivalent to Tailwind's text-gray-500
    } }),
    /* @__PURE__ */ i("span", { style: {
      fontSize: "1rem"
      // Equivalent to Tailwind's text-body-text
    }, children: t })
  ] });
}, t6 = (t) => /* @__PURE__ */ i(Mt, { ...t, field: { ...t.field, display: "Confirm Action" } }), p7 = ({
  className: t = "",
  style: e
}) => /* @__PURE__ */ f(
  "div",
  {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "8px",
      gap: "8px",
      color: "#4B5563",
      // Equivalent to text-gray-600
      backgroundColor: "var(--sdk-card-bg-color, #FFFFFF)",
      ...e
    },
    children: [
      /* @__PURE__ */ i(Pe, { name: "InformationCircleIcon", size: 16 }),
      /* @__PURE__ */ i("span", { children: "Manage your custom event consents below" })
    ]
  }
), g7 = (t) => {
  var e;
  return /* @__PURE__ */ i(
    Be,
    {
      ...t,
      field: {
        ...t.field,
        display: t.field.display || "Select Event",
        options: (e = t.field.options) == null ? void 0 : e.map((n) => ({
          ...n,
          text: n.text || n.value,
          // Ensure 'text' is always present
          name: n.name || ""
          // Ensure 'name' is always present
        }))
      }
    }
  );
}, w7 = ({
  consents: t,
  onConsentChange: e,
  className: n = ""
}) => /* @__PURE__ */ f("div", { className: `space-y-2 ${n}`, children: [
  t.ConsentForm[0].Consents.map(
    ({ ConsentId: a, Description: r, IsRequired: s, Title: l }) => /* @__PURE__ */ i(
      Yn,
      {
        field: {
          name: a,
          display: l,
          description: r,
          rules: s ? "required" : ""
        },
        onChange: (c) => e(a, c.target.checked),
        className: "",
        fieldId: "",
        value: !1
      },
      a
    )
  ),
  t.TermOfService && /* @__PURE__ */ i("div", { className: "terms-of-service", children: /* @__PURE__ */ i("p", { children: t.TermOfService }) }),
  t.PrivacyPolicy && /* @__PURE__ */ i("div", { className: "privacy-policy", children: /* @__PURE__ */ i("p", { children: t.PrivacyPolicy }) })
] }), Po = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), [r, s] = k(e.value), l = (c) => {
    s(c.target.value), e.onChange(c);
    const d = xe(c.target.value, e.field.rules);
    a(d), t == null || t(d);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "text",
      ...e,
      value: r,
      field: { ...e.field, display: "Company Domain" },
      onChange: l,
      error: e.hasError && n.errorMessage
    }
  );
}, n6 = (t) => /* @__PURE__ */ i(te, { ButtonText: t.ButtonText || "Send Magic Link", ...t }), a6 = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules);
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    Ee,
    {
      type: "text",
      ...e,
      field: { ...e.field, display: "Invitation Code" },
      onChange: r,
      error: e.hasError && n.errorMessage
    }
  );
}, o6 = ({
  onValidation: t,
  ...e
}) => {
  const [n, a] = k({
    isValid: !0
  }), r = (s) => {
    e.onChange(s);
    const l = xe(s.target.value, e.field.rules, "password");
    a(l), t == null || t(l);
  };
  return /* @__PURE__ */ i(
    qe,
    {
      ...e,
      field: { ...e.field, display: "Set Password" },
      onChange: r,
      error: e.hasError && n.errorMessage
    }
  );
}, v7 = ({
  sessions: t,
  className: e = "",
  style: n
}) => /* @__PURE__ */ i(
  "div",
  {
    className: e,
    style: {
      backgroundColor: "var(--sdk-card-bg-color, #FFFFFF)",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      ...n
    },
    children: t.length === 0 ? /* @__PURE__ */ i("p", { style: { color: "#6B7280" }, children: "No active sessions" }) : t.map((a) => /* @__PURE__ */ f(
      "div",
      {
        style: {
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid var(--sdk-input-border-color)",
          borderRadius: "8px"
        },
        children: [
          /* @__PURE__ */ i(
            Pe,
            {
              name: "DevicePhoneMobileIcon",
              size: 20,
              style: { color: "#6B7280" }
            }
          ),
          /* @__PURE__ */ f("div", { children: [
            /* @__PURE__ */ i("p", { style: { fontSize: "16px", color: "#111827" }, children: a.device }),
            /* @__PURE__ */ f("p", { style: { fontSize: "14px", color: "#6B7280" }, children: [
              "Last active: ",
              a.lastActive
            ] })
          ] })
        ]
      },
      a.id
    ))
  }
), y7 = ({
  onFileChange: t,
  initialImage: e,
  className: n = "",
  style: a,
  theme: r
}) => {
  var u;
  const { theme: s } = ho(), l = { ...s, ...r }, [c, d] = k(e), h = (m) => {
    var p;
    const g = (p = m.target.files) == null ? void 0 : p[0];
    g && (d(URL.createObjectURL(g)), t == null || t(g));
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: n,
      style: { ...a, display: "flex", flexDirection: "column", gap: "8px" },
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            style: {
              position: "relative",
              width: "96px",
              height: "96px",
              margin: "0 auto"
            },
            children: c ? /* @__PURE__ */ i(
              "img",
              {
                src: c,
                alt: "Profile",
                style: {
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover"
                }
              }
            ) : /* @__PURE__ */ f(
              "div",
              {
                style: {
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#e5e7eb",
                  // gray-200
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                },
                children: [
                  /* @__PURE__ */ i(
                    Pe,
                    {
                      name: "UserCircleIcon",
                      size: 40,
                      style: { color: "#6b7280" }
                    }
                  ),
                  " "
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ f(
          "label",
          {
            style: {
              width: "100%",
              padding: "8px 16px",
              border: `1px solid ${(u = l.input) == null ? void 0 : u.border}`,
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              backgroundColor: "transparent",
              color: "inherit"
            },
            children: [
              /* @__PURE__ */ i(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: h,
                  style: { display: "none" }
                }
              ),
              /* @__PURE__ */ i("span", { children: "Upload Profile Picture" })
            ]
          }
        )
      ]
    }
  );
}, k7 = (t) => /* @__PURE__ */ i(
  te,
  {
    ButtonText: t.ButtonText || "Sign In",
    icon: "ArrowRightOnRectangleIcon",
    iconPosition: "left",
    ...t
  }
), r6 = ({
  onSuccess: t,
  onError: e,
  allowedProviders: n = [],
  className: a = "",
  style: r
}) => {
  const [s, l] = k(""), [c, d] = k(""), h = () => {
    if (!s || !c) {
      e == null || e({ error: "All fields are required" });
      return;
    }
    t == null || t({ identifier: s });
  }, u = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    padding: "16px",
    ...r
  };
  return /* @__PURE__ */ f("div", { className: a, style: u, children: [
    /* @__PURE__ */ i(
      Ye,
      {
        field: { name: "email", display: "Email", rules: "email" },
        value: s,
        onChange: (m) => l(m.target.value)
      }
    ),
    /* @__PURE__ */ i(
      ot,
      {
        field: { name: "phone", display: "Phone", rules: "phone" },
        value: s,
        onChange: (m) => l(m.target.value)
      }
    ),
    /* @__PURE__ */ i(
      ra,
      {
        field: { name: "username", display: "Username" },
        value: s,
        onChange: (m) => l(m.target.value)
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        field: {
          name: "password",
          display: "Password",
          rules: "required|min:8"
        },
        value: c,
        onChange: (m) => d(m.target.value)
      }
    ),
    /* @__PURE__ */ i(k7, { onClick: h }),
    /* @__PURE__ */ i(Co, { onClick: () => {
    } })
  ] });
}, To = ({
  onValidation: t,
  passwordToMatch: e,
  ...n
}) => {
  const [a, r] = k({
    isValid: !0
  }), s = (l) => {
    n.onChange(l);
    const c = l.target.value;
    let d = xe(c, n.field.rules, "password");
    d.isValid && c !== e && (d = { isValid: !1, errorMessage: "Passwords do not match" }), r(d), t == null || t(d);
  };
  return /* @__PURE__ */ i(
    qe,
    {
      ...n,
      field: { ...n.field, display: "Confirm Password" },
      onChange: s,
      error: n.hasError && a.errorMessage
    }
  );
}, i6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), [l, c] = k(""), [d, h] = k(""), [u, m] = k(""), [g, p] = k(!1), b = () => {
    if (!r || !l || !u || !g) {
      e == null || e({ error: "Please fill in all fields and accept terms" });
      return;
    }
    if (l !== d) {
      e == null || e({ error: "Passwords do not match" });
      return;
    }
    t == null || t({ email: r, username: u });
  }, x = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { className: n, style: x, children: [
    /* @__PURE__ */ i(
      Ye,
      {
        field: { name: "email", display: "Email", rules: "required|email" },
        value: r,
        onChange: (P) => s(P.target.value)
      }
    ),
    /* @__PURE__ */ i(
      ra,
      {
        field: {
          name: "username",
          display: "Username",
          rules: "required|min:3"
        },
        value: u,
        onChange: (P) => m(P.target.value)
      }
    ),
    /* @__PURE__ */ i(
      qe,
      {
        field: {
          name: "password",
          display: "Password",
          rules: "required|min:8"
        },
        value: l,
        onChange: (P) => c(P.target.value)
      }
    ),
    /* @__PURE__ */ i(
      To,
      {
        field: {
          name: "confirmPassword",
          display: "Confirm Password",
          rules: "required"
        },
        value: d,
        passwordToMatch: l,
        onChange: (P) => h(P.target.value)
      }
    ),
    /* @__PURE__ */ i(
      Mt,
      {
        field: { name: "terms", display: "I accept the terms" },
        onChange: (P) => p(P.target.checked),
        value: !1
      }
    ),
    /* @__PURE__ */ i(
      te,
      {
        ButtonText: "Register",
        onClick: b,
        icon: "UserPlusIcon"
      }
    )
  ] });
}, Ut = "forgotpassword", C7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  captchaComponent: r,
  handleCaptcha: s
}) => {
  const [l, c] = k(!1), [d, h] = k(null), [u, m] = k(null), { setEmail: g, setPhone: p, setUsername: b } = ce(), { lrInstance: x, content: P } = re(), {
    values: E,
    errors: w,
    touched: R,
    handleChange: v,
    handleSubmit: O,
    handleComponentChange: L
  } = Ke((u == null ? void 0 : u.Inputs) || []);
  X(() => {
    (async () => {
      const y = await x.getSchema("forgotPasswordFormSchema");
      c(!1), m(y);
    })();
  }, [x, x.initializing]);
  const A = async (C) => {
    c(!0);
    const y = mt.validateAndGetAuthPayload(C);
    x.controller.forgotPassword(
      {
        ...y.authPayload,
        ...At(C)
      },
      (I) => {
        if (I != null && I.success)
          y.authPayload.email ? g(y.authPayload.email) : y.authPayload.phone ? p(y.authPayload.phone) : b(y.authPayload.username), t == null || t(I);
        else {
          const N = (I == null ? void 0 : I.error) || D.ForgotPasswordError;
          h(N), e == null || e({
            error: N
          });
        }
        c(!1);
      },
      (I) => {
        h((I == null ? void 0 : I.error) || D.ForgotPasswordError), e == null || e(I), c(!1);
      }
    );
  };
  return /* @__PURE__ */ f("div", { className: `${a} loginradius-card-container `, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(
        de,
        {
          style: { objectFit: "contain" }
        }
      ),
      " ",
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: P[Ut].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: P[Ut].description })
      ] })
    ] }),
    d && /* @__PURE__ */ i(pe, { setError: h, error: d }),
    /* @__PURE__ */ i(
      "form",
      {
        onSubmit: O(
          (C) => s(C, A)
        ),
        className: "loginradius-form-container",
        children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
          u && u.Inputs.map((C) => /* @__PURE__ */ i(
            $e,
            {
              field: C,
              fieldId: H.login,
              value: E[C.name],
              error: w[C.name],
              touched: R[C.name],
              onChange: v,
              handleComponentChange: L
            },
            C.name
          )),
          r,
          /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
            Ve,
            {
              loading: l,
              ButtonText: P[Ut].submitButtonText
            }
          ) })
        ] })
      }
    ),
    n && /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: /* @__PURE__ */ i(
      Y,
      {
        ButtonId: H.back,
        style: { display: "block", margin: "0 auto" },
        onClick: n,
        children: P[Ut].backButtonText
      }
    ) })
  ] });
}, b7 = De({ action: "forgotpassword" }, C7), ct = "verify-email-otp", x7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(null), { lrInstance: c, content: d } = re(), [h, u] = k(!1), [m, g] = k(!1), [p, b] = k(null), [x, P] = k(null), [E, w] = k(null), [R, v] = k(!1), { email: O } = ce(), L = Ce(null);
  X(() => {
    (async () => {
      (await c.getOptions()).optionalEmailVerification && v(!0);
    })();
  }, [c, e]);
  const A = async () => {
    Ue(
      () => {
        var y, I;
        return ((I = (y = L.current) == null ? void 0 : y.getValue) == null ? void 0 : I.call(y)) ?? s;
      },
      () => {
        var y, I;
        return (I = (y = L.current) == null ? void 0 : y.isOtpComplete) == null ? void 0 : I.call(y);
      },
      (y) => P(y)
    ) && (u(!0), await c.controller.emailVerify(
      { otp: s, email: O },
      (y) => {
        u(!1), y.success ? t == null || t(y) : (b((y == null ? void 0 : y.error) || D.emailVerificationError), e == null || e({
          error: (y == null ? void 0 : y.error) || D.emailVerificationError
        }));
      },
      (y) => {
        u(!1), b(y == null ? void 0 : y.error), e == null || e(y);
      }
    ));
  };
  return /* @__PURE__ */ f("div", { className: `loginradius-card-container ${a}`, style: r, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d[ct].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d[ct].description }),
        O && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            style: { display: "block", margin: "0 auto" },
            onClick: n,
            ButtonText: O
          }
        )
      ] })
    ] }),
    p && /* @__PURE__ */ i(pe, { setError: b, error: p }),
    E && /* @__PURE__ */ i(Te, { setSuccess: w, success: E }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      /* @__PURE__ */ i("div", { className: "loginradius-login-form", children: /* @__PURE__ */ i(
        Me,
        {
          ref: L,
          display: "Enter OTP",
          onComplete: (C) => l(C),
          onChange: (C) => l(C),
          error: x,
          autoFocus: !0
        }
      ) }),
      /* @__PURE__ */ f("div", { className: "loginradius-button-container", children: [
        /* @__PURE__ */ i(
          Xe,
          {
            ButtonId: H.verify,
            type: "submit",
            ButtonText: d[ct].buttonText,
            loading: h,
            onClick: A
          }
        ),
        R && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.skip,
            ButtonText: d[ct].skipButtonText,
            style: {
              display: "block",
              width: "100%",
              padding: "16px"
            },
            onClick: () => {
              t == null || t("skipped");
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      d[ct].footerText,
      m ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.resendemailverification,
          onClick: () => {
            g(!0), c.controller.resendEmailVerification(
              { email: O },
              (C) => {
                C != null && C.success ? w(D.emailResendSuccess) : (b(
                  (C == null ? void 0 : C.error) || D.emailResendError
                ), e == null || e({
                  error: (C == null ? void 0 : C.error) || D.emailResendError
                }));
              },
              (C) => {
                b(C.error || D.emailResendError), e == null || e(C);
              }
            ).finally(() => {
              g(!1);
            });
          },
          children: d[ct].footerLinkText
        }
      )
    ] })
  ] });
}, kt = "verify-email-link", L7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  style: r
}) => {
  const { lrInstance: s, content: l } = re(), { email: c } = ce(), [d, h] = k(!1), [u, m] = k(null), [g, p] = k(!1), [b, x] = k(null);
  return X(() => {
    (async () => {
      (await s.getOptions()).optionalEmailVerification && p(!0);
    })();
  }, [s]), /* @__PURE__ */ f(
    "div",
    {
      style: { ...r },
      className: `${a} loginradius-card-container `,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, {}),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            " ",
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: l[kt].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: l[kt].description }),
            c && /* @__PURE__ */ i(
              Y,
              {
                ButtonId: H.back,
                ButtonText: c,
                style: {
                  display: "block",
                  width: "100%",
                  textAlign: "center"
                },
                onClick: n
              }
            )
          ] })
        ] }),
        u && /* @__PURE__ */ i(pe, { setError: m, error: u }),
        b && /* @__PURE__ */ i(Te, { setSuccess: x, success: b }),
        /* @__PURE__ */ i("div", { className: "loginradius-form-container", children: /* @__PURE__ */ f("div", { className: "loginradius-button-container", children: [
          d ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ i(
            te,
            {
              onClick: () => {
                h(!0), s.controller.resendEmailVerification(
                  { email: c },
                  (P) => {
                    P != null && P.success ? x(D.emailResendSuccess) : (m(
                      (P == null ? void 0 : P.error) || D.emailResendError
                    ), e == null || e({
                      error: (P == null ? void 0 : P.error) || D.emailResendError
                    }));
                  },
                  (P) => {
                    m(P.error || D.emailResendError), e == null || e(P);
                  }
                ).finally(() => {
                  h(!1);
                });
              },
              ButtonText: l[kt].resendButtonText
            }
          ),
          g && /* @__PURE__ */ i(
            Y,
            {
              ButtonId: H.skip,
              ButtonText: l[kt].skipButtonText,
              style: {
                display: "block",
                width: "100%",
                padding: "16px"
              },
              onClick: () => {
                t == null || t("skipped");
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: l[kt].footerText })
      ]
    }
  );
}, Qe = "verify-sms-otp", R7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(null), { lrInstance: c, content: d, options: h } = re(), { phone: u } = ce(), [m, g] = k(!1), [p, b] = k(!1), [x, P] = k(null), [E, w] = k(null), [R, v] = k(null), [O, L] = k(!1), A = Ce(null);
  X(() => {
    (async () => {
      const I = await c.getOptions();
      (I.optionalEmailVerification || I.disabledEmailVerification) && L(!0);
    })();
  }, [c, e]);
  const C = async () => {
    Ue(
      () => {
        var I, N;
        return ((N = (I = A.current) == null ? void 0 : I.getValue) == null ? void 0 : N.call(I)) ?? s;
      },
      () => {
        var I, N;
        return (N = (I = A.current) == null ? void 0 : I.isOtpComplete) == null ? void 0 : N.call(I);
      },
      (I) => w(I)
    ) && (g(!0), await c.controller.phoneVerify(
      { otp: s, phone: u },
      (I) => {
        g(!1), I.success ? t == null || t(I) : (P((I == null ? void 0 : I.error) || D.phoneVerificationError), e == null || e({
          error: (I == null ? void 0 : I.error) || D.phoneVerificationError
        }));
      },
      (I) => {
        g(!1), P(I.error), e == null || e(I);
      }
    ));
  };
  return /* @__PURE__ */ f("div", { className: `loginradius-card-container ${a}`, style: r, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d[Qe].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d[Qe].description }),
        /* @__PURE__ */ i(
          Y,
          {
            style: { display: "block", margin: "0 auto" },
            onClick: n,
            ButtonId: H.back,
            ButtonText: u
          }
        )
      ] })
    ] }),
    x && /* @__PURE__ */ i(pe, { setError: P, error: x }),
    R && /* @__PURE__ */ i(Te, { setSuccess: v, success: R }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      /* @__PURE__ */ i(
        Me,
        {
          ref: A,
          display: "Enter OTP",
          onComplete: (y) => l(y),
          onChange: (y) => l(y),
          error: E,
          autoFocus: !0
        }
      ),
      /* @__PURE__ */ f("div", { className: "loginradius-button-container", children: [
        /* @__PURE__ */ i(
          Xe,
          {
            ButtonId: H.verify,
            type: "submit",
            ButtonText: d[Qe].buttonText,
            loading: m,
            onClick: C
          }
        ),
        O && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.skip,
            ButtonText: d[Qe].skipButtonText,
            style: {
              display: "block",
              width: "100%"
            },
            onClick: () => {
              t == null || t("skipped");
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      d[Qe].footerText,
      p ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ f("div", { className: "flex align-center flex-gap-8", children: [
        d[Qe].footerLinkText,
        /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.resendotp,
            onClick: () => {
              b(!0), c.controller.resendPhoneVerificationOTP(
                { phone: u },
                !1,
                (y) => {
                  y != null && y.success ? v(D.otpResendSuccess) : (P(
                    (y == null ? void 0 : y.error) || D.otpResendError
                  ), e == null || e({
                    error: (y == null ? void 0 : y.error) || D.otpResendError
                  }));
                },
                (y) => {
                  P(y.error || "Resend failed"), e == null || e(y);
                }
              ).finally(() => {
                b(!1);
              });
            },
            children: d[Qe].footerLinkPrimaryText
          }
        ),
        (h == null ? void 0 : h.isVoiceOtp) && "or",
        (h == null ? void 0 : h.isVoiceOtp) && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.resendvoiceotp,
            onClick: () => {
              b(!0), c.controller.resendPhoneVerificationOTP(
                { phone: u },
                !0,
                (y) => {
                  y != null && y.success ? v(D.otpResendSuccess) : (P(
                    (y == null ? void 0 : y.error) || D.otpResendError
                  ), e == null || e({
                    error: (y == null ? void 0 : y.error) || D.otpResendError
                  }));
                },
                (y) => {
                  P(y.error || "Resend failed"), e == null || e(y);
                }
              ).finally(() => {
                b(!1);
              });
            },
            children: d[Qe].footerLinkSecondaryText
          }
        )
      ] })
    ] })
  ] });
}, s6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), l = () => {
    if (!r) {
      e == null || e({ error: "Email is required" });
      return;
    }
    t == null || t({ email: r });
  }, c = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { className: n, style: c, children: [
    /* @__PURE__ */ i(
      Ye,
      {
        field: { name: "email", display: "Email", rules: "required|email" },
        value: r,
        onChange: (d) => s(d.target.value)
      }
    ),
    /* @__PURE__ */ i(
      te,
      {
        ButtonText: "Send One-Time Link",
        icon: "EnvelopeIcon",
        onClick: l
      }
    )
  ] });
}, l6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), l = () => {
    if (!r) {
      e == null || e({ error: "Email is required" });
      return;
    }
    t == null || t({ email: r });
  }, c = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { className: n, style: c, children: [
    /* @__PURE__ */ i(
      Ye,
      {
        field: { name: "email", display: "Email", rules: "required|email" },
        value: r,
        onChange: (d) => s(d.target.value)
      }
    ),
    /* @__PURE__ */ i(
      te,
      {
        ButtonText: "Login",
        icon: "ArrowRightOnRectangleIcon",
        onClick: l
      }
    )
  ] });
}, Ht = "verify-passwordless-login-email", A7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  style: a,
  className: r
}) => {
  var P, E;
  const { lrInstance: s, content: l } = re(), { email: c } = ce(), [d, h] = k(!1), [u, m] = k(!1), [g, p] = k(null), [b, x] = k(null);
  return X(() => {
    const w = new URLSearchParams(window.location.search), R = w.get("vtype"), v = w.get("vtoken");
    R === "oneclicksignin" && v && (h(!0), (async () => await s.controller.passwordlessLoginEmailVerify(
      {
        verificationToken: v
      },
      (L) => {
        L != null && L.success ? t == null || t(L) : (x(
          (L == null ? void 0 : L.error) || "Failed to verify passwordless login"
        ), e == null || e(
          L != null && L.error ? { error: L.error, success: !1 } : { error: "An unexpected error occurred", success: !1 }
        ));
      },
      (L) => {
        console.error("Error during passwordless login:", L), x(L.error), e == null || e(L);
      }
    ))());
  }, [s]), /* @__PURE__ */ f(
    "div",
    {
      style: { ...a },
      className: `${r} loginradius-card-container `,
      children: [
        d ? /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, {}),
          /* @__PURE__ */ i("div", { className: "spinner" })
        ] }) : /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, {}),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: ((P = l == null ? void 0 : l[Ht]) == null ? void 0 : P.title) || " We've sent a passwordless verification link" }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: ((E = l == null ? void 0 : l[Ht]) == null ? void 0 : E.description) || "Verify by clicking on the link sent to" }),
            /* @__PURE__ */ i(
              Y,
              {
                ButtonId: H.back,
                ButtonText: c,
                style: {
                  display: "block",
                  width: "100%",
                  textAlign: "center"
                },
                onClick: n
              }
            )
          ] })
        ] }),
        b && /* @__PURE__ */ i(pe, { setError: x, error: b }),
        g && /* @__PURE__ */ i(Te, { setSuccess: p, success: g }),
        /* @__PURE__ */ i("div", { className: "loginradius-form-container", children: /* @__PURE__ */ i("div", { className: "loginradius-login-form", children: /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: u ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ i(
          te,
          {
            onClick: () => {
              m(!0), s.controller.passwordlessLoginEmail(
                { email: c },
                (w) => {
                  w != null && w.success ? p(D.emailResendSuccess) : (x(
                    (w == null ? void 0 : w.error) || D.emailResendError
                  ), e == null || e({
                    error: (w == null ? void 0 : w.error) || D.emailResendError
                  }));
                },
                (w) => {
                  x(
                    w.error || D.emailResendError
                  ), e == null || e(w);
                }
              ).finally(() => {
                m(!1);
              });
            },
            loading: u,
            ButtonText: l[Ht].resendButtonText
          }
        ) }) }) }),
        /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: l[Ht].footerText })
      ]
    }
  );
}, dt = "verify-passwordless-login-sms-otp", E7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  style: a,
  className: r
}) => {
  const { lrInstance: s, content: l, options: c } = re(), { phone: d } = ce(), [h, u] = k(!1), [m, g] = k(null), [p, b] = k(null), [x, P] = k(null), [E, w] = k(null), [R, v] = k(!1), O = Ce(null), L = async () => {
    Ue(
      () => {
        var y, I;
        return ((I = (y = O.current) == null ? void 0 : y.getValue) == null ? void 0 : I.call(y)) ?? E;
      },
      () => {
        var y, I;
        return (I = (y = O.current) == null ? void 0 : y.isOtpComplete) == null ? void 0 : I.call(y);
      },
      (y) => b(y)
    ) && (u(!0), s.controller.passwordlessLoginSMSOTPVerify(
      {
        phone: d,
        otp: E
      },
      (y) => {
        y != null && y.success ? t == null || t(y) : (g((y == null ? void 0 : y.error) || "Failed to verify passwordless login"), e == null || e({
          error: (y == null ? void 0 : y.error) || "Failed to verify passwordless login"
        })), u(!1);
      },
      (y) => {
        console.error("Error during passwordless login:", y), g(y.error), e == null || e(y), u(!1);
      }
    ));
  }, A = async () => {
    v(!0), await s.controller.passwordlessLoginSMS(
      {
        phone: d
      },
      (C) => {
        C != null && C.success ? P(D.otpResendSuccess) : (g((C == null ? void 0 : C.error) || D.otpResendError), e == null || e({
          error: (C == null ? void 0 : C.error) || D.otpResendError
        })), v(!1);
      },
      (C) => {
        console.error("Error during passwordless login:", C), g(C.error || D.otpResendError), e == null || e(C), v(!1);
      }
    );
  };
  return /* @__PURE__ */ f("div", { className: `${r} loginradius-card-container `, style: a, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: l[dt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: l[dt].description }),
        /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            onClick: () => {
              n == null || n();
            },
            ButtonText: d
          }
        )
      ] })
    ] }),
    m && /* @__PURE__ */ i(pe, { setError: g, error: m }),
    x && /* @__PURE__ */ i(Te, { setSuccess: P, success: x }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      /* @__PURE__ */ i("div", { className: "loginradius-login-form", children: /* @__PURE__ */ i(
        Me,
        {
          ref: O,
          display: "Enter OTP",
          onComplete: (C) => w(C),
          onChange: (C) => w(C),
          error: p,
          autoFocus: !0
        }
      ) }),
      /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
        Xe,
        {
          ButtonId: H.verify,
          type: "submit",
          loading: h,
          onClick: L
        }
      ) })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      l[dt].footerText,
      R ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ f("div", { className: "flex align-center flex-gap-8", children: [
        l[dt].footerLinkText,
        /* @__PURE__ */ i(Y, { ButtonId: H.resendotp, onClick: A, children: l[dt].footerLinkPrimaryText }),
        (c == null ? void 0 : c.isVoiceOtp) && "or",
        (c == null ? void 0 : c.isVoiceOtp) && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.resendvoiceotp,
            onClick: () => {
              v(!0), s.controller.resendPhoneVerificationOTP(
                { phone: d },
                !0,
                (C) => {
                  C != null && C.success ? P(D.otpResendSuccess) : (g(
                    (C == null ? void 0 : C.error) || D.otpResendError
                  ), e == null || e({
                    error: (C == null ? void 0 : C.error) || D.otpResendError
                  }));
                },
                (C) => {
                  g(C.error || "Resend failed"), e == null || e(C);
                }
              ).finally(() => {
                v(!1);
              });
            },
            children: l[dt].footerLinkSecondaryText
          }
        )
      ] })
    ] })
  ] });
}, Zt = "verify-passwordless-login-email-otp", P7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  style: a,
  className: r,
  captchaComponent: s,
  onCaptchaRequired: l,
  handleCaptcha: c
}) => {
  const { lrInstance: d, content: h } = re(), { email: u, username: m } = ce(), [g, p] = k(!1), [b, x] = k(null), [P, E] = k(null), [w, R] = k(null), [v, O] = k(!1), [L, A] = k(null), C = Ce(null), y = async (N) => {
    var M, U;
    if (!Ue(
      () => {
        var _, B;
        return ((B = (_ = C.current) == null ? void 0 : _.getValue) == null ? void 0 : B.call(_)) ?? w;
      },
      () => {
        var _, B;
        return (B = (_ = C.current) == null ? void 0 : _.isOtpComplete) == null ? void 0 : B.call(_);
      },
      E
    )) return;
    const $ = u ? "passwordlessLoginEmailOTPVerify" : "passwordlessLoginUsernameOTPVerify", Z = {
      ...u ? { email: u } : { username: m },
      otp: w,
      "h-captcha-response": N == null ? void 0 : N["h-captcha-response"],
      "tencent-captcha-response": N == null ? void 0 : N["tencent-captcha-response"],
      "g-recaptcha-response": N == null ? void 0 : N["g-recaptcha-response"]
    };
    try {
      p(!0);
      const _ = await d.controller[$](Z);
      if (_ != null && _.success)
        t == null || t(_);
      else {
        const B = (_ == null ? void 0 : _.error) || "Failed to verify passwordless login";
        x(B), e == null || e({
          error: B,
          errorCode: ((M = _ == null ? void 0 : _.data) == null ? void 0 : M.ErrorCode) || 0
        }), ((U = _ == null ? void 0 : _.data) == null ? void 0 : U.ErrorCode) === 1132 && (l == null || l(!0));
      }
    } catch (_) {
      x(_.message || "An error occurred during login"), e == null || e({
        error: _.message || "An error occurred during login",
        errorCode: _.errorCode || 0
      });
    } finally {
      p(!1);
    }
  }, I = () => {
    O(!0), d.controller.passwordlessLoginEmail(
      { email: u },
      (N) => {
        N != null && N.success ? A(D.otpResendSuccess) : (x((N == null ? void 0 : N.error) || D.otpResendError), e == null || e({
          error: (N == null ? void 0 : N.error) || D.otpResendError
        }));
      },
      (N) => {
        x(N.error || D.otpResendError), e == null || e(N);
      }
    ).finally(() => {
      O(!1);
    });
  };
  return /* @__PURE__ */ f("div", { className: `${r} loginradius-card-container`, style: a, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: h[Zt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: h[Zt].description }),
        /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            onClick: () => {
              n == null || n();
            },
            ButtonText: u || m
          }
        )
      ] })
    ] }),
    b && /* @__PURE__ */ i(pe, { setError: x, error: b }),
    L && /* @__PURE__ */ i(Te, { setSuccess: A, success: L }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      /* @__PURE__ */ i("div", { className: "loginradius-login-form", children: /* @__PURE__ */ i(
        Me,
        {
          ref: C,
          display: "Enter OTP",
          onComplete: (N) => R(N),
          onChange: (N) => R(N),
          error: P,
          autoFocus: !0
        }
      ) }),
      /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
        Xe,
        {
          ButtonId: H.verify,
          loading: g,
          type: "button",
          onClick: () => c({ otp: w }, y)
        }
      ) })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      h[Zt].footerText,
      v ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ i(Y, { ButtonId: H.resend, onClick: I, children: h[Zt].footerLinkText })
    ] })
  ] });
}, T7 = De(
  { action: "passwordlessOtp" },
  P7
), c6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => {
  const [a, r] = k("");
  return /* @__PURE__ */ f(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: "var(--sdk-card-bg-color)"
      },
      className: n,
      children: [
        /* @__PURE__ */ i(
          Ee,
          {
            type: "text",
            field: { name: "link", display: "Login Link", rules: "required|url" },
            value: a,
            onChange: (l) => r(l.target.value)
          }
        ),
        /* @__PURE__ */ i(
          te,
          {
            ButtonText: "Login",
            icon: "ArrowRightOnRectangleIcon",
            onClick: () => {
              if (!a) {
                e == null || e({ error: "Link is required" });
                return;
              }
              t == null || t({ link: a });
            }
          }
        )
      ]
    }
  );
}, d6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const r = () => {
    t == null || t();
  }, s = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { style: s, className: n, children: [
    /* @__PURE__ */ i(Q4, {}),
    /* @__PURE__ */ i(
      te,
      {
        ButtonText: "Login",
        icon: "ArrowRightOnRectangleIcon",
        onClick: r
      }
    )
  ] });
}, u6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => {
  const [a, r] = k(""), s = () => {
    if (!a) {
      e == null || e({ error: "Token is required" });
      return;
    }
    t == null || t({ token: a });
  }, l = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    ...n ? { className: n } : {}
  };
  return /* @__PURE__ */ f("div", { style: l, children: [
    /* @__PURE__ */ i(
      o7,
      {
        field: { name: "token", display: "Token", rules: "required" },
        value: a,
        onChange: (c) => r(c.target.value)
      }
    ),
    /* @__PURE__ */ i(
      te,
      {
        ButtonText: "Login",
        icon: "ArrowRightOnRectangleIcon",
        onClick: s
      }
    )
  ] });
}, h6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), [l, c] = k(""), d = () => {
    if (!r || r !== l) {
      e == null || e({ error: "PINs must match and be filled" });
      return;
    }
    t == null || t();
  }, h = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { style: h, className: n, children: [
    /* @__PURE__ */ i(
      Lo,
      {
        field: {
          name: "newPIN",
          display: "New PIN",
          rules: "required|length:4|numeric"
        },
        value: r,
        onChange: (u) => s(u.target.value)
      }
    ),
    /* @__PURE__ */ i(
      Ro,
      {
        field: {
          name: "confirmPIN",
          display: "Confirm PIN",
          rules: "required"
        },
        value: l,
        pinToMatch: r,
        onChange: (u) => c(u.target.value)
      }
    ),
    /* @__PURE__ */ i(ea, { onClick: d })
  ] });
}, m6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => {
  const [a, r] = k("");
  return /* @__PURE__ */ f("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)"
  }, className: n, children: [
    /* @__PURE__ */ i(
      Ye,
      {
        field: { name: "email", display: "Email", rules: "required|email" },
        value: a,
        onChange: (c) => r(c.target.value)
      }
    ),
    /* @__PURE__ */ i(Ve, { onClick: () => {
      if (!a) {
        e == null || e({ error: "Email is required" });
        return;
      }
      t == null || t({ email: a });
    } })
  ] });
}, En = "pin-authentication", I7 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), [l, c] = k(null), { lrInstance: d, content: h } = re(), [u, m] = k(!1), [g, p] = k(null), { pinAuthToken: b, setPinAuthToken: x, accessToken: P } = ce();
  X(() => {
    const w = d == null ? void 0 : d.getSchema("pinLoginFormSchema");
    w && c(w);
  }, [d]);
  const E = () => {
    if (!r) {
      e == null || e({ error: "PIN is required" });
      return;
    }
    b ? (m(!0), d.controller.setPinByPinAuth(
      { Pin: r },
      b,
      (w) => {
        var R;
        x((R = w.data) == null ? void 0 : R.Session_Token), w != null && w.success ? t == null || t(w) : (e == null || e({ error: "PIN authentication failed" }), p((w == null ? void 0 : w.error) || "PIN authentication failed"));
      },
      (w) => {
        console.error("Error fetching second factor config:", w), e == null || e(w), p(w.error);
      }
    ).finally(() => {
      m(!1);
    })) : P && (m(!0), d.controller.updateAccount(
      {
        PINInfo: {
          PIN: r,
          Skipped: null
        }
      },
      P,
      (w) => {
        w != null && w.success ? t == null || t(w) : (e == null || e({ error: "PIN authentication failed" }), p((w == null ? void 0 : w.error) || "PIN authentication failed"));
      },
      (w) => {
        console.error("Error fetching second factor config:", w), e == null || e(w), p(w.error);
      }
    ).finally(() => {
      m(!1);
    }));
  };
  return /* @__PURE__ */ f(
    "div",
    {
      style: { ...a },
      className: `${n} loginradius-card-container`,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: h[En].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: h[En].description })
          ] })
        ] }),
        g && /* @__PURE__ */ i(pe, { setError: p, error: g }),
        /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
          /* @__PURE__ */ i(
            aa,
            {
              field: l,
              value: r,
              onChange: (w) => s(w.target.value)
            }
          ),
          /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(Ve, { loading: u, onClick: E, children: h[En].buttonText }) })
        ] })
      ]
    }
  );
}, M7 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), [l, c] = k(null), { lrInstance: d } = re(), [h, u] = k(!1), { pinAuthToken: m, setPinAuthToken: g } = ce();
  X(() => {
    const b = d == null ? void 0 : d.getSchema("pinLoginFormSchema");
    b && c(b);
  }, [d]);
  const p = () => {
    if (!r) {
      e == null || e({ errorCode: 0, success: !1, error: "PIN is required" });
      return;
    }
    u(!0), d.controller.loginByPIN(
      { PIN: r },
      m,
      (b) => {
        b != null && b.success ? t == null || t(b) : (b.errorCode === 1245 && g(null), e == null || e({
          errorCode: b.errorCode || 0,
          success: b.success || !1,
          error: b.error || "An unknown error occurred"
        }));
      },
      (b) => {
        console.error("Error fetching second factor config:", b), e == null || e(b);
      }
    ).finally(() => {
      u(!1);
    });
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `loginradius-card-container ${n}`,
      style: { ...a },
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, {}),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: "Enter Your Pin" }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: "Please enter your PIN to proceed with the re-authentication process." })
          ] })
        ] }),
        /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
          /* @__PURE__ */ i(
            aa,
            {
              field: l,
              value: r,
              onChange: (b) => s(b.target.value)
            }
          ),
          /* @__PURE__ */ i(Ve, { loading: h, onClick: p, children: "Submit" })
        ] })
      ]
    }
  );
}, N7 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const r = () => {
    t == null || t();
  }, s = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    // Equivalent to space-y-4
    backgroundColor: "var(--sdk-card-bg-color)",
    // Updated CSS variable
    ...a
  };
  return /* @__PURE__ */ f("div", { className: n, style: s, children: [
    /* @__PURE__ */ i("p", { children: "Passkey prompt placeholder" }),
    /* @__PURE__ */ i(
      te,
      {
        ButtonText: "Login",
        icon: "ArrowRightOnRectangleIcon",
        onClick: r
      }
    )
  ] });
}, f6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const r = () => {
    t == null || t();
  }, s = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { style: s, className: n, children: [
    /* @__PURE__ */ i("p", { children: "New passkey setup placeholder" }),
    /* @__PURE__ */ i(vo, { onClick: r })
  ] });
}, p6 = ({
  onSuccess: t,
  onError: e,
  providers: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(null), c = () => {
    if (!s) {
      e == null || e({ error: "Please select a provider" });
      return;
    }
    t == null || t({ provider: s });
  }, d = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { style: d, className: a, children: [
    /* @__PURE__ */ i(
      Be,
      {
        field: {
          name: "provider",
          display: "SSO Provider",
          options: n
        },
        value: s,
        onChange: (h) => l(h.target.value)
      }
    ),
    /* @__PURE__ */ i(
      te,
      {
        ButtonText: "Login",
        icon: "ArrowRightOnRectangleIcon",
        onClick: c
      }
    )
  ] });
}, g6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => /* @__PURE__ */ f("div", { style: { marginBottom: "16px" }, className: n, children: [
  /* @__PURE__ */ i("p", { children: "QR Code Display Placeholder" }),
  /* @__PURE__ */ i(D4, { onClick: () => {
    t == null || t();
  } })
] }), w6 = ({
  onSuccess: t,
  onError: e,
  isLoggedIn: n,
  className: a = "",
  style: r
}) => {
  const s = () => {
    if (!n) {
      e == null || e({ error: "Not logged in" });
      return;
    }
    t == null || t();
  }, l = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { style: l, className: a, children: [
    /* @__PURE__ */ i("p", { children: n ? "Logged in with SSO" : "Not logged in" }),
    /* @__PURE__ */ i(V4, { onClick: s })
  ] });
}, v6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  var O;
  const [r, s] = k(""), [l, c] = k(""), [d, h] = k(!1), [u, m] = k(null), { lrInstance: g } = It(), {
    values: p,
    errors: b,
    touched: x,
    handleChange: P,
    handleSubmit: E,
    handleComponentChange: w
  } = Ke((u == null ? void 0 : u.Inputs) || []);
  X(() => {
    (async () => {
      h(!0);
      try {
        const A = await g.getSchema(
          "changePassword"
        );
        m(A);
      } catch (A) {
        const C = (A == null ? void 0 : A.message) || "Failed to load schema";
        c(C), e == null || e(C), m(null);
      } finally {
        h(!1);
      }
    })();
  }, [g]);
  const R = async (L) => {
  }, v = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ i("div", { className: n, style: v, children: /* @__PURE__ */ f(
    "form",
    {
      onSubmit: E(R),
      className: "loginradius-form-container",
      children: [
        /* @__PURE__ */ i("div", { className: "loginradius-login-form", children: /* @__PURE__ */ i("div", { className: "loginradius-form-group", children: u && ((O = u == null ? void 0 : u.Inputs) != null && O.length) ? u.Inputs.filter((L) => L.name !== "stayLogin").map(
          (L) => /* @__PURE__ */ i(
            $e,
            {
              field: L,
              fieldId: H.changepassword,
              value: p[L.name],
              error: b[L.name],
              touched: x[L.name],
              onChange: P,
              handleComponentChange: w
            },
            L.name
          )
        ) : /* @__PURE__ */ i("p", { children: "No input fields available." }) }) }),
        /* @__PURE__ */ i(yo, {})
      ]
    }
  ) });
}, y6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), [l, c] = k(""), [d, h] = k(""), u = () => {
    if (!r || !l || l !== d) {
      e == null || e({ error: "All fields required and PINs must match" });
      return;
    }
    t == null || t();
  }, m = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { className: n, style: m, children: [
    /* @__PURE__ */ i(
      aa,
      {
        field: {
          name: "currentPIN",
          display: "Current PIN",
          rules: "required|length:4|numeric"
        },
        value: r,
        onChange: (g) => s(g.target.value)
      }
    ),
    /* @__PURE__ */ i(
      Lo,
      {
        field: {
          name: "newPIN",
          display: "New PIN",
          rules: "required|length:4|numeric"
        },
        value: l,
        onChange: (g) => c(g.target.value)
      }
    ),
    /* @__PURE__ */ i(
      Ro,
      {
        field: {
          name: "confirmPIN",
          display: "Confirm PIN",
          rules: "required"
        },
        value: d,
        pinToMatch: l,
        onChange: (g) => h(g.target.value)
      }
    ),
    /* @__PURE__ */ i(yo, { onClick: u })
  ] });
}, k6 = ({
  onSuccess: t,
  onError: e,
  methods: n,
  className: a = ""
}) => {
  const [r, s] = k(null), [l, c] = k("");
  return /* @__PURE__ */ f("div", { className: a, style: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)"
  }, children: [
    /* @__PURE__ */ i(
      Be,
      {
        field: { name: "method", display: "2FA Method", options: n },
        value: r,
        onChange: (u) => s(u.target.value)
      }
    ),
    /* @__PURE__ */ i(
      c7,
      {
        field: {
          name: "code",
          display: "Code",
          rules: "required|length:6|numeric"
        },
        value: l,
        onChange: c
      }
    ),
    /* @__PURE__ */ i(U4, { onClick: () => {
      if (!r || !l) {
        e == null || e({ error: "Method and code are required" });
        return;
      }
      t == null || t({ method: r, code: l });
    } })
  ] });
}, C6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => /* @__PURE__ */ f(
  "div",
  {
    className: n,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    },
    children: [
      /* @__PURE__ */ i(H4, { onClick: () => {
        const r = ["123456", "789012"];
        t == null || t({ codes: r });
      } }),
      /* @__PURE__ */ i(
        "div",
        {
          style: {
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          },
          children: "Code Display Placeholder"
        }
      )
    ]
  }
), b6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const r = () => {
    const c = ["654321", "210987"];
    t == null || t({ codes: c });
  }, s = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { style: s, className: n, children: [
    /* @__PURE__ */ i(Z4, { onClick: r }),
    /* @__PURE__ */ i("div", { style: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px"
    }, children: "Code Display Placeholder" })
  ] });
}, x6 = ({
  onSuccess: t,
  onError: e,
  questions: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(null), [c, d] = k(""), h = () => {
    if (!s || !c) {
      e == null || e({ error: "Question and answer are required" });
      return;
    }
    t == null || t({ question: s, answer: c });
  }, u = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { className: a, style: u, children: [
    /* @__PURE__ */ i(
      Be,
      {
        field: {
          name: "question",
          display: "Security Question",
          options: n
        },
        value: s,
        onChange: (m) => l(m.target.value)
      }
    ),
    /* @__PURE__ */ i(
      oa,
      {
        field: { name: "answer", display: "Answer", rules: "required" },
        value: c,
        onChange: (m) => d(m.target.value)
      }
    ),
    /* @__PURE__ */ i(ta, { onClick: h })
  ] });
}, L6 = ({
  onSuccess: t,
  onError: e,
  question: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(""), c = () => {
    if (!s) {
      e == null || e({ error: "Answer is required" });
      return;
    }
    t == null || t({ answer: s });
  }, d = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { style: d, className: a, children: [
    /* @__PURE__ */ i("div", { style: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px"
    }, children: n }),
    /* @__PURE__ */ i(
      oa,
      {
        field: { name: "answer", display: "Answer", rules: "required" },
        value: s,
        onChange: (u) => l(u.target.value)
      }
    ),
    /* @__PURE__ */ i(ea, { onClick: c })
  ] });
}, R6 = ({
  onSuccess: t,
  onError: e,
  question: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(""), c = () => {
    if (!s) {
      e == null || e({ error: "Answer is required" });
      return;
    }
    t == null || t({ answer: s });
  }, d = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { style: d, className: a, children: [
    /* @__PURE__ */ i("div", { style: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px"
    }, children: n }),
    /* @__PURE__ */ i(
      oa,
      {
        field: { name: "answer", display: "Answer", rules: "required" },
        value: s,
        onChange: (u) => l(u.target.value)
      }
    ),
    /* @__PURE__ */ i(ea, { onClick: c })
  ] });
}, A6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), [l, c] = k(null), d = () => {
    if (!r) {
      e == null || e({ error: "Full name is required" });
      return;
    }
    t == null || t({ fullName: r, avatar: l || void 0 });
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: n,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: "var(--sdk-card-bg-color)",
        ...a
      },
      children: [
        /* @__PURE__ */ i(
          Eo,
          {
            field: { name: "fullName", display: "Full Name", rules: "required" },
            value: r,
            onChange: (h) => s(h.target.value)
          }
        ),
        /* @__PURE__ */ i(
          "input",
          {
            type: "file",
            onChange: (h) => {
              var u;
              return c(((u = h.target.files) == null ? void 0 : u[0]) || null);
            },
            style: {
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "8px"
            }
          }
        ),
        /* @__PURE__ */ i(wn, { onClick: d })
      ]
    }
  );
}, E6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(""), l = () => {
    if (!r) {
      e == null || e({ error: "Username is required" });
      return;
    }
    t == null || t({ username: r });
  }, c = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...a
  };
  return /* @__PURE__ */ f("div", { className: n, style: c, children: [
    /* @__PURE__ */ i(
      d7,
      {
        field: {
          name: "username",
          display: "New Username",
          rules: "required|min:3"
        },
        value: r,
        onChange: (d) => s(d.target.value)
      }
    ),
    /* @__PURE__ */ i(wn, { onClick: l })
  ] });
}, Ct = "updatephone", O7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(""), { lrInstance: c, content: d, secondFactorConfig: h, setSecondFactorConfig: u } = re(), [m, g] = k(null), { MFAToken: p, accessToken: b } = ce(), [x, P] = k(!1), E = async () => {
    if (!s) {
      e == null || e({ error: "Phone number is required" });
      return;
    }
    u((w) => ({
      ...w,
      OTPPhoneNo: s
    })), P(!0), h && p ? await c.controller.updatePhone(
      { phoneNo2FA: s },
      p,
      !1,
      (w) => {
        P(!1), w.success ? t == null || t(w) : (e == null || e({ error: w.error || "Phone update failed" }), g(w.error));
      },
      (w) => {
        P(!1), e == null || e(w);
      }
    ) : b ? await c.controller.updateAccountPhone(
      { phoneno2fa: s },
      b,
      !1,
      (w) => {
        P(!1), w.success ? t == null || t(w) : e == null || e({ error: w.error || "Phone update failed" });
      },
      (w) => {
        P(!1), e == null || e(w);
      }
    ) : (P(!1), e == null || e({ error: "No valid token available" }));
  };
  return /* @__PURE__ */ f("div", { className: `${a} loginradius-card-container `, style: r, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(
        de,
        {
          style: { objectFit: "contain" }
        }
      ),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d[Ct].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d[Ct].description })
      ] })
    ] }),
    m && /* @__PURE__ */ i(pe, { setError: g, error: m }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      /* @__PURE__ */ i("div", { className: "loginradius-login-form", children: /* @__PURE__ */ i(
        ot,
        {
          field: {
            type: "tel",
            name: "phone",
            display: "Phone",
            rules: "required|phone"
          },
          value: s,
          onChange: (w) => l(w.target.value)
        }
      ) }),
      /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
        ta,
        {
          ButtonId: H.updatephone,
          type: "submit",
          ButtonText: d[Ct].buttonText,
          loading: x,
          onClick: E
        }
      ) })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      d[Ct].footerText,
      /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.back,
          onClick: n,
          ButtonText: d[Ct].footerLinkText
        }
      )
    ] })
  ] });
}, P6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => {
  const [a, r] = k(""), s = () => {
    if (!a) {
      e == null || e({ error: "Email is required" });
      return;
    }
    t == null || t({ email: a });
  }, l = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    ...n ? { className: n } : {}
  };
  return /* @__PURE__ */ f("div", { style: l, children: [
    /* @__PURE__ */ i(
      u7,
      {
        field: { name: "email", display: "New Email", rules: "required|email" },
        value: a,
        onChange: (c) => r(c.target.value)
      }
    ),
    /* @__PURE__ */ i(W4, { onClick: s })
  ] });
}, T6 = ({
  onSuccess: t,
  onError: e,
  emails: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(null), c = () => {
    if (!s) {
      e == null || e({ error: "Please select an email" });
      return;
    }
    t == null || t({ email: s });
  }, d = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { style: d, className: a, children: [
    /* @__PURE__ */ i(
      Be,
      {
        field: { name: "email", display: "Email", options: n },
        value: s,
        onChange: (h) => l(h.target.value)
      }
    ),
    /* @__PURE__ */ i(q4, { onClick: c })
  ] });
}, I6 = ({
  onSuccess: t,
  onError: e,
  providers: n,
  className: a = ""
}) => {
  const [r, s] = k(null);
  return /* @__PURE__ */ f(
    "div",
    {
      style: { display: "flex", flexDirection: "column", gap: "1rem" },
      className: a,
      children: [
        /* @__PURE__ */ i(
          Be,
          {
            field: { name: "provider", display: "Provider", options: n },
            value: r,
            onChange: (c) => s(c.target.value)
          }
        ),
        /* @__PURE__ */ i(Y, { onClick: () => {
          if (!r) {
            e == null || e({ error: "Please select a provider" });
            return;
          }
          t == null || t({ provider: r });
        } })
      ]
    }
  );
}, M6 = ({
  onSuccess: t,
  onError: e,
  accounts: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(null), c = () => {
    if (!s) {
      e == null || e({ error: "Please select an account" });
      return;
    }
    t == null || t({ account: s });
  }, d = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { className: a, style: d, children: [
    /* @__PURE__ */ i(
      Be,
      {
        field: {
          name: "account",
          display: "Linked Account",
          options: n
        },
        value: s,
        onChange: (h) => l(h.target.value)
      }
    ),
    /* @__PURE__ */ i(ko, { onClick: c })
  ] });
}, N6 = ({
  onSuccess: t,
  onError: e,
  email: n,
  className: a = "",
  style: r
}) => {
  const s = (d) => {
    t == null || t(d);
  }, l = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { style: l, className: a, children: [
    /* @__PURE__ */ i("div", { style: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px"
    }, children: n }),
    /* @__PURE__ */ i(na, { onClick: () => s(n) })
  ] });
}, O6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => {
  const [a, r] = k(!1);
  return /* @__PURE__ */ f(
    "div",
    {
      style: { display: "flex", flexDirection: "column", gap: "1rem" },
      className: n,
      children: [
        /* @__PURE__ */ i(
          Mt,
          {
            field: {
              name: "confirm",
              display: "I confirm I want to delete my account"
            },
            onChange: (l) => r(l.target.checked),
            value: !1
          }
        ),
        /* @__PURE__ */ i(K4, { onClick: () => {
          if (!a) {
            e == null || e({ error: "Please confirm deletion" });
            return;
          }
          t == null || t();
        } })
      ]
    }
  );
}, B6 = ({
  onSuccess: t,
  onError: e,
  className: n = ""
}) => {
  const [a, r] = k(""), [s, l] = k(null), c = Ce(null);
  return /* @__PURE__ */ f("div", { className: n, style: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)"
  }, children: [
    /* @__PURE__ */ i(
      Me,
      {
        ref: c,
        display: "Confirmation Code",
        onComplete: (u) => r(u),
        onChange: (u) => r(u),
        error: s,
        autoFocus: !0
      }
    ),
    /* @__PURE__ */ i(vo, { onClick: () => {
      Ue(
        () => {
          var m, g;
          return ((g = (m = c.current) == null ? void 0 : m.getValue) == null ? void 0 : g.call(m)) ?? a;
        },
        () => {
          var m, g;
          return (g = (m = c.current) == null ? void 0 : m.isOtpComplete) == null ? void 0 : g.call(m);
        },
        (m) => l(m)
      ) && (t == null || t({ code: a }));
    } })
  ] });
}, F6 = ({
  onSuccess: t,
  onError: e,
  initialConsents: n = {},
  events: a = ["Email Notifications", "Analytics", "Marketing"],
  className: r = "",
  style: s
}) => {
  const [l, c] = k(n), d = (u, m) => {
    c((g) => ({ ...g, [u]: m }));
  }, h = () => {
    if (Object.keys(l).length === 0) {
      e == null || e({ error: "No consents provided" });
      return;
    }
    t == null || t(l);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: r,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: "var(--sdk-card-bg-color)",
        ...s
      },
      children: [
        /* @__PURE__ */ i(p7, {}),
        /* @__PURE__ */ i(
          g7,
          {
            field: {
              name: "event",
              display: "Select Event",
              options: a.map((u) => ({ value: u }))
            },
            value: null,
            onChange: (u) => d(u.target.value, !0)
          }
        ),
        a.map((u) => /* @__PURE__ */ i(
          Yn,
          {
            field: {
              name: u,
              display: u,
              description: `Toggle consent for ${u}`,
              rules: "optional"
            },
            onChange: (m) => d(u, m.target.checked),
            fieldId: H.consenteditor,
            value: !1
          },
          u
        )),
        /* @__PURE__ */ i(wn, { onClick: h })
      ]
    }
  );
}, Pn = "consent-form", B7 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(null), { consentToken: l } = ce(), { lrInstance: c, content: d } = re(), [h, u] = k(!1), [m, g] = k({}), [p, b] = k(null);
  X(() => {
    (async () => {
      const w = (await c.getConsentOptions()).find(
        (R) => R.Events.find((v) => v.Name === "Login")
      );
      s(w);
    })();
  }, [c]);
  const x = () => {
    u(!0);
    const P = r.Events.filter((w) => w.Name === "Login"), E = {
      Data: Object.entries(m).map(([w, R]) => ({
        ConsentOptionId: w,
        IsAccepted: R
      })),
      Events: P.map((w) => ({
        Event: w.Name,
        IsCustom: w.IsCustom
      }))
    };
    c.controller.updateConsent(
      E,
      l,
      (w) => {
        w != null && w.success ? t == null || t(w) : (b((w == null ? void 0 : w.error) || "Failed to update consents"), e == null || e({
          error: (w == null ? void 0 : w.error) || "Failed to update consents"
        })), u(!1);
      },
      (w) => {
        b((w == null ? void 0 : w.error) || "Failed to update consents"), e == null || e(w), u(!1);
      }
    );
  };
  return /* @__PURE__ */ f("div", { className: `loginradius-card-container ${n}`, style: a, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d[Pn].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d[Pn].description })
      ] })
    ] }),
    p && /* @__PURE__ */ i(pe, { setError: b, error: p }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      r && /* @__PURE__ */ i(
        w7,
        {
          consents: r,
          onConsentChange: (P, E) => g((w) => ({ ...w, [P]: E }))
        }
      ),
      /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
        Ve,
        {
          loading: h,
          ButtonText: d[Pn].buttonText,
          onClick: x
        }
      ) })
    ] })
  ] });
}, S6 = ({
  onSuccess: t,
  onError: e,
  initialDomain: n = "",
  initialEmail: a = "",
  initialPassword: r = "",
  className: s = "",
  style: l
}) => {
  const [c, d] = k(n), [h, u] = k(a), [m, g] = k(r), p = () => {
    if (!c || !h || !m) {
      e == null || e({ error: "All fields are required" });
      return;
    }
    t == null || t({ domain: c, email: h, password: m });
  };
  return /* @__PURE__ */ f(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: "var(--sdk-card-bg-color)",
        ...l
      },
      className: s,
      children: [
        /* @__PURE__ */ i(
          Po,
          {
            field: { name: "domain", display: "Company Domain", rules: "required" },
            value: c,
            onChange: (b) => d(b.target.value)
          }
        ),
        /* @__PURE__ */ i(
          Ye,
          {
            field: { name: "email", display: "Email", rules: "required|email" },
            value: h,
            onChange: (b) => u(b.target.value)
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            field: {
              name: "password",
              display: "Password",
              rules: "required|min:8"
            },
            value: m,
            onChange: (b) => g(b.target.value)
          }
        ),
        /* @__PURE__ */ i(xo, { onClick: p }),
        /* @__PURE__ */ i(z4, { onClick: () => {
        } })
      ]
    }
  );
}, j6 = ({
  onSuccess: t,
  onError: e,
  providers: n = ["Google", "Microsoft", "Okta"],
  className: a = "",
  style: r
}) => {
  const [s, l] = k(null), c = () => {
    if (!s) {
      e == null || e({ error: "Please select an SSO provider" });
      return;
    }
    t == null || t(s);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: a,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "var(--sdk-card-bg-color)",
        ...r
      },
      children: [
        /* @__PURE__ */ i(
          r7,
          {
            field: {
              name: "provider",
              display: "SSO Provider",
              options: n.map((d) => ({ value: d }))
            },
            value: s,
            onChange: (d) => l(d.target.value)
          }
        ),
        /* @__PURE__ */ i(xo, { onClick: c })
      ]
    }
  );
}, Wt = "magic-link-login", F7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  style: r,
  captchaComponent: s,
  handleCaptcha: l
}) => {
  const [c, d] = k(!1), { lrInstance: h, content: u } = re(), [m, g] = k(null), [p, b] = k(null), { email: x, username: P } = ce(), E = ne(
    async (w = {}) => {
      d(!0);
      const R = x ? { email: x } : { username: P }, v = At(w);
      h.controller.sendResetPasswordEmail(
        {
          ...R,
          ...v
        },
        (O) => {
          if (d(!1), O != null && O.success)
            b(D.magicLinkSuccess);
          else {
            const L = (O == null ? void 0 : O.error) || D.magicLinkError;
            g(L), e && e({ error: L });
          }
        },
        (O) => {
          d(!1);
          const L = (O == null ? void 0 : O.error) || D.magicLinkError;
          g(L), e && e({ error: L });
        }
      );
    },
    [
      x,
      P,
      h,
      d,
      b,
      g,
      e,
      D,
      At
    ]
  );
  return /* @__PURE__ */ f(
    "div",
    {
      style: { ...r },
      className: `${a} loginradius-card-container `,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: u[Wt].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: u[Wt].description }),
            /* @__PURE__ */ i(
              Y,
              {
                ButtonText: x || P,
                ButtonId: H.back,
                style: {
                  display: "block",
                  width: "100%",
                  textAlign: "center"
                },
                onClick: n
              }
            )
          ] })
        ] }),
        m && /* @__PURE__ */ i(pe, { setError: g, error: m }),
        p && /* @__PURE__ */ i(Te, { setSuccess: b, success: p }),
        /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
          s,
          /* @__PURE__ */ i(
            na,
            {
              loading: c,
              ButtonText: u[Wt].resendButtonText,
              onClick: () => l({}, E)
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: u[Wt].footerText })
      ]
    }
  );
}, S7 = De({ action: "forgotpassword" }, F7), Ge = H.smsOtp, j7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  onSecondaryAction: a,
  className: r = "",
  style: s,
  captchaComponent: l,
  onCaptchaRequired: c,
  handleCaptcha: d
}) => {
  const [h, u] = k(null), { lrInstance: m, secondFactorConfig: g, content: p, options: b } = re(), { MFAToken: x, accessToken: P, phone: E } = ce(), [w, R] = k(!1), [v, O] = k(!1), [L, A] = k(null), [C, y] = k(null), [I, N] = k(null), W = Ce(null), $ = [
    g == null ? void 0 : g.IsEmailOtpAuthenticatorVerified,
    g == null ? void 0 : g.IsOTPAuthenticatorVerified,
    g == null ? void 0 : g.IsGoogleAuthenticatorVerified,
    g == null ? void 0 : g.IsPushDeviceRegistered,
    g == null ? void 0 : g.IsDuoAuthenticatorVerified
  ].filter(Boolean), Z = async (U = {}) => {
    if (Ue(
      () => {
        var B, z;
        return ((z = (B = W.current) == null ? void 0 : B.getValue) == null ? void 0 : z.call(B)) ?? h;
      },
      () => {
        var B, z;
        return (z = (B = W.current) == null ? void 0 : B.isOtpComplete) == null ? void 0 : z.call(B);
      },
      (B) => A(B)
    )) {
      R(!0);
      try {
        g && g.SecondFactorAuthenticationToken ? await m.controller.mfaSMSOTPVerify(
          {
            otp: h,
            "h-captcha-response": U == null ? void 0 : U["h-captcha-response"],
            "tencent-captcha-response": U == null ? void 0 : U["tencent-captcha-response"],
            "g-recaptcha-response": U == null ? void 0 : U["g-recaptcha-response"]
          },
          x,
          (B) => {
            R(!1), B.success ? t == null || t(B) : (y((B == null ? void 0 : B.error) || D.otpVerificationError), e == null || e({
              error: (B == null ? void 0 : B.error) || D.otpVerificationError,
              ...B
            }));
          },
          (B) => {
            R(!1), (B == null ? void 0 : B.errorCode) === 1132 && (c == null || c(!0)), y(B.error || D.otpVerificationError), e == null || e(B);
          }
        ) : P ? await m.controller.accountSMSOTPVerify(
          {
            otp: h,
            "h-captcha-response": U == null ? void 0 : U["h-captcha-response"],
            "tencent-captcha-response": U == null ? void 0 : U["tencent-captcha-response"],
            "g-recaptcha-response": U == null ? void 0 : U["g-recaptcha-response"]
          },
          P,
          (B) => {
            R(!1), B.success ? t == null || t(B) : (y(B.error || D.otpVerificationError), e == null || e({
              error: B.error || D.otpVerificationError
            }));
          },
          (B) => {
            R(!1), (B == null ? void 0 : B.errorCode) === 1132 && (c == null || c(!0)), y(B.error || D.otpVerificationError), e == null || e(B);
          }
        ) : (R(!1), y(D.otpVerificationError), e == null || e({ error: "No valid token available" }));
      } catch (B) {
        R(!1);
        const z = (B == null ? void 0 : B.message) || D.otpVerificationError;
        y(z), e == null || e({ error: z });
      } finally {
        A(null);
      }
    }
  }, M = async (U, _) => {
    O(!0);
    try {
      $.length === 0 ? g && x ? await m.controller.updatePhone(
        { phoneNo2FA: E ?? (g == null ? void 0 : g.OTPPhoneNo) },
        x,
        U,
        (B) => {
          B.success ? (t == null || t(B), _ && N(D.otpResendSuccess)) : (y(B.error ?? D.phoneUpdateError), e == null || e({
            error: B.error ?? D.phoneUpdateError
          }));
        },
        (B) => {
          y(B.error ?? D.phoneUpdateError), e == null || e(B);
        }
      ) : P && await m.controller.updateAccountPhone(
        { phoneno2fa: E ?? (g == null ? void 0 : g.OTPPhoneNo) },
        P,
        U,
        (B) => {
          B.success ? (t == null || t(B), N(D.otpResendSuccess)) : (y(B.error ?? D.phoneUpdateError), e == null || e({
            error: B.error ?? D.phoneUpdateError
          }));
        },
        (B) => {
          y(B.error ?? D.phoneUpdateError), e == null || e(B);
        }
      ) : await m.controller.resendSMSOTP(
        x,
        U,
        (B) => {
          B != null && B.success ? N(D.otpResendSuccess) : (y((B == null ? void 0 : B.error) ?? D.otpResendError), e == null || e({
            error: (B == null ? void 0 : B.error) ?? D.otpResendError
          }));
        },
        (B) => {
          y(B.error ?? D.otpResendError), e == null || e(B);
        }
      );
    } catch (B) {
      y(B.error ?? D.otpResendUnexpectedError), e == null || e({ error: D.otpResendUnexpectedError });
    } finally {
      O(!1);
    }
  };
  return /* @__PURE__ */ f("div", { className: `loginradius-card-container ${r}`, style: s, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: p[Ge].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: p[Ge].description }),
        /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            style: { display: "block", margin: "0 auto" },
            onClick: () => {
              n == null || n({ nextId: "login" });
            },
            ButtonText: E ?? (g == null ? void 0 : g.OTPPhoneNo)
          }
        )
      ] })
    ] }),
    C && /* @__PURE__ */ i(pe, { setError: y, error: C }),
    I && /* @__PURE__ */ i(Te, { setSuccess: N, success: I }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
        /* @__PURE__ */ i(
          Me,
          {
            ref: W,
            display: "Enter OTP",
            onComplete: (U) => u(U),
            onChange: (U) => u(U),
            error: L,
            autoFocus: !0
          }
        ),
        l
      ] }),
      /* @__PURE__ */ f("div", { className: "loginradius-button-container", children: [
        /* @__PURE__ */ i(
          Xe,
          {
            ButtonId: H.verify,
            type: "submit",
            ButtonText: p[Ge].buttonText,
            loading: w,
            onClick: () => d({}, Z)
          }
        ),
        $.length === 0 && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            ButtonText: p[Ge].backButtonText,
            onClick: n,
            style: { marginTop: "10px", width: "100%" }
          }
        ),
        $.length > 0 && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            ButtonText: p[Ge].forgotButtonText,
            onClick: a,
            style: { marginTop: "10px", width: "100%" }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      p[Ge].footerText,
      v ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ f("div", { className: "flex align-center flex-gap-8", children: [
        p[Ge].footerLinkText,
        /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.resendotp,
            onClick: () => M(!1, !0),
            children: p[Ge].footerLinkPrimaryText
          }
        ),
        (b == null ? void 0 : b.isVoiceOtp) && "or",
        (b == null ? void 0 : b.isVoiceOtp) && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.resendvoiceotp,
            onClick: () => M(!0, !0),
            children: p[Ge].footerLinkSecondaryText
          }
        )
      ] })
    ] })
  ] });
}, $7 = De({ action: "Otplogin" }, j7), ut = "email-otp", _7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  onSecondaryAction: a,
  initialPhone: r = "",
  className: s = "",
  style: l,
  captchaComponent: c,
  onCaptchaRequired: d,
  handleCaptcha: h
}) => {
  const [u, m] = k(null), [g, p] = k(null), [b, x] = k(null), [P, E] = k(null), { lrInstance: w, secondFactorConfig: R, content: v } = re(), [O, L] = k(!1), [A, C] = k(!1), { MFAToken: y, accessToken: I, email: N } = ce(), W = Ce(null), $ = [
    R == null ? void 0 : R.IsEmailOtpAuthenticatorVerified,
    R == null ? void 0 : R.IsOTPAuthenticatorVerified,
    R == null ? void 0 : R.IsGoogleAuthenticatorVerified,
    R == null ? void 0 : R.IsPushDeviceRegistered,
    R == null ? void 0 : R.IsDuoAuthenticatorVerified
  ].filter(Boolean), Z = async (M = {}) => {
    Ue(
      () => {
        var _, B;
        return ((B = (_ = W.current) == null ? void 0 : _.getValue) == null ? void 0 : B.call(_)) ?? u;
      },
      () => {
        var _, B;
        return (B = (_ = W.current) == null ? void 0 : _.isOtpComplete) == null ? void 0 : B.call(_);
      },
      (_) => x(_)
    ) && (L(!0), R ? w.controller.mfaEmailOTPVerify(
      {
        emailid: N,
        Otp: u,
        "h-captcha-response": M == null ? void 0 : M["h-captcha-response"],
        "tencent-captcha-response": M == null ? void 0 : M["tencent-captcha-response"],
        "g-recaptcha-response": M == null ? void 0 : M["g-recaptcha-response"]
      },
      y,
      (_) => {
        L(!1), _ != null && _.success ? (t == null || t(_), E(D.otpVerificationSuccess)) : (p((_ == null ? void 0 : _.error) || D.emailVerificationError), e == null || e({
          error: (_ == null ? void 0 : _.error) || D.emailVerificationError
        }));
      },
      (_) => {
        L(!1), (_ == null ? void 0 : _.errorCode) === 1132 && (d == null || d(!0)), p(_.error || D.emailVerificationError), e == null || e(_);
      }
    ) : w.controller.accountEmailOTPVerify(
      {
        EmailId: N,
        Otp: u,
        "h-captcha-response": M == null ? void 0 : M["h-captcha-response"],
        "tencent-captcha-response": M == null ? void 0 : M["tencent-captcha-response"],
        "g-recaptcha-response": M == null ? void 0 : M["g-recaptcha-response"]
      },
      I,
      (_) => {
        L(!1), _ != null && _.success ? t == null || t(_) : (p((_ == null ? void 0 : _.error) || D.emailVerificationError), e == null || e({
          error: (_ == null ? void 0 : _.error) || D.emailVerificationError
        }));
      },
      (_) => {
        L(!1), (_ == null ? void 0 : _.errorCode) === 1132 && (d == null || d(!0)), p(_.error || D.emailVerificationError), e == null || e(_);
      }
    ));
  };
  return /* @__PURE__ */ f("div", { className: `${s} loginradius-card-container `, style: l, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: v[ut].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: v[ut].description }),
        /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            onClick: () => {
              n == null || n({ nextId: "login" });
            },
            ButtonText: N
          }
        )
      ] })
    ] }),
    g && /* @__PURE__ */ i(pe, { setError: p, error: g }),
    P && /* @__PURE__ */ i(Te, { setSuccess: E, success: P }),
    /* @__PURE__ */ i("div", { className: "loginradius-form-container", children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
      /* @__PURE__ */ i(
        Me,
        {
          ref: W,
          display: "Enter OTP",
          onComplete: (M) => m(M),
          onChange: (M) => m(M),
          error: b,
          autoFocus: !0
        }
      ),
      c,
      /* @__PURE__ */ f("div", { className: "loginradius-button-container", children: [
        /* @__PURE__ */ i(
          Xe,
          {
            loading: O,
            onClick: () => h({}, Z),
            type: "submit",
            ButtonId: H.verify
          }
        ),
        $.length === 0 && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.back,
            ButtonText: v[ut].backButtonText,
            onClick: n,
            style: { marginTop: "10px", width: "100%" }
          }
        ),
        $.length > 0 && /* @__PURE__ */ i(
          Y,
          {
            ButtonId: H.backupcode,
            ButtonText: v[ut].forgotButtonText,
            onClick: a,
            style: { marginTop: "10px", width: "100%" }
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      v[ut].footerText,
      A ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.resendemailotp,
          onClick: () => {
            R && y ? (C(!0), w.controller.mfaEmailOTP(
              {
                emailid: R == null ? void 0 : R.Email[0]
              },
              y,
              (M) => {
                C(!1), M != null && M.success ? E(D.otpResendSuccess) : (p(
                  (M == null ? void 0 : M.error) || D.otpResendError
                ), e == null || e({
                  error: (M == null ? void 0 : M.error) || D.otpResendError
                }));
              },
              (M) => {
                C(!1), p(M.error || "Resend failed"), e == null || e(M);
              }
            )) : (C(!0), w.controller.accountEmailOTP(
              {
                emailid: N
              },
              I,
              (M) => {
                C(!1), M != null && M.success ? E(D.otpResendSuccess) : (p(
                  (M == null ? void 0 : M.error) || D.otpResendError
                ), e == null || e({
                  error: (M == null ? void 0 : M.error) || D.otpResendError
                }));
              },
              (M) => {
                C(!1), p(M.error || D.otpResendError), e == null || e(M);
              }
            ));
          },
          children: v[ut].footerLinkText
        }
      )
    ] })
  ] });
}, V7 = De({ action: "emailOtp" }, _7), D7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  onSecondaryAction: a,
  QRCode: r,
  className: s = "",
  style: l,
  captchaComponent: c,
  onCaptchaRequired: d,
  handleCaptcha: h
}) => {
  const { lrInstance: u, secondFactorConfig: m, content: g } = re(), { MFAToken: p, accessToken: b } = ce(), [x, P] = k(""), [E, w] = k(!1), [R, v] = k(null), [O, L] = k(null), [A, C] = k(r || ""), y = Ce(null), I = be(
    () => [
      m == null ? void 0 : m.IsEmailOtpAuthenticatorVerified,
      m == null ? void 0 : m.IsOTPAuthenticatorVerified,
      m == null ? void 0 : m.IsGoogleAuthenticatorVerified,
      m == null ? void 0 : m.IsPushDeviceRegistered,
      m == null ? void 0 : m.IsDuoAuthenticatorVerified
    ].filter(Boolean),
    [m]
  ), N = be(
    () => !m || !m.IsGoogleAuthenticatorVerified || !m.IsAuthenticatorVerified,
    [m]
  ), W = be(() => N ? H.authenticatorSetup : H.authenticatorlogin, [N]), $ = ne(async () => {
    var M;
    if (!m && b)
      try {
        const U = await u.controller.getSecondFactorConfig(
          b,
          !0
        );
        U != null && U.success && C(((M = U == null ? void 0 : U.data) == null ? void 0 : M.QRCode) || r || "");
      } catch (U) {
        console.error("Error fetching second factor config:", U);
      }
  }, [u, m, b, r]);
  X(() => {
    $();
  }, [$]);
  const Z = ne(
    async (M = {}) => {
      var _;
      if (v(null), !!Ue(
        () => {
          var B, z;
          return ((z = (B = y.current) == null ? void 0 : B.getValue) == null ? void 0 : z.call(B)) ?? x;
        },
        () => {
          var B, z;
          return (z = (B = y.current) == null ? void 0 : B.isOtpComplete) == null ? void 0 : z.call(B);
        },
        (B) => L(B)
      )) {
        w(!0);
        try {
          const B = {
            authenticatorcode: x,
            "h-captcha-response": M == null ? void 0 : M["h-captcha-response"],
            "tencent-captcha-response": M == null ? void 0 : M["tencent-captcha-response"],
            "g-recaptcha-response": M == null ? void 0 : M["g-recaptcha-response"]
          };
          let z;
          if (m)
            try {
              z = await u.controller.mfaAuthenticatorCodeVerify(
                B,
                p
              );
            } catch (j) {
              throw console.error(
                "==>Error during MFA authenticator code verification:",
                j
              ), v(j), j;
            }
          else
            try {
              z = await u.controller.accountAuthenticatorCodeVerify(
                B,
                b
              );
            } catch (j) {
              throw v(j), j;
            }
          if (z != null && z.success)
            t == null || t(z);
          else {
            ((_ = z == null ? void 0 : z.data) == null ? void 0 : _.ErrorCode) === 1132 && (d == null || d(!0));
            const j = (z == null ? void 0 : z.error) || D.authenticatorLoginError;
            v(j), e == null || e(j);
          }
        } catch (B) {
          const z = (B == null ? void 0 : B.message) || D.authenticatorLoginError;
          v(z), e == null || e(z);
        } finally {
          w(!1);
        }
      }
    },
    [
      x,
      u,
      m,
      p,
      b,
      t,
      e
    ]
  );
  return /* @__PURE__ */ f("div", { style: l, className: `loginradius-card-container ${s}`, children: [
    /* @__PURE__ */ f("header", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: g[W].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: g[W].description })
      ] })
    ] }),
    R && /* @__PURE__ */ i(pe, { setError: v, error: R }),
    /* @__PURE__ */ i("div", { className: "loginradius-form-container", children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
      N && /* @__PURE__ */ i(
        Ao,
        {
          qrCodeUrl: (m == null ? void 0 : m.QRCode) || A
        }
      ),
      /* @__PURE__ */ i(
        Me,
        {
          ref: y,
          display: "Verification Code",
          onComplete: (M) => P(M),
          onChange: (M) => P(M),
          error: O,
          autoFocus: !0
        }
      ),
      c,
      /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
        Xe,
        {
          onClick: () => h({}, Z),
          ButtonId: H.verify,
          type: "submit",
          loading: E,
          ButtonText: g[W].buttonText,
          disabled: !x
        }
      ) })
    ] }) }),
    /* @__PURE__ */ f("footer", { className: "loginradius-footer-container", children: [
      g[W].footerText,
      I.length === 0 ? /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.footerlink,
          ButtonText: g[W].backButtonText,
          onClick: n
        }
      ) : /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.backupcode,
          ButtonText: g[W].forgotButtonText,
          onClick: a
        }
      )
    ] })
  ] });
}, U7 = De(
  { action: "authenticatorLogin" },
  D7
), $6 = ({
  onSuccess: t,
  onError: e,
  initialDomain: n = "",
  initialEmail: a = "",
  className: r = "",
  style: s
}) => {
  const [l, c] = k(n), [d, h] = k(a), [u, m] = k(""), [g, p] = k(""), b = () => {
    if (!l || !d || !u || !g) {
      e == null || e({ error: "All fields are required" });
      return;
    }
    if (u !== g) {
      e == null || e({ error: "Passwords do not match" });
      return;
    }
    t == null || t({ domain: l, email: d, password: u });
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: r,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: "var(--sdk-card-bg-color)",
        ...s
      },
      children: [
        /* @__PURE__ */ i(
          Po,
          {
            field: { name: "domain", display: "Company Domain", rules: "required" },
            value: l,
            onChange: (x) => c(x.target.value)
          }
        ),
        /* @__PURE__ */ i(
          Ye,
          {
            field: { name: "email", display: "Email", rules: "required|email" },
            value: d,
            onChange: (x) => h(x.target.value)
          }
        ),
        /* @__PURE__ */ i(
          qe,
          {
            field: {
              name: "password",
              display: "Password",
              rules: "required|min:8"
            },
            value: u,
            onChange: (x) => m(x.target.value)
          }
        ),
        /* @__PURE__ */ i(
          To,
          {
            field: {
              name: "confirmPassword",
              display: "Confirm Password",
              rules: "required"
            },
            value: g,
            passwordToMatch: u,
            onChange: (x) => p(x.target.value)
          }
        ),
        /* @__PURE__ */ i(Y4, { onClick: b })
      ]
    }
  );
}, Tn = "org-invite", H7 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const [r, s] = k(!0), l = new URLSearchParams(window.location.search), c = l.get("vtype"), d = l.get("vtoken"), { lrInstance: h, content: u } = re(), { setInvitationToken: m, setEmail: g } = ce(), [p, b] = k(null), [x, P] = k(null), [E, w] = k(""), R = async () => {
    h.controller.getInvitationByInvitationToken(
      {
        invitationToken: d
      },
      (v) => {
        s(!1), v && v.data ? (P("Invitation verified successfully"), g(v.data.Email), m(d), t == null || t({
          success: !0,
          data: v.data,
          error: null
        }), w("CheckIcon")) : (b("Invalid invitation response"), console.error("Invalid invitation response:", v), e == null || e({
          error: "Invalid invitation response"
        }), w("ExclamationTriangleIcon"));
      },
      (v) => {
        s(!1), console.error("Error verifying invitation:", v), b(v.error || "Failed to verify invitation"), e(v), w("ExclamationTriangleIcon");
      }
    );
  };
  return X(() => {
    c === "orginvite" && d ? R() : (s(!1), b("Invalid invitation type or token"));
  }, [c, d]), /* @__PURE__ */ f("div", { className: `loginradius-card-container ${n}`, style: a, children: [
    /* @__PURE__ */ i("div", { className: "loginradius-card-header-container", children: /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
      /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: u[Tn].title }),
      /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: u[Tn].description })
    ] }) }),
    p && /* @__PURE__ */ i(pe, { setError: b, error: p }),
    x && /* @__PURE__ */ i(Te, { setSuccess: P, success: x }),
    /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(te, { icon: E, loading: r }) }),
    /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: /* @__PURE__ */ i("div", { className: "loginradius-footer-text", children: u[Tn].footerText }) })
  ] });
}, _6 = ({
  onSuccess: t,
  onError: e,
  sessions: n = [],
  className: a = "",
  style: r
}) => {
  const s = () => {
    if (n.length === 0) {
      e == null || e({ error: "No sessions to logout" });
      return;
    }
    t == null || t("logout");
  }, l = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    // equivalent to Tailwind's `space-y-4`
    backgroundColor: "var(--sdk-card-bg-color)",
    // updated CSS variable
    ...r
  };
  return /* @__PURE__ */ f("div", { className: a, style: l, children: [
    /* @__PURE__ */ i(v7, { sessions: n }),
    /* @__PURE__ */ i(G4, { onClick: s })
  ] });
}, V6 = ({
  onSuccess: t,
  onError: e,
  initialFullName: n = "",
  className: a = "",
  style: r
}) => {
  const [s, l] = k(n), [c, d] = k(void 0), h = () => {
    if (!s) {
      e == null || e({ error: "Full name is required" });
      return;
    }
    t == null || t({ fullName: s, avatar: c });
  }, u = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { className: a, style: u, children: [
    /* @__PURE__ */ i(
      Eo,
      {
        field: { name: "fullName", display: "Full Name", rules: "required" },
        value: s,
        onChange: (m) => l(m.target.value)
      }
    ),
    /* @__PURE__ */ i(y7, { onFileChange: d }),
    /* @__PURE__ */ i(wn, { onClick: h })
  ] });
}, D6 = ({
  onSuccess: t,
  onError: e,
  initialPhone: n = "",
  className: a = "",
  style: r
}) => {
  const [s, l] = k(n), [c, d] = k(null), [h, u] = k(null), m = Ce(null), g = () => {
    if (Ue(
      () => {
        var x, P;
        return ((P = (x = m.current) == null ? void 0 : x.getValue) == null ? void 0 : P.call(x)) ?? c;
      },
      () => {
        var x, P;
        return (P = (x = m.current) == null ? void 0 : x.isOtpComplete) == null ? void 0 : P.call(x);
      },
      (x) => u(x)
    )) {
      if (!s || !c) {
        e == null || e({ error: "Phone and verification code are required" });
        return;
      }
      t == null || t({ phone: s, code: c });
    }
  }, p = {
    backgroundColor: "var(--sdk-card-bg-color)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    ...r
  };
  return /* @__PURE__ */ f("div", { className: a, style: p, children: [
    /* @__PURE__ */ i(
      ot,
      {
        field: { name: "phone", display: "Phone", rules: "required|phone" },
        value: s,
        onChange: (b) => l(b.target.value)
      }
    ),
    /* @__PURE__ */ i(
      Me,
      {
        ref: m,
        display: "Enter OTP",
        onComplete: (b) => d(b),
        onChange: (b) => d(b),
        error: h,
        autoFocus: !0
      }
    ),
    /* @__PURE__ */ i(
      ta,
      {
        onClick: g,
        ButtonId: H.verify,
        type: "submit"
      }
    )
  ] });
}, U6 = ({
  onSuccess: t,
  onError: e,
  email: n,
  className: a = "",
  style: r
}) => {
  const s = () => {
    if (!n) {
      e == null || e({ error: "Email is required" });
      return;
    }
    t == null || t(n);
  }, l = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    ...r
  };
  return /* @__PURE__ */ f("div", { className: a, style: l, children: [
    /* @__PURE__ */ i(f7, { email: n }),
    /* @__PURE__ */ i(na, { onClick: s })
  ] });
}, H6 = ({
  onSuccess: t,
  onError: e,
  accounts: n = [],
  className: a = "",
  style: r,
  theme: s
}) => {
  const l = (c) => {
    if (!c) {
      e == null || e({ error: "No account selected" });
      return;
    }
    t == null || t(c);
  };
  return /* @__PURE__ */ f(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        // equivalent to Tailwind's `space-y-4`
        backgroundColor: "var(--sdk-card-bg-color)",
        ...r
      },
      className: a,
      children: [
        /* @__PURE__ */ i(m7, { accounts: n }),
        n.map((c) => /* @__PURE__ */ i(
          ko,
          {
            onClick: () => l(c.id)
          },
          c.id
        ))
      ]
    }
  );
}, Z6 = ({
  onSuccess: t,
  onError: e,
  message: n = "Access Denied",
  className: a = "",
  style: r
}) => {
  const s = () => {
    t == null || t();
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: a,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        // Replacing `space-y-4`
        backgroundColor: "var(--sdk-card-bg-color)",
        ...r
      },
      children: [
        /* @__PURE__ */ i(X4, { message: n }),
        /* @__PURE__ */ i(J4, { onClick: s })
      ]
    }
  );
}, W6 = ({
  message: t,
  type: e = "info",
  className: n = "",
  style: a
}) => {
  const r = {
    info: { color: "#3b82f6" },
    // Blue
    success: { color: "#10b981" },
    // Green
    error: { color: "#ef4444" },
    // Red
    warning: { color: "#f59e0b" }
    // Yellow
  }, s = {
    info: "InformationCircleIcon",
    success: "CheckCircleIcon",
    error: "ExclamationCircleIcon",
    warning: "ExclamationTriangleIcon"
  }, l = {
    padding: "1rem",
    borderRadius: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "var(--sdk-card-bg-color)",
    // Replacing `bg-card` with native CSS
    ...r[e],
    ...a
  };
  return /* @__PURE__ */ f("div", { style: l, className: n, children: [
    /* @__PURE__ */ i(Pe, { name: s[e], size: 20 }),
    /* @__PURE__ */ i("span", { children: t })
  ] });
}, q6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const r = () => {
    t == null || t();
  };
  return /* @__PURE__ */ i(
    "div",
    {
      className: n,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        // equivalent to Tailwind's `space-y-4`
        backgroundColor: "var(--sdk-card-bg-color)",
        // updated CSS variable
        ...a
      },
      children: /* @__PURE__ */ i(
        te,
        {
          ButtonText: "Home",
          icon: "HomeIcon",
          iconPosition: "left",
          onClick: r
        }
      )
    }
  );
}, Z7 = ({
  onSuccess: t,
  QRCode: e,
  ManualKey: n,
  onError: a,
  initialPhone: r = "",
  className: s = "",
  style: l
}) => {
  const { lrInstance: c, secondFactorConfig: d } = re(), { MFAToken: h } = ce(), u = e || (d == null ? void 0 : d.PushQRCode);
  return X(() => {
    c.controller.mfaPushPing(
      h,
      (m) => {
        m != null && m.success && (t == null || t(m));
      },
      (m) => {
        console.error("Error fetching second factor config:", m);
      }
    );
  }, [h, c.controller, t]), /* @__PURE__ */ f(
    "div",
    {
      style: {
        ...l
      },
      className: `loginradius-card-container ${s}`,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, {}),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: "Push Notification Setup" }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: "Please scan the QR code to register with push notification" })
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "loginradius-form-container", children: (!d || !d.IsGoogleAuthenticatorVerified || !d.IsAuthenticatorVerified) && /* @__PURE__ */ i(
          Ao,
          {
            qrCodeUrl: (d == null ? void 0 : d.PushQRCode) || u
          }
        ) })
      ]
    }
  );
}, W7 = (t) => {
  const { lrInstance: e } = re(), { MFAToken: n } = ce(), [a, r] = k(!1);
  return /* @__PURE__ */ i(
    te,
    {
      ButtonText: t.ButtonText || "Resend",
      icon: "ArrowPathIcon",
      iconPosition: "left",
      loading: a,
      onClick: () => {
        r(!0), e.controller.mfaPushResend(n).then((s) => {
          r(!1), t.onSuccess(s);
        }).catch((s) => {
          console.error("Error resending push notification:", s);
        });
      },
      ...t
    }
  );
}, q7 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const { lrInstance: r } = re(), { MFAToken: s } = ce();
  return X(() => {
    r.controller.mfaPushPing(
      s,
      (l) => {
        l != null && l.success ? t == null || t(l) : e == null || e((l == null ? void 0 : l.error) || "Failed to fetch second factor config");
      },
      (l) => {
        console.error("Error fetching second factor config:", l), e == null || e((l == null ? void 0 : l.error) || "Failed to fetch second factor config");
      }
    );
  }, [s, r.controller, e, t]), /* @__PURE__ */ f(
    "div",
    {
      style: {
        ...a
      },
      className: `loginradius-card-container ${n}`,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, {}),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: "Push Notification Setup" }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: "Waiting for approval on your device..." })
          ] })
        ] }),
        /* @__PURE__ */ i("div", { className: "loginradius-form-container", children: /* @__PURE__ */ i(
          "div",
          {
            className: "spinner",
            style: {
              width: "40px",
              height: "40px",
              border: "4px solid #ccc",
              borderTop: "4px solid #333",
              borderRadius: "50%",
              animation: "spin 1s linear infinite"
            }
          }
        ) }),
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginTop: "24px"
            },
            children: [
              /* @__PURE__ */ i(W7, {}),
              /* @__PURE__ */ i(
                "button",
                {
                  style: {
                    padding: "12px 16px",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  onClick: () => {
                  },
                  children: "Use Other MFA Options"
                }
              )
            ]
          }
        )
      ]
    }
  );
}, K7 = ({ className: t = "", style: e }) => {
  const { secondFactorConfig: n, lrInstance: a } = re(), { accessToken: r, MFAToken: s } = ce();
  return X(() => {
    let l;
    return !n && r ? a.controller.getSecondFactorConfig(r, !0).then((c) => {
      var d;
      c != null && c.success && (localStorage.setItem("duoToken", r), (d = c == null ? void 0 : c.data) != null && d.DuoAuthEndpoint ? l = setTimeout(() => {
        window.location.replace(c.data.DuoAuthEndpoint);
      }, 2e3) : console.error("DuoAuthEndpoint is undefined in the response."));
    }).catch((c) => {
      console.error("Error fetching second factor config:", c);
    }) : (localStorage.setItem("duoToken", s), l = setTimeout(() => {
      window.location.replace(n == null ? void 0 : n.DuoAuthEndpoint);
    }, 1e3)), () => clearTimeout(l);
  }, [a, n, r]), /* @__PURE__ */ f(
    "div",
    {
      style: {
        ...e
      },
      className: `${t} loginradius-card-container`,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: "Duo Security Authenticator" }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: "Please follow the instructions on your Duo Security Authenticator app." })
          ] })
        ] }),
        /* @__PURE__ */ i(
          "div",
          {
            className: "loading-spinner flex justify-center",
            style: { marginBottom: "20px" },
            children: /* @__PURE__ */ i(
              "div",
              {
                style: {
                  width: "40px",
                  height: "40px",
                  border: "4px solid #ccc",
                  borderTop: "4px solid #0078d4",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ i("p", { className: "loginradius-card-subheader", children: "Redirecting you to Duo Security Authenticator..." })
      ]
    }
  );
}, We = (t) => !(!t || t.trim() === "" || /^[0]{8}-[0]{4}-[0]{4}-[0]{4}-[0]{12}$/.test(t)), bt = "passkey-registration", z7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  style: r
}) => {
  var L, A, C;
  const { lrInstance: s, content: l } = re(), [c, d] = k(!1), [h, u] = k(null), [m, g] = k(null), [p, b] = k(null), { setEmail: x } = ce(), { values: P, errors: E, touched: w, handleChange: R, handleSubmit: v } = Ke(
    (p == null ? void 0 : p.Inputs) || []
  );
  X(() => {
    (async () => {
      const I = await s.getSchema("passkeyRegistrationSchema");
      d(!1), b(I);
    })();
  }, [s, s.initializing]);
  const O = async (y = {}) => {
    d(!0);
    const I = await s.getConsentEvents("Register"), N = wo(y), W = {
      identifier: P.emailid,
      acceptprivacypolicy: P.acceptprivacypolicy,
      Consents: {
        Data: Object.entries(N).map(([$, Z]) => ({
          ConsentOptionId: $,
          IsAccepted: Z
        })),
        Events: I
      }
    };
    s.controller.registerPasskey(
      W,
      ($) => {
        d(!1), $.success ? (g(D.passkeyRegistrationSuccess), x(P.emailid), t == null || t($)) : (u($.error || "Registration failed"), e == null || e({
          error: $.error || "Registration failed"
        }));
      },
      ($) => {
        d(!1), u($.error), e == null || e($);
      }
    );
  };
  return /* @__PURE__ */ f("div", { className: `loginradius-card-container ${a}`, style: r, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: ((L = l[bt]) == null ? void 0 : L.title) || "Register Passkey" }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: ((A = l[bt]) == null ? void 0 : A.description) || "Secure your account with a passkey" })
      ] })
    ] }),
    h && /* @__PURE__ */ i(pe, { setError: u, error: h }),
    m && /* @__PURE__ */ i(Te, { setSuccess: g, success: m }),
    /* @__PURE__ */ i(
      "form",
      {
        className: "loginradius-form-container",
        onSubmit: v(O),
        children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
          /* @__PURE__ */ i("div", { className: "loginradius-form-group", children: p && Array.isArray(p.Inputs) && p.Inputs.map((y) => /* @__PURE__ */ i(
            $e,
            {
              fieldId: H.passkeyregister,
              field: y,
              value: P[y.name],
              error: E[y.name],
              touched: w[y.name],
              onChange: R
            },
            y.name
          )) }),
          /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
            po,
            {
              type: "submit",
              ButtonId: H.passkeyregister,
              ButtonText: ((C = l[bt]) == null ? void 0 : C.buttonText) || "Register Passkey",
              loading: c
            }
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      l[bt].footerText,
      /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.back,
          onClick: n,
          ButtonText: l[bt].footerLinkText
        }
      )
    ] })
  ] });
}, G7 = ({
  className: t = "",
  style: e,
  IsRequired: n,
  onChange: a,
  privacyPolicyText: r
}) => {
  const [s, l] = Mn.useState(!1), c = (d) => {
    l(d.target.checked), a(d);
  };
  return /* @__PURE__ */ i(
    "div",
    {
      style: {
        padding: "16px",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        ...e
      },
      children: /* @__PURE__ */ i("label", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: /* @__PURE__ */ i(
        $e,
        {
          onChange: c,
          fieldId: H.privacypolicyupdate,
          field: {
            type: "checkbox",
            name: "acceptprivacypolicy",
            display: r || "I agree to the Privacy Policy",
            rules: n ? "required" : ""
          },
          value: s
        }
      ) })
    }
  );
}, qt = "privacy-policy", J7 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a
}) => {
  const { lrInstance: r, content: s } = re(), { privacyPolicyAccessToken: l } = ce(), [c, d] = k(null), [h, u] = k(!1), [m, g] = k(!1), p = () => {
    m && (u(!0), r.controller.acceptPrivacyPolicy(
      l,
      (b) => {
        b != null && b.success ? t == null || t({ response: b }) : (d((b == null ? void 0 : b.error) || "Failed to update privacy policy"), e == null || e({
          error: (b == null ? void 0 : b.error) || "Failed to update privacy policy"
        })), u(!1);
      },
      (b) => {
        d((b == null ? void 0 : b.error) || "Failed to update privacy policy"), e == null || e(b), u(!1);
      }
    ));
  };
  return /* @__PURE__ */ f("div", { className: `loginradius-card-container ${n}`, style: a, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: s[qt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: s[qt].description })
      ] })
    ] }),
    c && /* @__PURE__ */ i(pe, { setError: d, error: c }),
    /* @__PURE__ */ i("div", { className: "loginradius-form-container", children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
      /* @__PURE__ */ i(
        G7,
        {
          IsRequired: !0,
          onChange: (b) => {
            g(b.target.checked);
          },
          privacyPolicyText: s[qt].privacyPolicyText
        }
      ),
      /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
        Ve,
        {
          loading: h,
          ButtonText: s[qt].buttonText,
          onClick: p
        }
      ) })
    ] }) })
  ] });
}, Kt = "reset-password-by-token", Q7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a,
  style: r
}) => {
  var L;
  const [s, l] = k(!1), { lrInstance: c, content: d } = re(), [h, u] = k(""), g = new URLSearchParams(window.location.search).get("vtoken"), [p, b] = k(null), {
    values: x,
    errors: P,
    touched: E,
    handleChange: w,
    handleSubmit: R,
    handleComponentChange: v
  } = Ke((p == null ? void 0 : p.Inputs) || []);
  X(() => {
    (async () => {
      l(!0);
      try {
        const C = await c.getSchema(
          "resetPasswordSchema"
        );
        b(C);
      } catch (C) {
        const y = (C == null ? void 0 : C.message) || "Failed to load schema";
        u(y), e == null || e(y), b(null);
      } finally {
        l(!1);
      }
    })();
  }, [c, e]);
  const O = async (A) => {
    l(!0);
    try {
      c.controller.resetPassword(
        {
          resettoken: g,
          password: A == null ? void 0 : A.password
        },
        (C) => {
          if (C != null && C.success)
            t == null || t(C.data.Data);
          else {
            const y = (C == null ? void 0 : C.error) || "Password reset failed";
            u(y), e == null || e(y);
          }
        },
        (C) => {
          const y = (C == null ? void 0 : C.error) || "Error resetting password";
          console.error("Error resetting password:", C), u(y), e == null || e(y);
        }
      );
    } catch (C) {
      const y = (C == null ? void 0 : C.message) || "Unexpected error";
      u(y), e == null || e(y);
    } finally {
      l(!1);
    }
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `${a} loginradius-card-container`,
      style: { ...r },
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d[Kt].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d[Kt].description })
          ] })
        ] }),
        h && /* @__PURE__ */ i(pe, { setError: u, error: h }),
        /* @__PURE__ */ i(
          "form",
          {
            onSubmit: R(O),
            className: "loginradius-form-container",
            children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
              /* @__PURE__ */ i("div", { className: "loginradius-form-group", children: p && ((L = p == null ? void 0 : p.Inputs) != null && L.length) ? p.Inputs.filter((A) => A.name !== "stayLogin").map(
                (A) => /* @__PURE__ */ i(
                  $e,
                  {
                    field: A,
                    fieldId: H.login,
                    value: x[A.name],
                    error: P[A.name],
                    touched: E[A.name],
                    onChange: w,
                    handleComponentChange: v
                  },
                  A.name
                )
              ) : /* @__PURE__ */ i("p", { children: "No input fields available." }) }),
              /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
                Ve,
                {
                  ButtonId: H.verify,
                  ButtonText: d[Kt].buttonText,
                  loading: s
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: d[Kt].footerText })
      ]
    }
  );
}, xt = "reset-password-by-email-otp", X7 = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a,
  style: r,
  captchaComponent: s,
  onCaptchaRequired: l,
  handleCaptcha: c
}) => {
  var z;
  const [d, h] = k(!1), [u, m] = k(null), [g, p] = k(null), [b, x] = k(null), [P, E] = k(null), [w, R] = k(null), [v, O] = k(!1), { lrInstance: L, content: A } = re(), { email: C, username: y } = ce(), I = Ce(null), {
    values: N,
    errors: W,
    touched: $,
    handleChange: Z,
    handleSubmit: M,
    handleComponentChange: U
  } = Ke((w == null ? void 0 : w.Inputs) || []);
  X(() => {
    (async () => {
      h(!0);
      try {
        const V = await L.getSchema(
          "resetPasswordSchema"
        );
        R(V);
      } catch (V) {
        const T = (V == null ? void 0 : V.message) || "Failed to load schema";
        m(T), e == null || e(T), R(null);
      } finally {
        h(!1);
      }
    })();
  }, [L, e]);
  const _ = () => {
    O(!0), L.controller.sendResetPasswordEmail(
      { email: C },
      (j) => {
        if (j != null && j.success)
          O(!1), x(D.otpResendSuccess);
        else {
          const V = (j == null ? void 0 : j.error) || D.otpResendError;
          m(V), O(!1), e == null || e(V);
        }
      },
      (j) => {
        const V = (j == null ? void 0 : j.error) || D.otpResendError;
        m(V), O(!1), e == null || e(V);
      }
    );
  }, B = async (j) => {
    if (Ue(
      () => {
        var T, F;
        return ((F = (T = I.current) == null ? void 0 : T.getValue) == null ? void 0 : F.call(T)) ?? P;
      },
      () => {
        var T, F;
        return ((F = (T = I.current) == null ? void 0 : T.isOtpComplete) == null ? void 0 : F.call(T)) ?? !1;
      },
      (T) => p(T)
    )) {
      h(!0);
      try {
        L.controller.resetPassword(
          {
            password: j == null ? void 0 : j.password,
            "h-captcha-response": j == null ? void 0 : j["h-captcha-response"],
            "tencent-captcha-response": j == null ? void 0 : j["tencent-captcha-response"],
            "g-recaptcha-response": j == null ? void 0 : j["g-recaptcha-response"],
            Otp: P,
            ...C && { Email: C },
            ...y && { Username: y }
          },
          (T) => {
            if (T != null && T.success)
              t == null || t(T.data.Data);
            else {
              const F = (T == null ? void 0 : T.error) || "Password reset failed";
              m(F), e == null || e(F);
            }
          },
          (T) => {
            const F = (T == null ? void 0 : T.error) || "Error resetting password";
            console.error("Error resetting password:", T), m(F), (T == null ? void 0 : T.errorCode) === 1132 && (l == null || l(!0)), e == null || e(F);
          }
        );
      } catch (T) {
        const F = (T == null ? void 0 : T.message) || "Unexpected error";
        m(F), e == null || e(F);
      } finally {
        h(!1), p(null);
      }
    }
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `${a} loginradius-card-container`,
      style: { ...r },
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: A[xt].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: A[xt].description })
          ] })
        ] }),
        u && /* @__PURE__ */ i(pe, { setError: m, error: u }),
        b && /* @__PURE__ */ i(Te, { setSuccess: x, success: b }),
        /* @__PURE__ */ i(
          "form",
          {
            onSubmit: M(
              (j) => c(j, B)
            ),
            className: "loginradius-form-container",
            children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
              /* @__PURE__ */ i("div", { className: "loginradius-form-group", children: w && ((z = w == null ? void 0 : w.Inputs) != null && z.length) ? w.Inputs.filter((j) => j.name !== "stayLogin").map(
                (j) => /* @__PURE__ */ i(
                  $e,
                  {
                    field: j,
                    fieldId: H.login,
                    value: N[j.name],
                    error: W[j.name],
                    touched: $[j.name],
                    onChange: Z,
                    handleComponentChange: U
                  },
                  j.name
                )
              ) : /* @__PURE__ */ i("p", { children: "No input fields available." }) }),
              /* @__PURE__ */ i(
                Me,
                {
                  ref: I,
                  display: "Enter OTP",
                  onComplete: (j) => E(j),
                  onChange: (j) => E(j),
                  error: g,
                  autoFocus: !0
                }
              ),
              s,
              /* @__PURE__ */ i(
                Ve,
                {
                  ButtonId: H.verify,
                  loading: d,
                  type: "submit",
                  ButtonText: A[xt].buttonText
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
          A[xt].footerText,
          v ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ i(Y, { onClick: _, ButtonId: H.resend, children: A[xt].footerLinkText })
        ] })
      ]
    }
  );
}, Y7 = De({ action: "resetpassword" }, X7), tt = "reset-password-by-phone-otp", ef = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a,
  style: r,
  captchaComponent: s,
  onCaptchaRequired: l,
  handleCaptcha: c
}) => {
  var z;
  const [d, h] = k(!1), [u, m] = k(null), [g, p] = k(null), [b, x] = k(null), [P, E] = k(null), [w, R] = k(null), [v, O] = k(!1), { lrInstance: L, content: A, options: C } = re(), { phone: y } = ce(), I = Ce(null), {
    values: N,
    errors: W,
    touched: $,
    handleChange: Z,
    handleSubmit: M,
    handleComponentChange: U
  } = Ke((w == null ? void 0 : w.Inputs) || []);
  X(() => {
    (async () => {
      h(!0);
      try {
        const V = await L.getSchema(
          "resetPasswordSchema"
        );
        R(V);
      } catch (V) {
        const T = (V == null ? void 0 : V.message) || "Failed to load schema";
        m(T), e == null || e(T), R(null);
      } finally {
        h(!1);
      }
    })();
  }, [L, e]);
  const _ = (j) => {
    O(!0), L.controller.sendResetPasswordPhoneOTP(
      { phone: y },
      j,
      (V) => {
        if (V != null && V.success)
          x(D.otpResendSuccess), O(!1);
        else {
          const T = (V == null ? void 0 : V.error) || D.otpResendError;
          m(T), O(!1), e == null || e(T);
        }
      },
      (V) => {
        const T = (V == null ? void 0 : V.error) || "Resend failed";
        m(T), O(!1), e == null || e(T);
      }
    );
  }, B = async (j) => {
    if (Ue(
      () => {
        var T, F;
        return ((F = (T = I.current) == null ? void 0 : T.getValue) == null ? void 0 : F.call(T)) ?? P;
      },
      () => {
        var T, F;
        return ((F = (T = I.current) == null ? void 0 : T.isOtpComplete) == null ? void 0 : F.call(T)) ?? !1;
      },
      (T) => p(T)
    )) {
      h(!0);
      try {
        L.controller.resetPasswordPhoneOTP(
          {
            password: j == null ? void 0 : j.password,
            "h-captcha-response": j == null ? void 0 : j["h-captcha-response"],
            "tencent-captcha-response": j == null ? void 0 : j["tencent-captcha-response"],
            "g-recaptcha-response": j == null ? void 0 : j["g-recaptcha-response"],
            phone: y,
            otp: P
          },
          (T) => {
            if (T != null && T.success)
              t == null || t(T.data.Data);
            else {
              const F = (T == null ? void 0 : T.error) || "Password reset failed";
              m(F), e == null || e(F);
            }
          },
          (T) => {
            const F = (T == null ? void 0 : T.error) || "Error resetting password";
            console.error("Error resetting password:", T), m(F), e == null || e(F);
          }
        );
      } catch (T) {
        const F = (T == null ? void 0 : T.message) || "Unexpected error";
        m(F), e == null || e(F);
      } finally {
        h(!1), p(null);
      }
    }
  };
  return /* @__PURE__ */ f(
    "div",
    {
      className: `${a} loginradius-card-container`,
      style: { ...r },
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: A[tt].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: A[tt].description })
          ] })
        ] }),
        u && /* @__PURE__ */ i(pe, { setError: m, error: u }),
        b && /* @__PURE__ */ i(Te, { setSuccess: x, success: b }),
        /* @__PURE__ */ i(
          "form",
          {
            onSubmit: M(
              (j) => c(j, B)
            ),
            className: "loginradius-form-container",
            children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
              /* @__PURE__ */ i("div", { className: "loginradius-form-group", children: w && ((z = w == null ? void 0 : w.Inputs) != null && z.length) ? w.Inputs.filter((j) => j.name !== "stayLogin").map(
                (j) => /* @__PURE__ */ i(
                  $e,
                  {
                    field: j,
                    fieldId: H.login,
                    value: N[j.name],
                    error: W[j.name],
                    touched: $[j.name],
                    onChange: Z,
                    handleComponentChange: U
                  },
                  j.name
                )
              ) : /* @__PURE__ */ i("p", { children: "No input fields available." }) }),
              /* @__PURE__ */ i(
                Me,
                {
                  ref: I,
                  display: "Enter OTP",
                  onComplete: (j) => E(j),
                  onChange: (j) => E(j),
                  error: g,
                  autoFocus: !0
                }
              ),
              s,
              /* @__PURE__ */ i(
                Ve,
                {
                  ButtonId: H.verify,
                  loading: d,
                  type: "submit",
                  ButtonText: A[tt].buttonText
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
          A[tt].footerText,
          v ? /* @__PURE__ */ i("div", { className: "spinner color" }) : /* @__PURE__ */ f("div", { className: "flex align-center flex-gap-8", children: [
            A[tt].footerLinkText,
            /* @__PURE__ */ i(
              Y,
              {
                ButtonId: H.resendotp,
                onClick: () => _(!1),
                children: A[tt].footerLinkPrimaryText
              }
            ),
            (C == null ? void 0 : C.isVoiceOtp) && "or",
            (C == null ? void 0 : C.isVoiceOtp) && /* @__PURE__ */ i(
              Y,
              {
                ButtonId: H.resendvoiceotp,
                onClick: () => _(!0),
                children: A[tt].footerLinkSecondaryText
              }
            )
          ] })
        ] })
      ]
    }
  );
}, tf = De(
  { action: "resetpasswordphoneOtp" },
  ef
), zt = "verify-backup-code", nf = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  className: a = "",
  style: r
}) => {
  const [s, l] = k(""), { lrInstance: c, content: d, secondFactorConfig: h } = re(), { MFAToken: u } = ce(), [m, g] = k(!1), [p, b] = k(null), [x, P] = k(null), [E, w] = k({
    name: "backupCodeSchema",
    type: "string",
    label: "Enter backup Code",
    rules: "required",
    display: "Backup Code"
  }), R = async () => {
    g(!0), h && h.SecondFactorAuthenticationToken ? await c.controller.verifyBackupCode(
      { backupcode: s },
      u,
      (v) => {
        g(!1), v.success ? t == null || t(v) : (b((v == null ? void 0 : v.error) || D.otpVerificationError), e == null || e({
          error: (v == null ? void 0 : v.error) || D.otpVerificationError,
          ...v
        }));
      },
      (v) => {
        g(!1), b(v.error || D.otpVerificationError), e == null || e(v);
      }
    ) : (g(!1), b("No valid token available"), e == null || e({ error: "No valid token available" }));
  };
  return /* @__PURE__ */ f("div", { className: `loginradius-card-container ${a}`, style: r, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(de, {}),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d[zt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d[zt].description })
      ] })
    ] }),
    p && /* @__PURE__ */ i(pe, { setError: b, error: p }),
    x && /* @__PURE__ */ i(Te, { setSuccess: P, success: x }),
    /* @__PURE__ */ f("div", { className: "loginradius-form-container", children: [
      /* @__PURE__ */ i("div", { className: "loginradius-login-form", children: /* @__PURE__ */ i(
        Ee,
        {
          field: E,
          value: s,
          onChange: (v) => l(v.target.value)
        }
      ) }),
      /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
        Xe,
        {
          ButtonText: d[zt].buttonText,
          loading: m,
          onClick: R
        }
      ) })
    ] }),
    /* @__PURE__ */ i("div", { className: "loginradius-footer-container", children: /* @__PURE__ */ i(
      Y,
      {
        ButtonId: H.back,
        ButtonText: d[zt].footerLinkText,
        onClick: n,
        className: "loginradius-back-button"
      }
    ) })
  ] });
}, af = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='%2352c41a'%20class='size-6'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M9%2012.75%2011.25%2015%2015%209.75M21%2012a9%209%200%201%201-18%200%209%209%200%200%201%2018%200Z'%20/%3e%3c/svg%3e", Gt = "email-verified", of = ({
  onBack: t,
  className: e = "",
  style: n
}) => {
  const { content: a } = It();
  return /* @__PURE__ */ f("div", { className: `${e} loginradius-card-container `, style: n, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i("img", { width: 80, height: 80, src: af, alt: "Verified" }),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: a[Gt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: a[Gt].description })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      a[Gt].footerText,
      /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.back,
          ButtonText: a[Gt].footerLinkText,
          onClick: t
        }
      )
    ] })
  ] });
}, rf = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='%23ff4d4f'%20class='size-6'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M18.364%2018.364A9%209%200%200%200%205.636%205.636m12.728%2012.728A9%209%200%200%201%205.636%205.636m12.728%2012.728L5.636%205.636'%20/%3e%3c/svg%3e", Jt = "account-blocked", sf = ({
  onBack: t,
  className: e = "",
  style: n
}) => {
  const { content: a } = It();
  return /* @__PURE__ */ f("div", { className: `${e} loginradius-card-container `, style: n, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(
        "img",
        {
          width: 80,
          height: 80,
          src: rf,
          alt: "Account Blocked",
          className: "loginradius-blocked-logo"
        }
      ),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: a[Jt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: a[Jt].description })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      a[Jt].footerText,
      /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.footerlink,
          ButtonText: a[Jt].footerLinkText,
          onClick: t
        }
      )
    ] })
  ] });
}, Io = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%20stroke-width='1.5'%20stroke='%23ffc107'%20class='size-6'%3e%3cpath%20stroke-linecap='round'%20stroke-linejoin='round'%20d='M12%209v3.75m-9.303%203.376c-.866%201.5.217%203.374%201.948%203.374h14.71c1.73%200%202.813-1.874%201.948-3.374L13.949%203.378c-.866-1.5-3.032-1.5-3.898%200L2.697%2016.126ZM12%2015.75h.007v.008H12v-.008Z'%20/%3e%3c/svg%3e", lf = "account-suspended", cf = Fo(
  ({
    timerImage: t,
    finalTimer: e,
    localizedContent: n
  }) => {
    const a = be(() => {
      const r = e.minutes.toString().padStart(2, "0"), s = e.seconds.toString().padStart(2, "0");
      return e.minutes > 0 ? n.timerText.replace("%s", r).replace("%s", String(s)) : n.timerSecondsText.replace("%s", s);
    }, [e.minutes, e.seconds]);
    return /* @__PURE__ */ i("div", { className: "loginradius-timer-container", children: /* @__PURE__ */ f("p", { className: "loginradius-timer-text", children: [
      /* @__PURE__ */ i("img", { src: t, alt: "timerinfoIcon" }),
      a
    ] }) });
  }
), df = ({ className: t = "", style: e, onBack: n }) => {
  const { timer: a, content: r, options: s } = It(), l = B4(a), c = be(() => mo("timerInfo"), []), d = be(() => r[lf], [r]);
  return /* @__PURE__ */ f("div", { className: `${t} loginradius-card-container`, style: e, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(
        "img",
        {
          width: 50,
          src: Io,
          alt: "Account Suspended",
          className: "loginradius-card-header-image"
        }
      ),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d.title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d.description })
      ] }),
      l.isExpired ? /* @__PURE__ */ i(
        te,
        {
          ButtonId: "backToLogin",
          ButtonText: "Retry Login",
          onClick: n
        }
      ) : /* @__PURE__ */ i(
        cf,
        {
          timerImage: c,
          finalTimer: l,
          localizedContent: d
        }
      )
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      d.footerText,
      /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.footerlink,
          ButtonText: d.footerLinkText,
          onClick: () => window.open(
            (s == null ? void 0 : s.contactusUrl) || "https://www.loginradius.com/contact-us",
            "_blank"
          )
        }
      )
    ] })
  ] });
}, Qt = "account-restricted", uf = ({ className: t = "", style: e }) => {
  const { content: n } = It();
  return /* @__PURE__ */ f("div", { className: `${t} loginradius-card-container `, style: e, children: [
    /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
      /* @__PURE__ */ i(
        "img",
        {
          width: 80,
          height: 80,
          src: Io,
          alt: "Account Restricted"
        }
      ),
      /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
        /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: n[Qt].title }),
        /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: n[Qt].description })
      ] })
    ] }),
    /* @__PURE__ */ f("div", { className: "loginradius-footer-container", children: [
      n[Qt].footerText,
      /* @__PURE__ */ i(
        Y,
        {
          ButtonId: H.footerlink,
          ButtonText: n[Qt].footerLinkText,
          onClick: () => window.open("https://www.loginradius.com/contact-us", "_blank")
        }
      )
    ] })
  ] });
}, In = "passwordless-login", hf = ({
  onSuccess: t,
  onError: e,
  onBack: n,
  captchaComponent: a,
  handleCaptcha: r,
  style: s,
  className: l
}) => {
  const { lrInstance: c, content: d } = re(), [h, u] = k(!1), [m, g] = k(null), [p, b] = k(null), { setEmail: x, setPhone: P, setUsername: E, invitationToken: w, email: R } = ce(), {
    values: v,
    errors: O,
    touched: L,
    handleChange: A,
    handleSubmit: C,
    handleComponentChange: y
  } = Ke((p == null ? void 0 : p.Inputs) || []);
  X(() => {
    (async () => {
      u(!0);
      try {
        const W = await c.getSchema(
          "passwordlessLoginSchema"
        );
        R && W && (W.Inputs = W.Inputs.map(
          ($) => $.name === "emailid" ? {
            ...$,
            value: R,
            disabled: !!w
          } : $
        )), b(W);
      } catch (W) {
        const $ = W instanceof Error ? W.message : "Failed to load schema";
        g($), e == null || e(W);
      } finally {
        u(!1);
      }
    })();
  }, [c, e]);
  const I = async (N) => {
    g(null), u(!0);
    const W = mt.validateAndGetAuthPayload(N), { email: $, username: Z, phone: M } = W.authPayload;
    let U;
    if ($ || Z)
      U = c.controller.passwordlessLoginEmail;
    else if (M)
      U = c.controller.passwordlessLoginSMS;
    else {
      u(!1);
      return;
    }
    const _ = {
      ...W.authPayload,
      ...w && { invitation_token: w },
      ...At(N)
    };
    U(_, (j) => {
      if (u(!1), j.success)
        $ && x($), M && P(M), Z && E(Z), t == null || t(j);
      else {
        const V = j.error;
        g(V), e == null || e({ error: V });
      }
    }, (j) => {
      u(!1), g(j.error), e == null || e(j);
    });
  };
  return /* @__PURE__ */ f(
    "div",
    {
      style: { ...s },
      className: `${l} loginradius-card-container`,
      children: [
        /* @__PURE__ */ f("div", { className: "loginradius-card-header-container", children: [
          /* @__PURE__ */ i(de, { style: { objectFit: "contain" } }),
          /* @__PURE__ */ f("div", { className: "loginradius-card-content", children: [
            /* @__PURE__ */ i("h2", { className: "loginradius-card-header", children: d[In].title }),
            /* @__PURE__ */ i("h5", { className: "loginradius-card-subheader", children: d[In].description })
          ] })
        ] }),
        m && /* @__PURE__ */ i(pe, { setError: g, error: m }),
        /* @__PURE__ */ i(
          "form",
          {
            className: "loginradius-form-container",
            onSubmit: C(
              (N) => r(N, I)
            ),
            children: /* @__PURE__ */ f("div", { className: "loginradius-login-form", children: [
              /* @__PURE__ */ i("div", { className: "loginradius-form-group", children: p && p.Inputs && Array.isArray(p.Inputs) && p.Inputs.map((N) => /* @__PURE__ */ i(
                $e,
                {
                  fieldId: H.passwordlessloginEmailText,
                  field: N,
                  value: v[N.name],
                  error: O[N.name],
                  touched: L[N.name],
                  onChange: A,
                  handleComponentChange: y
                },
                N.name
              )) }),
              a,
              /* @__PURE__ */ i("div", { className: "loginradius-button-container", children: /* @__PURE__ */ i(
                te,
                {
                  loading: h,
                  ButtonText: d[In].buttonText,
                  backgroundColor: "bg-blue-500",
                  textColor: "text-white"
                }
              ) })
            ] })
          }
        )
      ]
    }
  );
}, mf = De({ action: "passwordlesslogin" }, hf), Nt = {
  login: S4,
  set_login_pin: I7,
  login_by_pin: M7,
  mfa_selector: l7,
  sms_otp: $7,
  update_phone: O7,
  email_otp: V7,
  totp: U7,
  push_register: Z7,
  push_login: q7,
  duo_security: K7,
  passwordless_login: mf,
  forgot_password: b7,
  reset_password_by_token: Q7,
  reset_password_by_otp: Y7,
  reset_password_by_phone_otp: tf,
  passkey_login: N7,
  magic_link: S7,
  verify_passwordless_login_email: A7,
  verify_passwordless_login_email_otp: T7,
  verify_passwordless_login_sms: E7,
  verify_email_otp: x7,
  verify_email_link: L7,
  verify_sms_otp: R7,
  consent_form: B7,
  register: $4,
  passkey_registration: z7,
  privacy_policy: J7,
  verify_backup_code: nf,
  org_invite: H7,
  email_verified: of,
  account_blocked: sf,
  account_suspended: df,
  account_restricted: uf
}, K6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a,
  children: r,
  footerOnClick: s,
  hasFooter: l = !1
}) => {
  const c = new URLSearchParams(window.location.search), d = c.get("vtype"), h = c.get("vtoken"), {
    setAccessToken: u,
    setMFAToken: m,
    setPinAuthToken: g,
    pinAuthToken: p,
    setConsentToken: b,
    setPrivacyPolicyAccessToken: x,
    setEmail: P,
    setPhone: E,
    setInvitationToken: w
  } = ce(), { lrInstance: R, options: v, loading: O, error: L, setSecondFactorConfig: A } = re(), [C, y] = k(
    d === "reset" && h ? "reset_password_by_token" : d === "oneclicksignin" && h ? "verify_passwordless_login_email" : p ? "login_by_pin" : "login"
  ), [I, N] = k({});
  X(() => {
    L && (e == null || e({ error: L.message }));
  }, [L, e]), X(() => {
    v && R && gn(v).socialLogin(t);
  }, [v, R, t]);
  const $ = be(() => v ? Object.entries(Tt).filter(([U, _]) => _.condition(v)).map(([U, _]) => ({ id: U, ..._ })) : [], [v]).find((U) => U.id === C), Z = (R == null ? void 0 : R.getMFAMethods()) || [], M = ne(() => {
    var T;
    if (O)
      return /* @__PURE__ */ i("div", { children: "Loading login flow..." });
    if (L || !R || !v || !$)
      return /* @__PURE__ */ i("div", { children: "Login flow complete or invalid step" });
    const U = (F) => {
      var me, ue, ge, ke, Ne, Fe;
      const q = { [$.id]: F };
      N((Je) => ({ ...Je, ...q })), $.id === "login" && (me = F.data) != null && me.PINAuthToken && g(F.data.PINAuthToken), $.id === "login" && ((ue = F.data) != null && ue.SecondFactorAuthentication) ? (m(
        F.data.SecondFactorAuthentication.SecondFactorAuthenticationToken
      ), A(F.data.SecondFactorAuthentication), F.data.SecondFactorAuthentication.Email && P(F.data.SecondFactorAuthentication.Email[0])) : $.id === "login" && !((ge = F.data) != null && ge.SecondFactorAuthentication) && We((ke = F.data) == null ? void 0 : ke.access_token) && u(F.data.access_token);
      const ee = $.getNext(F, v, I);
      ee === "end" ? (P(""), E(""), w(""), t == null || t(
        F.success && We(((Ne = F.data) == null ? void 0 : Ne.access_token) || F.token) ? F.data : (Fe = I == null ? void 0 : I.login) == null ? void 0 : Fe.data
      )) : y(ee);
    }, _ = (F) => {
      var ee;
      const q = F.nextId ?? ((ee = $.handleBack) == null ? void 0 : ee.call($, F));
      q === "login" && (g(null), u(null), m(null), A(null)), q ? y(q) : e == null || e({ error: "No previous step found" });
    }, B = (F, q) => {
      var me, ue;
      const ee = (me = $.handleSecondaryAction) == null ? void 0 : me.call(
        $,
        F,
        q,
        v
      );
      ee === "end" ? (P(""), E(""), w(""), t == null || t(
        q.success && We(((ue = q.data) == null ? void 0 : ue.Access_token) || q.token) ? q.data : I.login.data
      )) : ee ? y(ee) : e == null || e({ error: "No next step found for secondary action" });
    }, z = (F) => {
      var ee;
      F.data && F.data.ConsentToken && b(F.data.ConsentToken), F.data && F.errorCode === 1194 && F.data.access_token && x(F.data.access_token);
      const q = (ee = $.handleError) == null ? void 0 : ee.call($, F, v);
      q ? y(q) : e == null || e(typeof F == "string" ? { error: F } : F);
    }, j = Nt[$.component], V = {
      onError: z,
      onSuccess: U,
      onBack: _,
      onSecondaryAction: B
    };
    return $.id === "mfa_selector" ? /* @__PURE__ */ i(
      j,
      {
        ...V,
        methods: Z,
        isRequired: v.twoFactorAuthentication ?? !1,
        onMethodSelect: U
      }
    ) : $.id === "set_login_pin" ? /* @__PURE__ */ i(
      j,
      {
        ...V,
        isRequired: (v.isPINAuthentication && ((T = v.PINConfiguration) == null ? void 0 : T.IsRequired)) ?? !1
      }
    ) : $.id === "login" ? /* @__PURE__ */ i(
      j,
      {
        ...V,
        onForgotPassword: () => y("forgot_password"),
        onPasskeyLogin: () => y("passkey_login"),
        onPasswordlessLoginEmail: () => y("passwordless_login_email"),
        onPasswordlessLoginSMS: () => y("passwordless_login_sms"),
        onFooterClick: s || (() => y("register")),
        hasFooter: l
      }
    ) : $.id === "register" ? /* @__PURE__ */ i(
      j,
      {
        ...V,
        onBack: () => y("login"),
        onPasskeyRegistration: () => y("passkey_registration"),
        onFooterClick: () => y("login"),
        hasFooter: l
      }
    ) : /* @__PURE__ */ i(j, { ...V });
  }, [
    $,
    Z,
    I,
    O,
    L,
    R,
    v,
    e,
    t,
    s,
    l,
    u,
    b,
    P,
    w,
    m,
    E,
    g,
    x,
    A
  ]);
  return /* @__PURE__ */ f("div", { className: ` ${n}`, style: { ...a }, children: [
    M(),
    r
  ] });
}, z6 = ({
  onSuccess: t,
  onError: e,
  hasFooter: n = !1,
  footerOnClick: a,
  className: r = "",
  style: s,
  children: l
}) => {
  const { lrInstance: c, options: d, loading: h, error: u } = re(), { setEmail: m, setPhone: g, setInvitationToken: p } = ce(), [b, x] = k("register"), [P, E] = k({});
  X(() => {
    u && (e == null || e({ error: u.message }));
  }, [u, e]), X(() => {
    d != null && d.isPassKeysEnabled && x("passkey_registration");
  }, [d]);
  const R = be(() => d ? Object.entries(Tt).filter(([O, L]) => L.condition(d)).map(([O, L]) => ({ id: O, ...L })) : [], [d]).find((O) => O.id === b), v = ne(() => {
    if (h)
      return /* @__PURE__ */ i("div", { children: "Loading registration flow..." });
    if (u || !c || !d || !R)
      return /* @__PURE__ */ i("div", { children: "Registration flow complete or invalid step" });
    const O = (I) => {
      const N = { [R.id]: I };
      E(($) => ({ ...$, ...N }));
      const W = R.getNext(I, d, P);
      W === "end" ? (m(""), g(""), p(""), t == null || t(
        I.success && We(
          I.data.AccessToken || I.AccessToken || I.token
        ) ? I.data : P.register.data
      )) : x(W);
    }, L = (I) => {
      var W;
      const N = I.nextId ?? ((W = R.handleBack) == null ? void 0 : W.call(R, I));
      N ? x(N) : e == null || e({ error: "No previous step found" });
    }, A = (I) => {
      var W;
      const N = (W = R.handleError) == null ? void 0 : W.call(R, I, d);
      N ? x(N) : e == null || e(typeof I == "string" ? { error: I } : I);
    }, C = Nt[R.component], y = {
      onError: A,
      onSuccess: O,
      onBack: L
    };
    return R.id === "register" ? /* @__PURE__ */ i(
      C,
      {
        ...y,
        onPasskeyRegistration: () => x("passkey_registration"),
        onFooterClick: a || (() => x("login")),
        hasFooter: n
      }
    ) : R.id === "login" ? /* @__PURE__ */ i(
      C,
      {
        ...y,
        onForgotPassword: () => x("forgot_password"),
        onPasskeyLogin: () => x("passkey_login"),
        onPasswordlessLoginEmail: () => x("passwordless_login_email"),
        onPasswordlessLoginSMS: () => x("passwordless_login_sms"),
        onFooterClick: () => x("register"),
        hasFooter: n
      }
    ) : /* @__PURE__ */ i(C, { ...y });
  }, [
    R,
    P,
    h,
    u,
    c,
    d,
    e,
    t,
    a,
    n,
    m,
    g,
    p
  ]);
  return /* @__PURE__ */ f("div", { className: ` ${r}`, style: { ...s }, children: [
    v(),
    l
  ] });
}, G6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a,
  children: r
}) => {
  const s = new URLSearchParams(window.location.search), l = s.get("vtype"), c = s.get("vtoken"), { lrInstance: d, options: h, loading: u, error: m } = re(), [g, p] = k(
    l === "reset" && c ? "reset_password_by_token" : "forgot_password"
  ), [b, x] = k({});
  X(() => {
    m && (e == null || e({ error: m.message }));
  }, [m, e]);
  const E = be(() => h ? Object.entries(Tt).filter(([R, v]) => v.condition(h)).map(([R, v]) => ({ id: R, ...v })) : [], [h]).find((R) => R.id === g), w = ne(() => {
    if (u)
      return /* @__PURE__ */ i("div", { children: "Loading forgot password flow..." });
    if (m || !d || !h || !E)
      return /* @__PURE__ */ i("div", { children: "Forgot password flow complete or invalid step" });
    const R = (C) => {
      const y = { [E.id]: C };
      x((N) => ({ ...N, ...y }));
      const I = E.getNext(C, h, b);
      I === "login" ? t == null || t(
        We(C == null ? void 0 : C.access_token) ? (C == null ? void 0 : C.data) || C : { success: !0, message: "Password Reset Successfully" }
      ) : p(I);
    }, v = (C) => {
      var I;
      const y = C.nextId ?? ((I = E.handleBack) == null ? void 0 : I.call(E, C));
      y ? p(y) : e == null || e({ error: "No previous step found" });
    }, O = (C) => {
      var I;
      const y = (I = E.handleError) == null ? void 0 : I.call(E, C, h);
      y ? p(y) : e == null || e(typeof C == "string" ? { error: C } : C);
    }, L = Nt[E.component], A = {
      onError: O,
      onSuccess: R,
      onBack: v
    };
    if (E.id === "forgot_password") {
      const { onBack: C, ...y } = A;
      return /* @__PURE__ */ i(L, { ...y });
    }
    return /* @__PURE__ */ i(L, { ...A });
  }, [
    E,
    b,
    u,
    m,
    d,
    h,
    e,
    t
  ]);
  return /* @__PURE__ */ f(
    "div",
    {
      className: `space-y-4 ${n}`,
      style: { ...a },
      children: [
        w(),
        r
      ]
    }
  );
}, J6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a,
  children: r
}) => {
  const s = new URLSearchParams(window.location.search), l = s.get("vtype"), c = s.get("vtoken"), {
    setAccessToken: d,
    setMFAToken: h,
    setPinAuthToken: u,
    pinAuthToken: m,
    setPhone: g,
    setInvitationToken: p,
    setConsentToken: b,
    setPrivacyPolicyAccessToken: x,
    setEmail: P
  } = ce(), { lrInstance: E, options: w, loading: R, error: v, setSecondFactorConfig: O } = re(), [L, A] = k(
    l === "reset" && c ? "reset_password_by_token" : l === "oneclicksignin" && c ? "verify_passwordless_login_email" : l === "orginvite" && c ? "org_invite" : m ? "login_by_pin" : "login"
  ), [C, y] = k({});
  X(() => {
    v && (e == null || e({ error: v.message }));
  }, [v, e]), X(() => {
    w && E && gn(w).socialLogin(t);
  }, [w, E, t]);
  const N = be(() => w ? Object.entries(Tt).filter(([$, Z]) => Z.condition(w)).map(([$, Z]) => ({ id: $, ...Z })) : [], [w]).find(($) => $.id === L), W = ne(() => {
    var j;
    if (R)
      return /* @__PURE__ */ i("div", { children: "Loading authentication flow..." });
    if (v || !E || !w || !N)
      return /* @__PURE__ */ i("div", { children: "Login flow complete or invalid step" });
    const $ = E == null ? void 0 : E.getMFAMethods(), Z = (V) => {
      var q, ee, me, ue, ge, ke, Ne;
      const T = { [N.id]: V };
      y((Fe) => ({ ...Fe, ...T })), N.id === "login" && (q = V.data) != null && q.PINAuthToken && u(V.data.PINAuthToken), N.id === "login" && ((ee = V.data) != null && ee.SecondFactorAuthentication) ? (h(
        V.data.SecondFactorAuthentication.SecondFactorAuthenticationToken
      ), O(V.data.SecondFactorAuthentication), V.data.SecondFactorAuthentication.Email && P(V.data.SecondFactorAuthentication.Email[0])) : N.id === "login" && !((me = V.data) != null && me.SecondFactorAuthentication) && We((ue = V.data) == null ? void 0 : ue.access_token) && d(V.data.access_token);
      const F = N.getNext(V, w, C);
      F === "end" ? (P(""), g(""), p(""), t == null || t(
        V.success && We(((ge = V.data) == null ? void 0 : ge.access_token) || V.token) ? V.data : ((ke = C.login) == null ? void 0 : ke.data) || ((Ne = C.register) == null ? void 0 : Ne.data)
      )) : A(F);
    }, M = (V) => {
      var F;
      const T = V.nextId ?? ((F = N.handleBack) == null ? void 0 : F.call(N, V));
      T === "login" && (u(null), d(null), h(null), O(null)), T ? A(T) : e == null || e({ error: "No previous step found" });
    }, U = (V) => {
      var F;
      V.data && V.data.ConsentToken && b(V.data.ConsentToken), V.data && V.errorCode === 1194 && V.data.access_token && x(V.data.access_token);
      const T = (F = N.handleError) == null ? void 0 : F.call(N, V, w);
      T ? A(T) : e == null || e(typeof V == "string" ? { error: V } : V);
    }, _ = (V, T) => {
      var q, ee;
      const F = (q = N.handleSecondaryAction) == null ? void 0 : q.call(
        N,
        V,
        T,
        w
      );
      F === "end" ? (P(""), g(""), p(""), t == null || t(
        T.success && We(((ee = T.data) == null ? void 0 : ee.Access_token) || T.token) ? T : C.login || C.register
      )) : F ? A(F) : e == null || e({ error: "No next step found for secondary action" });
    }, B = Nt[N.component], z = {
      onError: U,
      onSuccess: Z,
      onBack: M,
      onSecondaryAction: _
    };
    return N.id === "mfa_selector" ? /* @__PURE__ */ i(
      B,
      {
        ...z,
        methods: $,
        isRequired: w.twoFactorAuthentication ?? !1,
        onMethodSelect: Z
      }
    ) : N.id === "set_login_pin" ? /* @__PURE__ */ i(
      B,
      {
        ...z,
        isRequired: (w.isPINAuthentication && ((j = w.PINConfiguration) == null ? void 0 : j.IsRequired)) ?? !1
      }
    ) : N.id === "login" ? /* @__PURE__ */ i(
      B,
      {
        ...z,
        onForgotPassword: () => A("forgot_password"),
        onPasskeyLogin: () => A("passkey_login"),
        onPasswordlessLoginEmail: () => A("passwordless_login_email"),
        onPasswordlessLoginSMS: () => A("passwordless_login_sms"),
        onFooterClick: () => A(
          w.isPassKeysEnabled ? "passkey_registration" : "register"
        ),
        hasFooter: !0
      }
    ) : N.id === "register" ? /* @__PURE__ */ i(
      B,
      {
        ...z,
        onBack: () => A("login"),
        onPasskeyRegistration: () => A("passkey_registration"),
        onFooterClick: () => A("login"),
        hasFooter: !0
      }
    ) : /* @__PURE__ */ i(B, { ...z });
  }, [
    N,
    C,
    R,
    v,
    E,
    w,
    e,
    t,
    d,
    b,
    P,
    p,
    h,
    g,
    u,
    x,
    O
  ]);
  return /* @__PURE__ */ f("div", { className: ` ${n}`, style: { ...a }, children: [
    W(),
    r
  ] });
}, Q6 = ({
  onSuccess: t,
  onError: e,
  className: n = "",
  style: a,
  children: r,
  footerOnClick: s
}) => {
  const l = new URLSearchParams(window.location.search), c = l.get("vtype"), d = l.get("vtoken"), {
    setAccessToken: h,
    setMFAToken: u,
    setPinAuthToken: m,
    setConsentToken: g,
    setPrivacyPolicyAccessToken: p,
    setEmail: b,
    setPhone: x,
    setInvitationToken: P
  } = ce(), { lrInstance: E, options: w, loading: R, error: v, setSecondFactorConfig: O } = re(), [L, A] = k(
    c === "oneclicksignin" && d ? "verify_vtoken_passwordless" : "passwordless_login"
  ), [C, y] = k({});
  X(() => {
    v && (e == null || e({ error: v.message }));
  }, [v, e]), X(() => {
    w && E && gn(w).socialLogin(t);
  }, [w, E, t]);
  const N = be(() => w ? Object.entries(Tt).filter(([Z, M]) => M.condition(w)).map(([Z, M]) => ({ id: Z, ...M })) : [], [w]).find((Z) => Z.id === L), W = (E == null ? void 0 : E.getMFAMethods()) || [], $ = ne(() => {
    if (R)
      return /* @__PURE__ */ i("div", { children: "Loading passwordless login flow..." });
    if (v || !E || !w || !N)
      return /* @__PURE__ */ i("div", { children: "Passwordless Login flow complete or invalid step" });
    const Z = (j) => {
      var F;
      const V = { [N.id]: j };
      y((q) => ({ ...q, ...V }));
      const T = N.getNext(j, w, C);
      T === "end" ? (b(""), x(""), P(""), t == null || t(
        j.success && We(((F = j.data) == null ? void 0 : F.access_token) || j.token) ? j.data : C.login.data
      )) : A(T);
    }, M = (j) => {
      var T;
      const V = j.nextId ?? ((T = N.handleBack) == null ? void 0 : T.call(N, j));
      V ? A(V) : e == null || e({ error: "No previous step found" });
    }, U = (j, V) => {
      var F, q;
      const T = (F = N.handleSecondaryAction) == null ? void 0 : F.call(
        N,
        j,
        V,
        w
      );
      T === "end" ? (b(""), x(""), P(""), t == null || t(
        V.success && We(((q = V.data) == null ? void 0 : q.Access_token) || V.token) ? V : C.login
      )) : T ? A(T) : e == null || e({ error: "No next step found for secondary action" });
    }, _ = (j) => {
      var T;
      j.data && j.data.ConsentToken && g(j.data.ConsentToken), j.data && j.errorCode === 1194 && j.data.access_token && p(j.data.access_token);
      const V = (T = N.handleError) == null ? void 0 : T.call(N, j, w);
      V ? A(V) : e == null || e(typeof j == "string" ? { error: j } : j);
    }, B = Nt[N.component];
    return /* @__PURE__ */ i(B, { ...{
      onError: _,
      onSuccess: Z,
      onBack: M,
      onSecondaryAction: U
    } });
  }, [
    N,
    W,
    C,
    R,
    v,
    E,
    w,
    e,
    t,
    s,
    h,
    g,
    b,
    P,
    u,
    x,
    m,
    p,
    O
  ]);
  return /* @__PURE__ */ f("div", { className: ` ${n}`, style: { ...a }, children: [
    $(),
    r
  ] });
};
export {
  Z6 as AccessDeniedPrompt,
  W4 as AddButton,
  P6 as AddEmail,
  oa as AnswerInput,
  J6 as AuthFlow,
  U7 as AuthenticatorLogin,
  u6 as AutoLogin,
  Xf as AvatarUploader,
  C6 as BackupCodeButton,
  H6 as BusinessLinkedAccounts,
  S6 as BusinessLogin,
  V6 as BusinessProfileEditor,
  $6 as BusinessRegistration,
  j6 as BusinessSSOLogin,
  te as Button,
  yo as ChangeButton,
  y6 as ChangePIN,
  v6 as ChangePassword,
  E6 as ChangeUsername,
  Mt as Checkbox,
  Gf as CodeDisplay,
  c7 as CodeInput,
  Po as CompanyDomainInput,
  vo as ConfirmButton,
  Ro as ConfirmNewPINInput,
  t6 as ConfirmationCheckbox,
  B7 as ConsentEditor,
  w7 as ConsentList,
  F6 as ConsentManagement,
  Yn as ConsentToggle,
  J4 as ContactAdminButton,
  k6 as CreateTwoFactorAuthentication,
  g6 as CrossDeviceSSO,
  zf as CurrentPINInput,
  qf as CurrentPasswordInput,
  p7 as CustomEventConsent,
  K4 as DeleteButton,
  O6 as DeleteUser,
  B6 as DeleteUserConfirm,
  D4 as DeviceLinkButton,
  Q4 as DeviceRecognitionPrompt,
  K7 as DuoSecurityAuthenticator,
  jf as EditToggle,
  f7 as EmailDisplay,
  V7 as EmailOTPLogin,
  Yf as EmailSelector,
  U4 as EnableButton,
  X4 as ErrorMessageDisplay,
  g7 as EventSelector,
  m6 as ForgotPIN,
  b7 as ForgotPassword,
  G6 as ForgotPasswordFlow,
  Co as ForgotPasswordLink,
  Eo as FullNameInput,
  H4 as GenerateCodeButton,
  q6 as HomeButton,
  Pe as Icon,
  c6 as InstantLinkLogin,
  a6 as InvitationCodeInput,
  I6 as LinkAccount,
  Y as LinkButton,
  m7 as LinkedAccountsList,
  r6 as Login,
  xo as LoginButton,
  K6 as LoginFlow,
  S4 as LoginForm,
  Bf as LoginRadiusProvider,
  V4 as LogoutButton,
  G4 as LogoutOtherDevicesButton,
  l7 as MFAMethodSelector,
  S7 as MagicLinkLogin,
  W6 as MessageDisplay,
  u7 as NewEmailInput,
  Lo as NewPINInput,
  Zf as NewPasskeySetup,
  Kf as NewPasswordInput,
  d7 as NewUsernameInput,
  s6 as NoRegistrationPasswordLessLogin,
  Me as OTPInput,
  $7 as OTPLogin,
  Uf as OneTimeLinkButton,
  l6 as OneTouchLogin,
  H7 as OrgInvitation,
  aa as PINInput,
  M7 as PINReauthentication,
  N7 as PasskeyLogin,
  Hf as PasskeyPrompt,
  Q6 as PasswordlessLoginFlow,
  A6 as ProfileEditor,
  Sf as ProfileFlow,
  y7 as ProfilePictureUploader,
  e6 as ProviderSelector,
  q7 as PushNotificationLogin,
  Z7 as PushNotificationRegister,
  Ao as QRCodeDisplay,
  Qf as QuestionDisplay,
  Jf as QuestionSelector,
  Y4 as RegisterButton,
  z6 as RegisterFlow,
  $4 as RegisterForm,
  i6 as Registration,
  q4 as RemoveButton,
  T6 as RemoveEmail,
  U6 as ResendBusinessVerificationEmail,
  na as ResendButton,
  Df as ResendEmailLink,
  N6 as ResendVerificationEmail,
  b6 as ResetBackupCodeButton,
  ea as ResetButton,
  Z4 as ResetCodeButton,
  h6 as ResetPIN,
  R6 as ResetPINBySecurityQuestion,
  f6 as ResetPasskey,
  L6 as ResetPasswordBySecurityQuestion,
  p6 as SSOLogin,
  z4 as SSOLoginButton,
  w6 as SSONotLoginThenLogout,
  r7 as SSOProviderSelector,
  Wf as SSOStatusChecker,
  wn as SaveButton,
  d4 as SendLinkButton,
  n6 as SendMagicLinkButton,
  _6 as SessionControl,
  v7 as SessionList,
  o6 as SetPasswordInput,
  I7 as SetPinToken,
  d6 as SmartLogin,
  fo as SocialLoginButtons,
  Ve as SubmitButton,
  $f as TermsCheckbox,
  Ff as ThemeProvider,
  o7 as TokenValidator,
  M6 as UnlinkAccount,
  ko as UnlinkButton,
  D6 as UpdateBusinessPhone,
  ta as UpdateButton,
  O7 as UpdatePhone,
  x6 as UpdateSecurityQuestion,
  _f as VerificationCodeInput,
  Vf as VerifyButton,
  L7 as VerifyEmailLink,
  x7 as VerifyEmailOTP,
  Xe as VerifyOTPButton,
  A7 as VerifyPasswordlessLoginEmail,
  T7 as VerifyPasswordlessLoginEmailOTP,
  E7 as VerifyPasswordlessLoginSMSOTP,
  R7 as VerifySMSOTP,
  ce as useLRAuth,
  re as useLoginRadiusSDK,
  ho as useTheme
};
