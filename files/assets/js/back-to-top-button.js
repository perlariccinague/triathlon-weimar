const button = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
});

button.addEventListener('click', () => {
    scrollToTop();
});

function scrollToTop() {
    let start = window.scrollY;
    let duration = 800;
    let startTime = null;

    function animate(time) {
        if (!startTime) {
            startTime = time;
        }

        let progress = (time - startTime) / duration;

        if (progress > 1) {
            progress = 1;
        }

        let ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, start * (1 - ease));

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}