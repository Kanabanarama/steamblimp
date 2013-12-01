Crafty.c('EnemyFlugdings', {
	init: function () {
		this.requires('GameObject, Collision');

		this.attr({w: 60, h: 58});

		this.attachSprites();

		this.bind('EnterFrame', this.fly);
		this.bind('EnterFrame', this.animate);

		this.onHit('Bullet', function (hits) {
			this.explode();
			this.destroy();
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
			console.log('rnd movement', this.wiggleMovement, this.wiggleDirection);
		}
		if(this.wiggleMovement > 0) {
			this.attr({y: this.y - this.wiggleSpeed*this.wiggleDirection });
			this.wiggleMovement -= this.wiggleSpeed;
		}
		this.attr({x: this.x - 1 });
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