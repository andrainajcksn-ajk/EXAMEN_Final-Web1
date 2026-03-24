
const cart = document.getElementById("cartBox");
const toast = document.getElementById("toast-notification");
const cartCountBadge = document.getElementById("cart-count");

let cartArray = JSON.parse(localStorage.getItem("myCart")) || []; 

function openCart() {
    if (cart) cart.style.display = "block";
}

function closeCart() {
    if (cart) cart.style.display = "none";
}

function saveCart() {
    localStorage.setItem("myCart", JSON.stringify(cartArray));
}

document.addEventListener("DOMContentLoaded", () => {
    let selectedLanguages = [];
    let selectedTech = "all";
    let selectedLevel = "all";
    let minPrice = 0;
    let maxPrice = 300000;
    let searchQuery = "";

    const container = document.getElementById("course-container");
    const langFlags = document.querySelectorAll("#filter-lang span");
    const techSelect = document.getElementById("filter-tech");
    const levelSelect = document.getElementById("filter-level");
    const minInput = document.getElementById("min-price");
    const maxInput = document.getElementById("max-price");
    const priceText = document.getElementById("price-value");
    const searchInput = document.getElementById("filter-search");
    const clearBtn = document.getElementById("clear-filters");
    const itemsContainer = document.getElementById("cart-items-container");
    const coursesFoundText = document.querySelector(".courses-found-text");
    
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".navbar nav ul");

    function updateCartUI() {
        if (!itemsContainer) return;

        if (cartCountBadge) {
            const count = cartArray.length;
            cartCountBadge.textContent = count;
            cartCountBadge.style.display = count > 0 ? "flex" : "none";
        }

        if (cartArray.length === 0) {
            itemsContainer.innerHTML = '<div class="div_carttxt"><p class="cart_txt">Your cart is empty.</p></div>';
        } else {
            itemsContainer.innerHTML = "";
            let total = 0;

            cartArray.forEach((item, index) => {
                total += item.price;
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("cart-item");
                itemDiv.innerHTML = `
                    <span class="cart-item-title">${item.title}</span>
                    <span class="cart-item-price">${item.price.toLocaleString()} Ar</span>
                    <i class="fa-solid fa-trash delete-item" data-index="${index}" style="cursor:pointer; color:var(--color-red); margin-left:10px;"></i>
                `;
                itemsContainer.appendChild(itemDiv);
            });

            const footerDiv = document.createElement("div");
            footerDiv.innerHTML = `
                <div class="cart-total">
                    <span class="total-label">TOTAL</span>
                    <span class="total-amount">${total.toLocaleString()} Ar</span>
                </div>
                <button id="confirm-order-btn" class="confirm-btn">CONFIRM ORDER</button>
            `;
            itemsContainer.appendChild(footerDiv);

            document.getElementById("confirm-order-btn").addEventListener("click", () => {
                closeCart();
                if (toast) {
                    toast.className = "toast-visible";
                    setTimeout(() => { toast.className = "toast-hidden"; }, 5000);
                }
                cartArray = [];
                saveCart();
                updateCartUI();
            });

            itemsContainer.querySelectorAll(".delete-item").forEach(icon => {
                icon.addEventListener("click", (e) => {
                    cartArray.splice(e.target.getAttribute("data-index"), 1);
                    saveCart();
                    updateCartUI();
                });
            });
        }
    }

    function displayCourses(coursesToRender) {
        if (!container) return;
        
        container.style.display = "grid"; 
        container.innerHTML = ""; 

        if (coursesFoundText) {
            coursesFoundText.textContent = `${coursesToRender.length} COURSES FOUND`;
        }

        coursesToRender.forEach(course => {
            let levelClass = "";
            const lvl = course.level.toLowerCase();
            if (lvl === "beginner") levelClass = "level-beginner";
            else if (lvl === "intermediate") levelClass = "level-intermediate";
            else if (lvl === "advanced") levelClass = "level-advanced";

            const card = document.createElement("div");
            card.classList.add("course-card");
            card.innerHTML = `
                <div class="image-container">
                    <img src="${course.thumbnail}" class="image" alt="${course.title}">
                    <div class="top-badges">
                        <span class="lang-badge">${course.language.toUpperCase()}</span>
                        ${course.technologies.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                    </div>
                    <span class="level-badge ${levelClass}">${course.level}</span>
                </div>
                <div class="info">
                    <h3 class="card_title">${course.title}</h3>
                    <p class="price">MGA ${course.price.toLocaleString()}</p>
                    <p class="card_desc">${course.description.substring(0, 100)}...</p>
                    <div class="card-actions">
                        <button class="btn-more">Learn more</button>
                        <button class="btn-add">Add to cart</button>
                    </div>
                </div>
            `;

            card.querySelector(".btn-add").addEventListener("click", () => {
                if (cartArray.some(item => item.title === course.title)) {
                    alert("This is already in your cart");
                } else {
                    cartArray.push(course);
                    saveCart();
                    updateCartUI();
                    openCart();
                }
            });

            container.appendChild(card);
        });
    }
   
    function applyFilters() {
        const filtered = data.courses.filter(course => {
            const matchesLang = selectedLanguages.length === 0 || selectedLanguages.includes(course.language.toLowerCase());
            const matchesTech = selectedTech === "all" || course.technologies.some(t => t.toLowerCase() === selectedTech.toLowerCase());
            const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase();
            const matchesPrice = course.price >= minPrice && course.price <= maxPrice;

            const searchContent = [course.title, course.description, course.language, course.level, ...course.technologies].join(" ").toLowerCase();
            const matchesSearch = searchContent.includes(searchQuery.toLowerCase());

            return matchesLang && matchesTech && matchesLevel && matchesPrice && matchesSearch;
        });


        if (filtered.length === 0) {
            if (coursesFoundText) coursesFoundText.textContent = "0 COURSES FOUND";
            container.style.display = "block"; 
            container.innerHTML = `
                <div class="no-results-container">
                    <p class="no-results-text">No courses match your filters.</p>
                    <a href="#" class="clear-filters-link" id="reset-link">CLEAR FILTERS</a>
                </div>
            `;
            document.getElementById("reset-link").addEventListener("click", (e) => {
                e.preventDefault();
                if (clearBtn) clearBtn.click();
            });
        } else {
            displayCourses(filtered);
        }
    }

    if (searchInput) searchInput.addEventListener("input", (e) => { searchQuery = e.target.value; applyFilters(); });

    const updatePriceFilters = () => {
        minPrice = Math.min(minInput.value, maxInput.value);
        maxPrice = Math.max(minInput.value, maxInput.value);
        priceText.textContent = `${Number(minPrice).toLocaleString()} Ar - ${Number(maxPrice).toLocaleString()} Ar`;
        applyFilters();
    };
    if (minInput) minInput.addEventListener("input", updatePriceFilters);
    if (maxInput) maxInput.addEventListener("input", updatePriceFilters);

    langFlags.forEach(flag => {
        flag.addEventListener("click", () => {
            const lang = flag.getAttribute("data-lang");
            if (selectedLanguages.includes(lang)) {
                selectedLanguages = selectedLanguages.filter(l => l !== lang);
                flag.classList.remove("active-filter");
            } else {
                selectedLanguages.push(lang);
                flag.classList.add("active-filter");
            }
            applyFilters();
        });
    });

    if (techSelect) techSelect.addEventListener("change", (e) => { selectedTech = e.target.value; applyFilters(); });
    if (levelSelect) levelSelect.addEventListener("change", (e) => { selectedLevel = e.target.value; applyFilters(); });

    if (clearBtn) {
        clearBtn.addEventListener("click", (e) => {
            e.preventDefault();
            selectedLanguages = [];
            langFlags.forEach(f => f.classList.remove("active-filter"));
            techSelect.value = "all"; selectedTech = "all";
            levelSelect.value = "all"; selectedLevel = "all";
            minInput.value = 0; maxInput.value = 300000;
            searchQuery = ""; if (searchInput) searchInput.value = "";
            updatePriceFilters();
        });
    }

    if (toggle && menu) toggle.addEventListener("click", () => menu.classList.toggle("active"));

    updateCartUI();
    displayCourses(data.courses);
});

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}