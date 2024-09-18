const calculatorKeys = Array.from(document.getElementsByClassName("key"));
const display = document.getElementById("calculator__display");
const res = document.getElementById("res");
const msg = document.getElementById("msg");

$(document).ready(function() {

});

let operationList = [];
let isDecimal = false;
let gotResult = false;

const operatorToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "×": (x, y) => x * y,
  "÷": (x, y) => x / y,
}

const getSign = {
  "+": (x) => x,
  "-": (x) => -x,
}

const addOperator = (operator, operand) => {
  if (isNaN(operand)){
    operationList.pop();
    operationList.push(operator);
  } else {
    operationList.push(operand, operator);
  }
  display.value = operator;
}

const countDecimals = (num) => {
  numString = num.toString();

  if (numString.indexOf(".") === -1) {
    return 0;
  } else {
    return numString.split(".")[1].length;
  }
}

const calculate = () => {
  const parsedOperationList = [];
  const calculationArray = [];
  let result = 0;

  // first loop for high priority operators (*, /)
  for (let i = 0; i < operationList.length; i++) {
    if (operationList[i] == "×" || operationList[i] == "÷") {
      const operationResult = operatorToFunction[operationList[i]](
        parsedOperationList[parsedOperationList.length - 1], 
        operationList[i + 1]
      );
      parsedOperationList.pop();
      parsedOperationList.push(operationResult);
      i++;
      // debugging
      // res.textContent = "res: " + operationResult;
    } else {
      parsedOperationList.push(operationList[i]);
    }
  }

  // second loop with low priority operators (+, -)
  for (let i = 0; i < parsedOperationList.length; i++) {
    if (parsedOperationList[i] == "+" || parsedOperationList[i] == "-") {
      const toPush = getSign[parsedOperationList[i]](parsedOperationList[i + 1]);
      calculationArray.push(Number(toPush));
      i++;
    } else {
      const toPush = parsedOperationList[i];
      calculationArray.push(Number(toPush));
    }
  }
  result = calculationArray.reduce((accumulator, current) => 
    accumulator + current, 0);

  // debugging
  // msg.textContent = "msg: " + parsedOperationList.join(" ");
  // msg.textContent = "msg: " + calculationArray.join("|");
  // res.textContent = "res: " + result;
  display.value = countDecimals(result) > 10 ? result.toFixed(10) : result;
  operationList = [];
}

calculatorKeys.forEach((key) => {
  key.addEventListener("click", (value) => {
    const content = value.target.textContent;
    
    if (key.classList.contains("number")) {
      if (gotResult) {
        gotResult = false;
        display.value = "";
      }
      display.value === "0" || isNaN(Number(display.value)) ? display.value = content : display.value += content;
    } else if (key.classList.contains("ac")) {
      display.value = "0";
      operationList = [];
      isDecimal = false;
      // msg.textContent = "";
      // res.textContent = "";
    } else if (key.classList.contains("operator")) {
      addOperator(content, display.value);
      isDecimal = false;
    } else if (key.classList.contains("decimal") && !isDecimal) {
      gotResult ? display.value = "0." : display.value += ".";
      gotResult = false;
      isDecimal = true;
    } else if (key.classList.contains("equals") && !isNaN(Number(display.value))) {
      operationList.push(display.value);
      calculate();
      msg.textContent = operationList;
      gotResult = true;
    }
    /*} else if (key.classList.contains("equals")) {
      operationList.push(display.value);
      if (isNaN(operationList[operationList.length - 1])) {
        alert("Invalid expression")
      } else {
        calculate();
        msg.textContent = operationList;
        gotResult = true;
      }
      // isNaN(operationList[operationList.length - 1]) ? alert("Invalid expression") : calculate();
   }*/
  });
});
  

