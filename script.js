let queue = [
  { id: 0, name: 'Alexandre Shyjada Sousa', bread: 50, value: 25 },
  { id: 1, name: 'Matheus Novais', bread: 50, value: 25 },
  { id: 2, name: 'Victor Peixoto', bread: 50, value: 25 },
  { id: 3, name: 'Kennedy Anderson', bread: 50, value: 25 },
  { id: 4, name: 'João Victor', bread: 50, value: 25 },
  { id: 5, name: 'Thales Brito', bread: 50, value: 25 },
  { id: 5, name: 'Ivens Joris', bread: 50, value: 25 },
];

const sectionQueue = document.querySelector('.client-area');
const openModal = document.querySelector('.btn-client');

/* === Menu === */
/* === people === */
const people = (value) => {
  document.getElementById('amount-people').innerText = `${value}`;
};

/* === Amount === */
const amountSold = (value) => {
  document.getElementById('amount-bread').innerText = `${value}`;
};

/* === Entry === */
const entry = (value) => {
  value = value.toFixed(2);
  let reais = value.toString();
  reais = reais.replace('.', ',');
  document.getElementById('entry-value').innerText = `R$ ${reais}`;
};

const renderQueue = (queue) => {
  let totalbread = 0;
  let payment = 0;
  sectionQueue.innerHTML = '';
  queue.map((item, index) => {
    const amount = item.bread <= 1 ? ' pão' : ' pães';
    let clients = `<article class="client-card">
          <div class="client-text">
            <h3>${item.name}</h3>
            <div class="text-content">
              <p>Total de pães: <span class="text-span"> ${
                item.bread + amount
              } <span></p>
              <p>Total a pagar: <span class="text-span"> R$ ${item.value
                .toFixed(2)
                .replace('.', ',')} </span></p>
            </div>
          </div>
          <button class="remove-btn" onclick="remove(${index})">
            <img src="./assets/Trash.svg" alt="Remove Item" />
          </button>
        </article>`;
    sectionQueue.innerHTML += clients;
    totalbread += parseInt(item.bread);
    payment += parseFloat(item.value);
  });
  people(queue.length);
  amountSold(totalbread);
  entry(payment);
};

renderQueue(queue);

/* === Modal === */
const modal = document.querySelector('.modal');
openModal.addEventListener('click', () => {
  modal.classList.add('show');
});

/* Cancel Button */
const cancel = document.querySelector('.cancel-btn');
const exitModal = () => {
  modal.classList.remove('show');
};
cancel.addEventListener('click', exitModal);

/* Clear input Fields */
const clearFields = () => {
  let name = (document.getElementById('name-client').value = '');
  let amount = (document.getElementById('amount').value = '');
};

/* Add Button */
const add = document.querySelector('.btn-send');
add.addEventListener('click', () => {
  let name = document.getElementById('name-client').value;
  let amount = document.getElementById('amount').value;
  if (name && amount) {
    queue.push({
      id: queue.length,
      name: name,
      bread: amount,
      value: parseFloat(amount / 2),
    });
    clearFields();
    exitModal();
  }
  renderQueue(queue);
});

/* Key control */
modal.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.querySelector('.btn-send').click();
  } else if (e.keyCode === 27) {
    e.preventDefault();
    document.querySelector('.cancel-btn').click();
  }
});

/* Remove Button */

const remove = (card) => {
  queue.splice(card, 1);
  renderQueue(queue);
};
