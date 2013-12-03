Crafty.c('Gun_1', {
	width: 50,
	height: 84,
	firepower: 4,

	init: function () {
		var gun = this;
		this.requires('GameObject, gun_sprite');

		this.attr({ w: 50, h: 84 });

		this.bind('KeyDown', function (e) {
			if (e.key == Crafty.keys['SPACE']) gun.fire();
		});
	},

	wait: false,
	fire: function () {
		var gun = this;
		if (!gun.wait) {
			gun.wait = true;
			var bullet = Crafty.e('GameObject, Color, Bullet, Collision');

			bullet.onHit('Enemy', function (hits) {
				bullet.destroy();
				hits[0].obj.damage(gun.firepower);
			});

			bullet.gun = gun;

			bullet.color('black');

			bullet.attr({
				x: this.x + 30,
				y: this.y + 53,
				w: 3,
				h: 3
			});

			gun.showSmoke();

			var drift = (Math.random() - 0.5) * 2;

			Crafty.audio.play('gun1_shot');
			var moveBullet = function () {
				bullet.attr({ x: bullet.x + 20, y: bullet.y + drift });
				if (!bullet.withinViewPort()) {
					bullet.unbind('EnterFrame', moveBullet);
					bullet.destroy();
				}
			};

			gun.timeout(function () {
				gun.wait = false;
			}, 1000);

			bullet.bind('EnterFrame', moveBullet);
		}
	},

	showSmoke: function () {
		var options = {
			maxParticles: 150,
			size: 10,
			sizeRandom: 4,
			speed: 2,
			speedRandom: 1.2,
// Lifespan in frames
			lifeSpan: 10,
			lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 90,
			angleRandom: 34,
			startColour: [200, 200, 200, 1],
			startColourRandom: [100, 100, 100, 0],
			endColour: [200, 200, 200, 0],
			endColourRandom: [60, 60, 60, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 5,
// How many frames should this last
			duration: 3,
// Will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 2, y: 0 },
// sensible values are 0-3
			jitter: 2
		};

		Crafty.e("Particle").setParticles(options).attr({
			x: this.x + 50,
			y: this.y + 50
		});
	}
});