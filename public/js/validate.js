function validateTeamForm() {
    var teamName = document.forms["teamForm"]["team_name"].value;
    var coach = document.forms["teamForm"]["coach"].value;

    return (validateInputLength(teamName, 25, "Team Name") && validateInputLength(coach, 25, "Coach"));
}

function validatePositionForm() {
    var position = document.forms["positionForm"]["position_name"].value;
    return validateInputLength(position, 25, "Position Name");
}

function validateLeagueForm() {
    var league = document.forms["leagueForm"]["league_name"].value;
    return validateInputLength(league, 25, "League Name");
}

function validateAreaForm() {
    var area = document.forms["areaForm"]["area_name"].value;
    return validateInputLength(area, 25, "Area Name");
}

function validateTournamentsForm() {
    var tournament = document.forms["tournamentsForm"]["tournament_name"].value;
    return validateInputLength(tournament, 25, "Tournament Name");
}

function validateCountryForm() {
    var country = document.forms["countryForm"]["country_name"].value;
    var population = document.forms["countryForm"]["population"].value;

    return (validateInputLength(country, 25, "Country Name") && validateNumber(population, 10000000000, "Population"));
}

function validatePlayerSearch() {
    var playerSearch = document.forms["playerSearchForm"]["player_search"].value;
    return validateInputLength(playerSearch, 100, "Player Search");
}

function validatePlayerForm() {
    var fname = document.forms["playerForm"]["fname"].value;
    var lname = document.forms["playerForm"]["lname"].value;
    var height = document.forms["playerForm"]["height"].value;
    var weight = document.forms["playerForm"]["weight"].value;
    var skillRating = document.forms["playerForm"]["skill_rating"].value;
    var age = document.forms["playerForm"]["age"].value;

    return (validateInputLength(fname, 50, "First Name") && validateInputLength(lname, 50, "Last Name") && validateNumber(height, 10, "Height") && validateNumber(weight, 300, "Weight") && validateNumber(skillRating, 99, "Skill Rating") && validateNumber(age, 120, "Age"));
}

function validateInputLength(data, maxVal, dataField) {
    if (data.length === 0) {
        alert(dataField + " field cannot be empty.");
	return false;
    }
    if (data.length > maxVal) {
	alert(dataField + " field cannot be empty.");
	return false;
    }
    return true;
}

function validateNumber(data, maxVal, dataField) {
    if (data.length === 0) {
	alert(dataField + " field cannot be empty.");
	return false;
    }
    if (data < 0) {
	alert(dataField + " field cannot be negative.");
	return false;
    }
    if (data > maxVal) {
	alert(dataField + " field cannot be greater than " + maxVal + ".");
	return false;
    }
    return true;
}

function confirmDelete() {
    return confirm("Are you sure you want to delete?");
}

function confirmEdit(name) {
    return confirm("Are you sure you want to edit " + name + "?");
}

function prepopulateForm(formName,valObject) {
    for (var i = 0; i < valObject.length; i++) {
      document.forms.namedItem(formName).elements.namedItem(valObject[i].name).value = valObject[i].value;
    }
}


