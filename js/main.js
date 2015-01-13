(function() {
	'use strict';

	window.TT = {};

	TT.__startTime = new Date().getTime();

	TT.db = {};
	TT.debugMode = true;
	TT.events = {
		"dialogShown": []
	};

	//Load dialog DB
	TT.loadDb = function(data) 
	{
		TT.db = data;
	};

	//Map an event to a given function
	TT.on = function(eventName, fn)
	{
		if( TT.events.hasOwnProperty(eventName) ) {
			TT.events[eventName].push(fn);
		}
	};

	//Fire an event
	TT.fireEvent = function(eventName, target)
	{
		TT.debug('firing event ' + eventName);
		for(var i=0; i<TT.events[eventName].length; i++) {
			var fn = TT.events[eventName][i];
			fn(target);
		}
	};

	//Begin a dialog set
	TT.engage = function(id)
	{
		TT.debug('engagine dialog ' + id);
		var dialogSet = TT.getSet(id);
		if( dialogSet.linear ) {
			TT.playLine(id, 0);
		}
	};

	//Get a dialog set
	TT.getSet = function(id)
	{
		TT.debug('getting dialog set ' + id);
		if( TT.db.hasOwnProperty(id) ) {
			return TT.db[id];
		}
	};

	//Debugging in console
	TT.debug = function(str)
	{
		if( TT.debugMode ) {
			var elapsed = new Date().getTime() - TT.__startTime;
			console.log( '[' + elapsed + ']'  + ': ' + str);
		}
	};

	//Play a dialog line
	TT.playLine = function(setID, lineID)
	{
		TT.debug('playing line');
		var dialogSet = TT.getSet(setID),
			line;

		//Show the dialog
		var line = dialogSet.lines[lineID];
		window.setTimeout(TT.fireEvent, line.pause, 'dialogShown', line);

		//Play the next line
		if( lineID < (dialogSet.lines.length-1) ) {
			window.setTimeout(TT.playLine, line.pause, setID, lineID+1);
		}
	};


})();

document.addEventListener("DOMContentLoaded", function() {
	TT.debug('================');
	TT.debug('TalkTalk testing');
	TT.debug('================');

	TT.loadDb({
		//Dialog set
		"HOME_MAIN": {
			//Properties
			linear: true,
			//Lines
			"lines": [
				//Dialog lines
				{
					id: "HOME_001_AVAT",
					pause: 500,
					text: "Hey, this is a test..."
				},
				{
					id: "HOME_002_AVAT",
					pause: 1500,
					text: "...relax."
				},
				{
					id: "HOME_003_AVAT",
					pause: 1500,
					text: "It's no big deal"
				},
				{
					id: "HOME_004_AVAT",
					pause: 3000,
					text: "Congrats!"
				},
				{
					id: "HOME_005_AVAT",
					pause: 500,
					text: "Seems it's working so far..."
				}
			]

		}
	});

	TT.on('dialogShown', function(target) {
		console.log('%c ' + target.text, 'background: #222; color: #bada55');
	});

	TT.engage('HOME_MAIN');

});