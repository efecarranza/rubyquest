RubyQuest.Fight = function(game) {
	this.bg;
	this.attackButton;
	this.fighterOne;
	this.fighterTwo;
	this.menuLabel;
	this.attackButton;
	this.runButton;
	this.txtStyle;
	this.attacktxt;
	this.runtxt;
	this.heroNamelbl;
	this.heroMaxHp;
	this.heroHp;
	this.counter;
};

RubyQuest.Fight.prototype = {

	init: function(hero, monster) {

	},

	create: function() {
		// Create Background and Battle Menu
		bg = this.add.image(0, 0, 'battlebg');
		menuLabel = this.add.image(20, 360, 'label');
		menuLabel.width = 600;
		menuLabel.height = 100;

		// Add Buttons and Labels
		attackButton = this.add.button(340, 370, 'label', this.attack, this, 2, 1, 0);
		attackButton.width = 120;
		attackButton.height = 30;

		runButton = this.add.button(340, 420, 'label', this.run, this, 2,1, 0);
		runButton.width = 120;
		runButton.height = 30;

		txtStyle = { font: "20px Arial", fill: "#fff", align: "center" };
		attacktxt = this.add.text(365, 373, 'Attack', txtStyle);
		runtxt = this.add.text(365, 423, 'Run', txtStyle);

		heroNamelbl = this.add.text(65, 373, hero.stats.name, txtStyle);
		heroHp = this.add.text(65, 403, "HP: " + hero.stats.hp + " /", txtStyle);
		heroMaxHp = this.add.text(155, 403, hero.stats.maxHp, txtStyle);

		this.black_bar = this.add.sprite(20, 40, 'black_bar');
		this.physics.arcade.enableBody(this.black_bar);
		this.black_bar.anchor.setTo(0,0);

		this.black2_bar = this.add.sprite(20, 60, 'black_bar');
		this.physics.arcade.enableBody(this.black2_bar);
		this.black2_bar.anchor.setTo(0, 0);

		//GUI - red bar for life
		this.blood_bar = this.add.sprite(20, 40, 'red_bar');
		this.physics.arcade.enableBody(this.blood_bar);
		this.blood_bar.anchor.setTo(0, 0);

		//GUI - red bar for mana (ok, it's yellow I know)
		this.green_bar = this.add.sprite(20, 60, 'yellow_bar');
		this.physics.arcade.enableBody(this.green_bar);
		this.green_bar.anchor.setTo(0, 0);

		// Create Fighters
		fighterOne = this.add.sprite(150, 260, 'herofight');
		fighterOne.anchor.setTo(0.5,0.5);
		fighterTwo = this.add.sprite(400, 220, 'snakemonster');

		fighterOne.height = 320;
		fighterOne.width = 208;
		fighterTwo.height = 128;
		fighterTwo.width = 96;

		// Add animations
		fighterOne.animations.add('attack', [0,1,2,3,4,5,0]);
		fighterTwo.animations.add('attack');

		counter = 0;


	},

	update: function() {

	},

	attack: function() {

		this.rnd = Math.random();

		if (counter % 2 === 0) {
		  fighterOne.animations.play('attack', 10, false);
		  if (this.rnd > 0.2) {
				monster.hp -= hero.stats.str;
				console.log(monster.hp);
			} else {
				console.log('Miss');
			}
			if (monster.hp <= 0) {
				monster.kill();
				this.time.events.add(2000, this.state.start('rubyquest', false, false), this);
			}
			counter++;
		} else {
			if (this.rnd > 0.25) {
			fighterTwo.animations.play('attack', 10, false);
			hero.stats.hp -= monster.str;
			} else {
				console.log('monster missed');
			}
			counter++;
			hero.stats.hp = parseInt(hero.stats.hp);
			this.blood_bar.scale.setTo((hero.stats.hp / hero.stats.maxHp), 1);
			heroHp.setText("HP: " + hero.stats.hp + " /");
		}

	},

	run: function() {
		this.state.start('rubyquest', false, false);

	},
};
