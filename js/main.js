// js/main.js - Инициализация и общие функции

// Основная функция инициализации приложения
async function initApp() {
    console.log('🚀 Запуск приложения...');
    
    try {
        // 1. Загружаем данные проектов
        console.log('📊 Загружаем данные проектов...');
        await loadProjectsData();
        
        // 2. Инициализируем обработчики событий
        console.log('🎮 Инициализируем события...');
        initEventHandlers();
        
        // 3. Запускаем анимацию фона
        console.log('✨ Запускаем анимацию...');
        // Ждем загрузки всех модулей
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Инициализируем анимацию напрямую
        if (typeof window.startCodeAnimation === 'function') {
            // Настройка анимации под размер экрана
            if (typeof window.adjustAnimationForScreen === 'function') {
                window.adjustAnimationForScreen();
            }
            
            // Запуск анимации
            window.startCodeAnimation();
            console.log('✅ Анимация запущена успешно');
        } else {
            console.warn('❌ Функции анимации не найдены');
        }
        
        console.log('✅ Приложение успешно запущено!');
        
    } catch (error) {
        console.error('❌ Ошибка инициализации приложения:', error);
        // Показываем пользователю сообщение об ошибке
        showErrorMessage('Произошла ошибка при загрузке. Попробуйте обновить страницу.');
    }
}

// Показ сообщения об ошибке пользователю
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 0, 0.1);
        border: 2px solid #ff4757;
        color: #ff4757;
        padding: 20px;
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        z-index: 10000;
        max-width: 400px;
        text-align: center;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    // Удаляем через 5 секунд
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Показ индикатора загрузки
function showLoadingIndicator(show = true) {
    let loader = document.getElementById('app-loader');
    
    if (show && !loader) {
        loader = document.createElement('div');
        loader.id = 'app-loader';
        loader.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 20px;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            color: #333;
            z-index: 9999;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        `;
        loader.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="
                    width: 20px;
                    height: 20px;
                    border: 2px solid #4285f4;
                    border-top: 2px solid transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <span>Загрузка...</span>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(loader);
    } else if (!show && loader) {
        loader.remove();
    }
}

// Обработка ошибок на уровне приложения
function setupGlobalErrorHandling() {
    // Обработка JS ошибок
    window.addEventListener('error', (event) => {
        console.error('Глобальная ошибка:', event.error);
        showErrorMessage('Произошла ошибка. Попробуйте обновить страницу.');
    });
    
    // Обработка ошибок Promise
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Необработанная ошибка Promise:', event.reason);
        showErrorMessage('Произошла ошибка загрузки данных.');
    });
}

// Утилитарные функции
const utils = {
    // Дебаунсинг функций
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Проверка мобильного устройства
    isMobile() {
        return window.innerWidth <= 768;
    },
    
    // Проверка планшета
    isTablet() {
        return window.innerWidth <= 1024 && window.innerWidth > 768;
    },
    
    // Получение информации о браузере
    getBrowserInfo() {
        const userAgent = navigator.userAgent;
        return {
            isChrome: /Chrome/.test(userAgent),
            isFirefox: /Firefox/.test(userAgent),
            isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
            isEdge: /Edge/.test(userAgent)
        };
    },
    
    // Форматирование времени
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
};

// Информация о производительности
function logPerformanceInfo() {
    if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⏱️ Время загрузки страницы: ${loadTime}ms`);
    }
    
    if (performance.memory) {
        const memory = performance.memory;
        console.log(`💾 Использование памяти: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`);
    }
}

// Событие загрузки DOM
document.addEventListener('DOMContentLoaded', async () => {
    console.log('📄 DOM загружен');
    
    // Показываем индикатор загрузки
    showLoadingIndicator(true);
    
    // Настраиваем обработку ошибок
    setupGlobalErrorHandling();
    
    // Инициализируем приложение
    await initApp();
    
    // Скрываем индикатор загрузки
    showLoadingIndicator(false);
    
    // Логгируем информацию о производительности
    setTimeout(logPerformanceInfo, 1000);
});

// Событие полной загрузки страницы
window.addEventListener('load', () => {
    console.log('🎉 Страница полностью загружена');
});

// Экспорт утилит для использования в других модулях
window.utils = utils;