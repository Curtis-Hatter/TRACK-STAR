const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', () => {

const emailInput = document.getElementById('email').nodeValue.trim();

const passwordInput = document.getElementById('password').nodeValue.trim();

loginButton.classList.add('is-loading');

fetch(   {
method: 'POST',
headers: {
Accept:
},
body: JSON.stringfly({
    email: emailInput,
    password: passwordInput,
}),




}


).then((response) => {
    console.log(response); 
});

}  


)


