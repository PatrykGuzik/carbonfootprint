fetch(`${serverLink}/api/informations/?format=json`)
	.then(response => response.json())
	.then(data => DrawInfo(data));

function DrawInfo(d) {
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

	// const bigInfoContainer = document.querySelector(".big-info-container");
	// const infoBtn = document.querySelector(".info-btn");
	// const bigInfo = document.querySelector(".big-info");

	fetch(`${serverLink}/api/recommendations/?format=json`)
		.then(response => response.json())
		.then(data => DrawRecommendation(data));
}

function DrawRecommendation(d) {
	hideLoading();
	console.log(d);
	console.log(getRecByName("T_samochod"));

	recommendationsByCat["TRANSPORT"] = `<p>${getRecByName("T_samochod")}</p> <p>${getRecByName("T_samolot")}</p>`;
	recommendationsByCat["JEDZENIE"]  = `<p class="red-border">${getRecByName("J_zwierz")}</p>`;
	recommendationsByCat["ENERGIA DOMU"]  =`<p class="red-border">${getRecByName("E_ocieplenie")}</p><p>${getRecByName("E_ocieplenie")}</p>`;
	recommendationsByCat["CZAS WOLNY"]  =`<p>${getRecByName("C_organizowane")}</p>`;
	recommendationsByCat["KONSUMPCJA"]  =`<p>${getRecByName("K_ubrania")}</p>`;
	recommendationsByCat["ODPADY"]  =`<p>${getRecByName("O_odpady")}</p>`;

	// dodać 

	function getRecByName(name) {
		for (let i = 0; i < d.length; i++) {
			if (d[i].name == name) {
				return d[i].rekomendacja_pl;
			}
		}
	}
}
