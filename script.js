const screen = document.querySelector("#calc_screen");
const buttons = document.querySelectorAll("button");
const control_clear = document.querySelector("#control_clear");
const control_opposite = document.querySelector("#control_opposite");
const control_percent = document.querySelector("#control_percent");
const control_float = document.querySelector("#control_float");
const control_equal = document.querySelector("#control_equal");

let selected_operator = null;
let first_operand = null;
let second_operand = null;
let display_value = 0;
screen.textContent = display_value;

function clearScreen(){
    selected_operator = null;
    first_operand = null;
    second_operand = null;
    display_value = 0;
    screen.textContent = 0;
}

// mathematical operations are done here
function operate(x, y, operator){
    x = parseFloat(x);
    y= parseFloat(y);
    if (operator == '+'){
        return x + y;
    } else if (operator == '-'){
        return x - y;
    } else if (operator == '/'){
        if (y === 0){
            return;
        } else {
            return x / y;
        }
    } else if (operator == '*'){
        return x * y;
    } else {
        return;
    }
}

function floatPoint(){
    if (display_value === 0){
        display_value += '.';
        first_operand = display_value;
    } else if (first_operand != null && selected_operator === null){
        if (first_operand.includes('.')){
            return;
        } else {
            first_operand += '.';
            display_value = first_operand;
        }
    } else if (selected_operator != null && second_operand === null){
        second_operand = '0.';
        display_value += second_operand;

    } else if (second_operand != null){
        if (second_operand.includes('.')){
            return;
        } else {
            second_operand += '.';
            display_value += '.';
        }
    }
    updateScreen();
}

function roundMe(num, places){
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function changeSign(){
    if (first_operand != null && selected_operator === null){
        first_operand = first_operand * -1;
        first_operand = first_operand.toString();
    } else if (second_operand != null && selected_operator){
        second_operand = second_operand * -1;
        second_operand = second_operand.toString();
    }
    updateScreen();
}

function addPercent(){
    if (first_operand != null && selected_operator === null){
        first_operand = first_operand / 100;
        first_operand = first_operand.toString();
    } else if (second_operand != null && selected_operator){
        second_operand = second_operand / 100;
        second_operand = second_operand.toString();
    }
    updateScreen();
}

control_clear.addEventListener('click', () => clearScreen());
control_opposite.addEventListener('click', () => changeSign());
control_percent.addEventListener('click', () => addPercent());
control_float.addEventListener('click', () => floatPoint());

function operatorSelect(i){
    if (first_operand && second_operand === null){
        if (buttons[i].textContent == '/'){
            selected_operator = '/';
        } else if (buttons[i].textContent == '*'){
            selected_operator = '*';
        } else if (buttons[i].textContent == '+'){
            selected_operator = '+';
        } else if (buttons[i].textContent == '-'){
            selected_operator = '-';
        }
        updateScreen();
    } else if (first_operand && second_operand && selected_operator){ 
        first_operand = roundMe(operate(first_operand, second_operand, selected_operator), 2);
        selected_operator = buttons[i].textContent;
        second_operand = null;
        updateScreen();
    } else {
        return;
    }
}

function selectOperand(i){
    if (first_operand === null){
        first_operand = buttons[i].textContent;
    } else if (selected_operator === null && second_operand === null) {
        first_operand += buttons[i].textContent;
    } else if (selected_operator != null && second_operand === null){
        second_operand = buttons[i].textContent;
    } else {
        second_operand += buttons[i].textContent;
    }
}

function updateScreen(){
    if (display_value === 0){
        display_value = first_operand;
    } else if (selected_operator === null){
        display_value = first_operand;
    } else if (selected_operator && second_operand === null){
        if (!display_value.endsWith(selected_operator)){
            display_value = first_operand + selected_operator
        }
    } else if (second_operand){
        display_value = first_operand + selected_operator + second_operand;
    }
    screen.textContent = display_value;
}

for (let i=0; i < buttons.length; i++){
    if (buttons[i].classList.contains('number', 'zero')){
        buttons[i].addEventListener('click', () => {
            selectOperand(i);
            updateScreen();
        });
    } else if (buttons[i].classList.contains('operator')){
        buttons[i].addEventListener('click', () => {
            operatorSelect(i);
            updateScreen();
        });
    }
}

function calculate(){
    if (second_operand == 0){
        screen.textContent = 'Oh. Not again.'
    } else if (first_operand && second_operand && selected_operator){
        screen.textContent = roundMe(operate(first_operand, second_operand, selected_operator), 2);
        first_operand = screen.textContent;
        selected_operator = null;
        second_operand = null;
    }
}

control_equal.addEventListener('click', () => calculate());

// keyboard support of unsophisticated nature
document.addEventListener('keypress', (e) => {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g;
    if (e.key.match(patternForNumbers)){
        e.preventDefault();
        if (first_operand === null){
            first_operand = e.key
        } else if (selected_operator === null && second_operand === null) {
            first_operand += e.key
        } else if (selected_operator != null && second_operand === null){
            second_operand = e.key
        } else {
            second_operand += e.key
        }
    }
    if (e.key === '.'){
        e.preventDefault();
        floatPoint();
    }
    if (e.key.match(patternForOperators)){
        e.preventDefault();
        if (first_operand && second_operand === null){
            if (e.key == '/'){
                selected_operator = '/';
            } else if (e.key == '*'){
                selected_operator = '*';
            } else if (e.key == '+'){
                selected_operator = '+';
            } else if (e.key == '-'){
                selected_operator = '-';
            }
            updateScreen();
        } else if (first_operand && second_operand && selected_operator){ 
            first_operand = roundMe(operate(first_operand, second_operand, selected_operator), 2);
            selected_operator = e.key;
            second_operand = null;
            updateScreen();
        } else {
            return;
        }
    }
    if (e.key === 'Enter' || e.key === '='){
        e.preventDefault();
        calculate();
    }
    if (e.key === 'Backspace'){ 
        e.preventDefault();
        if (first_operand === null){
            return;
        } else if (selected_operator === null && second_operand === null) {
            if (first_operand.length === 1){
                console.log('i was here')
                first_operand = null;
            } else {
                first_operand = first_operand.slice(0, first_operand.length - 1);
            }
        } else if (selected_operator != null && second_operand != null){
            if (second_operand.length === 1){
                second_operand = null;
            } else {
                second_operand = second_operand.slice(0, second_operand.length - 1);
            }
        }
    }
    updateScreen();
    console.log({first_operand, second_operand});
})