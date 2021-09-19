// selecting dom elements
const screen = document.querySelector(".screen");
const appLayout = document.querySelector(".grid-app")
const toggler = document.querySelector(".switcher")
const body = document.querySelector("body")
const toggle1 = document.getElementById("theme-1")
const toggle2 = document.getElementById("theme-2")
const toggle3 = document.getElementById("theme-3")
const dot = document.querySelector(".dot");


// calculator class
class Calculator {
  // creating object
  constructor(screen) {
    this.screen = screen;
    this.reset()
  }

  reset() {
    this.prevScreen = ""
    this.currScreen = ""
    this.operation = undefined;
  }

  delete() {
    // deleting on element from the screen
    this.currScreen = this.currScreen.toString().slice(0, -1);
  }

  appendNumber(number) {

    // grab the number that user pressed and added it to the screen
    this.currScreen = this.currScreen.toString() + number.toString()
  }

  chooseOperation(operation) {
    // grab the operation that user pressed
    this.operation = operation;
    this.prevScreen = this.currScreen
    this.currScreen = ""
  }

  compute() {
    this.result;
    const prev = parseFloat(this.prevScreen);
    const curr = parseFloat(this.currScreen);
    switch (this.operation) {
      case "+":
        this.result = prev + curr
        break
      case "-":
        this.result = prev - curr
        break
      case "*":
        this.result = prev * curr
        break
      case "/":
        this.result = prev / curr
        break
      default:
        return
    }
    this.currScreen = this.result
    this.operation = undefined
    this.prevScreen = ""
    this.result = undefined
  }

  updateDisplay() {
    screen.innerText = this.currScreen;
  }
}

const calculator = new Calculator(screen);

appLayout.addEventListener("click", (e) => {
  const target = e.target;
  console.log(target)
  if(target.classList.contains("grid-app")) {
    return
  } else if (target.innerText === "+" || target.innerText === "-" || target.innerText === "*" || target.innerText === "/" ){
    calculator.chooseOperation(target.innerText);
    calculator.updateDisplay()
  } else if (target.innerText === "=") {
    calculator.compute();
    calculator.updateDisplay();
  } else if(target.innerText === "RESET") {
    calculator.reset()
    calculator.updateDisplay();
  } else if(target.innerText === "Del") {
    calculator.delete()
    calculator.updateDisplay();
  } else {
    calculator.appendNumber(target.innerText)
    calculator.updateDisplay()
  }
})

document.addEventListener("keydown", (e) => {
  const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "Enter", "Backspace", "Delete"]
  keys.forEach((el) => {
    if(e.key === el) {
      if (el === "+" || el === "-" || el === "*" || el === "/") {
        calculator.chooseOperation(el);
        calculator.updateDisplay();
      } else if (el === "Enter") {
        calculator.compute();
        calculator.updateDisplay();
      } else if (el === "Backspace") {
        calculator.delete()
        calculator.updateDisplay();    
      } else if(el === "Delete") {
        calculator.reset()
        calculator.updateDisplay();
      } else {
        calculator.appendNumber(el);
        calculator.updateDisplay();
      }
    }
  })
})

// toggle themes
toggler.addEventListener("click", (e) => {
  e.preventDefault;
  const target = e.target
  if (target === toggle1) {
    toggle1.checked = true;
    toggle2.checked = false;
    toggle3.checked = false;
    body.classList.remove("default", "theme-2", "theme-3")
    body.classList.add("default")
    dot.style.marginLeft = 0;
  } else if (target === toggle2) {
    toggle2.checked = true;
    toggle3.checked = false;
    toggle1.checked = false;
    body.classList.remove("default", "theme-2", "theme-3")
    body.classList.add("theme-2")
    dot.style.marginLeft = "23px";
  } else if (target === toggle3) {
    toggle1.checked = false;
    toggle2.checked = false;
    toggle3.checked = true;
    body.classList.remove("default", "theme-2", "theme-3")
    body.classList.add("theme-3")
    dot.style.marginLeft = "46px";
  }
})