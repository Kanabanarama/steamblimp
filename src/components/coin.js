Crafty.c('Coin', {
	pickupSound: 'coin_pickup',
	init: function () {
		this.requires('Item, Tween, coin_cog');

		this.attr({w: 20, h: 20});
		this.tween({
			rotation: 3
		}, -1).origin('center');
		this.particleOptions = {
			maxParticles: 100,
			size: 15,
			sizeRandom: 4,
			speed: 0.3,
			speedRandom: 1.2,
			lifeSpan: 10,
			lifeSpanRandom: 7,
			angle: 0,
			angleRandom: 180,
			startColour: [227, 227, 76, 1],
			endColour: [227, 227, 76, 0],
			sharpness: 20,
			sharpnessRandom: 10,
			spread: 5,
			duration: 5,
			fastMode: false,
			gravity: { x: 0, y: 0 },
			jitter: 0
		};
	}
});