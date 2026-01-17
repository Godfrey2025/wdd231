// footer.js - Display copyright year and last modification date
document.addEventListener('DOMContentLoaded', () => {
  // Display current year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Display last modified date
  const lastModElement = document.getElementById('lastModified');
  if (lastModElement) {
    const lastMod = new Date(document.lastModified);
    lastModElement.textContent = lastMod.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
});
