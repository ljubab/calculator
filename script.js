let allButtons = document.querySelectorAll("button");
let calculatorDisplay = document.querySelector(".calculator-display");

let currentNum = "";

// calculatorDisplay.textContent = firstNumber;

let firstNumber = undefined;
let secondNumber = undefined;

let currentOperation = undefined;

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
    let pattern = "all-clear";
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

function addition(a, b) {
    return `${(+a) + (+b)}`;
}

function subtraction(a, b) {
    return `${(+a) - (+b)}`;
}

function division(a, b) {
    let value = (+a) / (+b);
    if(!isFinite(value)) {
        return `You cannot divide with 0`;
    } else {
        return `${(+a) / (+b)}`;
    }
}

function multiplication(a, b) {
    return `${(+a) * (+b)}`;
}

function operate() {
    let isThereTwoNumbers = true;

    console.log(currentOperation);

    switch(currentOperation) {
        case "addition":
            currentNum = addition(firstNumber, secondNumber);
            break;
        case "subtraction":
            currentNum = subtraction(firstNumber, secondNumber);
            break;
        case "division":
            currentNum = division(firstNumber, secondNumber);
            break;
        case "multiplication":
            currentNum = multiplication(firstNumber, secondNumber);
            break;
        default:
            isThereTwoNumbers = false;
            break;
    }

    if(!isThereTwoNumbers) return;
    
    firstNumber = currentNum;
    secondNumber = undefined;

    calculatorDisplay.textContent = currentNum;
}

function operationButtonPressed(btn) {
    let pattern = "ope-";
    let operationPatternLocation = btn.id.search(pattern);

    if(operationPatternLocation === -1) return;

    btn.addEventListener("click", (e) => {
        let isSecondNumberUndefined = (secondNumber === undefined);
        if(!isSecondNumberUndefined) {
            console.log("operated");
            operate();
        }

        currentOperation = btn.id.slice(operationPatternLocation + pattern.length);
        console.log(currentOperation);
        secondNumber = "";
        currentNum = "";
        calculatorDisplay.textContent = currentNum;

        if(!isSecondNumberUndefined) {
            calculatorDisplay.textContent = firstNumber;
        }
    });

}

function equalButtonPressed(btn) {
    let pattern = "equal";
    let equalPatternLocation = btn.id.search(pattern);

    if(equalPatternLocation === -1) return;

    btn.addEventListener("click", (e) => {
        operate();
    });
}

Array.from(allButtons).forEach(btn => {
    numberButtonPressed(btn);
    clearButtonPressed(btn);
    acButtonPressed(btn);
    dotButtonPressed(btn);
    operationButtonPressed(btn);
    equalButtonPressed(btn);
});