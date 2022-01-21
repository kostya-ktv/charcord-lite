const closeButton = document.querySelector('#closeButton'),
        loginWindow = document.querySelector('#modal-window'),
        container = document.querySelector('#mainWindow'),
        loginButton = document.querySelector('#login_btn'),
        form = document.querySelector('.login-form'),
        inputUsername = document.querySelector('#input-username'),
        inputPassword = document.querySelector('#input-password')
     
closeButton.addEventListener('click', () => {
    loginWindow.style.display = 'none';
    container.style.visibility = 'visible';

});
loginButton.addEventListener('click', ()=>{
    form.reset();
    container.style.visibility = 'hidden';
    loginWindow.style.display = 'inline'
   
});
form.addEventListener('submit', (e) => {

});