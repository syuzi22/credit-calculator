"use strict";

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
        alert(1);
        let myCalc = new CreditCalc(node, options);
        alert(3);
        myCalc.makeNodes();
    }

    if (document.readyState === "loading") {
        // Загрузка ещё не закончилась
        alert(4);
        document.addEventListener("DOMContentLoaded", runCalc);
    } else {
        // `DOMContentLoaded` Уже сработал
        alert(2);
        runCalc();
    }




// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
