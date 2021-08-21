var headerbool = false;

var buttonclick = function(){
	if(!headerbool) $("#header").css("color", "aquamarine");
	else $("#header").css("color", "black");
	headerbool = !headerbool;
}