let url = "https://66edced2380821644cde0b48.mockapi.io/SignUp";

let btnSignUp = document.getElementById('btnSignUp');
let togglePassword = document.getElementById('togglePassword');
let passwordField = document.getElementById('password');
let name2 = document.getElementById('name');
let email = document.getElementById('email');

togglePassword.addEventListener('click', () => {
    let type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    togglePassword.classList.toggle('bi-eye');
    togglePassword.classList.toggle('bi-eye-slash');
});

btnSignUp.addEventListener('click', (event) => {
    event.preventDefault();

    let name = name2.value.trim();
    let emailValue = email.value.trim();
    let password = passwordField.value;

    if (name === '') {
        alert('Name must be entered');
        return;
    } else if (name.length < 5) {
        alert('Name must be at least 6 characters');
        return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        alert('Email must be entered');
        return;
    } else if (!emailRegex.test(emailValue)) {
        alert('Invalid email address');
        return;
    }

    if (password === '') {
        alert('Password must be entered');
        return;
    } else if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let nameExists = data.some(item => item.name === name);
            let emailExists = data.some(item => item.email === emailValue);

            if (nameExists) {
                alert('Name already taken');
                return;
            } else if (emailExists) {
                alert('Email already registered');
                return;
            } else {
                return fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name,
                        email: emailValue,
                        password: password
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = `login.html?name=${encodeURIComponent(data.name)}`;
        })
        
});

function Login() {
    window.location.href = 'Login.html';
}
