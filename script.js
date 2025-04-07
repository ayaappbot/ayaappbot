// Chat functionality (static for now, will be updated with OpenAI API)
function sendMessage() {
    const input = document.getElementById('chatInput').value;
    const messages = document.getElementById('chatMessages');

    // Check if user is logged in
    if (!auth.currentUser) {
        alert("Please log in to use the chat.");
        return;
    }

    messages.innerHTML += `<p class="user-message">You: ${input}</p>`;
    messages.innerHTML += `<p class="aya-message">Aya: Let me help you with that!</p>`;
    document.getElementById('chatInput').value = '';
    messages.scrollTop = messages.scrollHeight;
}

// Demo chat functionality
function sendDemoMessage() {
    const input = document.getElementById('demoInput').value;
    const messages = document.getElementById('demoMessages');
    if (input.trim() !== '') {
        messages.innerHTML += `<p>You: ${input}</p>`;
        messages.innerHTML += `<p>Aya: I'm here to help! For example, I can answer questions like "What should I expect at 20 weeks pregnant?" Sign up to chat more!</p>`;
        document.getElementById('demoInput').value = '';
        messages.scrollTop = messages.scrollHeight;
    }
}

document.getElementById('demoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendDemoMessage();
    }
});

// Track whether the bunny has been moved by the "Try Aya" click
let bunnyMoved = false;

document.getElementById('demoChatTry').addEventListener('click', () => {
    const bunny = document.querySelector('.bunny');
    const demoChatTry = document.getElementById('demoChatTry');
    const demoChat = document.getElementById('demoChat');
    
    const viewportWidth = window.innerWidth;
    const bunnyWidth = bunny.offsetWidth;
    const centerPosition = (viewportWidth - bunnyWidth) / 2;
    const leftPosition = viewportWidth * 0.2 - bunnyWidth / 2;
    
    const demoChatWidth = demoChat.offsetWidth;
    const demoChatInitialLeft = centerPosition + bunnyWidth / 2 + 80;
    const demoChatTargetLeft = leftPosition + bunnyWidth / 2 + 80;
    
    bunny.style.left = `${centerPosition}px`;
    demoChat.style.left = `${demoChatInitialLeft}px`;
    
    setTimeout(() => {
        bunny.style.left = `${leftPosition}px`;
        demoChat.style.left = `${demoChatTargetLeft}px`;
        demoChatTry.style.display = 'none';
        demoChat.style.display = 'block';
        demoChat.style.opacity = '1';
        bunnyMoved = true;
    }, 10);
});

// Scroll-driven animations
window.addEventListener('scroll', () => {
    const bunny = document.querySelector('.bunny');
    const demoChat = document.getElementById('demoChat');
    const demoChatTry = document.getElementById('demoChatTry');
    
    const viewportWidth = window.innerWidth;
    const bunnyWidth = bunny.offsetWidth;
    const centerPosition = (viewportWidth - bunnyWidth) / 2;
    
    if (!bunnyMoved) {
        bunny.style.left = `${centerPosition}px`;
        const demoChatWidth = demoChat.offsetWidth || 250;
        const demoChatInitialLeft = centerPosition + bunnyWidth / 2 + 80;
        demoChat.style.left = `${demoChatInitialLeft}px`;
    }
    
    const scrollY = window.scrollY;
    const scrollRange = 200;
    const progress = Math.min(1, scrollY / scrollRange);
    const bunnyPosition = -180 + (progress * 180);
    bunny.style.bottom = `${bunnyPosition}px`;

    demoChat.style.opacity = progress;
    demoChatTry.style.opacity = progress;

    const welcomeSection = document.querySelector('.welcome');
    const footer = document.querySelector('#footer');
    const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    const triggerPointFooter = viewportHeight * 0.7;
    if (welcomeBottom <= triggerPointFooter) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});

// Tab functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Due Date Calculator
document.getElementById('dueDateForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const lmp = new Date(document.getElementById('lmp').value);
    const dueDate = new Date(lmp);
    dueDate.setDate(lmp.getDate() + 280);
    const today = new Date();
    const weeksPregnant = Math.floor((today - lmp) / (1000 * 60 * 60 * 24 * 7));
    
    document.getElementById('dueDateResult').innerHTML = `
        Your estimated due date is ${dueDate.toDateString()}.<br>
        You are approximately ${weeksPregnant} weeks pregnant!
    `;
});

// Baby Tracker
let trackerLogs = [];
document.getElementById('trackerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('trackerType').value;
    const details = document.getElementById('trackerDetails').value;
    const timestamp = new Date().toLocaleString();
    
    trackerLogs.push({ type, details, timestamp });
    document.getElementById('trackerLog').innerHTML = trackerLogs.map(log => 
        `${log.timestamp}: ${log.type} - ${log.details}`
    ).join('<br>');
    document.getElementById('trackerDetails').value = '';
});

// Firebase Authentication Functions
function register() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User registered:", userCredential.user);
            alert("Registration successful! Please log in.");
        })
        .catch((error) => {
            console.error("Error registering:", error.message);
            alert("Error: " + error.message);
        });
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            alert("Login successful!");
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
            alert("Error: " + error.message);
        });
}

function signOut() {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
            alert("You have been signed out.");
        })
        .catch((error) => {
            console.error("Error signing out:", error.message);
            alert("Error: " + error.message);
        });
}

// Manage Authentication State
onAuthStateChanged(auth, (user) => {
    const authSection = document.getElementById('authSection');
    const chatBox = document.getElementById('chatBox');
    const signOutButton = document.getElementById('signOutButton');
    const getStartedButton = document.querySelector('.get-started');

    if (user) {
        // User is signed in
        authSection.style.display = 'none';
        chatBox.style.display = 'block';
        signOutButton.style.display = 'block';
        getStartedButton.style.display = 'none';
    } else {
        // User is signed out
        authSection.style.display = 'block';
        chatBox.style.display = 'none';
        signOutButton.style.display = 'none';
        getStartedButton.style.display = 'block';
    }
});
