let allButtons = document.querySelectorAll("button");

Array.from(allButtons).forEach(btn => {
    let numPattern = "num-";
    let numPatternLocation = btn.id.search(numPattern);

    if(numPatternLocation === -1) return;

    let numberPressed = +(btn.id.slice(numPattern.length + numPatternLocation));
    btn.addEventListener("click", (e) => {
        console.log(numberPressed);
    });
});