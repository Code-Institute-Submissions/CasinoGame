class AudioController {
    constructor() {
        this.bgmusic = new Audio('Assets/Audio/music.mp3');
        this.flipsound = new Audio('Assets/Audio/flip.mp3');
        this.matchsound = new Audio('Assets/Audio/match.mp3');
        this.winmusic = new Audio('Assets/Audio/win.mp3');
        this.failmusic = new Audio('Assets/Audio/fail.mp3');
        this.bgmusic.volume = 0.5;
        this.bgmusic.loop = true;
    }
    startMusic() {
        this.bgMusic.play();
    }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            // game.startGame();
            let audioController = new AudioController();
             audioController.startMusic();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // game.flipCard(card);
        });
    });
    
}

// When everything in the HTML file has loaded the then it will call the function provided.
if(document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready());
} else {
	ready();
}

