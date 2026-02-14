// navigation.js - Handle responsive navigation menu

const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle) {
    navToggle.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Close nav when clicking outside
document.addEventListener('click', function (event) {
    const isClickInside = nav.contains(event.target) || navToggle.contains(event.target);
    if (!isClickInside && nav.classList.contains('active')) {
        nav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});
