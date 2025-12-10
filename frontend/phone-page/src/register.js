import { apiRegister } from "./utils/api.js";


const userName = document.getElementById('username');
const emailInput = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('registerBtn');


button.addEventListener('click', async (e) => {
    const user = userName.value;
    const email = emailInput.value;
    const pwd = password.value;




    if (!user || !email || !pwd) {
        alert('Please fill in all three fields');
        return;
        
    }
    try {
        const data = await apiRegister(user, email, pwd);
        
        alert('User created successfull');
        window.location.href = '/index.html'
    } catch (err) {
        alert('Registration failed. Please try again.');
    }
   
    
});