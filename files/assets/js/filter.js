const filterButtons = document.querySelectorAll('.filter-btn');
const resetButton = document.querySelector('.reset-btn');
const events = document.querySelectorAll('.event-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        events.forEach(event => {
            if (event.classList.contains(filter)) {
                event.style.display = '';
            } else {
                event.style.display = 'none';
            }
        });

        resetButton.style.display = 'inline-block';
    });
});

resetButton.addEventListener('click', () => {
    events.forEach(event => event.style.display = '');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    resetButton.style.display = 'none';
});