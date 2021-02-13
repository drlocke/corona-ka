function fillValues() {
	//SK
	getIzidenzFromAPI("08212", "region_valueSK");
	//LK
	getIzidenzFromAPI("08215", "region_valueLK");
}

async function getIzidenzFromAPI(region, htmlValue) {
	var icidenzNumber = "unknown";
	var counter = 100;
	do {
		let request = new XMLHttpRequest();
		request.open("GET", "https://api.corona-zahlen.org/districts/" + region, false);
		request.send(null);
		if (request.status == 200) {
			var icidenzNumber = JSON.parse(request.responseText)['data'][region]['weekIncidence'];
			if (icidenzNumber > 50.00) {
				document.getElementById(htmlValue).style.color = "red";
			}
			icidenzNumber = icidenzNumber.toFixed(2);
			console.debug("icidenzNumber: " + icidenzNumber);
		} else {
			await Sleep(100);
		}
		counter--;
		console.debug("counter: " + counter);
	} while (icidenzNumber.localeCompare("unknown") == 0 && counter > 0);
	document.getElementById(htmlValue).innerHTML = icidenzNumber;
}
