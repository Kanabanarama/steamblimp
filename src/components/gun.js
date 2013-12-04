Crafty.c('Gun_1', {
	width: 50,
	height: 84,
	firepower: 4,
	pauseBetweenShots: 1000,

	init: function () {
		this.requires('GameObject, gun_sprite');
		this.attr({ w: this.width, h: this.height });
	},

	wait: false,
	fire: function () {
		var gun = this, particleOptions, drift, bullet;

		if (gun.wait) return;
		gun.wait = true;
		gun.timeout(function () {
			gun.wait = false;
		}, this.pauseBetweenShots);

		drift = (Math.random() - 0.5) * 2;
		bullet = Crafty.e('GameObject, Color, Bullet, Collision')
			.color('black')
			.attr({
				x: this.x + 30,
				y: this.y + 53,
				w: 3,
				h: 3
			})
			.bind('EnterFrame', function () {
				bullet.attr({ x: bullet.x + 20, y: bullet.y + drift });
				if (!bullet.withinViewPort()) bullet.destroy();
			})
			.onHit('Enemy', function (hits) {
				bullet.destroy();
				hits[0].obj.damage(gun.firepower);
			});

		particleOptions = {
			maxParticles: 50,
			size: 10,
			speed: 3,
			lifeSpan: 5,
			angle: 90,
			startColour: [150, 150, 150, 1],
			endColour: [100, 100, 100, 0],
			spread: 2,
			duration: 3,
			gravity: { x: 2, y: 0 }
		};

		gun.attach(Crafty.e("Particle")
			.setParticles(particleOptions)
			.attr({
				x: this.x + 40,
				y: this.y + 50
			}));

		Crafty.audio.play('gun1_shot');
	}
});