let queue = [
  { id: 0, nome: 'Alexandre Shyjada Sousa', paes: 50, valor: 25 },
  { id: 1, nome: 'Matheus Novais', paes: 50, valor: 25 },
  { id: 2, nome: 'Victor Peixoto', paes: 50, valor: 25 },
  { id: 3, nome: 'Kennedy Anderson', paes: 50, valor: 25 },
  { id: 4, nome: 'João Victor', paes: 50, valor: 25 },
  { id: 5, nome: 'Thales Brito', paes: 50, valor: 25 },
  { id: 5, nome: 'Ivens Joris', paes: 50, valor: 25 },
];

const sectionQueue = document.querySelector('.client-area');
const openModal = document.querySelector('.btn-client');

/* === Menu === */
/* === Pessoas === */
const pessoas = (valor) => {
  document.getElementById('pessoas-qnt').innerText = `${valor}`;
};

/* === Quantidade de Pães === */
const quantidadeVendidos = (valor) => {
  document.getElementById('paes-qnt').innerText = `${valor}`;
};

/* === Entrada === */
const entrada = (valor) => {
  valor = valor.toFixed(2);
  let reais = valor.toString();
  reais = reais.replace('.', ',');
  document.getElementById('entrada-valor').innerText = `R$ ${reais}`;
};

const renderQueue = (queue) => {
  let totalPaes = 0;
  let totalPagar = 0;
  sectionQueue.innerHTML = '';
  queue.map((item, index) => {
    const quantidade = item.paes <= 1 ? ' pão' : ' pães';
    let clients = `<article class="client-card">
          <div class="client-text">
            <h3>${item.nome}</h3>
            <div class="text-content">
              <p>Total de pães: <span class="text-span"> ${
                item.paes + quantidade
              } <span></p>
              <p>Total a pagar: <span class="text-span"> R$ ${item.valor
                .toFixed(2)
                .replace('.', ',')} </span></p>
            </div>
          </div>
          <button class="remover-btn" onclick="remover(${index})">
            <img src="./assets/Trash.svg" alt="Remover Item" />
          </button>
        </article>`;
    sectionQueue.innerHTML += clients;
    totalPaes += parseInt(item.paes);
    totalPagar += parseFloat(item.valor);
  });
  pessoas(queue.length);
  quantidadeVendidos(totalPaes);
  entrada(totalPagar);
};

renderQueue(queue);

/* === Modal === */
const modal = document.querySelector('.modal');
openModal.addEventListener('click', () => {
  modal.classList.add('show');
});

/* Botão Cancelar */
const cancel = document.querySelector('.btn-cancelar');
cancel.addEventListener('click', () => {
  modal.classList.remove('show');
});

/* Botão Adicionar */
const add = document.querySelector('.btn-enviar');
add.addEventListener('click', () => {
  let nome = document.getElementById('nome-cliente').value;
  let quantidade = document.getElementById('quantidade').value;
  if (nome && quantidade) {
    queue.push({
      id: queue.length,
      nome: nome,
      paes: quantidade,
      valor: parseFloat(quantidade / 2),
    });
    limparCampos();
  }
  renderQueue(queue);
});

const limparCampos = () => {
  let nome = (document.getElementById('nome-cliente').value = '');
  let quantidade = (document.getElementById('quantidade').value = '');
};

/* Botão Remover */

const remover = (card) => {
  queue.splice(card, 1);
  renderQueue(queue);
};
