function loadISSPosition(first)
{
	var xhttp = new XMLHttpRequest();
	var pos;
	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			if (first)
				setup(this);
			else
				reload(this);
		}
	};
	xhttp.open("GET", "http://api.open-notify.org/iss-now.json", true);
	xhttp.send();
	return pos;
}

function loadISSPassage(pos)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4)
		{
			var data = JSON.parse(this.responseText);
			if (data["messages"] == "success")
			{
				var date = new Date(data["response"]["0"]["risetime"]*1000);
				alert(date.toString());
			}
			else
				alert("error");
		}
	};
	xhttp.open("GET", "http://api.open-notify.org/iss-pass.json?lat=" + pos["lat"] + "&lon=" + pos["lng"] + "&n=1", true);
	xhttp.setRequestHeader("Access-Control-Allow-Origin", "");
	xhttp.send();
	return pos;
}

function setup(xhttp)
{
	var data = JSON.parse(xhttp.responseText);
	var pos = [Number(data["iss_position"]["latitude"]), Number(data["iss_position"]["longitude"])];
	mymap = L.map('map').setView(pos, 5);
	
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
	{
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.dark',
		accessToken: 'pk.eyJ1IjoiaXZhbjhrIiwiYSI6ImNqdGVvZXliZjAweGI0NGxsYzA4dmJhMGcifQ.5KIOoCbOpDV1objOqzs22w'
	}).addTo(mymap);
	
	mymap.on('click', function(e)
	{
		if(!trackMode)
			loadISSPassage(e.latlng);
	});
}

function reload(xhttp)
{
	var data = JSON.parse(xhttp.responseText);
	var pos = [Number(data["iss_position"]["latitude"]), Number(data["iss_position"]["longitude"])];
	marker.remove();
	marker = L.marker(pos).addTo(mymap);
	mymap.flyTo(pos, mymap.getZoom());
}

var marker = L.marker([0, 0]);
var mymap;
loadISSPosition(true);

loadISSPosition(false);
setInterval(function(){ if (trackMode) loadISSPosition(false); }, 5000);
