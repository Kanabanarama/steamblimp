Crafty.c('EnemyBossship', {
	health: 250,

	init: function () {
		this.requires('GameObject, Collision, Enemy');
		this.attr({w: 250, h: 172});
		this.bind('EnterFrame', this.fly);
		this.timeout(this.cycleRocket, 3000);
		this.timeout(this.cycleLaser, 10000);
		this.attachSprites();
	},

	floatDirection: 2,
	fly: function() {
		if(Crafty.frame() % 2 === 0) {
			if(this._x > 720) {
				this.attr({ x: this.x - 1 });
			} else {
				if(Crafty.frame() % 500 === 0) {
					this.floatDirection = -this.floatDirection;
				}
				this.attr({ y: this.y + this.floatDirection });
			}
		}
	},

	cycleRocket: function() {
		this.shootRocket();
		if(this.health > 0) {
			this.timeout(this.cycleRocket, 3000);
		}
	},

	shootRocket: function () {
		Crafty.audio.play('boss_ship_rocket');
		var rocket = Crafty.e('GameObject, Collision, Deadly, boss_ship_rocket').attr({
			x: this.x+70,
			y: this.y+140
		});
		this.bind('EnterFrame', function() {
			rocket.attr({ x: rocket._x-10 });
		});
		this.timeout(function () {
			rocket.destroy()
		}, 5000);
	},

	cycleLaser: function() {
		this.timeout(function(){
			Crafty.audio.play('boss_ship_charge');
			this.timeout(function () {
				if(this.health > 0) {
					this.shootLaser();
				}
			}, 5000);
		}, 5000);
		if(this.health > 0) {
			this.timeout(this.cycleLaser, 10000);
		}
	},

	shootLaser: function() {
		Crafty.audio.play('boss_ship_laser');
		var laser = Crafty.e('GameObject, Collision, Deadly, Color, Alpha')
			.attr({ x: this.x-1962, y: this.y+94, w: 2000, h: 22 })
			.color('#FF0000');
		this.attach(laser);
		this.bind('EnterFrame', function() {
			laser.color('rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')')
		});
		this.timeout(function () {
			laser.destroy()
		}, 3000);
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
			this.rocketTimeout = null;
			this.rocketTimeout = null;
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
			.reel('fly', 1000, 0, 0, 4)
			.animate('fly', -1);
	}
});