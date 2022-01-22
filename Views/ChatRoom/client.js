const messages = document.querySelector('.list-messages'),
      form = document.querySelector('.form'),
      inputText = document.querySelector('.inputText'),
      sendButton = document.querySelector('.sendButton'),
      userName = document.querySelector('.nameBlock div').innerText,
    //   clientSocket = io('http://localhost:3000');
      clientSocket = io('https://chatcord-lite.herokuapp.com');
      

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(inputText.value){
        clientSocket.emit('chat-message', {
            message: inputText.value,
            name: userName
        });
        inputText.value = '';
    }
})
clientSocket.on('chat-message', (data) => {
    const item = document.createElement('li');

    if(data.name == userName) {
        item.style.alignSelf = 'flex-end';
        item.innerHTML = `<strong>You</strong>: ${data.message}`;
    }else {
        item.innerHTML = `<strong>${data.name}</strong>: ${data.message}`;
    }   
    messages.append(item);
    window.scrollTo(0, document.body.scrollHeight);
})

