// Chat functionality
document.querySelector('.get-started').addEventListener('click', () => {
    document.getElementById('chatBox').style.display = 'block';
});

function sendMessage() {
    const input = document.getElementById('chatInput').value;
    const messages = document.getElementById('chatMessages');
    messages.innerHTML += `<p>You: ${input}</p>`;
    messages.innerHTML += `<p>Aya: Let me help you with that!</p>`; // Placeholder response
    document.getElementById('chatInput').value = '';
}

// Demo chat functionality
function sendDemoMessage() {
    const input = document.getElementById('demoInput').value;
    const messages = document.getElementById('demoMessages');
    if (input.trim() !== '') {
        messages.innerHTML += `<p>You: ${input}</p>`;
        messages.innerHTML += `<p>Aya: I'm here to help! For example, I can answer questions like "What should I expect at 20 weeks pregnant?" Sign up to chat more!</p>`;
        document.getElementById('demoInput').value = '';
        messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
    }
}

// Allow Enter key to send demo message
document.getElementById('demoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendDemoMessage();
    }
});

// Scroll-driven animations
window.addEventListener('scroll', () => {
    const bunny = document.querySelector('.bunny');
    const demoChat = document.getElementById('demoChat');
    const scrollY = window.scrollY; // How far we’ve scrolled from the top
    const scrollRange = 200; // Distance to complete the movement
    const progress = Math.min(1, scrollY / scrollRange); // Progress from 0 to 1
    const bunnyPosition = -180 + (progress * 180); // Move from -180px to 0px
    bunny.style.bottom = `${bunnyPosition}px`; // Update the position

    // Show/hide demo chat based on bunny position
    if (bunnyPosition >= 0) {
        demoChat.style.display = 'block'; // Show when bunny is at bottom: 0px
    } else {
        demoChat.style.display = 'none'; // Hide when bunny is below bottom: 0px
    }

    // Footer fade-in
    const welcomeSection = document.querySelector('.welcome');
    const footer = document.querySelector('#footer');
    const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    const triggerPointFooter = viewportHeight * 0.7; // Footer fade-in at 70% of viewport height
    if (welcomeBottom <= triggerPointFooter) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});
