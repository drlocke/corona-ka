function fillValues() {
	//SK
	getIzidenzFromAPI("08212", "region_valueSK");
	//LK
	getIzidenzFromAPI("08215", "region_valueLK");
}

function getIzidenzFromAPI(region, htmlValue) {
	let request = new XMLHttpRequest();
	request.open("GET", "https://api.corona-zahlen.org/districts/" + region);
	request.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
			var icidenzNumber = JSON.parse(request.responseText)['data'][region]['weekIncidence'];
			if (icidenzNumber > 50.00) {
				document.getElementById(htmlValue).style.color = "red";
			}
			document.getElementById(htmlValue).innerHTML = icidenzNumber.toFixed(2);
    	} else {
			document.getElementById(htmlValue).innerHTML = "unknown";
		}
	};
	request.send();
}