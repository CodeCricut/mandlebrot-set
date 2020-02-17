// ex: myNum.map(0, 10, -40, 200)
Number.prototype.mapTo = function(inMin, inMax, outMin, outMax) {
    return ((this - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};
