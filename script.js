class AudioController {
	constructor() {
		this.bgmusic = new Audio('assets/Audio/bgmusic.mp3');
		this.flipsound = new Audio('assets/Audio/flip.mp3');
		this.matchsound = new Audio('assets/Audio/match.mp3');
		this.victorysound = new Audio('assets/Audio/victory.mp3');
		this.gameOversound = new Audio('Assets/Audio/gameOver.mp3');
		this.bgmusic.volume = 0.5;
		this.bgmusic.loop = true;
	}
	startMusic() {
		this.bgmusic.play();
    }
    
	stopMusic() {
		this.bgmusic.pause();
		this.bgmusic.currentTime = 0;
    }
    
	flip() {
		this.flipsound.play();
    }
    
	match() {
		this.matchsound.play();
    }
    
	victory() {
		this.stopMusic();
		this.victorysound.play();
    }
    
	gameOver() {
		this.stopMusic();
		this.gameOversound.play();
	}
}

class casinogame {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }
//corect
  startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards(); 
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
}
  //corect
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    } 
  //corect
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

    }
}
  //corect
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }//corect
        gameOver() {
        clearInterval(this.countdown);
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
//corect
    shuffleCards(cardsArray) { // Fisher-Yates Shuffle Algorithm.
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            cardsArray[randIndex].style.order = i;
            cardsArray[i].style.order = randIndex;
        }
    }
 //corect 
    canFlipCard(card) {
        //return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
        return true;
    }
}
//corect 
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new casinogame(5, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}