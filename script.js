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
    const bunny = document.querySelector('.bunny');
    const scrollY = window.scrollY; // How far we’ve scrolled from the top
    const scrollRange = 200; // Reduced from 400 to make bunny move more per scroll
    const progress = Math.min(1, scrollY / scrollRange); // Progress from 0 to 1
    const bunnyPosition = -180 + (progress * 180); // Move from -180px to 0px
    bunny.style.bottom = `${bunnyPosition}px`; // Update the position

    // Footer fade-in (unchanged)
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
