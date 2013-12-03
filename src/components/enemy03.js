Crafty.c('EnemyBossship', {
	health: 250,

	init: function () {
		this.requires('GameObject, Collision, Enemy');
		this.attr({w: 250, h: 172});
		this.bind('EnterFrame', this.fly);
		this.attachSprites();
	},

	fly: function() {
		if(Crafty.frame() % 2 === 0) {
			this.attr({ x: this.x - 1 });
		}
	},

	damage: function (damagePoints) {
		this.health -= damagePoints;
		if(this.health <= 0) {
			var options = {
				maxParticles: 100,
				size: 40,
				sizeRandom: 10,
				speed: 3,
				speedRandom: 1.2,
				lifeSpan: 30,
				lifeSpanRandom: 0,
				angle: 0,
				angleRandom: 180,
				startColour: [255, 131, 0, 1],
				startColourRandom: [100, 100, 45, 0],
				endColour: [245, 35, 0, 0],
				endColourRandom: [60, 60, 60, 0],
				sharpness: 20,
				sharpnessRandom: 10,
				spread: 50,
				duration: 7,
				fastMode: false,
				gravity: { x: 0, y: 0 },
				jitter: 4
			};
			Crafty.audio.play('explosion');
			this.destroy();
			Crafty.scene('EndWin');
			return Crafty.e("Particle").setParticles(options).attr({
				x: this.x + 125,
				y: this.y + 90
			});
		}
	},

	attachSprites: function () {
		this.base = Crafty.e('GameObject, boss_ship_base');
		this.wings = Crafty.e('GameObject, SpriteAnimation, boss_ship_drive');

		this.base.attr({w: 250, h: 172});
		this.wings.attr({w: 250, h: 172});

		this.attach(this.base);
		this.attach(this.wings);

		this.wings
			.animate('fly', 0, 0, 3)
			.animate('fly', 30, -1);
	}
});