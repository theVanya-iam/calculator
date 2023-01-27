const screen = document.querySelector("#calc_screen");
const buttons = document.querySelectorAll("button");
const control_clear = document.querySelector("#control_clear");
const control_opposite = document.querySelector("#control_opposite");
const control_percent = document.querySelector("#control_percent");
const control_float = document.querySelector("#control_float");
const control_equal = document.querySelector("#control_equal");

let selected_operator = 0;
let first_operand = 0;
let second_operand = 0;
let display_value = 0;
screen.textContent = 0;

function clearScreen(){
    selected_operator = 0;
    first_operand = 0;
    second_operand = 0;
    display_value = 0;
    screen.textContent = 0;
}

function operate(x, y, operator){
    x = parseInt(x);
    y= parseInt(y);
    if (operator == '+'){
        return x + y;
    } else if (operator == '-'){
        return x - y;
    } else if (operator == '/'){
        return x / y;
    } else if (operator == '*'){
        return x * y;
    } else {
        return;
    }
}

control_clear.addEventListener('click', () => clearScreen());
control_opposite.addEventListener('click', () => screen.textContent = -(screen.textContent));
control_percent.addEventListener('click', () => screen.textContent = parseInt(screen.textContent) * 0.01);
//control_float.addEventListener('click', () => floatPoint());

function operatorSelect(i){
    if (buttons[i].textContent == '/'){
        selected_operator = '/';
    } else if (buttons[i].textContent == '*'){
        selected_operator = '*';
    } else if (buttons[i].textContent == '+'){
        selected_operator = '+';
    } else if (buttons[i].textContent == '-'){
        selected_operator = '-';
    }
}

function numOperations(i){
    if (!selected_operator){
        if (!first_operand){
            first_operand = buttons[i].textContent;
        } else {
            first_operand += buttons[i].textContent;
        }        
    } else if (!second_operand){
        second_operand = buttons[i].textContent;
    } else{
        second_operand += buttons[i].textContent;
    }
}

function updateScreen(){
    if (display_value == 0 && first_operand){
        display_value = first_operand;
    } else if (!selected_operator){
        display_value = first_operand;
        console.log({display_value});
    } else if (selected_operator && !second_operand){
        display_value += selected_operator;
        console.log({display_value});
    } else if (second_operand){
        display_value = first_operand + selected_operator + second_operand;
        console.log({display_value});
    }
    screen.textContent = display_value;
    console.log(screen.textContent);
}

for (let i=0; i < buttons.length; i++){
    if (buttons[i].classList.contains('number')){
        buttons[i].addEventListener('click', () => {
            numOperations(i);
            updateScreen();
        });
    } else if (buttons[i].classList.contains('operator')){
        buttons[i].addEventListener('click', () => {
            operatorSelect(i)
            updateScreen();
        });
    }
}

control_equal.addEventListener('click', () => {
    if (first_operand && second_operand && selected_operator){
        screen.textContent = operate(first_operand, second_operand, selected_operator);
        first_operand = screen.textContent;
        display_value = 0;
        selected_operator = 0;
        second_operand = 0;
        console.log({first_operand, second_operand, selected_operator})
    }
    return;
});