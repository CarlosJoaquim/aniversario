// Configurações globais
const config = {
    currentPage: 'home',
    loadingDelay: 300
};

// Elementos DOM
const DOM = {
    header: document.getElementById('dynamic-header'),
    main: document.getElementById('main-content'),
    footer: document.getElementById('dynamic-footer'),
    backToTop: document.getElementById('back-to-top'),
    modal: {
        container: document.getElementById('generic-modal'),
        content: document.getElementById('modal-body'),
        closeBtn: document.querySelector('.close-modal')
    }
};

// Inicialização do site
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initModal();
    setupBackToTop();
    setupNavigation();
    loadPage('home');
    
    // Configura o ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Função para carregar páginas
function loadPage(pageName) {
    showLoading();
    config.currentPage = pageName;
    document.body.className = `${pageName}-page`;
    updateActiveNav(pageName);

    setTimeout(function() {
        const contentFile = `includes/${pageName}-content.html`;
        
        fetch(contentFile)
            .then(response => {
                if (!response.ok) throw new Error('Página não encontrada');
                return response.text();
            })
            .then(html => {
                DOM.main.innerHTML = html;
                setupPageSpecificFeatures(pageName);
                hideLoading();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error(error);
                showError(`Não foi possível carregar a página ${pageName}. Por favor, tente novamente.`);
            });
    }, config.loadingDelay);
}

// Funções auxiliares
function showLoading() {
    DOM.main.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Carregando presente de aniversário...</p>
        </div>
    `;
}

function hideLoading() {
    // O conteúdo será substituído pelo componente carregado
}

function showError(message) {
    DOM.main.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <h2>Ops! Algo deu errado</h2>
            <p>${message}</p>
            <button class="btn-retry" onclick="location.reload()">Tentar novamente</button>
        </div>
    `;
}

function updateActiveNav(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });
}

function setupNavigation() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            const page = e.target.dataset.page;
            loadPage(page);
        }
    });
}

function setupBackToTop() {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            DOM.backToTop.style.display = 'block';
        } else {
            DOM.backToTop.style.display = 'none';
        }
    });
    
    DOM.backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function loadHeader() {
    fetch('includes/header.html')
        .then(response => response.text())
        .then(html => {
            DOM.header.innerHTML = html;
            setupMobileMenu();
        })
        .catch(error => {
            console.error('Erro ao carregar o header:', error);
            DOM.header.innerHTML = `
                <div class="header-container">
                    <h1 class="logo">Lúcia <span>Mendes</span></h1>
                    <nav class="main-nav">
                        <ul>
                            <li><a href="#" class="nav-link active" data-page="home">Home</a></li>
                            <li><a href="#" class="nav-link" data-page="timeline">Nossa História</a></li>
                            <li><a href="#" class="nav-link" data-page="gallery">Galeria</a></li>
                            <li><a href="#" class="nav-link" data-page="messages">Mensagens</a></li>
                        </ul>
                    </nav>
                    <button class="menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            `;
            setupMobileMenu();
        });
}

function loadFooter() {
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(html => {
            DOM.footer.innerHTML = html;
            document.getElementById('year').textContent = new Date().getFullYear();
        })
        .catch(error => {
            console.error('Erro ao carregar o footer:', error);
            DOM.footer.innerHTML = `
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>Para Lúcia</h3>
                            <p>Este site foi feito com todo o amor do mundo para celebrar você e nosso amor.</p>
                            <div class="heart-beat">
                                <i class="fas fa-heart"></i>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Navegação</h3>
                            <ul class="footer-nav">
                                <li><a href="#" class="nav-link" data-page="home">Home</a></li>
                                <li><a href="#" class="nav-link" data-page="timeline">Nossa História</a></li>
                                <li><a href="#" class="nav-link" data-page="gallery">Galeria</a></li>
                                <li><a href="#" class="nav-link" data-page="messages">Mensagens</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Presente Especial</h3>
                            <p>Seu presente está guardado para quando nos vermos. Prepare-se para uma surpresa!</p>
                            <div class="gift-shake">
                                <i class="fas fa-gift"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; <span id="year">${new Date().getFullYear()}</span> Feito com <i class="fas fa-heart"></i> para Lúcia Mendes</p>
                    </div>
                </div>
            `;
        });
}

function initModal() {
    DOM.modal.closeBtn.addEventListener('click', function() {
        DOM.modal.container.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === DOM.modal.container) {
            DOM.modal.container.style.display = 'none';
        }
    });
}

function showModal(title, content, isHTML = false) {
    if (isHTML) {
        DOM.modal.content.innerHTML = `<h2>${title}</h2>${content}`;
    } else {
        DOM.modal.content.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    }
    
    DOM.modal.container.style.display = 'block';
}

function showImageModal(imageUrl, caption = '') {
    DOM.modal.content.innerHTML = `
        <div class="image-modal">
            <img src="${imageUrl}" alt="${caption}" loading="lazy">
            ${caption ? `<p class="image-caption">${caption}</p>` : ''}
        </div>
    `;
    
    DOM.modal.container.style.display = 'block';
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}

function setupPageSpecificFeatures(pageName) {
    switch(pageName) {
        case 'home':
            setupHomePage();
            break;
        case 'timeline':
            setupTimelinePage();
            break;
        case 'gallery':
            setupGallery();
            break;
        case 'messages':
            setupMessagesPage();
            break;
    }
}

function setupHomePage() {
    setupCountdown();
    setupHighlights();
    setupVideoPlayer();
    setupAnimations();
}

function setupTimelinePage() {
    setupTimeline();
}

function setupGallery() {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Ativa o botão clicado
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                
                // Filtra as imagens
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Configura o clique nas imagens para o modal
        document.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', function() {
                const img = card.querySelector('img');
                const caption = card.querySelector('.gallery-caption').textContent;
                showImageModal(img.src, caption);
            });
        });
    }
}

function setupMessagesPage() {
    setupMessages();
}

// Implementações das funções específicas de cada página
function setupCountdown() {
    function updateCountdown() {
        const now = new Date();
        const nextBirthday = new Date(now.getFullYear(), 7, 15); // 15 de Agosto (mês 7)
        
        if (now > nextBirthday) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        
        const diff = nextBirthday - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}

function setupHighlights() {
    const highlights = [
        {
            title: "Primeiro Encontro",
            image: "assets/images/highlight-1.jpg",
            content: `
                <p>O dia em que nossas vidas começaram a se entrelaçar foi mágico. Lembro de cada detalhe:</p>
                <ul>
                    <li>Seu sorriso tímido quando nos vimos pela primeira vez</li>
                    <li>A forma como seus olhos brilhavam quando falava sobre seus sonhos</li>
                    <li>Aquele momento constrangedor quando derrubamos o café</li>
                </ul>
                <p>Naquele momento, eu sabia que algo especial estava começando.</p>
                <img src="assets/images/memory-1.jpg" alt="Nosso primeiro encontro" class="modal-image">
            `,
            funnyText: "E pensar que você quase cancelou porque achou que eu poderia ser um serial killer!"
        },
        {
            title: "Primeira Viagem",
            image: "assets/images/highlight-2.jpg",
            content: `
                <p>Nossa primeira viagem juntos foi para as montanhas, e que aventura foi!</p>
                <ul>
                    <li>Você reclamando do frio mesmo com três casacos</li>
                    <li>Eu me perdendo na trilha e jurando que sabia o caminho</li>
                    <li>Aquele pôr do sol que parecia ter sido pintado só para nós</li>
                </ul>
                <p>Foi quando descobri que viajar com você é sempre uma aventura, mesmo quando tudo dá errado.</p>
                <img src="assets/images/memory-2.jpg" alt="Nossa primeira viagem" class="modal-image">
            `,
            funnyText: "E você ainda insiste que não foi você quem esqueceu o mapa na pousada!"
        },
        {
            title: "Nosso Ritual",
            image: "assets/images/highlight-3.jpg",
            content: `
                <p>Nosso ritual de café da manhã aos domingos se tornou sagrado:</p>
                <ul>
                    <li>Você fazendo aquela torrada perfeita (quase sempre queimada)</li>
                    <li>Eu tentando fazer café e sempre deixando muito forte</li>
                    <li>As horas passando enquanto falamos sobre tudo e nada</li>
                </ul>
                <p>São nesses pequenos momentos que nosso amor se fortalece.</p>
                <img src="assets/images/memory-3.jpg" alt="Nosso ritual de café" class="modal-image">
            `,
            funnyText: "Ainda bem que você não me processou por intoxicação alimentar com suas 'torradas artesinais'!"
        }
    ];

    document.querySelectorAll('.btn-read-more').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const highlight = highlights[index];
            showModal(highlight.title, highlight.content, true);
        });
        
        const funnyTextElement = document.createElement('p');
        funnyTextElement.className = 'funny-text';
        funnyTextElement.textContent = highlights[index].funnyText;
        btn.closest('.highlight-content').appendChild(funnyTextElement);
    });
}

function setupVideoPlayer() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const video = document.querySelector('.video-wrapper video');
    const playButton = document.querySelector('.play-button');
    
    if (videoWrapper && video && playButton) {
        playButton.addEventListener('click', function() {
            videoWrapper.classList.add('playing');
            video.play();
            playButton.style.display = 'none';
        });
        
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playButton.style.display = 'none';
            } else {
                video.pause();
                playButton.style.display = 'flex';
            }
        });
    }
}

function setupAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
}

function setupTimeline() {
    const timelineData = [
        {
            date: "15/08/2018",
            title: "Primeiro Encontro",
            content: "Nos conhecemos em uma cafeteria no centro da cidade. Você estava lendo meu livro favorito e eu não resisti em puxar assunto.",
            image: "assets/images/timeline-1.jpg",
            icon: "fas fa-heart"
        },
        {
            date: "22/09/2018",
            title: "Primeiro Beijo",
            content: "Depois de um mês de encontros, finalmente nos beijamos sob a chuva. Você reclamou que ia estragar seu cabelo, mas valeu a pena.",
            image: "assets/images/timeline-2.jpg",
            icon: "fas fa-kiss-wink-heart"
        },
        {
            date: "15/12/2018",
            title: "Primeira Viagem Juntos",
            content: "Fomos para as montanhas e você quase morreu de frio. Eu disse que estava quente, você me chamou de mentiroso. Ainda assim, foi perfeito.",
            image: "assets/images/timeline-3.jpg",
            icon: "fas fa-mountain"
        }
    ];

    const timelineContainer = document.querySelector('.timeline-container');
    
    if (timelineContainer) {
        timelineContainer.innerHTML = '';
        
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
            timelineItem.innerHTML = `
                <div class="timeline-card" data-index="${index}">
                    <div class="timeline-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="timeline-date">${item.date}</div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <div class="timeline-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <p class="timeline-excerpt">${item.content.substring(0, 100)}...</p>
                    <button class="btn-read-more">Ler mais</button>
                </div>
            `;
            
            timelineItem.addEventListener('click', function() {
                const modalContent = `
                    <div class="timeline-modal-content">
                        <div class="timeline-modal-header">
                            <i class="${item.icon}"></i>
                            <h2>${item.title}</h2>
                            <small>${item.date}</small>
                        </div>
                        <div class="timeline-modal-body">
                            <img src="${item.image}" alt="${item.title}" class="timeline-modal-image">
                            <p>${item.content}</p>
                        </div>
                    </div>
                `;
                
                showModal(item.title, modalContent, true);
            });
            
            timelineContainer.appendChild(timelineItem);
        });
    }
}

function setupMessages() {
    const messagesData = [
        {
            title: "Por Que Eu Te Amo",
            content: `
                <p>Eu te amo porque:</p>
                <ul>
                    <li>Você me faz rir mesmo nos dias mais difíceis</li>
                    <li>Seu coração é maior que qualquer problema</li>
                    <li>Você aceita minhas manias (e até meus filmes ruins)</li>
                </ul>
                <p>Mas principalmente, eu te amo porque você é você.</p>
            `,
            date: "15/08/2023",
            icon: "fas fa-heart"
        }
    ];

    const messagesContainer = document.querySelector('.messages-grid');
    
    if (messagesContainer) {
        messagesData.forEach((message) => {
            const messageCard = document.createElement('div');
            messageCard.className = 'message-card';
            messageCard.innerHTML = `
                <div class="message-icon">
                    <i class="${message.icon}"></i>
                </div>
                <h3 class="message-title">${message.title}</h3>
                <div class="message-excerpt">
                    ${message.content.substring(0, 100)}...
                </div>
                <div class="message-footer">
                    <small class="message-date">${message.date}</small>
                    <button class="btn-read-message">Ler mensagem</button>
                </div>
            `;
            
            messageCard.addEventListener('click', function() {
                showModal(message.title, message.content, true);
            });
            
            messagesContainer.appendChild(messageCard);
        });
    }
}