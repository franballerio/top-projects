import React, { useState, useEffect } from 'react';
import './calculator.css';

// A mapping of operators to their calculation functions
const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand,
  '%': (firstOperand, secondOperand) => (secondOperand * 100) / firstOperand,
};

const Calculator = () => {
  // State variables to manage the calculator's internal state
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  // calculations history, we use an array of objects 
  // remember to create a new array to modify history
  const [history, setHistory] = useState([])
  useEffect( () => {
      let local = JSON.parse(localStorage.getItem("history"))
    setHistory(local || [])  
    }, [])

  // Handles number button clicks
  const handleNumberClick = (number) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(number));
      setWaitingForSecondOperand(false);
    } else {
      // If display is '0', replace it, otherwise append
      setDisplayValue(displayValue === '0' ? String(number) : displayValue + number);
    }
  };

  // Handles decimal point clicks
  const handleDecimalClick = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // Handles operator clicks (+, -, *, /)
  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
      setDisplayValue(String(nextOperator));
    } else if (operator) {
      // If an operator is already set, calculate the result first
      const result = performCalculation[operator](firstOperand, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // Handles the clear (AC) button
  const handleClearClick = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // Handles the equals (=) button
  const handleEqualsClick = () => {
    const secondOperand = parseFloat(displayValue);

    if (operator && firstOperand !== null) {
      const result = performCalculation[operator](firstOperand, secondOperand);

      let calculation = {
        operand1: firstOperand,
        op: operator,
        operand2: secondOperand,
      }

      const newHistory = [...history, calculation];
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
      setDisplayValue(String(result));
      setFirstOperand(null); // Reset for next calculation
      setOperator(null);
      setWaitingForSecondOperand(true);      
    }
  };
    
  // Toggles the sign of the current number
  const handleToggleSign = () => {
    setDisplayValue((parseFloat(displayValue) * -1).toString());
  };

  const openLink = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1', '_blank');
  }

  return (
    <div className='lol'>
        <div className="calculator">
            <div className="display-container">
                <div id="display">{displayValue}</div>
            </div>
            <div id="buttons">
                <button className="gray-btn" onClick={handleClearClick}>AC</button>
                <button className="gray-btn" onClick={handleToggleSign}>+/-</button>
                <button className="gray-btn" onClick={() => handleOperatorClick('%')}>%</button>
                <button className="orange-btn" onClick={() => handleOperatorClick('/')}>÷</button>
                
                <button className="dark-btn" onClick={() => handleNumberClick('7')}>7</button>
                <button className="dark-btn" onClick={() => handleNumberClick('8')}>8</button>
                <button className="dark-btn" onClick={() => handleNumberClick('9')}>9</button>
                <button className="orange-btn" onClick={() => handleOperatorClick('*')}>*</button>
                
                <button className="dark-btn" onClick={() => handleNumberClick('4')}>4</button>
                <button className="dark-btn" onClick={() => handleNumberClick('5')}>5</button>
                <button className="dark-btn" onClick={() => handleNumberClick('6')}>6</button>
                <button className="orange-btn" onClick={() => handleOperatorClick('-')}>−</button>
                
                <button className="dark-btn" onClick={() => handleNumberClick('1')}>1</button>
                <button className="dark-btn" onClick={() => handleNumberClick('2')}>2</button>
                <button className="dark-btn" onClick={() => handleNumberClick('3')}>3</button>
                <button className="orange-btn" onClick={() => handleOperatorClick('+')}>+</button>
                
                {/* The command icon button doesn't have a function, so it's just for display */}
                <button className="dark-btn calculator-icon" onClick={() => openLink()}>
                    <span className="calculator-icon-symbol">⌘</span>
                </button>
                <button className="dark-btn" onClick={() => handleNumberClick('0')}>0</button>
                <button className="dark-btn" onClick={handleDecimalClick}>.</button>
                <button className="orange-btn" onClick={handleEqualsClick}>=</button>
            </div>
        </div>

        <div className='history'>
            <h3 className="">History</h3>
            <ul className='calculations'>
                {
                    history && history.map(
                        (calculation) => <li>{calculation.operand1} {calculation.op} {calculation.operand2}</li>
                    )
                }
            </ul>
        </div>
    </div>
  );
};

export default Calculator;