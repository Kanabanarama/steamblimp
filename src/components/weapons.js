Crafty.c('Weapons', {

	weapons: ['Gun'],

	init: function () {
		this.requires('2D, Persist, Canvas, Text')
			.attr({x: 15, y: 35})
			.textFont({size: '20px', family: 'Georgia, serif'})
			.text('Weapons: ' + this.getHudText());
	},

	getHudText() {
		return this.weapons.map((weapon, i) => {
			return '('+(i+1)+')-'+weapon;
		}).join(',');
	},

	obtain: function (weapon) {
		if(this.weapons.includes(weapon)) return;
		this.weapons.push(weapon);
		this.text('Weapons: ' + this.getHudText());
	},

	inPosession: function (weapon) {
		return this.weapons.includes(weapon);
	}
});