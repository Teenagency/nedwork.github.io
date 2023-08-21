const messagesElement = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Listen for new messages
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    displayMessage(message);
});

// Send message
sendMessageButton.addEventListener('click', () => {
    const text = messageInput.value;
    if (text.trim() !== '') {
        const newMessageRef = database.ref('messages').push();
        newMessageRef.set({ text });
        messageInput.value = '';
    }
});

// Display message in the chat
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message.text;
    messagesElement.appendChild(messageElement);
    messagesElement.scrollTop = messagesElement.scrollHeight;
}