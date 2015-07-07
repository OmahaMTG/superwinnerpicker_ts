///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

//gets random winners.  And Saves users that have already been drawn.
class WinnerDraw {
	private eventId :number;
	private rsvpUsers :string[];

	private ajaxSuccess: (any) => void;

	constructor(eventId: number) {
		this.eventId = eventId;

		this.ajaxSuccess = (data: any) => {
			this.rsvpUsers = this.shuffle(data);
		};

		$.ajax({
			url: 'http://www.omahamtg.com/Admin/WinnerPicker/GetRsvps?eventid=212',
			dataType : 'jsonp',
			async: false,
			success:  this.ajaxSuccess
		});
	}

	public PickWinners(numberToPick: number) {
		var results = this.rsvpUsers.slice(0, numberToPick);
		this.rsvpUsers.splice(0, numberToPick);
		return results;
	}

	private shuffle(o) {

		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {
			//
		};
	    return o;
	}

}