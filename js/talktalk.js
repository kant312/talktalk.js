(function() {
	'use strict';

	window.TT = {};

	TT.__startTime = new Date().getTime();

	TT.db = {};
	TT.debugMode = true;
	TT.events = {
		"dialogShown": [],
		"dialogChoices": []
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

		if( dialogSet.type === 'sequence' ) {
			if( dialogSet.linear ) {
				TT.playLine(id, 0);
			}
		}
		else if( dialogSet.type === 'choice' ) {
			TT.fireEvent('dialogChoices', dialogSet.lines);
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
		//If dialog has ended, check if we need to open another dialog
		else if( dialogSet.hasOwnProperty('toDialog') ) {
			window.setTimeout(TT.engage, line.pause, dialogSet.toDialog);
		}
	};


})();