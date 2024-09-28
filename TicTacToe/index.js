const inputNameX = document.getElementById("playerX"); //Obtém o elemento de entrada para o jogador X Esse input será usado para capturar o nome do jogador X.
const inputNameO = document.getElementById("playerO"); // Obtém o elemento de entrada para o jogador O Esse input será usado para capturar o nome do jogador O.
const vezDeJogar = document.getElementById("vezDeJogar"); // Obtém o elemento da vez de jogar Esse input será usado para que acompanhemos quem deve jogar
const root = document.querySelector(":root"); // pega o elemento root das cores principais do CSS
const playersPlace = document.querySelector(".top");
const campos = document.querySelectorAll(".campo");
const header = document.querySelector(".header");
let pointXid = document.getElementById("pointX");
let pointOid = document.getElementById("pointO");

const players = []; //array para salvar os dois jogadores

let pointOvar = 0;
let pointXvar = 0;

document.getElementById("savePlayers").addEventListener("click", function (ev) {
  ev.preventDefault();

  if (inputNameX.value === "" || inputNameO.value === "") {
    window.alert("Digite o nome dos jogadores");
  } else {
    players.push(inputNameX.value, inputNameO.value); //salva os elementos no array players

    playersPlace.remove(); //remove o conteudo da div

    const div = document.createElement("div"); //recria a div
    div.className = "top"; //adiciona a classe a qual ela possuia para manter o css

    const playerXlabel = document.createElement("label"); //recria os players adicionando o nome deles ja salvos anteriormente
    playerXlabel.innerText = "Player X: " + players[0] + " ";
    const pointXlbl = document.createElement("label"); //cria a pontuação
    pointXlbl.innerText = pointXvar;
    pointXlbl.id = "pointX";

    div.appendChild(playerXlabel); //adiciona o player na div
    div.appendChild(pointXlbl); //adiciona pontuação
    div.appendChild(document.createElement("br")); //pula linha :p

    const playerOlabel = document.createElement("label");
    playerOlabel.innerText = "Player O: " + players[1] + " ";
    const pointOlbl = document.createElement("label"); //cria a pontuação
    pointOlbl.innerText = pointOvar;
    pointOlbl.id = "pointO";

    div.appendChild(playerOlabel);
    div.appendChild(pointOlbl); //adiciona pontuação
    header.appendChild(div); //adiciona a div de volta ao header

    pointXid = document.getElementById("pointX");
    pointOid = document.getElementById("pointO");

    vezDeJogar.value = "X"; //instrui que é a vez do player X

    campos.forEach(function (campo) {
      campo.removeAttribute("disabled");
    });
  }
});

let jogadas;
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.querySelectorAll(".campo").forEach(function (button) {
  button.addEventListener("click", function () {
    if (header.dataset.value === "X") {
      button.value = "X"; //adiciona o texto ao botao
      button.innerText = "X"; //troca a exibição
      button.disabled = true; //desabilita o botao para que nao seja clicado

      checkWinner();

      vezDeJogar.value = "O"; //mostra ao usuario quem deve jogar
      header.dataset.value = "O"; //troca a vez do jogador
      jogadas++;
    } else {
      button.value = "O";
      button.innerText = "O";

      checkWinner();

      button.disabled = true;
      vezDeJogar.value = "X";
      header.dataset.value = "X";
      jogadas++;
    }
  });
});

// Função para verificar se há um vencedor
function checkWinner() {
  const buttons = document.querySelectorAll(".campo"); // obtém os botões que representam as jogadas

  for (let condition of winConditions) {
    const [a, b, c] = condition; // obtém os índices das condições de vitória

    // Verifica se os valores dos botões são iguais e não vazios
    if (
      buttons[a].value === buttons[b].value &&
      buttons[b].value === buttons[c].value &&
      buttons[a].value !== ""
    ) {
      if (buttons[a].value === "X") {
        alert("O jogador " + inputNameX.value + " venceu"); // Alerta com o jogador vencedor

        //adiciona estilo aos botoes vencedores
        buttons[a].style.borderColor = "#3a6073";
        buttons[b].style.borderColor = "#3a6073";
        buttons[c].style.borderColor = "#3a6073";

        buttons[a].style.backgroundColor = "#3a7bd5";
        buttons[b].style.backgroundColor = "#3a7bd5";
        buttons[c].style.backgroundColor = "#3a7bd5";

        //adiciona a pontuação na tela
        pointXvar++;
        pointXid.innerText = pointXvar;
      } else {
        alert("O jogador " + inputNameO.value + " venceu");

        buttons[a].style.borderColor = "#3a6073";
        buttons[b].style.borderColor = "#3a6073";
        buttons[c].style.borderColor = "#3a6073";

        buttons[a].style.backgroundColor = "#3a7bd5";
        buttons[b].style.backgroundColor = "#3a7bd5";
        buttons[c].style.backgroundColor = "#3a7bd5";

        pointOvar++;
        pointOid.innerText = pointOvar;
      }
      buttons.forEach(function (btn) {
        btn.setAttribute("disabled", true);
      });
      return;
    }
  }

  // Verifica se houve um empate
  if (jogadas === 8) {
    alert("Empate!"); // Alerta de empate
  }
}

document.getElementById("reiniciar").addEventListener("click", function () {
  campos.forEach(function (btn) {
    if (vezDeJogar.value != "") {
      //redefine todos os valores para poder reinicar o game
      btn.style.borderColor = ""; // remove cor da borda
      btn.style.backgroundColor = ""; // remove cor de fundo
      btn.removeAttribute("disabled");
      btn.value = "";
      btn.innerText = "";
      jogadas = 0;
    }
  });
});
