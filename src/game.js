Game = {
	width: 1000,
	height: 600,
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

			Crafty.load(['assets/blimp.png'], function() {
				Crafty.sprite(60, 'assets/blimp.png', {
					blimp_rank_01: [0, 0],
					blimp_rank_02: [1, 0],
					blimp_rank_03: [0, 1],
					blimp_rank_04: [1, 1]
				});

				//Crafty.scene('Main');
			})
		});

		Crafty.scene('Main', function() {
			var player = Crafty.e('Player').attr( {'x': 50, 'y': 50, 'h': 60, 'w': 30} ).fourway(5).color('#dddddd');
			var turret = Crafty.e('2D, Canvas, Color').attr( {'x': 80, 'y': 100, 'h': 10, 'w': 10} ).color('#ff0000');
			player.attach(turret);
		});
	}
};