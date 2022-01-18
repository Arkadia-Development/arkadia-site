var slideIndex = 1;
var numSlides = 3;
var time = 5;
var colors = [];

window.onload = function() {
	showSlides(slideIndex);	
	timeCount();
	for(let i = 0; i < 6; i++) colors.push(Math.floor(Math.random()*16777215).toString(16));
	galagaColors();
}

// Next/previous controls
function plusSlides(n) {
	slideIndex = ((slideIndex + n) % numSlides);
	showSlides(slideIndex);
}

// Thumbnail image controls
function currentSlide(n) {
	slideIndex = n;
	showSlides(slideIndex);
}

function showSlides(n) {
	var i;
	var slides = document.getElementsByClassName("slides fade");
	var dots = document.getElementsByClassName("dot");
	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex-1].style.display = "block";
	dots[slideIndex-1].className += " active";
	time = 5;
}

function timeCount(){
	if(time <= 0){
		plusSlides(1);
		setTimeout(timeCount, 1000);
	}
	else{
		time--;
		setTimeout(timeCount, 1000);
	}
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