document.addEventListener("DOMContentLoaded", function() {
	TT.debug('================');
	TT.debug('TalkTalk testing');
	TT.debug('================');

	TT.loadDb({
		//Dialog set
		"HOME_MAIN": {
			//Properties
			linear: true,
			type: 'sequence',
			toDialog: "HOME_MAIN_002",
			//Lines
			"lines": {
				//Dialog lines
				"HOME_001_AVAT": {
					actor: 'PLAYER',
					pause: 500,
					text: "Hey, this is a test..."
				},
				"HOME_002_AVAT": {
					actor: 'PLAYER',
					pause: 1500,
					text: "...relax."
				},
				"HOME_003_AVAT": {
					actor: 'PLAYER',
					pause: 1500,
					text: "It's no big deal"
				},
				"HOME_004_AVAT": {
					actor: 'HERMAN',
					pause: 3000,
					text: "Congrats!"
				},
				"HOME_005_HERMAN": {
					actor: 'HERMAN',
					pause: 1500,
					text: "Seems it's working so far..."
				}
			}
		},
		//Dialog set
		"HOME_CHOICES": {
			//Properties
			linear: true,
			type: 'choice',
			//Lines
			"lines": {
				//Dialog lines
				"HOME_006_AVAT": {
					actor: 'PLAYER',
					pause: 0,
					text: "I could play this all night."
				},
				"HOME_007_AVAT": {
					actor: 'PLAYER',
					pause: 0,
					text: "I can't believe how stupid this game is."
				},
				"HOME_008_AVAT": {
					actor: 'PLAYER',
					pause: 0,
					text: "Hum."
				}
			}
		}
	});

	var actors = {
		'HERMAN': document.getElementById('HERMAN'),
		'PLAYER': document.getElementById('PLAYER')
	};

	var clearDialogs = function() {
		for(var idx in actors) {
			actors[idx].innerHTML = '';
		}
	}

	TT.on('dialogChoices', function(lines) {
		var choice = '';
		clearDialogs();
		for(var i=0; i<lines.length; i++) {
			var line = lines[i];
			choice = (i+1) + '. ' + line.text + '\n';
			actors[line.actor].innerHTML += choice;
		}
	});
	TT.on('dialogShown', function(line) {
		actors[line.actor].innerHTML = line.text;
	});

	TT.engage('HOME_MAIN_001');

});