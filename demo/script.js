"use strict";

window.onerror = function (msg, url, lineNo, columnNo, error) {
    alert("Fatal error: " + msg + " at line " + lineNo + ": " + error);

    return false;
};

try {
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    document.addEventListener("DOMContentLoaded", () => {
        let node = document.querySelector(".credit-calc");

        let options = {
            rate: "15%",
            years: ["1 год", "2 года", "3 года", "4 года", "5 лет"],
            rangeMin: 1e5,
            rangeMax: 1e6,
            rangeStep: 1e4,
            // formatMoney: (number) => number + ' руб'
            // formatMoney: (number) => new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
        };
        let myCalc = new CreditCalc(node, options);
        myCalc.makeNodes();
    });
} catch (e) {
    alert("Caught error: " + e);
}
