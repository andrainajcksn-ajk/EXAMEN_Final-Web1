function toggleMenu() {
      document.getElementById('nav-menu').classList.toggle('open');
      document.getElementById('hamburger').classList.toggle('active');
    }
    document.querySelectorAll('.links_nav').forEach(function(link) {
      link.addEventListener('click', function() {
        document.getElementById('nav-menu').classList.remove('open');
        document.getElementById('hamburger').classList.remove('active');
      });
    });

// DATA 

const posts = [
  {
    id: 1,
    title: 'Join me at HEI',
    description: "Since 2021, I have been a part of HEI - Haute École d'Informatique, from the ground up, and until its evolution, struggles, and first students, I have been there, and it was a lot of fun.",
    creationDate: new Date('2026-03-08'),
    thumbnail: 'https://picsum.photos/seed/hei/400/300',
    tags: ['education', 'HEI']
  },
  {
    id: 2,
    title: 'Teaching Databases the Right Way',
    description: "Too many students jump directly into ORMs without understanding relational thinking. In my courses, we start with normalization, constraints, and real SQL joins before touching any abstraction layer. Strong foundations create confident engineers.",
    creationDate: new Date('2026-01-12'),
    thumbnail: 'https://picsum.photos/seed/db/400/300',
    tags: ['databases', 'SQL', 'education']
  },
  {
    id: 3,
    title: 'Why Git Is a Survival Skill',
    description: "Version control is not optional. I teach Git before advanced frameworks because collaboration, clean commit history, and conflict resolution are what make or break real-world software projects.",
    creationDate: new Date('2026-02-03'),
    thumbnail: 'https://picsum.photos/seed/git/400/300',
    tags: ['git', 'software-engineering', 'education']
  },
  {
    id: 4,
    title: 'Building a Secure Exam Platform',
    description: "Designing a live exam platform with strict tab-focus control and paste restrictions pushed me to combine pedagogy and engineering. Fair assessment requires both technical precision and educational clarity.",
    creationDate: new Date('2026-03-19'),
    thumbnail: 'https://picsum.photos/seed/exam/400/300',
    tags: ['svelte', 'typescript', 'assessment']
  },
  {
    id: 5,
    title: 'Operating Systems: From Theory to Practice',
    description: "Processes, threads, memory management — these concepts only make sense when students experiment with them. I prioritize simulations and real concurrency problems to make operating systems tangible.",
    creationDate: new Date('2026-04-08'),
    thumbnail: 'https://picsum.photos/seed/os/400/300',
    tags: ['operating-systems', 'computer-science', 'education']
  },
  {
    id: 6,
    title: 'Spring Boot Beyond CRUD',
    description: "Teaching Spring Boot is not about generating controllers. It is about architecture: layered design, validation, security, JPA relationships, and writing backend systems that remain maintainable years later.",
    creationDate: new Date('2026-05-27'),
    thumbnail: 'https://picsum.photos/seed/spring/400/300',
    tags: ['spring-boot', 'java', 'backend']
  },
  {
    id: 7,
    title: 'Technical English Is a Career Lever',
    description: "Reading documentation, writing clear README files, and communicating ideas internationally are critical skills for developers. Integrating technical English into IT training unlocks global opportunities.",
    creationDate: new Date('2026-07-14'),
    thumbnail: 'https://picsum.photos/seed/english/400/300',
    tags: ['english', 'career', 'education']
  },
  {
    id: 8,
    title: 'SEO for Engineers',
    description: "SEO is not just marketing. It is structured HTML, accessibility, performance optimization, and semantic clarity. Developers who understand search engines build better web applications.",
    creationDate: new Date('2026-09-02'),
    thumbnail: 'https://picsum.photos/seed/seo/400/300',
    tags: ['seo', 'web-development', 'performance']
  },
  {
    id: 9,
    title: 'Narrative-Driven Programming Exercises',
    description: "I design algorithm problems with storytelling elements while keeping strict technical constraints. Students engage more deeply, and still practice loops, accumulators, edge cases, and structured thinking.",
    creationDate: new Date('2026-11-18'),
    thumbnail: 'https://picsum.photos/seed/narrative/400/300',
    tags: ['algorithms', 'pedagogy', 'education']
  }
];

const archives = [
  { label: 'January 2026',  slug: '2026-01', count: 2 },
  { label: 'February 2026', slug: '2026-02', count: 1 }
];

const youtubeVideos = [
  { id: 'cdWNlGD_FzQ', title: 'Counter App with Pharo' },
  { id: 'cfS4XP4bBEk', title: 'Build a DSL with Pharo' },
  { id: 'Ut2aeuFc2KY', title: 'My keyboard addiction' }
];


const PER_PAGE = 5;
let currentPage = 1;


function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function totalPages() {
  return Math.ceil(posts.length / PER_PAGE);
}

function renderPosts() {
  const list  = document.getElementById('post-list');
  const start = (currentPage - 1) * PER_PAGE;
  const slice = posts.slice(start, start + PER_PAGE);

  list.innerHTML = slice.map(function(p) {
    const tagsHTML = p.tags.map(function(t) {
      return '<span class="tag">' + t + '</span>';
    }).join('');

    return (
      '<a href="#" class="post-card">' +
        '<img class="post-thumb" src="' + p.thumbnail + '" alt="' + p.title + '" loading="lazy" />' +
        '<div class="post-body">' +
          '<span class="post-date">' + formatDate(p.creationDate) + '</span>' +
          '<h2 class="post-title">' + p.title + '</h2>' +
          '<p class="post-desc">' + p.description + '</p>' +
          '<div class="post-tags">' + tagsHTML + '</div>' +
        '</div>' +
      '</a>'
    );
  }).join('');
}



function renderPagination() {
  const total = totalPages();
  const pg    = document.getElementById('pagination');

  if (total <= 1) {
    pg.innerHTML = '';
    return;
  }

  let html = '';

  html += '<button class="page-btn"'
        + (currentPage === 1 ? ' disabled' : '')
        + ' onclick="goPage(' + (currentPage - 1) + ')">← Prev</button>';

  for (let i = 1; i <= total; i++) {
    html += '<button class="page-btn' + (i === currentPage ? ' active' : '') + '"'
          + ' onclick="goPage(' + i + ')">' + i + '</button>';
  }

  html += '<button class="page-btn next-btn"'
        + (currentPage === total ? ' disabled' : '')
        + ' onclick="goPage(' + (currentPage + 1) + ')">Next →</button>';

  pg.innerHTML = html;
}


function renderArchives() {
  const container = document.getElementById('archive-list');

  container.innerHTML = archives.map(function(a) {
    return (
      '<div class="archive-row">' +
        '<span>' + a.label + '</span>' +
        '<span class="archive-count">' + a.count + '</span>' +
      '</div>'
    );
  }).join('');
}

function renderYoutube() {
  const container = document.getElementById('yt-list');

  container.innerHTML = youtubeVideos.map(function(v) {
    const thumb = 'https://img.youtube.com/vi/' + v.id + '/mqdefault.jpg';
    const url   = 'https://www.youtube.com/watch?v=' + v.id;
    return (
      '<a href="' + url + '" target="_blank" rel="noopener noreferrer" class="yt-card">' +
        '<img src="' + thumb + '" alt="' + v.title + '" loading="lazy" />' +
        '<div class="yt-play-btn">' +
          '<svg width="14" height="14" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>' +
        '</div>' +
      '</a>' +
      '<p class="yt-label">' + v.title + '</p>'
    );
  }).join('');
}

function initNewsletter() {
  const btn     = document.getElementById('subscribe-btn');
  const input   = document.getElementById('newsletter-email');
  const confirm = document.getElementById('newsletter-confirm');

  btn.addEventListener('click', function() {
    const email = input.value.trim();
    if (!email || !email.includes('@')) {
      input.style.border = '1.5px solid var(--color-red)';
      input.focus();
      return;
    }
    input.value          = '';
    input.style.display  = 'none';
    btn.style.display    = 'none';
    confirm.classList.add('visible');
  });
}



function goPage(n) {
  currentPage = n;
  renderPosts();
  renderPagination();
  document.getElementById('post-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


document.addEventListener('DOMContentLoaded', function() {
  renderPosts();
  renderPagination();
  renderArchives();
  renderYoutube();
  initNewsletter();
});
