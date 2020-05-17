"use strict";

let node = document.querySelector(".credit-calc");

let options = {
    rate: "15%",
    years: ["1 year", "2 years", "3 years", "4 years", "5 years"],
    rangeMin: 1e5,
    rangeMax: 1e6,
    rangeStep: 1e4,
    // formatMoney: (number) => number + ' руб'
    // formatMoney: (number) => new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number)
    // formatMoney: (number) => new Intl.NumberFormat("ru-RU", {style: 'currency', currency: 'RUB'}).format(number);
};

let myCalc = new CreditCalc(node, options);
myCalc.makeNodes();