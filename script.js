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

// Footer fade-in on scroll
window.addEventListener('scroll', () => {
    const welcomeSection = document.querySelector('.welcome');
    const footer = document.querySelector('#footer');
    const welcomeBottom = welcomeSection.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight / 2; // Halfway up the screen

    // When the bottom of the welcome section (grass) reaches halfway up the viewport
    if (welcomeBottom <= triggerPoint) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});
