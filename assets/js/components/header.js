import { config, DOM } from '../main.js';

export async function loadHeader() {
    try {
        const response = await fetch('includes/header.html');
        if (!response.ok) throw new Error('Header não encontrado');
        
        const html = await response.text();
        DOM.header.innerHTML = html;
        
        // Configura o menu mobile
        setupMobileMenu();
        
    } catch (error) {
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
    }
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fecha o menu quando um link é clicado
        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
}