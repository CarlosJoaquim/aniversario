import { DOM } from '../main.js';

export function initModal() {
    // Fecha o modal quando clicar no X
    DOM.modal.closeBtn.addEventListener('click', () => {
        DOM.modal.container.style.display = 'none';
    });
    
    // Fecha o modal quando clicar fora do conteúdo
    window.addEventListener('click', (event) => {
        if (event.target === DOM.modal.container) {
            DOM.modal.container.style.display = 'none';
        }
    });
}

// Função para mostrar o modal com conteúdo
export function showModal(title, content, isHTML = false) {
    if (isHTML) {
        DOM.modal.content.innerHTML = `<h2>${title}</h2>${content}`;
    } else {
        DOM.modal.content.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    }
    
    DOM.modal.container.style.display = 'block';
}

// Função para mostrar um modal de imagem
export function showImageModal(imageUrl, caption = '') {
    DOM.modal.content.innerHTML = `
        <div class="image-modal">
            <img src="${imageUrl}" alt="${caption}" loading="lazy">
            ${caption ? `<p class="image-caption">${caption}</p>` : ''}
        </div>
    `;
    
    DOM.modal.container.style.display = 'block';
}