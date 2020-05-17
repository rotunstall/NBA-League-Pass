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
				teamsData.push(item);
			});
			console.log(teamsData);
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

let boston = document.querySelector("#nba134860");
boston.addEventListener("click", locateTeamData);

let brooklyn = document.querySelector("#nba134861");
brooklyn.addEventListener("click", locateTeamData);

let newYork = document.querySelector("#nba134862");
newYork.addEventListener("click", locateTeamData);

let philadelphia = document.querySelector("#nba134863");
philadelphia.addEventListener("click", locateTeamData);

let toronto = document.querySelector("#nba134864");
toronto.addEventListener("click", locateTeamData);

let chicago = document.querySelector("#nba134870");
chicago.addEventListener("click", locateTeamData);

let cleveland = document.querySelector("#nba134871");
cleveland.addEventListener("click", locateTeamData);

let detroit = document.querySelector("#nba134872");
detroit.addEventListener("click", locateTeamData);

let indiana = document.querySelector("#nba134873");
indiana.addEventListener("click", locateTeamData);

let milwaukee = document.querySelector("#nba134874");
milwaukee.addEventListener("click", locateTeamData);

let atlanta = document.querySelector("#nba134880");
atlanta.addEventListener("click", locateTeamData);

let charlotte = document.querySelector("#nba134881");
charlotte.addEventListener("click", locateTeamData);

let miami = document.querySelector("#nba134882");
miami.addEventListener("click", locateTeamData);

let orlando = document.querySelector("#nba134883");
orlando.addEventListener("click", locateTeamData);

let washington = document.querySelector("#nba134884");
washington.addEventListener("click", locateTeamData);

let denver = document.querySelector("#nba134885");
denver.addEventListener("click", locateTeamData);

let minnesota = document.querySelector("#nba134886");
minnesota.addEventListener("click", locateTeamData);

let oklahoma = document.querySelector("#nba134887");
oklahoma.addEventListener("click", locateTeamData);

let portland = document.querySelector("#nba134888");
portland.addEventListener("click", locateTeamData);

let utah = document.querySelector("#nba134889");
utah.addEventListener("click", locateTeamData);

let goldenState = document.querySelector("#nba134865");
goldenState.addEventListener("click", locateTeamData);

let losAngelesC = document.querySelector("#nba134866");
losAngelesC.addEventListener("click", locateTeamData);

let losAngelesL = document.querySelector("#nba134867");
losAngelesL.addEventListener("click", locateTeamData);

let phoenix = document.querySelector("#nba134868");
phoenix.addEventListener("click", locateTeamData);

let sacramento = document.querySelector("#nba134869");
sacramento.addEventListener("click", locateTeamData);

let dallas = document.querySelector("#nba134875");
dallas.addEventListener("click", locateTeamData);

let houston = document.querySelector("#nba134876");
houston.addEventListener("click", locateTeamData);

let memphis = document.querySelector("#nba134877");
memphis.addEventListener("click", locateTeamData);

let newOrleans = document.querySelector("#nba134878");
newOrleans.addEventListener("click", locateTeamData);

let sanAntonio = document.querySelector("#nba134879");
sanAntonio.addEventListener("click", locateTeamData);

function teamButtonAction() {
	leagueInfoSection.classList.remove("d-none");
	teamInfoSection.classList.add("d-none");
}

function locateTeamData(e) {
	let teamIdUi = e.target.id;
	teamIdUi = teamIdUi.substring(3);
	console.log(teamIdUi);
	let selectedTeam = teamsData.find((item) => item.idTeam == teamIdUi);
	console.log(selectedTeam);

	displayTeamData(selectedTeam);
}

function displayTeamData(selectedTeam) {
	let newHtml = `
    <h2 class="team-info-header text-center text-uppercase">
  ${selectedTeam.strTeam} <small>(${selectedTeam.strTeamShort})</small></h2>
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
