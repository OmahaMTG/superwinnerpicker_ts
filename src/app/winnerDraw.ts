///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

//gets random winners.  And Saves users that have already been drawn.
class WinnerDraw {
	private eventId :number;
	constructor(eventId: number) {
		this.eventId = eventId;
	}

	public PickWinners(numberToPick: number) {
		var rsvpUsers =  ['chaussures louboutin bleu chaussures louboutin bleu'
							, 'hermes taschen billig hermes taschen billig'
							, 'abercrombie billig abercrombie billig'
							, 'Krishna Chaitanya Bezwada'
							, 'Sivakumar Rathinavelumani'
							, 'Christina Schneiderheinze'
							, 'Vallinayagam Alagianambi'
							, 'Shivakrishna Shagabandi'
							, 'Raghavendra Immadisetty'
							, 'Karen Reinhardt-Buckley'
							, 'Patricia (Patty) ODell'							
							];
		rsvpUsers = this.shuffle(rsvpUsers)
		
		console.log(numberToPick);
		return rsvpUsers.slice(1, 1 + numberToPick);
		
		
	}
	
	private shuffle(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}

}