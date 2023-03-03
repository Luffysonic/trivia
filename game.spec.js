const game = require('./game.js');

// describe('The test environment', function () {
// 	it('should pass', function () {
// 		expect(true).toBe(true);
// 	});

// 	it('should access game', function () {
// 		expect(Game).toBeDefined();
// 	});
// });

describe('Test Player', function () {
	it('Vérification que le joueur a gagné', () => {
		let joueur = new game.Player('Sue');
		joueur.purse = 6;

		expect(joueur.didPlayerWin()).toBe(true);
	});
	it("Vérification que le joueur n'a pas encore gagné", () => {
		let joueur = new game.Player('Sue');
		joueur.purse = 4;

		expect(joueur.didPlayerWin()).toBe(false);
	});
});
describe('Test Players', function () {
	it('Vérification que le joueur a été ajouté dans le tableau', function () {
		let players = new game.Players();
		let result = players.add('Sue');
		console.log(result);
		expect(result).toBe(true);
	});
});
