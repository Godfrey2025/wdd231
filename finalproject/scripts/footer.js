// footer.js - Update year and last modified date

const yearSpan = document.getElementById('year');
const lastModifiedSpan = document.getElementById('lastModified');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}
