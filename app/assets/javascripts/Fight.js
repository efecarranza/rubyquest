RubyQuest.Fight = function(game) {
	this.bg;
	this.attackButton;
	this.fighterOne;
	this.fighterTwo;
	this.menuLabel;
	this.attackButton;
	this.runButton;
	this.fireButton;
	this.txtStyle;
	this.attacktxt;
	this.runtxt;
	this.firetxt;
	this.heroNamelbl;
	this.heroMaxHp;
	this.heroHp;
	this.counter;
	this.trackPosition;
	this.emitter;
};

RubyQuest.Fight.prototype = {

	init: function(enemy) {

	},

	create: function() {

		// Create Background and Battle Menu
		bg = this.add.image(0, 0, 'battlebg');
		menuLabel = this.add.image(20, 360, 'label');
		menuLabel.width = 600;
		menuLabel.height = 100;

		// Add Buttons and Labels
		attackButton = this.add.button(300, 370, 'label', this.attack, this, 2, 1, 0);
		attackButton.width = 120;
		attackButton.height = 30;

		runButton = this.add.button(300, 420, 'label', this.run, this, 2, 1, 0);
		runButton.width = 120;
		runButton.height = 30;

		txtStyle = { font: "20px Arial", fill: "#fff", align: "center" };
		attacktxt = this.add.text(325, 373, 'Attack', txtStyle);
		runtxt = this.add.text(325, 423, 'Run', txtStyle);

		if (progress.gems.gemOne) {
			fireButton = this.add.button(440, 370, 'label', this.fireball, this, 2, 1, 0);
			fireButton.width = 120;
			fireButton.height = 30;
			firetxt = this.add.text(465, 373, 'Fireball', txtStyle);
		};

		heroNamelbl = this.add.text(65, 373, hero.stats.name, txtStyle);
		heroNamelbl.stroke = '#000000';
    heroNamelbl.strokeThickness = 4;
		heroHp = this.add.text(65, 403, "HP: " + hero.stats.hp + " /", txtStyle);
		heroHp.stroke = '#000000';
    heroHp.strokeThickness = 4;
		heroMaxHp = this.add.text(155, 403, hero.stats.maxHp, txtStyle);
		heroMaxHp.stroke = '#000000';
    heroMaxHp.strokeThickness = 4;

		this.black_bar = this.add.sprite(20, 40, 'black_bar');
		this.physics.arcade.enableBody(this.black_bar);
		this.black_bar.anchor.setTo(0,0);

		this.black2_bar = this.add.sprite(600, 40, 'black_bar');
		this.physics.arcade.enableBody(this.black2_bar);
		this.black2_bar.anchor.setTo(1, 0);

		//GUI - red bar for life
		this.blood_bar = this.add.sprite(20, 40, 'red_bar');
		this.physics.arcade.enableBody(this.blood_bar);
		this.blood_bar.anchor.setTo(0, 0);

		//GUI - red bar for mana (ok, it's yellow I know)
		this.green_bar = this.add.sprite(600, 40, 'yellow_bar');
		this.physics.arcade.enableBody(this.green_bar);
		this.green_bar.anchor.setTo(1, 0);

		// Create Fighters
		fighterOne = this.add.sprite(150, 260, 'herofight');
		fighterOne.anchor.setTo(0.5,0.5);
		trackPosition = hero.position.x;
		fighterTwo = this.add.sprite(400, 220, 'evilwizard');
		fighterTwo.anchor.setTo(0.5, 0.5);

		fighterOne.height = 320;
		fighterOne.width = 208;
		fighterTwo.height = 128;
		fighterTwo.width = 96;

		// this.firelion2 = this.add.sprite(200, 200, 'fireball');

		// Add animations
		fighterOne.animations.add('attack', [0,1,2,3,4,5,0]);
		fighterTwo.animations.add('attack', [7,8,9,10,11,12,13,7]);

		counter = 0;


	},

	update: function() {


	},

	attack: function() {

		this.rnd = Math.random();

		if (counter % 2 === 0) {
		  fighterOne.animations.play('attack', 10, false);
		  if (this.rnd > 0.2) {
		  	var dmg = this.add.text(fighterTwo.position.x, fighterTwo.position.y, hero.stats.str, txtStyle);
		  	dmg.stroke = '#000000';
    		dmg.strokeThickness = 4;
		  	this.time.events.add(500, dmg.destroy, dmg);
				snakemonster.hp -= hero.stats.str;
				if (snakemonster.hp <= 0) {
					this.green_bar.scale.setTo((0 / snakemonster.maxHp), 1);
					this.killMonster();
				};
			} else {
				var dmg = this.add.text(fighterTwo.position.x, fighterTwo.position.y, 'miss', txtStyle);
				dmg.stroke = '#000000';
    		dmg.strokeThickness = 4;
				this.time.events.add(500, dmg.destroy, dmg);
			}
			counter++;
			if (snakemonster.hp >= 0) {
				this.green_bar.scale.setTo((snakemonster.hp / snakemonster.maxHp), 1);
			};
			} else {
				if (this.rnd > 0.25) {
					fighterTwo.animations.play('attack', 10, false);
					this.snakebite = this.add.sprite(fighterOne.position.x, fighterOne.position.y, 'snakebite');
					this.snakebite.animations.add('attack', [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,0]);
					this.snakebite.animations.play('attack', 15, false);
					var dmg = this.add.text(fighterOne.position.x, fighterOne.position.y, snakemonster.str, txtStyle);
					dmg.stroke = '#000000';
	    		dmg.strokeThickness = 4;
					this.time.events.add(500, dmg.destroy, dmg);
					hero.stats.hp -= snakemonster.str;
				} else {
					var dmg = this.add.text(fighterOne.position.x - 40, fighterOne.position.y - 30, snakemonster.str, txtStyle);
					dmg.stroke = '#000000';
	    		dmg.strokeThickness = 4;
					this.time.events.add(500, dmg.destroy, dmg);
					fighterTwo.animations.play('attack', 10, false);
				}
			counter++;
			this.blood_bar.scale.setTo((hero.stats.hp / hero.stats.maxHp), 1);
			heroHp.setText("HP: " + hero.stats.hp + " /");
		}

	},

	fireball: function() {
		this.rnd = Math.random();
		this.firelion = this.add.sprite(fighterTwo.position.x - 80, fighterTwo.position.y - 80, 'fireball');
		if (this.rnd > 0.2) {
			this.firelion.animations.add('attack', [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,0]);
			this.firelion.animations.play('attack', 10, false);
			// this.firelion.destroy;
			var dmg = this.add.text(fighterTwo.position.x, fighterTwo.position.y, hero.stats.mgk, txtStyle);
			dmg.stroke = '#000000';
  		dmg.strokeThickness = 4;
			this.time.events.add(500, dmg.destroy, dmg);
			snakemonster.hp -= hero.stats.mgk;
			counter++;
			if (snakemonster.hp >= 0) {
				this.green_bar.scale.setTo((snakemonster.hp / snakemonster.maxHp), 1);
			};
			if (snakemonster.hp <= 0) {
				this.green_bar.scale.setTo(( 0 / snakemonster.maxHp), 1);
				this.killMonster();
			};
		} else {
				var dmg = this.add.text(fighterTwo.position.x, fighterTwo.position.y, 'miss', txtStyle);
				dmg.stroke = '#000000';
    		dmg.strokeThickness = 4;
				this.time.events.add(500, dmg.destroy, dmg);
		};
	},

	killMonster: function() {
		fighterTwo.destroy();
		hero.stats.hp = hero.stats.maxHp;
		hero.position.x = trackPosition;
		emitter = this.add.emitter(fighterTwo.position.x, fighterTwo.position.y, 130);
		emitter.makeParticles('rubyshard');
		emitter.minParticleSpeed.setTo(-200, -200);
		emitter.maxParticleSpeed.setTo(200, 200);
		emitter.gravity = 0;
		emitter.start(true, 2000, null, 130);

		this.time.events.add(2000, this.startGame, this);
	},

	startGame: function() {
		this.state.start('rubyquest', false, false);
	},

	run: function() {
		hero.position.x = trackPosition;
		hero.stats.hp = hero.stats.maxHp;
		this.state.start('rubyquest', false, false);

	},
};
