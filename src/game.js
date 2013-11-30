Game = {
	init: function () {
		Crafty.init(1000, 600, document.getElementById('canvas'));
		Crafty.background('gray');
		Game.start();
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
	start: function() {
		var player = Crafty.e('Player').attr({'x': 50, 'y': 50, 'h': 60, 'w': 30}).fourway(5).color('#dddddd');
		var turret = Crafty.e('2D, Canvas, Color').attr({'x': 80, 'y': 100, 'h': 10, 'w': 10}).color('#ff0000');

		player.attach(turret);
	}
};