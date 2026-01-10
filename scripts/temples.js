const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
    hamburger.textContent = navMenu.classList.contains('hidden') ? '☰' : '✖';
  });
}

// Get the current date and time
const yearSpan = document.querySelector('#year');
const modifiedSpan = document.querySelector('#lastModified');

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
if (modifiedSpan) {
  modifiedSpan.textContent = document.lastModified;
}
