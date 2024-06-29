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
            firstname: formData.get('firstname'),
            fEmail: formData.get('fEmail'),
            subject: formData.get('subject')
        };
    
        try {
            const response = await fetch('/api/users/send-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                alert('Thank you for your feedback!');
                this.reset(); // Reset the form
            } else {
                alert('There was an error sending your feedback. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error sending your feedback. Please try again.');
        }
    });
    


} );