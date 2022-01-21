const messages = document.querySelector('.list-messages'),
      form = document.querySelector('.form'),
      inputText = document.querySelector('.inputText'),
      sendButton = document.querySelector('.sendButton'),
      nameBlock = document.querySelector('.nameBlock'),
      userName = prompt("YOUR NAME"),
      clientSocket = io('http://localhost:3000');
nameBlock.innerHTML = userName;
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
    item.innerHTML = `<span>${data.name}</span>: ${data.message}`;
    messages.append(item);
    window.scrollTo(0, document.body.scrollHeight);
})

