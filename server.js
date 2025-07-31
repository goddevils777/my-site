const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const PROJECTS_FILE = 'projects.json';

// MIME типы
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
};

// Создание сервера
const server = http.createServer((req, res) => {
    // Используем новый URL API вместо устаревшего url.parse()
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    
    // CORS заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Обработка OPTIONS запроса
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // API для проектов
    if (pathname === '/admin-api.php') {
        handleProjectsAPI(req, res);
        return;
    }
    
    // Статические файлы
    let filePath = pathname === '/' ? './index.html' : `.${pathname}`;
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Файл не найден');
                console.log(`404: ${filePath}`);
            } else {
                res.writeHead(500);
                res.end('Ошибка сервера');
                console.log(`500: ${error.message}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
            console.log(`200: ${filePath}`);
        }
    });
});

// Обработка API проектов
function handleProjectsAPI(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log(`API вызван: ${req.method}`);
    
    if (req.method === 'GET') {
        // Получение проектов
        fs.readFile(PROJECTS_FILE, 'utf8', (err, data) => {
            if (err) {
                console.log('Файл projects.json не найден, отдаем пустой массив');
                res.end('[]');
            } else {
                console.log('Отдаем проекты из файла');
                res.end(data);
            }
        });
        
    } else if (req.method === 'POST') {
        // Сохранение проектов
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const projects = JSON.parse(body);
                const jsonData = JSON.stringify(projects, null, 2);
                
                fs.writeFile(PROJECTS_FILE, jsonData, 'utf8', (err) => {
                    if (err) {
                        console.error('Ошибка записи файла:', err);
                        res.end(JSON.stringify({
                            success: false,
                            message: 'Ошибка записи файла'
                        }));
                    } else {
                        console.log('Проекты успешно сохранены в файл');
                        res.end(JSON.stringify({
                            success: true,
                            message: 'Проекты сохранены'
                        }));
                    }
                });
                
            } catch (error) {
                console.error('Ошибка парсинга JSON:', error);
                res.end(JSON.stringify({
                    success: false,
                    message: 'Ошибка парсинга JSON'
                }));
            }
        });
        
    } else {
        res.end(JSON.stringify({
            success: false,
            message: 'Метод не поддерживается'
        }));
    }
}

// Запуск сервера
server.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    console.log(`📝 Админка: http://localhost:${PORT}/admin23209302.html`);
    console.log(`🌐 Сайт: http://localhost:${PORT}/index.html`);
    console.log(`🛑 Для остановки нажмите Ctrl+C`);
});

// Обработка завершения
process.on('SIGINT', () => {
    console.log('\n👋 Сервер остановлен');
    process.exit(0);
});