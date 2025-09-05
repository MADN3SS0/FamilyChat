const nomeInput = document.getElementById('nome');
const remetenteSelect = document.getElementById('remetente');
const mensagemInput = document.getElementById('mensagem');
const enviarBtn = document.getElementById('enviarBtn');
const mensagensContainer = document.getElementById('mensagensContainer');

function criarMensagem(nome, remetente, texto) {
  const div = document.createElement('div');
  div.classList.add('mensagem');
  if (remetente) div.classList.add('remetente');
  div.innerText = `${nome} mandou uma mensagem para ${remetente || '...' }: ${texto}`;
  return div;
}

function criarNotificacao(texto) {
  const div = document.createElement('div');
  div.classList.add('mensagem');
  div.style.background = '#292828ff';
  div.innerText = texto;
  return div;
}

enviarBtn.addEventListener('click', () => {
  const nome = nomeInput.value.trim();
  const remetente = remetenteSelect.value;
  const texto = mensagemInput.value.trim();

  if (!nome) {
    mensagensContainer.appendChild(criarNotificacao('Erro: Coloca o teu nome!'));
    return;
  }

  if (!remetente) {
    mensagensContainer.appendChild(criarNotificacao('Erro: Escolhe um remetente!'));
    return;
  }

  if (!texto) {
    mensagensContainer.appendChild(criarNotificacao('Erro: Escreve uma mensagem!'));
    return;
  }

  const msg = criarMensagem(nome, remetente, texto);
  mensagensContainer.appendChild(msg);
  mensagemInput.value = '';

  // Scroll automático para a última mensagem
  mensagensContainer.scrollTop = mensagensContainer.scrollHeight;

  // Notificação interna
  mensagensContainer.appendChild(criarNotificacao('Mensagem enviada com sucesso!'));
});
