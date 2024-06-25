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

    


} );