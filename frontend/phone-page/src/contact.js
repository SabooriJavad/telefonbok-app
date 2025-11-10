import { apiContact,getContacts } from "./utils/contactApi";
const API_URL = import.meta.env.VITE_API_URL;

const nameInput = document.getElementById('name');
const lastName = document.getElementById('lastname');
const phoneNumber = document.getElementById('phone');
const button = document.getElementById('button')
const contactList = document.getElementById('contactList');

const loadContacts = async () => {
    contactList.innerHTML = '';
    try {
        const contacts = await getContacts();
        
        console.log(contacts);

        

        contacts.forEach((contact) => {
            const li = document.createElement('li');

   
            const nameLink = document.createElement('a');
            nameLink.textContent = `${contact.name}, ${contact.lastname}, ${contact.phone}`;
            nameLink.href = `send-sms.html?phone=${encodeURIComponent(contact.phone)}&name=${encodeURIComponent(contact.name)}`;


            
            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.addEventListener('click', () => updateContactPrompt(contact));
            


            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteContact(contact._id));

            li.appendChild(updateBtn);
            li.appendChild(deleteBtn);
            li.appendChild(nameLink);

            contactList.appendChild(li);
            

        });
    } catch (err) {
       console.error('Failed to load contacts',err) 
    }
}
button.addEventListener('click', async () => {

    const name = nameInput.value;
    const last = lastName.value;
    const phone = phoneNumber.value;

    try {

        if (!name || !last || !phone) {
        alert('fill all fields');
            return;
    };
        const data = await apiContact(name, last, phone);
        
        alert('Contact created');
        
        nameInput.value = '';
        lastName.value = '';
        phoneNumber.value = '';

        loadContacts();
        return data;
    } catch (err) {
        alert('Failed to create contact');
    }
});

const updateContactPrompt = async (contact) => {
    const newName = prompt('Name', contact.name);
    const newLastname = prompt('Lastname', contact.lastname);
    const newPhon = prompt('Phone', contact.phone);

    if (!newName || !newLastname || !newPhon);
    
    try {
        await fetch(`${API_URL}/contacts/${contact._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newName,
                lastName: newLastname,
                phone: newPhon,
            })
        });
     
        loadContacts();
        
    } catch (err) {
        console.error('Failed to update contact', err);
    }
};
const deleteContact = async (id) => {
    try {
        await fetch(`${API_URL}/contacts/${id}`, {
            method: 'DELETE'
        });
        loadContacts();
    } catch (err) {
        console.error('Failed to delete contact', err);
    }
}
