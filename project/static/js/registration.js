import * as userDB from './db/userDB.js'

window.addEventListener('load', async function() {
    if(await userDB.isLogged() == 1)
        window.location.href = '../screens/panel/adminP.html';

    const registrationForm = document.getElementById('registrationForm');
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailTakenError = document.getElementById('emailTakenError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const userAddressError = document.getElementById('userAddressError');
    const cpassword = document.getElementById('cpassword');
    
    // Form field validation
    const formFields = {
        email: { 
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
            error: [emailError, emailTakenError] 
        },
        username: { 
            regex: /^[a-zA-Z0-9_-]{3,16}$/, 
            error: [usernameError]
        },
        password: { 
            regex: /^.{3,}$/, 
            error: [passwordError]
        },
        Address: { 
            regex: /^.{3,}$/, 
            error: [userAddressError] 
        }
    };
    
    // Set up validation for each field
    Object.keys(formFields).forEach(fieldName => {
        const input = document.getElementById(fieldName);
        const { regex, error } = formFields[fieldName];
        
        input.addEventListener('input', function() {
            const isValid = regex.test(this.value);
            if (isValid || this.value === '') {
                error.forEach(err => err.style.display = 'none');
            } else {
                error.forEach(err => err.style.display = 'block');
            }
        });

    });
    cpassword.addEventListener('input', function() {
        let pass = document.getElementById('password');
        let cerror = document.getElementById('cpasswordError');
        if (this.value === pass.value) {
            cpassword.setCustomValidity('');
            cerror.style.display = 'none';
        } else {
            cpassword.setCustomValidity('Passwords do not match');
            cerror.style.display = 'block';
        }
    });
    email.addEventListener('input', function() {
            email.setCustomValidity('');
    });
    
    // Form submission
    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        // reset the taken error

        // Check if the form is valid
        if (!registrationForm.checkValidity()) {
            return false;
        }
        debugger
        // Collect form data
        const formData = {
            email: document.getElementById('email').value,
            name: document.getElementById('username').value,
            Address: document.getElementById('Address').value,
            pass: document.getElementById('password').value, 
            role: document.getElementById('role').value
        };
        debugger
        let u = new userDB.User(formData.name, formData.email, formData.pass, formData.role, null, [], true,formData.Address)
        if(await userDB.getUserByemail(formData.email, '') == null)
        {
            await userDB.add(u);
            // success
            window.location.href = 'login.html';
        }
        else
        {
            email.setCustomValidity('this email is taken try to login');
            emailTakenError.style.display = 'block';
        }
       
        
    });
});