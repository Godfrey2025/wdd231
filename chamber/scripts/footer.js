document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent =
    new Date(document.lastModified).toLocaleString();
});
