--
--						DATA MANIPULATION QUERIES
--




-- CREATE QUERIES


-- add a new player
INSERT INTO `scr_player` (`fname`, `lname`, `player_team`, `player_country`, `player_area`, `height`, `weight`, `skill_rating`, `age`, `position`, `captain`) VALUES ([fname_input], [lname_input], [dropdown_team_input], [dropdown_country_input], [dropdown_area_input], [height_input], [weight_input], [skill_rating_input], [age_input], [dropdown_position_input], [captain_input])

-- add a new team
INSERT INTO `scr_team` (`team_name`, `league`, `coach`, `team_country`, `team_area`) VALUES ([team_name_input], [dropdown_league_input], [coach_input], [dropdown_country_input], [dropdown_area_input])

-- add a new position
INSERT INTO `scr_position` (`position_name`) VALUES ([position_name_input])

-- add a new league
INSERT INTO `scr_league` (`league_name`) VALUES ([league_name_input])

-- add a new country
INSERT INTO `scr_country` (`country_name`, `country_area`, `population`) VALUES ([country_name_input], [dropdown_area_input], [population_input])

-- add a new area
INSERT INTO `scr_area` (`area_name`) VALUES ([area_name_input])

-- add a new tournaments
INSERT INTO `scr_tournaments` (`tournament_name`) VALUES ([tournament_name_input])

-- add a new tournament-team 
INSERT INTO `scr_tournament_teams` (`team`, `tournament`) VALUES ([dropdown_team_input], [dropdown_tournament_input])


-- READ QUERIES


-- get the best players with skill_rating > 90
SELECT `fname`, `lname`, `skill_rating` FROM `scr_player` WHERE `skill_rating` >90 GROUP BY `fname`, `lname` ORDER BY `skill_rating` DESC;

-- get the most populated countries
SELECT `country_name`, `population` FROM `scr_country` GROUP BY `population` DESC LIMIT 10;

-- get the most dense areas
SELECT `area_name`, COUNT(`country_id`) AS 'number_of_countries' FROM `scr_area` INNER JOIN `scr_country` c ON c.country_area = scr_area.area_id GROUP BY `area_name` ORDER BY number_of_countries DESC;

-- get the best teams with the highest average skill_rating
SELECT `team_name`, AVG(p.skill_rating) AS 'average_skill_rating' FROM `scr_team` LEFT JOIN `scr_player` p ON p.player_team = scr_team.team_id GROUP BY `team_name` ORDER BY average_skill_rating DESC LIMIT 10;

-- get the teams currently in the Champions League tournament
SELECT t.team_name FROM `scr_tournament_teams` LEFT JOIN `scr_team` t ON t.team_id = scr_tournament_teams.team WHERE `tournament` = (SELECT `tournament_id` FROM `scr_tournaments` WHERE `tournament_name` = 'Champions League') GROUP BY t.team_name ORDER BY t.team_name ASC;

-- get the team captains
SELECT `fname`, `lname` FROM `scr_player` WHERE `captain` = 1 GROUP BY `fname`, `lname` ORDER BY `fname` ASC;

-- get the youngest teams with the lowest average player age
SELECT t.team_name, AVG(`age`) AS 'average_age' FROM `scr_player` LEFT JOIN `scr_team` t ON t.team_id = scr_player.player_team GROUP BY t.team_name ORDER BY average_age ASC LIMIT 10;

-- get the teams currently competing in the most tournaments
SELECT t.team_name, COUNT(`tournament`) AS 'tournament_count' FROM `scr_tournament_teams` LEFT JOIN `scr_team` t ON t.team_id = scr_tournament_teams.team GROUP BY t.team_name HAVING COUNT(`tournament`) > 1 ORDER BY tournament_count DESC;

-- get the most popular player positions
SELECT `position_name`, COUNT(p.position) AS 'position_count' FROM `scr_position` RIGHT JOIN `scr_player` p ON p.position = scr_position.position_id GROUP BY `position_name` ORDER BY position_count DESC LIMIT 3;

-- get all the player info data
SELECT `fname`, `lname`, t.team_name, c.country_name, a.area_name, `height`, `weight`, `skill_rating`, `age`, p.position_name, `captain` FROM `scr_player` LEFT JOIN `scr_team` t ON t.team_id = scr_player.player_team LEFT JOIN `scr_country` c ON c.country_id = scr_player.player_country LEFT JOIN `scr_area` a ON a.area_id = scr_player.player_area LEFT JOIN `scr_position` p ON p.position_id = scr_player.position GROUP BY `player_id` ORDER BY `fname` ASC;

-- get all the team info data
SELECT `team_name`, l.league_name, `coach`, c.country_name, a.area_name FROM `scr_team` LEFT JOIN `scr_league` l ON l.league_id = scr_team.league LEFT JOIN `scr_country` c ON c.country_id = scr_team.team_country LEFT JOIN `scr_area` a ON a.area_id = scr_team.team_area GROUP BY `team_id` ORDER BY `team_name` ASC;

-- get all the country info data
SELECT `country_name`, a.area_name, `population` FROM `scr_country` LEFT JOIN `scr_area` a ON a.area_id = scr_country.country_area GROUP BY `country_name` ORDER BY `country_name` ASC;

-- get all the leagues
SELECT `league_name` FROM `scr_league` GROUP BY `league_name` ORDER BY `league_name` ASC;

-- get all the teams
SELECT `team_name` FROM `scr_team` GROUP BY `team_id` ORDER BY `team_name` ASC;

-- get all the countries
SELECT `country_name` FROM `scr_country` GROUP BY `country_name` ORDER BY `country_name` ASC;

-- get all the areas
SELECT `area_name` FROM `scr_area` GROUP BY `area_name` ORDER BY `area_name` ASC;

-- get all the positions
SELECT `position_name` FROM `scr_position` GROUP BY `position_name` ORDER BY `position_name` ASC;

-- get all the tournaments
SELECT `tournament_name` FROM `scr_tournaments` GROUP BY `tournament_name` ORDER BY `tournament_name` ASC;

-- get all the tournament teams
SELECT t.team_name, ts.tournament_name FROM `scr_tournament_teams` LEFT JOIN `scr_team` t ON t.team_id = scr_tournament_teams.team LEFT JOIN `scr_tournaments` ts ON ts.tournament_id = scr_tournament_teams.tournament GROUP BY t.team_name, ts.tournament_name ORDER BY t.team_name ASC;

-- search bar query for player fname and lname
SELECT fname, lname, t.team_name, c.country_name, a.area_name, height, weight, skill_rating, age, p.position_name, captain FROM scr_player LEFT JOIN scr_team t ON t.team_id = scr_player.player_team LEFT JOIN scr_country c ON c.country_id = scr_player.player_country LEFT JOIN scr_area a ON a.area_id = scr_player.player_area LEFT JOIN scr_position p ON p.position_id = scr_player.position WHERE fname = [fname_player_search_input] OR lname = [lname_player_search_input] GROUP BY player_id ORDER BY fname ASC;


-- UPDATE QUERIES


-- update player
UPDATE `scr_player` SET `fname` = [fname_input], `lname` = [lname_input], `player_team` = [dropdown_team_input], `player_country` = [dropdown_country_input], `player_area` = [dropdown_area_input], `height` = [height_input], `weight` = [weight_input], `skill_rating` = [skill_rating_input], `age` = [age_input], `position` = [dropdown_position_input], `captain` = [captain_input] WHERE `player_id` = [id_from_player_page_form]

-- update team
UPDATE `scr_team` SET `team_name` = [team_name_input], `league` = [dropdown_league_input], `coach` = [coach_input], `team_country` = [dropdown_country_input], `team_area` = [dropdown_area_input] WHERE `team_id` = [id_from_team_page_form]

-- update position
UPDATE `scr_position` SET `position_name` = [position_name_input] WHERE `position_id` = [id_from_position_page_form]

-- update league
UPDATE `scr_league` SET `league_name` = [league_name_input] WHERE `league_id` = [id_from_league_page_form]

-- update country
UPDATE `scr_country` SET `country_name` = [country_name_input], `country_area` = [dropdown_area_input], `population` = [population_input] WHERE `country_id` = [id_from_country_page_form]

-- update area
UPDATE `scr_area` SET `area_name` = [area_name_input] WHERE `area_id` = [id_from_area_page_form]

-- update tournaments
UPDATE `scr_tournaments` SET `tournament_name` = [tournament_name_input] WHERE `tournament_id` = [id_from_tournaments_page_form]

-- update tournament-teams
UPDATE `scr_tournament_teams` SET `team` = [dropdown_team_input], `tournament` = [dropdown_tournament_input] WHERE `team` = [team_from_tournament_teams_page_form] AND `tournament` = [tournament_from_tournament_teams_page_form]


-- DELETE QUERIES


-- delete player
DELETE FROM `scr_player` WHERE `player_id` = [id_for_row_selected_to_delete_player_page]

-- delete team
DELETE FROM `scr_team` WHERE `team_id` = [id_for_row_selected_to_delete_team_page]

-- delete position
DELETE FROM `scr_position` WHERE `position_id` = [id_for_row_selected_to_delete_position_page]

-- delete league
DELETE FROM `scr_league` WHERE `league_id` = [id_for_row_selected_to_delete_league_page]

-- delete country
DELETE FROM `scr_country` WHERE `country_id` = [id_for_row_selected_to_delete_country_page]

-- delete area
DELETE FROM `scr_area` WHERE `area_id` = [id_for_row_selected_to_delete_area_page]

-- delete tournaments
DELETE FROM `scr_tournaments` WHERE `tournament_id` = [id_for_row_selected_to_delete_tournaments_page]

-- delete tournament-teams
DELETE FROM `scr_tournament_teams` WHERE `team` = [team_for_row_selected_to_delete_tournament_teams_page] AND `tournament` = [tournament_for_row_selected_to_delete_tournament_teams_page]

