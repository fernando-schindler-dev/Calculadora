const btns = document.querySelectorAll('.calculator input');
const result = document.querySelector('.result .screen');
const error = document.querySelector('.result .error');
let account = '';
let usedEqual = false;

function displayError(typeError) {
  error.innerText = typeError;
}

function addValueToAccount(value) {
  account += value;
}

function executeCalculator(value) {
  if (usedEqual) {
    account = '';
    result.innerText = '';
    usedEqual = false;
  }

  const condition1 = result.innerText.length === 0;
  const condition2 = value === '*' || value === '/';
  const condition3 = value === '+' || value === '-' || value === '.';
  const condition4 =
    account[account.length - 1] === '+' ||
    account[account.length - 1] === '-' ||
    account[account.length - 1] === '*' ||
    account[account.length - 1] === '/' ||
    account[account.length - 1] === '.';
  const condition5 = account[account.length - 2] === '/';
  const condition6 = account[account.length - 1] === '0';
  const condition7 = !(value === '.');
  const condition8 = value === '=';
  const condition9 = value === 'C';
  const condition10 = value === 'DEL';

  if (condition1 && condition8) {
    displayError('Não é possível calcular sem nenhum número digitado');
  } else if (condition1 && condition2) {
    displayError('Não é possível iniciar com os valores: × e ÷');
  } else if ((condition2 || condition3) && condition4) {
    displayError('Não é possível ter uma sequência com dois operadores');
  } else if (condition5 && condition6 && condition7) {
    displayError('Não é possível dividir qualquer número por zero');
  } else if (condition4 && condition8) {
    displayError('Não é possível calcular com um operador sozinho no final');
  } else if (condition9) {
    account = account.slice(0, account.length - 1);
    const resultLength = result.innerText.length;
    result.innerText = result.innerText.slice(0, resultLength - 1);
  } else if (condition10) {
    account = '';
    result.innerText = '';
  } else if (condition8) {
    result.innerText = eval(account);
    usedEqual = true;
  } else {
    addValueToAccount(value);
    return true;
  }
  return false;
}

function securityConditionsEval(valueToCheck) {
  const safeConditions =
    valueToCheck === 'DEL' ||
    valueToCheck === 'C' ||
    valueToCheck === '=' ||
    valueToCheck === '0' ||
    valueToCheck === '.' ||
    valueToCheck === '+' ||
    valueToCheck === '1' ||
    valueToCheck === '2' ||
    valueToCheck === '3' ||
    valueToCheck === '-' ||
    valueToCheck === '4' ||
    valueToCheck === '5' ||
    valueToCheck === '6' ||
    valueToCheck === '*' ||
    valueToCheck === '7' ||
    valueToCheck === '8' ||
    valueToCheck === '9' ||
    valueToCheck === '/';

  return safeConditions;
}

function formatValue(valueClicked) {
  let valueFormatted;

  if (valueClicked === '×') valueFormatted = '*';
  else if (valueClicked === '÷') valueFormatted = '/';

  return valueFormatted || valueClicked;
}

function handleClick(event) {
  error.innerText = '';

  const valueClicked = event.target.value;
  const valueFormatted = formatValue(valueClicked);

  let securityCheckResult;

  if (securityConditionsEval(valueFormatted))
    securityCheckResult = executeCalculator(valueFormatted);

  if (securityCheckResult) result.innerText += valueClicked;
}

btns.forEach((btn) => btn.addEventListener('click', handleClick));
