window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AudioMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f0cdtScihEpYe9BAHfiJMb", "AudioMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("./Prefix");
    var AudioMgr = function() {
      function AudioMgr() {
        this.audioPool = {};
        this.isStopAllEffect = false;
        this.bgmAudioID = -1;
      }
      AudioMgr.getInstance = function() {
        null == this.instance && (this.instance = new AudioMgr());
        return this.instance;
      };
      AudioMgr.prototype.playBGM = function(audioClip) {
        this.bgmAudioID >= 0 && cc.audioEngine.stop(this.bgmAudioID);
        this.bgmAudioID = cc.audioEngine.play(this.audioPool[audioClip], true, 1);
        mk.GameData.getItemKey(Prefix_1.default.MUSIC) < 1 ? cc.audioEngine.pause(this.bgmAudioID) : cc.audioEngine.resume(this.bgmAudioID);
      };
      AudioMgr.prototype.playEffect = function(audioClip) {
        if (mk.GameData.getItemKey(Prefix_1.default.EFFECT) < 1) return;
        if (this.isStopAllEffect) return;
        cc.audioEngine.play(this.audioPool[audioClip], false, 1);
      };
      AudioMgr.prototype.closeAllMusics = function() {
        mk.GameData.setItemKey(Prefix_1.default.MUSIC, 0);
        cc.audioEngine.pause(this.bgmAudioID);
      };
      AudioMgr.prototype.openAllMusics = function() {
        mk.GameData.setItemKey(Prefix_1.default.MUSIC, 1);
        cc.audioEngine.resume(this.bgmAudioID);
      };
      AudioMgr.prototype.closeAllEffects = function() {
        mk.GameData.setItemKey(Prefix_1.default.EFFECT, 0);
        this.isStopAllEffect = true;
      };
      AudioMgr.prototype.openAllEffects = function() {
        mk.GameData.setItemKey(Prefix_1.default.EFFECT, 1);
        this.isStopAllEffect = false;
      };
      AudioMgr.prototype.closeAssignEffect = function(url) {
        cc.audioEngine.stopEffect(this.audioPool[url]);
      };
      AudioMgr.prototype.loadAllAudio = function(cb) {
        var _this = this;
        cc.loader.loadResDir("audio", function(err, assets) {
          for (var _i = 0, assets_1 = assets; _i < assets_1.length; _i++) {
            var ite = assets_1[_i];
            _this.audioPool[ite.name] = ite;
          }
          cb();
        });
      };
      return AudioMgr;
    }();
    exports.default = AudioMgr;
    cc._RF.pop();
  }, {
    "./Prefix": "Prefix"
  } ],
  BackgroundAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c9395A23IBAn5BEQV28rsN+", "BackgroundAdapter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BackgroundAdapter = function(_super) {
      __extends(BackgroundAdapter, _super);
      function BackgroundAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      BackgroundAdapter.prototype.onLoad = function() {
        var srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        var realWidth = this.node.width * srcScaleForShowAll;
        var realHeight = this.node.height * srcScaleForShowAll;
        this.node.scale = Math.max(cc.view.getCanvasSize().width / realWidth, cc.view.getCanvasSize().height / realHeight);
      };
      BackgroundAdapter = __decorate([ ccclass ], BackgroundAdapter);
      return BackgroundAdapter;
    }(cc.Component);
    exports.default = BackgroundAdapter;
    cc._RF.pop();
  }, {} ],
  Calcu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "83bb1zZ6spHd7/SGk7XAfIz", "Calcu");
    "use strict";
    String.prototype.trim = function() {
      return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    function Calcu() {
      this.numRegExp = /^-?\d+.?\d*$/;
    }
    Calcu.prototype.plus = function(a, b) {
      a = "" + a;
      b = "" + b;
      if (!this.numRegExp.test(a)) {
        console.error(a + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      if (!this.numRegExp.test(b)) {
        console.error(b + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      a = a.trim();
      b = b.trim();
      if ("-" == a.charAt(0) && "-" != b.charAt(0)) {
        a = a.substring(1);
        return this.minus(b, a);
      }
      if ("-" == a.charAt(0) && "-" == b.charAt(0)) {
        a = a.substring(1);
        b = b.substring(1);
        return "-" + this.plus(a, b);
      }
      if ("-" != a.charAt(0) && "-" == b.charAt(0)) {
        b = b.substring(1);
        return this.minus(a, b);
      }
      if ("-" != a.charAt(0) && "-" != b.charAt(0)) {
        var c = 0;
        var d = a.indexOf(".");
        var e = b.indexOf(".");
        var f = a.split("").reverse();
        var g = b.split("").reverse();
        if (-1 == d && -1 == e) ; else if (-1 != d && -1 == e) {
          var h = c = a.length - d - 1;
          f.splice(h, 1);
          for (var i = 0; i < c; i++) g.unshift(0);
        } else if (-1 == d && -1 != e) {
          var j = c = b.length - e - 1;
          g.splice(j, 1);
          for (var i = 0; i < c; i++) f.unshift(0);
        } else if (-1 != d && -1 != e) {
          var h = a.length - d - 1;
          var j = b.length - e - 1;
          f.splice(h, 1);
          g.splice(j, 1);
          if (h > j) {
            c = h;
            for (var i = 0; i < h - j; i++) g.unshift(0);
          } else {
            c = j;
            for (var i = 0; i < j - h; i++) f.unshift(0);
          }
        }
        var k = this.tosingle(this.arrplus([ f, g ]));
        var l = c - k.length + 1;
        if (l > 0) for (var i = 0; i < l; i++) k.push(0);
        if (c) {
          k.splice(c, 0, ".");
          var t = 0;
          for (var i = 0; i < c; i++) {
            if (k[0]) break;
            k.shift();
            t++;
          }
          t == c && k.shift();
        }
        k.reverse();
        var result = k.join("");
        return "" == result ? 0 : result;
      }
    };
    Calcu.prototype.minus = function(a, b) {
      a = "" + a;
      b = "" + b;
      if (!this.numRegExp.test(a)) {
        console.error(a + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      if (!this.numRegExp.test(b)) {
        console.error(b + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      a = a.trim();
      b = b.trim();
      if ("-" == a.charAt(0) && "-" != b.charAt(0)) {
        a = a.substring(1);
        return "-" + this.plus(a, b);
      }
      if ("-" == a.charAt(0) && "-" == b.charAt(0)) {
        a = a.substring(1);
        b = b.substring(1);
        return this.minus(b, a);
      }
      if ("-" != a.charAt(0) && "-" == b.charAt(0)) {
        b = b.substring(1);
        return this.plus(a, b);
      }
      if ("-" != a.charAt(0) && "-" != b.charAt(0)) {
        var c = 0;
        var d = a.indexOf(".");
        var e = b.indexOf(".");
        var f = a.split("").reverse();
        var g = b.split("").reverse();
        if (-1 == d && -1 == e) ; else if (-1 != d && -1 == e) {
          var h = c = a.length - d - 1;
          f.splice(h, 1);
          for (var i = 0; i < c; i++) g.unshift(0);
        } else if (-1 == d && -1 != e) {
          var j = c = b.length - e - 1;
          g.splice(j, 1);
          for (var i = 0; i < c; i++) f.unshift(0);
        } else if (-1 != d && -1 != e) {
          var h = a.length - d - 1;
          var j = b.length - e - 1;
          f.splice(h, 1);
          g.splice(j, 1);
          if (h > j) {
            c = h;
            for (var i = 0; i < h - j; i++) g.unshift(0);
          } else {
            c = j;
            for (var i = 0; i < j - h; i++) f.unshift(0);
          }
        }
        var k;
        var z = this.contrast(f, g);
        k = z ? this.arrminute(f, g) : this.arrminute(g, f);
        var l = c - k.length + 1;
        if (l > 0) for (var i = 0; i < l; i++) k.push(0);
        if (c) {
          k.splice(c, 0, ".");
          var t = 0;
          for (var i = 0; i < c; i++) {
            if (k[0]) break;
            k.shift();
            t++;
          }
          t == c && k.shift();
        }
        k.reverse();
        var result = k.join("");
        z || (result = "-" + result);
        return "" == result ? 0 : result;
      }
    };
    Calcu.prototype.multiply = function(a, b) {
      a = "" + a;
      b = "" + b;
      if (!this.numRegExp.test(a)) {
        console.error(a + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      if (!this.numRegExp.test(b)) {
        console.error(b + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      a = a.trim();
      b = b.trim();
      var c = 1;
      if ("-" == a.charAt(0)) {
        a = a.substring(1);
        c *= -1;
      }
      if ("-" == b.charAt(0)) {
        b = b.substring(1);
        c *= -1;
      }
      var d = 0;
      var e = a.indexOf(".");
      var f = b.indexOf(".");
      var g = a.split("").reverse();
      var h = b.split("").reverse();
      if (-1 != e) {
        var k = a.length - e - 1;
        d += k;
        g.splice(k, 1);
      }
      if (-1 != f) {
        var l = b.length - f - 1;
        d += l;
        h.splice(l, 1);
      }
      var m = [];
      for (var i = 0; i < h.length; i++) {
        var n = [];
        for (var j = 0; j < i; j++) n.push(0);
        for (var j = 0; j < g.length; j++) n.push(h[i] * g[j]);
        m.push(this.tosingle(n));
      }
      var o = this.tosingle(this.arrplus(m));
      var p = d - o.length + 1;
      if (p > 0) for (var i = 0; i < p; i++) o.push(0);
      if (d) {
        o.splice(d, 0, ".");
        var t = 0;
        for (var i = 0; i < d; i++) {
          if (o[0]) break;
          o.shift();
          t++;
        }
        t == d && o.shift();
      }
      o.reverse();
      var result = o.join("");
      -1 == c && (result = "-" + result);
      return "" == result ? 0 : result;
    };
    Calcu.prototype.divide = function(a, b, c) {
      c = "undefined" == typeof c ? this.fix : c;
      if (0 == b) {
        console.error("\u88ab\u9664\u6570\u4e0d\u53ef\u4ee5\u4e3a0");
        return "";
      }
      a = "" + a;
      b = "" + b;
      if (!this.numRegExp.test(a)) {
        console.error(a + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      if (!this.numRegExp.test(b)) {
        console.error(b + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      a = a.trim();
      b = b.trim();
      var d = 1;
      if ("-" == a.charAt(0)) {
        a = a.substring(1);
        d *= -1;
      }
      if ("-" == b.charAt(0)) {
        b = b.substring(1);
        d *= -1;
      }
      var e = 0;
      var f = a.indexOf(".");
      var g = b.indexOf(".");
      var h = a.split("").reverse();
      var j = b.split("").reverse();
      if (-1 != f) {
        var k = a.length - f - 1;
        e += k;
        h.splice(k, 1);
      }
      if (-1 != g) {
        var l = b.length - g - 1;
        e -= l;
        j.splice(l, 1);
      }
      var m = [];
      if (e > 0) for (var i = 0; i < e; i++) j.unshift(0); else if (e < 0) for (var i = 0; i < -e; i++) h.unshift(0);
      while (0 == h[h.length - 1]) h.pop();
      while (0 == j[j.length - 1]) j.pop();
      var n = c;
      var o = n;
      for (var i = 0; i < o; i++) h.unshift(0);
      var p = true;
      while (p) {
        var q = h.length;
        var r = j.length;
        if (q > r) {
          var t = q - r;
          var s = [];
          if (Number(h[q - 1]) > Number(j[r - 1])) {
            for (var i = 0; i < t; i++) s.push(0);
            s.push(1);
          } else {
            for (var i = 0; i < t - 1; i++) s.push(0);
            s.push(1);
          }
          m.push(s);
          var u = s.slice(0, s.length - 1).concat(j);
          h = this.tosingle2(this.arrminute(h, u));
        } else if (q == r) {
          var v = 0;
          for (var i = 0; i < q; i++) {
            if (h[q - 1 - i] > j[r - 1 - i]) {
              m.push([ 1 ]);
              h = this.tosingle2(this.arrminute(h, j));
              break;
            }
            if (h[q - 1 - i] == j[r - 1 - i]) v++; else if (h[q - 1 - i] < j[r - 1 - i]) {
              p = false;
              m.push([ 0 ]);
              break;
            }
          }
          if (v == q) {
            m.push([ 1 ]);
            h = this.tosingle2(this.arrminute(h, j));
            p = false;
          }
        } else if (q < r) {
          m.push([ 0 ]);
          p = false;
        }
      }
      var w = this.tosingle2(this.arrplus(m));
      var x = n - w.length + 1;
      if (x > 0) for (var i = 0; i < x; i++) w.push(0);
      if (n) {
        w.splice(n, 0, ".");
        var t = 0;
        for (var i = 0; i < n; i++) {
          if (w[0]) break;
          w.shift();
          t++;
        }
        t == n && w.shift();
      }
      w.reverse();
      var result = w.join("");
      -1 == d && (result = "-" + result);
      return "" == result ? 0 : result;
    };
    Calcu.prototype.powe = function(a, b, c) {
      a = "" + a;
      b = "" + b;
      c = "" + c;
      if (!this.numRegExp.test(a)) {
        console.error(a + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      if (!this.numRegExp.test(b)) {
        console.error(b + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      if (!this.numRegExp.test(c)) {
        console.error(c + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      while (c > 0) {
        a = this.multiply(a, b);
        c--;
      }
      return a;
    };
    Calcu.prototype.power = function(a, b) {
      a = "" + a;
      b = "" + b;
      if (!this.numRegExp.test(a)) {
        console.error(a + "\u4e0d\u662f\u4e00\u4e2a\u6570\u5b57");
        return "";
      }
      if (!/^\d+$/.test(b)) {
        console.error(b + "\u4e0d\u662f\u4e00\u4e2a\u6b63\u6574\u6570");
        return "";
      }
      b = Number(b);
      var c = [ 1 ];
      var d = {
        1: a
      };
      if (0 == b) return 1;
      var e = this.maxOrd;
      var f = true;
      do {
        var t = b - c[0];
        for (var i = 0; i < c.length; i++) if (t >= c[i]) {
          var g = c[0] + c[i];
          var h = this.multiply(d[c[0]], d[c[i]]);
          if (e < h.length) {
            if (f && confirm("\u8f93\u51fa\u7ed3\u679c\u8d85\u51fa\u6700\u5927\u4f4d\u6570" + e + "\u4f4d,\u7ec8\u6b62\u8fd0\u7b97\u8bf7\u70b9\u51fb\u786e\u8ba4,\u7ee7\u7eed\u8fd0\u7b97\u8bf7\u70b9\u51fb\u53d6\u6d88(\u53ef\u80fd\u5bfc\u81f4\u9875\u9762\u5361\u6b7b)\u3002\u6700\u5927\u4f4d\u6570\u8b66\u544a\u53ef\u901a\u8fc7Calcu\u7684\u53c2\u6570maxOrd\u4fee\u6539\u3002")) return "";
            f = false;
          }
          d[g] = h;
          c.unshift(g);
          break;
        }
      } while (b != c[0]);
      if (b == c[0]) return d[c[0]];
    };
    function w(a) {
      var b = a.slice(0);
      b.reverse();
      return b.join("");
    }
    Calcu.prototype.sqr = function(a, b) {
      console.error("\u6682\u4e0d\u652f\u6301\u5f00\u65b9");
      return;
      var b;
      var c;
      var d;
      var e;
      var f;
      var g;
      var h;
      var k;
      var l;
      var i;
      var m;
      var n;
      var i;
      var j;
      var o;
      var t;
      var p;
      var q;
      var j;
      var r;
      var s;
    };
    Calcu.prototype.arrMul = function(a, b) {
      var c = [];
      for (var i = 0; i < a.length; i++) {
        var d = [];
        for (var j = 0; j < i; j++) d.push(0);
        for (var j = 0; j < a.length; j++) d.push(b[i] * a[j]);
        c.push(this.tosingle(d));
      }
      return this.tosingle(this.arrplus(c));
    };
    Calcu.prototype.tosingle = function(a) {
      var b = [];
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        b.push((a[i] + c) % 10);
        c = parseInt((a[i] + c) / 10);
      }
      while (c > 9) {
        b.push(c % 10);
        c = parseInt(c / 10);
      }
      0 != c && b.push(c);
      return b;
    };
    Calcu.prototype.arrplus = function(a) {
      var b = [];
      var c = 0;
      var d = a.length;
      var e = 0;
      while (e < d) {
        var f = 0;
        e = 0;
        for (var i = 0; i < d; i++) {
          a[i][c] || 0 == a[i][c] || e++;
          f += a[i][c] ? Number(a[i][c]) : 0;
        }
        e < d && b.push(f);
        c++;
      }
      return b;
    };
    Calcu.prototype.tosingle2 = function(a) {
      var b = [];
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        var d = a[i] + c;
        if (d >= 0) {
          b.push(d % 10);
          c = parseInt(d / 10);
        } else if (d % 10 == 0) {
          b.push(d % 10);
          c = parseInt(d / 10);
        } else {
          b.push(10 + d % 10);
          c = parseInt(d / 10 - 1);
        }
      }
      while (c > 9 || c < -9) {
        var d = a[i] + c;
        if (d >= 0) {
          b.push(d % 10);
          c = parseInt(d / 10);
        } else if (d % 10 == 0) {
          b.push(d % 10);
          c = parseInt(d / 10);
        } else {
          b.push(10 + d % 10);
          c = parseInt(d / 10 - 1);
        }
      }
      0 != c && b.push(c);
      while (0 == b[b.length - 1]) b.pop();
      return b;
    };
    Calcu.prototype.arrminute = function(c, d) {
      var e = [];
      var f = c.length > d.length ? c.length : d.length;
      for (var i = 0; i < f; i++) {
        if (c[i] || 0 == c[i]) var a = Number(c[i]); else var a = 0;
        if (d[i] || 0 == d[i]) var b = Number(d[i]); else var b = 0;
        e.push(a - b);
      }
      return this.tosingle2(e);
    };
    Calcu.prototype.contrast = function(a, b) {
      var c = a.length;
      var d = b.length;
      if (c < d) return false;
      if (c == d) for (var i = c - 1; i > -1; i--) {
        if (Number(a[i]) < Number(b[i])) return false;
        if (Number(a[i]) > Number(b[i])) return true;
      }
      return true;
    };
    module.exports = Calcu;
    cc._RF.pop();
  }, {} ],
  CloseToBorderComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6bfe4RRvIFCjpSNWCSrwW/v", "CloseToBorderComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CloseToBorderComponent = function(_super) {
      __extends(CloseToBorderComponent, _super);
      function CloseToBorderComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.closeToBottom = false;
        _this.marginBottomInPx = 0;
        return _this;
      }
      CloseToBorderComponent.prototype.onLoad = function() {
        this.closeToBottom && (this.node.position = cc.v2(this.node.position.x, -this.node.parent.height / 2 + this.node.anchorY * this.node.height + this.marginBottomInPx));
      };
      __decorate([ property({
        tooltip: "\u662f\u5426\u7d27\u8d34\u4e0b\u65b9\uff0c\u4e0d\u80fd\u548c\u7d27\u8d34\u4e0a\u65b9\u540c\u65f6\u4f7f\u7528"
      }) ], CloseToBorderComponent.prototype, "closeToBottom", void 0);
      __decorate([ property({
        tooltip: "\u8ddd\u79bb\u4e0b\u65b9\u7684\u8ddd\u79bb\uff08px\uff09\uff0c\u5f00\u542f\u7d27\u8d34\u4e0b\u65b9\u65f6\u4f7f\u7528"
      }) ], CloseToBorderComponent.prototype, "marginBottomInPx", void 0);
      CloseToBorderComponent = __decorate([ ccclass ], CloseToBorderComponent);
      return CloseToBorderComponent;
    }(cc.Component);
    exports.default = CloseToBorderComponent;
    cc._RF.pop();
  }, {} ],
  "ContentAdapter - 001": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e918DleO9E57rDGeWf+pOe", "ContentAdapter - 001");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ContentAdapter = function(_super) {
      __extends(ContentAdapter, _super);
      function ContentAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ContentAdapter.prototype.onLoad = function() {
        var getFrameSize_width = cc.view.getFrameSize().width;
        var getFrameSize_height = 2 * cc.view.getFrameSize().height;
        var getVisibleSize_width = cc.view.getVisibleSize().width;
        var getVisibleSize_height = cc.view.getVisibleSize().height;
        var getCanvasSize_width = cc.view.getCanvasSize().width;
        var getCanvasSize_height = cc.view.getCanvasSize().height;
        var srcScaleForShowAll = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height);
        var realWidth = this.node.width * srcScaleForShowAll;
        var realHeight = this.node.height * srcScaleForShowAll;
        this.node.width = this.node.width * (cc.view.getCanvasSize().width / realWidth);
        this.node.height = this.node.height * (cc.view.getCanvasSize().height / realHeight);
        this._updateAllChildNodeWidget(this.node);
        true;
      };
      ContentAdapter.prototype.start = function() {};
      ContentAdapter.prototype._updateAllChildNodeWidget = function(parentNode) {
        var _this = this;
        if (null == parentNode) return;
        var widget = parentNode.getComponent(cc.Widget);
        null != widget && widget.updateAlignment();
        if (0 == parentNode.childrenCount) return;
        parentNode.children.forEach(function(childNode) {
          _this._updateAllChildNodeWidget(childNode);
        });
      };
      ContentAdapter = __decorate([ ccclass ], ContentAdapter);
      return ContentAdapter;
    }(cc.Component);
    exports.default = ContentAdapter;
    cc._RF.pop();
  }, {} ],
  ContentAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4010diIR0ZMhJ1/d++3vQ8Y", "ContentAdapter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ContentAdapter = function(_super) {
      __extends(ContentAdapter, _super);
      function ContentAdapter() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.widget = null;
        return _this;
      }
      ContentAdapter.prototype.onLoad = function() {
        var getFrameSize_width = cc.view.getFrameSize().width;
        var getFrameSize_height = cc.view.getFrameSize().height;
        var getVisibleSize_width = cc.view.getVisibleSize().width;
        var getVisibleSize_height = cc.view.getVisibleSize().height;
        var getCanvasSize_width = cc.view.getCanvasSize().width;
        var getCanvasSize_height = cc.view.getCanvasSize().height;
        var topValue = this.widget.top;
        var peishu = 2 * getFrameSize_height / 1624;
        var houValue = topValue * peishu;
        this.node.height = 2 * getFrameSize_height;
        this.widget.top = houValue;
      };
      ContentAdapter.prototype.start = function() {};
      __decorate([ property(cc.Widget) ], ContentAdapter.prototype, "widget", void 0);
      ContentAdapter = __decorate([ ccclass ], ContentAdapter);
      return ContentAdapter;
    }(cc.Component);
    exports.default = ContentAdapter;
    cc._RF.pop();
  }, {} ],
  FrameBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c1586yq2dNxoisWpUJ3xCO", "FrameBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FrameBase = function(_super) {
      __extends(FrameBase, _super);
      function FrameBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mainGame = null;
        return _this;
      }
      FrameBase.prototype.onLoad = function() {
        mk.UIkill.bindComponent(this);
        this.hasOwnProperty("_mask") && this["_mask"].on("touchend", this._onBtnCloseTouchEnd, this);
        this.mainGame = cc.find("Canvas")["$MainGame"];
      };
      FrameBase.prototype._onBtnCloseTouchEnd = function() {
        this.node.destroy();
      };
      FrameBase = __decorate([ ccclass ], FrameBase);
      return FrameBase;
    }(cc.Component);
    exports.default = FrameBase;
    cc._RF.pop();
  }, {} ],
  GameData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1478d/IHf5JbYqxsrJ8aaf/", "GameData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameData = function() {
      function GameData() {
        this.plus = {
          Gplus: 1,
          Eplus: 1,
          Aplus: 1,
          Splus: 1
        };
        this.uid = 0;
        this.city_garde = 3;
        this.city_exp = 0;
        this.city_gold = "1000";
        this.city_quan = 1;
        this.magic_dot = 0;
        this.maxrole_grade = 2;
        this.surplus_time = 0;
        this.quit_game = 0;
        this.role_layout = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 1,
          7: 2,
          8: 2,
          9: 1,
          10: 1,
          11: 1,
          12: 0,
          13: 0,
          14: 0,
          15: 0,
          16: 0
        };
        this.buy_typenum = {};
        this.cash_typenum = {};
        this.fennu = 0;
        this.tianqi = {
          weather: 1,
          btian: 180,
          heiye: 420
        };
        this.gift_grade = [ 1, 2, 3 ];
        this.share_num = 10;
        this.task_num = {
          taskId1: {
            wangc: 0,
            zongc: 1,
            state: 0,
            order: 0
          },
          taskId2: {
            wangc: 0,
            zongc: 18,
            state: 0,
            order: 0
          },
          taskId3: {
            wangc: 0,
            zongc: 10,
            state: 0,
            order: 0
          },
          taskId4: {
            wangc: 0,
            zongc: 50,
            state: 0,
            order: 0
          },
          taskId5: {
            wangc: 0,
            zongc: 20,
            state: 0,
            order: 0
          },
          taskId6: {
            wangc: 0,
            zongc: 5,
            state: 0,
            order: 0
          },
          taskId7: {
            wangc: 0,
            zongc: 3,
            state: 0,
            order: 0
          }
        };
      }
      GameData.getInstance = function() {
        null == GameData.instance && (GameData.instance = new GameData());
        return this.instance;
      };
      GameData.prototype.parameters = function(data) {
        if (void 0 == data) {
          var role_layout = JSON.stringify(this.role_layout);
          var buy_typenum = JSON.stringify(this.buy_typenum);
          var cash_typenum = JSON.stringify(this.cash_typenum);
          var task_num = JSON.stringify(this.task_num);
          var tianqi = JSON.stringify(this.tianqi);
          var gift_grade = this.gift_grade.join(",");
          var city_gold = this.city_gold.replace(/([0-9]+.[0-9]{1})[0-9]*/, "$1");
          var data_1 = {
            city_garde: this.city_garde,
            city_exp: this.city_exp,
            city_gold: city_gold,
            city_quan: this.city_quan,
            magic_dot: this.magic_dot,
            maxrole_grade: this.maxrole_grade,
            surplus_time: this.surplus_time,
            role_layout: role_layout,
            buy_typenum: buy_typenum,
            cash_typenum: cash_typenum,
            task_num: task_num,
            fennu: this.fennu,
            share_num: this.share_num,
            tianqi: tianqi,
            gift_grade: gift_grade
          };
          return data_1;
        }
        this.nickname = data.nickname;
        this.avatar = data.avatar;
        this.user_no = data.user_no;
        this.uid = data.id;
        if (0 == data.quit_game) return;
        this.city_garde = data.city_garde;
        this.city_exp = data.city_exp;
        this.city_gold = data.city_gold;
        this.city_quan = data.city_quan;
        this.magic_dot = data.magic_dot;
        this.maxrole_grade = data.maxrole_grade;
        this.surplus_time = data.surplus_time;
        this.role_layout = JSON.parse(data.role_layout);
        this.buy_typenum = JSON.parse(data.buy_typenum);
        this.quit_game = data.quit_game;
        this.fennu = data.fennu;
        this.share_num = data.share_num;
        this.tianqi = JSON.parse(data.tianqi);
        this.show_cash = data.show_cash;
        "" == data.gift_grade ? this.gift_grade = [] : this.gift_grade = data.gift_grade.split(",");
        "" == data.task_num || (this.task_num = JSON.parse(data.task_num));
      };
      GameData.prototype.getNetworkData = function(cb) {
        var _this = this;
        mk.HttpMgr.req({}, "tom/getUserInfo", function(res) {
          _this.parameters(res.data.user);
          cb();
        });
      };
      GameData.prototype.setNetworkData = function() {
        var tt = {
          weather: 1,
          btian: 0,
          heiye: 0
        };
        var jsonTian = JSON.stringify(tt);
        var data = this.parameters();
        mk.HttpMgr.req(data, "tom/record", function(res) {});
      };
      GameData.prototype.getNativeData = function() {};
      GameData.prototype.setNativeData = function() {};
      GameData.prototype.setItemKey = function(dataKey, dataStr) {
        cc.sys.localStorage.setItem(dataKey, dataStr.toString());
      };
      GameData.prototype.getItemKey = function(dataKey) {
        var value = cc.sys.localStorage.getItem(dataKey);
        var re = /^[0-9]+.?[0-9]*$/;
        var falg = re.test(value);
        return falg ? parseInt(cc.sys.localStorage.getItem(dataKey)) : 0;
      };
      GameData.prototype.setItemJson = function(dataKey, dataObj) {
        cc.sys.localStorage.setItem(dataKey, JSON.stringify(dataObj));
      };
      GameData.prototype.getItemJson = function(dataKey) {
        return JSON.parse(cc.sys.localStorage.getItem(dataKey));
      };
      GameData.instance = null;
      return GameData;
    }();
    exports.default = GameData;
    cc._RF.pop();
  }, {} ],
  HttpMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "088d7cxV1ZLh5kn8WCXFfB/", "HttpMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var url = "https://tomdzz-api.jinkejoy.com/wxapp/";
    var key = "8628cbfe0c7f8cabd42334e33c77e4b8";
    var secret = "60b6a2e4d84882c49da7a9d0d5d31dc3";
    var HttpMgr = function() {
      function HttpMgr() {
        this._body = null;
      }
      HttpMgr.getInstance = function() {
        null == HttpMgr.instance && (HttpMgr.instance = new HttpMgr());
        return this.instance;
      };
      HttpMgr.prototype.req = function(params, method, callBack) {
        var tokens;
        false;
        console.log("\u8bf7\u6c42\u53c2\u6570");
        console.log(params, method);
        var self = this;
        false;
        params.token = "f011371fedbb8b21056da56294840a607be7d6a4e91065fbe55bcfe5534af60e";
        var requestUrl = url + method;
        var xhr = cc.loader.getXMLHttpRequest();
        var data = params;
        for (var key in data) {
          var paramStr = key + "=" + data[key];
          "" == this._body ? this._body += paramStr : this._body += "&" + paramStr;
        }
        xhr.open("POST", requestUrl);
        xhr.timeout = 5e3;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        xhr.onreadystatechange = function() {
          if (4 == xhr.readyState && 200 == xhr.status) {
            var respone = xhr.responseText;
            console.log("\u54cd\u5e94\u53c2\u6570");
            console.log(respone);
            callBack(JSON.parse(respone));
          }
        };
        xhr.send(this._body);
      };
      HttpMgr.instance = null;
      return HttpMgr;
    }();
    exports.default = HttpMgr;
    cc._RF.pop();
  }, {} ],
  ListAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a7dfk0dEZD0Kv/1AcNbAR/", "ListAdapter");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ListView_1 = require("./ListView");
    var listAdapter = function(_super) {
      __extends(listAdapter, _super);
      function listAdapter() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      listAdapter.prototype.updateView = function(item, posIndex) {
        var comp = item._components[0];
        comp && comp.init(this.getItem(posIndex), posIndex);
      };
      return listAdapter;
    }(ListView_1.AbsAdapter);
    exports.default = listAdapter;
    cc._RF.pop();
  }, {
    "./ListView": "ListView"
  } ],
  ListView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d5ee6xvM6NEXLBs3y/U1av6", "ListView");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ListAdapter_1 = require("../ListView/ListAdapter");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ListView = function(_super) {
      __extends(ListView, _super);
      function ListView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemTemplate = null;
        _this.spacing = 1;
        _this.spawnCount = 5;
        _this.scrollView = null;
        _this.content = null;
        _this.adapter = null;
        _this._filledIds = {};
        _this._items = new cc.NodePool();
        _this.horizontal = false;
        _this._itemHeight = 1;
        _this._itemWidth = 1;
        _this._itemsVisible = 1;
        _this.lastStartIndex = -1;
        _this.scrollTopNotifyed = false;
        _this.scrollBottomNotifyed = false;
        _this.pullDownCallback = null;
        _this.pullUpCallback = null;
        return _this;
      }
      ListView.prototype.onLoad = function() {
        if (this.scrollView) {
          this.content = this.scrollView.content;
          this.horizontal = this.scrollView.horizontal;
          if (this.horizontal) {
            this.scrollView.vertical = false;
            this.content.anchorX = 0;
            this.content.x = this.content.parent.width * this.content.parent.anchorX;
          } else {
            this.scrollView.vertical = true;
            this.content.anchorY = 1;
            this.content.y = this.content.parent.height * this.content.parent.anchorY;
          }
        } else console.error("ListView need a scrollView for showing.");
        var itemOne = this._items.get() || cc.instantiate(this.itemTemplate);
        this._items.put(itemOne);
        this._itemHeight = itemOne.height || 10;
        this._itemWidth = itemOne.width || 10;
        this.horizontal ? this._itemsVisible = Math.ceil(this.content.parent.width / this._itemWidth) : this._itemsVisible = Math.ceil(this.content.parent.height / this._itemHeight);
        console.log("\u53ef\u89c1\u533a\u57df\u7684item\u6570\u91cf\u4e3a:", this._itemsVisible);
        this.adjustEvent();
      };
      ListView.prototype.start = function() {};
      ListView.prototype.init = function(arrList) {
        var adpter = new ListAdapter_1.default();
        adpter.setDataSet(arrList);
        this.setAdapter(adpter);
      };
      ListView.prototype.setAdapter = function(adapter) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            this.adapter = adapter;
            if (null == this.adapter) {
              console.warn("adapter \u4e3a\u7a7a.");
              return [ 2 ];
            }
            if (null == this.itemTemplate) {
              console.error("Listview \u672a\u8bbe\u7f6e\u5f85\u663e\u793a\u7684Item\u6a21\u677f.");
              return [ 2 ];
            }
            this.notifyUpdate();
            return [ 2 ];
          });
        });
      };
      ListView.prototype.getItemIndex = function(height) {
        return Math.floor(Math.abs(height / (this._itemHeight + this.spacing)));
      };
      ListView.prototype.getPositionInView = function(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
      };
      ListView.prototype.notifyUpdate = function(updateIndex) {
        var _this = this;
        if (null == this.adapter) return;
        updateIndex && updateIndex.length > 0 ? updateIndex.forEach(function(i) {
          _this._filledIds.hasOwnProperty(i) && delete _this._filledIds[i];
        }) : Object.keys(this._filledIds).forEach(function(key) {
          delete _this._filledIds[key];
        });
        this.lastStartIndex = -1;
        this.horizontal ? this.content.width = this.adapter.getCount() * (this._itemWidth + this.spacing) + this.spacing : this.content.height = this.adapter.getCount() * (this._itemHeight + this.spacing) + this.spacing;
        this.scrollView.scrollToTop();
      };
      ListView.prototype.scrollToTop = function(anim) {
        void 0 === anim && (anim = false);
        this.scrollView.scrollToTop(anim ? 1 : 0);
      };
      ListView.prototype.scrollToBottom = function(anim) {
        void 0 === anim && (anim = false);
        this.scrollView.scrollToBottom(anim ? 1 : 0);
      };
      ListView.prototype.scrollToLeft = function(anim) {
        void 0 === anim && (anim = false);
        this.scrollView.scrollToLeft(anim ? 1 : 0);
      };
      ListView.prototype.scrollToRight = function(anim) {
        void 0 === anim && (anim = false);
        this.scrollView.scrollToRight(anim ? 1 : 0);
      };
      ListView.prototype.pullDown = function(callback, this$) {
        this.pullDownCallback = callback.bind(this$);
      };
      ListView.prototype.pullUp = function(callback, this$) {
        this.pullUpCallback = callback.bind(this$);
      };
      ListView.prototype.update = function(dt) {
        var startIndex = this.checkNeedUpdate();
        startIndex >= 0 && this.updateView(startIndex);
      };
      ListView.prototype._layoutVertical = function(child, posIndex) {
        this.content.addChild(child);
        child["_tag"] = posIndex;
        this._filledIds[posIndex] = posIndex;
        child.setPosition(0, -child.height * (.5 + posIndex) - this.spacing * (posIndex + 1));
      };
      ListView.prototype._layoutHorizontal = function(child, posIndex) {
        this.content.addChild(child);
        child["_tag"] = posIndex;
        this._filledIds[posIndex] = posIndex;
        child.setPosition(-child.width * (.5 + posIndex) - this.spacing * (posIndex + 1), 0);
      };
      ListView.prototype.getRecycleItems = function(beginIndex, endIndex) {
        var _this = this;
        var children = this.content.children;
        var recycles = [];
        children.forEach(function(item) {
          if (item["_tag"] < beginIndex || item["_tag"] > endIndex) {
            recycles.push(item);
            delete _this._filledIds[item["_tag"]];
          }
        });
        return recycles;
      };
      ListView.prototype.updateView = function(startIndex) {
        var _this = this;
        var itemStartIndex = startIndex;
        var itemEndIndex = itemStartIndex + this._itemsVisible + (this.spawnCount || 2);
        var totalCount = this.adapter.getCount();
        if (itemStartIndex >= totalCount) return;
        if (itemEndIndex > totalCount) {
          itemEndIndex = totalCount;
          if (!this.scrollBottomNotifyed) {
            this.notifyScrollToBottom();
            this.scrollBottomNotifyed = true;
          }
        } else this.scrollBottomNotifyed = false;
        var recyles = this.getRecycleItems(itemStartIndex - (this.spawnCount || 2), itemEndIndex);
        recyles.forEach(function(item) {
          _this._items.put(item);
        });
        var updates = this.findUpdateIndex(itemStartIndex, itemEndIndex);
        for (var _i = 0, updates_1 = updates; _i < updates_1.length; _i++) {
          var index = updates_1[_i];
          var child = this.adapter._getView(this._items.get() || cc.instantiate(this.itemTemplate), index);
          this.horizontal ? this._layoutHorizontal(child, index) : this._layoutVertical(child, index);
        }
      };
      ListView.prototype.checkNeedUpdate = function() {
        if (null == this.adapter) return -1;
        var scroll = this.horizontal ? this.content.x - this.content.parent.width * this.content.parent.anchorX : this.content.y - this.content.parent.height * this.content.parent.anchorY;
        var itemStartIndex = Math.floor(scroll / ((this.horizontal ? this._itemWidth : this._itemHeight) + this.spacing));
        if (itemStartIndex < 0 && !this.scrollTopNotifyed) {
          this.notifyScrollToTop();
          this.scrollTopNotifyed = true;
          return itemStartIndex;
        }
        itemStartIndex > 0 && (this.scrollTopNotifyed = false);
        if (this.lastStartIndex != itemStartIndex) {
          this.lastStartIndex = itemStartIndex;
          return itemStartIndex;
        }
        return -1;
      };
      ListView.prototype.findUpdateIndex = function(itemStartIndex, itemEndIndex) {
        var d = [];
        for (var i = itemStartIndex; i < itemEndIndex; i++) {
          if (this._filledIds.hasOwnProperty(i)) continue;
          d.push(i);
        }
        return d;
      };
      ListView.prototype.notifyScrollToTop = function() {
        if (!this.adapter || this.adapter.getCount() <= 0) return;
        this.pullDownCallback && this.pullDownCallback();
      };
      ListView.prototype.notifyScrollToBottom = function() {
        if (!this.adapter || this.adapter.getCount() <= 0) return;
        this.pullUpCallback && this.pullUpCallback();
      };
      ListView.prototype.adjustEvent = function() {
        var _this = this;
        this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_END : cc.Node.EventType.MOUSE_UP, function() {
          _this.scrollTopNotifyed = false;
          _this.scrollBottomNotifyed = false;
        }, this);
        this.content.on(this.isMobile() ? cc.Node.EventType.TOUCH_CANCEL : cc.Node.EventType.MOUSE_LEAVE, function() {
          _this.scrollTopNotifyed = false;
          _this.scrollBottomNotifyed = false;
        }, this);
      };
      ListView.prototype.isMobile = function() {
        return cc.sys.isMobile || cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.QQ_PLAY;
      };
      __decorate([ property(cc.Prefab) ], ListView.prototype, "itemTemplate", void 0);
      __decorate([ property ], ListView.prototype, "spacing", void 0);
      __decorate([ property ], ListView.prototype, "spawnCount", void 0);
      __decorate([ property(cc.ScrollView) ], ListView.prototype, "scrollView", void 0);
      ListView = __decorate([ ccclass ], ListView);
      return ListView;
    }(cc.Component);
    exports.default = ListView;
    var AbsAdapter = function() {
      function AbsAdapter() {
        this.dataSet = [];
      }
      AbsAdapter.prototype.setDataSet = function(data) {
        this.dataSet = data;
      };
      AbsAdapter.prototype.getCount = function() {
        return this.dataSet.length;
      };
      AbsAdapter.prototype.getItem = function(posIndex) {
        return this.dataSet[posIndex];
      };
      AbsAdapter.prototype._getView = function(item, posIndex) {
        this.updateView(item, posIndex);
        return item;
      };
      return AbsAdapter;
    }();
    exports.AbsAdapter = AbsAdapter;
    cc._RF.pop();
  }, {
    "../ListView/ListAdapter": "ListAdapter"
  } ],
  LsnMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f08dG/zDxN1bVCnB0JRlln", "LsnMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LsnMgr = function() {
      function LsnMgr() {}
      LsnMgr.getInstance = function() {
        null == LsnMgr.instance && (LsnMgr.instance = new LsnMgr());
        return this.instance;
      };
      LsnMgr.prototype.addButtonEvent = function(node, component, handler, data) {
        var eventHandler = new cc.Component.EventHandler();
        eventHandler.target = node;
        eventHandler.component = component;
        eventHandler.handler = handler;
        eventHandler.customEventData = data;
        var clickEvents = node.getComponent(cc.Button).clickEvents;
        clickEvents.push(eventHandler);
      };
      LsnMgr.prototype.addClickEvent = function(widget, cb, target) {
        widget.on("click", function() {
          cc.loader.loadRes("mus/click", cc.AudioClip, function(err, aseet) {
            mk.AudioMgr.playEffect(aseet);
          });
          cb.call(target);
        });
      };
      LsnMgr.instance = null;
      return LsnMgr;
    }();
    exports.default = LsnMgr;
    cc._RF.pop();
  }, {} ],
  MainGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4219obbBFBxrW+emTvL/9N", "MainGame");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("../framework/Prefix");
    var buttonTouch_1 = require("./buttonTouch");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainGame = function(_super) {
      __extends(MainGame, _super);
      function MainGame() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.cityCfg = null;
        _this.towerCfg = null;
        _this.monsterCfg = null;
        _this.waveCfg = null;
        _this.roleCfg = null;
        _this.taskCfg = null;
        _this.shapeCfg = null;
        _this.enemyFab = null;
        _this.towerFab = null;
        _this.bullet = null;
        _this.quanSpr = null;
        _this.nightBG = null;
        _this.dayTimeBG = null;
        _this.gameEvent = null;
        _this.gameState = 1;
        _this.bulletPool = new cc.NodePool();
        _this.pathArr = [];
        _this.enemyArr = [];
        _this.towerBasePtArr = [];
        _this.towerBaseObjArr = [];
        _this.creat_enemy_interval = 2;
        _this.creat_enemy_time = 2;
        _this.waveIndex = 5;
        _this.wave_creat_interval = 1;
        _this.waveCreat = false;
        _this.wave_creat_time = 0;
        _this.waveData = null;
        _this.shape = [];
        _this.isEveryWaveFrist = true;
        _this.wave_exp = 0;
        _this.total_gold = 0;
        _this.maxRoleLimit = 0;
        _this.tianqiTime = 0;
        _this.tianqiState = 1;
        _this.patrolTime = 0;
        _this.patrolEnd = false;
        _this.fennuKq = false;
        _this.fennuTime = 0;
        _this.fennuTotal = 120;
        _this.dropTimei = 0;
        _this.dropCollect = [];
        _this.dropPtArr = [ cc.v2(-88, -420), cc.v2(-25, -420), cc.v2(18, -406), cc.v2(21, -460), cc.v2(86, -420) ];
        _this.dropGoldArr = [];
        _this.swichSuc = false;
        return _this;
      }
      MainGame.prototype.onLoad = function() {
        mk.UIkill.bindComponent(this);
        false;
        cc.game.on(cc.game.EVENT_HIDE, this.quitGame);
        mk.WXMgr.initShowCallback(this.showCallBack, this);
        mk.WXMgr.initLaunCallBack(this.showCallBack, this);
        this.gameEvent = this.node.getComponent(buttonTouch_1.default);
        cc.systemEvent.on(Prefix_1.default.REFRESH_GOLDSHOW_EVENT, function() {
          var txtGold = mk.UtilMgr.unitConversion(G[Prefix_1.default.CITY_GOLD]);
          this["_goldText"].$Label.string = txtGold;
        }, this);
        cc.systemEvent.on(Prefix_1.default.REFRESH_QUANSHOW_EVENT, function() {
          this["_quanText"].$Label.string = G[Prefix_1.default.CITY_QUAN];
        }, this);
        cc.systemEvent.on(Prefix_1.default.REFRESH_CITYSHOW_EVENT, function(msg) {
          msg ? this.killEnemyExp() : this.checkCityUp();
        }, this);
        cc.systemEvent.on(Prefix_1.default.REFRESH_FENNUSHOW_ENVET, function() {
          this["_fennuNum"].$Label.string = G[Prefix_1.default.FENNU];
          0 == G[Prefix_1.default.FENNU] ? this["_xiaoyuandian"].active = false : this["_xiaoyuandian"].active = true;
        }, this);
        cc.systemEvent.on(Prefix_1.default.REFRESH_BUTTONSHOW_EVENT, function() {
          this.refreshQuickBtn();
        }, this);
        this.initNativeInfo();
      };
      MainGame.prototype.showCallBack = function(res) {
        var token;
        var param;
        false;
      };
      MainGame.prototype.quitGame = function() {
        mk.GameData.setNetworkData();
      };
      MainGame.prototype.task_statis = function(taskID) {
        var wc_num = G[Prefix_1.default.TASK_NUM][taskID].wangc;
        var zc_num = G[Prefix_1.default.TASK_NUM][taskID].zongc;
        wc_num < zc_num && (G[Prefix_1.default.TASK_NUM][taskID].wangc += 1);
      };
      MainGame.prototype.initNativeInfo = function() {
        var _this = this;
        this.task_statis("taskId1");
        var avatar = G[Prefix_1.default.AVATAR];
        avatar && cc.loader.load({
          url: avatar,
          type: "jpg"
        }, function(err, texture) {
          if (err) return;
          _this["_head"].$Sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
        this["_zcdj"].$Label.string = "L" + G[Prefix_1.default.CITY_GARDE];
        cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
        cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
        cc.systemEvent.emit(Prefix_1.default.REFRESH_FENNUSHOW_ENVET);
        this.waveCreat = true;
        var cityCfgJson = this.cityCfg.json;
        this.maxRoleLimit = cityCfgJson["city" + G[Prefix_1.default.CITY_GARDE]].role_lv_limit;
        var giftArr = G[Prefix_1.default.GIFT_GRADE];
        0 == giftArr.length && (this["_btnGift"].active = false);
        mk.WXMgr.openDataContext(G[Prefix_1.default.CITY_GARDE]);
      };
      MainGame.prototype.checkOffline = function() {
        var time = G[Prefix_1.default.QUIT_GAME];
        if (0 == time) return;
        var curret = new Date().getTime();
        var miao = (curret - time) / 1e3;
        miao > 60 && this.gameEvent.goldCollect();
      };
      MainGame.prototype.initBoosRole = function() {
        this["_roleBoss"].getComponent("towerBoss").init(this);
      };
      MainGame.prototype.layoutRole = function() {
        var obj = G[Prefix_1.default.ROLE_LYOUT];
        for (var key in obj) if (obj.hasOwnProperty(key)) {
          var element = obj[key];
          if (element > 0) {
            var parent = this["_towerBase" + key];
            this.upgradeTower(parent, element);
          }
        }
      };
      MainGame.prototype.start = function() {
        this.checkOffline();
        cc.systemEvent.emit(Prefix_1.default.REFRESH_BUTTONSHOW_EVENT);
        this.initBoosRole();
        for (var i = 1; i <= 8; i++) this.pathArr.push(this["_road" + i].position);
        var tower = this["_towerRoot"].children;
        for (var i = 0; i < tower.length; i++) {
          this.towerBasePtArr.push(tower[i].position);
          this.towerBaseObjArr.push(tower[i]);
        }
        this.layoutRole();
      };
      MainGame.prototype.resetWave = function() {
        var _this = this;
        var len = this.dropGoldArr.length - 1;
        var _loop_1 = function(i) {
          var callBack = cc.callFunc(function() {
            _this.dropGoldArr[i].removeFromParent();
            cc.js.array.remove(_this.dropGoldArr, _this.dropGoldArr[i]);
          });
          var seq = cc.sequence(cc.moveTo(.5, cc.v2(-139, 500)), cc.delayTime(.3), callBack);
          this_1.dropGoldArr[i].runAction(seq);
        };
        var this_1 = this;
        for (var i = len; i >= 0; i--) _loop_1(i);
        var self = this;
        this.waveIndex++;
        this.isEveryWaveFrist = true;
        var sprGoldK = this["_sprGold_k"];
        var _goldDot = this["_goldDot"];
        var pos = mk.UtilMgr.converPosition(sprGoldK, _goldDot);
        var subPt = pos.sub(cc.v2(70, 80));
        mk.UIMgr.showPrefab("prefab/UIForm/tips", function(node) {
          node.position = subPt;
          self.total_gold = mk.Calculator.multiply(self.total_gold, G[Prefix_1.default.PLUS].Gplus);
          var goldTxt = mk.UtilMgr.unitConversion(self.total_gold);
          node.getComponent("tips").init(2, goldTxt);
          setTimeout(function() {
            var count_gold = mk.Calculator.plus(G[Prefix_1.default.CITY_GOLD], self.total_gold);
            G[Prefix_1.default.CITY_GOLD] = count_gold;
            self.total_gold = 0;
            cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
            cc.systemEvent.emit(Prefix_1.default.REFRESH_BUTTONSHOW_EVENT);
            node.removeFromParent();
          }, 1500);
        }, this["_floatLayout"]);
        cc.systemEvent.emit(Prefix_1.default.REFRESH_CITYSHOW_EVENT, true);
      };
      MainGame.prototype.killEnemyExp = function() {
        var _this = this;
        if (this.wave_exp < 0) {
          false;
          mk.AudioMgr.playEffect(Prefix_1.default.jujiLose);
          G[Prefix_1.default.CITY_EXP] = mk.Calculator.plus(G[Prefix_1.default.CITY_EXP], this.wave_exp);
          parseInt(G[Prefix_1.default.CITY_EXP]) < 0 && 0 == G[Prefix_1.default.CITY_EXP];
        } else {
          mk.AudioMgr.playEffect(Prefix_1.default.jujiSuc);
          this.wave_exp = mk.Calculator.multiply(this.wave_exp, G[Prefix_1.default.PLUS].Eplus);
          var loadBack = function(node) {
            node.position = cc.v2(-209, 338);
            node.getComponent("tips").init(0, _this.wave_exp);
            setTimeout(function() {
              _this.checkCityUp(_this.wave_exp);
              node.removeFromParent();
            }, 2e3);
          };
          mk.UIMgr.showPrefab("prefab/UIForm/tips", loadBack, this["_floatLayout"]);
        }
      };
      MainGame.prototype.checkCityUp = function(addExp) {
        var cityCfgJson = this.cityCfg.json;
        var data = cityCfgJson["city" + G[Prefix_1.default.CITY_GARDE]].city_exp;
        if (void 0 == addExp) G[Prefix_1.default.CITY_EXP] = mk.Calculator.plus(G[Prefix_1.default.CITY_EXP], 0); else {
          G[Prefix_1.default.CITY_EXP] = mk.Calculator.plus(G[Prefix_1.default.CITY_EXP], addExp);
          this.wave_exp = 0;
        }
        if (parseInt(G[Prefix_1.default.CITY_EXP]) > parseInt(data)) {
          G[Prefix_1.default.CITY_GARDE]++;
          mk.WXMgr.openDataContext(G[Prefix_1.default.CITY_GARDE]);
          G[Prefix_1.default.GIFT_GRADE].push(G[Prefix_1.default.CITY_GARDE]);
          this["_btnGift"].active = true;
          this["_zcdj"].$Label.string = "L" + G[Prefix_1.default.CITY_GARDE];
          G[Prefix_1.default.CITY_EXP] = mk.Calculator.minus(G[Prefix_1.default.CITY_EXP], data);
          this.maxRoleLimit = cityCfgJson["city" + G[Prefix_1.default.CITY_GARDE]].role_lv_limit;
          mk.UIMgr.showPrefab("prefab/UIForm/giftFab");
          mk.AudioMgr.playEffect(Prefix_1.default.cityGift);
        }
      };
      MainGame.prototype.creatBullet = function() {
        var bullet = null;
        bullet = this.bulletPool.size() > 0 ? this.bulletPool.get() : cc.instantiate(this.bullet);
        return bullet;
      };
      MainGame.prototype.recycle = function(bulletEnemy) {
        this.bulletPool.put(bulletEnemy);
      };
      MainGame.prototype.updateEnemy = function(dt) {
        if (!this.waveCreat) {
          if (0 == this.enemyArr.length) {
            this.wave_creat_time += dt;
            if (this.wave_creat_time > this.wave_creat_interval) {
              this.waveCreat = true;
              this.wave_creat_time = 0;
            }
          }
          return;
        }
        var self = this;
        this.creat_enemy_time += dt;
        if (this.creat_enemy_time > this.creat_enemy_interval) {
          var wave = this.waveData;
          var shape = this.shape;
          if (this.isEveryWaveFrist) {
            var shapeData = this.shapeCfg.json;
            var data = shapeData[G[Prefix_1.default.CITY_GARDE]];
            for (var i = 0; i < 3; i++) {
              var dd = Math.randomInt(0, 2);
              0 == dd ? 0 == i ? shape.push(data.m_show_1) : 1 == i ? shape.push(data.b_show_1) : shape.push(data.D_show_1) : 0 == i ? "0" == data.m_show_2 ? shape.push(data.m_show_1) : shape.push(data.m_show_2) : 1 == i ? "0" == data.b_show_2 ? shape.push(data.b_show_1) : shape.push(data.b_show_2) : "0" == data.D_show_2 ? shape.push(data.D_show_1) : shape.push(data.D_show_2);
            }
            this.shape = shape;
            6 == this.waveIndex && mk.UIMgr.showPrefab("/prefab/UIForm/tips", function(node) {
              node.position = cc.v2(0, -400);
              mk.AudioMgr.playEffect(Prefix_1.default.bossTips);
              node.getComponent("tips").init(4);
              setTimeout(function() {
                node.removeFromParent();
              }, 2e3);
            }, this["_floatLayout"]);
            7 == this.waveIndex && (this.waveIndex = 1);
            var waveCigJson = this.waveCfg.json;
            var copyData = mk.UtilMgr.deepCopyJsonObj(waveCigJson);
            wave = copyData[this.waveIndex];
            this.waveData = wave;
            this.isEveryWaveFrist = false;
            getAttribute(wave, shape);
          } else getAttribute(wave, shape);
          this.creat_enemy_time = 0;
        }
        function getAttribute(wave, shape) {
          if (wave.small_num > 0) {
            self.creatEnemy("small_num", shape);
            wave.small_num--;
          } else if (wave.mini_num > 0) {
            self.creatEnemy("mini_num", shape);
            wave.mini_num--;
          } else if (wave.big_num > 0) {
            self.creatEnemy("big_num", shape);
            wave.big_num--;
          } else self.waveCreat = false;
        }
      };
      MainGame.prototype.creatEnemy = function(type, shape) {
        var monJsonCfg = this.monsterCfg.json;
        var data = monJsonCfg[G[Prefix_1.default.CITY_GARDE]];
        var attribute = {
          exp: null,
          hp: null,
          spd: null,
          ney: null,
          shape: null
        };
        if ("small_num" == type) {
          attribute.exp = data.monster_exp;
          attribute.hp = data.monster_HP;
          attribute.spd = data.monster_SPD;
          attribute.ney = data.monster_money;
          attribute.shape = shape[0];
        } else if ("mini_num" == type) {
          attribute.exp = data.min_boss_exp;
          attribute.hp = data.min_boss_HP;
          attribute.spd = data.min_boss_SPD;
          attribute.ney = data.min_boss_money;
          attribute.shape = shape[1];
        } else if ("big_num" == type) {
          attribute.exp = data.huge_boss_exp;
          attribute.hp = data.huge_boss_HP;
          attribute.spd = data.huge_boss_SPD;
          attribute.ney = data.huge_boss_money;
          attribute.shape = shape[2];
        }
        var enemy = cc.instantiate(this.enemyFab);
        this.enemyArr.push(enemy);
        enemy.getComponent("enemy").init(this, attribute, type);
        enemy.parent = this["_pathRoot"];
      };
      MainGame.prototype.patrolUpdate = function(dt) {
        if (!this.patrolEnd && 2 == this.tianqiState) {
          this.patrolTime += dt;
          if (this.patrolTime > 10) {
            var objParent = this.selectTowerBase();
            if (null == objParent) ; else {
              var roleCfgJson = this.roleCfg.json;
              var max = G[Prefix_1.default.MAXROLE_GRADE];
              var lv = roleCfgJson[max].system_role_lv;
              this.upgradeTower(objParent, lv, "feixing_chusheng");
              this.task_statis("taskId5");
            }
            this.patrolTime = 0;
          }
        }
      };
      MainGame.prototype.fennuUpdate = function(dt) {
        if (!this.fennuKq) return;
        this.fennuTime += dt;
        if (this.fennuTime > 1) {
          this["_fennuTime"].active = true;
          this.fennuTotal -= 1;
          var mm = mk.UtilMgr.secToTime(this.fennuTotal, "00:00");
          this["_fennuTime"].$Label.string = mm;
          this.fennuTime = 0;
          if (0 == this.fennuTotal) {
            this.fennuKq = false;
            G[Prefix_1.default.PLUS].Gplus -= .5;
            G[Prefix_1.default.PLUS].Aplus -= .5;
            G[Prefix_1.default.PLUS].Splus += .5;
            this["_fennuTime"].$Label.string = "02:00";
            this["_fennuTime"].active = false;
          }
        }
      };
      MainGame.prototype.update = function(dt) {
        if (1 == this.gameState) {
          this.weatherSwitch(dt);
          this.fennuUpdate(dt);
          this.dropQuanUpdate(dt);
          this.patrolUpdate(dt);
          this.updateEnemy(dt);
        }
      };
      MainGame.prototype.dropQuanUpdate = function(dt) {
        if (1 == this.tianqiState) {
          this.dropTimei += dt;
          if (this.dropTimei > 10) {
            this.dropQuan();
            this.dropTimei = 0;
          }
        }
      };
      MainGame.prototype.dropQuan = function() {
        var _this = this;
        this.task_statis("taskId4");
        if (1 == this.tianqiState) {
          if (0 == this.dropPtArr.length) {
            this.quanRecycle();
            return;
          }
          var quan_1 = new cc.Node("quanquan");
          quan_1.addComponent(cc.Sprite).spriteFrame = this.quanSpr;
          quan_1.on(cc.Node.EventType.TOUCH_START, this.quanRecycle, this);
          quan_1.parent = this["_quanDot"];
          var x = this.dropPtArr[0].x;
          quan_1.position = cc.v2(x, 820);
          var seq = cc.sequence(cc.moveTo(3, this.dropPtArr[0]).easing(cc.easeQuinticActionOut()), cc.callFunc(function() {
            quan_1.parent = _this["_goldDot"];
          }));
          quan_1.runAction(seq);
          this.dropCollect.push(quan_1);
          cc.js.array.remove(this.dropPtArr, this.dropPtArr[0]);
        }
      };
      MainGame.prototype.quanRecycle = function(event) {
        var _this = this;
        var sprQuan = this["_sprQuan_k"];
        var canvas = cc.find("Canvas");
        var pos = mk.UtilMgr.converPosition(sprQuan, canvas);
        var subPos = pos.sub(cc.v2(70, 0));
        if (event) {
          var target_1 = event.target;
          this.dropPtArr.push(target_1.position);
          var callBack = cc.callFunc(function() {
            G[Prefix_1.default.CITY_QUAN] = mk.Calculator.plus(G[Prefix_1.default.CITY_QUAN], 1);
            cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
            target_1.destroy();
            cc.js.array.remove(_this.dropCollect, target_1);
          });
          var seq = cc.sequence(cc.moveTo(.5, subPos), callBack);
          event.target.runAction(seq);
        } else this.dropCollect_ttq();
      };
      MainGame.prototype.dropCollect_ttq = function() {
        var _this = this;
        var len = this.dropCollect.length;
        var _loop_2 = function(i) {
          this_2.dropPtArr.push(this_2.dropCollect[i].position);
          var seq = cc.sequence(cc.moveTo(.5, cc.v2(44, 600)), cc.callFunc(function() {
            G[Prefix_1.default.CITY_QUAN] = mk.Calculator.plus(G[Prefix_1.default.CITY_QUAN], 1);
            cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
            _this.dropCollect[i].destroy();
            cc.js.array.remove(_this.dropCollect, _this.dropCollect[i]);
          }));
          this_2.dropCollect[i].runAction(seq);
        };
        var this_2 = this;
        for (var i = len - 1; i >= 0; i--) _loop_2(i);
      };
      MainGame.prototype.weatherSwitch = function(dt) {
        var _this = this;
        var self = this;
        var wea = G[Prefix_1.default.TIANQI].weather;
        this.tianqiTime += dt;
        if (1 == wea) {
          if (this.tianqiTime > 1) {
            G[Prefix_1.default.TIANQI].btian -= 1;
            this.tianqiTime = 0;
          }
          if (G[Prefix_1.default.TIANQI].btian <= 0) {
            G[Prefix_1.default.TIANQI].weather = 2;
            G[Prefix_1.default.TIANQI].heiye = 420;
            mk.UIMgr.showPrefab("prefab/UIForm/tips", function(node) {
              node.getComponent("tips").init(7);
              _this.tianqiState = 2;
              _this.dropCollect_ttq();
              setTimeout(function() {
                self.swichSuc = false;
                node.removeFromParent();
              }, 1500);
            }, this["_floatLayout"]);
            return;
          }
          if (this.swichSuc) return;
          this["_mainGameBG"].$Sprite.spriteFrame = this.dayTimeBG;
          this.tianqiState = 1;
          this.swichSuc = true;
          mk.AudioMgr.playBGM(Prefix_1.default.dayTimeBG);
        } else if (2 == wea) {
          if (this.tianqiTime > 1) {
            G[Prefix_1.default.TIANQI].heiye -= 1;
            this.tianqiTime = 0;
          }
          if (G[Prefix_1.default.TIANQI].heiye <= 0) {
            G[Prefix_1.default.TIANQI].weather = 1;
            G[Prefix_1.default.TIANQI].btian = 180;
            mk.UIMgr.showPrefab("prefab/UIForm/tips", function(node) {
              node.getComponent("tips").init(6);
              _this.tianqiState = 1;
              setTimeout(function() {
                self.swichSuc = false;
                mk.AudioMgr.playEffect(Prefix_1.default.tianqiChange);
                node.removeFromParent();
              }, 1500);
            }, this["_floatLayout"]);
            return;
          }
          if (this.swichSuc) return;
          this["_mainGameBG"].$Sprite.spriteFrame = this.nightBG;
          mk.AudioMgr.playBGM(Prefix_1.default.nightBG);
          this.tianqiState = 2;
          this.swichSuc = true;
        }
      };
      MainGame.prototype.refreshQuickBtn = function() {
        var money = this.getMaxRoleAndGold()[1];
        var color = "";
        var results = mk.UtilMgr.compare(money, G.city_gold);
        color = results ? "<color=#FFFFFF>" : "<color=#842525>";
        var txtGold = mk.UtilMgr.unitConversion(money);
        this["_txtCreat"].$RichText.string = color + txtGold + "</c>";
      };
      MainGame.prototype.getMaxRoleAndGold = function() {
        var roleCfgJson = this.roleCfg.json;
        var most = roleCfgJson[G[Prefix_1.default.MAXROLE_GRADE]].buy_monster_most;
        var money = roleCfgJson[most].role_money;
        var buyTypeNum = G[Prefix_1.default.BUY_TYPENUM];
        if (buyTypeNum.hasOwnProperty(most)) {
          var num = buyTypeNum[most];
          money = mk.Calculator.powe(money, 1.25, num);
        }
        return [ most, money ];
      };
      MainGame.prototype.selectTowerBase = function() {
        var flag = null;
        var layout = G[Prefix_1.default.ROLE_LYOUT];
        var sortNode = [];
        for (var key in layout) if (layout.hasOwnProperty(key)) {
          var element = layout[key];
          0 == element && sortNode.push(key);
        }
        if (0 == sortNode.length) ; else {
          var sort = mk.UtilMgr.randomArr(sortNode);
          var parentTowerBase = this["_towerBase" + sort[0]];
          flag = parentTowerBase;
        }
        return flag;
      };
      MainGame.prototype.quickCreatRole = function(type, money) {
        var objParent = this.selectTowerBase();
        if (null == objParent) mk.UIMgr.showToast("\u4f4d\u7f6e\u4e0d\u8db3"); else {
          this.upgradeTower(objParent, type, "shangdian_chushen");
          var buyTypeNum = G[Prefix_1.default.BUY_TYPENUM];
          buyTypeNum.hasOwnProperty(type) ? buyTypeNum[type] += 1 : buyTypeNum[type] = 1;
          G[Prefix_1.default.CITY_GOLD] = mk.Calculator.minus(G[Prefix_1.default.CITY_GOLD], money);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_BUTTONSHOW_EVENT);
        }
      };
      MainGame.prototype.linQuCreateRole = function(type) {
        var objParent = this.selectTowerBase();
        if (null == objParent) {
          mk.UIMgr.showToast("\u4f4d\u7f6e\u4e0d\u8db3");
          return false;
        }
        this.upgradeTower(objParent, type);
        return true;
      };
      MainGame.prototype._onTowerBaseTouchEnd = function(sender) {};
      MainGame.prototype.upgradeTower = function(sender, index, effectType) {
        var towerFab = cc.instantiate(this.towerFab);
        var parentIndex = sender["$"];
        G[Prefix_1.default.ROLE_LYOUT][parentIndex] = index;
        var towerCfgJson = this.towerCfg.json;
        var cityAbbtri = towerCfgJson["city" + G[Prefix_1.default.CITY_GARDE]];
        var atk = cityAbbtri["role" + index];
        towerFab["towerType"] = index;
        var roleCfgJson = this.roleCfg.json;
        var roleData = roleCfgJson[index];
        var role_obj = {};
        role_obj["spd"] = roleData.ATK_SPD;
        role_obj["shape"] = roleData.role_shape;
        role_obj["skill"] = roleData.role_skill_id;
        role_obj["atk"] = atk;
        role_obj["type"] = index;
        role_obj["wuqi"] = roleData.role_bullet;
        towerFab.parent = sender;
        towerFab.getComponent("tower").init(this, role_obj, effectType);
      };
      __decorate([ property(cc.JsonAsset) ], MainGame.prototype, "cityCfg", void 0);
      __decorate([ property(cc.JsonAsset) ], MainGame.prototype, "towerCfg", void 0);
      __decorate([ property(cc.JsonAsset) ], MainGame.prototype, "monsterCfg", void 0);
      __decorate([ property(cc.JsonAsset) ], MainGame.prototype, "waveCfg", void 0);
      __decorate([ property(cc.JsonAsset) ], MainGame.prototype, "roleCfg", void 0);
      __decorate([ property(cc.JsonAsset) ], MainGame.prototype, "taskCfg", void 0);
      __decorate([ property(cc.JsonAsset) ], MainGame.prototype, "shapeCfg", void 0);
      __decorate([ property(cc.Prefab) ], MainGame.prototype, "enemyFab", void 0);
      __decorate([ property(cc.Prefab) ], MainGame.prototype, "towerFab", void 0);
      __decorate([ property(cc.Prefab) ], MainGame.prototype, "bullet", void 0);
      __decorate([ property(cc.SpriteFrame) ], MainGame.prototype, "quanSpr", void 0);
      __decorate([ property(cc.SpriteFrame) ], MainGame.prototype, "nightBG", void 0);
      __decorate([ property(cc.SpriteFrame) ], MainGame.prototype, "dayTimeBG", void 0);
      MainGame = __decorate([ ccclass ], MainGame);
      return MainGame;
    }(cc.Component);
    exports.default = MainGame;
    cc._RF.pop();
  }, {
    "../framework/Prefix": "Prefix",
    "./buttonTouch": "buttonTouch"
  } ],
  MathExtension: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff2a7JbV11B9Zikdqmi6N0R", "MathExtension");
    Math.randomInt = function(min, max) {
      var rand = Math.random();
      return min + Math.floor(rand * (max - min));
    };
    Math.randomRangeFloat = function(min, max) {
      return min + Math.random() * (max - min);
    };
    Math.fmod = function(x, y) {
      var temp = Math.floor(x / y);
      return x - temp * y;
    };
    cc._RF.pop();
  }, {} ],
  MultiResoultionCompat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6c42Wz64tDYYqUBUbC2YRW", "MultiResoultionCompat");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MultiResolutionCompat = function(_super) {
      __extends(MultiResolutionCompat, _super);
      function MultiResolutionCompat() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      MultiResolutionCompat_1 = MultiResolutionCompat;
      MultiResolutionCompat.prototype.onLoad = function() {
        cc.view.setDesignResolutionSize(MultiResolutionCompat_1.DEFAULT_RESOLUTION_WIDTH, MultiResolutionCompat_1.DEFAULT_RESOLUTION_HEIGHT, cc.ResolutionPolicy.SHOW_ALL);
      };
      MultiResolutionCompat.getShowAllModeScale = function() {
        return Math.min(cc.view.getCanvasSize().width / this.DEFAULT_RESOLUTION_WIDTH, cc.view.getCanvasSize().height / this.DEFAULT_RESOLUTION_HEIGHT);
      };
      MultiResolutionCompat.getShowAllModeRealHeight = function() {
        return this.DEFAULT_RESOLUTION_HEIGHT * this.getShowAllModeScale();
      };
      MultiResolutionCompat.getShowAllModeRealWidth = function() {
        return this.DEFAULT_RESOLUTION_WIDTH * this.getShowAllModeScale();
      };
      MultiResolutionCompat.getShowAllModeVerticalBorderHeight = function() {
        return cc.view.getCanvasSize().height - this.getShowAllModeRealHeight();
      };
      MultiResolutionCompat.getShowAllModeHorizontalBorderWidth = function() {
        return cc.view.getCanvasSize().width - this.getShowAllModeRealWidth();
      };
      MultiResolutionCompat.getShowAllModeNodePositionCloseToBottom = function(nodePosInDesign) {
        var srcScaleForShowAll = MultiResolutionCompat_1.getShowAllModeScale();
        var bottomBorderHeightInCanvas = MultiResolutionCompat_1.getShowAllModeVerticalBorderHeight() / 2;
        var srcNodePosYInCanvas = nodePosInDesign.y * srcScaleForShowAll;
        var finalNodePosYInCanvas = srcNodePosYInCanvas - bottomBorderHeightInCanvas;
        var nodePosYInDesign = finalNodePosYInCanvas / srcScaleForShowAll;
        return cc.v2(nodePosInDesign.x, nodePosYInDesign);
      };
      MultiResolutionCompat.convertNodePosInDesignToNodePosInCanvas = function(nodePosInDesign) {
        return nodePosInDesign.sub(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
      };
      MultiResolutionCompat.convertNodePosInCanvasToNodePosInDesign = function(nodePosInCanvas) {
        return nodePosInCanvas.div(cc.v2(this.getShowAllModeScale(), this.getShowAllModeScale()));
      };
      MultiResolutionCompat.convertWidthInDesignToWidthInCanvas = function(widthInDesign) {
        return widthInDesign * this.getShowAllModeScale();
      };
      MultiResolutionCompat.convertWidthInCanvasToWidthInDesign = function(widthInCanvas) {
        return widthInCanvas / this.getShowAllModeScale();
      };
      MultiResolutionCompat.convertHeightInDesignToHeightInCanvas = function(heightInDesign) {
        return heightInDesign * this.getShowAllModeScale();
      };
      MultiResolutionCompat.convertHeightInCanvasToHeightInDesign = function(heightIncanvas) {
        return heightIncanvas / this.getShowAllModeScale();
      };
      var MultiResolutionCompat_1;
      MultiResolutionCompat.DEFAULT_RESOLUTION_WIDTH = 720;
      MultiResolutionCompat.DEFAULT_RESOLUTION_HEIGHT = 1280;
      MultiResolutionCompat = MultiResolutionCompat_1 = __decorate([ ccclass ], MultiResolutionCompat);
      return MultiResolutionCompat;
    }(cc.Component);
    exports.default = MultiResolutionCompat;
    cc._RF.pop();
  }, {} ],
  Prefix: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0e2fbqef+5FC7yFRmPDwg7m", "Prefix");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var prefix = function() {
      function prefix() {}
      prefix.SHOW_CASH = "show_cash";
      prefix.NICKNAME = "nickname";
      prefix.AVATAR = "avatar";
      prefix.USER_NO = "user_no";
      prefix.PLUS = "plus";
      prefix.MAXROLE_GRADE = "maxrole_grade";
      prefix.CITY_GOLD = "city_gold";
      prefix.CITY_EXP = "city_exp";
      prefix.CITY_GARDE = "city_garde";
      prefix.CITY_QUAN = "city_quan";
      prefix.QUIT_GAME = "quit_game";
      prefix.ROLE_LYOUT = "role_layout";
      prefix.MAGIC_DOT = "magic_dot";
      prefix.SURPLUS_TIME = "surplus_time";
      prefix.BUY_TYPENUM = "buy_typenum";
      prefix.CASH_TYPENUM = "cash_typenum";
      prefix.TASK_NUM = "task_num";
      prefix.FENNU = "fennu";
      prefix.TIANQI = "tianqi";
      prefix.GIFT_GRADE = "gift_grade";
      prefix.SHARE_NUM = "share_num";
      prefix.ADDTION = "addtion";
      prefix.MUSIC = "music";
      prefix.EFFECT = "effect";
      prefix.REFRESH_GOLDSHOW_EVENT = "refreshGoldShow_event";
      prefix.STOREGLODSHOW_EVENT = "storeGlodShow_event";
      prefix.REFRESH_CITYSHOW_EVENT = "refreshCityShow_event";
      prefix.REFRESH_QUANSHOW_EVENT = "refreshQuanShow_event";
      prefix.REFRESH_FENNUSHOW_ENVET = "refresh_fennuShow_event";
      prefix.REFRESH_BUTTONSHOW_EVENT = "refresh_buttonShow_event";
      prefix.bossTips = "bossTips";
      prefix.btnClick = "btnClick";
      prefix.nightBG = "nightBG";
      prefix.addSpeed = "addSpeed";
      prefix.roleHec = "roleHec";
      prefix.jujiSuc = "jujiSuc";
      prefix.jujiLose = "jujiLose";
      prefix.linqAward = "linqAward";
      prefix.atkHarm = "atkHarm";
      prefix.tianqiChange = "tianqiChange";
      prefix.dayTimeBG = "dayTimeBG";
      prefix.cityGift = "cityGift";
      return prefix;
    }();
    exports.default = prefix;
    cc._RF.pop();
  }, {} ],
  UIMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b2adxq1n1K7aF1KS+iUqED", "UIMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIMgr = function() {
      function UIMgr() {}
      UIMgr.getInstance = function() {
        null == this.instance && (this.instance = new UIMgr());
        return this.instance;
      };
      UIMgr.prototype.showToast = function(msg) {
        this.showPrefab("prefab/showMsg", function(node) {
          var len = msg.length;
          node.width = 35 * len;
          var txt = node.getChildByName("_txtMsg");
          txt.getComponent(cc.Label).string = msg;
          setTimeout(function() {
            node.removeFromParent();
          }, 2e3);
        });
      };
      UIMgr.prototype.showPrefab = function(url, cb, cusParent) {
        cc.loader.loadRes(url, function(err, prefab) {
          if (err) {
            console.error("\u9884\u5236\u4f53_\u8def\u5f84\u9519\u8bef\u300b", url);
            return;
          }
          var newNode = cc.instantiate(prefab);
          newNode.parent = void 0 == cusParent ? cc.Canvas.instance.node : cusParent;
          cb && cb(newNode);
        });
      };
      return UIMgr;
    }();
    exports.default = UIMgr;
    cc._RF.pop();
  }, {} ],
  UIkill: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac541c3OelAl6cmQkoqDp1F", "UIkill");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("./Prefix");
    var DEFAULT_EVENT_NAMES = [ "_onTouchStart", "_onTouchMove", "_onTouchEnd", "_onTouchCancel" ];
    var UIkill = function() {
      function UIkill() {
        this._prefix = "_";
        this._plugins = [];
      }
      UIkill.getInstance = function() {
        null == UIkill.singleInstance && (UIkill.singleInstance = new UIkill());
        return this.singleInstance;
      };
      UIkill.prototype.bindComponent = function(component, options) {
        var _this = this;
        void 0 === options && (options = null);
        component["$options"] = options || {};
        var root = component.node;
        root["_components"].forEach(function(nodeComponent) {
          var name = _this.getComponentName(nodeComponent);
          name = "$" + name;
          root[name] = nodeComponent;
        });
        this.bindTouchEvent(root, component, DEFAULT_EVENT_NAMES);
        this.bindNode(component.node, component);
      };
      UIkill.prototype.bindNode = function(node, target, options) {
        var _this = this;
        void 0 === options && (options = null);
        target["$options"] = options || {};
        if (target["$collector"]) {
          if (target["$collector"].node === node) return;
          delete target["$collector"].node;
          Object.keys(target["$collector"]).forEach(function(key) {
            delete target[key];
          });
        }
        target["$collector"] = {
          node: node
        };
        node["_components"].forEach(function(component) {
          var name = _this.getComponentName(component);
          name = "$" + name;
          target[name] = component;
          target["$collector"][name] = component;
        });
        this.bindStartByPlugins(node, target);
        this.bindSubNode(node, target);
        this.bindEndByPlugins(node, target);
      };
      UIkill.prototype.bindSubNode = function(nodeObject, target) {
        var _this = this;
        var node = nodeObject;
        var isBindNode = false;
        node.name[0] === this._prefix && node["_components"].forEach(function(component) {
          var name = _this.getComponentName(component);
          name = "$" + name;
          if (node[name] && target["$options"].debug) {
            cc.warn(name + " property is already exists");
            return;
          }
          node[name] = component;
          _this.isFunction(component.onBind) && component.onBind(target);
        });
        var bool = this.checkNodeByPlugins(node, target);
        if (!bool || isBindNode) return;
        node.children.forEach(function(child) {
          var name = child.name;
          if (name[0] === _this._prefix) {
            var index = name.indexOf("$");
            if (-1 !== index) {
              child["$eventName"] = name.substr(0, index);
              child["$"] = name.substr(index + 1);
              name = child["$eventName"] + child["$"][0].toUpperCase() + child["$"].substr(1);
              true;
              child.name = name;
            }
            if (target[name] && target["$options"].debug) {
              cc.warn(target.name + "." + name + " property is already exists");
              return;
            }
            _this.bindTouchEvent(child, target);
            target[name] = child;
            target["$collector"] && (target["$collector"][name] = child);
          } else node[name] || (node[name] = child);
          _this.bindSubNode(child, target);
        });
      };
      UIkill.prototype.registerPlugin = function(plugins) {
        var _this = this;
        Array.isArray(plugins) || (plugins = [ plugins ]);
        plugins.forEach(function(plugin) {
          var findPlugin = _this._plugins.some(function(item) {
            return item.name === plugin.name || item === plugin;
          });
          if (findPlugin) return;
          _this._plugins.push(plugin);
          plugin.onRegister && plugin.onRegister();
        });
      };
      UIkill.prototype.getComponentName = function(component) {
        return component.name.match(/<.*>$/)[0].slice(1, -1);
      };
      UIkill.prototype.bindStartByPlugins = function(node, target) {
        this._plugins.forEach(function(plugin) {
          plugin.onBindStart && plugin.onBindStart(node, target);
        });
      };
      UIkill.prototype.bindEndByPlugins = function(node, target) {
        this._plugins.forEach(function(plugin) {
          plugin.onBindEnd && plugin.onBindEnd(node, target);
        });
      };
      UIkill.prototype.getTouchEventName = function(node, event) {
        void 0 === event && (event = null);
        var name = node["$eventName"] || node.name;
        name && (name = name[this._prefix.length].toUpperCase() + name.slice(this._prefix.length + 1));
        if (event) return "_on" + name + event;
        return [ "_on" + name + "TouchStart", "_on" + name + "TouchMove", "_on" + name + "TouchEnd", "_on" + name + "TouchCancel" ];
      };
      UIkill.prototype.bindTouchEvent = function(node, target, defaultNames) {
        var _this = this;
        void 0 === defaultNames && (defaultNames = null);
        if (node.getComponent(cc.EditBox)) return;
        var eventNames = defaultNames || this.getTouchEventName(node);
        var eventTypes = [ cc.Node.EventType.TOUCH_START, cc.Node.EventType.TOUCH_MOVE, cc.Node.EventType.TOUCH_END, cc.Node.EventType.TOUCH_CANCEL ];
        eventNames.forEach(function(eventName, index) {
          var tempEvent = target[eventName];
          if (!tempEvent && !node.getComponent(cc.Button)) return;
          node.on(eventTypes[index], function(event) {
            var eventNode = event.currentTarget;
            if (false === eventNode.interactable || false === eventNode.active) return;
            var button = eventNode.getComponent(cc.Button);
            if (button && false === button.interactable) return;
            var eventFunc = target[eventName];
            var isValidEvent = eventFunc || button && button.clickEvents.length;
            isValidEvent && _this.beforeHandleEventByPlugins(eventNode, event, !!eventFunc);
            var eventResult;
            if (eventFunc) {
              eventResult = eventFunc.call(target, eventNode, event);
              if (event.type === cc.Node.EventType.TOUCH_START && false === eventResult) eventNode._touchListener.setSwallowTouches(false); else {
                node["_touchListener"].setSwallowTouches(true);
                event.stopPropagation();
              }
            }
            isValidEvent && _this.afterHandleEventByPlugins(eventNode, event, !!eventFunc, eventResult);
          });
        });
        this.bindTouchLongEvent(node, target);
      };
      UIkill.prototype.beforeHandleEventByPlugins = function(node, event, hasEventFunc) {
        this._plugins.forEach(function(item) {
          item.onBeforeHandleEvent && item.onBeforeHandleEvent(node, event, hasEventFunc);
        });
      };
      UIkill.prototype.bindTouchLongEvent = function(nodeObject, target) {
        var node = nodeObject;
        var eventName = this.getTouchEventName(node, "TouchLong");
        var touchLong = target["" + eventName];
        if (!this.isFunction(touchLong)) return;
        node._touchLongTimer = null;
        node.on(cc.Node.EventType.TOUCH_END, function() {
          if (node._touchLongTimer) {
            clearTimeout(node._touchLongTimer);
            node._touchLongTimer = 0;
            delete node.interactable;
          }
        });
        node.on(cc.Node.EventType.TOUCH_START, function(event) {
          node._touchLongTimer = setTimeout(function() {
            node.interactable = !!touchLong.call(target, node, event);
            node._touchLongTimer = 0;
          }, node.touchLongTime || 1e3);
        });
      };
      UIkill.prototype.checkNodeByPlugins = function(node, target) {
        var plugin = this._plugins.some(function(item) {
          if (item.onCheckNode) return false === item.onCheckNode(node, target);
          return null;
        });
        return !plugin;
      };
      UIkill.prototype.afterHandleEventByPlugins = function(node, event, hasEventFunc, eventResult) {
        mk.AudioMgr.playEffect(Prefix_1.default.btnClick);
        this._plugins.forEach(function(item) {
          item.onAfterHandleEvent && item.onAfterHandleEvent(node, event, hasEventFunc, eventResult);
        });
      };
      UIkill.prototype.isFunction = function(value) {
        return "function" === typeof value;
      };
      UIkill.singleInstance = null;
      return UIkill;
    }();
    exports.default = UIkill;
    cc._RF.pop();
  }, {
    "./Prefix": "Prefix"
  } ],
  UtilMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2d3888D+HpCsJy4zItGUvGH", "UtilMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UtilMgr = function() {
      function UtilMgr() {}
      UtilMgr.getInstance = function() {
        null == this.instance && (this.instance = new UtilMgr());
        return this.instance;
      };
      UtilMgr.prototype.pastDay = function() {
        var iNow = new Date().getTime() / 1e3;
        var time = iNow - (iNow + 28800) % 86400;
        console.log("time", time);
      };
      UtilMgr.prototype.secToTime = function(time, args) {
        var result = "00:00:00";
        if (time > 0) {
          var hour = Math.floor(time / 3600);
          hour < 10 && (hour = "0" + hour);
          var minute = Math.floor((time - 3600 * hour) / 60);
          minute < 10 && (minute = "0" + minute);
          var second = Math.floor((time - 3600 * hour - 60 * minute) % 60);
          second < 10 && (second = "0" + second);
          result = "00:00" == args ? minute + ":" + second : hour + ":" + minute + ":" + second;
        }
        return result;
      };
      UtilMgr.prototype.getType = function(obj) {
        return "[object Object]" == Object.prototype.toString.call(obj) ? "Object" : "[object Array]" == Object.prototype.toString.call(obj) ? "Array" : "nomal";
      };
      UtilMgr.prototype.deepCopy = function(obj) {
        if ("nomal" == this.getType(obj)) return obj;
        var newObj = "Object" == this.getType(obj) ? {} : [];
        for (var key in obj) obj.hasOwnProperty(key) && (newObj[key] = this.deepCopy(obj[key]));
        return newObj;
      };
      UtilMgr.prototype.deepCopyJsonObj = function(obj) {
        var newobj = obj.constructor === Object ? {} : [];
        if ("object" === typeof JSON) {
          var s = JSON.stringify(obj);
          newobj = JSON.parse(s);
        } else if (newobj.constructor === Array) newobj.concat(obj); else for (var i in obj) newobj[i] = obj[i];
        return newobj;
      };
      UtilMgr.prototype.randomArr = function(arr) {
        var i = arr.length, t, j;
        while (i) {
          j = Math.floor(Math.random() * i--);
          t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
        }
        return arr;
      };
      UtilMgr.prototype.sortBy = function(attr, rev) {
        rev = void 0 == rev ? 1 : rev ? 1 : -1;
        return function(a, b) {
          a = a[attr];
          b = b[attr];
          if (a < b) return -1 * rev;
          if (a > b) return 1 * rev;
          return 0;
        };
      };
      UtilMgr.prototype.unitConversion = function(gold) {
        gold = gold.toString().trim();
        var unitArray = [ "K", "M", "B", "T", "a", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "am", "an", "ao", "ap", "aq", "ar", "ss", "tt", "uu", "vv", "ww", "xx", "yy", "zz", "Aa", "Bb", "Cc", "Dd", "Ee", "Ff", "Gg", "Hh", "Ii", "Jj", "Kk", "Ll", "Mm", "Nn", "Oo", "Pp", "Qq", "Rr", "Ss", "Tt", "Uu", "Vv", "Ww", "Xx", "Yy", "Zz", "AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ", "KK", "LL", "MM", "NN", "OO", "PP", "QQ", "RR", "SS", "TT", "UU", "VV", "WW", "XX", "YY", "ZZ" ];
        gold.split(".").length > 1 && (gold = gold.replace(/([0-9]+.[0-9]{1})[0-9]*/, "$1"));
        var d_gold = gold.split(".")[0];
        var length = d_gold.length;
        if (length <= 3) return gold;
        var intval = length / 3 | 0;
        var remainder = length % 3;
        var num1, num2, unit;
        if (0 === remainder) {
          num1 = gold.substr(0, 3);
          num2 = gold.substr(3, 1);
          unit = unitArray[intval - 2];
        } else {
          num1 = gold.substr(0, remainder);
          num2 = gold.substr(remainder, 1);
          unit = unitArray[intval - 1];
        }
        return num1 + "." + num2 + unit;
      };
      UtilMgr.prototype.converPosition = function(targetNode, relativeNode) {
        var pos = targetNode.parent.convertToWorldSpaceAR(targetNode.position);
        var newPos = relativeNode.convertToNodeSpaceAR(pos);
        return newPos;
      };
      UtilMgr.prototype.compare = function(a, b) {
        a = "" + a;
        b = "" + b;
        a = a.trim();
        b = b.trim();
        a = a.split(".")[0];
        b = b.split(".")[0];
        var arr = a.split("");
        var brr = b.split("");
        if (arr.length < b.length) return true;
        if (arr.length > brr.length) return false;
        if (arr.length == brr.length) {
          var len = arr.length;
          var i = 0;
          while (i < len) {
            if (arr[i] < brr[i]) return true;
            if (arr[i] > brr[i]) return false;
            if (i == len - 1) return false;
            i++;
          }
        }
      };
      UtilMgr.prototype.distinct = function(str) {
        var obj = {};
        var newStr = "";
        for (var i = 0; i < str.length; i++) if (!obj[str[i]]) {
          newStr += str[i];
          obj[str[i]] = 1;
        }
        return newStr;
      };
      UtilMgr.prototype.disSpaceStr = function(str) {
        var rep_str = str.replace(/\s+/g, "");
        return rep_str;
      };
      UtilMgr.prototype.subFont = function(color, font) {
        var fontarr = font.split("");
        if ("red" == color) {
          var str = "";
          var num_r = [ "+", "s", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "%" ];
          var dui_r = [ "g", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "!", "@", "h" ];
          var index = -1;
          for (var j = 0; j < fontarr.length; j++) {
            for (var i = 0; i < num_r.length; i++) if (num_r[i] == fontarr[j]) {
              index = i;
              break;
            }
            str += dui_r[index];
          }
          return str;
        }
        var str = "";
        var num_g = [ "+", "s", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "%", "/" ];
        var dui_g = [ "q", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "w", "/" ];
        var index = -1;
        for (var j = 0; j < fontarr.length; j++) {
          for (var i = 0; i < num_g.length; i++) if (num_g[i] == fontarr[j]) {
            index = i;
            break;
          }
          str += dui_g[index];
        }
        return str;
      };
      return UtilMgr;
    }();
    exports.default = UtilMgr;
    String.prototype.trim = function() {
      return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    function deleteRepetion(arr) {
      var arrTable = {}, arrData = [];
      for (var i = 0; i < arr.length; i++) if (!arrTable[arr[i]]) {
        arrTable[arr[i]] = true;
        arrData.push(arr[i]);
      }
      return arrData;
    }
    cc._RF.pop();
  }, {} ],
  WXMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "07dd4D+NWJB654UI150+VvF", "WXMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("./Prefix");
    var btnUrl = "https://tomdzz-cdn.jinkejoy.com/dev/tom/kaishiyouxi.png";
    var WXMgr = function() {
      function WXMgr() {
        false;
      }
      WXMgr.getInstance = function() {
        null == this.instance && (this.instance = new WXMgr());
        return this.instance;
      };
      WXMgr.prototype._regisiterWXCallback = function() {
        var _this = this;
        wx.onShow(function(res) {
          _this._onShowCallback(res);
        });
        wx.onHide(function(res) {
          _this._onHideCallBack(res);
        });
      };
      WXMgr.prototype._onShowCallback = function(res) {
        cc.systemEvent.emit("OnWXShow", res);
        var mm = new Date().getTime() / 1e3;
        cc.systemEvent.emit("shareJudge", {
          time: mm
        });
      };
      WXMgr.prototype._onHideCallBack = function(res) {
        cc.systemEvent.emit("OnHide", res);
      };
      WXMgr.prototype.initLaunCallBack = function(callBack, target) {
        true;
        return;
        var res;
      };
      WXMgr.prototype.initShowCallback = function(callBack, target) {
        if (!callBack || !target) {
          console.log("initShowCallback..", "\u7f3a\u5c11\u53c2\u6570");
          return;
        }
        cc.systemEvent.on("OnWXShow", callBack, target);
      };
      WXMgr.prototype.showShareMenuWithTicket = function(ticket) {
        true;
        return;
      };
      WXMgr.prototype.showToast = function(title, duration) {
        true;
        return;
      };
      WXMgr.prototype.openDataContext = function(value) {
        false;
      };
      WXMgr.prototype._regisiterWXShareCallback = function(query) {
        var shareInfo = this._buildShareInfo();
        wx.onShareAppMessage(function() {
          return shareInfo;
        });
      };
      WXMgr.prototype.customShare = function(query, title, imgurl) {
        true;
        return;
        var shareInfo;
      };
      WXMgr.prototype.commonShare = function(callBack) {
        true;
        return;
        var shareInfo;
      };
      WXMgr.prototype.shareFlag = function(callBack, mm) {
        if (0 == G[Prefix_1.default.SHOW_CASH]) {
          callBack();
          return;
        }
        this.commonShare();
        cc.systemEvent.on("shareJudge", function(res) {
          res.time - mm > 3 ? callBack() : mk.UIMgr.showToast("\u8bf7\u5206\u4eab\u5230\u4e0d\u540c\u7684\u7fa4");
          cc.systemEvent.off("shareJudge");
        });
      };
      WXMgr.prototype._buildShareInfo = function(query, title, imgurl) {
        var inde = Math.randomInt(1, 6);
        imgurl = "https://tomdzz-cdn.jinkejoy.com/share/" + inde + ".jpg";
        var shareInfo = {
          title: "@\u6211",
          imageUrl: imgurl || null,
          query: query || null
        };
        return shareInfo;
      };
      WXMgr.prototype.login = function(model, callBack) {
        true;
        return;
        var self;
        var wxsys;
        var btnWidth;
        var btnHeight;
        var wxLeft;
        var wxTop;
        var buttonStyle;
        var button;
      };
      return WXMgr;
    }();
    exports.default = WXMgr;
    cc._RF.pop();
  }, {
    "./Prefix": "Prefix"
  } ],
  atOnceGetGold: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "78f2dWQIUNFHqgnFFbAxq/w", "atOnceGetGold");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var atOnceGetGold = function(_super) {
      __extends(atOnceGetGold, _super);
      function atOnceGetGold() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      atOnceGetGold.prototype.start = function() {
        this.shuxinMoneny();
      };
      atOnceGetGold.prototype.shuxinMoneny = function() {
        false;
        var num = G[Prefix_1.default.SHARE_NUM];
        var ci = 10 - num;
        var gold = this.mainGame.getMaxRoleAndGold()[1];
        var gold90 = mk.Calculator.multiply(gold, .9);
        var money = mk.Calculator.powe(gold90, 1.15, ci);
        G[Prefix_1.default.CITY_GOLD] = mk.Calculator.plus(G[Prefix_1.default.CITY_GOLD], money);
        var txtGold = mk.UtilMgr.unitConversion(money);
        this["_txtGold"].$Label.string = txtGold;
        this["_txtShengyu"].$Label.string = "\u4eca\u5929\u5269\u4f59" + num + "\u6b21";
        cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
      };
      atOnceGetGold.prototype._onBtnGetGoldTouchEnd = function() {
        var _this = this;
        var num = G[Prefix_1.default.SHARE_NUM];
        if (0 == num) {
          mk.UIMgr.showToast("\u5269\u4f590\u6b21\uff0c\u660e\u5929\u518d\u9886");
          return;
        }
        var mm;
        false;
        G[Prefix_1.default.SHARE_NUM]--;
        this.shuxinMoneny();
      };
      atOnceGetGold = __decorate([ ccclass ], atOnceGetGold);
      return atOnceGetGold;
    }(FrameBase_1.default);
    exports.default = atOnceGetGold;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  bossInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0013bHK/qhCwZHewMNk76BJ", "bossInfo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bossInfo = function(_super) {
      __extends(bossInfo, _super);
      function bossInfo() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.gouFrame = null;
        _this.chaFrame = null;
        _this.condition1 = false;
        _this.condition2 = false;
        _this.condition3 = false;
        _this.limitQuan = 0;
        return _this;
      }
      bossInfo.prototype.start = function() {
        var roleCfgJson = this.mainGame.roleCfg.json;
        var data = roleCfgJson[G[Prefix_1.default.MAXROLE_GRADE]];
        this["_txtGarden"].$Label.string = G[Prefix_1.default.MAXROLE_GRADE];
        this["_txtName"].$Label.string = data.role_name;
        this["_txtSpeed"].$Label.string = data.ATK_SPD + "s";
        this["_txtSkill"].$Label.string = data.skill_describe;
        this["_miaosu"].$Label.string = G[Prefix_1.default.MAXROLE_GRADE] + "%";
        var towerCfgJson = this.mainGame.towerCfg.json;
        var cityAbbtri = towerCfgJson["city" + G[Prefix_1.default.CITY_GARDE]];
        var index = G[Prefix_1.default.MAXROLE_GRADE];
        var atk = cityAbbtri["role" + index];
        var txtgong = mk.UtilMgr.unitConversion(atk);
        this["_txtHarm"].$Label.string = txtgong;
        var layout = G[Prefix_1.default.ROLE_LYOUT];
        var jinum = 0;
        for (var key in layout) if (layout.hasOwnProperty(key)) {
          var element = layout[key];
          element == G[Prefix_1.default.MAXROLE_GRADE] && jinum++;
        }
        var colorText_num = "";
        if (jinum < 2) {
          colorText_num = "<color=#de495b>";
          this["_xgou1"].$Sprite.spriteFrame = this.chaFrame;
        } else {
          colorText_num = "<color=#20c127>";
          this["_xgou1"].$Sprite.spriteFrame = this.gouFrame;
          this.condition1 = true;
        }
        this["_xq1"].$RichText.string = colorText_num + jinum + "</c><color=#20c127>/2</color>";
        var currentGarden = G[Prefix_1.default.CITY_GARDE];
        var limitGarden = data.city_limit;
        var colorText_garden = "";
        if (currentGarden < limitGarden) {
          colorText_garden = "<color=#de495b>";
          this["_xgou2"].$Sprite.spriteFrame = this.chaFrame;
        } else {
          colorText_garden = "<color=#20c127>";
          this["_xgou2"].$Sprite.spriteFrame = this.gouFrame;
          this.condition2 = true;
        }
        this["_xq2"].$RichText.string = colorText_garden + currentGarden + "</c><color=#20c127>/" + limitGarden + "</color>";
        var currentQuan = G[Prefix_1.default.CITY_QUAN];
        this.limitQuan = data.role_second_money;
        var colorText_quan = "";
        if (parseInt(currentQuan) < parseInt(this.limitQuan)) {
          colorText_quan = "<color=#de495b>";
          this["_xgou3"].$Sprite.spriteFrame = this.chaFrame;
        } else {
          colorText_quan = "<color=#20c127>";
          this["_xgou3"].$Sprite.spriteFrame = this.gouFrame;
          this.condition3 = true;
        }
        this["_xq3"].$RichText.string = colorText_quan + currentQuan + "</c><color=#20c127>/" + this.limitQuan + "</color>";
        this.condition1 && this.condition2 && this.condition3 ? this["_btnJinhua"].active = true : this["_btnJinhua"].active = false;
      };
      bossInfo.prototype._onBtnJinhuaTouchEnd = function() {
        if (this.condition1 && this.condition2 && this.condition3) {
          var layout = G[Prefix_1.default.ROLE_LYOUT];
          var jinum = 0;
          var keyarr = [];
          for (var key in layout) if (layout.hasOwnProperty(key) && jinum < 2) {
            var element = layout[key];
            if (element == G[Prefix_1.default.MAXROLE_GRADE]) {
              jinum++;
              keyarr.push(key);
            }
          }
          for (var i = 0; i < keyarr.length; i++) {
            var tower = this.mainGame["_towerBase" + keyarr[i]].getChildByName("_tower");
            tower.destroy();
            var layout_1 = G[Prefix_1.default.ROLE_LYOUT];
            layout_1[keyarr[i]] = 0;
            this.mainGame["_lv" + keyarr[i]].active = false;
          }
          G[Prefix_1.default.CITY_QUAN] = mk.Calculator.minus(G[Prefix_1.default.CITY_QUAN], this.limitQuan);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
          mk.UIMgr.showPrefab("prefab/UIForm/evolved");
          G[Prefix_1.default.MAXROLE_GRADE] += 1;
          this.mainGame.initBoosRole();
          this.node.destroy();
        } else mk.UIMgr.showToast("\u6761\u4ef6\u4e0d\u8db3");
      };
      __decorate([ property(cc.SpriteFrame) ], bossInfo.prototype, "gouFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], bossInfo.prototype, "chaFrame", void 0);
      bossInfo = __decorate([ ccclass ], bossInfo);
      return bossInfo;
    }(FrameBase_1.default);
    exports.default = bossInfo;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6377aqmcWdH14+URiGEzoWg", "bullet");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var bullet = function(_super) {
      __extends(bullet, _super);
      function bullet() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bulletAtlas = null;
        _this.game = null;
        _this.harm = "";
        _this.skill = 0;
        return _this;
      }
      bullet.prototype.start = function() {};
      bullet.prototype.init = function(game, harm, skill, wuqi) {
        this.game = game;
        this.node.position = cc.v2(0, 0);
        this.skill = skill;
        this.harm = harm;
        this.node.getComponent(cc.Sprite).spriteFrame = this.bulletAtlas.getSpriteFrame(wuqi);
      };
      bullet.prototype.shoot = function(targetNode) {
        var _this = this;
        var targetPt = mk.UtilMgr.converPosition(targetNode, this.node);
        var actionBack = cc.callFunc(function() {
          _this.game.recycle(_this.node);
        });
        var seq = cc.sequence(cc.moveTo(.15, targetPt), actionBack);
        this.node.runAction(seq);
      };
      __decorate([ property(cc.SpriteAtlas) ], bullet.prototype, "bulletAtlas", void 0);
      bullet = __decorate([ ccclass ], bullet);
      return bullet;
    }(cc.Component);
    exports.default = bullet;
    cc._RF.pop();
  }, {} ],
  buttonTouch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "679b2pe6vFEIb4moXXazWMF", "buttonTouch");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MainGame_1 = require("./MainGame");
    var Prefix_1 = require("../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var buttonTouch = function(_super) {
      __extends(buttonTouch, _super);
      function buttonTouch() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.game = null;
        return _this;
      }
      buttonTouch.prototype.onLoad = function() {
        mk.UIkill.bindComponent(this);
        this.game = this.node.getComponent(MainGame_1.default);
      };
      buttonTouch.prototype.start = function() {};
      buttonTouch.prototype._onBtnCityTouchEnd = function() {
        var _this = this;
        mk.UIMgr.showPrefab("prefab/UIForm/cityInfo", function(node) {
          node.getComponent("cityInfo").init(_this.game);
        });
      };
      buttonTouch.prototype.fennuUI = function() {
        var _this = this;
        this.game["_fennuSpr_k"].active = true;
        var maxLv = G[Prefix_1.default.MAXROLE_GRADE];
        cc.loader.loadRes("Role_atals/roleRes", cc.SpriteAtlas, function(err, frames) {
          var frame = frames.getSpriteFrame("role" + maxLv);
          _this.game["_fennu_role"].$Sprite.spriteFrame = frame;
        });
        this.scheduleOnce(function() {
          _this.game["_fennuSpr_k"].active = false;
        }, 2);
      };
      buttonTouch.prototype._onBtnFenuTouchEnd = function() {
        if (G[Prefix_1.default.FENNU] < 1) mk.UIMgr.showToast("\u6124\u6012\u4e0d\u8db3"); else {
          if (this.game.fennuKq) return;
          this.fennuUI();
          G[Prefix_1.default.PLUS].Gplus += .5;
          G[Prefix_1.default.PLUS].Aplus += .5;
          G[Prefix_1.default.PLUS].Splus -= .5;
          G[Prefix_1.default.FENNU] -= 1;
          this.game.fennuKq = true;
          this.game.fennuTotal = 120;
          cc.systemEvent.emit(Prefix_1.default.REFRESH_FENNUSHOW_ENVET);
          this.game.task_statis("taskId6");
          mk.AudioMgr.playEffect(Prefix_1.default.addSpeed);
        }
      };
      buttonTouch.prototype._onBtnTuozTouchEnd = function() {
        mk.UIMgr.showToast("\u6682\u672a\u5f00\u653e");
      };
      buttonTouch.prototype._onBtnCreatTouchEnd = function() {
        var money = this.game.getMaxRoleAndGold()[1];
        var type = this.game.getMaxRoleAndGold()[0];
        var flag = mk.UtilMgr.compare(money, G[Prefix_1.default.CITY_GOLD]);
        flag ? this.game.quickCreatRole(type, money) : this.atOnceGetGold();
      };
      buttonTouch.prototype._onBtnStoreTouchEnd = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/storeFab");
      };
      buttonTouch.prototype._onRoleBossTouchEnd = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/bossInfo");
      };
      buttonTouch.prototype.goldCollect = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/collectFab");
      };
      buttonTouch.prototype._onBtnSetTouchEnd = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/settingFab");
      };
      buttonTouch.prototype._onBtnTaskTouchEnd = function() {
        if (G[Prefix_1.default.CITY_GARDE] < 11) {
          mk.UIMgr.showToast("\u4e3b\u57ce11\u7ea7\u5f00\u542f");
          return;
        }
        mk.UIMgr.showPrefab("prefab/UIForm/taskFab");
      };
      buttonTouch.prototype._onBtnGuardTouchEnd = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/guardFab");
      };
      buttonTouch.prototype._onBtnMagicTouchEnd = function() {
        if (G[Prefix_1.default.CITY_GARDE] < 15) {
          mk.UIMgr.showToast("\u4e3b\u57ce15\u7ea7\u5f00\u542f");
          return;
        }
        mk.UIMgr.showPrefab("prefab/UIForm/magicFab");
      };
      buttonTouch.prototype.atOnceGetGold = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/getGoldFab");
      };
      buttonTouch.prototype._onBtnGiftTouchEnd = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/giftFab");
      };
      buttonTouch = __decorate([ ccclass ], buttonTouch);
      return buttonTouch;
    }(cc.Component);
    exports.default = buttonTouch;
    cc._RF.pop();
  }, {
    "../framework/Prefix": "Prefix",
    "./MainGame": "MainGame"
  } ],
  changgeRole: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e5d48ZS5FBMxog/tUwUxIf8", "changgeRole");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  cityInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "16b9cFT05tH/blGpUqTRQmQ", "cityInfo");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var cityInfo = function(_super) {
      __extends(cityInfo, _super);
      function cityInfo() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.game = null;
        _this.exp = null;
        return _this;
      }
      cityInfo.prototype.start = function() {
        this["_txtGarde"].$Label.string = G[Prefix_1.default.CITY_GARDE] + "\u7ea7";
      };
      cityInfo.prototype.init = function(game) {
        this.game = game;
        var cityCfgJson = this.game.cityCfg.json;
        var data = cityCfgJson["city" + G[Prefix_1.default.CITY_GARDE]].city_exp;
        G[Prefix_1.default.CITY_EXP] < 0 && (G[Prefix_1.default.CITY_EXP] = 0);
        var currentExp = G[Prefix_1.default.CITY_EXP];
        this["_exp"].$Label.string = currentExp + "/" + data;
        this["_expPro"].$ProgressBar.progress = currentExp / data;
        this.nextGardenTxt();
      };
      cityInfo.prototype.nextGardenTxt = function() {
        var cityCfgJson = this.game.cityCfg.json;
        var roleCfgJson = this.game.roleCfg.json;
        var lv = cityCfgJson["city" + G[Prefix_1.default.CITY_GARDE]].role_lv_limit;
        for (var key in cityCfgJson) if (cityCfgJson.hasOwnProperty(key) && cityCfgJson[key]["role_lv_limit"] != lv && cityCfgJson[key]["role_lv_limit"] > lv) {
          var next = key.substr(4);
          var limt = cityCfgJson[key]["role_lv_limit"];
          var name = roleCfgJson[limt].role_name;
          this["_txtNext"].$Label.string = "\u57ce\u5821\u7b49\u7ea7\u8fbe\u5230" + next + "\u7ea7\u89e3\u9501<" + name + ">\u6c64\u59c6\u732b";
          break;
        }
        var add = G[Prefix_1.default.CITY_GARDE];
        var nextAdd = add + 1;
        this["_txtadd"].$RichText.string = "<color=#FAFCFF>\u6240\u6709\u6c64\u59c6\u732b\u653b\u51fb+" + add + "%</c><color=#73DC6B>\uff08\u4e0b\u4e00\u7ea7+" + nextAdd + "%\uff09</color>";
      };
      cityInfo = __decorate([ ccclass ], cityInfo);
      return cityInfo;
    }(FrameBase_1.default);
    exports.default = cityInfo;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  collect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2272bRvDuZIQqmrHMBegIKY", "collect");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var collect = function(_super) {
      __extends(collect, _super);
      function collect() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      collect.prototype.start = function() {
        var money = this.mainGame.getMaxRoleAndGold();
        var ms = 2 * money[1] / 600;
        var mm = new Date().getTime() / 1e3;
        var quitTime = G[Prefix_1.default.QUIT_GAME];
        var txtGold = 0;
        txtGold = mm - quitTime >= 600 ? 600 * ms : (mm - quitTime) * ms;
        G[Prefix_1.default.CITY_GOLD] = mk.Calculator.plus(G[Prefix_1.default.CITY_GOLD], txtGold);
        cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
        var goldstr = mk.UtilMgr.unitConversion(txtGold);
        this["_goldNum"].$Label.string = goldstr;
      };
      collect.prototype._onBtnAwardTouchEnd = function() {
        mk.UIMgr.showToast("\u6682\u672a\u5f00\u653e");
      };
      collect = __decorate([ ccclass ], collect);
      return collect;
    }(FrameBase_1.default);
    exports.default = collect;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  confirm: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "68e5bT34J1Az4IaiW0MedKI", "confirm");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var confirm = function(_super) {
      __extends(confirm, _super);
      function confirm() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.limitQuan = 0;
        _this.callBack = null;
        return _this;
      }
      confirm.prototype.start = function() {
        var _this = this;
        this["_xiaci"].on(cc.Node.EventType.TOUCH_START, function() {
          _this.node.destroy();
        });
        var roleCfgJson = this.mainGame.roleCfg.json;
        var data = roleCfgJson[G[Prefix_1.default.MAXROLE_GRADE]];
        this.limitQuan = data.role_second_money;
        var cutqq = G[Prefix_1.default.CITY_QUAN];
        this["_xyttq"].$RichText.string = "<color=#00ff00>" + cutqq + "</c><color=#0fffff>/" + this.limitQuan + "</color>";
        this["_xytmm"].$Label.string = data.role_name;
      };
      confirm.prototype.init = function(callBack) {
        this.callBack = callBack;
      };
      confirm.prototype._onBtnJinhTouchEnd = function() {
        G[Prefix_1.default.CITY_QUAN] = mk.Calculator.minus(G[Prefix_1.default.CITY_QUAN], this.limitQuan);
        cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
        mk.UIMgr.showPrefab("prefab/UIForm/evolved");
        G[Prefix_1.default.MAXROLE_GRADE] += 1;
        this.mainGame.initBoosRole();
        this.callBack();
        this.node.destroy();
      };
      confirm = __decorate([ ccclass ], confirm);
      return confirm;
    }(FrameBase_1.default);
    exports.default = confirm;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  enemy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "57e259pn5hPvJq9JTcXBsxi", "enemy");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var animat = cc.Enum({
      o: 1,
      t: 2,
      s: 3
    });
    var Prefix_1 = require("../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var enemy = function(_super) {
      __extends(enemy, _super);
      function enemy() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bloodPro = null;
        _this.mstAtlas = null;
        _this.subject = null;
        _this.xunYun = null;
        _this.zhongDu = null;
        _this.baoJi = null;
        _this.daJi = null;
        _this.jianSu = null;
        _this.dropGoldFrame = null;
        _this.pathIndex = 0;
        _this.pathObjArr = null;
        _this.game = null;
        _this.animation = null;
        _this.harmOnce = "";
        _this.blood = "";
        _this.speed = 0;
        _this.gold = 0;
        _this.exp = 0;
        _this.uu = "";
        _this.countHarm = "0";
        _this.floatHarm = 0;
        _this.cishu = 0;
        return _this;
      }
      enemy.prototype.init = function(game, attribute, typeShape) {
        this.game = game;
        this.node.position = game.pathArr[0];
        this.pathObjArr = game.pathArr;
        this.blood = attribute.hp;
        this.speed = attribute.spd;
        this.gold = attribute.ney;
        this.exp = attribute.exp;
        this.uu = attribute.shape;
        this.animation = this.subject.addComponent(cc.Animation);
        this.playAddAnima(animat.o);
        "big_num" == typeShape && (this.node.scale = .8);
      };
      enemy.prototype.playAddAnima = function(stat) {
        var frameArr = [];
        if (stat == animat.o) for (var i = 1; i <= 4; i++) {
          var frame = this.mstAtlas.getSpriteFrame(this.uu + "_0" + i);
          frameArr.push(frame);
        } else if (stat == animat.t) for (var i = 5; i <= 8; i++) {
          var frame = this.mstAtlas.getSpriteFrame(this.uu + "_0" + i);
          frameArr.push(frame);
        } else if (stat == animat.s) {
          this.subject.scaleX = -1;
          for (var i = 1; i <= 4; i++) {
            var frame = this.mstAtlas.getSpriteFrame(this.uu + "_0" + i);
            frameArr.push(frame);
          }
        }
        var clip = cc.AnimationClip.createWithSpriteFrames(frameArr, 60);
        clip.wrapMode = cc.WrapMode.Loop;
        clip.name = "run";
        this.animation.addClip(clip);
        var animStateRun = this.animation.play(clip.name);
        animStateRun.duration = .8;
      };
      enemy.prototype.dropBlood = function(btEnemy) {
        this.harmOnce = btEnemy.harm;
        var daJiAnima = this.daJi.getComponent(cc.Animation);
        daJiAnima.play("daJi");
        mk.AudioMgr.playEffect(Prefix_1.default.atkHarm);
        this.skillEffect(btEnemy.skill);
        var result = mk.Calculator.divide(this.harmOnce, this.blood, 10);
        this.floatHarm = this.floatHarm + parseFloat(result);
        this.bloodPro.progress = 1 - this.floatHarm;
        this.floatHarm >= 1 && this.death(true);
      };
      enemy.prototype.getPrize = function() {
        var goldNode = new cc.Node("gold");
        goldNode.addComponent(cc.Sprite).spriteFrame = this.dropGoldFrame;
        goldNode.parent = this.game["_goldDot"];
        goldNode.position = this.node.position;
        this.game.dropGoldArr.push(goldNode);
        var sprQuan = this.game["_sprQuan_k"];
        var canvas = cc.find("Canvas");
        var pos = mk.UtilMgr.converPosition(sprQuan, canvas);
        var subPos = pos.sub(cc.v2(70, 80));
        if (0 == this.game.enemyArr.length && 1 == this.game.tianqiState) {
          this.game.task_statis("taskId3");
          mk.UIMgr.showPrefab("prefab/UIForm/tips", function(node) {
            node.position = subPos;
            node.getComponent("tips").init(3, 1);
            setTimeout(function() {
              G[Prefix_1.default.CITY_QUAN] = mk.Calculator.plus(G[Prefix_1.default.CITY_QUAN], 1);
              cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
              node.removeFromParent();
            }, 1500);
          }, this.game["_floatLayout"]);
        }
        var countGold = mk.Calculator.plus(this.game.total_gold, this.gold);
        this.game.total_gold = countGold;
        var countExp = mk.Calculator.plus(this.game.wave_exp, this.exp);
        this.game.wave_exp = countExp;
        this.cishu++;
      };
      enemy.prototype.death = function(kill) {
        cc.js.array.remove(this.game.enemyArr, this.node);
        true == kill && this.getPrize();
        this.node.destroy();
        0 == this.game.enemyArr.length && this.game.resetWave();
      };
      enemy.prototype.update = function(dt) {
        if (this.pathIndex > this.pathObjArr.length - 1) {
          var j_exp_1 = this.exp;
          this.game.wave_exp -= this.exp;
          this.death();
          mk.UIMgr.showPrefab("/prefab/UIForm/tips", function(node) {
            node.position = cc.v2(-209, 290);
            node.getComponent("tips").init(1, j_exp_1);
            setTimeout(function() {
              node.removeFromParent();
            }, 2e3);
          }, this.game["_floatLayout"]);
          return;
        }
        var oldPos = this.node.position;
        var pos = this.pathObjArr[this.pathIndex];
        var direction = pos.sub(oldPos).normalize();
        var len = pos.sub(oldPos).mag();
        var newPos = oldPos.add(direction.mul(this.speed * dt));
        if (len < 1) {
          this.pathIndex++;
          this.switchFrame();
        }
        this.node.setPosition(newPos);
      };
      enemy.prototype.switchFrame = function() {
        4 == this.pathIndex ? this.playAddAnima(animat.t) : 5 == this.pathIndex && this.playAddAnima(animat.s);
      };
      enemy.prototype.skillEffect = function(jnid) {
        var _this = this;
        jnid = parseInt(jnid);
        if (jnid >= 1 && jnid <= 3) {
          var gl = Math.randomInt(0, 100);
          var sj = 0;
          switch (jnid) {
           case 1:
            sj = 1;
            break;

           case 2:
            sj = 2;
            break;

           case 3:
            sj = 3;
          }
          if (gl < 10) {
            var jianSuAnim_1 = this.jianSu.getComponent(cc.Animation);
            this.jianSu.active = true;
            jianSuAnim_1.play("jianSu");
            this.speed = this.speed / 2;
            this.scheduleOnce(function() {
              _this.speed = 2 * _this.speed;
              jianSuAnim_1.setCurrentTime(0);
              jianSuAnim_1.stop("jianSu");
              _this.jianSu.active = false;
            }, sj);
          }
        } else if (jnid >= 8 && jnid <= 12) {
          var cf = 0;
          var gl = Math.randomInt(0, 100);
          switch (jnid) {
           case 8:
            cf = 25;
            break;

           case 9:
            cf = 30;
            break;

           case 10:
            cf = 35;
            break;

           case 11:
            cf = 40;
            break;

           case 12:
            cf = 45;
          }
          if (gl < cf) {
            var zhongDAnim_1 = this.zhongDu.getComponent(cc.Animation);
            this.zhongDu.active = true;
            zhongDAnim_1.play("zhongD");
            var i_1 = 0;
            this.schedule(function() {
              _this.floatHarm += .05;
              _this.bloodPro.progress = 1 - _this.floatHarm;
              _this.floatHarm >= 1 && _this.death(true);
              i_1++;
              if (4 == i_1) {
                zhongDAnim_1.setCurrentTime(0);
                zhongDAnim_1.stop("zhongD");
                _this.zhongDu.active = false;
              }
            }, 1, 3, 0);
          }
        } else if (jnid >= 13 && jnid <= 17) {
          var cf = 0;
          var gl = Math.randomInt(0, 100);
          switch (jnid) {
           case 13:
            cf = 10;
            break;

           case 14:
            cf = 12;
            break;

           case 15:
            cf = 14;
            break;

           case 16:
            cf = 16;
            break;

           case 17:
            cf = 18;
          }
          if (gl < cf) {
            this.harmOnce = mk.Calculator.multiply(this.harmOnce, 2);
            var baoJiAnima = this.baoJi.getComponent(cc.Animation);
            baoJiAnima.play("baoJi");
          }
        } else if (jnid >= 18 && jnid <= 22) {
          var cf = 0;
          switch (jnid) {
           case 18:
            cf = 5;
            break;

           case 19:
            cf = 7;
            break;

           case 20:
            cf = 10;
            break;

           case 21:
            cf = 12;
            break;

           case 22:
            cf = 14;
          }
          var gl = Math.randomInt(0, 100);
          if (gl < cf) {
            this.enabled = false;
            this.xunYun.active = true;
            this.xunYun.getComponent(cc.Animation);
            var xunYunAnima_1 = this.xunYun.getComponent(cc.Animation);
            xunYunAnima_1.play("xunYun");
            this.scheduleOnce(function() {
              _this.enabled = true;
              xunYunAnima_1.setCurrentTime(0);
              xunYunAnima_1.stop("xunYun");
              _this.xunYun.active = false;
            }, 1);
          }
        }
      };
      __decorate([ property(cc.ProgressBar) ], enemy.prototype, "bloodPro", void 0);
      __decorate([ property(cc.SpriteAtlas) ], enemy.prototype, "mstAtlas", void 0);
      __decorate([ property(cc.Node) ], enemy.prototype, "subject", void 0);
      __decorate([ property(cc.Node) ], enemy.prototype, "xunYun", void 0);
      __decorate([ property(cc.Node) ], enemy.prototype, "zhongDu", void 0);
      __decorate([ property(cc.Node) ], enemy.prototype, "baoJi", void 0);
      __decorate([ property(cc.Node) ], enemy.prototype, "daJi", void 0);
      __decorate([ property(cc.Node) ], enemy.prototype, "jianSu", void 0);
      __decorate([ property(cc.SpriteFrame) ], enemy.prototype, "dropGoldFrame", void 0);
      enemy = __decorate([ ccclass ], enemy);
      return enemy;
    }(cc.Component);
    exports.default = enemy;
    cc._RF.pop();
  }, {
    "../framework/Prefix": "Prefix"
  } ],
  enmu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd044lUJhdGZ4UQ/2+Tm9i/", "enmu");
    cc._RF.pop();
  }, {} ],
  evolved: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ebb92z1VRNXLrpzwWmJ1mf", "evolved");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var evolved = function(_super) {
      __extends(evolved, _super);
      function evolved() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.shape = 0;
        return _this;
      }
      evolved.prototype.start = function() {
        var roleCfgJson = this.mainGame.roleCfg.json;
        var lv = G[Prefix_1.default.MAXROLE_GRADE];
        var data = roleCfgJson[lv];
        this.shape = data.role_shape;
        this["_txtName"].$Label.string = data.role_name;
        "\u65e0" != data.skill_describe && (this["_jineng"].$Label.string = "\u6280\u80fd:" + data.skill_describe);
        this.addAnimation(this["_shape"]);
      };
      evolved.prototype.addAnimation = function(nodeSpr) {
        var self = this;
        var anima = nodeSpr.addComponent(cc.Animation);
        cc.loader.loadRes("shape/" + this.shape + "_pf_dj", cc.SpriteAtlas, function(err, atlas) {
          var frame = atlas.getSpriteFrames()[0];
          nodeSpr.$Sprite.spriteFrame = frame;
          var arr = atlas.getSpriteFrames();
          self.addAnima(anima, arr, "daiji");
        });
      };
      evolved.prototype.addAnima = function(anima, arrFrame, str) {
        var clip = cc.AnimationClip.createWithSpriteFrames(arrFrame, 60);
        clip.wrapMode = cc.WrapMode.Loop;
        clip.name = str;
        anima.addClip(clip);
        clip.wrapMode = cc.WrapMode.Loop;
        var animStateRun = anima.play(str);
        animStateRun.duration = 4;
      };
      evolved.prototype._onBtnTomGiftTouchEnd = function() {
        var mm = new Date().getTime() / 1e3;
        mk.WXMgr.shareFlag(function() {}, mm);
      };
      evolved = __decorate([ ccclass ], evolved);
      return evolved;
    }(FrameBase_1.default);
    exports.default = evolved;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  gift: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b31brQSI1EK4t1IA6O4e5P", "gift");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var gift = function(_super) {
      __extends(gift, _super);
      function gift() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.giftArr = null;
        _this.cityData = null;
        _this.currentGift_Lv = 1;
        _this.curretnToggel = null;
        _this.quan = 0;
        _this.fenn = 0;
        _this.gold = "0";
        return _this;
      }
      gift.prototype.start = function() {
        this.init();
      };
      gift.prototype.init = function() {
        this.cityData = this.mainGame.cityCfg.json;
        this.giftArr = G[Prefix_1.default.GIFT_GRADE];
        0 == this.giftArr.length ? this["_wulibao"].active = false : this["_wulibao"].active = true;
        var giftArr = this.giftArr;
        giftArr.sort(function(a, b) {
          return b - a;
        });
        for (var i = 1; i <= 5; i++) this["_grade" + i].$Label.string = "";
        var len = this.giftArr.length;
        if (len <= 5) for (var i = len; i > 0; i--) {
          this["_grade" + i].$Label.string = giftArr[len - i] + "\u7ea7";
          this["_toggle" + i].grade = giftArr[len - i];
        } else for (var i = 5; i > 0; i--) {
          this["_grade" + i].$Label.string = giftArr[5 - i] + "\u7ea7";
          this["_toggle" + i].grade = giftArr[5 - i];
        }
        this.defalutShow(giftArr);
      };
      gift.prototype.defalutShow = function(arr) {
        var len = arr.length;
        if (0 == len) return;
        if (len > 5) {
          this["_toggle5"].$Toggle.isChecked = true;
          this.curretnToggel = this["_toggle5"];
        } else {
          this["_toggle" + len].$Toggle.isChecked = true;
          this.curretnToggel = this["_toggle" + len];
        }
        this["_txtCurret"].$Label.string = "\u5f53\u524d" + arr[0] + "\u7ea7\u793c\u5305";
        this.currentGift_Lv = arr[0];
        this.showData(arr[0]);
      };
      gift.prototype.showData = function(gt_lv) {
        if (gt_lv) {
          var fenn = this.cityData["city" + gt_lv].reward_1;
          var quan = this.cityData["city" + gt_lv].reward_2;
          var gold = this.cityData["city" + gt_lv].reward_3;
          this["_goods1"].$Label.string = fenn;
          this["_award1"].$Label.string = fenn;
          this.fenn = fenn;
          var txtGold = mk.UtilMgr.unitConversion(gold);
          this["_goods2"].$Label.string = txtGold;
          this["_award2"].$Label.string = txtGold;
          this.gold = gold;
          this["_goods3"].$Label.string = quan;
          this["_award3"].$Label.string = quan;
          this.quan = quan;
        }
      };
      gift.prototype.clickSucess = function() {
        var _this = this;
        console.log("\u5206\u4eab\u6210\u529f");
        this["_getGift"].active = true;
        this["_box"].active = false;
        mk.AudioMgr.playEffect(Prefix_1.default.linqAward);
        cc.js.array.remove(this.giftArr, this.currentGift_Lv);
        G[Prefix_1.default.GIFT_GRADE] = this.giftArr;
        G[Prefix_1.default.CITY_QUAN] = mk.Calculator.plus(G[Prefix_1.default.CITY_QUAN], this.quan);
        cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
        G[Prefix_1.default.CITY_GOLD] = mk.Calculator.plus(G[Prefix_1.default.CITY_GOLD], this.gold);
        cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
        G[Prefix_1.default.FENNU] += 1;
        cc.systemEvent.emit(Prefix_1.default.REFRESH_FENNUSHOW_ENVET);
        this.curretnToggel.grade = void 0;
        setTimeout(function() {
          _this["_getGift"].active = false;
          _this["_box"].active = true;
          _this.init();
          if (0 == _this.giftArr.length) {
            _this.mainGame["_btnGift"].active = false;
            _this.node.destroy();
          }
        }, 1500);
      };
      gift.prototype._onBtnGetGiftTouchEnd = function() {
        var _this = this;
        var mm;
        false;
        this.clickSucess();
      };
      gift.prototype._onToggleTouchEnd = function(sed) {
        this.currentGift_Lv = sed.grade;
        this.curretnToggel = sed;
        if (void 0 == this.currentGift_Lv) this["_wulibao"].active = false; else {
          this["_wulibao"].active = true;
          this["_txtCurret"].$Label.string = "\u5f53\u524d" + sed.grade + "\u7ea7\u793c\u5305";
          this.showData(this.currentGift_Lv);
        }
      };
      gift = __decorate([ ccclass ], gift);
      return gift;
    }(FrameBase_1.default);
    exports.default = gift;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  guard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8dbe7ASrmJIPZ3+AY/glWZk", "guard");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var guard = function(_super) {
      __extends(guard, _super);
      function guard() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      guard.prototype.start = function() {
        var _this = this;
        var plus = G[Prefix_1.default.PLUS];
        mk.HttpMgr.req({}, "tom/inviteList", function(res) {
          var list = res.data.user_list;
          for (var i = 1; i <= list.length; i++) {
            1 == i || 5 == i || 9 == i ? plus.Gplus += .1 : 2 == i || 6 == i || 10 == i ? plus.Eplus += .1 : 3 == i || 7 == i || 11 == i ? plus.Aplus += .05 : 4 != i && 8 != i && 12 != i || (plus.Splus -= .05);
            _this.showHeadIcon(list[i - 1].avatar, i);
          }
          console.log("plus_plus", G[Prefix_1.default.PLUS]);
        });
      };
      guard.prototype.showHeadIcon = function(avatar, i) {
        var _this = this;
        cc.loader.load({
          url: avatar,
          type: "jpg"
        }, function(err, texture) {
          _this["_touxian" + i].$Sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
      };
      guard.prototype._onBtnHireTouchEnd = function() {
        var query = "uid=" + G.uid;
        mk.WXMgr.customShare(query);
      };
      guard.prototype._onTouxianTouchEnd = function(send) {
        var query = "uid=" + G.uid;
        mk.WXMgr.customShare(query);
      };
      guard = __decorate([ ccclass ], guard);
      return guard;
    }(FrameBase_1.default);
    exports.default = guard;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  jksdk_wechat_minigame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a98b1ynG+FG+7rUbQI8qYGe", "jksdk_wechat_minigame");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    if ("undefined" !== typeof GameGlobal) {
      var changeDataType = function changeDataType(obj) {
        var str = "";
        if ("object" == ("undefined" === typeof obj ? "undefined" : _typeof(obj))) for (var i in obj) "function" != typeof obj[i] && "object" != _typeof(obj[i]) ? str += i + "=" + encodeURIComponent(obj[i]) + "&" : "object" == _typeof(obj[i]) && (str += changeSonType(i, obj[i]));
        return str.replace(/&$/g, "");
      };
      var changeSonType = function changeSonType(objName, objValue) {
        var nextStr = "";
        if ("object" == ("undefined" === typeof objValue ? "undefined" : _typeof(objValue))) for (var i in objValue) if ("object" != _typeof(objValue[i])) {
          var value = objName + "[" + i + "]=" + encodeURIComponent(objValue[i]);
          nextStr += value + "&";
        } else changeSonType(objName + "[" + i + "]", objValue[i]);
        return nextStr;
      };
      var third_login = function third_login() {
        console.log("\u7b2c\u4e09\u65b9\u767b\u9646");
        var request_url = GameGlobal.jinke.apiHost + "/index/index_v3/third_verify_login";
        var app_id = GameGlobal.jinke.init_params.app_id;
        var distributor_id = GameGlobal.jinke.init_params.distributor_id;
        var platform_id = GameGlobal.jinke.init_params.platform_id;
        var channel_id = GameGlobal.jinke.init_params.channel_id;
        var account_type = 10;
        var requestMap = {
          appId: app_id,
          platformId: platform_id
        };
        var url = GameGlobal.jinke.commonServiceHost + "/v1/commonServer/getConfigData";
        wx.request({
          url: url,
          method: "POST",
          dateType: "json",
          data: requestMap,
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function success(result) {
            result ? GameGlobal.jinke.platformInfo = result.data : console.log("\u83b7\u53d6\u6e38\u620f\u914d\u7f6e\u4e3a\u7a7a");
          },
          fail: function fail() {
            console.log("\u83b7\u53d6\u6e38\u620f\u914d\u7f6e\u63a5\u53e3\u8c03\u7528\u5931\u8d25");
          }
        });
        wx.getSetting({
          success: function success(settingRes) {
            var authSetting = settingRes.authSetting;
            false === authSetting["scope.userInfo"] ? console.log("\u7528\u6237\u5df2\u62d2\u7edd\u6388\u6743\uff0c\u518d\u8c03\u7528\u76f8\u5173 API \u6216\u8005 wx.authorize \u4f1a\u5931\u8d25\uff0c\u9700\u8981\u5f15\u5bfc\u7528\u6237\u5230\u8bbe\u7f6e\u9875\u9762\u6253\u5f00\u6388\u6743\u5f00\u5173") : wx.login({
              success: function success(res) {
                wx.request({
                  url: request_url,
                  method: "POST",
                  data: {
                    account_type: account_type,
                    event_id: 102,
                    os: "3",
                    app_id: app_id,
                    distributor_id: distributor_id,
                    platform_id: platform_id,
                    channel_id: channel_id,
                    platform_login_info: {
                      code: res.code
                    }
                  },
                  success: function success(result) {
                    if (0 != result.data.code) {
                      console.log(result.data.message);
                      GameGlobal.jinke.loginFailCallback();
                      return;
                    }
                    console.log("\u767b\u5f55\u6210\u529f", result);
                    var open_id = result.data.open_id;
                    var access_token = result.data.access_token;
                    var other_open_id = result.data.platform_info.other_open_id;
                    var session_key = result.data.platform_info.session_key;
                    GameGlobal.jinke.open_id = open_id;
                    GameGlobal.jinke.access_token = access_token;
                    GameGlobal.jinke.other_open_id = other_open_id;
                    GameGlobal.jinke.platformInfo.session_key = session_key;
                    GameGlobal.jinke.loginSuccCallback();
                  },
                  fail: function fail() {
                    console.log("\u767b\u5f55\u63a5\u53e3\u8c03\u7528\u5931\u8d25");
                    GameGlobal.jinke.loginFailCallback();
                  }
                });
              }
            });
          }
        });
      };
      var submitEvent = function submitEvent(event_json_data) {
        var event_id = event_json_data["event_id"];
        var systemRes = GameGlobal.jinke.wxSystemInfo;
        event_json_data.customizeEvent.brand = systemRes.brand;
        event_json_data.customizeEvent.model = systemRes.model;
        event_json_data.customizeEvent.os_version = systemRes.system;
        event_json_data.customizeEvent.wx_software_version = systemRes.version;
        event_json_data.customizeEvent.wx_sdk_version = systemRes.SDKVersion;
        event_json_data.customizeEvent.wx_benchmark_level = systemRes.benchmarkLevel;
        wx.request({
          url: GameGlobal.jinke.apiHost + "/index/index_v3/sub_event",
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          data: changeDataType(event_json_data),
          success: function success(res) {
            0 != res.data.code && console.log("\u4e8b\u4ef6\u4e0a\u62a5\u5931\u8d25");
          },
          fail: function fail() {
            console.log("\u4e8b\u4ef6\u4e0a\u62a5\u63a5\u53e3\u8c03\u7528\u5931\u8d25");
          }
        });
      };
      var thirdplatformPay = function thirdplatformPay(pay_json_data) {
        console.log("thirdplatformPayStart");
        var request_url = GameGlobal.jinke.apiHost + "/index/index_v3/weixin_minigame_pay";
        var third_openid = GameGlobal.jinke.other_open_id;
        var zone_id = pay_json_data.roleInfo.server_id;
        var offerId = GameGlobal.jinke.platformInfo.pay_id;
        var amount = pay_json_data.orderInfo.amount * pay_json_data.orderInfo.count;
        var session_key = pay_json_data.jinke.platformInfo.session_key;
        wx.request({
          url: request_url,
          method: "POST",
          data: {
            order_id: pay_json_data.jinke_order_id,
            access_token: pay_json_data.access_token,
            os: "3",
            app_id: pay_json_data.app_id,
            distributor_id: pay_json_data.distributor_id,
            platform_id: pay_json_data.platform_id,
            channel_id: pay_json_data.channel_id,
            openid: third_openid,
            order_info: {
              openid: third_openid,
              zone_id: zone_id,
              pf: "android",
              bill_no: pay_json_data.jinke_order_id,
              amt: amount,
              session_key: session_key
            }
          },
          success: function success(result) {
            console.log("thirdplatformPayResult:", result);
            if (1130 == result["data"]["code"]) {
              console.log({
                mode: "game",
                env: 1,
                currencyType: "CNY",
                platform: "android",
                zoneId: zone_id,
                offerId: offerId,
                buyQuantity: amount
              });
              wx.requestMidasPayment({
                mode: "game",
                env: 1,
                currencyType: "CNY",
                platform: "android",
                zoneId: zone_id,
                offerId: offerId,
                buyQuantity: amount,
                success: function success() {
                  thirdplatformPay(pay_json_data);
                  return;
                },
                fail: function fail(errMsg, errCode) {
                  GameGlobal.jinke.payFailCallback();
                  return;
                }
              });
              return;
            }
            if (0 == result["data"]["code"]) {
              console.log("\u5fae\u4fe1\u8d2d\u4e70\u6210\u529f");
              GameGlobal.jinke.paySuccCallback();
              return;
            }
            GameGlobal.jinke.payFailCallback();
            return;
          },
          fail: function fail() {
            GameGlobal.jinke.payFailCallback();
            return;
          }
        });
      };
      var selectPay = function selectPay(pay_json_data) {
        console.log("selectPayStart");
        var requestData = {
          app_id: pay_json_data.app_id,
          distributor_id: pay_json_data.distributor_id,
          platform_id: pay_json_data.platform_id,
          channel_id: pay_json_data.channel_id,
          server_id: pay_json_data.roleInfo.server_id,
          role_name: pay_json_data.roleInfo.role_name,
          role_id: pay_json_data.roleInfo.role_id,
          role_level: pay_json_data.roleInfo.role_level,
          role_create_time: pay_json_data.roleInfo.role_create_time,
          real_currency_type: "CNY",
          iap_id: pay_json_data.orderInfo.iap_id + "",
          cp_order_id: pay_json_data.orderInfo.cp_order_id,
          extra_params: pay_json_data.orderInfo.extra_params,
          real_currency_amount: pay_json_data.orderInfo.amount * pay_json_data.orderInfo.count,
          goods_name: pay_json_data.orderInfo.goods_name,
          access_token: pay_json_data.access_token
        };
        wx.request({
          url: GameGlobal.jinke.apiHost + "/index/index_v3/select_pay",
          method: "POST",
          data: requestData,
          success: function success(result) {
            console.log("selectPayResult:", result);
            if (0 == result["data"]["code"]) {
              var thirdPay = result["data"]["is_switch"];
              if (!thirdPay) {
                pay_json_data.jinke_order_id = result["data"]["data"]["order_id"];
                thirdplatformPay(pay_json_data);
              }
            } else console.log("\u7533\u8bf7\u8ba2\u5355\u5931\u8d25:" + result["data"]["message"]);
          },
          fail: function fail() {
            console.log("\u7533\u8bf7\u8ba2\u5355\u5931\u8d25:" + msg);
          }
        });
      };
      var jinke = new Object();
      GameGlobal.jinke = jinke;
      GameGlobal.jinke.apiHost = "https://h5sdk.kylinmobi.com";
      GameGlobal.jinke.commonServiceHost = "https://api.kylinmobi.net";
      GameGlobal.jinke.initCallback = function() {};
      GameGlobal.jinke.loginSuccCallback = function() {};
      GameGlobal.jinke.loginFailCallback = function() {};
      GameGlobal.jinke.paySuccCallback = function() {};
      GameGlobal.jinke.payFailCallback = function() {};
      GameGlobal.jinke.shareCallback = function() {};
      GameGlobal.jinke.followCallback = function() {};
      GameGlobal.jinke.init_params = {};
      GameGlobal.jinke.init = function(init_json_data) {
        GameGlobal.jinke.init_params.app_id = init_json_data.app_id;
        GameGlobal.jinke.init_params.distributor_id = init_json_data.distributor_id;
        GameGlobal.jinke.init_params.platform_id = init_json_data.platform_id;
        GameGlobal.jinke.init_params.channel_id = init_json_data.channel_id;
        wx.getSystemInfo({
          success: function success(res) {
            "undefined" == typeof res.benchmarkLevel && (res.benchmarkLevel = -1);
            GameGlobal.jinke.wxSystemInfo = res;
            var eventData = {
              event_id: 111,
              customizeEvent: {}
            };
            eventData = JSON.stringify(eventData);
            jinke.customizeEvent(eventData);
            jinke.initCallback();
          },
          fail: function fail() {
            GameGlobal.jinke.init(init_json_data);
          }
        });
      };
      GameGlobal.jinke.login = function() {
        third_login();
      };
      GameGlobal.jinke.share = function(share_json_data) {
        share_json_data = JSON.parse(share_json_data);
        share_json_data.app_id = GameGlobal.jinke.init_params.app_id;
        share_json_data.distributor_id = GameGlobal.jinke.init_params.distributor_id;
        share_json_data.platform_id = GameGlobal.jinke.init_params.platform_id;
        share_json_data.channel_id = GameGlobal.jinke.init_params.channel_id;
        thirdplatformShare(share_json_data);
      };
      GameGlobal.jinke.follow = function(follow_json_data) {
        follow_json_data = JSON.parse(follow_json_data);
        follow_json_data.app_id = GameGlobal.jinke.init_params.app_id;
        follow_json_data.distributor_id = GameGlobal.jinke.init_params.distributor_id;
        follow_json_data.platform_id = GameGlobal.jinke.init_params.platform_id;
        follow_json_data.channel_id = GameGlobal.jinke.init_params.channel_id;
        thirdplatformFollow(follow_json_data);
      };
      GameGlobal.jinke.customizeEvent = function(event_json_data) {
        event_json_data = JSON.parse(event_json_data);
        event_json_data.app_id = GameGlobal.jinke.init_params.app_id;
        event_json_data.distributor_id = GameGlobal.jinke.init_params.distributor_id;
        event_json_data.platform_id = GameGlobal.jinke.init_params.platform_id;
        event_json_data.channel_id = GameGlobal.jinke.init_params.channel_id;
        "undefined" != typeof jinke.access_token && (event_json_data.access_token = GameGlobal.jinke.access_token);
        submitEvent(event_json_data);
      };
      GameGlobal.jinke.pay = function(pay_json_data) {
        console.log("jinkeSdkPayStart");
        pay_json_data = JSON.parse(pay_json_data);
        pay_json_data.app_id = GameGlobal.jinke.init_params.app_id;
        pay_json_data.distributor_id = GameGlobal.jinke.init_params.distributor_id;
        pay_json_data.platform_id = GameGlobal.jinke.init_params.platform_id;
        pay_json_data.channel_id = GameGlobal.jinke.init_params.channel_id;
        pay_json_data.access_token = GameGlobal.jinke.access_token;
        selectPay(pay_json_data);
      };
    }
    cc._RF.pop();
  }, {} ],
  magic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7b2e7tP2RGC534vwXSaAxI", "magic");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var magic = function(_super) {
      __extends(magic, _super);
      function magic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.zhengmian = null;
        _this.fanmian = null;
        _this.award = [];
        _this.clickIndex = 0;
        _this.new_time = -1;
        _this.jishi = 0;
        _this.surplus_time = 0;
        _this.goodsArray = [];
        _this.awardList = {
          firstGold: "",
          seconGold: "0",
          firstExp: 0,
          seconExp: 0,
          firstQuan: 0,
          seconQuan: 0,
          firstRole: 0,
          seconRole: 0
        };
        return _this;
      }
      magic.prototype.randomGoods = function() {
        var a = [ 1, 2, 3, 4 ];
        var b = [ "1", "2", "3", "4" ];
        for (var i = 0; i < 2; i++) {
          var z = Math.randomInt(0, a.length);
          var num = a[z];
          a.splice(z, 1);
          b.push(num + "-2");
        }
        this.goodsArray = mk.UtilMgr.randomArr(b);
      };
      magic.prototype.start = function() {
        this.initMigic_time();
        this.initMigic_goods();
      };
      magic.prototype.initMigic_time = function() {
        var dot = parseInt(G[Prefix_1.default.MAGIC_DOT]);
        var quitTime = mk.GameData.getItemKey("magicQuitTime");
        var magic_time = G[Prefix_1.default.SURPLUS_TIME];
        if (quitTime > 0) {
          var curret = new Date().getTime() / 1e3;
          var mm = Math.floor(curret - quitTime);
          var dot_time = Math.floor(mm / 360);
          var surplus_mm = mm % 360;
          dot += dot_time;
          if (dot >= 100) this.new_time = 360; else if (0 == magic_time) this.new_time = 360; else {
            this.new_time = magic_time - surplus_mm;
            if (this.new_time <= 0) {
              dot += 1;
              this.new_time = 360;
            }
          }
          G[Prefix_1.default.MAGIC_DOT] = dot > 100 ? 100 : dot;
        } else {
          G[Prefix_1.default.MAGIC_DOT] = 100;
          this.new_time = magic_time > 0 ? magic_time : 360;
        }
        this["_txtMagicDot"].$Label.string = G[Prefix_1.default.MAGIC_DOT];
      };
      magic.prototype.initMigic_goods = function() {
        this.awardList = {
          firstGold: "",
          seconGold: "0",
          firstExp: 0,
          seconExp: 0,
          firstQuan: 0,
          seconQuan: 0,
          firstRole: 0,
          seconRole: 0
        };
        this.randomGoods();
        this.creatMigic();
      };
      magic.prototype.onDestroy = function() {
        G[Prefix_1.default.SURPLUS_TIME] = this.new_time;
        var magicQuitTime = new Date().getTime() / 1e3;
        mk.GameData.setItemKey("magicQuitTime", magicQuitTime);
      };
      magic.prototype.update = function(dt) {
        if (-1 == this.new_time) return;
        if (G[Prefix_1.default.MAGIC_DOT] >= 100) {
          this["_txtTime"].active = false;
          return;
        }
        var resTime = mk.UtilMgr.secToTime(this.new_time, "00:00");
        this["_txtTime"].$Label.string = resTime + "\u540e\u6062\u590d1\u70b9";
        this.surplus_time += dt;
        if (this.surplus_time > 1) {
          this.new_time -= 1;
          this["_txtTime"].active = true;
          this.surplus_time = 0;
          if (0 == this.new_time) {
            G[Prefix_1.default.MAGIC_DOT] += 1;
            this["_txtMagicDot"].$Label.string = G[Prefix_1.default.MAGIC_DOT] > 100 ? 100 : G[Prefix_1.default.MAGIC_DOT];
            this.new_time = 360;
          }
        }
      };
      magic.prototype._onCardTouchEnd = function(node) {
        var _this = this;
        if (true == node["isClick"]) return;
        if (G[Prefix_1.default.MAGIC_DOT] < 20) {
          mk.UIMgr.showToast("\u9b54\u6cd5\u70b9\u4e0d\u8db3");
          return;
        }
        G[Prefix_1.default.MAGIC_DOT] -= 20;
        this["_txtMagicDot"].$Label.string = G[Prefix_1.default.MAGIC_DOT];
        mk.AudioMgr.playEffect(Prefix_1.default.linqAward);
        node["isClick"] = true;
        this.clickIndex = parseInt(node["$"]);
        this.disableClick();
        this.reverSalAction(node, this.zhengmian);
        this.getCardAward();
        this.scheduleOnce(function() {
          _this.otherRever();
          _this["_btnShuffle"].$Button.interactable = true;
        }, 1);
      };
      magic.prototype._onBtnDuoLinTouchEnd = function() {
        var _this = this;
        var mm;
        false;
        this.getCardAward();
        this["_btnDuoLin" + this.clickIndex].active = false;
      };
      magic.prototype.getCardAward = function() {
        var index = this.goodsArray[this.clickIndex - 1];
        var second = 0;
        if (index.split("-").length > 1) {
          index = index.split("-")[0];
          second = 1;
        }
        if ("1" == index) {
          G[Prefix_1.default.CITY_GOLD] = 0 == second ? mk.Calculator.plus(G[Prefix_1.default.CITY_GOLD], this.awardList.firstGold) : mk.Calculator.plus(G[Prefix_1.default.CITY_GOLD], this.awardList.seconGold);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
        } else if ("2" == index) {
          G[Prefix_1.default.CITY_EXP] = 0 == second ? mk.Calculator.plus(G[Prefix_1.default.CITY_EXP], this.awardList.firstExp) : mk.Calculator.plus(G[Prefix_1.default.CITY_EXP], this.awardList.seconExp);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_CITYSHOW_EVENT);
        } else if ("3" == index) {
          G[Prefix_1.default.CITY_QUAN] = 0 == second ? mk.Calculator.plus(G[Prefix_1.default.CITY_QUAN], this.awardList.firstQuan) : mk.Calculator.plus(G[Prefix_1.default.CITY_QUAN], this.awardList.seconQuan);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
        } else if ("4" == index) {
          var cashObj = G[Prefix_1.default.CASH_TYPENUM];
          if (0 == second) {
            var type = this.awardList.firstRole;
            cashObj.hasOwnProperty(type) ? cashObj[type] += 1 : cashObj[type] = 1;
          } else {
            var type = this.awardList.seconRole;
            cashObj.hasOwnProperty(type) ? cashObj[type] += 1 : cashObj[type] = 1;
          }
        }
      };
      magic.prototype.creatMigic = function() {
        var b = this.goodsArray;
        for (var i = 1; i <= 6; i++) {
          this["_wupin" + i].removeComponent(cc.Animation);
          var indx = b[i - 1];
          var splitIndex = indx.split("-");
          var scond = 0;
          if (splitIndex.length > 1) {
            indx = splitIndex[0];
            scond = 2;
          }
          if ("4" == indx) {
            var storeRole = this.mainGame.getMaxRoleAndGold();
            var type = storeRole[0];
            this.awardList.firstRole = type;
            if (2 == scond) {
              type = Math.ceil(type / 2);
              this.awardList.seconRole = type;
            }
            var roleJson = this.mainGame.roleCfg.json;
            var name = roleJson[type].role_name;
            var index = roleJson[type].role_shape;
            this["_miaosu" + i].$Label.string = name;
            this.addAnimation(this["_wupin" + i], index);
          } else if ("1" == indx) {
            this["_wupin" + i].$Sprite.spriteFrame = this.award[indx - 1];
            var storeRole = this.mainGame.getMaxRoleAndGold();
            var gold = storeRole[1];
            this.awardList.firstGold = gold;
            if (2 == scond) {
              gold = mk.Calculator.divide(gold, 2, 1);
              this.awardList.seconGold = gold;
            }
            var unGold = mk.UtilMgr.unitConversion(gold);
            this["_miaosu" + i].$Label.string = unGold;
          } else if ("2" == indx) {
            this["_wupin" + i].$Sprite.spriteFrame = this.award[indx - 1];
            var cityJson = this.mainGame.cityCfg.json;
            var city = G[Prefix_1.default.CITY_GARDE];
            var exp = cityJson["city" + city].city_exp;
            var ceilExp = Math.ceil(.01 * exp);
            this.awardList.firstExp = ceilExp;
            if (2 == scond) {
              ceilExp = Math.ceil(ceilExp / 2);
              this.awardList.seconExp = ceilExp;
            }
            this["_miaosu" + i].$Label.string = ceilExp;
          } else if (3 == indx) {
            this["_wupin" + i].$Sprite.spriteFrame = this.award[indx - 1];
            var g = G[Prefix_1.default.CITY_GARDE];
            var quan = Math.ceil(.2 * (g - 8));
            this.awardList.firstQuan = Math.ceil(quan);
            if (2 == scond) {
              quan = Math.ceil(quan / 2);
              this.awardList.seconQuan = quan;
            }
            this["_miaosu" + i].$Label.string = quan;
          }
        }
      };
      magic.prototype.addAnimation = function(nodeSpr, index) {
        var self = this;
        var anima = nodeSpr.addComponent(cc.Animation);
        cc.loader.loadRes("shape/" + index + "_pf_dj", cc.SpriteAtlas, function(err, atlas) {
          var frame = atlas.getSpriteFrames()[0];
          nodeSpr.$Sprite.spriteFrame = frame;
          var arr = atlas.getSpriteFrames();
          self.addAnima(anima, arr, "daiji");
        });
      };
      magic.prototype.addAnima = function(anima, arrFrame, str) {
        var clip = cc.AnimationClip.createWithSpriteFrames(arrFrame, 60);
        clip.wrapMode = cc.WrapMode.Loop;
        clip.name = str;
        anima.addClip(clip);
        clip.wrapMode = cc.WrapMode.Loop;
        var animStateRun = anima.play(str);
        animStateRun.duration = 4;
      };
      magic.prototype.disableClick = function() {
        for (var i = 1; i <= 6; i++) this["_card" + i].isClick = true;
      };
      magic.prototype.otherRever = function() {
        for (var i = 1; i <= 6; i++) {
          if (i == this.clickIndex) continue;
          this.reverSalAction(this["_card" + i], this.zhengmian);
        }
      };
      magic.prototype._onBtnShuffleTouchEnd = function() {
        for (var i = 1; i <= 6; i++) {
          this["_card" + i].isClick = false;
          this.reverSalAction(this["_card" + i], this.fanmian, true);
          this["_wupin" + i].active = false;
          this["_miaosu" + i].active = false;
        }
        this["_btnShuffle"].$Button.interactable = false;
        this.initMigic_goods();
      };
      magic.prototype.reverSalAction = function(node, frame, xipai) {
        var _this = this;
        if (true == xipai) {
          this["_txtShuom"].active = true;
          this["_btnShuffle"].active = false;
          this["_btnDuoLin" + this.clickIndex].active = false;
        } else {
          this["_txtShuom"].active = false;
          this["_btnShuffle"].active = true;
        }
        var callBack1 = cc.callFunc(function() {
          var idex = node["$"];
          if (true == xipai) {
            _this["_huode" + idex].active = false;
            _this["_btnDuoLin" + idex].active = false;
            _this["_wupin" + idex].active = false;
            _this["_miaosu" + idex].active = false;
          } else {
            _this["_huode" + _this.clickIndex].active = true;
            _this["_btnDuoLin" + _this.clickIndex].active = true;
            _this["_wupin" + idex].active = true;
            _this["_miaosu" + idex].active = true;
          }
          node.getComponent(cc.Sprite).spriteFrame = frame;
        });
        var seq = cc.sequence(cc.scaleTo(.15, 0, 1), callBack1, cc.scaleTo(.15, 1, 1));
        node.runAction(seq);
      };
      __decorate([ property(cc.SpriteFrame) ], magic.prototype, "zhengmian", void 0);
      __decorate([ property(cc.SpriteFrame) ], magic.prototype, "fanmian", void 0);
      __decorate([ property(cc.SpriteFrame) ], magic.prototype, "award", void 0);
      magic = __decorate([ ccclass ], magic);
      return magic;
    }(FrameBase_1.default);
    exports.default = magic;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  onLoadMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "700b5JTv0dGjaEqo5gTTY4Z", "onLoadMgr");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    window["mk"] = {};
    window["G"] = {};
    var HttpMgr_1 = require("./HttpMgr");
    var WXMgr_1 = require("./WXMgr");
    var GameData_1 = require("./GameData");
    var LsnMgr_1 = require("./LsnMgr");
    var UtilMgr_1 = require("./UtilMgr");
    var AudioMgr_1 = require("./AudioMgr");
    var UIkill_1 = require("./UIkill");
    var UIMgr_1 = require("./UIMgr");
    var Calcu = require("./Calcu");
    mk.UIkill = UIkill_1.default.getInstance();
    mk.HttpMgr = HttpMgr_1.default.getInstance();
    mk.UtilMgr = UtilMgr_1.default.getInstance();
    mk.WXMgr = WXMgr_1.default.getInstance();
    mk.AudioMgr = AudioMgr_1.default.getInstance();
    mk.LsnMgr = LsnMgr_1.default.getInstance();
    G = mk.GameData = GameData_1.default.getInstance();
    mk.UIMgr = UIMgr_1.default.getInstance();
    mk.Calculator = new Calcu();
    cc._RF.pop();
  }, {
    "./AudioMgr": "AudioMgr",
    "./Calcu": "Calcu",
    "./GameData": "GameData",
    "./HttpMgr": "HttpMgr",
    "./LsnMgr": "LsnMgr",
    "./UIMgr": "UIMgr",
    "./UIkill": "UIkill",
    "./UtilMgr": "UtilMgr",
    "./WXMgr": "WXMgr"
  } ],
  rankItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8685cSKgWlLT7TbuCnt9w/A", "rankItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var listItem = function(_super) {
      __extends(listItem, _super);
      function listItem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      listItem.prototype.init = function(data, rank) {
        var _this = this;
        mk.UIkill.bindComponent(this);
        if (data) {
          this["_rankId"].$Label.string = rank + 1;
          this["_txtName"].$Label.string = data.nickname;
          this["_txtGrade"].$Label.string = data.city_garde;
          data.avatar && cc.loader.load({
            url: data.avatar,
            type: "jpg"
          }, function(err, texture) {
            _this["_head"].$Sprite.spriteFrame = new cc.SpriteFrame(texture);
          });
        }
      };
      listItem = __decorate([ ccclass ], listItem);
      return listItem;
    }(cc.Component);
    exports.default = listItem;
    cc._RF.pop();
  }, {} ],
  rank: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfc51K+SmNFdKnkPyBG8eVy", "rank");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var ListView_1 = require("../../ListView/ListView");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var rank = function(_super) {
      __extends(rank, _super);
      function rank() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.listView = null;
        return _this;
      }
      rank.prototype.start = function() {
        var _this = this;
        this["_wordRank"].active = true;
        this["_friendRank"].active = false;
        mk.HttpMgr.req({}, "tom/toplist", function(res) {
          var data = res.data.user_list;
          _this.listView.init(data);
          mk.WXMgr.openDataContext();
        });
      };
      rank.prototype.wordRank_event = function() {
        this["_wordRank"].active = true;
        this["_friendRank"].active = false;
      };
      rank.prototype.firendRank_event = function() {
        this["_wordRank"].active = false;
        this["_friendRank"].active = true;
      };
      __decorate([ property(ListView_1.default) ], rank.prototype, "listView", void 0);
      rank = __decorate([ ccclass ], rank);
      return rank;
    }(FrameBase_1.default);
    exports.default = rank;
    cc._RF.pop();
  }, {
    "../../ListView/ListView": "ListView",
    "../FrameBase": "FrameBase"
  } ],
  setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af21al30gZAGJMXEzsEFt7P", "setting");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var setting = function(_super) {
      __extends(setting, _super);
      function setting() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.musicToggle = null;
        _this.effectToggle = null;
        _this.click_num = 0;
        return _this;
      }
      setting.prototype.start = function() {
        var _this = this;
        this["_txtGarde"].$Label.string = G[Prefix_1.default.CITY_GARDE] + "\u7ea7";
        this["_txtName"].$Label.string = G[Prefix_1.default.NICKNAME];
        this["_txtId"].$Label.string = G[Prefix_1.default.USER_NO];
        var avatar = G[Prefix_1.default.AVATAR];
        avatar && cc.loader.load({
          url: avatar,
          type: "jpg"
        }, function(err, texture) {
          _this["_head"].$Sprite.spriteFrame = new cc.SpriteFrame(texture);
        });
        this.init();
      };
      setting.prototype._onSprHeadTouchEnd = function() {
        this.click_num++;
        7 == this.click_num && mk.HttpMgr.req({}, "public/clear", function() {
          false;
          cc.game.off(cc.game.EVENT_HIDE);
          cc.game.end();
        });
      };
      setting.prototype.init = function() {
        var music = mk.GameData.getItemKey(Prefix_1.default.MUSIC);
        this.musicToggle.isChecked = 1 == music;
        var effect = mk.GameData.getItemKey(Prefix_1.default.EFFECT);
        this.effectToggle.isChecked = 1 == effect;
        var cityCfgJson = this.mainGame.cityCfg.json;
        var cityData = cityCfgJson["city" + G[Prefix_1.default.CITY_GARDE]];
        var lv = cityData.role_lv_limit;
        this["_txtTomNum"].$Label.string = lv + "\u79cd\u6c64\u59c6\u732b";
      };
      setting.prototype._onMusicToggleTouchEnd = function() {
        this.musicToggle.isChecked ? mk.AudioMgr.closeAllMusics() : mk.AudioMgr.openAllMusics();
      };
      setting.prototype._onEffctToggleTouchEnd = function() {
        this.effectToggle.isChecked ? mk.AudioMgr.closeAllEffects() : mk.AudioMgr.openAllEffects();
      };
      setting.prototype._onBtnRankTouchEnd = function() {
        mk.UIMgr.showPrefab("prefab/UIForm/rank");
        this.node.destroy();
      };
      __decorate([ property(cc.Toggle) ], setting.prototype, "musicToggle", void 0);
      __decorate([ property(cc.Toggle) ], setting.prototype, "effectToggle", void 0);
      setting = __decorate([ ccclass ], setting);
      return setting;
    }(FrameBase_1.default);
    exports.default = setting;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  splash: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe48bpNIZBFCKyh/y4FQFjL", "splash");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var splash = function(_super) {
      __extends(splash, _super);
      function splash() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lodinPro = null;
        return _this;
      }
      splash.prototype.onLoad = function() {
        cc.director.preloadScene("main", this.onProgress.bind(this), this.onLoaded.bind(this));
      };
      splash.prototype.onProgress = function(completedCount, totalCount, item) {
        var completedRate = completedCount / totalCount;
        this.lodinPro.progress = completedRate;
      };
      splash.prototype.onLoaded = function(err) {
        var _this = this;
        var cbcall = function() {
          _this.loadScene();
        };
        mk.AudioMgr.loadAllAudio(cbcall);
        var data;
        false;
      };
      splash.prototype.loadScene = function() {
        false;
        mk.GameData.getNetworkData(function() {
          cc.director.loadScene("main");
        });
      };
      __decorate([ property(cc.ProgressBar) ], splash.prototype, "lodinPro", void 0);
      splash = __decorate([ ccclass ], splash);
      return splash;
    }(cc.Component);
    exports.default = splash;
    cc._RF.pop();
  }, {} ],
  storeItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cee84AU+RhJPJmywOH3WXR/", "storeItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("../../framework/Prefix");
    var FrameBase_1 = require("../FrameBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var listItem = function(_super) {
      __extends(listItem, _super);
      function listItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.store_atlas = null;
        _this.btnStateFrame = [];
        _this.type = null;
        _this.basePrice = "0";
        _this.shape = 0;
        _this.bntState = 0;
        return _this;
      }
      listItem.prototype.init = function(data, rank) {
        mk.UIkill.bindComponent(this);
        if (data) {
          this.type = data.type;
          this["_type"].$Label.string = this.type;
          this.shape = data.shape;
          this["_srpRole"].$Sprite.spriteFrame = this.store_atlas.getSpriteFrame("role" + this.type);
          this["_info"].active = true;
          this["_txtName"].$Label.string = data.name;
          var txtGold = mk.UtilMgr.unitConversion(data.gongji);
          this["_txtAtk"].$Label.string = mk.UtilMgr.disSpaceStr(txtGold);
          this["_txtSpeed"].$Label.string = mk.UtilMgr.disSpaceStr(data.gongsu);
          this["_txtSkill"].$Label.string = mk.UtilMgr.disSpaceStr(data.jineng);
          this.basePrice = data.price;
          this.bntState = data.state;
          if (0 == data.state) this["_txtSprice"].active = false; else if (1 == data.state) {
            this["_txtSprice"].active = true;
            this.freshPrice();
          } else 2 == data.state && (this["_txtSprice"].active = false);
          this["_btnBuy"].$Sprite.spriteFrame = this.btnStateFrame[this.bntState];
        } else {
          this["_info"].active = false;
          this["_btnBuy"].$Sprite.spriteFrame = this.btnStateFrame[2];
          this["_txtSprice"].active = false;
          this["_srpRole"].$Sprite.spriteFrame = null;
        }
      };
      listItem.prototype.addAnimation = function() {
        var self = this;
        cc.loader.loadRes("shape/" + this.shape + "_pf_dj", cc.SpriteAtlas, function(err, atlas) {
          var frame = atlas.getSpriteFrames()[0];
          self["_srpRole"].$Sprite.spriteFrame = frame;
        });
      };
      listItem.prototype.addAnima = function(anima, arrFrame, str) {
        var clip = cc.AnimationClip.createWithSpriteFrames(arrFrame, 60);
        clip.wrapMode = cc.WrapMode.Loop;
        clip.name = str;
        anima.addClip(clip);
        clip.wrapMode = cc.WrapMode.Loop;
        var animStateRun = anima.play(str);
        animStateRun.duration = 4;
      };
      listItem.prototype.freshPrice = function() {
        var buyTypeNum = G[Prefix_1.default.BUY_TYPENUM];
        var money = "0";
        if (buyTypeNum.hasOwnProperty(this.type)) {
          var num = buyTypeNum[this.type];
          money = mk.Calculator.powe(this.basePrice, 1.25, num);
        } else money = this.basePrice;
        var price = mk.UtilMgr.unitConversion(money);
        this["_txtSprice"].$Label.string = price;
        return money;
      };
      listItem.prototype._onBtnBuyTouchEnd = function() {
        if (null == this.type) return;
        if (0 == this.bntState) {
          var falg = this.mainGame.linQuCreateRole(this.type);
          if (falg) {
            var cash = G[Prefix_1.default.CASH_TYPENUM];
            cash[this.type]--;
            if (cash[this.type] > 0) this.bntState = 0; else {
              this.bntState = 1;
              this["_txtSprice"].active = true;
              this.freshPrice();
            }
            this["_btnBuy"].$Sprite.spriteFrame = this.btnStateFrame[this.bntState];
          }
        } else if (1 == this.bntState) {
          var money = this.freshPrice();
          var falg = mk.UtilMgr.compare(G[Prefix_1.default.CITY_GOLD], money);
          if (falg) mk.UIMgr.showToast("\u91d1\u5e01\u4e0d\u8db3"); else {
            this.mainGame.quickCreatRole(this.type, money);
            cc.systemEvent.emit(Prefix_1.default.STOREGLODSHOW_EVENT);
            this.freshPrice();
          }
        } else 2 == this.bntState && console.log("\u7981\u7528");
      };
      __decorate([ property(cc.SpriteAtlas) ], listItem.prototype, "store_atlas", void 0);
      __decorate([ property(cc.SpriteFrame) ], listItem.prototype, "btnStateFrame", void 0);
      listItem = __decorate([ ccclass ], listItem);
      return listItem;
    }(FrameBase_1.default);
    exports.default = listItem;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  store: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7f24EFLBZIe7IktXc5zmjv", "store");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var store = function(_super) {
      __extends(store, _super);
      function store() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      store.prototype.start = function() {
        var gold = mk.UtilMgr.unitConversion(G[Prefix_1.default.CITY_GOLD]);
        this["_txtCountGold"].$Label.string = gold;
        cc.systemEvent.on(Prefix_1.default.STOREGLODSHOW_EVENT, function(data) {
          var gold = mk.UtilMgr.unitConversion(G[Prefix_1.default.CITY_GOLD]);
          this["_txtCountGold"].$Label.string = gold;
        }, this);
        var cityCfgJson = this.mainGame.cityCfg.json;
        var cityData = cityCfgJson["city" + G[Prefix_1.default.CITY_GARDE]];
        var lv = cityData.role_lv_limit;
        var roleCfgJosn = this.mainGame.roleCfg.json;
        var towerCfgJson = this.mainGame.towerCfg.json;
        var towerData = towerCfgJson["city" + G[Prefix_1.default.CITY_GARDE]];
        var dataList = [];
        for (var i = 1; i <= 50; i++) {
          var data = {
            type: 0,
            name: "",
            gongji: "",
            price: "",
            gongsu: "",
            jineng: "",
            state: "-1",
            shape: 0
          };
          if (i <= lv) {
            data.type = i;
            data.name = roleCfgJosn[i].role_name;
            data.price = roleCfgJosn[i].role_money;
            data.gongsu = roleCfgJosn[i].ATK_SPD + "s";
            data.jineng = roleCfgJosn[i].skill_describe;
            data.shape = roleCfgJosn[i].role_shape;
            data.gongji = towerData["role" + i];
            var max = G[Prefix_1.default.MAXROLE_GRADE];
            var mostMax = roleCfgJosn[max].buy_monster_most;
            data.state = i <= mostMax ? "1" : "2";
            var cash = G[Prefix_1.default.CASH_TYPENUM];
            cash.hasOwnProperty(i) && cash[i] > 0 && (data.state = "0");
          } else data = null;
          dataList.push(data);
        }
        this.node.getComponent("ListView").init(dataList);
      };
      store.prototype.onDestroy = function() {
        cc.systemEvent.off(Prefix_1.default.STOREGLODSHOW_EVENT);
      };
      store = __decorate([ ccclass ], store);
      return store;
    }(FrameBase_1.default);
    exports.default = store;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  taskItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "84704Xxo/ZNn4TmkrzHNouz", "taskItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var taskItem = function(_super) {
      __extends(taskItem, _super);
      function taskItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.icon = [];
        _this.btnStateSpr = [];
        _this.icon1_null = true;
        _this.icon2_null = true;
        _this.quan = 0;
        _this.exp = 0;
        _this.gold = "0";
        _this.fennu = 0;
        _this.btn_state = 0;
        _this.task = null;
        _this.taskId = "";
        return _this;
      }
      taskItem.prototype.start = function() {};
      taskItem.prototype.init = function(data, key, task) {
        mk.UIkill.bindComponent(this);
        this.task = task;
        this.taskId = key;
        var task_num = G[Prefix_1.default.TASK_NUM];
        var zongc = task_num[key].zongc;
        var wangc = task_num[key].wangc;
        task_num[key].order = this.node["order"];
        var qian = "";
        this.btn_state = task_num[key].state;
        if (wangc >= zongc) {
          qian = mk.UtilMgr.subFont("gree", "" + wangc);
          this.btn_state < 2 && (this.btn_state = 1);
        } else qian = mk.UtilMgr.subFont("red", "" + wangc);
        this["_title"].$Label.string = mk.UtilMgr.disSpaceStr(data.describe);
        var hou = mk.UtilMgr.subFont("gree", "/" + zongc);
        this["_num"].$Label.string = qian + hou;
        if (data.reward_diamond) {
          this.showIcon(data.reward_diamond, 0);
          this.quan = parseInt(data.reward_diamond);
        }
        if (data.reward_exp) {
          this.showIcon(data.reward_exp, 1);
          this.exp = parseInt(data.reward_exp);
        }
        if (data.reward_money) {
          var json = task.mainGame.monsterCfg.json;
          var mani = json[G[Prefix_1.default.CITY_GARDE]].monster_money;
          var gold = mk.Calculator.multiply(mani, 11);
          var goldText = mk.UtilMgr.unitConversion(gold);
          this.showIcon(goldText, 2);
          this.gold = gold;
        }
        if (data.reward_item) {
          this.showIcon(data.reward_item, 3);
          this.fennu = parseInt(data.reward_item);
        }
        this.reshBtnState();
      };
      taskItem.prototype.reshBtnState = function() {
        this.task.resetSort();
        if (0 == this.btn_state) this["_btnLinq"].active = false; else if (1 == this.btn_state) {
          this["_btnLinq"].active = true;
          this["_btnLinq"].$Sprite.spriteFrame = this.btnStateSpr[0];
        } else if (2 == this.btn_state) this["_btnLinq"].$Sprite.spriteFrame = this.btnStateSpr[1]; else {
          this["_lingquwan"].active = true;
          this["_weilinqu"].active = false;
        }
      };
      taskItem.prototype.showIcon = function(data, d) {
        if (this.icon1_null) {
          this["_sprq"].$Sprite.spriteFrame = this.icon[d];
          this["_qunav"].$Label.string = data;
          this.icon1_null = false;
        } else {
          this["_sexp"].$Sprite.spriteFrame = this.icon[d];
          this["_expv"].$Label.string = data;
          this.icon2_null = false;
        }
      };
      taskItem.prototype._onBtnLinqTouchEnd = function() {
        var data = G[Prefix_1.default.TASK_NUM];
        if (1 == this.btn_state || 2 == this.btn_state) {
          G[Prefix_1.default.CITY_QUAN] = mk.Calculator.plus(G[Prefix_1.default.CITY_QUAN], this.quan);
          G[Prefix_1.default.CITY_EXP] = mk.Calculator.plus(G[Prefix_1.default.CITY_EXP], this.exp);
          G[Prefix_1.default.FENNU] += this.fennu;
          G[Prefix_1.default.CITY_GOLD] = mk.Calculator.plus(G[Prefix_1.default.CITY_GOLD], this.gold);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_GOLDSHOW_EVENT);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_QUANSHOW_EVENT);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_FENNUSHOW_ENVET);
          cc.systemEvent.emit(Prefix_1.default.REFRESH_CITYSHOW_EVENT, false);
          if (2 == this.btn_state) {
            this.node["order"] += 7;
            data[this.taskId].order = this.node["order"];
          }
          this.btn_state += 1;
          data[this.taskId].state = this.btn_state;
          this.reshBtnState();
        }
      };
      __decorate([ property(cc.SpriteFrame) ], taskItem.prototype, "icon", void 0);
      __decorate([ property(cc.SpriteFrame) ], taskItem.prototype, "btnStateSpr", void 0);
      taskItem = __decorate([ ccclass ], taskItem);
      return taskItem;
    }(cc.Component);
    exports.default = taskItem;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix"
  } ],
  task: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "882deOyI05LyIRgUjfqkUIT", "task");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FrameBase_1 = require("../FrameBase");
    var Prefix_1 = require("../../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var task = function(_super) {
      __extends(task, _super);
      function task() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.taskItem = null;
        _this.itemContent = [];
        return _this;
      }
      task.prototype.start = function() {
        var taskCfgJson = this.mainGame.taskCfg.json;
        var data_obj = taskCfgJson["grade" + G[Prefix_1.default.CITY_GARDE]];
        var k = 1;
        var task_num = G[Prefix_1.default.TASK_NUM];
        for (var key in data_obj) if (data_obj.hasOwnProperty(key)) {
          var element = data_obj[key];
          var itemNode = cc.instantiate(this.taskItem);
          itemNode.parent = this["_content"];
          task_num["taskId" + k].order > 0 ? itemNode["order"] = task_num["taskId" + k].order : itemNode["order"] = k;
          itemNode.getComponent("taskItem").init(element, key, this);
          this.itemContent.push(itemNode);
          k++;
        }
        this.resetSort();
      };
      task.prototype.resetSort = function() {
        var pt = [ -67, -211, -355, -499, -643, -787, -931 ];
        this.itemContent.sort(mk.UtilMgr.sortBy("order"));
        for (var i = 0; i < this.itemContent.length; i++) this.itemContent[i].position = cc.v2(0, pt[i]);
      };
      task.prototype.update = function(dt) {};
      __decorate([ property(cc.Prefab) ], task.prototype, "taskItem", void 0);
      task = __decorate([ ccclass ], task);
      return task;
    }(FrameBase_1.default);
    exports.default = task;
    cc._RF.pop();
  }, {
    "../../framework/Prefix": "Prefix",
    "../FrameBase": "FrameBase"
  } ],
  test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4a105xQDCtEjLEVKookIAq8", "test");
    cc._RF.pop();
  }, {} ],
  tips: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa7779zUHNOQ5ncayNuKI27", "tips");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ziti1 = null;
        _this.ziti2 = null;
        _this.ziti3 = null;
        _this.ziti4 = null;
        _this.icon = [];
        return _this;
      }
      NewClass.prototype.init = function(index, text) {
        mk.UIkill.bindComponent(this);
        this["_sprIcon"].$Sprite.spriteFrame = this.icon[index];
        this["_txtIcon"].active = false;
        if (text) {
          this["_txtIcon"].$Label.string = text;
          0 == index ? this["_txtIcon"].$Label.font = this.ziti1 : 1 == index ? this["_txtIcon"].$Label.font = this.ziti2 : 2 == index ? this["_txtIcon"].$Label.font = this.ziti3 : 3 == index && (this["_txtIcon"].$Label.font = this.ziti4);
          this["_txtIcon"].active = true;
        }
      };
      __decorate([ property({
        displayName: "\u7ecf\u9a8c\u52a0\u5b57\u4f53",
        type: cc.Font
      }) ], NewClass.prototype, "ziti1", void 0);
      __decorate([ property({
        displayName: "\u7ecf\u9a8c\u51cf\u5b57\u4f53",
        type: cc.Font
      }) ], NewClass.prototype, "ziti2", void 0);
      __decorate([ property({
        displayName: "\u91d1\u5e01\u52a0\u5b57\u4f53",
        type: cc.Font
      }) ], NewClass.prototype, "ziti3", void 0);
      __decorate([ property({
        displayName: "\u751c\u751c\u5708\u5b57\u4f53",
        type: cc.Font
      }) ], NewClass.prototype, "ziti4", void 0);
      __decorate([ property(cc.SpriteFrame) ], NewClass.prototype, "icon", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  towerBoss: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e06dc4rBXdPkIdrcOP5htMB", "towerBoss");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tower = function(_super) {
      __extends(tower, _super);
      function tower() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bullet = null;
        _this.targetEnemy = void 0;
        _this.nowTime = 0;
        _this.pos = cc.v2(158, 347);
        _this.towerType = 0;
        _this.range = 805;
        _this.attackSpeed = 0;
        _this.attackHarm = "";
        _this.shape = 0;
        _this.skill = 0;
        _this.wuqi = "";
        _this.animation = null;
        _this.isDaijiAnima = false;
        _this.mainGame = null;
        return _this;
      }
      tower.prototype.init = function(game) {
        mk.UIkill.bindComponent(this);
        var self = this;
        this.mainGame = game;
        var towerCfgJson = this.mainGame.towerCfg.json;
        var cityAbbtri = towerCfgJson["city" + G[Prefix_1.default.CITY_GARDE]];
        var atk = cityAbbtri["role" + G[Prefix_1.default.MAXROLE_GRADE]];
        var roleCfgJson = this.mainGame.roleCfg.json;
        var data = roleCfgJson[G[Prefix_1.default.MAXROLE_GRADE]];
        this.towerType = G[Prefix_1.default.MAXROLE_GRADE];
        this.attackSpeed = data.ATK_SPD;
        this.shape = data.role_shape;
        this.attackHarm = atk;
        this.skill = data.role_skill_id;
        this.wuqi = data.role_bullet;
        var comp = this.node.getComponent(cc.Animation);
        comp && this.node.removeComponent(comp);
        this.animation = this.node.addComponent(cc.Animation);
        cc.loader.loadRes("shape/" + this.shape + "_pf_dj", cc.SpriteAtlas, function(err, atlas) {
          var frame = atlas.getSpriteFrames()[0];
          self["$Sprite"].spriteFrame = frame;
          var arr = atlas.getSpriteFrames();
          self.addAnima(arr, "daiji");
        });
        cc.loader.loadRes("shape/" + this.shape + "_pf_gj", cc.SpriteAtlas, function(err, atlas) {
          var arr = atlas.getSpriteFrames();
          self.addAnima(arr, "atk");
        });
        var _lvstr = this.mainGame["_lv0"];
        _lvstr.getComponent(cc.Label).string = this.towerType.toString();
      };
      tower.prototype.addAnima = function(arrFrame, str) {
        var clip = cc.AnimationClip.createWithSpriteFrames(arrFrame, 60);
        clip.wrapMode = cc.WrapMode.Loop;
        clip.name = str;
        this.animation.addClip(clip);
        if ("atk" == str) clip.wrapMode = cc.WrapMode.Normal; else {
          clip.wrapMode = cc.WrapMode.Loop;
          var animStateRun = this.animation.play(str);
          animStateRun.duration = 3;
        }
      };
      tower.prototype.attackEnemy = function(dt) {
        if (null == this.animation) return;
        if (void 0 === this.targetEnemy) {
          if (this.isDaijiAnima) return;
          var animStateRun = this.animation.play("daiji");
          if (animStateRun) {
            animStateRun.duration = 3;
            this.isDaijiAnima = true;
          }
        }
        var falg = cc.isValid(this.targetEnemy, true);
        if (!falg) {
          this.targetEnemy = void 0;
          return;
        }
        this.nowTime += dt;
        var distance = this.targetEnemy.position.sub(this.pos).mag();
        if (distance < this.range) {
          var plusSpe = this.attackSpeed * G[Prefix_1.default.PLUS].Splus;
          if (this.nowTime > plusSpe) {
            this.isDaijiAnima = false;
            var animStateRun = this.animation.play("atk");
            animStateRun.duration = plusSpe - .1;
            var bt = this.mainGame.creatBullet();
            bt.parent = this.node;
            var plusAtk = mk.Calculator.multiply(this.attackHarm, G[Prefix_1.default.PLUS].Aplus);
            var btjs = bt.getComponent("bullet");
            btjs.init(this.mainGame, plusAtk, this.skill, this.wuqi);
            btjs.shoot(this.targetEnemy);
            this.targetEnemy.getComponent("enemy").dropBlood(btjs);
            this.nowTime = 0;
          }
        } else this.targetEnemy = void 0;
      };
      tower.prototype.update = function(dt) {
        if ("" == this.attackHarm) {
          console.log("boos\u4f24\u5bb3\u65e0\u6548");
          this.enabled = false;
          return;
        }
        if (0 == this.mainGame.enemyArr.length) return;
        if (void 0 === this.targetEnemy) for (var i = 0; i < this.mainGame.enemyArr.length; i++) {
          var distance = this.mainGame.enemyArr[i].position.sub(this.pos).mag();
          distance < this.range && (this.targetEnemy = this.mainGame.enemyArr[i]);
        }
        this.attackEnemy(dt);
      };
      __decorate([ property(cc.Prefab) ], tower.prototype, "bullet", void 0);
      tower = __decorate([ ccclass ], tower);
      return tower;
    }(cc.Component);
    exports.default = tower;
    cc._RF.pop();
  }, {
    "../framework/Prefix": "Prefix"
  } ],
  tower: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d77ddMquYpJlpRY11vGm/yF", "tower");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Prefix_1 = require("../framework/Prefix");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var tower = function(_super) {
      __extends(tower, _super);
      function tower() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bullet = null;
        _this.game = null;
        _this.targetEnemy = void 0;
        _this.enemyArr = null;
        _this.nowTime = 0;
        _this.pos = cc.v2(0, 0);
        _this.effectFinish = false;
        _this.isDaijiAnima = false;
        _this.towerType = 0;
        _this.range = 343;
        _this.oldClickTime = 0;
        _this.attackSpeed = 0;
        _this.attackHarm = "";
        _this.skill = 0;
        _this.shape = 0;
        _this.wuqi = "";
        _this.animation = null;
        return _this;
      }
      tower.prototype.onLoad = function() {
        this.node.on("touchstart", this._onTowerTouchStart, this);
        this.node.on("touchend", this._onTowerTouchEnd, this);
        this.node.on("touchcancel", this._onTowerTouchCancel, this);
      };
      tower.prototype.init = function(game, data, effectType) {
        var self = this;
        mk.UIkill.bindComponent(this);
        this.game = game;
        this.towerType = parseInt(data.type);
        this.attackHarm = data.atk;
        this.attackSpeed = data.spd;
        this.shape = data.shape;
        this.skill = data.skill;
        this.wuqi = data.wuqi;
        this.animation = this.node.addComponent(cc.Animation);
        cc.loader.loadRes("shape/" + this.shape + "_pf_dj", cc.SpriteAtlas, function(err, atlas) {
          var frame = atlas.getSpriteFrames()[0];
          self["$Sprite"].spriteFrame = frame;
          var arr = atlas.getSpriteFrames();
          self.addAnima(arr, "daiji");
        });
        cc.loader.loadRes("shape/" + this.shape + "_pf_gj", cc.SpriteAtlas, function(err, atlas) {
          var arr = atlas.getSpriteFrames();
          self.addAnima(arr, "atk");
        });
        this.node.active = false;
        this.chusheng_effect(effectType);
        var index_lv = this.node.parent["$"];
        var _lvChild = this.game["_lv" + index_lv];
        _lvChild.active = true;
        _lvChild.getComponent(cc.Label).string = this.towerType.toString();
      };
      tower.prototype.chusheng_effect = function(effectType) {
        var _this = this;
        var objParent = this.node.parent;
        var animaNode = objParent.getChildByName("anima");
        var animation = animaNode.getComponent(cc.Animation);
        if ("yanwu_chusheng" == effectType) cc.loader.loadRes("anima/yanwu_chusheng", function(err, prefab) {
          animation.addClip(prefab, "yanwu_chusheng");
          animaNode.y -= 30;
          animation.node.active = true;
          animation.play("yanwu_chusheng");
        }); else if ("shangdian_chushen" == effectType) cc.loader.loadRes("anima/shangdian_chushen", function(err, prefab) {
          animation.addClip(prefab, "shangdian_chushen");
          animaNode.y -= 0;
          animation.node.active = true;
          animation.play("shangdian_chushen");
        }); else if ("heBing_chusheng" == effectType) cc.loader.loadRes("anima/heBing_chusheng", function(err, prefab) {
          animation.addClip(prefab, "heBing_chusheng");
          animaNode.y -= 30;
          animation.node.active = true;
          animation.play("heBing_chusheng");
        }); else if ("feixing_chusheng" == effectType) cc.loader.loadRes("anima/feixing_chusheng", function(err, prefab) {
          animation.addClip(prefab, "feixing_chusheng");
          animaNode.y -= 30;
          animation.node.active = true;
          animation.play("feixing_chusheng");
        }); else {
          this.node.active = true;
          this.effectFinish = true;
        }
        var yanwuBack = function() {
          animaNode.y = 0;
          animation.setCurrentTime(0);
          animation.stop(effectType);
          animation.node.active = false;
          var selfnode = animation.node.parent.getChildByName("_tower");
          selfnode.active = true;
          _this.effectFinish = true;
          animation.off("finished");
        };
        animation.on("finished", yanwuBack, this);
      };
      tower.prototype.addAnima = function(arrFrame, str) {
        var clip = cc.AnimationClip.createWithSpriteFrames(arrFrame, 60);
        clip.wrapMode = cc.WrapMode.Loop;
        clip.name = str;
        this.animation.addClip(clip);
        if ("atk" == str) clip.wrapMode = cc.WrapMode.Normal; else {
          clip.wrapMode = cc.WrapMode.Loop;
          var animStateRun = this.animation.play(str);
          animStateRun.duration = 3;
        }
      };
      tower.prototype.start = function() {
        this.pos = this.node.parent.position;
      };
      tower.prototype._onTowerTouchStart = function(event) {
        this.node.parent.zIndex = 999;
        this.node.on("touchmove", this._onTowerTouchMove, this);
        var newClickTime = new Date().getTime();
        if (0 == this.oldClickTime) this.oldClickTime = newClickTime; else {
          var cha = newClickTime - this.oldClickTime;
          this.oldClickTime = 0;
          if (cha > 500) ; else {
            var selfKey_1 = this.node.parent["$"];
            function selectTower(seleType) {
              var parentKey = null;
              var yout = G[Prefix_1.default.ROLE_LYOUT];
              for (var key in yout) if (yout.hasOwnProperty(key)) {
                var element = yout[key];
                if (element == seleType && key != selfKey_1) {
                  parentKey = key;
                  break;
                }
              }
              return parentKey;
            }
            if (this.towerType == G[Prefix_1.default.MAXROLE_GRADE]) {
              var tips = this.checkHebing();
              var selectParentTower = selectTower(this.towerType);
              var parentTower = this.game["_towerBase" + selectParentTower];
              if ("" != tips) mk.UIMgr.showToast(tips); else {
                var childTower = parentTower.getChildByName("_tower");
                this.heBingBoss(childTower);
              }
            } else {
              var selectParentTower = selectTower(this.towerType);
              if (null == selectParentTower) ; else {
                var otherOwer = this.game["_towerBase" + selectParentTower].getChildByName("_tower");
                this.node.active = false;
                this.fuseTower(this.node, otherOwer);
              }
            }
          }
        }
      };
      tower.prototype._onTowerTouchMove = function(event) {
        var location = event.getLocation();
        var size = cc.winSize;
        var clickpos = cc.v2(location.x - size.width / 2, location.y - size.height / 2);
        var pos = clickpos.sub(this.node.parent.position);
        this.node.position = pos;
        var towerBasePtArr = this.game.towerBasePtArr;
        var towerBaseObjArr = this.game.towerBaseObjArr;
        for (var i = 0; i < towerBasePtArr.length; i++) {
          if (towerBasePtArr[i].equals(this.pos)) continue;
          var dist = clickpos.sub(towerBasePtArr[i]).mag();
          if (dist < 60) {
            var tower_1 = towerBaseObjArr[i].getChildByName("_tower");
            if (tower_1) {
              var tower_2 = towerBaseObjArr[i].getChildByName("_tower");
              if (tower_2.towerType == this.towerType) {
                if (this.towerType >= this.game.maxRoleLimit) {
                  if (this.towerType != G[Prefix_1.default.MAXROLE_GRADE]) {
                    mk.UIMgr.showToast("\u4e3b\u57ce\u7b49\u7ea7\u4e0d\u8db3");
                    this.node.off("touchmove");
                  }
                  return;
                }
                if (this.towerType == G[Prefix_1.default.MAXROLE_GRADE]) {
                  var tips = this.checkHebing();
                  if ("" != tips) {
                    mk.UIMgr.showToast(tips);
                    this.node.off("touchmove");
                    return;
                  }
                  this.heBingBoss(tower_2);
                  this.node.off("touchmove");
                  return;
                }
                this.fuseTower(this.node, tower_2, "yd");
              }
              break;
            }
          }
        }
      };
      tower.prototype._onTowerTouchEnd = function(event) {
        var location = event.getLocation();
        var size = cc.winSize;
        var clickpos = cc.v2(location.x - size.width / 2, location.y - size.height / 2);
        var towerBasePtArr = this.game.towerBasePtArr;
        var towerBaseObjArr = this.game.towerBaseObjArr;
        for (var i = 0; i < towerBasePtArr.length; i++) {
          if (towerBasePtArr[i].equals(this.pos)) continue;
          var dist = clickpos.sub(towerBasePtArr[i]).mag();
          if (dist < 60) {
            var tower_3 = towerBaseObjArr[i].getChildByName("_tower");
            if (tower_3) if (tower_3.towerType == this.towerType) ; else {
              var temp2 = this.node.parent;
              var temp1 = tower_3.parent;
              var yout = G[Prefix_1.default.ROLE_LYOUT];
              var tempIndex1 = temp2["$"];
              var tempType1 = yout[tempIndex1];
              var tempIndex2 = temp1["$"];
              var tempType2 = yout[tempIndex2];
              yout[tempIndex1] = tempType2;
              yout[tempIndex2] = tempType1;
              var index_lv1 = this.node.parent["$"];
              var index_lv2 = tower_3.parent["$"];
              var temp_lv1 = this.game["_lv" + index_lv1];
              var temp_lv2 = this.game["_lv" + index_lv2];
              var temp_lv = this.node["towerType"];
              temp_lv1.getComponent(cc.Label).string = tower_3["towerType"];
              temp_lv2.getComponent(cc.Label).string = temp_lv;
              this.node.getComponent("tower").pos = temp1.position;
              tower_3.getComponent("tower").pos = temp2.position;
              this.node.parent = temp1;
              tower_3.parent = temp2;
            } else {
              var index_lv1 = towerBaseObjArr[i]["$"];
              var lvNode = this.game["_lv" + index_lv1];
              lvNode.active = true;
              lvNode.getComponent(cc.Label).string = this.node["towerType"];
              var index_lv2 = this.node.parent["$"];
              var selfLvNode = this.game["_lv" + index_lv2];
              selfLvNode.active = false;
              selfLvNode.getComponent(cc.Label).string = "";
              var yout = G[Prefix_1.default.ROLE_LYOUT];
              var type = this.node["towerType"];
              var selfIndex = this.node.parent["$"];
              yout[selfIndex] = 0;
              var otherType = towerBaseObjArr[i]["$"];
              yout[otherType] = type;
              this.node.removeFromParent(false);
              this.pos = towerBaseObjArr[i].position;
              this.node.parent = towerBaseObjArr[i];
            }
            break;
          }
        }
        this.node.position = cc.v2(0, 0);
        this.resetZindex();
      };
      tower.prototype._onTowerTouchCancel = function() {
        this.node.position = cc.v2(0, 0);
        this.resetZindex();
      };
      tower.prototype.fuseTower = function(selfNode, otherNode, fuseType) {
        this.heBingMusic();
        this.resetZindex();
        this.game.patrolEnd = false;
        this.game.task_statis("taskId2");
        var otherTower = otherNode.parent["$"];
        var selftTower = selfNode.parent["$"];
        var yout = G[Prefix_1.default.ROLE_LYOUT];
        yout[otherTower] = 0;
        yout[selftTower] = 0;
        var type = parseInt(selfNode["towerType"]);
        this.refresh(selfNode, otherNode);
        "yd" == fuseType ? this.game.upgradeTower(otherNode.parent, type + 1, "yanwu_chusheng") : this.game.upgradeTower(selfNode.parent, type + 1, "yanwu_chusheng");
        otherNode.destroy();
        selfNode.destroy();
      };
      tower.prototype.refresh = function(selfNode, otherNode) {
        var index_lv1 = selfNode.parent["$"];
        var selfLv = this.game["_lv" + index_lv1];
        selfLv.active = false;
        selfLv.getComponent(cc.Label).string = "";
        var index_lv2 = otherNode.parent["$"];
        var otherLv = this.game["_lv" + index_lv2];
        otherLv.active = false;
        otherLv.getComponent(cc.Label).string = "";
      };
      tower.prototype.heBingMusic = function() {
        var i = Math.randomInt(1, 4);
        mk.AudioMgr.playEffect(Prefix_1.default.roleHec + i);
      };
      tower.prototype.heBingBoss = function(tower) {
        var _this = this;
        var callBack = function() {
          G[Prefix_1.default.TASK_NUM].taskId2.wangc += 1;
          var indextTower = tower.parent["$"];
          var indexNode = _this.node.parent["$"];
          var yout = G[Prefix_1.default.ROLE_LYOUT];
          yout[indextTower] = 0;
          yout[indexNode] = 0;
          _this.heBingMusic();
          _this.refresh(_this.node, tower);
          tower.destroy();
          _this.node.destroy();
        };
        mk.UIMgr.showPrefab("prefab/UIForm/confirm", function(Node) {
          Node.getComponent("confirm").init(callBack);
        });
      };
      tower.prototype.checkHebing = function() {
        var tips = "";
        var roleCfgJson = this.game.roleCfg.json;
        var data = roleCfgJson[G[Prefix_1.default.MAXROLE_GRADE]];
        var jinum = 0;
        var yout = G[Prefix_1.default.ROLE_LYOUT];
        for (var key in yout) if (yout.hasOwnProperty(key)) {
          var element = yout[key];
          element == G[Prefix_1.default.MAXROLE_GRADE] && jinum++;
        }
        if (jinum >= 2) ; else {
          tips = "\u6c64\u59c6\u732b\u9700\u8981\u4e24\u4e2a";
          mk.UIMgr.showPrefab("prefab/UIForm/bossInfo");
        }
        var currentGarden = G[Prefix_1.default.CITY_GARDE];
        var limitGarden = parseInt(data.city_limit);
        if (limitGarden > currentGarden) {
          var dj = limitGarden - currentGarden;
          dj > 0 && (tips = "\u4e3b\u57ce\u5dee" + dj + "\u7ea7 ");
          mk.UIMgr.showPrefab("prefab/UIForm/bossInfo");
        }
        var currentQuan = parseInt(G[Prefix_1.default.CITY_QUAN]);
        var limitQuan = parseInt(data.role_second_money);
        if (limitQuan > currentQuan) {
          var qq = limitQuan - currentQuan;
          tips = "\u751c\u751c\u5708\u6570\u91cf\u9700\u8981" + limitQuan + "\u4e2a\uff0c\u60a8\u76ee\u524d\u8fd8\u5dee" + qq + "\u4e2a";
          G[Prefix_1.default.GIFT_GRADE].length > 0 && mk.UIMgr.showPrefab("prefab/UIForm/giftFab");
        }
        return tips;
      };
      tower.prototype.resetZindex = function() {
        var towerBaseObjArr = this.game.towerBaseObjArr;
        for (var i = 0; i < towerBaseObjArr.length; i++) towerBaseObjArr[i].zIndex = 1;
      };
      tower.prototype.attackEnemy = function(dt) {
        if (void 0 === this.targetEnemy) {
          if (this.isDaijiAnima) return;
          var animStateRun = this.animation.play("daiji");
          if (animStateRun) {
            animStateRun.duration = 3;
            this.isDaijiAnima = true;
          }
        }
        var falg = cc.isValid(this.targetEnemy, true);
        if (!falg) {
          this.targetEnemy = void 0;
          return;
        }
        this.nowTime += dt;
        var distance = this.targetEnemy.position.sub(this.pos).mag();
        if (distance < this.range) {
          var plusSpe = this.attackSpeed * G[Prefix_1.default.PLUS].Splus;
          if (this.nowTime > plusSpe) {
            this.isDaijiAnima = false;
            var animStateRun = this.animation.play("atk");
            animStateRun.duration = plusSpe - .1;
            var bt = this.game.creatBullet();
            bt.parent = this.node;
            var plusAtk = mk.Calculator.multiply(this.attackHarm, G[Prefix_1.default.PLUS].Aplus);
            var btjs = bt.getComponent("bullet");
            btjs.init(this.game, plusAtk, this.skill, this.wuqi);
            btjs.shoot(this.targetEnemy);
            this.targetEnemy.getComponent("enemy").dropBlood(btjs);
            this.nowTime = 0;
          }
        } else this.targetEnemy = void 0;
      };
      tower.prototype.update = function(dt) {
        if (!this.effectFinish) return;
        if ("" == this.attackHarm) {
          console.log("\u4f24\u5bb3\u65e0\u6548");
          this.enabled = false;
          return;
        }
        if (0 == this.game.enemyArr.length) return;
        if (void 0 === this.targetEnemy) {
          var enemy_arr_first = [];
          for (var i = 0; i < this.game.enemyArr.length; i++) {
            var distance = this.game.enemyArr[i].getPosition().sub(this.pos).mag();
            distance < this.range && enemy_arr_first.push(this.game.enemyArr[i]);
          }
          this.targetEnemy = enemy_arr_first[0];
        } else {
          var falg = cc.isValid(this.targetEnemy, true);
          if (falg) {
            var enemyjs = this.targetEnemy.getComponent("enemy");
            4 == enemyjs.pathIndex || 5 == enemyjs.pathIndex ? this.node.scaleX = -1 : this.node.scaleX = 1;
            if (enemyjs.pathIndex < 2) return;
          } else ;
        }
        this.attackEnemy(dt);
      };
      __decorate([ property(cc.Prefab) ], tower.prototype, "bullet", void 0);
      tower = __decorate([ ccclass ], tower);
      return tower;
    }(cc.Component);
    exports.default = tower;
    cc._RF.pop();
  }, {
    "../framework/Prefix": "Prefix"
  } ]
}, {}, [ "ListAdapter", "ListView", "FrameBase", "MainGame", "bullet", "buttonTouch", "enemy", "enmu", "tips", "tower", "towerBoss", "atOnceGetGold", "bossInfo", "changgeRole", "cityInfo", "collect", "confirm", "evolved", "gift", "guard", "magic", "rank", "rankItem", "setting", "store", "storeItem", "task", "taskItem", "AudioMgr", "Calcu", "GameData", "HttpMgr", "LsnMgr", "MathExtension", "BackgroundAdapter", "CloseToBorderComponent", "ContentAdapter - 001", "ContentAdapter", "MultiResoultionCompat", "Prefix", "UIMgr", "UIkill", "UtilMgr", "WXMgr", "jksdk_wechat_minigame", "onLoadMgr", "splash", "test" ]);