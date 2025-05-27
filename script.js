document.addEventListener('DOMContentLoaded', () => {
    // Partículas
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#ff2d75' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 4, random: true },
            line_linked: { enable: true, distance: 150, color: '#ff9bb8', opacity: 0.4 },
            move: { enable: true, speed: 2 }
        }
    });

    // AOS
    AOS.init({ duration: 1000, once: true });

    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = 0;
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 2500);

    // Motivos
    const reasons = [
        { icon: 'fa-heart', title: 'Seu Coração', description: 'Amor puro e verdadeiro.' },
        { icon: 'fa-smile-beam', title: 'Seu Sorriso', description: 'Ilumina meus dias.' },
        { icon: 'fa-hand-holding-heart', title: 'Seu Cuidado', description: 'Me faz sentir amado.' },
        { icon: 'fa-music', title: 'Sua Voz', description: 'Melodia para minha alma.' },
        { icon: 'fa-star', title: 'Seu Brilho', description: 'Mais forte que qualquer estrela.' },
        { icon: 'fa-infinity', title: 'Nosso Amor', description: 'Não tem fim.' }
    ];
    const reasonsGrid = document.getElementById('reasons-grid');
    reasons.forEach(r => {
        const el = document.createElement('div');
        el.className = 'reason-card';
        el.innerHTML = `
            <div class="reason-icon"><i class="fas ${r.icon}"></i></div>
            <h3>${r.title}</h3>
            <p>${r.description}</p>
        `;
        reasonsGrid.appendChild(el);
    });
      
    const memoryGame = document.getElementById('memory-game');

// 🔥 Coloque os nomes dos arquivos das suas fotos (sempre pares!)
const cardsArray = [
    'foto1.png',
    'foto2.png',
    'foto3.png',
    'foto4.png',
    'foto5.png',
    'foto6.png'
];

const gameGrid = [...cardsArray, ...cardsArray]; // Duplicar para pares
gameGrid.sort(() => 0.5 - Math.random()); // Embaralhar

// Criar os cards no HTML
// Criar os cards no HTML com teste visual e console
gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.name = item;

    const imagePath = `imagens/${item}`;
    console.log("🔍 Tentando carregar imagem:", imagePath);

    card.innerHTML = `
        <div class="front-face">❤️</div>
        <div class="back-face" style="
            background-image: url('${imagePath}');
        "></div>
    `;

    memoryGame.appendChild(card);
});


// Lógica do jogo
let firstCard = '';
let secondCard = '';
let lockBoard = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = ['', '', false];
}

// Adicionar evento nos cards
document.querySelectorAll('.memory-card').forEach(card => 
    card.addEventListener('click', flipCard)
);


    // Surpresa
    const btn = document.getElementById('surpresa-btn');
    const content = document.getElementById('surpresa-content');
    btn.addEventListener('click', () => {
        confetti();
        content.innerHTML = `
            <h3>Você é meu sonho realizado!</h3>
            <p>Obrigado por existir, meu amor! ❤️</p>
        `;
        content.classList.add('show');
    });
}); 

// Música
// Definição dos elementos
const music = document.getElementById('background-music');
const btnMusic = document.getElementById('toggle-music');
let isPlaying = false;

// Tenta iniciar a música automaticamente
window.addEventListener('load', () => {
    const playPromise = music.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            btnMusic.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch((error) => {
            // Caso o navegador bloqueie autoplay, mantém botão no estado de play
            console.log('Autoplay bloqueado pelo navegador.');
        });
    }
});
btnMusic.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        btnMusic.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        music.play();
        btnMusic.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Tema Claro/Escuro
const btnTheme = document.getElementById('toggle-theme');
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    btnTheme.innerHTML = isDark 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Surpresa (Mostrar vídeo e confetes)
const btnSurpresa = document.getElementById('surpresa-btn');
const contentSurpresa = document.getElementById('surpresa-content');
btnSurpresa.addEventListener('click', () => {
    contentSurpresa.classList.add('show');
    confetti();
});
 

