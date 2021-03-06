Crafty.c('Item', {
	init: function () {
		this.requires('GameObject, Collision');

		var item = this;
		this.onHit('Player', function () {
			if(typeof this.pickupSound !== 'undefined') {
				Crafty.audio.play(this.pickupSound);
			}
			if(typeof this.particleOptions !== 'undefined') {
				Crafty.e("Particle").setParticles(this.particleOptions).attr({x: this.x, y: this.y });
			}
			item.destroy();
		});

		var removeInvisibleItem = function () {
			item.attr({x: item.x - 1});

			if (!item.withinViewPort()) {
				item.unbind('EnterFrame', removeInvisibleItem);
				item.destroy();
			}
		};
		item.bind('EnterFrame', removeInvisibleItem);
	}
});