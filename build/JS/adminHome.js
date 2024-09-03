import {
    loadFooter,
    setFooterNavigation
} from './footer.js';
import {
    loadNavBarBG,
    setupNavigation
} from './nav.js';

let totalPrice;
document.addEventListener( "DOMContentLoaded", () => {
    // Calling functions for nav and footer
    setupNavigation();

    loadFooter().then( () => {
        setFooterNavigation();
    } );

    loadNavBarBG();


} );
