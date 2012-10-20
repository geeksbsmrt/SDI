/*
Adam Crawford
SDI 1210
Project 3
*/

var play = { // methods
		jsonPrint : function (team) { 
			play.log("The " + team.teamName + " roster is acceptable: " + play.jsonRoster(team.teamName, team.roster, team, game.rosteredPlayersPerTeam));
			play.jsonFieldPlayers(team, game.fieldPlayersPerTeam);
            if (team.substitution.makesSub) {
                play.log(play.jsonMakeSubstitution(team, team.substitution.old, team.substitution.new));
            };
            play.log(team.teamName + " scored " + play.jsonScore(team, play.jsonGoalScorersNames(team), play.jsonGoalScorersPositions(team)) + " goals during the game.");
			;
		},
		jsonPush : function (team) { 
			var playerNumbers = [];
			for ( var key in team.roster ) {
				var player = team.roster[key];
				playerNumbers.push(player.jerseyNumber);
			};
			return playerNumbers;
		},
		log : function (message) { 
			console.log(message);
		},
		jsonGoalScorersNames : function (team) { 
			var playersWithGoalsNames = [];
			for (var i = 0; i < team.goalScorers.length; i++) {
				for (var key in team.roster) {
					var player = team.roster[key];
					if (team.goalScorers[i] === player.jerseyNumber) {
						playersWithGoalsNames.push(player.name);
					};
				};
			};
			return  playersWithGoalsNames;	
		}, 
		jsonFieldPlayers : function (team, maxPlayersOnField) { 
			while (team.fieldPlayers.length < maxPlayersOnField) {
				var player = team.roster[team.fieldPlayers.length];
				team.fieldPlayers.push(player.jerseyNumber);
			};
			for (var i = 0; i < team.fieldPlayers.length; i++) {
				play.log("Number " + team.roster[i].jerseyNumber + ", " + team.roster[i].name + ", is on the field as a " + team.roster[i].position + " for " + team.teamName + ".");
			};
            return team.fieldPlayers.length;
		},
		jsonRoster : function (teamName, roster, team, maxPlayersOnRoster) { 
			play.log("The " + teamName + " team has " + roster.length + " players on their team.");
			play.log("Their numbers are: " + play.jsonPush(team));
            if (roster.length <= maxPlayersOnRoster) {
                return true;
            } else {
                return false;
            };
		},
		jsonScore : function (team, names, position) { 
			for (var i = 0; i < team.goalScorers.length; i++) {
				play.log("A " + team.teamName + " goal was scored by " + position[i] + ", number " + team.goalScorers[i] + ", " + names[i] + ".");
			};
            return team.goalScorers.length;
		},
		jsonGoalScorersPositions : function (team) { 
			var playersWithGoalsPositions = [];
			for (var i = 0; i < team.goalScorers.length; i++) {
				for (var key in team.roster) {
					var player = team.roster[key];
					if (team.goalScorers[i] === player.jerseyNumber) {
						playersWithGoalsPositions.push(player.position);
					};
				};
			};
			return  playersWithGoalsPositions;	
		},
		jsonMakeSubstitution : function (team, oldPlayer, newPlayer) { 
            for (var i = 0; i < team.roster.length; i++) {
                if ((newPlayer === team.roster[i].name || newPlayer === team.roster[i].jerseyNumber) && team.roster[i].position === "substitute") {
                    var newPlayerName = team.roster[i].name;
                    var newPlayerNumber = team.roster[i].jerseyNumber;
                    for (var j = 0; j < team.fieldPlayers.length; j++){
                        if (oldPlayer === team.fieldPlayers[j]) {
                            for ( var key in team.roster ) {
                                var player = team.roster[key];
                                if (player.jerseyNumber === oldPlayer) {
                                    oldPlayerName = player.name;
                                    oldPlayerNumber = player.jerseyNumber;
                                    oldPlayerPosition = player.position;
                                    team.roster[i].position = oldPlayerPosition;
                                    teamName.fieldPlayers[j] = newPlayerNumber;
                                    var sub = "A substitution was made for " + team.teamName + ". Old player: " + oldPlayerName + " " + oldPlayerNumber + ", New Player: " + newPlayerName + " " + newPlayerNumber + ", Position: " + oldPlayerPosition;
                                    return sub;
                                };
                            };
                        } else {
                            for ( var key in team.roster ) {
                                var player = team.roster[key];
                                if (player.name === oldPlayer && player.position !== "substitute") {
                                    oldPlayerNumber = player.jerseyNumber;
                                    oldPlayerName = player.name;
                                    oldPlayerPosition = player.position;
                                    team.roster[i].position = oldPlayerPosition;
                                    team.fieldPlayers[j] = newPlayerNumber;
                                    var sub = "A substitution was made for " + team.teamName + ". Old player: " + oldPlayerName + " " + oldPlayerNumber + ", New Player: " + newPlayerName + " " + newPlayerNumber + ", Position: " + oldPlayerPosition;
                                    return sub;
                                } else if (player.name === oldPlayer && player.position === "substitute") {
                                    var sub = oldPlayer + " " + player.jerseyNumber + " cannot be substituted.  They are already on the bench.";
                                    return sub;
                                } else {
                                    var sub = oldPlayer + " cannot be substituted.  They are not on this team.";
                                    return sub;
                                };
                            };
                        };
                    };
                } else if ((newPlayer === team.roster[i].name || newPlayer === team.roster[i].jerseyNumber) && team.roster[i].position !== "substitute") {
                    var newPlayerName = team.roster[i].name;
                    var newPlayerNumber = team.roster[i].jerseyNumber;
                    var sub = "A substitution cannot be made for " + newPlayerName + " " + newPlayerNumber + ".  They are not a substitute.";
                    return sub;
                };
            };
			var sub = newPlayer + " cannot be substituted.  They are not on this team.";
            return sub;
		}
    },
    gameWinner = function (homeTeam, awayTeam) { 
        var homeScore = homeTeam.goalScorers.length
        var awayScore = awayTeam.goalScorers.length
        if (homeScore > awayScore) {
            var teamName = homeTeam.teamName;
            var score = homeTeam.goalScorers.length;
        } else if (awayScore > homeScore) {
            var teamName = awayTeam.teamName;
            var score = awayTeam.goalScorers.length;
        } else {
            var teamName = "Neither";
            var score = "tied";
        };
    var winner = {
        winningTeamName : teamName,
        winningScore : score
    };
    return winner;
    }
;
play.jsonPrint(game.homeTeam);
play.log(" ");
play.jsonPrint(game.awayTeam);
play.log(" ");
play.log(gameWinner(game.homeTeam, game.awayTeam).winningTeamName + " won with " + gameWinner(game.homeTeam, game.awayTeam).winningScore + " goals.");