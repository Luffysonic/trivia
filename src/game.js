exports = typeof window !== 'undefined' && window !== null ? window : global;

class IPlayer {
	getName() {}
	getPlace() {}
	setPlace(place) {}
	getPurse() {}
	setPurse(purse) {}
	addPurse() {}
	isInPenaltyBox() {}
	setInPenaltyBox() {}
	releaseFromPenaltyBox() {}
}
class Player extends IPlayer {
	constructor(PlayerName) {
		super();
		this.playerName = PlayerName;
		this.place = 0;
		this.purse = 0;
		this.inPenaltyBox = false;
	}
	getName() {
		return this.playerName;
	}
	getPlace() {
		return this.place;
	}
	setPlace(place) {
		this.place = place;
	}
	getPurse() {
		return this.purse;
	}
	addPurse() {
		this.purse++;
	}
	setPurse(purse) {
		this.purse = purse;
	}
	isInPenaltyBox() {
		return this.inPenaltyBox;
	}
	setInPenaltyBox() {
		this.inPenaltyBox = true;
	}
	releaseFromPenaltyBox() {
		this.inPenaltyBox = false;
	}
}

class IQuestions {
	currentCategory(player) {}
	createQuestions() {}
	askQuestion() {}
}
class Questions extends IQuestions {
	popQuestions = [];
	rockQuestions = [];
	scienceQuestions = [];
	sportsQuestions = [];
	constructor() {
		super();
		this.createQuestions();
	}

	currentCategory(player) {
		const categories = ['Pop', 'Science', 'Sports', 'Rock'];
		return categories[player.getPlace() % 4];
	}

	createQuestions() {
		for (let i = 0; i < 50; i++) {
			this.popQuestions.push('Pop Question ' + i);
			this.scienceQuestions.push('Science Question ' + i);
			this.sportsQuestions.push('Sports Question ' + i);
			this.rockQuestions.push('Rock Question ' + i);
		}
	}

	askQuestion(player) {
		if (this.currentCategory(player) == 'Pop')
			console.log(this.popQuestions.shift());
		if (this.currentCategory(player) == 'Science')
			console.log(this.scienceQuestions.shift());
		if (this.currentCategory(player) == 'Sports')
			console.log(this.sportsQuestions.shift());
		if (this.currentCategory(player) == 'Rock')
			console.log(this.rockQuestions.shift());
	}
}

class Game {
	constructor() {
		this.players = [];
		this.questions = new Questions();
	}
	currentPlayerIndex = 0;
	purses = [];
	winningCondition = 6;
	isGettingOutOfPenaltyBox = false;

	isPlayable() {
		return this.howManyPlayers() >= 2;
	}

	add(playerName) {
		let PlayerNumber = this.players.length;
		this.players.push(new Player(playerName));
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
		return this.questions.currentCategory(this.getCurrentPlayer());
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

	didPlayerWin() {
		return this.getCurrentPlayerPurse() === this.winningCondition;
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
		let winner;
		if (this.getCurrentPlayer().isInPenaltyBox()) {
			if (this.isGettingOutOfPenaltyBox) {
				console.log('Answer was correct!!!!');
				this.getCurrentPlayer().addPurse();
				console.log(
					`${this.getCurrentPlayer().getName()} now has ${this.getCurrentPlayer().getPurse()} Gold Coins.`
				);
				winner = this.didPlayerWin();
				this.NextPlayer();
				return winner;
			} else {
				this.NextPlayer();
				return true;
			}
		} else {
			console.log('Answer was correct!!!!');
			this.getCurrentPlayer().addPurse();
			console.log(
				`${this.getCurrentPlayer().getName()} now has ${this.getCurrentPlayer().getPurse()} Gold Coins.`
			);
			winner = this.didPlayerWin();
			this.NextPlayer();
			return winner;
		}
	}
}
let game = new Game();

game.add('Ricky');
game.add('Gabriel');
game.getCurrentPlayer().setInPenaltyBox();
game.isGettingOutOfPenaltyBox = true;
game.wasCorrectlyAnswered();
console.log(game.players[0].getPurse());

module.exports = {
	Player,
	Questions,
	Game
};
