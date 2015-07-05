///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />
class WinnerName  extends Phaser.BitmapText {
	constructor(platformHeight: number, game: Phaser.Game, winnerName: string ) {

	super(game, game.width / 2, platformHeight - 40,  'winnerFont', winnerName, 25);

	this.x = (game.width / 2) - this.width / 2;
	console.log(this.z);
	}
}