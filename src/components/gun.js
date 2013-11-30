Crafty.c('Gun_1', {
	width: 50,
	height: 84,

	init: function () {
		var gun = this;
		this.requires('GameObject, Color');

		this.color('gold');
		this.attr({ w: 50, h: 10 });

		Crafty.audio.add('gun1_shot', 'assets/gun1_shot.ogg');

		this.bind('KeyDown', function (e) {
			if (e.key == Crafty.keys['SPACE']) gun.fire();
		});
	},

	wait: false,

	fire: function () {
		var gun = this;
		if (!gun.wait) {
			gun.wait = true;
			var bullet = Crafty.e('GameObject, Color');

			bullet.color('black');

			bullet.attr({
				x: this.x + 42,
				y: this.y + 4,
				w: 4,
				h: 4
			});

			var drift = (Math.random() - 0.5) * 1.4;

			Crafty.audio.play('gun1_shot');
			var moveBullet = function () {
				bullet.attr({ x: bullet.x + 20, y: bullet.y + drift });
				if (!bullet.withinViewPort()) {
					bullet.unbind('EnterFrame', moveBullet);
					bullet.destroy();
					gun.wait = false;
				}
			};

			bullet.bind('EnterFrame', moveBullet);
		}
	}
});