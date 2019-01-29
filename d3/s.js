// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.24/esri/copyright.txt for details.
//>>built
define("esri/geometry/mathUtils", ["dojo/_base/lang", "dojo/has", "../kernel", "./Point"], function (r, w, x, p) {
    function t(a, c, b) {
        return a instanceof p ? new p(a.x + b * (c.x - a.x), a.y + b * (c.y - a.y)) : [a[0] + b * (c[0] - a[0]), a[1] + b * (c[1] - a[1])]
    }

    function g(a, c) {
        return 1E-8 > Math.abs(a - c)
    }

    function u(a, c, b, d) {
        var e, f = g(a[0], c[0]) ? 1E10 : (a[1] - c[1]) / (a[0] - c[0]),
            k = g(b[0], d[0]) ? 1E10 : (b[1] - d[1]) / (b[0] - d[0]), l = a[1] - f * a[0], h = b[1] - k * b[0];
        if (g(f, k)) {
            if (g(l, h)) {
                if (g(a[0], c[0])) if (Math.min(a[1], c[1]) < Math.max(b[1], d[1]) || Math.max(a[1],
                    c[1]) > Math.min(b[1], d[1])) a = (a[1] + c[1] + b[1] + d[1] - Math.min(a[1], c[1], b[1], d[1]) - Math.max(a[1], c[1], b[1], d[1])) / 2, e = (a - l) / f; else return null; else if (Math.min(a[0], c[0]) < Math.max(b[0], d[0]) || Math.max(a[0], c[0]) > Math.min(b[0], d[0])) e = (a[0] + c[0] + b[0] + d[0] - Math.min(a[0], c[0], b[0], d[0]) - Math.max(a[0], c[0], b[0], d[0])) / 2, a = f * e + l; else return null;
                return [e, a]
            }
            return null
        }
        g(f, 1E10) ? (e = a[0], a = k * e + h) : g(k, 1E10) ? (e = b[0], a = f * e + l) : (e = -(l - h) / (f - k), a = a[1] === c[1] ? a[1] : b[1] === d[1] ? b[1] : f * e + l);
        return [e, a]
    }

    var v = {
        getLength: function (a,
                             c) {
            var b = c.x - a.x, d = c.y - a.y;
            return Math.sqrt(b * b + d * d)
        }, _getLength: function (a, c) {
            var b = c[0] - a[0], d = c[1] - a[1];
            return Math.sqrt(b * b + d * d)
        }, getPointOnLine: t, getMidpoint: function (a, c) {
            return t(a, c, .5)
        }, _equals: g, _getLineIntersection: u, getLineIntersection: function (a, c, b, d, e) {
            (a = u([a.x, a.y], [c.x, c.y], [b.x, b.y], [d.x, d.y])) && (a = new p(a[0], a[1], e));
            return a
        }, _getLineIntersection2: function (a, c) {
            var b = a[0], d = a[1], e = c[0], f = c[1], k = b[0], b = b[1], l = d[0], d = d[1], h = e[0], q = e[1],
                e = f[0] - h, h = k - h, g = l - k, f = f[1] - q, q = b - q, m = d - b,
                n = f * g - e * m;
            if (0 === n) return !1;
            e = (e * q - f * h) / n;
            h = (g * q - m * h) / n;
            return 0 <= e && 1 >= e && 0 <= h && 1 >= h ? [k + e * (l - k), b + e * (d - b)] : !1
        }, _pointLineDistance: function (a, c) {
            var b = c[0], d = c[1], e = b[0], f = b[1], b = a[0], k = a[1], l = d[0] - e, h = d[1] - f, g = b - e,
                p = k - f, d = Math.sqrt, m = Math.pow, n = d(m(l, 2) + m(h, 2)), g = (g * l + p * h) / (n * n),
                f = f + g * h;
            return d(m(b - (e + g * l), 2) + m(k - f, 2))
        }
    };
    w("extend-esri") && r.mixin(r.getObject("geometry", !0, x), v);
    return v
});