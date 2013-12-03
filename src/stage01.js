Crafty.scene('Stage01', function () {
	Crafty.e('Parallax').background('assets/parallax00.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/parallax01.png').parallax(1);
	Crafty.e('Parallax').background('assets/parallax02.png').parallax(1.5);

	var player = Crafty.e('Player').attr({ x: 100, y: 200 });

	var generateCoin = function () {
		var rand = Math.random();
		Crafty.e('Coin').attr({
			x: 980 + (Crafty.viewport.x * -1),
			y: rand * (500 + Crafty.viewport.y)
		});
		player.timeout(generateCoin, 2000);
	};
	player.timeout(generateCoin, 2000);

	var generateHealth = function () {
		var rand = Math.random();
		Crafty.e('Health').attr({
			x: 980 + (Crafty.viewport.x * -1),
			y: rand * (500 + Crafty.viewport.y)
		});
		player.timeout(generateHealth, 12300);
	};
	player.timeout(generateHealth, 12300);

	var generateBomb = function () {
		var rand = Math.random();
		Crafty.e('EnemyBomb').attr({
			x: rand * 1200 + (Crafty.viewport.x * -1),
			y: -250
		});
		player.timeout(generateBomb, 4000);
	};

	player.timeout(generateBomb, 4000);

	var generateFlugzeug = function () {
		var rand = Math.random();
		Crafty.e('EnemyFlugzeug').attr({
			x: -1 * Crafty.viewport.x + 1000,
			y: rand * (500 + Crafty.viewport.y)
		});
		player.timeout(generateFlugzeug, 7000);
	}
	player.timeout(generateFlugzeug, 7000);

	var generateFlugdings = function () {
		var rand = Math.random();
		Crafty.e('EnemyFlugdings').attr({
			x: -1 * Crafty.viewport.x + 1000,
			y: rand * (500 + Crafty.viewport.y)
		});
		player.timeout(generateFlugdings, 8000);
	}
	player.timeout(generateFlugdings, 8000);

	var generateBoss = function () {
		Crafty.e('EnemyBossship').attr({
			x: -1*Crafty.viewport.x + 1000,
			y: Crafty.viewport.y/2
		});
	}
	player.timeout(generateBoss, 60000);

	Game.score = Crafty.e('Score').attr({x: 15, y: 30 });
});