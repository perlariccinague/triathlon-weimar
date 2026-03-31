document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.slider-container');
    const track = document.querySelector('.slides');
    let slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    slides = document.querySelectorAll('.slide');
    const realCount = slides.length - 2;


    let index = Math.floor(realCount / 2) + 1;

    for (let i = 0; i < realCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            index = i + 1;
            move();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    function move() {
        const slide = slides[index];
        const offset = slide.offsetLeft - (container.offsetWidth / 2) + (slide.offsetWidth / 2);
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(-${offset}px)`;

        slides.forEach(s => s.classList.remove('active', 'prev', 'next'));
        slides[index].classList.add('active');
        if (slides[index - 1]) slides[index - 1].classList.add('prev');
        if (slides[index + 1]) slides[index + 1].classList.add('next');

        dots.forEach(d => d.classList.remove('active'));
        let realIndex = (index === 0) ? realCount - 1
            : (index === slides.length - 1) ? 0
                : index - 1;
        dots[realIndex].classList.add('active');
    }

    track.addEventListener('transitionend', () => {
        if (slides[index].isEqualNode(firstClone)) {
            track.style.transition = "none";
            index = 1;
            move();
        }
        if (slides[index].isEqualNode(lastClone)) {
            track.style.transition = "none";
            index = slides.length - 2;
            move();
        }
    });

    function next() {
        index++;
        track.style.transition = "transform 0.5s ease";
        move();
    }

    function prev() {
        index--;
        track.style.transition = "transform 0.5s ease";
        move();
    }

    let startX = 0;
    track.addEventListener('mousedown', e => startX = e.clientX);
    track.addEventListener('mouseup', e => {
        const diff = e.clientX - startX;
        if (diff > 50) prev();
        else if (diff < -50) next();
    });
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50) prev();
        else if (diff < -50) next();
    });

    window.addEventListener('load', () => {
        move();
        setTimeout(move, 100);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    let mobileSwiper = null;

    function initMobileSwiper() {
        const container = document.querySelector('.slider-container');
        const slidesWrapper = container.querySelector('.slides');
        const slides = container.querySelectorAll('.slide');

        if (window.innerWidth <= 1024 && !mobileSwiper) {
            container.classList.add('swiper');
            slidesWrapper.classList.add('swiper-wrapper');
            slides.forEach(slide => slide.classList.add('swiper-slide'));

            mobileSwiper = new Swiper(container, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                centeredSlides: true,
                slideToClickedSlide: true,
                pagination: {
                    el: container.querySelector('.dots'),
                    clickable: true,
                },
            });
        } else if (window.innerWidth > 1024 && mobileSwiper) {
            mobileSwiper.destroy(true, true);
            mobileSwiper = null;

            container.classList.remove('swiper');
            slidesWrapper.classList.remove('swiper-wrapper');
            slides.forEach(slide => slide.classList.remove('swiper-slide'));
        }
    }

    initMobileSwiper();
    window.addEventListener("resize", initMobileSwiper);
});


