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
				buildConferences(item);
				buildDivisions(item);
				return item;
			});
		})
		.catch((err) => console.error(err));
});

function buildConferences(item) {
	if (
		item.strTeamShort == "DEN" ||
		item.strTeamShort == "MIN" ||
		item.strTeamShort == "OKC" ||
		item.strTeamShort == "POR" ||
		item.strTeamShort == "UTA" ||
		item.strTeamShort == "GSW" ||
		item.strTeamShort == "LAC" ||
		item.strTeamShort == "LAL" ||
		item.strTeamShort == "PHX" ||
		item.strTeamShort == "SAC" ||
		item.strTeamShort == "DAL" ||
		item.strTeamShort == "HOU" ||
		item.strTeamShort == "MEM" ||
		item.strTeamShort == "NOP" ||
		item.strTeamShort == "SAS"
	) {
		item.strConference = "Western";
	} else {
		item.strConference = "Eastern";
	}
}

function buildDivisions(item) {
	if (
		item.strTeamShort == "DEN" ||
		item.strTeamShort == "MIN" ||
		item.strTeamShort == "OKC" ||
		item.strTeamShort == "POR" ||
		item.strTeamShort == "UTA"
	) {
		item.strDivision = "Northwest";
	} else if (
		item.strTeamShort == "GSW" ||
		item.strTeamShort == "LAC" ||
		item.strTeamShort == "LAL" ||
		item.strTeamShort == "PHX" ||
		item.strTeamShort == "SAC"
	) {
		item.strDivision = "Pacific";
	} else if (
		item.strTeamShort == "DAL" ||
		item.strTeamShort == "HOU" ||
		item.strTeamShort == "MEM" ||
		item.strTeamShort == "NOP" ||
		item.strTeamShort == "SAS"
	) {
		item.strDivision = "Southwest";
	} else if (
		item.strTeamShort == "BOS" ||
		item.strTeamShort == "BKN" ||
		item.strTeamShort == "NYK" ||
		item.strTeamShort == "PHI" ||
		item.strTeamShort == "TOR"
	) {
		item.strDivision = "Atlantic";
	} else if (
		item.strTeamShort == "CHI" ||
		item.strTeamShort == "CLE" ||
		item.strTeamShort == "DET" ||
		item.strTeamShort == "IND" ||
		item.strTeamShort == "MIL"
	) {
		item.strDivision = "Central";
	} else {
		item.strDivision = "Southeast";
	}
}
console.log(teamsData);
teamButton.addEventListener("click", teamButtonAction);

function teamButtonAction() {
	addTeamLinksToUi();
	leagueInfoSection.classList.remove("d-none");
	teamInfoSection.classList.add("d-none");
}

function buildTeamLinks() {
	const teamLink = document.createElement("a");
	teamLink.className = "team-name";
	teamLink.innerHTML = `${item.strTeam}`;
	teamLink.onclick = locateTeamData;

	const newLi = document.createElement("li");
	newLi.id = `nba${item.idTeam}`;
	newLi.className = "team-wrapper";
	newLi.appendChild(teamLink);
}

function addTeamLinksToUi() {
	teamsData.forEach((elem) => {
		if (elem.strDivision == "Northwest") {
			buildDivisions();
			let ul = document.querySelector(".division-northwest");
			ul.appendChild(newLi);
		} else if (elem.strDivision == "Pacific") {
			buildDivisions();
			let ul = document.querySelector(".division-pacific");
			ul.appendChild(newLi);
		} else if (elem.strDivision == "Southwest") {
			buildDivisions();
			let ul = document.querySelector(".division-southwest");
			ul.appendChild(newLi);
		} else if (elem.strDivision == "Atlantic") {
			buildDivisions();
			let ul = document.querySelector(".division-atlantic");
			ul.appendChild(newLi);
		} else if (elem.strDivision == "Central") {
			buildDivisions();
			let ul = document.querySelector(".division-central");
			ul.appendChild(newLi);
		} else {
			buildDivisions();
			let ul = document.querySelector(".division-southeast");
			ul.appendChild(newLi);
		}
	});
}

function locateTeamData(e) {
	let teamIdUi = e.target.id;
	teamIdUi = teamIdUi.substring(3);
	console.log(teamIdUi);
	let selectedTeam = teamsData.find((item) => item.idTeam == teamIdUi);
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
