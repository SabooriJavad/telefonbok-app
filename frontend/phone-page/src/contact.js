
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const lastName = document.getElementById('lastname');
const phoneNumber = document.getElementById('phone');

const contactList = document.getElementById('contactList');


form.addEventListener('click', async (event) => {

    event.preventDefault();


    const name = nameInput.value;
    const last = lastName.value;
    const phone = phoneNumber.value;

    if (!name || !last || !phone) return alert('fill all fields');
    try {
        await apiContact(name, last, phone);
        alert('Contact created');
        form.reset();
        loadContacts();
    } catch (err) {
        alert('Failed to create contact');

    }

    console.log(name, last, phone);

});
