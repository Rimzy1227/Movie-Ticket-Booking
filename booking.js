// Element references
let cartTable = document.getElementById("cart-items");
let totalPriceElement = document.getElementById("total-price");
let saveFavButton = document.getElementById("save-favorite-button");
let applyFavButton = document.getElementById("apply-favorite-button");
let checkoutButton = document.getElementById("checkout-button");

// Cart data
let cart = [];
let storedCart = localStorage.getItem("cart");
if (storedCart) {
    cart = JSON.parse(storedCart);
}

// Add movie to cart
function addToCart(movie, price) {
    const seats = prompt(`How many seats for ${movie}? (1 to 50)`);
    const seatsNum = parseInt(seats);
    if (seats && !isNaN(seats) && seats > 0 && seatsNum <= 50) {
        const item = {
            movie: movie,
            price: price,
            seats: parseInt(seats),
            total: price * parseInt(seats)
        };
        cart.push(item);
        updateCartDisplay();
    } else {
        alert("Please enter a valid number of seats.");
    }
}

// Update cart table display
function updateCartDisplay() {
    cartTable.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.movie}</td>
            <td>Rs.${item.price}</td>
            <td>${item.seats}</td>
            <td>Rs.${item.total}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTable.appendChild(row);
        total += item.total;
    });

    totalPriceElement.innerText = total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Save favorite
function saveAsFavorite() {
    if (cart.length) {
        localStorage.setItem("favouriteBooking", JSON.stringify(cart));
        alert("Booking saved as favourite!");
    } else {
        alert("Your cart is empty!");
    }
}

// Apply favorite
function applyFavorite() {
    const fav = JSON.parse(localStorage.getItem("favouriteBooking"));
    if (fav) {
        cart = fav;
        updateCartDisplay();
    } else {
        alert("No favourite booking found!");
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

// Event Listeners
saveFavButton?.addEventListener("click", saveAsFavorite);
applyFavButton?.addEventListener("click", applyFavorite);
checkoutButton?.addEventListener("click", proceedToCheckout);

// Initial render
updateCartDisplay();
