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

// Track whether the bunny has been moved by the "Try Aya" click
let bunnyMoved = false;

// Function to center the bunny in pixels
function centerBunny() {
    const bunny = document.querySelector('.bunny');
    const viewportWidth = window.innerWidth;
    const bunnyWidth = bunny.offsetWidth; // Bunny width (200px)
    const centerPosition = (viewportWidth - bunnyWidth) / 2; // Center in pixels
    bunny.style.left = `${centerPosition}px`;
}

// Set the bunny's initial position on page load
window.addEventListener('load', () => {
    centerBunny();
});

// Click handler for "Try Aya" bubble on mobile
document.getElementById('demoChatTry').addEventListener('click', () => {
    const bunny = document.querySelector('.bunny');
    const demoChatTry = document.getElementById('demoChatTry');
    const demoChat = document.getElementById('demoChat');
    
    // Get the viewport width to calculate pixel positions
    const viewportWidth = window.innerWidth;
    const bunnyWidth = bunny.offsetWidth; // Bunny width (200px)
    const centerPosition = (viewportWidth - bunnyWidth) / 2; // Center in pixels
    const leftPosition = viewportWidth * 0.2 - bunnyWidth / 2; // 20% from left in pixels, adjusted for bunny width
    
    // Set initial position in pixels (center of the screen)
    bunny.style.left = `${centerPosition}px`;
    
    // Use a small timeout to ensure the starting position is applied before the transition
    setTimeout(() => {
        // Slide bunny to the left (20% from left edge, adjusted for bunny width)
        bunny.style.left = `${leftPosition}px`;
        
        // Hide "Try Aya" bubble and show full chat
        demoChatTry.style.display = 'none';
        demoChat.style.display = 'block';
        demoChat.style.opacity = '1'; // Ensure full chat is fully visible
        
        // Mark that the bunny has been moved
        bunnyMoved = true;
    }, 10); // Small delay to ensure the initial position is set
});

// Scroll-driven animations
window.addEventListener('scroll', () => {
    const bunny = document.querySelector('.bunny');
    const demoChat = document.getElementById('demoChat');
    const demoChatTry = document.getElementById('demoChatTry');
    
    // Only center the bunny if it hasn't been moved by the "Try Aya" click
    if (!bunnyMoved) {
        centerBunny();
    }
    
    const scrollY = window.scrollY; // How far we’ve scrolled from the top
    const scrollRange = 200; // Distance to complete the movement
    const progress = Math.min(1, scrollY / scrollRange); // Progress from 0 to 1
    const bunnyPosition = -180 + (progress * 180); // Move from -180px to 0px
    bunny.style.bottom = `${bunnyPosition}px`; // Update the position

    // Fade in demo chat (desktop) or "Try Aya" bubble (mobile) using the same progress
    demoChat.style.opacity = progress; // For desktop
    demoChatTry.style.opacity = progress; // For mobile

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
