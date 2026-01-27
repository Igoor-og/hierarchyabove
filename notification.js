/**
 * SISTEMA DE NOTIFICAÇÕES PERSONALIZADAS
 * Substitui os alert() nativos por pop-ups modernos e responsivos
 */

// Função principal para mostrar notificações
function showNotification(message, type = 'info', title = '') {
    // Remove notificação existente se houver
    const existingNotification = document.querySelector('.notification-overlay');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Define títulos padrão baseados no tipo
    const defaultTitles = {
        success: 'Sucesso!',
        error: 'Ops!',
        warning: 'Atenção!',
        info: 'Informação'
    };

    // Define ícones baseados no tipo
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const finalTitle = title || defaultTitles[type] || defaultTitles.info;
    const icon = icons[type] || icons.info;

    // Cria o HTML da notificação
    const notificationHTML = `
        <div class="notification-overlay">
            <div class="notification-box">
                <div class="notification-icon ${type}">
                    ${icon}
                </div>
                <h3 class="notification-title">${finalTitle}</h3>
                <p class="notification-message">${message}</p>
                <button class="notification-close ${type}" onclick="closeNotification()">
                    OK, ENTENDI
                </button>
            </div>
        </div>
    `;

    // Adiciona ao body
    document.body.insertAdjacentHTML('beforeend', notificationHTML);

    // Mostra a notificação com animação
    setTimeout(() => {
        const overlay = document.querySelector('.notification-overlay');
        if (overlay) {
            overlay.classList.add('show');
        }
    }, 10);

    // Auto-fecha após 5 segundos (opcional)
    // setTimeout(() => closeNotification(), 5000);
}

// Função para fechar a notificação
function closeNotification() {
    const overlay = document.querySelector('.notification-overlay');
    if (overlay) {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Permite fechar clicando no overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('notification-overlay')) {
        closeNotification();
    }
});

// Permite fechar com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeNotification();
    }
});

// Funções de atalho para diferentes tipos
function showSuccess(message, title) {
    showNotification(message, 'success', title);
}

function showError(message, title) {
    showNotification(message, 'error', title);
}

function showWarning(message, title) {
    showNotification(message, 'warning', title);
}

function showInfo(message, title) {
    showNotification(message, 'info', title);
}
