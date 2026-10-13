document.addEventListener("DOMContentLoaded", () => {
  const inputDisplay = document.getElementById("Input_Display");
  const resultDisplay = document.getElementById("Result_Display");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  const operators = ["+", "-", "x", "÷", "%"];

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.innerText;

      // 1. All Clear (AC)
      if (value === "AC") {
        currentInput = "";
        inputDisplay.innerText = "";
        resultDisplay.innerText = "";
      } 
      // 2. Delete (DEL)
      else if (value === "⌫") {
        currentInput = currentInput.slice(0, -1);
        updateDisplays();
      } 
      // 3. Equals (=)
      else if (value === "=") {
        try {
          let evalString = currentInput.replace(/x/g, "*").replace(/÷/g, "/");
          let result = eval(evalString);
          
          if (result !== undefined && !isNaN(result)) {
            currentInput = result.toString();
            inputDisplay.innerText = currentInput;
            resultDisplay.innerText = ""; 
          }
        } catch (error) {
          // Incomplete expression ke liye
        }
      } 
      // 4. Numbers & Operators (+, -,x , ÷, %, .)
      else {
        if (operators.includes(value)) {
          let lastChar = currentInput.slice(-1);
          // Agar last character bhi operator hai, toh use replace kar do
          if (operators.includes(lastChar)) {
            currentInput = currentInput.slice(0, -1) + value;
          } else {
            currentInput += value;
          }
        } else {
          currentInput += value;
        }
        updateDisplays();
      }
    });
  });

  // Live calculation aur display update karne ka function
  function updateDisplays() {
    inputDisplay.innerText = currentInput;

    try {
      let evalString = currentInput.replace(/x/g, "*").replace(/÷/g, "/").replace(/%/g, "/100");

      if (/[\+\-\*\/]$/.test(evalString)) {
        let subString = evalString.slice(0, -1);
        let res = eval(subString);
        if (res !== undefined && !isNaN(res)) {
          resultDisplay.innerText = res;
        }
        return;
      }

      let result = eval(evalString);
      if (result !== undefined && !isNaN(result) && result.toString() !== currentInput) {
        resultDisplay.innerText = result;
      } else {
        resultDisplay.innerText = "";
      }
    } catch (error) {
      resultDisplay.innerText = "";
    }
  }
});
