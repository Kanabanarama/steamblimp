Crafty.scene('Stage02', function () {
	Crafty.e('Parallax').background('assets/hintergrund2_ebene0.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene1.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene2.png').parallax(1);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene3.png').parallax(1.5);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene4.png').parallax(1.5);

	var player = Crafty.e('Player').attr({ x: 100, y: 200 });

	var level = {
		1: { type: 'Coin', y: 10 },
		2: { type: 'Coin', y: 30 },
		3: { type: 'Coin', y: 50 },
		4: [
			{ type: 'Coin', y: 50 },
			{ type: 'Coin', y: 70 },
			{ type: 'Coin', y: 90 },
			{ type: 'Coin', y: 110 },
			{ type: 'Coin', y: 130 }
		],
		1: [
			{ type: 'EnemyFlugzeug' },
			{ type: 'EnemyFlugdings' },
			{ type: 'EnemyBomb' }
		]
	};

	var sec = 1;
	loop(function () {
		if (sec in level) {
			if ('type' in level[sec]) createEntity(level[sec]);
			else for (var i in level[sec]) createEntity(level[sec][i]);
		}
		sec++;
	}, 1);

	function loop(func, time) {
		player.timeout(function () {
			if (!Crafty.isPaused()) func();
			loop(func, time);
		}, time * 1000);
	}

	function createEntity(config) {
		Crafty.e(config.type).attr({
			x: config.x || 980,
			y: config.y || 400 * Math.random()
		});
	}

	Game.score = Crafty.e('Score').attr({x: 15, y: 30 });
});