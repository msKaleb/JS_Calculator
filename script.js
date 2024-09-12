const calculatorKeys = Array.from(document.getElementsByClassName("key"));
const display = document.getElementById("calculator__display");

$(document).ready(function() {

});

// TODO: maybe use action=addNumber and action=calculate, etc in HTML

calculatorKeys.forEach((key) => {
  key.addEventListener("click", (value) => {
    const num = value.target.textContent;
    if (!isNaN(Number(num))) {
      console.log(num);
      display.value !== "0" ? display.value += num : display.value = num;
    } else if (value.target.textContent === "AC") {
      display.value = "0";
    }
  });
});
  

