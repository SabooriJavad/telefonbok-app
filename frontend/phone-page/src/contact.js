
  import { apiContact, getContacts } from "./utils/contactApi.js";
  const API_URL = import.meta.env.VITE_API_URL;

  const nameInput = document.getElementById('name');
  const lastName = document.getElementById('lastname');
  const phoneNumber = document.getElementById('phone');
  const button = document.getElementById('button');
  const contactList = document.getElementById('contactList');

  // Load contacts
  const loadContacts = async () => {
    contactList.innerHTML = '';
    try {
      const contacts = await getContacts();

      contacts.forEach((contact) => {
        const li = document.createElement('li');

        // Link to send-sms.html with contactId & name
        const nameLink = document.createElement('a');
        nameLink.textContent = `${contact.name}, ${contact.lastname}, ${contact.phone}`;
        nameLink.href = `send-sms.html?id=${encodeURIComponent(contact._id)}&name=${encodeURIComponent(contact.name)}`;

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
      console.error('Failed to load contacts', err);
    }
  };

button.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const last = lastName.value.trim();
    const phone = phoneNumber.value.trim();

    if (!name || !last || !phone) {
        alert('Fill all fields');
        return;
    }

    const contact = await apiContact(name, last, phone);
    if (!contact) return; // stoppar om något gick fel

    alert('Contact created');
    nameInput.value = '';
    lastName.value = '';
    phoneNumber.value = '';
    loadContacts();
});


  const updateContactPrompt = async (contact) => {
    const newName = prompt('Name', contact.name);
    const newLastname = prompt('Lastname', contact.lastname);
    const newPhone = prompt('Phone', contact.phone);

    if (!newName || !newLastname || !newPhone) {
      alert("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to update contacts');


      const res=await fetch(`${API_URL}/contacts/${contact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify({
          name: newName,
          lastname: newLastname, 
          phone: newPhone,
        }),
      });
        if (!res) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update contact');
    }

      const updatedContact = await res.json();
    alert('Contact updated successfully');
      loadContacts();
    } catch (err) {
      console.error('Failed to update contact', err);
    }
  };

 
 const deleteContact = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('You must be logged in to delete contacts');

    const res = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete contact');
    }

    const data = await res.json();
    alert(data.message);
    loadContacts(); // uppdatera listan
  } catch (err) {
    console.error('Failed to delete contact', err);
    alert(err.message);
  }
};
  loadContacts();
 