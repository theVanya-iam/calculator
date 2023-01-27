const screen = document.querySelector("#calc_screen");
const buttons = document.querySelectorAll("button");
const control_clear = document.querySelector("#control_clear");
const control_opposite = document.querySelector("#control_opposite");
const control_percent = document.querySelector("#control_percent");
const control_divide = document.querySelector("#control_divide");
const control_mult = document.querySelector("#control_mult");
const control_subtr = document.querySelector("#control_subtr");
const control_add = document.querySelector("#control_add");
const control_float = document.querySelector("#control_float");
const control_equal = document.querySelector("#control_equal");

let currentValue = screen.textContent;
let selectedOperator = null;

control_clear.addEventListener('click', () => screen.textContent = 0);
control_opposite.addEventListener('click', () => screen.textContent = -(screen.textContent));
control_percent.addEventListener('click', () => screen.textContent = (screen.textContent) * 0.01);
control_float.addEventListener('click', () => screen.textContent = screen.textContent + '.');

function operations(i){
    if (buttons[i].textContent == '/'){
        screen.textContent = screen.textContent + '/';
        selectedOperator = '/';
    } else if (buttons[i].textContent == '*'){
        screen.textContent = screen.textContent + '*';
        selectedOperator = '*';
    } else if (buttons[i].textContent == '+'){
        screen.textContent = screen.textContent + '+';
        selectedOperator = '+';
    } else if (buttons[i].textContent == '-'){
        screen.textContent = screen.textContent + '-';
        selectedOperator = '-';
    }
}

function numOperations(i){
    if (screen.textContent == 0){
        screen.textContent = buttons[i].textContent;
    } else {
    screen.textContent += buttons[i].textContent;
    }
    return;
}

for (let i=0; i < buttons.length; i++){
    if (buttons[i].classList.contains('number')){
        buttons[i].addEventListener('click', () => numOperations(i));
    } else if (buttons[i].classList.contains('operator')){
        buttons[i].addEventListener('click', () => operations(i));
    }
}

//function calculate(){
//    const work = screen.textContent
//}