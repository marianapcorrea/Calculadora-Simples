const display = document.getElementById("display");
const numbers = document.querySelectorAll("[id*=key]");
const operators = document.querySelectorAll("[id*=operator]");

let newNumber = true;
let selectedOperator;
let previousNumber;

const pendingOperation = () => selectedOperator !== undefined;

const calculate = () => {
    if (pendingOperation()) {
        newNumber = true;
        const currentNumber = parseFloat(display.textContent);
        result = eval(`${previousNumber}${selectedOperator}${currentNumber}`);
        updateDisplay(result);
    }
};

const updateDisplay = (value) => {
    if (newNumber) {
        display.textContent = value;
        newNumber = false;
    } else {
        display.textContent += value;
    }
};

const insertNumber = (event) => updateDisplay(event.target.textContent);
numbers.forEach((number) => number.addEventListener("click", insertNumber));

const selectOperator = (event) => {
    if (!newNumber) {
        calculate();
        newNumber = true;
        selectedOperator = event.target.textContent;
        previousNumber = parseFloat(display.textContent);
        console.log(previousNumber);
    }
};
operators.forEach((operator) => operator.addEventListener("click", selectOperator));

const triggerEqualSign = () => {
    calculate();
    selectedOperator = undefined;
};
document.getElementById("equal").addEventListener("click", triggerEqualSign);

const triggerClearScreen = () => (display.textContent = "");
document.getElementById("clearScreen").addEventListener("click", triggerClearScreen);

const triggerClearOperation = () => {
    triggerClearScreen();
    newNumber = true;
    previousNumber = undefined;
};
document.getElementById("clearOperation").addEventListener("click", triggerClearOperation);

const triggerBackspace = () => (display.textContent = display.textContent.slice(0, -1));
document.getElementById("backspace").addEventListener("click", triggerBackspace);
