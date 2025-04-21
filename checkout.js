document.addEventListener("DOMContentLoaded", function () {
    let tableBody = document.getElementById("checkout-tickets");
    let totalSpan = document.getElementById("checkout-total");
    let form = document.getElementById("payment-form");
    let confirmation = document.getElementById("confirmation");
    let summaryMessage = document.getElementById("summary-message");
    let cardTypeSelect = document.getElementById("card-type");

    let tickets = JSON.parse(localStorage.getItem("cart")) || [];
    let grandTotal = 0;

    tickets.forEach(ticket => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${ticket.movie}</td>
            <td>Rs.${ticket.price}</td>
            <td>${ticket.seats}</td>
            <td>Rs.${ticket.price * ticket.seats}</td>
        `;

        tableBody.appendChild(row);
        grandTotal += ticket.price * ticket.seats;
    });

    totalSpan.innerText = grandTotal;

    cardTypeSelect?.addEventListener("change", function () {
        if (this.value === "debit") {
            alert("You selected Debit Card! Please enter your valid card details.");
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const seatPref = document.getElementById("seat-preference").value.trim();

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

        summaryMessage.innerHTML = `
            Name: ${name}<br>
            Email: ${email}<br>
            Seats: ${seatPref}<br>
            Booking Time: ${time}<br>
            Booking Reference: <strong>${reference}</strong>
        `;

        form.style.display = "none";
        confirmation.style.display = "block";
        localStorage.removeItem("cart");
    });
});
const okButton = document.getElementById("ok-button");

okButton?.addEventListener("click", function () {
    window.location.href = "index.html"; 
});
