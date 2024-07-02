import {
    loadFooter,
    setFooterNavigation
} from './footer.js';

import {
    loadNavBarNoBG,
    setupNavigation
} from './nav.js';

document.addEventListener( "DOMContentLoaded", () => {

    // Calling functions for nav and footer
    setupNavigation();

    loadFooter().then( () => {
        setFooterNavigation();
    } );
    loadNavBarNoBG();

    document.getElementById('feedbackForm').addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission
    
        const formData = new FormData(this);
        const data = {
            clientName: formData.get('clientName'),
            clientEmail: formData.get('clientEmail'),
            subject: formData.get('subject')
        };
    
        try {
            const response = await fetch('/api/users/contact-us', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                alert('Thank you for We will reach you soon!');
                this.reset(); // Reset the form
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        }
    });
    


} );