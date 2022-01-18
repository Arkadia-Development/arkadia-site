var colors = [];

window.onload = function(){
	for(let i = 0; i < 6; i++) colors.push(Math.floor(Math.random()*16777215).toString(16));
	galagaColors();
}

function galagaColors(){
	var td = document.getElementById("galagaPackage");
	
	var g1 = document.createElement("span");
	g1.innerHTML = "G";
	g1.style.color = "#" + colors[0];

	var a1 = document.createElement("span");
	a1.innerHTML = "A";
	a1.style.color = "#" + colors[1];

	var l = document.createElement("span");
	l.innerHTML = "L";
	l.style.color = "#" + colors[2];

	var a2 = document.createElement("span");
	a2.innerHTML = "A";
	a2.style.color = "#" + colors[3];

	var g2 = document.createElement("span");
	g2.innerHTML = "G";
	g2.style.color = "#" + colors[4];

	var a3 = document.createElement("span");
	a3.innerHTML = "A";
	a3.style.color = "#" + colors[5];

	while(td.childElementCount > 0) td.removeChild(td.firstChild);
	td.appendChild(g1);
	td.appendChild(a1);
	td.appendChild(l);
	td.appendChild(a2);
	td.appendChild(g2);
	td.appendChild(a3);

	for(let i = colors.length - 1; i > 0; i--) colors[i] = colors[i-1];
	colors[0] = Math.floor(Math.random()*16777215).toString(16);

	setTimeout(galagaColors, 100);
}