// Grab the element
const nameElement = document.getElementById('name');

// Listen for mouse enter event
nameElement.addEventListener('mouseenter', function() {
    // Remove the 'rotate' class if it's already applied
    nameElement.classList.remove('rotate');

    // Trigger a reflow/repaint by adding the class back
    void nameElement.offsetWidth;  // This forces the browser to apply the styles

    // Add the 'rotate' class to start the rotation
    nameElement.classList.add('rotate');
});

// Listen for mouse leave event (optional, not strictly needed for rotation)
nameElement.addEventListener('mouseleave', function() {
    // You can handle other effects here if needed when the cursor leaves
});
