Crafty.c('Laser', {
	width: 35,
	height: 17,
	firepower: 5,
	pauseBetweenShots: 300,
	wait: false,

	init: function () {
		this.requires('GameObject, laser_sprite');
		this.attr({w: this.width, h: this.height});
	},

	fire: function () {
		var gun = this, bullet, particleConfig;

		if (gun.wait) return;
		gun.wait = true;
		gun.timeout(function () {
			gun.wait = false;
		}, this.pauseBetweenShots);

		bullet = Crafty
			.e('GameObject, Color, Bullet, Collision')
			.color('#ee5555')
			.attr({
				x: this.x - 20,
				y: this.y + 10,
				w: 100,
				h: 2
			}).onHit('Enemy', function (hits) {
				bullet.destroy();
				if (hits[0].obj.damage) hits[0].obj.damage(gun.firepower);
			})
			.bind('EnterFrame', function () {
				bullet.x += 50;
				if (!bullet.withinViewPort()) bullet.destroy();
			});

		particleConfig = {
			maxParticles: 50,
			size: 10,
			sizeRandom: 4,
			speed: 2,
			lifeSpan: 3,
			lifeSpanRandom: 3,
			angle: 90,
			startColour: [255, 70, 70, 1],
			endColour: [255, 70, 70, 0],
			spread: 4,
			duration: 6,
			gravity: { x: 2, y: 0 }
		};

		gun.attach(Crafty.e("Particle")
			.setParticles(particleConfig)
			.attr({
				x: this.x + 24,
				y: this.y + 7
			})
		);

		Crafty.audio.play('laser');
	}
});