var questions = [
	{
		'question': 'How many arcade games do you guys have in here?',
		'answer': "Even with as many games as we have broken down at any given time (see next question in the FAQ) we have well over ~125 arcade games available to play. When we are closer to caught up on our repair schedule (admittedly not super often lately oof) we can have as many as 150 going. As well we have a cool old 70's Air Hockey table and Foosball table and are soon hoping to reintroduce our old Chexx Bubble Hockey table too."
	},
	{
		'question': 'Are all of the games original/vintage?',
		'answer': "Yes! We are in fact running 100% original old-school PCBs (printed circuit boards; in other words no emulation, no Raspberry Pi's, etc.) and CRT (cathode ray tubes; in other words, no flat panel LCD, etc.) monitors in our game cabinets… A consequence of this is that many games can be broken down at any given time, but OOF! we're trying our darnedest to keep all these things up and running and in their original state. The only exceptions are; the Fixit Felix Jr. machine running off an old PC cuz (not to spoil the illusion of fantasy for fans of those movies, but) that's the only way to run it, yeah and the second (right side) monitor in the X-Men machine is actually an old flat panel television cuz we couldn't physically fit a second CRT monitor in it."
	},
	{
		'question': "Are ALL of the games really FREE?",
		'answer': "YES! Once you pay your super duper reasonable admission fee of $5, the arcade and all of its entertaining contents are yours to beep and boop for free for as long as you like (until closing time obv). That means NO quarters, NO tokens and no time limit! The admission fee is good all day. And there is NO RE-ENTRY FEE on the same day, so you are welcome to come and go as you please. Once you've paid in, you're in!"
	},
	{
		'question': "Do you stamp our hands or do we need wristbands or something if we leave and intend to come back the same day?",
		'answer': "Naw. We don't do any of that stuff. We trust you, if you trust us! Go eat some dinner, come back in and keep playing. Go catch a game or a movie, come right back in and keep playing. Go out and change the world, come right on back in and keep playing. Our house is your house for the day, any day, every day (well, except Monday)."
	},
	{
		'question': "Are your hours always the same? You never do 'special' or holiday hours or anything like that?",
		'answer': "Days and hours of operation are always the same, in fact the same as they've been since 2012. We are open on every holiday except Thanksgiving and we are never open on Mondays, even if it is a holiday. Obviously we occasionally have to close due to inclement weather, but in such rare occasions we'll always post notice on our stupid Instagram page."
	},
	{
		'question': "So, you're NEVER open on Mondays? Like, ever?",
		'answer': "Never ever."
	},
	{
		'question': "Do I have to pay $5 even if I'm not playing?",
		'answer': "Yep!"
	},
	{
		'question': "Wait, why?",
		'answer': "Cuz it's an admission fee. We do not charge to play, we charge to come in. That's how we pay our rent and how we put food on the table, the admission fees. We have no way of knowing who's playing and who's not playing, we have no possible way to control that, that's why we just charge the flat admission fee and done. Honestly it's a pretty great deal."
	},
	{
		'question': "This place is kinda awesome.",
		'answer': "<i>You're</i> kinda awesome."
	},
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