// Chatbot functionality
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const userInputtodo = document.getElementById('add-todo-input');
const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage !== '') {
      displayMessage(userMessage, 'user');
      userInput.value = '';
  
      fetchTagInfo(userMessage)
        .then(botResponse => {
          displayMessage(botResponse, 'bot');
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }

function displayMessage(message, sender) {
    const messageContainer = document.createElement('div');
    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);

    if (sender === 'user') {
        messageContainer.classList.add('message-container', 'user-message');
        messageElement.classList.add('message-text', 'bg-primary');
    } else {
        messageContainer.classList.add('message-container', 'bot-message');
        messageElement.classList.add('message-text', 'bg-secondary');
        messageContainer.setAttribute('draggable', 'true'); // Enable draggable attribute
    }

    chatContainer.appendChild(messageContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Clear chatbox message on drag and drop
        messageContainer.addEventListener('dragstart', function (event) {
        if (sender === 'bot') {
            const messageText = event.target.querySelector('.message-text');
            if (messageText) {
                userInputtodo.value = messageText.innerText;
                userInputtodo.focus();
            }
        }
    });
}
function fetchTagInfo(userMessage) {
    return fetch("data2.json")
      .then(response => response.json())
      .then(data => {
        if (data[userMessage]) {
          const description = data[userMessage].description;
          const example = data[userMessage].example;
          return `${description}\n${example}`;
        } else {
          const errorMessage = "Sorry, I couldn't retrieve information for that tag.";
          return errorMessage;
        }
      })
      .catch(error => {
        console.error("Failed to fetch data from JSON file:", error);
        const errorMessage = "Oops! Something went wrong while retrieving information.";
        return errorMessage;
      });
  }
// function getChatbotResponse(userMessage) {
//     // Mocking chatbot responses based on user message
//     const htmlResponses = {
//         'i am fine':'great to hear',
//         'hi':'hi! how are you',
//         'HTML': 'HTML stands for HyperText Markup Language. It is the standard markup language for creating web pages.',
//         'What are the basic tags in HTML?': 'Some basic HTML tags include <html>, <head>, <title>, <body>, <h1> to <h6>, <p>, <a>, <img>, <ul>, <ol>, <li>, <div>, <span>, <table>, <tr>, <td>, <th>, <form>, <input>, etc.',
//         'How can I create a hyperlink in HTML?': 'To create a hyperlink in HTML, you can use the <a> tag with the "href" attribute. For example: <a href="https://www.example.com">Visit Example</a>',
//         'How can I add an image in HTML?': 'To add an image in HTML, you can use the <img> tag with the "src" attribute specifying the image URL. For example: <img src="image.jpg" alt="Image">',
//         'CSS': 'CSS stands for Cascading Style Sheets. It is a stylesheet language used for describing the presentation of a document written in HTML or XML.',
//         'How can I apply CSS to HTML?': 'You can apply CSS styles to an HTML element by using the "style" attribute or by defining CSS rules in a separate CSS file and linking it to the HTML document.',
//         'drag and drop': 'Drag and drop is a user interface interaction where a user can click and hold on an element and then drag it to a different location or drop it onto another element.',
//         'How can I implement drag and drop functionality in HTML and JavaScript?': 'To implement drag and drop functionality, you can use the HTML5 Drag and Drop API or popular JavaScript libraries like jQuery UI or interact.js.',
//         'todo list': 'A todo list is a list of tasks or items that need to be completed. It helps users keep track of their tasks and stay organized.',
//         'How can I create a todo list in HTML?': 'To create a todo list in HTML, you can use HTML elements like <ul> and <li> to represent the list and its items. You can use JavaScript to add interactivity like adding new tasks or marking tasks as complete.',
//         'How can I add drag and drop functionality to the todo list?': 'To add drag and drop functionality to the todo list, you can use the HTML5 Drag and Drop API or JavaScript libraries like dragula or Sortable.js.'
//     };

//     return htmlResponses[userMessage] || "I'm sorry, I don't have a response for that.";
// }

// Todo list functionality
const todoItemsContainer = document.getElementById('todo-items-container');
const addTodoInput = document.getElementById('add-todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');

addTodoBtn.addEventListener('click', addTodoItem);
addTodoInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTodoItem();
    }
});

function addTodoItem() {
    const todoText = addTodoInput.value.trim();
    if (todoText !== '') {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.setAttribute('draggable', 'true'); // Enable draggable attribute

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        const label = document.createElement('label');
        label.innerText = todoText;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');

        todoItem.appendChild(checkbox);
        todoItem.appendChild(label);
        todoItem.appendChild(deleteBtn);
        todoItemsContainer.appendChild(todoItem);

        addTodoInput.value = '';

        // Clear chatbox message on drag and drop
        todoItem.addEventListener('dragstart', function (event) {
            const todoText = event.target.querySelector('label');
            if (todoText) {
                userInput.value = todoText.innerText;
                userInput.focus();
            }
        });

        // Delete todo item
        deleteBtn.addEventListener('click', function () {
            todoItem.remove();
        })
        
    }
}