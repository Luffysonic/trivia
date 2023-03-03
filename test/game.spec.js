const game = require('./src/game.js');

// describe('The test environment', function () {
// 	it('should pass', function () {
// 		expect(true).toBe(true);
// 	});

// 	it('should access game', function () {
// 		expect(Game).toBeDefined();
// 	});
// });

describe('Test Players', function () {
	it('Vérification que le joueur a été ajouté dans le tableau', function () {
		let players = new game.Players();
		let result = players.add('Sue');
		console.log(result);
		expect(result).toBe(true);
	});
});

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
