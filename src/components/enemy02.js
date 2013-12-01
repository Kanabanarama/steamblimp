Crafty.c('EnemyFlugdings', {
	init: function () {
		this.requires('GameObject, Collision');

		this.attr({w: 60, h: 58});

		this.attachSprites();

		this.bind('EnterFrame', this.fly);
		this.bind('EnterFrame', this.shoot);

		this.onHit('Bullet', function (hits) {
			this.explode();
			this.destroy();
			if (this.gunfire) {
				this.gunfire.destroy();
				this.bullets.destroy();
				this.mockBullet.destroy();
			}
		});
	},

	wiggleSpeed: 2,
	wiggleMovement: 0,
	wiggleDirection: 0,
	fly: function () {
		if (this.wiggleMovement <= 0 && Crafty.frame() % 20 === 0) {
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
			var options = {
				maxParticles: 100,
				size: 4,
				speed: 0.2,
// Lifespan in frames
				lifeSpan: 8,
				lifeSpanRandom: 1,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
				angle: 90,
				startColour: [0, 0, 0, 1],
				endColour: [0, 0, 0, 1],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
				sharpness: 20,
				sharpnessRandom: 10,
// Random spread from origin
				spread: 5,
// How many frames should this last
				duration: 30,
// Will draw squares instead of circle gradients
				fastMode: false,
				gravity: { x: -10, y: 0 },
// sensible values are 0-3
				jitter: 2
			};

			Crafty.audio.play('minigun');
			this.attach(Crafty.e('Particle').setParticles(options).attr({x: this.x, y: this.y + 12 }));

			options = {
				maxParticles: 100,
				size: 16,
				sizeRandom: 4,
				speed: 1,
				speedRandom: 1.2,
// Lifespan in frames
				lifeSpan: 5,
				lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
				angle: 270,
				startColour: [255, 255, 100, 1],
				startColourRandom: [0, 0, 255, 1],
				endColour: [255, 255, 255, 0],
				endColourRandom: [255, 255, 0, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
				sharpness: 20,
				sharpnessRandom: 10,
// Random spread from origin
				spread: 7,
// How many frames should this last
				duration: 30,
// Will draw squares instead of circle gradients
				fastMode: false,
				gravity: { x: -2, y: 0 }
			};

			this.attach(
				Crafty.e('Particle')
					.setParticles(options)
					.attr({x: this.x - 12, y: this.y + 12 })
			);

			var hitbox = Crafty.e('GameObject, Enemy').attr({
				x: this.x - 400,
				y: this.y,
				w: 400,
				h: 30
			});

			hitbox.explode = hitbox.destroy;

			this.attach(hitbox);

			this.timeout(function () {
				hitbox.destroy()
			}, 600);

			this.timeout(function () {
				this.wait = false;
			}, 3000);
		}
	},

	explode: function () {
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
		return Crafty.e("Particle").setParticles(options).attr({
			x: this.x + 10,
			y: this.y + 45
		});
	},

	attachSprites: function () {
		this.base = Crafty.e('GameObject, enemy_flugdings');
		this.weapon = Crafty.e('GameObject, enemy_flugdings_weapon');
		this.wings = Crafty.e('GameObject, SpriteAnimation, enemy_flugdings_drive');

		this.base.attr({x: this.x, y: this.y, w: 60, h: 58});
		this.weapon.attr({x: this.x, y: this.y, w: 60, h: 58});
		this.wings.attr({x: this.x, y: this.y, w: 60, h: 58});

		this.wings
			.animate('fly', 0, 0, 5)
			.animate('fly', 30, -1);

		this.attach(this.base);
		this.attach(this.weapon);
		this.attach(this.wings);
	}
});