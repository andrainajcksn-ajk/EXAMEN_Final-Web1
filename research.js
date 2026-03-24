tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#b91c1c',
                darkRed: '#991b1b',
                warmBg: '#f9f6f1',
                borderLight: '#f0ece4',
                textMuted: '#78716c',
                textLight: '#a8a29e',
                textDark: '#1a1a1a'
            },
            fontFamily: {
                title: ['Playfair Display', 'serif'],
                body: ['DM Sans', 'sans-serif']
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const cart = document.getElementById("cartBox");

    window.openCart = function () {
        cart.style.display = "block";
    };

    window.closeCart = function () {
        cart.style.display = "none";
    };
    
    const container = document.getElementById("papers-container");
    if (!container) return;

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long"
        });
    }

    data.papers.forEach(paper => {

        const card = document.createElement("div");

        card.className = `
            bg-white
            border border-[var(--color-border)]
            rounded-xl
            p-6
            transition duration-300
            hover:shadow-2xl
            hover:-translate-y-1
            hover:border-transparent
        `;

        card.innerHTML = `
    <div class="flex justify-between items-center mb-4">
        
        <div class="flex flex-wrap gap-2">
            ${paper.tags.map(tag => `
                <span class="text-xs px-3 py-1 bg-[var(--color-border-light)] rounded-full text-[var(--color-text-muted)] uppercase font-body">
                    ${tag}
                </span>
            `).join("")}
        </div>

        <span class="text-sm text-[var(--color-text-light)] font-body">
            ${formatDate(paper.publishedDate)}
        </span>

    </div>

    <h3 class="text-xl font-title text-[var(--color-text-dark)] mb-2">
        ${paper.title}
    </h3>

    <p class="text-sm text-[var(--color-text-muted)] mb-4 font-body">
        ${paper.authors.join(", ")} — ${paper.journal}
    </p>

    <p class="text-[var(--color-text-muted)] mb-4 leading-relaxed font-body">
        ${paper.abstract}
    </p>

    <a href="${paper.pdfUrl}" target="_blank"
       class="text-[var(--color-red)] font-medium text-sm no-underline hover:underline font-body">
       📄 READ PDF
    </a>
`;

        container.appendChild(card);
    });

});