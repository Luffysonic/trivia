const game = require('../src/game.js');

// describe('The test environment', function () {
// 	it('should pass', function () {
// 		expect(true).toBe(true);
// 	});

// 	it('should access game', function () {
// 		expect(Game).toBeDefined();
// 	});
// });

describe('Test Questions', function () {
	it('Implementation de currentCategory avec un player avec place = 0', function () {
		let joueur = new game.Player('Sue');
		let question = new game.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Pop');
	});
	it('Implementation de currentCategory avec un player avec place = 1', function () {
		let joueur = new game.Player('Sue');
		joueur.place = 1;
		let question = new game.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Science');
	});
	it('Implementation de currentCategory avec un player avec place = 6', function () {
		let joueur = new game.Player('Sue');
		joueur.place = 6;
		let question = new game.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Sports');
	});
	it('Implementation de currentCategory avec un player avec place = 3', function () {
		let joueur = new game.Player('Sue');
		joueur.place = 3;
		let question = new game.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Rock');
	});
});
describe('Test Game', function () {
	it('Vérification que le jeu ajoute bien un joueur', function () {
		let gametest = new game.Game();
		let result = gametest.add('Gabriel');
		expect(result).toBe(true);
	});
	it('Vérification que le jeu est jouable', function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.add('Ricky');
		let result = gametest.isPlayable();
		expect(result).toBe(true);
	});
	it("Vérification que le jeu n'est pas jouable", function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');

		let result = gametest.isPlayable();
		expect(result).toBe(false);
	});
});
