Crafty.c('Score', {

	score: 0,

	init: function () {
		this.requires('2D, Persist, Canvas, Text')
			.attr({x: 15, y: 15})
			.textFont({size: '20px', family: 'Georgia, serif'})
			.text('Money: ' + this.score);
	},

	add: function (amount) {
		this.score += amount;
		this.text('Money: ' + this.score);
	}
});