let checkoutTable = document.getElementById("checkout-tickets");
let totalSpan = document.getElementById("checkout-total");
let form = document.getElementById("payment-form");
let confirmation = document.getElementById("confirmation");
let summaryMessage = document.getElementById("summary-message");
let cardTypeSelect = document.getElementById("card-type");
let seatPreference = document.getElementById("seat-preference");
let okButton = document.getElementById("ok-button");

let tickets = [];
let storedTickets = localStorage.getItem("cart");
if (storedTickets) {
    tickets = JSON.parse(storedTickets);
}

const seatCharges = {
    standard: 0,
    premium: 200,
    balcony: 400
};

function updateCheckoutTable() {
    checkoutTable.innerHTML = "";
    let grandTotal = 0;

    tickets.forEach(ticket => {
        const additionalCharge = seatCharges[ticket.seatType] || 0;
        const totalPrice = (ticket.price + additionalCharge) * ticket.seats;

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${ticket.movie}</td>
            <td>${ticket.showDate || 'N/A'}</td>
            <td>${ticket.showTime || 'N/A'}</td> 
            <td>Rs.${ticket.price}</td>
            <td>${ticket.seats}</td>
            <td>Rs.${totalPrice}</td>
        `;
        checkoutTable.appendChild(row);
        grandTotal += totalPrice;
    });

    totalSpan.innerText = grandTotal;
    localStorage.setItem("cart", JSON.stringify(tickets)); 
}

function applySeatPreference() {
    const selectedType = seatPreference.value.toLowerCase();
    tickets.forEach(ticket => ticket.seatType = selectedType);
    updateCheckoutTable();
}

cardTypeSelect?.addEventListener("change", () => {
    if (cardTypeSelect.value === "debit") {
        alert("You selected Debit Card! Please enter your valid card details.");
    }
});

seatPreference?.addEventListener("change", applySeatPreference);

form?.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const seatPref = seatPreference.value.trim();

    const cardName = document.getElementById("cardNameInput").value.trim();
    const cardNumber = document.getElementById("cardNumberInput").value.trim();
    const expiry = document.getElementById("expiryInput").value.trim();
    const cvv = document.getElementById("cvvInput").value.trim();

    const cardNameError = document.getElementById("cardNameError");
    const cardNumberError = document.getElementById("cardNumberError");
    const expiryError = document.getElementById("expiryError");
    const cvvError = document.getElementById("cvvError");
    const alertBox = document.getElementById("formAlert");

    cardNameError.innerText = "";
    cardNumberError.innerText = "";
    expiryError.innerText = "";
    cvvError.innerText = "";
    alertBox.style.display = "none";

    if (!name || !email || !phone || !seatPref) {
        alert("Please fill in all fields correctly.");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(cardName)) {
        cardNameError.innerText = "Name can contain only letters and spaces.";
        isValid = false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
        cardNumberError.innerText = "Card number must be exactly 16 digits.";
        isValid = false;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        expiryError.innerText = "Expiry must be in MM/YY format.";
        isValid = false;
    }

    if (!/^\d{3}$/.test(cvv)) {
        cvvError.innerText = "CVV must be exactly 3 digits.";
        isValid = false;
    }

    if (!isValid) {
        alertBox.textContent = "Please fill in all fields correctly.";
        alertBox.style.display = "block";
        return;
    }

    const reference = "REF" + Math.floor(100000 + Math.random() * 900000);
    const time = new Date().toLocaleString();

    let showDetails = tickets.map(t => `${t.movie} on ${t.showDate || 'N/A'} at ${t.showTime || 'N/A'}`).join("<br>");

    summaryMessage.innerHTML = `
        Name: ${name}<br>
        Email: ${email}<br>
        Phone: ${phone}<br>
        Seat Type: ${seatPref}<br><br>
        <strong>Booking Details:</strong><br>
        ${showDetails}<br><br>
        Booking Time: ${time}<br>
        Booking Reference: <strong>${reference}</strong>
    `;

    form.style.display = "none";
    confirmation.style.display = "block";
    localStorage.removeItem("cart");
});

okButton?.addEventListener("click", () => {
    window.location.href = "index.html";
});

updateCheckoutTable();
