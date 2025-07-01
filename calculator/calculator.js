"use strict";

let operand1 = null;
let operator = null;
let operand2 = null;
const display = document.getElementById("display");

function numberClick(number) {
    if (operand1 === null && operand2 === null) {
        if (number === "0") {
            // Do nothing if the first number is 0 and no operator is selected
            return;
        } else if (number === ".") {
            // If the first number is not set, start with 0.
            operand1 = "0.";
            updateDisplay(operand1);
            return;
        }
    }
    if (operator === null) {
        if (operand1 === null) {
            operand1 = number;
        } else {
            if (operand1.length >= 8) {
                // Limit the length of the number to 10 digits
                return;
            } else {
                operand1 += number;
            }
        }
        updateDisplay(operand1);
        return;
    } else {
        if (operand2 === null) {
            operand2 = number;
        } else {
            if (operand2.length >= 8) {
                // Limit the length of the number to 10 digits
                return;
            } else {
                operand2 += number;
            }
        }
        updateDisplay(operand2);
        return;
    }
}

function clearDisplay() {
    display.innerText = "0";
    operand1 = null;
    operand2 = null;
    operator = null;
}

function operatorClick(operator_clicked) {
    if (operand1 === null) {
        return;
    } 
    if (operand2 != null) {
        res = calculate()
        
        display.innerText = res
        operand1 = res
        operand2 = null
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