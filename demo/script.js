"use strict";

class CreditCalc {
    /**
     * @type {Node}
     */
    node;
    /**
     * @type {?Node}
     */
    paymentDiv = null;
    /**
     * @type {?Node}
     */
    rateDiv = null;
    /**
     * @type {Node}
     */
    rangeDiv;

    /**
     * @type {?Node}
     */
    valueOfRange = null;
    /**
     * @type {Node}
     */
    timeDiv;

    /**
     * @type {function}
     */
    formatMoney;

    /**
     * @type {?node}
     */
    debugNode;

    /**
     * @param {Node} node
     * @param {object} options
     * @throws Error
     */
    constructor(node, options) {
        this.debugNode = this.debugNode || document.querySelector('.js-debug-console');
        this.debugLog("CreditCalc constructor()");

        this.node = node || options.node;
        this.rate = parseInt(options.rate || 14);
        this.years = options.years || ["1 год", "2 года", "3 года"];
        this.formatMoney = options.formatMoney;
        this.options = options;
        this.debugLog("CreditCalc constructor() end");
    }

    makeButtons() {
        this.debugLog("CreditCalc makeButtons()");
        this.timeDiv.innerHTML = "";
        for (let i = 0; i < this.years.length; i++) {
            let button = document.createElement("button");
            button.classList.add("credit-calc__button");
            button.textContent = this.years[i];
            this.timeDiv.append(button);
        }
        this.node
            .querySelector("button")
            .classList.add("credit-calc__button_selected");
        this.debugLog("CreditCalc makeButtons()");
    }

    calcAnnuityPayment(creditSum, creditTimeInMonths, creditRate) {
        this.debugLog("CreditCalc calcAnnuityPayment()");
        let monthCreditRate = creditRate / 12 / 100; //Месячная процентная ставка
        let numberOfPayments = creditTimeInMonths; //Количество платежей
        let pow = Math.pow(1 + monthCreditRate, numberOfPayments); //параметр для формулы расчета аннуитета
        let annuityСoefficient = (monthCreditRate * pow) / (pow - 1); //Коэффициент аннуитета
        let annuityPayment = (creditSum * annuityСoefficient).toFixed(2); //Аннуитетный платеж
        this.debugLog("CreditCalc calcAnnuityPayment() returning " + annuityPayment);
        return this.formatMoneyFunc(annuityPayment);
    }

    rangeDivInputHandler() {
        if (!this.valueOfRange) {
            return;
        }

        this.valueOfRange.textContent = this.formatMoneyFunc(this.rangeDiv.value);

        this.months =
            parseInt(
                this.node.querySelector(".credit-calc__button_selected")
                    .textContent
            ) * 12;

        if (this.paymentDiv) {
            this.paymentDiv.textContent = this.calcAnnuityPayment(
                this.rangeDiv.value,
                this.months,
                this.rate
            );
        }
    }

    nodeClickHandler(event) {
        if (!event.target.classList.contains("credit-calc__button")) {
            return;
        }

        this.node
            .querySelectorAll(".credit-calc__button")
            .forEach((elem) =>
                elem.classList.remove("credit-calc__button_selected")
            );
        event.target.classList.add("credit-calc__button_selected");

        if (this.paymentDiv && this.rangeDiv) {
            this.months = parseInt(event.target.textContent, 10) * 12;
            this.paymentDiv.textContent = this.calcAnnuityPayment(
                this.rangeDiv.value,
                this.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             months,
                this.rate
            );
        }
    }

    formatMoneyFunc(value) {
        if (typeof this.formatMoney === "function") {
            return this.formatMoney(
                value
            );
        } else {
            return new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
            }).format(value);
        }
    }

    makeNodes() {
        this.debugLog("CreditCalc makeNodes()");
        this.debugNode = this.debugNode || document.querySelector('.js-debug-console');
        this.rateDiv = this.node.querySelector(".credit-calc__rate");
        this.paymentDiv = this.node.querySelector(".credit-calc__payment");
        this.rangeDiv = this.node.querySelector(".credit-calc__range");
        this.valueOfRange = this.node.querySelector(".credit-calc__value-of-range");

        if (!this.node || this.node instanceof Node === false) {
            throw new Error("node must be an instance of Node");
        }

        if (!this.rangeDiv) {
            this.rangeDiv = document.createElement("input");
            this.rangeDiv.type = "range";
            this.node.insertAdjacentElement("afterbegin", this.rangeDiv);
        }

        this.rangeDiv.min = this.options.rangeMin || this.rangeDiv.min || 1e5;
        this.rangeDiv.max = this.options.rangeMax || this.rangeDiv.max || 1e6;
        this.rangeDiv.step = this.options.rangeStep || this.rangeDiv.step || 1e5;
        this.rangeDiv.classList.add("credit-calc__range");
        if (this.rateDiv) {
            this.rateDiv.textContent = this.rate + " %";
        }

        if (this.valueOfRange) {
            this.valueOfRange.textContent = this.formatMoneyFunc(this.rangeDiv.value);
        }

        if (!this.timeDiv) {
            this.timeDiv = document.createElement("div");
            this.timeDiv.classList.add("credit-calc__time");
            this.node.append(this.timeDiv);
        }

        this.timeDiv = this.node.querySelector(".credit-calc__time");

        this.buttons = this.makeButtons();

        this.months =
            parseInt(
                this.node.querySelector(".credit-calc__button_selected")
                    .textContent
            ) * 12;

        if (this.paymentDiv) {
            this.paymentDiv.textContent = this.calcAnnuityPayment(
                this.rangeDiv.value,
                this.months,
                this.rate
            );
        }

        this.rangeDiv.addEventListener(
            "input",
            this.rangeDivInputHandler.bind(this)
        );

        this.node.addEventListener("click", this.nodeClickHandler.bind(this));
        this.debugLog("CreditCalc makeNodes() - END");
    }

    debugLog(message) {
        if (!this.debugNode) {
            return;
        }
        this.debugNode.innerHTML += message + "\n\n";
    }
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
    alert("Fatal error: " + msg + " at line " + lineNo + ": " + error);

    return false;
};

let debugNode = null;

try {
    const debugLog = (message) => {
        if (debugNode) {
            debugNode.innerHTML += message + "\n\n";
        }
    };

    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    document.addEventListener("DOMContentLoaded", () => {
        debugNode = document.querySelector('.js-debug-console');
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
        debugLog("typeof DebugClass = " + (typeof DebugClass));
        debugLog("debug instance: " + (new DebugClass));
        debugLog("creating calculator with options: " + JSON.stringify(options));
        debugLog("typeof CreditCalc = " + (typeof CreditCalc));
        let myCalc = new CreditCalc(node, options);
        debugLog("created CreditCalc instance. Creating calc nodes");
        myCalc.makeNodes();
        debugLog("Calc nodes created");
    });
} catch (e) {
    alert("Caught error: " + e);
}
