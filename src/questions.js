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
module.exports = {
	Questions,
	IQuestions
};
