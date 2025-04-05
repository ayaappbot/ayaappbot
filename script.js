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
    const viewportHeight = window.innerHeight;
    const welcomeHeight = welcomeSection.offsetHeight;
    const welcomeTop = welcomeSection.offsetTop;
    const scrollY = window.scrollY;
    const triggerPointFooter = viewportHeight * 0.7;

    // Footer fade-in
    const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
    if (welcomeBottom <= triggerPointFooter) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }

    // Bunny scroll-driven slide-up
    const startScroll = welcomeTop; // Start when welcome section top hits viewport top
    const endScroll = welcomeTop + welcomeHeight - viewportHeight; // End when welcome section bottom leaves viewport
    let progress = 0;

    if (scrollY >= startScroll) {
        progress = (scrollY - startScroll) / (endScroll - startScroll);
        progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
    }

    // Move bunny from -180px to 0px over the scroll range
    const bunnyPosition = -180 + (progress * 180); // Range is 180px
    bunny.style.bottom = `${bunnyPosition}px`;
});
