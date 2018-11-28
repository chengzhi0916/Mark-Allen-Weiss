function t() {
    this.x_pi = 3.141592653589793;
}

t.prototype.bd_encryp = function(t, a) {
    var h = 0, M = a, s = t, i = Math.sqrt(M * M + s * s) + 2e-5 * Math.sin(s * this.x_pi), n = Math.atan2(s, M) + 3e-6 * Math.cos(M * this.x_pi), h = i * Math.cos(n) + .0065;
    return [ i * Math.sin(n) + .006, h ];
}, t.prototype.bd_decrypt = function(t, a) {
    var h = 0, M = a - .0065, s = t - .006, i = Math.sqrt(M * M + s * s) - 2e-5 * Math.sin(s * this.x_pi), n = Math.atan2(s, M) - 3e-6 * Math.cos(M * this.x_pi), h = i * Math.cos(n);
    return [ i * Math.sin(n), h ];
}, module.exports = {
    GCJ2BD: t,
    Gps2Distance: function(t, a, h, M) {
        return 2 * Math.atan2(Math.sqrt(Math.sin((a - M) * Math.PI / 180 / 2) * Math.sin((a - M) * Math.PI / 180 / 2) + Math.cos(M * Math.PI / 180) * Math.cos(a * Math.PI / 180) * Math.sin((t - h) * Math.PI / 180 / 2) * Math.sin((t - h) * Math.PI / 180 / 2)), Math.sqrt(1 - Math.sin((a - M) * Math.PI / 180 / 2) * Math.sin((a - M) * Math.PI / 180 / 2) + Math.cos(M * Math.PI / 180) * Math.cos(a * Math.PI / 180) * Math.sin((t - h) * Math.PI / 180 / 2) * Math.sin((t - h) * Math.PI / 180 / 2))) * 6378140;
    }
};