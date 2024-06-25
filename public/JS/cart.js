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

    loadProducts( productInCart );
} );

function loadProducts( products ) {
    const parentDiv = document.getElementById( 'chackOutIformation' );
    parentDiv.innerHTML = '';

    if ( products.length === 0 ) {
        parentDiv.appendChild( emptyCart() );
        return;
    }

    let firstChildDiv = document.createElement( 'div' );
    firstChildDiv.classList.add( 'w-full', 'min-h-[15rem]', 'relative', 'flex', 'flex-col', 'items-center', 'justify-center', 'gap-6' );
    firstChildDiv.innerHTML = `
        <h1 class="font-['Cormorant-Garamond'] font-semibold italic text-5xl">Cart</h1>
        <div class="cart_sec w-[80rem] relative flex flex-col items-start justify-center border-[1px] border-solid border-gray-300 gap-5 bg-gray-100">
            <div class="productHeading w-full relative">
                <div class="product_heading_info flex flex-row items-center justify-around font-['Montserrat'] font-semibold text-gray-500 relative">
                    <p class="absolute w-[15rem] left-[21.5rem] top-3">Product</p>
                    
                    <p class="absolute w-[3rem] top-3 left-[47rem]">Price</p>

                    <p class="absolute w-[7rem] top-3 left-[57rem]">Quantity</p>

                    <p class="absolute w-[4rem] top-3 left-[71rem]">Subtotal</p>
                </div>
            </div>
            <div class="item_sec w-full border-[1px] flex flex-col border-solid border-gray-300 bg-white">
            </div>
        </div>
    `;

    // Iterate over productInCart array to create each product item
    products.forEach( ( product, index ) => {
        let sizeColorInfo = '';
        if ( product.size || product.color ) {
            sizeColorInfo = `<p class="text-gray-400">${product.size ? `Size: ${product.size}` : ''} ${product.color ? `- Color: ${formatColorName(product.color).toUpperCase()}` : ''}</p>`;
        }

        let productHTML = `
            <div class="items flex flex-row items-center justify-around h-[9rem] border-[1px] border-solid border-gray-300 relative box-border" data-index="${index}">

                <button type="button" class="remove_item btn-close" aria-label="Close"></button>

                <div class="product_img w-[5rem] mr-[3rem]">
                    <img src="${product.imgSrc}" alt="${product.title}">
                </div>

                <div class="product_info flex flex-col items-start justify-start font-['Montserrat'] font-semibold mr-[6rem] w-[15rem]">
                    <p>${product.title}</p>
                    ${sizeColorInfo}
                </div>

                <div class="product_price font-['Montserrat'] w-[3rem] font-semibold text-gray-400 mr-10">
                    <p>$${product.price.toFixed(2)}</p>
                </div>

                <div class="product_quantity box-border">
                    <div class="btn_group flex box-border mr-10 w-[7rem]">
                        <button class="btn_neg border-[1px] px-[1.3rem] py-[0.5rem] border-black box-border h-[3rem] flex justify-center items-center hover:bg-red-300">-</button>

                        <p class="show_count border-[1px] px-[1.7rem] py-[0.5rem] border-black h-[3rem] flex justify-center items-center box-border font-semibold">${product.quantity}</p>

                        <button class="btn_pos border-[1px] px-[1.3rem] py-[0.5rem] border-black box-border h-[3rem] flex justify-center items-center hover:bg-green-300">+</button>
                    </div>
                </div>

                <div class="final_price font-['Montserrat'] w-[4rem] box-border font-semibold text-gray-400 mr-10">
                    <p>$${(product.price * product.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;

        // Append each product item to the item section
        firstChildDiv.querySelector( '.item_sec' ).innerHTML += productHTML;
    } );

    let secondChildDiv = document.createElement( 'div' );
    secondChildDiv.classList.add( 'final_price_sec', 'w-[43rem]', 'flex', 'flex-col', 'ml-[37rem]' );
    secondChildDiv.innerHTML = `
        <div class="checkout_box w-full h-[30rem] items-center justify-center border-[1px] border-solid border-gray-300 flex flex-col gap-y-[6rem]">
            
        <h1 class="font-['Cormorant-Garamond'] font-semibold italic">Cart Total</h1>
            
        <div class="final_price_sec flex flex-col items-center justify-center relative">
                
        <div class="sectionDiv w-[40rem] border-[1px] border-solid absolute z-10 top-[-2rem] border-gray-400"></div>

                <div class="w-full flex flex-row items-center justify-between font-['Montserrat'] font-semibold text-gray-600">
                    <p class="ml-[4rem]">SubTotal</p>
                    <p class="ml-[14rem]">$${calculateTotal(products).toFixed(2)}</p>
                </div>

                <div class="w-full flex flex-row items-center justify-between font-['Montserrat'] font-semibold text-gray-600">
                    <p class="ml-[4rem]">Total</p>
                    <p class="ml-[14rem]">$${calculateTotal(products).toFixed(2)}</p>
                </div>
                <div class="sectionDiv w-[40rem] border-[1px] border-solid absolute z-10 bottom-[-2rem] border-gray-400"></div>
            </div>
            <button id="checkOutBtn" class="border-[1px] border-solid border-black px-[14rem] py-[1.5rem] hover:bg-black hover:border-none hover:text-white hover:duration-300 hover:ease-out font-['Montserrat'] font-semibold leading-relaxed">Proceed To Check Out</button>
        </div>
    `;

    parentDiv.appendChild( firstChildDiv );
    parentDiv.appendChild( secondChildDiv );

    addEventListeners( products );
}

function emptyCart() {
    let elem = document.createElement( 'div' );
    elem.classList.add( 'w-full', 'h-[20rem]', 'flex', 'flex-col', 'items-center', 'justify-center' );
    elem.innerHTML = `<h1 class="font-['Cormorant-Garamond'] font-semibold italic text-5xl">Empty Cart</h1>`;
    return elem;
}

// Helper function to calculate the total price
function calculateTotal( products ) {
    return totalPrice = products.reduce( ( total, product ) => total + product.price * product.quantity, 0 );
}

function addEventListeners( products ) {
    const removeButtons = document.querySelectorAll( '.remove_item' );
    const incrementButtons = document.querySelectorAll( '.btn_pos' );
    const decrementButtons = document.querySelectorAll( '.btn_neg' );

    removeButtons.forEach( ( button, index ) => {
        button.addEventListener( 'click', () => removeProduct( index, products ) );
    } );

    incrementButtons.forEach( ( button, index ) => {
        button.addEventListener( 'click', () => updateQuantity( index, products, 1 ) );
    } );

    decrementButtons.forEach( ( button, index ) => {
        button.addEventListener( 'click', () => updateQuantity( index, products, -1 ) );
    } );

    const checkOutBtn = document.getElementById( 'checkOutBtn' );
    checkOutBtn.addEventListener( 'click', () => {

        if(!localStorage.getItem('user')){
            alert("please login First");
            window.location.href = '/logReg';
            return;
        }
        window.location.href ='/checkout';
    } );
}

function removeProduct( index, products ) {
    products.splice( index, 1 );
    saveProductsToLocalStorage( products );
    loadProducts( products );
}

function updateQuantity( index, products, change ) {
    products[ index ].quantity += change;

    // Ensure quantity doesn't go below 1
    if ( products[ index ].quantity < 1 ) {
        products[ index ].quantity = 1;
    }

    saveProductsToLocalStorage( products );
    loadProducts( products );
}

const formatColorName = ( color ) => {
    return color ? color.replace( /-\d+/, '' ) : '';
};

function saveProductsToLocalStorage( products ) {
    localStorage.setItem( 'cart', JSON.stringify( products ) );
}

// Example data
const productInCart = JSON.parse( localStorage.getItem( 'cart' ) ) || [];