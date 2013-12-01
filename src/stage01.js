Crafty.scene('Stage01', function () {
	Crafty.e('Parallax').background('assets/parallax00.png').parallax(0);
	Crafty.e('Parallax').background('assets/parallax01.png').parallax(1);
	Crafty.e('Parallax').background('assets/parallax02.png').parallax(1.5);

	Crafty.e('Player').attr({ x: 100, y: 200 });

	var generateCoin = function (e) {
		if (e.frame % 100 === 0) {

			var rand = Math.random();

			Crafty.e('Coin').attr({
				x: 980 + (Crafty.viewport.x * -1),
				y: rand * (500 + Crafty.viewport.y)
			});
		}
	};

	var generateBomb = function (e) {
		if (e.frame % 200 === 0) {
			var rand = Math.random();
			Crafty.e('Enemy').attr({
				x: rand * 1200 + (Crafty.viewport.x * -1),
				y: -250
			});
		}
	};

	var generateFlugzeug = function(e) {
		if(e.frame % 200 === 0) {
			var rand = Math.random();
			Crafty.e('EnemyFlugzeug').attr({
				x: -1*Crafty.viewport.x + 1000,
				y: rand * (500 + Crafty.viewport.y)
			});
		}
	}

	var generateFlugdings = function(e) {
		if(e.frame % 300 === 0) {
			var rand = Math.random();
			Crafty.e('EnemyFlugdings').attr({
				x: -1*Crafty.viewport.x + 1000,
				y: rand * (500 + Crafty.viewport.y)
			});
		}
	}

	Crafty.bind('EnterFrame', generateCoin);
	Crafty.bind('EnterFrame', generateBomb);
	Crafty.bind('EnterFrame', generateFlugzeug);
	Crafty.bind('EnterFrame', generateFlugdings);

	Game.score = Crafty.e('Score').attr({x: 15, y: 30 });

	Crafty.bind('EnterFrame', Game.gameLoop);
});