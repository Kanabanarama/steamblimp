Crafty.c('Coin', {
	init: function () {
		this.requires('GameObject, Color, Collision');
		this.color('gold');
		this.attr({w: 20, h: 20});

		this.onHit('Player', function () {
			this.destroy();
		});
	}
});