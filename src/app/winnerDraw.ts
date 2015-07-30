///<reference path="../../tools/typings/tsd.d.ts" />
///<reference path="../../tools/typings/typescriptApp.d.ts" />

//gets random winners.  And Saves users that have already been drawn.
class WinnerDraw {
	private eventId :number;
	private rsvpUsers :string[];

	private ajaxSuccess: (any) => void;

	getParameterByName(name) {
	    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
	    results = regex.exec(location.search);
	    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	constructor(eventId: number) {
		this.eventId = eventId;

		this.ajaxSuccess = (data: any) => {
			this.rsvpUsers = this.shuffle(data);
		};

		var eventID = this.getParameterByName('eventid');

		$.ajax({
			url: 'http://www.omahamtg.com/Admin/WinnerPicker/GetRsvps?eventid=' + eventID,
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