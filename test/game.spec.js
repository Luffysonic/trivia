const game = require('../src/game.js');
const questions = require('../src/questions');
const player = require('../src/player');

describe('The test environment', function () {
	it('should pass', function () {
		expect(true).toBe(true);
	});

	it('should access game', function () {
		expect(game).toBeDefined();
	});
});

describe('Test Questions', function () {
	it('Implementation de currentCategory avec un player avec place = 0', function () {
		let joueur = new player.Player('Sue');
		let question = new questions.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Pop');
	});
	it('Implementation de currentCategory avec un player avec place = 1', function () {
		let joueur = new player.Player('Sue');
		joueur.setPlace(1);
		let question = new questions.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Science');
	});
	it('Implementation de currentCategory avec un player avec place = 6', function () {
		let joueur = new player.Player('Sue');
		joueur.setPlace(6);
		let question = new questions.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Sports');
	});
	it('Implementation de currentCategory avec un player avec place = 3', function () {
		let joueur = new player.Player('Sue');
		joueur.setPlace(3);
		let question = new questions.Questions();
		let result = question.currentCategory(joueur);
		expect(result).toBe('Rock');
	});
});

describe('Test Game', function () {
	it('Vérification que le jeu ajoute bien un joueur', function () {
		let gametest = new game.Game();
		let result = gametest.addPlayer('Gabriel');
		expect(result).toBe(true);
	});
	it('Vérification que le jeu est jouable', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.addPlayer('Ricky');
		let result = gametest.isPlayable();
		expect(result).toBe(true);
	});
	it("Vérification que le jeu n'est pas jouable", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');

		let result = gametest.isPlayable();
		expect(result).toBe(false);
	});

	it('Vérification que le jeu autorise un joueur à quiter la penalty Zone', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.players[0].setInPenaltyBox();
		gametest.determineifPlayerisGettingOutOfPenaltyBox(3);
		let result = gametest.getCurrentPlayer().isInPenaltyBox();
		expect(result).toBe(false);
	});
	it("Vérification que le jeu n'autorise pas un joueur à quitter la penalty Zone", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.players[0].setInPenaltyBox();
		gametest.determineifPlayerisGettingOutOfPenaltyBox(2);
		let result = gametest.getCurrentPlayer().isInPenaltyBox();
		expect(result).toBe(true);
	});
	it('Vérification que le jeu autorise un joueur à quitter la penalty Zone et à avancer', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.players[0].setInPenaltyBox();
		gametest.determineifPlayerisGettingOutOfPenaltyBox(3);
		let result = gametest.getCurrentPlayer().isInPenaltyBox();
		let avancement = gametest.getCurrentPlayerPlace();
		expect(result).toBe(false);
		expect(avancement).toBe(3);
	});
	it('Vérification que le la maj de la position du joueur est bien effectué', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.updatePlayerPosition(3);
		let result = gametest.getCurrentPlayerPlace();
		expect(result).toBe(3);
	});
	it('Vérification que le la maj de la position du joueur est bien effectué cas spécial >11 ici 16', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.setCurrentPlayerPlace(10);
		gametest.updatePlayerPosition(6);
		let result = gametest.getCurrentPlayerPlace();
		expect(result).toBe(4);
	});
	it('Vérification que le roll avec un joueur en penalty box mais y reste', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.roll(2);
		let inPenaltyBox = gametest.getCurrentPlayer().isInPenaltyBox();
		let place = gametest.getCurrentPlayerPlace();
		expect(inPenaltyBox).toBe(true);
		expect(place).toBe(0);
	});
	it('Vérification que le roll avec un joueur en penalty box mais y sort', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.roll(5);
		let inPenaltyBox = gametest.getCurrentPlayer().isInPenaltyBox();
		let place = gametest.getCurrentPlayerPlace();
		expect(inPenaltyBox).toBe(false);
		expect(place).toBe(5);
	});
	it('Vérification que le roll avec un joueur qui roll a une catégorie Pop', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.roll(0);
		category = gametest.getCategory();
		expect(category).toBe('Pop');
	});
	it('Vérification que le roll avec un joueur qui roll a une catégorie Science', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.roll(5);
		category = gametest.getCategory();
		expect(category).toBe('Science');
	});
	it('Vérification que le roll avec un joueur qui roll a une catégorie Sports', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.roll(10);
		category = gametest.getCategory();
		expect(category).toBe('Sports');
	});
	it('Vérification que le roll avec un joueur qui roll a une catégorie Rock', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.roll(3);
		category = gametest.getCategory();
		expect(category).toBe('Rock');
	});
	it('Vérification que le joueur a gagné à 6 purses', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(6);
		let NotWin = gametest.didPlayerNotWin();
		expect(NotWin).toBe(false);
	});
	it("Vérification que le joueur n'a pas gagné à 4 purses", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(4);
		let NotWin = gametest.didPlayerNotWin();
		expect(NotWin).toBe(true);
	});

	it('Vérification que si le joueur a mal répondu envoie dans penaltyBox', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.wrongAnswer();
		let inPenaltyBox = gametest.players[0].isInPenaltyBox();
		expect(inPenaltyBox).toBe(true);
	});

	it('Vérification que si le joueur a mal répondu envoie dans penaltyBox ', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.currentPlayerIndex = 1;
		gametest.wrongAnswer();
		let inPenaltyBox = gametest.players[1].isInPenaltyBox();
		expect(inPenaltyBox).toBe(true);
	});

	it('Vérification que que game passe au prochain joueur', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.NextPlayer();
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Gabriel');
	});

	it('Vérification que que game passe au prochain joueur cas dernier joueur', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.currentPlayerIndex = 1;
		gametest.NextPlayer();
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Ricky');
	});

	it('Vérification que si le joueur a mal répondu on passe au prochain joueur', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.wrongAnswer();
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Gabriel');
	});

	it("Vérification si le joueur est dans la penalty box et qu'il est en train de sortir de la penalty box répond correctement +1 coins", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = true;
		gametest.wasCorrectlyAnswered();
		let currentPlayerCoin = gametest.getCurrentPlayer().getPurse();
		expect(currentPlayerCoin).toBe(1);
	});

	it("Vérification si le joueur est dans la penalty box et qu'il n' est pas en train de sortir de la penalty box répond correctement on passe", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = false;
		gametest.wasCorrectlyAnswered();
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Gabriel');
	});

	it("Vérification si le joueur est dans la penalty box et qu'il n' est pas en train de sortir de la penalty box répond correctement il n'a pas de coin supplémentaire", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = false;
		gametest.wasCorrectlyAnswered();
		let PreceedPlayerCoin = gametest.players[0].getPurse();
		expect(PreceedPlayerCoin).toBe(0);
	});

	it("Vérification si le joueur est dans la penalty box et qu'il est en train de sortir de la penalty box répond correctement et a gagné", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = false;
		gametest.getCurrentPlayer().setPurse(5);
		let Win = gametest.wasCorrectlyAnswered();

		expect(Win).toBe(true);
	});

	it("Vérification si le joueur est dans la penalty box et qu'il est en train de sortir de la penalty box répond correctement et n'a pas gagné", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = true;
		gametest.getCurrentPlayer().setPurse(3);
		let NotWin = gametest.wasCorrectlyAnswered();

		expect(NotWin).toBe(true);
	});

	it("Vérification si le joueur répond correctement mais n'a pas encore gagné", function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(3);
		let NotWin = gametest.wasCorrectlyAnswered();

		expect(NotWin).toBe(true);
	});

	it('Vérification si le joueur répond correctement mais a gagné', function () {
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(5);
		let NotWin = gametest.wasCorrectlyAnswered();

		expect(NotWin).toBe(false);
	});
});
