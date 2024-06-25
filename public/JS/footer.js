export function loadFooter() {
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (footerPlaceholder) {
        return fetch("http://localhost:3000/footer.html")
            .then((response) => response.text())
            .then((html) => {
                footerPlaceholder.innerHTML = html;
            })
            .catch((error) => {
                console.error("Error Loading Footer: ", error);
            });
    } else {
        return Promise.resolve();
    }
}

export function setFooterNavigation() {
    const footerLinks = {
        "#footer_home": "home",
        "#footer_shop": "shop",
        "#footer_aboutUs": "aboutus",
        "#footer_contactUs": "contactus"
    };

    for (const [selector, page] of Object.entries(footerLinks)) {
        const footerLink = document.querySelector(selector);

        if (footerLink) {
            const url = `/${page}`;
            footerLink.setAttribute("href", url);

            // Optional: Add a left-click navigation event
            footerLink.addEventListener("click", (event) => {
                event.preventDefault();
                window.location.href = url;
            });
        }
    }
}
