import { loadFooter, setFooterNavigation } from './footer.js';
import { loadNavBarNoBG, setupNavigation } from './nav.js';

document.addEventListener("DOMContentLoaded", () => {
    // Calling functions for nav and footer
    setupNavigation();

    loadFooter().then(() => {
        setFooterNavigation();
    });
    loadNavBarNoBG();

    document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);
        const data = {
            clientName: formData.get('clientName'),
            clientEmail: formData.get('clientEmail'),
            subject: formData.get('subject')
        };

        // Show loading spinner
        document.getElementById('loadingSpinner').style.display = 'block';

        try {
            const response = await fetch('/api/users/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Thank you! We will reach you soon!');
                this.reset(); // Reset the form
            } else {
                const errorMessage = await response.text();
                alert('Error: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            // Hide loading spinner
            document.getElementById('loadingSpinner').style.display = 'none';
        }
    });
});
