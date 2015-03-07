RubyQuest.FirstScene = function(game) {
  this.bg;
  this.bg2;
  this.hero;
  this.tweeny;
  this.tweenlogo;
  this.rqlogo;
  this.tweenbg;
  this.tweenbg2;
  this.tweenhero;
};

RubyQuest.FirstScene.prototype = {

  init: function(hero) {

  },

  create: function() {
    this.world.setBounds(0, 0, 3200, 2400);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    hero = this.add.sprite(682, 900, 'hero');
    hero.alpha = 0;
    bg = this.add.sprite(0, 0, 'map');
    bg2 = this.add.sprite(0, 0, 'map2');
    bg.alpha = 0;
    bg2.alpha = 0;
    bg.height = 1200;
    bg.width = 1600;
    bg2.height = 1200;
    bg2.width = 1600;

    this.physics.arcade.enable([hero]);

    cursors = this.input.keyboard.createCursorKeys();
    interactKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    interactKey.onDown.add(this.interact, this);

    hero.body.collideWorldBounds = true;
    this.camera.follow(hero, Phaser.Camera.FOLLOW_TOPDOWN);

    tweeny = this.add.tween(hero);

    tweenbg = this.add.tween(bg);
    tweenbg2 = this.add.tween(bg2);

    tweenbg.to( {alpha: 1}, 16000);
    tweenbg2.to( {alpha: 1}, 16000);

    tweeny.to( {y: 125 }, 24000);

    this.runText();


  },

  update: function() {
    if (hero.position.y <= 140) {
      rqlogo = this.add.sprite(345,0, 'black');
      console.log('before');
      this.time.events.add(1000, this.startGame(), this);
      console.log('after');
    };

  },

  runText: function() {
    this.currentLine = 0;
    this.offset = 50;
    this.lines = [ "In a world ravaged by war",
                   "the evil Pythonista has taken control.",
                   "His magical snake has downed all those",
                   "who have opposed him.",
                   "The only hope for the citizens of Modool",
                   "might lie in the power of a long lost language."];

    this.style = { font: "30px Arial", fill: "#fff", align: "center" };
    while (this.currentLine < 6) {
      this.text = this.add.text(370, 650 + this.offset, this.lines[this.currentLine], this.style);
      this.text.alpha = 0;
      this.tween = this.add.tween(this.text);
      this.tween.to( {alpha: 1}, 4000);
      this.tween.start();
      this.offset += 50;
      this.currentLine++;
    };
    this.runLogo();
  },

  runLogo: function() {
    tweenbg.start();
    tweenbg2.start();

    tweeny.start();
    this.world.bringToTop(bg);
    this.world.bringToTop(bg2);

  },

  startGame: function() {
    tweenhero = this.add.tween(hero);
    tweenhero.to( { alpha: 1}, 2000);
    tweenhero.start();
    if (hero.alpha === 1) {
      this.state.start('Dream');
    }
  },

  interact: function() {
  },

};
