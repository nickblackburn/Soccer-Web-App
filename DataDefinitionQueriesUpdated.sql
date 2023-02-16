--
--						DATA DEFINITION QUERIES
--


--
--  Table for 'scr_area'
--

CREATE TABLE `scr_area` (
	`area_id` int(11) AUTO_INCREMENT,
	`area_name` varchar(25) NOT NULL,
	PRIMARY KEY (`area_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--  Table for 'scr_country'
--

CREATE TABLE `scr_country` (
	`country_id` int(11) AUTO_INCREMENT,
	`country_name` varchar(25) NOT NULL,
	`country_area` int(11),
	`population` int(11) NOT NULL,
	PRIMARY KEY (`country_id`),
	FOREIGN KEY (`country_area`) REFERENCES `scr_area` (`area_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--  Table for 'scr_position'
--

CREATE TABLE `scr_position` (
	`position_id` int(11) AUTO_INCREMENT,
	`position_name` varchar(25) NOT NULL,
	PRIMARY KEY (`position_id`),
	CONSTRAINT `validPosition` CHECK (`position_name` IN ('Goalie', 'Right Back Defender', 'Left Back Defender', 'Center Back Defender', 'Right Midfielder', 'Left Midfielder', 'Center Midfielder', 'Right Forward', 'Left Forward', 'Center Forward'))
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--  Table for 'scr_league'
--

CREATE TABLE `scr_league` (
	`league_id` int(11) AUTO_INCREMENT,
	`league_name` varchar(25) NOT NULL,
	PRIMARY KEY (`league_id`),
	CONSTRAINT `validLeague` CHECK (`league_name` IN ('English Premier League', 'France Ligue 1', 'Germany Bundesliga', 'Spain La Liga', 'Italy Serie A'))
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--  Table for 'scr_team'
--

CREATE TABLE `scr_team` (
	`team_id` int(11) AUTO_INCREMENT,
	`team_name` varchar(25) NOT NULL,
	`league` int(11) NOT NULL,
	`coach` varchar(25) NOT NULL,
	`team_country` int(11),
	`team_area` int(11),
	PRIMARY KEY (`team_id`),
	FOREIGN KEY (`league`) REFERENCES `scr_league` (`league_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (`team_country`) REFERENCES `scr_country` (`country_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (`team_area`) REFERENCES `scr_area` (`area_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--  Table for 'scr_player'
--

CREATE TABLE `scr_player` (
	`player_id` int(11) NOT NULL AUTO_INCREMENT,
	`fname` varchar(50) NOT NULL,
	`lname` varchar(50) NOT NULL,
	`player_team` int(11),
	`player_country` int(11),
	`player_area` int(11),
	`height` float(11) NOT NULL,
	`weight` float(11) NOT NULL,
	`skill_rating` int(11) NOT NULL,
	`age` int(11) NOT NULL,
	`position` int(11) NOT NULL,
	`captain` tinyint(3) NOT NULL DEFAULT 0,
	PRIMARY KEY (`player_id`),
	FOREIGN KEY (`player_team`) REFERENCES `scr_team` (`team_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (`player_country`) REFERENCES `scr_country` (`country_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (`player_area`) REFERENCES `scr_area` (`area_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (`position`) REFERENCES `scr_position` (`position_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--  Table for 'scr_tournaments'
--

CREATE TABLE `scr_tournaments` (
	`tournament_id` int(11) AUTO_INCREMENT,
	`tournament_name` varchar(25) NOT NULL,
	PRIMARY KEY (`tournament_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--  Table for 'scr_tournament_teams'
--

CREATE TABLE scr_tournament_teams (
	`team` int(11),
	`tournament` int(11),
	FOREIGN KEY (`team`) REFERENCES `scr_team` (`team_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	FOREIGN KEY (`tournament`) REFERENCES `scr_tournaments` (`tournament_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
--  Dumping data for table 'scr_area'
--

INSERT INTO `scr_area` (`area_name`) VALUES
('North America'),
('South America'),
('Europe'),
('Africa'),
('Asia');

--
--  Dumping data for table 'scr_country'
--

INSERT INTO `scr_country` (`country_name`, `country_area`, `population`) VALUES
('England', 3, 53000000),
('France', 3, 66000000),
('Germany', 3, 82000000),
('Spain', 3, 46000000),
('Italy', 3, 60000000),
('Wales', 3, 3000000),
('Argentina', 2, 43000000),
('Belgium', 3, 11000000),
('Brazil', 2, 207000000),
('Netherlands', 3, 17000000),
('Colombia', 2, 48000000),
('Poland', 3, 37000000),
('Croatia', 3, 4000000),
('Bosnia', 3, 3000000);

--
--  Dumping data for table 'scr_position'
--

INSERT INTO `scr_position` (`position_name`) VALUES
('Goalie'),
('Right Back Defender'),
('Left Back Defender'),
('Center Back Defender'),
('Right Midfielder'),
('Left Midfielder'),
('Center Midfielder'),
('Right Forward'),
('Left Forward'),
('Center Forward');

--
--  Dumping data for table 'scr_league'
--

INSERT INTO `scr_league` (`league_name`) VALUES
('English Premier League'),
('France Ligue 1'),
('Germany Bundesliga'),
('Spain La Liga'),
('Italy Serie A');

--
--  Dumping data for table 'scr_team'
--

INSERT INTO `scr_team` (`team_name`, `league`, `coach`, `team_country`, `team_area`) VALUES
('Arsenal', 1, 'Arsene Wenger', 1, 3),
('Manchester City', 1, 'Pep Guardiola', 1, 3),
('Chelsea', 1, 'Antonio Conte', 1, 3),
('PSG', 2, 'Unai Emery', 2, 3),
('Lyon', 2, 'Bruno Genesio', 2, 3),
('Monaco', 2, 'Leonardo Jardim', 2, 3),
('Bayern Munich', 3, 'Jupp Heynckes', 3, 3),
('Dortmund', 3, 'Thomas Tuchel', 3, 3),
('Schalke 04', 3, 'Domenico Tedesco', 3, 3),
('Barcelona', 4, 'Ernesto Valverde', 4, 3),
('Real Madrid', 4, 'Zinedine Zidane', 4, 3),
('Atletico Madrid', 4, 'Diego Simeone', 4, 3),
('Juventus', 5, 'Massimiliano Allegri', 5, 3),
('Napoli', 5, 'Maurizio Sarri', 5, 3),
('Roma', 5, 'Eusebio Di Francesco', 5, 3);

--
--  Dumping data for table 'scr_player'
--

INSERT INTO `scr_player` (`fname`, `lname`, `player_team`, `player_country`, `player_area`, `height`, `weight`, `skill_rating`, `age`, `position`, `captain`) VALUES
('Mesut', 'Ozil', 1, 3, 3, 1.83, 168, 89, 29, 7, 0),
('Aaron', 'Ramsey', 1, 6, 3, 1.78, 168, 84, 27, 7, 0),
('Sergio', 'Aguero', 2, 7, 3, 1.72, 154, 90, 29, 10, 0),
('Eden', 'Hazard', 3, 8, 3, 1.72, 168, 90, 27, 7, 0),
('Neymar', 'da Silva Santos Jr', 4, 9, 3, 1.75, 150, 92, 26, 9, 0),
('Memphis', 'Depay', 5, 10, 3, 1.75, 172, 80, 24, 10, 0),
('Radamel', 'Falcao', 6, 11, 3, 1.77, 159, 87, 32, 10, 0),
('Robert', 'Lewandowski', 7, 12, 3, 1.85, 174, 90, 29, 10, 0),
('Marco', 'Reus', 8, 3, 3, 1.80, 165, 91, 28, 6, 0),
('Marko', 'Pjaca', 9, 13, 3, 1.86, 170, 83, 22, 9, 0),
('Lionel', 'Messi', 10, 7, 3, 1.70, 159, 94, 30, 7, 1),
('Cristiano', 'Ronaldo', 11, 4, 3, 1.87, 184, 94, 33, 9, 0),
('Antione', 'Griezmann', 12, 2, 3, 1.75, 152, 88, 27, 10, 0),
('Paulo', 'Dybala', 13, 7, 3, 1.77, 165, 87, 24, 9, 0),
('Lorenzo', 'Insigne', 14, 5, 3, 1.63, 130, 86, 26, 10, 0),
('Edin', 'Dzeko', 15, 14, 3, 1.93, 176, 87, 32, 10, 0);

--
--  Dumping data for table 'scr_tournaments'
--

INSERT INTO `scr_tournaments` (`tournament_name`) VALUES
('Champions League'),
('Europa Cup'),
('FA Cup'),
('EFL Cup'),
('Coupe de France'),
('Coupe de la Ligue'),
('DFB-Pokal'),
('DFL-Supercup'),
('Copa del Rey'),
('Supercopa de Espana'),
('Coppa Italia'),
('Supercoppa Italiana');

--
--  Dumping data for table 'scr_tournament_teams'
--

INSERT INTO `scr_tournament_teams` (`team`, `tournament`) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(3, 4),
(4, 1),
(4, 5),
(5, 2),
(5, 6),
(6, 1),
(6, 5),
(7, 1),
(7, 7),
(7, 8),
(8, 2),
(8, 7),
(9, 8),
(10, 1),
(10, 9),
(10, 10),
(11, 1),
(11, 9),
(12, 2),
(12, 10),
(13, 1),
(13, 11),
(14, 2),
(14, 11),
(15, 1),
(15, 12);

