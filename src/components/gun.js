Crafty.c('Gun_1', {
	width: 50,
	height: 84,

	init: function () {
		var gun = this;
		this.requires('GameObject, player_gun1');

		this.attr({ w: 50, h: 84 });

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
				x: this.x + 30,
				y: this.y + 53,
				w: 3,
				h: 3
			});

			var drift = (Math.random() - 0.5) * 2;

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