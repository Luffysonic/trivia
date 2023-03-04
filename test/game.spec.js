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
		joueur.setPlace(1);
		let question = new game.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Science');
	});
	it('Implementation de currentCategory avec un player avec place = 6', function () {
		let joueur = new game.Player('Sue');
		joueur.setPlace(6);
		let question = new game.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Sports');
	});
	it('Implementation de currentCategory avec un player avec place = 3', function () {
		let joueur = new game.Player('Sue');
		joueur.setPlace(3);
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

	it('Vérification que le jeu autorise un joueur à quiter la penalty Zone', function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.players[0].setInPenaltyBox();
		gametest.determineifPlayerisGettingOutOfPenaltyBox(3);
		let result = gametest.getCurrentPlayer().isInPenaltyBox();
		expect(result).toBe(false);
	});
	it("Vérification que le jeu n'autorise pas un joueur à quitter la penalty Zone", function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.players[0].setInPenaltyBox();
		gametest.determineifPlayerisGettingOutOfPenaltyBox(2);
		let result = gametest.getCurrentPlayer().isInPenaltyBox();
		expect(result).toBe(true);
	});
	it('Vérification que le jeu autorise un joueur à quitter la penalty Zone et à avancer', function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.players[0].setInPenaltyBox();
		gametest.determineifPlayerisGettingOutOfPenaltyBox(3);
		let result = gametest.getCurrentPlayer().isInPenaltyBox();
		let avancement = gametest.getCurrentPlayerPlace();
		expect(result).toBe(false);
		expect(avancement).toBe(3);
	});
	it('Vérification que le la maj de la position du joueur est bien effectué', function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.updatePlayerPosition(3);
		let result = gametest.getCurrentPlayerPlace();
		expect(result).toBe(3);
	});
	it('Vérification que le la maj de la position du joueur est bien effectué cas spécial >11 ici 16', function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.setCurrentPlayerPlace(10);
		gametest.updatePlayerPosition(6);
		let result = gametest.getCurrentPlayerPlace();
		expect(result).toBe(4);
	});
	it('Vérification que le roll avec un joueur en penalty box mais y reste', function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.roll(2);
		let inPenaltyBox = gametest.getCurrentPlayer().isInPenaltyBox();
		let place = gametest.getCurrentPlayerPlace();
		expect(inPenaltyBox).toBe(true);
		expect(place).toBe(0);
	});
	it('Vérification que le roll avec un joueur en penalty box mais y sort', function () {
		let gametest = new game.Game();
		gametest.add('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.roll(5);
		let inPenaltyBox = gametest.getCurrentPlayer().isInPenaltyBox();
		let place = gametest.getCurrentPlayerPlace();
		expect(inPenaltyBox).toBe(false);
		expect(place).toBe(5);
	});
});
