"use strict";

let num1 = null;
let operator = null;

function numberClick(number) {
    updateDisplay(number);
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
            num2 += number;
        }
    }
}

function operatorClick(operator) {}

function clearDisplay() {}

function calculate() {
    
}

function updateDisplay(value) {
    display.innerText = value;
}

function toggleSign() {}

function toggleSign() {}