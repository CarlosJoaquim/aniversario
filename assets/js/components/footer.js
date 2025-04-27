import { DOM } from '../main.js';

export async function loadFooter() {
    try {
        const response = await fetch('includes/footer.html');
        if (!response.ok) throw new Error('Footer não encontrado');
        
        const html = await response.text();
        DOM.footer.innerHTML = html;
        
        // Atualiza o ano no footer
        document.getElementById('year').textContent = new Date().getFullYear();
        
    } catch (error) {
        console.error('Erro ao carregar o footer:', error);
        DOM.footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Para Lúcia</h3>
                        <p>Este site foi feito com todo o amor do mundo para celebrar você.</p>
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
    }
}