// js/data.js - Управление данными проектов

let projectsData = [];

// Загрузка проектов из JSON и localStorage
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
        
        // Обновляем счетчик слайдов и перегенерируем
        updateSlidesCount();
        generateAllSlides();
        
    } catch (error) {
        console.error('Ошибка загрузки проектов:', error);
        // Используем резервные данные
        projectsData = [
            { id: 1, number: 1, title: "cafe-bot", url: "https://github.com/goddevils777/cafe-bot" },
            { id: 2, number: 2, title: "telegram-message-bot", url: "https://github.com/goddevils777/telegram-message-bot" }
        ];
        console.log('Используем резервные данные:', projectsData);
        updateSlidesCount();
        generateAllSlides();
    }
}

// Перезагрузка проектов
function reloadProjects() {
    console.log('Перезагружаем проекты...');
    loadProjectsData();
}

// Получение данных проектов
function getProjectsData() {
    return projectsData;
}

// Подсчет общего количества слайдов
function updateSlidesCount() {
    const totalSlides = 5 + projectsData.length + 1; // 5 базовых + проекты + 1 финальный
    window.totalSlides = totalSlides;
}

// Автоматическое обновление при изменениях в localStorage
window.addEventListener('storage', function(e) {
    if (e.key === 'projects') {
        console.log('Проекты обновлены в админке, перезагружаем...');
        reloadProjects();
    }
});

// Глобальные экспорты
window.loadProjectsData = loadProjectsData;
window.getProjectsData = getProjectsData;
window.reloadProjects = reloadProjects;
window.updateSlidesCount = updateSlidesCount;