const API_URL = import.meta.env.VITE_API_URL
 

export async function apiRegister(username, email, password) {
    try {
        const response = await fetch(`${API_URL}/User/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
            
        });
     
        if (!response.ok) {
            throw new Error('Register failed')
        }
        const data = await response.json();
        return data;

    } catch (err) {
        console.error('Regsitration failed:',err)
        alert('Failed widh registering.Please try ahain');
    }
}



export async function apiLogin(username, password) {
    try {
        const res = await fetch(`${API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Invalid username or password');
        }

        const data = await res.json();

        // Spara token korrekt i localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('login', 'true');

        console.log('Token saved:', data.token); // kontrollera token
        return data;

    } catch (err) {
        console.error('Login failed:', err);
        alert(err.message);
        return null;
    }
}
