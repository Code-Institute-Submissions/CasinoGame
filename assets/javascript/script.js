class AudioController {
	constructor() {
		this.bgmusic = new Audio('assets/Audio/bgmusic.mp3');
		this.flipsound = new Audio('assets/Audio/flip.mp3');
		this.matchsound = new Audio('assets/Audio/arcade.mp3');
		this.victorysound = new Audio('assets/Audio/victory.mp3');
		this.losesound = new Audio('assets/Audio/lose.mp3');
		this.bgmusic.volume = 0.5;
        this.bgmusic.loop = true;
        this.muted = false;
	}
	startMusic() {
		this.bgmusic.play();
	}

	stopMusic() {
		this.bgmusic.pause();
		this.bgmusic.currentTime = 0;
	}

	flip() {
        if(!this.muted){
        this.flipsound.play();
        }
	}

	match() {
        if(!this.muted){
		this.matchsound.play();
    }
}

	victory() {
        if(!this.muted){
		this.stopMusic();
		this.victorysound.play();
    }
}

	gameOver() {
        if(!this.muted){
		this.stopMusic();
        this.losesound.play();
        }
    }
    
    togglemusic() {
        console.log("muted, before switch: ", this.muted);
        let btn = document.getElementById('game-sound');
        if(!this.muted){
            this.stopMusic();
            this.muted = true;
            btn.classList.add('muted');
        }
        else{
            this.startMusic();
            this.muted = false;
            btn.classList.remove('muted');
        }
        console.log("muted, after switch: ", this.muted);
    }
}

class casinogame {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
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
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck)
                this.checkForCardMatch(card);
            else
                this.cardToCheck = card;
        }
    }
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else 
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.audioController.match();
        if(this.matchedCards.length === this.cardsArray.length)
            this.victory(); 
    }
    
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

    getCardType(card) {
        return card.getElementsByClassName('win-card')[0].src;
    }
    
	//corect
    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }

	gameOver() {
		clearInterval(this.countDown);
		this.audioController.gameOver();
		document.getElementById('game-over-text').classList.add('visible');
	}

	victory() {
		clearInterval(this.countDown);
		this.audioController.victory();
        document.getElementById('victory-text').classList.add('visible');
	}
	//corect
    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }
}

function ready() {
	let overlays = Array.from(document.getElementsByClassName('overlay-text'));
	let cards = Array.from(document.getElementsByClassName('card'));
    let game = new casinogame(60, cards);
    let muteButton = document.getElementById('game-sound');
    muteButton.addEventListener("click", muteFunction);
 function muteFunction() {
        console.log("testing an hope it works");
        game.audioController.togglemusic();
    }

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
console.log("building_cards");
buildCards();
if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {

    ready();
} 




