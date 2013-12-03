Crafty.c('Score', {

	score: 0,

	init: function () {
		this.requires('2D, Canvas, Text')
			.textFont({size: '20px', family: 'Georgia, serif'})
			.text('Money: ' + this.score);
	},

	add: function (amount) {
		this.score += amount;
		this.text('Money: ' + this.score);
	}
});