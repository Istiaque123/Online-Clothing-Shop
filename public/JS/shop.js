
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
        const response = await fetch('http://localhost:3000/api/users/productsAll');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();

        const productsWithoutId = products.map((product, index) => ({
            imgSrc: product.imgSrc,
            id: index,
            category: product.category,
            title: product.title,
            price: product.price,
            popularity: product.popularity,
            rating: product.rating,
            date: product.date,
            dress_sizes: product.dress_sizes,
            dress_colors: product.dress_colors,
            reviews: {}
        }));

        return productsWithoutId;

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    setupNavigation();
    
    loadFooter().then(() => {
        setFooterNavigation();
    });

    loadNavBarBG();
    
    const cardsData = await fetchProducts();  // Await the fetched products

    function generateCards(cardsData) {
        const cardContainer = document.querySelector("#cards");
        cardContainer.innerHTML = ''; // Clear any existing content

        cardsData.forEach((card, index) => {
            let cardElement = document.createElement("div");
            cardElement.className = "my-card w-[18rem] h-[40rem] flex flex-col justify-start items-center";
            cardElement.setAttribute("id", `card_${card.id}`);

            cardElement.dataset.price = card.price;
            cardElement.dataset.category = card.category;
            cardElement.dataset.title = card.title;
            cardElement.dataset.popularity = card.popularity;
            cardElement.dataset.rating = card.rating;
            cardElement.dataset.date = card.date;
            cardElement.dataset.id = card.id;

            let imgHight = "100%";
            if (card.dress_sizes.length === 0) {
                imgHight = "27.5rem";
            }

            cardElement.innerHTML = `
                <img id="card_img_${card.id}" src="${card.imgSrc}" class="card_img hover:cursor-pointer rounded-md w-[100%] h-[${imgHight}] object-cover" alt="model_${index}">
                <div class="discription flex flex-col justify-center items-center ">
                    <h6 class=" text-stone-400 mt-3">${card.category}</h6>
                    <h6 id="card_title_${card.id}" class="card_title hover:cursor-pointer font-[Cormorant-Garamond] hover:text-red-600 text-lg font-bold">
                        ${card.title}
                    </h6>
                    <h6 class=" text-slate-500">$${card.price}</h6>
                </div>
                <div class="sizes flex mr-7">
                    <ul class="flex flex-row space-x-4 mr-4 justify-center items-center">
                        ${card.dress_sizes.map(size => `<li class="flex border-2 w-8 h-8 items-center justify-center hover:border-solid hover:border-black"><a class="no-underline text-gray-600" href="#">${size}</a></li>`).join('')}
                    </ul>
                </div>
                <div class="colors flex items-center justify-center relative">
                    <ul class="flex flex-row space-x-4 mr-4 items-center justify-center">
                        ${card.dress_colors.map(color => `<li class=""><button class="bg-${color} w-5 h-5 border-2 border-solid border-black rounded-xl hover:h-6 hover:w-6"></button></li>`).join('')}
                    </ul>
                </div>
            `;

            cardContainer.appendChild(cardElement);

            document.getElementById(`card_img_${card.id}`).addEventListener('click', () => {
                navigateToProduct(card.id);
            });
            document.getElementById(`card_title_${card.id}`).addEventListener('click', () => {
                navigateToProduct(card.id);
            });
        });
    }

    function navigateToProduct(productId) {
        const url = `/product?product_id=${productId}`;
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            newWindow.focus();
        } else {
            alert('Please allow pop-ups for this site to open the product details.');
        }
    }

    generateCards(cardsData);

    function sortCards(criteria) {
        const cardContainer = document.querySelector(".cards");
        const cards = Array.from(cardContainer.children);

        cards.sort((a, b) => {
            let aValue, bValue;

            switch (criteria) {
                case "popularity":
                    aValue = parseFloat(a.dataset.popularity);
                    bValue = parseFloat(b.dataset.popularity);
                    break;
                case "avg":
                    aValue = parseFloat(a.dataset.rating);
                    bValue = parseFloat(b.dataset.rating);
                    break;
                case "latest":
                    aValue = new Date(a.dataset.date);
                    bValue = new Date(b.dataset.date);
                    return bValue - aValue;
                case "low-high":
                    aValue = parseFloat(a.dataset.price);
                    bValue = parseFloat(b.dataset.price);
                    break;
                case "default":
                    aValue = parseInt(a.dataset.id);
                    bValue = parseInt(b.dataset.id);
                    break;
                case "high-low":
                    aValue = parseFloat(a.dataset.price);
                    bValue = parseFloat(b.dataset.price);
                    return bValue - aValue;
                default:
                    return 0;
            }

            if (criteria === "high-low" || criteria === "popularity" || criteria === "avg") {
                return bValue - aValue;
            } else {
                return aValue - bValue;
            }
        });

        cardContainer.innerHTML = "";
        cards.forEach(card => cardContainer.appendChild(card));
    }

    document.querySelector("#sortCards").addEventListener("change", (event) => {
        sortCards(event.target.value);
    });
});
// */
