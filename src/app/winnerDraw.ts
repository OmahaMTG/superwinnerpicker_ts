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
							, 'Danyelle Bui'
							, 'Santos Breaux'
							, 'Maile Mongold'
							, 'Josephine Organ'
							, 'Cathrine Monaghan'
							, 'Ivelisse Ramsden'
							, 'Lyndsey Wunder'
							, 'Rodrigo Coger'
							, 'Quincy Donley'
							, 'Broderick Nielsen'
							, 'Shyla Mcglamery'
							, 'Katherine Williamson'
							, 'Ines Gerhold'
							, 'Darion DuBuque'					
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