///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

//gets random winners.  And Saves users that have already been drawn.
class WinnerDraw {
	private eventId :number;
	constructor(eventId: number) {
		this.eventId = eventId;
	}

	public PickWinners(numberToPick: number) {
		var results : string[];
		if (numberToPick === 1) {
			results = ['12345678901234567890123456789012345678901234567890'];
			return results;
		}else {
			results = ['Winner 1', 'Winner 2'];
			return results;
		}
	}

}