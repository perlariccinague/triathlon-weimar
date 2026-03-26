// Sélection des éléments
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const totalSlides = slides.length;
let currentIndex = 2; // Commencer à l'index 2 pour avoir le 3ème slide au centre (0,1,2,3,4)
let autoPlayInterval;
let isTransitioning = false;
let isDragging = false;
let startX = 0;
let scrollLeftStart = 0;

// Créer les dots
function createDots() {
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
}

// Mettre à jour les dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Mettre à jour la classe active sur les slides
function updateActiveSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
}

// Centrer le slide actif
function centerActiveSlide() {
    if (!slides[currentIndex]) return;

    const containerRect = slidesContainer.parentElement.getBoundingClientRect();
    const activeSlide = slides[currentIndex];
    const slideRect = activeSlide.getBoundingClientRect();

    const scrollLeft = slidesContainer.scrollLeft;
    const targetScroll = scrollLeft + (slideRect.left - containerRect.left) - (containerRect.width / 2) + (slideRect.width / 2);

    slidesContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
    });
}

// Snap au slide le plus proche
function snapToNearestSlide() {
    const containerCenter = slidesContainer.scrollLeft + slidesContainer.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(slideCenter - containerCenter);
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    if (closestIndex !== currentIndex) {
        currentIndex = closestIndex;
        updateActiveSlides();
        updateDots();
    }

    centerActiveSlide();
    resetAutoPlay();
}

// Aller au slide suivant
function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    updateActiveSlides();
    centerActiveSlide();
    updateDots();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);

    resetAutoPlay();
}

// Aller au slide précédent
function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalSlides - 1;
    }

    updateActiveSlides();
    centerActiveSlide();
    updateDots();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);

    resetAutoPlay();
}

// Aller à un slide spécifique
function goToSlide(index) {
    if (isTransitioning || index === currentIndex) return;
    isTransitioning = true;

    currentIndex = index;
    updateActiveSlides();
    centerActiveSlide();
    updateDots();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);

    resetAutoPlay();
}

// Autoplay
function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Événements tactiles pour le swipe
function initTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;

    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    });

    slidesContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener('touchend', () => {
        const difference = touchEndX - touchStartX;
        if (Math.abs(difference) > 50) {
            if (difference > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        setTimeout(() => {
            startAutoPlay();
        }, 3000);
    });
}

// Événements souris pour le drag
function initDragEvents() {
    slidesContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - slidesContainer.offsetLeft;
        scrollLeftStart = slidesContainer.scrollLeft;
        slidesContainer.style.cursor = 'grabbing';
        stopAutoPlay();
    });

    slidesContainer.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            slidesContainer.style.cursor = 'grab';
            snapToNearestSlide();
            startAutoPlay();
        }
    });

    slidesContainer.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            slidesContainer.style.cursor = 'grab';
            snapToNearestSlide();
            startAutoPlay();
        }
    });

    slidesContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slidesContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        slidesContainer.scrollLeft = scrollLeftStart - walk;
    });
}

// Écouter le scroll pour le snap
let scrollTimeout;
function initScrollListener() {
    slidesContainer.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!isDragging) {
                snapToNearestSlide();
            }
        }, 150);
    });
}

// Initialisation
function init() {
    createDots();
    updateActiveSlides();

    // Centrer le slide initial
    setTimeout(() => {
        centerActiveSlide();
    }, 100);

    startAutoPlay();
    initTouchEvents();
    initDragEvents();
    initScrollListener();

    // Pause au survol
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);

    // Navigation au clic sur les slides
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (index !== currentIndex) {
                goToSlide(index);
            }
        });
    });

    // Réinitialiser la position au redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            centerActiveSlide();
        }, 100);
    });
}

// Démarrer quand la page est chargée
document.addEventListener('DOMContentLoaded', init);