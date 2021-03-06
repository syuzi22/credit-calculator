class CreditCalc {
    constructor(node, options) {
        this.node = node || options.node;
        this.rate = parseInt(options.rate || 14);
        this.years = options.years || ["1 year", "2 years", "3 years"];
        this.formatMoney = options.formatMoney;
        this.options = options;
    }

    makeNodes() {
        this.rateDiv = this.node.querySelector(".credit-calc__rate");
        this.paymentDiv = this.node.querySelector(".credit-calc__payment");
        this.rangeDiv = this.node.querySelector(".credit-calc__range");
        this.valueOfRange = this.node.querySelector(
            ".credit-calc__value-of-range"
        );

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
        this.rangeDiv.step =
            this.options.rangeStep || this.rangeDiv.step || 1e5;
        this.rangeDiv.classList.add("credit-calc__range");
        if (this.rateDiv) {
            this.rateDiv.textContent = this.rate + " %";
        }

        if (this.valueOfRange) {
            this.valueOfRange.textContent = this.formatMoneyFunc(
                this.rangeDiv.value
            );
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
    }

    makeButtons() {
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
    }

    calcAnnuityPayment(creditSum, creditTimeInMonths, creditRate) {
        let monthCreditRate = creditRate / 12 / 100; //monthly interest rate
        let numberOfPayments = creditTimeInMonths; //number of Payments
        let pow = Math.pow(1 + monthCreditRate, numberOfPayments); //parameter for annuity calculation formula
        let annuityСoefficient = (monthCreditRate * pow) / (pow - 1); //annuity coefficient
        let annuityPayment = (creditSum * annuityСoefficient).toFixed(2); //annuity payment
        return this.formatMoneyFunc(annuityPayment);
    }

    rangeDivInputHandler() {
        if (!this.valueOfRange) {
            return;
        }

        this.valueOfRange.textContent = this.formatMoneyFunc(
            this.rangeDiv.value
        );

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
                this.months,
                this.rate
            );
        }
    }

    formatMoneyFunc(value) {
        if (typeof this.formatMoney === "function") {
            return this.formatMoney(value);
        }

        return new Intl.NumberFormat(navigator.languages, {
            style: "currency",
            currency: "USD",
        }).format(value);
    }
}

/**
 * @type {Node}
 */
// node;
/**
 * @type {?Node}
 */
// paymentDiv = null;
/**
 * @type {?Node}
 */
// rateDiv = null;
/**
 * @type {Node}
 */
// rangeDiv;

/**
 * @type {?Node}
 */
// valueOfRange = null;
/**
 * @type {Node}
 */
// timeDiv;

/**
 * @type {function}
 */
// formatMoney;

/**
 * @param {Node} node
 * @param {object} options
 * @throws Error
 */
