Crafty.c('Laser', {
	init: function () {
		var gun = this;
		this.requires('GameObject, laser_sprite');
		this.attr({w: 35, h: 17});

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

			bullet.color('#ee5555');

			bullet.onHit('Enemy', function (hits) {
				bullet.destroy();
				hits[0].obj.explode();
			});

			bullet.attr({
				x: this.x,
				y: this.y + 8,
				w: 100,
				h: 2
			});

			this.showSmoke();

			Crafty.audio.play('laser');
			var moveBullet = function () {
				bullet.attr({ x: bullet.x + 50 });
				if (!bullet.withinViewPort()) {
					bullet.unbind('EnterFrame', moveBullet);
					bullet.destroy();
				}
			};

			gun.timeout(function () {
				gun.wait = false;
			}, 200);

			bullet.bind('EnterFrame', moveBullet);
		}
	},

	showSmoke: function () {
		var options = {
			maxParticles: 150,
			size: 5,
			sizeRandom: 4,
			speed: 2,
			speedRandom: 1.2,
// Lifespan in frames
			lifeSpan: 10,
			lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 90,
			angleRandom: 34,
			startColour: [255, 70, 70, 1],
			endColour: [255, 70, 70, 0],
			endColourRandom: [60, 60, 60, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 5,
// How many frames should this last
			duration: 6,
// Will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 2, y: 0 },
// sensible values are 0-3
			jitter: 2
		};

		this.attach(Crafty.e("Particle").setParticles(options).attr({
			x: this.x + 24,
			y: this.y + 7
		}));
	}
});