// Načítání zpráv z Local Storage
const messagesList = document.getElementById('messagesList');
const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];

// Funkce pro vykreslení zpráv
function renderMessages() {
    messagesList.innerHTML = ''; // Vyčistit seznam
    storedMessages.forEach((msg, index) => {
        const li = document.createElement('li');
        li.textContent = msg;
        li.style.marginBottom = '10px';

        // Tlačítko na smazání zprávy
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Smazat';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.style.backgroundColor = '#ff6f61';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '4px';
        deleteBtn.style.cursor = 'pointer';

        deleteBtn.addEventListener('click', () => {
            storedMessages.splice(index, 1); // Smazání zprávy
            localStorage.setItem('messages', JSON.stringify(storedMessages)); // Aktualizace Local Storage
            renderMessages(); // Obnovení seznamu
        });

        li.appendChild(deleteBtn);
        messagesList.appendChild(li);
    });
}

// Odeslání nové zprávy
document.getElementById('forumForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();

    if (message) {
        storedMessages.push(message); // Přidání zprávy do seznamu
        localStorage.setItem('messages', JSON.stringify(storedMessages)); // Uložení do Local Storage
        messageInput.value = ''; // Vyprázdnění vstupu
        renderMessages(); // Obnovení seznamu
    }
});

// Vykreslení při načtení stránky
renderMessages();
