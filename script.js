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
    // Calculate the initial top position of the welcome section (accounting for header)
    const headerHeight = document.querySelector('header').offsetHeight;
    // Adjust scroll progress to start at 0 when welcomeTop is at its initial position
    const scrollDistance = viewportHeight + welcomeHeight - headerHeight;
    const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - welcomeTop - headerHeight) / scrollDistance));
    // Quadruple the movement per scroll: original range was 180px, now use 720px
    const bunnyPosition = -180 + (scrollProgress * 720); // Moves four times as far per scroll
    // Cap the position at bottom: 0px to align with the grass
    const finalPosition = Math.min(0, bunnyPosition);
    bunny.style.bottom = `${finalPosition}px`;
});
