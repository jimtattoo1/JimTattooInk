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
    console.log('Inicializando galería...');
    initializeGallery();
    setupEventListeners();
    updateLightboxImages();
    setupTouchGestures();
    setupSmoothScroll();
});

/**
 * Inicializa la galería obteniendo referencias a elementos
 */
function initializeGallery() {
    appState.galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
    console.log(`Galería inicializada con ${appState.galleryCards.length} tarjetas`);
}

/**
/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    // Event listeners para botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
        console.log(`${filterButtons.length} botones de filtro configurados`);
    } else {
        console.warn('No se encontraron botones de filtro - creando botones por defecto');
        createDefaultFilterButtons(); // AÑADIR ESTA FUNCIÓN
    }

    // Event listeners para botones de ver obra (delegación)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-btn')) {
            handleViewClick(e);
        }
    });

    // Event listeners para lightbox
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightbox = document.getElementById('lightbox');

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPreviousImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    if (lightbox) lightbox.addEventListener('click', handleLightboxBackgroundClick);
}

/**
 * Crea botones de filtro por defecto cuando no se encuentran
 */
function createDefaultFilterButtons() {
    console.log('Creando botones de filtro por defecto...');
    
    // 1. Buscar donde poner los botones - ESPECÍFICAMENTE en la galería
    let filterContainer = document.querySelector('.filter-buttons');
    
    // 2. Si no existe contenedor, crearlo en un lugar ESPECÍFICO
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.className = 'filter-buttons';
        filterContainer.style.textAlign = 'center';
        filterContainer.style.margin = '20px 0';
        filterContainer.style.padding = '10px';
        
        // Buscar DONDE ESPECÍFICO insertar el contenedor
        const gallery = document.querySelector('.gallery');
        
        if (gallery) {
            // Insertar ANTES de la galería, no al principio de todo
            gallery.parentNode.insertBefore(filterContainer, gallery);
        } else {
            // Si no hay galería, ponerlo en un lugar menos disruptivo
            const main = document.querySelector('main') || document.body;
            const firstChild = main.firstChild;
            if (firstChild) {
                main.insertBefore(filterContainer, firstChild.nextSibling);
            } else {
                main.appendChild(filterContainer);
            }
        }
    }
    
    // 3. Crear botones de filtro por defecto
    const defaultFilters = [
        { text: 'Todos', filter: 'all' },
        { text: 'Blackwork', filter: 'blackwork' },
        { text: 'Tradicional', filter: 'tradicional' },
        { text: 'Realismo', filter: 'realismo' },
        { text: 'Geométrico', filter: 'geometrico' }
    ];
    
    defaultFilters.forEach(filterObj => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-filter', filterObj.filter);
        button.textContent = filterObj.text;
        button.style.margin = '5px';
        button.style.padding = '8px 16px';
        button.style.backgroundColor = '#333';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.addEventListener('click', handleFilterClick);
        filterContainer.appendChild(button);
    });
    
    console.log(`${defaultFilters.length} botones de filtro creados por defecto`);
    return filterContainer;
}
/**
 * Maneja el clic en los botones de filtro
 */
function handleFilterClick(event) {
    const filter = event.target.getAttribute('data-filter');
    console.log(`Filtrando por: ${filter}`);
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Añadir clase active al botón clickeado
    event.target.classList.add('active');
    
    // Lógica de filtrado
    filterGallery(filter);
}
/**
 * Filtra la galería según el filtro seleccionado
 */
function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let visibleCount = 0;
    
    galleryItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
            visibleCount++;
        } else {
            const itemCategory = item.getAttribute('data-category');
            if (itemCategory === filter) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        }
    });
    
    console.log(`${visibleCount} elementos mostrados con filtro: ${filter}`);
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
    let visibleCount = 0;
    
    appState.galleryCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'todos' || cardCategory === filterValue) {
            // Mostrar tarjeta
            card.style.display = 'block';
            card.classList.remove('hidden');
            visibleCount++;
            
            // Trigger reflow para animación
            void card.offsetWidth;
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            // Ocultar tarjeta
            card.style.display = 'none';
            card.classList.add('hidden');
        }
    });
    
    console.log(`Filtro "${filterValue}" aplicado - ${visibleCount} elementos visibles`);
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
        .map(card => {
            const img = card.querySelector('.card-image');
            const title = card.querySelector('.card-title');
            const category = card.querySelector('.card-category');
            
            return {
                src: img ? img.src : '',
                title: title ? title.textContent : 'Sin título',
                category: category ? category.textContent : 'Sin categoría',
                element: card
            };
        });
    
    console.log(`${appState.lightboxImages.length} imágenes en lightbox`);
}

/**
 * Maneja el click en el botón "Ver Obra"
 */
function handleViewClick(event) {
    event.stopPropagation();
    const card = event.target.closest('.gallery-card');
    
    if (!card) {
        console.warn('No se pudo encontrar la tarjeta de galería');
        return;
    }

    // Encontrar el índice en el array filtrado
    const cardImage = card.querySelector('.card-image');
    if (!cardImage) {
        console.warn('No se encontró imagen en la tarjeta');
        return;
    }

    const filteredIndex = appState.lightboxImages.findIndex(img => 
        img.src === cardImage.src
    );
    
    appState.currentImageIndex = filteredIndex >= 0 ? filteredIndex : 0;
    console.log('Abriendo lightbox para imagen:', appState.currentImageIndex);
    openLightbox();
}

/**
 * Abre el lightbox y muestra la imagen actual
 */
function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        console.error('Lightbox no encontrado');
        return;
    }
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    displayLightboxImage(appState.currentImageIndex);
}

/**
 * Cierra el lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        console.log('Lightbox cerrado');
    }
}

/**
 * Muestra una imagen específica en el lightbox
 */
function displayLightboxImage(index) {
    if (appState.lightboxImages.length === 0) {
        console.warn('No hay imágenes en el lightbox');
        return;
    }

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

    if (!lightboxImage) {
        console.error('Elementos del lightbox no encontrados');
        return;
    }

    // Actualizar contenido
    lightboxImage.src = currentImage.src;
    lightboxImage.alt = currentImage.title;
    if (lightboxTitle) lightboxTitle.textContent = currentImage.title;
    if (lightboxCategory) lightboxCategory.textContent = currentImage.category;

    console.log(`Mostrando imagen ${appState.currentImageIndex + 1}/${appState.lightboxImages.length}`);
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
    
    if (!lightbox || lightbox.style.display !== 'flex') return;

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

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    let touchStartX = 0;
    let touchEndX = 0;

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
    console.log('Imágenes visibles:', appState.lightboxImages);
}

// Exponer función de logging en la consola
window.logGalleryInfo = logGalleryInfo;

// REMOVER LA PARTE DE PIERCINGS - eso debe ir en piercings.html
