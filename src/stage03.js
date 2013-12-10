Crafty.scene('Stage03', function () {
	Crafty.e('Parallax').background('assets/hintergrund3_ebene0.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene1.png').parallax(0.5);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene2.png').parallax(1);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene3.png').parallax(1.5);
	Crafty.e('Parallax').background('assets/hintergrund3_ebene4.png').parallax(1.5);

	var player = Crafty.e('Player').attr({ x: 100, y: 200 });

	player.timeout(function () {
		Crafty.e('EnemyBossship').attr({x: 800, y: 150});
	}, 5000);

	Game.score = Crafty.e('Score').attr({x: 15, y: 15 });
});