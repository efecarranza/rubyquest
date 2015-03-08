	RubyQuest.rubyquest = function(game) {
	this.hero;
	this.ed;
	this.jo;
	this.monsterEyes;
	this.snakemonster;
	this.cursors;
	this.mainmap;
	this.mainmap2;
	this.mainmapjson;
	this.blockedLayer;
	this.menuKey;
	this.interactKey;
	this.pauseKey;
	this.inputKey;
	this.dialogue;
	this.currentLine;
	this.npcs;
	this.monsters;
};

RubyQuest.rubyquest.prototype = {

	init: function(hero, progress) {

	},

	create: function() {
		this.world.setBounds(0,0,3200,2400);
		this.physics.startSystem(Phaser.Physics.ARCADE);
		mainmap = this.add.sprite(0, 0, 'map');
		mainmap2 = this.add.sprite(0, 0, 'map2');
		mainmapjson = this.add.tilemap('rq4map');
		mainmapjson.addTilesetImage('hole', 'hole');
		blockedLayer = mainmapjson.createLayer('blocking');
		mainmapjson.setCollisionByExclusion([0], true, 'blocking');

		npcs = this.add.group();

		monsterEyes = this.add.sprite(330, 630, 'monster');
		monsterEyes.hp = 100;
		monsterEyes.str = 15;

		snakemonster = this.add.sprite(780, 2200, 'snakemonster');
		snakemonster.maxHp = 100;
		snakemonster.hp = 100;
		snakemonster.str = 15;

		jo = this.add.sprite(1250, 2123, 'cat');

		ed = this.add.sprite(162, 2200, 'ed');
		ed.lines = ["Hello, I can see you are beginning a journey...", "...a journey that will take you to many dark places.",
			"You will need a great power to succeed.", "A power that only could be channeled through....Ruby...",
			"This Ruby was long ago shattered into many pieces.", "Only fragments remain, which in common lore are referred to as 'gems.'",
			"In order to unlock the power of the gem you are going to need to speak to it first...", "Let me explain you the basics:" ]

		hero.loadTexture('hero');
		this.world.bringToTop(mainmap);
		this.world.bringToTop(monsterEyes);
		this.world.bringToTop(snakemonster);
		this.world.bringToTop(jo);
		this.world.bringToTop(ed);
		this.world.bringToTop(npcs);
		this.world.bringToTop(hero);
		this.world.bringToTop(mainmap2);

		hero.animations.add('walkup', [0,1,2,3,4,5,6,7,8]);
		hero.animations.add('walkleft', [9,10,11,12,13,14,15,16,17]);
		hero.animations.add('walkdown', [18,19,20,21,22,23,24,25,26]);
		hero.animations.add('walkright', [27,28,29,30,31,32,33,34,35]);

		this.physics.arcade.enable([hero, monsterEyes, ed, jo, snakemonster, mainmapjson, npcs]);

		menuKey = this.input.keyboard.addKey(Phaser.Keyboard.M);
		menuKey.onDown.add(this.menu, this);
		interactKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		interactKey.onDown.add(this.interact, this);
		pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.P);
		pauseKey.onDown.add(this.pause, this);
		inputKey = this.input.keyboard.addKey(Phaser.Keyboard.I);
		inputKey.onDown.add(this.gameInput, this);

		this.camera.follow(hero, Phaser.Camera.FOLLOW_TOPDOWN);
		monsterEyes.body.immovable = true;
		ed.body.immovable = true;
		jo.body.immovable = true;
		snakemonster.body.immovable = true;
		hero.body.collideWorldBounds = true;
		hero.alpha = 1;

		hero.body.setSize(33, 51, 0, 0);
		ed.body.setSize(35, 50, 18, 0);
		jo.body.setSize(25, 30, 10, 0);

		npcs.add(jo);

		$('#input').submit( function(e) {
			e.preventDefault();
			$.ajax( {
				type: "POST",
				url:"/answers.json",
				data: { id: 1, answer: $('#form_input').val()}
			}).success(function(data) {
				if (data.message === 'Success') {
					alert("Congratulations! You've acquired a Gem.");
					progress.gems.gemOne = true;
					hero.stats.maxHp = 400;
					hero.stats.hp = 400;
					hero.stats.str = 25;
				} else {
					alert("Oops, try again!");
				}
			});

		});

	},

	update: function() {

		this.physics.arcade.collide(hero, monsterEyes, this.startFight, null, this);
		this.physics.arcade.collide(hero, snakemonster, this.startFight, null, this);
		this.physics.arcade.collide(hero, ed, null, null, this);
		this.physics.arcade.collide(hero, npcs, null, null, this);
		this.physics.arcade.collide(hero, blockedLayer, null, null, this);

		if (progress.act1.metEd && !progress.gems.gemOne) {
			$('#teachings').css("background-image", "url(/assets/lesson1.png");
			$('#teachings').show().css({'position':'absolute','top':$('canvas').offset().top +'px','left':$('canvas').offset().left+'px'});
			$('#input').show().css({'position':'absolute','top':$('canvas').offset().top + 400 + 'px','left':$('canvas').offset().left+ 230 +'px'});;

		} else {
			$('#teachings').hide();
			$('#input').hide();
		}

		hero.body.velocity.x = 0;
		hero.body.velocity.y = 0;
		if (!this.currently_talking) {
			if (cursors.up.isDown) {
				hero.body.velocity.y = -80;
				hero.animations.play('walkup', 10, true);
			} else if (cursors.down.isDown) {
				hero.body.velocity.y = 80;
				hero.animations.play('walkdown', 10, true);
			} else if (cursors.left.isDown) {
				hero.body.velocity.x = -80;
				hero.animations.play('walkleft', 10, true);
			} else if (cursors.right.isDown) {
				hero.body.velocity.x = 80;
				hero.animations.play('walkright', 10, true);
			} else {
				hero.animations.stop(null, true);
			};
		};

	},

	startFight: function(enemy) {
		this.state.start('Fight', false, false, enemy);
	},

	menu: function() {
		$('#menu').toggle().css({'position':'absolute','top':$('canvas').offset().top+'px','left':$('canvas').offset().left+'px'});
		$('#hpMenu').text("HP: " + hero.stats.hp + ' / ' + hero.stats.maxHp);
		$('#nameMenu').text("Name: " + hero.stats.name);
	},


	interact: function() {
		// console.log('interact');
		if(this.physics.arcade.distanceBetween(hero,ed) < 100){
			this.talk();
		}
	},

	gameInput: function() {
	},

	// represents whether the hero is talking
	currently_talking: false,

	// this makes the hero talk
	talk: function(character) {
		// console.log('talking');
		// check to see if talking
		if(!this.currently_talking){
			// this is where the dialogue cycle goes
			this.currently_talking = true;
			// set dialogue line to 0 (fist line)
			currentLine = 0;
			// bring up the dialogue box
			$('#dialogue').toggle().css({'position':'absolute','top':$('canvas').offset().top+30+'px','left':$('canvas').offset().left+20+'px'});
			// on interact key down, bring up next line in dialogue array
			$('#dialogue').text(ed.lines[currentLine]);
		} else {
			// on spacebar, cycle to next line of dialogue
			currentLine++;
			if (currentLine === ed.lines.length) {
				this.currently_talking = false;
				progress.act1.metEd = true;
				$('#dialogue').toggle();
			}
			// on interact key down, bring up next line in dialogue array
			$('#dialogue').text(ed.lines[currentLine]);

		}

	},

		// pauses the game
	pause: function() {
		console.log('pause');
	},

};






