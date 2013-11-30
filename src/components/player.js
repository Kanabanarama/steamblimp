Crafty.c('Player', {
	width: 50,
	height: 84,
	coins: 0,

	init: function () {
		var player = this;

		this.requires('GameObject, Controls, Collision');

		this.fourway(5);

		this.attr({ w: this.width, h: this.height });

		this.attachSprites();

		this.bind('EnterFrame', this.driftForward);

		this.onHit('Coin', function () {
			player.coins++;
			console.debug('Money: ' + player.coins);
		});
	},

	driftForward: function () {
		this.attr({ 'x': this.x + 1 });
	},

	attachSprites: function () {
		this.gun = Crafty
			.e('Gun_1')
			.attr({x: this.x + 20, y: this.y + 65});

		this.base = Crafty
			.e('2D, Canvas, blimp_base_01')
			.attr({x: this.x, y: this.y, w: this.width, h: this.height});

		this.drive = Crafty
			.e('2D, Canvas, blimp_drive_01')
			.attr({x: this.x, y: this.y, w: this.width, h: this.height});

		this.attach(this.drive);
		this.attach(this.base);
		this.attach(this.gun);
	}
});