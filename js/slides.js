// js/slides.js - Генерация и управление слайдами

// Генерация базовых слайдов (1-5)
function generateBaseSlides() {
    return [
        // Слайд 1 - HELLO
        `<div class="slide active" id="slide1">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="hello-text">&lt;/ HELLO code&gt;</h1>
            </div>
        </div>`,
        
        // Слайд 2 - РЕАЛИЗУЮ
        `<div class="slide" id="slide2">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="big-text">РЕАЛИЗУЮ ЛЮБУЮ&nbsp;ВАШУ ИДЕЮ&nbsp;В&nbsp;КОДЕ</h1>
            </div>
        </div>`,
        
        // Слайд 3 - СОЗДАЮ
        `<div class="slide" id="slide3">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="big-text">СОЗДАЮ&nbsp;МНОГО ФУНКЦИОНАЛЬНЫЕ WEB&#8209;СЕРВИСЫ</h1>
            </div>
        </div>`,
        
        // Слайд 4 - ИНСТРУМЕНТЫ
        `<div class="slide" id="slide4">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main skills-main">
                <div class="skills-content-wrapper">
                    <h1 class="skills-title">БАЗОВЫЕ ИНСТРУМЕНТЫ</h1>
                    <div class="skills-grid">
                        <div class="skill-column">
                            <h3>Backend:</h3>
                            <p>Python<br>Flask<br>Node.js<br>Express.js<br>Telegram API<br>Session Management<br>ngrok</p>
                        </div>
                        <div class="skill-column">
                            <h3>Frontend:</h3>
                            <p>HTML5<br>CSS3<br>Vanilla JavaScript<br>Fetch API</p>
                            <h3>Базы данных:</h3>
                            <p>SQLite<br>LocalStorage<br>File Storage</p>
                        </div>
                        <div class="skill-column">
                            <h3>Деплой:</h3>
                            <p>ngrok<br>Local Development<br>File System<br>Любой другой сервер</p>
                            <h3>API:</h3>
                            <p>Telegram API<br>Любое другое API</p>
                        </div>
                        <div class="skill-column">
                            <h3>Библиотеки:</h3>
                            <p>requests<br>sqlite3<br>telegram (gramJS)<br>@google/generative-ai<br>node-telegram-bot-api<br>input<br>hashlib<br>hmac<br>time<br>urllib<br>datetime<br>re<br>os<br>sys</p>
                        </div>
                        <div class="skill-column">
                            <h3>Форматы:</h3>
                            <p>UTF-8<br>ISO<br>JSON<br>StringSession</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        
        // Слайд 5 - МОИ ПРОЕКТЫ
        `<div class="slide" id="slide5">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="big-text">МОИ&nbsp;ПРОЕКТЫ СКАЖУТ&nbsp;САМИ ЗА&nbsp;МЕНЯ</h1>
            </div>
        </div>`
    ];
}

// Генерация слайдов проектов
function generateProjectSlides() {
    const projects = getProjectsData();
    return projects.map((project, index) => {
        const slideNumber = 6 + index;
        return `
            <div class="slide" id="slide${slideNumber}">
                <div class="header">
                    <span class="emoji">😇</span>
                    <span class="text">God & Devils</span>
                    <span class="emoji">😈</span>
                </div>
                <div class="main project-content">
                    <div class="project-number">#${project.number}</div>
                    <div class="project-info">
                        <p class="project-description">Все подробности и код здесь:</p>
                        <a href="${project.url}" class="project-link" target="_blank">
                            ${project.url}
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

// Генерация финального слайда
function generateFinalSlide() {
    const projects = getProjectsData();
    const finalSlideNumber = 6 + projects.length;
    return `
        <div class="slide" id="slide${finalSlideNumber}">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="hello-text">&lt;GOODBYE /&gt;</h1>
            </div>
        </div>
    `;
}

// Основная функция генерации всех слайдов
function generateAllSlides() {
    console.log('=== ГЕНЕРАЦИЯ ВСЕХ СЛАЙДОВ ===');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (!sliderContainer) {
        console.error('Контейнер слайдов не найден!');
        return;
    }
    
    // Очищаем контейнер
    sliderContainer.innerHTML = '';
    console.log('Контейнер очищен');
    
    // Собираем все слайды
    const allSlides = [
        ...generateBaseSlides(),
        ...generateProjectSlides(),
        generateFinalSlide()
    ];
    
    // Добавляем все слайды в DOM
    allSlides.forEach(slideHTML => {
        sliderContainer.innerHTML += slideHTML;
    });
    
    // Обновляем переменные навигации
    updateNavigationVariables();
    
    console.log('=== РЕЗУЛЬТАТ ===');
    console.log('Всего слайдов:', window.totalSlides);
    console.log('DOM элементов:', document.querySelectorAll('.slide').length);
    
    // Показываем первый слайд
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlide(0);
    }
}

// Глобальные экспорты
window.generateAllSlides = generateAllSlides;
window.generateBaseSlides = generateBaseSlides;
window.generateProjectSlides = generateProjectSlides;
window.generateFinalSlide = generateFinalSlide;