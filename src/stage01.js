Crafty.scene('Stage01', function() {
	Crafty.e('Parallax').background('assets/parallax00.png').parallax(0);
	Crafty.e('Parallax').background('assets/parallax01.png').parallax(1);
	Crafty.e('Parallax').background('assets/parallax02.png').parallax(1.5);
	Crafty.e('Parallax').background('assets/parallax03.png').parallax(2);

	Crafty.e('Player').attr({ x: 50, y: 50, z: 99 });

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