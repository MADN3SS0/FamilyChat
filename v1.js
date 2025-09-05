window.addEventListener("DOMContentLoaded", () => {
  const nomeSalvo = localStorage.getItem("familyChatNome");
  const historicoSalvo = JSON.parse(localStorage.getItem("familyChatHistorico")) || [];

  if (nomeSalvo) {
    document.getElementById("nomeInput").value = nomeSalvo;
    document.getElementById("nomeInput").disabled = true;
  }

  historicoSalvo.forEach(msg => adicionarMensagem(msg.nome, msg.remetente, msg.texto));
});

document.getElementById("enviarBtn").addEventListener("click", enviarMensagem);

function enviarMensagem() {
  const nome = document.getElementById("nomeInput").value.trim();
  const remetente = document.getElementById("remetenteSelect").value;
  const texto = document.getElementById("mensagemInput").value.trim();

  if (!nome) {
    adicionarMensagem("Sistema", "Você", "Por favor, insira seu nome!", "erro");
    return;
  }
  if (!texto) {
    adicionarMensagem("Sistema", "Você", "Digite uma mensagem antes de enviar.", "erro");
    return;
  }

  adicionarMensagem(nome, remetente, texto, "sucesso");

  let historico = JSON.parse(localStorage.getItem("familyChatHistorico")) || [];
  historico.push({ nome, remetente, texto });
  localStorage.setItem("familyChatHistorico", JSON.stringify(historico));

  localStorage.setItem("familyChatNome", nome);
  document.getElementById("nomeInput").disabled = true;

  document.getElementById("mensagemInput").value = "";
}

function adicionarMensagem(nome, remetente, texto, tipo = "") {
  const container = document.getElementById("mensagensContainer");
  const div = document.createElement("div");
  div.classList.add("mensagem");
  if (tipo) div.classList.add(tipo);
  div.innerHTML = `<strong>${nome}</strong> enviou para <strong>${remetente}</strong>: ${texto}`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}
