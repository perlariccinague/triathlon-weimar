/*
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
});*/

console.log('Global event filter loaded');

/* =========================================================
   1. STOP SCROLL AUTO NAVIGATOR
========================================================= */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

/* =========================================================
   2. DETECTEUR GLOBAL BLOCK (TOUS CONTENUS CONTao)
========================================================= */
function getEventBlock() {
    return document.querySelector('#event, #article-44, #article-58, .event-group');
}

/* =========================================================
   3. CATEGORY FROM URL
========================================================= */
function getCategoryFromURL() {
    return new URLSearchParams(window.location.search).get('category');
}

/* =========================================================
   4. FILTER UNIVERSAL
========================================================= */
function filterEvents() {
    const category = getCategoryFromURL();

    const block = getEventBlock();
    if (!block) return;

    const events = block.querySelectorAll('.event-card-wrapper');

    // reset
    events.forEach(ev => ev.style.display = '');

    if (!category) return;

    console.log('Filtrage catégorie:', category);

    let visibleCount = 0;

    events.forEach(ev => {
        const badges = ev.querySelectorAll('.event-badge span');

        let match = false;

        badges.forEach(b => {
            if (b.classList.contains(category)) {
                match = true;
            }
        });

        if (match) {
            ev.style.display = '';
            visibleCount++;
        } else {
            ev.style.display = 'none';
        }
    });

    console.log('Événements visibles:', visibleCount);
}

/* =========================================================
   5. SCROLL PRO (UNIFIÉ)
========================================================= */
function scrollToBlock() {
    const blocks = document.querySelectorAll('.event-group');

    let target = null;

    blocks.forEach(block => {
        const events = block.querySelectorAll('.event-card-wrapper');

        // on prend le bloc qui contient des events visibles
        const hasVisibleEvents = Array.from(events).some(ev =>
            ev.style.display !== 'none'
        );

        if (hasVisibleEvents && !target) {
            target = block;
        }
    });

    if (!target) {
        target = document.querySelector('.event-group');
    }

    if (!target) return;

    const y = target.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
        top: y - 10,
        behavior: 'auto'
    });
}

/* =========================================================
   6. CLICK CATEGORY FILTER (GLOBAL)
========================================================= */
document.querySelectorAll('.category-filter a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const url = new URL(this.href);
        const category = url.searchParams.get('category');

        history.pushState({}, '', this.href);

        filterEvents();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                scrollToBlock();
            });
        });
    });
});

/* =========================================================
   7. BACK / FORWARD NAVIGATION
========================================================= */
window.addEventListener('popstate', () => {
    filterEvents();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            scrollToBlock();
        });
    });
});

/* =========================================================
   8. INITIAL LOAD
========================================================= */
window.addEventListener('load', () => {
    filterEvents();

    if (getCategoryFromURL()) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                scrollToBlock();
            });
        });
    }
});

