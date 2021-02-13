function fillValues() {
	//SK
	getIzidenzFromAPI("08212", "region_valueSK");
	//LK
	getIzidenzFromAPI("08215", "region_valueLK");
}

function getIzidenzFromAPI(region, htmlValue) {
	let request = new XMLHttpRequest();
	var icidenzNumber = "unknown";
	var counter = 10;
	do {
		request.open("GET", "https://api.corona-zahlen.org/districts/" + region);
		request.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					var icidenzNumber = JSON.parse(request.responseText)['data'][region]['weekIncidence'];
					if (icidenzNumber > 50.00) {
						document.getElementById(htmlValue).style.color = "red";
					}
					icidenzNumber = icidenzNumber.toFixed(2);
			}
			counter--;
		};
	} while (icidenzNumber.localeCompare("unknown") == 0 || counter > 0);
	document.getElementById(htmlValue).innerHTML = icidenzNumber;
	request.send();
}
