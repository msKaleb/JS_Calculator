const calculatorKeys = Array.from(document.getElementsByClassName("key"));
const display = document.getElementById("calculator__display");

$(document).ready(function() {

});

let operationList = [];
let isDecimal = false;

const addOperator = (operator, operand) => {
  operationList.push(operand, operator);
  display.value = operator;
  // console.log(operator);
}

const calculate = () => {
  for (let i = 0; i < operationList.length; i++) {
    
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
    
   }
  });
});
  

