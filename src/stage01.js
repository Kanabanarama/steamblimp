Crafty.scene('Stage01', function () {
	Crafty.e('Parallax').background('assets/parallax00.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/parallax01.png').parallax(1);
	Crafty.e('Parallax').background('assets/parallax02.png').parallax(1.5);

	var player = Crafty.e('Player').attr({ x: 100, y: 200 });

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

	player.timeout(generateFlugdings, 8000);
	function generateFlugdings() {
		var rand = Math.random();
		Crafty.e('EnemyFlugdings').attr({
			x: -1 * Crafty.viewport.x + 1000,
			y: rand * (500 + Crafty.viewport.y)
		});
		if( sceneActive ) player.timeout(generateFlugdings, 8000);
	}

	Game.score = Crafty.e('Score, Persist');

	player.timeout(function () {
		sceneActive = false;
		Crafty.scene('Stage02');
	}, 1000);
});