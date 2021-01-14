const btns = document.querySelectorAll(".calculadora input");
const resultado = document.querySelector(".resultado .visor");
const erro = document.querySelector(".resultado .erro");
let conta = "";
let utilizadoIgual = false;

function mostrarErro(tipoErro) {
  erro.innerText = tipoErro;
}

function addValorAConta(valor) {
  conta += valor;
}

function executarCalculadora(valor) {
  if (utilizadoIgual) {
    conta = "";
    resultado.innerText = "";
    utilizadoIgual = false;
  }

  const condicao1 = resultado.innerText.length === 0;
  const condicao2 = valor === "*" || valor === "/";
  const condicao3 = valor === "+" || valor === "-" || valor === ".";
  const condicao4 =
    conta[conta.length - 1] === "+" ||
    conta[conta.length - 1] === "-" ||
    conta[conta.length - 1] === "*" ||
    conta[conta.length - 1] === "/" ||
    conta[conta.length - 1] === ".";
  const condicao5 = conta[conta.length - 2] === "/";
  const condicao6 = conta[conta.length - 1] === "0";
  const condicao7 = !(valor === ".");
  const condicao8 = valor === "=";
  const condicao9 = valor === "C";
  const condicao10 = valor === "DEL";

  if (condicao1 && condicao8) {
    mostrarErro("Não é possível calcular sem nenhum número digitado");
  } else if (condicao1 && condicao2) {
    mostrarErro("Não é possível iniciar com os valores: × e ÷");
  } else if ((condicao2 || condicao3) && condicao4) {
    mostrarErro("Não é possível ter uma sequência com dois operadores");
  } else if (condicao5 && condicao6 && condicao7) {
    mostrarErro("Não é possível dividir qualquer número por zero");
  } else if (condicao4 && condicao8) {
    mostrarErro("Não é possível calcular com um operador sozinho no final");
  } else if (condicao9) {
    conta = conta.slice(0, conta.length - 1);
    const resultadoLength = resultado.innerText.length;
    resultado.innerText = resultado.innerText.slice(0, resultadoLength - 1);
  } else if (condicao10) {
    conta = "";
    resultado.innerText = "";
  } else if (condicao8) {
    resultado.innerText = eval(conta);
    utilizadoIgual = true;
  } else {
    addValorAConta(valor);
    return true;
  }
  return false;
}

function condicoesSegurancaEval(valorAVerificar) {
  const condicoesSeguras =
    valorAVerificar === "DEL" ||
    valorAVerificar === "C" ||
    valorAVerificar === "=" ||
    valorAVerificar === "0" ||
    valorAVerificar === "." ||
    valorAVerificar === "+" ||
    valorAVerificar === "1" ||
    valorAVerificar === "2" ||
    valorAVerificar === "3" ||
    valorAVerificar === "-" ||
    valorAVerificar === "4" ||
    valorAVerificar === "5" ||
    valorAVerificar === "6" ||
    valorAVerificar === "*" ||
    valorAVerificar === "7" ||
    valorAVerificar === "8" ||
    valorAVerificar === "9" ||
    valorAVerificar === "/";

  return condicoesSeguras;
}

function formatarValor(valorClicado) {
  let valorFormatado;

  if (valorClicado === "×") valorFormatado = "*";
  else if (valorClicado === "÷") valorFormatado = "/";

  return valorFormatado || valorClicado;
}

function cliqueBtn(event) {
  erro.innerText = "";

  const valorClicado = event.target.value;
  const valorFomatado = formatarValor(valorClicado);

  let vericacaoSeValorPodeSerAddAoVisor;

  if (condicoesSegurancaEval(valorFomatado))
    vericacaoSeValorPodeSerAddAoVisor = executarCalculadora(valorFomatado);

  if (vericacaoSeValorPodeSerAddAoVisor) resultado.innerText += valorClicado;
}

btns.forEach((btn) => btn.addEventListener("click", cliqueBtn));
