Crafty.c('Health', {
	pickupSound: 'heart_pickup',
	init: function () {
		this.requires('Item, heart');
		this.attr({w: 20, h: 20});
	}
});