RubyQuest.House = function(game) {
  this.housemap;
  this.housemap2;
  this.housejson;
  this.blockLayer;
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
    this.world.bringToTop(hero);
    this.world.bringToTop(housemap2);

    hero.animations.add('walkup', [0,1,2,3,4,5,6,7,8]);
    hero.animations.add('walkleft', [9,10,11,12,13,14,15,16,17]);
    hero.animations.add('walkdown', [18,19,20,21,22,23,24,25,26]);
    hero.animations.add('walkright', [27,28,29,30,31,32,33,34,35]);

    hero.body.setSize(33, 51, 0, 0);

    this.physics.arcade.enable([hero, housejson]);

    hero.body.collideWorldBounds = true;
    hero.alpha = 1;

  },

  update: function() {
    this.physics.arcade.collide(hero, blockLayer, null, null, this);

    if (hero.position.y > 450) {
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

  mainWorld: function() {
    this.state.start('rubyquest');

  }

  };
