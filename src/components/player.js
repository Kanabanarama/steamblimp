Crafty.c('Player', {
	init: function() {
		this.requires('2D, Canvas, Controls');
		this.bind('EnterFrame', function() {
			this.attr({ 'x': this._x+1 });
		})
	}
});