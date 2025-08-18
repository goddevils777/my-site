// js/animation.js - Анимированный фон с элементами кода

// Массивы элементов для анимации
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

// Переменные для управления анимацией
let animationRunning = false;
let animationIntervals = [];

// Создание одного элемента анимации
function createCodeElement() {
    const background = document.getElementById("codeBackground");
    if (!background) {
        console.warn('Фон для анимации не найден');
        return;
    }

    const element = document.createElement("div");
    element.className = "code-element";

    // Случайный выбор между кодом и эмодзи
    const isEmoji = Math.random() < 0.3;

    if (isEmoji) {
        element.textContent = getRandomEmoji();
        element.classList.add("emoji");
    } else {
        element.textContent = getRandomCodeElement();
        element.classList.add(getRandomSize());
    }

    // Применяем случайную анимацию
    applyRandomAnimation(element);

    // Устанавливаем случайную позицию
    setRandomPosition(element);

    // Добавляем в DOM
    background.appendChild(element);

    // Запускаем анимацию
    requestAnimationFrame(() => {
        element.classList.add("animate", getRandomBounceAnimation());
    });

    // Удаляем элемент после завершения анимации
    scheduleElementRemoval(element);
}

// Получение случайного элемента кода
function getRandomCodeElement() {
    return codeElementsArray[Math.floor(Math.random() * codeElementsArray.length)];
}

// Получение случайного эмодзи
function getRandomEmoji() {
    return emojisArray[Math.floor(Math.random() * emojisArray.length)];
}

// Получение случайного размера
function getRandomSize() {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

// Получение случайной анимации отскока
function getRandomBounceAnimation() {
    const bounceAnimations = ["bounce-left", "bounce-right", "bounce-center"];
    return bounceAnimations[Math.floor(Math.random() * bounceAnimations.length)];
}

// Применение случайных параметров анимации
function applyRandomAnimation(element) {
    // Случайные задержка и длительность
    const delay = Math.random() * 3; // 0-3 секунды
    const duration = 6 + Math.random() * 6; // 6-12 секунд

    element.style.animationDelay = delay + "s";
    element.style.animationDuration = duration + "s";

    return { delay, duration };
}

// Установка случайной позиции
function setRandomPosition(element) {
    // Позиция по X от 5% до 95% ширины экрана
    const leftPosition = Math.random() * 90 + 5;
    element.style.left = leftPosition + "%";
}

// Планирование удаления элемента
function scheduleElementRemoval(element) {
    const delay = parseFloat(element.style.animationDelay) || 0;
    const duration = parseFloat(element.style.animationDuration) || 6;
    const totalTime = (delay + duration + 2) * 1000; // +2 секунды запас

    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, totalTime);
}

// Создание элементов с случайными интервалами
function createElementsWithRandomInterval() {
    if (!animationRunning) return;

    createCodeElement();

    // Следующий элемент через случайный интервал
    const nextInterval = 1500 + Math.random() * 2000; // 1.5-3.5 секунд
    setTimeout(createElementsWithRandomInterval, nextInterval);
}

// Запуск анимации фона
function startCodeAnimation() {
    if (animationRunning) {
        console.log('Анимация уже запущена');
        return;
    }

    console.log("Запуск анимации фона...");
    animationRunning = true;

    // Создаем несколько элементов сразу с разными задержками
    for (let i = 0; i < 3; i++) {
        setTimeout(createCodeElement, i * (1000 + Math.random() * 1000));
    }

    // Запускаем непрерывное создание элементов
    setTimeout(createElementsWithRandomInterval, 3000);
}

// Остановка анимации фона
function stopCodeAnimation() {
    console.log("Остановка анимации фона...");
    animationRunning = false;

    // Очищаем все интервалы
    animationIntervals.forEach(interval => clearInterval(interval));
    animationIntervals = [];

    // Удаляем все существующие элементы анимации
    const background = document.getElementById("codeBackground");
    if (background) {
        const elements = background.querySelectorAll('.code-element');
        elements.forEach(element => element.remove());
    }
}

// Перезапуск анимации
function restartCodeAnimation() {
    stopCodeAnimation();
    setTimeout(startCodeAnimation, 500);
}

// Проверка состояния анимации
function isAnimationRunning() {
    return animationRunning;
}

// Управление интенсивностью анимации
function setAnimationIntensity(level) {
    // level: 'low', 'medium', 'high'
    const settings = {
        low: { elements: 1, interval: [3000, 5000] },
        medium: { elements: 3, interval: [1500, 3500] },
        high: { elements: 5, interval: [800, 2000] }
    };

    const config = settings[level] || settings.medium;

    // Перезапускаем с новыми настройками
    stopCodeAnimation();

    setTimeout(() => {
        animationRunning = true;

        for (let i = 0; i < config.elements; i++) {
            setTimeout(createCodeElement, i * 500);
        }

        setTimeout(createElementsWithRandomInterval, 2000);
    }, 500);
}

// Инициализация анимации
function initAnimation() {
    console.log('🎬 Инициализация анимации...');

    // Создаем контейнер для анимации если его нет
    let background = document.getElementById("codeBackground");
    if (!background) {
        background = document.createElement("div");
        background.id = "codeBackground";
        background.className = "code-background";
        document.body.insertBefore(background, document.body.firstChild);
    }

    return true;
}

// Настройка анимации под размер экрана
function adjustAnimationForScreen() {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        setAnimationIntensity('low');
    } else {
        setAnimationIntensity('medium');
    }
}

// Уничтожение анимации
function destroyAnimation() {
    stopCodeAnimation();

    const background = document.getElementById("codeBackground");
    if (background) {
        background.innerHTML = '';
    }
}

// Анимация тряски Telegram кнопки каждые 7 секунд
function initTelegramShake() {
    const telegramBtn = document.querySelector('.telegram-contact');
    if (!telegramBtn) return;

    setInterval(() => {
        telegramBtn.classList.add('shake-active');
        setTimeout(() => {
            telegramBtn.classList.remove('shake-active');
        }, 500);
    }, 7000);
}



console.log('🔧 animation.js загружен, экспортируем функции...');
window.initAnimation = initAnimation;
window.startCodeAnimation = startCodeAnimation;
window.stopCodeAnimation = stopCodeAnimation;
window.restartCodeAnimation = restartCodeAnimation;
window.setAnimationIntensity = setAnimationIntensity;
window.adjustAnimationForScreen = adjustAnimationForScreen;
window.destroyAnimation = destroyAnimation;
window.initTelegramShake = initTelegramShake;