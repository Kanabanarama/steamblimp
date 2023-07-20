Crafty.scene('Stage03', function () {
	Crafty.e('Parallax').background('assets/hintergrund3_ebene0.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene1.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene2.png').parallax(1);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene3.png').parallax(1.5);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene4.png').parallax(1.5);

	var player = Crafty.e('Player').attr({ x: 100, y: 200 });

	player.setLevel(3);

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

	player.timeout(function () {
		sceneActive = false;
		Crafty.e('EnemyBossship').attr({x: 800, y: 150});
	}, 45000);

	Game.score = Crafty.e('Score, Persist');
	Game.weapons = Crafty.e('Weapons, Persist');
});