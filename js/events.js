// js/events.js - Обработка событий (свайпы, клики)

// Переменные для отслеживания касаний
let startX = 0;
let startY = 0;
let isSwiping = false;

// Переменные для отслеживания скролла
let isScrolling = false;
let scrollTimeout;

// Переменные для отслеживания мыши
let mouseStartX = 0;

// Инициализация всех обработчиков событий
function initEventHandlers() {
    initTouchEvents();
    initMouseEvents();
    initKeyboardEvents();
    initWheelEvents();
}

// Обработка касаний на мобильных устройствах
function initTouchEvents() {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
}

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = false;
    }
}

function handleTouchMove(e) {
    if (e.touches.length === 1 && startX && startY) {
        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;
        
        let diffX = Math.abs(startX - currentX);
        let diffY = Math.abs(startY - currentY);
        
        // Уменьшили порог для более быстрой реакции
        if (diffX > diffY && diffX > 15) {
            isSwiping = true;
            e.preventDefault(); // Предотвращаем скролл только при свайпе
        }
    }
}

function handleTouchEnd(e) {
    if (!startX || !startY) return;
    
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;
    
    // Уменьшили минимальное расстояние для срабатывания
    if (Math.abs(diffX) > 30) {
        // МГНОВЕННЫЙ вызов без дебаунсинга!
        if (diffX > 0) {
            nextSlide(); // Прямой вызов
        } else {
            prevSlide(); // Прямой вызов
        }
    }
    
    // Сбрасываем переменные
    startX = 0;
    startY = 0;
    isSwiping = false;
}

// Обработка событий мыши
function initMouseEvents() {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseDown(e) {
    mouseStartX = e.clientX;
}

function handleMouseUp(e) {
    let mouseEndX = e.clientX;
    let diffX = mouseStartX - mouseEndX;
    
    if (Math.abs(diffX) > 50) {
        if (diffX > 50) {
            nextSlide(); // Перетаскивание влево - следующий слайд
        } else if (diffX < -50) {
            prevSlide(); // Перетаскивание вправо - предыдущий слайд
        }
    }
}

// Обработка клавиатуры
function initKeyboardEvents() {
    document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(e) {
    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Пробел
            e.preventDefault();
            nextSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
        case 'Escape':
            e.preventDefault();
            resetToFirstSlide();
            break;
    }
}

// Обработка колеса мыши (тачпад)
function initWheelEvents() {
    document.addEventListener('wheel', handleWheel, { passive: false });
}

function handleWheel(e) {
    if (isScrolling) return;
    
    // Проверяем горизонтальный скролл (тачпад)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 40) {
        e.preventDefault();
        isScrolling = true;
        
        if (e.deltaX > 0) {
            nextSlide(); // Скролл вправо - следующий слайд
        } else {
            prevSlide(); // Скролл влево - предыдущий слайд
        }
        
        // Сбрасываем флаг скролла через некоторое время
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}

// Обработчики для кнопок навигации (вызываются из HTML)
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

// Дебаунсинг для предотвращения множественных срабатываний
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Более быстрые дебаунсированные версии функций навигации
const debouncedNextSlide = debounce(nextSlide, 150); // Уменьшили с 300 до 150
const debouncedPrevSlide = debounce(prevSlide, 150);