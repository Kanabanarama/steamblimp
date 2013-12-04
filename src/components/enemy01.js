Crafty.c('EnemyFlugzeug', {
	health: 5,

	init: function () {
		this.requires('GameObject, Collision, Enemy, enemy_flugzeug');

		this.attr({w: 60, h: 39});

		this.bind('EnterFrame', this.fly);
	},

	fly: function () {
		this.attr({ x: this.x - 5 });
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
				duration: 7,
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
		this.base = Crafty.e('GameObject, enemy_flugzeug');
		this.base.attr({x: this.x, y: this.y, w: 60, h: 39});
		this.attach(this.base);
	}
});