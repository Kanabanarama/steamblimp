Crafty.c('Score', {

	score: { coins: 0 },

	init: function () {
		this.requires('2D, Persist, Canvas, Text')
			.attr({x: 15, y: 15})
			.textFont({size: '20px', family: 'Georgia, serif'})
			.text('Money: ' + this.score.coins);
	},

	add: function (amount) {
		this.score.coins += amount;
		this.text('Money: ' + this.score.coins);
	},

	get: function () {
		return this.score.coins;
	}
});