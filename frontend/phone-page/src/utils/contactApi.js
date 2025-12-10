const API_URL = import.meta.env.VITE_API_URL;

/**
 * Skapar en ny kontakt.
 * Frontend skickar endast name, lastname, phone.
 * userId tas automatiskt från token i backend.
 */
export async function apiContact(name, lastname, phone) {
    try {
        const token = localStorage.getItem('token'); // hämtar token

        if (!token) {
            throw new Error('You must be logged in to create a contact');
        }

        const res = await fetch(`${API_URL}/contacts/create`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // JWT skickas
            },
            body: JSON.stringify({ name, lastname, phone }) // ingen userId
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || err.message || 'Failed to add contact');
        }

        return await res.json(); // returnerar den skapade kontakten
    } catch (err) {
        console.error('apiContact error:', err);
        alert(err.message);
        return null;
    }
}

/**
 * Hämtar alla kontakter för inloggad användare.
 */
export async function getContacts() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in to view contacts');
            return [];
        }

        const res = await fetch(`${API_URL}/contacts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || err.message || 'Failed to fetch contacts');
        }

        return await res.json();
    } catch (err) {
        console.error('getContacts error:', err);
        return [];
    }
}
