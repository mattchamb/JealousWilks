/// <reference path="scripts/typings/knockout/knockout.d.ts" />
function GenderCoefficient(a, b, c, d, e, f) {
    return function (bw) {
        var b1 = a;
        var b2 = bw * b;
        var b3 = Math.pow(bw, 2) * c;
        var b4 = Math.pow(bw, 3) * d;
        var b5 = Math.pow(bw, 4) * e;
        var b6 = Math.pow(bw, 5) * f;
        var ret = 500 / (b1 + b2 + b3 + b4 + b5 + b6);
        return ret < 0 ? 0 : ret;
    };
}

var maleWilks = GenderCoefficient(-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863E-06, -1.291E-08);
var femaleWilks = GenderCoefficient(594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 0.00004731582, -0.00000009054);

function GetCoefficient(gender, bodyweight) {
    return gender == "male" ? maleWilks(bodyweight) : femaleWilks(bodyweight);
}

function encodeValues(you, opponent) {
    var v = {
        you: {
            g: you.gender(),
            l: you.weightLifted(),
            b: you.bodyweight()
        },
        op: {
            g: opponent.gender(),
            l: opponent.weightLifted(),
            b: opponent.bodyweight()
        }
    };
    var jsonStr = JSON.stringify(v);
    return btoa(jsonStr);
}

function decodeValues(encodedVal, you, opponent) {
    if (encodedVal == "") {
        return;
    }
    try  {
        var data = JSON.parse(atob(encodedVal));
        you.gender(data.you.g);
        you.weightLifted(data.you.l);
        you.bodyweight(data.you.b);

        opponent.gender(data.op.g);
        opponent.weightLifted(data.op.l);
        opponent.bodyweight(data.op.b);
    } catch (ex) {
    }
}

var PersonStats = (function () {
    function PersonStats() {
        var _this = this;
        this.weightLifted = ko.observable(100);
        this.bodyweight = ko.observable(75);
        this.gender = ko.observable("male");
        this.coefficient = ko.computed(function () {
            return GetCoefficient(_this.gender(), _this.bodyweight());
        });
        this.wilksPoints = ko.computed(function () {
            return _this.coefficient() * _this.weightLifted();
        });
    }
    return PersonStats;
})();

var ViewModel = (function () {
    function ViewModel(recordData, savedData) {
        var _this = this;
        this.recordData = recordData;
        this.myStats = new PersonStats();
        this.opponentStats = new PersonStats();
        decodeValues(savedData, this.myStats, this.opponentStats);
        this.eventFilter = ko.observable("Squat");
        this.victor = ko.computed(function () {
            return _this.myStats.wilksPoints() > _this.opponentStats.wilksPoints();
        });
        this.loser = ko.computed(function () {
            return _this.myStats.wilksPoints() <= _this.opponentStats.wilksPoints();
        });
        this.visibleRecords = ko.computed(function () {
            var records = [];
            var recordList = _this.recordData[_this.opponentStats.gender()];
            for (var i = 0; i < recordList.length; i++) {
                var r = recordList[i];
                if (r.event == _this.eventFilter()) {
                    records.push(r);
                }
            }
            return records;
        });

        this.requiredBodyweight = ko.computed(function () {
            if (_this.victor()) {
                return _this.myStats.bodyweight();
            }

            var weightLifted = parseFloat(_this.myStats.weightLifted());
            var bodyweight = parseFloat(_this.myStats.bodyweight());
            var gender = _this.myStats.gender();
            var myWilksPoints = GetCoefficient(gender, bodyweight) * weightLifted;
            var targetWilksPoints = parseFloat(_this.opponentStats.wilksPoints());

            while (myWilksPoints <= targetWilksPoints && bodyweight >= 0) {
                bodyweight -= 0.5;
                myWilksPoints = GetCoefficient(gender, bodyweight) * weightLifted;
            }
            return bodyweight;
        });
        this.requiredLift = ko.computed(function () {
            if (_this.victor()) {
                return parseFloat(_this.myStats.weightLifted()).toFixed(2);
            }

            var bodyweight = parseFloat(_this.myStats.bodyweight());
            var weightLifted = parseFloat(_this.myStats.weightLifted());
            var gender = _this.myStats.gender();
            var myWilksPoints = GetCoefficient(gender, bodyweight) * weightLifted;
            var targetWilksPoints = parseFloat(_this.opponentStats.wilksPoints());
            var coefficient = GetCoefficient(gender, bodyweight);

            if (myWilksPoints <= 0 || coefficient <= 0) {
                return "99999999";
            }

            return (targetWilksPoints / coefficient).toFixed(2);
        });

        this.setCurrentStats = function (data) {
            _this.opponentStats.bodyweight(data.bodyweight);
            _this.opponentStats.weightLifted(data.lift);
        };

        this.shareUrl = ko.computed(function () {
            return location.protocol + "//" + location.host + "/#" + encodeURIComponent(encodeValues(_this.myStats, _this.opponentStats));
        });
    }
    return ViewModel;
})();
//# sourceMappingURL=Script.js.map
