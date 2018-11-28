var t = require("utils/ga.js").GoogleAnalytics;

App({
    onLaunch: function() {},
    tracker: null,
    getTracker: function() {
        return this.tracker || (this.tracker = t.getInstance(this).setAppName("实时空气质量").setAppVersion("v1.0.6").newTracker("UA-90097818-1")), 
        this.tracker;
    },
    getUserInfo: function(t) {
        return;
    },
    globalData: {
        userInfo: null
    },
    getLocationGeo: function(t, n) {
        wx.getLocation({
            type: "gcj02",
            success: function(n) {
                "function" == typeof t && t(n);
            },
            fail: function(t) {
                "function" == typeof n && n(t);
            }
        });
    },
    getCityByGeo: function(t, n, o, e) {
        wx.request({
            url: "https://api.map.baidu.com/geocoder/v2/",
            data: {
                ak: "T103sS4vFA5O4yqkWRbGaHjTY8DRCNrD",
                output: "json",
                pois: "0",
                coordtype: "gcj02ll",
                location: t + "," + n
            },
            method: "GET",
            success: function(t) {
                0 !== t.data.status ? "function" == typeof e && e(t) : "function" == typeof o && o(t.data);
            },
            fail: function(t) {
                "function" == typeof e && e(t);
            },
            complete: function() {}
        });
    }
});