Crafty.c('Item', {
	init: function () {
		this.requires('GameObject, Collision');

		var item = this;
		this.onHit('Player', function () {
			Crafty.audio.play(this.pickupSound);
			if(this.particleOptions) {
				Crafty.e("Particle").setParticles(this.particleOptions).attr({x: this.x, y: this.y });
			}
			item.destroy();
		});

		var removeInvisibleItem = function () {
			if (!item.withinViewPort()) {
				item.unbind('EnterFrame', removeInvisibleItem);
				item.destroy();
			}
		};
		item.bind('EnterFrame', removeInvisibleItem);
	}
});