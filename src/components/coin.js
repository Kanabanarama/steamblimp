Crafty.c('Coin', {
	init: function () {
		this.requires('GameObject, Collision, Tween, coin_cog');
		this.attr({w: 20, h: 20});

		Crafty.audio.add('coin_pickup', 'assets/coin_pickup.ogg');

		this.tween({
			rotation: 3
		}, -1).origin('center');

		this.onHit('Player', function () {
			Crafty.audio.play('coin_pickup');
			this.destroy();
		});
	}
});