import {
    loadFooter,
    setFooterNavigation
} from './footer.js';

import {
    loadNavBarNoBG,
    setupNavigation
} from './nav.js';


// import {
//     cardsData
// } from './shop_cards.js';


document.addEventListener( "DOMContentLoaded", () => {
    // Automatically Slide Update
    function setupSliderChange() {
        const sliderNextBtn = document.querySelector( ".carousel-control-next" );

        setInterval( () => {
            if ( sliderNextBtn ) {
                sliderNextBtn.click();
            }
        }, 2500 );
    }

    function setupButtonNavigation(buttonId, url) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                window.open(url, "_blank");  // Open in a new tab
            });
        } else {
            console.error(`Button with ID ${buttonId} not found.`);
        }
    }

    // Calling functions
    setupNavigation();
    setupSliderChange();
    loadFooter().then( () => {
        setFooterNavigation();
    } );
    loadNavBarNoBG();

    // btn
    setupButtonNavigation("hero_view_col_btn", "/shop");
    setupButtonNavigation("sec_three_btn", "/shop");
    setupButtonNavigation("sec_five_btn", "/shop");
    setupButtonNavigation("sec_nine_btn", "/shop");

    setupButtonNavigation("sec_four_btn", "/shop")


} );

