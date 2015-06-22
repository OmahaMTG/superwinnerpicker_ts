///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class Kong extends Phaser.Sprite{
	private arcadeBody: Phaser.Physics.Arcade.Body;

	constructor(game: Phaser.Game, kongRowHeight: number) {
        super(game, 125, kongRowHeight - (34 * 3), 'kong');
		this.scale.set(3, 3);
		this.game.physics.arcade.enableBody(this);
		this.game.physics.arcade.enable;

		this.arcadeBody = <Phaser.Physics.Arcade.Body>this.body;
		this.arcadeBody.collideWorldBounds = true;
		this.arcadeBody.gravity.y = 300;
		this.animations.add('wait', [2, 3], 1, true);
		this.animations.add('angry', [0, 1], 2, true);
		this.animations.play('wait', null, true);
	}

}