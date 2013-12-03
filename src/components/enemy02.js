Crafty.c('EnemyFlugdings', {
	health: 20,

	init: function () {
		this.requires('GameObject, Collision, Enemy');
		this.attr({w: 60, h: 58});
		this.attachSprites();
		this.bind('EnterFrame', this.fly);
		this.bind('EnterFrame', this.shoot);
	},

	wiggleSpeed: 2,
	wiggleMovement: 0,
	wiggleDirection: 0,
	fly: function () {
		if (this.wiggleMovement <= 0 && Crafty.frame() % 6 === 0) {
			var random = Math.random();
			this.wiggleMovement = 30 + random * 30;
			if (random > 0.5) {
				this.wiggleDirection = 1;
			} else {
				this.wiggleDirection = -1;
			}
		}
		if (this.wiggleMovement > 0) {
			this.attr({y: this.y - this.wiggleSpeed * this.wiggleDirection });
			this.wiggleMovement -= this.wiggleSpeed;
		}
		this.attr({ x: this.x - 1 });

		if( this.x + 100 < (Crafty.viewport.x * -1)) this.destroy();
	},

	wait: false,
	shoot: function () {
		if (!this.wait) {
			this.wait = true;
			Crafty.audio.play('minigun');

			var bulletOptions = {
				maxParticles: 100,
				size: 4,
				speed: 0.2,
				lifeSpan: 8,
				lifeSpanRandom: 1,
				angle: 90,
				startColour: [0, 0, 0, 1],
				endColour: [0, 0, 0, 1],
				sharpness: 20,
				sharpnessRandom: 10,
				spread: 5,
				duration: 30,
				fastMode: false,
				gravity: { x: -10, y: 0 },
				jitter: 2
			};

			this.attach(
				Crafty.e('Particle')
					.setParticles(bulletOptions)
					.attr({x: this.x, y: this.y + 12 }));

			smokeOptions = {
				maxParticles: 100,
				size: 16,
				sizeRandom: 4,
				speed: 1,
				speedRandom: 1.2,
				lifeSpan: 5,
				lifeSpanRandom: 7,
				angle: 270,
				startColour: [255, 255, 100, 1],
				startColourRandom: [0, 0, 255, 1],
				endColour: [255, 255, 255, 0],
				endColourRandom: [255, 255, 0, 0],
				sharpness: 20,
				sharpnessRandom: 10,
				spread: 7,
				duration: 30,
				fastMode: false,
				gravity: { x: -2, y: 0 }
			};

			this.attach(
				Crafty.e('Particle')
					.setParticles(smokeOptions)
					.attr({x: this.x - 12, y: this.y + 12 })
			);

			var hitbox = Crafty.e('GameObject, Enemy').attr({
				x: this.x - 400,
				y: this.y,
				w: 400,
				h: 30
			});

			hitbox.damage = hitbox.destroy;

			this.attach(hitbox);

			this.timeout(function () {
				hitbox.destroy()
			}, 600);

			this.timeout(function () {
				this.wait = false;
			}, 3000);
		}
	},

	damage: function (damagePoints) {
		this.health -= damagePoints;
		if(this.health <= 0) {
			if (this.gunfire) {
				this.gunfire.destroy();
				this.bullets.destroy();
				this.mockBullet.destroy();
			}
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
		this.base = Crafty.e('GameObject, enemy_flugdings');
		this.weapon = Crafty.e('GameObject, enemy_flugdings_weapon');
		this.wings = Crafty.e('GameObject, SpriteAnimation, enemy_flugdings_drive');

		this.base.attr({w: 60, h: 58});
		this.weapon.attr({w: 60, h: 58});
		this.wings.attr({w: 60, h: 58});

		this.attach(this.base);
		this.attach(this.weapon);
		this.attach(this.wings);

		this.wings
			.animate('fly', 0, 0, 5)
			.animate('fly', 30, -1);
	}
});