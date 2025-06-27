"use strict";

let num1 = null;
let operator = null;
let num2 = null;
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
        updateDisplay(num2);
        return;
    }
}

function clearDisplay() {
    display.innerText = "0";
    num1 = null;
    num2 = null;
    operator = null;
}

function operatorClick(operator_clicked) {
    if (num1 === null) {
        return;
    } 
    if (num2 != null) {
        res = calculate()
        
        display.innerText = res
        num1 = res
        num2 = null
        operator = operator_clicked
        return;
    } else {
        operator = operator_clicked
        display.innerText = operator
        return;
    }
}


function calculate() {
    
}

function updateDisplay(value) {
    display.innerText = value;
}

function toggleSign() {}