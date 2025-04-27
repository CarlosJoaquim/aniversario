import { config, DOM, loadPage } from '../main.js';
import { showModal, showImageModal } from './modal.js';

export async function loadHome() {
    try {
        const response = await fetch('includes/home-content.html');
        if (!response.ok) throw new Error('Conteúdo da home não encontrado');
        
        const html = await response.text();
        DOM.main.innerHTML = html;
        
        // Inicializa componentes da home
        setupCountdown();
        setupHighlights();
        setupVideoPlayer();
        setupAnimations();
        
    } catch (error) {
        console.error('Erro ao carregar a home:', error);
        DOM.main.innerHTML = `
            <section class="hero-section">
                <div class="hero-background" style="background-image: url('assets/images/hero-bg.jpg');"></div>
                <div class="hero-overlay"></div>
                <div class="hero-content">
                    <div class="hero-text">
                        <h2>Feliz Aniversário,</h2>
                        <h1>Lúcia Mendes</h1>
                        <p class="subtitle">Cada dia ao seu lado é um presente que eu guardo no coração</p>
                    </div>
                </div>
            </section>
            
            <section class="love-message">
                <div class="container">
                    <div class="message-box">
                        <h2>Para a Mulher Mais Incrível do Mundo</h2>
                        <p>
                            Lúcia, neste dia especial, quero que você saiba o quanto você é importante para mim. 
                            Cada momento ao seu lado é como uma página de um livro maravilhoso que nunca quero terminar de ler.
                        </p>
                        <div class="signature">
                            <p>Com todo meu amor,</p>
                            <img src="assets/images/signature.png" alt="Assinatura" class="signature-img">
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

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
            funnyText: "Ainda bem que você não me processou por intoxicação alimentar com suas 'torradas artesanais'!"
        }
    ];

    document.querySelectorAll('.btn-read-more').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const highlight = highlights[index];
            showModal(highlight.title, highlight.content, true);
        });
        
        // Adiciona texto engraçado dinamicamente
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
        playButton.addEventListener('click', () => {
            videoWrapper.classList.add('playing');
            video.play();
            playButton.style.display = 'none';
        });
        
        video.addEventListener('click', () => {
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
    // Anima elementos quando eles aparecem na tela
    const animateOnScroll = () => {
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
    animateOnScroll(); // Executa uma vez ao carregar
}