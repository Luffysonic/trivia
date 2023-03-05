const Game = require('./game');
let notAWinner = false;

let game = new Game.Game();

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
