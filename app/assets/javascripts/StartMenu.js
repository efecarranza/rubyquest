RubyQuest.StartMenu = function (game) {
	this.startRQ;
	this.startPrompt;
	this.RQlogo;
};

RubyQuest.StartMenu.prototype = {

	create: function() {

		RQlogo = this.add.sprite(this.world.centerX-100, this.world.centerY-200, 'logo');
		RQlogo.animations.add('logoload');
		startPrompt = this.add.text(this.world.centerX-100, this.world.centerY + 40, "New Game", { font: "35px Arial", fill: "#fff", align: "center" });
		startPrompt.inputEnabled = true;
		startPrompt.events.onInputDown.addOnce(this.startGame, this);

	},

	update: function() {
		RQlogo.animations.play('logoload', 6, false);
	},

	startGame: function() {
		this.state.start('Dream');
	}

};

