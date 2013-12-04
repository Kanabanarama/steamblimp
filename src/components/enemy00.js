Crafty.c('EnemyBomb', {
	health: 1,
	liveTime: 500,

	init: function () {
		this.requires('GameObject, Enemy');
		this.attr({w: 28, h: 55});
		this.attachSprites();
		this.bind('EnterFrame', this.fall);
		this.liveTime = 400 + Math.round(Math.random() * 500);
	},

	fall: function (e) {
		this.attr({y: this.y + 1 });
		this.liveTime--;

		if (this.liveTime === 0) {
			this.damage(this.health);
			this.destroy();
		}

		if (this.x < Crafty.viewport.x) this.destroy();
	},

	damage: function (damagePoints) {
		this.health -= damagePoints;
		if(this.health <= 0) {
			var options = {
				maxParticles: 150,
				size: 20,
				sizeRandom: 4,
				speed: 3,
				speedRandom: 1.2,
				lifeSpan: 7,
				lifeSpanRandom: 2,
				angle: 0,
				angleRandom: 180,
				startColour: [255, 131, 0, 1],
				startColourRandom: [100, 100, 45, 0],
				endColour: [245, 35, 0, 0],
				endColourRandom: [60, 60, 60, 0],
				sharpness: 20,
				sharpnessRandom: 10,
				spread: 20,
				duration: 20,
				fastMode: false,
				gravity: { x: 0, y: 0 },
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
			lifeSpan: 5,
			lifeSpanRandom: 7,
			angle: 0,
			angleRandom: 180,
			startColour: [255, 131, 0, 1],
			startColourRandom: [48, 50, 45, 0],
			endColour: [245, 35, 0, 0],
			endColourRandom: [60, 60, 60, 0],
			sharpness: 20,
			sharpnessRandom: 10,
			spread: 0,
			duration: -1,
			fastMode: false,
			gravity: { x: 0, y: -0.4 },
			jitter: 0
		};

		var fuse = Crafty.e("Particle").setParticles(options).attr({x: this.x + 20, y: this.y + 35});
		this.attach(fuse);
	}
});