'use strict';

const searchURL_wz = "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/"
const searchURL_mp = "https://call-of-duty-modern-warfare.p.rapidapi.com/multiplayer/"

const settings = {
	"async": true,
	"crossDomain": true,
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "56484ce262msh40836608f1d847ap13259cjsn56c72e2d66df",
		"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
	}
};

function displayWinLoss(responseJson) {
    $('#wins').empty();
    $('#wins').append(
        `<li>Wins: ${responseJson.br.wins}</li>
        <li>Times in the Top 5: ${responseJson.br.topFive}</li>
        <li>Times in the Top 10: ${responseJson.br.topTen}</li>
        <li>Times in the Top 25: ${responseJson.br.topTwentyFive}</li>
        <li>Games Played: ${responseJson.br.gamesPlayed}</li>`
    );
}

function displayKillDeath(responseJson) {
    $('#kills').empty();
    $('#kills').append(
        `<li>Kills: ${responseJson.br.kills}</li>
        <li>Deaths: ${responseJson.br.deaths}</li>
        <li>K/D Ratio: ${responseJson.br.kdRatio}</li>`
    );
}

function displayScore(responseJson) {
    $('#scores').empty();
    $('#scores').append(
        `<li>Score: ${responseJson.br.score}</li>
        <li>Time Played: ${responseJson.br.timePlayed}</li>
        <li>Score per Minute: ${responseJson.br.scorePerMinute}</li>`
    );
}

function displayResults(responseJson) {
    displayWinLoss(responseJson);
    displayKillDeath(responseJson);
    displayScore(responseJson);
    $('#win-loss').removeClass('hidden');
    $('#kill-death').removeClass('hidden');
    $('#score').removeClass('hidden');
    $('#js-error-message').empty();
    $('#profile-name').val('');
    $('#js-select-menu').val('');
}

function findProfile(userProfile, userPlatform) {
    const queryString = userProfile + '/' + userPlatform;
    const firstUrl = searchURL_wz + queryString;
    const secondUrl = searchURL_mp + queryString;

    fetch(firstUrl, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#win-loss').addClass('hidden');
            $('#kill-death').addClass('hidden');
            $('#score').addClass('hidden');
            $('#profile-name').val('');
            $('#js-select-menu').val('');
            $('#js-error-message').html(`<h3>There was a problem locating your profile: ${err.message}.</h3>
            <p>If you have issues accessing the information on your account make sure to do the following:</p>
            <ul>
              <li>Make sure to replace the "#" in your profile name with "%23". Example: profile#1111 = profile%231111</li>
              <li>Your account may have privacy options set to prevent your stats from being pulled.
                <ol>
                  <li>Visit <a href="https://s.activision.com/activision/login">Activision Login</a></li>
                  <li>Head to your "Profile"</li>
                  <li>Under "Account Linking" find your platform</li>
                  <li>Change the "Searchable" and "Data Visible" settings to "All"</li>
                </ol>
              </li>
              <li>There are occasionally issues with finding your profile using Activision ID. You could try another platform if it doesn't work.</li>
            </ol>`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userProfile = $('#profile-name').val();
        const userPlatform = $('#js-select-menu').val();
        findProfile(userProfile, userPlatform);
    });
}

$(watchForm);