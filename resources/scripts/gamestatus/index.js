import { apiBaseUrl } from '../secrets.js';

var cabinets = [];
var notfound = '../../assets/game-banners/notfound.png';
const constructionTape = '../../assets/game-banners/construction-tape.png';

function cabToImgTag(cabinet) {
	var imgContainer = document.getElementById('imageContainer');
	var imageExists = !!cabinet.banner;
	const imgBox = document.createElement('div');
	imgBox.id = cabinet.id;
	imgBox.title = cabinet.fullTitle;
	imgBox.style = `position:relative;width:40%;margin:auto`;
	const subTag = document.createElement('img');
	subTag.src = imageExists
		? `data:image/png;base64,${cabinet.banner}`
		: notfound;
	subTag.style = 'z-index:1;max-height:150px;max-width:100%;margin:auto';
	imgBox.appendChild(subTag);
	const titleTag = document.createElement('p');
	titleTag.className = 'text';
	titleTag.style = 'margin:auto'
	titleTag.innerHTML = `${cabinet.fullTitle} (published by ${cabinet.searchTerms[cabinet.searchTerms.length - 1]})`;
	imgBox.appendChild(titleTag);
	if (!cabinet.isWorking) {
		const tapeTag = document.createElement('img');
		tapeTag.src = constructionTape;
		tapeTag.style = 'position:absolute;left:0;top:0;right:0;bottom:0;display:block;max-height:150px;max-width:100%;margin:auto;z-index:2'
		const grayFadeTag = document.createElement('div');
		grayFadeTag.style = 'position:absolute;left:0;top:0;right:0;bottom:0;display:block;max-height:150px;max-width:100%;background-color:rgba(50,50,50,0.6);z-index:1'
		imgBox.appendChild(tapeTag);
		imgBox.appendChild(grayFadeTag);
	}
	imgContainer.appendChild(imgBox);
	imgContainer.appendChild(document.createElement('br'));
}

function start() {
	$.get({
		url: apiBaseUrl + '/GetAllGameStatuses'
	}).done(function(data){
		let onlineCabinets = 0;
		data = data.sort((a, b) => a.id > b.id ? 1 : -1);
		cabinets = data;
		for(let i = 0; i < data.length; i++){
			cabToImgTag(data[i]);
			if(data[i].isWorking){ 
				onlineCabinets++;
				$('#onlineCabinets').html(onlineCabinets != 0 ? 'online cabinets: ' + onlineCabinets : 'online cabinets: ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR');
			}
		}
		$('#totalCabinets').html('total cabinets: ' + data.length);
	});
}

////////////////////////////////////////////////////////////

const narrowList = function(){
	var searchTerm = $('#searchbar').val();

	var imageContainer = document.getElementById('imageContainer');
	while(imageContainer.childElementCount > 0){
		imageContainer.removeChild(imageContainer.firstChild);
	}

	var filteredCabinets = cabinets.map(val => val); // deep copy by value rather than reference
	let params = searchTerm.split(' ');
	for(let i = 0; i < params.length; i++) params[i] = params[i].replace(/[^A-Za-z0-9]/g, '');
	params = params.filter(val => val !== '');
	if (params.length) {
		let containsParams = params.map(() => false);
		cabinets.forEach(cabinet => {
			params.forEach((param, i) => {
				cabinet.searchTerms.forEach(term => {
					if(term.includes(param.toLowerCase())){
						containsParams[i] = true;
					}
				});	
			});
			if(!containsParams.every((element) => element)) {
				filteredCabinets = filteredCabinets.filter((cab) => cab.id !== cabinet.id);
			}
			containsParams = params.map(() => false);
		});
	}

	filteredCabinets.forEach(cabinet => cabToImgTag(cabinet));
}

////////////////////////////////////////////////////////////

window.onload = function(){
	document.getElementById('searchbar').onkeyup = narrowList
	start();
}