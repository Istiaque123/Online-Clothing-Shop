import {
    loadFooter,
    setFooterNavigation
} from './footer.js';

import {
    loadNavBarBG,
    setupNavigation
} from './nav.js';

async function fetchProducts() {
    try {
        const response = await fetch( '/api/users/productsAll' );
        if ( !response.ok ) {
            throw new Error( 'Network response was not ok' );
        }
        const products = await response.json();

        const productsWithoutId = products.map( ( product, index ) => ( {
            imgSrc: product.imgSrc,
            id: product.id,
            category: product.category,
            title: product.title,
            price: product.price,
            popularity: product.popularity,
            rating: product.rating,
            date: product.date,
            dress_sizes: product.dress_sizes,
            dress_colors: product.dress_colors,
            reviews: product.reviews || []
        } ) );

       


        return productsWithoutId;

    } catch ( error ) {
        console.error( 'There has been a problem with your fetch operation:', error );
        return [];
    }
}

// Function to format color names
const formatColorName = ( color ) => {
    return color.replace( /-\d+/, '' );
};


// Function to get product ID from URL
function getProductIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams( queryString );
    return urlParams.get( 'product_id' );
}

// Function to initialize the product page
function initProductPage( cardsData ) {
    const productId = Number.parseInt( getProductIdFromUrl() );
    const product = cardsData.find( product => product.id === productId );
    if ( product ) {

        
        renderProduct( product );
    }
}

// Call updateCartCount on page load to initialize cart count
document.addEventListener( 'DOMContentLoaded', async () => {
    loadNavBarBG();
    setupNavigation();
    loadFooter();
    setFooterNavigation();

    const cardsData = await fetchProducts();

    initProductPage( cardsData );

    const productContainer = document.getElementById( 'items_info' );

    if ( productContainer ) {

        document.getElementById( 'nav-description-tab' ).addEventListener( 'click', () => {
            productContainer.classList.remove( 'min-h-[130rem]' );
            productContainer.classList.add( 'min-90rem]', 'mb-[10rem]' );



        } )
        document.getElementById( 'nav-information-tab' ).addEventListener( 'click', () => {
            productContainer.classList.remove( 'min-h-[130rem]' );
            productContainer.classList.add( 'min-h-[90rem]', 'mb-[10rem]' );


        } )


        document.getElementById( "nav-reviews-tab" ).addEventListener( 'click', () => {
            productContainer.classList.remove( 'min-h-[90rem]' );
            productContainer.classList.add( 'min-h-[130rem]', 'mb-[10rem]' );
            
            
        } );
        

        
    }

    

} );




// Function to render a single product based on its ID
function renderProduct( product ) {

    // change title of the page
    document.title = `${product.title}`


    const productContainer = document.getElementById( 'items_info' );
    if ( !productContainer ) return;

    // Clear existing content


    productContainer.innerHTML = '';
    // Creating div
    const mainDiv = document.createElement( 'div' );
    mainDiv.classList.add( `product_Section`, `flex`, `w-[80rem]`, `min-h-full`, `mt-[5rem]`, `flex-col`, `relative`, `space-y-16`, `items-center`, `justify-start`, `relative`);
    
    mainDiv.setAttribute( "id", "product_Section" );

     // Generate HTML for reviews section
     const reviewsHtml = product.reviews.length > 0 ?
     
     product.reviews.map(review =>

         `<div class="customer_review flex flex-row items-center mb-4 border-[1px] border-solid border-gray-300 p-[2rem] font-['Playfair-Display'] italic ">
             <div class="flex-shrink-0 ">
                 <span class="material-symbols-outlined text-7xl">account_circle</span>
             </div>
             <div class="ml-3">
                 <p class="font-semibold text-xl text-gray-600">${review.name}: ( ${grade(review.rating)} )</p>
                 <p class="text-gray-600">${review.text}</p>
             </div>
         </div>`
     ).join('') :
     '<p>No Reviews Yet</p>';

    mainDiv.innerHTML = `

        <div id="liveAlertPlaceholder" class=" w-full "></div>

    <!-- 1st Section -->
    <div class="first_section flex flex-row gap-5 items-start justify-center relative">

        <div class="img_div w-[33rem] shadow-xl box-border rounded-md overflow-hidden hover:cursor-pointer">
            <img src="${product.imgSrc}" alt="item_img" class="object-cover box-border transition-transform duration-500 transform hover:scale-125">
        </div>

        <div class="product_info flex flex-col w-[40rem] space-y-5">
            <p class="font-['Montserrat'] font-bold text-xl">${product.category}</p>

            <p class="font-[Cormorant-Garamond] font-semibold text-lg text-gray-600 tracking-wide">${product.title}</p>

            <p id="dis_price" class="dis_price font-['Montserrat'] font-bold text-xl tracking-wide">$${product.price}</p>

            <p class="font-['Montserrat'] text-gray-600 tracking-wide">Free Shipping</p>

            <p class="font-['Montserrat'] text-gray-600 tracking-wide leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem accusantium ullam recusandae excepturi vel maiores tempore earum culpa laboriosam ab veritatis illo natus, dicta rerum delectus, repellat nisi reprehenderit illum.</p>

            <div class="product_size flex flex-row gap-3 box-border">
                ${product.dress_sizes.map(size => `
                    <div class="size_${size} border-[1px] rounded-md shadow-md px-[1rem] py-1 border-gray-300 hover:cursor-pointer hover:border-black">${size}</div>
                `).join('')}
            </div>

            <div class="product_color flex flex-row gap-2">
                ${product.dress_colors.map(color => `
                    <div class="${color} h-[1.5rem] w-[1.5rem] bg-${color} rounded-xl hover:border-solid hover:cursor-pointer hover: border-[2px] hover:border-black shadow-md"></div>
                `).join('')}
            </div>

            <div class="separation border-[1px] border-solid border-gray-200 w-[43.5rem]"></div>

            <div class="add_to_cart_section relative flex flex-row gap-5 items-center justify-start">
                <div class="btn_group flex box-border">
                
                    <button id="btn_neg" class="btn_neg border-[1px] px-[1.5rem] py-[1rem] border-black box-border h-[3rem] flex justify-center items-center hover:bg-red-300">-</button>

                    <p id="show_count" class="show_count border-[1px] px-[1.5rem] py-[1rem] border-black h-[3rem] flex justify-center items-center">1</p>

                    <button id="btn_pos" class="btn_pos border-[1px] px-[1.5rem] py-[1rem] border-black box-border h-[3rem] flex justify-center items-center hover:bg-green-300">+</button>
                </div>

                <button id="add_to_cart_btn" class="border-[1px] border-solid border-black px-[3rem] py-[0.5rem] hover:bg-gray-400 hover:border-none hover:text-white hover:duration-300 hover:ease-out absolute top-[0.2rem] left-[13rem]">Add to Cart</button>
            </div>

            <div class="separation border-[1px] border-solid border-gray-200 w-[43.5rem]"></div>

            <div class="additional flex flex-row font-['Montserrat']">
                <p class="text-gray-400 mr-6">SKU: N/A</p>
                <p class="text-gray-400 mr-2">Category: </p>
                <span class="font-medium">${product.category}</span>
            </div>

            <div class="guarantee_box relative border-[1px] border-solid border-gray-300 w-[43.5rem] h-[7rem] items-center justify-center flex flex-col rounded-md font-['Montserrat'] space-y-5">
                <div class="absolute top-[-0.8rem] bg-white z-20 text-lg font-semibold text-gray-500 px-4">Guaranteed Safe Checkout</div>
                <ul class="flex flex-row list-none gap-3 items-center justify-center mr-12">
                    <li><img src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png" alt="visa card" class="w-[3rem]"></li>
                    <li><img src="https://www.billwerk.plus/wp-content/webp-express/webp-images/uploads/2022/12/mastercard-payment-method-billwerk-150x150.jpg.webp" alt="master card" class="w-[3rem]"></li>
                    <li><img src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg" alt="bikash" class="w-[3rem]"></li>
                    <li><img src="https://play-lh.googleusercontent.com/OaoUA4XEfyeGaPPnO8Rioaa0m1Mf4300F-qRPXcTfNTPSjKxwUX-QNyy06nYreg88PrY=w240-h480-rw" alt="nogod" class="w-[2.5rem]"></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- 2nd Section -->
    <div class="review_section w-full relative flex flex-col h-full">
        <nav>
            <div class="nav nav-tabs font-['Montserrat'] font-semibold text-black text-lg" id="nav-tab" role="tablist">
                
            <button  class="nav-link active text-black" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description" aria-selected="true">Description</button>
                
            <button class="nav-link text-black" id="nav-information-tab" data-bs-toggle="tab" data-bs-target="#nav-information" type="button" role="tab" aria-controls="nav-information" aria-selected="false">Additional information</button>
                
            <button class="nav-link text-black" id="nav-reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-reviews" type="button" role="tab" aria-controls="nav-reviews" aria-selected="false">Reviews (${product.reviews.length || 0})</button>
            </div>
        </nav>

        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane active fade show" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" tabindex="0">
                <p class="text-gray-600 leading-loose tracking-wide font-['Montserrat'] font-semibold">Command attention and redefine authority with our Bohemian Rhapsody Attire – a collection tailored to empower the modern woman. Immerse yourself in a fusion of sleek design and undeniable confidence as you slip into our meticulously crafted suits. With sharp lines, sophisticated cuts, and attention to detail, each piece in this ensemble exudes professionalism without compromising on style. From the office to high-powered meetings, our Bohemian Rhapsody Attire is more than clothing; it’s a statement of strength, ambition, and unwavering elegance, ensuring you stride into any professional setting with unparalleled grace and authority.</p>
            </div>
            <div class="tab-pane fade" id="nav-information" role="tabpanel" aria-labelledby="nav-information-tab" tabindex="0">
                <table class="border-[1px] border-solid border-gray-300 w-full text-left rounded-md font-['Montserrat'] leading-loose tracking-wider">
                    <tr>
                        <th class="border-[1px] border-solid border-gray-300 text-left p-[1rem] w-[8rem]">Size</th>
                        <td class="border-[1px] border-solid border-gray-300 text-left p-[1rem]">${product.dress_sizes.join(', ')}</td>
                    </tr>
                    <tr>
                        <th class="border-[1px] border-solid border-gray-300 text-left p-[1rem] w-[8rem]">Color</th>
                        <td class="border-[1px] border-solid border-gray-300 text-left p-[1rem]">${product.dress_colors.map(formatColorName).join(', ')}</td>
                    </tr>
                    <tr>
                        <th class="border-[1px] border-solid border-gray-300 text-left p-[1rem] w-[8rem]">Materials</th>
                        <td class="border-[1px] border-solid border-gray-300 text-left p-[1rem]">Cotton, Polyester</td>
                    </tr>
                    <tr>
                        <th class="border-[1px] border-solid border-gray-300 text-left p-[1rem] w-[8rem]">Brand</th>
                        <td class="border-[1px] border-solid border-gray-300 text-left p-[1rem]">N/A</td>
                    </tr>
                </table>
            </div>
            <div class="tab-pane fade " id="nav-reviews" role="tabpanel" aria-labelledby="nav-reviews-tab" tabindex="0">
                <!-- Review contents go here -->

                <!-- display users review -->
                        <div
                            id= "customers_review" class="customers_review w-full min-h-[9rem] mt-[2rem] flex flex-col p-2">


                            ${reviewsHtml}

                        </div>

                        <!-- submit user review -->
                        <div class="feedback_div w-full min-h-[55rem] border-[1px] border-solid border-gray-300 flex flex-col p-[2rem] box-border relative gap-6 ">

                            <h4 class=" text-gray-500">Please Share your review with us</h4>
                            <p class=" text-gray-500">Your email address will not be published. Required fields are marked *</p>

                            <form name="feedback_form" id="feedback_form"  class=" text-black font-medium text-lg mb-[10rem]">

                                <label>How do you rate your overall experience?</label>

                                <div class="mb-3 d-flex flex-row py-1">
                                    <div class="form-check mr-3">
                                        <input class="form-check-input" type="radio" name="rating" id="rating_bad"
                                            value="0" required class="form-control">
                                        <label class="form-check-label" for="rating_bad">
                                            Bad
                                        </label>
                                    </div>

                                    <div class="form-check mx-3">
                                        <input class="form-check-input" type="radio" name="rating" id="rating_good"
                                            value="3" required class="form-control">
                                        <label class="form-check-label" for="rating_good">
                                            Good
                                        </label>
                                    </div>

                                    <div class="form-check mx-3">
                                        <input class="form-check-input" type="radio" name="rating"
                                            id="rating_excellent" value="5" required class="form-control">
                                        <label class="form-check-label" for="rating_excellent">
                                            Excellent!
                                        </label>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label" for="feedback_comments">Your review *:</label>
                                    <textarea class="form-control" required rows="10" name="comments"
                                        id="feedback_comments"></textarea>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <label class="form-label" for="feedback_name">Your Name *:</label>
                                        <input type="text" required name="name" class="form-control"
                                            id="feedback_name" />
                                    </div>

                                    <div class="col mb-4">
                                        <label class="form-label" for="feedback_email">Email *:</label>
                                        <input type="email" name="email" required class="form-control"
                                            id="feedback_email" />
                                    </div>
                                </div>
                                <button id="submit" type="submit"
                                    class=" border-[1px] border-solid border-black px-[3rem] py-[1rem]  hover:bg-black hover:border-none hover:text-white hover:duration-300 hover: ease-out ">Submit</button>
                            </form>

                        </div>

            </div>
        </div>
    </div>
    `;


    


    productContainer.appendChild( mainDiv );

    // add event Listiner for product count & price

    const btnPos = mainDiv.querySelector( "#btn_pos" );
    const btnNeg = mainDiv.querySelector( "#btn_neg" );
    const disCount = mainDiv.querySelector( "#show_count" );
    const price = mainDiv.querySelector( "#dis_price" );
    const addToCartBtn = mainDiv.querySelector( "#add_to_cart_btn" );

    let count = 1;


    const productPrice = product.price; // price per unit

    // function for update & display current price

    const updateCountAndPrice = () => {
        disCount.textContent = count;
        price.textContent = `$${(count*productPrice).toFixed(2)}`;
    };

    // Event listener for decrement button
    btnNeg.addEventListener( 'click', () => {
        if ( count > 1 ) {
            count--;
            updateCountAndPrice();
        }
    } );

    // Event listener for increment button
    btnPos.addEventListener( 'click', () => {
        count++;
        updateCountAndPrice();
    } );

    // Event listener for Add to Cart button
    addToCartBtn.addEventListener( 'click', () => {
        const cart = JSON.parse( localStorage.getItem( 'cart' ) ) || [];

        const selectedSize = mainDiv.querySelector( '.product_size div.border-black' );
        const selectedColor = mainDiv.querySelector( '.product_color div.border-black' );

        const cartItem = {
            id: product.id,
            title: product.title,
            price: productPrice,
            quantity: count,
            size: selectedSize ? selectedSize.textContent : null,
            color: selectedColor ? selectedColor.classList[ 0 ] : null,
            imgSrc: product.imgSrc,
            // totalPrice: (productPrice * count)
        };

        cart.push( cartItem );
        localStorage.setItem( 'cart', JSON.stringify( cart ) );


        count = 1;
        updateCountAndPrice();

        if ( selectedSize ) selectedSize.classList.remove( 'border-black' );
        if ( selectedColor ) selectedColor.classList.remove( 'border-black' );

        // Optionally show feedback to the user that the item was added to the cart

        // custom alert
        appendAlert( `${cartItem.title} added in your cart successfully`, 'success' )


    } );


    // custom alert
    const alertPlaceholder = document.getElementById( 'liveAlertPlaceholder' )
    const appendAlert = ( message, type ) => {
        const wrapper = document.createElement( 'div' )
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join( '' )

        alertPlaceholder.append( wrapper )
    }



    // Element size
    const sizeElements = mainDiv.querySelectorAll( '.product_size div' );
    sizeElements.forEach( sizeElem => {
        sizeElem.addEventListener( 'click', () => {
            sizeElements.forEach( elem => elem.classList.remove( 'border-black' ) );
            sizeElem.classList.add( 'border-black' );
        } );
    } );

    // Element Color
    const colorElements = mainDiv.querySelectorAll( '.product_color div' );
    colorElements.forEach( colorElem => {
        colorElem.addEventListener( 'click', () => {
            colorElements.forEach( elem => elem.classList.remove( 'border-black' ) );
            colorElem.classList.add( 'border-black' );
        } );
    } );




    document.getElementById('feedback_form').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const reviewerName = document.getElementById('feedback_name').value;
        const reviewText = document.getElementById('feedback_comments').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;

        console.log(rating);
        if (reviewerName && reviewText && rating) {
            const productId = getProductIdFromUrl(); // Implement this function to get the product ID from the URL
            const formData = {
                name: reviewerName,
                text: reviewText,
                rating: rating
            };
    
            try {
                const response = await fetch(`/api/users/products/${productId}/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
    
                if (!response.ok) {
                    alert('Failed to submit review')
                    throw new Error('Failed to submit review');
                }
    
                const updatedProduct = await response.json();
                console.log('Review submitted successfully:', updatedProduct);
    
                // Optionally update the UI with the new review
                // For example, you could append the new review to the list of reviews displayed on the page
    
                // Clear form fields
                document.getElementById('feedback_name').value = '';
                document.getElementById('feedback_comments').value = '';
                document.getElementById('feedback_email').value = '';
                document.querySelector('input[name="rating"]:checked').checked = false;

                window.location.reload();
            } catch (error) {
                console.error('Error submitting review:', error);
                // Handle error gracefully (e.g., show error message to user)
            }
        }
    });
    

}

function grade(rating) {
    if (rating == 5) {
        return 'Excellent';
    }else if (rating == 3) {
        return 'Good';
    }
    else {
        return 'Bad';
    }
}