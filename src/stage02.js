Crafty.scene('Stage02', function () {
	Crafty.e('Parallax').background('assets/hintergrund2_ebene0.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene1.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene2.png').parallax(1);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene3.png').parallax(1.5);
	Crafty.e('Parallax').background('assets/hintergrund2_ebene4.png').parallax(1.5);

	var player = Crafty.e('Player').attr({ x: 100, y: 200 });

	player.setLevel(2);

	var sceneActive = true;

	player.timeout(generateCoin, 2000);
	function generateCoin() {
		var rand = Math.random();
		Crafty.e('Coin').attr({
			x: 950 + (Crafty.viewport.x * -1),
			y: rand * (500 + Crafty.viewport.y)
		});
		if( sceneActive ) player.timeout(generateCoin, 2000);
	}

	player.timeout(generateHealth, 12300);
	function generateHealth() {
		var rand = Math.random();
		Crafty.e('Health').attr({
			x: 980 + (Crafty.viewport.x * -1),
			y: rand * (500 + Crafty.viewport.y)
		});
		if( sceneActive ) player.timeout(generateHealth, 12300);
	}

	player.timeout(generateBomb, 4000);
	function generateBomb() {
		var rand = Math.random();
		Crafty.e('EnemyBomb').attr({
			x: rand * 1200 + (Crafty.viewport.x * -1),
			y: -250
		});
		if( sceneActive ) player.timeout(generateBomb, 4000);
	}


	player.timeout(generateFlugzeug, 7000);
	function generateFlugzeug() {
		var rand = Math.random();
		Crafty.e('EnemyFlugzeug').attr({
			x: -1 * Crafty.viewport.x + 1000,
			y: rand * (500 + Crafty.viewport.y)
		});
		if( sceneActive ) player.timeout(generateFlugzeug, 7000);
	}

	var level = {
		1: []
	};

	var sec = 1;2
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

	Game.score = Crafty.e('Score, Persist');
	Game.weapons = Crafty.e('Weapons, Persist');

	player.timeout(function () {
		sceneActive = false;
		Crafty.scene('Stage03');
	}, 30000);
});