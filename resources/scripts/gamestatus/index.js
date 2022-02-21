var cabinets = [];
var notfound = "../../assets/game-banners/notfound.png";

async function checkBothImages(color, bw) {
	let responseFunction = function (resp1, resp2) {
		let url1 = resp1[1] === "success" ? color : notfound;
		let url2 = resp2[1] === "success" ? bw : notfound;
        return [url1, url2];
    };
	return $.when($.ajax(color), $.ajax(bw)).then(responseFunction, responseFunction);
}

function start() {
	$.get({
		url: "https://arkadia-site-api.herokuapp.com/GetAllGameStatuses"
	}).done(function(data){
		cabinets = data;
		let onlineCabinets = 0;
		var imgContainer = document.getElementById("imageContainer");

		for(let i = 0; i < data.length; i++){
			var cabinetFolder = "../../assets/game-banners/" + data[i].id;
			var color = cabinetFolder + "/color.png";
			var bw = cabinetFolder + "/bw.png";

			var imagesExist = checkBothImages(color, bw);
			imagesExist.then(function(result){
				var imgTag = document.createElement("img");
				imgTag.style = "width:40%";
				imgTag.src = data[i].isWorking ? result[0] : result[1];
				imgContainer.appendChild(imgTag);
				if(data[i].isWorking){ 
					onlineCabinets++;
					$("#onlineCabinets").html(onlineCabinets != 0 ? "online cabinets: " + onlineCabinets : "online cabinets: ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
				}
				if(i != data.length - 1) imgContainer.appendChild(document.createElement("br"));
			});
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

	var imgContainer = document.getElementById("imageContainer");
	filteredCabinets.forEach((cabinet, key, arr) => {
		var cabinetFolder = "../../assets/game-banners/" + cabinet.id;
		var color = cabinetFolder + "/color.png";
		var bw = cabinetFolder + "/bw.png";

		var imagesExist = checkBothImages(color, bw);
		imagesExist.then(function(result){
			var imgTag = document.createElement("img");
			imgTag.style = "width:40%";
			imgTag.src = cabinet.isWorking ? result[0] : result[1];
			imgContainer.appendChild(imgTag);
			if(cabinet != arr[arr.length - 1]) imgContainer.appendChild(document.createElement("br"));
		});
	});
}