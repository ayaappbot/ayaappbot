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
    
    // Calculate the demo chat's initial and target positions
    const demoChatWidth = demoChat.offsetWidth; // Chat bubble width (200px on mobile)
    const demoChatInitialLeft = centerPosition + bunnyWidth / 2 + 80; // Initial position (right of bunny)
    const demoChatTargetLeft = leftPosition + bunnyWidth / 2 + 80; // Target position (right of bunny's new position)
    
    // Set initial positions
    bunny.style.left = `${centerPosition}px`;
    demoChat.style.left = `${demoChatInitialLeft}px`;
    
    // Use a small timeout to ensure the starting position is applied before the transition
    setTimeout(() => {
        // Slide bunny to the left
        bunny.style.left = `${leftPosition}px`;
        
        // Slide demo chat to the left to match bunny
        demoChat.style.left = `${demoChatTargetLeft}px`;
        
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
    
    const viewportWidth = window.innerWidth;
    const bunnyWidth = bunny.offsetWidth; // Bunny width (200px)
    const centerPosition = (viewportWidth - bunnyWidth) / 2; // Center in pixels
    
    // Only center the bunny if it hasn't been moved by the "Try Aya" click
    if (!bunnyMoved) {
        bunny.style.left = `${centerPosition}px`;
        
        // Also center the demo chat relative to the bunny
        const demoChatWidth = demoChat.offsetWidth || 250; // Fallback to 250px if not visible yet
        const demoChatInitialLeft = centerPosition + bunnyWidth / 2 + 80; // Right of bunny
        demoChat.style.left = `${demoChatInitialLeft}px`;
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

    // Bottle scroll effect on mobile
    if (viewportWidth <= 768) { // Only on mobile
        const featuresSection = document.querySelector('.features');
        const featuresRect = featuresSection.getBoundingClientRect();
        const features = document.querySelectorAll('.feature');
        const viewportCenter = viewportHeight / 2; // Middle of the viewport

        // Only proceed if the features section is at least partially in view
        if (featuresRect.top < viewportHeight && featuresRect.bottom > 0) {
            let closestFeature = null;
            let minDistance = Infinity;

            // Find the feature closest to the viewport center
            features.forEach(feature => {
                const rect = feature.getBoundingClientRect();
                const featureCenter = rect.top + rect.height / 2; // Center of the feature card
                const distanceFromCenter = Math.abs(viewportCenter - featureCenter);

                if (distanceFromCenter < minDistance) {
                    minDistance = distanceFromCenter;
                    closestFeature = feature;
                }
            });

            // Update bottles based on the closest feature
            features.forEach(feature => {
                const bottle = feature.querySelector('.bottle-hover');
                const rect = feature.getBoundingClientRect();
                const featureCenter = rect.top + rect.height / 2; // Center of the feature card
                const distanceFromCenter = Math.abs(viewportCenter - featureCenter);
                const maxDistance = viewportHeight / 6; // Tighter range for sharper fade

                // Calculate opacity based on distance (1 when in center, 0 when at edges)
                const opacity = Math.max(0, 1 - (distanceFromCenter / maxDistance));

                if (feature === closestFeature && opacity > 0) {
                    bottle.classList.add('active');
                    bottle.style.opacity = opacity;
                    // Position the bottle to "point" to the center of the card
                    bottle.style.top = `${featureCenter - 25}px`; // Adjust 25px to center the bottle vertically (half of bottle height)
                } else {
                    bottle.classList.remove('active');
                    bottle.style.opacity = 0;
                }
            });
        } else {
            // Hide all bottles if the features section is not in view
            features.forEach(feature => {
                const bottle = feature.querySelector('.bottle-hover');
                bottle.classList.remove('active');
                bottle.style.opacity = 0;
            });
        }
    }
});
