/*
document.querySelectorAll('.rte a').forEach(link => {
    const currentUrl = window.location.href;
    const linkUrl = link.href;

    if (currentUrl.includes(linkUrl)) {
        link.classList.add('active');
    }
});*/

const path = window.location.pathname.replace(/\/$/, '');

const isHome = path === '' || path === '/' || path === '/startseite' || path === '/index';

document.querySelectorAll('.header-left .rte a').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');

    if (isHome) {
        link.classList.add('active');
    } else if (path === linkPath) {
        link.classList.add('active');
    }
});
