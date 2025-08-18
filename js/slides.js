// js/slides.js - Генерация и управление слайдами


function getContactHTML() {
    return `
        <div class="contact-info">
            <a href="https://t.me/god_devils_666_777" target="_blank" class="telegram-contact">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                @god_devils_666_777
            </a>
        </div>
    `;
}

function generateBaseSlides() {
    const contactHTML = getContactHTML();
    
    return [
        // Слайд 1 - HELLO
        `<div class="slide active" id="slide1">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="hello-text">&lt;/ HELLO &gt;</h1>
            </div>
            ${contactHTML}
        </div>`,
        
        // Слайд 2 - РЕАЛИЗУЮ
        `<div class="slide" id="slide2">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="big-text">РЕАЛИЗУЮ ЛЮБУЮ&nbsp;ВАШУ ИДЕЮ&nbsp;В&nbsp;КОДЕ <span class="animated-arrows"></span></h1>
            </div>
            ${contactHTML}
        </div>`,
        
        // Слайд 3 - СОЗДАЮ
        `<div class="slide" id="slide3">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="big-text">СОЗДАЮ&nbsp;МНОГО ФУНКЦИОНАЛЬНЫЕ WEB&#8209;СЕРВИСЫ <span class="animated-arrows"></span></h1>
            </div>
            ${contactHTML}
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
        <h3>Backend Languages:</h3>
        <p>Python<br>JavaScript/Node.js<br>PHP<br>Java<br>C#<br>Go<br>Rust<br>Ruby<br>Scala<br>Kotlin<br>Swift</p>
        <h3>Frameworks:</h3>
        <p>Flask<br>FastAPI<br>Django<br>Express.js<br>NestJS<br>Laravel<br>CodeIgniter<br>Spring Boot<br>.NET Core<br>Ruby on Rails</p>
    </div>
    <div class="skill-column">
        <h3>Frontend Tech:</h3>
        <p>HTML5<br>CSS3<br>JavaScript ES6+<br>TypeScript<br>React<br>Vue.js<br>Angular<br>Svelte<br>Next.js<br>Nuxt.js<br>Gatsby</p>
        <h3>CSS Frameworks:</h3>
        <p>Bootstrap<br>Tailwind CSS<br>Bulma<br>Foundation<br>Materialize<br>Semantic UI<br>SASS/SCSS<br>LESS<br>Styled Components</p>
    </div>
    <div class="skill-column">
        <h3>Databases:</h3>
        <p>MySQL<br>PostgreSQL<br>MongoDB<br>Redis<br>SQLite<br>Oracle<br>SQL Server<br>MariaDB<br>CouchDB<br>Neo4j<br>Elasticsearch</p>
        <h3>Mobile & Desktop:</h3>
        <p>React Native<br>Flutter<br>Ionic<br>Electron<br>Tauri<br>Xamarin<br>Cordova<br>PWA</p>
    </div>
    <div class="skill-column">
        <h3>Cloud & DevOps:</h3>
        <p>AWS<br>Google Cloud<br>Azure<br>DigitalOcean<br>Linode<br>Vultr<br>Docker<br>Kubernetes<br>Nginx<br>Apache<br>Caddy</p>
        <h3>Deployment:</h3>
        <p>Heroku<br>Railway<br>Vercel<br>Netlify<br>GitHub Pages<br>GitLab CI/CD<br>Jenkins<br>CircleCI</p>
    </div>
    <div class="skill-column">
        <h3>APIs & Integration:</h3>
        <p>REST API<br>GraphQL<br>WebSocket<br>gRPC<br>Telegram Bot API<br>Discord API<br>Twitter API<br>Instagram API<br>TikTok API<br>YouTube API<br>Spotify API</p>
        <h3>Payment Systems:</h3>
        <p>Stripe<br>PayPal<br>Square<br>Skrill</p>
    </div>
    <div class="skill-column">
        <h3>AI & Machine Learning:</h3>
        <p>OpenAI GPT<br>Google Gemini<br>Claude AI<br>TensorFlow<br>PyTorch<br>Scikit-learn<br>Pandas<br>NumPy<br>OpenCV<br>NLTK<br>spaCy</p>
        <h3>Blockchain:</h3>
        <p>Ethereum<br>Solidity<br>Web3.js<br>Smart Contracts<br>NFT Development<br>DeFi Protocols</p>
    </div>
    <div class="skill-column">
        <h3>Tools & Software:</h3>
        <p>Git<br>GitHub<br>GitLab<br>Bitbucket<br>VS Code<br>WebStorm<br>PyCharm<br>Postman<br>Insomnia<br>Figma<br>Photoshop</p>
        <h3>Testing:</h3>
        <p>Jest<br>Mocha<br>Cypress<br>Selenium<br>Pytest<br>PHPUnit<br>JUnit<br>Postman Tests</p>
    </div>
    <div class="skill-column">
        <h3>Game Development:</h3>
        <p>Unity<br>Unreal Engine<br>Godot<br>Phaser.js<br>Three.js<br>Babylon.js<br>C++<br>C#<br>Lua<br>GDScript</p>
        <h3>IoT & Hardware:</h3>
        <p>Arduino<br>Raspberry Pi<br>ESP32<br>MQTT<br>LoRaWAN<br>Sensors Integration</p>
    </div>
</div>
                </div>
            </div>
            ${contactHTML}
        </div>`,
        
        // Слайд 5 - МОИ ПРОЕКТЫ
        `<div class="slide" id="slide5">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="big-text">ЭТИ&nbsp;ПРОЕКТЫ СКАЖУТ&nbsp;САМИ ЗА&nbsp;МЕНЯ <span class="animated-arrows"></span></h1>
            </div>
            ${contactHTML}
        </div>`
    ];
}
function generateProjectSlides() {
    const projects = getProjectsData();
    const contactHTML = getContactHTML();
    
    return projects.map((project, index) => {
        const slideNumber = 6 + index;
        
        // Разбиваем README на строки для нумерации
        const readmeText = project.readme || `# ${project.title}\n\n🔗 **GitHub**: [${project.url}](${project.url})\n📝 Полное описание в репозитории`;
        const lines = readmeText.split('\n');
        
        // Генерируем номера строк
        const lineNumbers = lines.map((_, i) => `<span>${i + 1}</span>`).join('');
        
        // Генерируем текст с подсветкой синтаксиса
        const codeLines = lines.map(line => {
            if (line.startsWith('#')) {
                return `<div class="markdown-header">${line}</div>`;
            } else if (line.includes('**') && line.includes('**')) {
                return `<div class="markdown-bold">${line}</div>`;
            } else if (line.includes('[') && line.includes('](')) {
                return `<div class="markdown-link">${line}</div>`;
            } else {
                return `<div>${line || ' '}</div>`;
            }
        }).join('');
        
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
                        <p class="project-description">Все подробности здесь:</p>
                        <div class="code-editor">
                            <div class="code-editor-header">
                                <div class="editor-tabs">
                                    <span class="tab active">README.md</span>
                                </div>
                                <div class="editor-controls">
                                    <span class="control red"></span>
                                    <span class="control yellow"></span>
                                    <span class="control green"></span>
                                </div>
                            </div>
                            <div class="code-editor-content">
                                <div class="line-numbers">${lineNumbers}</div>
                                <div class="code-text">${codeLines}</div>
                            </div>
                        </div>
                    </div>
                </div>
                ${contactHTML}
            </div>
        `;
    });
}
function generateFinalSlide() {
    const projects = getProjectsData();
    const finalSlideNumber = 6 + projects.length;
    const contactHTML = getContactHTML();
    
    return `
        <div class="slide" id="slide${finalSlideNumber}">
            <div class="header">
                <span class="emoji">😇</span>
                <span class="text">God & Devils</span>
                <span class="emoji">😈</span>
            </div>
            <div class="main">
                <h1 class="hello-text">&lt;/ GOODBYE&gt;</h1>
            </div>
            ${contactHTML}
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