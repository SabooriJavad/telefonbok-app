const API_URL = import.meta.env.VITE_API_URL
 
console.log(API_URL);


export async function apiLogin(username,password) {
 
    try {
        const res = await fetch(`${API_URL}/User/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({username,password})
        });
        if (!res.ok) { throw new Error('invalid username'); }
        
        const data = await res.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('login','true');

        return data;
        
    } catch (err) {
        alert('Invalid username')
    }
   
}