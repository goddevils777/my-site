// js/navigation.js - Навигация и управление переходами

let currentSlide = 0;
let totalSlides = 6;
let slides = [];

// Обновление переменных навигации
function updateNavigationVariables() {
    totalSlides = window.totalSlides || 6;
    slides = document.querySelectorAll('.slide');
}

// Мгновенное переключение слайдов
function showSlide(index) {
    if (!slides || slides.length === 0) {
        return;
    }
    
    // Убираем все классы со всех слайдов
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        
        if (i === index) {
            // Активный слайд
            slide.style.transform = 'translateX(0)';
            slide.style.opacity = '1';
            slide.classList.add('active');
        } else if (i < index) {
            // Предыдущие слайды
            slide.style.transform = 'translateX(-100%)';
            slide.style.opacity = '0';
        } else {
            // Следующие слайды
            slide.style.transform = 'translateX(100%)';
            slide.style.opacity = '0';
        }
    });
    
    updateNavigationButtons();
}


function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    saveCurrentSlide(); // Добавляем сохранение
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    saveCurrentSlide(); // Добавляем сохранение
}

function goToSlide(slideNumber) {
    if (slideNumber >= 0 && slideNumber < totalSlides) {
        currentSlide = slideNumber;
        showSlide(currentSlide);
        saveCurrentSlide(); // Добавляем сохранение
    }
}

// Обновление состояния кнопок навигации
function updateNavigationButtons() {
    const prevContainer = document.querySelector('.prev-container');
    const nextContainer = document.querySelector('.next-container');
    
    if (!prevContainer || !nextContainer) {
        return;
    }
    
    // Показываем кнопку "Назад" только если не первый слайд
    if (currentSlide > 0) {
        prevContainer.classList.add('show');
    } else {
        prevContainer.classList.remove('show');
    }
    
    // Делаем кнопку "Вперед" полупрозрачной на последнем слайде
    if (currentSlide >= totalSlides - 1) {
        nextContainer.style.opacity = '0.5';
    } else {
        nextContainer.style.opacity = '1';
    }
}

// Получение информации о текущем слайде
function getCurrentSlideInfo() {
    return {
        current: currentSlide,
        total: totalSlides,
        isFirst: currentSlide === 0,
        isLast: currentSlide === totalSlides - 1,
        progress: ((currentSlide + 1) / totalSlides * 100).toFixed(1) + '%'
    };
}

// Сброс навигации к первому слайду
function resetToFirstSlide() {
    currentSlide = 0;
    showSlide(0);
}

// Сохранение текущего слайда
function saveCurrentSlide() {
    localStorage.setItem('currentSlide', currentSlide.toString());
}

// Загрузка сохраненного слайда
function loadSavedSlide() {
    const saved = localStorage.getItem('currentSlide');
    if (saved !== null) {
        const slideNumber = parseInt(saved);
        if (slideNumber >= 0 && slideNumber < totalSlides) {
            console.log('Загружаем сохраненный слайд:', slideNumber);
            currentSlide = slideNumber;
            return slideNumber;
        }
    }
    console.log('Сохраненный слайд не найден, используем первый');
    currentSlide = 0;
    return 0;
}



// Показ конкретного слайда с сохранением
function showSlide(index) {
    if (!slides || slides.length === 0) {
        return;
    }
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        
        if (i === index) {
            slide.style.transform = 'translateX(0)';
            slide.style.opacity = '1';
            slide.classList.add('active');
        } else if (i < index) {
            slide.style.transform = 'translateX(-100%)';
            slide.style.opacity = '0';
        } else {
            slide.style.transform = 'translateX(100%)';
            slide.style.opacity = '0';
        }
    });
    
    updateNavigationButtons();
}

// Инициализация навигации с загрузкой сохраненного слайда
function initNavigation() {
    updateNavigationVariables();
    
    // Загружаем сохраненный слайд
    const savedSlide = loadSavedSlide();
    
    console.log('Инициализация навигации - слайд:', savedSlide);
    showSlide(savedSlide);
}

// Экспортируем новую функцию
window.initNavigation = initNavigation;