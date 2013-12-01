Crafty.c('Player', {
	width: 50,
	height: 84,
	coins: 0,

	lives: 6,

	init: function () {
		this.requires('GameObject, Controls, Collision, Tween');

		this.fourway(2);

		this.origin('top center');

		this.attr({ w: this.width, h: this.height });

		this.attachSprites();

		this.bind('EnterFrame', this.driftForward);

		this.onHit('Coin', function () {
			Game.score.add(1);
		});

		this.onHit('Enemy', function (hits) {
			hits[0].obj.explode();
			hits[0].obj.destroy();
			this.enemyHit();
		});

		this.onHit('EnemyFlugdings', function (hits) {
			hits[0].obj.explode();
			hits[0].obj.destroy();
			this.enemyHit();
		});

		this.bind('KeyDown', this.switchWeapon);
	},

	lastWeapon: null,

	switchWeapon: function (e) {

		if (e.key == this.lastWeapon) return;

		switch (e.key) {

			case Crafty.keys['1']:
				this.gun.destroy();
				this.lastWeapon = e.key;
				this.gun = Crafty
					.e('Gun_1')
					.attr({x: this.x, y: this.y});
				this.attach(this.gun);
				break;

			case Crafty.keys['2']:
				this.gun.destroy();
				this.lastWeapon = e.key;
				this.gun = Crafty
					.e('Cannon')
					.attr({x: this.x + 22, y: this.y + 66});
				this.attach(this.gun);
				break;

			case Crafty.keys['3']:
				this.gun.destroy();
				this.lastWeapon = e.key;
				this.gun = Crafty
					.e('Laser')
					.attr({x: this.x + 20, y: this.y + 62});
				this.attach(this.gun);
				break;

			case Crafty.keys['4']:
				break;
		}

	},

	enemyHit: function () {
		this.lives--;

		this.addBurn();
		this.toggleComponent('Fourway');
		this.bind('EnterFrame', function () {
			this.attr({y: this.y + 1});
		});

		if (this.lives === 1) this.tween({rotation: 3}, -1);
	},

	lastBurn: null,

	addBurn: function () {

		if (this.lastBurn === null) Crafty.audio.play('burning');

		var options = {
			maxParticles: 70,
			size: 50 / this.lives,
			sizeRandom: 4,
			speed: 0.2,
			speedRandom: 0,
// Lifespan in frames
			lifeSpan: 20,
			lifeSpanRandom: 7,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 0,
			angleRandom: 0,
			startColour: [255, 131, 0, 1],
			startColourRandom: [48, 50, 45, 0],
			endColour: [245, 35, 0, 0],
			endColourRandom: [60, 60, 60, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 4,
// How many frames should this last
			duration: -1,
// Will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 0, y: -0.4 },
// sensible values are 0-3
			jitter: 1
		};

		if (this.lastBurn) this.lastBurn.destroy();

		this.lastBurn = Crafty.e("2D,Canvas,Particles").particles(options);

		var x = this.x + (Math.random() * 30);
		var y = this.y + (Math.random() * 20);

		this.lastBurn.attr({x: x, y: y});

		this.attach(this.lastBurn);
	},

	rockRight: true,

	driftForward: function (e) {
		this.attr({ 'x': this.x + 1 });

		//if (e.frame % 3 === 0) this.rockBalloon();

		if (this.y > 600) {
			if( !this.dead ) {
				this.death();
			}

		}
	},

	dead: false,
	death: function(){
		this.dead = true;
		var options = {
			maxParticles: 150,
			size: 30,
			sizeRandom: 4,
			speed: 1,
			speedRandom: 1.2,
// Lifespan in frames
			lifeSpan: 7,
			lifeSpanRandom: 2,
// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 90,
			angleRandom: 270,
			startColour: [255, 131, 0, 1],
			startColourRandom: [100, 100, 45, 0],
			endColour: [245, 35, 0, 0],
			endColourRandom: [60, 60, 60, 0],
// Only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
// Random spread from origin
			spread: 40,
// How many frames should this last
			duration: 40,
// Will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 0, y: -3 },
// sensible values are 0-3
			jitter: 3
		};

		Crafty.audio.play('explosion');
	 Crafty.e("Particle").setParticles(options).attr({
			x: this.x,
			y: this.y
		});

		this.timeout(function(){
			Crafty.scene('EndLose');
		}, 1400);

	},

	rockBalloon: function () {
		if (this.rockRight) {
			if (this.rotation > -5) this.rotation -= 1 / this.lives;
			else this.rockRight = false;
		}
		else {
			if (this.rotation < 5) this.rotation += 1 / this.lives;
			else this.rockRight = true;
		}
	},

	attachSprites: function () {

		this.base = Crafty
			.e('2D, Canvas, blimp_base_01')
			.attr({x: this.x, y: this.y, w: this.width, h: this.height});

		this.drive = Crafty
			.e('2D, Canvas, blimp_drive_01')
			.attr({x: this.x, y: this.y, w: this.width, h: this.height});

		this.gun = Crafty
			.e('Gun_1')
			.attr({x: this.x, y: this.y});

		this.attach(this.drive);
		this.attach(this.base);
		this.attach(this.gun);

	}
});