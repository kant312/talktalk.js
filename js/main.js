document.addEventListener("DOMContentLoaded", function() {
	TT.debug('================');
	TT.debug('TalkTalk testing');
	TT.debug('================');

	TT.loadDb({
		//Dialog set
		"HOME_MAIN_001": {
			//Properties
			linear: true,
			type: 'sequence',
			toDialog: "HOME_MAIN_002",
			//Lines
			"lines": [
				//Dialog lines
				{
					id: "HOME_001_AVAT",
					actor: 'PLAYER',
					pause: 500,
					text: "Hey, this is a test..."
				},
				{
					id: "HOME_002_AVAT",
					actor: 'PLAYER',
					pause: 1500,
					text: "...relax."
				},
				{
					id: "HOME_003_AVAT",
					actor: 'PLAYER',
					pause: 1500,
					text: "It's no big deal"
				},
				{
					id: "HOME_004_AVAT",
					actor: 'HERMAN',
					pause: 3000,
					text: "Congrats!"
				},
				{
					id: "HOME_005_AVAT",
					actor: 'HERMAN',
					pause: 500,
					text: "Seems it's working so far..."
				}
			]
		},
		//Dialog set
		"HOME_MAIN_002": {
			//Properties
			linear: true,
			type: 'choice',
			//Lines
			"lines": [
				//Dialog lines
				{
					id: "HOME_006_AVAT",
					actor: 'PLAYER',
					pause: 0,
					text: "I could play this all night."
				},
				{
					id: "HOME_007_AVAT",
					actor: 'PLAYER',
					pause: 0,
					text: "I can't believe how stupid this game is."
				},
				{
					id: "HOME_008_AVAT",
					actor: 'PLAYER',
					pause: 0,
					text: "Hum."
				}
			]
		}
	});

	TT.on('dialogChoices', function(lines) {
		for(var i=0; i<lines.length; i++) {
			console.log('%c ' + (i+1) + '. ' + lines[i].text, 'background: #fff; color: #da55ba');
		}
	});
	TT.on('dialogShown', function(line) {
		console.log('%c ' + line.text, 'background: #222; color: #bada55');
	});

	TT.engage('HOME_MAIN_001');

});