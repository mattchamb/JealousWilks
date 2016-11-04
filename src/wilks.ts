function GenderCoefficient(a, b, c, d, e, f) {
    return function (bodyWeight: number) {
        var b1 = a;
        var b2 = bodyWeight * b;
        var b3 = Math.pow(bodyWeight, 2) * c;
        var b4 = Math.pow(bodyWeight, 3) * d;
        var b5 = Math.pow(bodyWeight, 4) * e;
        var b6 = Math.pow(bodyWeight, 5) * f;
        var ret = 500 / (b1 + b2 + b3 + b4 + b5 + b6);
        return ret < 0 ? 0 : ret;
    };
}

export var maleWilks = GenderCoefficient(-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863E-06, -1.291E-08);
export var femaleWilks = GenderCoefficient(594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 0.00004731582, -0.00000009054);

export function GetCoefficient(gender, bodyweight) {
    return gender == "male" ? maleWilks(bodyweight) : femaleWilks(bodyweight);
}

export function requiredBodyweight(gender, bodyweight, weightLifted, targetWilks) {
    var myWilksPoints = GetCoefficient(gender, bodyweight) * weightLifted;
    while (myWilksPoints <= targetWilks && bodyweight >= 0) {
        bodyweight -= 0.5;
        myWilksPoints = GetCoefficient(gender, bodyweight) * weightLifted;
    }
    return bodyweight;
}

export function requiredLift(gender, bodyweight, targetWilks) {
    var coefficient = GetCoefficient(gender, bodyweight);
    if (coefficient <= 0) {
        return 99999999;
    }
    return (targetWilks / coefficient);
}
