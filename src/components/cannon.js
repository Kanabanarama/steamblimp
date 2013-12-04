Crafty.c('Cannon', {
	width: 30,
	height: 14,
	firepower: 5,
	pauseBetweenShots: 2000,
	wait: false,

	init: function () {
		this.requires('GameObject, cannon_sprite');
		this.attr({ w: this.width, h: this.height });
	},

	fire: function () {
		var gun = this, bullet, drift = 0.1, particleOptions;

		if (gun.wait) return;
		gun.wait = true;
		gun.timeout(function () {
			gun.wait = false;
		}, this.pauseBetweenShots);

		bullet = Crafty.e('GameObject, Bullet, Collision, Color')
			.onHit('Enemy', function (hits) {
				hits[0].obj.damage(gun.firepower);
			})
			.color('#000000')
			.attr({
				x: this.x + 20,
				y: this.y,
				w: 7,
				h: 7
			}).bind('EnterFrame', function () {
				bullet.attr({ x: bullet.x + 13, y: bullet.y + drift});
				drift = drift * 1.1;
				if (!bullet.withinViewPort()) bullet.destroy();
			});

		particleOptions = {
			maxParticles: 50,
			size: 15,
			speed: 2,
			lifeSpan: 5,
			angle: 90,
			startColour: [150, 150, 150, 1],
			endColour: [100, 100, 100, 0],
			spread: 3,
			duration: 6,
			gravity: { x: 2, y: 0 }
		};

		this.attach(Crafty.e("Particle").setParticles(particleOptions).attr({
			x: this.x + 25,
			y: this.y
		}));

		Crafty.audio.play('cannon');
	}
});