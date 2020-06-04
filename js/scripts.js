let allTeamsATagsArray = document.querySelectorAll(".team-name");
let teamInfoSection = document.querySelector("#team-info");
let leagueInfoSection = document.querySelector(".league-info");
let teamButton = document.querySelector("#team-btn");
let toTopButton = document.querySelector(".to-top-wrapper");
let bodyElement = document.querySelector("#body");

let teamsData = [];

document.addEventListener("DOMContentLoaded", function getTeamsData() {
	axios({
		method: "get",
		url:
			"https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4387"
	})
		.then((res) => {
			teamsData = [...res.data.teams].map((item) => {
				addTeamConferences(item);
				addToNorthwestDivision(item);
				addToPacificDivision(item);
				addToSouthwestDivision(item);
				addToAtlanticDivision(item);
				addToCentralDivision(item);
				addToSoutheastDivision(item);
				addTeamLinksToUi(item, buildTeamLinks(item));
				return item;
			});
		})
		.catch((err) => console.error(err));
});
const westernTeams = [
	"DEN",
	"MIN",
	"OKC",
	"POR",
	"UTA",
	"GSW",
	"LAC",
	"LAL",
	"PHX",
	"SAC",
	"DAL",
	"HOU",
	"MEM",
	"NOP",
	"SAS"
];

function addTeamConferences(item) {
	if (westernTeams.includes(item.strTeamShort)) {
		item.strConference = "Western";
	} else {
		item.strConference = "Eastern";
	}
}

const northwestTeams = ["DEN", "MIN", "OKC", "POR", "UTA"];

const pacificTeams = ["GSW", "LAC", "LAL", "PHX", "SAC"];

const southwestTeams = ["DAL", "HOU", "MEM", "NOP", "SAS"];

const atlanticTeams = ["BOS", "BKN", "NYK", "PHI", "TOR"];

const centralTeams = ["CHI", "CLE", "DET", "IND", "MIL"];

const southeastTeams = ["ATL", "CHA", "MIA", "ORL", "WAS"];

function addToNorthwestDivision(item) {
	if (northwestTeams.includes(item.strTeamShort)) {
		item.strDivision = "Northwest";
	}
}

function addToPacificDivision(item) {
	if (pacificTeams.includes(item.strTeamShort)) {
		item.strDivision = "Pacific";
	}
}

function addToSouthwestDivision(item) {
	if (southwestTeams.includes(item.strTeamShort)) {
		item.strDivision = "Southwest";
	}
}

function addToAtlanticDivision(item) {
	if (atlanticTeams.includes(item.strTeamShort)) {
		item.strDivision = "Atlantic";
	}
}

function addToCentralDivision(item) {
	if (centralTeams.includes(item.strTeamShort)) {
		item.strDivision = "Central";
	}
}

function addToSoutheastDivision(item) {
	if (southeastTeams.includes(item.strTeamShort)) {
		item.strDivision = "Southeast";
	}
}

teamButton.addEventListener("click", teamButtonAction);

function teamButtonAction() {
	leagueInfoSection.classList.remove("d-none");
	teamInfoSection.classList.add("d-none");
}

function buildTeamLinks(item) {
	const teamLink = document.createElement("a");
	teamLink.setAttribute("href", "#main-content");
	teamLink.id = `nba${item.idTeam}`;
	teamLink.className = "team-name";
	teamLink.innerHTML = `${item.strTeam}`;
	teamLink.onclick = locateTeamData;

	const newLi = document.createElement("li");
	newLi.className = "team-wrapper";
	newLi.appendChild(teamLink);

	return newLi;
}

function addTeamLinksToUi(item, newLi) {
	if (item.strDivision == "Northwest") {
		let ul = document.querySelector(".division-northwest");
		ul.appendChild(newLi);
	} else if (item.strDivision == "Pacific") {
		let ul = document.querySelector(".division-pacific");
		ul.appendChild(newLi);
	} else if (item.strDivision == "Southwest") {
		let ul = document.querySelector(".division-southwest");
		ul.appendChild(newLi);
	} else if (item.strDivision == "Atlantic") {
		let ul = document.querySelector(".division-atlantic");
		ul.appendChild(newLi);
	} else if (item.strDivision == "Central") {
		let ul = document.querySelector(".division-central");
		ul.appendChild(newLi);
	} else {
		let ul = document.querySelector(".division-southeast");
		ul.appendChild(newLi);
	}
}

function locateTeamData(e) {
	let teamIdUi = e.target.id;
	teamIdUi = teamIdUi.substring(3);
	let selectedTeam = teamsData.find((item) => item.idTeam == teamIdUi);
	console.log(teamsData);
	displayTeamData(selectedTeam);
}

function displayTeamData(selectedTeam) {
	let newHtml = `
    <h2 class="team-info-header text-center text-uppercase">
  ${selectedTeam.strTeam} <small>(${selectedTeam.strTeamShort})</small></h2>
  <div class="conference-info text-center mb-1">${selectedTeam.strConference} Conference</div>
  <div class="division-info text-center mb-3">${selectedTeam.strDivision} Division</div>
  <h4 class="team-info-subheader text-center">      
	Year Established:<br /> <span class="year-established">${selectedTeam.intFormedYear}</span>
  </h4>

	<div class="stadium-info text-center mb-5">
	<p class="stadium-name">Stadium Name:<br /> <strong>${selectedTeam.strStadium}</strong></p>
	<p class="stadium-location">Location:<br /> <strong>${selectedTeam.strStadiumLocation}</strong></p>
    <p class="stadium-capacity">Capacity:<br /> <strong>${selectedTeam.intStadiumCapacity}</strong></p>
    <img src="${selectedTeam.strStadiumThumb}" alt="stadium image" width=100%/>
	</div>
	<div class="team-info">
    <p class="team-info-text">${selectedTeam.strDescriptionEN}</p>
    
  </div>
  <div class="social-link text-center my-4">

      <a href="http://${selectedTeam.strFacebook}" target="_blank" class="btn btn-social-icon btn-lg btn-facebook mr-2">
    <span class="fa fa-facebook"></span>
  </a>
        <a href="http://${selectedTeam.strInstagram}" target="_blank" class="btn btn-social-icon btn-lg btn-instagram mr-2">
    <span class="fa fa-instagram"></span>
  </a>
      <a href="http://${selectedTeam.strTwitter}" target="_blank" class="btn btn-social-icon btn-lg btn-twitter mr-2">
    <span class="fa fa-twitter"></span>
  </a>
          <a href="http://${selectedTeam.strYoutube}" target="_blank" class="btn btn-social-icon btn-lg btn-youtube">
    <span class="fa fa-youtube"></span>
  </a>
  </div>
  <div class="website-info text-center">
  <a href="http://${selectedTeam.strWebsite}" target="_blank" class="website">
    <span class="team-website">${selectedTeam.strWebsite}</span>
  </a>
  </div>
  `;
	leagueInfoSection.classList.add("d-none");
	teamInfoSection.classList.add("my-3,mx-3");
	teamInfoSection.classList.remove("d-none");
	teamInfoSection.innerHTML = newHtml;
}

// Scroll to the top functionality
window.addEventListener("scroll", function () {
	let scrollPosition = window.scrollY;

	if (scrollPosition >= 175) {
		toTopButton.classList.remove("d-none");
	} else {
		toTopButton.classList.add("d-none");
	}
});
