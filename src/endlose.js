Crafty.scene('EndLose', function () {
	Crafty.unbind('EnterFrame');
	Crafty.e('Parallax').background('assets/parallax00.png').parallax(0);
	var loseMessage = 'You broke your butt...';
	Crafty.e('2D, Canvas, Text, Tween')
		.text(loseMessage)
		.textFont({size: '100px', family: 'Georgia, serif'})
		.attr({
			x: -Crafty.viewport.x + (Game.width - loseMessage.length*40)/2,
			y: Crafty.viewport.y + Game.height/2 + 34,
			w: Game.width
		});
});