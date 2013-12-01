Crafty.c('EnemyBossship', {
	health: 250,

	init: function () {
		this.requires('GameObject, Collision, Enemy');

		this.attr({w: 250, h: 172});

		this.attachSprites();

		/*this.onHit('Bullet', function (hits) {
			this.damage();
		});*/
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
				x: this.x + 125,
				y: this.y + 90
			});
		}
	},

	attachSprites: function () {
		this.base = Crafty.e('GameObject, boss_ship_base');
		this.wings = Crafty.e('GameObject, SpriteAnimation, boss_ship_drive');

		this.base.attr({x: this.x, y: this.y, w: 250, h: 172});
		this.wings.attr({x: this.x, y: this.y, w: 250, h: 172});

		this.wings
			.animate('fly', 0, 0, 3)
			.animate('fly', 30, -1);

		this.attach(this.base);
		this.attach(this.wings);
	}
});