///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class Barrels extends Phaser.Group{

	game :Phaser.Game;
    constructor(game: Phaser.Game, platformHeights: number[]) {
    	super(game);
		this.game = game;
		platformHeights.forEach(x => {
			console.log(this.calculateNumberOfBarrels());
			for (var column = 0; column < this.calculateNumberOfBarrels() ; column++) {
                var barrel = this.create(column * (14 * 2.5) + 200,  x - 40 , 'barrel');
				game.physics.arcade.enable(barrel);
				barrel.body.bounce.y = 0.1;
			    barrel.body.gravity.y = 100;
			    barrel.body.collideWorldBounds = true;
  				this.game.physics.arcade.enableBody(barrel);
				barrel.scale.setTo(2.5, 2.5);
            }
		});
	}

	private calculateNumberOfBarrels() :number {
		return (this.game.width - 400) / (14 * 2.5);
	}
}