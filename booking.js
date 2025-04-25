let cartTable = document.getElementById("cart-items");
let totalPriceElement = document.getElementById("total-price");
let saveFavButton = document.getElementById("save-favorite-button");
let applyFavButton = document.getElementById("apply-favorite-button");
let checkoutButton = document.getElementById("checkout-button");

let cart = [];
let storedCart = localStorage.getItem("cart");
if (storedCart) {
    cart = JSON.parse(storedCart);
}
let selectedMovie = null;
let selectedPrice = 0;

function addToCart(movie, price) {
    selectedMovie = movie;
    selectedPrice = price;
    document.getElementById("seat-count").value = 1;
    document.getElementById("show-date").value = ""; 
    document.getElementById("dateTimeModal").style.display = "block"; 
}

function closeModal() {
    document.getElementById("dateTimeModal").style.display = "none"; 
}
  
function confirmAddToCart() {
    const seats = parseInt(document.getElementById("seat-count").value);
    const date = document.getElementById("show-date").value;
    const time = document.getElementById("show-time").value;

    if (!date) {
        alert("Please select a date.");
        return;
    }

    if (!time) {
        alert("Please select a show time.");
        return;
    }

    if (isNaN(seats) || seats < 1 || seats > 10) {
        alert("Please enter a valid number of seats (1 to 10).");
        return;
    }

    const item = {
        movie: selectedMovie,
        price: selectedPrice,
        seats: seats,
        showDate: date,
        showTime: time,
        total: selectedPrice * seats
    };

    cart.push(item);
    updateCartDisplay();
    closeModal();
}
window.onload = function() {
  const today = new Date().toISOString().split('T')[0]; 
  document.getElementById('show-date').setAttribute('min', today);
};
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

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function saveAsFavorite() {
    if (cart.length) {
        localStorage.setItem("favouriteBooking", JSON.stringify(cart));
        alert("Booking saved as favourite!");
    } else {
        alert("Your cart is empty!");
    }
}

function applyFavorite() {
    const fav = JSON.parse(localStorage.getItem("favouriteBooking"));
    if (fav) {
        cart = fav;
        updateCartDisplay();
    } else {
        alert("No favourite booking found!");
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
}

saveFavButton?.addEventListener("click", saveAsFavorite);
applyFavButton?.addEventListener("click", applyFavorite);
checkoutButton?.addEventListener("click", proceedToCheckout);

updateCartDisplay();
