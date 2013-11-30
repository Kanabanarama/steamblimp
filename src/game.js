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
			Crafty.audio.add('gun1_shot', 'assets/gun1_shot.ogg');
			Crafty.audio.add('explosion', 'assets/explosion.ogg');

			Crafty.load([
				'assets/step01_basket.png',
				'assets/step01_balloon.png',
				'assets/damoney_resize.png',
				'assets/charakter_mit_karabiner.png',
				'assets/parallax00.png',
				'assets/parallax01.png',
				'assets/parallax02.png',
				'assets/parallax03.png',
				'assets/enemy_balloon_resize.png',
				'assets/enemy_bomb1_resize.png'
			], function () {
				Crafty.sprite(50, 84, 'assets/step01_basket.png', {
					blimp_base_01: [0, 0]
				});
				Crafty.sprite(50, 84, 'assets/step01_balloon.png', {
					blimp_drive_01: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax00.png", {
					background_layer_00: [0, 0]
				});

				Crafty.sprite(50, 84, "assets/charakter_mit_karabiner.png", {
					player_gun1: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax01.png", {
					background_layer_01: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax02.png", {
					background_layer_02: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax03.png", {
					background_layer_03: [0, 0]
				});
				Crafty.sprite(20, 20, "assets/damoney_resize.png", {
					coin_cog: [0, 0]
				});
				Crafty.sprite(28, 55, "assets/enemy_balloon_resize.png", {
					enemy_balloon: [0, 0]
				});
				Crafty.sprite(28, 55, "assets/enemy_bomb1_resize.png", {
					enemy_bomb: [0, 0]
				});

				Crafty.scene('Main');
			})
		});

		Crafty.scene('Main', function () {
			Crafty.scene('Stage01');
		});
	},
	gameLoop: function (e) {
		//console.log(Crafty.frameTime);
		Crafty.viewport.x -= Game.scrollspeed.x;
	}
};