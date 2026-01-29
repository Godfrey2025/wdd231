// Display form data from URL parameters on the thank you page
document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);

    // Map URL parameter names to display element IDs
    const fieldMappings = {
        'firstName': 'displayFirstName',
        'lastName': 'displayLastName',
        'email': 'displayEmail',
        'mobile': 'displayMobile',
        'organization': 'displayOrganization',
        'timestamp': 'displayTimestamp'
    };

    // Populate the display elements with form data
    for (const [paramName, displayId] of Object.entries(fieldMappings)) {
        const value = params.get(paramName);
        const displayElement = document.getElementById(displayId);

        if (displayElement && value) {
            displayElement.textContent = decodeURIComponent(value);
        }
    }

    // Check if any required field is missing
    const requiredFields = ['firstName', 'lastName', 'email', 'mobile', 'organization', 'timestamp'];
    const hasAllFields = requiredFields.every(field => params.has(field));

    if (!hasAllFields) {
        console.warn('Some required form fields are missing from the submission.');
    }
});
