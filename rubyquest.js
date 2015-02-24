var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'rubyquest', { preload: preload, create: create, update: update, fight: fight, render: render });

var hero;
var monster;
var speed = 5;
var cursors;

	function preload() {
		game.stage.backgroundColor = '#212121';

		game.load.image('map', 'empty/assets/map.png');
		game.load.spritesheet('hero', 'empty/assets/heroright.png', 63, 60, 9);
		game.load.image('monster', 'empty/assets/monster.png');
		
	};

	function create() {
		game.world.setBounds(0,0,1280,960);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'map');
		monster = game.add.sprite(200, 200, 'monster');

		hero = game.add.sprite(100, 100, 'hero');
		hero.height = 32;
		hero.width = 32;
		hero.anchor.setTo(0.5, 0.5);
		hero.animations.add('walkup');

		game.physics.arcade.enable([hero, monster]);

		cursors = game.input.keyboard.createCursorKeys();

		game.camera.follow(hero, Phaser.Camera.FOLLOW_TOPDOWN);
		hero.body.collideWorldBounds = true;

	};

	function update() {
		game.physics.arcade.overlap(hero, monster, this.fight, null, this);
		hero.body.velocity.x = 0;
		hero.body.velocity.y = 0;

		if (cursors.up.isDown) {
			hero.body.velocity.y = -80;
			hero.animations.play('walkup', 10, true);
		} else if (cursors.down.isDown) {
			hero.body.velocity.y = 80;
		} else if (cursors.left.isDown) {
			hero.body.velocity.x = -80;
		} else if (cursors.right.isDown) {
			hero.body.velocity.x = 80;
			hero.animations.play('walkup', 10, true);
		} else {
			hero.animations.stop(null, true);
		};


	};

	function fight() {
		console.log('going to fight');
	};

	function render() {
		//game.debug.test('use arrow keys to test game.');

	};






