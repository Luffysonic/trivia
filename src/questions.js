const category = require('./category');
class IQuestions {
	currentCategory(player) {}
	createQuestions() {}
	askQuestion() {}
}
class Questions extends IQuestions {
	constructor() {
		super();
		this.categories = [
			new category.Category('Pop', 50),
			new category.Category('Science', 50),
			new category.Category('Sports', 50),
			new category.Category('Rock', 50)
		];
	}

	currentCategory(player) {
		return this.categories[player.getPlace() % this.categories.length];
	}

	currentCategoryName(player) {
		return this.categories[
			player.getPlace() % this.categories.length
		].getName();
	}

	askQuestion(player) {
		const category = this.currentCategory(player);
		console.log(category.getQuestion());
	}
}

module.exports = {
	Questions,
	IQuestions
};
