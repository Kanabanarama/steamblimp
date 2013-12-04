Game = {
	width: 1000,
	height: 600,
	scrollspeed: {
		x: 1,
		y: 0
	},
	init: function () {
		Crafty.init(Game.width, Game.height, document.getElementById('canvas'));
		Crafty.background('gray');
		Game.initScenes();
		Crafty.scene('Loading');
	},
	lockPointer: function (element) {
		var havePointerLock = 'pointerLockElement' in document ||
			'mozPointerLockElement' in document ||
			'webkitPointerLockElement' in document;
		element.requestPointerLock = element.requestPointerLock ||
			element.mozRequestPointerLock ||
			element.webkitRequestPointerLock;
		return element.requestPointerLock();
	},
	initScenes: function () {
		Crafty.scene('Loading', function () {
			var loadingText = 'Loading blimbety blimp stuff...';
			Crafty.e('2D, DOM, Text')
				.text(loadingText)
				.attr({ x: Game.width / 2 - loadingText.length * 5 / 2, y: Game.height / 2 - 24, w: Game.width });

			Crafty.audio.add('coin_pickup', 'assets/coin_pickup.ogg');
			Crafty.audio.add('heart_pickup', 'assets/heart_pickup.ogg');
			Crafty.audio.add('gun1_shot', 'assets/gun.ogg', 0.1);
			Crafty.audio.add('cannon', 'assets/cannon.ogg');
			Crafty.audio.add('explosion', 'assets/explosion.ogg');
			Crafty.audio.add('burning', 'assets/burning.ogg');
			Crafty.audio.add('lost', 'assets/lost.mp3');
			Crafty.audio.add('laser', 'assets/laser.ogg');
			Crafty.audio.add('minigun', 'assets/minigun.mp3', 0.1);
			Crafty.audio.add('dubstep_charge', 'assets/dubstepcharge.ogg', 0.1);
			Crafty.audio.add('dubstep', 'assets/dubstep.ogg');

			Crafty.load([
				'assets/step01_basket.png',
				'assets/step01_balloon.png',
				'assets/damoney_resize.png',
				'assets/herz.png',
				'assets/parallax00.png',
				'assets/parallax01.png',
				'assets/parallax02.png',
				'assets/enemy_balloon_resize.png',
				'assets/enemy_bomb1_resize.png',
				'assets/enemy_flugzeug.png',
				'assets/enemy_flugdings_base.png',
				'assets/enemy_flugdings_animation.png',
				'assets/enemy_flugdings_gatling.png',
				'assets/gun.png',
				'assets/cannon.png',
				'assets/cannon_ball.png',
				'assets/laser.png',
				'assets/laser_shot.png',
				'assets/dubstep.png',
				'assets/boss_ship_base.png',
				'assets/boss_ship_animation.png',
				'assets/boss_ship_rocket.png'
			], function () {
				Crafty.sprite(50, 84, 'assets/step01_basket.png', {
					blimp_base_01: [0, 0]
				});
				Crafty.sprite(50, 84, 'assets/step01_balloon.png', {
					blimp_drive_01: [0, 0]
				});
				Crafty.sprite(50, 84, "assets/gun.png", {
					gun_sprite: [0, 0]
				});
				Crafty.sprite(30, 14, "assets/cannon.png", {
					cannon_sprite: [0, 0]
				});
				Crafty.sprite(10, 10, "assets/cannon_ball.png", {
					cannon_ball_sprite: [0, 0]
				});
				Crafty.sprite(35, 17, "assets/laser.png", {
					laser_sprite: [0, 0]
				});
				Crafty.sprite(26, 5, "assets/laser_shot.png", {
					laser_shot_sprite: [0, 0]
				});
				Crafty.sprite(55, 30, "assets/dubstep.png", {
					dubstep_sprite: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax00.png", {
					background_layer_00: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax01.png", {
					background_layer_01: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax02.png", {
					background_layer_02: [0, 0]
				});
				Crafty.sprite(20, 20, "assets/damoney_resize.png", {
					coin_cog: [0, 0]
				});
				Crafty.sprite(20, 20, "assets/herz.png", {
					heart: [0, 0]
				});
				Crafty.sprite(28, 55, "assets/enemy_balloon_resize.png", {
					enemy_balloon: [0, 0]
				});
				Crafty.sprite(28, 55, "assets/enemy_bomb1_resize.png", {
					enemy_bomb: [0, 0]
				});
				Crafty.sprite(60, 39, "assets/enemy_flugzeug.png", {
					enemy_flugzeug: [0, 0]
				});
				Crafty.sprite(60, 58, "assets/enemy_flugdings_base.png", {
					enemy_flugdings: [0, 0]
				});
				Crafty.sprite(60, 58, "assets/enemy_flugdings_gatling.png", {
					enemy_flugdings_weapon: [0, 0]
				});
				Crafty.sprite(60, 58, "assets/enemy_flugdings_animation.png", {
					enemy_flugdings_drive: [0, 0]
				});
				Crafty.sprite(250, 172, "assets/boss_ship_base.png", {
					boss_ship_base: [0, 0]
				});
				Crafty.sprite(250, 172, "assets/boss_ship_animation.png", {
					boss_ship_drive: [0, 0]
				});
				Crafty.sprite(25, 9, "assets/boss_ship_rocket.png", {
					boss_ship_rocket: [0, 0]
				});

				Crafty.scene('Main');
			})
		});

		Crafty.scene('Main', function () {
			Crafty.bind('KeyDown', function (e) {
				if (e.key === Crafty.keys['ESC']) {
					Crafty.pause();
				}
			});

			Crafty.scene('Stage02');
		});
	}
};