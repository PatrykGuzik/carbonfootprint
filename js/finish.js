// const code = sessionStorage.getItem('code');

// console.log(code);

// const transport = document.querySelector(".transport")
// transport.innerHTML = Number.parseFloat(sessionStorage.getItem('TRANSPORT')).toFixed(2);
const serverLink = "https://guziczek772.pythonanywhere.com";
//Loading---------------------------------------------------------------------------
const loader = document.querySelector(".loading");

function displayLoading() {
	loader.classList.add("display");

	setTimeout(() => {
		loader.classList.remove("display");
	}, 60000);
}

function hideLoading() {

	setTimeout(() => {
		loader.classList.remove("display");
		drawStats();
		window.setTimeout("showPopUp()", 2000);
	}, 1000);
	
}

displayLoading();

// ----dane---
const SWIAT = 4.9;
const POLSKA = 9;
const KIRGISTAN = 13;
const SUDAN = 7.1;
const ROSJA = 10.5;

const ANSWERS = JSON.parse(sessionStorage.getItem("answers"));
// zmienic na const
let TRANSPORT = Number.parseFloat(sessionStorage.getItem("TRANSPORT") / 1000);
let ODPADY = Number.parseFloat(sessionStorage.getItem("ODPADY") / 1000);
let ENERGIA_DOMU = Number.parseFloat(
	sessionStorage.getItem("ENERGIA_DOMU") / 1000
);
let JEDZENIE = Number.parseFloat(sessionStorage.getItem("JEDZENIE") / 1000);
let CZAS_WOLNY = Number.parseFloat(sessionStorage.getItem("CZAS_WOLNY") / 1000);
let KONSUMPCJA = Number.parseFloat(sessionStorage.getItem("KONSUMPCJA") / 1000);

//Dev
// TRANSPORT = 3.5;
// ODPADY = 1.2;
// ENERGIA_DOMU = 0.3;
// JEDZENIE = 2.3;
// CZAS_WOLNY = 1.1
// KONSUMPCJA = 2.2;

const SUMA =
	TRANSPORT + ODPADY + ENERGIA_DOMU + JEDZENIE + CZAS_WOLNY + KONSUMPCJA;

const RED = "#FF3939";
const GREEN = "#5A9D55";
const YELLOW = "#FFAE34";

const detailsList = {
	TRANSPORT: TRANSPORT,
	ODPADY: ODPADY,
	"ENERGIA DOMU": ENERGIA_DOMU,
	JEDZENIE: JEDZENIE,
	"CZAS WOLNY": CZAS_WOLNY,
	KONSUMPCJA: KONSUMPCJA,
};

const statsList = {
	"Twój wynik": SUMA,
	Świat: 4.9,
	Polska: 8,
	Chiny: 7.4,
	USA: 14.2,
	Meksyk: 2.7,
};
console.log("suma: " + SUMA);

const ratingGood = "Jest dobrze! Emitujesz mniej niż przeciętny Polak.";
const ratingMid = "No tak średnio bym powiedział.";
const ratingBad =
	"Jest bardzo źle! Emitujesz rocznie więcej CO2 niż statystyczny Polak.";

const rating = document.querySelector(".rating");

// ---------------------RATING--------------------

if (SUMA > POLSKA + 1) {
	rating.innerHTML = ratingBad;
	rating.style.backgroundColor = "rgba(255, 31, 31, 0.8)";
}
if (SUMA < POLSKA - 1) {
	rating.innerHTML = ratingGood;
	rating.style.backgroundColor = "rgba(77, 135, 72, 0.8)";
}
if (SUMA >= POLSKA - 1 && SUMA <= POLSKA + 1) {
	rating.innerHTML = ratingMid;
	rating.style.backgroundColor = "rgba(255, 200, 50, 0.8)";
}

//------------------------------STATYSTYKI------------------------------
function drawStats() {
	const statsWorld = document.querySelector(".stats-world");
	let statsWorldInner = "";

	for (let i = 0; i < Object.keys(statsList).length; i++) {
		value = Object.values(statsList)[i].toFixed(1);
		heightBar = value * 6;
		arrow = "";
		if (value > 30) {
			heightBar = 30 * 6;
			arrow = `<div class="arrow"></div>`;
		}
		describe = Object.keys(statsList)[i];
		barColor = changeBarColor(value);
		statsWorldInner += `<div class="result">
                            <div class="result-value">${value}t</div>
							${arrow}
                            <div class="result-bar" style="height:${heightBar}px; background-color:${barColor}"></div>
                            <div class="result-describe">${describe}</div>
                        </div>
                        `;
	}

	statsWorld.innerHTML = statsWorldInner;

	function changeBarColor(value) {
		if (value > POLSKA + 1) return RED;
		if (value < POLSKA - 1) return GREEN;
		if (value >= POLSKA - 1 && value <= POLSKA + 1) return YELLOW;
	}

	//---------------------------szczegóły-----------------------------
	const details = document.querySelector(".details");
	let detailsInner = "";

	for (let i = 0; i < Object.keys(detailsList).length; i++) {
		value = Object.values(detailsList)[i];
		percent = (value * 100) / SUMA;
		percentFixed = Number.parseFloat(percent).toFixed(1);
		describe = Object.keys(detailsList)[i];
		barColor = changeBarColor(value);
		detailsInner += `<div class="result">
                        <div class="result-value">${percentFixed}%</div>
                        <div class="result-bar" style="height:${
													percentFixed * 2
												}px"></div>
                        <div class="result-describe">${describe}</div>
                    </div>
                        `;
	}

	details.innerHTML = detailsInner;
}

// ----------------------------slider-------------------------------

// upload data

fetch(`${serverLink}/api/informations/?format=json`)
	.then(response => response.json())
	.then(data => DrawInfo(data));

function DrawInfo(d) {

	hideLoading();

	const mediaScroller = document.querySelector(".media-scroller");

	let mediaScrollerInner = "";

	for (let i = 0; i < Object.keys(d).length; i++) {
		mediaScrollerInner += ` <div class="media-element">
                                <div class="info">

                                    <div class="info-content">
                                        <h3>Czy wiesz że...</h3>
                                        <p>${d[i].informacja_pl}</p>
                                    </div>

                                    <img src="img/path869.png" alt="">
                                
                                </div>

                            </div>`;
	}

	mediaScroller.innerHTML = mediaScrollerInner;

	const btnLeft = document.querySelector(".btn-left");
	const btnRight = document.querySelector(".btn-right");

	btnRight.addEventListener("click", () => {
		mediaScroller.scrollLeft += document.body.clientWidth * 0.75;
	});

	btnLeft.addEventListener("click", () => {
		mediaScroller.scrollLeft -= document.body.clientWidth * 0.75;
	});

	const bigInfoContainer = document.querySelector(".big-info-container");
	const infoBtn = document.querySelector(".info-btn");
	const bigInfo = document.querySelector(".big-info");
}

//------------------popup-------------------

const popupBackground = document.querySelector(".popup-background");
const popup = document.querySelector(".btn-x");

// window.setTimeout("showPopUp()", 2000);

popupBackground.addEventListener("click", () => {
	hidePopUp();
});

const btnTip = document.querySelector(".btn-tip");
btnTip.addEventListener("click", () => {
	showPopUp();
});

function showPopUp() {
	popupBackground.style.display = "flex";
}
function hidePopUp() {
	popupBackground.style.display = "none";
}

// _______________________FUNCTIONS____________________________

function getTheBiggestAnswers(count) {}
