const nomeUsuario = document.getElementById("nomeUsuario");
const remetente = document.getElementById("remetente");
const destino = document.getElementById("destino");
const mensagemInput = document.getElementById("mensagem");
const enviarBtn = document.getElementById("enviarBtn");
const limparBtn = document.getElementById("limparBtn");
const ocultarBtn = document.getElementById("ocultarBtn");
const trancarBtn = document.getElementById("trancarBtn");
const mudarNomeBtn = document.getElementById("mudarNomeBtn");
const mensagensContainer = document.getElementById("mensagensContainer");

let usuarioTrancado = localStorage.getItem("usuarioTrancado") === "true";
let historicoOculto = false;

nomeUsuario.value = localStorage.getItem("nomeUsuario") || "";
nomeUsuario.disabled = usuarioTrancado;
remetente.disabled = usuarioTrancado;

trancarBtn.textContent = usuarioTrancado ? "Destrancar informações" : "Trancar informações";

function atualizarHistorico() {
  mensagensContainer.innerHTML = "";
  const historico = JSON.parse(localStorage.getItem("historicoMensagens") || "[]");
  historico.forEach(msg => {
    const div = document.createElement("div");
    div.className = `mensagem ${msg.remetente}`;
    div.textContent = `${msg.nome} mandou para ${msg.destino}: "${msg.texto}"`;
    mensagensContainer.appendChild(div);
  });
  mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
}

function enviarMensagem() {
  if (!nomeUsuario.value.trim()) {
    alert("Por favor, digite seu nome!");
    return;
  }
  if (!mensagemInput.value.trim()) return;

  const historico = JSON.parse(localStorage.getItem("historicoMensagens") || "[]");
  const novaMsg = {
    nome: nomeUsuario.value,
    remetente: remetente.value,
    destino: destino.value,
    texto: mensagemInput.value
  };
  historico.push(novaMsg);
  localStorage.setItem("historicoMensagens", JSON.stringify(historico));
  mensagemInput.value = "";
  atualizarHistorico();
}

enviarBtn.addEventListener("click", enviarMensagem);
limparBtn.addEventListener("click", () => {
  if (confirm("Deseja realmente limpar o histórico?")) {
    localStorage.removeItem("historicoMensagens");
    atualizarHistorico();
  }
});

ocultarBtn.addEventListener("click", () => {
  historicoOculto = !historicoOculto;
  mensagensContainer.style.display = historicoOculto ? "none" : "flex";
  ocultarBtn.textContent = historicoOculto ? "Mostrar histórico" : "Ocultar histórico";
});

trancarBtn.addEventListener("click", () => {
  usuarioTrancado = !usuarioTrancado;
  nomeUsuario.disabled = usuarioTrancado;
  remetente.disabled = usuarioTrancado;
  trancarBtn.textContent = usuarioTrancado ? "Destrancar informações" : "Trancar informações";
  localStorage.setItem("usuarioTrancado", usuarioTrancado);
  localStorage.setItem("nomeUsuario", nomeUsuario.value);
});

mudarNomeBtn.addEventListener("click", () => {
  nomeUsuario.disabled = false;
  remetente.disabled = false;
});

nomeUsuario.addEventListener("input", () => {
  localStorage.setItem("nomeUsuario", nomeUsuario.value);
});

atualizarHistorico();
