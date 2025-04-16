// document.addEventListener("DOMContentLoaded", () => {
//     const tickets = JSON.parse(localStorage.getItem("cart")) || [];
//     const tableBody = document.getElementById("checkout-tickets");
//     const totalSpan = document.getElementById("checkout-total");
  
//     let grandTotal = 0;
//     tickets.forEach((ticket) => {
//       const row = document.createElement("tr");
  
//       const td1 = document.createElement("td");
//       td1.textContent = ticket.movie;
  
//       const td2 = document.createElement("td");
//       td2.textContent = "Rs." + ticket.price;
  
//       const td3 = document.createElement("td");
//       td3.textContent = ticket.seats;
  
//       const td4 = document.createElement("td");
//       const total = ticket.price * ticket.seats;
//       td4.textContent = "Rs." + total;
//       grandTotal += total;
  
//       row.append(td1, td2, td3, td4);
//       tableBody.appendChild(row);
//     });
  
//     totalSpan.textContent = grandTotal;
  
//     // Handle form submission
//     const form = document.getElementById("payment-form");
//     const confirmation = document.getElementById("confirmation");
//     const summaryMessage = document.getElementById("summary-message");
  
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
  
//       const name = document.getElementById("name").value.trim();
//       const email = document.getElementById("email").value.trim();
//       const phone = document.getElementById("phone").value.trim();
//       const seatPref = document.getElementById("seat-preference").value.trim();
//       const card = document.getElementById("card-number").value.trim();
//       const expiry = document.getElementById("expiry").value.trim();
//       const cvv = document.getElementById("cvv").value.trim();
  
//       if (!name || !email || !phone || !seatPref || !card || !expiry || !cvv) {
//         alert("Please fill in all fields correctly.");
//         return;
//       }
  
//       const reference = "REF" + Math.floor(100000 + Math.random() * 900000);
//       const time = new Date().toLocaleString();
  
//       summaryMessage.innerHTML = `
//         Name: ${name}<br>
//         Email: ${email}<br>
//         Seats: ${seatPref}<br>
//         Booking Time: ${time}<br>
//         Booking Reference: <strong>${reference}</strong>
//       `;
  
//       form.style.display = "none";
//       confirmation.style.display = "block";
  
//       // Optionally clear cart
//       localStorage.removeItem("cart");
//     });
//   });
// // Handle Card Type Selection (Dropdown)
// document.getElementById('card-type').addEventListener('change', function() {
//     const cardType = this.value;
//     if (cardType === 'debit') {
//         alert('You selected Debit Card! Please make sure to enter your valid Debit Card details.');
//     }
//     // Add any further customization or behavior here
// });


document.addEventListener("DOMContentLoaded", () => {
    let tableBody = document.getElementById("checkout-tickets");
    let totalSpan = document.getElementById("checkout-total");
    let form = document.getElementById("payment-form");
    let confirmation = document.getElementById("confirmation");
    let summaryMessage = document.getElementById("summary-message");
    let cardTypeSelect = document.getElementById("card-type");

    // Load tickets from localStorage
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

    // Card Type Handler
    cardTypeSelect?.addEventListener("change", function () {
        if (this.value === "debit") {
            alert("You selected Debit Card! Please enter your valid card details.");
        }
    });

    // Form Submission + Validation
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

        // Reset errors
        cardNameError.innerText = "";
        cardNumberError.innerText = "";
        expiryError.innerText = "";
        cvvError.innerText = "";
        alertBox.style.display = "none";

        // Validate personal info
        if (!name || !email || !phone || !seatPref) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Validate card details
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

        // Success - show confirmation
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
