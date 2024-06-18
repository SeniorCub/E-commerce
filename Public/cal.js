const inputs = document.querySelector('.inputs')

const one = document.querySelector('.btn1').addEventListener('click', () => {
     inputs.value+="1"
});
const two = document.querySelector('.btn2').addEventListener('click', () => {
     inputs.value+="2"
});
const three = document.querySelector('.btn3').addEventListener('click', () => {
     inputs.value+="3"
});
const four = document.querySelector('.btn4').addEventListener('click', () => {
     inputs.value+="4"
});
const five = document.querySelector('.btn5').addEventListener('click', () => {
     inputs.value+="5"
});
const six = document.querySelector('.btn6').addEventListener('click', () => {
     inputs.value+="6"
});
const seven = document.querySelector('.btn7').addEventListener('click', () => {
     inputs.value+="7"
});
const eight = document.querySelector('.btn8').addEventListener('click', () => {
     inputs.value+="8"
});
const nine = document.querySelector('.btn9').addEventListener('click', () => {
     inputs.value+="9"
});
const zero = document.querySelector('.btn0').addEventListener('click', () => {
     inputs.value+="0"
});
const add = document.querySelector('.btnp').addEventListener('click', () => {
     inputs.value+="+"
});
const sub = document.querySelector('.btnm').addEventListener('click', () => {
     inputs.value+="-"
});
const divid = document.querySelector('.btnd').addEventListener('click', () => {
     inputs.value+="/"
});
const multi = document.querySelector('.btnMul').addEventListener('click', () => {
     inputs.value+="*"
});

const equ = document.querySelector('.btnEqu').addEventListener('click', () => {
     if (inputs.value !="") {
          inputs.value = eval(inputs.value)
          
     } else {
          alert('Error')
     }
});

// Clear display
function clearDisplay() {
    inputs.value = "";
}

// Calculate result
function calculate() {
    try {
        inputs.value = eval(inputs.value);
    } catch (error) {
        inputs.value = "Error";
    }
}

// Delete last character
function deleteLastCharacter() {
    inputs.value = inputs.value.slice(0, -1);
}