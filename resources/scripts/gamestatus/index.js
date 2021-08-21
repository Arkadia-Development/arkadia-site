var games = [{
		"name": "pacman",
		"isWorking": false
	},
	{
		"name": "mappy",
		"isWorking": true
	}
];

window.onload = function() {
	var ids = $.map($("#maindiv img[id]"), function(n) { return n.id; });

	let gamesindex = -1;
	for(let i = 0; i < ids.length; i++){
		gamesindex = -1;
		for(let j = 0; j < games.length; j++){
			if(games[j].name == ids[i]){
				gamesindex = j;
				break;
			}
		}
		if(gamesindex == -1){
			$("#" + ids[i]).attr("src", "../../assets/game-banners/notfound.png");
		} else{
			var pngname = games[gamesindex].isWorking ? "color.png" : "bw.png";
			$("#" + ids[i]).attr("src", "../../assets/game-banners/" + ids[i] + "/" + pngname);
		}
	}
}