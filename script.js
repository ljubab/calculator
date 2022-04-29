let allButtons = document.querySelectorAll("button");
let calculatorDisplay = document.querySelector(".calculator-display");

let currentNum = "";

// calculatorDisplay.textContent = firstNumber;

let firstNumber = undefined;
let secondNumber = undefined;

function updateNumbers() {
    if(secondNumber === undefined) {
        firstNumber = currentNum;
    } else {
        secondNumber = currentNum;
    }
}

function numberButtonPressed(btn) {
    let numPattern = "num-";
    let numPatternLocation = btn.id.search(numPattern);

    if(numPatternLocation === -1) return;

    let numberPressed = +(btn.id.slice(numPattern.length + numPatternLocation));
    btn.addEventListener("click", (e) => {
        currentNum += `${numberPressed}`;
        calculatorDisplay.textContent = currentNum;
        updateNumbers();
    });
}

function clearButtonPressed(btn) {
    let pattern = "clear";
    let clearPatternLocation = btn.id.search(pattern);

    if(clearPatternLocation === -1) return;

    btn.addEventListener("click", (e) => {
        currentNum = currentNum.slice(0, currentNum.length - 1);
        calculatorDisplay.textContent = currentNum;
        updateNumbers();
    });
}

function acButtonPressed(btn) {
    let pattern = "ac";
    let acPatternLocation = btn.id.search(pattern);

    if(acPatternLocation === -1) return;

    btn.addEventListener("click", (e) => {
        firstNumber = secondNumber = undefined;
        currentNum = "";
        // calculatorDisplay.textContent = firstNumber;
        calculatorDisplay.textContent = currentNum;
        updateNumbers();
    });
}

function dotButtonPressed(btn) {
    let pattern = "dot";
    let dotPatternLocation = btn.id.search(pattern);

    if(dotPatternLocation === -1) return;

    btn.addEventListener("click", (e) => {
        let isThereAny = (currentNum.indexOf('.') !== -1);
        if(isThereAny) return;
        currentNum += ".";
        // calculatorDisplay.textContent = firstNumber;
        calculatorDisplay.textContent = currentNum;
        updateNumbers();
    });
}

Array.from(allButtons).forEach(btn => {
    numberButtonPressed(btn);
    clearButtonPressed(btn);
    acButtonPressed(btn);
    dotButtonPressed(btn);
});