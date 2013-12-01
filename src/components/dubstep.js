Crafty.c('Dubstep', {
	firepower: 25,

	init: function () {
		var gun = this;
		this.requires('GameObject, dubstep_sprite');

		this.attr({ w: 55, h: 30 });

		this.bind('KeyDown', function (e) {
			if (e.key == Crafty.keys['SPACE']) gun.fire();
		});
	},

	wait: false,

	fire: function () {
		var gun = this;
		if (!gun.wait) {
			gun.wait = true;
			this.charge();

			gun.timeout(function () {
				gun.wait = false;
			}, 10000);
		}
	},

	charge: function () {
		Crafty.audio.play('dubstep_charge');
		var options = {
			maxParticles: 300,
			size: 3,
			speed: 0.1,
// Lifespan in frames
			lifeSpan: 50,
			lifeSpanRandom: 50,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 90,
			angleRandom: 34,
			startColour: [0, 200, 200 , 1],
			startColourRandom: [200, 200, 200, 1],
			endColour: [0, 200, 0, 0],
			endColourRandom: [0, 60, 0, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 10,
// How many frames should this last
			duration: 250,
// Will draw squares instead of circle gradients
			fastMode: true,
			gravity: { x: 0.05, y: 0 },
// sensible values are 0-3
			jitter: 2
		};

		this.attach(Crafty.e("Particle").setParticles(options).attr({
			x: this.x - 10,
			y: this.y - 15
		}));

		this.timeout(function () {
			this.shoot();
		}, 5000);
	},
	shoot: function () {
		gun = this;
		Crafty.audio.play('dubstep');
		var options = {
			maxParticles: 2000,
			size: 40,
			speed: 100,
// Lifespan in frames
			lifeSpan: 50,
			lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 0,
			angleRandom: 180,
			startColour: [0, 200, 200 , 1],
			startColourRandom: [200, 200, 200, 1],
			endColour: [0, 200, 0, 0],
			endColourRandom: [0, 60, 0, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 10,
// How many frames should this last
			duration: 160,
// Will draw squares instead of circle gradients
			fastMode: true,
			gravity: { x: 0, y: 0 },
// sensible values are 0-3
			jitter: 20
		};

		this.attach(Crafty.e("Particle").setParticles(options).attr({
			x: this.x - 30,
			y: this.y - 30
		}));

		var killEnemies = function () {
			var enemies = Crafty('Enemy');

			for (i in enemies) {
				var enemy = Crafty(enemies[i]);
				if (enemy.damage) {
					enemy.damage(gun.firepower);
					//enemy.destroy();
				}
			}
		};

		this.timeout(killEnemies, 1);
		this.timeout(killEnemies, 1000);
		this.timeout(killEnemies, 2000);
	}
});