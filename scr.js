var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var path = require('path');
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 61546);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('*/css', express.static(path.join(__dirname, 'public/css')));
app.use('*/js', express.static(path.join(__dirname, 'public/js')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res,next){
  var context = {};
  var sqlQueries = "call displayHomePage()";
  mysql.pool.query(sqlQueries, [1,2,3,4,5,6,7,8,9], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.bestPlayers = rows[0];
    context.mostPopulatedCountries = rows[1];
    context.mostDenseAreas = rows[2];
    context.bestTeams = rows[3];
    context.championsLeagueTeams = rows[4];
    context.captains = rows[5];
    context.youngestTeams = rows[6];
    context.teamsWithMostTournaments = rows[7];
    context.mostPopularPositions = rows[8];
    res.render('home', context);
  });
});

app.get('/player',function(req,res,next){
  var context = {};
  var sqlQueries = "call displayPlayerPage()";
  mysql.pool.query(sqlQueries, [1,2,3,4,5], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allPlayerInfo = rows[0];
    context.allTeams = rows[1];
    context.allCountries = rows[2];
    context.allAreas = rows[3];
    context.allPositions = rows[4];
    res.render('player', context);
  });
});

app.get('/team',function(req,res,next){
  var context = {};
  var sqlQueries = "CALL displayTeamPage()";
  mysql.pool.query(sqlQueries, [1,2,3,4], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allTeamInfo = rows[0];
    context.allCountries = rows[1];
    context.allAreas = rows[2];
    context.allLeagues = rows[3];
  res.render('team', context);
  });
});

app.get('/position',function(req,res,next){
  var context = {};
  var sqlQueries = "CALL displayPositionPage()";
  mysql.pool.query(sqlQueries, [1], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allPositionInfo = rows[0];
    res.render('position', context);
  });
});

app.get('/league',function(req,res,next){
  var context = {};
  var sqlQueries = "CALL displayLeaguePage()";
  mysql.pool.query(sqlQueries, [1], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allLeagueInfo = rows[0];
    res.render('league', context);
  });
});

app.get('/area',function(req,res,next){
  var context = {};
  var sqlQueries = "CALL displayAreaPage()";
  mysql.pool.query(sqlQueries, [1], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allAreaInfo = rows[0];
    res.render('area', context);
  });
});

app.get('/country',function(req,res,next){
  var context = {};
  var sqlQueries = "CALL displayCountryPage()";
  mysql.pool.query(sqlQueries, [1,2], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allCountryInfo = rows[0];
    context.allAreas = rows[1];
    res.render('country', context);
  });
});

app.get('/tournaments',function(req,res,next){
  var context = {};
  var sqlQueries = "CALL displayTournamentsPage()";
  mysql.pool.query(sqlQueries, [1], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allTournamentsInfo = rows[0];
    res.render('tournaments', context);
  });
});

app.get('/tournament-teams',function(req,res,next){
  var context = {};
  var sqlQueries = "CALL displayTournamentTeamsPage()";
  mysql.pool.query(sqlQueries, [1,2,3], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allTournamentTeamsInfo = rows[0];
    context.allTeams = rows[1];
    context.allTournaments = rows[2];
    res.render('tournament-teams', context);
  });
});

app.get('/player/delete/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_player` WHERE `player_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/player');
});

app.get('/team/delete/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_team` WHERE `team_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/team');
});

app.get('/position/delete/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_position` WHERE `position_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/position');
});

app.get('/league/delete/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_league` WHERE `league_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/league');
});

app.get('/country/delete/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_country` WHERE `country_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/country');
});

app.get('/area/delete/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_area` WHERE `area_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/area');
});

app.get('/tournaments/delete/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_tournaments` WHERE `tournament_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/tournaments');
});

app.get('/tournament-teams/delete/:teamId/:tournamentId',function(req,res,next){
  var context = {};
  var sqlQueries = "DELETE FROM `scr_tournament_teams` WHERE `team` = ? AND `tournament` = ?";
  mysql.pool.query(sqlQueries, [req.params.teamId, req.params.tournamentId], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/tournament-teams');
});

app.get('/position/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT `position_id`, `position_name` FROM `scr_position` WHERE `position_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  context.positionName = rows[0].position_name;
  context.positionId = rows[0].position_id;
  res.render('position-edit', context);
  }); 
});

app.get('/league/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT `league_id`, `league_name` FROM `scr_league` WHERE `league_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  context.leagueName = rows[0].league_name;
  context.leagueId = rows[0].league_id;
  res.render('league-edit', context);
  }); 
});

app.get('/area/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT `area_id`, `area_name` FROM `scr_area` WHERE `area_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  context.areaName = rows[0].area_name;
  context.areaId = rows[0].area_id;
  res.render('area-edit', context);
  }); 
});

app.get('/tournaments/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT `tournament_id`, `tournament_name` FROM `scr_tournaments` WHERE `tournament_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  context.tournamentName = rows[0].tournament_name;
  context.tournamentId = rows[0].tournament_id;
  res.render('tournaments-edit', context);
  }); 
});

app.get('/country/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT `country_id`, `country_name`, `country_area`, `population` FROM `scr_country` WHERE `country_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.countryName = rows[0].country_name;
    context.countryId = rows[0].country_id;
    context.countryArea = rows[0].country_area;
    context.countryPopulation = rows[0].population;
  });
  var sqlQueries1 = "SELECT area_name, area_id FROM scr_area GROUP BY area_name ORDER BY area_name ASC";
  mysql.pool.query(sqlQueries1, [1], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allAreas = rows;
    res.render('country-edit', context); 
  });
});

app.get('/team/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT `team_id`, `team_name`, `league`, `coach`, `team_country`, `team_area` FROM `scr_team` WHERE `team_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.teamName = rows[0].team_name;
    context.teamId = rows[0].team_id;
    context.teamLeague = rows[0].league;
    context.teamCoach = rows[0].coach;
    context.teamCountry = rows[0].team_country;
    context.teamArea = rows[0].team_area;
  });
  var sqlQueries1 = "SELECT country_name, country_id FROM scr_country GROUP BY country_name ORDER BY country_name ASC; SELECT area_name, area_id FROM scr_area GROUP BY area_name ORDER BY area_name ASC; SELECT league_name, league_id FROM scr_league GROUP BY league_name ORDER BY league_name ASC";
  mysql.pool.query(sqlQueries1, [1,2,3], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allCountries = rows[0];
    context.allAreas = rows[1];
    context.allLeagues = rows[2];
    res.render('team-edit', context); 
  });
});

app.get('/player/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT `player_id`, `fname`, `lname`, `player_team`, `player_country`, `player_area`, `height`, `weight`, `skill_rating`, `age`, `position`, `captain` FROM `scr_player` WHERE `player_id` = ?";
  mysql.pool.query(sqlQueries, [req.params.id], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.playerFName = rows[0].fname;
    context.playerLName = rows[0].lname;
    context.playerId = rows[0].player_id;
    context.playerTeam = rows[0].player_team;
    context.playerCountry = rows[0].player_country;
    context.playerArea = rows[0].player_area;
    context.playerHeight = rows[0].height;
    context.playerWeight = rows[0].weight;
    context.playerSkillRating = rows[0].skill_rating;
    context.playerAge = rows[0].age;
    context.playerPosition = rows[0].position;
    context.playerCaptain = rows[0].captain;
  });
  var sqlQueries1 = "SELECT team_name, team_id FROM scr_team GROUP BY team_id ORDER BY team_name ASC; SELECT country_name, country_id FROM scr_country GROUP BY country_name ORDER BY country_name ASC; SELECT area_name, area_id FROM scr_area GROUP BY area_name ORDER BY area_name ASC; SELECT position_name, position_id FROM scr_position GROUP BY position_name ORDER BY position_name ASC";
  mysql.pool.query(sqlQueries1, [1,2,3,4], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allTeams = rows[0];
    context.allCountries = rows[1];
    context.allAreas = rows[2];
    context.allPositions = rows[3];
    res.render('player-edit', context); 
  });
});

app.get('/tournament-teams/edit/:teamId/:tournamentId',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT t.team_name, ts.tournament_name, t.team_id, ts.tournament_id FROM scr_tournament_teams LEFT JOIN scr_team t ON t.team_id = scr_tournament_teams.team LEFT JOIN scr_tournaments ts ON ts.tournament_id = scr_tournament_teams.tournament WHERE team = ? AND tournament = ? GROUP BY t.team_name, ts.tournament_name";
  mysql.pool.query(sqlQueries, [req.params.teamId, req.params.tournamentId], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.teamName = rows[0].team_name;
    context.teamId = rows[0].team_id;
    context.tournamentId = rows[0].tournament_id;
    context.tournamentName = rows[0].tournament_name;
  });
  var sqlQueries1 = "SELECT team_name, team_id FROM scr_team GROUP BY team_name ORDER BY team_name ASC; SELECT tournament_name, tournament_id FROM scr_tournaments GROUP BY tournament_name ORDER BY tournament_name ASC";
  mysql.pool.query(sqlQueries1, [1,2], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.allTeams = rows[0];
    context.allTournaments = rows[1];
    res.render('tournament-teams-edit', context); 
  });
});

app.post('/position/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_position` SET `position_name` = ? WHERE `position_id` = ?";
  mysql.pool.query(sqlQueries, [req.body.position_name, req.params.id], function(err, rows, fields) {
    if(err) {
	next(err);
	return;
    }
  });
  res.redirect('/position');
});

app.post('/league/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_league` SET `league_name` = ? WHERE `league_id` = ?";
  mysql.pool.query(sqlQueries, [req.body.league_name, req.params.id], function(err, rows, fields) {
    if(err) {
	next(err);
	return;
    }
  });
  res.redirect('/league');
});

app.post('/area/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_area` SET `area_name` = ? WHERE `area_id` = ?";
  mysql.pool.query(sqlQueries, [req.body.area_name, req.params.id], function(err, rows, fields) {
    if(err) {
	next(err);
	return;
    }
  });
  res.redirect('/area');
});

app.post('/tournaments/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_tournaments` SET `tournament_name` = ? WHERE `tournament_id` = ?";
  mysql.pool.query(sqlQueries, [req.body.tournament_name, req.params.id], function(err, rows, fields) {
    if(err) {
	next(err);
	return;
    }
  });
  res.redirect('/tournaments');
});

app.post('/country/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_country` SET `country_name` = ?, `country_area` = ?,`population` = ? WHERE `country_id` = ?";
  mysql.pool.query(sqlQueries, [req.body.country_name, req.body.area, req.body.population, req.params.id], function(err, rows, fields) {
    if(err) {
	next(err);
	return;
    }
  });
  res.redirect('/country');
});

app.post('/team/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_team` SET `team_name` = ?, `league` = ?,`coach` = ?, `team_country` = ?, `team_area` = ? WHERE `team_id` = ?";
  mysql.pool.query(sqlQueries, [req.body.team_name, req.body.league, req.body.coach, req.body.country, req.body.area, req.params.id], function(err, rows, fields) {
    if(err) {
        next(err);
        return;
    }
  });
  res.redirect('/team');
});

app.post('/player/edit/:id',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_player` SET `fname` = ?, `lname` = ?,`player_team` = ?, `player_country` = ?, `player_area` = ?, `height` = ?, `weight` = ?, `skill_rating` = ?, `age` = ?, `position` = ?, `captain` = ? WHERE `player_id` = ?";
  mysql.pool.query(sqlQueries, [req.body.fname, req.body.lname, req.body.team, req.body.country, req.body.area, req.body.height, req.body.weight, req.body.skill_rating, req.body.age, req.body.position, req.body.captain, req.params.id], function(err, rows, fields) {
    if(err) {
        next(err);
        return;
    }
  });
  res.redirect('/player');
});

app.post('/tournament-teams/edit/:teamId/:tournamentId',function(req,res,next){
  var context = {};
  var sqlQueries = "UPDATE `scr_tournament_teams` SET `team` = ?, `tournament` = ? WHERE `team` = ? AND `tournament` = ?";
  mysql.pool.query(sqlQueries, [req.body.team, req.body.tournament, req.params.teamId, req.params.tournamentId], function(err, rows, fields) {
    if(err) {
	next(err);
	return;
    }
  });
  res.redirect('/tournament-teams');
});

app.post('/player/search',function(req,res,next){
  var context = {};
  var sqlQueries = "SELECT fname, lname, t.team_name, c.country_name, a.area_name, height, weight, skill_rating, age, p.position_name, captain, player_id FROM scr_player LEFT JOIN scr_team t ON t.team_id = scr_player.player_team LEFT JOIN scr_country c ON c.country_id = scr_player.player_country LEFT JOIN scr_area a ON a.area_id = scr_player.player_area LEFT JOIN scr_position p ON p.position_id = scr_player.position WHERE fname LIKE ? OR lname LIKE ? GROUP BY player_id ORDER BY fname ASC";
  mysql.pool.query(sqlQueries, [req.body.player_search + '%', req.body.player_search + '%'], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
    context.playerSearchResults = rows;
    res.render('player-search', context);
  });
});

app.post('/country',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_country` (`country_name`, `country_area`, `population`) VALUES (?, ?, ?)";
  mysql.pool.query(sqlQueries, [req.body.country_name, req.body.area, req.body.population], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/country');
});

app.post('/league',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_league` (`league_name`) VALUES (?)";
  mysql.pool.query(sqlQueries, [req.body.league_name], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/league');
});

app.post('/position',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_position` (`position_name`) VALUES (?)";
  mysql.pool.query(sqlQueries, [req.body.position_name], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/position');
});

app.post('/area',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_area` (`area_name`) VALUES (?)";
  mysql.pool.query(sqlQueries, [req.body.area_name], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/area');
});

app.post('/tournaments',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_tournaments` (`tournament_name`) VALUES (?)";
  mysql.pool.query(sqlQueries, [req.body.tournament_name], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/tournaments');
});

app.post('/tournament-teams',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_tournament_teams` (`team`, `tournament`) VALUES (?, ?)";
  mysql.pool.query(sqlQueries, [req.body.team, req.body.tournament], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/tournament-teams');
});

app.post('/team',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_team` (`team_name`, `league`, `coach`, `team_country`, `team_area`) VALUES (?, ?, ?, ?, ?)";
  mysql.pool.query(sqlQueries, [req.body.team_name, req.body.league, req.body.coach, req.body.country, req.body.area], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/team');
});

app.post('/player',function(req,res,next){
  var context = {};
  var sqlQueries = "INSERT INTO `scr_player` (`fname`, `lname`, `player_team`, `player_country`, `player_area`, `height`, `weight`, `skill_rating`, `age`, `position`, `captain`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  mysql.pool.query(sqlQueries, [req.body.fname, req.body.lname, req.body.team, req.body.country, req.body.area, req.body.height, req.body.weight, req.body.skill_rating, req.body.age, req.body.position, req.body.captain], function(err, rows, fields) {
    if (err) {
	next(err);
	return;
    }
  });
  res.redirect('/player');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
