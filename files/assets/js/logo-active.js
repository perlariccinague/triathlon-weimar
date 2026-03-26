
const path = window.location.pathname.replace(/\/$/, '');
const isHome = path === '' || path === '/' || path === '/startseite' || path === '/index';

document.querySelectorAll('.header-left .rte a').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
    if (!isHome && path === linkPath) {
        link.classList.add('active');
    } else if (isHome) {
        link.classList.add('active-home');
    }
});