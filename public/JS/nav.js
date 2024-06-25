export function loadNavBarNoBG() {
    const navPlaceholder = document.getElementById( "nav_no_bg_placeholder" );

    if ( navPlaceholder ) {
        fetch( "http://localhost:3000/nav_no_bg.html" )
            .then( ( response ) => response.text() )
            .then( ( html ) => {
                navPlaceholder.innerHTML = html;
                setupNavigation(); // Setup navigation after loading navbar HTML
            } )
            .catch( ( error ) => {
                console.error( "Error Loading Navbar: --> ", error );
            } );
    }
}

export function loadNavBarBG() {
    const navPlaceholder = document.getElementById( "nav_bg_placeholder" );

    if ( navPlaceholder ) {
        fetch( "http://localhost:3000/nav_bg.html" )
            .then( ( response ) => response.text() )
            .then( ( html ) => {
                navPlaceholder.innerHTML = html;
                setupNavigation(); // Setup navigation after loading navbar HTML
            } )
            .catch( ( error ) => {
                console.error( "Error Loading Navbar: --> ", error );
            } );
    }
}

export function setupNavigation() {
    const navLinks = {
        "#nav_home": "",
        "#nav_shop": "shop",
        "#nav_aboutUs": "aboutus",
        "#nav_contactUs": "contactus",
        "#user_sec": "logReg",
        "#my_carts": "cart"

    };


    const val = document.getElementById( 'account_status' );
    if ( val ) {
        val.innerText = localStorage.getItem( 'fName' ) + " " + localStorage.getItem( 'lName' );

    }
    if ( localStorage.getItem( 'user' ) ) {
        navLinks[ "#user_sec" ] = "account"
    }
    for ( const [ selector, page ] of Object.entries( navLinks ) ) {
        const navLink = document.querySelector( selector );
        if ( navLink ) {




            navLink.setAttribute( "href", `/${page}` );

            navLink.addEventListener( "click", ( event ) => {
                event.preventDefault();
                window.location.href = `/${page}`;
            } );
        }
    }

    const navLogo = document.querySelector( ".nav_logo" );
    if ( navLogo ) {
        navLogo.addEventListener( "click", ( event ) => {
            event.preventDefault();
            window.location.href = "/";
        } );
    }

    
}