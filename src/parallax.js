Game.parallax = {
	slices: [],
	generate: function(depth, background, pos) {
		this.slices[depth] = [];
		this.slices[depth][pos] = background;
		return this;
	},
	start: function() {
		Crafty.bind('EnterFrame', function() {
			//console.log(Crafty.viewport.x);

		});
	}
}