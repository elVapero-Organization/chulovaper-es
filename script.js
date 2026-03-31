// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    header.classList.toggle('menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        header.classList.remove('menu-open');
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        header.classList.remove('menu-open');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card, .featured-card, .small-product');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Image placeholder fallback
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            // Create a placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.2) 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = this.alt || 'Product Image';
        });
    });
});

// Enhanced header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Product filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        // Add simple animation effect
        const products = document.querySelectorAll('.product-card');
        products.forEach((product, index) => {
            product.style.animation = 'none';
            setTimeout(() => {
                product.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            }, 10);
        });
    });
});

// Add animation keyframes dynamically
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
    
    .filter-btn.active {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
        border-color: transparent !important;
    }
`;
document.head.appendChild(style);

// Navigation arrows functionality
const navArrows = document.querySelectorAll('.nav-arrow');
navArrows.forEach(arrow => {
    arrow.addEventListener('click', function () {
        const direction = this.textContent.trim();
        const container = this.closest('.section-header').nextElementSibling;

        if (container && container.classList.contains('products-grid')) {
            const scrollAmount = direction === '←' ? -400 : 400;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
});

// Add horizontal scroll capability to product grids on mobile
document.addEventListener('DOMContentLoaded', () => {
    const productGrids = document.querySelectorAll('.products-grid');

    productGrids.forEach(grid => {
        let isDown = false;
        let startX;
        let scrollLeft;

        grid.addEventListener('mousedown', (e) => {
            isDown = true;
            grid.style.cursor = 'grabbing';
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
        });

        grid.addEventListener('mouseleave', () => {
            isDown = false;
            grid.style.cursor = 'grab';
        });

        grid.addEventListener('mouseup', () => {
            isDown = false;
            grid.style.cursor = 'grab';
        });

        grid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 2;
            grid.scrollLeft = scrollLeft - walk;
        });
    });
});

// Thumbnail gallery functionality
document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.detail-thumbnails img');
    const mainImage = document.querySelector('.detail-main-image img');
    const detailTitle = document.getElementById('detailTitle');
    const detailBattery = document.getElementById('detailBattery');
    const detailPuffs = document.getElementById('detailPuffs');
    const detailLiquid = document.getElementById('detailLiquid');
    const buyNowBtn = document.getElementById('buyNowBtn');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Remove active state from all thumbnails
                thumbnails.forEach(t => t.style.borderColor = 'rgba(255, 255, 255, 0.1)');

                // Add active state to clicked thumbnail
                this.style.borderColor = 'rgba(59, 130, 246, 0.8)';

                // Update content with fade effect
                if (detailTitle) detailTitle.style.opacity = '0';
                if (detailDesc) detailDesc.style.opacity = '0';
                if (detailBattery) detailBattery.style.opacity = '0';
                if (detailPuffs) detailPuffs.style.opacity = '0';
                if (detailLiquid) detailLiquid.style.opacity = '0';
                if (buyNowBtn) buyNowBtn.style.opacity = '0';
                mainImage.style.opacity = '0';

                setTimeout(() => {
                    // Update main image
                    mainImage.src = this.src;

                    // Update text content and links from data attributes
                    if (detailTitle) detailTitle.textContent = this.dataset.title;
                    if (detailDesc) detailDesc.textContent = this.dataset.desc;
                    if (detailBattery) detailBattery.textContent = this.dataset.battery;
                    if (detailPuffs) detailPuffs.textContent = this.dataset.puffs;
                    if (detailLiquid) detailLiquid.textContent = this.dataset.liquid;
                    if (buyNowBtn) buyNowBtn.href = this.dataset.link;

                    // Fade back in
                    mainImage.style.opacity = '1';
                    if (detailTitle) detailTitle.style.opacity = '1';
                    if (detailDesc) detailDesc.style.opacity = '1';
                    if (detailBattery) detailBattery.style.opacity = '1';
                    if (detailPuffs) detailPuffs.style.opacity = '1';
                    if (detailLiquid) detailLiquid.style.opacity = '1';
                    if (buyNowBtn) buyNowBtn.style.opacity = '1';
                }, 200);
            });
        });

        // Set initial styles for transitions
        [detailTitle, detailDesc, detailBattery, detailPuffs, detailLiquid, buyNowBtn].forEach(el => {
            if (el) el.style.transition = 'opacity 0.3s ease';
        });

        // Set first thumbnail as active by default
        if (thumbnails[0]) {
            thumbnails[0].style.borderColor = 'rgba(59, 130, 246, 0.8)';
        }
    }
});

// Add to cart animation
document.querySelectorAll('.btn-product, .btn-buy-large').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
            margin-left: -90px;
            margin-top: -90px;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroRight = document.querySelector('.hero-right img');

    if (heroRight) {
        heroRight.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${scrolled * 0.3}px)`;
    }
});


// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") != "true") {
        ageModal.style.display = "flex";
    } else {
        ageModal.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Dostęp zabroniony. Strona tylko dla osób 18+");
    window.close();
    window.location.href = "https://www.google.pl";
});

// Show More functionality for description section
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenCards = document.querySelectorAll('.description-card.hidden');
let isExpanded = false;

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        hiddenCards.forEach(card => {
            if (isExpanded) {
                card.style.display = 'block';
                // Small timeout to allow display: block to take effect before removing hidden class for animation
                setTimeout(() => card.classList.remove('hidden'), 10);
            } else {
                card.classList.add('hidden');
                setTimeout(() => card.style.display = 'none', 300); // Wait for transition if any
            }
        });

        showMoreBtn.innerHTML = isExpanded ? 'Ver menos ↑' : 'Ver más →';

        // If closing, scroll back to the start of the section
        if (!isExpanded) {
            document.getElementById('description').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// footer
const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");
city.addEventListener("click", toggleCont);
function toggleCont() {
    city.classList.toggle("active");
    Array.from(cont).forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}
