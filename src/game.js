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
	lockPointer: function(element) {
		var havePointerLock = 'pointerLockElement' in document ||
			'mozPointerLockElement' in document ||
			'webkitPointerLockElement' in document;
		element.requestPointerLock = element.requestPointerLock ||
			element.mozRequestPointerLock ||
			element.webkitRequestPointerLock;
		return element.requestPointerLock();
	},
	initScenes: function() {
		Crafty.scene('Loading', function() {
			var loadingText = 'Loading blimbety blimp stuff...';
			Crafty.e('2D, DOM, Text')
				.text(loadingText)
				.attr({ x: Game.width/2 - loadingText.length*5/2, y: Game.height/2 - 24, w: Game.width });

			Crafty.load(['assets/step01_basket.png', 'assets/step01_balloon.png', 'assets/parallax.png'], function() {
				Crafty.sprite(50, 84, 'assets/step01_basket.png', {
					blimp_base_01: [0, 0]
				});
				Crafty.sprite(50, 84, 'assets/step01_balloon.png', {
					blimp_drive_01: [0, 0]
				});
				Crafty.sprite(2000, 600, "assets/parallax.png", {
					background_layer_01: [0,0]
				});
				Crafty.sprite(2000, 600, "assets/parallax.png", {
					background_layer_02: [0,0]
				});
				Crafty.sprite(2000, 600, "assets/parallax.png", {
					background_layer_03: [0,0]
				});

				Crafty.scene('Main');
			})
		});

		Crafty.scene('Main', function() {

			//var background = Crafty.e('2D, Canvas, background').attr( {'x': 0, 'y': -300, 'w': 2400, 'h': 1200} );
			//var parallax1 = Crafty.e('Parallax').setBackground('background_layer_01').setFrom()

			/*Game.parallax.generate(0, 'background_layer_01', 0);
			Game.parallax.generate(1, 'background_layer_02', 0);
			Game.parallax.generate(2, 'background_layer_03', 0);
			Game.parallax.start();*/

			var parallax01 = Crafty.e('2D, Canvas, Image')
				.attr({'x': 0, 'y': 0, 'w': Crafty.viewport.width*3, 'h': 600})
				.image('assets/parallax.png', 'repeat');

			var player = Crafty.e('Player, blimp_base_01').attr( {'x': 50, 'y': 50, 'w': 50, 'h': 84} ).fourway(5);
			var turret = Crafty.e('2D, Canvas, blimp_drive_01').attr( {'x': 50, 'y': 50, 'w': 50, 'h': 84} );
			player.attach(turret);

			Crafty.bind('EnterFrame', Game.gameLoop);
		});
	},
	gameLoop: function() {
		//console.log(Crafty.frameTime);
		Crafty.viewport.x -= Game.scrollspeed.x;
	}
};