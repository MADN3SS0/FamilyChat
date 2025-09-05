const nomeInput = document.getElementById("nomeInput");
const remetenteSelect = document.getElementById("remetenteSelect");
const mensagemInput = document.getElementById("mensagemInput");
const enviarBtn = document.getElementById("enviarBtn");
const mensagensContainer = document.getElementById("mensagensContainer");

function salvarHistorico(nome, remetente, mensagem) {
  const historico = JSON.parse(localStorage.getItem("familyChatHistorico")) || [];
  historico.push({ nome, remetente, mensagem, data: new Date().toLocaleTimeString() });
  localStorage.setItem("familyChatHistorico", JSON.stringify(historico));
}

function carregarHistorico() {
  const historico = JSON.parse(localStorage.getItem("familyChatHistorico")) || [];
  mensagensContainer.innerHTML = "";
  historico.forEach(msg => {
    criarMensagem(msg.nome, msg.remetente, msg.mensagem, "remetente");
  });
}

function criarMensagem(nome, remetente, mensagem, tipo = "") {
  const div = document.createElement("div");
  div.classList.add("mensagem");
  if(tipo) div.classList.add(tipo);
  div.innerHTML = `<strong>${nome}</strong> para <strong>${remetente}</strong>: ${mensagem}`;
  mensagensContainer.appendChild(div);
  mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
}

function toast(text, tipo="") {
  const div = document.createElement("div");
  div.classList.add("mensagem");
  if(tipo) div.classList.add(tipo);
  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.right = "20px";
  div.style.zIndex = 9999;
  div.style.opacity = "0";
  div.innerText = text;
  document.body.appendChild(div);

  setTimeout(() => { div.style.opacity = "1"; }, 50);
  setTimeout(() => { 
    div.style.opacity = "0"; 
    setTimeout(() => div.remove(), 400);
  }, 3000);
}

if(localStorage.getItem("familyChatNome")) {
  nomeInput.value = localStorage.getItem("familyChatNome");
  nomeInput.disabled = true;
}

enviarBtn.addEventListener("click", () => {
  const nome = nomeInput.value.trim();
  const remetente = remetenteSelect.value;
  const mensagem = mensagemInput.value.trim();

  if(!nome || !mensagem) {
    toast("Preencha nome e mensagem!", "erro");
    return;
  }

  salvarHistorico(nome, remetente, mensagem);
  criarMensagem(nome, remetente, mensagem, "remetente");
  toast("Mensagem enviada com sucesso!", "sucesso");

  if(!localStorage.getItem("familyChatNome")) {
    localStorage.setItem("familyChatNome", nome);
    nomeInput.disabled = true;
  }

  mensagemInput.value = "";
});

window.addEventListener("load", carregarHistorico);
