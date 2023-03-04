exports = typeof window !== 'undefined' && window !== null ? window : global;

class IPlayer {
	getName() {}
	getPlace() {}
	setPlace(place) {}
	getPurse() {}
	setPurse(purse) {}
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

	askQuestion() {
		if (this.currentCategory() == 'Pop') console.log(popQuestions.shift());
		if (this.currentCategory() == 'Science')
			console.log(scienceQuestions.shift());
		if (this.currentCategory() == 'Sports')
			console.log(sportsQuestions.shift());
		if (this.currentCategory() == 'Rock') console.log(rockQuestions.shift());
	}
}

class Game {
	constructor() {
		this.players = [];
		this.questions = new Questions();
	}
	currentPlayerIndex = 0;
	purses = [];

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

	determineifPlayerisGettingOutOfPenaltyBox(roll) {
		if (roll % 2 != 0) {
			this.getCurrentPlayer().releaseFromPenaltyBox();
			console.log(
				`${this.getCurrentPlayer().getName()}` +
					' is getting out of the penalty box'
			);
		} else {
			`${this.getCurrentPlayer().getName()}` +
				' is not getting out of the penalty box';
		}
	}

	updatePlayerPosition(roll) {
		let currentPlayerPlace = this.getCurrentPlayerPlace();
		currentPlayerPlace += roll;
		console.log(currentPlayerPlace);
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

	roll(roll) {
		console.log(`${this.getCurrentPlayer().getName()} is the current player`);
		console.log('They have rolled a ' + roll);
		if (this.getCurrentPlayer().isInPenaltyBox()) {
			this.determineifPlayerisGettingOutOfPenaltyBox(roll);
		}
	}
}

let game = new Game();
game.add('Gabriel');
game.players[0].setInPenaltyBox();
game.updatePlayerPosition(3);
module.exports = {
	Player,
	Questions,
	Game
};
