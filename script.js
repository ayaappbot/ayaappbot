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
    const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    const triggerPointFooter = viewportHeight * 0.7; // Footer fade-in at 70% of viewport height

    // Footer fade-in
    if (welcomeBottom <= triggerPointFooter) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }

    // Bunny scroll-driven slide-up
    // Use window.scrollY to directly tie movement to scroll position
    const scrollY = window.scrollY; // Total scroll distance from the top of the page
    // Calculate the initial scroll position of the welcome section's top
    const headerHeight = document.querySelector('header').offsetHeight;
    const welcomeTopAtStart = headerHeight; // Welcome section starts just below the header
    // Calculate how far we've scrolled past the welcome section's initial position
    const scrollPastWelcome = Math.max(0, scrollY - welcomeTopAtStart);
    // Move the bunny 0.5px up for every 1px scrolled
    const bunnyPosition = -180 + (scrollPastWelcome * 0.5); // 0.5px movement per 1px scrolled
    // Cap the position at bottom: 0px as a limit
    const finalPosition = Math.min(0, bunnyPosition);
    bunny.style.bottom = `${finalPosition}px`;
});
