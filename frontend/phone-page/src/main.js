const userName = document.getElementById('username');
const password = document.getElementById('password');
const login = document.getElementById('loginBtn');
import { apiLogin } from "./api";

login.addEventListener('click', async () => {
    const user = userName.value;
    const pwd = password.value;

    if (!user || !pwd) {
        alert('Please enter both username and password');
        return;
    }
        const data = await apiLogin(user, pwd);

        if (data && data.token) {
           
            alert('Login successfull');

            console.log('User logged in :', data);
            
        }
    
});