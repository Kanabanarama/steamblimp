Crafty.c('Parallax', {
	init: function() {
		this.requires('2D, Canvas, Image');
		this.attr({ x: 0, h: 0, w: Crafty.viewport.width*30, h: Crafty.viewport.height });
	},
	background: function(image) {
		this.image(image, "repeat");
		return this;
	},
	parallax: function(speed) {
		this.bind('EnterFrame', function() {
			this.attr({ 'x': this._x-speed });
		})
		return this;
	}
});