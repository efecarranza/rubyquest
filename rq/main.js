// Initialize Phaser, and create a 400x490px game

var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

// Create our 'main' state that will contain the game

var mainState = {

	preload: function() {
		// This function will be executed at the beginning 
		// That's where we load the game's assets
		game.stage.backgroundColor = '#B2DFDB';

		// Load Ed image
		game.load.image('maded', 'empty/assets/maded.png');
		game.load.image('happyed', 'empty/assets/happyed.png');

		// Add pipes to avoid
		game.load.image('pipe', 'empty/assets/ruby2.png');

	},

	create: function() {
		// This function is called after the preload function
		// Here we set up the game, display, etc.

		// This will set the physics of the game
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Display Ed on the screen
		this.happyed = this.game.add.sprite(100, 245, 'happyed');

		// Add gravity so that Ed comes back down
		game.physics.arcade.enable(this.happyed);
		this.happyed.body.gravity.y = 800;
		this.happyed.anchor.setTo(-0.2, 0.5);

		var spaceKey = 
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		// Handle Pipe Creation
		this.pipes = game.add.group(); // Create a group
		this.pipes.enableBody = true; // Add physics to the group
		this.pipes.createMultiple(20, 'pipe'); // Create 20 pipes
		
		// Timer that will keep adding rows
		this.timer = game.time.events.loop(2000, this.addRowOfPipes, this);

		this.score = 0;
		this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

	},

	update: function() {
		// This function is called 60 times per second
		// It contains the game's logic 
		// Don't let Ed go too high or too low
		if (this.happyed.inWorld == false)
			this.restartGame();

		if (this.happyed.angle < 20)
			this.happyed.angle += 1;

		game.physics.arcade.overlap(this.happyed, this.pipes, this.hitPipe, null, this);

	},

	jump: function() {

		// Check to make sure Ed is alive
		if (this.happyed.alive == false)
			return;


		// Add a vertical velocity to Ed
		this.happyed.body.velocity.y = -250;

		// Create animation for Ed
		var animation = game.add.tween(this.happyed);

		// Set the animation to change the angle of the sprite 
		// Every 100 milliseconds
		animation.to({angle: -20}, 100);

		// Start the animation
		animation.start();

	},

	// Restart game function
	restartGame: function() {
		// Start the 'main' state once again
		game.state.start('main');

	},

	addOnePipe: function(x, y) {
		// Get the first dead pipe of our group
		var pipe = this.pipes.getFirstDead();

		// Set the new position of the pipe
		pipe.reset(x, y);

		// Add velocity to the pipe to make it move left
		pipe.body.velocity.x = -200;

		// Kill the pipe when it's no longer visible
		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;

	},

	addRowOfPipes: function() {
		// pick where the hole will be
		var hole = Math.floor(Math.random() * 5) + 1;

		// Add the 6 pipes
		for (var i = 0; i < 8; i++)
			if (i != hole && i != hole + 1)
				this.addOnePipe(400, i * 60 + 10);

		this.score += 1;
		this.labelScore.text = this.score;

		},

	hitPipe: function() {
		// if Ed hits a pipe, animate
		if (this.happyed.alive == false)
			return;

		// Set the alive property of Ed to false
		this.happyed.alive = false;

		// Prevent new pipes from appearing
		game.time.events.remove(this.timer);

		// Go through all the pipes, and stop their movement
		this.pipes.forEachAlive(function(p) {
			p.body.velocity.x = 0;
		}, this);

	},

};

// This will start the game
game.state.add('main', mainState);
game.state.start('main');

