document.addEventListener("DOMContentLoaded", function (){

  //I used this tutorial to complete my FrontEndMentor Challenge :
  //https://freshman.tech/calculator/

  themebttn1();

  const calculator = {
    //Hold the value that will be showing on the display
    displayValue: '0',
    //First value
    firstOperand: null,
    //Checks whether the operator and operand have been completed
    waitingForSecondOperand: false,
    //Save an operator for the math expression
    operator: null,
  };

  function updateDisplay() {
    const display = document.querySelector('.screen');
    //value update on the display value
    display.value = calculator.displayValue;
  }

  //Keys
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', (event) => {

    const { target } = event;

    //checking by the type if it is a button
    if (!target.matches('button')) {
      return;
    }
    //checking wich is the button by the class
    if (target.classList.contains('operador')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }

    if (target.classList.contains('clearbt')) {
      resetCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains('delete')) {
      deleteDigit();
      updateDisplay();
      return;
    }

    inputDigit(target.value);
    updateDisplay();
  });

  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      //verify if the display value = 0, if yes, put the value. Else, add the number
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
  }

  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = '0.'
      calculator.waitingForSecondOperand = false;
      return
    }
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }

  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    // convert the value of the display to a float Number
    const inputValue = parseFloat(displayValue);
    //if the user want to change the operator: 
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      console.log(calculator);
      return;
    }
    //Verify if the first Number is a null value and the input value isn't a NaN 
    if (firstOperand === null && !isNaN(inputValue)) {
      //Update first number property
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      calculator.displayValue = `${parseFloat(result.toFixed(7))}`;

      calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }
  
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }

    return secondOperand;
  }
 
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  }

  function deleteDigit() {
    calculator.displayValue = calculator.displayValue.substring(0, calculator.displayValue.length - 1);
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  } 
     
});
 
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

//TEMA AZUL ESCURO
function themebttn1(){
  document.getElementById("sldr").style.left = "3px";
  setTheme("theme-1");
}

//TEMA BRANCO
function themebttn2(){
  document.getElementById("sldr").style.left = "24px";
  setTheme("theme-2");
}

//TEMA ROXO
function themebttn3(){
  document.getElementById("sldr").style.left = "44px";
  setTheme("theme-3");
}