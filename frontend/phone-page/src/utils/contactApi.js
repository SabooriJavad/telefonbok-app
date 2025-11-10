const API_URL = import.meta.env.VITE_API_URL

export async function apiContact(name, lastname, phone) {
    try {
        const res = await fetch(`${API_URL}/Contacts/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, lastname, phone}),
        });

        if (res) {
            res.status(201).send('Contact added successfull');
        }
        const data = await res.json();
        return data;
    } catch (err) {
        
    }
};

export async function getContacts(name, lastname, phone) {
    const res = await fetch(`${API_URL}/contacts`, {
        method: 'GET'
    });
    return res.json();
};