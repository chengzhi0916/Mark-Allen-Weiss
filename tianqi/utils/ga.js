function t(t) {
    this.app = t, this.systemInfo = wx.getSystemInfoSync(), this.trackers = [], this.appName = "Mini Program", 
    this.appVersion = "unknow";
    var e = wx.getStorageSync("_ga_cid") || !1;
    e || (e = f(), wx.setStorageSync("_ga_cid", e)), this.cid = e, this.userAgent = d(this.systemInfo);
    var i = this.systemInfo.pixelRatio;
    this.sr = m(Math.round(this.systemInfo.windowWidth * i), Math.round(this.systemInfo.windowHeight * i), this.systemInfo), 
    this.vp = [ this.systemInfo.windowWidth, this.systemInfo.windowHeight ].map(function(t) {
        return t;
    }).join("x");
}

function e(t) {
    return String(t).replace(/^&/, "");
}

function i(t, e) {
    this.ga = t, this.hit = {
        tid: e || "",
        cd: ""
    }, this.next_hit = {}, this.sending = !1, this.send_queue = [];
}

function n() {
    this.hit = {
        t: "screenview",
        ni: 0
    }, this.custom_dimensions = [], this.custom_metrics = [], this.next_impression_index = 1, 
    this.impression_product_list = {}, this.next_product_index = 1, this.next_promotion_index = 1;
}

function o(t, e, i) {
    t.hit[e] == i && delete t.hit[e];
}

function s() {
    n.call(this), this.setHitType("screenview");
}

function r() {
    n.call(this), this.setHitType("event"), this.setAll({
        ec: "",
        ea: "",
        el: "",
        ev: 0
    });
}

function u() {
    n.call(this), this.setHitType("social"), this.setAll({
        sn: "",
        sa: "",
        st: ""
    });
}

function p() {
    n.call(this), this.setHitType("exception"), this.setAll({
        exd: "",
        exf: 1
    });
}

function h() {
    n.call(this), this.setHitType("timing"), this.setAll({
        utc: "",
        utv: "",
        utt: 0,
        utl: ""
    });
}

function c() {
    this.hit = {};
}

function a() {
    this.hit = {};
}

function l(t) {
    this.hit = {
        pa: t
    };
}

function f() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
        var e = 16 * Math.random() | 0;
        return ("x" == t ? e : 3 & e | 8).toString(16);
    });
}

function d(t) {
    var e = t.system.toLowerCase().indexOf("android") > -1, i = !e && -1 == t.model.toLowerCase().indexOf("iphone");
    if (e) return "Mozilla/5.0 (Linux; U; " + t.system + "; " + t.model + " Build/000000) AppleWebKit/537.36 (KHTML, like Gecko)Version/4.0 Chrome/49.0.0.0 Mobile Safari/537.36 MicroMessenger/" + t.version;
    if (i) {
        var n = t.system.replace(/^.*?([0-9.]+).*?$/, function(t, e) {
            return e;
        }).replace(/\./g, "_");
        return "Mozilla/5.0 (iPad; CPU OS " + n + " like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/10A406 MicroMessenger/" + t.version;
    }
    return "Mozilla/5.0 (iPhone; CPU iPhone OS " + (n = t.system.replace(/^.*?([0-9.]+).*?$/, function(t, e) {
        return e;
    }).replace(/\./g, "_")) + " like Mac OS X) AppleWebKit/602.3.12 (KHTML, like Gecko) Mobile/14C92 MicroMessenger/" + t.version;
}

function y(t) {
    var e = {}, i = {
        utm_source: "cs",
        utm_medium: "cm",
        utm_term: "ck",
        utm_content: "cc",
        utm_campaign: "cn",
        gclid: "gclid"
    };
    return t.replace(/^[^?]+\?/, "").split("&").map(function(t) {
        var n = t.split("="), o = decodeURIComponent(n[0]);
        if (2 == n.length && "" !== n[1] && i[o]) {
            var s = decodeURIComponent(n[1]);
            e[i[o]] = s;
        }
    }), e;
}

function m(t, e, i) {
    !(i.system.toLowerCase().indexOf("android") > -1) && i.model.toLowerCase().indexOf("iphone");
    return [ t, e ].join("x");
}

t.prototype.setAppName = function(t) {
    return this.appName = t, this;
}, t.prototype.setAppVersion = function(t) {
    return this.appVersion = t, this;
}, t.prototype.getDefaultTracker = function() {
    return this.trackers[0];
}, t.prototype.newTracker = function(t) {
    var e = new i(this, t);
    return this.trackers.push(e), e;
}, i.prototype.get = function(t) {
    return this.hit[e(t)];
}, i.prototype.set = function(t, i) {
    return this.hit[e(t)] = i, this;
}, i.prototype.setAnonymizeIp = function(t) {
    return this.set("aip", t ? 1 : 0);
}, i.prototype.setAppId = function(t) {
    return this.set("aid", t);
}, i.prototype.setAppInstallerId = function(t) {
    return this.set("aiid", t);
}, i.prototype.setAppName = function(t) {
    return this.set("an", t);
}, i.prototype.setAppVersion = function(t) {
    return this.set("av", t);
}, i.prototype.setCampaignParamsOnNextHit = function(t) {
    var e = y(t);
    for (var i in e) this.next_hit[i] = e[i];
    return this;
}, i.prototype.setClientId = function(t) {
    return this.set("cid", t);
}, i.prototype.setEncoding = function(t) {
    return this.set("de", t);
}, i.prototype.setLanguage = function(t) {
    return this.set("ul", t);
}, i.prototype.setLocation = function(t) {
    return this.set("geoid", t);
}, i.prototype.setScreenColors = function(t) {
    return this.set("sd", t);
}, i.prototype.setScreenName = function(t) {
    return this.set("cd", t);
}, i.prototype.setScreenResolution = function(t, e) {
    return this.set("sr", [ t, e ].join("x"));
}, i.prototype.setViewportSize = function(t) {
    return this.set("vp", t);
}, i.prototype.send = function(t) {
    return this.send_queue_push(this.ga, t), this;
}, i.prototype.send_queue_push = function(t, e) {
    var i = this, n = {
        v: 1,
        cid: t.cid,
        ds: "app",
        ul: t.systemInfo.language,
        de: "UTF-8",
        sd: "24-bit",
        je: 0,
        an: t.appName,
        av: t.appVersion,
        sr: t.sr,
        vp: t.vp,
        ua: t.userAgent
    };
    for (var o in i.hit) n[o] = i.hit[o];
    for (var o in i.next_hit) n[o] = i.next_hit[o];
    i.next_hit = {};
    for (var o in e) n[o] = e[o];
    console.log([ "ga.queue.push", n ]), this.send_queue.push([ n, new Date() ]), this._do_send();
}, i.prototype._do_send = function() {
    if (!this.sending) if (this.send_queue.length <= 0) this.sending = !1; else {
        this.sending = !0;
        for (var t = this, e = []; this.send_queue.length > 0; ) {
            var i = this.send_queue[0], n = i[0];
            n.qt = new Date().getTime() - i[1].getTime(), n.z = Math.floor(2147483648 * Math.random());
            var o = function(t) {
                var e = [];
                for (var i in t) e.push([ encodeURIComponent(i), encodeURIComponent(t[i]) ].join("="));
                return e.join("&");
            }(n), s = e.map(function(t) {
                return t.length;
            }).reduce(function(t, e) {
                return t + e;
            }, 0), r = o.length;
            if ((s + r > 16384 || r > 8192 || e.length >= 20) && e.length > 0) break;
            e.push(o), this.send_queue.shift(), console.log([ "ga.queue.presend[" + (e.length - 1) + "]", n ]);
        }
        var u = e.join("\r\n"), p = "https://www.google-analytics.com/collect";
        e.length > 1 ? (console.log([ "ga.queue.send.batch", u ]), p = "https://www.google-analytics.com/batch") : console.log([ "ga.queue.send.collect", u ]), 
        wx.request({
            url: p,
            data: u,
            method: "POST",
            header: {
                "content-type": "text/plain"
            },
            success: function(t) {
                console.log([ "ga:success", t ]);
            },
            fail: function(t) {
                console.log([ "ga:failed", t ]);
            },
            complete: function() {
                t.sending = !1, setTimeout(function() {
                    t._do_send();
                }, 0);
            }
        });
    }
}, n.prototype.get = function(t) {
    return this.hit[e(t)];
}, n.prototype.set = function(t, i) {
    return this.hit[e(t)] = i, this;
}, n.prototype.setAll = function(t) {
    for (var e in t) this.set(e, t[e]);
    return this;
}, n.prototype.addImpression = function(t, e) {
    this.impression_product_list[e] || (this.impression_product_list[e] = [ this.next_impression_index, 1 ], 
    this.set("il" + this.next_impression_index + "nm", e), this.next_impression_index++);
    var i = this.impression_product_list[e][0], n = this.impression_product_list[e][1];
    for (var o in t.hit) this.set("il" + i + "pi" + n + o, t.hit[o]);
    return this.impression_product_list[e][1] = n + 1, this;
}, n.prototype.addProduct = function(t) {
    var e = this.next_product_index;
    for (var i in t.hit) this.set("pr" + e + i, t.hit[i]);
    return this.next_product_index++, this;
}, n.prototype.addPromotion = function(t) {
    var e = this.next_promotion_index;
    for (var i in t.hit) this.set("promo" + e + i, t.hit[i]);
    return this.next_promotion_index++, this;
}, n.prototype.setProductAction = function(t) {
    for (var e in t.hit) this.set(e, t.hit[e]);
    return this;
}, n.prototype.setPromotionAction = function(t) {
    return this.set("promoa", t);
}, n.prototype.setCampaignParamsFromUrl = function(t) {
    var e = y(t);
    return this.setAll(e);
}, n.prototype.setCustomDimension = function(t, e) {
    return this.custom_dimensions.push([ t, e ]), this;
}, n.prototype.setCustomMetric = function(t, e) {
    return this.custom_metrics.push([ t, e ]), this;
}, n.prototype.setNewSession = function() {
    return this.hit.sc = "start", this;
}, n.prototype.setNonInteraction = function(t) {
    return this.hit.ni = t ? 1 : 0, this;
}, n.prototype.setHitType = function(t) {
    return this.hit.t = t, this;
}, n.prototype.build = function() {
    var t, e = this, i = [];
    0 == this.hit.ni && i.push("ni");
    for (var n in this.hit) n.match(/^(cd|cm)\d+$/) && i.push(n);
    i.map(function(t) {
        delete e.hit[t];
    });
    var o = this.custom_dimensions, s = this.custom_metrics;
    for (t = 0; t < o.length; t++) {
        var r = o[t];
        this.hit["cd" + r[0]] = r[1];
    }
    for (t = 0; t < s.length; t++) {
        var u = s[t];
        this.hit["cm" + u[0]] = u[1];
    }
    return this.hit;
}, (s.prototype = Object.create(n.prototype)).constructor = s, (r.prototype = Object.create(n.prototype)).constructor = r, 
r.prototype.setCategory = function(t) {
    return this.set("ec", t);
}, r.prototype.setAction = function(t) {
    return this.set("ea", t);
}, r.prototype.setLabel = function(t) {
    return this.set("el", t);
}, r.prototype.setValue = function(t) {
    return this.set("ev", t);
}, r.prototype.build = function() {
    return o(this, "ev", 0), o(this, "el", ""), n.prototype.build.apply(this, arguments);
}, (u.prototype = Object.create(n.prototype)).constructor = u, u.prototype.setNetwork = function(t) {
    return this.set("sn", t);
}, u.prototype.setAction = function(t) {
    return this.set("sa", t);
}, u.prototype.setTarget = function(t) {
    return this.set("st", t);
}, u.prototype.build = function() {
    return o(this, "st", ""), n.prototype.build.apply(this, arguments);
}, (p.prototype = Object.create(n.prototype)).constructor = p, p.prototype.setDescription = function(t) {
    return this.set("exd", t);
}, p.prototype.setFatal = function(t) {
    return this.set("exf", t ? 1 : 0);
}, (h.prototype = Object.create(n.prototype)).constructor = h, h.prototype.setCategory = function(t) {
    return this.set("utc", t);
}, h.prototype.setVariable = function(t) {
    return this.set("utv", t);
}, h.prototype.setValue = function(t) {
    return this.set("utt", t);
}, h.prototype.setLabel = function(t) {
    return this.set("utl", t);
}, h.prototype.build = function() {
    return o(this, "utl", ""), n.prototype.build.apply(this, arguments);
}, c.prototype.setBrand = function(t) {
    return this.hit.br = t, this;
}, c.prototype.setCategory = function(t) {
    return this.hit.ca = t, this;
}, c.prototype.setCouponCode = function(t) {
    return this.hit.cc = t, this;
}, c.prototype.setCustomDimension = function(t, e) {
    return this.hit["cd" + t] = e, this;
}, c.prototype.setCustomMetric = function(t, e) {
    return this.hit["cm" + t] = e, this;
}, c.prototype.setId = function(t) {
    return this.hit.id = t, this;
}, c.prototype.setName = function(t) {
    return this.hit.nm = t, this;
}, c.prototype.setPosition = function(t) {
    return this.hit.ps = t, this;
}, c.prototype.setPrice = function(t) {
    return this.hit.pr = t, this;
}, c.prototype.setQuantity = function(t) {
    return this.hit.qt = t, this;
}, c.prototype.setVariant = function(t) {
    return this.hit.va = t, this;
}, a.ACTION_CLICK = "click", a.ACTION_VIEW = "view", a.prototype.setCreative = function(t) {
    return this.hit.cr = t, this;
}, a.prototype.setId = function(t) {
    return this.hit.id = t, this;
}, a.prototype.setName = function(t) {
    return this.hit.nm = t, this;
}, a.prototype.setPosition = function(t) {
    return this.hit.ps = t, this;
}, l.ACTION_ADD = "add", l.ACTION_CHECKOUT = "checkout", l.ACTION_CHECKOUT_OPTION = "checkout_option", 
l.ACTION_CLICK = "click", l.ACTION_DETAIL = "detail", l.ACTION_PURCHASE = "purchase", 
l.ACTION_REFUND = "refund", l.ACTION_REMOVE = "remove", l.prototype.setCheckoutOptions = function(t) {
    return this.hit.col = t, this;
}, l.prototype.setCheckoutStep = function(t) {
    return this.hit.cos = t, this;
}, l.prototype.setProductActionList = function(t) {
    return this.hit.pal = t, this;
}, l.prototype.setProductListSource = function(t) {
    return this.hit.pls = t, this;
}, l.prototype.setTransactionAffiliation = function(t) {
    return this.hit.ta = t, this;
}, l.prototype.setTransactionCouponCode = function(t) {
    return this.hit.tcc = t, this;
}, l.prototype.setTransactionId = function(t) {
    return this.hit.ti = t, this;
}, l.prototype.setTransactionRevenue = function(t) {
    return this.hit.tr = t, this;
}, l.prototype.setTransactionShipping = function(t) {
    return this.hit.ts = t, this;
}, l.prototype.setTransactionTax = function(t) {
    return this.hit.tt = t, this;
}, module.exports = {
    GoogleAnalytics: {
        getInstance: function(e) {
            return (e = e || {}).defaultGoogleAnalyticsInstance || (e.defaultGoogleAnalyticsInstance = new t(e)), 
            e.defaultGoogleAnalyticsInstance;
        }
    },
    HitBuilders: {
        HitBuilder: n,
        ScreenViewBuilder: s,
        EventBuilder: r,
        SocialBuilder: u,
        ExceptionBuilder: p,
        TimingBuilder: h
    },
    Product: c,
    ProductAction: l,
    Promotion: a
};