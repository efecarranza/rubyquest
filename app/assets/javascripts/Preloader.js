RubyQuest.Preloader = function(game) {
	this.preloadBar = null;
	this.titleText = null;
	this.ready = false;
};

RubyQuest.Preloader.prototype = {

	preload: function() {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.add.text(this.world.centerX-50, this.world.centerY+40, "loading...", { font: "35px Arial", fill: "#fff", align: "center" });
		this.load.image('map', 'assets/rqmap.png');
		this.load.spritesheet('hero', 'assets/walk.png', 63, 62);
		this.load.spritesheet('herobw', 'assets/walkbw.png', 63, 62);
		this.load.spritesheet('herofight', 'assets/herofight.png', 190, 104);
		this.load.image('monster', 'assets/monster.png');
		this.load.image('battlebg', 'assets/battlebackground.png');
		this.load.spritesheet('logo', 'assets/rubyquestlogo.png', 178, 197);
		this.load.image('label', 'assets/label.png');
		this.load.spritesheet('ed', 'assets/edwalk.png', 53, 63);
		this.load.image('red_bar', 'assets/red_bar.png');
		this.load.image('black_bar', 'assets/black_bar.png');
		this.load.image('yellow_bar', 'assets/green_bar.png');
		this.load.image('ruby', 'assets/ruby.png');
		this.load.image('rubyshard', 'assets/dreamparticle.png');
		this.load.image('cat', 'assets/cat.png');
		this.load.spritesheet('snakemonster', 'assets/snakemonster.png', 94, 78);
		this.load.tilemap('map', 'assets/rqmap.json', null, Phaser.Tilemap.TILED_JSON);

		},

		create: function() {
			this.preloadBar.cropEnabled = false;
		},

		update: function() {
			this.ready = true;
			this.state.start('StartMenu');
		}
	};
