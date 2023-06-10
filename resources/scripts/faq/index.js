var questions = [
	{
		'question': 'Do you seriously accept Dogecoin?',
		'answer': 'why does no one take me seriously when I say this???? yes we do'
	},
	{
		'question': 'Do you have x cabinet?',
		'answer': "try the <a href='../gamestatus'>game status page</a>!"
	}
]

function fillFAQ(){
	let faqContainer = document.getElementById('faqContainer');
	for(let i = 0; i < questions.length; i++){
		let question = document.createElement('span');
		question.classList.add('question');
		question.innerHTML = '<b>Q: </b>' + questions[i].question;

		let answer = document.createElement('span');
		answer.classList.add('answer');
		answer.innerHTML = '<b>A: </b>' + questions[i].answer;

		let container = document.createElement('div');
		container.id = 'q' + i;
		container.appendChild(question);
		container.appendChild(document.createElement('br'));
		container.appendChild(document.createElement('br'));
		container.appendChild(answer);

		faqContainer.appendChild(container);

		if(i != questions.length - 1){
			faqContainer.appendChild(document.createElement('br'));
			faqContainer.appendChild(document.createElement('br'));
			faqContainer.appendChild(document.createElement('br'));
		}
	}
}

window.onload = function(){
	fillFAQ();
}