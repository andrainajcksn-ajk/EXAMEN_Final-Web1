const cart = document.getElementById("cartBox");

function openCart() {
    cart.style.display = "block";
}

function closeCart() {
    cart.style.display = "none";
}

function scrollToAbout() {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('hero-bio').innerText = data.aboutMe_part1;
    document.getElementById('about-text').innerText = data.aboutMe_part2;

    const statsContainer = document.getElementById('stats-container');
    data.overview.forEach(item => {
        statsContainer.innerHTML += `
            <div class="flex flex-col">
                <span class="text-5xl font-title text-primary font-bold mb-1">${item.number}</span>
                <span class="text-[8px] text-stone-400 font-bold uppercase tracking-widest leading-tight">${item.label}</span>
            </div>`;
    });

    const coursesGrid = document.getElementById('courses-grid');
    data.homeCourses.forEach(course => {
        coursesGrid.innerHTML += `
            <div class="bg-white p-12 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left relative group cursor-pointer border border-stone-50">
                <span class="absolute top-8 left-8 bg-primary text-white text-[7px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-primary/20">${course.tag}</span>
                <h3 class="text-2xl font-title mt-8 mb-8 group-hover:text-primary transition-colors leading-snug italic">${course.title}</h3>
                <div class="flex justify-between items-center text-[9px] text-stone-300 font-bold border-t pt-8 border-stone-50 uppercase tracking-widest">
                    <span>${course.mode}</span>
                    <span class="w-1 h-1 bg-stone-200 rounded-full"></span>
                    <span>${course.duration}</span>
                </div>
            </div>`;
    });

    const expList = document.getElementById('experience-list');
    data.experiences.forEach(exp => {
        expList.innerHTML += `
            <div class="exp-card relative pl-12 py-12 border-b border-stone-50 hover:bg-stone-50/50 transition-all group cursor-default">
                <div class="line"></div>
                <div class="text-[9px] font-bold text-stone-300 mb-3 uppercase tracking-[0.2em]">${exp.year}</div>
                <h4 class="text-2xl font-title italic mb-2 group-hover:text-primary transition-colors leading-tight">${exp.role}</h4>
                <div class="text-primary text-[10px] font-bold uppercase tracking-widest mb-6">${exp.org}</div>
                <p class="text-stone-500 text-sm leading-relaxed font-medium">${exp.desc}</p>
            </div>`;
    })
});

tailwind.config = {
    theme: {
        extend: {
            colors: { primary: '#b91c1c', darkRed: '#991b1b', warmBg: '#f9f6f1' },
            fontFamily: { title: ['Playfair Display', 'serif'], body: ['DM Sans', 'sans-serif'] }
        }
    }
}

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const btn = document.getElementById('hamburger');
    menu.classList.toggle('open');
    btn.classList.toggle('active');
}

document.querySelectorAll('.links_nav').forEach(function (link) {
    link.addEventListener('click', function () {
        document.getElementById('nav-menu').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
    });
});