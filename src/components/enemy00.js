Crafty.c('EnemyBomb', {
	health: 1,

	init: function () {
		this.requires('GameObject, Enemy');

		this.attr({w: 28, h: 55});

		this.attachSprites();

		this.bind('EnterFrame', this.fall);


		this.liveTime = 400 + Math.round(Math.random() * 500);
	},

	liveTime: 500,

	damage: function (damagePoints) {
		this.health -= damagePoints;
		if(this.health <= 0) {
			var options = {
				maxParticles: 150,
				size: 20,
				sizeRandom: 4,
				speed: 3,
				speedRandom: 1.2,
	// Lifespan in frames
				lifeSpan: 7,
				lifeSpanRandom: 2,
	// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
				angle: 0,
				angleRandom: 180,
				startColour: [255, 131, 0, 1],
				startColourRandom: [100, 100, 45, 0],
				endColour: [245, 35, 0, 0],
				endColourRandom: [60, 60, 60, 0],
	// Only applies when fastMode is off, specifies how sharp the gradients are drawn
				sharpness: 20,
				sharpnessRandom: 10,
	// Random spread from origin
				spread: 20,
	// How many frames should this last
				duration: 20,
	// Will draw squares instead of circle gradients
				fastMode: false,
				gravity: { x: 0, y: 0 },
	// sensible values are 0-3
				jitter: 2
			};

			Crafty.audio.play('explosion');

			this.destroy();

			return Crafty.e("Particle").setParticles(options).attr({
				x: this.x + 10,
				y: this.y + 45
			});
		}
	},

	fall: function (e) {
		this.attr({y: this.y + 1 });
		this.liveTime--;

		if (this.liveTime === 0) {
			this.damage();
			this.destroy();
		}

		if (this.x < Crafty.viewport.x) this.destroy();
	},

	attachSprites: function () {
		this.balloon = Crafty.e('GameObject, enemy_balloon');
		this.bomb = Crafty.e('GameObject, enemy_bomb');

		this.balloon.attr({x: this.x, y: this.y, w: 28, h: 55});
		this.bomb.attr({x: this.x, y: this.y, w: 28, h: 55});

		this.attach(this.balloon);
		this.attach(this.bomb);

		var options = {
			maxParticles: 50,
			size: 5,
			sizeRandom: 4,
			speed: 0.1,
			speedRandom: 1.2,
// Lifespan in frames
			lifeSpan: 5,
			lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 0,
			angleRandom: 180,
			startColour: [255, 131, 0, 1],
			startColourRandom: [48, 50, 45, 0],
			endColour: [245, 35, 0, 0],
			endColourRandom: [60, 60, 60, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 0,
// How many frames should this last
			duration: -1,
// Will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 0, y: -0.4 },
// sensible values are 0-3
			jitter: 0
		};

		var fuse = Crafty.e("Particle").setParticles(options).attr({x: this.x + 20, y: this.y + 35});

		this.attach(fuse);
	}
});