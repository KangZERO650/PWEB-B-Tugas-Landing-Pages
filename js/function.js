// Cinema search function
function searchCinema() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');

    if (searchInput === '') {
        searchResults.innerHTML = '<div class="alert alert-warning rounded-3"><i class="fas fa-exclamation-triangle me-2"></i>Masukkan kata kunci pencarian terlebih dahulu</div>';
        return;
    }

    let results = [];

    for (let key in cinemaData) {
        const cinema = cinemaData[key];
        if (key.includes(searchInput) ||
            cinema.name.toLowerCase().includes(searchInput) ||
            cinema.location.toLowerCase().includes(searchInput) ||
            cinema.type.toLowerCase().includes(searchInput)) {
            results.push(cinema);
        }
    }

    // Display search results
    if (results.length === 0) {
        searchResults.innerHTML = `
                    <div class="alert alert-info rounded-3">
                        <i class="fas fa-info-circle me-2"></i>
                        Tidak ada hasil ditemukan untuk "<strong>${searchInput}</strong>". 
                        <br><small class="text-muted mt-1 d-block">Coba kata kunci: pakuwon, galaxy, maspion, cito, tunjungan</small>
                    </div>
                `;
    } else {
        let resultHTML = `
                    <div class="alert alert-success rounded-3 mb-3">
                        <i class="fas fa-check-circle me-2"></i>
                        Ditemukan <strong>${results.length}</strong> bioskop untuk pencarian "<strong>${searchInput}</strong>"
                    </div>
                    <div class="row">
                `;

        results.forEach((cinema, index) => {
            resultHTML += `
                        <div class="col-md-6 mb-3" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
                            <div class="card cinema-card border-0 rounded-3 h-100 shadow-sm card-hover">
                                <div class="card-body p-3">
                                    <div class="d-flex justify-content-between align-items-start mb-2">
                                        <h6 class="card-title fw-semibold mb-1 text-primary">${cinema.name}</h6>
                                        <span class="badge rounded-pill" style="background: linear-gradient(45deg, #6366f1, #8b5cf6); font-size: 0.7rem;">${cinema.type}</span>
                                    </div>
                                    <p class="text-muted small mb-2">
                                        <i class="fas fa-map-marker-alt me-2 text-danger"></i>${cinema.location}
                                    </p>
                                    <div class="mb-3">
                                        ${cinema.features.map(feature => `
                                            <small class="text-muted d-block mb-1">
                                                <i class="fas fa-star me-1 text-warning" style="font-size: 0.7rem;"></i>${feature}
                                            </small>
                                        `).join('')}
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <span class="fw-bold text-success small">${cinema.price}</span>
                                            <br><small class="text-muted">Range harga tiket</small>
                                        </div>
                                        <button class="btn btn-primary-custom btn-sm px-3" onclick="showCinemaDetail('${cinema.name}')">
                                            <i class="fas fa-info-circle me-1"></i>Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
        });
        resultHTML += '</div>';
        searchResults.innerHTML = resultHTML;
    }
}

// Show Detail func
function showCinemaDetail(cinemaName) {
    let selectedCinema = null;
    for (let key in cinemaData) {
        if (cinemaData[key].name === cinemaName) {
            selectedCinema = cinemaData[key];
            break;
        }
    }

    if (selectedCinema) {
        const modal = `
                    <div class="modal fade" id="cinemaModal" tabindex="-1">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content rounded-4">
                                <div class="modal-header border-0 pb-0">
                                    <h5 class="modal-title fw-bold text-primary">${selectedCinema.name}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <div class="mb-3">
                                                <h6 class="fw-semibold text-dark mb-2"><i class="fas fa-map-marker-alt text-danger me-2"></i>Lokasi</h6>
                                                <p class="text-muted">${selectedCinema.location}</p>
                                            </div>
                                            <div class="mb-3">
                                                <h6 class="fw-semibold text-dark mb-2"><i class="fas fa-star text-warning me-2"></i>Fasilitas</h6>
                                                <ul class="list-unstyled">
                                                    ${selectedCinema.features.map(feature => `<li class="mb-1"><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="card bg-light border-0 rounded-3">
                                                <div class="card-body text-center">
                                                    <div class="badge rounded-pill mb-3" style="background: linear-gradient(45deg, #6366f1, #8b5cf6); font-size: 0.9rem; padding: 0.5rem 1rem;">${selectedCinema.type}</div>
                                                    <h5 class="fw-bold text-success mb-2">${selectedCinema.price}</h5>
                                                    <p class="small text-muted mb-3">Range harga tiket</p>
                                                    <button class="btn btn-primary-custom w-100 mb-2">
                                                        <i class="fas fa-ticket-alt me-2"></i>Beli Tiket
                                                    </button>
                                                    <button class="btn btn-outline-primary w-100" onclick="window.open('${selectedCinema.url}', '_blank')">
                                                        <i class="fas fa-directions me-2"></i>Petunjuk Arah
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

        const existingModal = document.getElementById('cinemaModal');
        if (existingModal) {
            existingModal.remove();
        }

        document.body.insertAdjacentHTML('beforeend', modal);
        const modalElement = new bootstrap.Modal(document.getElementById('cinemaModal'));
        modalElement.show();
    }
}

document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchCinema();
    }
});

document.getElementById('searchInput').addEventListener('input', function () {
    const value = this.value.toLowerCase().trim();
    if (value.length >= 2) {
        setTimeout(() => {
            if (this.value.toLowerCase().trim() === value && value.length >= 2) {
                searchCinema();
            }
        }, 500);
    } else if (value.length === 0) {
        document.getElementById('searchResults').innerHTML = '';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(30, 41, 59, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(30, 41, 59, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    if (currentScroll > lastScrollTop && currentScroll > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .fade-in-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s ease;
                }
                
                .fade-in-on-scroll.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `;
    document.head.appendChild(style);

    const cards = document.querySelectorAll('.card-hover');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.classList.add('fade-in-on-scroll');
        observer.observe(card);
    });
});

const popularSearches = [
    'pakuwon mall',
    'galaxy mall',
    'maspion square',
    'tunjungan plaza',
    'ciputra world',
    'grand city',
    'cito mall',
    'kaza city'
];
let currentSearch = 0;

function showPopularSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput === document.activeElement || searchInput.value.length > 0) return;

    searchInput.placeholder = `Coba cari: ${popularSearches[currentSearch]}`;
    currentSearch = (currentSearch + 1) % popularSearches.length;
}

setInterval(showPopularSearch, 2500);

// counter animation
function animateCounter(element, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = [
                { element: entry.target.querySelector('.display-4'), end: 25 },
                { element: entry.target.querySelectorAll('.display-4')[1], end: 150 },
                { element: entry.target.querySelectorAll('.display-4')[2], end: 500 },
                { element: entry.target.querySelectorAll('.display-4')[3], end: 1000000 }
            ];

            counters.forEach(counter => {
                if (counter.element && !counter.element.classList.contains('animated')) {
                    counter.element.classList.add('animated');
                    if (counter.end === 1000000) {
                        counter.element.textContent = '1M+';
                    } else {
                        animateCounter(counter.element, 0, counter.end, 2000);
                    }
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-gradient:not(:first-child)');
if (statsSection) {
    statsObserver.observe(statsSection);
}

document.addEventListener('click', function (e) {
    const cinemaCard = e.target.closest('.cinema-card');
    if (cinemaCard && !e.target.closest('button') && !e.target.closest('a')) {
        const cinemaName = cinemaCard.querySelector('.card-title').textContent;
        showCinemaDetail(cinemaName);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const allCards = document.querySelectorAll('.cinema-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

document.getElementById('text-bioskop').addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    this.style.setProperty('--x', x + '%');
    this.style.setProperty('--y', y + '%');
});