import { loadFooter, setFooterNavigation } from './footer.js';
import { loadNavBarBG, setupNavigation } from './nav.js';

document.addEventListener("DOMContentLoaded", async () => {
    setupNavigation();
    loadFooter().then(() => {
        setFooterNavigation();
    }).catch(error => {
        console.error('Failed to load footer:', error);
    });

    loadNavBarBG();
    setAddress();

    const populateForm = (user) => {
        document.getElementById('email').value = user.email;
        document.getElementById('first').value = user.firstName;
        document.getElementById('last').value = user.lastName;
        document.getElementById('password').value = ''; // Clear password field for security
        document.getElementById('newpassword').value = ''; // Clear new password field for security
        document.getElementById('birthdate').value = user.birthDate.substring(0, 10); // Format birth date
        document.getElementById('mobile').value = user.mobile;
        document.getElementById('postalcode').value = user.postalCode;
        document.getElementById('district').value = user.district;
        document.getElementById('region').innerHTML = `<option value="${user.region}">${user.region}</option>`;
        document.getElementById('city').innerHTML = `<option value="${user.city}">${user.city}</option>`;
    };

    const updateUserInDB = async (updatedUserData) => {
        try {
            const response = await fetch('/api/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData)
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const updatedUser = await response.json();
            updateUserDataInSession(updatedUser);
            return true;
        } catch (error) {
            console.error('Error updating user:', error);
            return false;
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById('first').value,
            lastName: document.getElementById('last').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            newpassword: document.getElementById('newpassword').value,
            birthDate: document.getElementById('birthdate').value,
            mobile: document.getElementById('mobile').value,
            postalCode: document.getElementById('postalcode').value,
            district: document.getElementById('district').value,
            region: document.getElementById('region').value,
            city: document.getElementById('city').value
        };

        const updated = await updateUserInDB(formData);
        if (updated) {
            updateUserDataInSession(formData);

            localStorage.setItem('fName', formData.firstName);
            localStorage.setItem('lName', formData.lastName);
            alert('User information updated successfully!');
            window.location.reload();

        } else {
            alert('Failed to update user information. Please try again.');
        }
    };

    const updateUserDataInSession = (updatedUserData) => {
        const user = getUserData();
        if (user) {
            const updatedUser = {
                ...user,
                ...updatedUserData
            };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const getUserData = () => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    };

    document.getElementById('update').addEventListener('click', handleFormSubmit);

    const user = getUserData();
    if (!user) {
        alert('No user logged in');
        window.location.href = '/logReg'; // Redirect to login if no user is found
    } else {

        localStorage.setItem('fName', user.firstName);
        localStorage.setItem('lName', user.lastName);

        populateForm(user);
        
    }

    const logOutBtn = document.getElementById('logOut');
    logOutBtn.addEventListener('click', function(event){
        event.preventDefault();

        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        localStorage.setItem('fName', 'Register ');
        localStorage.setItem('lName', 'or Login');


        window.location.href = '/logReg';
    });


});





function setAddress() {
    const district = document.getElementById('district');
    district.addEventListener('change', function () {
        const selectDistrict = this.value;
        if (selectDistrict) {
            populateRegions(selectDistrict);
        } else {
            clearOptions('region');
            clearOptions('city');
        }
    });

    const region = document.getElementById('region');
    region.addEventListener('change', function () {
        const selectedRegion = this.value;
        if (selectedRegion) {
            populateCities(selectedRegion);
        } else {
            clearOptions('city');
        }
    });
}

function populateRegions(districtName) {
    const district = data.districts.find(d => d.name === districtName);
    if (district) {
        const regionSelect = document.getElementById('region');
        regionSelect.innerHTML = '<option value="">Select Region</option>'; // Reset options
        district.regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    }
}

function populateCities(regionName) {
    const cities = data.cities[regionName];
    if (cities) {
        const citySelect = document.getElementById('city');
        citySelect.innerHTML = '<option value="">Select City</option>'; // reset value
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.innerText = city;
            citySelect.appendChild(option);
        });
    }
}

function clearOptions(elementId) {
    const selectElement = document.getElementById(elementId);
    selectElement.innerHTML = '<option value="">Select Option</option>';
}

const data = {
    districts: [{
            name: 'Dhaka',
            regions: ['Mirpur', 'Uttara', 'Gulshan', 'Dhanmondi', 'Narayanganj', 'Purbachal', 'Munshiganj']
        },
        {
            name: 'Chittagong',
            regions: ['Agrabad', 'Halishahar', 'Pahartali']
        },
        {
            name: 'Khulna',
            regions: ['Khulna City', 'Jessore']
        },
        {
            name: 'Rajshahi',
            regions: ['Rajshahi City', 'Bogra']
        },
        {
            name: 'Comilla',
            regions: ['Comilla Sadar', 'Chandina', 'Brahmanpara']
        },
        {
            name: 'Barisal',
            regions: ['Barisal Sadar', 'Bakerganj', 'Banaripara']
        },
        {
            name: 'Sylhet',
            regions: ['Sylhet Sadar', 'Moulvibazar', 'Habiganj']
        },
        // Add more districts as needed
    ],
    cities: {
        'Mirpur': ['Mirpur-1', 'Mirpur-2', 'Mirpur-3', 'Mirpur-4', 'Mirpur-5', 'Mirpur-6', 'Mirpur-7', 'Mirpur-8', 'Mirpur-9', 'Mirpur-10', 'Mirpur-11', 'Mirpur-12'],
        'Uttara': ['Uttara Sector-1', 'Uttara Sector-3', 'Uttara Sector-10'],
        'Gulshan': ['Gulshan-1', 'Gulshan-2', 'Gulshan-3'],
        'Dhanmondi': ['Dhanmondi Road-27', 'Dhanmondi Road-15', 'Dhanmondi Road-9'],
        'Narayanganj': ['Narayanganj City', 'Narayanganj Sadar', 'Bandar', 'Narayanganj Bazar', 'Narayanganj Upazila'],
        'Purbachal': ['Purbachal City', 'Purbachal Bazar', 'Purbachal Upazila'],
        'Munshiganj': ['Munshiganj City', 'Munshiganj Bazar', 'Munshiganj Upazila'],
        'Agrabad': ['Agrabad C/A', 'Agrabad Access Road', 'Agrabad R/A'],
        'Halishahar': ['Halishahar Housing Estate', 'Halishahar R/A'],
        'Pahartali': ['Pahartali R/A', 'Pahartali A Block', 'Pahartali B Block'],
        'Khulna City': ['Khulna Sadar', 'Sonadanga', 'Khalishpur'],
        'Jessore': ['Jessore Sadar', 'Chanchra', 'Kazipara'],
        'Rajshahi City': ['Rajshahi Sadar', 'Boalia', 'Laxmipur'],
        'Bogra': ['Bogra Sadar', 'Nigar', 'Bogra Cantt'],
        'Comilla Sadar': ['Comilla City', 'Laksam', 'Debidwar'],
        'Chandina': ['Chandina Bazar', 'Chandina Road', 'Chandina Upazila'],
        'Brahmanpara': ['Brahmanpara Bazar', 'Brahmanpara Road', 'Brahmanpara Upazila'],
        'Barisal Sadar': ['Barisal City', 'Babuganj', 'Bakerganj'],
        'Bakerganj': ['Bakerganj City', 'Bakerganj Bazar', 'Bakerganj Upazila'],
        'Banaripara': ['Banaripara Bazar', 'Banaripara Road', 'Banaripara Upazila'],
        'Sylhet Sadar': ['Sylhet City', 'Moulvibazar', 'Habiganj'],
        'Moulvibazar': ['Moulvibazar City', 'Moulvibazar Bazar', 'Moulvibazar Upazila'],
        'Habiganj': ['Habiganj City', 'Habiganj Bazar', 'Habiganj Upazila'],
        // Add more cities as needed
    }
};
