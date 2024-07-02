import {
    loadFooter,
    setFooterNavigation
} from './footer.js';
import {
    loadNavBarBG,
    setupNavigation
} from './nav.js';

document.addEventListener("DOMContentLoaded", () => {
    // Calling functions for nav and footer
    setupNavigation();

    loadFooter().then(() => {
        setFooterNavigation();
    });

    loadNavBarBG();

    loadCheckout();
});

const stripe = Stripe('pk_test_51PY1URIO92QxP7O2VHKotjqiq37rPrpcanUnDleSskZfskoOdMDUoU7nlfOWhkZ4IB7Oehcveefcw3H8S39Ncfcb00TMrpCS7H'); // Your Stripe publishable key
const elements = stripe.elements();
const style = {
    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
    }
};

const card = elements.create('card', { style: style });

function loadCheckout() {
    const parentDiv = document.getElementById('checkoutSection');
    parentDiv.innerHTML = '';

    const firstChildDiv = document.createElement('div');
    firstChildDiv.classList.add('address_section', 'w-[60rem]', 'box-border', 'p-[3rem]', 'relative', "font-['Montserrat']", "font-semibold");

    firstChildDiv.innerHTML = `
        <div class="heading w-full h-[7rem] flex flex-col gap-4">
            <h1 class="font-[Cormorant-Garamond] font-semibold italic text-5xl">Billing Details</h1>
            <div class="sectionDiv w-[54rem] border-[1px] border-solid absolute z-10 border-gray-400 top-[8rem]"></div>
        </div>

        <form id="billingForm">
            <div class="row">
                <div class="col">
                    <label for="first-name">First name *</label>
                    <input type="text" id="first-name" required class="form-control" aria-label="First name">
                </div>
                <div class="col">
                    <label for="last-name">Last name *</label>
                    <input type="text" required id="last-name" class="form-control" aria-label="Last name">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label for="company-name">Company name (optional)</label>
                    <input type="text" id="company-name" class="form-control" aria-label="Company name">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label for="region">Region *</label>
                    <input type="text" required id="region" class="form-control" aria-label="Region">
                </div>
                <div class="col">
                    <label for="street-address">Street address *</label>
                    <input type="text" required id="street-address" class="form-control" aria-label="Street address">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label for="state">State *</label>
                    <input type="text" required id="state" class="form-control" aria-label="State">
                </div>
                <div class="col">
                    <label for="zip-code">ZIP Code *</label>
                    <input type="text" required id="zip-code" class="form-control" aria-label="ZIP Code">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label for="phone">Phone *</label>
                    <input type="text" required id="phone" class="form-control" aria-label="Phone">
                </div>
                <div class="col">
                    <label for="email">Email address *</label>
                    <input type="email" required id="email" class="form-control" aria-label="Email address">
                </div>
            </div>
        </form>

        <div class="heading w-full h-[7rem] flex flex-col gap-4 mt-[4rem]">
            <h1 class="font-[Cormorant-Garamond] font-semibold italic text-5xl">Additional Information</h1>
            <div class="sectionDiv w-[54rem] border-[1px] border-solid absolute z-10 border-gray-400 bottom-[15rem]"></div>
        </div>
        <div class="mb-3 mt-[1rem]">
            <label for="exampleFormControlTextarea1" class="form-label">Notes about your order</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Notes about your order, e.g. special notes for delivery"></textarea>
        </div>`;

    const secondChildDiv = document.createElement('div');
    secondChildDiv.classList.add("price_section", "w-[54rem]", "min-h-[20rem]", "flex", "flex-col", "items-center", "justify-center", "p-[3rem]", "border-[1px]", "border-solid", "border-gray-300", "box-border", "font-['Montserrat']");

    let orderItemsHTML = '';
    let subtotal = 0;
    productInCart.forEach(product => {
        const productSubtotal = product.price * product.quantity;
        subtotal += productSubtotal;
        const color = product.color ? product.color.split('-')[0] : '';
        const size = product.size || '';
        orderItemsHTML += `
            <div class="product_info font-semibold text-gray-400 flex flex-row w-full items-center justify-between relative mt-[2rem]">
                <p>${product.title} -> ${color ? ` ${color.toUpperCase()}` : ''} ${size ? `(${size})` : ''} (Q: ${product.quantity})</p>
                <p>$${productSubtotal.toFixed(2)}</p>
                <div class="sectionDiv w-full border-[1px] border-solid absolute z-10 border-gray-400 top-[3rem]"></div>
            </div>`;
    });

    secondChildDiv.innerHTML = `
        <div class="heading flex items-center justify-start flex-row w-full h-[9rem]">
            <h1 class="font-[Cormorant-Garamond] font-semibold italic">Your Order</h1>
        </div>
        <div class="product_info_heading font-semibold text-gray-400 flex flex-row w-full items-center justify-between relative mt-[1rem]">
            <p>Product</p>
            <p>Subtotal</p>
            <div class="sectionDiv w-full border-[1px] border-solid absolute z-10 border-gray-400 top-[3rem]"></div>
        </div>
        ${orderItemsHTML}
        <div class="product_info_subtotal font-semibold text-gray-400 flex flex-row w-full items-center justify-between relative mt-[2rem]">
            <p>Subtotal</p>
            <p>$${subtotal.toFixed(2)}</p>
            <div class="sectionDiv w-full border-[1px] border-solid absolute z-10 border-gray-400 top-[3rem]"></div>
        </div>
        <div class="product_info font-semibold text-gray-400 flex flex-row w-full items-center justify-between relative mt-[2rem]">
            <p>Total</p>
            <p>$${subtotal.toFixed(2)}</p>
            <div class="sectionDiv w-full border-[1px] border-solid absolute z-10 border-gray-400 top-[3rem]"></div>
        </div>
        <div id="card-element" class="border-[1px] border-solid border-gray-300 p-3 mt-3 mb-3 w-full">
            <!-- A Stripe Element will be inserted here. -->
        </div>
        <div id="card-errors" role="alert" class="text-red-500 mb-3"></div>
        <button id="placeOrderBtn" class="border-[1px] border-solid border-black mt-[3rem] mb-[3rem] px-[16rem] py-[1.3rem] hover:bg-black hover:border-none hover:text-white hover:duration-300 hover:ease-out font-['Montserrat'] font-semibold leading-relaxed">Place Order</button>`;

    parentDiv.appendChild(firstChildDiv);
    parentDiv.appendChild(secondChildDiv);

    card.mount('#card-element');

    document.getElementById('placeOrderBtn').addEventListener('click', handlePlaceOrder);
}

async function handlePlaceOrder(event) {
    event.preventDefault();

    try {
        const billingForm = document.getElementById('billingForm');
        if (!billingForm.checkValidity()) {
            billingForm.reportValidity();
            return;
        }

        const orderDetails = getOrderDetails();
        const total = orderDetails.total;

        // Create a payment intent
        const paymentIntentResponse = await fetch('/api/users/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ total, orderDetails })
        });

        const { clientSecret } = await paymentIntentResponse.json();

        // Confirm the payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: `${orderDetails.firstName} ${orderDetails.lastName}`,
                    email: orderDetails.email,
                    phone: orderDetails.phone,
                    address: {
                        line1: orderDetails.streetAddress,
                        city: orderDetails.region,
                        state: orderDetails.state,
                        postal_code: orderDetails.zipCode,
                    }
                }
            }
        });

        if (error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Place the order in the backend
            const response = await fetch('/api/users/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (response.ok) {
                const order = await response.json();
                console.log('Order placed:', JSON.stringify(order, null, 2));
                alert('Thank you for your purchase!');
                billingForm.reset();
                localStorage.removeItem('cart');

                // Redirect to a confirmation page or show a success message
                window.location.href = '/shop';
            } else {
                const error = await response.json();
                console.error('Error placing order:', error);
                alert("Error in connection");
            }
        }
    } catch (error) {
        console.error('Error during handlePlaceOrder:', error);
    }
}

const productInCart = JSON.parse(localStorage.getItem('cart')) || [];

function getOrderDetails() {
    const billingForm = document.getElementById('billingForm');
    return {
        firstName: billingForm['first-name'].value,
        lastName: billingForm['last-name'].value || ' ',
        companyName: billingForm['company-name'].value,
        region: billingForm['region'].value,
        streetAddress: billingForm['street-address'].value,
        state: billingForm['state'].value,
        zipCode: billingForm['zip-code'].value,
        phone: billingForm['phone'].value,
        email: billingForm['email'].value,
        additionalNotes: document.getElementById('exampleFormControlTextarea1').value,
        products: productInCart.map(product => ({
            title: product.title,
            price: product.price,
            quantity: product.quantity,
            size: product.size || 'N/A',
            color: product.color ? product.color.split('-')[0].toUpperCase() : 'N/A'
        })),
        total: productInCart.reduce((total, product) => total + product.price * product.quantity, 0)
    };
}
