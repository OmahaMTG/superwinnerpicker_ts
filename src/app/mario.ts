///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class Mario extends Phaser.Sprite{
	private arcadeBody: Phaser.Physics.Arcade.Body;
	private isSmashing: boolean;

	private platformHights: number[];

	constructor(game: Phaser.Game, platformHeights: number[]) {
		super(game, 50, game.height - 80, 'mario');
		this.platformHights = platformHeights;
		this.scale.set(3, 3);
		this.game.physics.arcade.enableBody(this);
		
		this.body.setSize(34, 28, -30, 0)
		
		this.game.physics.arcade.enable;

		this.arcadeBody = <Phaser.Physics.Arcade.Body>this.body;
		this.arcadeBody.gravity.y = 300;

		this.animations.add('hammer', [ 5, 7, 6, 8], 8, true);
		this.animations.add('ready', [ 5], 8, true);

		this.animations.play('ready', 8 , true);

		this.anchor.setTo(.5, .5);
		
	    this.scale.x *= -1;
		this.isSmashing = false;
		this.checkWorldBounds = true;
		this.events.onOutOfBounds.add(this.ReachedEndOfPlatform, this);
	}

	public StartSmash() {

		if (this.isSmashing) {
			return;
		}

		this.isSmashing = true;

		this.animations.play('hammer', 8 , true);
	}

	public  update() {
		if (!this.isSmashing) {
			return;
		}
				this.body.velocity.x = 250;

	}

	private ReachedEndOfPlatform() {
		var nextRowHeight = this.getNextRowHeight(this.y) - 50;
		//this.y = this.getNextRowHeight(this.y) - 50;
		console.log('nextRowHeight:' + nextRowHeight + 'current rowHeight:' + this.y);
		console.log(this.platformHights);
		if (nextRowHeight + 50 > this.y) {
			this.resetMario();
		}
		this.x = 1;
		this.y = nextRowHeight;
	}

	private resetMario() {
			this.isSmashing = false;
			this.x = 50;
			this.y = this.game.height - 80;
	}

	private getNextRowHeight(currentHeight) {
	  for (var j = 0; j < this.platformHights.length; j++) {
	    if (currentHeight > this.platformHights[j]) {
	      return this.platformHights[j];
	    }
	  }
	  return this.platformHights[0];
	}
}