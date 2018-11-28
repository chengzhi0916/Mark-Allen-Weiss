var e = require("../../utils/geo.js"), t = require("../../utils/citydb.js"), a = require("../../utils/ga.js"), o = a.HitBuilders, r = getApp();

Page({
    data: {
        error_unknow_location: !1,
        error_load_data: !1,
        data_loaded: !1,
        edit_location_on: !1,
        address: "",
        data: {
            realtime: {
                Icon: "00",
                AqiLevel: 1
            }
        },
        search_result: [],
        hot_cities: [],
        nearby_cities: [],
        current_geo: [ 0, 0 ]
    },
    currentSearchInput: "",
    lastSearchInput: "",
    isSearching: !1,
    searchInputChecker: null,
    onLoad: function() {
        var e = this;
        this.searchInputChecker = setInterval(function() {
            e.currentSearchInput != e.lastSearchInput ? ("" == e.currentSearchInput && "" != e.lastSearchInput && e.setData({
                search_result: []
            }), e.lastSearchInput = e.currentSearchInput, e.isSearching = !1) : "" == e.lastSearchInput || e.isSearching || (e.isSearching = !0, 
            e.doSearch());
        }, 200), this.setData({
            hot_cities: this.hotCities()
        });
    },
    onUnload: function() {
        this.searchInputChecker && (clearInterval(this.searchInputChecker), this.searchInputChecker = null);
    },
    onSearchInput: function(e) {
        var t = e.detail.value;
        this.currentSearchInput = t;
    },
    doSearch: function() {
        var e = this;
        console.log([ "doSearch()", this.lastSearchInput ]), wx.request({
            url: "https://api.map.baidu.com/place/v2/suggestion",
            data: {
                ak: "T103sS4vFA5O4yqkWRbGaHjTY8DRCNrD",
                output: "json",
                q: e.lastSearchInput,
                region: "全国"
            },
            method: "GET",
            success: function(t) {
                console.log([ "doSearch.Suggestion:success", t ]), 0 === t.data.status && t.data.result ? e.showSearchResult(t.data.result) : e.showSearchResult([]);
            },
            fail: function() {
                e.showSearchResult([]);
            },
            complete: function() {}
        });
    },
    showSearchResult: function(e) {
        this.setData({
            search_result: e
        });
    },
    onResultItemTap: function(t) {
        console.log([ "onResultItemTap()", t ]);
        var a = t.currentTarget.dataset.lat, o = t.currentTarget.dataset.lng, r = t.currentTarget.dataset.name, n = new e.GCJ2BD().bd_decrypt(a, o), s = n[0], i = n[1];
        console.log([ "bd", a, o, "gcj", s, i, r ]), this.setData({
            address: r,
            edit_location_on: !1,
            search_result: []
        }), this.loadRealtimeData(s, i), this.updateCurrentGeo(s, i);
    },
    onShareAppMessage: function() {
        var e = "实时空气质量";
        this.data.data.realtime && this.data.data.realtime.Pm25 && (e = "我这里PM2.5是" + this.data.data.realtime.Pm25 + "," + this.data.data.realtime.AqiLevelDesc + "!!!"), 
        console.log([ "shareTitle:", e ]);
        var t = getApp().getTracker();
        return t.setScreenName("/pages/weather/weather"), t.send(new o.EventBuilder().setCategory("Menu").setAction("Share").build()), 
        {
            title: e
        };
    },
    onEditAddress: function(e) {
        console.log([ "onEditAdress()", e.currentTarget ]);
        var t = !this.data.edit_location_on;
        if (this.setData({
            edit_location_on: !0
        }), t) {
            var a = getApp().getTracker();
            a.setScreenName("/pages/weather/weather"), a.send(new o.EventBuilder().setCategory("Location").setAction("Change").build());
        }
    },
    testGA: function() {
        var e = a.Product, t = a.ProductAction, r = a.Promotion, n = getApp().getTracker(), s = new r().setId("PROMO_1234").setName("Summer Sale").setCreative("summer_banner2").setPosition("banner_slot1"), i = new o.ScreenViewBuilder().addPromotion(s);
        n.setScreenName("promotions"), n.send(i.build());
        var s = new r().setId("PROMO_1234").setName("Summer Sale").setCreative("summer_banner2").setPosition("banner_slot1"), i = new o.EventBuilder().addPromotion(s).setPromotionAction(r.ACTION_CLICK).setCategory("Internal Promotions").setAction("click").setLabel("Summer Sale");
        n.send(i.build());
        var c = new e().setId("P12345").setName("Android Warhol T-Shirt").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("Black").setPosition(1).setCustomDimension(1, "Member"), d = new e().setId("P12345").setName("Android Warhol T-Shirt").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("Black").setPosition(2).setCustomDimension(1, "Member"), i = new o.ScreenViewBuilder().addImpression(c, "Search Results").addImpression(d, "Search Results").addImpression(c, "Search Results2");
        n.setScreenName("searchResults"), n.send(i.build());
        var c = new e().setId("P12345").setName("Android Warhol T-Shirt").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("Black").setPosition(1).setCustomDimension(1, "Member"), l = new t(t.ACTION_CLICK).setProductActionList("Search Results"), i = new o.ScreenViewBuilder().addProduct(c).setProductAction(l);
        n.setScreenName("searchResults"), n.send(i.build());
        var u = new e().setId("P12346").setName("Android Warhol T-Shirt").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("White").setPosition(1), h = new e().setId("P12345").setName("Android Warhol T-Shirt").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("Black").setPosition(1), l = new t(t.ACTION_DETAIL), i = new o.ScreenViewBuilder().addImpression(u, "Related Products").addProduct(h).setProductAction(l);
        n.setScreenName("product"), n.send(i.build());
        var l = new t(t.ACTION_ADD), i = new o.ScreenViewBuilder().addProduct(h).setProductAction(l);
        n.setScreenName("product"), n.send(i.build());
        var c = new e().setId("P12345").setName("Android Warhol T-Shirt").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("black").setPrice(29.2).setQuantity(1), l = new t(t.ACTION_CHECKOUT).setCheckoutStep(1).setCheckoutOptions("Visa"), i = new o.ScreenViewBuilder().addProduct(c).setProductAction(l);
        n.setScreenName("checkoutStep1"), n.send(i.build());
        var l = new t(t.ACTION_CHECKOUT).setCheckoutStep(2).setCheckoutOptions("Visa"), i = new o.ScreenViewBuilder().addProduct(c).setProductAction(l);
        n.setScreenName("checkoutStep2"), n.send(i.build());
        var l = new t(t.ACTION_CHECKOUT_OPTION).setCheckoutStep(2).setCheckoutOptions("FedEx"), i = new o.EventBuilder().setProductAction(l).setCategory("Checkout").setAction("Option");
        n.send(i.build());
        var g = Math.round(100 * (20 + 20 * Math.random())) / 100, p = Math.ceil(10 * Math.random()), m = "T" + new Date().getTime(), w = 10 * Math.random(), c = new e().setId("P12345").setName("Android Warhol T-Shirt").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("black").setPrice(g).setCouponCode("APPARELSALE").setCustomDimension(1, "product111").setCustomMetric(1, 232).setQuantity(p), d = new e().setId("P12347").setName("Android Warhol T-Shirt2").setCategory("Apparel/T-Shirts").setBrand("Google").setVariant("white").setPrice(g).setCouponCode("APPARELSALE").setCustomDimension(1, "product222").setCustomMetric(1, 345).setQuantity(p), l = new t(t.ACTION_PURCHASE).setTransactionId(m).setTransactionAffiliation("Google Store - Online").setTransactionRevenue(g * p * 2 + w + 5.34).setTransactionTax(w).setTransactionShipping(5.34).setTransactionCouponCode("SUMMER2013"), i = new o.ScreenViewBuilder().addProduct(c).addProduct(d).setProductAction(l);
        n.setScreenName("transaction"), n.send(i.build());
        var c = new e().setId("P12345").setPrice(20 * Math.random() + 10).setQuantity(1), l = new t(t.ACTION_REFUND).setTransactionId(m), i = new o.ScreenViewBuilder().addProduct(c).setProductAction(l);
        n.setScreenName("refundProduct"), n.send(i.build());
    },
    onMapPointChoose: function(e) {},
    onMapRegionChange: function(e) {},
    onBodyTap: function(e) {
        console.log("onBodyTap()"), this.setData({
            edit_location_on: !1,
            search_result: []
        });
    },
    onReloadBtnClick: function(e) {
        console.log([ "onReloadBtnClick()", e ]), 0 != this.data.current_geo[0] && this.loadRealtimeData(this.data.current_geo[0], this.data.current_geo[1]);
    },
    onSearchBtnClick: function() {
        console.log("onSearchBtnClick()");
    },
    onRefreshGeoClick: function() {
        console.log("onRefreshGeoClick()"), this.setData({
            data_loaded: !1,
            edit_location_on: !1
        }), this.showCurrentGeo();
    },
    onPullDownRefresh: function() {
        console.log("onPullDownRefersh()"), this.setData({
            data_loaded: !1,
            edit_location_on: !1
        }), 0 != this.data.current_geo[0] ? this.loadRealtimeData(this.data.current_geo[0], this.data.current_geo[1]) : this.showCurrentGeo(), 
        wx.stopPullDownRefresh();
    },
    onReady: function() {
        this.showCurrentGeo();
    },
    onShow: function() {
        var e = getApp().getTracker();
        e.setScreenName("/pages/weather/weather"), e.send(new o.ScreenViewBuilder().build());
    },
    updateCurrentGeo: function(a, o) {
        console.log([ "updateCurrentGeo()", a, o ]), this.setData({
            current_geo: [ a, o ]
        });
        var r = t.GetCities();
        r.sort(function(t, r) {
            return e.Gps2Distance(o, a, t[4], t[3]) > e.Gps2Distance(o, a, r[4], r[3]) ? 1 : -1;
        }), this.setData({
            nearby_cities: r.slice(0, 14)
        });
    },
    showCurrentGeo: function() {
        console.log("showCurrentGeo()");
        var e = this;
        wx.showLoading({
            title: "正在定位",
            icon: "loading"
        }), r.getLocationGeo(function(t) {
            wx.hideLoading(), console.log([ "getGeo:ok", t ]), e.getCityByGeo(t.latitude, t.longitude), 
            e.loadRealtimeData(t.latitude, t.longitude), e.updateCurrentGeo(t.latitude, t.longitude);
        }, function(t) {
            wx.hideLoading(), console.log([ "getGeo:failed", t ]), e.showErrorUnknowLocation();
        });
    },
    getCityByGeo: function(e, t) {
        var a = this;
        r.getCityByGeo(e, t, function(e) {
            console.log([ "getCityByGeo:ok", e ]), a.setData({
                address: e.result.formatted_address
            });
        }, function(e) {
            console.log([ "getCityByGeo:failed", e ]), this.showErrorUnknowLocation();
        });
    },
    loadRealtimeData: function(e, t) {
        var a = this;
        wx.request({
            url: "https://weather.mipang.com/weather-api/weather/get-realtime-weather",
            data: {
                lat: e,
                lng: t
            },
            method: "GET",
            success: function(e) {
                if (0 !== e.data.ret) {
                    console.log([ "realtimeData:error", e ]), a.showErrorLoadData();
                    var t = getApp().getTracker();
                    return t.setScreenName("/pages/weather/weather"), void t.send(new o.ExceptionBuilder().setDescription("getrw data error").setFatal(!1).build());
                }
                console.log([ "realtimeData:ok", e ]), e.data.data.realtime.Aqi >= 0 && (e.data.data.realtime.AqiLevel = a.getAqiLevel(e.data.data.realtime.Aqi), 
                e.data.data.realtime.AqiLevelDesc = a.getAqiLevelDesc(e.data.data.realtime.Aqi));
                var r = e.data.data;
                r.minutely.description && -1 != r.minutely.description.indexOf("数据") && (r.minutely.description = ""), 
                a.setData({
                    data_loaded: !0,
                    data: r
                });
            },
            fail: function(e) {
                console.log([ "realtimeData:failed", e ]), a.showErrorLoadData();
                var t = getApp().getTracker();
                t.setScreenName("/pages/weather/weather"), t.send(new o.ExceptionBuilder().setDescription("getrw failed: " + (e.errMsg || "error")).setFatal(!1).build());
            },
            complete: function() {}
        });
    },
    showErrorUnknowLocation: function() {
        this.setData({
            error_unknow_location: !0
        });
    },
    showErrorLoadData: function() {
        this.setData({
            error_load_data: !0
        });
    },
    getAqiLevel: function(e) {
        return e < 50 ? 1 : e < 100 ? 2 : e < 150 ? 3 : e < 200 ? 4 : e < 300 ? 5 : 6;
    },
    getAqiLevelDesc: function(e) {
        return e < 50 ? "优" : e < 100 ? "良" : e < 150 ? "轻度污染" : e < 200 ? "中度污染" : e < 300 ? "重度污染" : "严重污染";
    },
    hotCities: function() {
        return [ [ "北京", 39.92998577808, 116.39564503788 ], [ "上海", 31.249161710015, 121.48789948569 ], [ "天津", 39.14392990331, 117.21081309155 ], [ "重庆", 29.544606108886, 106.53063501341 ], [ "广州", 23.120049102076, 113.30764967515 ], [ "深圳", 22.546053546205, 114.02597365732 ], [ "杭州", 30.259244461536, 120.21937541572 ], [ "成都", 30.67994284542, 104.0679234633 ], [ "沈阳", 41.808644783516, 123.43279092161 ], [ "西安", 34.277799897831, 108.9530982792 ], [ "南京", 32.057235501806, 118.77807440803 ], [ "三亚", 18.257775914897, 109.52277128136 ], [ "昆明", 25.049153100453, 102.71460113878 ], [ "厦门", 24.489230612469, 118.10388604566 ] ];
    }
});