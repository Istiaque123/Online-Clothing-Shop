import {
    loadFooter,
    setFooterNavigation
}
from './footer.js';

import {
    loadNavBarBG,
    setupNavigation
} from './nav.js';




// Load Dom
document.addEventListener( "DOMContentLoaded", () => {
    // Calling function for set footer and nav
    setupNavigation();

    loadFooter().then( () => {
        setFooterNavigation();
    } ).catch( error => {
        console.error( 'Failed to load footer:', error );
    } );
    loadNavBarBG();

    // Load login form initially
    loadLoginPage();

    // Event delegation to handle form navigation
    document.getElementById( "log_reg" ).addEventListener( "click", ( event ) => {
        if ( event.target && event.target.id === "acc_creat" ) {
            loadRegestrationForm();
        } else if ( event.target && event.target.id === "loginPage" ) {
            loadLoginPage();
        }
    } );



} );






// function for load Login Or Registration
function loadLoginPage() {
    const parentDiv = document.getElementById( "log_reg" );
    if ( !parentDiv ) {
        console.log( "Something wrong loading Log" );
        return;
    }
    // clear div

    parentDiv.classList.remove( 'h-[100rem]' );
    parentDiv.classList.add( 'h-[70rem]' );
    parentDiv.innerHTML = '';

    const email = localStorage.getItem( 'regEmail' ) || ''; // Retrieve the email from localStorage

    parentDiv.appendChild( renderLogin( email ) );


    // Event listener for form submission in the client-side code
    document.getElementById( 'login-form' ).addEventListener( "submit", async ( event ) => {
        event.preventDefault();

        const formData = new FormData( event.target );
        const formObject = Object.fromEntries( formData.entries() );

        console.log( 'Form Data:', formData );
        console.log( 'Form Object:', formObject );

        // Validate if both email and password are provided
        if ( !formObject.email || !formObject.password ) {
            console.log( 'Email:', formObject.email );
            console.log( 'Password:', formObject.password );
            alert( 'Please provide both email and password. :(' );
            return;
        }

        try {


            const response = await fetch( '/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',


                },
                body: JSON.stringify( formObject ),
            } );
            const result = await response.json();

            if ( response.ok ) {
                alert( 'Login successful' );
                localStorage.setItem('user', JSON.stringify(result.user)); // Store user data in session storage
                localStorage.removeItem('cart');
                window.location.href = '/account';
            } else {
                alert( result.message );
                if ( result.message === 'Wrong password' ) {
                    document.getElementById( 'loginPassword' ).value = ''; // Clear password field
                }
            }
        } catch ( error ) {
            console.error( 'Error logging in:', error );
            alert( 'Failed to login. Please try again later.' );
        }
    } );

}

function loadRegestrationForm() {
    const parentDiv = document.getElementById( "log_reg" );
    if ( !parentDiv ) {
        console.log( "Something wrong in parent Div" );
        return;
    }

    parentDiv.classList.remove( 'h-[70rem]' );
    parentDiv.classList.add( 'h-[100rem]' );

    // clear div
    parentDiv.innerHTML = '';
    const registrationForm = renderRegePage();
    parentDiv.appendChild( registrationForm );


    // Event listener for form submission in the client-side code
    registrationForm.querySelector( '#registration-form' ).addEventListener( "submit", async ( event ) => {
        event.preventDefault();

        const formData = new FormData( event.target );
        const formObject = Object.fromEntries( formData.entries() );

        if ( !validateForm( formObject ) ) {
            alert( 'Please fill out all required fields correctly.' );
            return;
        }

        try {
            console.log( 'Sending data:', formObject ); // Add this line
            const response = await fetch( '/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( formObject )
            } );

            const result = await response.json();
            if ( response.ok ) {
                alert( 'Registration successful' );
                localStorage.setItem( 'regEmail', formObject.email );
                window.location.href = '/logReg';
            } else {
                alert( result.message );
            }
        } catch ( error ) {
            alert( 'Internal Server Error. Please try again later.' );
        }
    } );

}


function validateForm( formData ) {
    // Example validation logic


    return formData.firstName && formData.lastName && formData.email && formData.password && formData.repassword && formData.birthDate && formData.mobile && formData.gender && formData.district && formData.region && formData.city && formData.postalCode;
}


// function for Render login page
function renderLogin( email ) {
    // Create New div
    let mainDiv = document.createElement( 'div' );

    mainDiv.setAttribute( 'id', 'account_log' );
    mainDiv.classList.add( 'account_log', 'flex', 'flex-col', 'items-center', 'justify-start', 'gap-3', 'mt-6' );

    mainDiv.innerHTML = `
        <h1 id="heading_info" class="font-[Cormorant-Garamond] italic mb-20">Account Login</h1>
        <div class="login_form flex flex-col gap-14 items-center justify-center">

            <form id="login-form" class="w-[40rem]" method= "POST" action= "/api/users/login">
                <div class="mb-3 flex flex-col gap-3">
                    <label for="loginEmail" class="form-label font-[Cormorant-Garamond] text-xl italic">Email address</label>
                    
                    <input type="email" class="form-control" id="loginEmail" name="email" aria-describedby="emailHelp" value="${email}">
                    
                    <div id="emailHelp" class="form-text text-lg font-semibold">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3 flex flex-col gap-3">
                    <label for="loginPassword" class="form-label font-[Cormorant-Garamond] text-xl italic">Password</label>
                    <input type="password" class="form-control" id="loginPassword" name="password">
                </div>
                <button id="log_submit" type="submit"
                    class="border-[1px] border-solid border-black px-[19rem] py-[1rem] mt-10 hover:bg-black hover:border-none hover:text-white hover:duration-300 hover:ease-out">Login</button>
            </form>
            <div class="seperation border-[1px] border-solid border-gray-200 w-[40.5rem] relative">
                <h6 class="absolute -top-[.7rem] bg-white w-[13rem] left-[13rem] flex items-center justify-center">Don't have an account?</h6>
            </div>
            <button id="acc_creat"
                class="border-[1px] border-solid border-black px-[14.3rem] py-[1rem] mt-10 hover:bg-black hover:border-none hover:text-white hover:duration-300 hover:ease-out">Create an Account</button>
        </div>
    `;


    return mainDiv;
}



// function for Render Reg page
function renderRegePage() {

    let mainDiv = document.createElement( 'div' );

    mainDiv.setAttribute( 'id', 'account_create' );
    mainDiv.classList.add( 'account_create', 'flex', 'flex-col', 'items-center', 'justify-start', 'gap-3', 'mt-6' );

    mainDiv.innerHTML = `
                <h1 id="heading_info" class=" font-[Cormorant-Garamond] italic mb-20">Create an Account</h1>
                <div class="acc_crt_form flex flex-col gap-14 items-center justify-center w-full">

                    <form id="registration-form" method= "POST" action= "/api/users/register">
                        <div class="mb-4 flex space-x-2">
                            <div class="flex-1">
                                <label for="first" class="block text-gray-700 font-bold mb-2">First Name:</label>
                                <input type="text" id="first" name="firstName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div class="flex-1">
                                <label for="last" class="block text-gray-700 font-bold mb-2">Last Name:</label>
                                <input type="text" id="last" name="lastName" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div class="mb-4">
                            <label for="email" class="block text-gray-700 font-bold mb-2">Email:</label>
                            <input type="email" id="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div class="mb-4 flex space-x-2">
                            <div class="flex-1">
                                <label for="password" class="block text-gray-700 font-bold mb-2">Password:</label>
                                <input type="password" id="password" name="password" title="Password must contain at least one number, one alphabet, one symbol, and be at least 8 characters long" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div class="flex-1">
                                <label for="repassword" class="block text-gray-700 font-bold mb-2">Re-type Password:</label>
                                <input type="password" id="repassword" name="repassword" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>

                        <div class="mb-4">
                                <label for="birthDate" class="block text-gray-700 font-bold mb-2">Birth Date:</label>
                                <input type="date" id="birthDate" name="birthDate" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                         </div>
                        
                        <div class="mb-4">
                            <label for="mobile" class="block text-gray-700 font-bold mb-2">Contact:</label>
                            <input type="text" id="mobile" name="mobile"  title="Contact must be exactly 10 digits" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                        </div>
                        <div class="mb-4">
                            <label for="gender" class="block text-gray-700 font-bold mb-2">Gender:</label>
                            <select id="gender" name="gender" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:cursor-pointer">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="mb-4 flex space-x-2">
                            <div class="flex-1">
                                <label for="district" class="block text-gray-700 font-bold mb-2">District:</label>
                                <select id="district" name="district" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:cursor-pointer">
                                    <option value="">Select District</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Chittagong">Chittagong</option>
                                    <option value="Khulna">Khulna</option>
                                    <option value="Rajshahi">Rajshahi</option>
                                    <option value="Comilla">Comilla</option>
                                    <option value="Barisal">Barisal</option>
                                    <option value="Sylhet">Sylhet</option>


                                    <!-- Add more districts as needed -->
                                </select>
                            </div>
                            <div class="flex-1">
                                <label for="region" class="block text-gray-700 font-bold mb-2">Region:</label>
                                <select id="region" name="region" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:cursor-pointer">
                                    <option value="">Select Region</option>
                                </select>
                            </div>
                        </div>
                        <div class="mb-4 flex space-x-2">
                            <div class="flex-1">
                                <label for="city" class="block text-gray-700 font-bold mb-2">City:</label>
                                <select id="city" name="city" required class="w-full px-3 py-2 border border-gray-300 rounded-lg hover:cursor-pointer">
                                    <option value="">Select City</option>
                                </select>
                            </div>
                            <div class="flex-1">
                                <label for="postalCode" class="block text-gray-700 font-bold mb-2">Postal Code:</label>
                                <input type="text" id="postalCode" name="postalCode" title="Postal Code must be exactly 4 digits" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <button id="reg_submit" type="submit"
                                    class=" border-[1px] border-solidborder-black px-[15rem] py-[1rem]  hover:bg-black hover:border-none hover:text-white hover:duration-300 hover: ease-out">SUBMIT</button>
                    </form>

                    <div class="seperation border-[1px] border-solid border-gray-200 w-[36rem] relative ">
                        <h6 class=" absolute -top-[.7rem] bg-white w-[17rem] left-[9rem] flex items-center justify-center font-semibold">Already have an account?
                        </h6>
                    </div>

                    <p>If you already have an account with us, please login at the</p>
                    <p id="loginPage" class=" font-semibold hover:cursor-pointer text-red-400 hover:text-red-600">Login Page</p>

                </div>

            </div>`;

    // Add event listeners for dynamic population
    mainDiv.querySelector( '#district' ).addEventListener( 'change', function () {
        const selectDistrict = this.value;
        if ( selectDistrict ) {
            populateRegions( selectDistrict );

        } else {
            clearOptions( 'region' );
            clearOptions( 'city' );


        }
    } );

    mainDiv.querySelector( '#region' ).addEventListener( 'change', function () {
        const selectedRegion = this.value;
        if ( selectedRegion ) {
            populateCities( selectedRegion );
        } else {
            clearOptions( 'city' );
        }
    } );








    return mainDiv;

}


// Function to populate regions based on selected district
function populateRegions( districtName ) {
    const district = data.districts.find( d => d.name === districtName );
    if ( district ) {
        const regionSelect = document.getElementById( 'region' );
        regionSelect.innerHTML = '<option value="">Select Region</option>'; // Reset options

        district.regions.forEach( region => {
            const option = document.createElement( 'option' );
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild( option );
        } );
    }
}

// Function to populate cities based on selected region
function populateCities( regionName ) {
    const cities = data.cities[ regionName ];

    if ( cities ) {
        const citySelect = document.getElementById( 'city' );

        citySelect.innerHTML = '<option value="">Select City</option>'; // reset value

        cities.forEach( city => {

            const option = document.createElement( 'option' );
            option.value = city;
            option.innerText = city;
            citySelect.appendChild( option );
        } );
    }
}

// Function to clear options in a select element
function clearOptions( elementId ) {
    const selectElement = document.getElementById( elementId );
    selectElement.innerHTML = '<option value="">Select Option</option>';
}

const data = {
    districts: [ {
            name: 'Dhaka',
            regions: [ 'Mirpur', 'Uttara', 'Gulshan', 'Dhanmondi', 'Narayanganj', 'Purbachal', 'Munshiganj' ]
        },
        {
            name: 'Chittagong',
            regions: [ 'Agrabad', 'Halishahar', 'Pahartali' ]
        },
        {
            name: 'Khulna',
            regions: [ 'Khulna City', 'Jessore' ]
        },
        {
            name: 'Rajshahi',
            regions: [ 'Rajshahi City', 'Bogra' ]
        },
        {
            name: 'Comilla',
            regions: [ 'Comilla Sadar', 'Chandina', 'Brahmanpara' ]
        },
        {
            name: 'Barisal',
            regions: [ 'Barisal Sadar', 'Bakerganj', 'Banaripara' ]
        },
        {
            name: 'Sylhet',
            regions: [ 'Sylhet Sadar', 'Moulvibazar', 'Habiganj' ]
        },
        // Add more districts as needed
    ],
    cities: {
        'Mirpur': [ 'Mirpur-1', 'Mirpur-2', 'Mirpur-3', 'Mirpur-4', 'Mirpur-5', 'Mirpur-6', 'Mirpur-7', 'Mirpur-8', 'Mirpur-9', 'Mirpur-10', 'Mirpur-11', 'Mirpur-12', ],
        'Uttara': [ 'Uttara Sector-1', 'Uttara Sector-3', 'Uttara Sector-10' ],
        'Gulshan': [ 'Gulshan-1', 'Gulshan-2', 'Gulshan-3' ],
        'Dhanmondi': [ 'Dhanmondi Road-27', 'Dhanmondi Road-15', 'Dhanmondi Road-9' ],
        'Narayanganj': [ 'Narayanganj City', 'Narayanganj Sadar', 'Bandar', 'Narayanganj Bazar', 'Narayanganj Upazila' ],
        'Purbachal': [ 'Purbachal City', 'Purbachal Bazar', 'Purbachal Upazila' ],
        'Munshiganj': [ 'Munshiganj City', 'Munshiganj Bazar', 'Munshiganj Upazila' ],
        'Agrabad': [ 'Agrabad C/A', 'Agrabad Access Road', 'Agrabad R/A' ],
        'Halishahar': [ 'Halishahar Housing Estate', 'Halishahar R/A' ],
        'Pahartali': [ 'Pahartali R/A', 'Pahartali A Block', 'Pahartali B Block' ],
        'Khulna City': [ 'Khulna Sadar', 'Sonadanga', 'Khalishpur' ],
        'Jessore': [ 'Jessore Sadar', 'Chanchra', 'Kazipara' ],
        'Rajshahi City': [ 'Rajshahi Sadar', 'Boalia', 'Laxmipur' ],
        'Bogra': [ 'Bogra Sadar', 'Nigar', 'Bogra Cantt' ],
        'Comilla Sadar': [ 'Comilla City', 'Laksam', 'Debidwar' ],
        'Chandina': [ 'Chandina Bazar', 'Chandina Road', 'Chandina Upazila' ],
        'Brahmanpara': [ 'Brahmanpara Bazar', 'Brahmanpara Road', 'Brahmanpara Upazila' ],
        'Barisal Sadar': [ 'Barisal City', 'Babuganj', 'Bakerganj' ],
        'Bakerganj': [ 'Bakerganj City', 'Bakerganj Bazar', 'Bakerganj Upazila' ],
        'Banaripara': [ 'Banaripara Bazar', 'Banaripara Road', 'Banaripara Upazila' ],
        'Sylhet Sadar': [ 'Sylhet City', 'Moulvibazar', 'Habiganj' ],
        'Moulvibazar': [ 'Moulvibazar City', 'Moulvibazar Bazar', 'Moulvibazar Upazila' ],
        'Habiganj': [ 'Habiganj City', 'Habiganj Bazar', 'Habiganj Upazila' ],
        // Add more cities as needed
    }
};

// Abcd1234