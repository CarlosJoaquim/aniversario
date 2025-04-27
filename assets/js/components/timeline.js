import { DOM, showModal } from '../main.js';

export async function loadTimeline() {
    try {
        const response = await fetch('includes/timeline-content.html');
        if (!response.ok) throw new Error('Conteúdo da timeline não encontrado');
        
        const html = await response.text();
        DOM.main.innerHTML = html;
        
        // Inicializa a timeline
        setupTimeline();
        
    } catch (error) {
        console.error('Erro ao carregar a timeline:', error);
        DOM.main.innerHTML = `
            <section class="timeline-section">
                <div class="container">
                    <h1 class="section-title">Nossa História</h1>
                    <p class="section-subtitle">Uma jornada de amor, risos e momentos inesquecíveis</p>
                    
                    <div class="timeline-container">
                        <div class="timeline-error">
                            <i class="fas fa-heart-broken"></i>
                            <p>Não foi possível carregar nossa linha do tempo. Mas prometo que nossa história continua linda!</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
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
        },
        {
            date: "14/02/2019",
            title: "Nosso Primeiro Dia dos Namorados",
            content: "Eu cozinhei para você e quase queimamos a cozinha. Você disse que foi a melhor noite da sua vida, mesmo com a comida quase intragável.",
            image: "assets/images/timeline-4.jpg",
            icon: "fas fa-utensils"
        },
        {
            date: "15/08/2019",
            title: "Seu Aniversário Inesquecível",
            content: "Surpreendi você com uma festa surpresa. Você disse que odiava surpresas, mas chorou de felicidade quando viu todos os seus amigos.",
            image: "assets/images/timeline-5.jpg",
            icon: "fas fa-birthday-cake"
        },
        {
            date: "20/03/2020",
            title: "Pandemia Juntos",
            content: "Passamos a quarentena juntos. Você me ensinou a cozinhar, eu te ensinei a não ser tão perfeccionista. Sobrevivemos!",
            image: "assets/images/timeline-6.jpg",
            icon: "fas fa-home"
        },
        {
            date: "15/08/2021",
            title: "Três Anos de Amor",
            content: "Cada dia ao seu lado é um presente. Você me faz ser uma pessoa melhor e me ensinou o verdadeiro significado do amor.",
            image: "assets/images/timeline-7.jpg",
            icon: "fas fa-heartbeat"
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
            
            timelineContainer.appendChild(timelineItem);
        });
        
        // Configura os eventos dos cards da timeline
        document.querySelectorAll('.timeline-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                const item = timelineData[index];
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
                            ${index < timelineData.length - 1 ? `
                            <div class="timeline-next">
                                <p>Próximo capítulo: <strong>${timelineData[index + 1].title}</strong></p>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `;
                
                showModal(item.title, modalContent, true);
            });
        });
    }
}