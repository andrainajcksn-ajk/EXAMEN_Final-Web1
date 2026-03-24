document.addEventListener("DOMContentLoaded", () => {
    const grids = {
        student: document.getElementById("students-grid"),
        collaborator: document.getElementById("collaborators-grid"),
        customer: document.getElementById("customers-grid")
    };

    const getStars = (rating) => {
        return '<i class="fa-solid fa-star"></i>'.repeat(rating);
    };

    data.testimonials.forEach(item => {
        const grid = grids[item.role];
        if (grid) {
            const card = document.createElement("div");
            card.classList.add("testimonial-card");

            if (item.role === 'collaborator') {
                card.classList.add("card-collaborator");
                card.innerHTML = `
                    <div class="testimonial-body">
                        <p class="quote-text">"${item.description}"</p>
                    </div>
                    <div class="testimonial-footer">
                        <img src="${item.thumbnail}" alt="${item.author}" class="author-img-bw">
                        <div class="author-info">
                            <h4 class="author-name">${item.author}</h4>
                            <p class="role-label-caps">${item.role.toUpperCase()}</p>
                        </div>
                    </div>
                `;
            } 
            else if (item.role === 'customer') {
                card.classList.add("card-customer");
                card.innerHTML = `
                    <div class="stars-top">${getStars(item.rating)}</div>
                    <div class="testimonial-body">
                        <p class="customer-text">"${item.description}"</p>
                    </div>
                    <div class="testimonial-footer">
                        <img src="${item.thumbnail}" alt="${item.author}" class="author-img-bw">
                        <div class="author-info">
                            <h4 class="author-name">${item.author}</h4>
                            <p class="role-label-caps">${item.role.toUpperCase()}</p>
                        </div>
                    </div>
                `;
            }
            else if (item.role === 'student') {
                card.classList.add("card-student");
                card.innerHTML = `
                    <div class="testimonial-header">
                        <img src="${item.thumbnail}" alt="${item.author}" class="author-img">
                        <div class="author-info">
                            <h4>${item.author}</h4>
                            <p>${item.role}</p>
                        </div>
                    </div>
                    <div class="testimonial-body">
                        <p>${item.description}</p>
                    </div>
                    <div class="stars">${getStars(item.rating)}</div>
                `;
            }
            grid.appendChild(card);
        }
    });
});

function openCart() {
    const cart = document.getElementById("cartBox");
    if (cart) {
        cart.style.display = "block";
    }
}

function closeCart() {
    const cart = document.getElementById("cartBox");
    if (cart) {
        cart.style.display = "none";
    }
}