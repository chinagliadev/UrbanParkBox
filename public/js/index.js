const itensMenu = document.querySelectorAll('.item-lista')
const sections = document.querySelectorAll('.section-estacionamento')

itensMenu.forEach((item, index) => {
  item.addEventListener('click', () => {

    itensMenu.forEach(i => i.classList.remove('active'))

    sections.forEach(section =>
      section.classList.remove('active-section')
    )

    item.classList.add('active')

    sections[index].classList.add('active-section')
  })
})

const modal = document.getElementById('modal-liberar-veiculo');

modal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;

  const id = button.getAttribute('data-id');
  const idVaga = button.getAttribute('data-idVaga');
  const idVeiculo = button.getAttribute('data-idVeiculo');

  const modelo = button.getAttribute('data-modelo');
  const cor = button.getAttribute('data-cor');
  const vaga = button.getAttribute('data-vaga');
  const entrada = button.getAttribute('data-entrada');

  
  document.getElementById('modelo-modal').textContent = modelo;
  document.getElementById('cor-modal').textContent = cor;
  document.getElementById('vaga-modal').textContent = vaga;
  document.getElementById('entrada-modal').textContent = entrada;
  
  document.getElementById('idVeiculo').value = idVeiculo;
  document.getElementById('idVaga').value = idVaga;
  document.getElementById('idEstacionamento').value = id;


  const totalMinutos = calcularTempoEmMinutos(entrada);
  const tempoFormatado = formatarTempo(totalMinutos);
  const valor = calcularCobrancaPorTempo(totalMinutos);

  document.getElementById('tempo-modal').textContent = tempoFormatado;
  document.getElementById('valor-modal').textContent = `R$ ${valor}`;

  modal.setAttribute('data-id', id);
});

function calcularTempoEmMinutos(entradaStr) {
  const [data, hora] = entradaStr.split(' ');
  const [dia, mes, ano] = data.split('/');
  const [h, m] = hora.split(':');

  const entrada = new Date(ano, mes - 1, dia, h, m);
  const agora = new Date();

  console.log(entrada)
  console.log(agora)

  const diferencaEmMs = agora - entrada;
  console.log(diferencaEmMs)

  return Math.floor(diferencaEmMs / 60000);
}

function formatarTempo(totalMinutos) {
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  if (horas > 0) {
    return `${horas}h ${minutos}min`;
  }
  return `${minutos} min`;
}

function calcularCobrancaPorTempo(totalMinutos) {
  const valorPorMinuto = 10 / 60;
  const valor = totalMinutos * valorPorMinuto;

  return valor.toFixed(2);
}

const mensagem_alerta = document.getElementById('alert_mensagem')

esconderAlerta('alert_mensagem');

function esconderAlerta(id, tempo = 5000) {
  const alerta = document.getElementById(id);

  if (!alerta) return;

  setTimeout(() => {
    alerta.classList.remove('show');

    setTimeout(() => {
      alerta.classList.add('d-none');
    }, 300); 
  }, tempo);
}

const tempo = document.getElementById('tempo');
const entrada = document.getElementById('entrada');

if (tempo && entrada) {
  function atualizarTempo() {
    const tempoEstacionado = entrada.textContent;
    const tempoEmMinuto = calcularTempoEmMinutos(tempoEstacionado);
    const tempoFormatado = formatarTempo(tempoEmMinuto);

    tempo.textContent = tempoFormatado;
  }

  atualizarTempo(); 

  setInterval(atualizarTempo, 60000);
}