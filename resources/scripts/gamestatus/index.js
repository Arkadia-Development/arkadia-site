window.onload = function() {
	var ids = $.map($("#maindiv img[id]"), function(n) { return n.id; });
	$.get({
		url: "http://localhost:8080/GetGameStatuses",
	}).done(function(data){
		let gamesindex = -1;
		for(let i = 0; i < ids.length; i++){
			gamesindex = -1;
			for(let j = 0; j < data.length; j++){
				if(data[j].id == ids[i]){
					gamesindex = j;
					break;
				}
			}
			if(gamesindex == -1){
				$("#" + ids[i]).attr("src", "../../assets/game-banners/notfound.png");
			} else{
				var pngname = data[gamesindex].isWorking ? "color.png" : "bw.png";
				$("#" + ids[i]).attr("src", "../../assets/game-banners/" + ids[i] + "/" + pngname);
			}
		}
	});
}