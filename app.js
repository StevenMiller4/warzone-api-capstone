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
    $('#wins').replaceWith(
        `<li>Wins: ${responseJson.br.wins}</li>
        <li>Times in the Top 5: ${responseJson.br.topFive}</li>
        <li>Times in the Top 10: ${responseJson.br.topTen}</li>
        <li>Times in the Top 25: ${responseJson.br.topTwentyFive}</li>
        <li>Games Played: ${responseJson.br.gamesPlayed}</li>`
    );
}

function displayKillDeath(responseJson) {
    $('#kills').replaceWith(
        `<li>Kills: ${responseJson.br.kills}</li>
        <li>Deaths: ${responseJson.br.deaths}</li>
        <li>K/D Ratio: ${responseJson.br.kdRatio}</li>`
    );
}

function displayScore(responseJson) {
    $('#scores').replaceWith(
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
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
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