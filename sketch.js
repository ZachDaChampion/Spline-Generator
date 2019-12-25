let canvas = null;
let canvas_holder = null;
let card_holder = null;

function setup() {

	canvas = createCanvas(windowHeight, windowHeight);
	
	canvas_holder = document.getElementById('canvas_holder');
	canvas_holder.style.width = windowHeight.toString() + "px";
	canvas_holder.style.height = windowHeight.toString() + "px";

	card_holder = document.getElementById('cards_holder');
	card_holder.style.width = (windowWidth - windowHeight - 4).toString() + "px";
	card_holder.style.height = windowHeight.toString() + "px";

	canvas.parent(canvas_holder);

	windowResized();

	['test 1', 'test 2', 'test 3', 'test 1', 'test 2', 'test 3', 'test 1', 'test 2', 'test 3'].forEach(title => {
		let card = document.getElementById('card_template').content.cloneNode(true);
		card.querySelector('#title').innerText = title;
		card_holder.appendChild(card);
	});
}

function draw() {
	
	background(0);
}

function windowResized() {
	canvas.resize(windowHeight, windowHeight);
}
