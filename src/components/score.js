Crafty.c('Score', {

	score: 0,

	init: function () {
		this.requires('2D, Canvas, Text');
		this.text('Money: ' + this.score);

		this.bind('EnterFrame', function () {
			this.attr({x: this.x + 1 });
		});
	},

	add: function (amount) {
		this.score += amount;
		this.text('Money: ' + this.score);
	}
});