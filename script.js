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

// Scroll-driven animations
window.addEventListener('scroll', () => {
    const welcomeSection = document.querySelector('.welcome');
    const footer = document.querySelector('#footer');
    const bunny = document.querySelector('.bunny');
    const welcomeTop = welcomeSection.getBoundingClientRect().top;
    const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
    const welcomeHeight = welcomeSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const triggerPointFooter = viewportHeight * 0.7; // Footer fade-in at 70% of viewport height

    // Footer fade-in
    if (welcomeBottom <= triggerPointFooter) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }

    // Bunny scroll-driven slide-up
    // Calculate scroll progress based on the welcome section's position
    const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - welcomeTop) / welcomeHeight));
    // Map scroll progress (0 to 1) to bunny position (-180px to 0px)
    const bunnyPosition = -180 + (scrollProgress * 180); // Moves from -180px to 0px
    bunny.style.bottom = `${bunnyPosition}px`;
});
