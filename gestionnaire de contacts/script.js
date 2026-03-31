contacts = [];

let i = 1;

function loading() {
    const savw = localStorage.getItem('contacts');
    if (savw) {
        contacts = JSON.parse(savw);
    }


    if (contacts.length > 0) {
        i = Math.max(...contacts.map(c => c.id)) + 1;
}}


function saveecontact() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}


function addTodo() {
    const nameInput = document.getElementById('name');
    const contactInput = document.getElementById('contact');


    if (nameInput.value.trim() === '' || contactInput.value.trim() === '') {
        alert('Veuillez remplir tous les champs');
        return;
    }


    const contact = {
        id: i,
        name: nameInput.value,
        contact: contactInput.value
    };
    contacts.push(contact);
    i++;
    saveecontact();
    displaycontacts()

    nameInput.value = '';
    contactInput.value = '';
    nameInput.focus();
    
    // Suppression de l'appel à deletecontact car la fonction n'existe pas
}


function delelecontact(id) {

    if (confirm('voulez-vous vraiment supprimez le contact ')) {
        
    contacts = contacts.filter(contact => contact.id !== id);
    saveecontact();
    displaycontacts();
}

function displaycontacts() {
    const list = document.getElementById('todoList');

    if (contacts.length === 0) {
        list.innerHTML = '<div id="empty">Champs vide</div>';
        return;
    }


 redenContacts()
}


function redenContacts(lister) {
    const list = document.getElementById('todoList');
    list.innerHTML = '';

    contacts.forEach(contact => {
        const div = document.createElement('div');
        div.classList.add('todo-item');
        div.innerHTML = `
            <span>${contact.id} - ${contact.name} - ${contact.contact}</span>
            <button onclick="delelecontact(${contact.id})">Supprimer</button>
        `;
        list.appendChild(div);
    })};
    function searchTodo(){
        const query = document.getElementById('searchInput');
        const list = document.getElementById('todoList');
        if (query.value === '') {
            displaycontacts();
            return;
        }

        const filtered = contacts.filter(contact => contact.name.toLowerCase().includes(query.value.toLowerCase()) || contact.contact.toLowerCase().includes(query.value.toLowerCase()));
        if (filtered.length === 0) {
            list.innerHTML = '<div id="empty">Aucun contact trouvé</div>';
        } else {
            redenContacts(filtered);
        }
    }

    window.onload = function() {
        loading();
        document.getElementById('searchInput').addEventListener('keyup', searchTodo);

        document.getElementById('name').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('contact').focus();
            }})

        document.getElementById('contact').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
    }}