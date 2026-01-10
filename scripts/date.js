// Copyright year
const yearSpan = document.getElementById("current-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Document last modified (as simple string)
const lastMod = document.getElementById("lastModified");
if (lastMod) {
    lastMod.textContent = `Last modified: ${document.lastModified}`;
}
