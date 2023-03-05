const game = require('../src/game.js');
const questions = require('../src/questions');
const player = require('../src/player');
const Category = require('../src/category');

describe('The test environment', function () {
	it('should pass', function () {
		expect(true).toBe(true);
	});

	it('should access game', function () {
		expect(game).toBeDefined();
	});
});

describe('Test player', function () {
	it('Vérification de getName', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		let playerName = joueur.getName();
		//Assert
		expect(playerName).toBe('Ricky');
	});

	it('Vérification de getPlace', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		let playerPlace = joueur.getPlace();
		//Assert
		expect(playerPlace).toBe(0);
	});

	it('Vérification de setPlace', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		joueur.setPlace(5);
		let playerPlace = joueur.place;
		//Assert
		expect(playerPlace).toBe(5);
	});

	it('Vérification de getPurse', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		let playerPurse = joueur.getPurse();
		//Assert
		expect(playerPurse).toBe(0);
	});

	it('Vérification de setPurse', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		joueur.setPurse(5);
		let playerPurse = joueur.purse;
		//Assert
		expect(playerPurse).toBe(5);
	});

	it('Vérification de addPurse', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		joueur.addPurse();
		let playerPurse = joueur.purse;
		//Assert
		expect(playerPurse).toBe(1);
	});

	it('Vérification de isInPenaltyBox', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act

		let isInPenaltyBox = joueur.isInPenaltyBox();
		//Assert
		expect(isInPenaltyBox).toBe(false);
	});

	it('Vérification de setInPenaltyBox', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		joueur.setInPenaltyBox();
		let isInPenaltyBox = joueur.inPenaltyBox;
		//Assert
		expect(isInPenaltyBox).toBe(true);
	});

	it('Vérification de releaseFromPenaltyBox', function () {
		//Arrage
		let joueur = new player.Player('Ricky');
		//Act
		joueur.releaseFromPenaltyBox();
		let isInPenaltyBox = joueur.inPenaltyBox;
		//Assert
		expect(isInPenaltyBox).toBe(false);
	});
});

describe('Test Category', function () {
	it('Vérification de la création de la catégorie', function () {
		//Arrage
		let categorie = new Category.Category('Geography', 10);
		//Act
		let categorieName = categorie.name;
		//Assert
		expect(categorieName).toBe('Geography');
	});

	it('Vérification de getQuestion', function () {
		//Arrage
		let categorie = new Category.Category('Geography', 10);
		//Act
		let Question = categorie.getQuestion();
		//Assert
		let result_expected = 'Geography Question 0';
		expect(Question).toBe(result_expected);
	});
});

describe('Test Questions', function () {
	it('Implementation de currentCategory avec un player avec place = 0', function () {
		//Arrage
		let joueur = new player.Player('Sue');
		let question = new questions.Questions();
		//Act
		let CurrentCategoryName = question.currentCategoryName(joueur);
		//Assert
		expect(CurrentCategoryName).toBe('Pop');
	});

	it('Implementation de currentCategory avec un player avec place = 1', function () {
		//Arrange
		let joueur = new player.Player('Sue');
		joueur.setPlace(1);
		let question = new questions.Questions();
		//Act
		let CurrentCategoryName = question.currentCategoryName(joueur);
		//Assert
		expect(CurrentCategoryName).toBe('Science');
	});

	it('Implementation de currentCategory avec un player avec place = 6', function () {
		//Arrange
		let joueur = new player.Player('Sue');
		joueur.setPlace(6);
		let question = new questions.Questions();
		//Act
		let CurrentCategoryName = question.currentCategoryName(joueur);
		//Assert
		expect(CurrentCategoryName).toBe('Sports');
	});

	it('Implementation de currentCategory avec un player avec place = 3', function () {
		//Arrange
		let joueur = new player.Player('Sue');
		joueur.setPlace(3);
		let question = new questions.Questions();
		//Act
		let CurrentCategoryName = question.currentCategoryName(joueur);
		//Assert
		expect(CurrentCategoryName).toBe('Rock');
	});
});

describe('Test Game', function () {
	it('Vérification que le jeu ajoute bien un joueur', function () {
		//Arrange
		let gametest = new game.Game();
		//Act
		let result = gametest.addPlayer('Gabriel');
		//Assert
		expect(result).toBe(true);
	});

	it('Vérification que le jeu est jouable', function () {
		//Arrange
		let gametest = new game.Game();
		//Act
		gametest.addPlayer('Gabriel');
		gametest.addPlayer('Ricky');
		let result = gametest.isPlayable();
		//Assert
		expect(result).toBe(true);
	});
	it("Vérification que le jeu n'est pas jouable", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		//Act
		let result = gametest.isPlayable();
		//Assert
		expect(result).toBe(false);
	});

	it('Vérification que le jeu autorise un joueur à quiter la penalty Zone', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.players[0].inPenaltyBox = true;
		//Act
		gametest.determineifPlayerisGettingOutOfPenaltyBox(3);
		let result = gametest.players[0].inPenaltyBox;
		//Assert
		expect(result).toBe(false);
	});

	it("Vérification que le jeu n'autorise pas un joueur à quitter la penalty Zone", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.players[0].inPenaltyBox = true;
		//Act
		gametest.determineifPlayerisGettingOutOfPenaltyBox(2);
		let result = (gametest.players[0].inPenaltyBox = true);
		//Assert
		expect(result).toBe(true);
	});

	it('Vérification que le jeu autorise un joueur à quitter la penalty Zone et à avancer', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.players[0].inPenaltyBox = true;
		//Act
		gametest.determineifPlayerisGettingOutOfPenaltyBox(3);
		let avancement = gametest.getCurrentPlayerPlace();
		//Assert
		expect(avancement).toBe(3);
	});

	it('Vérification que le la maj de la position du joueur est bien effectué', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		//Act
		gametest.updatePlayerPosition(3);
		//Assert
		let result = gametest.getCurrentPlayerPlace();
		expect(result).toBe(3);
	});

	it('Vérification que le la maj de la position du joueur est bien effectué cas spécial >11 ici 16', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		//Act
		gametest.setCurrentPlayerPlace(10);
		gametest.updatePlayerPosition(6);
		//Assert
		let result = gametest.getCurrentPlayerPlace();
		expect(result).toBe(4);
	});

	it('Vérification que le roll avec un joueur en penalty box mais y reste', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		//Act
		gametest.roll(2);
		//Assert
		let place = gametest.getCurrentPlayerPlace();
		expect(place).toBe(0);
	});

	it('Vérification que le roll avec un joueur en penalty box mais y sort', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().isInPenaltyBox;
		//Act
		gametest.roll(5);
		//assert
		let inPenaltyBox = gametest.getCurrentPlayer().isInPenaltyBox();
		let place = gametest.getCurrentPlayerPlace();
		expect(inPenaltyBox).toBe(false);
		expect(place).toBe(5);
	});

	it('Vérification que le roll avec un joueur qui roll a une catégorie Pop', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		//Act
		gametest.roll(0);
		category = gametest.getCategory();
		//Assert
		expect(category).toBe('Pop');
	});

	it('Vérification que le roll avec un joueur qui roll a une catégorie Science', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		//Act
		gametest.roll(5);
		//Assert
		category = gametest.getCategory();
		expect(category).toBe('Science');
	});

	it('Vérification que le roll avec un joueur qui roll a une catégorie Sports', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		//Act
		gametest.roll(10);
		//Assert
		category = gametest.getCategory();
		expect(category).toBe('Sports');
	});

	it('Vérification que le roll avec un joueur qui roll a une catégorie Rock', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		//Act
		gametest.roll(3);
		//Assert
		category = gametest.getCategory();
		expect(category).toBe('Rock');
	});

	it('Vérification que le joueur a gagné à 6 purses', function () {
		//arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(6);
		//Act
		let NotWin = gametest.didPlayerNotWin();
		//Assert
		expect(NotWin).toBe(false);
	});
	it("Vérification que le joueur n'a pas gagné à 4 purses", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(4);
		//Act
		let NotWin = gametest.didPlayerNotWin();
		//Assert
		expect(NotWin).toBe(true);
	});

	it('Vérification que si le joueur a mal répondu envoie dans penaltyBox', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		//Act
		gametest.wrongAnswer();
		//Assert
		let inPenaltyBox = gametest.players[0].isInPenaltyBox();
		expect(inPenaltyBox).toBe(true);
	});

	it('Vérification que que game passe au prochain joueur', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		//Act
		gametest.NextPlayer();
		//Assert
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Gabriel');
	});

	it('Vérification que que game passe au prochain joueur cas dernier joueur', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.currentPlayerIndex = 1;
		//Act
		gametest.NextPlayer();
		//Assert
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Ricky');
	});

	it('Vérification que si le joueur a mal répondu on passe au prochain joueur', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		//Act
		gametest.wrongAnswer();
		//Assert
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Gabriel');
	});

	it("Vérification si le joueur est dans la penalty box et qu'il est en train de sortir de la penalty box répond correctement +1 coins", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = true;
		//Act
		gametest.wasCorrectlyAnswered();
		//Assert
		let currentPlayerCoin = gametest.players[0].purse;
		expect(currentPlayerCoin).toBe(1);
	});

	it("Vérification si le joueur est dans la penalty box et qu'il n' est pas en train de sortir de la penalty box répond correctement on passe", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = false;
		//Act
		gametest.wasCorrectlyAnswered();
		//Assert
		let currentPlayerName = gametest.getCurrentPlayer().getName();
		expect(currentPlayerName).toBe('Gabriel');
	});

	it("Vérification si le joueur est dans la penalty box et qu'il n' est pas en train de sortir de la penalty box répond correctement il n'a pas de coin supplémentaire", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = false;
		//Act
		gametest.wasCorrectlyAnswered();
		//Assert
		let PreceedPlayerCoin = gametest.players[0].getPurse();
		expect(PreceedPlayerCoin).toBe(0);
	});

	it("Vérification si le joueur est dans la penalty box et qu'il est en train de sortir de la penalty box répond correctement et a gagné", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = false;
		gametest.getCurrentPlayer().setPurse(5);
		//Act
		let Win = gametest.wasCorrectlyAnswered();
		//Assert
		expect(Win).toBe(true);
	});

	it("Vérification si le joueur est dans la penalty box et qu'il est en train de sortir de la penalty box répond correctement et n'a pas gagné", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setInPenaltyBox();
		gametest.isGettingOutOfPenaltyBox = true;
		gametest.getCurrentPlayer().setPurse(3);
		//Act
		let NotWin = gametest.wasCorrectlyAnswered();
		//Assert
		expect(NotWin).toBe(true);
	});

	it("Vérification si le joueur répond correctement mais n'a pas encore gagné", function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(3);
		//Act
		let NotWin = gametest.wasCorrectlyAnswered();
		//Assert
		expect(NotWin).toBe(true);
	});

	it('Vérification si le joueur répond correctement mais a gagné', function () {
		//Arrange
		let gametest = new game.Game();
		gametest.addPlayer('Ricky');
		gametest.addPlayer('Gabriel');
		gametest.getCurrentPlayer().setPurse(5);
		//Act
		let NotWin = gametest.wasCorrectlyAnswered();
		//Assert
		expect(NotWin).toBe(false);
	});
});
