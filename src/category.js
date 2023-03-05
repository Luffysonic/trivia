class ICategory {
	createQuestions(count) {}
	getQuestion() {}
	getName() {}
}

class Category extends ICategory {
	constructor(name, count) {
		super();
		this.name = name;
		this.questions = [];
		this.createQuestions(count);
	}

	createQuestions(count) {
		for (let i = 0; i < count; i++) {
			this.questions.push(`${this.name} Question ${i}`);
		}
	}

	getQuestion() {
		return this.questions.shift();
	}
	getName() {
		return this.name;
	}
}

module.exports = { Category };
