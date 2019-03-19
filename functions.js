function track()
{
	document.getElementById("tab").innerHTML = '<button default="button" id="track" class="tab selected" onclick="track()">Track</button> <button default="button" id="passage" class="tab" onclick="passage()">Next Passage</button>';
	document.getElementById("txt").innerHTML = "This is the position of the ISS position in real time:";
	trackMode = true;
}

function passage()
{
	alert("não funciona por erro de CORS :(");
	document.getElementById("tab").innerHTML = '<button default="button" id="track" class="tab" onclick="track()">Track</button> <button default="button" id="passage" class="tab selected" onclick="passage()">Next Passage</button>';
	trackMode = false;
}

var trackMode = true;