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
        
        // Отключаем transition для плавного перетаскивания
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            slide.style.transition = 'none';
        });
    }
}

function handleTouchMove(e) {
    if (e.touches.length === 1 && startX && startY) {
        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;
        
        let diffX = currentX - startX;
        let diffY = Math.abs(currentY - startY);
        
        if (Math.abs(diffX) > diffY && Math.abs(diffX) > 5) {
            isSwiping = true;
            e.preventDefault();
            
            let progress = diffX / window.innerWidth;
            let translateX = progress * 100;
            
            // Эластичность - ограничиваем движение на границах
            const isFirstSlide = currentSlide === 0;
            const isLastSlide = currentSlide === totalSlides - 1;
            
            if (isFirstSlide && diffX > 0) {
                // На первом слайде свайп вправо - эластичность
                translateX = Math.min(25, translateX * 0.3);
            } else if (isLastSlide && diffX < 0) {
                // На последнем слайде свайп влево - эластичность  
                translateX = Math.max(-25, translateX * 0.3);
            } else {
                // Обычное движение - ограничиваем до 100%
                translateX = Math.max(-100, Math.min(100, translateX));
            }
            
            const slides = document.querySelectorAll('.slide');
            
            // Двигаем текущий слайд
            if (slides[currentSlide]) {
                slides[currentSlide].style.transform = `translateX(${translateX}%)`;
            }
            
            // Показываем соседние слайды только если переход возможен
            if (diffX > 0 && !isFirstSlide && slides[currentSlide - 1]) {
                slides[currentSlide - 1].style.transform = `translateX(${translateX - 100}%)`;
                slides[currentSlide - 1].style.opacity = '1';
            }
            
            if (diffX < 0 && !isLastSlide && slides[currentSlide + 1]) {
                slides[currentSlide + 1].style.transform = `translateX(${translateX + 100}%)`;
                slides[currentSlide + 1].style.opacity = '1';
            }
        }
    }
}

function handleTouchEnd(e) {
    if (!startX || !startY || !isSwiping) return;
    
    let endX = e.changedTouches[0].clientX;
    let diffX = endX - startX;
    let threshold = window.innerWidth * 0.4; // Увеличили порог до 40%
    
    // Включаем transition обратно для плавного завершения
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    });
    
    // Переключаем слайд только если прошли больше 40% экрана
    if (Math.abs(diffX) > threshold) {
        if (diffX > 0 && currentSlide > 0) {
            prevSlide();
        } else if (diffX < 0 && currentSlide < totalSlides - 1) {
            nextSlide();
        } else {
            // Возвращаем на место если на границе
            showSlide(currentSlide);
        }
    } else {
        // Возвращаем слайд на исходную позицию
        showSlide(currentSlide);
    }
    
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
    // Проверяем, не кликнули ли в области кодового редактора
    const codeEditor = e.target.closest('.code-editor');
    if (codeEditor) {
        return; // Если клик в редакторе - не запоминаем позицию
    }
    
    mouseStartX = e.clientX;
}

function handleMouseUp(e) {
    // Проверяем, не происходит ли выделение текста в редакторе
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
        return; // Если есть выделенный текст - не переключаем слайды
    }
    
    // Проверяем, не кликнули ли в области кодового редактора
    const codeEditor = e.target.closest('.code-editor');
    if (codeEditor) {
        return; // Если клик в редакторе - не переключаем слайды
    }
    
    let mouseEndX = e.clientX;
    let diffX = mouseStartX - mouseEndX;
    
    if (Math.abs(diffX) > 50) {
        if (diffX > 50) {
            nextSlide();
        } else if (diffX < -50) {
            prevSlide();
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

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;