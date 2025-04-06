// Chat functionality
document.querySelector('.get-started').addEventListener('click', () => {
    document.getElementById('chatBox').style.display = 'block';
});

function sendMessage() {
    const input = document.getElementById('chatInput').value;
    const messages = document.getElementById('chatMessages');
    messages.innerHTML += `<p>You: ${input}</p>`;
    messages.innerHTML += `<p>Aya: Let me help you with that!</p>`;
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

// Function to center the cards in a container on desktop
function centerCards(container) {
    if (window.innerWidth <= 768) return; // Skip on mobile (≤768px)

    const containerWidth = container.scrollWidth;
    const viewportWidth = container.clientWidth;
    const scrollPosition = (containerWidth - viewportWidth) / 2;

    if (scrollPosition > 0) {
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}

// Tab functionality with centering for specific tabs
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        button.classList.add('active');
        const activePane = document.getElementById(tabId);
        activePane.classList.add('active');

        // Center cards for specific tabs on desktop
        if (tabId === 'self-care') {
            const container = activePane.querySelector('.self-care-tools');
            if (container) centerCards(container);
        } else if (tabId === 'resources') {
            const container = activePane.querySelector('.resources-container');
            if (container) centerCards(container);
        } else if (tabId === 'community') {
            const container = activePane.querySelector('.community-topics');
            if (container) centerCards(container);
        }
    });
});

// Center cards on page load for the default active tab (Pregnancy Journey)
document.addEventListener('DOMContentLoaded', () => {
    const defaultTab = document.querySelector('.tab-button.active');
    if (defaultTab) {
        const tabId = defaultTab.getAttribute('data-tab');
        if (tabId === 'timeline') {
            const container = document.querySelector('#timeline .timeline-container');
            if (container) centerCards(container);
        }
    }
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
