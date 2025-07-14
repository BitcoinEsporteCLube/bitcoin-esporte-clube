// Script principal do Bitcoin Esporte Clube

document.addEventListener('DOMContentLoaded', function() {
    // Contador regressivo para o próximo jogo
    const nextMatchCountdown = document.getElementById('next-match-countdown');
    if (nextMatchCountdown) {
        const matchDate = nextMatchCountdown.getAttribute('data-match-date');
        startCountdown(matchDate, nextMatchCountdown);
    }

    // Animação de elementos ao rolar a página
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        window.addEventListener('scroll', function() {
            animatedElements.forEach(element => {
                if (isElementInViewport(element)) {
                    element.classList.add('animated');
                }
            });
        });
        // Trigger once on load
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animated');
            }
        });
    }

    // Inicializar tooltips e popovers do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Função para verificar se um elemento está visível na viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Função para iniciar o contador regressivo
function startCountdown(targetDate, element) {
    const target = new Date(targetDate).getTime();
    
    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = target - now;
        
        if (distance < 0) {
            clearInterval(interval);
            element.innerHTML = 'O jogo já começou!';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        element.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Dias</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Minutos</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Segundos</span>
            </div>
        `;
    }, 1000);
}
