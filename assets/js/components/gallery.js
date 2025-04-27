export async function loadGallery() {
    try {
        const response = await fetch('includes/gallery-content.html');
        if (!response.ok) throw new Error('Conteúdo da galeria não encontrado');
        
        const html = await response.text();
        DOM.main.innerHTML = html;
        
        // Inicializa apenas os filtros e interações
        setupGalleryFilters();
        
    } catch (error) {
        console.error('Erro ao carregar a galeria:', error);
        DOM.main.innerHTML = `
            <section class="gallery-section">
                <div class="container">
                    <h1 class="section-title">Nossos Momentos</h1>
                    <p class="section-subtitle">Cada foto conta uma história do nosso amor</p>
                    
                    <div class="gallery-error">
                        <i class="fas fa-camera-retro"></i>
                        <p>Não foi possível carregar nossa galeria de fotos. Mas prometo que nossas melhores fotos ainda estão por vir!</p>
                    </div>
                </div>
            </section>
        `;
    }
}

function setupGalleryFilters() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.gallery-filter');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
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
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const caption = card.querySelector('.gallery-caption').textContent;
            showImageModal(img.src, caption);
        });
    });
}