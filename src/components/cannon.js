Crafty.c('Cannon', {
	width: 50,
	height: 84,
	firepower: 5,

	init: function () {
		var gun = this;
		this.requires('GameObject, cannon_sprite');

		this.attr({ w: 30, h: 14 });

		this.bind('KeyDown', function (e) {
			if (e.key == Crafty.keys['SPACE']) gun.fire();
		});
	},

	wait: false,

	fire: function () {
		var gun = this;
		if (!gun.wait) {
			gun.wait = true;
			var bullet = Crafty.e('GameObject, Bullet, Collision, cannon_ball_sprite');

			bullet.onHit('Enemy', function (hits) {
				hits[0].obj.damage(gun.firepower);
			});

			bullet.attr({
				x: this.x + 20,
				y: this.y,
				w: 10,
				h: 10
			});

			gun.showSmoke();

			var drift = 0.1;

			Crafty.audio.play('cannon');
			var moveBullet = function () {
				bullet.attr({ x: bullet.x + 13, y: bullet.y + drift});
				drift = drift * 1.1;
				if (!bullet.withinViewPort()) {
					bullet.unbind('EnterFrame', moveBullet);
					bullet.destroy();
				}
			};

			gun.timeout(function () {
				gun.wait = false;
			}, 2000);

			bullet.bind('EnterFrame', moveBullet);
		}
	},

	showSmoke: function () {
		var options = {
			maxParticles: 100,
			size: 20,
			sizeRandom: 4,
			speed: 2,
			speedRandom: 1.2,
// Lifespan in frames
			lifeSpan: 15,
			lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 90,
			angleRandom: 0,
			startColour: [200, 200, 200, 1],
			startColourRandom: [100, 100, 100, 0],
			endColour: [200, 200, 200, 0],
			endColourRandom: [60, 60, 60, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 10,
// How many frames should this last
			duration: 5,
// Will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 2, y: 0 },
// sensible values are 0-3
			jitter: 2
		};

		Crafty.e("Particle").setParticles(options).attr({
			x: this.x + 40,
			y: this.y
		});
	}
});