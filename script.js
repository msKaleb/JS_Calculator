const calculatorKeys = Array.from(document.getElementsByClassName("key"));
const display = document.getElementById("calculator__display");
const res = document.getElementById("res");

$(document).ready(function() {

});

let operationList = [];
let isDecimal = false;

const operatorToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "×": (x, y) => x * y,
  "÷": (x, y) => x / y,
}

const addOperator = (operator, operand) => {
  operationList.push(operand, operator);
  display.value = operator;
  // console.log(operator);
}

const calculate = () => {
  res.textContent = "calculate() from function";
  
  // first loop for high priority operators
  // TODO: update operationList array with new numbers, maybe removing that item
  for (let i = 0; i < operationList.length; i++) {
    if (operationList[i] == "×" || operationList[i] == "÷") {
      res.textContent = "calculate() from loop";
      res.textContent = operatorToFunction[operationList[i]](operationList[i - 1], operationList[i + 1]);
    }
  }
}

calculatorKeys.forEach((key) => {
  key.addEventListener("click", (value) => {
    const content = value.target.textContent;
    /*if (!isNaN(Number(num))) {
      display.value === "0" ? display.value = num : display.value += num;
    } else if (value.target.textContent === "AC") {
      display.value = "0";
    }*/
   if (key.classList.contains("number")) {
     display.value === "0" || isNaN(Number(display.value)) ? display.value = content : display.value += content;
    } else if (key.classList.contains("ac")) {
      display.value = "0";
      operationList = [];
    } else if (key.classList.contains("operator")) {
      addOperator(content, display.value);
      console.log(operationList);
    } else if (key.classList.contains("decimal") && !isDecimal) {
      display.value += ".";
      isDecimal = true;
    } else if (key.classList.contains("equals")) {
      operationList.push(display.value);
      res.textContent = isNaN(operationList[operationList.length - 1]);
      isNaN(operationList[operationList.length - 1]) ? alert("Invalid expression") : calculate();
   }
  });
});
  

