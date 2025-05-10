import * as userDB from './db/userDB.js'

window.addEventListener('load', async function() {
        
        if(await userDB.isLogged() == 1)
            window.location.href = '../screens/panel/adminP.html';
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const remember = document.getElementById('remember');
    
    // Form field validation
    const formFields = {
        email: { 
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
            error: emailError 
        },
        password: { 
            regex: /^.{3,}$/, 
            error: passwordError 
        }
    };
    
    // Set up validation for each field
    Object.keys(formFields).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        const { regex, error } = formFields[fieldName];
        
        input.addEventListener('input', function() {
            const isValid = regex.test(this.value);
            if (isValid || this.value === '') {
                error.style.display = 'none';
            } else {
                error.style.display = 'block';
            }
        });
    });
    
    // Login form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        // Check if the form is valid
        if (!loginForm.checkValidity()) {
            return false;
        }
        // Check if the credentials match our sample user
        let u = await userDB.isFound(emailInput.value.trim(), passwordInput.value.trim());
        if ( u instanceof userDB.User)   {
            
            //success
            userDB.login(u,remember.checked);
            window.location.href = '../screens/panel/adminP.html'; //change later

        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
});