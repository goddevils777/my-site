// Загрузка проектов из JSON и localStorage
let projectsData = [];

async function loadProjectsData() {
    console.log('Начинаем загрузку проектов...');
    try {
        // Загружаем из JSON файла
        const response = await fetch('projects.json?t=' + Date.now());
        if (response.ok) {
            projectsData = await response.json();
            console.log('Проекты загружены из JSON:', projectsData);
        } else {
            throw new Error('Файлы недоступны');
        }
        
        // Проверяем localStorage как резерв
        if (!projectsData || projectsData.length === 0) {
            const savedProjects = localStorage.getItem('projects');
            if (savedProjects) {
                projectsData = JSON.parse(savedProjects);
                console.log('Проекты загружены из localStorage:', projectsData);
            }
        }
        
        // Убеждаемся что проекты валидны
        projectsData = projectsData.filter(project => 
            project && project.id && project.number && project.title && project.url
        );
        
        updateSlidesCount();
        generateProjectSlides();
        
    } catch (error) {
        console.error('Ошибка загрузки проектов:', error);
        // Используем резервные данные
        projectsData = [
            { id: 1, number: 1, title: "cafe-bot", url: "https://github.com/goddevils777/cafe-bot" },
            { id: 2, number: 2, title: "telegram-message-bot", url: "https://github.com/goddevils777/telegram-message-bot" }
        ];
        console.log('Используем резервные данные:', projectsData);
        updateSlidesCount();
        generateProjectSlides();
    }
}

function reloadProjects() {
    console.log('Перезагружаем проекты...');
    loadProjectsData();
}

window.addEventListener('storage', function(e) {
    if (e.key === 'projects') {
        console.log('Проекты обновлены в админке, перезагружаем...');
        reloadProjects();
    }
});

function updateSlidesCount() {
    const totalSlides = 5 + projectsData.length + 1;
    window.totalSlides = totalSlides;
}

function generateProjectSlides() {
    console.log('=== ПОЛНАЯ ПЕРЕСТРОЙКА СЛАЙДОВ ===');
    const sliderContainer = document.querySelector('.slider-container');
    
    if (!sliderContainer) {
        console.error('Контейнер слайдов не найден!');
        return;
    }
    
    sliderContainer.innerHTML = '';
    console.log('Контейнер очищен');
    
    const baseSlides = [
        `<div class="slide active" id="slide1">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="hello-text">&lt;HELLO /&gt;</h1>
            </div>
        </div>`,
        
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
    
    baseSlides.forEach(slideHTML => {
        sliderContainer.innerHTML += slideHTML;
    });
    console.log('Базовые слайды добавлены: 5');
    
    projectsData.forEach((project, index) => {
        const slideNumber = 6 + index;
        const projectSlideHTML = `
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
        sliderContainer.innerHTML += projectSlideHTML;
        console.log(`Проект ${project.title} добавлен как слайд ${slideNumber}`);
    });
    
    const finalSlideNumber = 6 + projectsData.length;
    const finalSlideHTML = `
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
    sliderContainer.innerHTML += finalSlideHTML;
    console.log(`Финальный слайд добавлен как слайд ${finalSlideNumber}`);
    
    totalSlides = 5 + projectsData.length + 1;
    slides = document.querySelectorAll('.slide');
    
    console.log('=== РЕЗУЛЬТАТ ===');
    console.log('Всего слайдов:', totalSlides);
    console.log('DOM элементов:', slides.length);
    
    if (slides.length > 0) {
        showSlide(0);
    }
}

let currentSlide = 0;
let totalSlides = 6;
let slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (!slides || slides.length === 0) {
        console.log('Слайды еще не загружены');
        return;
    }
    
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    if (index > 0 && slides[index - 1]) {
        slides[index - 1].classList.add('prev');
    }
    
    updateNavigationButtons();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function updateNavigationButtons() {
    const prevContainer = document.querySelector('.prev-container');
    const nextContainer = document.querySelector('.next-container');
    
    if (!prevContainer || !nextContainer) {
        console.log('Кнопки навигации не найдены');
        return;
    }
    
    if (currentSlide > 0) {
        prevContainer.classList.add('show');
    } else {
        prevContainer.classList.remove('show');
    }
    
    if (currentSlide >= totalSlides - 1) {
        nextContainer.style.opacity = '0.5';
    } else {
        nextContainer.style.opacity = '1';
    }
}

// Обработка событий касания
let startX = 0;
let startY = 0;
let isSwiping = false;

document.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = false;
    }
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1 && startX && startY) {
        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;
        
        let diffX = Math.abs(startX - currentX);
        let diffY = Math.abs(startY - currentY);
        
        if (diffX > diffY && diffX > 30) {
            isSwiping = true;
            e.preventDefault();
        }
    }
}, { passive: false });

document.addEventListener('touchend', function(e) {
    if (!startX || !startY || !isSwiping) return;
    
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;
    
    if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    
    startX = 0;
    startY = 0;
    isSwiping = false;
}, { passive: true });

// Обработка колеса мыши
let isScrolling = false;
let scrollTimeout;

document.addEventListener('wheel', function(e) {
    if (isScrolling) return;
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 40) {
        e.preventDefault();
        isScrolling = true;
        
        if (e.deltaX > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}, { passive: false });

// Обработка мыши
let mouseStartX = 0;

document.addEventListener('mousedown', function(e) {
    mouseStartX = e.clientX;
});

document.addEventListener('mouseup', function(e) {
    let mouseEndX = e.clientX;
    let diffX = mouseStartX - mouseEndX;
    
    if (diffX > 50) {
        nextSlide();
    } else if (diffX < -50) {
        prevSlide();
    }
});

// Анимированный фон с элементами кода
const codeElementsArray = [
    "</>", "<div>", "</div>", "<script>", "</script>", "@app", ".JSON", 
    "const", "let", "var", "function", "return", "if", "else", "try", "catch",
    "{}", "[]", "()", "=>", "&&", "||", "==", "!=", "++", "--",
    "async", "await", "fetch", "API", "JSON", "HTML", "CSS", "JS",
    "import", "export", "class", "extends", "super", "this", "new",
    "for", "while", "switch", "case", "break", "continue",
    "true", "false", "null", "undefined", "NaN", "Infinity"
];

const emojisArray = ["😇", "😈", "💻", "⚡", "🔥", "✨", "🚀", "💯", "🎯", "🌟"];

function createCodeElement() {
    const background = document.getElementById("codeBackground");
    if (!background) {
        return;
    }
    
    const element = document.createElement("div");
    element.className = "code-element";
    
    const isEmoji = Math.random() < 0.3;
    
    if (isEmoji) {
        element.textContent = emojisArray[Math.floor(Math.random() * emojisArray.length)];
        element.classList.add("emoji");
    } else {
        element.textContent = codeElementsArray[Math.floor(Math.random() * codeElementsArray.length)];
        
        const sizes = ["small", "medium", "large"];
        element.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
    }
    
    const bounceAnimations = ["bounce-left", "bounce-right", "bounce-center"];
    const randomBounce = bounceAnimations[Math.floor(Math.random() * bounceAnimations.length)];
    
    element.style.left = Math.random() * 90 + 5 + "%";
    element.style.animationDelay = Math.random() * 3 + "s";
    element.style.animationDuration = 6 + Math.random() * 6 + "s";
    
    background.appendChild(element);
    
    requestAnimationFrame(function() {
        element.classList.add("animate", randomBounce);
    });
    
    setTimeout(function() {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, (parseFloat(element.style.animationDelay) + parseFloat(element.style.animationDuration) + 2) * 1000);
}

function startCodeAnimation() {
    setTimeout(function() {
        // Создаем элементы с большими случайными интервалами
        for (let i = 0; i < 3; i++) {
            setTimeout(createCodeElement, i * (1000 + Math.random() * 1000));
        }
        
        // Продолжаем создавать элементы с случайными интервалами
        function createWithRandomInterval() {
            createCodeElement();
            const nextInterval = 1500 + Math.random() * 2000;
            setTimeout(createWithRandomInterval, nextInterval);
        }
        
        setTimeout(createWithRandomInterval, 3000);
        
    }, 500);
}

// Загружаем проекты при загрузке страницы
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Страница загружена, загружаем проекты...');
    await loadProjectsData();
    console.log('Проекты загружены:', projectsData);
    
    console.log("DOM загружен, запускаем анимацию...");
    startCodeAnimation();
});

// Также пробуем загрузить сразу
loadProjectsData();
startCodeAnimation();