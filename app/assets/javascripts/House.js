RubyQuest.House = function(game) {
  this.housemap;
  this.housemap2;
  this.housejson;
  this.blockLayer;
  this.father;
  this.interactKey;
};

RubyQuest.House.prototype = {

  init: function(hero, cursors) {

  },

  create: function() {
    this.world.setBounds(0,0,640,480);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    housemap = this.add.sprite(0, 0, 'house');
    housemap2 = this.add.sprite(0, 0, 'housetop');
    housejson = this.add.tilemap('houseblock');
    housejson.addTilesetImage('hole', 'hole');
    blockLayer = housejson.createLayer('blocking');
    housejson.setCollisionByExclusion([0], true, 'blocking');

    hero.loadTexture('hero');
    this.world.bringToTop(housemap);

    father = this.add.sprite(554, 168, 'father');

    father.lines = ["Good morning son.",
                    "I noticed you had a bad dream last night,",
                    "Please tell me more about it.",
                    "So you were trapped in this world and saw a Ruby that shattered into pieces?",
                    "A long time ago, there was magical Ruby on Modool that kept the balance between good and evil,",
                    "But one day, the evil Pythonista found a way to destroy this Ruby,",
                    "Without it to balance the natural forces of good and evil, the Pythonista took over Modool,",
                    "The Ruby shards still contain power, but I don't know much more about it.",
                    "Eddard of House Taurus is an old wizard who knows all about magic,",
                    "He lives west of here by himself, if you want to know more, you should go meet him,",
                    "Please take care son, this journey might be very dangerous.",
                    "Here's a sword in case there are any monsters."];

    father.talk = function() {
        // check to see if talking
      if(!this.currently_talking){
        // this is where the dialogue cycle goes
        this.currently_talking = true;
        // set dialogue line to 0 (fist line)
        currentLine = 0;
        // bring up the dialogue box
        $('#dialogue').toggle().css({'position':'absolute','top':$('canvas').offset().top+30+'px','left':$('canvas').offset().left+20+'px'});
        // on interact key down, bring up next line in dialogue array
        $('#dialogue').text(father.lines[currentLine]);
      } else {
        // on spacebar, cycle to next line of dialogue
        currentLine++;
        if (currentLine === father.lines.length) {
          this.currently_talking = false;
              alert("Obtained 'Sword'");
          progress.act1.metFather = true;
          $('#dialogue').toggle();
        }
        // on interact key down, bring up next line in dialogue array
        $('#dialogue').text(father.lines[currentLine]);

      }
    };

    interactKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    interactKey.onDown.add(this.interact, this);

    this.world.bringToTop(hero);
    this.world.bringToTop(housemap2);

    hero.animations.add('walkup', [0,1,2,3,4,5,6,7,8]);
    hero.animations.add('walkleft', [9,10,11,12,13,14,15,16,17]);
    hero.animations.add('walkdown', [18,19,20,21,22,23,24,25,26]);
    hero.animations.add('walkright', [27,28,29,30,31,32,33,34,35]);

    hero.body.setSize(33, 51, 0, 0);

    this.physics.arcade.enable([hero, housejson, father]);

    hero.body.collideWorldBounds = true;
    hero.alpha = 1;
    father.body.immovable = true;
    father.body.setSize(35, 50, 18, 0);

  },


  currently_talking: false,

  update: function() {
    this.physics.arcade.collide(hero, blockLayer, null, null, this);
    this.physics.arcade.collide(hero, father, null, null, this);

    if (hero.position.y > 450 && progress.act1.metFather) {
      hero.position.x = 1404;
      hero.position.y = 2302;
      this.state.start('rubyquest', false, false, this.hero);
    };

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

  interact: function() {
    if(this.physics.arcade.distanceBetween(hero, father) < 100){
      father.talk();
    }
  },

  mainWorld: function() {
    this.state.start('rubyquest');

  }

  };
