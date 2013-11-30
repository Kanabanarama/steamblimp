Crafty.c('GameObject', {
	init: function () {
		this.requires('2D, Canvas');
	},

	withinViewPort: function () {
		var x = Crafty.viewport.x * -1;
		var y = Crafty.viewport.y;
		var w = Crafty.viewport.width;
		var h = Crafty.viewport.height;

		return this.within(x, y, w, h);
	}
});