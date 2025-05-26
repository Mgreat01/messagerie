const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value.trim()) {
    const msg = input.value;

    // Affiche le message de l'envoyeur (à droite)
    const li = document.createElement('li');
    li.textContent = msg;
    li.className = 'bg-blue-500 text-white p-2 rounded-lg self-end max-w-xs';
    li.style.alignSelf = 'flex-end';
    messages.appendChild(li);

    socket.emit('chat message', msg);
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  // Affiche le message reçu (à gauche)
  const li = document.createElement('li');
  li.textContent = msg;
  li.className = 'bg-gray-300 text-black p-2 rounded-lg self-start max-w-xs';
  li.style.alignSelf = 'flex-start';
  messages.appendChild(li);
});
