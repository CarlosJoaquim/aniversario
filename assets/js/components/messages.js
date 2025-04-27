import { DOM, showModal } from '../main.js';

export async function loadMessages() {
    try {
        const response = await fetch('includes/messages-content.html');
        if (!response.ok) throw new Error('Conteúdo das mensagens não encontrado');
        
        const html = await response.text();
        DOM.main.innerHTML = html;
        
        // Inicializa as mensagens
        setupMessages();
        
    } catch (error) {
        console.error('Erro ao carregar as mensagens:', error);
        DOM.main.innerHTML = `
            <section class="messages-section">
                <div class="container">
                    <h1 class="section-title">Mensagens de Amor</h1>
                    <p class="section-subtitle">Palavras que vêm do coração</p>
                    
                    <div class="messages-error">
                        <i class="fas fa-heart-broken"></i>
                        <h3>Querida,</h3>
                        <p>Parece que as mensagens não carregaram, mas isso não muda nada do que sinto por você.</p>
                        <p>Você é a pessoa mais incrível que já conheci, e mesmo sem essas palavras aqui, 
                        você sabe o quanto você significa para mim.</p>
                        <button class="btn-refresh" onclick="location.reload()">
                            <i class="fas fa-sync-alt"></i> Tentar novamente
                        </button>
                    </div>
                </div>
            </section>
        `;
    }
}

function setupMessages() {
    const messagesData = [
        {
            title: "Por Que Eu Te Amo",
            content: `
                <div class="message-content">
                    <p class="message-intro">Querida, eu poderia listar mil razões, mas vou começar por essas:</p>
                    
                    <div class="love-reasons">
                        <div class="reason-card">
                            <i class="fas fa-laugh-squint"></i>
                            <h4>Seu Sorriso</h4>
                            <p>Você tem o poder de iluminar meu dia só com seu sorriso. Mesmo nos momentos mais difíceis, 
                            uma risada sua é suficiente para me fazer esquecer tudo.</p>
                        </div>
                        
                        <div class="reason-card">
                            <i class="fas fa-heart"></i>
                            <h4>Seu Coração</h4>
                            <p>Você ama com uma intensidade que me inspira. A forma como você cuida das pessoas, 
                            como se importa com detalhes, como se entrega completamente.</p>
                        </div>
                        
                        <div class="reason-card">
                            <i class="fas fa-brain"></i>
                            <h4>Sua Mente</h4>
                            <p>Admiro como você pensa, como vê o mundo, como transforma problemas em oportunidades. 
                            Sua inteligência me desafia a ser melhor todos os dias.</p>
                        </div>
                    </div>
                    
                    <div class="message-closing">
                        <p>Mas no final, eu te amo simplesmente porque você é você. Não há explicação lógica, 
                        não há razão suficiente - só há esse amor que cresce a cada dia.</p>
                        <div class="signature">
                            <p>Com todo meu amor,</p>
                            <p class="signature-name">[Seu Nome]</p>
                        </div>
                    </div>
                </div>
            `,
            date: "Atualizado hoje",
            icon: "fas fa-heart",
            color: "#ff6b6b",
            music: "love-reason.mp3"
        },
        {
            title: "Meu Dia Perfeito",
            content: `
                <div class="message-content">
                    <p class="message-intro">Se me perguntassem como seria meu dia perfeito, seria assim:</p>
                    
                    <div class="day-timeline">
                        <div class="timeline-item">
                            <div class="time">Manhã</div>
                            <div class="description">
                                <p>Acordar com você se aconchegando, mesmo reclamando que eu roubo o cobertor. 
                                Café da manhã com suas panquecas queimadas (que eu amo porque você fez).</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="time">Tarde</div>
                            <div class="description">
                                <p>Um passeio sem destino, de mãos dadas, descobrindo pequenos cantos da cidade. 
                                Você apontando cada cachorro fofo e eu fingindo que não quero um (mas querendo).</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="time">Noite</div>
                            <div class="description">
                                <p>Jantar à luz de velas (que você insiste em acender mesmo com comida delivery). 
                                Você dormindo no meio do filme, e eu te observando mais do que a TV.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="message-closing">
                        <p>Percebi que meu dia perfeito não precisa de nada especial - só precisa ter você nele.</p>
                        <div class="polaroid">
                            <img src="images/our-moment.jpg" alt="Nosso momento">
                            <p>Nosso momento favorito</p>
                        </div>
                    </div>
                </div>
            `,
            date: "Ontem",
            icon: "fas fa-sun",
            color: "#feca57",
            video: "perfect-day.mp4"
        },
        {
            title: "Promessas Eternas",
            content: `
                <div class="message-content">
                    <p class="message-intro">Eu prometo a você:</p>
                    
                    <div class="promises-grid">
                        <div class="promise-card" style="background-color: #f7f1e3;">
                            <i class="fas fa-coffee"></i>
                            <h4>Nos Cafés da Manhã</h4>
                            <p>Sempre fazer seu café do jeito que você gosta, mesmo quando você disser "só um gole".</p>
                        </div>
                        
                        <div class="promise-card" style="background-color: #e7f5fe;">
                            <i class="fas fa-cloud-rain"></i>
                            <h4>Nos Dias Chuvosos</h4>
                            <p>Ser seu guarda-chuva humano quando esquecermos o verdadeiro em casa (de novo).</p>
                        </div>
                        
                        <div class="promise-card" style="background-color: #f3e8ff;">
                            <i class="fas fa-heartbeat"></i>
                            <h4>Nos Momentos Difíceis</h4>
                            <p>Segurar sua mão com toda a força do mundo e lembrar que nenhuma tempestade dura para sempre.</p>
                        </div>
                        
                        <div class="promise-card" style="background-color: #fff8e1;">
                            <i class="fas fa-laugh-beam"></i>
                            <h4>Nos Momentos Alegres</h4>
                            <p>Celebrar cada vitória sua como se fosse minha, porque sua felicidade é minha felicidade.</p>
                        </div>
                    </div>
                    
                    <div class="eternal-promise">
                        <i class="fas fa-infinity"></i>
                        <p>E acima de tudo, prometo amar você a cada dia mais, até que todas as estrelas do céu se apaguem.</p>
                    </div>
                </div>
            `,
            date: "Sempre",
            icon: "fas fa-hand-holding-heart",
            color: "#5f27cd",
            interactive: true
        },
        {
            title: "Quando Eu Te Vi",
            content: `
                <div class="message-content">
                    <div class="memory-box">
                        <div class="memory-photo">
                            <img src="images/first-sight.jpg" alt="Quando nos conhecemos">
                            <div class="memory-date">Nosso primeiro encontro</div>
                        </div>
                        
                        <div class="memory-text">
                            <p>Quando eu te vi pela primeira vez, meu mundo mudou sem eu perceber.</p>
                            <p>Eu não sabia que aquele momento seria o início de tudo. Que seu sorriso iria 
                            se tornar meu lugar favorito, que sua voz iria se tornar minha melodia preferida.</p>
                            <p>Lembro do seu vestido azul, da forma como você mexeu no cabelo nervosa, 
                            da sua risada quando eu derrubei meu copo.</p>
                            <p>Naquela hora eu não sabia, mas estava conhecendo o amor da minha vida.</p>
                        </div>
                    </div>
                    
                    <div class="then-vs-now">
                        <div class="then">
                            <h4>Então</h4>
                            <p>Dois estranhos tímidos em um café</p>
                        </div>
                        
                        <div class="arrow">
                            <i class="fas fa-heart"></i>
                        </div>
                        
                        <div class="now">
                            <h4>Agora</h4>
                            <p>Uma vida inteira de histórias para contar</p>
                        </div>
                    </div>
                </div>
            `,
            date: "Nosso aniversário",
            icon: "fas fa-eye",
            color: "#1dd1a1",
            gallery: ["first-date-1.jpg", "first-date-2.jpg"]
        },
        {
            title: "Nosso Futuro",
            content: `
                <div class="message-content">
                    <div class="future-visualization">
                        <div class="future-item">
                            <div class="year">2025</div>
                            <div class="vision">
                                <i class="fas fa-home"></i>
                                <p>Nossa primeira casa juntos, escolhendo móveis e discutindo sobre cores de parede</p>
                            </div>
                        </div>
                        
                        <div class="future-item">
                            <div class="year">2028</div>
                            <div class="vision">
                                <i class="fas fa-plane"></i>
                                <p>Aquela viagem para a Itália que você sempre sonhou, com muito vinho e fotos ruins minhas</p>
                            </div>
                        </div>
                        
                        <div class="future-item">
                            <div class="year">2032</div>
                            <div class="vision">
                                <i class="fas fa-paw"></i>
                                <p>Dois cachorros (um grande que você quer e um pequeno que eu quero) destruindo nossos sapatos</p>
                            </div>
                        </div>
                        
                        <div class="future-item">
                            <div class="year">2035</div>
                            <div class="vision">
                                <i class="fas fa-baby"></i>
                                <p>Uma família começando, com você sendo a mãe incrível que sei que será</p>
                            </div>
                        </div>
                        
                        <div class="future-item">
                            <div class="year">2060</div>
                            <div class="vision">
                                <i class="fas fa-rocking-chair"></i>
                                <p>Nós velhinhos, relembrando todas essas memórias que ainda vamos criar</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="future-closing">
                        <p>Não sei exatamente como será, mas sei que quero cada segundo desse futuro ao seu lado.</p>
                        <button class="btn-add-vision">
                            <i class="fas fa-plus"></i> Adicionar nosso sonho
                        </button>
                    </div>
                </div>
            `,
            date: "Amanhã e além",
            icon: "fas fa-star",
            color: "#ff9ff3",
            interactive: true
        },
        {
            title: "Lista de Gratidão",
            content: `
                <div class="message-content">
                    <p class="message-intro">Hoje eu sou grato por:</p>
                    
                    <div class="gratitude-list">
                        <div class="gratitude-item">
                            <div class="number">01</div>
                            <div class="grateful-for">
                                <h4>Seu Café da Manhã</h4>
                                <p>Porque mesmo queimado, você fez com amor</p>
                            </div>
                        </div>
                        
                        <div class="gratitude-item">
                            <div class="number">02</div>
                            <div class="grateful-for">
                                <h4>Seu Cheiro</h4>
                                <p>Que ainda me faz perder o fôlego depois de todo esse tempo</p>
                            </div>
                        </div>
                        
                        <div class="gratitude-item">
                            <div class="number">03</div>
                            <div class="grateful-for">
                                <h4>Seu Paciência</h4>
                                <p>Quando ensino você a usar o controle remoto pela décima vez</p>
                            </div>
                        </div>
                        
                        <div class="gratitude-item">
                            <div class="number">04</div>
                            <div class="grateful-for">
                                <h4>Seu Amor</h4>
                                <p>Que transformou minha vida de formas que eu nem sabia serem possíveis</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="gratitude-closing">
                        <p>Mas mais do que tudo, sou grato por você existir e por eu ter a sorte de te chamar de minha.</p>
                        <div class="gratitude-counter">
                            <i class="fas fa-heart"></i>
                            <span id="gratitude-count">1001</span> coisas para agradecer
                        </div>
                    </div>
                </div>
            `,
            date: "Diário",
            icon: "fas fa-book-open",
            color: "#ff9f43",
            counter: true
        }
    ];

    const messagesContainer = document.querySelector('.messages-grid');
    
    if (messagesContainer) {
        messagesData.forEach((message, index) => {
            const messageCard = document.createElement('div');
            messageCard.className = 'message-card';
            messageCard.style.borderTop = `4px solid ${message.color}`;
            messageCard.innerHTML = `
                <div class="message-icon" style="color: ${message.color}">
                    <i class="${message.icon}"></i>
                </div>
                <h3 class="message-title">${message.title}</h3>
                <div class="message-excerpt">
                    ${extractText(message.content).substring(0, 120)}...
                </div>
                <div class="message-footer">
                    <small class="message-date" style="color: ${message.color}">${message.date}</small>
                    <button class="btn-read-message" style="background-color: ${message.color}">
                        <i class="fas fa-envelope-open-text"></i> Ler mensagem
                    </button>
                </div>
                ${message.interactive ? '<div class="message-badge">Interativo</div>' : ''}
            `;
            
            messageCard.addEventListener('click', () => {
                showModal(
                    message.title, 
                    message.content, 
                    true,
                    {
                        color: message.color,
                        icon: message.icon,
                        music: message.music,
                        video: message.video,
                        gallery: message.gallery,
                        interactive: message.interactive
                    }
                );
            });
            
            // Efeito de hover dinâmico
            messageCard.addEventListener('mouseenter', () => {
                messageCard.style.transform = 'translateY(-5px)';
                messageCard.style.boxShadow = `0 10px 20px ${hexToRgba(message.color, 0.2)}`;
            });
            
            messageCard.addEventListener('mouseleave', () => {
                messageCard.style.transform = '';
                messageCard.style.boxShadow = '';
            });
            
            messagesContainer.appendChild(messageCard);
        });
    }
}

// Função auxiliar para extrair texto de HTML
function extractText(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
}

// Função para converter hex para rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}