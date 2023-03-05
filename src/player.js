class IPlayer {
	getName() {}
	getPlace() {}
	setPlace(place) {}
	getPurse() {}
	setPurse(purse) {}
	addPurse() {}
	isInPenaltyBox() {}
	setInPenaltyBox() {}
	releaseFromPenaltyBox() {}
}
class Player extends IPlayer {
	constructor(PlayerName) {
		super();
		this.playerName = PlayerName;
		this.place = 0;
		this.purse = 0;
		this.inPenaltyBox = false;
	}
	getName() {
		return this.playerName;
	}
	getPlace() {
		return this.place;
	}
	setPlace(place) {
		this.place = place;
	}
	getPurse() {
		return this.purse;
	}
	addPurse() {
		this.purse++;
	}
	setPurse(purse) {
		this.purse = purse;
	}
	isInPenaltyBox() {
		return this.inPenaltyBox;
	}
	setInPenaltyBox() {
		this.inPenaltyBox = true;
	}
	releaseFromPenaltyBox() {
		this.inPenaltyBox = false;
	}
}

module.exports = {
	IPlayer,
	Player
};
