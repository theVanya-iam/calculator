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
    operator = selected_operator;
    x = first_operand;
    y = second_operand;
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
control_percent.addEventListener('click', () => screen.textContent = (screen.textContent) * 0.01);
control_float.addEventListener('click', () => floatPoint());

function operations(i){
    if (buttons[i].textContent == '/'){
        screen.textContent = screen.textContent + '/';
        selected_operator = '/';
    } else if (buttons[i].textContent == '*'){
        screen.textContent = screen.textContent + '*';
        selected_operator = '*';
    } else if (buttons[i].textContent == '+'){
        screen.textContent = screen.textContent + '+';
        selected_operator = '+';
    } else if (buttons[i].textContent == '-'){
        screen.textContent = screen.textContent + '-';
        selected_operator = '-';
    }
}

function numOperations(i){
    if (selected_operator === 0){
        if (display_value === '0' || display_value === 0){
            display_value = buttons[i].textContent;
        } else if (first_operand == true) {
            display_value += buttons[i].textContent;
        }        
    } else if (first_operand == true && selected_operator == true){
        second_operand = buttons[i].textContent;
        display_value = first_operand + ' ' + `${selected_operator}` + ' ' + second_operand;
        return;  
    }
}

function updateScreen(){
    screen.textContent = display_value;
    
}

for (let i=0; i < buttons.length; i++){
    if (buttons[i].classList.contains('number')){
        buttons[i].addEventListener('click', () => {
            numOperations(i);
            updateScreen();
        });
    } else if (buttons[i].classList.contains('operator')){
        buttons[i].addEventListener('click', () => {
            operations(i)
            updateScreen()
        });
    }
}

control_equal.addEventListener('click', () => {
    operate(first_operand, second_operand, selected_operator)
    updateScreen();
    return;
});