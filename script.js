
// ===================================
// MAISON CREME - BAKERY WEBSITE
// JAVASCRIPT
// ===================================


// PRODUCT DATA

const products = [

    {
        id: 1,
        name: "Chocolate Cake",
        category: "Cakes",
        price: 1800,
        description: "Rich chocolate cake with creamy frosting.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700"
    },

    {
        id: 2,
        name: "Strawberry Cake",
        category: "Cakes",
        price: 2200,
        description: "Fresh strawberry cake with soft cream.",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700"
    },

    {
        id: 3,
        name: "Butter Croissant",
        category: "Pastries",
        price: 350,
        description: "Golden and crispy French butter croissant.",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700"
    },

    {
        id: 4,
        name: "Vanilla Cupcakes",
        category: "Cakes",
        price: 250,
        description: "Soft vanilla cupcakes with delicious frosting.",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=700"
    },

    {
        id: 5,
        name: "Chocolate Cookies",
        category: "Cookies",
        price: 400,
        description: "Crunchy cookies with chocolate chips.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700"
    },

    {
        id: 6,
        name: "Glazed Donuts",
        category: "Donuts",
        price: 300,
        description: "Soft donuts covered with sweet glaze.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700"
    },
        {
        id: 7,
        name: "Chocolate Fudge Cake",
        category: "Cakes",
        price: 2500,
        description: "Rich chocolate layers with fudge frosting.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700"
    },
    {
        id: 8,
        name: "Red Velvet Cake",
        category: "Cakes",
        price: 2600,
        description: "Soft red velvet cake with cream cheese frosting.",
        image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=700"
    },
    {
        id: 9,
        name: "Butter Croissant",
        category: "Pastries",
        price: 450,
        description: "Flaky golden French croissant, freshly baked.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700"
    },
    {
        id: 10,
        name: "Choco Brownie",
        category: "Pastries",
        price: 700,
        description: "Warm brownie with chocolate chips inside.",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=700"
    },
    {
        id: 11,
        name: "Vanilla Donuts",
        category: "Donuts",
        price: 350,
        description: "Soft donuts with vanilla glaze and sprinkles.",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=700"
    },
    {
        id: 12,
        name: "Oreo Cookies",
        category: "Cookies",
        price: 500,
        description: "Crunchy cookies with Oreo crumbs and cream.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700"
    }

];


// SELECT HTML ELEMENTS

const productContainer = document.getElementById("product-container");

const searchInput = document.getElementById("search-input");

const filterButtons = document.querySelectorAll(".filter-btn");

const cartButton = document.getElementById("cart-button");

const cartPanel = document.getElementById("cart-panel");

const cartOverlay = document.getElementById("cart-overlay");

const closeCartButton = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-button");


// CART DATA

let cart = [];

let selectedCategory = "All";


// DISPLAY PRODUCTS

function displayProducts(items) {

    productContainer.innerHTML = "";

    if (items.length === 0) {

        productContainer.innerHTML =
            `<p class="no-products">Sorry! No products found.</p>`;

        return;
    }

    items.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <span class="price">
                        Rs. ${product.price.toLocaleString("en-PK")}
                    </span>

                    <button class="add-btn" data-id="${product.id}">
                        Add to Cart
                    </button>

                </div>

            </div>

        `;

        productContainer.appendChild(card);

    });

}


// FILTER AND SEARCH PRODUCTS

function filterProducts() {

    const searchText = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });

    displayProducts(filteredProducts);

}


// FILTER BUTTON EVENTS

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterProducts();

    });

});


// SEARCH EVENT

searchInput.addEventListener("input", filterProducts);


// ADD PRODUCTS TO CART

productContainer.addEventListener("click", event => {

    const button = event.target.closest(".add-btn");

    if (!button) return;

    const productId = Number(button.dataset.id);

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        const product = products.find(
            item => item.id === productId
        );

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "Add to Cart";
    }, 800);

});


// UPDATE SHOPPING CART

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty.</p>`;

    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        totalQuantity += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>Rs. ${item.price.toLocaleString("en-PK")}</p>

            </div>

            <div class="quantity-controls">

                <button data-action="decrease" data-id="${item.id}">
                    -
                </button>

                <span>${item.quantity}</span>

                <button data-action="increase" data-id="${item.id}">
                    +
                </button>

            </div>

        `;

        cartItems.appendChild(cartItem);

    });

    cartCount.textContent = totalQuantity;

    cartTotal.textContent = total.toLocaleString("en-PK");

}


// CHANGE CART QUANTITY

cartItems.addEventListener("click", event => {

    const button = event.target.closest("button");

    if (!button) return;

    const productId = Number(button.dataset.id);

    const action = button.dataset.action;

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    if (action === "increase") {

        item.quantity++;

    }

    if (action === "decrease") {

        item.quantity--;

        if (item.quantity <= 0) {

            cart = cart.filter(product => product.id !== productId);

        }

    }

    updateCart();

});


// OPEN CART

function openCart() {

    cartPanel.classList.add("open");

    cartOverlay.classList.add("show");

}


// CLOSE CART

function closeCart() {

    cartPanel.classList.remove("open");

    cartOverlay.classList.remove("show");

}

cartButton.addEventListener("click", openCart);

closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// CHECKOUT BUTTON

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty! Please add some products.");

        return;

    }

    alert(
        "Thank you for choosing Maison Creme!\n\n" +
        "Your order total is Rs. " +
        cart.reduce((sum, item) =>
            sum + item.price * item.quantity, 0
        ).toLocaleString("en-PK") +
        "\n\nThis is a demo checkout. No actual order has been placed."
    );

});


// INITIAL WEBSITE LOAD

displayProducts(products);

updateCart();

console.log("Maison Creme Bakery Website Loaded Successfully!");
// CUSTOM ORDER FORM FUNCTION
// CUSTOM ORDER FORM FUNCTION
function placeCustomOrder(e) {
    e.preventDefault();
    let name = document.getElementById('cust-name').value;
    let flavour = document.getElementById('cust-flavour').value;
    document.getElementById('custom-msg').innerText = "Thank you " + name + "! Your " + flavour + " cake order request has been received. We will contact you soon.";
}
// CONTACT FORM FUNCTION
function sendContactMessage(e) {
    e.preventDefault();
    let name = document.getElementById('contact-name').value;
    document.getElementById('contact-msg').innerText = "Thank you " + name + "! Your message has been received. We will reply to you soon.";
    document.getElementById('contact-name').value = "";
    document.getElementById('contact-email').value = "";
    document.getElementById('contact-message').value = "";
}
