Crafty.c('Dubstep', {
	width: 55,
	height: 30,
	firepower: 50,
	pauseBetweenShots: 10000,
	wait: false,

	init: function () {
		this.requires('GameObject, dubstep_sprite');
		this.attr({ w: this.width, h: this.height });
	},

	fire: function () {
		var gun = this;

		if (gun.wait) return;
		gun.wait = true;
		gun.timeout(function () {
			gun.wait = false;
		}, gun.pauseBetweenShots);

		this.charge();
	},

	charge: function () {
		Crafty.audio.play('dubstep_charge');
		var options = {
			maxParticles: 100,
			size: 3,
			speed: 0.1,
			lifeSpan: 50,
			lifeSpanRandom: 50,
			angle: 90,
			angleRandom: 0,
			startColour: [0, 200, 200 , 1],
			startColourRandom: [200, 200, 200, 1],
			endColour: [0, 200, 0, 0],
			endColourRandom: [0, 60, 0, 0],
			spread: 10,
			duration: 250,
			fastMode: true,
			gravity: { x: 0, y: 0 }
		};

		this.attach(Crafty.e("Particle").setParticles(options).attr({
			x: this.x - 10,
			y: this.y - 15
		}));

		this.timeout( this.shoot, 5000);
	},
	shoot: function () {
		var gun = this;

		var options = {
			maxParticles: 2000,
			size: 40,
			speed: 100,
			lifeSpan: 50,
			angle: 0,
			angleRandom: 180,
			startColour: [0, 200, 200 , 1],
			startColourRandom: [200, 200, 200, 1],
			endColour: [0, 200, 0, 0],
			endColourRandom: [0, 60, 0, 0],
			spread: 10,
			duration: 160,
			fastMode: true,
			gravity: { x: 0, y: 0 },
			jitter: 20
		};

		Crafty.e("Particle").setParticles(options).attr({
			x: this.x - 30,
			y: this.y - 30
		});

		Crafty.audio.play('dubstep');

		this.timeout(killEnemies, 1);
		this.timeout(killEnemies, 1000);
		this.timeout(killEnemies, 2000);

		function killEnemies() {
			var i, enemy, enemies = Crafty('Enemy');
			for (i in enemies) {
				enemy = Crafty(enemies[i]);
				if (enemy.damage) enemy.damage(gun.firepower);
			}
		}
	}
});