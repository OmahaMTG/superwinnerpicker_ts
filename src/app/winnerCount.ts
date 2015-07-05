///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

class WinnerCount extends Phaser.Text{

	private maxWinners: number;
	private upKey: Phaser.Key;
	private downKey: Phaser.Key;
	public numberOfWinnersToGet :number;
	private helpText: string;

	constructor(game: Phaser.Game, maxWinners: number) {
		this.helpText = 'Up/Down to chose number of Winners. \n  Space to draw Winners. \n # of Winners to draw = ';
		var locationY = 10;
		var locationX = game.width - 300;

		super(game, locationX, locationY, this.helpText + '01', { font: '15px Arial', fill: '#ffffff', align: 'right' });

		this.numberOfWinnersToGet = 1;
		this.UpdateNumber(0);
		this.maxWinners = maxWinners;
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	}

	private UpdateNumber(updateAmount: number) {
		var newNumberOfWinnersToGet = this.numberOfWinnersToGet + updateAmount;
		if (newNumberOfWinnersToGet <= this.maxWinners && newNumberOfWinnersToGet >= 1) {
			this.numberOfWinnersToGet = newNumberOfWinnersToGet;

			if (this.numberOfWinnersToGet <= 9) {
				this.text = this.helpText +  '0' + this.numberOfWinnersToGet.toString();
			}else {
				this.text = this.helpText +  this.numberOfWinnersToGet.toString();
			}
		}
	}

	public CheckKeys() {
		if (this.upKey.justDown)	{
			this.UpdateNumber(1);
		}else if (this.downKey.justDown)	{
			this.UpdateNumber(-1);
		}
	}
}