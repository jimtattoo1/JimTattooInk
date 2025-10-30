// gallery.js - Funcionalidad de Galería y Lightbox

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const closeButton = document.querySelector('.lightbox-close');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    
    let currentGalleryItems = Array.from(galleryCards);
    let currentIndex = 0;

    // 1. Funcionalidad de Filtrado
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Eliminar clase 'active' de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir clase 'active' al botón clickeado
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            currentGalleryItems = [];

            galleryCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'todos' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    currentGalleryItems.push(card);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });

    // 2. Funcionalidad Lightbox
    
    // Abrir Lightbox
    galleryCards.forEach((card, index) => {
        card.querySelector('.view-btn').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determinar el índice actual en el conjunto filtrado
            const cardInFilteredSet = currentGalleryItems.find(item => item === card);
            if (cardInFilteredSet) {
                currentIndex = currentGalleryItems.indexOf(cardInFilteredSet);
            } else {
                 // Si la tarjeta no está en el conjunto filtrado (debería estar si se hizo clic)
                 currentIndex = index;
            }
            
            showLightbox(currentIndex);
        });
    });

    function showLightbox(index) {
        if (currentGalleryItems.length === 0) return;

        const card = currentGalleryItems[index];
        const imageSrc = card.querySelector('.card-image').getAttribute('src');
        const title = card.querySelector('.card-title').textContent;
        const category = card.querySelector('.card-category').textContent;

        lightboxImage.setAttribute('src', imageSrc);
        lightboxImage.setAttribute('alt', title);
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;
        
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
    }

    // Cerrar Lightbox
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navegación
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
        showLightbox(currentIndex);
    });

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % currentGalleryItems.length;
        showLightbox(currentIndex);
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                prevButton.click();
            } else if (e.key === 'ArrowRight') {
                nextButton.click();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });

    // Inicializar: asegurar que "Todos" esté activo al cargar
    document.querySelector('.filter-btn[data-filter="todos"]').click();
});