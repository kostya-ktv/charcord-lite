const messages = document.querySelector('.list-messages'),
      form = document.querySelector('.form'),
      inputText = document.querySelector('.inputText'),
      sendButton = document.querySelector('.sendButton'),
      userName = document.querySelector('.nameBlock div').innerText,
      alertSound = new Audio('/Assets/new-message.mp3'),
    //   clientSocket = io('http://localhost:3000');
      clientSocket = io('https://chatcord-lite.herokuapp.com');
//SWITCH URL!!  FOR RUN APP ON HEROKU     
//Message sending
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //If have some text open Emit listener with our attached message
    if(inputText.value){
        clientSocket.emit('chat-message', {
            message: inputText.value,
            name: userName
        });
        inputText.value = '';
    }
})
//Listen Server on Event new message
clientSocket.on('chat-message', (data) => {
    //create Element 
    const item = document.createElement('li');
    //adjust class 
    item.classList.add('message');
    //if this is our message - apply styles
    if(data.name == userName) {    
        item.style.alignSelf = 'flex-end';
        item.innerHTML = `<strong>You</strong>: ${data.message}`;
    } else {
    //else styles for out users message
        item.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
        item.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
        alertSound.play();
    }   
    messages.append(item);
    
    //scroll to end UL
    
    messages.scrollBy(0, messages.scrollHeight);
})

//Listen server event about Join new user

clientSocket.on('join', (e) => {
    const item = document.createElement('li');
    item.style.alignSelf = 'center';
    item.style.color = 'grey';
    item.innerHTML = e;
    messages.append(item);
    alertSound.play();
    messages.scrollBy(0, messages.scrollHeight);
})

