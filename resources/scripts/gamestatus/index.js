var cabinets = [];
var notfound = "../../assets/game-banners/notfound.png";
const constructionTape = "../../assets/game-banners/construction-tape.png";

async function checkBothImages(color, bw) {
	let responseFunction = function (resp1, resp2) {
		let url1 = resp1[1] === "success" ? color : notfound;
		let url2 = resp2[1] === "success" ? bw : notfound;
        return [url1, url2];
    };
	return $.when($.ajax(color), $.ajax(bw)).then(responseFunction, responseFunction);
}

function cabToImgTag(cabinet) {
	var imgContainer = document.getElementById("imageContainer");
	var imageExists = !!cabinet.banner;
	const imgBox = document.createElement("div");
	imgBox.id = cabinet.id;
	imgBox.style = `position:relative;width:40%;margin:auto`;
	const subTag = document.createElement("img");
	subTag.src = imageExists
		? `data:image/png;base64,${cabinet.banner}`
		: notfound;
	subTag.style = 'z-index:1;max-height:150px;max-width:100%;margin:auto';
	imgBox.appendChild(subTag);
	if (!cabinet.isWorking) {
		const tapeTag = document.createElement("img");
		tapeTag.src = constructionTape;
		tapeTag.style = 'position:absolute;left:0;top:0;right:0;bottom:0;display:block;max-height:150px;max-width:100%;margin:auto;z-index:2'
		const grayFadeTag = document.createElement("div");
		grayFadeTag.style = 'position:absolute;left:0;top:0;right:0;bottom:0;display:block;max-height:150px;max-width:100%;background-color:rgba(50,50,50,0.6);z-index:1'
		imgBox.appendChild(tapeTag);
		imgBox.appendChild(grayFadeTag);
	}
	imgContainer.appendChild(imgBox);
	imgContainer.appendChild(document.createElement("br"));
}

function start() {
	$.get({
		url: "http://192.168.1.70:8080/GetAllGameStatuses"
	}).done(function(data){
		let onlineCabinets = 0;
		for(let i = 0; i < data.length; i++){
			cabToImgTag(data[i]);
			if(data[i].isWorking){ 
				onlineCabinets++;
				$("#onlineCabinets").html(onlineCabinets != 0 ? "online cabinets: " + onlineCabinets : "online cabinets: ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
			}
		}

		$("#totalCabinets").html("total cabinets: " + data.length);
	});
}

window.onload = function(){
	start();
}

////////////////////////////////////////////////////////////

narrowList = function(){
	var searchTerm = $("#searchbar").val();

	var imageContainer = document.getElementById("imageContainer");
	while(imageContainer.childElementCount > 0){
		imageContainer.removeChild(imageContainer.firstChild);
	}

	var filteredCabinets = [];
	cabinets.forEach(cabinet => {
		cabinet.searchTerms.forEach(term => {
			if(term.includes(searchTerm) && !filteredCabinets.includes(cabinet)) filteredCabinets.push(cabinet);
		});
	});

	filteredCabinets.forEach(cabinet => cabToImgTag(cabinet));
}