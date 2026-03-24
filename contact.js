const cart = document.getElementById("cartBox");

function openCart() {
    cart.style.display = "block";
}

function closeCart() {
    cart.style.display = "none";
}

const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();

    if (name === "" || email === "" || msg === "") {
        message.textContent = "Please fill in all fields.";
        return;
    }

    if (!validateEmail(email)) {
        message.textContent = "Invalid email address.";
        return;
    }

    message.textContent = "Message sent successfully!";
    form.reset();
});

function validateEmail(email) {
    return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email);
}