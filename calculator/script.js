"use strict";

let num1 = null;
let num2 = null;
let operator = null;

function numberClick(number) {
    updateDisplay(number);
    if (operator === null) {
        if (num1 === null) {
            num1 = number;
        } else {
            num1 += number;
        }
    } else {
        if (num2 === null) {
            num2 = number;
        } else {
            num2 += number;
        }
    }
}

function operatorClick(operator) {}

function clearDisplay() {}

function calculate() {}

function updateDisplay(value) {
    const display = document.getElementById("display");
    display.innerText = value;
}

