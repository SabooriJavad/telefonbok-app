const API_URL = import.meta.env.VITE_API_URL

export async function apiContact(name, lastname, phone) {
    try {
        const res = await fetch(`${API_URL}/Contact/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(name, lastname, phone),
        });

        if (!res.ok) {
            throw new Error('failed to create')
        }
        const data = await res.json();
        return data;
    } catch (err) {
        
    }
}