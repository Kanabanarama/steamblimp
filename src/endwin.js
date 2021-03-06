Crafty.scene('EndWin', function () {
	Crafty.unbind('EnterFrame');
	Crafty.e('Parallax').background('assets/parallax00.png').parallax(0);
	var loseMessage = 'Your butt remains safe!';

	Crafty.audio.play('won');

	var text = Crafty.e('2D, Canvas, Text, Tween')
		.text(loseMessage)
		.textFont({size: '90px', family: 'Georgia, serif'})
		.attr({
			alpha: 0,
			x: -Crafty.viewport.x + (Game.width - loseMessage.length*38)/2,
			y: Crafty.viewport.y - 100,
			w: Game.width
		});

	text.tween({alpha: 1, y: text.y + Game.height/2 + 50}, 2000);

	text.timeout(function () {
		Crafty.scene('Stage02');
	}, 10000);
});