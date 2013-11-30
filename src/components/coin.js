Crafty.c('Coin', {
	init: function () {
		this.requires('GameObject, Collision, Tween, coin_cog');
		this.attr({w: 20, h: 20});

		Crafty.audio.add('coin_pickup', 'assets/coin_pickup.ogg');

		this.tween({
			rotation: 3
		}, -1).origin('center');

		var options = {
			maxParticles: 100,
			size: 15,
			sizeRandom: 4,
			speed: 0.3,
			speedRandom: 1.2,
// Lifespan in frames
			lifeSpan: 10,
			lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 0,
			angleRandom: 180,
			startColour: [227, 227, 76, 1],
			endColour: [227, 227, 76, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 5,
// How many frames should this last
			duration: 5,
// Will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 0, y: 0 },
// sensible values are 0-3
			jitter: 3
		};

		this.onHit('Player', function () {
			Crafty.audio.play('coin_pickup');

			this.destroy();

			Crafty.e("2D,Canvas,Particles").particles(options).attr({x: this.x, y: this.y });
		});
	}
});