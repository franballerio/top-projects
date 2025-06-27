"use strict";

let num1 = null;
let num2 = null;
let operator = null;
const display = document.getElementById("display");

function numberClick(number) {



    if (num1 === null && num2 === null) {
        if (number === "0") {
            // Do nothing if the first number is 0 and no operator is selected
            return;
        } else if (number === ".") {
            // If the first number is not set, start with 0.
            num1 = "0.";
            updateDisplay(num1);
            return;
        }
    }

    if (operator === null) {
        if (num1 === null) {
            num1 = number;
        } else {
            if (num1.length >= 8) {
                // Limit the length of the number to 10 digits
                return;
            } else {
                num1 += number;
            }
        }
        updateDisplay(num1);
        return;
    } else {
        if (num2 === null) {
            num2 = number;
        } else {
            if (num2.length >= 8) {
                // Limit the length of the number to 10 digits
                return;
            } else {
                num2 += number;
            }
        }
    }
}

function clearDisplay() {
    display.innerText = "0";
    num1 = null;
    num2 = null;
    operator = null;
}

function operatorClick(operator) {

}


function calculate() {}

function updateDisplay(value) {
    display.innerText = value;
}

function toggleSign() {}

