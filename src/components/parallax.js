Crafty.c('Parallax', {
	depth: 0,
	sprites: {},
	slices: [],
	init: function() {
		this.requires('2D, Canvas');
	},
	setBackground: function(sprite) {
		this.addComponent(sprite);
	},
	setLayer: function(depth) {
		this.depth = depth;
		this.slices[this.depth] = {};
	},
	setFrom: function(x) {
		this.slices[this.depth] = { 'x': x }
	}
});