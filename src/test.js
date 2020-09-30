var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var arr1 = { one: null, two: null };
arr1.one = 1;
arr1.two = 2;
console.log(arr1);
var arr = {
    one: 1,
    two: 2
};
var arr2 = __assign(__assign({}, arr), { two: 3 });
console.log(arr2);
