Crafty.c('Player', {
	width: 50,
	height: 84,
	coins: 0,

	lives: 8,

	init: function () {
		this.requires('GameObject, Controls, Collision');

		this.fourway(5);

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
	},

	enemyHit: function () {
		this.lives--;

		this.addBurn();
		this.toggleComponent('Fourway');
		this.bind('EnterFrame', function () {
			this.attr({y: this.y + 1});
		});
	},

	lastBurn: null,

	addBurn: function () {
		var options = {
			maxParticles: 70,
			size: 40 / this.lives,
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

		if( this.lastBurn ) this.lastBurn.destroy();

		this.lastBurn = Crafty.e("2D,Canvas,Particles").particles(options);

		var x = this.x + (Math.random() * 30);
		var y = this.y + (Math.random() * 20);

		this.lastBurn.attr({x: x, y: y});

		this.attach(this.lastBurn);
	},

	driftForward: function () {
		this.attr({ 'x': this.x + 1 });
	},

	attachSprites: function () {
		this.gun = Crafty
			.e('Gun_1')
			.attr({x: this.x + 6, y: this.y});

		this.base = Crafty
			.e('2D, Canvas, blimp_base_01')
			.attr({x: this.x, y: this.y, w: this.width, h: this.height});

		this.drive = Crafty
			.e('2D, Canvas, blimp_drive_01')
			.attr({x: this.x, y: this.y, w: this.width, h: this.height});

		this.attach(this.drive);
		this.attach(this.base);
		this.attach(this.gun);

	}
});