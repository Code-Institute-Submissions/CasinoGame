class AudioController {
	//build out audio controller for game
	constructor() {
		this.bgmusic = document.getElementById('bgMusic');
		this.flipsound = document.getElementById('flipSound');
		this.matchsound = document.getElementById('matchSound');
		this.victorysound = document.getElementById('victorySound');
		this.losesound = document.getElementById('looseSound');
		this.bgmusic.volume = 0.5;
		this.bgmusic.loop = true;
		this.muted = false;
	}
	startMusic() {
		//plays that background music, but stop any end of game stuff first
		this.victorysound.pause();
		this.losesound.pause();
		if (!this.muted) {
			this.bgmusic.play();
		}
	}
	stopMusic() {
		//stop the background music
		this.bgmusic.pause();
		this.bgmusic.currentTime = 0;
	}
	flip() {
		//flipping card audio
		if (!this.muted) {
			this.flipsound.play();
		}
	}
	match() {
		//matching card audio
		if (!this.muted) {
			this.matchsound.play();
		}
	}
	victory() {
		//end game winner music
		if (!this.muted) {
			this.stopMusic();
			this.victorysound.play();
		}
	}
	gameOver() {
		//end game looser music
		if (!this.muted) {
			this.stopMusic();
			this.losesound.play();
		}
	}
	togglemusic() {
		// initiated for user clicking sound or mute button, toggles the class and value for the audio being muted or not
		let btn = document.getElementById('game-sound');
		if (!this.muted) {
			this.muted = true;
			this.stopMusic();
			btn.classList.add('muted');
		} else {
			this.muted = false;
			this.startMusic();
			btn.classList.remove('muted');
		}
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
	/*start game action and game in process*/
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
	/*hide card display*/
	hideCards() {
		this.cardsArray.forEach(card => {
			card.classList.remove('visible');
			card.classList.remove('matched');
		});
	}
	/*flip card function*/
	flipCard(card) {
		if (this.canFlipCard(card)) {
			this.audioController.flip();
			this.totalClicks++;
			this.ticker.innerText = this.totalClicks;
			card.classList.add('visible');

			if (this.cardToCheck)
				this.checkForCardMatch(card);
			else
				this.cardToCheck = card;
		}
	}
	/* check for cards matching */
	checkForCardMatch(card) {
		if (this.getCardType(card) === this.getCardType(this.cardToCheck))
			this.cardMatch(card, this.cardToCheck);
		else
			this.cardMisMatch(card, this.cardToCheck);

		this.cardToCheck = null;
	}
	/*idenfying the cards match using card 1 and card 2*/
	cardMatch(card1, card2) {
		this.matchedCards.push(card1);
		this.matchedCards.push(card2);
		card1.classList.add('matched');
		card2.classList.add('matched');
		this.audioController.match();
		if (this.matchedCards.length === this.cardsArray.length)
			this.victory();
	}
	/*Incorrect cards rejected */
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

	/*timer countdown*/
	startCountDown() {
		return setInterval(() => {
			this.timeRemaining--;
			this.timer.innerText = this.timeRemaining;
			if (this.timeRemaining === 0)
				this.gameOver();
		}, 1000);
	}
	/*victory visible action when the game is won*/
	gameOver() {
		clearInterval(this.countDown);
		this.audioController.gameOver();
		document.getElementById('game-over-text').classList.add('visible');
	}
	/*victory visible action when the game is lost*/
	victory() {
		clearInterval(this.countDown);
		this.audioController.victory();
		document.getElementById('victory-text').classList.add('visible');
	}
	/*card shuffling function*/
	shuffleCards() {
		for (let i = this.cardsArray.length - 1; i > 0; i--) {
			let randIndex = Math.floor(Math.random() * (i + 1));
			this.cardsArray[randIndex].style.order = i;
			this.cardsArray[i].style.order = randIndex;
		}
	}

	/*Check to see if cards match correctly two similiar cards are the same*/
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
/*building_cards action*/
buildCards();
if (document.readyState == 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {

	ready();
}
