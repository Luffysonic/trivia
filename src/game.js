exports = typeof window !== 'undefined' && window !== null ? window : global;
const Questions = require('./questions');
const player = require('./player');

class Game {
	constructor() {
		this.players = [];
		this.questions = new Questions.Questions();
	}
	currentPlayerIndex = 0;
	purses = [];
	winningCondition = 6;
	isGettingOutOfPenaltyBox = false;

	isPlayable() {
		return this.howManyPlayers() >= 2;
	}

	addPlayer(playerName) {
		let PlayerNumber = this.players.length;
		this.players.push(new player.Player(playerName));
		console.log(playerName + ' was added');
		console.log('They are player number ' + this.players.length);
		return PlayerNumber + 1 == this.players.length;
	}

	howManyPlayers() {
		return this.players.length;
	}
	getCurrentPlayerIndex() {
		return this.currentPlayerIndex;
	}
	getCurrentPlayer() {
		return this.players[this.currentPlayerIndex];
	}
	setcurrentPlayerIndex(index) {
		this.currentPlayerIndex = index;
	}
	getCurrentPlayerPlace() {
		return this.getCurrentPlayer().getPlace();
	}
	setCurrentPlayerPlace(place) {
		this.getCurrentPlayer().setPlace(place);
	}

	getCurrentPlayerPurse() {
		return this.getCurrentPlayer().getPurse();
	}

	getCategory() {
		return this.questions.currentCategoryName(this.getCurrentPlayer());
	}

	updatePlayerPosition(roll) {
		let currentPlayerPlace = this.getCurrentPlayerPlace();
		currentPlayerPlace += roll;
		if (currentPlayerPlace > 11) {
			currentPlayerPlace -= 12;
			this.setCurrentPlayerPlace(currentPlayerPlace);
		} else {
			this.setCurrentPlayerPlace(currentPlayerPlace);
		}
		console.log(
			this.getCurrentPlayer().getName() +
				"'s new location is " +
				this.getCurrentPlayer().getPlace()
		);
	}

	determineifPlayerisGettingOutOfPenaltyBox(roll) {
		if (roll % 2 != 0) {
			this.getCurrentPlayer().releaseFromPenaltyBox();
			console.log(
				`${this.getCurrentPlayer().getName()}` +
					' is getting out of the penalty box'
			);
			this.updatePlayerPosition(roll);
			this.isGettingOutOfPenaltyBox = true;
			return true;
		} else {
			console.log(
				`${this.getCurrentPlayer().getName()}` +
					' is not getting out of the penalty box'
			);
			this.isGettingOutOfPenaltyBox = false;
			return false;
		}
	}

	roll(roll) {
		console.log(`${this.getCurrentPlayer().getName()} is the current player`);
		console.log('They have rolled a ' + roll);
		if (this.getCurrentPlayer().isInPenaltyBox()) {
			this.determineifPlayerisGettingOutOfPenaltyBox(roll);
		} else {
			this.updatePlayerPosition(roll);
		}
		console.log('The category is :' + this.getCategory());
		this.questions.askQuestion(this.getCurrentPlayer());
	}

	didPlayerNotWin() {
		return !(this.getCurrentPlayerPurse() === this.winningCondition);
	}

	wrongAnswer() {
		console.log('Question was incorrectly answered');
		console.log(
			this.getCurrentPlayer().getName() + ' was sent to the penalty box'
		);
		this.getCurrentPlayer().setInPenaltyBox();
		this.NextPlayer();
		return true;
	}

	NextPlayer() {
		this.currentPlayerIndex++;
		if (this.currentPlayerIndex == this.players.length) {
			this.currentPlayerIndex = 0;
		}
	}

	wasCorrectlyAnswered() {
		let currentPlayer = this.getCurrentPlayer();
		let isPlayerInPenaltyBox = currentPlayer.isInPenaltyBox();
		let isGettingOutOfPenaltyBox = this.isGettingOutOfPenaltyBox;
		let winner;

		if (isPlayerInPenaltyBox) {
			if (isGettingOutOfPenaltyBox) {
				console.log('Answer was correct!!!!');
				currentPlayer.addPurse();
				console.log(
					`${currentPlayer.getName()} now has ${currentPlayer.getPurse()} Gold Coins.`
				);
			} else {
				console.log(
					`${currentPlayer.getName()} is not getting out of the penalty box`
				);
				this.NextPlayer();

				return true;
			}
		} else {
			console.log('Answer was correct!!!!');
			currentPlayer.addPurse();
			console.log(
				`${currentPlayer.getName()} now has ${currentPlayer.getPurse()} Gold Coins.`
			);
		}

		winner = this.didPlayerNotWin();
		this.NextPlayer();

		return winner;
	}
}
let notAWinner = false;

let game = new Game();

game.addPlayer('Chet');
game.addPlayer('Pat');
game.addPlayer('Sue');

do {
	game.roll(Math.floor(Math.random() * 6) + 1);

	if (Math.floor(Math.random() * 10) == 7) {
		notAWinner = game.wrongAnswer();
	} else {
		notAWinner = game.wasCorrectlyAnswered();
	}
} while (notAWinner);

module.exports = {
	Game
};
