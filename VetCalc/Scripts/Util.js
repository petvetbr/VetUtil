var Util = (function () {
    function Util() { }
    Util.prototype.FormatDate = function (dt) {
        var d = dt.getDate();
        var m = dt.getMonth() + 1;
        var a = dt.getFullYear();
        if(a < 1900) {
            a += 1900;
        }
        return d + '/' + m + '/' + a;
    };
    return Util;
})();
//@ sourceMappingURL=util.js.map
