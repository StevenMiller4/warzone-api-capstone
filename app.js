'use strict';




function findProfile(profile, platform) {
    
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userProfile = $('#profile-name');
        const userPlatform = $('#js-select-menu');
        findProfile(userProfile, userPlatform);
    })
}








const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://call-of-duty-modern-warfare.p.rapidapi.com/multiplayer/xC4oud%25231138/battle",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "56484ce262msh40836608f1d847ap13259cjsn56c72e2d66df",
		"x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});







/*'use strict';

const apiKey = "56484ce262msh40836608f1d847ap13259cjsn56c72e2d66df";
const searchURL_wz = "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/"
const searchURL_mp = "https://call-of-duty-modern-warfare.p.rapidapi.com/multiplayer/"


function urlGenerator(profile, platform) {

}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userProfile = ;
        const userPlatform = ;
    })
}

*/


/*
$.ajax(settings).done(function (response) {
	console.log(response);
});
*/