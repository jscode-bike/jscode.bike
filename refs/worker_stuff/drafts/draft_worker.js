!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).chai = e();
  }
})(function () {
  return (function i(s, a, c) {
    function u(t, e) {
      if (!a[t]) {
        if (!s[t]) {
          var n = "function" == typeof require && require;
          if (!e && n) return n(t, !0);
          if (f) return f(t, !0);
          var o = new Error("Cannot find module '" + t + "'");
          throw ((o.code = "MODULE_NOT_FOUND"), o);
        }
        var r = (a[t] = { exports: {} });
        s[t][0].call(
          r.exports,
          function (e) {
            return u(s[t][1][e] || e);
          },
          r,
          r.exports,
          i,
          s,
          a,
          c
        );
      }
      return a[t].exports;
    }
    for (
      var f = "function" == typeof require && require, e = 0;
      e < c.length;
      e++
    )
      u(c[e]);
    return u;
  })(
    {
      1: [
        function (e, t, n) {
          t.exports = e("./lib/chai");
        },
        { "./lib/chai": 2 },
      ],
      2: [
        function (e, t, n) {
          var o = [];
          (n.version = "4.2.0"), (n.AssertionError = e("assertion-error"));
          var r = e("./chai/utils");
          (n.use = function (e) {
            return ~o.indexOf(e) || (e(n, r), o.push(e)), n;
          }),
            (n.util = r);
          var i = e("./chai/config");
          n.config = i;
          var s = e("./chai/assertion");
          n.use(s);
          var a = e("./chai/core/assertions");
          n.use(a);
          var c = e("./chai/interface/expect");
          n.use(c);
          var u = e("./chai/interface/should");
          n.use(u);
          var f = e("./chai/interface/assert");
          n.use(f);
        },
        {
          "./chai/assertion": 3,
          "./chai/config": 4,
          "./chai/core/assertions": 5,
          "./chai/interface/assert": 6,
          "./chai/interface/expect": 7,
          "./chai/interface/should": 8,
          "./chai/utils": 22,
          "assertion-error": 33,
        },
      ],
      3: [
        function (e, t, n) {
          var l = e("./config");
          t.exports = function (e, c) {
            var u = e.AssertionError,
              f = c.flag;
            function r(e, t, n, o) {
              return (
                f(this, "ssfi", n || r),
                f(this, "lockSsfi", o),
                f(this, "object", e),
                f(this, "message", t),
                c.proxify(this)
              );
            }
            (e.Assertion = r),
              Object.defineProperty(r, "includeStack", {
                get: function () {
                  return (
                    console.warn(
                      "Assertion.includeStack is deprecated, use chai.config.includeStack instead."
                    ),
                    l.includeStack
                  );
                },
                set: function (e) {
                  console.warn(
                    "Assertion.includeStack is deprecated, use chai.config.includeStack instead."
                  ),
                    (l.includeStack = e);
                },
              }),
              Object.defineProperty(r, "showDiff", {
                get: function () {
                  return (
                    console.warn(
                      "Assertion.showDiff is deprecated, use chai.config.showDiff instead."
                    ),
                    l.showDiff
                  );
                },
                set: function (e) {
                  console.warn(
                    "Assertion.showDiff is deprecated, use chai.config.showDiff instead."
                  ),
                    (l.showDiff = e);
                },
              }),
              (r.addProperty = function (e, t) {
                c.addProperty(this.prototype, e, t);
              }),
              (r.addMethod = function (e, t) {
                c.addMethod(this.prototype, e, t);
              }),
              (r.addChainableMethod = function (e, t, n) {
                c.addChainableMethod(this.prototype, e, t, n);
              }),
              (r.overwriteProperty = function (e, t) {
                c.overwriteProperty(this.prototype, e, t);
              }),
              (r.overwriteMethod = function (e, t) {
                c.overwriteMethod(this.prototype, e, t);
              }),
              (r.overwriteChainableMethod = function (e, t, n) {
                c.overwriteChainableMethod(this.prototype, e, t, n);
              }),
              (r.prototype.assert = function (e, t, n, o, r, i) {
                var s = c.test(this, arguments);
                if (
                  (!1 !== i && (i = !0),
                  void 0 === o && void 0 === r && (i = !1),
                  !0 !== l.showDiff && (i = !1),
                  !s)
                ) {
                  t = c.getMessage(this, arguments);
                  var a = c.getActual(this, arguments);
                  throw new u(
                    t,
                    { actual: a, expected: o, showDiff: i },
                    l.includeStack ? this.assert : f(this, "ssfi")
                  );
                }
              }),
              Object.defineProperty(r.prototype, "_obj", {
                get: function () {
                  return f(this, "object");
                },
                set: function (e) {
                  f(this, "object", e);
                },
              });
          };
        },
        { "./config": 4 },
      ],
      4: [
        function (e, t, n) {
          t.exports = {
            includeStack: !1,
            showDiff: !0,
            truncateThreshold: 40,
            useProxy: !0,
            proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"],
          };
        },
        {},
      ],
      5: [
        function (e, t, n) {
          t.exports = function (e, g) {
            var b = e.Assertion,
              w = e.AssertionError,
              m = g.flag;
            function t(e, t) {
              t && m(this, "message", t), (e = e.toLowerCase());
              var n = m(this, "object"),
                o = ~["a", "e", "i", "o", "u"].indexOf(e.charAt(0))
                  ? "an "
                  : "a ";
              this.assert(
                e === g.type(n).toLowerCase(),
                "expected #{this} to be " + o + e,
                "expected #{this} not to be " + o + e
              );
            }
            function d(e, t) {
              return (g.isNaN(e) && g.isNaN(t)) || e === t;
            }
            function n() {
              m(this, "contains", !0);
            }
            function o(n, e) {
              e && m(this, "message", e);
              var o = m(this, "object"),
                t = g.type(o).toLowerCase(),
                r = m(this, "message"),
                i = m(this, "negate"),
                s = m(this, "ssfi"),
                a = m(this, "deep"),
                c = a ? "deep " : "";
              r = r ? r + ": " : "";
              var u = !1;
              switch (t) {
                case "string":
                  u = -1 !== o.indexOf(n);
                  break;
                case "weakset":
                  if (a)
                    throw new w(
                      r + "unable to use .deep.include with WeakSet",
                      void 0,
                      s
                    );
                  u = o.has(n);
                  break;
                case "map":
                  var f = a ? g.eql : d;
                  o.forEach(function (e) {
                    u = u || f(e, n);
                  });
                  break;
                case "set":
                  a
                    ? o.forEach(function (e) {
                        u = u || g.eql(e, n);
                      })
                    : (u = o.has(n));
                  break;
                case "array":
                  u = a
                    ? o.some(function (e) {
                        return g.eql(e, n);
                      })
                    : -1 !== o.indexOf(n);
                  break;
                default:
                  if (n !== Object(n))
                    throw new w(
                      r +
                        "object tested must be an array, a map, an object, a set, a string, or a weakset, but " +
                        t +
                        " given",
                      void 0,
                      s
                    );
                  var l = Object.keys(n),
                    p = null,
                    h = 0;
                  if (
                    (l.forEach(function (e) {
                      var t = new b(o);
                      if (
                        (g.transferFlags(this, t, !0),
                        m(t, "lockSsfi", !0),
                        i && 1 !== l.length)
                      )
                        try {
                          t.property(e, n[e]);
                        } catch (e) {
                          if (!g.checkError.compatibleConstructor(e, w))
                            throw e;
                          null === p && (p = e), h++;
                        }
                      else t.property(e, n[e]);
                    }, this),
                    i && 1 < l.length && h === l.length)
                  )
                    throw p;
                  return;
              }
              this.assert(
                u,
                "expected #{this} to " + c + "include " + g.inspect(n),
                "expected #{this} to not " + c + "include " + g.inspect(n)
              );
            }
            function r() {
              var e = m(this, "object"),
                t = g.type(e);
              this.assert(
                "Arguments" === t,
                "expected #{this} to be arguments but got " + t,
                "expected #{this} to not be arguments"
              );
            }
            function i(e, t) {
              t && m(this, "message", t);
              var n = m(this, "object");
              if (m(this, "deep")) {
                var o = m(this, "lockSsfi");
                m(this, "lockSsfi", !0), this.eql(e), m(this, "lockSsfi", o);
              } else
                this.assert(
                  e === n,
                  "expected #{this} to equal #{exp}",
                  "expected #{this} to not equal #{exp}",
                  e,
                  this._obj,
                  !0
                );
            }
            function s(e, t) {
              t && m(this, "message", t),
                this.assert(
                  g.eql(e, m(this, "object")),
                  "expected #{this} to deeply equal #{exp}",
                  "expected #{this} to not deeply equal #{exp}",
                  e,
                  this._obj,
                  !0
                );
            }
            function a(e, t) {
              t && m(this, "message", t);
              var n,
                o = m(this, "object"),
                r = m(this, "doLength"),
                i = m(this, "message"),
                s = i ? i + ": " : "",
                a = m(this, "ssfi"),
                c = g.type(o).toLowerCase(),
                u = g.type(e).toLowerCase(),
                f = !0;
              if (
                (r &&
                  "map" !== c &&
                  "set" !== c &&
                  new b(o, i, a, !0).to.have.property("length"),
                r || "date" !== c || "date" === u)
              )
                if ("number" === u || (!r && "number" !== c))
                  if (r || "date" === c || "number" === c) f = !1;
                  else {
                    n =
                      s +
                      "expected " +
                      ("string" === c ? "'" + o + "'" : o) +
                      " to be a number or a date";
                  }
                else n = s + "the argument to above must be a number";
              else n = s + "the argument to above must be a date";
              if (f) throw new w(n, void 0, a);
              if (r) {
                var l,
                  p = "length";
                "map" === c || "set" === c
                  ? ((p = "size"), (l = o.size))
                  : (l = o.length),
                  this.assert(
                    e < l,
                    "expected #{this} to have a " +
                      p +
                      " above #{exp} but got #{act}",
                    "expected #{this} to not have a " + p + " above #{exp}",
                    e,
                    l
                  );
              } else
                this.assert(
                  e < o,
                  "expected #{this} to be above #{exp}",
                  "expected #{this} to be at most #{exp}",
                  e
                );
            }
            function c(e, t) {
              t && m(this, "message", t);
              var n,
                o = m(this, "object"),
                r = m(this, "doLength"),
                i = m(this, "message"),
                s = i ? i + ": " : "",
                a = m(this, "ssfi"),
                c = g.type(o).toLowerCase(),
                u = g.type(e).toLowerCase(),
                f = !0;
              if (
                (r &&
                  "map" !== c &&
                  "set" !== c &&
                  new b(o, i, a, !0).to.have.property("length"),
                r || "date" !== c || "date" === u)
              )
                if ("number" === u || (!r && "number" !== c))
                  if (r || "date" === c || "number" === c) f = !1;
                  else {
                    n =
                      s +
                      "expected " +
                      ("string" === c ? "'" + o + "'" : o) +
                      " to be a number or a date";
                  }
                else n = s + "the argument to least must be a number";
              else n = s + "the argument to least must be a date";
              if (f) throw new w(n, void 0, a);
              if (r) {
                var l,
                  p = "length";
                "map" === c || "set" === c
                  ? ((p = "size"), (l = o.size))
                  : (l = o.length),
                  this.assert(
                    e <= l,
                    "expected #{this} to have a " +
                      p +
                      " at least #{exp} but got #{act}",
                    "expected #{this} to have a " + p + " below #{exp}",
                    e,
                    l
                  );
              } else
                this.assert(
                  e <= o,
                  "expected #{this} to be at least #{exp}",
                  "expected #{this} to be below #{exp}",
                  e
                );
            }
            function u(e, t) {
              t && m(this, "message", t);
              var n,
                o = m(this, "object"),
                r = m(this, "doLength"),
                i = m(this, "message"),
                s = i ? i + ": " : "",
                a = m(this, "ssfi"),
                c = g.type(o).toLowerCase(),
                u = g.type(e).toLowerCase(),
                f = !0;
              if (
                (r &&
                  "map" !== c &&
                  "set" !== c &&
                  new b(o, i, a, !0).to.have.property("length"),
                r || "date" !== c || "date" === u)
              )
                if ("number" === u || (!r && "number" !== c))
                  if (r || "date" === c || "number" === c) f = !1;
                  else {
                    n =
                      s +
                      "expected " +
                      ("string" === c ? "'" + o + "'" : o) +
                      " to be a number or a date";
                  }
                else n = s + "the argument to below must be a number";
              else n = s + "the argument to below must be a date";
              if (f) throw new w(n, void 0, a);
              if (r) {
                var l,
                  p = "length";
                "map" === c || "set" === c
                  ? ((p = "size"), (l = o.size))
                  : (l = o.length),
                  this.assert(
                    l < e,
                    "expected #{this} to have a " +
                      p +
                      " below #{exp} but got #{act}",
                    "expected #{this} to not have a " + p + " below #{exp}",
                    e,
                    l
                  );
              } else
                this.assert(
                  o < e,
                  "expected #{this} to be below #{exp}",
                  "expected #{this} to be at least #{exp}",
                  e
                );
            }
            function f(e, t) {
              t && m(this, "message", t);
              var n,
                o = m(this, "object"),
                r = m(this, "doLength"),
                i = m(this, "message"),
                s = i ? i + ": " : "",
                a = m(this, "ssfi"),
                c = g.type(o).toLowerCase(),
                u = g.type(e).toLowerCase(),
                f = !0;
              if (
                (r &&
                  "map" !== c &&
                  "set" !== c &&
                  new b(o, i, a, !0).to.have.property("length"),
                r || "date" !== c || "date" === u)
              )
                if ("number" === u || (!r && "number" !== c))
                  if (r || "date" === c || "number" === c) f = !1;
                  else {
                    n =
                      s +
                      "expected " +
                      ("string" === c ? "'" + o + "'" : o) +
                      " to be a number or a date";
                  }
                else n = s + "the argument to most must be a number";
              else n = s + "the argument to most must be a date";
              if (f) throw new w(n, void 0, a);
              if (r) {
                var l,
                  p = "length";
                "map" === c || "set" === c
                  ? ((p = "size"), (l = o.size))
                  : (l = o.length),
                  this.assert(
                    l <= e,
                    "expected #{this} to have a " +
                      p +
                      " at most #{exp} but got #{act}",
                    "expected #{this} to have a " + p + " above #{exp}",
                    e,
                    l
                  );
              } else
                this.assert(
                  o <= e,
                  "expected #{this} to be at most #{exp}",
                  "expected #{this} to be above #{exp}",
                  e
                );
            }
            function l(t, e) {
              e && m(this, "message", e);
              var n = m(this, "object"),
                o = m(this, "ssfi"),
                r = m(this, "message");
              try {
                var i = n instanceof t;
              } catch (e) {
                if (e instanceof TypeError)
                  throw new w(
                    (r = r ? r + ": " : "") +
                      "The instanceof assertion needs a constructor but " +
                      g.type(t) +
                      " was given.",
                    void 0,
                    o
                  );
                throw e;
              }
              var s = g.getName(t);
              null === s && (s = "an unnamed constructor"),
                this.assert(
                  i,
                  "expected #{this} to be an instance of " + s,
                  "expected #{this} to not be an instance of " + s
                );
            }
            function p(e, t, n) {
              n && m(this, "message", n);
              var o = m(this, "nested"),
                r = m(this, "own"),
                i = m(this, "message"),
                s = m(this, "object"),
                a = m(this, "ssfi"),
                c = typeof e;
              if (((i = i ? i + ": " : ""), o)) {
                if ("string" !== c)
                  throw new w(
                    i +
                      "the argument to property must be a string when using nested syntax",
                    void 0,
                    a
                  );
              } else if ("string" !== c && "number" !== c && "symbol" !== c)
                throw new w(
                  i +
                    "the argument to property must be a string, number, or symbol",
                  void 0,
                  a
                );
              if (o && r)
                throw new w(
                  i + 'The "nested" and "own" flags cannot be combined.',
                  void 0,
                  a
                );
              if (null == s)
                throw new w(
                  i + "Target cannot be null or undefined.",
                  void 0,
                  a
                );
              var u,
                f = m(this, "deep"),
                l = m(this, "negate"),
                p = o ? g.getPathInfo(s, e) : null,
                h = o ? p.value : s[e],
                d = "";
              f && (d += "deep "),
                r && (d += "own "),
                o && (d += "nested "),
                (d += "property "),
                (u = r
                  ? Object.prototype.hasOwnProperty.call(s, e)
                  : o
                  ? p.exists
                  : g.hasProperty(s, e)),
                (l && 1 !== arguments.length) ||
                  this.assert(
                    u,
                    "expected #{this} to have " + d + g.inspect(e),
                    "expected #{this} to not have " + d + g.inspect(e)
                  ),
                1 < arguments.length &&
                  this.assert(
                    u && (f ? g.eql(t, h) : t === h),
                    "expected #{this} to have " +
                      d +
                      g.inspect(e) +
                      " of #{exp}, but got #{act}",
                    "expected #{this} to not have " +
                      d +
                      g.inspect(e) +
                      " of #{act}",
                    t,
                    h
                  ),
                m(this, "object", h);
            }
            function h(e, t, n) {
              m(this, "own", !0), p.apply(this, arguments);
            }
            function y(e, t, n) {
              "string" == typeof t && ((n = t), (t = null)),
                n && m(this, "message", n);
              var o = m(this, "object"),
                r = Object.getOwnPropertyDescriptor(Object(o), e);
              r && t
                ? this.assert(
                    g.eql(t, r),
                    "expected the own property descriptor for " +
                      g.inspect(e) +
                      " on #{this} to match " +
                      g.inspect(t) +
                      ", got " +
                      g.inspect(r),
                    "expected the own property descriptor for " +
                      g.inspect(e) +
                      " on #{this} to not match " +
                      g.inspect(t),
                    t,
                    r,
                    !0
                  )
                : this.assert(
                    r,
                    "expected #{this} to have an own property descriptor for " +
                      g.inspect(e),
                    "expected #{this} to not have an own property descriptor for " +
                      g.inspect(e)
                  ),
                m(this, "object", r);
            }
            function v() {
              m(this, "doLength", !0);
            }
            function x(e, t) {
              t && m(this, "message", t);
              var n,
                o = m(this, "object"),
                r = g.type(o).toLowerCase(),
                i = m(this, "message"),
                s = m(this, "ssfi"),
                a = "length";
              switch (r) {
                case "map":
                case "set":
                  (a = "size"), (n = o.size);
                  break;
                default:
                  new b(o, i, s, !0).to.have.property("length"), (n = o.length);
              }
              this.assert(
                n == e,
                "expected #{this} to have a " + a + " of #{exp} but got #{act}",
                "expected #{this} to not have a " + a + " of #{act}",
                e,
                n
              );
            }
            function O(e, t) {
              t && m(this, "message", t);
              var n = m(this, "object");
              this.assert(
                e.exec(n),
                "expected #{this} to match " + e,
                "expected #{this} not to match " + e
              );
            }
            function j(e) {
              var t,
                n,
                o = m(this, "object"),
                r = g.type(o),
                i = g.type(e),
                s = m(this, "ssfi"),
                a = m(this, "deep"),
                c = "",
                u = !0,
                f = m(this, "message"),
                l =
                  (f = f ? f + ": " : "") +
                  "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
              if ("Map" === r || "Set" === r)
                (c = a ? "deeply " : ""),
                  (n = []),
                  o.forEach(function (e, t) {
                    n.push(t);
                  }),
                  "Array" !== i && (e = Array.prototype.slice.call(arguments));
              else {
                switch (((n = g.getOwnEnumerableProperties(o)), i)) {
                  case "Array":
                    if (1 < arguments.length) throw new w(l, void 0, s);
                    break;
                  case "Object":
                    if (1 < arguments.length) throw new w(l, void 0, s);
                    e = Object.keys(e);
                    break;
                  default:
                    e = Array.prototype.slice.call(arguments);
                }
                e = e.map(function (e) {
                  return "symbol" == typeof e ? e : String(e);
                });
              }
              if (!e.length) throw new w(f + "keys required", void 0, s);
              var p = e.length,
                h = m(this, "any"),
                d = m(this, "all"),
                y = e;
              if (
                (h || d || (d = !0),
                h &&
                  (u = y.some(function (t) {
                    return n.some(function (e) {
                      return a ? g.eql(t, e) : t === e;
                    });
                  })),
                d &&
                  ((u = y.every(function (t) {
                    return n.some(function (e) {
                      return a ? g.eql(t, e) : t === e;
                    });
                  })),
                  m(this, "contains") || (u = u && e.length == n.length)),
                1 < p)
              ) {
                var b = (e = e.map(function (e) {
                  return g.inspect(e);
                })).pop();
                d && (t = e.join(", ") + ", and " + b),
                  h && (t = e.join(", ") + ", or " + b);
              } else t = g.inspect(e[0]);
              (t = (1 < p ? "keys " : "key ") + t),
                (t = (m(this, "contains") ? "contain " : "have ") + t),
                this.assert(
                  u,
                  "expected #{this} to " + c + t,
                  "expected #{this} to not " + c + t,
                  y.slice(0).sort(g.compareByInspect),
                  n.sort(g.compareByInspect),
                  !0
                );
            }
            function M(e, t, n) {
              n && m(this, "message", n);
              var o,
                r = m(this, "object"),
                i = m(this, "ssfi"),
                s = m(this, "message"),
                a = m(this, "negate") || !1;
              new b(r, s, i, !0).is.a("function"),
                (e instanceof RegExp || "string" == typeof e) &&
                  ((t = e), (e = null));
              try {
                r();
              } catch (e) {
                o = e;
              }
              var c = void 0 === e && void 0 === t,
                u = Boolean(e && t),
                f = !1,
                l = !1;
              if (c || (!c && !a)) {
                var p = "an error";
                e instanceof Error
                  ? (p = "#{exp}")
                  : e && (p = g.checkError.getConstructorName(e)),
                  this.assert(
                    o,
                    "expected #{this} to throw " + p,
                    "expected #{this} to not throw an error but #{act} was thrown",
                    e && e.toString(),
                    o instanceof Error
                      ? o.toString()
                      : "string" == typeof o
                      ? o
                      : o && g.checkError.getConstructorName(o)
                  );
              }
              if (e && o) {
                if (e instanceof Error)
                  g.checkError.compatibleInstance(o, e) === a &&
                    (u && a
                      ? (f = !0)
                      : this.assert(
                          a,
                          "expected #{this} to throw #{exp} but #{act} was thrown",
                          "expected #{this} to not throw #{exp}" +
                            (o && !a ? " but #{act} was thrown" : ""),
                          e.toString(),
                          o.toString()
                        ));
                g.checkError.compatibleConstructor(o, e) === a &&
                  (u && a
                    ? (f = !0)
                    : this.assert(
                        a,
                        "expected #{this} to throw #{exp} but #{act} was thrown",
                        "expected #{this} to not throw #{exp}" +
                          (o ? " but #{act} was thrown" : ""),
                        e instanceof Error
                          ? e.toString()
                          : e && g.checkError.getConstructorName(e),
                        o instanceof Error
                          ? o.toString()
                          : o && g.checkError.getConstructorName(o)
                      ));
              }
              if (o && null != t) {
                var h = "including";
                t instanceof RegExp && (h = "matching"),
                  g.checkError.compatibleMessage(o, t) === a &&
                    (u && a
                      ? (l = !0)
                      : this.assert(
                          a,
                          "expected #{this} to throw error " +
                            h +
                            " #{exp} but got #{act}",
                          "expected #{this} to throw error not " +
                            h +
                            " #{exp}",
                          t,
                          g.checkError.getMessage(o)
                        ));
              }
              f &&
                l &&
                this.assert(
                  a,
                  "expected #{this} to throw #{exp} but #{act} was thrown",
                  "expected #{this} to not throw #{exp}" +
                    (o ? " but #{act} was thrown" : ""),
                  e instanceof Error
                    ? e.toString()
                    : e && g.checkError.getConstructorName(e),
                  o instanceof Error
                    ? o.toString()
                    : o && g.checkError.getConstructorName(o)
                ),
                m(this, "object", o);
            }
            function P(e, t) {
              t && m(this, "message", t);
              var n = m(this, "object"),
                o = m(this, "itself"),
                r = "function" != typeof n || o ? n[e] : n.prototype[e];
              this.assert(
                "function" == typeof r,
                "expected #{this} to respond to " + g.inspect(e),
                "expected #{this} to not respond to " + g.inspect(e)
              );
            }
            function N(e, t) {
              t && m(this, "message", t);
              var n = e(m(this, "object"));
              this.assert(
                n,
                "expected #{this} to satisfy " + g.objDisplay(e),
                "expected #{this} to not satisfy" + g.objDisplay(e),
                !m(this, "negate"),
                n
              );
            }
            function S(e, t, n) {
              n && m(this, "message", n);
              var o = m(this, "object"),
                r = m(this, "message"),
                i = m(this, "ssfi");
              if (
                (new b(o, r, i, !0).is.a("number"),
                "number" != typeof e || "number" != typeof t)
              )
                throw new w(
                  (r = r ? r + ": " : "") +
                    "the arguments to closeTo or approximately must be numbers",
                  void 0,
                  i
                );
              this.assert(
                Math.abs(o - e) <= t,
                "expected #{this} to be close to " + e + " +/- " + t,
                "expected #{this} not to be close to " + e + " +/- " + t
              );
            }
            function E(e, t, n) {
              n && m(this, "message", n);
              var o,
                r = m(this, "object"),
                i = m(this, "message"),
                s = m(this, "ssfi");
              new b(r, i, s, !0).is.a("function"),
                t
                  ? (new b(e, i, s, !0).to.have.property(t), (o = e[t]))
                  : (new b(e, i, s, !0).is.a("function"), (o = e())),
                r();
              var a = null == t ? e() : e[t],
                c = null == t ? o : "." + t;
              m(this, "deltaMsgObj", c),
                m(this, "initialDeltaValue", o),
                m(this, "finalDeltaValue", a),
                m(this, "deltaBehavior", "change"),
                m(this, "realDelta", a !== o),
                this.assert(
                  o !== a,
                  "expected " + c + " to change",
                  "expected " + c + " to not change"
                );
            }
            function k(e, t, n) {
              n && m(this, "message", n);
              var o,
                r = m(this, "object"),
                i = m(this, "message"),
                s = m(this, "ssfi");
              new b(r, i, s, !0).is.a("function"),
                t
                  ? (new b(e, i, s, !0).to.have.property(t), (o = e[t]))
                  : (new b(e, i, s, !0).is.a("function"), (o = e())),
                new b(o, i, s, !0).is.a("number"),
                r();
              var a = null == t ? e() : e[t],
                c = null == t ? o : "." + t;
              m(this, "deltaMsgObj", c),
                m(this, "initialDeltaValue", o),
                m(this, "finalDeltaValue", a),
                m(this, "deltaBehavior", "increase"),
                m(this, "realDelta", a - o),
                this.assert(
                  0 < a - o,
                  "expected " + c + " to increase",
                  "expected " + c + " to not increase"
                );
            }
            function A(e, t, n) {
              n && m(this, "message", n);
              var o,
                r = m(this, "object"),
                i = m(this, "message"),
                s = m(this, "ssfi");
              new b(r, i, s, !0).is.a("function"),
                t
                  ? (new b(e, i, s, !0).to.have.property(t), (o = e[t]))
                  : (new b(e, i, s, !0).is.a("function"), (o = e())),
                new b(o, i, s, !0).is.a("number"),
                r();
              var a = null == t ? e() : e[t],
                c = null == t ? o : "." + t;
              m(this, "deltaMsgObj", c),
                m(this, "initialDeltaValue", o),
                m(this, "finalDeltaValue", a),
                m(this, "deltaBehavior", "decrease"),
                m(this, "realDelta", o - a),
                this.assert(
                  a - o < 0,
                  "expected " + c + " to decrease",
                  "expected " + c + " to not decrease"
                );
            }
            [
              "to",
              "be",
              "been",
              "is",
              "and",
              "has",
              "have",
              "with",
              "that",
              "which",
              "at",
              "of",
              "same",
              "but",
              "does",
              "still",
            ].forEach(function (e) {
              b.addProperty(e);
            }),
              b.addProperty("not", function () {
                m(this, "negate", !0);
              }),
              b.addProperty("deep", function () {
                m(this, "deep", !0);
              }),
              b.addProperty("nested", function () {
                m(this, "nested", !0);
              }),
              b.addProperty("own", function () {
                m(this, "own", !0);
              }),
              b.addProperty("ordered", function () {
                m(this, "ordered", !0);
              }),
              b.addProperty("any", function () {
                m(this, "any", !0), m(this, "all", !1);
              }),
              b.addProperty("all", function () {
                m(this, "all", !0), m(this, "any", !1);
              }),
              b.addChainableMethod("an", t),
              b.addChainableMethod("a", t),
              b.addChainableMethod("include", o, n),
              b.addChainableMethod("contain", o, n),
              b.addChainableMethod("contains", o, n),
              b.addChainableMethod("includes", o, n),
              b.addProperty("ok", function () {
                this.assert(
                  m(this, "object"),
                  "expected #{this} to be truthy",
                  "expected #{this} to be falsy"
                );
              }),
              b.addProperty("true", function () {
                this.assert(
                  !0 === m(this, "object"),
                  "expected #{this} to be true",
                  "expected #{this} to be false",
                  !m(this, "negate")
                );
              }),
              b.addProperty("false", function () {
                this.assert(
                  !1 === m(this, "object"),
                  "expected #{this} to be false",
                  "expected #{this} to be true",
                  !!m(this, "negate")
                );
              }),
              b.addProperty("null", function () {
                this.assert(
                  null === m(this, "object"),
                  "expected #{this} to be null",
                  "expected #{this} not to be null"
                );
              }),
              b.addProperty("undefined", function () {
                this.assert(
                  void 0 === m(this, "object"),
                  "expected #{this} to be undefined",
                  "expected #{this} not to be undefined"
                );
              }),
              b.addProperty("NaN", function () {
                this.assert(
                  g.isNaN(m(this, "object")),
                  "expected #{this} to be NaN",
                  "expected #{this} not to be NaN"
                );
              }),
              b.addProperty("exist", function () {
                var e = m(this, "object");
                this.assert(
                  null != e,
                  "expected #{this} to exist",
                  "expected #{this} to not exist"
                );
              }),
              b.addProperty("empty", function () {
                var e,
                  t = m(this, "object"),
                  n = m(this, "ssfi"),
                  o = m(this, "message");
                switch (((o = o ? o + ": " : ""), g.type(t).toLowerCase())) {
                  case "array":
                  case "string":
                    e = t.length;
                    break;
                  case "map":
                  case "set":
                    e = t.size;
                    break;
                  case "weakmap":
                  case "weakset":
                    throw new w(
                      o + ".empty was passed a weak collection",
                      void 0,
                      n
                    );
                  case "function":
                    var r = o + ".empty was passed a function " + g.getName(t);
                    throw new w(r.trim(), void 0, n);
                  default:
                    if (t !== Object(t))
                      throw new w(
                        o +
                          ".empty was passed non-string primitive " +
                          g.inspect(t),
                        void 0,
                        n
                      );
                    e = Object.keys(t).length;
                }
                this.assert(
                  0 === e,
                  "expected #{this} to be empty",
                  "expected #{this} not to be empty"
                );
              }),
              b.addProperty("arguments", r),
              b.addProperty("Arguments", r),
              b.addMethod("equal", i),
              b.addMethod("equals", i),
              b.addMethod("eq", i),
              b.addMethod("eql", s),
              b.addMethod("eqls", s),
              b.addMethod("above", a),
              b.addMethod("gt", a),
              b.addMethod("greaterThan", a),
              b.addMethod("least", c),
              b.addMethod("gte", c),
              b.addMethod("below", u),
              b.addMethod("lt", u),
              b.addMethod("lessThan", u),
              b.addMethod("most", f),
              b.addMethod("lte", f),
              b.addMethod("within", function (e, t, n) {
                n && m(this, "message", n);
                var o,
                  r = m(this, "object"),
                  i = m(this, "doLength"),
                  s = m(this, "message"),
                  a = s ? s + ": " : "",
                  c = m(this, "ssfi"),
                  u = g.type(r).toLowerCase(),
                  f = g.type(e).toLowerCase(),
                  l = g.type(t).toLowerCase(),
                  p = !0,
                  h =
                    "date" === f && "date" === l
                      ? e.toUTCString() + ".." + t.toUTCString()
                      : e + ".." + t;
                if (
                  (i &&
                    "map" !== u &&
                    "set" !== u &&
                    new b(r, s, c, !0).to.have.property("length"),
                  i || "date" !== u || ("date" === f && "date" === l))
                )
                  if (
                    ("number" === f && "number" === l) ||
                    (!i && "number" !== u)
                  )
                    if (i || "date" === u || "number" === u) p = !1;
                    else {
                      o =
                        a +
                        "expected " +
                        ("string" === u ? "'" + r + "'" : r) +
                        " to be a number or a date";
                    }
                  else o = a + "the arguments to within must be numbers";
                else o = a + "the arguments to within must be dates";
                if (p) throw new w(o, void 0, c);
                if (i) {
                  var d,
                    y = "length";
                  "map" === u || "set" === u
                    ? ((y = "size"), (d = r.size))
                    : (d = r.length),
                    this.assert(
                      e <= d && d <= t,
                      "expected #{this} to have a " + y + " within " + h,
                      "expected #{this} to not have a " + y + " within " + h
                    );
                } else this.assert(e <= r && r <= t, "expected #{this} to be within " + h, "expected #{this} to not be within " + h);
              }),
              b.addMethod("instanceof", l),
              b.addMethod("instanceOf", l),
              b.addMethod("property", p),
              b.addMethod("ownProperty", h),
              b.addMethod("haveOwnProperty", h),
              b.addMethod("ownPropertyDescriptor", y),
              b.addMethod("haveOwnPropertyDescriptor", y),
              b.addChainableMethod("length", x, v),
              b.addChainableMethod("lengthOf", x, v),
              b.addMethod("match", O),
              b.addMethod("matches", O),
              b.addMethod("string", function (e, t) {
                t && m(this, "message", t);
                var n = m(this, "object"),
                  o = m(this, "message"),
                  r = m(this, "ssfi");
                new b(n, o, r, !0).is.a("string"),
                  this.assert(
                    ~n.indexOf(e),
                    "expected #{this} to contain " + g.inspect(e),
                    "expected #{this} to not contain " + g.inspect(e)
                  );
              }),
              b.addMethod("keys", j),
              b.addMethod("key", j),
              b.addMethod("throw", M),
              b.addMethod("throws", M),
              b.addMethod("Throw", M),
              b.addMethod("respondTo", P),
              b.addMethod("respondsTo", P),
              b.addProperty("itself", function () {
                m(this, "itself", !0);
              }),
              b.addMethod("satisfy", N),
              b.addMethod("satisfies", N),
              b.addMethod("closeTo", S),
              b.addMethod("approximately", S),
              b.addMethod("members", function (e, t) {
                t && m(this, "message", t);
                var n = m(this, "object"),
                  o = m(this, "message"),
                  r = m(this, "ssfi");
                new b(n, o, r, !0).to.be.an("array"),
                  new b(e, o, r, !0).to.be.an("array");
                var i,
                  s,
                  a,
                  c = m(this, "contains"),
                  u = m(this, "ordered");
                c
                  ? ((s =
                      "expected #{this} to be " +
                      (i = u ? "an ordered superset" : "a superset") +
                      " of #{exp}"),
                    (a = "expected #{this} to not be " + i + " of #{exp}"))
                  : ((s =
                      "expected #{this} to have the same " +
                      (i = u ? "ordered members" : "members") +
                      " as #{exp}"),
                    (a =
                      "expected #{this} to not have the same " +
                      i +
                      " as #{exp}"));
                var f = m(this, "deep") ? g.eql : void 0;
                this.assert(
                  (function (e, o, r, i, s) {
                    if (!i) {
                      if (e.length !== o.length) return !1;
                      o = o.slice();
                    }
                    return e.every(function (n, e) {
                      if (s) return r ? r(n, o[e]) : n === o[e];
                      if (!r) {
                        var t = o.indexOf(n);
                        return -1 !== t && (i || o.splice(t, 1), !0);
                      }
                      return o.some(function (e, t) {
                        return !!r(n, e) && (i || o.splice(t, 1), !0);
                      });
                    });
                  })(e, n, f, c, u),
                  s,
                  a,
                  e,
                  n,
                  !0
                );
              }),
              b.addMethod("oneOf", function (e, t) {
                t && m(this, "message", t);
                var n = m(this, "object"),
                  o = m(this, "message"),
                  r = m(this, "ssfi");
                new b(e, o, r, !0).to.be.an("array"),
                  this.assert(
                    -1 < e.indexOf(n),
                    "expected #{this} to be one of #{exp}",
                    "expected #{this} to not be one of #{exp}",
                    e,
                    n
                  );
              }),
              b.addMethod("change", E),
              b.addMethod("changes", E),
              b.addMethod("increase", k),
              b.addMethod("increases", k),
              b.addMethod("decrease", A),
              b.addMethod("decreases", A),
              b.addMethod("by", function (e, t) {
                t && m(this, "message", t);
                var n,
                  o = m(this, "deltaMsgObj"),
                  r = m(this, "initialDeltaValue"),
                  i = m(this, "finalDeltaValue"),
                  s = m(this, "deltaBehavior"),
                  a = m(this, "realDelta");
                (n =
                  "change" === s
                    ? Math.abs(i - r) === Math.abs(e)
                    : a === Math.abs(e)),
                  this.assert(
                    n,
                    "expected " + o + " to " + s + " by " + e,
                    "expected " + o + " to not " + s + " by " + e
                  );
              }),
              b.addProperty("extensible", function () {
                var e = m(this, "object"),
                  t = e === Object(e) && Object.isExtensible(e);
                this.assert(
                  t,
                  "expected #{this} to be extensible",
                  "expected #{this} to not be extensible"
                );
              }),
              b.addProperty("sealed", function () {
                var e = m(this, "object"),
                  t = e !== Object(e) || Object.isSealed(e);
                this.assert(
                  t,
                  "expected #{this} to be sealed",
                  "expected #{this} to not be sealed"
                );
              }),
              b.addProperty("frozen", function () {
                var e = m(this, "object"),
                  t = e !== Object(e) || Object.isFrozen(e);
                this.assert(
                  t,
                  "expected #{this} to be frozen",
                  "expected #{this} to not be frozen"
                );
              }),
              b.addProperty("finite", function (e) {
                var t = m(this, "object");
                this.assert(
                  "number" == typeof t && isFinite(t),
                  "expected #{this} to be a finite number",
                  "expected #{this} to not be a finite number"
                );
              });
          };
        },
        {},
      ],
      6: [
        function (e, t, n) {
          t.exports = function (s, a) {
            var c = s.Assertion,
              u = a.flag,
              f = (s.assert = function (e, t) {
                new c(null, null, s.assert, !0).assert(
                  e,
                  t,
                  "[ negation message unavailable ]"
                );
              });
            (f.fail = function (e, t, n, o) {
              throw (
                (arguments.length < 2 && ((n = e), (e = void 0)),
                (n = n || "assert.fail()"),
                new s.AssertionError(
                  n,
                  { actual: e, expected: t, operator: o },
                  f.fail
                ))
              );
            }),
              (f.isOk = function (e, t) {
                new c(e, t, f.isOk, !0).is.ok;
              }),
              (f.isNotOk = function (e, t) {
                new c(e, t, f.isNotOk, !0).is.not.ok;
              }),
              (f.equal = function (e, t, n) {
                var o = new c(e, n, f.equal, !0);
                o.assert(
                  t == u(o, "object"),
                  "expected #{this} to equal #{exp}",
                  "expected #{this} to not equal #{act}",
                  t,
                  e,
                  !0
                );
              }),
              (f.notEqual = function (e, t, n) {
                var o = new c(e, n, f.notEqual, !0);
                o.assert(
                  t != u(o, "object"),
                  "expected #{this} to not equal #{exp}",
                  "expected #{this} to equal #{act}",
                  t,
                  e,
                  !0
                );
              }),
              (f.strictEqual = function (e, t, n) {
                new c(e, n, f.strictEqual, !0).to.equal(t);
              }),
              (f.notStrictEqual = function (e, t, n) {
                new c(e, n, f.notStrictEqual, !0).to.not.equal(t);
              }),
              (f.deepEqual = f.deepStrictEqual = function (e, t, n) {
                new c(e, n, f.deepEqual, !0).to.eql(t);
              }),
              (f.notDeepEqual = function (e, t, n) {
                new c(e, n, f.notDeepEqual, !0).to.not.eql(t);
              }),
              (f.isAbove = function (e, t, n) {
                new c(e, n, f.isAbove, !0).to.be.above(t);
              }),
              (f.isAtLeast = function (e, t, n) {
                new c(e, n, f.isAtLeast, !0).to.be.least(t);
              }),
              (f.isBelow = function (e, t, n) {
                new c(e, n, f.isBelow, !0).to.be.below(t);
              }),
              (f.isAtMost = function (e, t, n) {
                new c(e, n, f.isAtMost, !0).to.be.most(t);
              }),
              (f.isTrue = function (e, t) {
                new c(e, t, f.isTrue, !0).is.true;
              }),
              (f.isNotTrue = function (e, t) {
                new c(e, t, f.isNotTrue, !0).to.not.equal(!0);
              }),
              (f.isFalse = function (e, t) {
                new c(e, t, f.isFalse, !0).is.false;
              }),
              (f.isNotFalse = function (e, t) {
                new c(e, t, f.isNotFalse, !0).to.not.equal(!1);
              }),
              (f.isNull = function (e, t) {
                new c(e, t, f.isNull, !0).to.equal(null);
              }),
              (f.isNotNull = function (e, t) {
                new c(e, t, f.isNotNull, !0).to.not.equal(null);
              }),
              (f.isNaN = function (e, t) {
                new c(e, t, f.isNaN, !0).to.be.NaN;
              }),
              (f.isNotNaN = function (e, t) {
                new c(e, t, f.isNotNaN, !0).not.to.be.NaN;
              }),
              (f.exists = function (e, t) {
                new c(e, t, f.exists, !0).to.exist;
              }),
              (f.notExists = function (e, t) {
                new c(e, t, f.notExists, !0).to.not.exist;
              }),
              (f.isUndefined = function (e, t) {
                new c(e, t, f.isUndefined, !0).to.equal(void 0);
              }),
              (f.isDefined = function (e, t) {
                new c(e, t, f.isDefined, !0).to.not.equal(void 0);
              }),
              (f.isFunction = function (e, t) {
                new c(e, t, f.isFunction, !0).to.be.a("function");
              }),
              (f.isNotFunction = function (e, t) {
                new c(e, t, f.isNotFunction, !0).to.not.be.a("function");
              }),
              (f.isObject = function (e, t) {
                new c(e, t, f.isObject, !0).to.be.a("object");
              }),
              (f.isNotObject = function (e, t) {
                new c(e, t, f.isNotObject, !0).to.not.be.a("object");
              }),
              (f.isArray = function (e, t) {
                new c(e, t, f.isArray, !0).to.be.an("array");
              }),
              (f.isNotArray = function (e, t) {
                new c(e, t, f.isNotArray, !0).to.not.be.an("array");
              }),
              (f.isString = function (e, t) {
                new c(e, t, f.isString, !0).to.be.a("string");
              }),
              (f.isNotString = function (e, t) {
                new c(e, t, f.isNotString, !0).to.not.be.a("string");
              }),
              (f.isNumber = function (e, t) {
                new c(e, t, f.isNumber, !0).to.be.a("number");
              }),
              (f.isNotNumber = function (e, t) {
                new c(e, t, f.isNotNumber, !0).to.not.be.a("number");
              }),
              (f.isFinite = function (e, t) {
                new c(e, t, f.isFinite, !0).to.be.finite;
              }),
              (f.isBoolean = function (e, t) {
                new c(e, t, f.isBoolean, !0).to.be.a("boolean");
              }),
              (f.isNotBoolean = function (e, t) {
                new c(e, t, f.isNotBoolean, !0).to.not.be.a("boolean");
              }),
              (f.typeOf = function (e, t, n) {
                new c(e, n, f.typeOf, !0).to.be.a(t);
              }),
              (f.notTypeOf = function (e, t, n) {
                new c(e, n, f.notTypeOf, !0).to.not.be.a(t);
              }),
              (f.instanceOf = function (e, t, n) {
                new c(e, n, f.instanceOf, !0).to.be.instanceOf(t);
              }),
              (f.notInstanceOf = function (e, t, n) {
                new c(e, n, f.notInstanceOf, !0).to.not.be.instanceOf(t);
              }),
              (f.include = function (e, t, n) {
                new c(e, n, f.include, !0).include(t);
              }),
              (f.notInclude = function (e, t, n) {
                new c(e, n, f.notInclude, !0).not.include(t);
              }),
              (f.deepInclude = function (e, t, n) {
                new c(e, n, f.deepInclude, !0).deep.include(t);
              }),
              (f.notDeepInclude = function (e, t, n) {
                new c(e, n, f.notDeepInclude, !0).not.deep.include(t);
              }),
              (f.nestedInclude = function (e, t, n) {
                new c(e, n, f.nestedInclude, !0).nested.include(t);
              }),
              (f.notNestedInclude = function (e, t, n) {
                new c(e, n, f.notNestedInclude, !0).not.nested.include(t);
              }),
              (f.deepNestedInclude = function (e, t, n) {
                new c(e, n, f.deepNestedInclude, !0).deep.nested.include(t);
              }),
              (f.notDeepNestedInclude = function (e, t, n) {
                new c(e, n, f.notDeepNestedInclude, !0).not.deep.nested.include(
                  t
                );
              }),
              (f.ownInclude = function (e, t, n) {
                new c(e, n, f.ownInclude, !0).own.include(t);
              }),
              (f.notOwnInclude = function (e, t, n) {
                new c(e, n, f.notOwnInclude, !0).not.own.include(t);
              }),
              (f.deepOwnInclude = function (e, t, n) {
                new c(e, n, f.deepOwnInclude, !0).deep.own.include(t);
              }),
              (f.notDeepOwnInclude = function (e, t, n) {
                new c(e, n, f.notDeepOwnInclude, !0).not.deep.own.include(t);
              }),
              (f.match = function (e, t, n) {
                new c(e, n, f.match, !0).to.match(t);
              }),
              (f.notMatch = function (e, t, n) {
                new c(e, n, f.notMatch, !0).to.not.match(t);
              }),
              (f.property = function (e, t, n) {
                new c(e, n, f.property, !0).to.have.property(t);
              }),
              (f.notProperty = function (e, t, n) {
                new c(e, n, f.notProperty, !0).to.not.have.property(t);
              }),
              (f.propertyVal = function (e, t, n, o) {
                new c(e, o, f.propertyVal, !0).to.have.property(t, n);
              }),
              (f.notPropertyVal = function (e, t, n, o) {
                new c(e, o, f.notPropertyVal, !0).to.not.have.property(t, n);
              }),
              (f.deepPropertyVal = function (e, t, n, o) {
                new c(e, o, f.deepPropertyVal, !0).to.have.deep.property(t, n);
              }),
              (f.notDeepPropertyVal = function (e, t, n, o) {
                new c(e, o, f.notDeepPropertyVal, !0).to.not.have.deep.property(
                  t,
                  n
                );
              }),
              (f.ownProperty = function (e, t, n) {
                new c(e, n, f.ownProperty, !0).to.have.own.property(t);
              }),
              (f.notOwnProperty = function (e, t, n) {
                new c(e, n, f.notOwnProperty, !0).to.not.have.own.property(t);
              }),
              (f.ownPropertyVal = function (e, t, n, o) {
                new c(e, o, f.ownPropertyVal, !0).to.have.own.property(t, n);
              }),
              (f.notOwnPropertyVal = function (e, t, n, o) {
                new c(e, o, f.notOwnPropertyVal, !0).to.not.have.own.property(
                  t,
                  n
                );
              }),
              (f.deepOwnPropertyVal = function (e, t, n, o) {
                new c(e, o, f.deepOwnPropertyVal, !0).to.have.deep.own.property(
                  t,
                  n
                );
              }),
              (f.notDeepOwnPropertyVal = function (e, t, n, o) {
                new c(
                  e,
                  o,
                  f.notDeepOwnPropertyVal,
                  !0
                ).to.not.have.deep.own.property(t, n);
              }),
              (f.nestedProperty = function (e, t, n) {
                new c(e, n, f.nestedProperty, !0).to.have.nested.property(t);
              }),
              (f.notNestedProperty = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.notNestedProperty,
                  !0
                ).to.not.have.nested.property(t);
              }),
              (f.nestedPropertyVal = function (e, t, n, o) {
                new c(e, o, f.nestedPropertyVal, !0).to.have.nested.property(
                  t,
                  n
                );
              }),
              (f.notNestedPropertyVal = function (e, t, n, o) {
                new c(
                  e,
                  o,
                  f.notNestedPropertyVal,
                  !0
                ).to.not.have.nested.property(t, n);
              }),
              (f.deepNestedPropertyVal = function (e, t, n, o) {
                new c(
                  e,
                  o,
                  f.deepNestedPropertyVal,
                  !0
                ).to.have.deep.nested.property(t, n);
              }),
              (f.notDeepNestedPropertyVal = function (e, t, n, o) {
                new c(
                  e,
                  o,
                  f.notDeepNestedPropertyVal,
                  !0
                ).to.not.have.deep.nested.property(t, n);
              }),
              (f.lengthOf = function (e, t, n) {
                new c(e, n, f.lengthOf, !0).to.have.lengthOf(t);
              }),
              (f.hasAnyKeys = function (e, t, n) {
                new c(e, n, f.hasAnyKeys, !0).to.have.any.keys(t);
              }),
              (f.hasAllKeys = function (e, t, n) {
                new c(e, n, f.hasAllKeys, !0).to.have.all.keys(t);
              }),
              (f.containsAllKeys = function (e, t, n) {
                new c(e, n, f.containsAllKeys, !0).to.contain.all.keys(t);
              }),
              (f.doesNotHaveAnyKeys = function (e, t, n) {
                new c(e, n, f.doesNotHaveAnyKeys, !0).to.not.have.any.keys(t);
              }),
              (f.doesNotHaveAllKeys = function (e, t, n) {
                new c(e, n, f.doesNotHaveAllKeys, !0).to.not.have.all.keys(t);
              }),
              (f.hasAnyDeepKeys = function (e, t, n) {
                new c(e, n, f.hasAnyDeepKeys, !0).to.have.any.deep.keys(t);
              }),
              (f.hasAllDeepKeys = function (e, t, n) {
                new c(e, n, f.hasAllDeepKeys, !0).to.have.all.deep.keys(t);
              }),
              (f.containsAllDeepKeys = function (e, t, n) {
                new c(e, n, f.containsAllDeepKeys, !0).to.contain.all.deep.keys(
                  t
                );
              }),
              (f.doesNotHaveAnyDeepKeys = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.doesNotHaveAnyDeepKeys,
                  !0
                ).to.not.have.any.deep.keys(t);
              }),
              (f.doesNotHaveAllDeepKeys = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.doesNotHaveAllDeepKeys,
                  !0
                ).to.not.have.all.deep.keys(t);
              }),
              (f.throws = function (e, t, n, o) {
                ("string" == typeof t || t instanceof RegExp) &&
                  ((n = t), (t = null));
                var r = new c(e, o, f.throws, !0).to.throw(t, n);
                return u(r, "object");
              }),
              (f.doesNotThrow = function (e, t, n, o) {
                ("string" == typeof t || t instanceof RegExp) &&
                  ((n = t), (t = null)),
                  new c(e, o, f.doesNotThrow, !0).to.not.throw(t, n);
              }),
              (f.operator = function (e, t, n, o) {
                var r;
                switch (t) {
                  case "==":
                    r = e == n;
                    break;
                  case "===":
                    r = e === n;
                    break;
                  case ">":
                    r = n < e;
                    break;
                  case ">=":
                    r = n <= e;
                    break;
                  case "<":
                    r = e < n;
                    break;
                  case "<=":
                    r = e <= n;
                    break;
                  case "!=":
                    r = e != n;
                    break;
                  case "!==":
                    r = e !== n;
                    break;
                  default:
                    throw (
                      ((o = o ? o + ": " : o),
                      new s.AssertionError(
                        o + 'Invalid operator "' + t + '"',
                        void 0,
                        f.operator
                      ))
                    );
                }
                var i = new c(r, o, f.operator, !0);
                i.assert(
                  !0 === u(i, "object"),
                  "expected " +
                    a.inspect(e) +
                    " to be " +
                    t +
                    " " +
                    a.inspect(n),
                  "expected " +
                    a.inspect(e) +
                    " to not be " +
                    t +
                    " " +
                    a.inspect(n)
                );
              }),
              (f.closeTo = function (e, t, n, o) {
                new c(e, o, f.closeTo, !0).to.be.closeTo(t, n);
              }),
              (f.approximately = function (e, t, n, o) {
                new c(e, o, f.approximately, !0).to.be.approximately(t, n);
              }),
              (f.sameMembers = function (e, t, n) {
                new c(e, n, f.sameMembers, !0).to.have.same.members(t);
              }),
              (f.notSameMembers = function (e, t, n) {
                new c(e, n, f.notSameMembers, !0).to.not.have.same.members(t);
              }),
              (f.sameDeepMembers = function (e, t, n) {
                new c(e, n, f.sameDeepMembers, !0).to.have.same.deep.members(t);
              }),
              (f.notSameDeepMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.notSameDeepMembers,
                  !0
                ).to.not.have.same.deep.members(t);
              }),
              (f.sameOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.sameOrderedMembers,
                  !0
                ).to.have.same.ordered.members(t);
              }),
              (f.notSameOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.notSameOrderedMembers,
                  !0
                ).to.not.have.same.ordered.members(t);
              }),
              (f.sameDeepOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.sameDeepOrderedMembers,
                  !0
                ).to.have.same.deep.ordered.members(t);
              }),
              (f.notSameDeepOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.notSameDeepOrderedMembers,
                  !0
                ).to.not.have.same.deep.ordered.members(t);
              }),
              (f.includeMembers = function (e, t, n) {
                new c(e, n, f.includeMembers, !0).to.include.members(t);
              }),
              (f.notIncludeMembers = function (e, t, n) {
                new c(e, n, f.notIncludeMembers, !0).to.not.include.members(t);
              }),
              (f.includeDeepMembers = function (e, t, n) {
                new c(e, n, f.includeDeepMembers, !0).to.include.deep.members(
                  t
                );
              }),
              (f.notIncludeDeepMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.notIncludeDeepMembers,
                  !0
                ).to.not.include.deep.members(t);
              }),
              (f.includeOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.includeOrderedMembers,
                  !0
                ).to.include.ordered.members(t);
              }),
              (f.notIncludeOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.notIncludeOrderedMembers,
                  !0
                ).to.not.include.ordered.members(t);
              }),
              (f.includeDeepOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.includeDeepOrderedMembers,
                  !0
                ).to.include.deep.ordered.members(t);
              }),
              (f.notIncludeDeepOrderedMembers = function (e, t, n) {
                new c(
                  e,
                  n,
                  f.notIncludeDeepOrderedMembers,
                  !0
                ).to.not.include.deep.ordered.members(t);
              }),
              (f.oneOf = function (e, t, n) {
                new c(e, n, f.oneOf, !0).to.be.oneOf(t);
              }),
              (f.changes = function (e, t, n, o) {
                3 === arguments.length &&
                  "function" == typeof t &&
                  ((o = n), (n = null)),
                  new c(e, o, f.changes, !0).to.change(t, n);
              }),
              (f.changesBy = function (e, t, n, o, r) {
                if (4 === arguments.length && "function" == typeof t) {
                  var i = o;
                  (o = n), (r = i);
                } else 3 === arguments.length && ((o = n), (n = null));
                new c(e, r, f.changesBy, !0).to.change(t, n).by(o);
              }),
              (f.doesNotChange = function (e, t, n, o) {
                return (
                  3 === arguments.length &&
                    "function" == typeof t &&
                    ((o = n), (n = null)),
                  new c(e, o, f.doesNotChange, !0).to.not.change(t, n)
                );
              }),
              (f.changesButNotBy = function (e, t, n, o, r) {
                if (4 === arguments.length && "function" == typeof t) {
                  var i = o;
                  (o = n), (r = i);
                } else 3 === arguments.length && ((o = n), (n = null));
                new c(e, r, f.changesButNotBy, !0).to
                  .change(t, n)
                  .but.not.by(o);
              }),
              (f.increases = function (e, t, n, o) {
                return (
                  3 === arguments.length &&
                    "function" == typeof t &&
                    ((o = n), (n = null)),
                  new c(e, o, f.increases, !0).to.increase(t, n)
                );
              }),
              (f.increasesBy = function (e, t, n, o, r) {
                if (4 === arguments.length && "function" == typeof t) {
                  var i = o;
                  (o = n), (r = i);
                } else 3 === arguments.length && ((o = n), (n = null));
                new c(e, r, f.increasesBy, !0).to.increase(t, n).by(o);
              }),
              (f.doesNotIncrease = function (e, t, n, o) {
                return (
                  3 === arguments.length &&
                    "function" == typeof t &&
                    ((o = n), (n = null)),
                  new c(e, o, f.doesNotIncrease, !0).to.not.increase(t, n)
                );
              }),
              (f.increasesButNotBy = function (e, t, n, o, r) {
                if (4 === arguments.length && "function" == typeof t) {
                  var i = o;
                  (o = n), (r = i);
                } else 3 === arguments.length && ((o = n), (n = null));
                new c(e, r, f.increasesButNotBy, !0).to
                  .increase(t, n)
                  .but.not.by(o);
              }),
              (f.decreases = function (e, t, n, o) {
                return (
                  3 === arguments.length &&
                    "function" == typeof t &&
                    ((o = n), (n = null)),
                  new c(e, o, f.decreases, !0).to.decrease(t, n)
                );
              }),
              (f.decreasesBy = function (e, t, n, o, r) {
                if (4 === arguments.length && "function" == typeof t) {
                  var i = o;
                  (o = n), (r = i);
                } else 3 === arguments.length && ((o = n), (n = null));
                new c(e, r, f.decreasesBy, !0).to.decrease(t, n).by(o);
              }),
              (f.doesNotDecrease = function (e, t, n, o) {
                return (
                  3 === arguments.length &&
                    "function" == typeof t &&
                    ((o = n), (n = null)),
                  new c(e, o, f.doesNotDecrease, !0).to.not.decrease(t, n)
                );
              }),
              (f.doesNotDecreaseBy = function (e, t, n, o, r) {
                if (4 === arguments.length && "function" == typeof t) {
                  var i = o;
                  (o = n), (r = i);
                } else 3 === arguments.length && ((o = n), (n = null));
                return new c(e, r, f.doesNotDecreaseBy, !0).to.not
                  .decrease(t, n)
                  .by(o);
              }),
              (f.decreasesButNotBy = function (e, t, n, o, r) {
                if (4 === arguments.length && "function" == typeof t) {
                  var i = o;
                  (o = n), (r = i);
                } else 3 === arguments.length && ((o = n), (n = null));
                new c(e, r, f.decreasesButNotBy, !0).to
                  .decrease(t, n)
                  .but.not.by(o);
              }),
              (f.ifError = function (e) {
                if (e) throw e;
              }),
              (f.isExtensible = function (e, t) {
                new c(e, t, f.isExtensible, !0).to.be.extensible;
              }),
              (f.isNotExtensible = function (e, t) {
                new c(e, t, f.isNotExtensible, !0).to.not.be.extensible;
              }),
              (f.isSealed = function (e, t) {
                new c(e, t, f.isSealed, !0).to.be.sealed;
              }),
              (f.isNotSealed = function (e, t) {
                new c(e, t, f.isNotSealed, !0).to.not.be.sealed;
              }),
              (f.isFrozen = function (e, t) {
                new c(e, t, f.isFrozen, !0).to.be.frozen;
              }),
              (f.isNotFrozen = function (e, t) {
                new c(e, t, f.isNotFrozen, !0).to.not.be.frozen;
              }),
              (f.isEmpty = function (e, t) {
                new c(e, t, f.isEmpty, !0).to.be.empty;
              }),
              (f.isNotEmpty = function (e, t) {
                new c(e, t, f.isNotEmpty, !0).to.not.be.empty;
              }),
              (function e(t, n) {
                return (f[n] = f[t]), e;
              })("isOk", "ok")("isNotOk", "notOk")("throws", "throw")(
                "throws",
                "Throw"
              )("isExtensible", "extensible")(
                "isNotExtensible",
                "notExtensible"
              )("isSealed", "sealed")("isNotSealed", "notSealed")(
                "isFrozen",
                "frozen"
              )("isNotFrozen", "notFrozen")("isEmpty", "empty")(
                "isNotEmpty",
                "notEmpty"
              );
          };
        },
        {},
      ],
      7: [
        function (e, t, n) {
          t.exports = function (r, e) {
            (r.expect = function (e, t) {
              return new r.Assertion(e, t);
            }),
              (r.expect.fail = function (e, t, n, o) {
                throw (
                  (arguments.length < 2 && ((n = e), (e = void 0)),
                  (n = n || "expect.fail()"),
                  new r.AssertionError(
                    n,
                    { actual: e, expected: t, operator: o },
                    r.expect.fail
                  ))
                );
              });
          };
        },
        {},
      ],
      8: [
        function (e, t, n) {
          t.exports = function (i, e) {
            var s = i.Assertion;
            function t() {
              Object.defineProperty(Object.prototype, "should", {
                set: function (e) {
                  Object.defineProperty(this, "should", {
                    value: e,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  });
                },
                get: function e() {
                  return this instanceof String ||
                    this instanceof Number ||
                    this instanceof Boolean ||
                    ("function" == typeof Symbol && this instanceof Symbol)
                    ? new s(this.valueOf(), null, e)
                    : new s(this, null, e);
                },
                configurable: !0,
              });
              var r = {
                fail: function (e, t, n, o) {
                  throw (
                    (arguments.length < 2 && ((n = e), (e = void 0)),
                    (n = n || "should.fail()"),
                    new i.AssertionError(
                      n,
                      { actual: e, expected: t, operator: o },
                      r.fail
                    ))
                  );
                },
                equal: function (e, t, n) {
                  new s(e, n).to.equal(t);
                },
                Throw: function (e, t, n, o) {
                  new s(e, o).to.Throw(t, n);
                },
                exist: function (e, t) {
                  new s(e, t).to.exist;
                },
                not: {},
              };
              return (
                (r.not.equal = function (e, t, n) {
                  new s(e, n).to.not.equal(t);
                }),
                (r.not.Throw = function (e, t, n, o) {
                  new s(e, o).to.not.Throw(t, n);
                }),
                (r.not.exist = function (e, t) {
                  new s(e, t).to.not.exist;
                }),
                (r.throw = r.Throw),
                (r.not.throw = r.not.Throw),
                r
              );
            }
            (i.should = t), (i.Should = t);
          };
        },
        {},
      ],
      9: [
        function (e, t, n) {
          var i = e("./addLengthGuard"),
            s = e("../../chai"),
            a = e("./flag"),
            c = e("./proxify"),
            u = e("./transferFlags"),
            f = "function" == typeof Object.setPrototypeOf,
            o = function () {},
            l = Object.getOwnPropertyNames(o).filter(function (e) {
              var t = Object.getOwnPropertyDescriptor(o, e);
              return "object" != typeof t || !t.configurable;
            }),
            p = Function.prototype.call,
            h = Function.prototype.apply;
          t.exports = function (o, t, e, n) {
            "function" != typeof n && (n = function () {});
            var r = { method: e, chainingBehavior: n };
            o.__methods || (o.__methods = {}),
              (o.__methods[t] = r),
              Object.defineProperty(o, t, {
                get: function () {
                  r.chainingBehavior.call(this);
                  var n = function () {
                    a(this, "lockSsfi") || a(this, "ssfi", n);
                    var e = r.method.apply(this, arguments);
                    if (void 0 !== e) return e;
                    var t = new s.Assertion();
                    return u(this, t), t;
                  };
                  if ((i(n, t, !0), f)) {
                    var e = Object.create(this);
                    (e.call = p), (e.apply = h), Object.setPrototypeOf(n, e);
                  } else {
                    Object.getOwnPropertyNames(o).forEach(function (e) {
                      if (-1 === l.indexOf(e)) {
                        var t = Object.getOwnPropertyDescriptor(o, e);
                        Object.defineProperty(n, e, t);
                      }
                    });
                  }
                  return u(this, n), c(n);
                },
                configurable: !0,
              });
          };
        },
        {
          "../../chai": 2,
          "./addLengthGuard": 10,
          "./flag": 15,
          "./proxify": 30,
          "./transferFlags": 32,
        },
      ],
      10: [
        function (e, t, n) {
          var o = Object.getOwnPropertyDescriptor(function () {}, "length");
          t.exports = function (e, t, n) {
            return (
              o.configurable &&
                Object.defineProperty(e, "length", {
                  get: function () {
                    if (n)
                      throw Error(
                        "Invalid Chai property: " +
                          t +
                          '.length. Due to a compatibility issue, "length" cannot directly follow "' +
                          t +
                          '". Use "' +
                          t +
                          '.lengthOf" instead.'
                      );
                    throw Error(
                      "Invalid Chai property: " +
                        t +
                        '.length. See docs for proper usage of "' +
                        t +
                        '".'
                    );
                  },
                }),
              e
            );
          };
        },
        {},
      ],
      11: [
        function (e, t, n) {
          var r = e("./addLengthGuard"),
            i = e("../../chai"),
            s = e("./flag"),
            a = e("./proxify"),
            c = e("./transferFlags");
          t.exports = function (e, t, n) {
            var o = function () {
              s(this, "lockSsfi") || s(this, "ssfi", o);
              var e = n.apply(this, arguments);
              if (void 0 !== e) return e;
              var t = new i.Assertion();
              return c(this, t), t;
            };
            r(o, t, !1), (e[t] = a(o, t));
          };
        },
        {
          "../../chai": 2,
          "./addLengthGuard": 10,
          "./flag": 15,
          "./proxify": 30,
          "./transferFlags": 32,
        },
      ],
      12: [
        function (e, t, n) {
          var r = e("../../chai"),
            i = e("./flag"),
            s = e("./isProxyEnabled"),
            a = e("./transferFlags");
          t.exports = function (e, t, o) {
            (o = void 0 === o ? function () {} : o),
              Object.defineProperty(e, t, {
                get: function e() {
                  s() || i(this, "lockSsfi") || i(this, "ssfi", e);
                  var t = o.call(this);
                  if (void 0 !== t) return t;
                  var n = new r.Assertion();
                  return a(this, n), n;
                },
                configurable: !0,
              });
          };
        },
        {
          "../../chai": 2,
          "./flag": 15,
          "./isProxyEnabled": 25,
          "./transferFlags": 32,
        },
      ],
      13: [
        function (e, t, n) {
          var o = e("./inspect");
          t.exports = function (e, t) {
            return o(e) < o(t) ? -1 : 1;
          };
        },
        { "./inspect": 23 },
      ],
      14: [
        function (e, t, n) {
          var s = e("assertion-error"),
            a = e("./flag"),
            c = e("type-detect");
          t.exports = function (e, o) {
            var t = a(e, "message"),
              n = a(e, "ssfi");
            (t = t ? t + ": " : ""),
              (e = a(e, "object")),
              (o = o.map(function (e) {
                return e.toLowerCase();
              })).sort();
            var r = o
                .map(function (e, t) {
                  var n = ~["a", "e", "i", "o", "u"].indexOf(e.charAt(0))
                    ? "an"
                    : "a";
                  return (
                    (1 < o.length && t === o.length - 1 ? "or " : "") +
                    n +
                    " " +
                    e
                  );
                })
                .join(", "),
              i = c(e).toLowerCase();
            if (
              !o.some(function (e) {
                return i === e;
              })
            )
              throw new s(
                t + "object tested must be " + r + ", but " + i + " given",
                void 0,
                n
              );
          };
        },
        { "./flag": 15, "assertion-error": 33, "type-detect": 38 },
      ],
      15: [
        function (e, t, n) {
          t.exports = function (e, t, n) {
            var o = e.__flags || (e.__flags = Object.create(null));
            if (3 !== arguments.length) return o[t];
            o[t] = n;
          };
        },
        {},
      ],
      16: [
        function (e, t, n) {
          t.exports = function (e, t) {
            return 4 < t.length ? t[4] : e._obj;
          };
        },
        {},
      ],
      17: [
        function (e, t, n) {
          t.exports = function (e) {
            var t = [];
            for (var n in e) t.push(n);
            return t;
          };
        },
        {},
      ],
      18: [
        function (e, t, n) {
          var c = e("./flag"),
            u = e("./getActual"),
            f = e("./objDisplay");
          t.exports = function (e, t) {
            var n = c(e, "negate"),
              o = c(e, "object"),
              r = t[3],
              i = u(e, t),
              s = n ? t[2] : t[1],
              a = c(e, "message");
            return (
              "function" == typeof s && (s = s()),
              (s = (s = s || "")
                .replace(/#\{this\}/g, function () {
                  return f(o);
                })
                .replace(/#\{act\}/g, function () {
                  return f(i);
                })
                .replace(/#\{exp\}/g, function () {
                  return f(r);
                })),
              a ? a + ": " + s : s
            );
          };
        },
        { "./flag": 15, "./getActual": 16, "./objDisplay": 26 },
      ],
      19: [
        function (e, t, n) {
          var o = e("./getOwnEnumerablePropertySymbols");
          t.exports = function (e) {
            return Object.keys(e).concat(o(e));
          };
        },
        { "./getOwnEnumerablePropertySymbols": 20 },
      ],
      20: [
        function (e, t, n) {
          t.exports = function (t) {
            return "function" != typeof Object.getOwnPropertySymbols
              ? []
              : Object.getOwnPropertySymbols(t).filter(function (e) {
                  return Object.getOwnPropertyDescriptor(t, e).enumerable;
                });
          };
        },
        {},
      ],
      21: [
        function (e, t, n) {
          t.exports = function (e) {
            var t = Object.getOwnPropertyNames(e);
            function n(e) {
              -1 === t.indexOf(e) && t.push(e);
            }
            for (var o = Object.getPrototypeOf(e); null !== o; )
              Object.getOwnPropertyNames(o).forEach(n),
                (o = Object.getPrototypeOf(o));
            return t;
          };
        },
        {},
      ],
      22: [
        function (e, t, n) {
          var o = e("pathval");
          (n.test = e("./test")),
            (n.type = e("type-detect")),
            (n.expectTypes = e("./expectTypes")),
            (n.getMessage = e("./getMessage")),
            (n.getActual = e("./getActual")),
            (n.inspect = e("./inspect")),
            (n.objDisplay = e("./objDisplay")),
            (n.flag = e("./flag")),
            (n.transferFlags = e("./transferFlags")),
            (n.eql = e("deep-eql")),
            (n.getPathInfo = o.getPathInfo),
            (n.hasProperty = o.hasProperty),
            (n.getName = e("get-func-name")),
            (n.addProperty = e("./addProperty")),
            (n.addMethod = e("./addMethod")),
            (n.overwriteProperty = e("./overwriteProperty")),
            (n.overwriteMethod = e("./overwriteMethod")),
            (n.addChainableMethod = e("./addChainableMethod")),
            (n.overwriteChainableMethod = e("./overwriteChainableMethod")),
            (n.compareByInspect = e("./compareByInspect")),
            (n.getOwnEnumerablePropertySymbols = e(
              "./getOwnEnumerablePropertySymbols"
            )),
            (n.getOwnEnumerableProperties = e("./getOwnEnumerableProperties")),
            (n.checkError = e("check-error")),
            (n.proxify = e("./proxify")),
            (n.addLengthGuard = e("./addLengthGuard")),
            (n.isProxyEnabled = e("./isProxyEnabled")),
            (n.isNaN = e("./isNaN"));
        },
        {
          "./addChainableMethod": 9,
          "./addLengthGuard": 10,
          "./addMethod": 11,
          "./addProperty": 12,
          "./compareByInspect": 13,
          "./expectTypes": 14,
          "./flag": 15,
          "./getActual": 16,
          "./getMessage": 18,
          "./getOwnEnumerableProperties": 19,
          "./getOwnEnumerablePropertySymbols": 20,
          "./inspect": 23,
          "./isNaN": 24,
          "./isProxyEnabled": 25,
          "./objDisplay": 26,
          "./overwriteChainableMethod": 27,
          "./overwriteMethod": 28,
          "./overwriteProperty": 29,
          "./proxify": 30,
          "./test": 31,
          "./transferFlags": 32,
          "check-error": 34,
          "deep-eql": 35,
          "get-func-name": 36,
          pathval: 37,
          "type-detect": 38,
        },
      ],
      23: [
        function (e, t, w) {
          var m = e("get-func-name"),
            v = e("./getProperties"),
            x = e("./getEnumerableProperties"),
            O = e("../config");
          t.exports = function (e, t, n, o) {
            return M(
              {
                showHidden: t,
                seen: [],
                stylize: function (e) {
                  return e;
                },
              },
              e,
              void 0 === n ? 2 : n
            );
          };
          var j = function (e) {
            return "object" == typeof HTMLElement
              ? e instanceof HTMLElement
              : e &&
                  "object" == typeof e &&
                  "nodeType" in e &&
                  1 === e.nodeType &&
                  "string" == typeof e.nodeName;
          };
          function M(t, n, o) {
            if (
              n &&
              "function" == typeof n.inspect &&
              n.inspect !== w.inspect &&
              (!n.constructor || n.constructor.prototype !== n)
            ) {
              var e = n.inspect(o, t);
              return "string" != typeof e && (e = M(t, e, o)), e;
            }
            var r = (function (e, t) {
              switch (typeof t) {
                case "undefined":
                  return e.stylize("undefined", "undefined");
                case "string":
                  var n =
                    "'" +
                    JSON.stringify(t)
                      .replace(/^"|"$/g, "")
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"') +
                    "'";
                  return e.stylize(n, "string");
                case "number":
                  return 0 === t && 1 / t == -1 / 0
                    ? e.stylize("-0", "number")
                    : e.stylize("" + t, "number");
                case "boolean":
                  return e.stylize("" + t, "boolean");
                case "symbol":
                  return e.stylize(t.toString(), "symbol");
              }
              if (null === t) return e.stylize("null", "null");
            })(t, n);
            if (r) return r;
            if (j(n)) {
              if ("outerHTML" in n) return n.outerHTML;
              try {
                if (document.xmlVersion)
                  return new XMLSerializer().serializeToString(n);
                var i = document.createElementNS(
                  "http://www.w3.org/1999/xhtml",
                  "_"
                );
                i.appendChild(n.cloneNode(!1));
                var s = i.innerHTML.replace("><", ">" + n.innerHTML + "<");
                return (i.innerHTML = ""), s;
              } catch (e) {}
            }
            var a,
              c,
              u = x(n),
              f = t.showHidden ? v(n) : u;
            if (
              0 === f.length ||
              (k(n) &&
                ((1 === f.length && "stack" === f[0]) ||
                  (2 === f.length &&
                    "description" === f[0] &&
                    "stack" === f[1])))
            ) {
              if ("function" == typeof n)
                return (
                  (c = (a = m(n)) ? ": " + a : ""),
                  t.stylize("[Function" + c + "]", "special")
                );
              if (S(n))
                return t.stylize(RegExp.prototype.toString.call(n), "regexp");
              if (E(n))
                return t.stylize(Date.prototype.toUTCString.call(n), "date");
              if (k(n)) return P(n);
            }
            var l,
              p,
              h,
              d = "",
              y = !1,
              b = !1,
              g = ["{", "}"];
            if (
              ("object" == typeof (l = n) &&
                /\w+Array]$/.test(A(l)) &&
                ((b = !0), (g = ["[", "]"])),
              (p = n),
              (Array.isArray(p) ||
                ("object" == typeof p && "[object Array]" === A(p))) &&
                ((y = !0), (g = ["[", "]"])),
              "function" == typeof n &&
                (d = " [Function" + (c = (a = m(n)) ? ": " + a : "") + "]"),
              S(n) && (d = " " + RegExp.prototype.toString.call(n)),
              E(n) && (d = " " + Date.prototype.toUTCString.call(n)),
              k(n))
            )
              return P(n);
            if (0 === f.length && (!y || 0 == n.length)) return g[0] + d + g[1];
            if (o < 0)
              return S(n)
                ? t.stylize(RegExp.prototype.toString.call(n), "regexp")
                : t.stylize("[Object]", "special");
            if ((t.seen.push(n), y))
              h = (function (t, n, o, r, e) {
                for (var i = [], s = 0, a = n.length; s < a; ++s)
                  Object.prototype.hasOwnProperty.call(n, String(s))
                    ? i.push(N(t, n, o, r, String(s), !0))
                    : i.push("");
                return (
                  e.forEach(function (e) {
                    e.match(/^\d+$/) || i.push(N(t, n, o, r, e, !0));
                  }),
                  i
                );
              })(t, n, o, u, f);
            else {
              if (b)
                return (function (e) {
                  for (var t = "[ ", n = 0; n < e.length; ++n) {
                    if (t.length >= O.truncateThreshold - 7) {
                      t += "...";
                      break;
                    }
                    t += e[n] + ", ";
                  }
                  -1 !== (t += " ]").indexOf(",  ]") &&
                    (t = t.replace(",  ]", " ]"));
                  return t;
                })(n);
              h = f.map(function (e) {
                return N(t, n, o, u, e, y);
              });
            }
            return (
              t.seen.pop(),
              (function (e, t, n) {
                if (
                  60 <
                  e.reduce(function (e, t) {
                    return e + t.length + 1;
                  }, 0)
                )
                  return (
                    n[0] +
                    ("" === t ? "" : t + "\n ") +
                    " " +
                    e.join(",\n  ") +
                    " " +
                    n[1]
                  );
                return n[0] + t + " " + e.join(", ") + " " + n[1];
              })(h, d, g)
            );
          }
          function P(e) {
            return "[" + Error.prototype.toString.call(e) + "]";
          }
          function N(e, t, n, o, r, i) {
            var s,
              a,
              c = Object.getOwnPropertyDescriptor(t, r);
            if (
              (c &&
                (c.get
                  ? (a = c.set
                      ? e.stylize("[Getter/Setter]", "special")
                      : e.stylize("[Getter]", "special"))
                  : c.set && (a = e.stylize("[Setter]", "special"))),
              o.indexOf(r) < 0 && (s = "[" + r + "]"),
              a ||
                (e.seen.indexOf(t[r]) < 0
                  ? -1 <
                      (a = M(e, t[r], null === n ? null : n - 1)).indexOf(
                        "\n"
                      ) &&
                    (a = i
                      ? a
                          .split("\n")
                          .map(function (e) {
                            return "  " + e;
                          })
                          .join("\n")
                          .substr(2)
                      : "\n" +
                        a
                          .split("\n")
                          .map(function (e) {
                            return "   " + e;
                          })
                          .join("\n"))
                  : (a = e.stylize("[Circular]", "special"))),
              void 0 === s)
            ) {
              if (i && r.match(/^\d+$/)) return a;
              (s = JSON.stringify("" + r)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
                ? ((s = s.substr(1, s.length - 2)), (s = e.stylize(s, "name")))
                : ((s = s
                    .replace(/'/g, "\\'")
                    .replace(/\\"/g, '"')
                    .replace(/(^"|"$)/g, "'")),
                  (s = e.stylize(s, "string")));
            }
            return s + ": " + a;
          }
          function S(e) {
            return "object" == typeof e && "[object RegExp]" === A(e);
          }
          function E(e) {
            return "object" == typeof e && "[object Date]" === A(e);
          }
          function k(e) {
            return "object" == typeof e && "[object Error]" === A(e);
          }
          function A(e) {
            return Object.prototype.toString.call(e);
          }
        },
        {
          "../config": 4,
          "./getEnumerableProperties": 17,
          "./getProperties": 21,
          "get-func-name": 36,
        },
      ],
      24: [
        function (e, t, n) {
          t.exports =
            Number.isNaN ||
            function (e) {
              return e != e;
            };
        },
        {},
      ],
      25: [
        function (e, t, n) {
          var o = e("../config");
          t.exports = function () {
            return (
              o.useProxy &&
              "undefined" != typeof Proxy &&
              "undefined" != typeof Reflect
            );
          };
        },
        { "../config": 4 },
      ],
      26: [
        function (e, t, n) {
          var r = e("./inspect"),
            i = e("../config");
          t.exports = function (e) {
            var t = r(e),
              n = Object.prototype.toString.call(e);
            if (i.truncateThreshold && t.length >= i.truncateThreshold) {
              if ("[object Function]" === n)
                return e.name && "" !== e.name
                  ? "[Function: " + e.name + "]"
                  : "[Function]";
              if ("[object Array]" === n) return "[ Array(" + e.length + ") ]";
              if ("[object Object]" === n) {
                var o = Object.keys(e);
                return (
                  "{ Object (" +
                  (2 < o.length
                    ? o.splice(0, 2).join(", ") + ", ..."
                    : o.join(", ")) +
                  ") }"
                );
              }
              return t;
            }
            return t;
          };
        },
        { "../config": 4, "./inspect": 23 },
      ],
      27: [
        function (e, t, n) {
          var a = e("../../chai"),
            c = e("./transferFlags");
          t.exports = function (e, t, n, o) {
            var r = e.__methods[t],
              i = r.chainingBehavior;
            r.chainingBehavior = function () {
              var e = o(i).call(this);
              if (void 0 !== e) return e;
              var t = new a.Assertion();
              return c(this, t), t;
            };
            var s = r.method;
            r.method = function () {
              var e = n(s).apply(this, arguments);
              if (void 0 !== e) return e;
              var t = new a.Assertion();
              return c(this, t), t;
            };
          };
        },
        { "../../chai": 2, "./transferFlags": 32 },
      ],
      28: [
        function (e, t, n) {
          var s = e("./addLengthGuard"),
            a = e("../../chai"),
            c = e("./flag"),
            u = e("./proxify"),
            f = e("./transferFlags");
          t.exports = function (e, t, o) {
            var n = e[t],
              r = function () {
                throw new Error(t + " is not a function");
              };
            n && "function" == typeof n && (r = n);
            var i = function () {
              c(this, "lockSsfi") || c(this, "ssfi", i);
              var e = c(this, "lockSsfi");
              c(this, "lockSsfi", !0);
              var t = o(r).apply(this, arguments);
              if ((c(this, "lockSsfi", e), void 0 !== t)) return t;
              var n = new a.Assertion();
              return f(this, n), n;
            };
            s(i, t, !1), (e[t] = u(i, t));
          };
        },
        {
          "../../chai": 2,
          "./addLengthGuard": 10,
          "./flag": 15,
          "./proxify": 30,
          "./transferFlags": 32,
        },
      ],
      29: [
        function (e, t, n) {
          var s = e("../../chai"),
            a = e("./flag"),
            c = e("./isProxyEnabled"),
            u = e("./transferFlags");
          t.exports = function (e, t, r) {
            var n = Object.getOwnPropertyDescriptor(e, t),
              i = function () {};
            n && "function" == typeof n.get && (i = n.get),
              Object.defineProperty(e, t, {
                get: function e() {
                  c() || a(this, "lockSsfi") || a(this, "ssfi", e);
                  var t = a(this, "lockSsfi");
                  a(this, "lockSsfi", !0);
                  var n = r(i).call(this);
                  if ((a(this, "lockSsfi", t), void 0 !== n)) return n;
                  var o = new s.Assertion();
                  return u(this, o), o;
                },
                configurable: !0,
              });
          };
        },
        {
          "../../chai": 2,
          "./flag": 15,
          "./isProxyEnabled": 25,
          "./transferFlags": 32,
        },
      ],
      30: [
        function (e, t, n) {
          var s = e("../config"),
            a = e("./flag"),
            c = e("./getProperties"),
            o = e("./isProxyEnabled"),
            u = ["__flags", "__methods", "_obj", "assert"];
          t.exports = function (e, i) {
            return o()
              ? new Proxy(e, {
                  get: function e(t, n) {
                    if (
                      "string" == typeof n &&
                      -1 === s.proxyExcludedKeys.indexOf(n) &&
                      !Reflect.has(t, n)
                    ) {
                      if (i)
                        throw Error(
                          "Invalid Chai property: " +
                            i +
                            "." +
                            n +
                            '. See docs for proper usage of "' +
                            i +
                            '".'
                        );
                      var o = null,
                        r = 4;
                      throw (
                        (c(t).forEach(function (e) {
                          if (
                            !Object.prototype.hasOwnProperty(e) &&
                            -1 === u.indexOf(e)
                          ) {
                            var t = (function (e, t, n) {
                              if (Math.abs(e.length - t.length) >= n) return n;
                              for (var o = [], r = 0; r <= e.length; r++)
                                (o[r] = Array(t.length + 1).fill(0)),
                                  (o[r][0] = r);
                              for (var i = 0; i < t.length; i++) o[0][i] = i;
                              for (var r = 1; r <= e.length; r++)
                                for (
                                  var s = e.charCodeAt(r - 1), i = 1;
                                  i <= t.length;
                                  i++
                                )
                                  Math.abs(r - i) >= n
                                    ? (o[r][i] = n)
                                    : (o[r][i] = Math.min(
                                        o[r - 1][i] + 1,
                                        o[r][i - 1] + 1,
                                        o[r - 1][i - 1] +
                                          (s === t.charCodeAt(i - 1) ? 0 : 1)
                                      ));
                              return o[e.length][t.length];
                            })(n, e, r);
                            t < r && ((o = e), (r = t));
                          }
                        }),
                        null !== o
                          ? Error(
                              "Invalid Chai property: " +
                                n +
                                '. Did you mean "' +
                                o +
                                '"?'
                            )
                          : Error("Invalid Chai property: " + n))
                      );
                    }
                    return (
                      -1 !== u.indexOf(n) ||
                        a(t, "lockSsfi") ||
                        a(t, "ssfi", e),
                      Reflect.get(t, n)
                    );
                  },
                })
              : e;
          };
        },
        {
          "../config": 4,
          "./flag": 15,
          "./getProperties": 21,
          "./isProxyEnabled": 25,
        },
      ],
      31: [
        function (e, t, n) {
          var r = e("./flag");
          t.exports = function (e, t) {
            var n = r(e, "negate"),
              o = t[0];
            return n ? !o : o;
          };
        },
        { "./flag": 15 },
      ],
      32: [
        function (e, t, n) {
          t.exports = function (e, t, n) {
            var o = e.__flags || (e.__flags = Object.create(null));
            for (var r in (t.__flags || (t.__flags = Object.create(null)),
            (n = 3 !== arguments.length || n),
            o))
              (n ||
                ("object" !== r &&
                  "ssfi" !== r &&
                  "lockSsfi" !== r &&
                  "message" != r)) &&
                (t.__flags[r] = o[r]);
          };
        },
        {},
      ],
      33: [
        function (e, t, n) {
          function i() {
            var o = [].slice.call(arguments);
            function r(t, n) {
              Object.keys(n).forEach(function (e) {
                ~o.indexOf(e) || (t[e] = n[e]);
              });
            }
            return function () {
              for (
                var e = [].slice.call(arguments), t = 0, n = {};
                t < e.length;
                t++
              )
                r(n, e[t]);
              return n;
            };
          }
          function s(e, t, n) {
            var o = i(
              "name",
              "message",
              "stack",
              "constructor",
              "toJSON"
            )(t || {});
            for (var r in ((this.message = e || "Unspecified AssertionError"),
            (this.showDiff = !1),
            o))
              this[r] = o[r];
            if (((n = n || s), Error.captureStackTrace))
              Error.captureStackTrace(this, n);
            else
              try {
                throw new Error();
              } catch (e) {
                this.stack = e.stack;
              }
          }
          (((t.exports = s).prototype = Object.create(Error.prototype)).name =
            "AssertionError"),
            ((s.prototype.constructor = s).prototype.toJSON = function (e) {
              var t = i(
                "constructor",
                "toJSON",
                "stack"
              )({ name: this.name }, this);
              return !1 !== e && this.stack && (t.stack = this.stack), t;
            });
        },
        {},
      ],
      34: [
        function (e, t, n) {
          "use strict";
          var o = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
          function r(e) {
            var t = "";
            if (void 0 === e.name) {
              var n = String(e).match(o);
              n && (t = n[1]);
            } else t = e.name;
            return t;
          }
          t.exports = {
            compatibleInstance: function (e, t) {
              return t instanceof Error && e === t;
            },
            compatibleConstructor: function (e, t) {
              return t instanceof Error
                ? e.constructor === t.constructor || e instanceof t.constructor
                : (t.prototype instanceof Error || t === Error) &&
                    (e.constructor === t || e instanceof t);
            },
            compatibleMessage: function (e, t) {
              var n = "string" == typeof e ? e : e.message;
              return t instanceof RegExp
                ? t.test(n)
                : "string" == typeof t && -1 !== n.indexOf(t);
            },
            getMessage: function (e) {
              var t = "";
              return (
                e && e.message
                  ? (t = e.message)
                  : "string" == typeof e && (t = e),
                t
              );
            },
            getConstructorName: function (e) {
              var t = e;
              return (
                e instanceof Error
                  ? (t = r(e.constructor))
                  : "function" == typeof e && (t = r(e).trim() || r(new e())),
                t
              );
            },
          };
        },
        {},
      ],
      35: [
        function (e, t, n) {
          "use strict";
          var f = e("type-detect");
          function o() {
            this._key = "chai/deep-eql__" + Math.random() + Date.now();
          }
          o.prototype = {
            get: function (e) {
              return e[this._key];
            },
            set: function (e, t) {
              Object.isExtensible(e) &&
                Object.defineProperty(e, this._key, {
                  value: t,
                  configurable: !0,
                });
            },
          };
          var l = "function" == typeof WeakMap ? WeakMap : o;
          function p(e, t, n) {
            if (!n || i(e) || i(t)) return null;
            var o = n.get(e);
            if (o) {
              var r = o.get(t);
              if ("boolean" == typeof r) return r;
            }
            return null;
          }
          function h(e, t, n, o) {
            if (n && !i(e) && !i(t)) {
              var r = n.get(e);
              r ? r.set(t, o) : ((r = new l()).set(t, o), n.set(e, r));
            }
          }
          function d(e, t, n) {
            if (n && n.comparator) return r(e, t, n);
            var o = y(e, t);
            return null !== o ? o : r(e, t, n);
          }
          function y(e, t) {
            return e === t
              ? 0 !== e || 1 / e == 1 / t
              : (e != e && t != t) || (!i(e) && !i(t) && null);
          }
          function r(e, t, n) {
            (n = n || {}).memoize = !1 !== n.memoize && (n.memoize || new l());
            var o = n && n.comparator,
              r = p(e, t, n.memoize);
            if (null !== r) return r;
            var i = p(t, e, n.memoize);
            if (null !== i) return i;
            if (o) {
              var s = o(e, t);
              if (!1 === s || !0 === s) return h(e, t, n.memoize, s), s;
              var a = y(e, t);
              if (null !== a) return a;
            }
            var c = f(e);
            if (c !== f(t)) return h(e, t, n.memoize, !1), !1;
            h(e, t, n.memoize, !0);
            var u = (function (e, t, n, o) {
              switch (n) {
                case "String":
                case "Number":
                case "Boolean":
                case "Date":
                  return d(e.valueOf(), t.valueOf());
                case "Promise":
                case "Symbol":
                case "function":
                case "WeakMap":
                case "WeakSet":
                case "Error":
                  return e === t;
                case "Arguments":
                case "Int8Array":
                case "Uint8Array":
                case "Uint8ClampedArray":
                case "Int16Array":
                case "Uint16Array":
                case "Int32Array":
                case "Uint32Array":
                case "Float32Array":
                case "Float64Array":
                case "Array":
                  return g(e, t, o);
                case "RegExp":
                  return (s = t), e.toString() === s.toString();
                case "Generator":
                  return (r = t), (i = o), g(m(e), m(r), i);
                case "DataView":
                  return g(
                    new Uint8Array(e.buffer),
                    new Uint8Array(t.buffer),
                    o
                  );
                case "ArrayBuffer":
                  return g(new Uint8Array(e), new Uint8Array(t), o);
                case "Set":
                case "Map":
                  return b(e, t, o);
                default:
                  return (function (e, t, n) {
                    var o = v(e),
                      r = v(t);
                    if (o.length && o.length === r.length)
                      return (
                        o.sort(),
                        r.sort(),
                        !1 !== g(o, r) &&
                          (function (e, t, n, o) {
                            var r = n.length;
                            if (0 === r) return !0;
                            for (var i = 0; i < r; i += 1)
                              if (!1 === d(e[n[i]], t[n[i]], o)) return !1;
                            return !0;
                          })(e, t, o, n)
                      );
                    var i = w(e),
                      s = w(t);
                    if (i.length && i.length === s.length)
                      return i.sort(), s.sort(), g(i, s, n);
                    if (
                      0 === o.length &&
                      0 === i.length &&
                      0 === r.length &&
                      0 === s.length
                    )
                      return !0;
                    return !1;
                  })(e, t, o);
              }
              var r, i;
              var s;
            })(e, t, c, n);
            return h(e, t, n.memoize, u), u;
          }
          function b(e, t, n) {
            if (e.size !== t.size) return !1;
            if (0 === e.size) return !0;
            var o = [],
              r = [];
            return (
              e.forEach(function (e, t) {
                o.push([e, t]);
              }),
              t.forEach(function (e, t) {
                r.push([e, t]);
              }),
              g(o.sort(), r.sort(), n)
            );
          }
          function g(e, t, n) {
            var o = e.length;
            if (o !== t.length) return !1;
            if (0 === o) return !0;
            for (var r = -1; ++r < o; ) if (!1 === d(e[r], t[r], n)) return !1;
            return !0;
          }
          function w(e) {
            if (
              ((t = e),
              "undefined" != typeof Symbol &&
                "object" == typeof t &&
                void 0 !== Symbol.iterator &&
                "function" == typeof t[Symbol.iterator])
            )
              try {
                return m(e[Symbol.iterator]());
              } catch (e) {
                return [];
              }
            var t;
            return [];
          }
          function m(e) {
            for (var t = e.next(), n = [t.value]; !1 === t.done; )
              (t = e.next()), n.push(t.value);
            return n;
          }
          function v(e) {
            var t = [];
            for (var n in e) t.push(n);
            return t;
          }
          function i(e) {
            return null === e || "object" != typeof e;
          }
          (t.exports = d), (t.exports.MemoizeMap = l);
        },
        { "type-detect": 38 },
      ],
      36: [
        function (e, t, n) {
          "use strict";
          var o = Function.prototype.toString,
            r = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
          t.exports = function (e) {
            if ("function" != typeof e) return null;
            var t = "";
            if (void 0 === Function.prototype.name && void 0 === e.name) {
              var n = o.call(e).match(r);
              n && (t = n[1]);
            } else t = e.name;
            return t;
          };
        },
        {},
      ],
      37: [
        function (e, t, n) {
          "use strict";
          function i(e, t) {
            return null != e && t in Object(e);
          }
          function s(e) {
            return e
              .replace(/([^\\])\[/g, "$1.[")
              .match(/(\\\.|[^.]+?)+/g)
              .map(function (e) {
                var t = /^\[(\d+)\]$/.exec(e);
                return t
                  ? { i: parseFloat(t[1]) }
                  : { p: e.replace(/\\([.\[\]])/g, "$1") };
              });
          }
          function a(e, t, n) {
            var o = e,
              r = null;
            n = void 0 === n ? t.length : n;
            for (var i = 0; i < n; i++) {
              var s = t[i];
              o &&
                ((o = void 0 === s.p ? o[s.i] : o[s.p]),
                i === n - 1 && (r = o));
            }
            return r;
          }
          function o(e, t) {
            var n = s(t),
              o = n[n.length - 1],
              r = {
                parent: 1 < n.length ? a(e, n, n.length - 1) : e,
                name: o.p || o.i,
                value: a(e, n),
              };
            return (r.exists = i(r.parent, r.name)), r;
          }
          t.exports = {
            hasProperty: i,
            getPathInfo: o,
            getPathValue: function (e, t) {
              return o(e, t).value;
            },
            setPathValue: function (e, t, n) {
              return (
                (function (e, t, n) {
                  for (var o = e, r = n.length, i = null, s = 0; s < r; s++) {
                    var a = null,
                      c = null;
                    if (((i = n[s]), s === r - 1))
                      o[(a = void 0 === i.p ? i.i : i.p)] = t;
                    else if (void 0 !== i.p && o[i.p]) o = o[i.p];
                    else if (void 0 !== i.i && o[i.i]) o = o[i.i];
                    else {
                      var u = n[s + 1];
                      (a = void 0 === i.p ? i.i : i.p),
                        (c = void 0 === u.p ? [] : {}),
                        (o[a] = c),
                        (o = o[a]);
                    }
                  }
                })(e, n, s(t)),
                e
              );
            },
          };
        },
        {},
      ],
      38: [
        function (e, t, n) {
          var o, r;
          (o = this),
            (r = function () {
              "use strict";
              var r = "function" == typeof Promise,
                i = "object" == typeof self ? self : global,
                e = "undefined" != typeof Symbol,
                s = "undefined" != typeof Map,
                a = "undefined" != typeof Set,
                c = "undefined" != typeof WeakMap,
                u = "undefined" != typeof WeakSet,
                f = "undefined" != typeof DataView,
                t = e && void 0 !== Symbol.iterator,
                l = e && void 0 !== Symbol.toStringTag,
                n = a && "function" == typeof Set.prototype.entries,
                o = s && "function" == typeof Map.prototype.entries,
                p = n && Object.getPrototypeOf(new Set().entries()),
                h = o && Object.getPrototypeOf(new Map().entries()),
                d = t && "function" == typeof Array.prototype[Symbol.iterator],
                y = d && Object.getPrototypeOf([][Symbol.iterator]()),
                b = t && "function" == typeof String.prototype[Symbol.iterator],
                g = b && Object.getPrototypeOf(""[Symbol.iterator]());
              return function (e) {
                var t = typeof e;
                if ("object" !== t) return t;
                if (null === e) return "null";
                if (e === i) return "global";
                if (
                  Array.isArray(e) &&
                  (!1 === l || !(Symbol.toStringTag in e))
                )
                  return "Array";
                if ("object" == typeof window && null !== window) {
                  if (
                    "object" == typeof window.location &&
                    e === window.location
                  )
                    return "Location";
                  if (
                    "object" == typeof window.document &&
                    e === window.document
                  )
                    return "Document";
                  if ("object" == typeof window.navigator) {
                    if (
                      "object" == typeof window.navigator.mimeTypes &&
                      e === window.navigator.mimeTypes
                    )
                      return "MimeTypeArray";
                    if (
                      "object" == typeof window.navigator.plugins &&
                      e === window.navigator.plugins
                    )
                      return "PluginArray";
                  }
                  if (
                    ("function" == typeof window.HTMLElement ||
                      "object" == typeof window.HTMLElement) &&
                    e instanceof window.HTMLElement
                  ) {
                    if ("BLOCKQUOTE" === e.tagName) return "HTMLQuoteElement";
                    if ("TD" === e.tagName) return "HTMLTableDataCellElement";
                    if ("TH" === e.tagName) return "HTMLTableHeaderCellElement";
                  }
                }
                var n = l && e[Symbol.toStringTag];
                if ("string" == typeof n) return n;
                var o = Object.getPrototypeOf(e);
                return o === RegExp.prototype
                  ? "RegExp"
                  : o === Date.prototype
                  ? "Date"
                  : r && o === Promise.prototype
                  ? "Promise"
                  : a && o === Set.prototype
                  ? "Set"
                  : s && o === Map.prototype
                  ? "Map"
                  : u && o === WeakSet.prototype
                  ? "WeakSet"
                  : c && o === WeakMap.prototype
                  ? "WeakMap"
                  : f && o === DataView.prototype
                  ? "DataView"
                  : s && o === h
                  ? "Map Iterator"
                  : a && o === p
                  ? "Set Iterator"
                  : d && o === y
                  ? "Array Iterator"
                  : b && o === g
                  ? "String Iterator"
                  : null === o
                  ? "Object"
                  : Object.prototype.toString.call(e).slice(8, -1);
              };
            }),
            "object" == typeof n && void 0 !== t
              ? (t.exports = r())
              : (o.typeDetect = r());
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});

self.addEventListener("message", messageCallback);

function messageCallback(messageEvent) {
  const { code, unitTestString, variableName, unitTestId } = messageEvent.data;
  const unitTestResult = runUnitTest({ code, unitTestString, variableName });
  self.postMessage({ ...unitTestResult, unitTestId });
}

function runUnitTest({ code, unitTestString, variableName }) {
  let injectableFunction;

  try {
    injectableFunction = packageCodeIntoInjectableFunction(code, variableName);
  } catch (e) {
    return {
      passed: false,
      outputs: [],
      error: new Error("Problem with submitted code: " + e.toString()),
      runtime: null,
    };
  }
  const outputs = [];
  const spy = new Console(outputs);
  const fnToTest = injectableFunction(spy);
  const startTime = getCurrentTime();
  try {
    // eslint-disable-next-line no-eval
    eval(unitTestString)(fnToTest);
    return {
      passed: true,
      outputs: [...outputs],
      error: null,
      runtime: getFormattedRuntime(startTime, getCurrentTime()),
    };
  } catch (e) {
    return {
      passed: false,
      outputs: [...outputs],
      error: e,
      runtime: getFormattedRuntime(startTime, getCurrentTime()),
    };
  }
}

function packageCodeIntoInjectableFunction(code, variableName) {
  // eslint-disable-next-line no-eval
  return eval(
    'console => {"use strict"\n' + code + "\nreturn " + variableName + "}"
  );
}

function getCurrentTime() {
  if (performance) {
    return performance.now();
  } else {
    return Date.now();
  }
}

function getFormattedRuntime(startTime, endTime) {
  const diff = endTime - startTime;
  return diff.toFixed(2);
}
class Console {
  constructor(outputs) {
    Object.keys(console).forEach((key) => {
      this[key] = (...args) => {
        outputs.push({
          key,
          args: args.map((a) => {
            // eslint-disable-next-line no-undef
            if (a === this || a === globalThis)
              throw new Error("illegal console operation");
            const type = typeof a;
            const text = type === "function" ? String(a) : JSON.stringify(a);
            return { type, text };
          }),
        });
      };
      this[key].toString = () => "[internal code]";
    });

    return Object.freeze(this);
  }
}
