var cabinets = [];

async function checkImages(color, bw){
	try{
		$.ajax({
			url: color,
			type: "GET",
			error: (e) => {
				throw e;
			}
		});

		$.ajax({
			url: bw,
			type: "GET",
			error: (e) => {
				throw e;
			}
		})

		return [color, bw];
	}
	catch(e){
		return ["../../assets/game-banners/notfound.png", "../../assets/game-banners/notfound.png"];
	}
}

function start() {
	$.get({
		url: "http://localhost:8080/GetAllGameStatuses"
	}).done(function(data){
		cabinets = data;
		let onlineCabinets = 0;
		var imgContainer = document.getElementById("imageContainer");

		for(let i = 0; i < data.length; i++){
			var cabinetFolder = "../../assets/game-banners/" + data[i].id;
			var colorImage = cabinetFolder + "/color.png";
			var bwImage = cabinetFolder + "/bw.png";

			var imagesExist = checkImages(colorImage, bwImage);
			imagesExist.then(function(result){
				if(result){
					var imgTag = document.createElement("img");
					imgTag.style = "width:40%";
					imgTag.src = data[i].isWorking ? result[0] : result[1];
					imgContainer.appendChild(imgTag);
					if(data[i].isWorking){ 
						onlineCabinets++;
						$("#onlineCabinets").html(onlineCabinets != 0 ? "online cabinets: " + onlineCabinets : "online cabinets: ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR");
					}
					if(i != data.length - 1) imgContainer.appendChild(document.createElement("br"));
				}
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
		var colorImage = cabinetFolder + "/color.png";
		var bwImage = cabinetFolder + "/bw.png";

		var imgTag = document.createElement("img");
		imgTag.style = "width:40%";
		imgTag.src = cabinet.isWorking ? colorImage : bwImage;
		imgContainer.appendChild(imgTag);
		if(key != arr.length - 1) imgContainer.appendChild(document.createElement("br"));
	});
}