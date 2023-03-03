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

class IPlayers {
	add() {}
	howManyPlayers() {}
}
class Players extends IPlayers {
	constructor() {
		super();
		this.Players = [];
	}
	add(playerName) {
		this.Players.push(new Player(playerName));

		console.log(playerName + ' was added');
		console.log('They are player number ' + this.Players.length);

		return true;
	}

	howManyPlayers() {
		return players.length;
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
	constructor(){
		this.players = [];
		this.questions = new Questions()
	}
	isPlayable (howManyPlayers) {
		return howManyPlayers >= 2;
	};
	add(playerName) {
		let taille = this.players.length
		this.players.push(new Player(playerName));
		console.log(playerName + ' was added');
		console.log('They are player number ' + this.players.length);
		return taille+1 == this.players.length;
	}
	howManyPlayers() {
		return this.players.length;
	}
}
// let game = new Game();
// // let player = new Player("gab");
// // game.players.push(player);
// game.add("gab");
// console.log(game.players)
// console.log(game.players[0].getName())
// exports.Game = function () {
// 	var players = [];

// 	var popQuestions = new Array();
// 	var scienceQuestions = new Array();
// 	var sportsQuestions = new Array();
// 	var rockQuestions = new Array();

// 	var currentPlayer = 0;
// 	var isGettingOutOfPenaltyBox = false;

// 	var didPlayerWin = function () {
// 		return !(purses[currentPlayer] == 6);
// 	};

// 	var currentCategory = function () {
// 		let rankPlayer = places[currentPlayer];
// 		if (rankPlayer == 0 || rankPlayer == 4 || rankPlayer == 8) {
// 			return 'Pop';
// 		}
// 		if (rankPlayer == 1 || rankPlayer == 5 || rankPlayer == 9) {
// 			return 'Science';
// 		}
// 		if (rankPlayer == 2 || rankPlayer == 6 || rankPlayer == 10) {
// 			return 'Sports';
// 		}
// 		return 'Rock';
// 	};

// 	for (var i = 0; i < 50; i++) {
// 		popQuestions.push('Pop Question ' + i);
// 		scienceQuestions.push('Science Question ' + i);
// 		sportsQuestions.push('Sports Question ' + i);
// 		rockQuestions.push(Rock Question ' + i);
// 	}

// 	this.isPlayable = function (howManyPlayers) {
// 		return howManyPlayers >= 2;
// 	};

// 	this.add = function (playerName) {
// 		players.push(new Player(playerName));

// 		console.log(playerName + ' was added');
// 		console.log('They are player number ' + players.length);

// 		return true;
// 	};

// 	this.howManyPlayers = function () {
// 		return players.length;
// 	};

// 	var askQuestion = function () {
// 		if (currentCategory() == 'Pop') console.log(popQuestions.shift());
// 		if (currentCategory() == 'Science') console.log(scienceQuestions.shift());
// 		if (currentCategory() == 'Sports') console.log(sportsQuestions.shift());
// 		if (currentCategory() == 'Rock') console.log(rockQuestions.shift());
// 	};

// 	this.roll = function (roll) {
// 		console.log(players[currentPlayer] + ' is the current player');
// 		console.log('They have rolled a ' + roll);

// 		if (inPenaltyBox[currentPlayer]) {
// 			if (roll % 2 != 0) {
// 				isGettingOutOfPenaltyBox = true;

// 				console.log(
// 					players[currentPlayer] + ' is getting out of the penalty box'
// 				);
// 				places[currentPlayer] = places[currentPlayer] + roll;
// 				if (places[currentPlayer] > 11) {
// 					places[currentPlayer] = places[currentPlayer] - 12;
// 				}

// 				console.log(
// 					players[currentPlayer] +
// 						"'s new location is " +
// 						places[currentPlayer]
// 				);
// 				console.log('The category is ' + currentCategory());
// 				askQuestion();
// 			} else {
// 				console.log(
// 					players[currentPlayer] + ' is not getting out of the penalty box'
// 				);
// 				isGettingOutOfPenaltyBox = false;
// 			}
// 		} else {
// 			places[currentPlayer] = places[currentPlayer] + roll;
// 			if (places[currentPlayer] > 11) {
// 				places[currentPlayer] = places[currentPlayer] - 12;
// 			}

// 			console.log(
// 				players[currentPlayer] +
// 					"'s new location is " +
// 					places[currentPlayer]
// 			);
// 			console.log('The category is ' + currentCategory());
// 			askQuestion();
// 		}
// 	};

// 	this.wasCorrectlyAnswered = function () {
// 		if (inPenaltyBox[currentPlayer]) {
// 			if (isGettingOutOfPenaltyBox) {
// 				console.log('Answer was correct!!!!');
// 				purses[currentPlayer] += 1;
// 				console.log(
// 					players[currentPlayer] +
// 						' now has ' +
// 						purses[currentPlayer] +
// 						' Gold Coins.'
// 				);

// 				var winner = didPlayerWin();
// 				currentPlayer += 1;
// 				if (currentPlayer == players.length) currentPlayer = 0;

// 				return winner;
// 			} else {
// 				currentPlayer += 1;
// 				if (currentPlayer == players.length) currentPlayer = 0;
// 				return true;
// 			}
// 		} else {
// 			console.log('Answer was corrent!!!!');

// 			purses[currentPlayer] += 1;
// 			console.log(
// 				players[currentPlayer] +
// 					' now has ' +
// 					purses[currentPlayer] +
// 					' Gold Coins.'
// 			);

// 			var winner = didPlayerWin();

// 			currentPlayer += 1;
// 			if (currentPlayer == players.length) currentPlayer = 0;

// 			return winner;
// 		}
// 	};

// 	this.wrongAnswer = function () {
// 		console.log('Question was incorrectly answered');
// 		console.log(players[currentPlayer] + ' was sent to the penalty box');
// 		inPenaltyBox[currentPlayer] = true;

// 		currentPlayer += 1;
// 		if (currentPlayer == players.length) currentPlayer = 0;
// 		return true;
// 	};
// };

// var notAWinner = false;

// var game = new Game();

// game.add('Chet');
// game.add('Pat');
// game.add('Sue');

// do {
// 	game.roll(Math.floor(Math.random() * 6) + 1);

// 	if (Math.floor(Math.random() * 10) == 7) {
// 		notAWinner = game.wrongAnswer();
// 	} else {
// 		notAWinner = game.wasCorrectlyAnswered();
// 	}
// } while (notAWinner);

module.exports = {
	Player,
	Players,
	Questions,
	Game
};
