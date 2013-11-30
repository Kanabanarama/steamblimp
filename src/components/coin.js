Crafty.c('Coin', {
	init: function () {
		this.requires('GameObject, Collision, coin_cog');
		this.attr({w: 20, h: 20});

		this.onHit('Player', function () {
			this.destroy();
		});
	}
});