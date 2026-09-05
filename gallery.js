const items = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const count = document.querySelector('.lightbox-count');
let currentIndex = 0;

function showImage(index) {
    currentIndex = (index + items.length) % items.length;
    lightboxImage.src = items[currentIndex].dataset.src;
    lightboxImage.alt = items[currentIndex].querySelector('img').alt;
    count.textContent = `${currentIndex + 1} / ${items.length}`;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
}

items.forEach((item, index) => item.addEventListener('click', () => showImage(index)));
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-arrow.previous').addEventListener('click', () => showImage(currentIndex - 1));
document.querySelector('.lightbox-arrow.next').addEventListener('click', () => showImage(currentIndex + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);
});
