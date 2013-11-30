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

			Crafty.load([
				'assets/step01_basket.png',
				'assets/step01_balloon.png',
				'assets/parallax.png',
				'assets/damoney_resize.png',
				'assets/charakter_mit_karabiner.png'
			], function () {
				Crafty.sprite(50, 84, 'assets/step01_basket.png', {
					blimp_base_01: [0, 0]
				});
				Crafty.sprite(50, 84, 'assets/step01_balloon.png', {
					blimp_drive_01: [0, 0]
				});
				Crafty.sprite(50, 84, "assets/charakter_mit_karabiner.png", {
					player_gun1: [0, 0]
				});
				Crafty.sprite(2400, 1200, "assets/parallax.png", {
					background: [0, 0]
				});
				Crafty.sprite(20, 20, "assets/damoney_resize.png", {
					coin_cog: [0, 0]
				});

				Crafty.scene('Main');
			})
		});

		Crafty.scene('Main', function () {
			var background = Crafty.e('2D, Canvas, background').attr({'x': 0, 'y': -300, 'w': 2400, 'h': 1200});

			Crafty.e('Player').attr({ x: 50, y: 50 });

			var generateCoin = function (e) {
				if (e.frame % 100 === 0) {

					var rand = Math.random();

					Crafty.e('Coin').attr({
						x: 980 + (Crafty.viewport.x * -1),
						y: rand * (500 + Crafty.viewport.y)
					});
				}
			};

			Crafty.bind('EnterFrame', generateCoin);

			Game.score = Crafty.e('Score').attr({x: 20, y: 20 });

			Crafty.bind('EnterFrame', Game.gameLoop);
		});
	},
	gameLoop: function () {
		//console.log(Crafty.frameTime);
		Crafty.viewport.x -= Game.scrollspeed.x;
	}
};