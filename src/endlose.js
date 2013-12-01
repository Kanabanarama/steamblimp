Crafty.scene('EndLose', function () {
	Crafty.unbind('EnterFrame');
	Crafty.e('Parallax').background('assets/parallax00.png').parallax(0);
	Crafty.e('2D, Canvas, Text, Tween')
		.text('You broke your butt...')
		.textFont({size: '100px', family: 'Georgia, serif'})
		.attr({ x: 200, y: 320});
});