document.addEventListener("DOMContentLoaded", function () {
    // Hamburger Menu
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const dropdownMenu = document.getElementById('dropdown-menu');

    // Toggle hamburger menu and dropdown
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        dropdownMenu.classList.toggle('show-dropdown');
    });

    // Close dropdown when clicking outside or on a menu item
    document.addEventListener('click', (event) => {
        if (!hamburgerMenu.contains(event.target) && !dropdownMenu.contains(event.target)) {
            hamburgerMenu.classList.remove('active');
            dropdownMenu.classList.remove('show-dropdown');
        }
    });

    // Update menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            hamburgerMenu.classList.remove('active');
            dropdownMenu.classList.remove('show-dropdown');
        }
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.hero-slider');
    const paginationDots = document.querySelector('.pagination-dots');
    let currentSlide = 0;
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        updatePagination(index);
    }

    function updatePagination(index) {
        const dots = document.querySelectorAll('.pagination-dots span');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    prevSlide.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    nextSlide.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    setInterval(() => {
        nextSlide.click();
    }, 5000);

    showSlide(currentSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide.click();
        } else if (e.key === 'ArrowRight') {
            nextSlide.click();
        }
    });

    // Initialize pagination dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
        paginationDots.appendChild(dot);
    });

    // Set the initial pagination
    updatePagination(currentSlide);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            setTimeout(() => {
                entry.target.classList.toggle('show', entry.isIntersecting);

                // Update counter if it exists within the target
                const counter = entry.target.querySelector('.number');
                if (counter) {
                    updateCount(counter);
                }
            }, index * 200); // Delay each animation by 200ms
        });
    }, { threshold: 0.5 });

    // Elements to observe
    const elementsToObserve = [
        ...document.querySelectorAll('.slide'),
        ...document.querySelectorAll('.cube'),
        ...document.querySelectorAll('.btn'),
        ...document.querySelectorAll('.floating-images'),
        ...document.querySelectorAll('.counter-box.animated'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.case-study'),
        ...document.querySelectorAll('.testimonial'),
        ...document.querySelectorAll('.brochure-box'),
        ...document.querySelectorAll('.faq')
    ];
    elementsToObserve.forEach(element => observer.observe(element));

    // Scroll to top button functionality
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Counter functionality
    function updateCount(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/[^0-9]/g, '');
        const increment = 1;
        const formattedTarget = formatNumber(target);

        if (count < 105 && count < target) {
            counter.innerText = formatNumber(Math.ceil(count + increment));
            setTimeout(() => updateCount(counter), 30);
        } else if (count < target) {
            counter.innerText = formattedTarget;
            counter.classList.add('formatted');
        } else {
            counter.innerText = formattedTarget;
            if (counter.parentElement.querySelector('.label').textContent.includes('Clients')) {
                counter.innerText += '+';
            } else if (counter.parentElement.querySelector('.label').textContent.includes('Growth')) {
                counter.innerText += 'X';
            }
        }
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        } else {
            return num;
        }
    }

    // Parallax Effect for Background Text
    document.addEventListener('scroll', function () {
        const bgText = document.querySelector('.bg-text');
        const scrollPosition = window.pageYOffset;
        bgText.style.transform = `translateX(${scrollPosition * 0.2}px)`;
    });

    // FAQ Toggle
    document.querySelectorAll('.faq').forEach(faq => {
        faq.addEventListener('click', () => {
            faq.classList.toggle('active');
        });
    });
});
