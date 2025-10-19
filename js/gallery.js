// ============================================
// GALERÍA DE TATUAJES - FUNCIONALIDAD
// ============================================

// Estado de la aplicación
const appState = {
    currentFilter: 'todos',
    currentImageIndex: 0,
    galleryCards: [],
    lightboxImages: []
};

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupEventListeners();
    updateLightboxImages();
});

/**
 * Inicializa la galería obteniendo referencias a elementos
 */
function initializeGallery() {
    appState.galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    console.log(`Galería inicializada con ${appState.galleryCards.length} tarjetas`);
}

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    // Event listeners para botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Event listeners para botones de ver obra
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', handleViewClick);
    });

    // Event listeners para lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPreviousImage);
    lightboxNext.addEventListener('click', showNextImage);
    lightbox.addEventListener('click', handleLightboxBackgroundClick);

    // Navegación con teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// ============================================
// FUNCIONALIDAD DE FILTROS
// ============================================

/**
 * Maneja el click en los botones de filtro
 */
function handleFilterClick(event) {
    const filterBtn = event.currentTarget;
    const filterValue = filterBtn.getAttribute('data-filter');

    // Actualizar botón activo
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    filterBtn.classList.add('active');

    // Aplicar filtro
    appState.currentFilter = filterValue;
    filterGallery(filterValue);
    updateLightboxImages();
}

/**
 * Filtra las tarjetas de la galería según la categoría seleccionada
 */
function filterGallery(filterValue) {
    appState.galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'todos' || cardCategory === filterValue) {
            // Mostrar tarjeta
            card.classList.remove('hidden');
            card.style.display = 'block';
            // Trigger reflow para que la animación funcione
            void card.offsetWidth;
            card.style.animation = 'scaleIn 0.5s ease-out forwards';
        } else {
            // Ocultar tarjeta
            card.style.animation = 'none';
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
}

// ============================================
// FUNCIONALIDAD DE LIGHTBOX
// ============================================

/**
 * Actualiza el array de imágenes visibles en el lightbox
 */
function updateLightboxImages() {
    appState.lightboxImages = appState.galleryCards
        .filter(card => !card.classList.contains('hidden'))
        .map(card => ({
            src: card.querySelector('.card-image').src,
            title: card.querySelector('.card-title').textContent,
            category: card.querySelector('.card-category').textContent
        }));
}

/**
 * Maneja el click en el botón "Ver Obra"
 */
function handleViewClick(event) {
    event.stopPropagation();
    const card = event.currentTarget.closest('.gallery-card');
    const imageIndex = appState.galleryCards.indexOf(card);
    
    // Encontrar el índice en el array filtrado
    const filteredIndex = appState.lightboxImages.findIndex(img => 
        img.src === card.querySelector('.card-image').src
    );
    
    appState.currentImageIndex = filteredIndex >= 0 ? filteredIndex : 0;
    openLightbox();
}

/**
 * Abre el lightbox y muestra la imagen actual
 */
function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('active');
    displayLightboxImage(appState.currentImageIndex);
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Muestra una imagen específica en el lightbox
 */
function displayLightboxImage(index) {
    if (appState.lightboxImages.length === 0) return;

    // Asegurar que el índice esté dentro de los límites
    if (index < 0) {
        appState.currentImageIndex = appState.lightboxImages.length - 1;
    } else if (index >= appState.lightboxImages.length) {
        appState.currentImageIndex = 0;
    } else {
        appState.currentImageIndex = index;
    }

    const currentImage = appState.lightboxImages[appState.currentImageIndex];
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');

    // Actualizar contenido con animación
    lightboxImage.style.animation = 'none';
    void lightboxImage.offsetWidth; // Trigger reflow
    lightboxImage.style.animation = 'fadeIn 0.4s ease-out';
    
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.title;
    lightboxTitle.textContent = currentImage.title;
    lightboxCategory.textContent = currentImage.category;
}

/**
 * Muestra la imagen anterior
 */
function showPreviousImage() {
    displayLightboxImage(appState.currentImageIndex - 1);
}

/**
 * Muestra la siguiente imagen
 */
function showNextImage() {
    displayLightboxImage(appState.currentImageIndex + 1);
}

/**
 * Maneja el click en el fondo del lightbox
 */
function handleLightboxBackgroundClick(event) {
    if (event.target === event.currentTarget) {
        closeLightbox();
    }
}

/**
 * Maneja la navegación por teclado
 */
function handleKeyboardNavigation(event) {
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox.classList.contains('active')) return;

    switch(event.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPreviousImage();
            event.preventDefault();
            break;
        case 'ArrowRight':
            showNextImage();
            event.preventDefault();
            break;
    }
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Añade efecto de scroll suave a los enlaces internos
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Detecta si el dispositivo soporta touch
 */
function isTouchDevice() {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
}

/**
 * Añade soporte para gestos de swipe en dispositivos táctiles
 */
function setupTouchGestures() {
    if (!isTouchDevice()) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const lightbox = document.getElementById('lightbox');

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe a la izquierda - siguiente imagen
                showNextImage();
            } else {
                // Swipe a la derecha - imagen anterior
                showPreviousImage();
            }
        }
    }
}

// Inicializar gestos táctiles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupTouchGestures);

// ============================================
// LOGGING Y DEBUGGING
// ============================================

/**
 * Log de información de la galería
 */
function logGalleryInfo() {
    console.log('=== INFORMACIÓN DE LA GALERÍA ===');
    console.log('Filtro actual:', appState.currentFilter);
    console.log('Índice de imagen actual:', appState.currentImageIndex);
    console.log('Total de tarjetas:', appState.galleryCards.length);
    console.log('Imágenes en lightbox:', appState.lightboxImages.length);
    console.log('Imágenes:', appState.lightboxImages);
}

// Exponer función de logging en la consola
window.logGalleryInfo = logGalleryInfo;

document.addEventListener('DOMContentLoaded', () => {
    const piercings = [
        {
            name: 'Piercing de Oreja (Hélix, Tragus, Lóbulo)',
            description: 'Múltiples piercings en la oreja con joyería blackwork detallada.',
            image: '../piercing_oreja_blackwork.png'
        },
        {
            name: 'Piercing Facial (Septum, Labret)',
            description: 'Piercings faciales con joyería blackwork y toques de color.',
            image: '../piercing_facial_blackwork.png'
        },
        {
            name: 'Joyería Blackwork Variada',
            description: 'Diversos diseños de joyería blackwork, mostrando detalles y texturas.',
            image: '../joyeria_blackwork_detallada.png'
        },
        {
            name: 'Piercing Industrial',
            description: 'Un piercing industrial que conecta dos perforaciones en el cartílago superior de la oreja con una barra recta, ideal para joyería blackwork minimalista.',
            image: 'https://via.placeholder.com/400x400/000000/F5F1E8?text=Industrial'
        },
        {
            name: 'Piercing Daith',
            description: 'Un piercing en el pliegue más interno del cartílago de la oreja, a menudo asociado con la reducción de migrañas, perfecto para aros blackwork intrincados.',
            image: 'https://via.placeholder.com/400x400/000000/F5F1E8?text=Daith'
        },
        {
            name: 'Piercing Rook',
            description: 'Ubicado en el pliegue superior del cartílago interior de la oreja, un piercing Rook es sutil y elegante, complementado con pequeñas joyas blackwork curvas.',
            image: 'https://via.placeholder.com/400x400/000000/F5F1E8?text=Rook'
        },
        {
            name: 'Piercing de Lengua',
            description: 'Un piercing central en la lengua, generalmente con una barra recta. Aunque no es visible externamente, la elección de una bola superior blackwork añade un toque personal.',
            image: 'https://via.placeholder.com/400x400/000000/F5F1E8?text=Lengua'
        },
        {
            name: 'Piercing de Ceja',
            description: 'Un piercing vertical a través de la ceja, que puede realzar la expresión facial. Joyería blackwork en forma de barra curva o aro pequeño.',
            image: 'https://via.placeholder.com/400x400/000000/F5F1E8?text=Ceja'
        }
    ];

    const galleryContainer = document.querySelector('.gallery-container');

    piercings.forEach(piercing => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `
            <img src="${piercing.image}" alt="${piercing.name}">
            <h4>${piercing.name}</h4>
            <p>${piercing.description}</p>
        `;
        galleryContainer.appendChild(galleryItem);
    });
});

