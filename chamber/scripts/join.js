// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.showModal();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.close();
    }
}

// Close modal when clicking on backdrop
document.addEventListener('DOMContentLoaded', function () {
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        modal.addEventListener('click', function (event) {
            if (event.target === this) {
                this.close();
            }
        });
    });

    // Attach modal open buttons (data-modal="modalId")
    const modalOpenButtons = document.querySelectorAll('[data-modal]');
    modalOpenButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            if (modalId) openModal(modalId);
        });
    });

    // Attach modal close buttons (data-close)
    const modalCloseButtons = document.querySelectorAll('[data-close]');
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const dlg = this.closest('dialog');
            if (dlg) dlg.close();
            else {
                const modalId = this.getAttribute('data-close');
                if (modalId) closeModal(modalId);
            }
        });
    });

    // Set timestamp when page loads
    setTimestamp();
});

// Function to set the current date and time in the hidden timestamp field
function setTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = timestamp;
    }
}

// Keyboard support for modals
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const openModal = document.querySelector('dialog[open]');
        if (openModal) {
            openModal.close();
        }
    }
});
