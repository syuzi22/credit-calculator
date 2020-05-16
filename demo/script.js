"use strict";

try {
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

    function runCalc() {

        alert('runCalc-1')
        let myCalc = new CreditCalc(node, options);
        alert('runCalc-2')
        myCalc.makeNodes();
        alert('runCalc-3')
    }

    if (document.readyState === "loading") {
        // Загрузка ещё не закончилась
        document.addEventListener("DOMContentLoaded", runCalc);
    } else {
        // `DOMContentLoaded` Уже сработал
        runCalc();
    }
} catch (error) {
    alert(error);
}

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
