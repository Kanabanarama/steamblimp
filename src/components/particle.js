Crafty.c('Particle', {
	init: function () {
		this.requires('2D, Canvas, Particles');
	},

	setParticles: function (options) {
		var particle = this;
		var removeAfter = options.duration + 3;

		var removeMe = function () {
			removeAfter--;
			if (removeAfter === 0) {
				particle.unbind('EnterFrame', removeMe);
				particle.destroy();
			}
		};

		this.bind('EnterFrame', removeMe);

		return this.particles(options);
	}
});