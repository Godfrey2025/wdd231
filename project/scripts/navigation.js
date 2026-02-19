// navigation.js - Handle responsive navigation menu

const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
}

function openNav() {
    if (!nav || !navToggle) return;
    const isOpen = nav.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
        openNav();
    });

    // Close nav when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeNav();
        });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (event) {
        if (!nav || !navToggle) return;
        const isClickInside = nav.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInside && nav.classList.contains('active')) {
            closeNav();
        }
    });
}
