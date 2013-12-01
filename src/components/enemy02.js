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
			if(this.gunfire) {
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
		if(this.wiggleMovement <= 0 && Crafty.frame() % 20 === 0) {
			var random = Math.random();
			this.wiggleMovement = 30+random*30;
			if(random > 0.5) {
				this.wiggleDirection = 1;
			} else {
				this.wiggleDirection = -1;
			}
		}
		if(this.wiggleMovement > 0) {
			this.attr({y: this.y - this.wiggleSpeed*this.wiggleDirection });
			this.wiggleMovement -= this.wiggleSpeed;
		}
		this.attr({ x: this.x - 1 });
	},

	roundsToShoot: 120,
	roundsShot: 0,
	reloadTime: 300,
	reloadPause: 0,
	shoot: function () {
		if(this.reloadPause <= 0) {
			var gunfireOptions = {
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
				duration: this.roundsToShoot,
				fastMode: true,
				gravity: { x: -2, y: 0 },
				jitter: 0
			};
			this.gunfire = Crafty.e("Particle").setParticles(gunfireOptions);

			var bulletOptions = {
				maxParticles: 50,
				size: 2,
				speed: 0.2,
				lifeSpan: 6,
				angle: 0,
				startColour: [0, 0, 0, 1],
				startColourRandom: [0, 0, 0, 1],
				endColour: [0, 0, 0, 1],
				endColourRandom: [0, 0, 0, 1],
				sharpness: 20,
				spread: 0,
				duration: this.roundsToShoot,
				fastMode: true,
				gravity: { x: -5, y: 0 },
				jitter: 0
			};
			this.bullets = Crafty.e("Particle").setParticles(bulletOptions);

			this.mockBullet = Crafty.e('GameObject, Deadly').attr({ w: 500, h:12 });

			this.roundsShot = 0;
			this.reloadPause = this.reloadTime;
		} else {
			this.roundsShot++;
		}

		if(this.roundsShot < this.roundsToShoot) { //this.gunfire) {
			this.gunfire.attr({ x: this.weapon.x-4, y: this.weapon.y+14 });
			this.bullets.attr({ x: this.weapon.x-4, y: this.weapon.y+14 });
			this.mockBullet.attr({ x: this.weapon.x-500, y: this.weapon.y+10 });
		} else {
			this.mockBullet.removeComponent('Deadly');
		}

		this.reloadPause--;
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