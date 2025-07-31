// js/navigation.js - Навигация и управление переходами

let currentSlide = 0;
let totalSlides = 6;
let slides = [];

// Обновление переменных навигации
function updateNavigationVariables() {
    totalSlides = window.totalSlides || 6;
    slides = document.querySelectorAll('.slide');
}

// Показ конкретного слайда
function showSlide(index) {
    if (!slides || slides.length === 0) {
        console.log('Слайды еще не загружены');
        return;
    }
    
    // Мгновенно убираем активные классы со всех слайдов
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    
    // Мгновенно добавляем активный класс текущему слайду
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Мгновенно добавляем класс prev предыдущему слайду
    if (index > 0 && slides[index - 1]) {
        slides[index - 1].classList.add('prev');
    }
    
    // Мгновенно обновляем состояние кнопок навигации
    updateNavigationButtons();
}

// Переход к следующему слайду - убираем любые задержки
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide); // Мгновенный вызов без setTimeout
}

// Переход к предыдущему слайду - убираем любые задержки  
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide); // Мгновенный вызов без setTimeout
}

// Переход к конкретному слайду по номеру
function goToSlide(slideNumber) {
    if (slideNumber >= 0 && slideNumber < totalSlides) {
        currentSlide = slideNumber;
        showSlide(currentSlide);
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