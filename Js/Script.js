let cart = [];


// DISPLAY PRODUCTS

function displayProducts(category = "all") {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    const filteredProducts =
        category === "all"
        ? products
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <div class="product-buttons">

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                    <button
                        class="buy-now"
                        onclick="buyNow(${product.id})">
                        Buy Now
                    </button>

                </div>

            </div>
        `;

        grid.appendChild(card);

    });
}


// FILTER

function filterProducts(category) {

    displayProducts(category);

    document.getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ADD TO CART

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    cart.push(product);

    updateCart();

    alert(product.name + " added to cart!");
}


// UPDATE CART

function updateCart() {

    document.getElementById("cartCount")
        .textContent = cart.length;

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>
                <strong>${item.name}</strong>
                <br>
                ₹${item.price.toLocaleString("en-IN")}
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);

    });

    document.getElementById("cartTotal")
        .textContent =
        total.toLocaleString("en-IN");
}


// REMOVE CART ITEM

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// OPEN CART

function openCart() {

    document.getElementById("cartModal")
        .style.display = "flex";

    updateCart();
}


// CLOSE CART

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";
}


// BUY NOW

function buyNow(id) {

    const product =
        products.find(item => item.id === id);

    const message =
        `Hello WoodCraft!%0A%0A` +
        `I am interested in:%0A` +
        `${product.name}%0A` +
        `Price: ₹${product.price.toLocaleString("en-IN")}`;

    window.open(
        `https://wa.me/919876543210?text=${message}`,
        "_blank"
    );
}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    let message =
        "Hello WoodCraft! I want to order:%0A%0A";

    let total = 0;

    cart.forEach((item, index) => {

        message +=
            `${index + 1}. ${item.name} - ₹${item.price.toLocaleString("en-IN")}%0A`;

        total += item.price;

    });

    message +=
        `%0ATotal: ₹${total.toLocaleString("en-IN")}`;

    window.open(
        `https://wa.me/919876543210?text=${message}`,
        "_blank"
    );
}


// CONTACT FORM

function sendMessage(event) {

    event.preventDefault();

    alert(
        "Thank you! Your enquiry has been received."
    );

    event.target.reset();
}


// INITIAL LOAD

displayProducts();
